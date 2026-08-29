# Task Force Proof Runbook — wintersoperations-site

Maintainer checklist for this repo's copy of the GitHub-native AI Task Force
pipeline. Adapted from `karlwint/AI_Task_Force-Private`'s runbook; see that
repo for the full multi-agent background.

## 1. One-time setup

1. This pipeline is on `main` as of the onboarding commit. Workflows for
   `issues` and `pull_request` events only run from the default branch.
2. Run **Task Force Setup** from the Actions tab. It creates the canonical
   labels and reports secret readiness.
3. Configure secrets (Settings -> Secrets and variables -> Actions) as needed:
   - `CLAUDE_CODE_OAUTH_TOKEN` - subscription-based auth for Claude runs.
   - `TASKFORCE_BUILDER_APP_PRIVATE_KEY` - GitHub App private key for build-stage
     actions that need to open/push PRs. Every build/rework job mints its own
     short-lived installation token from this via `actions/create-github-app-token@v1`
     (app-id `4679699`); no personal PAT is needed for the builder identity.
   - `TASKFORCE_REVIEWER_PAT` - separate identity for binding review verdicts. Must
     authenticate as a GitHub user or App identity different from the PR author.
   - `XAI_API_KEY` - required only if Grok review jobs are enabled.
   - `CODEX_AUTH_JSON` - required only if Codex review jobs are enabled.
4. Settings -> Actions -> General: enable **Allow GitHub Actions to create and
   approve pull requests** if automated PR/review jobs are expected to run.
5. Keep branch protection on `main` with Karl as merge authority.

## 2. Operating model

Same canonical labels and stage machine as the coordinator repo — see
`AGENTS.md` at this repo's root. Legacy `status-*` labels are not canonical.

## 3. Provider availability

Claude, Copilot, Grok, and Codex may be available at different times; the
workflow must still move when only one capable provider is up. See
`.github/taskforce/agents.json` for the current roster and capabilities.

## 4. Binding review identity

GitHub enforces PR approval by authenticated account, not by Task Force
labels. A review only counts as binding when the token/App posting it
belongs to a different GitHub identity than the PR author. Until
`TASKFORCE_REVIEWER_PAT` (or an equivalent separate identity) is configured
here, AI reviews are advisory only and `stage:ready` requires Karl's
personal approval/merge decision.

## 5. Known edges

- Bot-authored PRs may need manual workflow approval without a PAT.
- Anything stalled in `stage:build` or `stage:review` should be marked
  `blocked` with a clear comment explaining what is missing.
- Auto-maintenance gets only two rounds: `round:1`, then `round:2`, then
  `blocked` + `needs:karl`.
