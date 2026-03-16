#!/bin/bash
# Master composite script: sync skills, values, library for all agents

AGENT_DIR=$1

if [ -z "$AGENT_DIR" ]; then
  echo "Usage: $0 <agent_dir>"
  echo "   or: $0 all  (sync all agents)"
  exit 1
fi

# If "all" argument, run for all agents
if [ "$AGENT_DIR" = "all" ]; then
  echo "🏴 Syncing all agents..."
  for agent in ~/Backstage/agents/*/*/; do
    "$0" "$agent"
  done
  exit 0
fi

AGENT_NAME=$(basename "$AGENT_DIR")

# 1. Sync skills (symlinks)
~/Backstage/scripts/sync-agent-skills.sh "$AGENT_DIR" >/dev/null 2>&1

# 2. Sync values (composite content)
~/Backstage/scripts/generate-agent-values.sh "$AGENT_DIR" >/dev/null 2>&1

# 3. Sync library (composite list)
~/Backstage/scripts/generate-agent-library.sh "$AGENT_DIR" >/dev/null 2>&1

echo "✅ $AGENT_NAME"
