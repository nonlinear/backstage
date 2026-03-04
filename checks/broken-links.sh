#!/bin/bash
# ---
# title: "Broken Links Detector"
# type: deterministic
# description: "Scans for broken internal links in markdown files"
# ---

# broken-links.sh - Check ROADMAP epic-notes references exist

cd ~/Documents/personal/backstage || exit 1

ERRORS=0

# Extract epic-notes references from ROADMAP
grep -o '\[notes\]([^)]*\.md)' ROADMAP.md | sed 's/\[notes\](\(.*\))/\1/' | while read file; do
  if [ ! -f "$file" ]; then
    echo "❌ Broken link in ROADMAP: $file"
    ERRORS=$((ERRORS + 1))
  fi
done

# Check orphaned epic-notes (not referenced in ROADMAP)
if ls backstage/epic-notes/*.md >/dev/null 2>&1; then
  for epic in backstage/epic-notes/*.md; do
    BASENAME=$(basename "$epic")
    if ! grep -q "$BASENAME" ROADMAP.md; then
      echo "⚠️  Epic note not in ROADMAP: $BASENAME (might be archived)"
    fi
  done
fi

if [ $ERRORS -eq 0 ]; then
  echo "✅ Link integrity check complete"
  exit 0
else
  echo "❌ $ERRORS broken link(s) found"
  exit 1
fi
