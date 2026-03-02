#!/bin/bash
# skill-diagrams.sh - Verify all SKILL.md files have diagrams

PROJECT_ROOT=~/Documents/skills
ERRORS=0

echo "Checking for diagrams in SKILL.md files..."

# Find all SKILL.md files
find "$PROJECT_ROOT" -name "SKILL.md" -type f | while read skill_file; do
  # Check if diagram section exists
  if grep -qE "^##+ Diagram" "$skill_file" || grep -qA 5 "^---$" "$skill_file" | grep -q '```mermaid'; then
    echo "✅ $(basename $(dirname "$skill_file"))/SKILL.md has diagram"
  else
    echo "❌ $(basename $(dirname "$skill_file"))/SKILL.md MISSING diagram"
    ERRORS=$((ERRORS + 1))
  fi
done

if [ $ERRORS -eq 0 ]; then
  echo "✅ All SKILL.md files have diagrams"
  exit 0
else
  echo "❌ $ERRORS SKILL.md file(s) missing diagrams"
  exit 1
fi
