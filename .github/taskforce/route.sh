#!/usr/bin/env bash
# AI Task Force dispatcher routing. Reads the triggering event, decides what
# should happen (build / review / rework / ready / denied / none) and which
# agent does it, and writes the decision to GITHUB_OUTPUT for the invoke jobs.
#
# Expected env (set by dispatch.yml):
#   GH_TOKEN, REPO, EVENT, GH_ACTION, LABEL, REVIEW_STATE, REVIEW_AUTHOR,
#   REVIEW_BODY, REVIEW_COMMIT, ISSUE_NUMBER, PR_NUMBER, PR_BODY, PR_DRAFT,
#   COMMENT_BODY, COMMENT_AUTHOR, COMMENT_IS_PR
set -euo pipefail

# Karl's GitHub login. Hardcoded, not config, matching every other @karlwint
# reference in this file — a comment from any other identity (including our
# own bot identities) is never treated as Karl approval/denial. See AGENTS.md
# "Karl approval via comment".
KARL_LOGIN="karlwint"

# Classify a PR comment body as approve / deny / ambiguous / none. Only ever
# called after the caller has already confirmed the comment author is Karl.
#   none      - no recognizable verdict language at all (the common case:
#               most comments aren't approval attempts).
#   ambiguous - both approve and deny signals present, or the phrasing is too
#               unanchored to trust either way. Never treated as a decision.
classify_comment() { # $1 = comment body
  local body="$1"
  local lower approve=false deny=false

  # Header form: "## Review status: APPROVED" / "## Karl Decision: DENIED",
  # anchored to the start of a line, case-insensitive. Covers every real
  # example used so far (PRs #155, #167, #169).
  if printf '%s\n' "$body" | grep -qiE '^##[[:space:]]*(review status|karl decision)[[:space:]]*:?[[:space:]]*(APPROVED)([[:space:]]|$)'; then
    approve=true
  fi
  if printf '%s\n' "$body" | grep -qiE '^##[[:space:]]*(review status|karl decision)[[:space:]]*:?[[:space:]]*(BLOCKED|DENIED)([[:space:]]|$)'; then
    deny=true
  fi

  # Plain-language check, always run (not just when no header matched) so a
  # header and a contradicting plain line in the same comment are correctly
  # caught as ambiguous rather than the header silently winning. Anchored to
  # a whole trimmed line (not a substring) to avoid false positives like
  # "I haven't approved this yet" or "denied access errors".
  lower=$(printf '%s' "$body" | tr '[:upper:]' '[:lower:]')
  while IFS= read -r line; do
    line=$(printf '%s' "$line" | sed -E 's/^[[:space:]]+//; s/[[:space:]]+$//; s/[.!]+$//')
    case "$line" in
      "merge this"|approved) approve=true ;;
      denied|"don't merge"|"do not merge"|"not approved") deny=true ;;
    esac
  done <<< "$lower"

  if $approve && $deny; then
    echo "ambiguous"
  elif $approve; then
    echo "approve"
  elif $deny; then
    echo "deny"
  else
    echo "none"
  fi
}

# Which agent posted a review, read from the machine-readable marker every
# reviewer job appends to its review body:
#
#     <!-- taskforce-reviewer: grok -->
#
# This exists because GitHub login is NOT enough to tell our agents apart:
# claude-code, grok and codex all post their binding reviews through the one
# TASKFORCE_REVIEWER_PAT identity. Matching that shared login against per-agent
# `login_hints` could never match, so the self-approval guard below silently
# never fired. The marker is the only signal that distinguishes them.
#
# Returns empty for reviews with no marker -- a human, Karl, or a native
# provider review. Those still fall back to the login_hints check.
reviewer_marker() { # $1 = review body -> agent name, or empty. NEVER fails.
  # Lowercase the whole body first so the extraction is a plain literal match
  # regardless of how the marker was cased, and so `grep -i` can't match a
  # spelling the sed then fails to strip.
  #
  # The trailing `|| true` is load-bearing: route.sh runs under
  # `set -euo pipefail`, and grep exits 1 when there is no marker. Without it,
  # `MARKER=$(reviewer_marker ...)` aborts the whole script on any markerless
  # review -- a human's, or Karl's -- so the login_hints fallback below would
  # never run and routing would fail outright. Caught by review on PR #189.
  printf '%s' "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | grep -oE '<!--[[:space:]]*taskforce-reviewer:[[:space:]]*[a-z0-9._-]+[[:space:]]*-->' \
    | head -n1 \
    | sed -E 's/.*taskforce-reviewer:[[:space:]]*//; s/[[:space:]]*-->.*//' \
    || true
}

