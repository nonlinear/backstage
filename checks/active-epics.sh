#!/bin/bash
# active-epics.sh - Verify active epics have epic-notes

cd ~/Documents/personal/backstage || exit 1

ERRORS=0

# Extract active epic versions from ROADMAP
grep "^## v" ROADMAP.md | grep -o 'v[0-9]*\.[0-9]*\.[0-9]*' | while read epic; do
  # Find corresponding epic-note file
  EPIC_FILE=$(ls epic-notes/ 2>/dev/null | grep -i "$epic" | head -1)
  
  if [ -n "$EPIC_FILE" ]; then
    echo "✅ Epic $epic has note: $EPIC_FILE"
  else
    echo "❌ Epic $epic missing epic-note file!"
    ERRORS=$((ERRORS + 1))
  fi
done

if [ $ERRORS -eq 0 ]; then
  exit 0
else
  exit 1
fi
