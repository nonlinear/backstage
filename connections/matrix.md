# Matrix (Synapse) Connection

**Service:** Matrix homeserver (Synapse)  
**Protocol:** HTTP/HTTPS (federation port 8448)  
**Port:** 8008 (local), 8448 (federation)  
**Container:** `matrix-synapse`, `matrix-db`  
**Database:** PostgreSQL 16  
**Location:** `~/Apps/matrix/`

---

## URLs

**Local:**
- http://localhost:8008 (Matrix client API)
- http://localhost:8448 (Federation API)

**Tailscale (remote access):**
- https://studio.adal-rigel.ts.net:8008 (iPad/iPhone via Tailscale)

**Auto-start:** LaunchAgent (`~/Library/LaunchAgents/com.nonlinear.tailscale-serve.plist`)  
**Script:** `~/Documents/scripts/tailscale-serve-autostart.sh` (runs `@reboot`)

---

## Docker Setup

**Compose file:** `~/Apps/matrix/docker-compose.yml`

```yaml
services:
  synapse:
    image: matrixdotorg/synapse:latest
    ports:
      - "8008:8008"   # HTTP
      - "8448:8448"   # Federation
    volumes:
      - ./data:/data
    environment:
      - SYNAPSE_SERVER_NAME=studio.adal-rigel.ts.net
      - SYNAPSE_REPORT_STATS=no
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: synapse
      POSTGRES_USER: synapse
      POSTGRES_PASSWORD: synapse_secure_password
```

**Start/stop:**
```bash
cd ~/Apps/matrix
docker-compose up -d    # Start
docker-compose down     # Stop
docker-compose logs -f  # View logs
```

---

## First-Time Setup

**1. Register admin user:**
```bash
docker exec -it matrix-synapse register_new_matrix_user \
  -c /data/homeserver.yaml \
  --admin \
  http://localhost:8008
```

**Follow prompts:**
- Username: `nonlinear` (or your choice)
- Password: (enter secure password)
- Make admin? `yes`

**2. Install Element app:**
- **iPad:** https://apps.apple.com/app/element-messenger/id1083446067
- **iPhone:** Same app (universal)
- **Mac:** https://element.io/download (optional)

**3. Connect Element app:**
- Open Element
- **Custom homeserver:** `https://studio.adal-rigel.ts.net:8008`
- Login with username/password

---

## User Registration

**Enabled:** Yes (via `enable_registration: true` in homeserver.yaml)

**New users can register directly via Element app** (no admin approval needed).

**To disable public registration:**
```yaml
# Edit ~/Apps/matrix/data/homeserver.yaml
enable_registration: false
```

**Then restart:** `cd ~/Apps/matrix && docker-compose restart synapse`

---

## Creating Agent Bots

**Matrix bots = agents posting messages.**

**Option 1: Application Service (AS) - Advanced**
- Requires custom bridge code
- Bots namespaced (`@bot_*`)
- Full Matrix SDK integration

**Option 2: Regular accounts - Simple (RECOMMENDED)**
- Register bot accounts normally
- Use Matrix SDK (Python/JS) to post
- Each agent = 1 bot account

**Example: Business Analyst bot**
```bash
# Register bot user
docker exec -it matrix-synapse register_new_matrix_user \
  -c /data/homeserver.yaml \
  http://localhost:8008

# Username: business_analyst
# Password: (secure, save in .env)
```

**Python bot (minimal):**
```python
from matrix_client import MatrixClient

client = MatrixClient("https://studio.adal-rigel.ts.net:8008")
client.login(username="business_analyst", password="BOT_PASSWORD")
room = client.join_room("#agents:studio.adal-rigel.ts.net")
room.send_text("✅ Business Analyst online!")
```

---

## Rooms & Spaces

**Recommended structure:**

```
🏢 Nonlinear Studio (Space)
├── #main - General coordination
├── #engineering - Design Engineer
├── #marketing - Marketing Strategist
└── #agents - All agents (public)
```

**Create rooms via Element app** (easier than CLI).

---

## Federation

**Homeserver name:** `studio.adal-rigel.ts.net`  
**Federation port:** 8448 (exposed)

