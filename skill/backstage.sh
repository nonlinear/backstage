#!/bin/bash
# Backstage - Project Management Framework
# Version: 0.3.0 (OpenClaw Skill)

set -e

PROJECT_PATH="${2:-.}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠️  $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; }

# Check if backstage/ exists
check_backstage() {
    if [ ! -d "$PROJECT_PATH/backstage" ]; then
        error "No backstage/ folder found in $PROJECT_PATH"
        echo "Create one? (y/n)"
        read -r answer
        if [ "$answer" = "y" ]; then
            mkdir -p "$PROJECT_PATH/backstage"
            success "Created backstage/ folder"
        else
            exit 1
        fi
    fi
}

# Read and summarize markdown file (extract ## headers)
summarize_md() {
    local file="$1"
    if [ -f "$file" ]; then
        grep '^##' "$file" | head -10
    fi
}

# Extract and run bash blocks from markdown
run_health_checks() {
    local file="$1"
    local label="$2"
    
    if [ ! -f "$file" ]; then
        return 0
    fi
    
    info "Running $label checks from $(basename $file)..."
    
    # Extract bash blocks (lines between ```bash and ```)
    local in_block=0
    local temp_script="/tmp/backstage-health-$$.sh"
    
    while IFS= read -r line; do
        if [[ "$line" =~ ^\`\`\`bash ]]; then
            in_block=1
            echo "#!/bin/bash" > "$temp_script"
            continue
        elif [[ "$line" =~ ^\`\`\` ]] && [ $in_block -eq 1 ]; then
            in_block=0
            # Run the extracted script
            if bash "$temp_script" 2>&1; then
                success "$label check passed"
            else
                error "$label check failed"
                rm -f "$temp_script"
                return 1
            fi
        elif [ $in_block -eq 1 ]; then
            echo "$line" >> "$temp_script"
        fi
    done < "$file"
    
    rm -f "$temp_script"
    return 0
}

# Find next version from ROADMAP
next_version() {
    local roadmap="$PROJECT_PATH/backstage/ROADMAP.md"
    
    if [ ! -f "$roadmap" ]; then
        echo "v0.1.0"
        return
    fi
    
    # Find highest version number
    local last_version=$(grep -oE 'v[0-9]+\.[0-9]+\.[0-9]+' "$roadmap" | sort -V | tail -1)
    
    if [ -z "$last_version" ]; then
        echo "v0.1.0"
        return
    fi
    
    # Increment minor version
    local major=$(echo "$last_version" | cut -d'.' -f1 | tr -d 'v')
    local minor=$(echo "$last_version" | cut -d'.' -f2)
    local patch=$(echo "$last_version" | cut -d'.' -f3)
    
    minor=$((minor + 1))
    echo "v${major}.${minor}.0"
}

# Start command
cmd_start() {
    check_backstage
    
    echo ""
    echo "START_SESSION|$PROJECT_PATH"
    echo ""
    
    # === POLICY FILES (polycentric governance) ===
    
    # Global POLICY
    if [ -f "$PROJECT_PATH/backstage/global/POLICY.md" ]; then
        echo "POLICY_FOUND|global|$PROJECT_PATH/backstage/global/POLICY.md"
        info "Global POLICY sections:"
        summarize_md "$PROJECT_PATH/backstage/global/POLICY.md"
        echo ""
    fi
    
    # Project POLICY
    if [ -f "$PROJECT_PATH/backstage/POLICY.md" ]; then
        echo "POLICY_FOUND|project|$PROJECT_PATH/backstage/POLICY.md"
        info "Project POLICY sections (WINS over global):"
        summarize_md "$PROJECT_PATH/backstage/POLICY.md"
        echo ""
    fi
    
    # === HEALTH FILES ===
    
    # Global HEALTH
    if [ -f "$PROJECT_PATH/backstage/global/HEALTH.md" ]; then
        echo "HEALTH_FOUND|global|$PROJECT_PATH/backstage/global/HEALTH.md"
        info "Global HEALTH sections:"
        summarize_md "$PROJECT_PATH/backstage/global/HEALTH.md"
        echo ""
    fi
    
    # Project HEALTH
    if [ -f "$PROJECT_PATH/backstage/HEALTH.md" ]; then
        echo "HEALTH_FOUND|project|$PROJECT_PATH/backstage/HEALTH.md"
        info "Project HEALTH sections (project-specific checks):"
        summarize_md "$PROJECT_PATH/backstage/HEALTH.md"
        echo ""
    fi
    
    # === ROADMAP (active epics) ===
    
    if [ -f "$PROJECT_PATH/backstage/ROADMAP.md" ]; then
        echo "ROADMAP_FOUND|$PROJECT_PATH/backstage/ROADMAP.md"
        echo ""
        info "Active epics:"
        
        # Extract epic versions and titles
        grep -E '^## v[0-9]+\.[0-9]+\.[0-9]+|^### ' "$PROJECT_PATH/backstage/ROADMAP.md" | while read -r line; do
            if [[ "$line" =~ ^##\ v([0-9.]+) ]]; then
                version="${BASH_REMATCH[1]}"
            elif [[ "$line" =~ ^###\ (.+) ]]; then
                title="${BASH_REMATCH[1]}"
                # Detect status (⏳ planned, 🚧 active, ✅ done)
                if [[ "$title" =~ ⏳ ]]; then
                    status="planned"
                elif [[ "$title" =~ 🚧 ]]; then
                    status="active"
                else
                    status="unknown"
                fi
                echo "EPIC|v${version}|${title}|${status}"
            fi
        done
        echo ""
    else
        warn "No ROADMAP.md found"
    fi
    
    success "Session started! Ready to work."
    echo "SESSION_READY"
}

# Epic create command
cmd_epic_create() {
    local epic_name="$1"
    
    if [ -z "$epic_name" ]; then
        error "Usage: backstage.sh epic create <name>"
        exit 1
    fi
    
    check_backstage
    
    # Find next version
    local version=$(next_version)
    local slug=$(echo "$epic_name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
    
    info "Creating epic: $version - $epic_name"
    
    # Create epic-notes folder
    mkdir -p "$PROJECT_PATH/backstage/epic-notes"
    
    # Create epic note
    local epic_file="$PROJECT_PATH/backstage/epic-notes/${version}-${slug}.md"
    
    cat > "$epic_file" <<EOF
# Epic ${version}: ${epic_name}

**Status:** 🚧 Active

## Problem

[What problem does this solve?]

## Solution

[How will we solve it?]

## Tasks

- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

## Notes

[Session notes, decisions, discoveries]

EOF
    
    success "Created: $epic_file"
    echo "EPIC_CREATED|${version}|${slug}|${epic_file}"
    
    # Ask about branch
    echo ""
    info "Create git branch? (y/n)"
    read -r create_branch
    
    if [ "$create_branch" = "y" ]; then
        local branch_name="epic/${version}-${slug}"
        
        # Check if in git repo
        if git -C "$PROJECT_PATH" rev-parse --git-dir > /dev/null 2>&1; then
            git -C "$PROJECT_PATH" checkout -b "$branch_name"
            success "Created branch: $branch_name"
            echo "BRANCH_CREATED|${branch_name}"
        else
            warn "Not a git repository - skipping branch creation"
        fi
    fi
    
    echo ""
    success "Epic ready! Add to ROADMAP manually or via AI."
}

# Health command
cmd_health() {
    check_backstage
    
    echo "HEALTH_CHECK_START"
    echo ""
    
    local exit_code=0
    
    # Global HEALTH
    if [ -f "$PROJECT_PATH/backstage/global/HEALTH.md" ]; then
        if ! run_health_checks "$PROJECT_PATH/backstage/global/HEALTH.md" "Global"; then
            exit_code=1
        fi
    fi
    
    # Project HEALTH
    if [ -f "$PROJECT_PATH/backstage/HEALTH.md" ]; then
        if ! run_health_checks "$PROJECT_PATH/backstage/HEALTH.md" "Project"; then
            exit_code=1
        fi
    fi
    
    echo ""
    if [ $exit_code -eq 0 ]; then
        success "All health checks passed!"
        echo "HEALTH_CHECK_PASS"
    else
        error "Some health checks failed"
        echo "HEALTH_CHECK_FAIL"
    fi
    
    return $exit_code
}

# Close command
cmd_close() {
    info "Closing work session..."
    echo ""
    
    # Run health checks
    if cmd_health; then
        success "Health checks passed - safe to commit"
        
        # Ask if should commit
        echo ""
        info "Commit and push? (y/n)"
        read -r should_commit
        
        if [ "$should_commit" = "y" ]; then
            cd "$PROJECT_PATH"
            git add -A
            git commit -m "session wrap-up

Completed work on current epic.
All health checks passed."
            git push
            success "Committed and pushed!"
        fi
    else
        warn "Health checks failed - fix before committing"
        echo ""
        info "Add 🔧 FIX tasks to ROADMAP (manual for now)"
    fi
    
    echo ""
    info "💪 Body check: Hungry? Thirsty? Need to stretch?"
    echo ""
    success "Session closed! Good work today."
}

# Main command router
case "$1" in
    start)
        cmd_start
        ;;
    epic)
        case "$2" in
            create)
                cmd_epic_create "$3"
                ;;
            *)
                error "Unknown epic command: $2"
                echo "Usage: backstage.sh epic create <name>"
                exit 1
                ;;
        esac
        ;;
    health)
        cmd_health
        ;;
    close)
        cmd_close
        ;;
    *)
        error "Unknown command: $1"
        echo ""
        echo "Usage:"
        echo "  backstage.sh start [project-path]"
        echo "  backstage.sh epic create <name>"
        echo "  backstage.sh health"
        echo "  backstage.sh close"
        exit 1
        ;;
esac
