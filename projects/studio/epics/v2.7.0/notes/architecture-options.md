# Mattermost Multi-Agent Architecture Options

**Created:** 2026-03-15  
**Epic:** v2.7.0 (Mattermost Agent Integration)

---

## Current State (What We Have)

```
Mattermost Server (localhost:8065)
├── Team: nonlinear-studio
├── #business-analyst (channel ID: fh1ze...)
├── #design-engineer (channel ID: z3ou7...)
│
Bot Accounts (via API):
├── @business-analyst (user_id: bmcwn...)
│   └── Token: cd31hq... (in .env)
└── @design-engineer (user_id: 9taw3...)
    └── Token: 7rrgkh... (in .env)

OpenClaw Gateway (localhost:18789, PID 3746)
├── Agent: main
├── Workspace: ~/.openclaw/workspace
└── Plugin: @openclaw/mattermost
    └── Accounts:
        ├── business-analyst (token, routes to #business-analyst)
        └── design-engineer (token, routes to #design-engineer)
```

**Problem:** All bots use same agent (`main`) → same workspace → same memory.

---

## Option C: Accept Limitation (Single-Agent Gateway)

**What it is:** Keep current setup, accept shared workspace.

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│ Mattermost (localhost:8065)                             │
│                                                          │
│  #business-analyst ──┐                                  │
│  #design-engineer ───┼──> Plugin routing via accounts   │
│  DMs ────────────────┘                                  │
└──────────────────────┬──────────────────────────────────┘
                       │ WebSocket + HTTP callbacks
                       ↓
┌─────────────────────────────────────────────────────────┐
│ OpenClaw Gateway (localhost:18789)                      │
│                                                          │
│  Plugin: @openclaw/mattermost                           │
│  ├── Account: business-analyst (token cd31hq...)        │
│  │   └── Routes: #business-analyst                     │
│  └── Account: design-engineer (token 7rrgkh...)         │
│      └── Routes: #design-engineer                       │
│                                                          │
│  Agent Runtime: main                                     │
│  └── Workspace: ~/.openclaw/workspace/                  │
│      ├── SOUL.md (shared)                               │
│      ├── AGENTS.md (shared)                             │
│      └── memory/ (shared)                               │
└─────────────────────────────────────────────────────────┘
```

### What Nicholas Sees (Mattermost UI)

```
#business-analyst
─────────────────
Business Analyst BOT 4:05 PM
I can help with requirements...

Nicholas 4:06 PM
What's in your workspace?

Business Analyst BOT 4:06 PM
/Users/nonlinear/.openclaw/workspace


#design-engineer
─────────────────
Design Engineer BOT 4:07 PM
I can help with UX/UI...

Nicholas 4:08 PM
What's in your workspace?

Design Engineer BOT 4:08 PM
/Users/nonlinear/.openclaw/workspace
```

### Behavior

| Aspect | Value |
|--------|-------|
| **Visual identity** | ✅ Different names/avatars |
| **Channel routing** | ✅ Each bot responds in correct channel |
| **Workspace** | ❌ Shared (`~/.openclaw/workspace`) |
| **Memory** | ❌ Shared (same `memory/` folder) |
| **SOUL.md** | ❌ Shared (same personality/rules) |
| **Agent context** | ❌ Same (both read same `AGENTS.md`) |

### Pros

- ✅ Works NOW (no changes needed)
- ✅ Simple (1 gateway, 1 process)
- ✅ Visual differentiation works (names correct in UI)
- ✅ Channel routing works (each bot responds in correct place)

### Cons

- ❌ No true isolation (shared workspace/memory)
- ❌ Agents can't develop different personalities
- ❌ Can't have agent-specific SOUL.md or context
- ❌ Not future-proof for complex multi-agent workflows

### Use Cases (Good For)

- ✅ Epic grooming (Nicholas sees who said what)
- ✅ Channel-based routing (messages go to right bot)
- ✅ Testing Mattermost integration quickly
- ⚠️ Agents with SAME expertise/personality

### Use Cases (Bad For)

- ❌ Agents with DIFFERENT personalities/contexts
- ❌ Isolated agent memory (learning from separate experiences)
- ❌ Agent-specific rules or workflows

---

## Option A: Multiple Gateways (True Multi-Agent)

**What it is:** Run separate OpenClaw gateway per agent.

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│ Mattermost (localhost:8065)                             │
│                                                          │
│  #business-analyst ──┐                                  │
│  #design-engineer ───┼──> Separate bot tokens           │
│  DMs ────────────────┘                                  │
└──────┬───────────────┬──────────────────────────────────┘
       │               │
       │ WebSocket     │ WebSocket
       │               │
       ↓               ↓
┌──────────────────┐ ┌──────────────────┐
│ Gateway 1        │ │ Gateway 2        │
│ Port: 18789      │ │ Port: 18790      │
│                  │ │                  │
│ Agent:           │ │ Agent:           │
│ business-analyst │ │ design-engineer  │
│                  │ │                  │
│ Workspace:       │ │ Workspace:       │
│ ~/Backstage/     │ │ ~/Backstage/     │
│   agents/meta/   │ │   agents/design/ │
│   business-      │ │   design-        │
│   analyst/       │ │   engineer/      │
│                  │ │                  │
│ SOUL.md:         │ │ SOUL.md:         │
│ "I'm BA..."      │ │ "I'm DE..."      │
│                  │ │                  │
│ memory/:         │ │ memory/:         │
│ (BA history)     │ │ (DE history)     │
└──────────────────┘ └──────────────────┘
```