REGISTRY=".github/taskforce/agents.json"

out() { echo "$1=$2" >> "$GITHUB_OUTPUT"; }

labels_of() { # $1 = issue|pr, $2 = number
  gh "$1" view "$2" --repo "$REPO" --json labels --jq '[.labels[].name]'
}

has_label() { # $1 = labels json array, $2 = label
  echo "$1" | jq -e --arg l "$2" 'index($l) != null' > /dev/null
}

# Branch-write lock (see AGENTS.md hard rule 7 and .github/workflows/dispatch.yml).
# Refuses to dispatch a build/rework invocation onto an item another
# agent/session already has locked, instead of racing it. Only build/rework
# push commits; review never does, so review is never gated by this.
skip_if_locked() { # $1 = issue|pr, $2 = number, $3 = labels json array -> 0=locked(skip), 1=free
  if has_label "$3" "locked"; then
    gh "$1" comment "$2" --repo "$REPO" --body \
      "Skipping dispatch: this item is currently \`locked\` (another agent/session is actively working it). Remove the label if this is stale." || true
    return 0
  fi
  return 1
}

# Create a routing label if the repo doesn't have it yet, then it's safe to
# apply. `gh <kind> edit --add-label` fails outright on a label that doesn't
# exist, and every call site swallows that with `|| true`, so a missing label
# silently means "this item never got routed". taskforce-setup.yml seeds the
# known set, but it is a manual one-time workflow: any agent added to
# agents.json afterwards has no labels until someone remembers to re-run it.
# Confirmed live on PR #189 -- claude-code-reviewer was dispatched and reviewed,
# but its reviewer: label never landed because setup had not been re-run.
ensure_label() { # $1 = label, $2 = color, $3 = description
  gh label create "$1" --repo "$REPO" --color "$2" --description "$3" >/dev/null 2>&1 || true
}

label_value() { # $1 = labels json array, $2 = prefix -> value after prefix
  echo "$1" | jq -r --arg p "$2" 'map(select(startswith($p)))[0] // "" | ltrimstr($p)'
}

round_value() { # $1 = labels json array -> 1, 2, or empty
  echo "$1" | jq -r 'map(select(startswith("round:")))[0] // "" | ltrimstr("round:")'
}

handoff_body() { # $1 owner, $2 round, $3 status, $4 task, $5 scope, $6 acceptance, $7 escalate
  cat <<EOF
## AI Task Force Handoff
Owner: $1
Round: $2
Type: auto-maintenance
Status: $3

### Task
$4

### Scope
$5

### Acceptance
$6

### Escalate If
$7
EOF
}

pick_agent() { # $1 = capability, $2 = excluded agent name (optional)
  jq -r --arg cap "$1" --arg ex "${2:-}" \
    '.agents[] | select(.enabled and (.capabilities | index($cap)) and .name != $ex) | .name' \
    "$REGISTRY" | head -n1
}

