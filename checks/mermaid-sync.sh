#!/bin/bash
# ---
# DESCRIPTION: Sync mermaid diagram from SKILL.md to README.md
# TYPE: deterministic
# SCOPE: local
# ---

set -e

SKILL_MD="skills/backstage/SKILL.md"
README="README.md"

# Check if SKILL.md exists
if [[ ! -f "$SKILL_MD" ]]; then
    echo "✅ No SKILL.md, skipping mermaid sync"
    exit 0
fi

# Extract last mermaid block from SKILL.md (including ``` markers)
MERMAID_TMP=$(mktemp)
awk '/^```mermaid$/,/^```$/' "$SKILL_MD" | tail -n +1 > "$MERMAID_TMP"

if [[ ! -s "$MERMAID_TMP" ]]; then
    rm "$MERMAID_TMP"
    echo "✅ No mermaid in SKILL.md, skipping"
    exit 0
fi

# Check if README has mermaid block
if ! grep -q '^```mermaid$' "$README"; then
    rm "$MERMAID_TMP"
    echo "❌ README.md missing mermaid block"
    exit 1
fi

# Replace mermaid in README with SKILL.md version
README_TMP=$(mktemp)
awk '
    BEGIN { in_mermaid = 0 }
    /^```mermaid$/ {
        in_mermaid = 1
        while ((getline line < "'"$MERMAID_TMP"'") > 0) {
            print line
        }
        close("'"$MERMAID_TMP"'")
        next
    }
    in_mermaid && /^```$/ {
        in_mermaid = 0
        next
    }
    !in_mermaid { print }
' "$README" > "$README_TMP"

mv "$README_TMP" "$README"
rm "$MERMAID_TMP"

echo "✅ Mermaid synced from SKILL.md to README.md"
exit 0
