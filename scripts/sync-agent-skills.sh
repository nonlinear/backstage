#!/bin/bash
# Sync agent skills via symlinks (organization + squad + agent composite)

AGENT_DIR=$1
SQUAD=$(basename $(dirname "$AGENT_DIR"))
AGENT_NAME=$(basename "$AGENT_DIR")
SKILLS_DIR=~/Backstage/skills

if [ -z "$AGENT_DIR" ]; then
  echo "Usage: $0 <agent_dir>"
  exit 1
fi

# Clear existing skills
rm -rf "$AGENT_DIR/skills"
mkdir -p "$AGENT_DIR/skills"

# Temporary file for skill list
TEMP_SKILLS=$(mktemp)

# 1. Organization skills
ORG_YAML=~/Backstage/organization.yaml
[ -f "$ORG_YAML" ] && yq -r '.skills[]' "$ORG_YAML" 2>/dev/null >> "$TEMP_SKILLS"

# 2. Squad skills
SQUAD_YAML=~/Backstage/squads/$SQUAD/squad.yaml
[ -f "$SQUAD_YAML" ] && yq -r '.skills[]' "$SQUAD_YAML" 2>/dev/null >> "$TEMP_SKILLS"

# 3. Agent skills
AGENT_YAML="$AGENT_DIR/agent.yaml"
[ -f "$AGENT_YAML" ] && yq -r '.skills[]' "$AGENT_YAML" 2>/dev/null >> "$TEMP_SKILLS"

# Remove duplicates (keep first = higher priority)
UNIQUE_SKILLS=$(awk '!seen[$0]++' "$TEMP_SKILLS")
rm -f "$TEMP_SKILLS"

# Create symlinks
SKILL_COUNT=0
while IFS= read -r skill; do
  [ -z "$skill" ] && continue
  if [ -d "$SKILLS_DIR/$skill" ]; then
    ln -s "$SKILLS_DIR/$skill" "$AGENT_DIR/skills/$skill"
    ((SKILL_COUNT++))
  fi
done <<< "$UNIQUE_SKILLS"

echo "✅ $AGENT_NAME ($SKILL_COUNT skills)"