# Agents that have already posted a review on the PR's CURRENT head commit,
# read from their markers. Re-reviewing code an agent has already ruled on
# produces a duplicate verdict, a duplicate "waiting on your merge" comment,
# and a duplicate invocation charge -- and the pipeline re-enters review on
# every rework round, so this compounds fast. Reviews on older commits are
# deliberately NOT counted: new commits genuinely deserve a fresh look.
reviewed_at_head() { # $1 = PR number -> JSON array of agent names
  local head
  head=$(gh pr view "$1" --repo "$REPO" --json headRefOid --jq '.headRefOid' 2>/dev/null) || { echo '[]'; return 0; }
  [ -z "$head" ] && { echo '[]'; return 0; }
  gh api --paginate --slurp "repos/$REPO/pulls/$1/reviews" 2>/dev/null \
    | jq -c --arg h "$head" '
        [ .[][] | select(.commit_id == $h) | .body // "" ]
        | map(ascii_downcase)
        | map(scan("taskforce-reviewer:[[:space:]]*([a-z0-9._-]+)"))
        | flatten | unique' 2>/dev/null || echo '[]'
}

reviewer_agents() { # $1 = excluded agent name (optional) -> JSON array of every enabled reviewer, binding or advisory
  # claude-code-reviewer (EDR-007) is special-cased: it exists solely to cover
  # the one gap the plain name-based self-exclusion below can't — claude-code
  # reviewing a PR it built itself. It's excluded here unless $ex is
  # literally "claude-code", so it never doubles up as an extra reviewer
  # alongside claude-code on PRs built by other providers.
  jq -c --arg ex "${1:-}" \
    '[.agents[] | select(.enabled and (.capabilities | index("review")) and .name != $ex and (.name != "claude-code-reviewer" or $ex == "claude-code")) | .name]' \
    "$REGISTRY"
}

agent_mode() { # $1 = agent name
  jq -r --arg n "$1" '.agents[] | select(.name == $n) | .mode // ""' "$REGISTRY"
}

ACTION="none"; AGENT=""; NUMBER=""; EXECUTOR=""; REVIEWERS="[]"; READY_VIA=""

if [ "$EVENT" = "pull_request" ] && [ "${PR_DRAFT:-false}" = "true" ]; then
  NUMBER="$PR_NUMBER"
  echo "decision: action=$ACTION agent=$AGENT mode= number=$NUMBER executor=$EXECUTOR reviewers=$REVIEWERS"
  out action "$ACTION"
  out agent "$AGENT"
  out mode ""
  out number "$NUMBER"
  out executor "$EXECUTOR"
  out reviewers "$REVIEWERS"
  out ready_via "$READY_VIA"
  out handled "true"
  exit 0
fi

case "$EVENT" in
  issues)
    NUMBER="$ISSUE_NUMBER"
    L=$(labels_of issue "$NUMBER")
    if [ "${LABEL:-}" = "stage:delivered" ] && has_label "$L" "ai-task"; then
      gh issue comment "$NUMBER" --repo "$REPO" --body \
        "@karlwint non-PR deliverable marked \`stage:delivered\` — final artifact evidence should be in this issue. Waiting on your review/sign-off, or move it back to \`stage:build\` / \`stage:plan\` with requested changes." || true
    elif [ "${LABEL:-}" = "stage:build" ] && has_label "$L" "ai-task" \
       && ! skip_if_locked issue "$NUMBER" "$L"; then
      pin=$(label_value "$L" "agent:")
      AGENT="${pin:-$(pick_agent build)}"
      ACTION="build"
      if [ -n "$AGENT" ] && [ -z "$pin" ]; then
        ensure_label "agent:$AGENT" "5319e7" "Executor: $AGENT"
        gh issue edit "$NUMBER" --repo "$REPO" --add-label "agent:$AGENT" || true
      fi
    fi
    ;;

  pull_request)
    NUMBER="$PR_NUMBER"
    L=$(labels_of pr "$NUMBER")

    # Heal PRs opened without labels: inherit from the issue they close.
    # Needed because agent tokens vary in whether their events carry labels.
    if [ "${GH_ACTION:-}" = "opened" ] || [ "${GH_ACTION:-}" = "ready_for_review" ]; then
      ref=$(printf '%s' "${PR_BODY:-}" \
        | grep -oiE '(close[sd]?|fix(e[sd])?|resolve[sd]?) #[0-9]+' \
        | head -n1 | grep -oE '[0-9]+' || true)
      if [ -n "$ref" ] && ! has_label "$L" "ai-task"; then
        IL=$(labels_of issue "$ref" 2>/dev/null || echo '[]')
        if has_label "$IL" "ai-task"; then
          exec_agent=$(label_value "$IL" "agent:")
          gh pr edit "$NUMBER" --repo "$REPO" \
            --add-label "ai-task" --add-label "stage:review" \
            ${exec_agent:+--add-label "agent:$exec_agent"} || true
          L=$(labels_of pr "$NUMBER")
        fi
      fi
    fi

    if has_label "$L" "ai-task"; then
      EXECUTOR=$(label_value "$L" "agent:")
      needs_review=false
      if [ "${LABEL:-}" = "stage:review" ]; then
        needs_review=true
      elif [ "${GH_ACTION:-}" = "synchronize" ]; then
        # New commits landed. An approval only ever applied to the commit it
        # was posted on, so anything that changes code or docs has to be
        # reviewed again -- otherwise a PR can be approved, changed, and merged
        # with approvals that predate the change.
        if has_label "$L" "stage:ready"; then
          # Send it back to review. The relabel fires its own `labeled` event,
          # which drives the fan-out through the normal path -- doing it here
          # too would dispatch the roster twice for one push.
          gh pr edit "$NUMBER" --repo "$REPO" \
            --remove-label "stage:ready" --add-label "stage:review" || true
          gh pr comment "$NUMBER" --repo "$REPO" --body \
            "New commits pushed after approval — returning this PR to \`stage:review\`. The earlier approvals applied to an older commit. Reviewers that already ruled on this new head are not re-dispatched." || true
        elif has_label "$L" "stage:review"; then
          needs_review=true
        fi
      elif [ "${GH_ACTION:-}" != "labeled" ] && has_label "$L" "stage:review" \
           && [ -z "$(label_value "$L" "reviewer:")" ]; then
        needs_review=true
      fi
      if $needs_review; then
        REVIEWERS=$(reviewer_agents "$EXECUTOR")
        # Drop anyone who already ruled on this exact commit. Without this,
        # every return to stage:review re-runs the whole roster over unchanged
        # code and each one approves again.
        DONE_ALREADY=$(reviewed_at_head "$NUMBER")
        REVIEWERS=$(echo "$REVIEWERS" | jq -c --argjson done "$DONE_ALREADY" \
          '[ .[] | select(. as $a | ($done | index($a)) | not) ]')
        if [ "$(echo "$REVIEWERS" | jq -r 'length')" -eq 0 ]; then
          echo "every eligible reviewer has already reviewed this head; not re-dispatching"
          REVIEWERS="[]"
        else
        AGENT=$(echo "$REVIEWERS" | jq -r '.[0] // ""')
        ACTION="review"
        # Fan review out to every enabled reviewer except this PR's executor,
        # not just one. Every reviewer posts a real gh pr review, ending with
        # its own `<!-- taskforce-reviewer: <name> -->` marker so the
        # self-approval guard further down can tell them apart -- they all
        # post through the same TASKFORCE_REVIEWER_PAT identity.
        echo "$REVIEWERS" | jq -r '.[]' | while IFS= read -r r; do
          [ -z "$r" ] && continue
          ensure_label "reviewer:$r" "bfd4f2" "Reviewer: $r"
          gh pr edit "$NUMBER" --repo "$REPO" --add-label "reviewer:$r" || true
        done
        fi
      elif [ "${LABEL:-}" = "stage:build" ] && ! skip_if_locked pr "$NUMBER" "$L"; then
        AGENT="${EXECUTOR:-$(pick_agent build)}"
        ACTION="rework"
      fi
    fi
    ;;

  issue_comment)
    # Approval/denial by plain comment — see AGENTS.md "Karl approval via
    # comment". Only ever acts on comments from Karl himself; every other
    # identity (including our own bot identities) is silently ignored, since
    # most PR comments aren't approval attempts and commenting on every
    # non-match would be noise.
    if [ "${COMMENT_IS_PR:-false}" = "true" ] \
       && [ "$(echo "${COMMENT_AUTHOR:-}" | tr '[:upper:]' '[:lower:]')" = "$KARL_LOGIN" ]; then
      NUMBER="$ISSUE_NUMBER"
      L=$(labels_of pr "$NUMBER")
      if has_label "$L" "ai-task"; then
        verdict=$(classify_comment "${COMMENT_BODY:-}")
        case "$verdict" in
          approve)
            if has_label "$L" "stage:review"; then
              ACTION="ready"
              READY_VIA="comment"
            fi
            ;;
          deny)
            ACTION="denied"
            ;;
          ambiguous|none)
            # No label change. AGENTS.md: ambiguous wording counts as
            # neither approval nor denial — don't guess.
            ;;
        esac
      fi
    fi
    ;;

  pull_request_review)
    NUMBER="$PR_NUMBER"
    L=$(labels_of pr "$NUMBER")
    if has_label "$L" "ai-task"; then
      EXECUTOR=$(label_value "$L" "agent:")
      # Hard rule 1: an approval from the agent that built the PR is a
      # self-approval and never advances the pipeline.
      #
      # Preferred signal is the reviewer marker in the review body, because it
      # names the *agent* rather than the shared PAT identity every agent posts
      # under. Fall back to login_hints only when there's no marker, i.e. a
      # human or native-provider review, where the login IS the identity.
      self=false
      MARKER=$(reviewer_marker "${REVIEW_BODY:-}")
      if [ -n "$EXECUTOR" ] && [ -n "$MARKER" ]; then
        [ "$MARKER" = "$(echo "$EXECUTOR" | tr '[:upper:]' '[:lower:]')" ] && self=true
      elif [ -n "$EXECUTOR" ]; then
        while IFS= read -r hint; do
          [ -z "$hint" ] && continue
          case "$(echo "${REVIEW_AUTHOR:-}" | tr '[:upper:]' '[:lower:]')" in
            *"$hint"*) self=true ;;
          esac
        done < <(jq -r --arg n "$EXECUTOR" '.agents[] | select(.name == $n) | .login_hints[]?' "$REGISTRY")
      fi
      # An approval is a verdict on the commit it was posted against. A
      # reviewer dispatched on commit A can land its approval after the author
      # has pushed commit B -- and nothing here compared the two, so the PR
      # went to stage:ready with B unreviewed. Same staleness the synchronize
      # handler closes, arriving by a different door. Observed live on #189.
      #
      # Deliberately asymmetric: only approvals are gated. A changes-requested
      # verdict on slightly older code usually still names a real defect, and
      # wrongly reworking costs a cycle, while wrongly marking ready is a
      # merge-safety failure.
      stale_review=false
      if [ -n "${REVIEW_COMMIT:-}" ]; then
        HEAD_SHA=$(gh pr view "$NUMBER" --repo "$REPO" --json headRefOid --jq '.headRefOid' 2>/dev/null || echo "")
        if [ -n "$HEAD_SHA" ] && [ "$REVIEW_COMMIT" != "$HEAD_SHA" ]; then
          stale_review=true
        fi
      fi
      if [ "${REVIEW_STATE:-}" = "approved" ] && $stale_review; then
        gh pr comment "$NUMBER" --repo "$REPO" --body \
          "Approval ignored for the \`stage:ready\` gate: it was posted against \`${REVIEW_COMMIT:0:7}\`, but the head is now \`${HEAD_SHA:0:7}\`. An approval only covers the commit it reviewed — see AGENTS.md, \"An approval covers one commit, not the pull request\". The review round on the current head decides this." || true
        ACTION="none"
      elif [ "${REVIEW_STATE:-}" = "approved" ]; then
        if $self; then
          gh pr comment "$NUMBER" --repo "$REPO" --body \
            "Self-approval by executor agent \`$EXECUTOR\` ignored — hard rule 1 requires a review from an agent that did not build this PR. Waiting for a different reviewer or Karl." || true
          ACTION="none"
        else
          ACTION="ready"
          READY_VIA="review"
        fi
      elif [ "${REVIEW_STATE:-}" = "changes_requested" ]; then
        auto_maintenance=false
        has_label "$L" "type:auto-maintenance" && auto_maintenance=true
        round="$(round_value "$L")"
        if $auto_maintenance && [ "$round" = "2" ]; then
          ACTION="none"
          gh pr edit "$NUMBER" --repo "$REPO" \
            --remove-label "stage:review" \
            --add-label "blocked" --add-label "needs:karl" || true
          gh pr comment "$NUMBER" --repo "$REPO" --body "$(handoff_body \
            "@karlwint" "2/2" "escalated" \
            "Auto-maintenance PR #$NUMBER received changes requested after its final retry." \
            "No further AI rework is allowed on this auto-maintenance item." \
            "Karl decides whether to continue, close, or re-scope the work." \
            "Any auto-maintenance item reaches two total AI rounds or has unclear/conflicting feedback.")" || true
        elif skip_if_locked pr "$NUMBER" "$L"; then
          ACTION="none"
        else
          AGENT="${EXECUTOR:-$(pick_agent build)}"
          ACTION="rework"
          if $auto_maintenance; then
            gh pr edit "$NUMBER" --repo "$REPO" \
              --remove-label "stage:review" --remove-label "round:1" \
              --add-label "stage:build" --add-label "round:2" || true
            gh pr comment "$NUMBER" --repo "$REPO" --body "$(handoff_body \
              "$AGENT" "2/2" "rework" \
              "Address the requested changes on PR #$NUMBER exactly once." \
              "Only the review findings; no unrelated cleanup or behavior changes." \
              "Push the fix and return the PR to stage:review with validation evidence." \
              "The fix is unclear, feedback conflicts, CI still fails, or another changes-requested review is posted.")" || true
          else
            gh pr edit "$NUMBER" --repo "$REPO" \
              --remove-label "stage:review" --add-label "stage:build" || true
          fi
        fi
      fi
    fi
    ;;
esac

MODE=""
[ -n "$AGENT" ] && MODE=$(agent_mode "$AGENT")

# Does anything actually handle this decision? A routed action with no handler
# used to end as a green, silent no-op (see dispatch.yml's `unhandled` job).
# Keep this in step with the invoke-* jobs in dispatch.yml.
HANDLED=true
case "$ACTION" in
  build|rework)
    case "$MODE" in
      # claude-action -> invoke-claude; chat -> chat-relay;
      # codex-cli -> the separate .github/workflows/codex-headless-build.yml,
      # which listens to the same labels rather than being a job in this file.
      claude-action|chat|codex-cli) ;;
      *) [ -n "$AGENT" ] && HANDLED=false ;;
    esac
    ;;
esac

echo "decision: action=$ACTION agent=$AGENT mode=$MODE number=$NUMBER executor=$EXECUTOR reviewers=$REVIEWERS handled=$HANDLED"
out action "$ACTION"
out agent "$AGENT"
out mode "$MODE"
out number "$NUMBER"
out executor "$EXECUTOR"
out reviewers "$REVIEWERS"
out ready_via "$READY_VIA"
out handled "$HANDLED"
