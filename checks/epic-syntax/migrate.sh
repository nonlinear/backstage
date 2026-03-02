#!/bin/bash

BACKSTAGE=~/Documents/personal/backstage
TARGET=$BACKSTAGE/personal/epics
NOTES=$BACKSTAGE/personal/notes

# Limpar migração anterior
rm -rf "$TARGET" "$NOTES"
mkdir -p "$TARGET" "$NOTES"

cd $BACKSTAGE/epic-notes 2>/dev/null || exit 1

for file in *; do
  [ ! -f "$file" ] && continue
  
  # Epic versionado (vX.Y.Z-name.md) → epics/X.Y.Z/
  if [[ "$file" =~ ^v([0-9]+\.[0-9]+\.[0-9]+)-(.+)\.md$ ]]; then
    version="${BASH_REMATCH[1]}"
    name="${BASH_REMATCH[2]}"
    
    mkdir -p "$TARGET/$version"
    cp "$file" "$TARGET/$version/$name.md"
    
    # Criar epic.yaml se não existe
    if [ ! -f "$TARGET/$version/epic.yaml" ]; then
      cat > "$TARGET/$version/epic.yaml" << EOF
---
version: $version
name: $name
status: roadmap
tier: 0
notes:
  - $name.md
checks: []
tasks: []
---
EOF
    else
      # Adicionar note ao YAML existente (versões duplicadas)
      echo "  - $name.md" >> "$TARGET/$version/epic.yaml"
    fi
    
    echo "✅ Epic $version/$name.md"
    
  # Tudo que não é epic versionado → notes/
  else
    cp "$file" "$NOTES/"
    echo "📄 Note $file"
  fi
done

echo ""
echo "=== Summary ==="
echo "Epics: $(find $TARGET -name "epic.yaml" | wc -l | xargs) versions"
echo "Epic notes: $(find $TARGET -name "*.md" | wc -l | xargs) files"
echo "Loose notes: $(ls -1 $NOTES/ 2>/dev/null | wc -l | xargs) files"
echo "Total: $(ls -1 $BACKSTAGE/epic-notes/ | wc -l | xargs) original files"
