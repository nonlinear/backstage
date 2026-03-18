# PM2 - Process Manager for Node.js Services

**Purpose:** Keep Backstage, Librarian, and other Node.js services running 24/7 with auto-restart on failure.

**Config:** `~/.pm2/ecosystem.config.js`  
**Logs:** `~/.pm2/logs/`

---

## Active Services

| Service | Port | Path | Status |
|---------|------|------|--------|
| **Backstage** | 3004 | `~/Backstage/app` | Production build |
| **Librarian** | 8766 | `~/Documents/librarian/app` | Production build |

---

## Common Commands

```bash
# List all services
pm2 list

# View logs (live)
pm2 logs

# View logs (specific service)
pm2 logs backstage
pm2 logs librarian

# Restart service
pm2 restart backstage
pm2 restart librarian

# Restart all
pm2 restart all

# Stop service (not recommended - use restart instead)
pm2 stop backstage

# Delete service (removes from PM2)
pm2 delete backstage

# Save current state (after adding/removing services)
pm2 save

# Monitor (live dashboard)
pm2 monit
```

---

## Ecosystem Config

**Location:** `~/.pm2/ecosystem.config.js`

```javascript
module.exports = {
  apps: [
    {
      name: 'backstage',
      cwd: '/Users/nonlinear/Backstage/app',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3004,
        NODE_ENV: 'production'
      },
      error_file: '/Users/nonlinear/.pm2/logs/backstage-error.log',
      out_file: '/Users/nonlinear/.pm2/logs/backstage-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s'
    },
    {
      name: 'librarian',
      cwd: '/Users/nonlinear/Documents/librarian/app',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 8766,
        NODE_ENV: 'production'
      },
      error_file: '/Users/nonlinear/.pm2/logs/librarian-error.log',
      out_file: '/Users/nonlinear/.pm2/logs/librarian-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s'
    }
  ]
};
```

---

## Startup on Boot

PM2 auto-starts on system boot via launchd:

```bash
# View startup config
pm2 startup

# If not configured, run:
pm2 startup launchd

# Save current services
pm2 save
```

**Startup plist:** `~/Library/LaunchAgents/pm2.nonlinear.plist`

---

## Adding New Service

1. **Build app** (if Next.js):
   ```bash
   cd ~/path/to/app
   npm run build
   ```

2. **Add to ecosystem.config.js**:
   ```javascript
   {
     name: 'service-name',
     cwd: '/path/to/app',
     script: 'npm',
     args: 'start',
     env: {
       PORT: 9999,
       NODE_ENV: 'production'
     }
   }
   ```

3. **Reload PM2**:
   ```bash
   pm2 delete all  # Clear old services
   pm2 start ~/.pm2/ecosystem.config.js
   pm2 save
   ```

---

## Troubleshooting

### Service won't start (EADDRINUSE)
**Cause:** Port already in use (probably Tailscale proxy)

**Fix:**
```bash
# Turn off Tailscale proxy
tailscale serve --https=PORT off

# Kill process on port
kill -9 $(lsof -ti :PORT)

# Restart PM2
pm2 restart service-name

# Re-enable Tailscale proxy
tailscale serve --bg --https=PORT http://localhost:PORT
```

### Service keeps restarting (↺ high number)
**Check logs:**
```bash
pm2 logs service-name --err --lines 50
```

**Common causes:**
- Port conflict
- Missing dependencies (run `npm install`)
- Build failed (run `npm run build`)
- Environment variables missing

### Logs too large
PM2 uses `pm2-logrotate` module (automatically installed):

```bash
# Check logrotate status
pm2 ls modules

# Configure rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
```

### PM2 not starting on boot
```bash
# Re-configure startup
pm2 unstartup launchd
pm2 startup launchd
pm2 save
```

---

## Production vs Dev Mode

**❌ NEVER use `npm run dev` for always-on services:**
- Dev mode = file watching (heavy on macOS FSEvents)
- Memory leaks
- Crashes without logs
- Not designed for uptime

**✅ ALWAYS use production build:**
```bash
npm run build
npm start
```

PM2 manages `npm start` (production) → stable, no file watching, optimized.

---

## Integration with Tailscale

**Pattern:**
1. PM2 runs service on localhost:PORT
2. Tailscale `serve` proxies to Tailnet

**Restart sequence:**
```bash
# 1. Turn off Tailscale proxy
tailscale serve --https=PORT off

# 2. Restart PM2 service
pm2 restart service-name

# 3. Wait for service to be online
sleep 5

# 4. Re-enable Tailscale proxy
tailscale serve --bg --https=PORT http://localhost:PORT
```

**Auto-restart script** (if needed):
```bash
#!/bin/bash
# ~/Desktop/restart-pm2-services.sh

for service in backstage librarian; do
  port=$(pm2 jlist | jq -r ".[] | select(.name==\"$service\") | .pm2_env.PORT")
  tailscale serve --https=$port off
  pm2 restart $service
  sleep 5
  tailscale serve --bg --https=$port http://localhost:$port
done
```

---

## Related Files

- **Ecosystem config:** `~/.pm2/ecosystem.config.js`
- **Logs:** `~/.pm2/logs/`
- **Startup plist:** `~/Library/LaunchAgents/pm2.nonlinear.plist`
- **Service docs:** `~/Documents/personal/connections/backstage.md`, `~/Documents/personal/connections/librarian.md`
- **Stability doc:** `~/Desktop/service-stability-problem.md`

---

## 💡 Future: Branch-Aware Mode (Checkpoint Candidate)

**Idea:** Auto-switch between dev/prod mode based on git branch

**Heuristic:**
- `main` branch → prod mode (`npm start`)
- Any other branch → dev mode (`npm run dev`)

**Why:**
- Dev mode = hot reload (faster iteration)
- Prod mode = stable (uptime for remote access)
- Branch already signals intent

**Implementation (when Checkpoints exist):**
```yaml
# checkpoint: pm2-branch-aware-mode
trigger: git-branch-change
check:
  - current-branch != previous-branch
action:
  - if main: pm2 restart {service} --update-env NODE_ENV=production
  - else: pm2 restart {service} --update-env NODE_ENV=development
```

**Manual version (until then):**
```bash
# ~/Backstage/scripts/pm2-smart-restart.sh
BRANCH=$(git -C ~/Backstage branch --show-current)
if [ "$BRANCH" = "main" ]; then
  cd ~/Backstage/app && npm run build
  pm2 restart backstage --update-env NODE_ENV=production
else
  pm2 restart backstage --update-env NODE_ENV=development
fi
```

**Benefits:**
- No manual mode switching
- Prod stability for main (iPad/iPhone access)
- Dev speed for feature branches

**Trade-off:** Requires checkpoint infrastructure (git hooks, PM2 integration)

---

**Installed:** 2026-03-17  
**Last updated:** 2026-03-17
