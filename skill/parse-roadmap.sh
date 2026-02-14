#!/bin/bash
# parse-roadmap.sh - Extract epic metadata from ROADMAP.md
# Output: version|status_emoji|name (one per line)

ROADMAP="${1:-backstage/ROADMAP.md}"

if [ ! -f "$ROADMAP" ]; then
  echo "Error: ROADMAP not found at $ROADMAP" >&2
  exit 1
fi

# Process ROADMAP line by line
awk '
/^### v[0-9]+\.[0-9]+\.[0-9]+ - / {
  # Extract version
  match($0, /v[0-9]+\.[0-9]+\.[0-9]+/)
  version = substr($0, RSTART, RLENGTH)
  
  # Extract name (after "- ")
  match($0, / - /)
  name = substr($0, RSTART + 3)
  
  # Wait for status line
  in_epic = 1
  next
}

in_epic && /\*\*Status:\*\*/ {
  # Extract status text
  if (/ACTIVE/) status = "🏗️"
  else if (/BACKLOG/) status = "📋"
  else if (/DONE/) status = "✅"
  else if (/WAITING/) status = "⏳"
  else status = "📋"
  
  # Output and reset
  print version "|" status "|" name
  in_epic = 0
}

/^###/ && in_epic {
  # Hit next epic without finding status - use default
  print version "|📋|" name
  in_epic = 0
}
' "$ROADMAP"
