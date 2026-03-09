# Matrix Integration Lessons: Isolation Before Complexity

**Date:** 2026-03-09  
**Context:** Epic v3.1.0 - Matrix DM/squad groups tasks  
**Critical Learning:** What went wrong with Matrix + how to isolate systems

---

## What Went Wrong

### Error 1: ECONNREFUSED 127.0.0.1:8008
**Cause:**
- Matrix channels tried to connect to local service (port 8008)
- Nothing listening on that port
- OpenClaw gateway not fully started
- Or port occupied by other service

**Result:** Matrix channels failed to initialize, AggregateErrors

---

### Error 2: Multiple node processes on port 18789
**Cause:**
- Killed processes without cleanup
- New gateway tried to start while old one still running
- Port conflicts (18789 occupied by Nginx/old nodes)

**Result:**
- Gateway "active" but can't accept connections
- EADDRINUSE errors
- Unpredictable behavior (sometimes works, sometimes doesn't)

---

### Error 3: Lost/Corrupted Sessions
**Cause:**
- Matrix created channels expecting `~/.openclaw/agents/.../sessions`
- Killed processes + cleaned files
- OpenClaw lost session state
- Matrix channels became "orphans" (trying to reconnect to non-existent sessions)

**Result:**
- AggregateErrors on reconnect attempts
- Channels stuck in broken state
- Had to clean ~/.openclaw entirely

---

## Root Cause Analysis

**We mixed experimental agents (Matrix) into non-clean, non-isolated OpenClaw.**

**Consequences:**
- Port conflicts (18789, 8008)
- State corruption (sessions, channels)
- Hard to debug (which process is the problem?)
- Hard to rollback (everything tangled)

---

## How to Isolate BEFORE Adding Complex Agents

### Rule 1: Use Separate State Directory

```bash
export OPENCLAW_STATE_DIR=~/.openclaw-test
```

**Benefits:**
- All agents, sessions, sockets go to separate directory
- Doesn't interfere with main OpenClaw (`~/.openclaw`)
- Can delete `~/.openclaw-test` without breaking main setup

---

### Rule 2: Use Alternative Ports

**Default gateway:** 18789

**For testing:**
```bash
openclaw configure
# Set gateway.port = 18888
```

**Benefits:**
- Test Matrix doesn't touch main gateway
- Can run both simultaneously (main + test)
- Easy to kill test without affecting main

---

### Rule 3: Loopback or Containerized

**Loopback (local only):**
```bash
openclaw configure
# Set gateway.bind = 127.0.0.1
```

**Benefits:**
- No external access during testing
- More secure
- Easier to control

**Container (ultimate isolation):**
```bash
docker run -it --rm \
  -v ~/.openclaw-test:/root/.openclaw \
  -p 18888:18789 \
  openclaw/openclaw:latest
```

**Benefits:**
- Complete isolation (filesystem, network, processes)
- Can destroy container without affecting host
- Reproducible environment

---

### Rule 4: Incremental Testing

**NEVER jump straight to complex agents.**

**Correct progression:**

1. **Clean slate**
   ```bash
   rm -rf ~/.openclaw-test
   openclaw doctor  # Verify clean state
   ```

2. **Gateway only**
   ```bash
   OPENCLAW_STATE_DIR=~/.openclaw-test openclaw gateway start
   openclaw doctor  # Should show healthy gateway
   ```

3. **Simple agent**
   ```bash
   # Add one test agent (e.g., echo-bot)
   # Verify it creates session correctly
   ```

4. **Complex agent (Matrix)**
   ```bash
   # Only AFTER steps 1-3 work
   # Add Matrix agent
   # If fails: isolated, easy to debug
   ```

---

### Rule 5: Avoid Multiple Gateways on Same Port

**If running multiple agents/gateways on same host:**

```bash
# Main OpenClaw
OPENCLAW_STATE_DIR=~/.openclaw gateway.port=18789

# Test Matrix
OPENCLAW_STATE_DIR=~/.openclaw-test gateway.port=18888

# Experimental
OPENCLAW_STATE_DIR=~/.openclaw-exp gateway.port=18887
```

**NEVER:**
- Same port for multiple gateways
- Same state directory for different tests
- Mix experimental with production

---

## Golden Rule

> **Never mix experimental agents with main gateway without isolating ports and state directories.**
> 
> **First: clean slate. Then: incremental testing.**

**This prevents:**
- AggregateErrors
- ECONNREFUSED
- Socket conflicts
- State corruption

**And allows:**
- Reset test without breaking main
- Debug in isolation
- Rollback easily

---

## Application to Epic v3.1.0

**Tasks pending:**
- [ ] Matrix DM per agent
- [ ] Matrix squad groups

**Before implementing:**

1. ✅ **Create test environment**
   ```bash
   export OPENCLAW_STATE_DIR=~/.openclaw-matrix-test
   openclaw configure  # Set gateway.port = 18888
   ```

2. ✅ **Test gateway in isolation**
   ```bash
   openclaw gateway start
   openclaw doctor
   ```

3. ✅ **Add ONE Matrix agent**
   - Test DM functionality
   - Verify session creation
   - Check channel state

4. ✅ **Add squad groups (if DM works)**
   - Incrementally add complexity
   - Each step validated before next

5. ✅ **Document what works**
   - Connection patterns
   - Port mappings
   - Session lifecycle

6. ✅ **Only then: merge to main**
   - When stable in test environment
   - With clear migration path
   - With rollback plan

---

## Debugging Checklist (When Things Break)

**Port conflicts:**
```bash
lsof -i :18789  # What's using the port?
lsof -i :8008   # Matrix service port
```

**Process cleanup:**
```bash
ps aux | grep openclaw  # All OpenClaw processes
killall -9 node  # Nuclear option (use carefully)
```

**State inspection:**
```bash
ls -la ~/.openclaw/agents/*/sessions/  # Session state
cat ~/.openclaw/gateway.log  # Gateway logs
```

**Fresh start:**
```bash
rm -rf ~/.openclaw-test
export OPENCLAW_STATE_DIR=~/.openclaw-test
openclaw doctor  # Verify clean
```

---

**Status:** Documented for future Matrix integration work (epic v3.1.0)  
**Critical:** READ THIS BEFORE implementing Matrix tasks 🔴
