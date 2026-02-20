#!/bin/bash
# DESCRIPTION: Completed work marked in ROADMAP. Prevents stale task checkboxes drift.
# TYPE: deterministic
# SCOPE: global

# Check if ROADMAP exists
if [[ ! -f "backstage/ROADMAP.md" ]]; then
    exit 0
fi

# Detect merged epic branches (v*.*.* pattern)
MERGED_EPICS=$(git branch --merged main 2>/dev/null | grep -E 'v[0-9]+\.[0-9]+\.[0-9]+' | sed 's/^[* ]*//' || echo "")

if [[ -z "$MERGED_EPICS" ]]; then
    echo "✅ No merged epic branches to verify"
    exit 0
fi

# Check if merged epics are marked ✅ in ROADMAP
UNCHECKED=0
while IFS= read -r branch; do
    VERSION=$(echo "$branch" | grep -oE 'v[0-9]+\.[0-9]+\.[0-9]+')
    if grep -q "^## $VERSION" backstage/ROADMAP.md; then
        if ! grep -A 20 "^## $VERSION" backstage/ROADMAP.md | grep -q "✅"; then
            echo "⚠️  Epic $VERSION merged but not marked complete in ROADMAP"
            UNCHECKED=1
        fi
    fi
done <<< "$MERGED_EPICS"

if [[ $UNCHECKED -eq 0 ]]; then
    echo "✅ Merged epics marked in ROADMAP"
fi

exit 0
