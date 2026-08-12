#!/usr/bin/env python3
"""Ask Grok (xAI API) for a binding review verdict on a PR diff.

Reads AGENTS.md's reviewer rules plus the PR diff and linked issue, asks for
a structured verdict via xAI's json_schema response_format, and writes
{"state": "approve"|"request_changes", "body": "..."} to --out. The workflow
step that calls this script posts the verdict itself via `gh pr review` —
this script only produces the judgment.
"""
import argparse
import json
import sys
import urllib.request

API_URL = "https://api.x.ai/v1/chat/completions"

SCHEMA = {
    "name": "review_verdict",
    "strict": True,
    "schema": {
        "type": "object",
        "properties": {
            "state": {"type": "string", "enum": ["approve", "request_changes"]},
            "body": {"type": "string"},
        },
        "required": ["state", "body"],
        "additionalProperties": False,
    },
}


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--diff", required=True)
    p.add_argument("--issue", required=True)
    p.add_argument("--agents-md", required=True)
    p.add_argument("--out", required=True)
    p.add_argument("--model", default="grok-4.3")
    p.add_argument("--api-key-env", default="XAI_API_KEY")
    args = p.parse_args()

    import os

    api_key = os.environ.get(args.api_key_env)
    if not api_key:
        sys.exit(f"{args.api_key_env} is not set")

    diff = open(args.diff).read()
    issue = open(args.issue).read()
    agents_md = open(args.agents_md).read()

    # Keep the diff bounded; a huge diff burns tokens without adding signal
    # a bounded task-force PR should ever need.
    if len(diff) > 60000:
        diff = diff[:60000] + "\n... (diff truncated)"

    system_prompt = (
        "You are an independent code reviewer in an AI Task Force pipeline. "
        "You did not author this PR. Follow the reviewer rules in AGENTS.md "
        "exactly: check correctness, validation evidence, and scope discipline "
        "(flag anything beyond the linked issue's scope, even if the code is "
        "good). Respond with 'approve' only if the PR is correct, in scope, "
        "and has real validation evidence. Otherwise respond with "
        "'request_changes' and give concrete, actionable findings — comments "
        "alone do not count, you must pick one of the two states."
    )
    user_prompt = (
        f"# AGENTS.md (reviewer rules)\n{agents_md}\n\n"
        f"# Linked issue\n{issue}\n\n"
        f"# PR diff\n```diff\n{diff}\n```"
    )

    payload = {
        "model": args.model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "response_format": {"type": "json_schema", "json_schema": SCHEMA},
        "temperature": 0.2,
    }

    req = urllib.request.Request(
        API_URL,
        data=json.dumps(payload).encode(),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=180) as resp:
        result = json.loads(resp.read())

    content = result["choices"][0]["message"]["content"]
    verdict = json.loads(content)
    if verdict["state"] not in ("approve", "request_changes"):
        sys.exit(f"unexpected state: {verdict['state']!r}")

    with open(args.out, "w") as f:
        json.dump(verdict, f)


if __name__ == "__main__":
    main()
