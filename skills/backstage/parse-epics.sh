#!/usr/bin/env bash
# parse-epics.sh - Extract epic data from new structure
# Usage: parse-epics.sh <project-name>

set -e

PROJECT="$1"
BACKSTAGE_ROOT="$HOME/Backstage"
EPICS_DIR="$BACKSTAGE_ROOT/projects/$PROJECT/epics"

if [ ! -d "$EPICS_DIR" ]; then
  echo "Error: Project '$PROJECT' not found in $BACKSTAGE_ROOT/projects/" >&2
  exit 1
fi

# Output format: version|status|name|tasks_total|tasks_done
for epic_dir in "$EPICS_DIR"/v*/; do
  [ -d "$epic_dir" ] || continue
  
  EPIC_YAML="$epic_dir/epic.yaml"
  [ -f "$EPIC_YAML" ] || continue
  
  VERSION=$(basename "$epic_dir")
  
  # Parse YAML (simple grep, no yq needed)
  NAME=$(grep "^name:" "$EPIC_YAML" | sed 's/name: *//')
  STATUS=$(grep "^status:" "$EPIC_YAML" | sed 's/status: *//')
  
  # Count tasks
  TASKS_TOTAL=$(grep -c "^\s*- \[" "$EPIC_YAML" 2>/dev/null || echo 0)
  TASKS_DONE=$(grep -c "^\s*- \[x\]" "$EPIC_YAML" 2>/dev/null || echo 0)
  
  # Status emoji
  case "$STATUS" in
    roadmap) EMOJI="📋" ;;
    in-progress|started) EMOJI="🏗️" ;;
    completed|done) EMOJI="✅" ;;
    *) EMOJI="❓" ;;
  esac
  
  echo "$VERSION|$EMOJI|$NAME|$TASKS_TOTAL|$TASKS_DONE"
done | sort -V
