# Agent to Mattermost Checklist

**Purpose:** Step-by-step guide to add a new AI agent to Mattermost with isolated workspace.

**Architecture:** Multi-gateway (one OpenClaw gateway per agent, each with its own port and workspace).

---

## Prerequisites

- [ ] OpenClaw installed
- [ ] Mattermost running locally
- [ ] Admin access to Mattermost
- [ ] Port range allocated (see `ports.md`)

---

## Configuration Decisions

### **1. Multi-Gateway Architecture**

Each agent runs its own OpenClaw gateway:
- **Separate port** (18790, 18791, 18792...)
- **Separate workspace** (`~/Backstage/agents/DOMAIN/AGENT_NAME`)
- **Separate memory** (isolated SOUL.md, AGENTS.md, memory/)
- **Shared credentials** (via symlink to avoid duplication)

**Why:** True agent isolation—different expertise, behavior, and context.

### **2. Shared Credentials via Symlink**

All agent gateways symlink to the same `auth-profiles.json`:

```bash
ln -s ~/.openclaw/agents/main/agent/auth-profiles.json \
  ~/.openclaw/state-AGENT_NAME/agents/main/agent/auth-profiles.json
```

**Why:** Change API key once, all agents update automatically.

### **3. Open DM Policy**

`dmPolicy: "open"` (no pairing required)

**Why:** Mattermost is already protected by Tailscale + local-only access. Simplifies new agent setup.

**When to change:** If exposing Mattermost publicly, switch to `"allowlist"` or `"pairing"`.

---

## Steps

### 0. Allocate Port

**Check `ports.md` for next available port in range 18790-18840.**

**Example:**
- business-analyst: 18790
- design-engineer: 18791
- uxr-researcher: 18792 (next)

**Update `ports.md` after allocation.**

---

### 1. Create Bot Account in Mattermost

**Via Mattermost UI:**
1. System Console → Integrations → Bot Accounts
2. Add Bot Account
3. Username: `agent-name` (e.g., `uxr-researcher`)
4. Display Name: "Agent Display Name"
5. Description: "Agent purpose"
6. Save

**Save bot token to `.env`:**

```bash
echo "MATTERMOST_BOT_AGENT_NAME=TOKEN_HERE" >> ~/Documents/personal/.env
```

---

### 2. Create Dedicated Channel

**Via Mattermost UI:**
1. Create Channel
2. Name: `agent-name` (e.g., `uxr-researcher`)
3. Display Name: "Agent Name"
4. Type: Public or Private
5. Add bot to channel (Members → Invite)

**Save channel ID:**

```bash
# Get from URL: /team-name/channels/CHANNEL_ID
echo "MATTERMOST_CHANNEL_AGENT_NAME=CHANNEL_ID" >> ~/Documents/personal/.env
```

---

### 3. Create Agent Workspace

```bash
mkdir -p ~/Backstage/agents/DOMAIN/AGENT_NAME
cd ~/Backstage/agents/DOMAIN/AGENT_NAME

# Create bootstrap files
cat > SOUL.md << 'EOF'
# SOUL.md - Who You Are

**Agent:** AGENT_NAME
**Domain:** DOMAIN
**Expertise:** [what this agent knows]

## Personality

[How this agent behaves, speaks, thinks]

## Boundaries

[What this agent does NOT do]
EOF

cat > USER.md << 'EOF'
# USER.md - About Your Human

- **Name:** Nicholas
- **Pronouns:** they/them
- **Timezone:** America/New_York
EOF

mkdir memory
touch memory/$(date +%Y-%m-%d).md
```

---

### 4. Create OpenClaw Config

**File:** `~/.openclaw/openclaw-AGENT_NAME.json`

