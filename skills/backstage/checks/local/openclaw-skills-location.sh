#!/bin/bash
# Check: No user-created skills in OpenClaw workspace

OPENCLAW_SKILLS="$HOME/.openclaw/workspace/skills"

if [ ! -d "$OPENCLAW_SKILLS" ]; then
  echo "✅ OpenClaw skills directory doesn't exist (OK)"
  exit 0
fi

# Find non-symlink directories (user created directly there)
DIRECT_SKILLS=$(find "$OPENCLAW_SKILLS" -maxdepth 1 -type d ! -name "skills" ! -name ".*" 2>/dev/null)

if [ -n "$DIRECT_SKILLS" ]; then
  echo "❌ FAIL: User-created skills found in OpenClaw workspace"
  echo ""
  echo "Skills should ONLY exist in ~/Documents/skills/, then symlinked."
  echo ""
  echo "Found:"
  echo "$DIRECT_SKILLS" | while read -r skill; do
    echo "  - $(basename "$skill")"
  done
  echo ""
  echo "Fix:"
  echo "  1. Move to ~/Documents/skills/"
  echo "  2. Create symlink: ln -s ~/Documents/skills/NAME ~/.openclaw/workspace/skills/NAME"
  exit 1
fi

echo "✅ PASS: No user-created skills in OpenClaw workspace"
echo "   (All skills are symlinks to ~/Documents/skills/)"
