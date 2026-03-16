---
service: Docker
description: "Manage containers, check running services, restart containers, view logs, or understand app locations (~/Apps/)"
location: "~/Apps/"
---

# Docker - Container Management

**All Docker apps live in:** `~/Apps/`

**Philosophy:**
- Git-tracked (daily auto-commit 3am)
- Visible location (not hidden in `.openclaw/`)
- Health-checked (auto-restart if down)
- Backup-friendly (Time Machine + git)

---

## Active Containers (28 total)

### Ebook/Media
- **kavita-local** - Ebook reader (port 5007) - `~/Apps/kavita`
- **komga-local** - Comics/ebook (port 5008) - `~/Apps/komga`
- **booklore-local** - Ebook reader (port 5009) - `~/Apps/booklore`

### Tools
- **searxng-local** - Meta-search (port 8889) - `~/Apps/searxng`
- **focalboard** - Kanban (port 8010)

### Project Management
- **leantime** + mysql - (port 9001)
- **personal-taiga-*** - 7 containers (port 9000)
- **plane-app-*** - 13 containers (port 8085)
- **openproject** - (port 8082)
- **tuleap-db**

---

## Management Scripts

**Location:** `~/Apps/scripts/`

### health-check.sh
- Runs daily (3am via cron)
- Checks all 28 containers
- Auto-restarts if down
- Notifies Telegram if restart fails
- Logs: `~/Apps/logs/health.log`

### auto-commit.sh
- Runs daily (3am via cron)
- Commits all changes to git
- Enables rollback (yesterday's data always available)

---

## Cron Schedule

```bash
# Apps auto-commit + health check (daily 3am)
0 3 * * * ~/Apps/scripts/auto-commit.sh && ~/Apps/scripts/health-check.sh
```

---

## Recovery Patterns

### Container down
1. Health-check auto-restarts (no action needed)
2. If restart fails → Telegram alert
3. Manual: `docker start <container-name>`

### Data corrupted
1. Git rollback: `cd ~/Apps && git checkout HEAD~1 <app>/`
2. Restart container: `docker restart <container-name>`

### Container recreation needed
1. **STOP - ASK PERMISSION FIRST** (production services)
2. Commit before: `cd ~/Apps && git add -A && git commit -m "Before recreating <app>"`
3. Stop: `docker stop <container>`
4. Remove: `docker rm <container>`
5. Recreate with updated config
6. Verify working
7. Commit after: `cd ~/Apps && git add -A && git commit -m "After recreating <app>"`

---

## Critical Rules

**NEVER:**
- Stop/remove containers without permission (especially Tailscale-accessible ones)
- Modify volumes directly without git commit first
- Delete `~/Apps/` folder (contains all production data)

**WHY:** Remote dependencies (iPad via Tailscale). Downtime while traveling = stranded.

**Commit before edit:**
```bash
cd ~/Apps
git add -A
git commit -m "Before [operation]"
# DO OPERATION
git add -A
git commit -m "After [operation]"
```

---

## Container Template

```bash
docker run -d \
  --name <app-name> \
  --restart unless-stopped \
  -p <port>:<internal-port> \
  -v ~/Apps/<app-name>:/config \
  -e TZ=America/New_York \
  <image:tag>
```

**Always:**
- Use `~/Apps/<app-name>` for volumes
- Set `--restart unless-stopped`
- Set `TZ=America/New_York`

---

## Migration Checklist

**Moving container to ~/Apps:**

1. ✅ Commit current state: `cd ~/Apps && git add -A && git commit -m "Before migrating <app>"`
2. ✅ Stop container: `docker stop <app>`
3. ✅ Move data: `mv ~/.openclaw/<app> ~/Apps/`
4. ✅ Remove old container: `docker rm <app>`
5. ✅ Recreate with new volume path
6. ✅ Verify working
7. ✅ Commit: `cd ~/Apps && git add -A && git commit -m "<app> migrated"`
8. ✅ Update health-check.sh if needed

---

## See Also

- Individual app docs: `~/Documents/personal/connections/<app>.md`
- Post-mortem: `~/.openclaw/workspace/memory/post-mortem-2026-02-25-kavita-deletion.md`
- Travel mode epic: `~/Documents/personal/backstage/epic-notes/v0.X.0-travel-mode.md`
