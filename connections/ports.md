# Port Management Protocol

**Philosophy:** Ports are immutable. Don't move them when blocked—fix the blocker.

---

## Port Registry

| Service | Port | Protocol | Tailscale | Immutable? |
|---------|------|----------|-----------|------------|
| Backstage | 3004 | HTTPS | ✓ | ✓ |
| Uptime Kuma | 3011 | HTTPS | ✓ | ✓ |
| OpenClaw | 18789 | HTTP | ✗ | ✓ |
| Kavita | 5007 | HTTP | ✓ | ✓ |
| Matrix | 8065 | HTTPS | ✓ | ✓ |

**Immutable = permalinks exist, don't change.**

---

## Common Port Hijackers

1. **Tailscale `serve`** - Network-layer proxies (invisible to ps/lsof)
2. **Orphaned sockets** - Process dies, socket lingers
3. **Multiple process managers** - PM2 + LaunchAgents fighting
4. **Hidden listeners** - Docker, nginx, system services

---

## Diagnostic Hierarchy (Run in Order)

```bash
PORT=3004  # Replace with your port

# 1. Check Tailscale FIRST (most common hijacker)
tailscale serve status | grep ":$PORT"

# 2. Check process managers
pm2 list | grep "$PORT"

# 3. Check OS-level listeners
lsof -i :$PORT

# 4. Check LaunchAgents
launchctl list | grep -i <service-name>
```

---

## Port Hammer Script 🔨

**Clean any port before starting service:**

```bash
#!/bin/bash
# Usage: ./port-hammer.sh 3004 backstage

PORT=$1
SERVICE=$2

echo "🔨 Hammering port $PORT for $SERVICE..."

# 1. Clear Tailscale
echo "1. Removing Tailscale proxies..."
tailscale serve --https=$PORT off 2>/dev/null
tailscale serve --http=$PORT off 2>/dev/null

# 2. Clear PM2
echo "2. Stopping PM2 process..."
pm2 delete $SERVICE 2>/dev/null || true

# 3. Kill stragglers
echo "3. Killing any lingering processes..."
lsof -ti :$PORT | xargs kill -9 2>/dev/null || true

# 4. Wait for OS cleanup
sleep 2

# 5. Verify port is clear
if lsof -i :$PORT 2>/dev/null; then
    echo "❌ Port $PORT still occupied!"
    exit 1
else
    echo "✅ Port $PORT clear!"
fi
```

---

## Per-Service Clean Start

### Backstage (Port 3004)

```bash
# Clean
tailscale serve --https=3004 off
pm2 delete backstage 2>/dev/null || true
lsof -ti :3004 | xargs kill -9 2>/dev/null || true

# Start
pm2 start npm --name backstage --cwd ~/Backstage/app -- start -- --port 3004

# Expose via Tailscale
tailscale serve --https=3004 http://localhost:3004
```

### OpenClaw (Port 18789)

```bash
# Clean
tailscale serve --https=18789 off
pm2 delete openclaw 2>/dev/null || true
lsof -ti :18789 | xargs kill -9 2>/dev/null || true

# Start
openclaw gateway start

# Expose via Tailscale (optional)
tailscale serve --https=18789 http://localhost:18789
```

---

## Prevention: Single Authority

**Instead of PM2, use macOS LaunchAgent:**

Benefits:
- Survives reboots
- Single source of truth (no PM2 conflicts)
- Easier debugging via `launchctl`

Example: `~/Library/LaunchAgents/com.backstage.app.plist`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.backstage.app</string>
    <key>ProgramArguments</key>
    <array>
        <string>/opt/homebrew/bin/npm</string>
        <string>start</string>
        <string>--</string>
        <string>--port</string>
        <string>3004</string>
    </array>
    <key>WorkingDirectory</key>
    <string>/Users/nonlinear/Backstage/app</string>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/tmp/backstage.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/backstage-error.log</string>
</dict>
</plist>
```

Commands:
```bash
# Load
launchctl load ~/Library/LaunchAgents/com.backstage.app.plist

# Unload
launchctl unload ~/Library/LaunchAgents/com.backstage.app.plist

# Check status
launchctl list | grep backstage
```

---

## Port Stability Check (Candidate)

**Executable validation:**

```bash
#!/bin/bash
# checks/port-stability.sh

# Read port registry from backstage.yaml or config
EXPECTED_PORTS=(3004 3011 18789 5007 8065)

for PORT in "${EXPECTED_PORTS[@]}"; do
    # Check if expected service is running on expected port
    # Check if Tailscale proxy matches registry
    # FAIL if port moved or service unreachable
done
```

**When to run:**
- Pre-deploy checkpoint
- Daily health check
- After system updates/reboots

**Exit codes:**
- 0 = All ports stable
- 1 = Port moved or service down

---

## Critical Rules

1. **Never move ports** - Fix blocker, don't relocate
2. **Check Tailscale first** - Most common invisible hijacker
3. **Single authority** - PM2 OR LaunchAgent, not both
4. **Document immutability** - Registry above = source of truth
5. **Permalinks depend on stability** - Moving ports = broken links

---

**Created:** 2026-03-09  
**Last updated:** 2026-03-09  
**Related:** connections/backstage.md, connections/tailscale.md
