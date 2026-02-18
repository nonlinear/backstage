#!/bin/bash
# Version Sync - Auto-sync VERSION file with latest git tag on main branch

BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

# Only run on main branch
if [[ "$BRANCH" != "main" ]]; then
    echo "✅ Not on main, version controlled by branch name"
    exit 0
fi

# Get latest tag
LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null)

if [[ -z "$LATEST_TAG" ]]; then
    echo "✅ No tags found, using VERSION file as-is"
    exit 0
fi

# Strip 'v' prefix if present
LATEST_VERSION=$(echo "$LATEST_TAG" | sed 's/^v//')

# Read current VERSION file
if [[ -f "backstage/VERSION" ]]; then
    CURRENT_VERSION=$(cat backstage/VERSION)
else
    CURRENT_VERSION=""
fi

# Sync if different
if [[ "$LATEST_VERSION" != "$CURRENT_VERSION" ]]; then
    echo "$LATEST_VERSION" > backstage/VERSION
    echo "✅ VERSION synced: $CURRENT_VERSION → $LATEST_VERSION (from tag $LATEST_TAG)"
else
    echo "✅ VERSION already synced: $CURRENT_VERSION (matches tag $LATEST_TAG)"
fi

exit 0
