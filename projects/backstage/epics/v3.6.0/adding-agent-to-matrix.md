# Adding Agent to Matrix

**Last updated:** 2026-03-13  
**Epic:** v3.6.0 - Agent Framework

---

## Overview

This guide configures per-agent Matrix DM rooms, enabling direct communication with specific OpenClaw agents via Matrix clients (Element, mobile apps, etc.).

**Time required:** ~30 minutes  
**Prerequisites:** 
- Agent created (see `adding-openclaw-agent.md`)
- Matrix Synapse running
- OpenClaw gateway with Matrix plugin enabled

---

## Architecture

**Key insight:** Matrix routing requires **manual sessionKey construction** because `resolveMatrixBaseRouteSession` ignores `baseRoute.agentId` override.

**Flow:**
```
User message (Matrix)
  → Synapse (port 8008)
  → OpenClaw Matrix plugin
  → handler.ts (routing logic)
  → effectiveAgentId from roomConfig
  → Manual sessionKey: agent:AGENTID:matrix:channel:ROOMID
  → Agent workspace responds
```

---

## Step 1: Verify Synapse Running

**Check container:**
```bash
docker ps --filter "name=matrix-synapse"
```

**Expected:**
```
matrix-synapse   Up X minutes (healthy)
```

**Test client API (port 8008, NOT 8448):**
```bash
curl http://localhost:8008/_matrix/client/versions
```

**Expected:**
```json
{"versions":["r0.0.1","r0.1.0",...]}
```

### ⚠️ Port Gotcha: 8008 vs 8448

**8008** = HTTP client-server API (for bots, clients)  
**8448** = HTTPS federation API (for other Matrix servers)

**OpenClaw needs 8008!**

If getting connection errors:
```bash
# Check docker-compose.yml has:
ports:
  - "8008:8008"  # ← REQUIRED
  - "8448:8448"  # ← Optional (federation)
```

---

## Step 2: Create Matrix Room

### Option A: Via Element Web/Mobile

1. Open Element client
2. Create new room (private/public as needed)
3. Name: "Agent Name" (e.g., "Business Analyst")
4. Copy room ID from room settings
   - Format: `!RANDOMSTRING:studio.adal-rigel.ts.net`

### Option B: Via Matrix API

```bash
# Set credentials
ADMIN_TOKEN="YOUR_ADMIN_TOKEN"
ROOM_NAME="Business Analyst"

# Create room
curl -X POST "http://localhost:8008/_matrix/client/r0/createRoom" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"$ROOM_NAME\",
    \"preset\": \"private_chat\",
    \"visibility\": \"private\"
  }"
```

**Response:**
```json
{"room_id":"!EQyjalpjgFwRZGsril:studio.adal-rigel.ts.net"}
```

**Save this room_id!**

---

## Step 3: Invite Bot to Room

**Bot user:** `@openclaw_bot:studio.adal-rigel.ts.net`

### Via Element:
1. Open room
2. Room info → People → Invite
3. Enter: `@openclaw_bot:studio.adal-rigel.ts.net`

### Via API:
```bash
ROOM_ID="!EQyjalpjgFwRZGsril:studio.adal-rigel.ts.net"
BOT_USER="@openclaw_bot:studio.adal-rigel.ts.net"
ADMIN_TOKEN="YOUR_ADMIN_TOKEN"

curl -X POST "http://localhost:8008/_matrix/client/r0/rooms/${ROOM_ID}/invite" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"user_id\": \"$BOT_USER\"}"
```

**Bot auto-accepts invite when gateway syncs.**

---

## Step 4: Add Room to agent.yaml

**File:** `~/Backstage/agents/DOMAIN/AGENT/agent/agent.yaml`

**Add `matrix_room` field:**
```yaml
---
name: "Business Analyst"
description: "Product management, epics, roadmaps"
status: active
matrix_room: "!EQyjalpjgFwRZGsril:studio.adal-rigel.ts.net"  # ← ADD THIS
---
```

**Commit:**
```bash
cd ~/Backstage
git add agents/DOMAIN/AGENT/agent/agent.yaml
git commit -m "Add Matrix room to AGENT agent.yaml"
```

---

## Step 5: Configure OpenClaw Matrix Plugin

**File:** `~/.openclaw/openclaw.json`

**Add room to `channels.matrix.groups` with `agentId`:**

