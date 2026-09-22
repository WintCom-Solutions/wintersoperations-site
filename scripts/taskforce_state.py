#!/usr/bin/env python3
"""A real state-store for AI Task Force pipeline state, replacing raw label
parsing as the source of truth (docs/proposals/2026-09-22-taskforce-comms-off-github.md,
Option 2).

Why: the label-only state machine has no validation layer. An item can end
up with two conflicting `stage:*` labels (#134, #133, #21) and nothing
catches it — it just sits, silently stuck, until a human or sync notices.
This module computes state FROM the current labels but treats a conflict as
a first-class, immediately-flagged state instead of an ambient bug: any
item with 0 or 2+ `stage:*` labels is written to the store as
`state: "hygiene-conflict"`, not skipped.

The store itself is a single JSON blob kept in the body of one GitHub issue
in this repo (`type:state-store`, `ai-task` — no `stage:*`, per the
existing precedent documented in docs/AI_TASK_FORCE.md's EDR-020 note).
That keeps this repo-local and reviewable in the normal PR flow while still
being a real structured store rather than labels-as-a-database. Labels stay
in place unchanged — other providers/agents that don't yet read the store
keep working exactly as before.

This is a same-repo prototype, not the canonical cross-repo replacement:
`docs/AI_TASK_FORCE.md` is maintained centrally in
`WintCom-Solutions/AI_Task_Force-Private` and synced byte-identical to
every onboarded repo, so promoting this beyond IT_OPS_CONSOLE requires
Karl's sign-off there — this session doesn't have access to that repo.

Usage:
    python3 scripts/taskforce_state.py sync [--repo owner/name] [--apply]
    python3 scripts/taskforce_state.py validate <path-to-state.json>
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from datetime import datetime, timezone

STAGE_LABELS = (
    "stage:plan",
    "stage:build",
    "stage:review",
    "stage:ready",
    "stage:delivered",
)
ROUTING_LABELS = ("blocked", "needs:karl", "locked", "quota:waiting")
STATE_STORE_TITLE = "AI Task Force state-store (machine-managed, do not edit by hand)"
SCHEMA_VERSION = 1


def _gh(args: list[str]) -> str:
    result = subprocess.run(["gh", *args], capture_output=True, text=True, check=True)
    return result.stdout


def _gh_json(args: list[str]) -> object:
    return json.loads(_gh(args))


def _labels(item: dict) -> set[str]:
    return {label["name"] for label in item.get("labels", [])}


def compute_state(item: dict, kind: str) -> dict:
    labels = _labels(item)
    stage_labels = sorted(labels & set(STAGE_LABELS))

    if len(stage_labels) == 1:
        state = stage_labels[0]
    elif len(stage_labels) == 0:
        state = "hygiene-conflict"
    else:
        state = "hygiene-conflict"

    return {
        "number": item["number"],
        "kind": kind,
        "title": item["title"],
        "url": item.get("url", ""),
        "state": state,
        "stage_labels": stage_labels,
        "blocked": "blocked" in labels,
        "needs_karl": "needs:karl" in labels,
        "hygiene_conflict": state == "hygiene-conflict",
        "conflict_detail": (
            f"{len(stage_labels)} stage:* labels present" if state == "hygiene-conflict" else None
        ),
    }


def fetch_items(repo: str | None) -> list[dict]:
    repo_args = ["--repo", repo] if repo else []
    fields = "number,title,labels,url"
    issues = _gh_json(["issue", "list", "--state", "open", "--label", "ai-task", "--json", fields, "-L", "200", *repo_args])
    prs = _gh_json(["pr", "list", "--state", "open", "--label", "ai-task", "--json", fields, "-L", "200", *repo_args])
    return [compute_state(i, "issue") for i in issues] + [compute_state(p, "PR") for p in prs]


def build_store(repo: str, items: list[dict]) -> dict:
    conflicts = [i for i in items if i["hygiene_conflict"]]
    return {
        "schema_version": SCHEMA_VERSION,
        "repo": repo,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "items": items,
        "hygiene_conflicts": [c["number"] for c in conflicts],
    }


def validate_store(store: dict) -> list[str]:
    """Return a list of problems; empty means the store is internally consistent."""
    problems = []
    if store.get("schema_version") != SCHEMA_VERSION:
        problems.append(f"unexpected schema_version: {store.get('schema_version')!r}")
    seen = set()
    for item in store.get("items", []):
        key = (item.get("kind"), item.get("number"))
        if key in seen:
            problems.append(f"duplicate entry for {key}")
        seen.add(key)
        if item.get("hygiene_conflict") and item.get("state") != "hygiene-conflict":
            problems.append(f"item {key} flagged hygiene_conflict but state={item.get('state')!r}")
    return problems


def find_state_store_issue(repo: str | None) -> int | None:
    repo_args = ["--repo", repo] if repo else []
    results = _gh_json([
        "issue", "list", "--state", "open", "--label", "type:state-store",
        "--search", STATE_STORE_TITLE, "--json", "number,title", *repo_args,
    ])
    for item in results:
        if item["title"] == STATE_STORE_TITLE:
            return item["number"]
    return None


def write_state_store(repo: str | None, store: dict, apply: bool) -> None:
    body = (
        f"{STATE_STORE_TITLE}\n\n"
        "Structured pipeline state, computed from current labels each sync run. "
        "See scripts/taskforce_state.py and docs/proposals/2026-09-22-taskforce-comms-off-github.md "
        "(Option 2). Do not edit this issue's body by hand — the next sync overwrites it.\n\n"
        f"```json\n{json.dumps(store, indent=2)}\n```\n"
    )
    if not apply:
        print(body)
        return

    repo_args = ["--repo", repo] if repo else []
    number = find_state_store_issue(repo)
    if number is None:
        try:
            _gh([
                "label", "create", "type:state-store",
                "--description", "Machine-managed state-store issue (EDR-020 precedent); no stage:* hygiene applies",
                "--color", "5319e7", "--force", *repo_args,
            ])
        except subprocess.CalledProcessError:
            pass  # label may already exist under a race, or gh lacks perms here; issue create below still tries
        _gh([
            "issue", "create", "--title", STATE_STORE_TITLE, "--body", body,
            "--label", "ai-task,type:state-store", *repo_args,
        ])
    else:
        _gh(["issue", "edit", str(number), "--body", body, *repo_args])


def cmd_sync(args: argparse.Namespace) -> int:
    try:
        repo = args.repo or _gh_json(["repo", "view", "--json", "nameWithOwner"])["nameWithOwner"]
        items = fetch_items(args.repo)
        store = build_store(repo, items)
    except subprocess.CalledProcessError as exc:
        # Reading current label state can fail for reasons that have nothing
        # to do with the triggering PR/issue (rate limits, a transient API
        # error, a token scope this run happens not to have). This job must
        # never act as a merge gate for something it didn't cause, so log
        # and exit clean rather than turning the check red.
        print(f"state-store sync could not read GitHub state (non-fatal): {exc}", file=sys.stderr)
        if exc.stderr:
            print(exc.stderr, file=sys.stderr)
        return 0

    problems = validate_store(store)
    if problems:
        print("state-store validation FAILED:", file=sys.stderr)
        for p in problems:
            print(f"  - {p}", file=sys.stderr)
        return 1

    try:
        write_state_store(args.repo, store, apply=args.apply)
    except subprocess.CalledProcessError as exc:
        # Best-effort delivery: a permissions/label/API hiccup writing the
        # store issue should never fail the workflow run (and must never
        # attach a red check to an unrelated PR that only triggered this
        # via a label change) -- the computed+validated state above is
        # still printed either way.
        print(f"\nstate-store issue write failed (non-fatal): {exc}", file=sys.stderr)
        if exc.stderr:
            print(exc.stderr, file=sys.stderr)

    conflicts = store["hygiene_conflicts"]
    if conflicts:
        print(f"\n{len(conflicts)} hygiene conflict(s) detected: {conflicts}", file=sys.stderr)
    return 0


def cmd_validate(args: argparse.Namespace) -> int:
    with open(args.path) as f:
        store = json.load(f)
    problems = validate_store(store)
    if problems:
        for p in problems:
            print(f"- {p}")
        return 1
    print("OK")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)

    sync_p = sub.add_parser("sync", help="Compute state from labels and write the state-store issue")
    sync_p.add_argument("--repo", default=None)
    sync_p.add_argument("--apply", action="store_true", help="Actually create/update the issue (default: print only)")
    sync_p.set_defaults(func=cmd_sync)

    validate_p = sub.add_parser("validate", help="Validate a saved state-store JSON file")
    validate_p.add_argument("path")
    validate_p.set_defaults(func=cmd_validate)

    args = parser.parse_args()
    return args.func(args)


if __name__ == "__main__":
    sys.exit(main())
