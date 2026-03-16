#!/bin/bash
# Generate .mcps.md for agent (composite: organization → squad → agent)

AGENT_DIR="$1"

if [ -z "$AGENT_DIR" ]; then
  echo "Usage: $0 /path/to/agent"
  exit 1
fi

AGENT_YAML="$AGENT_DIR/agent.yaml"
OUTPUT="$AGENT_DIR/.mcps.md"

if [ ! -f "$AGENT_YAML" ]; then
  echo "Error: $AGENT_YAML not found"
  exit 1
fi

# Extract squad name from path: ~/Backstage/agents/SQUAD/AGENT/
SQUAD_NAME=$(basename $(dirname "$AGENT_DIR"))
SQUAD_YAML=~/Backstage/squads/$SQUAD_NAME/squad.yaml

ORG_YAML=~/Backstage/organization.yaml

# Collect MCPs (organization → squad → agent, deduplicated)
MCPS=""

# 1. Organization MCPs
if [ -f "$ORG_YAML" ]; then
  MCPS="$MCPS $(yq eval '.mcps[]' "$ORG_YAML" 2>/dev/null | tr '\n' ' ')"
fi

# 2. Squad MCPs
if [ -f "$SQUAD_YAML" ]; then
  MCPS="$MCPS $(yq eval '.mcps[]' "$SQUAD_YAML" 2>/dev/null | tr '\n' ' ')"
fi

# 3. Agent MCPs
MCPS="$MCPS $(yq eval '.mcps[]' "$AGENT_YAML" 2>/dev/null | tr '\n' ' ')"

# Deduplicate
MCPS=$(echo "$MCPS" | tr ' ' '\n' | grep -v '^$' | sort -u | tr '\n' ' ')

# If no MCPs, create empty file
if [ -z "$MCPS" ]; then
  cat > "$OUTPUT" << 'HEADER'
# MCP Servers

No MCP servers configured for this agent.
HEADER
  exit 0
fi

# Generate .mcps.md
cat > "$OUTPUT" << 'HEADER'
# MCP Servers Available

Use these tools when context matches. They're already installed and configured.

HEADER

# Add each MCP with details
for mcp in $MCPS; do
  case "$mcp" in
    github-mcp)
      cat >> "$OUTPUT" << 'MCP'
## github-mcp
**Capabilities:** Search GitHub repos, issues, PRs, code
**When to use:** User asks about GitHub status, PR review, repo info, code search
**Triggers:** github, repo, repository, pull request, issue, code search

MCP
      ;;
    playwright-mcp)
      cat >> "$OUTPUT" << 'MCP'
## playwright-mcp
**Capabilities:** Browser automation, screenshots, web scraping
**When to use:** Verify live website, visual testing, capture UI state
**Triggers:** browser, automation, screenshot, web scraping, playwright

MCP
      ;;
    figma-mcp)
      cat >> "$OUTPUT" << 'MCP'
## figma-mcp
**Capabilities:** Extract Figma layout and component info
**When to use:** Design discrepancy checks, validate UI against design files
**Triggers:** figma, design, layout, ui components, design files

MCP
      ;;
    context7-mcp)
      cat >> "$OUTPUT" << 'MCP'
## context7-mcp
**Capabilities:** Up-to-date code documentation for frameworks (React, MUI, Next.js, etc.)
**When to use:** Need current API docs, component props, patterns for specific framework/library
**Triggers:** documentation, code docs, mui, react, next.js, framework api
**Note:** Requires CONTEXT7_API_KEY (signup at context7.com)

MCP
      ;;
  esac
done

