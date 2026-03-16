---
service: Figma
description: "Read design files, fetch component specs (colors/fonts/spacing), compare design vs live system, or run design discrepancy exercises"
api: "REST API (read-only)"
auth: "Personal Access Token (.env)"
---

# Figma API Integration

**What it is:** Figma REST API for design file access, component specs, asset library.

**When to use:**
- Read design files (Figma URLs)
- Fetch component properties (colors, fonts, spacing, etc.)
- Compare design specs with live system
- Design discrepancy exercises

---

## Token Info

- **Obtained:** 2026-02-12
- **Expires:** 2026-05-13 (90 days)
- **Renew at:** https://www.figma.com/settings (Personal Access Tokens)
- **Scope:** read-only (file access)
- **Variable:** `FIGMA_TOKEN` (~/Documents/life/.env)
- **Calendar reminder:** 2026-05-06 (7 days before expiry)

---

## Authentication

**Method:** Personal Access Token (PAT)

**Header:**
```
X-Figma-Token: YOUR_TOKEN
```

**Base URL:** `https://api.figma.com/v1/`

---

## Common Operations

### 1. Get File Details

```bash
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/FILE_KEY"
```

**Example:**
```bash
# URL: https://www.figma.com/design/rayeURPGCKG1A8YQwSUTjW/RPM----Pattern-Library
# FILE_KEY: rayeURPGCKG1A8YQwSUTjW

curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/rayeURPGCKG1A8YQwSUTjW" | jq '.name'
```

### 2. Get Specific Node

```bash
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/FILE_KEY/nodes?ids=NODE_ID"
```

**Example:**
```bash
# URL: ...?node-id=115-155
# NODE_ID: 115:155 (replace - with :)

curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/rayeURPGCKG1A8YQwSUTjW/nodes?ids=115:155"
```

### 3. Get Component Properties

```bash
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/FILE_KEY/components"
```

---

## Python Example

```python
import requests
import os
from dotenv import load_dotenv

load_dotenv('/Users/nfrota/Documents/life/.env')

FIGMA_TOKEN = os.getenv('FIGMA_TOKEN')
FILE_KEY = "rayeURPGCKG1A8YQwSUTjW"  # From URL

headers = {"X-Figma-Token": FIGMA_TOKEN}
url = f"https://api.figma.com/v1/files/{FILE_KEY}"

response = requests.get(url, headers=headers)
data = response.json()

print(f"File name: {data['name']}")
print(f"Last modified: {data['lastModified']}")
```

---

## Gotchas

- **Node IDs:** URL uses `-` (e.g., `115-155`), API uses `:` (e.g., `115:155`)
- **Rate limits:** 2 requests/second per token
- **File size:** Large files may take 10+ seconds to respond
- **Version history:** API returns latest version by default

---

## References

- **API Docs:** https://www.figma.com/developers/api
- **Token Settings:** https://www.figma.com/settings (scroll to Personal Access Tokens)

---

*Created: 2026-02-12*  
*Last updated: 2026-02-12*
