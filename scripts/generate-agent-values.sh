#!/bin/bash
# Generate .values.md for each agent based on organization + squad values

set -e

BACKSTAGE_ROOT=~/Backstage
ORG_YAML="$BACKSTAGE_ROOT/organization.yaml"
AGENTS_DIR="$BACKSTAGE_ROOT/agents"

# For each agent folder
find "$AGENTS_DIR" -mindepth 2 -maxdepth 2 -type d | while read agent_dir; do
  agent_name=$(basename "$agent_dir")
  domain=$(basename $(dirname "$agent_dir"))
  
  echo "Generating .values.md for $domain/$agent_name..."
  
  # Read values files and generate list
  ORG_VALUES=""
  for value in ~/Backstage/values/*.md; do
    vname=$(basename "$value" .md)
    ORG_VALUES="$ORG_VALUES\n- $vname"
  done
  
  # Check if squad has specific values
  SQUAD_VALUES_DIR="$BACKSTAGE_ROOT/squads/$domain/values"
  SQUAD_VALUES=""
  
  if [ -d "$SQUAD_VALUES_DIR" ]; then
    for value in "$SQUAD_VALUES_DIR"/*.md; do
      [ -e "$value" ] || continue
      vname=$(basename "$value" .md)
      SQUAD_VALUES="$SQUAD_VALUES\n- $vname"
    done
  fi
  
  # Generate .values.md
  cat > "$agent_dir/.values.md" << VALUESEOF
# Values for $agent_name

**Domain:** $domain

## Organization Values (Inherited)

$(echo -e "$ORG_VALUES")

## Squad Values (Inherited from $domain)

$(if [ -n "$SQUAD_VALUES" ]; then echo -e "$SQUAD_VALUES"; else echo "*(none)*"; fi)

---

**Generated:** $(date +%Y-%m-%d)  
**Source:** values/ + squads/$domain/values/
VALUESEOF
  
  echo "  ✅ $agent_dir/.values.md"
done

echo ""
echo "✅ All agent .values.md files generated"
