# Uptime Kuma Connection Guide

## Service Information

- **Port:** 3011 (NOT 3001 or 3010)
- **Local URL:** http://localhost:3011
- **Tailscale URL:** https://studio.adal-rigel.ts.net:3011/
- **Tech Stack:** Node.js monitoring application
- **Status:** Running but needs initial setup

---

## Auto-Start Configuration

**Service Manager:** PM2

**PM2 ID:** 3

**Start Command:**
```bash
cd ~/Apps/uptime-kuma && node server/server.js
```

**PM2 Commands:**
```bash
# Status
pm2 list
pm2 show uptime-kuma

# Environment (shows PORT=3011)
pm2 env 3

# Logs
pm2 logs uptime-kuma

# Restart
pm2 restart uptime-kuma
```

---

## Initial Setup

**First Access:** http://localhost:3011

**Setup Flow:**
1. Redirects to `/setup-database`
2. Create admin account
3. Configure database settings
4. Complete setup wizard

**After Setup:**
- Add monitors for critical services
- Configure notifications (Telegram, etc.)
- Set check intervals

---

## Monitoring Configuration

### Recommended Monitors

**Backstage:**
- Type: HTTP(s)
- URL: http://localhost:3004
- Interval: 60s
- Heartbeat: Expected

**Other Services:**
- Check `tailscale serve status` for all exposed services
- Monitor each critical endpoint

---

## Port Confusion

### ⚠️ Common Mistake

**Default Port:** 3001 (from config.js)  
**Actual Port:** 3011 (PM2 environment variable)

**Why Different:**
- PM2 env sets `PORT=3011`
- Overrides default from `server/config.js`
- Check with: `pm2 env 3 | grep PORT`

**Lesson:** Always verify PM2 environment, not just source code defaults.

---

## Tailscale Configuration

**Current Setup:**
```bash
# Port 3011 (same as local)
https://studio.adal-rigel.ts.net:3011/
```

**Configuration:**
```bash
tailscale serve --bg --https 3011 http://localhost:3011
```

**Verify:**
```bash
tailscale serve status | grep 3011
```

---

## Common Issues

### Setup Not Complete

**Symptom:** Redirects to `/setup-database`

**Solution:** Complete initial setup wizard at http://localhost:3011

### Port Confusion

**Symptom:** Can't access on port 3001 or 3010

**Solution:** 
- Local access: Use port **3011**
- Tailscale access: Use port **3010** (HTTPS)

### PM2 Environment

**Check Actual Port:**
```bash
pm2 env 3 | grep PORT
# Output: PORT: 3011
```

---

## Lock In Gains (Automation Checklist)

- ✅ PM2 configured for auto-restart
- ✅ PM2 startup enabled (LaunchAgent)
- ✅ Tailscale serve configured (port 3010 HTTPS)
- ⏳ Initial setup required (first run)
- ⏳ Monitors to be configured after setup

---

**Last Updated:** 2026-03-09

**Critical Finding:** Port is 3011 (both local and Tailscale for consistency).
