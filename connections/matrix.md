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
