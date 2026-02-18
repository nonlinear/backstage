#!/bin/bash
# Epic Format Validation - Epics must follow standard format

grep -E '\[🚧\]\(.*\).*\*\*|⏳.*\*\*|✅.*\*\*' backstage/ROADMAP.md >/dev/null && \
echo '✅ Epic format correct' || echo '⚠️ Check epic syntax'
