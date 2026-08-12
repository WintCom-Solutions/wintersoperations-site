#!/usr/bin/env bash
# AI Task Force dispatcher routing. Reads the triggering event, decides what
# should happen (build / review / rework / ready / none) and which agent does
# it, and writes the decision to GITHUB_OUTPUT for the invoke jobs.
#
# Expected env (set by dispatch.yml):
#   GH_TOKEN, REPO, EVENT, GH_ACTION, LABEL, REVIEW_STATE, REVIEW_AUTHOR,
#   ISSUE_NUMBER, PR_NUMBER, PR_BODY, PR_DRAFT
set -euo pipefail

REGISTRY=".github/taskforce/agents.json"

out() { echo "$1=$2" >> "$GITHUB_OUTPUT"; }

labels_of() { # $1 = issue|pr, $2 = number
  gh "$1" view "$2" --repo "$REPO" --json labels --jq '[.labels[].name]'
}

has_label() { # $1 = labels json array, $2 = label
  echo "$1" | jq -e --arg l "$2" 'index($l) != null' > /dev/null
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

agent_mode() { # $1 = agent name
  jq -r --arg n "$1" '.agents[] | select(.name == $n) | .mode // ""' "$REGISTRY"
}

ACTION="none"; AGENT=""; NUMBER=""; EXECUTOR=""

if [ "$EVENT" = "pull_request" ] && [ "${PR_DRAFT:-false}" = "true" ]; then
  NUMBER="$PR_NUMBER"
  echo "decision: action=$ACTION agent=$AGENT mode= number=$NUMBER executor=$EXECUTOR"
  out action "$ACTION"
  out agent "$AGENT"
  out mode ""
  out number "$NUMBER"
  out executor "$EXECUTOR"
  exit 0
fi

case "$EVENT" in
  issues)
    NUMBER="$ISSUE_NUMBER"
    L=$(labels_of issue "$NUMBER")
    if [ "${LABEL:-}" = "stage:build" ] && has_label "$L" "ai-task"; then
      pin=$(label_value "$L" "agent:")
      AGENT="${pin:-$(pick_agent build)}"
      ACTION="build"
      if [ -n "$AGENT" ] && [ -z "$pin" ]; then
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
      elif [ "${GH_ACTION:-}" != "labeled" ] && has_label "$L" "stage:review" \
           && [ -z "$(label_value "$L" "reviewer:")" ]; then
        needs_review=true
      fi
      if $needs_review; then
        AGENT=$(pick_agent review "$EXECUTOR")
        ACTION="review"
        if [ -n "$AGENT" ]; then
          gh pr edit "$NUMBER" --repo "$REPO" --add-label "reviewer:$AGENT" || true
        fi
      elif [ "${LABEL:-}" = "stage:build" ]; then
        AGENT="${EXECUTOR:-$(pick_agent build)}"
        ACTION="rework"
      fi
    fi
    ;;

  pull_request_review)
    NUMBER="$PR_NUMBER"
    L=$(labels_of pr "$NUMBER")
    if has_label "$L" "ai-task"; then
      EXECUTOR=$(label_value "$L" "agent:")
      # Hard rule: an approval whose author matches the executor's login hints
      # is a self-approval and never advances the pipeline.
      self=false
      if [ -n "$EXECUTOR" ]; then
        while IFS= read -r hint; do
          [ -z "$hint" ] && continue
          case "$(echo "${REVIEW_AUTHOR:-}" | tr '[:upper:]' '[:lower:]')" in
            *"$hint"*) self=true ;;
          esac
        done < <(jq -r --arg n "$EXECUTOR" '.agents[] | select(.name == $n) | .login_hints[]?' "$REGISTRY")
      fi
      if [ "${REVIEW_STATE:-}" = "approved" ]; then
        if $self; then
          gh pr comment "$NUMBER" --repo "$REPO" --body \
            "Self-approval by executor agent \`$EXECUTOR\` ignored — the hard rule requires independent review. Waiting for a different reviewer or Karl." || true
          ACTION="none"
        else
          ACTION="ready"
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

echo "decision: action=$ACTION agent=$AGENT mode=$MODE number=$NUMBER executor=$EXECUTOR"
out action "$ACTION"
out agent "$AGENT"
out mode "$MODE"
out number "$NUMBER"
out executor "$EXECUTOR"
