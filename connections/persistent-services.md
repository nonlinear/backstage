---
service: "Persistent Services"
description: "Manage localhost servers (Agenda 8765, Librarian 8766), start/stop background services, or troubleshoot LaunchAgents"
manager: "localhost-manager.sh"
---

# Persistent Services Setup (Mac Studio)

**Goal:** ALL critical services ALWAYS ON (survive reboots)

## ⚠️ CURRENT STATUS (2026-03-08)

**✅ WORKS NOW (manual start):**
- PM2 services: `pm2 resurrect` manually restores all
- Docker services: Auto-restart via `--restart unless-stopped`

**❌ DOES NOT SURVIVE REBOOT:**
- PM2 services: NO LaunchAgent configured
- **BLOCKER:** Need `sudo` to run `pm2 startup launchd`

---

## PM2 Services (Node.js)

**Current services:**
- Backstage (port 3002)
- Uptime Kuma (port 3010)
- OpenClaw (port 18789)

**Saved config:** `/Users/nonlinear/.pm2/dump.pm2` ✅

**Auto-start on boot (NOT DONE YET):**
```bash
# Run this command (needs sudo password):
sudo env PATH=$PATH:/opt/homebrew/Cellar/node@22/22.22.0/bin /opt/homebrew/lib/node_modules/pm2/bin/pm2 startup launchd -u nonlinear --hp /Users/nonlinear

# Then save again:
pm2 save
```

**After reboot (CURRENT WORKAROUND):**
```bash
pm2 resurrect
```

---

## Docker Services

**Current containers (--restart unless-stopped):**
- Kavita (port 5009) ⚠️ Should be 5007
- Matrix Synapse (port 8008)
- Mattermost (port 8065)
- Komga (port 5008)
- SearXNG (port 8889)
- Zulip (ports 80/443 internal)

**✅ Auto-restart on boot WORKS** (Docker Desktop configured as login item)

---

## Tailscale Services

**Auto-start script:** `~/bin/tailscale-serve-autostart.sh`

**LaunchAgent:** `~/Library/LaunchAgents/com.nonlinear.tailscale-serve.plist`

**✅ Auto-start on boot WORKS**

**Services exposed:**
- OpenClaw: https://studio.adal-rigel.ts.net (port 443)
- Backstage: https://studio.adal-rigel.ts.net:3002
- Uptime Kuma: https://studio.adal-rigel.ts.net:3011
- Kavita: http://studio.adal-rigel.ts.net:5009
- Matrix: https://studio.adal-rigel.ts.net:8008
- Mattermost: https://studio.adal-rigel.ts.net:8065
- Komga: https://studio.adal-rigel.ts.net:5008
- SearXNG: http://studio.adal-rigel.ts.net:8889
- Zulip: https://studio.adal-rigel.ts.net:8090

---

## Why This Matters

**Nicholas travels.** iPad depends on Tailscale services.

**Downtime = death.**

**Philosophy:** Dedicated machine = ALWAYS ON, AUTO-RESTART, TESTABLE REMOTELY.

---

## Reality Check

**HONEST STATUS:**
- Docker services = ✅ Survive reboot
- Tailscale = ✅ Survive reboot
- PM2 services = ❌ Need manual `pm2 resurrect` after reboot (sudo blocker)
