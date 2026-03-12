# Agent Creation Workflow

## 1. Duplicate from Template

```bash
# Choose squad and agent name
SQUAD="unassisted"
AGENT="uxr"

# Copy squad if doesn't exist
if [ ! -d ~/backstage/agents/$SQUAD ]; then
  cp -r ~/backstage/agents/template ~/backstage/agents/$SQUAD
fi

# Copy agent template
cp -r ~/backstage/agents/template/template ~/backstage/agents/$SQUAD/$AGENT
```

## 2. Personalize YAML

**Edit:** `~/backstage/agents/$SQUAD/$AGENT/agent.yaml`

```yaml
name: UX Researcher
status: backlog  # Change to active when ready

tools: [github, web_search, exec]
skills: [design-discrepancy, librarian]
mcps: [figma]
library: [design/theory, AI/policy]
values: [source-grounding, honesty]
```

## 3. Personalize Soul

**Edit:** `~/backstage/agents/$SQUAD/$AGENT/soul.md`

```markdown
# UX Researcher

**Personality:** Detail-oriented, evidence-based, focused on design-implementation gaps.

**Tone:** Professional but approachable. Uses citations.

**Use `.values.md` as prompt.**
```

## 4. Wire Through OpenClaw

**Edit:** `~/.openclaw/openclaw.json`

```json5
{
  agents: {
    list: [
      {
        id: "uxr",
        workspace: "~/backstage/agents/unassisted/uxr",
        agentDir: "~/.openclaw/agents/uxr/agent"
      }
    ]
  }
}
```

**What each path means:**
- **workspace:** Agent's working folder (SOUL.md, skills/, memory/)
- **agentDir:** OpenClaw's state folder (auth, sessions metadata)

## 5. Create Required Workspace Files

OpenClaw expects these files in workspace:

```bash
cd ~/backstage/agents/$SQUAD/$AGENT

# Copy soul.md as SOUL.md (OpenClaw convention)
cp soul.md SOUL.md

# Create minimal required files
touch AGENTS.md USER.md IDENTITY.md TOOLS.md
```

**Or:** Symlink to shared files if applicable.

## 6. Status: backlog → active

When agent is ready:

**Edit:** `~/backstage/agents/$SQUAD/$AGENT/agent.yaml`

```yaml
status: active
```

**Then follow ENFORCEMENT.md checklist:**
1. Create Matrix DM room
2. Configure webhook: `/matrix/$AGENT`
3. Install affordances (skills, MCPs)
4. Test librarian topics
5. Verify values composite
6. Test spawn

## 7. Test Agent

```bash
# Restart OpenClaw to load new agent
openclaw gateway restart

# List agents
openclaw agents list

# Test spawn (if sessions_spawn available)
openclaw agent spawn uxr --task "Test task"
```

## Path Reference

**Backstage (source of truth):**
```
~/backstage/agents/SQUAD/AGENT/
├── agent.yaml       # Affordances, values
├── soul.md          # Personality (lowercase, Backstage convention)
└── ENFORCEMENT.md   # Validation checklist
```

**OpenClaw workspace (mirror):**
```
~/backstage/agents/SQUAD/AGENT/
├── SOUL.md          # Uppercase (OpenClaw convention)
├── AGENTS.md        # Operating instructions
├── USER.md          # User profile
├── IDENTITY.md      # Agent name/emoji
├── TOOLS.md         # Tool notes
└── skills/          # Agent-specific skills
```

**OpenClaw state:**
```
~/.openclaw/agents/AGENT/
├── agent/           # agentDir (auth, config)
└── sessions/        # Session transcripts
```

## Hot Reload Behavior (CRITICAL)

### Can I Wire Agents Before Differentiating Them?

**✅ YES!** You can wire all 21 agents BEFORE populating affordances.

**Gradual differentiation workflow:**

**Phase 1: Wire agents (identical structure)**
```json5
{
  "agents": {
    "list": [
      { "id": "uxr", "workspace": "~/backstage/agents/design/uxr", ... },
      { "id": "design", "workspace": "~/backstage/agents/design/design", ... },
      // ... 21 agents (all identical initially)
    ]
  }
}
```

**Gateway behavior:** Auto-restart when agents list changes (hybrid mode)

**Phase 2: Differentiate gradually (affordances)**
1. Populate agent.yaml (skills, mcps, library, values)
2. Personalize SOUL.md
3. Skills watcher detects changes
4. **Next agent turn** = refreshed skills (NO restart needed!)

**Phase 3: Matrix webhooks (when activating)**
1. Create Matrix DM room
2. Add webhook binding: `/matrix/AGENT`
3. Gateway hot-reloads bindings (hybrid mode)

---

### When Changes Take Effect

**Skills Hot Reload (SKILL.md changes):**
- Watcher monitors `SKILL.md` files
- On change → bumps skills snapshot
- **Next agent turn** = new skills loaded
- **No restart needed!** ✨

**Config:**
```json5
{
  "skills": {
    "load": {
      "watch": true,           // default: enabled
      "watchDebounceMs": 250   // debounce 250ms
    }
  }
}
```

**Gateway Config Hot Reload:**
```json5
{
  "gateway": {
    "reload": {
      "mode": "hybrid"  // hot-apply safe changes, auto-restart critical
    }
  }
}
```

**Modes:**
- `hybrid` (default) - safe changes hot-apply, critical → auto-restart
- `hot` - safe only, log warning if restart needed
- `restart` - any change → restart
- `off` - manual restart only

---

### What Needs Restart vs Hot Reload

**Critical changes (auto-restart in hybrid mode):**
- ❌ `gateway.bind` / `gateway.port` changes
- ❌ Add/remove entire channels (whatsapp, telegram)
- ❌ Plugin enable/disable
- ❌ **Agent list changes** (add/remove agents)

**Safe changes (hot-reload, no restart):**
- ✅ Skill updates (SKILL.md)
- ✅ Agent affordances (agent.yaml)
- ✅ Model changes
- ✅ Matrix webhook bindings (add/edit/remove)

---

### Session = Conversa Persistente

**Session key format:** `agent:<agentId>:channel:userId`

**Stored in:** `~/.openclaw/agents/AGENT/sessions/sessions.json`

**Each agent = own sessions:**
- UXR's sessions ≠ Design's sessions
- Each agent remembers own conversations
- Communication via `sessions_send` or shared files

---

## Questions to Answer

1. **How to generate SOUL.md from soul.md + .values.md?**
   - Backstage watcher on YAML changes?
   - Manual script?
   - OpenClaw reads both separately?

2. **Do we symlink or copy template files?**
   - AGENTS.md, USER.md shared across all agents?
   - Or per-agent customization?

3. **Matrix integration:**
   - Webhook routing per agent
   - DM vs squad room behavior
   - How to test before production?
