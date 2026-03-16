#!/usr/bin/env bash
# checks-composite.sh - Load and execute composite checks (DNA do backstage)
# Usage: checks-composite.sh <project-name> [--list-only]

set -e

PROJECT="$1"
LIST_ONLY="${2:-}"
BACKSTAGE_ROOT="$HOME/Backstage"

GLOBAL_MANIFEST="$BACKSTAGE_ROOT/checks.yaml"
PROJECT_MANIFEST="$BACKSTAGE_ROOT/projects/$PROJECT/checks.yaml"
CHECKS_DIR="$BACKSTAGE_ROOT/checks"

# Composite DNA: global + project (nessa ordem)
COMPOSITE=()

# Load global checks
if [ -f "$GLOBAL_MANIFEST" ]; then
  while IFS= read -r check; do
    [[ "$check" =~ ^[[:space:]]*- ]] || continue
    check_name=$(echo "$check" | sed 's/^[[:space:]]*- *//')
    [ -n "$check_name" ] && COMPOSITE+=("$check_name")
  done < "$GLOBAL_MANIFEST"
fi

# Load project checks
if [ -f "$PROJECT_MANIFEST" ]; then
  while IFS= read -r check; do
    [[ "$check" =~ ^[[:space:]]*- ]] || continue
    check_name=$(echo "$check" | sed 's/^[[:space:]]*- *//')
    [ -n "$check_name" ] && COMPOSITE+=("$check_name")
  done < "$PROJECT_MANIFEST"
fi

if [ "$LIST_ONLY" = "--list-only" ]; then
  printf '%s\n' "${COMPOSITE[@]}"
  exit 0
fi

# Execute composite checks
PASSED=0
FAILED=0
SKIPPED=0

echo "📋 Executing composite checks (global + project)..."
echo ""

for check in "${COMPOSITE[@]}"; do
  CHECK_PATH="$CHECKS_DIR/$check"
  
  if [ ! -f "$CHECK_PATH" ]; then
    echo "⚠️  SKIP: $check (not found)"
    ((SKIPPED++))
    continue
  fi
  
  # .sh = deterministic (execute)
  if [[ "$check" == *.sh ]]; then
    if bash "$CHECK_PATH" >/dev/null 2>&1; then
      echo "✅ PASS: $check"
      ((PASSED++))
    else
      echo "❌ FAIL: $check"
      ((FAILED++))
    fi
  # .md = interpretive (AI reads, always pass)
  else
    echo "📖 READ: $check (interpretive)"
    ((PASSED++))
  fi
done

echo ""
echo "📊 Summary: ✅ $PASSED passed, ❌ $FAILED failed, ⚠️ $SKIPPED skipped"

[ $FAILED -eq 0 ]