```json
{
  "channels": {
    "matrix": {
      "userId": "@openclaw_bot:studio.adal-rigel.ts.net",
      "password": "YOUR_BOT_PASSWORD",
      "homeserver": "http://localhost:8008",
      "encryption": true,
      "allowPrivateNetwork": true,
      "groups": {
        "!EQyjalpjgFwRZGsril:studio.adal-rigel.ts.net": {
          "agentId": "business-analyst"
        },
        "!iqgFkKJjjQONmFQfvb:studio.adal-rigel.ts.net": {
          "agentId": "design-engineer"
        }
      }
    }
  }
}
```

**Key fields:**
- `homeserver`: **`http://localhost:8008`** (NOT https, NOT 8448)
- `encryption`: `true` (if rooms use E2EE)
- `allowPrivateNetwork`: `true` (bypasses SSRF guard for localhost)
- `groups.ROOM_ID.agentId`: Agent name (matches `openclaw agents list`)

---

## Step 6: Verify Handler.ts Fix Applied

**Critical fix:** OpenClaw's `resolveMatrixBaseRouteSession` ignores `baseRoute.agentId`, so we must construct `sessionKey` manually.

**File:** `/opt/homebrew/lib/node_modules/openclaw/extensions/matrix/src/matrix/monitor/handler.ts`

**Check for this code (~line 510-540):**

```typescript
// Calculate effective agentId from room config BEFORE using baseRoute anywhere
const effectiveAgentId = (isRoom && roomConfig?.agentId?.trim()) || baseRouteRaw.agentId;

// Inject effectiveAgentId into baseRoute
const baseRoute = {
  ...baseRouteRaw,
  agentId: effectiveAgentId,
};

// Build sessionKey manually with effectiveAgentId (bypasses bug)
const normalizedRoomId = roomId.toLowerCase().replace(/[^a-z0-9]/g, '');
const baseSessionKey = `agent:${effectiveAgentId}:matrix:channel:${normalizedRoomId}`;
const sessionKey = threadRootId 
  ? `${baseSessionKey}:thread:${threadRootId}` 
  : baseSessionKey;

const route = {
  ...baseRoute,
  lastRoutePolicy: baseRouteSession.lastRoutePolicy,
  sessionKey, // ← Manually constructed
};
```

**If missing:** Apply patch from `epic-notes/v3.6.0/matrix-routing-fix.patch` (if created)

**Why necessary:** Without manual sessionKey, all rooms route to `agent:main` regardless of config.

---

## Step 7: Handle Tailscale Port Conflicts

**Problem:** Tailscale `serve` proxy holds ports even when services aren't running, causing `EADDRINUSE` errors.

**Before restarting Synapse or OpenClaw:**

```bash
# Check Tailscale proxies
tailscale serve status

# Turn off proxy for Synapse port
tailscale serve --https=8008 off

# Now safe to restart container
docker restart matrix-synapse

# Re-enable proxy after service starts
tailscale serve --bg --https=8008 http://localhost:8008
```

**This pattern applies to ALL services with Tailscale exposure.**

---

## Step 8: Restart OpenClaw Gateway

**⚠️ CRITICAL: Use recovery script, NOT `openclaw gateway restart`**

**Why:** Standard restart causes port lockup → suicide loop → gateway offline.

**Correct method:**
```bash
~/Desktop/openclaw-recovery.sh
```

**What it does:**
1. Kill all gateway processes
2. Free port 18789 (kill -9 phantoms)
3. Clear cache (`~/.openclaw/.cache`)
4. Bootout LaunchAgent (full reset)
5. Reinstall + bootstrap fresh

**See:** `~/Documents/personal/connections/restart.md`

---

## Step 9: Verify Matrix Plugin Status

```bash
openclaw status --deep | grep Matrix
```

**Expected:**
```
Matrix   │ ON      │ OK     │ configured
```

