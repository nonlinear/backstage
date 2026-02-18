#!/bin/bash
# Navigation Block Validation - All backstage files must have 🤖 markers

for file in backstage/CHANGELOG.md backstage/ROADMAP.md backstage/POLICY.md backstage/HEALTH.md; do
  grep -q '> 🤖' "$file" || echo "❌ Missing in $file"
done && echo '✅ All files have navigation blocks'
