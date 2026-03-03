#!/bin/bash
# Epic Status Validator Check
# Validates all epics have valid status from epics.yaml

set -euo pipefail

BACKSTAGE_ROOT="$HOME/Documents/backstage"
EPICS_YAML="$BACKSTAGE_ROOT/epics.yaml"
PROJECT="${1:-}"

if [[ -z "$PROJECT" ]]; then
  echo "Usage: $0 <project>"
  exit 1
fi

EPICS_DIR="$BACKSTAGE_ROOT/projects/$PROJECT/epics"

if [[ ! -d "$EPICS_DIR" ]]; then
  echo "✅ No epics directory for project $PROJECT"
  exit 0
fi

# Extract valid statuses from epics.yaml (simple grep)
VALID_STATUSES=$(grep '^\s*- value:' "$EPICS_YAML" | sed 's/.*"\(.*\)"/\1/' | tr '\n' '|' | sed 's/|$//')

echo "🔍 Validating epic statuses for project: $PROJECT"
echo "Valid statuses: ${VALID_STATUSES//|/, }"
echo ""

ERRORS=0

for epic_dir in "$EPICS_DIR"/*; do
  [[ ! -d "$epic_dir" ]] && continue
  
  epic_name=$(basename "$epic_dir")
  status=""
  
  # Try epic.yaml first (old format)
  if [[ -f "$epic_dir/epic.yaml" ]]; then
    status=$(grep '^status:' "$epic_dir/epic.yaml" | sed 's/status: *//' | tr -d '"' || echo "")
  # Try index.md frontmatter (new format)
  elif [[ -f "$epic_dir/index.md" ]]; then
    status=$(awk '/^---$/,/^---$/ {print}' "$epic_dir/index.md" | grep '^status:' | sed 's/status: *//' | tr -d '"' || echo "")
  else
    echo "❌ $epic_name: No epic.yaml or index.md found"
    ((ERRORS++))
    continue
  fi
  
  if [[ -z "$status" ]]; then
    echo "❌ $epic_name: Missing status field"
    ((ERRORS++))
    continue
  fi
  
  if ! echo "$status" | grep -qE "^($VALID_STATUSES)$"; then
    echo "❌ $epic_name: Invalid status '$status' (must be one of: ${VALID_STATUSES//|/, })"
    ((ERRORS++))
    continue
  fi
  
  echo "✅ $epic_name: status=$status"
done

echo ""
if [[ $ERRORS -eq 0 ]]; then
  echo "✅ All epics have valid status"
  exit 0
else
  echo "❌ Found $ERRORS error(s)"
  exit 1
fi
