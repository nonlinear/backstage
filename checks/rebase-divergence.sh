#!/bin/bash
# Check if current branch has diverged from origin/main
# Exit 0 = diverged (needs rebase)
# Exit 1 = up to date

git fetch origin main --quiet 2>/dev/null
BEHIND=$(git rev-list --count HEAD..origin/main 2>/dev/null)
[ "$BEHIND" -gt 0 ] && exit 0 || exit 1
