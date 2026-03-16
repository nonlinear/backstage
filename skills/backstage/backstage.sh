#!/usr/bin/env bash
# backstage.sh - Main executor (bom dia / boa noite)
# Usage: backstage.sh <project-name> [start|end]

set -e

PROJECT="$1"
MODE="${2:-start}"
SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKSTAGE_ROOT="$HOME/Backstage"

# Validate project exists in ~/Backstage/projects/
PROJECT_DIR="$BACKSTAGE_ROOT/projects/$PROJECT"
if [ ! -d "$PROJECT_DIR" ]; then
  echo "❌ Project '$PROJECT' not found in $BACKSTAGE_ROOT/projects/"
  echo ""
  echo "Available projects:"
  ls -1 "$BACKSTAGE_ROOT/projects/" 2>/dev/null | sed 's/^/  - /'
  exit 1
fi

# Determine current epic from git branch
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "")
CURRENT_EPIC=""

if [[ "$CURRENT_BRANCH" =~ ^epic/v([0-9]+\.[0-9]+\.[0-9]+) ]]; then
  CURRENT_EPIC="v${BASH_REMATCH[1]}"
fi

echo "🏴 Backstage: $PROJECT"
echo "📂 Mode: $MODE"
[ -n "$CURRENT_EPIC" ] && echo "📌 Epic: $CURRENT_EPIC" || echo "📌 Epic: (none, on main)"
echo ""

# Execute composite checks
echo "🔍 Running checks..."
if "$SKILL_DIR/checks-composite.sh" "$PROJECT"; then
  echo "✅ All checks passed!"
else
  echo "❌ Some checks failed. Review and fix before continuing."
  exit 1
fi

echo ""

# Parse epics
echo "📋 Epics:"
"$SKILL_DIR/parse-epics.sh" "$PROJECT" | while IFS='|' read -r version emoji name total done; do
  if [ "$version" = "$CURRENT_EPIC" ]; then
    echo "  → $emoji $version - $name ($done/$total tasks)"
  else
    echo "    $emoji $version - $name ($done/$total tasks)"
  fi
done

echo ""

if [ "$MODE" = "end" ]; then
  echo "🌙 Good night! Victory lap:"
  echo ""
  
  # Victory lap: AI decides (tasks + discussions)
  # For now, just show current epic progress
  if [ -n "$CURRENT_EPIC" ]; then
    EPIC_YAML="$BACKSTAGE_ROOT/projects/$PROJECT/epics/$CURRENT_EPIC/epic.yaml"
    if [ -f "$EPIC_YAML" ]; then
      EPIC_NAME=$(grep "^name:" "$EPIC_YAML" | sed 's/name: *//')
      TASKS_DONE=$(grep -c "^\s*- \[x\]" "$EPIC_YAML" 2>/dev/null || echo 0)
      TASKS_TOTAL=$(grep -c "^\s*- \[" "$EPIC_YAML" 2>/dev/null || echo 0)
      
      echo "🎯 $CURRENT_EPIC: $EPIC_NAME"
      echo "   Progress: $TASKS_DONE/$TASKS_TOTAL tasks completed"
    fi
  else
    echo "📝 No active epic. Main branch work."
  fi
  
  echo ""
  echo "💤 Closing session..."
fi

exit 0
