#!/bin/bash
# Detect skills without symlinks in ~/.openclaw/workspace/skills/
# Exit 0 = missing symlinks (fail)
# Exit 1 = all symlinks present (pass)

SKILLS_PROJECT="$HOME/Documents/skills"
WORKSPACE_SKILLS="$HOME/.openclaw/workspace/skills"

missing_count=0

for skill_dir in "$SKILLS_PROJECT"/*/; do
  [ ! -d "$skill_dir" ] && continue
  
  skill_name=$(basename "$skill_dir")
  
  # Skip backstage (not a skill)
  [ "$skill_name" = "backstage" ] && continue
  
  symlink_path="$WORKSPACE_SKILLS/$skill_name"
  
  if [ ! -L "$symlink_path" ]; then
    echo "❌ Missing symlink: $skill_name"
    missing_count=$((missing_count + 1))
  fi
done

if [ $missing_count -gt 0 ]; then
  echo ""
  echo "⚠️ $missing_count skill(s) need symlinks"
  echo "Fix: ln -s ~/Documents/skills/SKILL-NAME ~/.openclaw/workspace/skills/SKILL-NAME"
  exit 1  # Fail (missing symlinks)
fi

echo "✅ All skills have symlinks in workspace"
exit 0  # Pass (all symlinks present)
