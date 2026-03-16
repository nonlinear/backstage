#!/usr/bin/env python3
"""
Billable Hours - Complete Workflow

Phase 1: Discovery
  - Query Wiley Global Done tasks (current month)
  - Check billability via Wiley JPD milestone
  - Add to IEEE_timelog.md

Phase 2: Billing (optional, with --publish flag)
  - Read Pending entries with hours
  - Publish to Tempo API
  - Update status to Published

Usage:
  python3 billable_hours.py              # Phase 1 only
  python3 billable_hours.py --publish    # Phase 1 + Phase 2
  python3 billable_hours.py --publish-only  # Phase 2 only
"""

import subprocess
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent


def run_phase1():
    """Run discovery script"""
    print("="*60)
    print("PHASE 1: DISCOVERY")
    print("="*60)
    
    script = SCRIPT_DIR / "discover_billable.py"
    result = subprocess.run([sys.executable, str(script)])
    
    return result.returncode == 0


def run_phase2():
    """Run Tempo billing script"""
    print("\n" + "="*60)
    print("PHASE 2: TEMPO BILLING")
    print("="*60)
    
    script = SCRIPT_DIR / "publish_to_tempo.py"
    result = subprocess.run([sys.executable, str(script)])
    
    return result.returncode == 0


def main():
    """Main workflow orchestrator"""
    
    # Parse arguments
    publish = '--publish' in sys.argv
    publish_only = '--publish-only' in sys.argv
    
    if publish_only:
        # Skip discovery, run billing only
        success = run_phase2()
        sys.exit(0 if success else 1)
    
    # Always run Phase 1 (discovery)
    success = run_phase1()
    
    if not success:
        print("\n❌ Phase 1 failed, stopping")
        sys.exit(1)
    
    # If --publish flag, run Phase 2
    if publish:
        print("\n⏳ Waiting for manual hours input...")
        input("Press Enter when hours are filled in IEEE_timelog.md (or Ctrl+C to skip Phase 2)")
        
        success = run_phase2()
        sys.exit(0 if success else 1)
    else:
        print("\n✅ Phase 1 complete")
        print("\nNext steps:")
        print("1. Fill hours in ~/Documents/personal/wiley/IEEE_timelog.md")
        print("2. Run: python3 billable_hours.py --publish-only")


if __name__ == "__main__":
    main()
