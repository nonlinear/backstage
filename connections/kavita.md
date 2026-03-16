---
service: Kavita
description: "Read ebooks (EPUB/PDF), manage library, sync reading progress, or troubleshoot Kavita server (NAS)"
host: "192.168.1.152:5000"
tailscale: "media.adal-rigel.ts.net:5000"
---

# Kavita - Ebook Reader

**Purpose:** Self-hosted ebook/comic reader with web interface

**Access:**
- Local: http://localhost:5007
- Tailscale: https://studio.adal-rigel.ts.net:5007

**Credentials:**
- See `~/Documents/personal/.env` (`KAVITA_USER`, `KAVITA_PASS`)

---

## Docker Setup

**Container:** `kavita-local`

**Location:** `~/Apps/kavita/` (ALL Docker apps live in ~/Apps/)

**Volumes:**
- Config/DB: `~/Apps/kavita:/kavita/config`
- Books: `~/Documents/books:/books`

**Port:** `127.0.0.1:5007:5000` (localhost only, Tailscale exposes externally)

---

## Backups

**Automatic:** Kavita internal backup (daily 2am)

**Location:** `~/Desktop/backups/kavita_backup_*.zip`

**Retention:** 30 days (auto-cleanup by Kavita)

**Restore:**
```bash
cd ~/Apps/kavita
unzip -o ~/Desktop/backups/kavita_backup_LATEST.zip
docker restart kavita-local
```

---

## Recovery (If Data Lost)

**Scenario:** Container recreated, user/progress lost

**Solution:**
1. Stop container: `docker stop kavita-local`
2. Restore latest backup: `unzip -o ~/Desktop/backups/kavita_backup_*.zip` (in ~/Apps/kavita/)
3. Restart: `docker restart kavita-local`
4. **OR** Use git: `cd ~/Apps && git checkout HEAD~1 kavita/kavita.db`

**Backups exist in TWO places:**
- `~/Desktop/backups/` (Kavita internal)
- `~/Apps/.git/` (daily commits at 3am)

---

## Critical Rules

**NEVER:**
- Stop/remove container without permission
- Modify DB directly
- Change port mapping (Tailscale configured)

**WHY:** Remote dependency (iPad via Tailscale). If broken while traveling = stranded without ebooks.

**Incident:** 2026-02-25 - Container deleted without permission = data lost (but recovered via backup)

---

## Tailscale Configuration

**Serve command:**
```bash
tailscale serve --bg --https=5007 http://127.0.0.1:5007
```

**Verify:**
```bash
curl -I https://studio.adal-rigel.ts.net:5007
```

**Recovery:** If Tailscale URL unreachable, check container + Tailscale status.

---

## See Also

- `~/Documents/personal/connections/docker.md` - Docker apps overview
- `~/Apps/scripts/health-check.sh` - Auto-restart if container down
- Post-mortem: `~/.openclaw/workspace/memory/post-mortem-2026-02-25-kavita-deletion.md`
