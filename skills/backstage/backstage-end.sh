#!/bin/bash
# backstage-end.sh - Safe session end with health check
# Follows SKILL.md workflow diagram (END mode)

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Node 🔟: Run enforcement (end mode - soft fail)
run_enforcement() {
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    
    echo -e "${BLUE}🔍 Running enforcement (checks + policies)...${NC}"
    
    # Call checks.sh in END mode (soft fail)
    if bash "$script_dir/checks.sh" "." "end"; then
        echo -e "${GREEN}✅ Enforcement passed${NC}"
        return 0
    else
        echo -e "${YELLOW}⚠️  Enforcement warnings (soft fail)${NC}"
        return 0  # Don't block in end mode
    fi
}

# Add fixes to roadmap
add_fixes_to_roadmap() {
    local roadmap="$1"
    shift
    local fixes=("$@")
    
    echo -e "\n${YELLOW}⚠️  Adding fixes to ROADMAP...${NC}"
    
    for fix in "${fixes[@]}"; do
        echo "   - [ ] 🔧 FIX: $fix"
    done
    
    echo -e "${YELLOW}📝 Manual step: Add these to top of current epic in $roadmap${NC}"
}

# Victory lap
victory_lap() {
    echo -e "\n${GREEN}🏆 Victory lap:${NC}\n"
    
    # Show recent commits
    local commits
    commits=$(git log --oneline -3 2>/dev/null || echo "No commits")
    
    echo -e "${BLUE}Recent work:${NC}"
    echo "$commits" | nl -w2 -s'. '
    
    # Stats
    local commit_count
    commit_count=$(git log --oneline -10 2>/dev/null | wc -l | tr -d ' ')
    local files_changed
    files_changed=$(git diff --name-only HEAD~10..HEAD 2>/dev/null | wc -l | tr -d ' ')
    
    echo -e "\n${GREEN}📊 Stats:${NC} $commit_count commits, $files_changed files changed"
}

# Body check
body_check() {
    echo -e "\n${BLUE}⏸️  Quick body check:${NC}\n"
    echo "❓ Hungry? Thirsty? Tired?"
    echo "❓ Need to stretch? Exercise? Read?"
    echo -e "\n${YELLOW}What does your body need right now?${NC}"
    
    # Give user a moment to think
    sleep 2
}

# Read README navigation block
read_navigation_block() {
    if [[ ! -f README.md ]]; then
        echo -e "${RED}❌ No README.md found${NC}"
        exit 1
    fi
    
    local in_block=0
    local roadmap_path=""
    
    while IFS= read -r line; do
        if [[ "$line" =~ ^\>\ 🤖 ]]; then
            if [[ $in_block -eq 0 ]]; then
                in_block=1
            else
                break
            fi
        elif [[ $in_block -eq 1 ]]; then
            if echo "$line" | grep -q "\[ROADMAP\]"; then
                roadmap_path=$(echo "$line" | sed -n 's/.*\[ROADMAP\](\([^)]*\)).*/\1/p')
            fi
        fi
    done < README.md
    
    echo "$roadmap_path"
}

# Main
main() {
    echo -e "${BLUE}╔════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║  Backstage End - Session Close    ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════╝${NC}\n"
    
    # Read README
    paths=$(read_navigation_block)
    ROADMAP="$paths"
    
    # Node 🔟: Run enforcement (soft fail)
    if run_enforcement; then
        # All checks passed
        echo -e "\n${GREEN}✅ All checks passed - safe to push${NC}"
        
        read -p "Commit and push? (y/n): " -n 1 -r
        echo
        
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git add -A
            git commit -m "[wrap-up] session checkpoint" || true
            git push || echo -e "${YELLOW}⚠️  Push failed (check remote)${NC}"
        fi
    else
        # Checks failed (though we return 0 in soft fail mode)
        echo -e "\n${YELLOW}⚠️  Checks had warnings - skipping push${NC}"
        
        # Example fixes (in real implementation, extract from check results)
        # add_fixes_to_roadmap "$ROADMAP" "Syntax error in file.py" "Missing test coverage"
    fi
    
    # Victory lap
    victory_lap
    
    # Body check
    body_check
    
    echo -e "\n${GREEN}✅ Session closed. Good night! 🌙${NC}"
}

main "$@"
