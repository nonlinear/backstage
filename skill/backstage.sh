#!/bin/bash
# Backstage - Project Management Framework
# Version: 0.3.0 (OpenClaw Skill)

set -e

PROJECT_PATH="${2:-.}"
REPO_OWNER="nonlinear"
REPO_NAME="backstage"
REPO_BRANCH="main"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Helper functions
info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠️  $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; }

# ============================================================================
# INSTALL BACKSTAGE
# ============================================================================
install_backstage() {
    local target_dir="$PROJECT_PATH/backstage"
    
    info "Installing backstage from github.com/${REPO_OWNER}/${REPO_NAME}..."
    
    # Create backstage directory
    mkdir -p "$target_dir/global"
    
    # Fetch templates
    local temp_dir="/tmp/backstage-install-$$"
    mkdir -p "$temp_dir"
    
    info "Fetching files from repo..."
    
    # Download templates
    for template in ROADMAP CHANGELOG POLICY HEALTH; do
        local url="https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/templates/${template}-template.md"
        local dest="$target_dir/${template}.md"
        
        if curl -fsSL "$url" -o "$dest" 2>/dev/null; then
            success "Copied ${template}.md"
        else
            warn "Could not fetch ${template}-template.md (continuing)"
        fi
    done
    
    # Download global files
    for global_file in POLICY.md HEALTH.md; do
        local url="https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/backstage/global/${global_file}"
        local dest="$target_dir/global/${global_file}"
        
        if curl -fsSL "$url" -o "$dest" 2>/dev/null; then
            success "Copied global/${global_file}"
        else
            error "Failed to fetch global/${global_file}"
            rm -rf "$temp_dir"
            return 1
        fi
    done
    
    rm -rf "$temp_dir"
    
    success "Backstage installed!"
    echo ""
    info "Next: Edit backstage/ROADMAP.md to plan your project"
}

# ============================================================================
# UPDATE BACKSTAGE
# ============================================================================
get_local_version() {
    # Read version from navigation block in README
    local readme="$PROJECT_PATH/backstage/README.md"
    
    if [ ! -f "$readme" ]; then
        echo "v0.0.0"
        return
    fi
    
    grep "backstage rules" "$readme" | grep -oE 'v[0-9.]+' | head -1 || echo "v0.0.0"
}

get_remote_version() {
    # Fetch version from remote README
    local url="https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/README.md"
    
    if curl -fsSL "$url" 2>/dev/null | grep "backstage rules" | grep -oE 'v[0-9.]+' | head -1; then
        return 0
    else
        echo "v0.0.0"
        return 1
    fi
}

check_update_timestamp() {
    local timestamp_file="$PROJECT_PATH/backstage/.last-update-check"
    local today=$(date +%Y-%m-%d)
    
    if [ -f "$timestamp_file" ]; then
        local last_check=$(cat "$timestamp_file" | cut -d'|' -f1)
        local last_answer=$(cat "$timestamp_file" | cut -d'|' -f2)
        
        if [ "$last_check" = "$today" ] && [ "$last_answer" = "no" ]; then
            # Already asked today, user said no
            return 1
        fi
    fi
    
    return 0
}

save_update_timestamp() {
    local answer="$1"
    local timestamp_file="$PROJECT_PATH/backstage/.last-update-check"
    local today=$(date +%Y-%m-%d)
    
    echo "${today}|${answer}" > "$timestamp_file"
}

show_update_tease() {
    local local_ver="$1"
    local remote_ver="$2"
    
    echo ""
    info "🔄 Backstage ${remote_ver} available"
    echo ""
    echo "The protocol learned to automate itself. Health checks run in the background,"
    echo "epics create themselves with the right version numbers, and you can finally"
    echo "see the whole workflow as a diagram instead of imagining it."
    echo ""
    echo "Oh, and it stops asking you to update every five minutes."
    echo ""
    echo "Full story: https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/${REPO_BRANCH}/CHANGELOG.md"
    echo "Browse the skill: https://github.com/${REPO_OWNER}/${REPO_NAME}/tree/${REPO_BRANCH}/skill"
    echo "Updated rules: https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/${REPO_BRANCH}/backstage/global/POLICY.md"
    echo ""
}

