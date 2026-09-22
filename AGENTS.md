# AI Task Force — Agent Rules

`docs/AI_TASK_FORCE.md` is authoritative for labels, hard rules, and the
handoff format — it wins if anything here ever conflicts with it. This file
covers only repo-specific operational detail: readiness tiers, this repo's
review loop, Task Force Ninja, starting work from chat, and how to execute
build/review tasks here.

GitHub is the only source of truth: issues are the task queue, labels are the
state machine, pull requests carry the work, reviews carry the findings.
There is no separate dashboard, database, or registration step.

This repo (`wintersoperations-site`) is an **opted-in member** of the task
force — same rules as the coordinator repo, `WintCom-Solutions/AI_Task_Force-Private`.
See `.ai-task-force.toml` for the opt-in marker Task Force Ninja checks for.

## Readiness check (run this first, report the result)

Test what **this specific interface** can do, then report exactly one of:

- **Tier A — headless**: I can read and write GitHub directly (API, CLI, or
  native integration). I can be dispatched automatically.
- **Tier B — connected chat**: I can fetch URLs and/or call the GitHub API
  from chat. I can create issues, read diffs, and post comments myself.
- **Tier C — chat only**: I have no tools. I participate by producing text
  and prefilled GitHub URLs that Karl clicks.

To test: try fetching the raw URL of this file; try listing open issues
labeled `ai-task`. If either fails, say precisely what failed — a precise
capability blocker is a successful onboarding result.

Every tier is useful. Tier C agents can still fully start work (see below).

## The loop

```
issue (ai-task + stage:build)
  → dispatcher wakes a capable builder agent
  → builder opens a PR ("Closes #N", labels: ai-task, stage:review, agent:<name>)
  → dispatcher wakes a DIFFERENT agent to review
  → review approved  → stage:ready → Karl merges
  → changes requested → stage:build → original builder fixes → back to review
```

The dispatcher is `.github/workflows/dispatch.yml`. The roster of agents and
how each is invoked is `.github/taskforce/agents.json`. A scheduled sweep
(`task-force-sweep-hourly-monitor.yml`) rescues stalled or mislabeled items —
progress is judged by visible evidence (commits, comments, reviews), never by
heartbeats.

## Labels

See `docs/AI_TASK_FORCE.md` for the canonical label set (`stage:*`, `ai-task`,
`needs:karl`, `agent:<name>`, `reviewer:<name>`, `round:*`, etc.) and label
hygiene rules.

## Auto-maintenance

Hourly monitoring may create or advance quick, safe fixes without Karl. Use this only for low-risk, reversible work: lint/format, docs cleanup, broken links, small test failures, obvious import/path errors, stale queue or handoff cleanup, and narrow UI polish that does not change behavior.

Escalate immediately with `needs:karl` for auth, secrets, production or live network impact, architecture direction, deleting modules/files, unclear product behavior, conflicting AI opinions, or anything outside the issue scope.

Auto-maintenance gets two total rounds:
1. `round:1` - assigned agent makes the initial fix.
2. `round:2` - same executor addresses review/CI feedback once.
3. Any further changes-requested result stops the loop: apply `blocked` + `needs:karl`, leave the item for Karl, and do not re-dispatch another AI.

Every auto-maintenance issue or PR comment that transfers work must use the
canonical `## AI Task Force Handoff` header — see `docs/AI_TASK_FORCE.md`
for the exact format.

## Hard rules

See `docs/AI_TASK_FORCE.md` for the canonical hard rules and the merge
condition (EDR-017: an agent may merge unilaterally only when a Full-grade
independent review exists on the PR's current head, it carries neither
`needs:karl` nor `blocked`, CI is green, and it's not a draft — otherwise
merging waits for Karl). They apply here unchanged.

## Task Force Ninja (cross-repo presence)

The force has a face: **Task Force Ninja**. He lives in the coordinator repo
(`WintCom-Solutions/AI_Task_Force-Private`, under `ninja/`) and jumps into any
opted-in repo — this one included, via the root `.ai-task-force.toml` here.

- Persona / voice: `ninja/PERSONA.md` in the coordinator repo
- Jump steps: `ninja/JUMP.md` in the coordinator repo
- Overview: `ninja/README.md` in the coordinator repo

When you start work on this repo, post the short presence block once (see
`JUMP.md`). Same hard rules as above — the ninja does not override labels.

## Starting work from a chat conversation

When Karl talks through a feature with you and you agree on scope, end the
conversation by creating the issue:

- **Tier A/B**: create it yourself with labels `ai-task` and `stage:build`
  (or `stage:plan` if design is still open). Title = imperative summary.
  Body = scope, acceptance criteria, out-of-scope notes.
- **Tier C**: output a prefilled URL for Karl to click:

```
https://github.com/WintCom-Solutions/wintersoperations-site/issues/new?title=<url-encoded title>&body=<url-encoded body>&labels=ai-task,stage:build
```

That URL is a complete, valid contribution — a chat-only AI kicks off real
work with one click from Karl.

## Executing a build task

1. Read the issue. The issue is the whole scope.
2. Branch: `taskforce/issue-<N>`. Never push to the default branch itself
   — see the single-writer rule in `docs/AI_TASK_FORCE.md`.
3. Implement, validate (run the test suite if one exists).
4. Open a PR: body contains `Closes #<N>` plus validation evidence.
   Apply labels `ai-task`, `stage:review`, `agent:<your-name>`.
5. Do not merge. Do not review or approve your own PR. Reaching
   `stage:ready` is not permission to merge by itself — see the EDR-017
   merge condition in `docs/AI_TASK_FORCE.md`.

## Executing a review task

1. You are reviewing work you did not author. Read the linked issue first.
2. Check: does the diff do exactly what the issue asked — no more, no less?
   Is it correct? Is there validation evidence?
3. Submit a **real GitHub review**: approve, or request changes with
   concrete, actionable findings. Comments alone don't advance the pipeline.
   An approval is a verdict on the diff, not permission to merge it — see
   the EDR-017 merge condition in `docs/AI_TASK_FORCE.md`.
4. Flag scope creep as a finding even if the extra code is good.

## Handoff notes

Labels and PR state carry role, status, and commit identity — don't repeat
them. When handing off, one short comment is enough (canonical format in
`docs/AI_TASK_FORCE.md`):

```
Done: <what/evidence>. Next: <what the next agent or Karl should do>.
```

## If you are blocked

Apply `blocked`, comment one sentence saying exactly what is missing
(access, credentials, ambiguity, rate limit), and stop. A precise blocker
is a good outcome; silent stalling is the only bad one.

---
Maintainer setup and the end-to-end proof runbook: `.github/taskforce/RUNBOOK.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