### Configuration Files

**Gateway 1: ~/.openclaw/openclaw.json**
```json5
{
  gateway: {
    port: 18789,
  },
  agents: {
    defaults: {
      workspace: "~/Backstage/agents/meta/business-analyst",
    },
  },
  channels: {
    mattermost: {
      enabled: true,
      botToken: "$MATTERMOST_BOT_BUSINESS_ANALYST_TOKEN",
      baseUrl: "http://localhost:8065",
    },
  },
}
```

**Gateway 2: ~/.openclaw/openclaw-design-engineer.json**
```json5
{
  gateway: {
    port: 18790,
  },
  agents: {
    defaults: {
      workspace: "~/Backstage/agents/design/design-engineer",
    },
  },
  channels: {
    mattermost: {
      enabled: true,
      botToken: "$MATTERMOST_BOT_DESIGN_ENGINEER_TOKEN",
      baseUrl: "http://localhost:8065",
    },
  },
}
```

### What Nicholas Sees (Mattermost UI)

```
#business-analyst
─────────────────
Business Analyst BOT 4:05 PM
I specialize in requirements and stakeholder analysis...

Nicholas 4:06 PM
What's in your workspace?

Business Analyst BOT 4:06 PM
/Users/nonlinear/Backstage/agents/meta/business-analyst


#design-engineer
─────────────────
Design Engineer BOT 4:07 PM
I focus on UX/UI and component design...

Nicholas 4:08 PM
What's in your workspace?

Design Engineer BOT 4:08 PM
/Users/nonlinear/Backstage/agents/design/design-engineer
```

### Behavior

| Aspect | Value |
|--------|-------|
| **Visual identity** | ✅ Different names/avatars |
| **Channel routing** | ✅ Each bot responds in correct channel |
| **Workspace** | ✅ Isolated (separate folders) |
| **Memory** | ✅ Isolated (separate `memory/` folders) |
| **SOUL.md** | ✅ Isolated (each agent has own personality) |
| **Agent context** | ✅ Isolated (separate `AGENTS.md`, skills, etc.) |

### Pros

- ✅ True multi-agent isolation
- ✅ Each agent develops own personality/memory
- ✅ Agent-specific SOUL.md, AGENTS.md, skills
- ✅ Future-proof for complex orchestration
- ✅ Crash isolation (1 agent crashes ≠ all crash)

### Cons

- ❌ More complexity (2+ processes)
- ❌ More ports (18789, 18790, 18791...)
- ❌ More LaunchAgents (or manual process management)
- ❌ More memory usage (2+ Node.js processes)

### Setup Steps

1. **Copy config for each gateway:**
   ```bash
   cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw-business-analyst.json
   cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw-design-engineer.json
   ```

2. **Edit each config:**
   - Change `gateway.port` (18789, 18790, etc.)
   - Change `agents.defaults.workspace`
   - Change `channels.mattermost.botToken`

3. **Create LaunchAgents for each gateway:**
   ```bash
   # Business Analyst
   openclaw gateway install --config ~/.openclaw/openclaw-business-analyst.json --port 18789
   
   # Design Engineer
   openclaw gateway install --config ~/.openclaw/openclaw-design-engineer.json --port 18790
   ```

4. **Start all gateways:**
   ```bash
   launchctl load ~/Library/LaunchAgents/ai.openclaw.gateway-business-analyst.plist
   launchctl load ~/Library/LaunchAgents/ai.openclaw.gateway-design-engineer.plist
   ```

### Use Cases (Good For)

- ✅ Agents with DIFFERENT personalities
- ✅ Isolated memory/learning per agent
- ✅ Agent-specific skills/context
- ✅ Epic grooming with specialized agents
- ✅ Future orchestration (meta-agent delegating)

### Use Cases (Bad For)

- ❌ Quick prototyping (more setup overhead)
- ❌ Resource-constrained machines (multiple Node.js processes)
- ❌ Simple channel routing (overkill)

---

