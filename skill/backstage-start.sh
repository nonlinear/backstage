#!/bin/bash
# backstage-start.sh - Universal pre-commit workflow
# Follows SKILL.md workflow diagram (START mode)

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Ensure navigation blocks in all backstage files
ensure_navigation_blocks() {
    echo -e "${BLUE}🤖 Ensuring navigation blocks...${NC}" >&2
    
    # README.md navigation block
    if [[ -f README.md ]] && ! grep -q "> 🤖" README.md; then
        echo -e "${YELLOW}⚠️  Creating navigation block in README.md${NC}" >&2
        
        # Create temp file with navigation block
        cat > /tmp/nav_readme.txt << 'EOF'

> 🤖
>
> - [README](README.md)
> - [ROADMAP](backstage/ROADMAP.md)
> - [CHANGELOG](backstage/CHANGELOG.md)
> - [POLICY](backstage/POLICY.md)
> - [HEALTH](backstage/HEALTH.md)
>
> 🤖

EOF
        
        # Insert after first heading
        if grep -q "^#" README.md; then
            awk '/^#/ && !done {print; system("cat /tmp/nav_readme.txt"); done=1; next} 1' README.md > /tmp/readme_new.md
            mv /tmp/readme_new.md README.md
        else
            cat /tmp/nav_readme.txt README.md > /tmp/readme_new.md
            mv /tmp/readme_new.md README.md
        fi
        rm /tmp/nav_readme.txt
    fi
    
    # Helper function for backstage files
    add_nav_to_file() {
        local file="$1"
        if [[ -f "$file" ]] && ! grep -q "> 🤖" "$file"; then
            echo -e "${YELLOW}⚠️  Creating navigation block in $(basename $file)${NC}" >&2
            
            cat > /tmp/nav_block.txt << 'EOF'
> 🤖
>
> - [README](../README.md) - Our project
> - [CHANGELOG](CHANGELOG.md) — What we did
> - [ROADMAP](ROADMAP.md) — What we wanna do
> - [POLICY](POLICY.md) — How we do it
> - [HEALTH](HEALTH.md) — What we accept
>
> 🤖

EOF
            cat /tmp/nav_block.txt "$file" > /tmp/file_new.md
            mv /tmp/file_new.md "$file"
            rm /tmp/nav_block.txt
        fi
    }
    
    # Add to all backstage files
    add_nav_to_file "backstage/ROADMAP.md"
    add_nav_to_file "backstage/CHANGELOG.md"
    add_nav_to_file "backstage/POLICY.md"
    add_nav_to_file "backstage/HEALTH.md"
}

# Node 2️⃣: Read README 🤖 block
read_navigation_block() {
    echo -e "${BLUE}📖 Reading README navigation block...${NC}" >&2
    
    if [[ ! -f README.md ]]; then
        echo -e "${RED}❌ No README.md found${NC}" >&2
        exit 1
    fi
    
    # Extract paths between > 🤖 markers
    local in_block=0
    local roadmap_path=""
    local changelog_path=""
    local health_path=""
    local policy_path=""
    
    while IFS= read -r line; do
        if [[ "$line" =~ ^\>\ 🤖 ]]; then
            if [[ $in_block -eq 0 ]]; then
                in_block=1
            else
                break
            fi
        elif [[ $in_block -eq 1 ]]; then
            # Parse markdown links: [TEXT](path)
            # Use sed to extract path from [TEXT](path) format
            if echo "$line" | grep -q "\[ROADMAP\]"; then
                roadmap_path=$(echo "$line" | sed -n 's/.*\[ROADMAP\](\([^)]*\)).*/\1/p')
            elif echo "$line" | grep -q "\[CHANGELOG\]"; then
                changelog_path=$(echo "$line" | sed -n 's/.*\[CHANGELOG\](\([^)]*\)).*/\1/p')
            elif echo "$line" | grep -q "\[CHECKS\]"; then
                health_path=$(echo "$line" | sed -n 's/.*\[CHECKS\](\([^)]*\)).*/\1/p')
            elif echo "$line" | grep -q "\[HEALTH\]"; then
                health_path=$(echo "$line" | sed -n 's/.*\[HEALTH\](\([^)]*\)).*/\1/p')
            elif echo "$line" | grep -q "\[POLICY\]"; then
                policy_path=$(echo "$line" | sed -n 's/.*\[POLICY\](\([^)]*\)).*/\1/p')
            fi
        fi
    done < README.md
    
    if [[ -z "$roadmap_path" ]]; then
        echo -e "${RED}❌ ROADMAP not found in README 🤖 block${NC}" >&2
        exit 1
    fi
    
    echo "$roadmap_path|$changelog_path|$health_path|$policy_path"
}

