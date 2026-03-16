#!/bin/bash
# Generate composite .library.md for each agent (organization + squad + agent)

AGENT_DIR=$1
SQUAD=$(basename $(dirname "$AGENT_DIR"))
AGENT_NAME=$(basename "$AGENT_DIR")

if [ -z "$AGENT_DIR" ]; then
  echo "Usage: $0 <agent_dir>"
  exit 1
fi

OUTPUT="$AGENT_DIR/.library.md"

# Clear existing file
> "$OUTPUT"

# Header
cat >> "$OUTPUT" << 'HEADER'
# Library

You MUST ground your decisions in research from these topics using the librarian skill.

This knowledge is your foundation. You will be asked to justify your decisions, and your reasoning must be rooted in the literature listed here.

HEADER

# 1. Organization library
ORG_YAML=~/Backstage/organization.yaml
ORG_TOPICS=$(yq -r '.library[]?' "$ORG_YAML" 2>/dev/null)
if [ -n "$ORG_TOPICS" ]; then
  echo "## Organization Topics" >> "$OUTPUT"
  echo "" >> "$OUTPUT"
  echo "$ORG_TOPICS" | while read topic; do
    [ -n "$topic" ] && echo "- $topic" >> "$OUTPUT"
  done
  echo "" >> "$OUTPUT"
fi

# 2. Squad library
SQUAD_YAML=~/Backstage/squads/$SQUAD/squad.yaml
SQUAD_TOPICS=$(yq -r '.library[]?' "$SQUAD_YAML" 2>/dev/null)
if [ -n "$SQUAD_TOPICS" ]; then
  echo "## Squad Topics ($SQUAD)" >> "$OUTPUT"
  echo "" >> "$OUTPUT"
  echo "$SQUAD_TOPICS" | while read topic; do
    [ -n "$topic" ] && echo "- $topic" >> "$OUTPUT"
  done
  echo "" >> "$OUTPUT"
fi

# 3. Agent library
AGENT_YAML="$AGENT_DIR/agent.yaml"
AGENT_TOPICS=$(yq -r '.library[]?' "$AGENT_YAML" 2>/dev/null)
if [ -n "$AGENT_TOPICS" ]; then
  echo "## Agent Topics ($AGENT_NAME)" >> "$OUTPUT"
  echo "" >> "$OUTPUT"
  echo "$AGENT_TOPICS" | while read topic; do
    [ -n "$topic" ] && echo "- $topic" >> "$OUTPUT"
  done
  echo "" >> "$OUTPUT"
fi

echo "✅ $AGENT_NAME"
