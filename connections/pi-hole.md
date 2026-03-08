# Pi-hole - Network-wide Ad Blocking

**Status:** ✅ INSTALLED (2026-02-10)  
**Web UI:** `http://192.168.1.152:8053/admin` (local) | `http://media.adal-rigel.ts.net:8053/admin` (remote)  
**DNS:** `192.168.1.152:53` (UDP/TCP)  
**Password:** (in Proton Pass)

**🌐 Tailscale Global DNS:** ✅ CONFIGURED (todos no tailnet = Pi-hole automático)

---

## 🌐 Tailscale Integration (Remote Ad-blocking)

**✅ CONFIGURED (2026-02-10):** Global Nameservers = Pi-hole (`192.168.1.152`)

**O que isso significa:**
- **TODOS no tailnet usam Pi-hole automaticamente** (quando Tailscale ON)
- iPhone, iPad, MacBook → ads bloqueados **fora de casa** (4G, WiFi pública)
- Zero config por device (global nameserver = aplica pra todos)

**Como foi configurado:**
1. Tailscale admin console → https://login.tailscale.com/admin/dns
2. DNS → Nameservers → **Global nameservers**
3. Add: `192.168.1.152` (Pi-hole local IP)
4. **Primary DNS:** Pi-hole (ads bloqueados)
5. **Fallback DNS:** 1.1.1.1 (Cloudflare - se NAS offline)

**Novo device entra no tailnet:**
- ✅ Automaticamente usa Pi-hole (sem configurar nada)
- Basta ter Tailscale app instalado + logado no tailnet

**See:** `connections/tailscale-pihole.md` for full testing guide + trade-offs (battery, latency)

---

## What Pi-hole Does

- **Network-wide ad blocking** (DNS-level)
- **YouTube ads** (partial - depends on blocklists)
- **Tracker blocking** (telemetry, analytics, malware)
- **Single point of control** (all devices protected)

---

## Installation (Docker on NAS)

```bash
# SSH into NAS
ssh nonlinear@192.168.1.152

# Run Pi-hole container
sudo docker run -d \
  --name pihole \
  -p 53:53/tcp -p 53:53/udp \
  -p 8053:80/tcp \
  -e TZ="America/New_York" \
  -e WEBPASSWORD="$NAS_PASS" \
  -v pihole_config:/etc/pihole \
  -v dnsmasq_config:/etc/dnsmasq.d \
  --dns=1.1.1.1 \
  --dns=1.0.0.1 \
  --restart=unless-stopped \
  pihole/pihole:latest

# Check if running
sudo docker ps | grep pihole
```

**Port mapping:**
- DNS: `53` → `53` (UDP/TCP)
- Web UI: `80` (container) → `8053` (host) — avoid conflict with OMV

---

## Router Configuration

**After Pi-hole is running:**

1. **Router DNS settings:**
   - Primary DNS: `192.168.1.152`
   - Secondary DNS: `1.1.1.1` (fallback)

