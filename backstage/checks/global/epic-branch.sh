#!/bin/bash
# DESCRIPTION: Work happens inside epic branches. Prevents work on main.
# TYPE: deterministic
# SCOPE: global

BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")

# Allowed patterns:
# - main (read-only, no work)
# - v*.*.* (epic branches)
# - epic/* (epic branches alternative naming)

if [[ "$BRANCH" == "main" ]]; then
    # Check if there are uncommitted changes
    if ! git diff --quiet 2>/dev/null || ! git diff --cached --quiet 2>/dev/null; then
        # Exception: Allow ROADMAP.md edits on main (grooming/reordering)
        CHANGED_FILES=$(git diff --name-only 2>/dev/null; git diff --cached --name-only 2>/dev/null)
        ROADMAP_ONLY=true
        
        while IFS= read -r file; do
            if [[ "$file" != *"/ROADMAP.md" && "$file" != "ROADMAP.md" ]]; then
                ROADMAP_ONLY=false
                break
            fi
        done <<< "$CHANGED_FILES"
        
        if [[ "$ROADMAP_ONLY" == "true" && -n "$CHANGED_FILES" ]]; then
            echo "✅ On main (ROADMAP.md grooming allowed)"
            exit 0
        else
            echo "❌ Working on main branch (forbidden)"
            echo "   Create epic branch: git checkout -b v0.X.Y epic-name"
            echo "   Exception: ROADMAP.md grooming/reordering allowed on main"
            exit 1
        fi
    else
        echo "✅ On main (read-only, no changes detected)"
        exit 0
    fi
elif [[ "$BRANCH" =~ ^v[0-9]+\.[0-9]+\.[0-9]+ ]] || [[ "$BRANCH" =~ ^epic/ ]]; then
    echo "✅ Working in epic branch: $BRANCH"
    exit 0
elif [[ "$BRANCH" == "unknown" ]]; then
    echo "⚠️  Not in a git repository"
    exit 0
else
    echo "❌ Invalid branch name: $BRANCH"
    echo "   Epic branches must match: v*.*.* or epic/*"
    echo "   Current: $BRANCH"
    exit 1
fi
