---
service: Pi-hole
description: "Block ads network-wide, add blocklists/regex, configure DNS, troubleshoot ad blocking, or set up Tailscale remote ad-blocking"
host: "192.168.1.152:8053"
tailscale: "media.adal-rigel.ts.net:8053"
status: active
---

# Pi-hole - Network-wide Ad Blocking

**Web UI:** `http://192.168.1.152:8053/admin` (local) | `http://media.adal-rigel.ts.net:8053/admin` (remote)  
**DNS:** `192.168.1.152:53` (UDP/TCP)  
**Password:** (in Proton Pass)

---

## Quick Reference

**Common tasks:**
- Add blocklist: Admin → Group Management → Adlists → Add URL → Update Gravity
- Add regex: Admin → Domains → Regex Filters → Add pattern
- Whitelist domain: Admin → Whitelist → Add domain
- View logs: Admin → Query Log

**Test blocking:**
```bash
nslookup ads.example.com 192.168.1.152
# Should return 0.0.0.0 if blocked
```

---

## Tailscale Integration (Remote Ad-blocking)

**✅ CONFIGURED:** Global Nameservers = Pi-hole (`192.168.1.152`)

**What this means:**
- ALL devices on tailnet use Pi-hole automatically (when Tailscale ON)
- iPhone, iPad, MacBook → ads blocked **outside home** (4G, public WiFi)
- Zero config per device (global nameserver applies to all)

**How configured:**
1. Tailscale admin → https://login.tailscale.com/admin/dns
2. DNS → Nameservers → **Global nameservers**
3. Add: `192.168.1.152` (Pi-hole local IP)
4. **Primary DNS:** Pi-hole (ads blocked)
5. **Fallback DNS:** 1.1.1.1 (Cloudflare - if NAS offline)

**New device joins tailnet:**
- ✅ Automatically uses Pi-hole (no configuration)
- Just install Tailscale app + login to tailnet

**Trade-offs:**
- **Battery:** Slight increase (DNS queries route through Tailscale)
- **Latency:** +10-50ms (depends on NAS location)
- **Privacy:** All DNS queries visible to Pi-hole (but you own it)

---

## Installation (Docker on NAS)

**Current setup:**
```bash
docker run -d \
  --name pihole \
  --restart unless-stopped \
  -p 8053:80 \
  -p 53:53/tcp \
  -p 53:53/udp \
  -e TZ=America/New_York \
  -e WEBPASSWORD=$(cat ~/.pihole_pass) \
  -v /opt/pihole/etc:/etc/pihole \
  -v /opt/pihole/dnsmasq.d:/etc/dnsmasq.d \
  pihole/pihole:latest
```

**Ports:**
- `8053` → Web UI (avoid conflict with other services)
- `53` → DNS (UDP + TCP)

---

## Blocklists

### Recommended Lists

**General ads + tracking:**
```
https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts
https://raw.githubusercontent.com/anudeepND/blacklist/master/adservers.txt
```

**Malware + phishing:**
```
https://raw.githubusercontent.com/DandelionSprout/adfilt/master/Alternate%20versions%20Anti-Malware%20List/AntiMalwareHosts.txt
```

**YouTube ads (partial):**
```
https://raw.githubusercontent.com/kboghdady/youTube_ads_4_pi-hole/master/youtubelist.txt
```

**Social media tracking:**
```
https://raw.githubusercontent.com/lightswitch05/hosts/master/ads-and-tracking-extended.txt
```

### IoT Telemetry Blocklists

**Amazon Alexa tracking:**
```
https://raw.githubusercontent.com/anudeepND/blacklist/master/adservers.txt
```
Blocks: `device-metrics-us.amazon.com`, `avs-alexa-na.amazon.com` (Alexa still works)

**Google Home / Chromecast:**
```
https://raw.githubusercontent.com/lightswitch05/hosts/master/ads-and-tracking-extended.txt
```
Blocks: `googleadservices.com`, `doubleclick.net`, `firebase-settings.crashlytics.com`

**Samsung Smart TV:**
```
https://raw.githubusercontent.com/Perflyst/PiHoleBlocklist/master/SmartTV-AGH.txt
```
Blocks: `samsungads.com`, `samsungosp.com`, `samsungqbe.com`

**LG Smart TV:**
```
https://raw.githubusercontent.com/Perflyst/PiHoleBlocklist/master/SmartTV.txt
```
Blocks: `lgsmartad.com`, `smartshare.lgtvsdp.com`

**Roku tracking:**
```
https://raw.githubusercontent.com/Perflyst/PiHoleBlocklist/master/SmartTV.txt
```
Blocks: `scribe.logs.roku.com`, `austin.logs.roku.com`

**How to add:**
1. Pi-hole Admin → Group Management → Adlists
2. Paste URL → Add
3. Tools → Update Gravity

---

## Regex Filters

### Anti-Tracking Patterns

