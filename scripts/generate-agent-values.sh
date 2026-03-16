#!/bin/bash
# Generate composite .values.md for each agent (organization + squad + agent)

AGENT_DIR=$1
SQUAD=$(basename $(dirname "$AGENT_DIR"))
AGENT_NAME=$(basename "$AGENT_DIR")

if [ -z "$AGENT_DIR" ]; then
  echo "Usage: $0 <agent_dir>"
  exit 1
fi

OUTPUT="$AGENT_DIR/.values.md"

# Clear existing file
> "$OUTPUT"

# 1. Organization values
ORG_VALUES=~/Backstage/values
if [ -d "$ORG_VALUES" ]; then
  echo "## Organization Values" >> "$OUTPUT"
  echo "" >> "$OUTPUT"
  
  for value_file in "$ORG_VALUES"/*.md; do
    [ -f "$value_file" ] || continue
    value_name=$(basename "$value_file" .md)
    
    echo "### $value_name" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
    # Remove frontmatter, append content
    sed '/^---$/,/^---$/d' "$value_file" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
    echo "---" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
  done
fi

# 2. Squad values (if exist)
SQUAD_VALUES=~/Backstage/squads/$SQUAD/values
if [ -d "$SQUAD_VALUES" ]; then
  echo "## Squad Values ($SQUAD)" >> "$OUTPUT"
  echo "" >> "$OUTPUT"
  
  for value_file in "$SQUAD_VALUES"/*.md; do
    [ -f "$value_file" ] || continue
    value_name=$(basename "$value_file" .md)
    
    echo "### $value_name" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
    sed '/^---$/,/^---$/d' "$value_file" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
    echo "---" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
  done
fi

# 3. Agent-specific values (if exist)
AGENT_VALUES="$AGENT_DIR/.agent-values"
if [ -d "$AGENT_VALUES" ]; then
  echo "## Agent Values ($AGENT_NAME)" >> "$OUTPUT"
  echo "" >> "$OUTPUT"
  
  for value_file in "$AGENT_VALUES"/*.md; do
    [ -f "$value_file" ] || continue
    value_name=$(basename "$value_file" .md)
    
    echo "### $value_name" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
    sed '/^---$/,/^---$/d' "$value_file" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
    echo "---" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
  done
fi

echo "✅ $AGENT_NAME"
