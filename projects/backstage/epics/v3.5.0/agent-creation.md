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
