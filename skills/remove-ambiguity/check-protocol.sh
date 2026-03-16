#!/bin/bash
# Check: Unsupervised protocol followed?
# Location: Can be global (all projects) or local (skills project)
# Variables: UNSUPERVISED_REPORT_PATH (default: ./unsupervised-report.md)

set -e

REPORT="${UNSUPERVISED_REPORT_PATH:-./unsupervised-report.md}"

# Only check if unsupervised work happened
if [ ! -f "$REPORT" ]; then
  exit 0  # No report = no unsupervised work = OK
fi

echo "🔍 Checking unsupervised protocol compliance..."

# Phase 0: Scope defined?
if ! grep -q "## 0️⃣ Scope Definition" "$REPORT"; then
  echo "❌ FAIL: Missing Phase 0 (Scope Definition)"
  exit 1
fi

# Phase 1: Ambiguity checked?
if ! grep -q "## 1️⃣ Ambiguity Check" "$REPORT"; then
  echo "❌ FAIL: Missing Phase 1 (Ambiguity Check)"
  exit 1
fi

# Phase 2: Resources verified?
if ! grep -q "## 2️⃣ Resource Check" "$REPORT"; then
  echo "❌ FAIL: Missing Phase 2 (Resource Check)"
  exit 1
fi

# Phase 3: Ready report?
if ! grep -q "## 3️⃣ Progress Report" "$REPORT"; then
  echo "❌ FAIL: Missing Phase 3 (Progress Report)"
  exit 1
fi

# Phase 4: Final report?
if grep -q "## 4️⃣ Autonomous Execution" "$REPORT"; then
  # If Phase 4 exists, must have final status
  if ! grep -q "### Final Report" "$REPORT"; then
    echo "❌ FAIL: Phase 4 started but no final report"
    exit 1
  fi
  
  # Must have either SUCCESS or BLOCKER
  if ! grep -qE "(✅ OBJECTIVE ACHIEVED|❌ OBJECTIVE NOT ACHIEVED)" "$REPORT"; then
    echo "❌ FAIL: Final report missing success/failure status"
    exit 1
  fi
fi

echo "✅ PASS: Unsupervised protocol followed"
exit 0
