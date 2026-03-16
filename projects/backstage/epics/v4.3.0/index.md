# Mattermost Agent Integration

**Status:** CRITICAL BLOCKER for Epic v4.1.0 (Epic Phases / Grooming Workflow)

---

## Problem

Agents cannot participate in Mattermost channels. DMs work perfectly, but:

- Agents don't receive `posted` events from public/private channels
- Even when @mentioned, gateway sees zero events
- Bots are members of channels (verified via API)
- WebSocket is connected, but events don't arrive

**Impact:** Entire grooming workflow (Epic v4.1.0) is blocked. Can't have multi-agent discussions without channel support.

---

## Current State (Diagnosed 2026-03-16)

### What Works ✅
- Bots connect to Mattermost (`connected as @design-engineer`)
- DMs function perfectly (instant responses)
- Bots can SEND messages to channels via API
- Multiple gateways run independently (design-engineer, business-analyst)
- Each gateway has separate bot token

### What Doesn't Work ❌
- Channel events (`posted`) don't reach gateway
- Logs show only DM deliveries, zero channel events
- Verified: bot IS member of channel (via API)
- Verified: messages exist in channel (via API)
- Gateway never processes mention (event doesn't arrive)

### Technical Diagnosis

**Tested:**
1. Bot permissions: `system_user` (correct)
2. Bot membership: Confirmed in `#onboarding` channel
3. API message send: Works (bot can post)
4. WebSocket connection: Active and healthy
5. Mention detection code: Correct logic (`rawText.includes('@design-engineer')`)

**Root cause:** WebSocket subscription or plugin filtering prevents channel events from reaching gateway.

**Evidence:**
```
# Bot sent message to channel (via API)
curl -H "Authorization: Bearer {token}" \
  -d '{"channel_id":"xyz","message":"test"}' \
  http://localhost:8065/api/v4/posts
→ Success (message posted)

# Gateway log after user @mention in channel
tail -f ~/.openclaw/logs/gateway-design-engineer.log
→ ZERO events (should see "posted" event)

# Gateway log after DM
→ Instant "delivered reply to user:xyz" (DMs work)
```

---

## Root Cause Hypothesis

### Option 1: Plugin filters channel events in oncall mode
- File: `@openclaw/mattermost/src/mattermost/monitor.ts`
- Logic: If `kind !== "direct" && shouldRequireMention && !wasMentioned` → discard event
- Problem: `wasMentioned` may be false because **event never arrives** (WebSocket issue, not detection issue)

### Option 2: Mattermost server doesn't send channel events to bots
- Bot account restrictions in Mattermost System Console
- Bots may need explicit "read channel" permission
- Or: bot needs to "activate" via browser login once

### Option 3: WebSocket not subscribed to channel events
- Plugin may only subscribe to DM events
- Need to verify WebSocket subscription includes channel types: `O` (public), `P` (private)

---

## Required for Grooming Workflow (Epic v4.1.0)

**Dependency chain:**
1. ✅ Multiple gateways (design-engineer, business-analyst, etc.)
2. ❌ **Bots in channels** ← YOU ARE HERE
3. Agent bidding system (agents volunteer for epics)
4. Bot creates private channel `#grooming-{PROJECT}-{EPIC_ID}`
5. Bot invites approved agents
6. Discussion happens in channel
7. Bot captures decisions via `/decision` commands
8. Bot updates epic.yaml

**Without #2, the entire grooming workflow is blocked.**

---

## Success Criteria

- [ ] Bot receives `posted` events from public channels
- [ ] Bot receives `posted` events from private channels
- [ ] Bot responds to `@mention` within 2 seconds
- [ ] Multiple gateways don't conflict (tested with 2+ bots in same channel)
- [ ] Setup documented for new agents (no manual Mattermost config)

---

## Stakeholders

**Primary:**
- Nicholas (product owner, facilitator of grooming)
- design-engineer (diagnostic work, plugin investigation)
- business-analyst (co-author, testing)

**Future:**
- All agents (will participate in grooming once this works)

---

## Risks

1. **Mattermost version incompatibility**
   - Self-hosted may have restrictions not in cloud version
   - Mitigation: Check Mattermost System Console bot settings

2. **OpenClaw plugin bug**
   - Plugin may not support channel events in current version
   - Mitigation: Escalate to OpenClaw maintainer OR patch locally

3. **Breaking change required**
   - Fix may require config changes for ALL agents
   - Mitigation: Document migration, test with 2 agents first

---

## Next Steps

1. **Test Mattermost permissions** (Nicholas)
   - System Console → Integrations → Bot Accounts
   - Verify bots enabled, not restricted
   - Check "AllowedUntrustedInternalConnections" if using Tailscale

2. **Investigate plugin code** (design-engineer)
   - Read `monitor.ts` event handling
   - Check WebSocket subscription setup
   - Identify where channel events are filtered

3. **Test browser login** (Nicholas)
   - Login as `@design-engineer` bot in Mattermost UI
   - Force "active session" registration
   - Test if events start flowing after manual login

4. **Escalate to OpenClaw maintainer** (if plugin bug confirmed)
   - File issue with diagnostic details
   - Provide minimal reproduction case
   - Request fix OR guidance for local patch

---

## References

- Epic v4.1.0: Epic Phases (grooming workflow depends on this)
- OpenClaw Mattermost plugin: `~/.openclaw/extensions/mattermost/`
- Mattermost API docs: https://api.mattermost.com/
- Agent config: `~/Backstage/documentation/agents.md`

---

**Created:** 2026-03-16  
**Branch:** `epic/v4.3.0`  
**Status:** intake → grooming (pending agent bids)