**Invite external users:**
- They need Matrix account on ANY homeserver (matrix.org, etc.)
- You invite: `@friend:matrix.org`
- **Caveat:** Tailscale URL only works for Tailnet members

**For public federation:** Need Cloudflare Tunnel or public IP (optional).

---

## Security

**E2E Encryption:** Supported (enable per-room in Element)  
**Self-hosted:** ✅ Data on your Mac, not cloud  
**Network:** Tailscale = encrypted tunnel (obscurity + encryption)

**Threat model:**
- Tailnet members see Matrix (intentional)
- External federation = public (if enabled)
- Matrix content E2E encrypted (Element default for DMs)

---

## OpenClaw Integration

**Webhook alternative:** Matrix SDK bots

**Workflow:**
1. User posts in Matrix: "@business-analyst research X"
2. Bot listens (Matrix SDK)
3. Bot calls OpenClaw API or spawns sub-agent
4. Bot replies in Matrix with results

**Matrix SDK libraries:**
- Python: `matrix-client` or `matrix-nio`
- JavaScript: `matrix-js-sdk`
- Rust: `matrix-sdk`

---

## Troubleshooting

**Container won't start:**
```bash
cd ~/Apps/matrix
docker-compose logs synapse
```

**Database errors:**
- Check PostgreSQL running: `docker ps | grep matrix-db`
- Reset DB: `rm -rf ~/Apps/matrix/postgres && docker-compose up -d`

**Federation not working:**
- Tailscale URL only for Tailnet members
- For public federation: need Cloudflare Tunnel

**Element app can't connect:**
- Verify homeserver URL: `https://studio.adal-rigel.ts.net:8008`
- Check Tailscale serve: `tailscale serve status`
- Test from iPad: `curl https://studio.adal-rigel.ts.net:8008`

---

## Backups

**Important files:**
- `~/Apps/matrix/data/` - Homeserver config, signing keys
- `~/Apps/matrix/postgres/` - Database

**Auto-backup:** Time Machine captures `~/Apps/` daily

**Manual backup:**
```bash
tar -czf matrix-backup-$(date +%Y%m%d).tar.gz ~/Apps/matrix
```

---

## References

- **Synapse docs:** https://matrix-org.github.io/synapse/latest/
- **Element:** https://element.io
- **Matrix SDK:** https://matrix.org/sdks/
- **Federation:** https://matrix.org/federation/

---

**Updated:** 2026-03-07  
**ARM64 native:** ✅ (no emulation needed)

---

## Troubleshooting

### Messages route to agent:main instead of specific agent

**Problem:** OpenClaw's `resolveMatrixBaseRouteSession` ignores `roomConfig.agentId`

**Root cause:** handler.ts uses `buildAgentSessionKey` which defaults to `baseRoute.agentId` (always "main")

**Fix applied:** Manual sessionKey construction with `effectiveAgentId`

**File:** `/opt/homebrew/lib/node_modules/openclaw/extensions/matrix/src/matrix/monitor/handler.ts`

**Lines:** 507-535 (patch stored in `~/Backstage/patches/handler_fix_507_535.ts`)

**Verification:**
```bash
# Check patch present
grep "const effectiveAgentId" /opt/homebrew/lib/node_modules/openclaw/extensions/matrix/src/matrix/monitor/handler.ts

# Verify routing in logs
openclaw logs --limit 100 | grep -E "effectiveAgentId|sessionKey"

# Check sessions
openclaw status | grep "agent:.*:matrix"
```

**Health check:**
```bash
~/bin/matrix-health-check.sh
```

**Auto-recovery (if OpenClaw upgrade overwrites handler.ts):**
```bash
~/bin/matrix-auto-recovery.sh
```

---

### Bot doesn't auto-join rooms after invite

**Problem:** `autoJoin: "always"` only processes invites DURING active sync

**Scenario:** 
1. Gateway starts → Matrix sync begins
2. User invites bot (AFTER sync started)
3. Hot reload detects Room IDs but doesn't re-sync
4. Invite pending, not auto-accepted

**Solution:** Restart Gateway AFTER inviting bot

