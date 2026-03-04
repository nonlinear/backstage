#!/bin/bash
# ---
# title: "Parity Freshness Checker"
# type: deterministic
# description: "Validates that parity documentation is up-to-date"
# ---

# parity-freshness.sh - Check if parity docs are stale (>30 days)

PARITY_DIR=~/.openclaw/workspace/parity

if [ ! -d "$PARITY_DIR" ]; then
  echo "⚠️  Parity folder doesn't exist (create when documenting solutions)"
  exit 0
fi

PARITY_COUNT=$(ls -1 "$PARITY_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ')
echo "✅ Parity docs: $PARITY_COUNT files"

# Check for stale docs (>30 days old)
find "$PARITY_DIR" -name "*.md" -mtime +30 2>/dev/null | while read stale; do
  BASENAME=$(basename "$stale")
  echo "⚠️  Stale parity doc (>30 days): $BASENAME (review if still accurate)"
done

exit 0  # Warnings don't fail
