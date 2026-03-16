#!/bin/bash
# Billable Hours - Complete Automation Workflow
#
# Phase 1: Discover billable tasks from Wiley Global Jira
# Phase 2: Publish worklogs to Tempo API

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Billable Hours Automation${NC}\n"

# Phase 1: Discovery
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}PHASE 1: DISCOVERY${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

python3 "$SCRIPT_DIR/discover_billable.py"

echo -e "\n${YELLOW}⏸  Phase 1 complete. Fill hours in IEEE_timelog.md${NC}"
echo -e "${YELLOW}Press Enter when ready to publish to Tempo (or Ctrl+C to stop)${NC}"
read

# Phase 2: Publish to Tempo
echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}PHASE 2: TEMPO BILLING${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

python3 "$SCRIPT_DIR/publish_to_tempo.py"

echo -e "\n${GREEN}✅ Billable hours automation complete!${NC}"