**Block telemetry (Microsoft, Google, Apple):**
```regex
^(.+[_.-])?telemetry[_.-]
^(.+[_.-])?tracking[_.-]
^(.+[_.-])?analytics[_.-]
^(.+[_.-])?metrics[_.-]
```
Blocks: `telemetry.microsoft.com`, `tracking.google.com`, `app-analytics.apple.com`

**Block Google Ads:**
```regex
^(.+[_.-])?doubleclick[_.-]
^(.+[_.-])?googlesyndication[_.-]
^(.+[_.-])?googleadservices[_.-]
```
Blocks: `doubleclick.net`, `googlesyndication.com`, `googleadservices.com`

**Block Facebook tracking:**
```regex
^(.+[_.-])?facebook[_.-].*analytics
^(.+[_.-])?fbcdn[_.-].*tracking
^(.+[_.-])?graph\.facebook
```
Blocks: `analytics.facebook.com`, `tracking.fbcdn.net`, `graph.facebook.com`

**Block crypto miners:**
```regex
^(.+[_.-])?coinhive[_.-]
^(.+[_.-])?cryptoloot[_.-]
^(.+[_.-])?coin-hive[_.-]
```

### Amazon Block (Nuclear Option)

**Blocks EVERYTHING Amazon-related:**
```regex
(^|\.)amazon\.
(^|\.)amazonaws\.com$
(^|\.)amazonalexa\.
(^|\.)amazontrust\.
```

**Side effects:**
- ❌ Amazon shopping (won't open)
- ❌ AWS services (if you use them)
- ❌ Alexa (stops working)
- ❌ Any app/service using AWS backend

**This is INTENTIONAL.** Fuck Amazon. 🏴

**How to apply:**
1. Pi-hole Admin → Group Management → Domains → Regex Filters
2. Add each regex above
3. Save → Tools → Update Gravity

**Test:**
```bash
nslookup amazon.com 192.168.1.152
# Should return 0.0.0.0 (blocked)
```

**Rollback:**
```bash
ssh $NAS_USER@$NAS_HOST
sqlite3 /etc/pihole/gravity.db "DELETE FROM domainlist WHERE comment LIKE '%Block%Amazon%';"
pihole restartdns reload-lists
```

---

## Regex Best Practices

**⚠️ Regex = power + risk:**
- Too aggressive = sites break
- Test gradually
- If something breaks → whitelist specific domain

**Example false positive:**
- Regex: `^(.+[_.-])?analytics[_.-]`
- Blocks: `google-analytics.com` ✅
- BUT ALSO: `myapp-analytics.internal.company.com` ❌

**Solution:** Whitelist the specific broken domain

**Test regex before adding:**
1. Pi-hole → Tools → Query Lists
2. Enter domain (ex: `telemetry.microsoft.com`)
3. See if regex would catch it

---

## Common Tasks

### View Query Logs
```bash
# Web UI
http://192.168.1.152:8053/admin → Query Log

# CLI (SSH into NAS)
pihole -t
```

### Whitelist a Domain
```bash
# Web UI
Admin → Whitelist → Add domain

# CLI
pihole -w example.com
```

### Update Blocklists
```bash
# Web UI
Tools → Update Gravity

# CLI
pihole -g
```

### Check Status
```bash
# Web UI
Dashboard shows queries/blocked %

# CLI
pihole status
```

### Restart DNS
```bash
pihole restartdns
```

---

## Troubleshooting

**Pi-hole not blocking:**
1. Check device DNS: `nslookup pi.hole` (should resolve if using Pi-hole)
2. Flush DNS cache: `sudo dscacheutil -flushcache` (macOS)
3. Update gravity: `pihole -g`

**Site broken after adding blocklist/regex:**
1. Query Log → find blocked domain
2. Whitelist specific domain (not entire blocklist)
3. Test again

**Tailscale devices not using Pi-hole:**
1. Verify Global Nameservers configured: https://login.tailscale.com/admin/dns
2. Check Tailscale status: `tailscale status`
3. Test DNS: `nslookup pi.hole` (should resolve to 192.168.1.152)

---

## Statistics

**Dashboard:** http://192.168.1.152:8053/admin

Shows:
- Queries today
- Blocked today (%)
- Clients
- Top blocked domains
- Query types (A, AAAA, PTR)

---

## Backup / Restore

**Backup (teleporter):**
1. Settings → Teleporter
2. Backup → Download `.tar.gz`
3. Store in `~/Documents/personal/backups/pihole/`

**Restore:**
1. Settings → Teleporter
2. Restore → Upload `.tar.gz`

---

## Related

- `connections/nas.md` - NAS services overview
- `connections/tailscale.md` - Tailscale configuration
- Source: https://github.com/pi-hole/pi-hole
- Regex patterns: https://github.com/mmotti/pihole-regex

---

**Philosophy:** Self-hosted, anti-corporate, anarchist infrastructure. Fuck surveillance capitalism. 🏴
