# AI Task Force — Agent Rules

You are joining Karl's AI Task Force. This one file is everything you need.
GitHub is the only source of truth: issues are the task queue, labels are the
state machine, pull requests carry the work, reviews carry the findings.
There is no separate dashboard, database, or registration step.

This repo (`wintersoperations-site`) is an **opted-in member** of the task
force — same rules as the coordinator repo, `karlwint/AI_Task_Force-Private`.
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

| Label | Meaning |
|---|---|
| `ai-task` | Opt-in marker. Only items with this label are in the pipeline. |
| `stage:plan` | Being discussed/designed. The dispatcher ignores it. |
| `stage:build` | Ready for a builder. Applying this label triggers dispatch. |
| `stage:review` | PR awaiting independent review. Triggers reviewer dispatch. |
| `stage:ready` | Independently approved. Karl merges. |
| `blocked` | Needs intervention; the sweep or a human must act. |
| `needs:karl` | High-risk decision reserved for Karl. |
| `type:auto-maintenance` | Low-risk fix the hourly sweep/dispatcher may advance without Karl. |
| `round:1` | Initial auto-maintenance build attempt. |
| `round:2` | One review-feedback/rework attempt; another failure escalates to Karl. |
| `agent:<name>` | Who is executing. Set by the dispatcher or as a manual pin. |
| `reviewer:<name>` | Who was asked to review. Set by the dispatcher. |

One `stage:*` label per item. Auto-maintenance items must have exactly one `round:*` label.

## Auto-maintenance

Hourly monitoring may create or advance quick, safe fixes without Karl. Use this only for low-risk, reversible work: lint/format, docs cleanup, broken links, small test failures, obvious import/path errors, stale queue or handoff cleanup, and narrow UI polish that does not change behavior.

Escalate immediately with `needs:karl` for auth, secrets, production or live network impact, architecture direction, deleting modules/files, unclear product behavior, conflicting AI opinions, or anything outside the issue scope.

Auto-maintenance gets two total rounds:
1. `round:1` - assigned agent makes the initial fix.
2. `round:2` - same executor addresses review/CI feedback once.
3. Any further changes-requested result stops the loop: apply `blocked` + `needs:karl`, leave the item for Karl, and do not re-dispatch another AI.

Every auto-maintenance issue or PR comment that transfers work must use this header so routing and humans can recognize it:

```md
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

## Hard rules

1. **Never approve your own work.** If you authored the commits, you may not
   approve the PR. The dispatcher never assigns you to review your own PR and
   ignores self-approvals; branch protection backs this up. Karl can override
   only by explicitly saying so on that PR.
2. **Stick to the requested scope.** Implement exactly what the issue asks.
   No extra features, refactors, or "while I was here" changes unless a
   review finding requires them.
3. **High-risk work waits for Karl.** Force-pushes, secret handling,
   production actions, destructive operations, or unclear scope: apply
   `needs:karl` and stop.
4. **Never push directly to a repo's default branch.** Not for scaffolding,
   not for "just setup," not because a task felt small, not because no PR
   existed yet to attach to. Every change, in every opted-in repo, goes:
   branch → commit → PR → independent review → Karl merges. This applies to
   every agent identity and every opted-in repo (root `.ai-task-force.toml`),
   not just the coordinator repo. If you're about to push new commits of
   your own to whatever the repo's default branch is called (e.g. running
   `git push origin main`): stop.
5. **Never merge anything without Karl's explicit, per-item permission.**
   Not a PR, not a branch, not your own work, not another agent's.
   `stage:ready` means "independently approved and waiting on Karl," not
   "cleared to merge." Reaching `stage:ready` is not permission. An
   approving review is not permission. Green CI is not permission. Silence
   is not permission. Only Karl merging it himself, or Karl explicitly
   saying "merge this" on that specific issue/PR, is permission.
6. **Evidence in the PR.** State what you validated (tests run, commands,
   output) in the PR body or a comment. If validation failed, say so plainly.
7. **One writer per branch.** Don't push to a branch another agent is
   actively working unless the labels hand it to you.
8. **Headers and labels are routing controls.** If the comment header,
   `ai-task`, `stage:*`, `agent:*`, `reviewer:*`, `type:*`, or `round:*`
   labels are wrong, fix those first. Work that cannot be routed correctly
   should be `blocked` + `needs:karl`, not improvised.

## Task Force Ninja (cross-repo presence)

The force has a face: **Task Force Ninja**. He lives in the coordinator repo
(`karlwint/AI_Task_Force-Private`, under `ninja/`) and jumps into any
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
https://github.com/karlwint/wintersoperations-site/issues/new?title=<url-encoded title>&body=<url-encoded body>&labels=ai-task,stage:build
```

That URL is a complete, valid contribution — a chat-only AI kicks off real
work with one click from Karl.

## Executing a build task

1. Read the issue. The issue is the whole scope.
2. Branch: `taskforce/issue-<N>`. Never push to the default branch itself
   — see hard rule 4.
3. Implement, validate (run the test suite if one exists).
4. Open a PR: body contains `Closes #<N>` plus validation evidence.
   Apply labels `ai-task`, `stage:review`, `agent:<your-name>`.
5. Do not merge. Do not review or approve your own PR. Reaching
   `stage:ready` is not permission to merge — see hard rule 5.

## Executing a review task

1. You are reviewing work you did not author. Read the linked issue first.
2. Check: does the diff do exactly what the issue asked — no more, no less?
   Is it correct? Is there validation evidence?
3. Submit a **real GitHub review**: approve, or request changes with
   concrete, actionable findings. Comments alone don't advance the pipeline.
   An approval is a verdict on the diff, not permission to merge it — only
   Karl merges (hard rule 5).
4. Flag scope creep as a finding even if the extra code is good.

## Handoff notes

Labels and PR state carry role, status, and commit identity — don't repeat
them. When handing off, one short comment is enough:

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
