# Uptime Kuma - Service Monitoring

**Last updated:** 2026-03-08 13:30 EST

**Purpose:** Self-hosted monitoring tool (like Uptime Robot, but local)

---

## Access

- **Local:** http://localhost:3010
- **Tailscale (remote):** https://studio.adal-rigel.ts.net:3010
- **Process manager:** PM2 (auto-start on boot)

---

## Installation

**Location:** `~/Apps/uptime-kuma/`

**Installed:** 2026-03-08

**Method:** Git clone + npm setup + pm2

---

## Management

**Start/stop:**
```bash
# Status
pm2 status uptime-kuma

# Restart
pm2 restart uptime-kuma

# Logs
pm2 logs uptime-kuma

# Stop
pm2 stop uptime-kuma

# Start
pm2 start uptime-kuma
```

**Auto-start:**
- LaunchAgent: `~/Library/LaunchAgents/com.nonlinear.uptime-kuma.plist`
- PM2 resurrects on boot

**Tailscale exposure:**
- Auto-exposed via `~/bin/tailscale-serve-autostart.sh`
- Port 3010 (HTTPS)

---

## What It Does

**Monitors:**
- HTTP/HTTPS endpoints
- TCP ports
- Ping
- Docker containers
- DNS records
- Websockets
- Keyword detection

**Notifications:**
- Telegram, Discord, Email
- 90+ services supported

**Features:**
- 20-second check intervals
- Status pages (public/private)
- Certificate monitoring
- Uptime graphs
- Multi-user support

---

## Initial Setup (First Time Only)

1. Open: https://studio.adal-rigel.ts.net:3010 (or localhost)
2. Create admin account
3. Set up monitors (Tailscale services)
4. Configure Telegram notifications

---

## Recommended Monitors

**Critical services:**
- ✅ Tailscale serve status (https://studio.adal-rigel.ts.net)
- ✅ Backstage UI (https://studio.adal-rigel.ts.net:3002)
- ✅ Kavita (http://studio.adal-rigel.ts.net:5007)
- ✅ Komga (https://studio.adal-rigel.ts.net:5008)
- ✅ SearXNG (http://studio.adal-rigel.ts.net:8889)

**Alert via Telegram when down.**

---

## Why Uptime Kuma?

**vs HEARTBEAT.md health checks:**
- Visual dashboard (see all services at a glance)
- Historical uptime stats
- Faster alerts (20-second checks vs daily HEARTBEAT)
- Per-service notification rules

**Complements HEARTBEAT:**
- HEARTBEAT = auto-recovery + morning reports
- Uptime Kuma = real-time alerts + visual monitoring

---

## Troubleshooting

**Service won't start:**
```bash
# Check logs
pm2 logs uptime-kuma --lines 50

# Check port conflict
ps aux | grep 3010

# Restart
pm2 restart uptime-kuma
```

**Port 3001 conflict (original issue):**
- Changed to port 3010 (no conflicts)
- Original setup attempted 3001, but port was in use

**Access denied:**
- Check Tailscale status: `tailscale status`
- Verify serve config: `tailscale serve status`

---

## See Also

- Tailscale ports: `connections/tailscale.md`
- Auto-start script: `~/bin/tailscale-serve-autostart.sh`
- PM2 docs: https://pm2.keymetrics.io/
- Uptime Kuma docs: https://github.com/louislam/uptime-kuma