update_backstage() {
    info "Updating backstage from github.com/${REPO_OWNER}/${REPO_NAME}..."
    
    # Backup current global/ (just in case)
    if [ -d "$PROJECT_PATH/backstage/global" ]; then
        cp -r "$PROJECT_PATH/backstage/global" "$PROJECT_PATH/backstage/global.bak"
    fi
    
    # Delete and replace global/
    rm -rf "$PROJECT_PATH/backstage/global"
    mkdir -p "$PROJECT_PATH/backstage/global"
    
    # Download global files
    for global_file in POLICY.md HEALTH.md; do
        local url="https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/backstage/global/${global_file}"
        local dest="$PROJECT_PATH/backstage/global/${global_file}"
        
        if curl -fsSL "$url" -o "$dest" 2>/dev/null; then
            success "Updated global/${global_file}"
        else
            error "Failed to fetch global/${global_file}"
            # Restore backup
            if [ -d "$PROJECT_PATH/backstage/global.bak" ]; then
                rm -rf "$PROJECT_PATH/backstage/global"
                mv "$PROJECT_PATH/backstage/global.bak" "$PROJECT_PATH/backstage/global"
            fi
            return 1
        fi
    done
    
    # Remove backup
    rm -rf "$PROJECT_PATH/backstage/global.bak"
    
    success "Backstage updated!"
    
    # Update navigation blocks (will be done by global/POLICY execution)
    info "Run 'backstage.sh start' to update navigation blocks"
}

check_for_updates() {
    # Skip if already checked today and user said no
    if ! check_update_timestamp; then
        return 0
    fi
    
    local local_ver=$(get_local_version)
    local remote_ver=$(get_remote_version)
    
    if [ $? -ne 0 ]; then
        warn "⚠️  Network error - couldn't check for updates"
        return 0
    fi
    
    if [ "$local_ver" != "$remote_ver" ]; then
        show_update_tease "$local_ver" "$remote_ver"
        
        echo -n "Update? (y/n): "
        read -r answer
        
        save_update_timestamp "$answer"
        
        if [ "$answer" = "y" ]; then
            update_backstage
        else
            info "Skipping update (won't ask again today)"
        fi
    fi
}