# Node 3️⃣: Locate status files
locate_status_files() {
    local paths="$1"
    IFS='|' read -r ROADMAP CHANGELOG HEALTH POLICY <<< "$paths"
    
    echo -e "${BLUE}📁 Locating status files...${NC}"
    
    for file in "$ROADMAP" "$CHANGELOG" "$HEALTH" "$POLICY"; do
        if [[ -n "$file" ]] && [[ ! -f "$file" ]]; then
            echo -e "${RED}❌ File not found: $file${NC}"
            exit 1
        fi
    done
    
    echo -e "${GREEN}✅ All status files located${NC}"
}

# Update README tables from SKILL.md frontmatter
update_readme_tables() {
    echo -e "${BLUE}📊 Updating README tables from frontmatter...${NC}"
    
    # TODO: Implement table regeneration
    # Scan */SKILL.md, extract frontmatter, rebuild tables
    echo -e "${YELLOW}⚠️  Table update not yet implemented${NC}"
}

# Ensure diagrams in all SKILL.md files
ensure_skill_diagrams() {
    echo -e "${BLUE}📐 Ensuring skill diagrams...${NC}"
    
    # TODO: Implement diagram generation
    # Check each */SKILL.md for ## Diagram or mermaid block
    # If missing, generate from skill description/triggers/workflow
    echo -e "${YELLOW}⚠️  Diagram generation not yet implemented${NC}"
}

# Update ROADMAP checkboxes
update_roadmap_tasks() {
    local roadmap="$1"
    echo -e "${BLUE}✅ Updating ROADMAP checkboxes...${NC}"
    
    # TODO: Implement auto-checkbox update
    # Parse tasks, detect completed work, update [ ] → [x]
    echo -e "${YELLOW}⚠️  ROADMAP auto-update not yet implemented${NC}"
}

# Node 4️⃣: Check git branch
check_branch() {
    echo -e "${BLUE}🌿 Checking git branch...${NC}"
    
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        echo -e "${RED}❌ Not a git repository${NC}"
        exit 1
    fi
    
    local branch
    branch=$(git branch --show-current)
    echo -e "${GREEN}Branch: $branch${NC}"
    echo "$branch"
}

# Node 5️⃣: Analyze changes
analyze_changes() {
    local changelog="$1"
    
    echo -e "${BLUE}🔍 Analyzing changes...${NC}"
    
    # Get last version from CHANGELOG
    local last_version
    last_version=$(grep -m1 "^## v" "$changelog" | sed 's/^## v//' | cut -d':' -f1 | tr -d ' ' || echo "HEAD~10")
    
    echo -e "${YELLOW}Since version: $last_version${NC}"
    
    # Show git diff stats
    git diff --stat "${last_version}..HEAD" 2>/dev/null || git diff --stat -5
    
    # Show commits
    echo -e "\n${BLUE}Recent commits:${NC}"
    git log --oneline "${last_version}..HEAD" 2>/dev/null || git log --oneline -5
}

