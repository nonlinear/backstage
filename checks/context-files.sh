#!/bin/bash
# ---
# title: "Context Files Validator"
# type: deterministic
# description: "Ensures required context files exist in workspace"
# ---

# context-files.sh - Verify core identity/context files exist

WORKSPACE=~/.openclaw/workspace
ERRORS=0

echo "Checking core context files..."

# Core identity files (MANDATORY)
for file in AGENTS.md SOUL.md USER.md IDENTITY.md TOOLS.md; do
  if [ ! -f "$WORKSPACE/$file" ]; then
    echo "❌ $file missing"
    ERRORS=$((ERRORS + 1))
  fi
done

# Backstage structure (project-specific)
PROJECT_ROOT=~/Documents/personal

if [ ! -f "$PROJECT_ROOT/backstage/ROADMAP.md" ]; then
  echo "❌ ROADMAP.md missing"
  ERRORS=$((ERRORS + 1))
fi

if [ ! -f "$PROJECT_ROOT/backstage/CHANGELOG.md" ]; then
  echo "❌ CHANGELOG.md missing"
  ERRORS=$((ERRORS + 1))
fi

if [ ! -d "$PROJECT_ROOT/backstage/epic-notes" ]; then
  echo "❌ epic-notes/ missing"
  ERRORS=$((ERRORS + 1))
fi

if [ $ERRORS -eq 0 ]; then
  echo "✅ All context files present"
  exit 0
else
  echo "❌ $ERRORS critical file(s) missing"
  exit 1
fi
