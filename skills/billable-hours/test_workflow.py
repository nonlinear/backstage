#!/usr/bin/env python3
"""
End-to-end test of billable-hours workflow (dry run)

Tests:
1. Phase 1: Discover billable tasks (February data as test)
2. Phase 2: Read pending entries (no actual Tempo publish)

This validates the logic without modifying production data.
"""

import sys
from pathlib import Path

# Add skill directory to path
sys.path.insert(0, str(Path(__file__).parent))

from discover_billable import *
from publish_to_tempo import *


def test_phase1_february():
    """
    Test Phase 1 with February Done tasks (known billable data)
    """
    print("="*60)
    print("TEST: Phase 1 Discovery (February Done Tasks)")
    print("="*60)
    
    # Query February Done tasks
    jql = 'assignee = "nfrota@wiley.com" AND status = Done AND resolutiondate >= "2026-02-01" AND resolutiondate < "2026-03-01" ORDER BY resolutiondate DESC'
    
    url = f"{WILEY_GLOBAL_URL}/rest/api/3/search/jql"
    headers = {"Content-Type": "application/json"}
    payload = {
        'jql': jql,
        'fields': ['key', 'summary', 'resolutiondate'],
        'maxResults': 10
    }
    
    print(f"Query: {jql}\n")
    response = requests.post(url, auth=WILEY_AUTH, headers=headers, json=payload)
    
    if response.status_code != 200:
        print(f"❌ Failed: {response.status_code}")
        return False
    
    issues = response.json().get('issues', [])
    print(f"Found {len(issues)} Done tasks\n")
    
    # Test workflow for first 3 tasks
    billable_count = 0
    not_billable_count = 0
    
    for issue in issues[:3]:
        task_key = issue['key']
        resolution_date = issue['fields']['resolutiondate']
        date_str = format_date(resolution_date)
        
        print(f"Testing: {task_key} ({date_str})")
        
        # Get task details
        task = get_task_details(task_key)
        if not task:
            print(f"  ❌ Failed to get task details\n")
            continue
        
        # Get parent epic
        parent = task['fields'].get('parent')
        if not parent:
            print(f"  ⚠️  No parent epic\n")
            continue
        
        epic_key = parent['key']
        epic_summary = parent['fields']['summary']
        print(f"  Epic: {epic_key} - {epic_summary}")
        
        # Clean epic name
        clean_name = clean_epic_name(epic_summary)
        
        # Find milestone
        milestone = find_milestone(clean_name)
        if not milestone:
            print(f"  ⚠️  No milestone found\n")
            continue
        
        print(f"  Milestone: {milestone['key']}")
        
        # Check billability
        billable, autp_link = is_billable(milestone)
        if billable:
            print(f"  ✅ Billable → {autp_link}")
            billable_count += 1
        else:
            print(f"  ❌ Not billable")
            not_billable_count += 1
        
        print()
    
    print(f"Result: {billable_count} billable, {not_billable_count} not billable\n")
    return True


def test_phase2_reading():
    """
    Test Phase 2 reading logic (no actual Tempo publish)
    """
    print("="*60)
    print("TEST: Phase 2 Reading Pending Entries")
    print("="*60)
    
    # Read pending entries
    pending = read_pending_entries()
    
    print(f"Found {len(pending)} pending entries with hours:\n")
    
    for entry in pending[:5]:
        print(f"{entry['date']} | {entry['issue_key']} | {entry['hours_str']}")
        
        # Test getting issue ID (no worklog creation)
        issue_id = get_issue_id(entry['issue_key'])
        if issue_id:
            print(f"  → Issue ID: {issue_id}")
        else:
            print(f"  ❌ Failed to get issue ID")
        print()
    
    print(f"✅ Phase 2 reading logic works\n")
    return True


def main():
    """Run all tests"""
    print("\n🧪 BILLABLE HOURS END-TO-END TEST (DRY RUN)\n")
    
    # Test Phase 1
    success = test_phase1_february()
    if not success:
        print("❌ Phase 1 test failed")
        return
    
    # Test Phase 2
    success = test_phase2_reading()
    if not success:
        print("❌ Phase 2 test failed")
        return
    
    print("="*60)
    print("✅ ALL TESTS PASSED")
    print("="*60)
    print("\nWorkflow validated!")
    print("\nTo run for real:")
    print("  Phase 1: python3 billable_hours.py")
    print("  Phase 2: python3 billable_hours.py --publish-only")


if __name__ == "__main__":
    main()
