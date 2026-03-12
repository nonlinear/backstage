# Uptime Alerts + NAS Production Hardening

**Goal:** Production-grade NAS infrastructure: monitoring (Uptime Kuma), alerts (Telegram), backups, auto-recovery.

**Why critical:** Pi-hole Global DNS = single point of failure. Need monitoring + alerts + failover before enabling.

---

## Problem

**Current state:**
- ✅ NAS running critical services (Pi-hole, Home Assistant, Paperless, etc.)
- ❌ **No monitoring** (if service dies, no alert) → **FIXED: Uptime Kuma**
- ❌ **No backups** (data loss risk)
- ❌ **No auto-recovery** (manual intervention needed)

**Risk scenario:**
- Enable Pi-hole Global DNS → NAS becomes critical for EVERYONE on tailnet
- NAS dies → **DNS stops → Internet stops for all devices**
- No alert → We don't know until someone complains

**This is unacceptable for production.**

---

## Solution: Three Pillars

### 1. 📊 Monitoring (Uptime Kuma)
**Why NAS?**
- Mac Studio can reboot/crash → Kuma on Mac = silent failure
- Nicholas travels with iPad → needs remote alerts when Mac is down
- External monitoring = "firefighter outside the burning building"

**Done:**
- ✅ Installed Uptime Kuma on NAS (Docker, port 3001)
- ✅ Exposed via Tailscale: https://media.adal-rigel.ts.net:3001
- ✅ Created 17 monitors:
  - **Tailscale Health:** Studio, NAS
  - **Mac Studio (5):** Backstage, Librarian, Shelfmark, OpenClaw, Uptime Kuma
  - **NAS (10):** Jellyfin, Immich, Paperless, Syncthing, Home Assistant, Actual Budget, Komga, SearXNG, Portainer, changedetection.io

**Philosophy:** "Se existe no port, existe no Tailscale" → 1 monitor per service (Tailscale only, not local+Tailscale)

---

### 2. 🚨 Alerts (Telegram Integration)
- **Telegram notifications** (service down, high CPU, disk full)
- **Escalation levels** (warning → critical → emergency)
- **Smart throttling** (don't spam, batch alerts)

**Implementation:**
```yaml
# Uptime Kuma Telegram config
Bot token: $TELEGRAM_BOT_TOKEN (in .env)
Chat ID: $TELEGRAM_CHAT_ID
Templates: Concise, actionable
```

---

### 3. 💾 Backups + Auto-Recovery

**Auto-Recovery:**
- Docker restart policies (`--restart=unless-stopped`)
- Watchdog script (cron every 5min, restart failed containers)
- Self-healing containers

**Backups:**
- Config backups (Pi-hole settings, HA automations, Docker configs)
- Data backups (Paperless docs, critical data)
- Restore testing (quarterly, verify backups work)

**Failover DNS:**
- Primary: 192.168.1.152 (Pi-hole)
- Secondary: 1.1.1.1 (Cloudflare)
- Graceful degradation (ads not blocked, but internet works)

---

## Success Criteria

**Before enabling Pi-hole Global DNS:**
- ✅ Monitoring dashboard shows NAS health (**DONE: Uptime Kuma**)
- ✅ Alerts working (tested via manual trigger)
- ✅ Auto-recovery tested (kill container → auto-restart)
- ✅ Backups running (daily, verified restore)
- ✅ Failover DNS tested (Pi-hole down → 1.1.1.1 works)

**Then and only then:** Enable Global DNS safely.

---

## Links

- Uptime Kuma: https://media.adal-rigel.ts.net:3001
- `connections/tailscale.md` (updated 2026-03-12)
- `connections/services.md` (service list)

---

## Notes

- changedetection.io runs HTTP (not HTTPS): `http://media.adal-rigel.ts.net:5555`
- All monitors accept 200-399 status codes (handles redirects)
