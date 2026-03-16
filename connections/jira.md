---
service: Jira
description: "Read tasks, check deadlines, search issues (JQL), update issue status/assignee/description (requires confirmation), or batch update issues"
api: "REST API v3"
auth: "Basic Auth (email + API token in .env)"
---

# Jira Integration

**What it is:** Atlassian Jira REST API v3 for issue tracking, task management, project planning.

**When to use:**
- Read tasks, check deadlines, view descriptions
- Update issues (status, assignee, descriptions) - **REQUIRES USER CONFIRMATION**
- Batch operations - **REQUIRES EXPLICIT USER CONFIRMATION**
- Search JQL (Jira Query Language)

---

## Token Info

- **Obtained:** 2026-02-12
- **Expires:** 2027-02-12
- **Renew at:** https://id.atlassian.com/manage-profile/security/api-tokens
- **Scope:** read-write (all Jira projects)
- **Variable:** `WILEY_JIRA_TOKEN` (~/Documents/life/.env)
- **Calendar reminder:** 2027-02-05 (7 days before expiry)

---

## Authentication

**Two Jira instances available:**

### 1. Wiley Jira (PRIMARY)
- **URL:** https://wiley-global.atlassian.net
- **Email:** nfrota@wiley.com
- **API Token:** `$WILEY_JIRA_TOKEN` (set in `.env`)
- **Projects:** UXPMS, RPM, all work tasks
- **Use for:** RPM Design Discrepancy, Wiley project tasks

### 2. Atypon Jira (SECONDARY)
- **URL:** https://atypon.atlassian.net
- **Email:** nfrota@wiley.com
- **API Token:** `$ATYPON_JIRA_TOKEN` (set in `.env`)
- **Projects:** AUTP (Authors Platform), Atypon tasks
- **Use for:** Authors Platform work, Atypon-specific issues

**Either token works for their respective instance.**

---

## API Basics

**Authentication:** HTTP Basic Auth (email + API token)

```python
import requests
from dotenv import load_dotenv
import os

load_dotenv('/Users/nfrota/.openclaw/workspace/.env')

JIRA_URL = "https://wiley-global.atlassian.net"  # or atypon
EMAIL = "nfrota@wiley.com"
API_TOKEN = os.getenv('WILEY_JIRA_TOKEN')  # or ATYPON_JIRA_TOKEN

auth = (EMAIL, API_TOKEN)
headers = {"Accept": "application/json", "Content-Type": "application/json"}
```

---

## Common Operations

### 1. Get Issue Details

```python
issue_key = "UXPMS-168"
url = f"{JIRA_URL}/rest/api/3/issue/{issue_key}"

response = requests.get(url, auth=auth, headers=headers)
data = response.json()

# Access fields
summary = data['fields']['summary']
status = data['fields']['status']['name']
description = data['fields']['description']
assignee = data['fields']['assignee']['displayName']
due_date = data['fields'].get('duedate')
```

### 2. Search Issues (JQL)

```python
url = f"{JIRA_URL}/rest/api/3/search"

jql = "assignee = currentUser() AND status != Done ORDER BY duedate ASC"

params = {
    "jql": jql,
    "fields": "summary,duedate,status,priority,key",
    "maxResults": 50
}

response = requests.get(url, auth=auth, headers=headers, params=params)
issues = response.json()['issues']
```

**Useful JQL patterns:**
- `assignee = currentUser()` - my tasks
- `status != Done` - not closed
- `duedate >= -7d` - due in last 7 days
- `project = UXPMS` - specific project
- `duedate is not EMPTY` - has due date

### 3. Get Child Issues (Subtasks/Child Work Items)

**Note:** Jira API calls them "subtasks" but UI shows "child work items"

```python
# Method 1: Get from parent (if subtasks field populated)
issue_key = "UXPMS-168"
url = f"{JIRA_URL}/rest/api/3/issue/{issue_key}"

response = requests.get(url, auth=auth, headers=headers)
subtasks = response.json()['fields'].get('subtasks', [])

# Method 2: Search by specific keys (more reliable)
url = f"{JIRA_URL}/rest/api/3/search/jql"

payload = {
    "jql": "key in (UXPMS-187, UXPMS-188, UXPMS-189, UXPMS-190, UXPMS-191, UXPMS-192)",
    "fields": ["summary", "status", "parent"]
}

response = requests.post(url, auth=auth, headers=headers, json=payload)
issues = response.json()['issues']

for issue in issues:
    print(f"{issue['key']}: {issue['fields']['summary']} [{issue['fields']['status']['name']}]")
```
```

---

## Write Operations (USER CONFIRMATION REQUIRED)

### 4. Update Issue (Single Field)

**⚠️ RULE:** Always confirm with user before writing!

```python
# Example: Update status
issue_key = "UXPMS-190"
url = f"{JIRA_URL}/rest/api/3/issue/{issue_key}"

