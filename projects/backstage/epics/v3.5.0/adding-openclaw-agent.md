# Adding an OpenClaw Agent

**Last updated:** 2026-03-13  
**Epic:** v3.6.0 - Agent Framework

---

## Overview

This guide walks through creating a new OpenClaw agent, from CLI setup to workspace configuration.

**Time required:** ~15 minutes  
**Prerequisites:** OpenClaw installed, gateway running

---

## Agent Lifecycle (Status)

Agents progress through 3 lifecycle stages:

### **draft** (brainstorming)
- Just an idea
- No agent.yaml
- No workspace
- Documented in agent ideas list

### **configured** (stem cell, clone)
- agent.yaml exists
- Workspace created (`~/Backstage/agents/DOMAIN/AGENT`)
- SOUL.md generic (template)
- No Matrix room yet
- No displayName/avatar
- **"Clone ready to differentiate"**

### **active** (fully differentiated)
- Matrix room created
- openclaw.json configured (agentId + displayName + avatarUrl)
- SOUL.md personalized (not template)
- Skills/MCPs/Library configured
- **"Fully functional, unique identity"**

**This guide creates `configured` agents.** See `activating-agent.md` for activation checklist.

---

## Step 1: Create Agent via CLI

```bash
openclaw agents create AGENT_NAME
```

**Example:**
```bash
openclaw agents create business-analyst
```

**Output:**
```
✓ Created agent business-analyst
  Workspace: ~/.openclaw/agents/business-analyst
  Agent dir: ~/.openclaw/agents/business-analyst/agent
```

---

## Step 2: Move to Project Structure

**OpenClaw creates agents in `~/.openclaw/agents/` by default, but we organize by domain:**

```bash
# 1. Create domain folder if needed
mkdir -p ~/Backstage/agents/DOMAIN

# 2. Move agent to domain
mv ~/.openclaw/agents/AGENT_NAME ~/Backstage/agents/DOMAIN/

# 3. Update symlink (if OpenClaw uses it)
# Or just reference new path in config
```

**Example (Business Analyst in "meta" domain):**
```bash
mkdir -p ~/Backstage/agents/meta
mv ~/.openclaw/agents/business-analyst ~/Backstage/agents/meta/
```

**Final structure:**
```
~/Backstage/agents/
├── meta/
│   └── business-analyst/
│       ├── agent/
│       │   └── agent.yaml
│       ├── SOUL.md
│       ├── USER.md
│       └── AGENTS.md
└── design/
    └── design-engineer/
        └── ...
```

---

## Step 3: Configure agent.yaml

**File:** `~/Backstage/agents/DOMAIN/AGENT/agent/agent.yaml`

**Required fields:**
```yaml
---
name: "Agent Name"
description: "What this agent does"
status: configured  # draft, configured, or active
matrix_room: null  # Add when activating (see activating-agent.md)
---
```

**Example (Business Analyst - configured stage):**
```yaml
---
name: "Business Analyst"
description: "Product management, epics, roadmaps, stakeholder communication"
status: configured
matrix_room: "!EQyjalpjgFwRZGsril:studio.adal-rigel.ts.net"
---
```

**Status values:**
- `draft` - Just an idea, no workspace yet
- `configured` - Workspace exists, generic template, no Matrix
- `active` - Fully differentiated, Matrix room, unique identity

---

## Step 4: Create SOUL.md (Agent Personality)

**File:** `~/Backstage/agents/DOMAIN/AGENT/SOUL.md`

**Template:**
```markdown
# SOUL.md - Who You Are

## Core Identity

**Role:** [What this agent does]  
**Domain:** [Area of expertise]  
**Vibe:** [Personality traits]

## Behavior

- [Guideline 1]
- [Guideline 2]
- [Guideline 3]

## Boundaries

- [What agent should NOT do]
- [When to escalate to human]

## Tools & Skills

- [List of skills this agent uses]
- [APIs/services this agent accesses]

---

*This file defines who you are. Read it every session.*
```

**Example (Business Analyst):**
```markdown
# SOUL.md - Who You Are

## Core Identity

**Role:** Product management and stakeholder communication  
**Domain:** Epics, roadmaps, requirements, prioritization  
**Vibe:** Strategic, clear, diplomatic

## Behavior

- Think in epics and user stories
- Translate technical work into stakeholder language
- Prioritize by value and effort
- Ask clarifying questions before committing

## Boundaries

- Don't make technical architecture decisions (escalate to Design Engineer)
- Don't commit to deadlines without checking capacity
- Don't change scope without stakeholder agreement

## Tools & Skills

- Jira (read/write issues, epics)
- Backstage (read/update roadmaps)
- Figma (view designs, no editing)

---

*This file defines who you are. Read it every session.*
```

---

## Step 5: Create USER.md (About Nicholas)

**File:** `~/Backstage/agents/DOMAIN/AGENT/USER.md`

**Copy from main agent:**
```bash
cp ~/.openclaw/workspace/USER.md ~/Backstage/agents/DOMAIN/AGENT/
```

**Or create custom if agent has specific context about user.**

---

## Step 6: Create AGENTS.md (Agent-Specific Protocols)

**File:** `~/Backstage/agents/DOMAIN/AGENT/AGENTS.md`

**Template:**
```markdown
# AGENTS.md - Agent Protocols

## Session Start

Every session:
1. Read SOUL.md (who I am)
2. Read USER.md (who you are)
3. Read agent.yaml (current config)

## Domain-Specific Rules

[Add agent-specific workflows here]

## Tools

[List tools and how to use them]

## Related

- Main workspace: ~/.openclaw/workspace/
- Shared docs: ~/Documents/personal/
```

---

## Step 7: Test Agent Interaction

**Via CLI:**
```bash
openclaw chat --agent AGENT_NAME "Hello! Who are you?"
```

**Expected response:**
Agent responds according to SOUL.md personality.

**Example:**
```bash
$ openclaw chat --agent business-analyst "Who are you?"

Hello! I'm your Business Analyst agent. I help with:
- Epic planning and roadmaps
- Stakeholder communication
- Requirements gathering
- Prioritization decisions

What can I help you with today?
```

---

## Step 8: Verify Agent Listed

```bash
openclaw agents list
```

**Output should include:**
```
- business-analyst
  Workspace: ~/Backstage/agents/meta/business-analyst
  Agent dir: ~/Backstage/agents/meta/business-analyst/agent
```

---

## Next Steps

**Agent now in `configured` state (stem cell, ready to differentiate).**

**To activate (make fully functional):**
1. **Activate agent:** See `activating-agent.md` (Matrix room, displayName, avatar)
2. **Configure skills:** Add skill symlinks to agent workspace
3. **Set up tools:** Configure API access in agent's .env
4. **Personalize SOUL.md:** Make unique (not template)
5. **Test workflows:** Run through common tasks

---

## Troubleshooting

### Agent not listed

```bash
openclaw agents list
```

If missing, check:
- agent.yaml exists in correct location
- status field is valid (active/planning/backlog)

### Agent won't respond

Check workspace path:
```bash
openclaw agents list | grep AGENT_NAME
```

Verify SOUL.md exists:
```bash
ls ~/Backstage/agents/DOMAIN/AGENT/SOUL.md
```

### CLI chat fails

Ensure gateway running:
```bash
openclaw status
```

---

## Related Docs

- `adding-agent-to-matrix.md` - Connect agent to Matrix rooms
- `matrix-message-flow.md` - How messages route to agents
- `~/Documents/personal/connections/openclaw.md` - OpenClaw configuration

---

**Created:** 2026-03-13 (after successful Business Analyst + Design Engineer setup)
