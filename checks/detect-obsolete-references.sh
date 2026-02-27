#!/bin/bash
# DESCRIPTION: Detect obsolete patterns (policies/, HEALTH.md, old structure references)
# TYPE: deterministic
# SCOPE: global

# Patterns to detect (obsolete structure)
OBSOLETE_PATTERNS=(
  "backstage/policies/"
  "policies/global"
  "policies/local"
  "HEALTH.md"
  "POLICY.md"
)

FOUND_OBSOLETE=0

for pattern in "${OBSOLETE_PATTERNS[@]}"; do
  # Search in checks/ and epic-notes/ (not CHANGELOG - that's historical)
  if grep -r "$pattern" backstage/checks/ backstage/epic-notes/ 2>/dev/null | grep -v "CHANGELOG" | grep -q .; then
    echo "⚠️ Found obsolete reference: $pattern"
    FOUND_OBSOLETE=1
  fi
done

if [ $FOUND_OBSOLETE -eq 1 ]; then
  echo "❌ Obsolete references detected (run cleanup epic)"
  exit 1
else
  echo "✅ No obsolete references"
  exit 0
fi