# ============================================================================
# HEALTH CHECKS
# ============================================================================
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
    local has_checks=0
    
    while IFS= read -r line; do
        if [[ "$line" =~ ^\`\`\`bash ]]; then
            in_block=1
            has_checks=1
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
    
    if [ $has_checks -eq 0 ]; then
        info "No checks defined in $label"
    fi
    
    return 0
}

cmd_health() {
    local project_root="$PROJECT_PATH"
    
    if [ ! -d "$project_root/backstage" ]; then
        warn "No backstage/ folder found"
        return 1
    fi
    
    echo ""
    info "🏥 Running health checks..."
    echo ""
    
    local exit_code=0
    local failed_checks=()
    
    # Global HEALTH
    if [ -f "$project_root/backstage/global/HEALTH.md" ]; then
        if ! run_health_checks "$project_root/backstage/global/HEALTH.md" "Global"; then
            exit_code=1
            failed_checks+=("Global HEALTH")
        fi
    fi
    
    # Project HEALTH (overrides global)
    if [ -f "$project_root/backstage/HEALTH.md" ]; then
        if ! run_health_checks "$project_root/backstage/HEALTH.md" "Project"; then
            exit_code=1
            failed_checks+=("Project HEALTH")
        fi
    fi
    
    echo ""
    
    if [ $exit_code -eq 0 ]; then
        success "All health checks passed!"
        return 0
    else
        error "Failed checks: ${failed_checks[*]}"
        echo ""
        warn "User + AI: Review failures above and fix case-by-case"
        return 1
    fi
}

# ============================================================================
# START COMMAND (Main Flow)
# ============================================================================
update_navigation_blocks() {
    local project_root="$1"
    local backstage_dir="$project_root/backstage"
    
    # Extract version from global/POLICY.md
    local version=$(grep -m1 "backstage rules.*v[0-9]" "$backstage_dir/global/POLICY.md" | sed 's/.*v\([0-9.]*\).*/\1/' 2>/dev/null || echo "0.0.0")
    
    # Extract mermaid diagram from ROADMAP.md
    local mermaid_diagram=""
    if [ -f "$backstage_dir/ROADMAP.md" ]; then
        mermaid_diagram=$(awk '/^```mermaid$/,/^```$/' "$backstage_dir/ROADMAP.md")
    fi
    
    # Generate navigation block and save to temp file
    local nav_temp="/tmp/backstage_nav_$$.md"
    cat > "$nav_temp" <<'NAVEOF'
> 🤖
> | Backstage files | Description |
> | ---------------------------------------------------------------------------- | ------------------ |
> | [README](READMEPATH) | Our project |
> | [CHANGELOG](CHANGELOGPATH) | What we did |
> | [ROADMAP](ROADMAPPATH) | What we wanna do |
> | POLICY: [project](POLICYPATH), [global](GLOBALPOLICYPATH) | How we go about it |
> | CHECKS: [project](HEALTHPATH), [global](GLOBALHEALTHPATH) | What we accept |
> | We use **[backstage rules](https://github.com/nonlinear/backstage)**, vVERSION |
> 🤖
NAVEOF
    
    # Update file with navigation block (always at end)
    update_file_nav() {
        local file="$1"
        local readme_rel="$2"
        local others_rel="$3"
        
        [ ! -f "$file" ] && return
        
        # Create nav block with correct paths (global first to avoid partial matches)
        local nav_block=$(cat "$nav_temp")
        nav_block="${nav_block//GLOBALPOLICYPATH/${others_rel}global/POLICY.md}"
        nav_block="${nav_block//GLOBALHEALTHPATH/${others_rel}global/HEALTH.md}"
        nav_block="${nav_block//READMEPATH/${readme_rel}README.md}"
        nav_block="${nav_block//CHANGELOGPATH/${others_rel}CHANGELOG.md}"
        nav_block="${nav_block//ROADMAPPATH/${others_rel}ROADMAP.md}"
        nav_block="${nav_block//POLICYPATH/${others_rel}POLICY.md}"
        nav_block="${nav_block//HEALTHPATH/${others_rel}HEALTH.md}"
        nav_block="${nav_block//VERSION/${version}}"
        
        # Remove old nav block AND old mermaid diagrams
        local temp="${file}.navtmp"
        
        # Step 1: Remove everything between > 🤖 markers
        if grep -q "^> 🤖" "$file"; then
            awk 'BEGIN{skip=0} /^> 🤖/{if(skip==0){skip=1}else{skip=0}; next} !skip' "$file" > "$temp"
        else
            cp "$file" "$temp"
        fi
        
        # Step 2: Remove ALL mermaid blocks (```mermaid ... ```)
        perl -i -0pe 's/```mermaid.*?```\n*//gs' "$temp"
        
        # Always append at end (nav block + mermaid if exists)
        cat "$temp" > "$file"
        echo "" >> "$file"
        echo "$nav_block" >> "$file"
        
        # Add mermaid diagram after navigation block (if exists)
        if [ -n "$mermaid_diagram" ]; then
            echo "" >> "$file"
            echo "$mermaid_diagram" >> "$file"
        fi
        
        rm -f "$temp"
    }
    
    # Update all files (nav at end, no exceptions)
    # README uses backstage/ prefix, others use relative paths
    local files_and_paths=(
        "$project_root/README.md:backstage/:backstage/"
        "$backstage_dir/ROADMAP.md:../::"
        "$backstage_dir/CHANGELOG.md:../::"
        "$backstage_dir/POLICY.md:../::"
        "$backstage_dir/HEALTH.md:../::"
    )
    
    for entry in "${files_and_paths[@]}"; do
        IFS=':' read -r file readme_rel others_rel <<< "$entry"
        update_file_nav "$file" "$readme_rel" "$others_rel"
    done
    
    rm -f "$nav_temp"
    info "Navigation blocks updated (v${version})"
}

cmd_start() {
    local project_root="$PROJECT_PATH"
    
    # Check if backstage exists
    if [ ! -d "$project_root/backstage" ]; then
        warn "No backstage/ folder found in $project_root"
        echo ""
        echo -n "Install backstage? (y/n): "
        read -r answer
        
        if [ "$answer" = "y" ]; then
            install_backstage
            echo ""
        else
            error "Cannot proceed without backstage/"
            exit 1
        fi
    fi
    
    # Check for updates (if applicable)
    check_for_updates
    
    echo ""
    info "📋 Executing protocols..."
    echo ""
    
    # Read POLICY (global + project, project wins)
    # Execute POLICY protocol (update navigation blocks, etc)
    info "POLICY protocol: Project wins over global"
    
    # Update navigation blocks in all backstage files
    if ! update_navigation_blocks "$PROJECT_PATH"; then
        error "Failed to update navigation blocks"
        return 1
    fi
    
    echo ""
    
    # Run HEALTH checks
    if cmd_health; then
        echo ""
        success "✅ Ready to work!"
    else
        echo ""
        warn "⚠️  Fix health check failures before continuing"
    fi
    
    echo ""
    
    # Display what's next (from global POLICY)
    info "📌 What's next?"
    echo ""
    
    if [ -f "$project_root/backstage/ROADMAP.md" ]; then
        echo "Active epics:"
        grep -E '^## v[0-9.]+|^### ' "$project_root/backstage/ROADMAP.md" 2>/dev/null | head -10 || echo "  (none yet)"
    else
        echo "  No ROADMAP.md - create your first epic!"
    fi
    
    echo ""
    success "Session ready! 🚀"
}

# ============================================================================
# MAIN COMMAND ROUTER
# ============================================================================
case "$1" in
    start)
        cmd_start
        ;;
    health)
        cmd_health
        ;;
    install)
        install_backstage
        ;;
    update)
        update_backstage
        ;;
    *)
        error "Unknown command: $1"
        echo ""
        echo "Usage:"
        echo "  backstage.sh start [project-path]    # Main workflow"
        echo "  backstage.sh health                  # Run health checks only"
        echo "  backstage.sh install                 # Install backstage manually"
        echo "  backstage.sh update                  # Force update (skip checks)"
        exit 1
        ;;
esac