payload = {
    "fields": {
        "status": {"name": "In Progress"}
    }
}

# ASK USER FIRST:
# "Update UXPMS-190 status to 'In Progress'? (y/n)"

response = requests.put(url, auth=auth, headers=headers, json=payload)
```

### 5. Batch Operations

**⚠️ CRITICAL:** ALWAYS show full list + ask explicit confirmation before batch operations!

```python
# Example: Bulk status update
issues_to_update = ["UXPMS-187", "UXPMS-188", "UXPMS-189"]

# SHOW USER:
print("About to update:")
for key in issues_to_update:
    print(f"  - {key}: status → 'In Progress'")
print("\nProceed? (y/n)")

# WAIT FOR CONFIRMATION before executing loop
```

---

## Existing Tools

**Script:** `~/Documents/wiley/jira-check.py`
- Fetches assigned issues with due dates
- Shows overdue, today, soon (3 days)
- Outputs JSON for agenda app (`~/.openclaw/workspace/data/jira.json`)

**Usage:**
```bash
python3 ~/Documents/wiley/jira-check.py
```

---

## API Limits & Best Practices

**Rate limits:**
- Cloud: ~100 req/min per user
- Respect 429 (Too Many Requests) responses

**Pagination:**
- Use `startAt` + `maxResults` for large result sets
- Default `maxResults=50`, max `maxResults=100`

**Field filtering:**
- Request only needed fields to reduce payload size
- Example: `fields=summary,status,duedate`

---

## Error Handling

**Common errors:**

| Code | Meaning | Action |
|------|---------|--------|
| 401 | Unauthorized | Check API token + email |
| 404 | Issue not found | Verify issue key + permissions |
| 429 | Rate limit | Wait + retry with backoff |

---

## Examples

### Get Design Discrepancy Parent Task

```python
url = f"{JIRA_URL}/rest/api/3/issue/UXPMS-168"
response = requests.get(url, auth=auth, headers=headers)

if response.status_code == 200:
    data = response.json()
    print(f"Summary: {data['fields']['summary']}")
    print(f"Description: {data['fields']['description']}")
    
    # Get subtasks (component list)
    for st in data['fields'].get('subtasks', []):
        print(f"  {st['key']}: {st['fields']['summary']}")
else:
    print(f"Error {response.status_code}: {response.text}")
```

### Update Task Status (WITH CONFIRMATION)

```python
# 1. ASK USER
print(f"Update UXPMS-190 status to 'Done'? (y/n)")
confirm = input().strip().lower()

# 2. ONLY IF YES
if confirm == 'y':
    url = f"{JIRA_URL}/rest/api/3/issue/UXPMS-190/transitions"
    
    # Get transition ID for "Done"
    r = requests.get(url, auth=auth, headers=headers)
    transitions = r.json()['transitions']
    done_id = next(t['id'] for t in transitions if t['name'] == 'Done')
    
    # Execute transition
    payload = {"transition": {"id": done_id}}
    requests.post(url, auth=auth, headers=headers, json=payload)
    print("✅ Updated!")
else:
    print("❌ Cancelled")
```

---

---

## Security Notes

**API tokens:**
- Store in `.env` (NOT in code or shared files)
- Rotate periodically (Atlassian settings)
- Never commit to git

**Permissions:**
- API uses YOUR permissions (can't do more than you can in browser)
- If 404 = either doesn't exist OR you don't have access

---

## References

- **API Docs:** https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/
- **JQL Reference:** https://support.atlassian.com/jira-service-management-cloud/docs/use-advanced-search-with-jira-query-language-jql/
- **Wiley Jira:** https://wiley-global.atlassian.net
- **Atypon Jira:** https://atypon.atlassian.net

---

*Created: 2026-02-12*  
*Last updated: 2026-02-12*