```json
{
  "meta": {
    "lastTouchedVersion": "2026.3.13"
  },
  "auth": {
    "profiles": {
      "github-copilot:github": {
        "provider": "github-copilot",
        "mode": "token"
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "github-copilot/claude-sonnet-4.5"
      },
      "workspace": "/Users/USER/Backstage/agents/DOMAIN/AGENT_NAME",
      "compaction": {
        "mode": "safeguard"
      }
    },
    "list": [
      {
        "id": "main",
        "workspace": "/Users/USER/Backstage/agents/DOMAIN/AGENT_NAME"
      }
    ]
  },
  "tools": {
    "profile": "coding"
  },
  "commands": {
    "native": "auto",
    "bash": true,
    "restart": true
  },
  "session": {
    "dmScope": "per-channel-peer"
  },
  "channels": {
    "mattermost": {
      "enabled": true,
      "baseUrl": "http://localhost:8065",
      "botToken": "$MATTERMOST_BOT_AGENT_NAME",
      "chatmode": "oncall",
      "dmPolicy": "open"
    }
  },
  "gateway": {
    "port": 18XXX,
    "mode": "local",
    "bind": "loopback",
    "auth": {
      "mode": "token",
      "token": "GENERATE_RANDOM_TOKEN",
      "allowTailscale": true
    },
    "tailscale": {
      "mode": "serve",
      "resetOnExit": false
    }
  },
  "plugins": {
    "allow": ["mattermost"],
    "entries": {
      "mattermost": {
        "enabled": true
      }
    }
  }
}
```

**Replace:**
- `USER`: Your username
- `DOMAIN`: meta, design, research, legal, marketing
- `AGENT_NAME`: Specific agent (business-analyst, uxr-researcher, etc.)
- `18XXX`: Port from step 0
- `$MATTERMOST_BOT_AGENT_NAME`: Reference to `.env` variable
- `GENERATE_RANDOM_TOKEN`: `openssl rand -hex 24`

---

### 5. Create LaunchAgent

**File:** `~/Library/LaunchAgents/ai.openclaw.gateway.AGENT_NAME.plist`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>ai.openclaw.gateway.AGENT_NAME</string>
    <key>ProgramArguments</key>
    <array>
        <string>/opt/homebrew/opt/node@22/bin/node</string>
        <string>/opt/homebrew/lib/node_modules/openclaw/dist/index.js</string>
        <string>gateway</string>
        <string>--port</string>
        <string>18XXX</string>
    </array>
    <key>EnvironmentVariables</key>
    <dict>
        <key>OPENCLAW_CONFIG_PATH</key>
        <string>/Users/USER/.openclaw/openclaw-AGENT_NAME.json</string>
        <key>OPENCLAW_STATE_DIR</key>
        <string>/Users/USER/.openclaw/state-AGENT_NAME</string>
        <key>OPENCLAW_GATEWAY_PORT</key>
        <string>18XXX</string>
        <key>PATH</key>
        <string>/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin</string>
    </dict>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/Users/USER/.openclaw/logs/gateway-AGENT_NAME.log</string>
    <key>StandardErrorPath</key>
    <string>/Users/USER/.openclaw/logs/gateway-AGENT_NAME.log</string>
    <key>WorkingDirectory</key>
    <string>/Users/USER</string>
</dict>
</plist>
```

**Replace:**
- `USER`: Your username
- `AGENT_NAME`: Specific agent
- `18XXX`: Port from step 0

---

### 6. Symlink Shared Credentials

**Avoid credential duplication:**

```bash
mkdir -p ~/.openclaw/state-AGENT_NAME/agents/main/agent

ln -s ~/.openclaw/agents/main/agent/auth-profiles.json \
  ~/.openclaw/state-AGENT_NAME/agents/main/agent/auth-profiles.json
```

**Result:** All agents share same API keys. Update once, all agents see changes.

---

### 7. Load Gateway

```bash
launchctl load ~/Library/LaunchAgents/ai.openclaw.gateway.AGENT_NAME.plist
```

**Wait 10-15s for initialization.**

**Verify:**
```bash
ps aux | grep "openclaw.*AGENT_NAME"
lsof -ti :18XXX
tail -20 ~/.openclaw/logs/gateway-AGENT_NAME.log
```

**Expected log:** `[mattermost] connected as @agent-name`

---

### 8. Test Agent Response

**In Mattermost, in dedicated channel:**

```
what is your workspace path?
```

**Expected response:**
```
/Users/USER/Backstage/agents/DOMAIN/AGENT_NAME
```

**Test behavior:**
```
who are you? what's your role?
```

**Agent should respond with personality from SOUL.md.**

---

## Verification Checklist

- [ ] Port allocated in `ports.md`
- [ ] Bot created in Mattermost
- [ ] Bot token saved to `.env`
- [ ] Dedicated channel created
- [ ] Channel ID saved to `.env`
- [ ] Agent workspace created (SOUL.md, USER.md, memory/)
- [ ] Config file created (`openclaw-AGENT_NAME.json`)
- [ ] LaunchAgent created
- [ ] Credentials symlinked
- [ ] Gateway loaded and running
- [ ] Agent responds in Mattermost
- [ ] Workspace path is correct
- [ ] Agent personality matches SOUL.md

---

## Restart All Gateways

**Script:** `~/Desktop/restart-openclaw-gateways.sh`

**Usage:**
```bash
~/Desktop/restart-openclaw-gateways.sh
```

**Auto-discovers all OpenClaw gateways and restarts them.**

**No manual editing needed when adding new agents!**

---

## Troubleshooting

### Agent doesn't respond

**Check logs:**
```bash
tail -50 ~/.openclaw/logs/gateway-AGENT_NAME.log
```

**Common issues:**
- Mattermost connection failed (check `botToken`)
- Port conflict (check `lsof -ti :18XXX`)
- Credentials missing (check symlink exists)

### "No API key found for provider"

**Fix:**
```bash
# Verify symlink exists
ls -la ~/.openclaw/state-AGENT_NAME/agents/main/agent/auth-profiles.json