**If WARN/ERROR:**
- Check homeserver URL (http://localhost:8008)
- Verify Synapse responding (curl test from Step 1)
- Check logs: `openclaw logs --limit 50 | grep -i matrix`

---

## Step 10: Test Routing

### Send Test Message

**Via curl:**
```bash
ROOM_ID="!EQyjalpjgFwRZGsril:studio.adal-rigel.ts.net"
BOT_TOKEN="YOUR_BOT_TOKEN"
MESSAGE="Qual é o seu workspace? (caminho completo)"

curl -X POST \
  "http://localhost:8008/_matrix/client/r0/rooms/${ROOM_ID}/send/m.room.message" \
  -H "Authorization: Bearer ${BOT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{\"msgtype\": \"m.text\", \"body\": \"${MESSAGE}\"}"
```

**Or via Element:** Just type and send in the room.

### Check Logs (Verify Routing)

```bash
openclaw logs --limit 100 | grep "MATRIX-DEBUG"
```

**Expected:**
```
[MATRIX-DEBUG-1] roomId=!EQyj... effectiveAgentId=business-analyst
[MATRIX-DEBUG-2] route.agentId=business-analyst route.sessionKey=agent:business-analyst:matrix:channel:...
```

**✅ Success indicators:**
- `effectiveAgentId` = your agent (NOT "main")
- `route.sessionKey` starts with `agent:business-analyst:...`

**❌ Failure indicators:**
- `effectiveAgentId=main` → config not loaded or agentId field missing
- `route.sessionKey=agent:main:...` → handler.ts fix not applied

### Verify Session Created

```bash
openclaw status | grep "agent:business-analyst"
```

**Expected:**
```
agent:business-analyst:matrix:c…  | group | just now | claude-sonnet-4.5
```

### Check Agent Response

**Ask for workspace path:**
```
Qual é o seu workspace? (caminho completo)
```

**Expected response:**
```
~/Backstage/agents/meta/business-analyst
```

**If responds `~/.openclaw/workspace`:** Routing failed, agent is `main` not `business-analyst`.

---

## Step 11: Display Name Per-Room (BLOCKED - Deferred)

**Problem:** Bot shows as "openclaw_bot" in all rooms → hard to tell which agent is responding.

**Status:** ⚠️ **IMPLEMENTATION BLOCKED**

**Attempts made (2026-03-13):**
1. Tried `client.http.authedRequest()` → `.http` undefined (not public API)
2. Tried `client.sendStateEvent()` → no visible effect
3. Multiple OpenAI consultations → SDK behavior unclear

**Theory:** Per-room display name should work via `m.room.member` state event, but Matrix bot SDK method unclear.

**Fields added to openclaw.json (for future):**
```json
{
  "channels": {
    "matrix": {
      "groups": {
        "!EQyjalpjgFwRZGsril:studio.adal-rigel.ts.net": {
          "agentId": "business-analyst",
          "displayName": "Business Analyst",  // ← Not applied yet
          "avatarUrl": null
        }
      }
    }
  }
}
```

**Defer until:**
- Matrix bot SDK documentation clarifies per-room displayname
- Alternative approach identified (multiple bot users?)
- Or accept "openclaw_bot" for all agents (routing still works!)

**Workaround:** Room names already show agent identity ("Business Analyst" room, "Design Engineer" room).

---

## Troubleshooting
          "displayName": "Business Analyst",  // ← ADDED
          "avatarUrl": null                   // ← ADDED (optional)
        },
        "!iqgFkKJjjQONmFQfvb:studio.adal-rigel.ts.net": {
          "agentId": "design-engineer",
          "displayName": "Design Engineer",   // ← ADDED
          "avatarUrl": "mxc://studio.../avatar.png"  // ← ADDED (optional)
        }
      }
    }
  }
}
```

**Fields:**
- `displayName`: Name shown in Matrix client (e.g., "Business Analyst")
- `avatarUrl`: Matrix content URI (mxc://...) or `null`

**Fallback:** If `displayName` missing, uses `agentId`.

---

### How It Works

**matrixDisplayCache.ts** applies display name + avatar automatically:

**Flow:**
1. Agent about to send reply
2. `applyMatrixDisplayCached` called
3. Reads `displayName` + `avatarUrl` from `openclaw.json`
4. Checks cache (timestamp-based)
5. If changed or cache miss → PUT `m.room.member` state
6. Updates cache
7. Agent sends reply → appears as "Business Analyst" (not "openclaw_bot")

**Cache invalidation:**
- Based on `openclaw.json` mtime
- PUT only when config changes or cache miss
- Efficient (no redundant API calls)

---

### Verification

**After restart, send message:**
```
Hello! Who are you?
```

**Check Matrix client:**
- Sender should show "Business Analyst" (not "openclaw_bot")
- Avatar (if configured) should display

**Check logs:**
```bash
openclaw logs --limit 50 | grep MatrixDisplay
```

**Expected:**
```
[MatrixDisplay] Applied display/avatar for room !EQyj...
```

**Or (if cache hit):**
```
[MatrixDisplay] Cache hit for room !EQyj..., agent business-analyst
```

---

### Adding Avatars (Optional)

**Upload avatar to Matrix:**

```bash
# 1. Upload image file
curl -X POST "http://localhost:8008/_matrix/media/r0/upload" \
  -H "Authorization: Bearer $BOT_TOKEN" \
  -H "Content-Type: image/png" \
  --data-binary @avatar.png

