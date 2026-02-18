#!/bin/bash
# checks.sh - Unified policies/ + checks/ enforcement
# Executes checks FIRST, then reads policies

set -e

PROJECT_ROOT="${1:-.}"
MODE="${2:-start}" # start or end

cd "$PROJECT_ROOT"

echo "🔍 Running backstage enforcement (mode: $MODE)..."
echo ""

# ============================================================================
# STEP 1: Execute ALL checks (deterministic - bash domain)
# ============================================================================

echo "🔍 Executing checks/ (deterministic)..."
echo ""

GLOBAL_CHECKS_DIR="$HOME/Documents/backstage/backstage/checks/global"
LOCAL_CHECKS_DIR="backstage/checks/local"

CHECKS_PASS=true
CHECKS_RUN=0

# Collect all check filenames (basenames only)
declare -A LOCAL_CHECK_NAMES

if [ -d "$LOCAL_CHECKS_DIR" ]; then
    for check in "$LOCAL_CHECKS_DIR"/*.sh; do
        if [ -f "$check" ]; then
            basename_check=$(basename "$check")
            LOCAL_CHECK_NAMES["$basename_check"]=1
        fi
    done
fi

# Run global checks (skip if local has same name)
if [ -d "$GLOBAL_CHECKS_DIR" ]; then
    echo "  📋 Global checks:"
    for check in "$GLOBAL_CHECKS_DIR"/*.sh; do
        if [ -f "$check" ]; then
            basename_check=$(basename "$check")
            
            # Skip if local overrides
            if [ -n "${LOCAL_CHECK_NAMES[$basename_check]}" ]; then
                echo "    ⏭️  $basename_check (local override)"
                continue
            fi
            
            # Run check
            if bash "$check" >/dev/null 2>&1; then
                echo "    ✅ $basename_check"
            else
                echo "    ❌ $basename_check (failed)"
                CHECKS_PASS=false
            fi
            CHECKS_RUN=$((CHECKS_RUN + 1))
        fi
    done
else
    echo "  ⚠️  No global checks found ($GLOBAL_CHECKS_DIR)"
fi

echo ""

# Run local checks (always run, overrides global if same name)
if [ -d "$LOCAL_CHECKS_DIR" ]; then
    echo "  📋 Local checks:"
    for check in "$LOCAL_CHECKS_DIR"/*.sh; do
        if [ -f "$check" ]; then
            basename_check=$(basename "$check")
            
            # Run check
            if bash "$check" >/dev/null 2>&1; then
                echo "    ✅ $basename_check"
            else
                echo "    ❌ $basename_check (failed)"
                CHECKS_PASS=false
            fi
            CHECKS_RUN=$((CHECKS_RUN + 1))
        fi
    done
else
    echo "  ℹ️  No local checks found ($LOCAL_CHECKS_DIR)"
fi

echo ""
echo "  📊 Checks executed: $CHECKS_RUN"

# ============================================================================
# STEP 2: Read ALL policies (interpretive - AI domain)
# ============================================================================

echo ""
echo "📋 Reading policies/ (interpretive - AI enforces)..."
echo ""

GLOBAL_POLICIES_DIR="$HOME/Documents/backstage/backstage/policies/global"
LOCAL_POLICIES_DIR="backstage/policies/local"

POLICIES_READ=0

# Collect all policy filenames (basenames only)
declare -A LOCAL_POLICY_NAMES

if [ -d "$LOCAL_POLICIES_DIR" ]; then
    for policy in "$LOCAL_POLICIES_DIR"/*.md; do
        if [ -f "$policy" ]; then
            basename_policy=$(basename "$policy")
            LOCAL_POLICY_NAMES["$basename_policy"]=1
        fi
    done
fi

# Read global policies (skip if local has same name)
if [ -d "$GLOBAL_POLICIES_DIR" ]; then
    echo "  📋 Global policies:"
    for policy in "$GLOBAL_POLICIES_DIR"/*.md; do
        if [ -f "$policy" ]; then
            basename_policy=$(basename "$policy")
            
            # Skip if local overrides
            if [ -n "${LOCAL_POLICY_NAMES[$basename_policy]}" ]; then
                echo "    ⏭️  $basename_policy (local override)"
                continue
            fi
            
            echo "    ✅ $basename_policy (read)"
            POLICIES_READ=$((POLICIES_READ + 1))
        fi
    done
else
    echo "  ⚠️  No global policies found ($GLOBAL_POLICIES_DIR)"
fi

echo ""

# Read local policies (always read, overrides global if same name)
if [ -d "$LOCAL_POLICIES_DIR" ]; then
    echo "  📋 Local policies:"
    for policy in "$LOCAL_POLICIES_DIR"/*.md; do
        if [ -f "$policy" ]; then
            basename_policy=$(basename "$policy")
            echo "    ✅ $basename_policy (read)"
            POLICIES_READ=$((POLICIES_READ + 1))
        fi
    done
else
    echo "  ℹ️  No local policies found ($LOCAL_POLICIES_DIR)"
fi

echo ""
echo "  📊 Policies read: $POLICIES_READ"

# ============================================================================
# STEP 3: Integrated report
# ============================================================================

echo ""
echo "📊 Integrated Enforcement Report:"
echo ""

echo "🔍 Checks (deterministic):"
if [ "$CHECKS_PASS" = true ]; then
    echo "  ✅ All checks passed ($CHECKS_RUN executed)"
else
    echo "  ❌ Some checks failed (see above)"
fi

echo ""
echo "📋 Policies (interpretive):"
echo "  ✅ All policies read ($POLICIES_READ total)"
echo "  🤖 AI will enforce contextual rules"

echo ""

# ============================================================================
# STEP 4: Exit code (mode-aware)
# ============================================================================

if [ "$CHECKS_PASS" = true ]; then
    echo "✅ Enforcement complete (all deterministic checks passed)"
    exit 0
else
    if [ "$MODE" = "start" ]; then
        echo "🛑 Enforcement failed (blocking commit - fix issues above)"
        exit 1
    else
        echo "⚠️  Enforcement soft fail (add issues to ROADMAP)"
        exit 0
    fi
fi
