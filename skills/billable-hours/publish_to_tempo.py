#!/usr/bin/env python3
"""
Phase 2: Publish worklogs to Tempo API
- Read IEEE_timelog.md
- Find rows with Status = Pending AND Hours filled
- Get numeric issue ID from Atypon Jira
- Create worklog via Tempo API
- Update Status to Published
"""

import requests
import os
import re
from datetime import datetime
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
TEMPO_TOKEN = ENV['TEMPO_API_TOKEN_NEW']
TEMPO_ACCOUNT_ID = ENV['TEMPO_ACCOUNT_ID']

TIMELOG_PATH = Path.home() / "Documents" / "personal" / "wiley" / "IEEE_timelog.md"

# Atypon Jira (for getting issue ID)
ATYPON_JIRA_URL = "https://atypon.atlassian.net"
# Tempo API
TEMPO_API_URL = "https://api.tempo.io/4"


def parse_hours(hours_str):
    """
    Convert hours string to seconds
    
    Examples:
      "3h" → 10800
      "3.5h" → 12600
      "3" → 10800
    """
    if not hours_str or hours_str.strip() == '':
        return None
    
    # Remove 'h' suffix if present
    hours_str = hours_str.strip().replace('h', '')
    
    try:
        hours = float(hours_str)
        return int(hours * 3600)
    except ValueError:
        return None


def get_issue_id(issue_key):
    """
    Get numeric issue ID from Atypon Jira
    
    Example: AUTP-646 → 365181
    """
    url = f"{ATYPON_JIRA_URL}/rest/api/3/issue/{issue_key}"
    auth = (WILEY_EMAIL, WILEY_TOKEN)
    
    response = requests.get(url, auth=auth)
    
    if response.status_code == 200:
        return response.json()['id']
    else:
        print(f"❌ Failed to get issue ID for {issue_key}: {response.status_code}")
        return None


def create_worklog(issue_id, issue_key, date_str, hours_seconds, description="IEEE work"):
    """
    Create worklog via Tempo API
    
    Returns: (success, worklog_id or error_message)
    """
    # Convert date string "Feb 28, 2026" to "2026-02-28"
    dt = datetime.strptime(date_str, '%b %d, %Y')
    start_date = dt.strftime('%Y-%m-%d')
    
    headers = {
        "Authorization": f"Bearer {TEMPO_TOKEN}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "issueId": int(issue_id),
        "timeSpentSeconds": hours_seconds,
        "startDate": start_date,
        "startTime": "09:00:00",
        "description": f"{description} - {date_str} (automated entry)",
        "authorAccountId": TEMPO_ACCOUNT_ID
    }
    
    url = f"{TEMPO_API_URL}/worklogs"
    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code == 200:
        worklog_id = response.json()['tempoWorklogId']
        return True, worklog_id
    else:
        error_msg = f"{response.status_code}: {response.text}"
        return False, error_msg


def read_pending_entries():
    """
    Read IEEE_timelog.md and extract Pending entries with Hours filled
    
    Returns: List of dicts with {line_index, date, issue_key, hours_seconds}
    """
    with open(TIMELOG_PATH, 'r') as f:
        lines = f.readlines()
    
    pending_entries = []
    
    for i, line in enumerate(lines):
        # Skip non-table rows
        if not line.startswith('| '):
            continue
        
        # Parse table row
        # Format: | Mar 02, 2026 |  | [AUTP-646](...) | 3h | Pending |
        parts = [p.strip() for p in line.split('|')]
        
        if len(parts) < 6:
            continue
        
        date_str = parts[1]
        timetracking_col = parts[3]  # Column with [AUTP-XXX](...)
        hours_str = parts[4]
        status = parts[5]
        
        # Only process Pending rows with Hours filled
        if status != 'Pending':
            continue
        
        # Extract issue key from link
        match = re.search(r'\[([A-Z]+-\d+)\]', timetracking_col)
        if not match:
            continue
        
        issue_key = match.group(1)
        
        # Parse hours
        hours_seconds = parse_hours(hours_str)
        if not hours_seconds:
            print(f"⚠️  Skipping {issue_key} ({date_str}): No hours filled")
            continue
        
        pending_entries.append({
            'line_index': i,
            'date': date_str,
            'issue_key': issue_key,
            'hours_seconds': hours_seconds,
            'hours_str': hours_str
        })
    
    return pending_entries


def update_status_to_published(line_index, worklog_id):
    """
    Update timelog row status from Pending → Published
    
    Also add Tempo worklog ID as reference
    """
    with open(TIMELOG_PATH, 'r') as f:
        lines = f.readlines()
    
    line = lines[line_index]
    
    # Replace Pending with Published
    updated_line = line.replace('| Pending |', f'| Published |')
    
    lines[line_index] = updated_line
    
    with open(TIMELOG_PATH, 'w') as f:
        f.writelines(lines)
    
    print(f"  ✅ Status → Published (Worklog ID: {worklog_id})")


def main():
    """
    Phase 2: Tempo billing workflow
    """
    print("🚀 Starting Tempo billing (Phase 2)\n")
    
    # Step 1: Read pending entries
    pending_entries = read_pending_entries()
    
    if not pending_entries:
        print("No pending entries with hours filled")
        return
    
    print(f"Found {len(pending_entries)} pending entries to publish\n")
    
    # Counters
    success_count = 0
    failed_count = 0
    
    # Step 2: Process each entry
    for entry in pending_entries:
        issue_key = entry['issue_key']
        date_str = entry['date']
        hours_str = entry['hours_str']
        hours_seconds = entry['hours_seconds']
        
        print(f"📋 Processing: {date_str} | {issue_key} | {hours_str}")
        
        # Step 3: Get numeric issue ID
        issue_id = get_issue_id(issue_key)
        if not issue_id:
            print(f"  ❌ Failed to get issue ID")
            failed_count += 1
            continue
        
        print(f"  → Issue ID: {issue_id}")
        
        # Step 4: Create worklog
        success, result = create_worklog(issue_id, issue_key, date_str, hours_seconds)
        
        if success:
            worklog_id = result
            print(f"  ✅ Worklog created: {worklog_id}")
            
            # Step 5: Update status to Published
            update_status_to_published(entry['line_index'], worklog_id)
            success_count += 1
        else:
            error_msg = result
            print(f"  ❌ Failed to create worklog: {error_msg}")
            failed_count += 1
    
    # Summary
    print("\n" + "="*50)
    print("📊 Billing Complete")
    print("="*50)
    print(f"✅ Published: {success_count}")
    print(f"❌ Failed: {failed_count}")


if __name__ == "__main__":
    main()
