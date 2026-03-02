#!/bin/bash
# Version from Branch - Detect protocol version based on current git branch

# Get current branch
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

if [[ -z "$BRANCH" ]]; then
    echo "⚠️  Not a git repository, using default version"
    exit 0
fi

# Determine version
if [[ "$BRANCH" == "main" ]]; then
    # Main branch = use VERSION file
    if [[ -f "backstage/VERSION" ]]; then
        VERSION=$(cat backstage/VERSION)
    else
        VERSION="0.3.4"  # Fallback
    fi
else
    # Feature branch = extract from branch name (vX.Y.Z)
    if [[ "$BRANCH" =~ ^v([0-9]+\.[0-9]+\.[0-9]+) ]]; then
        VERSION="${BASH_REMATCH[1]}"
    else
        # Branch doesn't match vX.Y.Z pattern, use VERSION file
        if [[ -f "backstage/VERSION" ]]; then
            VERSION=$(cat backstage/VERSION)
        else
            VERSION="0.3.4"  # Fallback
        fi
    fi
fi

# Export for other scripts to use
export BACKSTAGE_VERSION="v$VERSION"

echo "✅ Backstage protocol version: v$VERSION (branch: $BRANCH)"
exit 0
