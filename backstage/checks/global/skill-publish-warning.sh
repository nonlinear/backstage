#!/bin/bash
# skill-publish-warning.sh - Warn before merging unpublished skill changes to main
#
# DESCRIPTION: Detect if project is a published skill with epic changes, warn before merge
# TYPE: Interpretive (AI prompts user, opens links)
# SCOPE: Global (affects all projects with published skills)
# TRIGGER: Before merge to main (back-to-main workflow)

set -e

# Parse README for skill status
SKILL_PUBLISHED=$(grep -iE "\*\*Status:\*\*.*[Pp]ublished|status:.*published|published.*skill" README.md 2>/dev/null || echo "")

# If not a published skill, pass immediately
if [ -z "$SKILL_PUBLISHED" ]; then
  exit 0
fi

# Detect if we're on an epic branch
CURRENT_BRANCH=$(git branch --show-current)
if [[ ! "$CURRENT_BRANCH" =~ ^epic/ ]] && [[ ! "$CURRENT_BRANCH" =~ ^patch/ ]]; then
  # Not on epic/patch branch, pass
  exit 0
fi

# Check if epic made changes (has commits ahead of main)
COMMITS_AHEAD=$(git rev-list --count main.."$CURRENT_BRANCH" 2>/dev/null || echo "0")

if [ "$COMMITS_AHEAD" -eq 0 ]; then
  # No changes, pass
  exit 0
fi

# Published skill with epic changes detected
echo ""
echo "⚠️  SKILL PUBLISH WARNING"
echo ""
echo "This project is a PUBLISHED SKILL with epic changes."
echo ""
echo "Branch: $CURRENT_BRANCH"
echo "Commits ahead of main: $COMMITS_AHEAD"
echo ""
echo "Before merging to main, you should:"
echo "  1. Test the skill changes"
echo "  2. Publish to ClawHub (republish)"
echo "  3. Verify external users can install/update"
echo ""

# Auto-open ClawHub dashboard (always same link)
CLAWHUB_DASHBOARD="https://clawhub.ai/dashboard"

if [ -t 0 ]; then
  # Interactive terminal, prompt user
  read -p "Open ClawHub dashboard to republish? (y/n) " -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    open "$CLAWHUB_DASHBOARD" 2>/dev/null || xdg-open "$CLAWHUB_DASHBOARD" 2>/dev/null || echo "Could not open link (try manually: $CLAWHUB_DASHBOARD)"
    
    # Also open Finder
    read -p "Open skill folder in Finder? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      open . 2>/dev/null || xdg-open . 2>/dev/null || echo "Could not open Finder (macOS/Linux only)"
    fi
  fi
else
  # Non-interactive, just show link
  echo "📦 Open ClawHub dashboard to republish: $CLAWHUB_DASHBOARD"
  echo "(Run interactively to open Finder)"
fi

echo ""
echo "After publishing, return here and merge to main."
echo ""

# Soft fail - warn but allow merge
exit 0