```bash
# Invite bot in Element first
# Then restart Gateway
~/Desktop/openclaw-recovery.sh
```

**Or:** Bot manually joins via Element (login as @openclaw_bot, accept invite)

---

### E2EE rooms prevent bot from reading messages

**Problem:** Bot can't read encrypted messages (crypto module missing)

**Error:**
```
matrix: encryption enabled but crypto is unavailable
Install @matrix-org/matrix-sdk-crypto-nodejs
```

**Solution:** Create unencrypted rooms

**Matrix limitation:** Cannot disable E2EE in existing rooms → must create new rooms

**Room setup:**
1. Create room in Element
2. **Before inviting anyone:** Settings → Security & Privacy → Disable encryption
3. Invite `@openclaw_bot:studio.adal-rigel.ts.net`
4. Configure in `openclaw.json`

**Config example:**
```json
"channels": {
  "matrix": {
    "encryption": false,
    "groups": {
      "!RoomID:studio.adal-rigel.ts.net": {
        "enabled": true,
        "agentId": "business-analyst",
        "displayName": "Business Analyst",
        "avatarUrl": null
      }
    }
  }
}
```

---

### displayName and avatar per-room

**Matrix limitation:** Profiles (displayName, avatar) are GLOBAL per user, not per-room

**Current state:**
- Bot user: `@openclaw_bot:studio.adal-rigel.ts.net`
- Same name/avatar in all rooms

**Workaround options:**

**Option 1:** Accept global profile (simplest)
- Set displayName to "OpenClaw Bot"
- All rooms see same name

**Option 2:** Create separate bot users per agent (clean personas)
- `@business-analyst:studio.adal-rigel.ts.net`
- `@design-engineer:studio.adal-rigel.ts.net`
- Each has own displayName + avatar
- Requires separate OpenClaw Matrix configs

**Set global profile:**
```bash
# displayName
curl -X PUT "http://localhost:8008/_matrix/client/r0/profile/@openclaw_bot:studio.adal-rigel.ts.net/displayname" \
  -H "Content-Type: application/json" \
  -d '{"displayname":"OpenClaw Bot"}'

# Upload avatar
curl -X POST "http://localhost:8008/_matrix/media/r0/upload" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: image/png" \
  --data-binary @~/avatar.png

# Set avatar (use mxc:// URL from upload response)
curl -X PUT "http://localhost:8008/_matrix/client/r0/profile/@openclaw_bot:studio.adal-rigel.ts.net/avatar_url" \
  -H "Content-Type: application/json" \
  -d '{"avatar_url":"mxc://studio.adal-rigel.ts.net/<media_id>"}'
```

**Recommended:** Global profile for now, separate bot users if personas critical


---

## Boot Order Issue (Tailscale Proxy Blocking Docker Ports)

**Problem:** After Mac reboot, Synapse container fails to expose ports 8008/8448

**Root cause:** Boot order race condition:
1. Tailscale LaunchAgent starts → `serve` proxies activate
2. Docker containers auto-start
3. Tailscale already holding ports 8008/8448 → Docker can't bind
4. Container runs but ports internal-only → Matrix inaccessible

**Symptoms:**
```bash
docker ps | grep matrix
# Shows: 8008/tcp (internal) instead of 0.0.0.0:8008->8008/tcp (exposed)

docker-compose up -d
# Error: bind: address already in use
```

**Manual recovery:**
```bash
# 1. Stop Tailscale proxies
tailscale serve --https=8008 off
tailscale serve --https=8448 off

# 2. Restart Synapse
cd ~/Apps/matrix && docker-compose down && docker-compose up -d

# 3. Wait for Synapse healthy
sleep 10

# 4. Re-enable Tailscale proxies
tailscale serve --bg --https=8008 http://localhost:8008
tailscale serve --bg --https=8448 http://localhost:8448
```

**Permanent fix needed:**
- LaunchAgent script that runs AFTER Docker
- Or Docker container starts BEFORE Tailscale serve
- Or health-check detects + auto-recovers

**Verification:**
```bash
~/bin/matrix-health-check.sh
# Should show: Synapse responding (HTTP 200)
```

**Status:** Workaround documented, permanent fix pending

