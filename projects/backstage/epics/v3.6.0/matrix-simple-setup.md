# Matrix Simple Setup - Option A (1 Global Bot)

**Date:** 2026-03-13  
**Epic:** v3.6.0 - Agent Framework  
**Goal:** Configure Matrix plugin with 2 agent DM rooms (business-analyst + design-engineer)

**Strategy:** 1 bot global (`@openclaw_bot`) serving multiple agents via room mapping

---

## Pre-requisites

- [x] Gateway running (127.0.0.1:18789)
- [x] OpenClaw v2026.3.8+
- [x] Synapse running (http://localhost:8008)
- [x] Matrix plugin installed (`openclaw plugins install matrix`)
- [x] Dependency installed (`@vector-im/matrix-bot-sdk`)
- [x] Backup created (`~/.openclaw/openclaw.json.backup`)

---

## Step 1: Create Bot User in Synapse

**Bot credentials:**
- Username: `openclaw_bot`
- Full ID: `@openclaw_bot:studio.adal-rigel.ts.net`
- Password: `[SECURE_PASSWORD]` (store in .env or password manager)

**Command:**
```bash
# Find Synapse homeserver.yaml path
SYNAPSE_CONFIG=$(find ~/Apps/matrix -name "homeserver.yaml" 2>/dev/null | head -1)

# Register bot user
docker exec -it matrix-synapse register_new_matrix_user \
  -c /data/homeserver.yaml \
  -u openclaw_bot \
  -p '[SECURE_PASSWORD]' \
  --no-admin \
  http://localhost:8008
```

**Verification:**
```bash
# Test bot login via Element app or CLI
# Should succeed with username + password
```

**Checklist:**
- [ ] Bot user created
- [ ] Bot can login via Element
- [ ] Password stored securely

---

## Step 2: Create 2 DM Rooms

**Via Element app (recommended):**

### Room 1: Business Analyst
1. Open Element app
2. Create new Direct Message
3. Invite: `@openclaw_bot:studio.adal-rigel.ts.net`
4. Room name: "Business Analyst" (optional)
5. Copy room ID (Settings → Advanced → Internal room ID)
   - Format: `!xxxxxxxxxxxxx:studio.adal-rigel.ts.net`

### Room 2: Design Engineer
1. Create new Direct Message
2. Invite: `@openclaw_bot:studio.adal-rigel.ts.net`
3. Room name: "Design Engineer" (optional)
4. Copy room ID

**Room IDs (fill in):**
```
Room 1 (business-analyst): !_________________________:studio.adal-rigel.ts.net
Room 2 (design-engineer):  !_________________________:studio.adal-rigel.ts.net
```

**Checklist:**
- [ ] Room 1 created (you + bot)
- [ ] Room 2 created (you + bot)
- [ ] Both room IDs copied
- [ ] Bot has joined both rooms

---

## Step 3: Configure openclaw.json

**File:** `~/.openclaw/openclaw.json`

**Backup first:**
```bash
cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.before-matrix-$(date +%Y%m%d-%H%M)
```

**Add/edit `channels.matrix` section:**

```json
{
  "channels": {
    "matrix": {
      "enabled": true,
      "homeserver": "http://localhost:8008",
      "botUser": "@openclaw_bot:studio.adal-rigel.ts.net",
      "botPassword": "[SECURE_PASSWORD]",
      "agents": [
        {
          "id": "business-analyst",
          "roomId": "!room1id:studio.adal-rigel.ts.net"
        },
        {
          "id": "design-engineer",
          "roomId": "!room2id:studio.adal-rigel.ts.net"
        }
      ]
    }
  }
}
```

**Replace:**
- `[SECURE_PASSWORD]` → actual bot password
- `!room1id:...` → Room 1 ID (business-analyst)
- `!room2id:...` → Room 2 ID (design-engineer)

**Checklist:**
- [ ] Backup created
- [ ] `channels.matrix` section added
- [ ] Bot credentials correct
- [ ] Room IDs correct
- [ ] JSON valid (no trailing commas)

---

## Step 4: Validate JSON

**Command:**
```bash
jq . ~/.openclaw/openclaw.json > /dev/null && echo "✅ JSON valid" || echo "❌ JSON invalid"
```

**Expected:** `✅ JSON valid`

**If invalid:**
- Check for trailing commas
- Check quote marks
- Use `jq . ~/.openclaw/openclaw.json` to see error line

**Checklist:**
- [ ] JSON syntax valid
- [ ] No trailing commas
- [ ] All strings properly quoted

---

## Step 5: Restart Gateway (Controlled)

### Stop gateway:
```bash
# Check if running
ps aux | grep openclaw-gateway | grep -v grep

# Get PID
GATEWAY_PID=$(ps aux | grep openclaw-gateway | grep -v grep | awk '{print $2}')

# Stop gracefully
kill $GATEWAY_PID

# Wait 5 seconds
sleep 5

# Verify stopped
ps aux | grep openclaw-gateway | grep -v grep  # Should return nothing
```

### Start gateway:
```bash
openclaw gateway start
```

**Expected output:**
```
Gateway started at ws://127.0.0.1:18789
Control UI: http://127.0.0.1:18789/
```

**Checklist:**
- [ ] Old gateway stopped cleanly
- [ ] New gateway started
- [ ] No error messages in startup

---

## Step 6: Verify Plugin Loaded

**Command:**
```bash
openclaw status --deep
```

**Check:**
1. **Channels section:**
   ```
   Matrix | ON | OK | authenticated
   ```

2. **Agents section:**
   - `business-analyst` → active
   - `design-engineer` → active

3. **No errors in logs:**
   ```bash
   openclaw logs --follow
   ```

**Expected:**
- ✅ Matrix channel: `ON`
- ✅ Matrix state: `OK` or `authenticated`
- ✅ No ECONNREFUSED errors
- ✅ No restart loop messages

**Checklist:**
- [ ] Matrix plugin loaded
- [ ] Matrix channel authenticated
- [ ] Agents registered
- [ ] No error messages
- [ ] Gateway reachable

---

## Step 7: Test Messages

### Test Room 1 (Business Analyst):
1. Open Element app
2. Go to Business Analyst room
3. Send message: "Hello, are you online?"
4. **Expected:** Bot responds as business-analyst

### Test Room 2 (Design Engineer):
1. Go to Design Engineer room
2. Send message: "Hello, are you online?"
3. **Expected:** Bot responds as design-engineer

**Success criteria:**
- ✅ Both agents respond to messages
- ✅ Responses come from correct agent identity
- ✅ No delay >10 seconds
- ✅ No error messages in OpenClaw logs

**Checklist:**
- [ ] business-analyst responds in Room 1
- [ ] design-engineer responds in Room 2
- [ ] Response time acceptable
- [ ] No errors in logs

---

## Step 8: Document Success

**If all tests pass:**

```bash
cd ~/Backstage
git add projects/backstage/epics/v3.6.0/matrix-simple-setup.md
git commit -m "Matrix setup complete: 2 agent DM rooms working"
```

**Update epic.yaml:**
- Mark task "Matrix webhook (ISOLATED per agent)" → `checked: true`
- Mark task "Agents on active status: DM on Matrix" → `checked: true`

**Checklist:**
- [ ] Setup documented
- [ ] Epic tasks updated
- [ ] Git committed

---

## Rollback Plan (If Something Breaks)

### Symptoms of failure:
- ECONNREFUSED errors
- Agents in restart loop
- Gateway unresponsive
- Matrix channel state: ERROR

### Rollback steps:

```bash
# 1. Stop gateway
ps aux | grep openclaw-gateway | grep -v grep | awk '{print $2}' | xargs kill

# 2. Restore backup config
cp ~/.openclaw/openclaw.json.before-matrix-* ~/.openclaw/openclaw.json

# 3. Restart gateway
openclaw gateway start

# 4. Verify restored
openclaw status --deep
```

**Expected after rollback:**
- ✅ Gateway running
- ✅ Matrix plugin shows WARN (not configured) - this is OK
- ✅ No error loops
- ✅ Main session still works

**Checklist:**
- [ ] Backup config restored
- [ ] Gateway restarted cleanly
- [ ] System back to pre-Matrix state
- [ ] No persistent errors

---

## Troubleshooting

### Issue: Bot can't authenticate
**Symptom:** Matrix channel state: `AUTH_FAILED`

**Fix:**
1. Verify bot password in openclaw.json
2. Test bot login via Element app
3. Check Synapse logs: `docker logs matrix-synapse | tail -50`

---

### Issue: Agents don't respond
**Symptom:** Message sent, no response

**Debug:**
1. Check OpenClaw logs: `openclaw logs --follow`
2. Verify room IDs correct: `openclaw status --deep`
3. Check bot is in rooms (Element app)
4. Send message as different user (test bot can see messages)

---

### Issue: ECONNREFUSED loop
**Symptom:** Logs show repeated connection attempts

**Fix:**
1. **STOP** - do NOT restart repeatedly
2. Run rollback plan (restore backup config)
3. Verify Matrix Synapse running: `docker ps | grep synapse`
4. Check homeserver URL in config: `http://localhost:8008` (not https)

---

### Issue: Gateway won't start
**Symptom:** `openclaw gateway start` fails

**Fix:**
1. Check if port 18789 occupied: `/usr/sbin/lsof -i :18789`
2. Check config syntax: `jq . ~/.openclaw/openclaw.json`
3. Review gateway logs: `cat ~/.openclaw/gateway.log | tail -50`

---

## Notes

**Why 1 bot global works:**
- Single authentication point (less failure modes)
- OpenClaw routes messages to correct agent via room mapping
- Bot appears as different "persona" in each room based on agent identity
- Easier to debug (one set of credentials)

**Future evolution:**
- Can migrate to 1 bot per agent later (Opção B)
- Squad rooms (multiple agents per room) = future task
- Project rooms (epic announcements) = future task

**Security:**
- Bot password in openclaw.json = encrypted at rest by macOS keychain
- Rooms are private (only you + bot)
- Tailscale encrypted transport for remote access

---

**Status:** Ready for execution  
**Estimated time:** 15-20 minutes  
**Risk level:** Low (with rollback plan)

**Next:** Review this document → Execute steps → Update epic.yaml
