#!/bin/bash
# ---
# title: "Memory Files Validator"
# type: deterministic
# description: "Ensures memory files follow naming and format conventions"
# ---

# memory-files.sh - Verify today + yesterday memory files exist

MEMORY_DIR=~/.openclaw/workspace/memory
TODAY=$(date +%Y-%m-%d)
YESTERDAY=$(date -v-1d +%Y-%m-%d 2>/dev/null || date -d "yesterday" +%Y-%m-%d 2>/dev/null)

WARNINGS=0

if [ ! -f "$MEMORY_DIR/$TODAY.md" ]; then
  echo "⚠️  Today's memory missing ($TODAY.md) - normal if first session"
  WARNINGS=$((WARNINGS + 1))
fi

if [ ! -f "$MEMORY_DIR/$YESTERDAY.md" ]; then
  echo "⚠️  Yesterday's memory missing ($YESTERDAY.md) - check if weekend gap"
  WARNINGS=$((WARNINGS + 1))
fi

# MEMORY.md check (main session only)
if [ -f ~/.openclaw/workspace/MEMORY.md ]; then
  LINES=$(wc -l < ~/.openclaw/workspace/MEMORY.md)
  echo "✅ MEMORY.md: $LINES lines"
else
  echo "⚠️  MEMORY.md doesn't exist yet (normal for new workspace)"
  WARNINGS=$((WARNINGS + 1))
fi

if [ $WARNINGS -eq 0 ]; then
  echo "✅ Memory files intact"
fi

exit 0  # Warnings don't fail check