# If missing, recreate
mkdir -p ~/.openclaw/state-AGENT_NAME/agents/main/agent
ln -s ~/.openclaw/agents/main/agent/auth-profiles.json \
  ~/.openclaw/state-AGENT_NAME/agents/main/agent/auth-profiles.json

# Restart gateway
launchctl kickstart -k gui/$UID/ai.openclaw.gateway.AGENT_NAME
```

### Port already in use

**Check what's using port:**
```bash
lsof -ti :18XXX
ps -p PID
```

**If old gateway:** Kill it, update `ports.md` to avoid conflicts.

---

## Architecture Notes

### Why Multi-Gateway?

**Each agent needs:**
- **Isolated memory** (different SOUL.md, memory logs)
- **Isolated behavior** (different expertise, tone, boundaries)
- **Isolated context** (workspace, files, git history)

**Single gateway with multi-account = same memory = not truly different agents.**

### Why Symlink Credentials?

**Without symlink:**
- Change API key → update N config files
- Easy to miss one, agent breaks silently

**With symlink:**
- Change once (`~/.openclaw/agents/main/agent/auth-profiles.json`)
- All agents update automatically
- Less maintenance, fewer errors

### Why Open DM Policy?

**`dmPolicy: "open"` = no pairing required.**

**Safe because:**
- Mattermost local-only (localhost:8065)
- Protected by Tailscale (private network)
- Only you have access

**When to change:**
- Exposing Mattermost publicly
- Adding team members (use `"allowlist"`)
- Security audit requires it

---

## Example: Adding UXR Researcher

```bash
# 0. Choose port
echo "18792 → uxr-researcher" >> ~/Backstage/projects/studio/ports.md

# 1. Create bot in Mattermost UI
# Username: uxr-researcher
# Display Name: "UX Researcher"
# Save token → $MATTERMOST_BOT_UXR

# 2. Create channel #uxr-researcher
# Add bot to channel
# Save channel ID → $MATTERMOST_CHANNEL_UXR

# 3. Create workspace
mkdir -p ~/Backstage/agents/research/uxr-researcher
cd ~/Backstage/agents/research/uxr-researcher
# Create SOUL.md, USER.md, memory/

# 4. Create config
cp ~/.openclaw/openclaw-business-analyst.json ~/.openclaw/openclaw-uxr-researcher.json
# Edit: port → 18792, workspace → .../uxr-researcher, botToken → $MATTERMOST_BOT_UXR

# 5. Create LaunchAgent
cp ~/Library/LaunchAgents/ai.openclaw.gateway.business-analyst.plist \
   ~/Library/LaunchAgents/ai.openclaw.gateway.uxr-researcher.plist
# Edit: Label, port 18792, AGENT_NAME → uxr-researcher

# 6. Symlink credentials
mkdir -p ~/.openclaw/state-uxr-researcher/agents/main/agent
ln -s ~/.openclaw/agents/main/agent/auth-profiles.json \
  ~/.openclaw/state-uxr-researcher/agents/main/agent/auth-profiles.json

# 7. Load gateway
launchctl load ~/Library/LaunchAgents/ai.openclaw.gateway.uxr-researcher.plist

# 8. Test in #uxr-researcher channel
# "what is your workspace path?"
# Expected: /Users/nonlinear/Backstage/agents/research/uxr-researcher
```

---

**Version:** 2.0 (multi-gateway architecture)  
**Last updated:** 2026-03-15  
**Related:** `ports.md`, `architecture-options.md`
