---
service: "Mac Studio Boot Architecture"
description: "Fix boot race conditions (Docker/Tailscale/OpenClaw), implement LaunchDaemons, or plan stable boot sequence for infrastructure services"
status: "documented (not implemented)"
---

# Mac Studio Boot Architecture

**Created:** 2026-03-16  
**Context:** Eliminate race conditions in Docker + Tailscale + OpenClaw boot sequence

---

## Current Problems

### 1. LaunchAgent = User Login Only
- **Issue:** OpenClaw in `~/Library/LaunchAgents/` only starts after user login
- **Impact:** Services offline until manual login, not suitable for infrastructure
- **Symptom:** Gateway starts at 09:20 after boot (not during boot)

### 2. Docker Race Condition
- **Issue:** OpenClaw starts before Docker containers ready
- **Impact:** ECONNREFUSED loops (Matrix, Mattermost, APIs)
- **Symptom:** Retry storms in logs, services appear broken after reboot

### 3. Tailscale Serve Race Condition
- **Issue:** `tailscale serve` proxy binds before local service exists
- **Impact:** Port appears blocked (EADDRINUSE), container can't publish
- **Symptom:** Service "Up" but inaccessible, phantom socket errors

### 4. Multiple Process Supervisors (future)
- **Issue:** launchd + docker restart policies + openclaw keepalive + pm2
- **Impact:** Restart storms, conflicting supervision, chaotic logs
- **Symptom:** Service thrashing, unclear which supervisor owns process

---

## Stable Architecture

### Boot Sequence

```
boot
 ├─ system launchd
 │
 ├─ LaunchDaemon: docker.daemon
 │   └─ wait: docker info succeeds
 │
 ├─ LaunchDaemon: docker.compose
 │   ├─ mattermost (healthy)
 │   ├─ librarian (healthy)
 │   ├─ shelfmark (healthy)
 │   └─ databases (healthy)
 │
 ├─ LaunchDaemon: openclaw.gateway
 │   └─ depends: docker.compose
 │
 └─ LaunchDaemon: tailscale.serve
     └─ depends: openclaw.gateway + docker.compose
```

---

## Implementation

### 1. Move OpenClaw to System LaunchDaemon

**Location:** `/Library/LaunchDaemons/ai.openclaw.gateway.plist`

**Key changes:**
- System-level (not user-level)
- Starts before login
- Explicit dependencies via wrapper script

**Wrapper script:** `/usr/local/bin/openclaw-boot-wrapper.sh`

```bash
#!/bin/bash
# Wait for Docker
until docker info >/dev/null 2>&1; do
  sleep 2
done

# Wait for containers healthy
until docker ps --filter health=healthy | grep -q mattermost; do
  sleep 2
done

# Start OpenClaw
exec /opt/homebrew/bin/openclaw gateway start
```

**plist:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>ai.openclaw.gateway</string>
  
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/openclaw-boot-wrapper.sh</string>
  </array>
  
  <key>RunAtLoad</key>
  <true/>
  
  <key>KeepAlive</key>
  <true/>
  
  <key>StandardOutPath</key>
  <string>/Users/nonlinear/.openclaw/logs/gateway.log</string>
  
  <key>StandardErrorPath</key>
  <string>/Users/nonlinear/.openclaw/logs/gateway.err.log</string>
</dict>
</plist>
```

---

### 2. Docker Compose as LaunchDaemon

**Goal:** Start containers before OpenClaw

**Location:** `/Library/LaunchDaemons/local.docker.compose.plist`

**Wrapper:** `/usr/local/bin/docker-compose-boot.sh`

```bash
#!/bin/bash
cd /Users/nonlinear/Apps
exec docker compose up -d
```

**plist:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>local.docker.compose</string>
  
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/docker-compose-boot.sh</string>
  </array>
  
  <key>RunAtLoad</key>
  <true/>
  
  <key>StandardOutPath</key>
  <string>/Users/nonlinear/Apps/logs/compose-boot.log</string>
</dict>
</plist>
```

---

### 3. Tailscale Serve After Services

**Goal:** Proxy only after local services healthy

**Wrapper:** `/usr/local/bin/tailscale-serve-boot.sh`

