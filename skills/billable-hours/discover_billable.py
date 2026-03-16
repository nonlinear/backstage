#!/usr/bin/env python3
"""
Phase 1: Discover billable tasks from Wiley Global Jira
- Query Done tasks from current month
- Get parent epic → search Wiley JPD milestone
- Check customfield_22822 (Timetracking AUTP Link)
- If exists → add to timelog, if not → skip
"""

import requests
import os
import sys
import re
from datetime import datetime, timedelta
from pathlib import Path

# Load credentials from .env
def load_env():
    env_path = Path.home() / "Documents" / "personal" / ".env"
    env = {}
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                # Handle inline comments
                if '#' in line:
                    line = line.split('#')[0].strip()
                key, value = line.split('=', 1)
                env[key.strip()] = value.strip()
    return env

ENV = load_env()

WILEY_EMAIL = ENV['WILEY_JIRA_EMAIL']
WILEY_TOKEN = ENV['WILEY_JIRA_TOKEN']
WILEY_AUTH = (WILEY_EMAIL, WILEY_TOKEN)

TIMELOG_PATH = Path.home() / "Documents" / "personal" / "wiley" / "IEEE_timelog.md"

# Wiley Global Jira
WILEY_GLOBAL_URL = "https://wiley-global.atlassian.net"
# Wiley JPD Jira
WILEY_JPD_URL = "https://wiley.atlassian.net"


def get_done_tasks_this_month(assignee="nfrota@wiley.com"):
    """
    Query Wiley Global Jira for Done tasks assigned to Nicholas this month
    
    Returns: List of task keys (e.g., ['UXPMS-258', 'UXPMS-259'])
    """
    # Get date range for current month
    now = datetime.now()
    start_of_month = now.replace(day=1).strftime('%Y-%m-%d')
    
    jql = f'assignee = "{assignee}" AND status = Done AND resolutiondate >= "{start_of_month}" ORDER BY resolutiondate DESC'
    
    # Use JQL search endpoint (new API)
    url = f"{WILEY_GLOBAL_URL}/rest/api/3/search/jql"
    headers = {"Content-Type": "application/json"}
    payload = {
        'jql': jql,
        'fields': ['key', 'summary', 'resolutiondate'],
        'maxResults': 100
    }
    
    print(f"🔍 Searching Wiley Global: {jql}")
    response = requests.post(url, auth=WILEY_AUTH, headers=headers, json=payload)
    
    if response.status_code != 200:
        print(f"❌ Failed to query Wiley Global: {response.status_code}")
        print(response.text)
        return []
    
    issues = response.json().get('issues', [])
    print(f"Found {len(issues)} Done tasks this month")
    
    return issues


def get_task_details(task_key):
    """
    Get task details including parent epic
    
    Returns: Task data with fields.parent
    """
    url = f"{WILEY_GLOBAL_URL}/rest/api/3/issue/{task_key}"
    params = {'fields': 'key,summary,parent,resolutiondate'}
    
    response = requests.get(url, auth=WILEY_AUTH, params=params)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"❌ Failed to get {task_key}: {response.status_code}")
        return None


def clean_epic_name(epic_summary):
    """
    Remove [UX] prefix from epic summary
    
    Example: "[UX] New Submission Question: AI Disclosure" 
             → "New Submission Question: AI Disclosure"
    """
    cleaned = re.sub(r'^\[UX\]\s*', '', epic_summary, flags=re.IGNORECASE)
    return cleaned.strip()


def find_milestone(epic_name):
    """
    Search Wiley JPD for milestone matching epic name
    
    Returns: Milestone data with customfield_22822 (Timetracking AUTP Link)
    """
    # Use JQL search endpoint (new API)
    url = f"{WILEY_JPD_URL}/rest/api/3/search/jql"
    headers = {"Content-Type": "application/json"}
    
    # Escape quotes in epic name
    epic_name_escaped = epic_name.replace('"', '\\"')
    
    payload = {
        "jql": f'type=Milestone AND summary~"{epic_name_escaped}"',
        "fields": ["key", "summary", "customfield_22822"],  # customfield_22822 = Timetracking AUTP Link
        "maxResults": 10
    }
    
    response = requests.post(url, auth=WILEY_AUTH, headers=headers, json=payload)
    
    if response.status_code != 200:
        print(f"❌ Wiley JPD API error: {response.status_code}")
        print(response.text)
        return None
    
    issues = response.json().get('issues', [])
    if issues:
        return issues[0]  # Return first match
    else:
        return None


def is_billable(milestone):
    """
    Check if milestone has Timetracking AUTP Link (customfield_22822)
    
    Returns: (is_billable, autp_link)
    """
    if not milestone:
        return False, None
    
    timetracking_link = milestone['fields'].get('customfield_22822')
    
    if timetracking_link and timetracking_link.strip():
        return True, timetracking_link
    else:
        return False, None