# Response:
{"content_uri":"mxc://studio.adal-rigel.ts.net/MEDIA_ID"}

# 2. Add to openclaw.json
"avatarUrl": "mxc://studio.adal-rigel.ts.net/MEDIA_ID"

# 3. Restart gateway
```

**Recommended:** Start with `null`, add avatars later when agents fully differentiated.

---

## Troubleshooting

### Bot doesn't respond

**1. Check bot logged in:**
```bash
openclaw logs | grep "matrix: logged in"
```

**Expected:**
```
matrix: logged in as @openclaw_bot:studio.adal-rigel.ts.net
```

**2. Check bot joined room:**
```bash
# Via Matrix API
curl "http://localhost:8008/_matrix/client/r0/rooms/${ROOM_ID}/joined_members" \
  -H "Authorization: Bearer $BOT_TOKEN" | jq '.joined'
```

**Should include:** `@openclaw_bot:studio.adal-rigel.ts.net`

**3. Check message received:**
```bash
docker logs matrix-synapse --tail 50 | grep "m.room.message"
```

### Routing to wrong agent (main instead of business-analyst)

**1. Verify config loaded:**
```bash
cat ~/.openclaw/openclaw.json | jq '.channels.matrix.groups'
```

**Should show:**
```json
{
  "!EQyjalpjgFwRZGsril:studio.adal-rigel.ts.net": {
    "agentId": "business-analyst"
  }
}
```

**2. Verify handler.ts fix applied:**
```bash
grep "effectiveAgentId" /opt/homebrew/lib/node_modules/openclaw/extensions/matrix/src/matrix/monitor/handler.ts
```

**Should find:** `const effectiveAgentId = (isRoom && roomConfig?.agentId...`

**3. Cache may be stale:**
```bash
rm -rf ~/.openclaw/.cache
~/Desktop/openclaw-recovery.sh
```

### Port 8008 connection refused

**Check Synapse container:**
```bash
docker ps --filter "name=matrix-synapse"
```

**Check port mapping:**
```bash
docker port matrix-synapse
```

**Should show:**
```
8008/tcp -> 0.0.0.0:8008
8448/tcp -> 0.0.0.0:8448
```

**If 8008 missing:**
```bash
cd ~/Apps/matrix
docker-compose down
docker-compose up -d
```

**Check Tailscale not blocking:**
```bash
tailscale serve status | grep 8008
# If found:
tailscale serve --https=8008 off
```

### EADDRINUSE errors

**Tailscale proxy blocking port.** See Step 7 (Tailscale conflicts).

---

## Testing Checklist

Before marking Matrix setup complete:

- [x] Synapse responds on http://localhost:8008
- [x] Matrix room created
- [x] Bot invited and joined room
- [x] agent.yaml has matrix_room field
- [x] openclaw.json has room in groups with agentId
- [x] handler.ts fix applied (manual sessionKey)
- [x] Gateway restarted with recovery script
- [x] openclaw status shows Matrix OK
- [x] Test message sent
- [x] Logs show effectiveAgentId = correct agent
- [x] Session key starts with agent:AGENTNAME:matrix:...
- [x] Bot responds in room
- [x] Bot reports correct workspace path
- [ ] Display name per-room (BLOCKED - deferred to future)

---

## Next Steps

1. **Test Design Engineer:** Repeat for second agent (verify pattern works)
2. **Document iPad/iPhone setup:** Relogging after sync issues
3. **Squad rooms:** Multi-agent rooms with @all support (future)
4. **Webhooks:** Isolated per-agent webhooks (future)

---

## Related Docs

- `adding-openclaw-agent.md` - Create agent first
- `matrix-message-flow.md` - Message routing flow diagram
- `~/Documents/personal/connections/restart.md` - OpenClaw recovery protocol
- `~/Documents/personal/connections/launchagent-tailscale.md` - Tailscale port conflicts

---

**Created:** 2026-03-13  
**Based on:** 8+ hours debugging Business Analyst + Design Engineer Matrix routing  
**Key breakthrough:** Manual sessionKey construction bypasses `resolveMatrixBaseRouteSession` bug