```bash
#!/bin/bash

# Wait for services
until curl -s http://localhost:8065 >/dev/null; do sleep 2; done
until curl -s http://localhost:3004 >/dev/null; do sleep 2; done
until curl -s http://localhost:8766 >/dev/null; do sleep 2; done
until curl -s http://localhost:8085 >/dev/null; do sleep 2; done

# Configure Tailscale serve
tailscale serve --bg --https=443 http://localhost:8065
tailscale serve --bg --https=3004 http://localhost:3004
tailscale serve --bg --https=8766 http://localhost:8766
tailscale serve --bg --https=8085 http://localhost:8085
```

**plist:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>local.tailscale.serve</string>
  
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/tailscale-serve-boot.sh</string>
  </array>
  
  <key>RunAtLoad</key>
  <true/>
</dict>
</plist>
```

---

## Dependency Graph

```
/Library/LaunchDaemons/
│
├─ com.docker.docker.plist (Docker Desktop default)
│  └─ wait: docker info
│
├─ local.docker.compose.plist
│  └─ depends: docker daemon
│  └─ starts: containers
│
├─ ai.openclaw.gateway.plist
│  └─ depends: docker.compose (via wrapper wait)
│
└─ local.tailscale.serve.plist
   └─ depends: services healthy (via wrapper curl checks)
```

---

## Installation

```bash
# 1. Create wrapper scripts
sudo mkdir -p /usr/local/bin
sudo cp openclaw-boot-wrapper.sh /usr/local/bin/
sudo cp docker-compose-boot.sh /usr/local/bin/
sudo cp tailscale-serve-boot.sh /usr/local/bin/
sudo chmod +x /usr/local/bin/{openclaw-boot-wrapper.sh,docker-compose-boot.sh,tailscale-serve-boot.sh}

# 2. Install LaunchDaemons
sudo cp ai.openclaw.gateway.plist /Library/LaunchDaemons/
sudo cp local.docker.compose.plist /Library/LaunchDaemons/
sudo cp local.tailscale.serve.plist /Library/LaunchDaemons/

# 3. Load (or reboot)
sudo launchctl bootstrap system /Library/LaunchDaemons/local.docker.compose.plist
sudo launchctl bootstrap system /Library/LaunchDaemons/ai.openclaw.gateway.plist
sudo launchctl bootstrap system /Library/LaunchDaemons/local.tailscale.serve.plist

# 4. Remove old user LaunchAgent
launchctl bootout gui/$UID/ai.openclaw.gateway
rm ~/Library/LaunchAgents/ai.openclaw.gateway.plist
```

---

## Benefits

1. **Boot without login** - all services start at system boot
2. **No race conditions** - explicit dependency gating via wrapper waits
3. **Single supervisor** - launchd owns all processes (no docker restart policies)
4. **Predictable order** - docker → containers → openclaw → tailscale serve
5. **Healthcheck gating** - services only proxy after passing health checks

---

## Tradeoffs

- **Root required** - LaunchDaemons need `sudo` (vs user LaunchAgents)
- **More scripts** - wrapper scripts add complexity (but eliminate race conditions)
- **Harder debugging** - system services log differently than user services

---

## Monitoring

```bash
# Check all services
sudo launchctl list | grep -E "docker|openclaw|tailscale"

# View logs
tail -f /Users/nonlinear/.openclaw/logs/gateway.log
tail -f /Users/nonlinear/Apps/logs/compose-boot.log

# Restart specific service
sudo launchctl kickstart -k system/ai.openclaw.gateway
```

---

## Rollback

If architecture breaks:

```bash
# 1. Stop system services
sudo launchctl bootout system/ai.openclaw.gateway
sudo launchctl bootout system/local.docker.compose
sudo launchctl bootout system/local.tailscale.serve

# 2. Restore user LaunchAgent
launchctl bootstrap gui/$UID ~/Library/LaunchAgents/ai.openclaw.gateway.plist

# 3. Manual recovery
~/Desktop/openclaw-recovery.sh
```

---

## References

- [launchd.info](https://www.launchd.info/) - LaunchDaemon/Agent guide
- [Docker Desktop macOS](https://docs.docker.com/desktop/install/mac-install/) - Default daemon location
- [Tailscale serve](https://tailscale.com/kb/1242/tailscale-serve/) - Proxy configuration

---

**Next steps:** Park as epic, test in VM before production deployment.
