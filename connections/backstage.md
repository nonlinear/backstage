---
service: Backstage
description: "Access personal project dashboard, manage epic notes, view roadmaps, or check project health/status"
host: "localhost:3004"
tailscale: "studio.adal-rigel.ts.net:3004"
---

# Backstage Connection Guide

## Service Information

- **Port:** 3004
- **Local URL:** http://localhost:3004
- **Tailscale URL (MagicDNS):** https://studio.adal-rigel.ts.net:3004/
- **Tech Stack:** Next.js 16.1.6
- **Production Build Required:** Yes (`npm run build`)

---

## Auto-Start Configuration

**Service Manager:** PM2

**Start Command:**
```bash
cd ~/Backstage/app && PORT=3004 npm start
```

**PM2 Status:**
```bash
pm2 list
pm2 show backstage
```

**PM2 Logs:**
```bash
pm2 logs backstage
```

**Restart:**
```bash
pm2 restart backstage
```

---

## Tailscale MagicDNS

**Configuration:**
```bash
tailscale serve --bg --https 3004 http://localhost:3004
```

**Status:**
```bash
tailscale serve status
```

**Disable:**
```bash
tailscale serve --https=3004 off
```

**MagicDNS URL:** https://studio.adal-rigel.ts.net:3004/

---

## Build Process

**Initial Build (required):**
```bash
cd ~/Backstage/app
npm run build
```

**Development Mode (NOT for production):**
```bash
PORT=3004 npm run dev
```

---

## Common Issues

### Port 3002 Blocked

**Symptom:** `EADDRINUSE: address already in use :::3002`

**Solution:**  
Port 3002 was originally targeted but had persistent conflicts. **Backstage runs on port 3004 instead.**

### TypeScript Build Errors

**Fixed:** Changed `priority` object to use `Record<string, number>` type in:
- `~/Backstage/app/app/api/agents/[squad]/[id]/notes/route.ts`

**Before:**
```typescript
const priority = { agent: 0, squad: 1, root: 2 }
```

**After:**
```typescript
const priority: Record<string, number> = { agent: 0, squad: 1, root: 2 }
```

---

## Monitoring

**Uptime Kuma:**
- Monitor URL: http://localhost:3004
- Check interval: 60s

---

## Lock In Gains (Automation Checklist)

- ✅ PM2 configured for auto-restart
- ✅ PM2 startup enabled (LaunchAgent)
- ✅ Tailscale serve configured (HTTPS via MagicDNS)
- ✅ Production build completed
- ✅ Uptime Kuma monitoring (to be configured)

---

**Last Updated:** 2026-03-09
