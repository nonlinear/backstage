#!/bin/bash
# Sync agent skills via symlinks (organization + squad + agent)

AGENT_DIR=$1
DOMAIN=$(basename $(dirname "$AGENT_DIR"))
AGENT_NAME=$(basename "$AGENT_DIR")

if [ -z "$AGENT_DIR" ]; then
  echo "Usage: $0 <agent_dir>"
  exit 1
fi

echo "Syncing skills for $DOMAIN/$AGENT_NAME..."

# Limpa skills existentes
rm -rf "$AGENT_DIR/skills"
mkdir -p "$AGENT_DIR/skills"

SKILL_COUNT=0

# 1. Organization skills (~/Backstage/skills/)
if [ -d ~/Backstage/skills ]; then
  for skill in ~/Backstage/skills/*/; do
    [ -d "$skill" ] || continue
    skill_name=$(basename "$skill")
    ln -s "$skill" "$AGENT_DIR/skills/$skill_name"
    ((SKILL_COUNT++))
  done
fi

# 2. Squad skills (~/Backstage/squads/$DOMAIN/skills/)
SQUAD_SKILLS=~/Backstage/squads/$DOMAIN/skills
if [ -d "$SQUAD_SKILLS" ]; then
  for skill in "$SQUAD_SKILLS"/*/; do
    [ -d "$skill" ] || continue
    skill_name=$(basename "$skill")
    # Skip se já existe (organization priority)
    [ -L "$AGENT_DIR/skills/$skill_name" ] && continue
    ln -s "$skill" "$AGENT_DIR/skills/$skill_name"
    ((SKILL_COUNT++))
  done
fi

# 3. Agent-specific skills (agent/.agent-skills/)
if [ -d "$AGENT_DIR/.agent-skills" ]; then
  for skill in "$AGENT_DIR/.agent-skills"/*/; do
    [ -d "$skill" ] || continue
    skill_name=$(basename "$skill")
    # Skip se já existe
    [ -L "$AGENT_DIR/skills/$skill_name" ] && continue
    ln -s "$skill" "$AGENT_DIR/skills/$skill_name"
    ((SKILL_COUNT++))
  done
fi

echo "✅ $SKILL_COUNT skills synced to $AGENT_DIR/skills/"