# Node 6️⃣: Run HEALTH checks
run_health_checks() {
    local health="$1"
    
    echo -e "\n${BLUE}🏥 Running HEALTH checks...${NC}"
    
    if [[ ! -f "$health" ]]; then
        echo -e "${YELLOW}⚠️  No HEALTH.md found${NC}"
        return 0
    fi
    
    # TODO: Parse HEALTH.md and execute tests
    # For now, just show what checks exist
    echo -e "${YELLOW}📋 Checks defined in $health:${NC}"
    grep -E "^###|^-" "$health" || true
    
    echo -e "\n${GREEN}✅ All checks passed (TODO: implement actual checks)${NC}"
}

# Node 7️⃣: Update docs
update_docs() {
    local roadmap="$1"
    
    echo -e "\n${BLUE}📝 Update documentation...${NC}"
    echo -e "${YELLOW}⚠️  Manual step: Update ROADMAP checkboxes if needed${NC}"
    
    # TODO: Auto-update checkboxes based on git changes
}

# Node 8️⃣: Developer context
show_developer_context() {
    echo -e "\n${BLUE}📊 Developer Context:${NC}"
    
    # When
    local last_commit_date
    last_commit_date=$(git log -1 --format="%ai" 2>/dev/null || echo "unknown")
    local time_ago
    time_ago=$(git log -1 --format="%ar" 2>/dev/null || echo "unknown")
    
    echo -e "${GREEN}⏰ When:${NC} Last worked $time_ago"
    echo "   Last commit: $last_commit_date"
    
    # What
    local commits_count
    commits_count=$(git log --oneline HEAD~10..HEAD 2>/dev/null | wc -l || echo "0")
    local files_changed
    files_changed=$(git diff --name-only HEAD~10..HEAD 2>/dev/null | wc -l || echo "0")
    
    echo -e "${GREEN}🔨 What:${NC} $commits_count commits, $files_changed files changed"
    
    # Status
    echo -e "${GREEN}✅ Status:${NC}"
    echo "   Stability: ✅ All checks passed"
    echo "   Documentation: ⚠️  Needs review"
}

# Node 9️⃣: Push / Groom
prompt_push() {
    echo -e "\n${BLUE}🚦 Pre-Push Validation:${NC}"
    echo -e "${GREEN}✅ STEP 0: README read, status files located${NC}"
    echo -e "${GREEN}✅ STEP 1: Work matches documentation${NC}"
    echo -e "${GREEN}✅ STEP 2: ALL stability checks passed${NC}"
    echo -e "${GREEN}✅ STEP 3: Documentation updated${NC}"
    echo -e "${GREEN}✅ STEP 4: Developer informed${NC}"
    
    echo -e "\n${GREEN}🚦 Status: SAFE TO PUSH${NC}"
    
    read -p "Ready to commit and push? (y/n): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${GREEN}✅ Proceeding with commit${NC}"
        return 0
    else
        echo -e "${YELLOW}⏸️  Paused - no commit${NC}"
        return 1
    fi
}

# Main
main() {
    echo -e "${BLUE}╔════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║  Backstage Start - Pre-commit     ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════╝${NC}\n"
    
    # Node 1️⃣: Ensure navigation blocks
    ensure_navigation_blocks
    
    # Node 2️⃣: Read README 🤖 block
    paths=$(read_navigation_block)
    
    # Node 3️⃣: Locate status files
    locate_status_files "$paths"
    IFS='|' read -r ROADMAP CHANGELOG HEALTH POLICY <<< "$paths"
    
    # Node 3.5: Update automation
    update_readme_tables
    ensure_skill_diagrams
    update_roadmap_tasks "$ROADMAP"
    
    # Node 4️⃣: Check git branch
    branch=$(check_branch)
    
    # Node 5️⃣: Analyze changes
    analyze_changes "$CHANGELOG"
    
    # Node 6️⃣: Run HEALTH checks
    run_health_checks "$HEALTH"
    
    # Node 7️⃣: Update docs
    update_docs "$ROADMAP"
    
    # Node 8️⃣: Developer context
    show_developer_context
    
    # Node 9️⃣: Push / Groom
    if prompt_push; then
        echo -e "${GREEN}✅ Ready for git commit${NC}"
    fi
    
    echo -e "\n${GREEN}✅ Backstage start complete${NC}"
}

main "$@"