2. **Or per-device** (if router doesn't support):
   - macOS: System Settings → Network → DNS → `192.168.1.152`
   - iOS/iPadOS: Settings → WiFi → DNS → Manual → `192.168.1.152`

---

## Pi-hole API

**Base URL:** `http://192.168.1.152:8053/admin/api.php`

### Authentication Methods

**1. Session-based (Web UI login):**
```bash
# Login and get session ID
PASSWORD="your_password_here"
SESSION=$(curl -s -X POST "http://192.168.1.152:8053/admin/api.php" \
  -d "login" \
  -d "pw=$PASSWORD" \
  | jq -r '.session.sid')

# Use session in subsequent requests
curl "http://192.168.1.152:8053/admin/api.php?summaryRaw&sid=$SESSION"
```

**2. API Token (recommended for scripts):**
```bash
# Get API token from Web UI:
# Settings → API → Show API token

API_TOKEN="your_token_here"

# Use token in requests
curl "http://192.168.1.152:8053/admin/api.php?summaryRaw&auth=$API_TOKEN"
```

**3. Direct password (works for some endpoints):**
```bash
PASSWORD="your_password_here"
curl "http://192.168.1.152:8053/admin/api.php?summaryRaw&auth=$PASSWORD"
```

---

### Common API Endpoints

#### Statistics

**Summary (unauthenticated):**
```bash
curl "http://192.168.1.152:8053/admin/api.php?summary"
```

**Detailed stats (requires auth):**
```bash
curl "http://192.168.1.152:8053/admin/api.php?summaryRaw&auth=$API_TOKEN"
```

**Top domains:**
```bash
# Top blocked
curl "http://192.168.1.152:8053/admin/api.php?topItems&auth=$API_TOKEN"

# Top allowed
curl "http://192.168.1.152:8053/admin/api.php?topItems=10&auth=$API_TOKEN"
```

**Query log:**
```bash
curl "http://192.168.1.152:8053/admin/api.php?getAllQueries&auth=$API_TOKEN"
```

---

#### Domain Management

**Add to allowlist:**
```bash
curl -X POST "http://192.168.1.152:8053/admin/api.php" \
  -d "list=white" \
  -d "add=example.com" \
  -d "auth=$API_TOKEN"
```

**Add to blocklist:**
```bash
curl -X POST "http://192.168.1.152:8053/admin/api.php" \
  -d "list=black" \
  -d "add=ads.example.com" \
  -d "auth=$API_TOKEN"
```

**Remove from list:**
```bash
curl -X POST "http://192.168.1.152:8053/admin/api.php" \
  -d "list=white" \
  -d "sub=example.com" \
  -d "auth=$API_TOKEN"
```

**Get current lists:**
```bash
# Allowlist
curl "http://192.168.1.152:8053/admin/api.php?list=white&auth=$API_TOKEN"

# Blocklist
curl "http://192.168.1.152:8053/admin/api.php?list=black&auth=$API_TOKEN"
```

---

#### Adlist Management

**Note:** Adlists (blocklist URLs) are NOT directly manageable via API.

**Workarounds:**

**1. Direct file edit (via Docker exec):**
```bash
# Add adlists to config file
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker exec pihole bash -c 'cat >> /etc/pihole/adlists.list << EOF
https://big.oisd.nl/
https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@latest/wildcard/pro.plus.txt
EOF
'"

# Update Gravity to apply
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker exec pihole pihole -g"
```

**2. Database edit (advanced):**
```bash
# Requires sqlite3 in container (may not be available)
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker exec pihole sqlite3 /etc/pihole/gravity.db \"INSERT INTO adlist (address, enabled, comment) VALUES ('https://example.com/list.txt', 1, 'My List');\""
```

**3. Web UI (manual):**
- Settings → Adlists → Add new adlist

---

#### Gravity (Update Blocklists)

**Update gravity (download + process blocklists):**
```bash
# Via API (requires auth)
curl -X POST "http://192.168.1.152:8053/admin/api.php?updateGravity&auth=$API_TOKEN"

# Via CLI (preferred)
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker exec pihole pihole -g"
```

---

#### Enable/Disable Pi-hole

**Disable (temporarily allow all queries):**
```bash
# Disable for 60 seconds
curl -X POST "http://192.168.1.152:8053/admin/api.php" \
  -d "disable=60" \
  -d "auth=$API_TOKEN"

# Disable indefinitely
curl -X POST "http://192.168.1.152:8053/admin/api.php" \
  -d "disable" \
  -d "auth=$API_TOKEN"
```

**Enable:**
```bash
curl -X POST "http://192.168.1.152:8053/admin/api.php" \
  -d "enable" \
  -d "auth=$API_TOKEN"
```

---

#### DNS Records

**Add custom DNS record:**
```bash
curl -X POST "http://192.168.1.152:8053/admin/api.php" \
  -d "customdns" \
  -d "action=add" \
  -d "ip=192.168.1.100" \
  -d "domain=myserver.local" \
  -d "auth=$API_TOKEN"
```

**Remove custom DNS:**
```bash
curl -X POST "http://192.168.1.152:8053/admin/api.php" \
  -d "customdns" \
  -d "action=delete" \
  -d "ip=192.168.1.100" \
  -d "domain=myserver.local" \
  -d "auth=$API_TOKEN"
```

---

### Getting API Token

**Via Web UI:**
1. Login to http://192.168.1.152:8053/admin
2. Settings → API/Web Interface → Show API token
3. Copy token (long string)

**Store token:**
```bash
# In .env
echo 'PIHOLE_TOKEN="your_token_here"' >> ~/.openclaw/workspace/.env
```

---

### Complete Script Example

```bash
#!/bin/bash
source ~/.openclaw/workspace/.env

PIHOLE_HOST="192.168.1.152:8053"
API_TOKEN="$PIHOLE_TOKEN"  # from .env

# Get summary
echo "📊 Pi-hole Summary:"
curl -s "http://$PIHOLE_HOST/admin/api.php?summaryRaw&auth=$API_TOKEN" | jq .

# Get top blocked domains
echo ""
echo "🚫 Top Blocked:"
curl -s "http://$PIHOLE_HOST/admin/api.php?topItems=5&auth=$API_TOKEN" | jq '.top_ads'

# Check if domain is blocked
DOMAIN="doubleclick.net"
echo ""
echo "🔍 Checking $DOMAIN:"
curl -s "http://$PIHOLE_HOST/admin/api.php?domain=$DOMAIN&auth=$API_TOKEN" | jq .
```

---

### API Limitations

❌ **No direct adlist management** - Must edit `/etc/pihole/adlists.list` file  
❌ **No bulk operations** - One domain at a time  
⚠️ **Authentication inconsistent** - Some endpoints work without auth, others don't  
⚠️ **Documentation sparse** - Official API docs limited

**Best practices:**
- Use CLI (`pihole` command) for complex operations
- Use API for stats/monitoring
- Edit config files directly for bulk changes

---

### CLI Commands (via Docker)

**Preferred method for management tasks:**

```bash
# Set password
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker exec pihole pihole setpassword 'newpass'"

# Update gravity
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker exec pihole pihole -g"

# Query domain
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker exec pihole pihole -q doubleclick.net"

# Add to allowlist
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker exec pihole pihole allow example.com"

# Add to blocklist
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker exec pihole pihole deny ads.example.com"

# View status
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker exec pihole pihole status"

# Tail logs
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker exec pihole pihole -t"
```

**Full CLI help:**
```bash
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker exec pihole pihole -h"
```

---

## Recommended Blocklists

**Add manually in Web UI (Settings → Adlists) or via file edit:**

```bash
# Add all at once
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker exec pihole bash -c 'cat >> /etc/pihole/adlists.list << \"LISTS\"
https://big.oisd.nl/
https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@latest/wildcard/pro.plus.txt
https://raw.githubusercontent.com/kboghdady/youTube_ads_4_pi-hole/master/black.list
https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts
https://v.firebog.net/hosts/Easylist.txt
https://v.firebog.net/hosts/AdguardDns.txt
LISTS
'"

# Update Gravity to apply
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker exec pihole pihole -g"
```

**List descriptions:**
- **OISD Big** - Comprehensive (ads, trackers, malware) ~1M domains
- **Hagezi Pro++** - Aggressive blocking, privacy-focused
- **YouTube Ads** - Experimental YouTube ad blocking (partial)
- **Steven Black** - Popular hosts file ~79k domains
- **EasyList** - Web ads (AdBlock Plus format)
- **AdGuard DNS** - Ads + trackers

**After adding:** Tools → Update Gravity (or `pihole -g` via CLI)

---

## Access Web UI

**Local:** `http://192.168.1.152:8053/admin`  
**Remote (Tailscale):** `http://media.adal-rigel.ts.net:8053/admin`

**Login:**
- Password: (in Proton Pass - set via `pihole setpassword`)

**Get API token:**
- Web UI → Settings → API → Show API token
- Store in `.env`: `PIHOLE_TOKEN="..."`

---

## Common Tasks

### Check DNS is working
```bash
# From MacBook
dig @192.168.1.152 google.com

# Should show Pi-hole as resolver
```

### View logs
```bash
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker logs pihole"
```

### Restart Pi-hole
```bash
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker restart pihole"
```

### Update blocklists
- Web UI → Tools → Update Gravity

---

## Limitations

**YouTube ads:**
- ❌ In-video ads (CANNOT block - same domain as video)
- ✅ Banner ads, sidebar ads, homepage ads
- ✅ Tracking, analytics, telemetry

**Workaround for YouTube:**
- Browser extension: uBlock Origin
- Alternative frontend: Invidious, FreeTube
- YouTube Premium (paid)

---

## Troubleshooting

**DNS not working:**
1. Check container is running: `sudo docker ps | grep pihole`
2. Check port 53 is listening: `sudo netstat -tulpn | grep :53`
3. Check router DNS settings
4. Flush DNS cache on devices

**Web UI not accessible:**
1. Check port 8053: `curl http://192.168.1.152:8053`
2. Check container logs: `sudo docker logs pihole`

---

## Related

- See: `connections/ssh.md` for NAS SSH access
- See: `code/media.md` for all NAS services
