# pm2 Test Results - 2026-03-14 21:30 EDT

## Test Performed

**Attempted:** Start Backstage + Librarian via pm2 ecosystem config

**Result:** ❌ FAILED - Infinite restart loop

---

## Root Cause

**pm2 configuration incompatible with Next.js dev mode:**

1. **`min_uptime: 10s`** - pm2 expects process to stay alive 10s before considering it "stable"
2. **Next.js exits immediately after starting** (hands off to webpack dev server)
3. **pm2 sees exit < 10s = crash** → restarts → repeat forever

---

## Evidence

```
2026-03-14 21:29:17 -04:00: 
> backstage@0.1.0 dev
> next dev -p 3004
(immediately exits)
```

**pm2 status:**
```
status: waiting restart
uptime: 0
restarts: 4
```

---

## Why `wait_ready` Didn't Help

Removed `wait_ready` config but problem persists:
- Next.js never sends "ready" signal
- Process exits before 10s `min_uptime`
- pm2 considers it crashed

---

## Solutions (NOT TESTED)

### Option A: Remove `min_uptime` entirely

```json
{
  "min_uptime": "0s"
}
```

OR remove field completely.

### Option B: Use pm2 in `no_autorestart` mode for dev

```json
{
  "autorestart": false
}
```

Then manage restarts externally.

### Option C: Wrap Next.js in persistent script

```bash
#!/bin/bash
# Keep process alive
cd /path/to/app
while true; do
  npm run dev
  sleep 2
done
```

pm2 runs the wrapper (never exits).

### Option D: Use Docker Compose instead

Next.js in container = persistent process, pm2 unnecessary.

---

## Recommendation

**SHORT-TERM:** Use LaunchAgents (already working) + manual Tailscale cleanup script

**MEDIUM-TERM:** Migrate to Docker Compose (more robust, no pm2 quirks)

---

## Files

- Config: `~/.studio/pm2-ecosystem.json`
- Logs: `~/.studio/logs/backstage-*.log`
- Test date: 2026-03-14 21:27-21:30 EDT

---

**Status:** pm2 approach BLOCKED pending config fix or Docker migration
