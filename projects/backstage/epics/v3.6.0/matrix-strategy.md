# Matrix Integration Strategy

**Epic:** v3.6.0 - Agent Framework  
**Date:** 2026-03-13  
**Context:** Planning Matrix webhook integration for active agents

---

## Prior Learning (2026-03-09)

### What Went Wrong

**Reference:** `~/Backstage/projects/backstage/epics/v3.1.0/matrix-isolation-lessons.md`

1. **ECONNREFUSED 127.0.0.1:8008**
   - Matrix channels tried port 8008, nothing listening
   - Gateway not fully started or port occupied

2. **Multiple node processes on port 18789**
   - Killed processes without cleanup
   - New gateways tried to start with occupied port
   - EADDRINUSE errors, unpredictable behavior

3. **Lost/Corrupted Sessions**
   - Matrix created channels expecting `~/.openclaw/agents/.../sessions`
   - Cleaned files, OpenClaw lost session state
   - Channels became "orphans" trying to reconnect

**Root Cause:** Mixed experimental agents (Matrix) into main OpenClaw without isolation (ports, state dir).

**Golden Rule:**
> Never mix experimental agents with main gateway without isolating ports and state directories.
> 
> First: clean slate. Then: incremental testing.

---

## Current Problem (2026-03-13)

### CORS / allowedOrigins Restriction

**Symptom:**
- Gateway active and running (port 18789) ✅
- Error: "origin not allowed" ❌

**Cause:**
- Control UI blocks connections from IPs not in `allowedOrigins`
- iPad/Tailscale requests rejected (security restriction, not service failure)

**Solution:**
- Add Tailscale IP + local devices to `allowedOrigins`
- No gateway restart needed (just config fix)

---

## Incremental Integration Plan

### Phase 0: Preparation (Before Touching Matrix)

**1. Backup current config:**
```bash
cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.before-matrix
```

**2. Verify main gateway health:**
```bash
openclaw status
openclaw doctor
```

**Output expected:** Gateway healthy, no errors.

---

### Phase 1: Isolation Setup

**1. Separate state directory:**
```bash
export OPENCLAW_STATE_DIR=~/.openclaw-matrix-test
```

**Why:** All Matrix test state (agents, sessions, sockets) goes to separate directory, doesn't interfere with main OpenClaw.

**2. Alternative port:**
```bash
openclaw configure
# Set gateway.port = 18888 (NOT 18789)
```

**Why:** Test Matrix without touching main gateway port. Can run both simultaneously.

**3. CORS configuration for testing:**
```bash
# Option A: Relaxed (local testing)
# allowedOrigins = ["*"]

# Option B: Specific (Tailscale + local)
# allowedOrigins = [
#   "http://localhost:18888",
#   "https://studio.adal-rigel.ts.net:18888"
# ]
```

**Why:** Allow iPad/Tailscale connections during testing without opening production gateway.

---

### Phase 2: Test Gateway Clean

**1. Start isolated gateway:**
```bash
OPENCLAW_STATE_DIR=~/.openclaw-matrix-test openclaw gateway start
```

**2. Verify running:**
```bash
openclaw doctor
lsof -i :18888  # Should show gateway process
```

**3. Test Control UI:**
- Open browser: `http://localhost:18888`
- Verify CORS allows connection
- Check `openclaw agents list` works

**Success criteria:**
- Gateway responds
- No CORS errors
- No port conflicts

---

### Phase 3: Add ONE Matrix Agent (Test)

**1. Pick test agent:**
- `business-analyst` OR `design-engineer`
- Both currently registered, status: active

**2. Create Matrix DM room:**
- Use Element/Matrix client
- Create new Direct Message room
- Copy room ID (format: `!xxxxx:matrix.org`)

**3. Configure webhook binding:**
```bash
openclaw agents bind --agent business-analyst --bind matrix:ROOM_ID
```

**4. Test message flow:**
- Send message in Matrix DM
- Verify agent receives message
- Verify agent responds

**Debug if fails:**
```bash
# Check sessions
ls ~/.openclaw-matrix-test/agents/business-analyst/sessions/

# Check logs
cat ~/.openclaw-matrix-test/gateway.log | grep matrix

# Check bindings
openclaw agents bindings --agent business-analyst
```

---

### Phase 4: Verify + Document

**1. Check session state:**
```bash
ls -la ~/.openclaw-matrix-test/agents/*/sessions/
```

**Expected:** Session files created, no errors.

**2. Check gateway logs:**
```bash
tail -50 ~/.openclaw-matrix-test/gateway.log
```

**Expected:** No ECONNREFUSED, no EADDRINUSE, clean message flow.

**3. Document what worked:**
- Connection pattern (webhook URL format)
- Port mapping (Matrix server → gateway)
- Session lifecycle (create → message → respond)

**Create file:** `~/Backstage/projects/backstage/epics/v3.6.0/matrix-test-results.md`

