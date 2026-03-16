---
service: "Uptime Kuma"
description: "Monitor service health, configure uptime checks, set up Telegram alerts, or view service status dashboard"
host: "192.168.1.152:3001"
---

# Uptime Kuma

**Port:** 3001 (fixed, never change)

**Access:**
- Local: http://localhost:3001
- Tailscale: https://studio.adal-rigel.ts.net:3001

**Manager:** PM2

**Commands:**
```bash
pm2 status uptime-kuma
pm2 restart uptime-kuma
pm2 logs uptime-kuma
```

**Auto-start:** PM2 + LaunchAgent (boot persistence)

**Location:** ~/Apps/uptime-kuma/

**First run:** Complete setup wizard at /setup-database
