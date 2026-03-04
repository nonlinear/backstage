#!/bin/bash
# ---
# title: "Backstage Structure Validator"
# type: deterministic
# description: "Ensures backstage folder structure matches expected layout"
# ---

# backstage-structure.sh - Verify ROADMAP/CHANGELOG/epic-notes health

PROJECT_ROOT=~/Documents/personal/backstage

# Check ROADMAP has epics
ACTIVE_EPICS=$(grep -c "^## v" "$PROJECT_ROOT/ROADMAP.md" 2>/dev/null || echo 0)

if [ "$ACTIVE_EPICS" -eq 0 ]; then
  echo "❌ ROADMAP has no epics"
  exit 1
fi

echo "✅ ROADMAP: $ACTIVE_EPICS epics tracked"

# Check CHANGELOG has entries
RECENT_CHANGELOG=$(head -50 "$PROJECT_ROOT/CHANGELOG.md" 2>/dev/null | grep -c "^## " || echo 0)
echo "✅ CHANGELOG: $RECENT_CHANGELOG recent versions"

# Check epic-notes/ not empty
EPIC_COUNT=$(ls -1 "$PROJECT_ROOT/epic-notes"/*.md 2>/dev/null | wc -l | tr -d ' ')

if [ "$EPIC_COUNT" -gt 0 ]; then
  echo "✅ Epic notes: $EPIC_COUNT files"
else
  echo "⚠️  No epic notes found (should have at least 1 active)"
fi

exit 0