## Option B: Meta-Agent with Internal Delegation

**What it is:** One gateway, one meta-agent that spawns sub-agents.

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│ Mattermost (localhost:8065)                             │
│                                                          │
│  #business-analyst ──┐                                  │
│  #design-engineer ───┼──> Plugin routing                │
│  DMs ────────────────┘                                  │
└──────────────────────┬──────────────────────────────────┘
                       │ WebSocket
                       ↓
┌─────────────────────────────────────────────────────────┐
│ OpenClaw Gateway (localhost:18789)                      │
│                                                          │
│  Agent: orchestrator (meta-agent)                        │
│  Workspace: ~/.openclaw/workspace/                      │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Delegation Logic (inside orchestrator)            │  │
│  │                                                    │  │
│  │  if (channel == "business-analyst"):              │  │
│  │    sessions_spawn(                                │  │
│  │      agentId: "business-analyst",                 │  │
│  │      workspace: "~/Backstage/agents/meta/...",    │  │
│  │      task: message                                │  │
│  │    )                                              │  │
│  │                                                    │  │
│  │  if (channel == "design-engineer"):               │  │
│  │    sessions_spawn(                                │  │
│  │      agentId: "design-engineer",                  │  │
│  │      workspace: "~/Backstage/agents/design/...",  │  │
│  │      task: message                                │  │
│  │    )                                              │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Behavior

| Aspect | Value |
|--------|-------|
| **Visual identity** | ✅ Different names/avatars |
| **Channel routing** | ✅ Orchestrator delegates |
| **Workspace** | ✅ Sub-agents use separate workspaces |
| **Memory** | ⚠️ Isolated per sub-agent run (not persistent) |
| **SOUL.md** | ⚠️ Each sub-agent loads own SOUL.md (but ephemeral) |
| **Agent context** | ⚠️ Isolated per run (no cross-run memory) |

### Pros

- ✅ 1 gateway, simpler than Option A
- ✅ Sub-agents use separate workspaces
- ✅ Orchestrator has full control

### Cons

- ❌ Orchestrator needs routing logic (custom code)
- ❌ Sub-agent memory is ephemeral (unless persisted manually)
- ❌ More complex than Option C, less isolated than Option A

### Use Cases (Good For)

- ✅ Prototyping multi-agent delegation
- ✅ Learning how orchestration works
- ⚠️ Future migration to Option A

### Use Cases (Bad For)

- ❌ Persistent agent memory (sub-agents are one-shot)
- ❌ Production workflows (orchestrator = single point of failure)

---

## Comparison Table

| Aspect | Option C | Option A | Option B |
|--------|----------|----------|----------|
| **Processes** | 1 | 2+ | 1 |
| **Ports** | 1 (18789) | 2+ (18789, 18790...) | 1 (18789) |
| **Workspace isolation** | ❌ Shared | ✅ Isolated | ⚠️ Ephemeral |
| **Memory isolation** | ❌ Shared | ✅ Persistent | ⚠️ Ephemeral |
| **Visual differentiation** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Channel routing** | ✅ Plugin | ✅ Plugin | ⚠️ Orchestrator logic |
| **Setup complexity** | Low | High | Medium |
| **Future-proof** | ❌ No | ✅ Yes | ⚠️ Depends |
| **Resource usage** | Low | High | Low |

---

## Recommendation

### **Now (v2.7.0):**
**→ Option C**

**Why:**
- Works immediately ✅
- Visual differentiation (names) works ✅
- Channel routing works ✅
- You can test epic grooming NOW

**What you give up:**
- Isolated workspaces ❌
- Persistent agent memory ❌

---

### **Later (when you need isolation):**
**→ Option A**

**When to migrate:**
- Agents need different personalities
- Agents need separate memory/context
- Epic grooming workflows mature

**Migration path:**
1. Keep Option C working
2. Set up Gateway 2 on port 18790 (design-engineer)
3. Test both gateways in parallel
4. Migrate channels one by one
5. Decommission Option C setup

---

## Next Steps (If You Choose Option C)

1. ✅ **Mark v2.7.0 as DONE** (already working!)
2. ✅ **Test epic grooming** (create test epic, invite both bots)
3. ✅ **Document limitations** (shared workspace/memory)
4. ⏳ **Plan migration to Option A** (when needed)

---

## Next Steps (If You Choose Option A)

1. ⏳ **Create config files** (openclaw-business-analyst.json, openclaw-design-engineer.json)
2. ⏳ **Set up LaunchAgents** (one per gateway)
3. ⏳ **Test both gateways** (verify they start, connect to Mattermost)
4. ⏳ **Migrate channel routing** (point each channel to correct gateway)
5. ⏳ **Document setup** (connections/mattermost-multi-gateway.md)

---

**What do you want to do?** 🏴