**Contents:**
- Test date
- Agent tested
- Matrix room ID
- Webhook binding command
- Message flow (screenshots/logs)
- Issues encountered (if any)
- Resolution steps

---

### Phase 5: Migrate to Main Gateway (ONLY IF Phase 3-4 Succeed)

**Pre-migration checklist:**
- [ ] Test gateway stable (no errors in Phase 3-4)
- [ ] Matrix message flow works consistently
- [ ] Session state correct (no orphans)
- [ ] Logs clean (no ECONNREFUSED, EADDRINUSE)
- [ ] Documentation complete (what works, how to debug)

**Migration steps:**

**1. Stop test gateway:**
```bash
# Find process
ps aux | grep openclaw | grep 18888
kill <PID>

# Verify stopped
lsof -i :18888  # Should return nothing
```

**2. Apply CORS fix to MAIN:**
```bash
openclaw configure
# Edit allowedOrigins:
# [
#   "http://localhost:18789",
#   "https://studio.adal-rigel.ts.net:18789",
#   "<iPad Tailscale IP if needed>"
# ]
```

**3. Wire Matrix in MAIN:**
```bash
# Same binding commands from Phase 3, but using main gateway
openclaw agents bind --agent business-analyst --bind matrix:ROOM_ID
```

**4. Restart MAIN gateway (IF needed):**
```bash
# Check if restart required
openclaw status  # Look for "config changed, restart needed"

# If yes:
openclaw gateway restart

# Verify:
openclaw doctor
lsof -i :18789  # Should show gateway
```

**5. Test Matrix → Main:**
- Send message in Matrix DM
- Verify agent responds via main gateway
- Check logs: `tail -f ~/.openclaw/gateway.log`

---

## Rollback Plan

### If Test Fails (Phase 3-4)

**Cleanup test environment:**
```bash
# Stop test gateway
ps aux | grep openclaw | grep 18888
kill <PID>

# Remove test state
rm -rf ~/.openclaw-matrix-test

# Verify main gateway unaffected
openclaw status
```

**Main gateway:** Untouched, no impact.

---

### If Main Migration Fails (Phase 5)

**Restore backup:**
```bash
# Stop gateway
openclaw gateway stop

# Restore config
cp ~/.openclaw/openclaw.json.before-matrix ~/.openclaw/openclaw.json

# Restart
openclaw gateway start

# Verify
openclaw doctor
```

**Remove Matrix bindings:**
```bash
openclaw agents unbind --agent business-analyst --all
```

---

## Open Questions (Answer BEFORE Executing)

### 1. CORS Configuration

**Where:** `~/.openclaw/openclaw.json` or separate config file?

**Field name:** `allowedOrigins`? `gateway.allowedOrigins`? `controlUI.allowedOrigins`?

**Action:** Find exact config path and field name.

---

### 2. Matrix Server

**Status:** Already running? Need to start?

**URL:** What's the Matrix homeserver URL?

**Access:** Element client installed? Login credentials?

**Action:** Verify Matrix server accessible before testing.

---

### 3. Test Agent Priority

**Option A:** `business-analyst`
- Already active
- Workspace: `~/Backstage/agents/meta/business-analyst`

**Option B:** `design-engineer`
- Already active
- Workspace: `~/Backstage/agents/design/design-engineer`

**Decision:** Which to test first?

---

### 4. Testing Approach

**Option A:** Isolated test first (recommended)
- Port 18888, separate state dir
- No risk to main gateway
- Easy rollback

**Option B:** Direct to main (risky)
- Port 18789, main config
- Faster if works, harder to debug if fails

**Decision:** Isolated first or direct?

---

## Success Criteria

**Phase 3-4 (Test):**
- [ ] Gateway starts on port 18888
- [ ] No ECONNREFUSED errors
- [ ] No EADDRINUSE errors
- [ ] Matrix DM room created
- [ ] Webhook binding configured
- [ ] Agent receives message
- [ ] Agent responds correctly
- [ ] Session state clean (no orphans)
- [ ] Logs clean (no errors)

**Phase 5 (Main):**
- [ ] Main gateway restarts cleanly
- [ ] CORS allows Tailscale/iPad
- [ ] Matrix binding active
- [ ] Message flow works via main gateway
- [ ] No conflicts with existing agents
- [ ] Rollback plan tested (backup restore works)

---

## Next Steps

**Before executing:**
1. Answer open questions (CORS config, Matrix server, test agent, approach)
2. Read all epic v3.6.0 documents (index.md, agent-creation.md, agents-config.md)
3. Review Matrix isolation lessons (v3.1.0/matrix-isolation-lessons.md)
4. Verify main gateway health (`openclaw doctor`)
5. Backup current config

**Then proceed with Phase 0 → Phase 1 → Phase 2 → Phase 3 → Phase 4.**

**Only after Phase 4 success:** Proceed to Phase 5 (main migration).

---

**Status:** Planning complete, awaiting execution approval.  
**Created:** 2026-03-13 (Pomodoro session - Epic v3.1.0 - Agent Placeholders)
