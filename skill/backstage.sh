#!/bin/bash
# Backstage - Thin wrapper that delegates to AI via POLICY prompts
# Version: 0.3.0 (OpenClaw Skill - AI-driven)

set -e

COMMAND="${1:-start}"
PROJECT_PATH="${2:-.}"
BACKSTAGE_DIR="$PROJECT_PATH/backstage"

# Colors
info() { echo -e "\033[0;34mℹ️  $1\033[0m"; }
success() { echo -e "\033[0;32m✅ $1\033[0m"; }
error() { echo -e "\033[0;31m❌ $1\033[0m"; }

# Check if backstage exists
if [ ! -d "$BACKSTAGE_DIR" ]; then
    error "No backstage/ found in $PROJECT_PATH"
    echo ""
    echo "This skill requires backstage framework to be installed."
    echo "See: https://github.com/nonlinear/backstage"
    exit 1
fi

# Check if POLICY exists
if [ ! -f "$BACKSTAGE_DIR/global/POLICY.md" ]; then
    error "Missing backstage/global/POLICY.md"
    exit 1
fi

info "🤖 Backstage AI Protocol Execution"
echo ""
echo "Project: $PROJECT_PATH"
echo "Command: $COMMAND"
echo ""

case "$COMMAND" in
    start)
        echo "📋 AI will execute: backstage-start workflow"
        echo ""
        echo "Steps (defined in POLICY.md):"
        echo "  1. Run HEALTH checks (global + project)"
        echo "  2. Update navigation blocks (table + mermaid)"
        echo "  3. Sync ROADMAP with work done"
        echo "  4. Display 'What's next'"
        echo ""
        info "Reading POLICY context..."
        cat "$BACKSTAGE_DIR/global/POLICY.md"
        [ -f "$BACKSTAGE_DIR/POLICY.md" ] && cat "$BACKSTAGE_DIR/POLICY.md"
        ;;
        
    health)
        echo "🏥 AI will execute: Health checks only"
        echo ""
        info "Reading HEALTH context..."
        cat "$BACKSTAGE_DIR/global/HEALTH.md"
        [ -f "$BACKSTAGE_DIR/HEALTH.md" ] && cat "$BACKSTAGE_DIR/HEALTH.md"
        ;;
        
    close)
        echo "📌 AI will execute: backstage-close workflow"
        echo ""
        echo "Modes:"
        echo "  - Regular: commit + push + victory lap"
        echo "  - Merge: if user says 'epic is completed, merge'"
        echo ""
        info "Reading POLICY + HEALTH context..."
        cat "$BACKSTAGE_DIR/global/POLICY.md"
        [ -f "$BACKSTAGE_DIR/POLICY.md" ] && cat "$BACKSTAGE_DIR/POLICY.md"
        [ -f "$BACKSTAGE_DIR/HEALTH.md" ] && cat "$BACKSTAGE_DIR/HEALTH.md"
        ;;
        
    update)
        echo "🔄 AI will execute: backstage-update workflow"
        echo ""
        info "Reading POLICY context..."
        cat "$BACKSTAGE_DIR/global/POLICY.md"
        ;;
        
    *)
        error "Unknown command: $COMMAND"
        echo ""
        echo "Usage:"
        echo "  backstage.sh start [path]   # Main workflow (AI executes)"
        echo "  backstage.sh health [path]  # Health checks only"
        echo "  backstage.sh close [path]   # Close workflow (includes merge if epic done)"
        echo "  backstage.sh update [path]  # Update framework"
        exit 1
        ;;
esac

echo ""
info "✅ POLICY dumped - AI should execute protocol above"
info "📌 This is a THIN WRAPPER - all logic lives in POLICY.md"

exit 0
