#!/bin/bash
# List all connections with brief descriptions

CONNECTIONS_DIR=~/Documents/personal/connections

echo "# Connections"
echo ""
echo "Total: $(ls $CONNECTIONS_DIR/*.md 2>/dev/null | wc -l | tr -d ' ') files"
echo ""

# List files with first line (usually service name/purpose)
for file in $CONNECTIONS_DIR/*.md; do
  name=$(basename "$file" .md)
  desc=$(head -1 "$file" | sed 's/^# //')
  echo "- **$name:** $desc"
done
