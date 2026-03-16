---
service: "Tempo (Jira Timesheet)"
description: "Log billable hours, sync Tempo with Jira issues, submit timesheets, or troubleshoot Tempo API"
api: "Tempo REST API"
auth: "Bearer token (.env)"
---

# Tempo API Connection

**Service:** Tempo Timesheets (Jira plugin)  
**Purpose:** Log worklogs (billing hours) to Atypon Jira  
**Created:** 2026-02-28  
**Last updated:** 2026-02-28 23:32 EST

---

## Authentication

**Type:** Bearer token

**Token location:** `~/Documents/personal/.env`

```bash
TEMPO_API_TOKEN_NEW=SDXYDyUFuBTwyWqQ1KzEvKQCAiP4E6-eu
TEMPO_ACCOUNT_ID=5f6a182958ea7b00706d352a
```

**Expiration:** TBD (ask Nicholas)

**How to regenerate:**
1. Go to https://jira.prod.atypon.com/plugins/servlet/ac/io.tempo.jira/tempo-app#!/configuration/api-integration
2. Generate new API token
3. Update `.env` with new value

---

## Critical Discovery: Atypon Jira URLs

**Two domains exist:**
- ❌ `jira.prod.atypon.com` - Web UI only, API returns 404
- ✅ `atypon.atlassian.net` - API works (REST API v3)

**Always use `atypon.atlassian.net` for API calls!**

---

## Workflow: Publish Worklog

### Step 1: Get Issue ID (numeric)

**Tempo API requires `issueId` (numeric), NOT `issueKey` (string)**

```python
import requests

WILEY_EMAIL = "nfrota@wiley.com"
WILEY_TOKEN = "..."  # From .env
auth = (WILEY_EMAIL, WILEY_TOKEN)

# Get issue from Atypon Jira (atypon.atlassian.net)
url = f"https://atypon.atlassian.net/rest/api/3/issue/{issue_key}"
r = requests.get(url, auth=auth)

data = r.json()
issue_id = data['id']  # Numeric ID (e.g., 365181)
```

**Example:**
- `AUTP-646` → Issue ID: `365181`
- `AUTP-165` → Issue ID: `365027`

---

### Step 2: Create Worklog via Tempo API

**Endpoint:** `POST https://api.tempo.io/4/worklogs`

**Headers:**
```python
headers = {
    "Authorization": f"Bearer {TEMPO_API_TOKEN_NEW}",
    "Content-Type": "application/json"
}
```

**Body:**
```python
payload = {
    "issueId": 365181,  # Numeric ID (from Step 1)
    "timeSpentSeconds": 10800,  # 3 hours = 10800 seconds
    "startDate": "2026-02-03",  # YYYY-MM-DD
    "startTime": "09:00:00",  # HH:MM:SS (24-hour)
    "description": "IEEE work - Feb 03 (automated entry)",
    "authorAccountId": "5f6a182958ea7b00706d352a"  # From .env
}
```

**Response (200):**
```json
{
  "tempoWorklogId": 3078061,
  "issue": {"id": 365181, "key": "AUTP-646"},
  "timeSpentSeconds": 10800,
  "startDate": "2026-02-03",
  "startTime": "09:00:00"
}
```

---

## Complete Example (Python)

```python
import requests
import os

# Load tokens
WILEY_EMAIL = os.getenv('WILEY_JIRA_EMAIL')
WILEY_TOKEN = os.getenv('WILEY_JIRA_TOKEN')
TEMPO_TOKEN = os.getenv('TEMPO_API_TOKEN_NEW')
TEMPO_ACCOUNT_ID = os.getenv('TEMPO_ACCOUNT_ID')

# Step 1: Get issue ID
issue_key = "AUTP-646"
url = f"https://atypon.atlassian.net/rest/api/3/issue/{issue_key}"
r = requests.get(url, auth=(WILEY_EMAIL, WILEY_TOKEN))
issue_id = r.json()['id']

# Step 2: Create worklog
headers = {
    "Authorization": f"Bearer {TEMPO_TOKEN}",
    "Content-Type": "application/json"
}

payload = {
    "issueId": issue_id,
    "timeSpentSeconds": 10800,  # 3 hours
    "startDate": "2026-02-03",
    "startTime": "09:00:00",
    "description": "IEEE work",
    "authorAccountId": TEMPO_ACCOUNT_ID
}

r = requests.post("https://api.tempo.io/4/worklogs", 
                  headers=headers, json=payload)

worklog_id = r.json()['tempoWorklogId']
print(f"✅ Worklog created: {worklog_id}")
```

---

## Important Notes

**⚠️ Issue ID is REQUIRED:**
- Cannot use `issueKey` directly in Tempo API
- Must query Atypon Jira first to get numeric ID

**⚠️ Auth is split:**
- Atypon Jira: Basic Auth (email:token) from Wiley credentials
- Tempo API: Bearer token (separate token)

**⚠️ Date/Time format:**
- `startDate`: `YYYY-MM-DD`
- `startTime`: `HH:MM:SS` (24-hour, optional)

**⚠️ Time tracking:**
- `timeSpentSeconds`: Integer (3600 = 1 hour)

---

## Troubleshooting

### 404 Not Found (Atypon Jira)
- Wrong domain: Use `atypon.atlassian.net` NOT `jira.prod.atypon.com`
- Invalid issue key

### 400 Bad Request (Tempo)
- Missing `issueId` (numeric required, not issueKey)
- Missing `authorAccountId`
- Invalid date format

### 401 Unauthorized
- Token expired → regenerate via Tempo settings
- Wrong token → check `.env` value

---

**Last tested:** 2026-02-28 23:32 EST  
**Status:** ✅ Working (Worklog ID: 3078061 created successfully)
