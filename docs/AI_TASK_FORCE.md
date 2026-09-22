# AI_Task_Force

Canonical, provider-neutral rules for every repo onboarded to the AI Task Force. This file must be byte-identical across all onboarded repos. It applies to any AI working in an onboarded repo: Claude, Grok, ChatGPT, Codex, Copilot, or otherwise.

If a repo-specific adapter file, for example `CLAUDE.md`, ever conflicts with this file, this file wins. Re-pull it from `AI_Task_Force-Private` rather than editing around the discrepancy.

## Karl is central

Karl is the final decision-maker across every onboarded repo. AIs are advisors and builders. No AI force-pushes or takes a high-risk action without Karl's explicit approval on that turn. Karl granted standing merge permission on 2026-09-06 (EDR-017): an agent may merge unilaterally when a Full-grade independent review exists on the PR's current head, the PR carries neither `needs:karl` nor `blocked`, CI is green where it runs, and the PR is not a draft. A Limited- or None-grade review does not unlock agent merge — that waits for Karl.

## Independence before escalation

Attempt to complete assigned work before asking Karl to act. Escalate only when
Karl's decision, credentials, physical access, or explicit approval is genuinely
required. When requesting an action, provide a ready-to-run Python script first;
use PowerShell only when Python is unsuitable.

## Timestamp rule

Every AI reply to Karl should include Central Time when it is acting as part of a formal Task Force handoff or status report:

```text
[YYYY-MM-DD H:MM AM/PM CDT]
```

Use `CDT` April through October and `CST` November through March.

## Protected files

AIs may not modify AI Task Force infrastructure files without Karl's explicit written approval on that turn.

The test is what a file does, not what it is made of: **if it tells an agent
what it may do, it is protected. If it only records what happened, it is not.**
Markdown is not a safe-harbour — a skill file is prose, and it can hand an
agent permission to act.

- `docs/AI_TASK_FORCE.md` (this file)
- `.ai-task-force.toml`
- `AGENTS.md` and `docs/DECISIONS.md`, in the coordinator repo
- `.github/workflows/*` and `.github/taskforce/agents.json`, in the coordinator repo
- `.github/taskforce/RUNBOOK.md`, in the coordinator repo
- `.github/taskforce/IDENTITIES.md`, in the coordinator repo — decides which account each agent posts as, and therefore whose approval counts; a wrong identity map hands review authority to the wrong party
- `CLAUDE.md` — the file that points a session at the rules in the first place
- everything under `.claude/skills/` — a skill can authorise an agent to act
  without asking Karl first, so it grants autonomy as directly as a rule does

That list is examples, not the boundary: a new file that instructs agent
behaviour is protected from the moment it exists. Where it is genuinely
unclear whether a file governs or merely reports, treat it as governance and
say so on the PR.

Deliberately not protected: `.github/taskforce/SYNC_STATE.md`, which every
sync regenerates and which can mislead but cannot authorise.

This applies even when an AI believes the change is an improvement. Propose changes via issue or PR comment unless Karl has explicitly directed the protected-file update.

## Workflow states and labels

GitHub is the source of truth. Issues are the task queue, labels are the state machine, pull requests carry work, and reviews/comments carry findings.

Use exactly one primary `stage:*` label per ordinary work issue or PR (`type:state-store` issues are exempt — no `stage:*`):

- `stage:plan` - being discussed or designed; dispatcher ignores it.
- `stage:build` - ready for a builder; dispatcher may assign an executor.
- `stage:review` - ready for independent review; dispatcher may assign a reviewer.
- `stage:ready` - independently approved. Merges on a Full-grade independent review, no `needs:karl`/`blocked`, green CI, not draft (EDR-017); Limited/None grade waits for Karl instead.
- `stage:delivered` - non-PR deliverable (video, document, design, research writeup) complete, with final links or evidence posted in the issue; waiting on Karl's sign-off. Use this instead of `stage:review` when there is no PR for a reviewer to approve.
- `blocked` - blocked on an external dependency or decision; pairs with another state label when useful.

Required routing labels:

- `ai-task` - opt-in marker. Items without this label are outside the pipeline.
- `needs:karl` - high-risk or ambiguous decision reserved for Karl.
- `agent:<name>` - active executor, for example `agent:codex`.
- `reviewer:<name>` - requested reviewer, for example `reviewer:grok`.
- `type:auto-maintenance` - low-risk maintenance that monitoring may advance automatically.
- `type:state-store` - machine-managed coordination/state-store issue (not ordinary work). Keeps `ai-task` but carries no `stage:*`; exempt from stage hygiene and work dispatch. Example: issue #290. See EDR-020. If a repo maintains one for its own `ai-task` items, prefer reading it over listing every issue individually for a same-repo status check — see `AGENTS.md`'s "Repo-level state-store" section for the freshness/fallback rules.
- `round:1` / `round:2` - auto-maintenance attempt count.
- `locked` - a builder is actively pushing to this branch right now. Check it before you start; never push while it is on unless you set it.
- `stage:tracked-by-pr` - set automatically on an issue the moment its implementing PR opens (EDR-014). The issue's own stage is frozen from then on; the PR's `stage:*` is the single source of truth.
- `quota:waiting` - the assigned agent's subscription hit a usage/capacity limit, so the item is parked rather than reassigned. `taskforce-quota-retry.yml` re-queues it automatically; the executor is unchanged. Not a blocker and not a finding about the work (EDR-018).
- `fallback:<name>` - routing-only: who to invoke for this build/rework attempt after a failed invocation. Not the executor of record — do not use it for independence or merge authority. Cleared when a push lands and `agent:` is reconciled (issue #326).

Legacy `status-*` labels are not canonical for the current GitHub-native pipeline. If a repo still maps workflow states to `status-*`, update its `.ai-task-force.toml` before relying on automation.

## Handoff comments

For normal task handoff, keep the comment short and explicit:

```markdown
Done: <what changed and what was validated>. Next: <who should do what>.
```

For auto-maintenance, use the routable header exactly:

```markdown
## AI Task Force Handoff
Owner: <agent-name>
Round: <1/2 or 2/2>
Type: auto-maintenance
Status: <ready|rework|escalated>

### Task
<short exact task>

### Scope
<allowed files or allowed change type>

### Acceptance
<how to know it is done>

### Escalate If
<conditions that send it to Karl>
```

## Single-writer rule

Only one Builder writes to a PR branch at a time. Reviewers and Engineers may comment in parallel but do not push to the Builder branch unless Karl or the latest handoff explicitly assigns that role.

## Check for overlapping work before starting

Before opening a new PR, or picking up stale/idle work in an area another
PR already touches, check whether the goal has already shipped on `main`
since that work started -- not just whether the branch merges cleanly.
Branches drift silently: `main` can independently grow a better solution
to the same problem while an older PR sits open, and a clean git merge
will not warn you that you're about to regress or duplicate already-shipped
work. Read the diff against current `main`, not just the PR/issue
description, before building on top of or reviving anything more than a
day or two old.

## Single-AI fallback

The workflow must function when only one AI provider is available. Preferred provider labels are routing guidance, not hard dependencies. If Claude, Grok, Copilot, or another provider is unavailable, Codex/ChatGPT may cover builder, engineer, reviewer, and coordinator work when all of these are true:

- Karl has explicitly assigned Codex/ChatGPT or says the other providers are unavailable.
- The work is within issue or PR scope.
- The work is non-destructive and does not touch live systems or secrets.
- The action does not require approving Codex's own PR.

Codex may post advisory reviews and fix scoped issues. Karl remains merge authority and final approval authority when independent binding review is not available.

## Safety gates and risk-based approval

Routine safe work may proceed without a separate approval comment when all of the following hold:

- the repo has `.ai-task-force.toml` at its root,
- the item has `ai-task` and exactly one valid `stage:*` label,
- the latest handoff assigns an allowed role and provider, or assigns `any`,
- PR work references the current head when relevant,
- branch ownership is exclusive for Builder work,
- the action is within issue or PR scope,
- the work is non-destructive and does not touch live systems or secrets,
- the same handoff and SHA have not already been executed.

Karl's explicit approval is required before any of:

- merges,
- force-pushes,
- production or live-system actions,
- secret handling,
- destructive operations,
- large rewrites,
- product-direction changes,
- protected-file edits unless approved on that turn,
- unclear scope, ownership, state, provider, SHA, or validation.

If ownership, scope, safety, or validation is unclear, apply `blocked` and/or `needs:karl`, comment exactly what is missing, and stop.

## Source of truth

This file is maintained in `WintCom-Solutions/AI_Task_Force-Private` at `docs/AI_TASK_FORCE.md`. Every onboarded repo keeps a synced copy at the same path. `AGENTS.md` in `AI_Task_Force-Private` is the fuller operational guide for dispatcher behavior and setup details, and is the only normative rules file there — where this file and `AGENTS.md` disagree inside the coordinator repo, `AGENTS.md` wins and this file should be corrected to match.

`docs/AI_HANDOFF_PROTOCOL.md`, `docs/AI_QUALITY_STANDARDS.md`, and `docs/AI_COORDINATION_OPERATING_MODEL.md` were removed in EDR-006; their content lives in `AGENTS.md` now. If your repo still carries a copy of any of them, delete it rather than following it.

<!-- Smoke test: builder App auth verified 2026-08-22 (issue #160). -->