def format_date(iso_date):
    """
    Convert ISO date to "Feb 28, 2026" format
    
    Example: "2026-02-28T15:30:00.000-0500" → "Feb 28, 2026"
    """
    # Handle different timezone formats
    # Remove milliseconds if present
    if '.' in iso_date:
        iso_date = iso_date.split('.')[0] + iso_date.split('.')[-1][-6:]
    
    # Parse without timezone info (we only care about the date)
    date_part = iso_date.split('T')[0]
    dt = datetime.strptime(date_part, '%Y-%m-%d')
    return dt.strftime('%b %d, %Y')


def append_to_timelog(date_str, jira_task_key, autp_link):
    """
    Append new row to IEEE_timelog.md
    
    Format: | Mar 02, 2026 | [UXPMS-258](...) | [AUTP-646](...) | | Pending |
    """
    # Extract AUTP key from link (might be URL or plain key)
    if 'http' in autp_link:
        autp_match = re.search(r'(AUTP-\d+)', autp_link)
        autp_key = autp_match.group(1) if autp_match else autp_link
    else:
        autp_key = autp_link
    
    # Build URLs
    jira_url = f"https://wiley-global.atlassian.net/browse/{jira_task_key}"
    atypon_url = f"https://jira.prod.atypon.com/browse/{autp_key}"
    
    # New row format (matching existing structure)
    # | Date | Jira Issue | Timetracking | Hours | Status |
    new_row = f"| {date_str} | [{jira_task_key}]({jira_url}) | [{autp_key}]({atypon_url}) | | Pending |\n"
    
    # Read existing timelog
    with open(TIMELOG_PATH, 'r') as f:
        lines = f.readlines()
    
    # Check if this task already exists
    for line in lines:
        if jira_task_key in line and autp_key in line:
            print(f"  ⚠️  Already exists in timelog (skipping)")
            return False
    
    # Find insertion point (after header row)
    insert_index = None
    for i, line in enumerate(lines):
        if line.startswith('|---'):
            insert_index = i + 1
            break
    
    if insert_index is None:
        print(f"❌ Could not find table header in {TIMELOG_PATH}")
        return False
    
    # Insert new row
    lines.insert(insert_index, new_row)
    
    # Write back
    with open(TIMELOG_PATH, 'w') as f:
        f.writelines(lines)
    
    print(f"✅ Added: {date_str} | {jira_task_key} → {autp_key}")
    return True


def main():
    """
    Phase 1: Discovery workflow
    """
    print("🚀 Starting billable hours discovery (Phase 1)\n")
    
    # Step 1: Get Done tasks from Wiley Global
    done_tasks = get_done_tasks_this_month()
    
    if not done_tasks:
        print("No Done tasks found this month")
        return
    
    # Counters
    added_count = 0
    skipped_no_parent = 0
    skipped_no_milestone = 0
    skipped_not_billable = 0
    
    # Step 2: Process each task
    for task in done_tasks:
        task_key = task['key']
        resolution_date = task['fields']['resolutiondate']
        date_str = format_date(resolution_date)
        
        print(f"\n📋 Processing {task_key} (resolved {date_str})")
        
        # Get full task details
        task_details = get_task_details(task_key)
        if not task_details:
            continue
        
        # Step 3: Get parent epic
        parent = task_details['fields'].get('parent')
        if not parent:
            print(f"  ⚠️  No parent epic (skipping)")
            skipped_no_parent += 1
            continue
        
        epic_key = parent['key']
        epic_summary = parent['fields']['summary']
        print(f"  → Epic: {epic_key} - {epic_summary}")
        
        # Step 4: Clean epic name for Wiley JPD search
        clean_name = clean_epic_name(epic_summary)
        print(f"  → Searching Wiley JPD milestone: '{clean_name}'")
        
        # Step 5: Find milestone in Wiley JPD
        milestone = find_milestone(clean_name)
        
        if not milestone:
            print(f"  ⚠️  No milestone found (skipping)")
            skipped_no_milestone += 1
            continue
        
        milestone_key = milestone['key']
        print(f"  → Found milestone: {milestone_key}")
        
        # Step 6: Check if billable (customfield_22822 exists)
        billable, autp_link = is_billable(milestone)
        
        if not billable:
            print(f"  ❌ Not billable (customfield_22822 is null)")
            skipped_not_billable += 1
            continue
        
        print(f"  ✅ Billable! Timetracking: {autp_link}")
        
        # Step 7: Append to timelog
        append_to_timelog(date_str, task_key, autp_link)
        added_count += 1
    
    # Summary
    print("\n" + "="*50)
    print("📊 Discovery Complete")
    print("="*50)
    print(f"✅ Added to timelog: {added_count}")
    print(f"⚠️  Skipped (no parent): {skipped_no_parent}")
    print(f"⚠️  Skipped (no milestone): {skipped_no_milestone}")
    print(f"❌ Skipped (not billable): {skipped_not_billable}")
    print(f"\nNext: Fill hours in {TIMELOG_PATH}, then run Phase 2 (Tempo billing)")


if __name__ == "__main__":
    main()
