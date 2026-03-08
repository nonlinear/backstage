# OpenProject Connection

**Date:** 2026-02-26  
**Status:** Configured, awaiting API token for migration

---

## 🔗 Access

**Localhost:** http://localhost:8086  
**Tailscale:** http://studio.adal-rigel.ts.net:8086 (configure via `tailscale serve --bg --http=8086 http://localhost:8086`)

**Login:**
- **User:** `admin`
- **Password:** `admin123`

---

## 🐳 Docker Setup

**Container:** `openproject`  
**Image:** `openproject/openproject:14`  
**Port:** `8086:8080`  
**Volume:** `openproject_data:/var/openproject/assets`

**Environment:**
```bash
OPENPROJECT_HTTPS=false
OPENPROJECT_HOST__NAME=localhost:8086
OPENPROJECT_HSTS=false
```

**Start command:**
```bash
docker run -d --name openproject -p 8086:8080 \
  -e OPENPROJECT_HTTPS=false \
  -e OPENPROJECT_HOST__NAME=localhost:8086 \
  -e OPENPROJECT_HSTS=false \
  -v openproject_data:/var/openproject/assets \
  openproject/openproject:14
```

**Tailscale serve:**
```bash
tailscale serve --bg --http=8086 http://localhost:8086
```

---

## 🔑 API Token

**Generate:**
1. Login: http://localhost:8086
2. Avatar → My Account → Access tokens
3. + Generate → Name: "Migration Script"
4. Copy token

**Reset password (if needed):**
```bash
docker exec openproject bash -c 'bundle exec rails runner "u = User.admin.first; u.update(password: \"admin123\", password_confirmation: \"admin123\", force_password_change: false)"'
```

---

## 📦 Migration Script

**Location:** `/tmp/migrate-roadmaps.py`

**Projects to migrate:**
- Personal (`~/Documents/personal/backstage/ROADMAP.md`)
- Librarian (`~/Documents/librarian/backstage/ROADMAP.md`)
- Agregore (`~/Documents/agregore/backstage/ROADMAP.md`)

**What migrates:**
- `## v0.X.0` → Epic (type: Epic)
- Epic title + description
- Status: New (from ROADMAP) or Closed (done items)

**Run:**
```bash
# Update AUTH in script with API token first:
# AUTH = ("apikey", "YOUR_TOKEN_HERE")
python3 /tmp/migrate-roadmaps.py
```

---

## 🎯 Taxonomy

**ROADMAP vs CHANGELOG:**
- **ROADMAP** = `Status != Closed` (New, In Progress, On Hold)
- **CHANGELOG** = `Status = Closed` (Resolved, Rejected)

**Filtering:**
```
Dashboard ROADMAP: status:open
Dashboard CHANGELOG: status:closed
```

**No custom fields needed** — Status is sufficient.

---

## 🏴 Philosophy

**OpenProject = execution tracking**  
**Backstage = narrative + decisions**  
**Checkpoints = governance + validation**

**Workflow:**
1. Plan in backstage (epic-notes/)
2. Track in OpenProject (Gantt, filtering, status)
3. Validate via checkpoints (tests, definitions of done)
4. Document outcome in CHANGELOG.md

---

## 🔧 Troubleshooting

**CSRF errors:**
```bash
# Restart container
docker restart openproject

# Clear Safari cookies
pkill Safari
rm ~/Library/Cookies/Cookies.binarycookies
open -a Safari http://localhost:8086
```

**Port conflicts:**
```bash
# Reset Tailscale serve
tailscale serve reset

# Check what's using 8086
lsof -i :8086  # or docker ps
```

**401 Unauthorized:**
- Password reset → use Docker exec command above
- API needs token (not Basic Auth in production)

---

## 📚 Resources

- [OpenProject Docs](https://www.openproject.org/docs/)
- [API v3 Docs](https://www.openproject.org/docs/api/)
- [Docker Setup](https://www.openproject.org/docs/installation-and-operations/installation/docker/)
