# Agents Config - OpenClaw JSON

**File:** `~/.openclaw/config.yaml` (ou `openclaw.json` se usar JSON)

**Section:** `agents.list`

---

## JSON to add

```json
{
  "agents": {
    "list": [
      {
        "id": "orchestrator",
        "workspace": "~/backstage/agents/meta/orchestrator",
        "agentDir": "~/.openclaw/agents/orchestrator/agent"
      },
      {
        "id": "business-analyst",
        "workspace": "~/backstage/agents/meta/business-analyst",
        "agentDir": "~/.openclaw/agents/business-analyst/agent"
      },
      {
        "id": "librarian",
        "workspace": "~/backstage/agents/meta/librarian",
        "agentDir": "~/.openclaw/agents/librarian/agent"
      },
      {
        "id": "uxr",
        "workspace": "~/backstage/agents/design/uxr",
        "agentDir": "~/.openclaw/agents/uxr/agent"
      },
      {
        "id": "design",
        "workspace": "~/backstage/agents/design/design",
        "agentDir": "~/.openclaw/agents/design/agent"
      },
      {
        "id": "ux-copy",
        "workspace": "~/backstage/agents/design/ux-copy",
        "agentDir": "~/.openclaw/agents/ux-copy/agent"
      },
      {
        "id": "animator",
        "workspace": "~/backstage/agents/design/animator",
        "agentDir": "~/.openclaw/agents/animator/agent"
      },
      {
        "id": "development",
        "workspace": "~/backstage/agents/engineering/development",
        "agentDir": "~/.openclaw/agents/development/agent"
      },
      {
        "id": "infrastructure",
        "workspace": "~/backstage/agents/engineering/infrastructure",
        "agentDir": "~/.openclaw/agents/infrastructure/agent"
      },
      {
        "id": "marketing",
        "workspace": "~/backstage/agents/marketing/marketing",
        "agentDir": "~/.openclaw/agents/marketing/agent"
      },
      {
        "id": "growth",
        "workspace": "~/backstage/agents/marketing/growth",
        "agentDir": "~/.openclaw/agents/growth/agent"
      },
      {
        "id": "community-organizer",
        "workspace": "~/backstage/agents/marketing/community-organizer",
        "agentDir": "~/.openclaw/agents/community-organizer/agent"
      },
      {
        "id": "legal",
        "workspace": "~/backstage/agents/resources/legal",
        "agentDir": "~/.openclaw/agents/legal/agent"
      },
      {
        "id": "grant-advisor",
        "workspace": "~/backstage/agents/resources/grant-advisor",
        "agentDir": "~/.openclaw/agents/grant-advisor/agent"
      },
      {
        "id": "security",
        "workspace": "~/backstage/agents/resources/security",
        "agentDir": "~/.openclaw/agents/security/agent"
      },
      {
        "id": "secretary",
        "workspace": "~/backstage/agents/personal/secretary",
        "agentDir": "~/.openclaw/agents/secretary/agent"
      },
      {
        "id": "buyer",
        "workspace": "~/backstage/agents/personal/buyer",
        "agentDir": "~/.openclaw/agents/buyer/agent"
      },
      {
        "id": "travel-agent",
        "workspace": "~/backstage/agents/personal/travel-agent",
        "agentDir": "~/.openclaw/agents/travel-agent/agent"
      },
      {
        "id": "nutritionist",
        "workspace": "~/backstage/agents/personal/nutritionist",
        "agentDir": "~/.openclaw/agents/nutritionist/agent"
      },
      {
        "id": "personal-trainer",
        "workspace": "~/backstage/agents/personal/personal-trainer",
        "agentDir": "~/.openclaw/agents/personal-trainer/agent"
      },
      {
        "id": "oracle",
        "workspace": "~/backstage/agents/personal/oracle",
        "agentDir": "~/.openclaw/agents/oracle/agent"
      }
    ]
  }
}
```

---

## Explanation

**`id`:** Slug (how you spawn the agent)
**`workspace`:** Where agent lives (SOUL.md, skills/, memory/)
**`agentDir`:** Where OpenClaw stores internal state (DO NOT EDIT)

**Status:** All agents currently `status: backlog` in agent.yaml
**Next:** Populate affordances, change status to `active`, then OpenClaw can discover them

---

## Alternative: YAML format

If `~/.openclaw/config.yaml`:

```yaml
agents:
  list:
    - id: orchestrator
      workspace: ~/backstage/agents/meta/orchestrator
      agentDir: ~/.openclaw/agents/orchestrator/agent
    - id: business-analyst
      workspace: ~/backstage/agents/meta/business-analyst
      agentDir: ~/.openclaw/agents/business-analyst/agent
    - id: librarian
      workspace: ~/backstage/agents/meta/librarian
      agentDir: ~/.openclaw/agents/librarian/agent
    - id: uxr
      workspace: ~/backstage/agents/design/uxr
      agentDir: ~/.openclaw/agents/uxr/agent
    - id: design
      workspace: ~/backstage/agents/design/design
      agentDir: ~/.openclaw/agents/design/agent
    - id: ux-copy
      workspace: ~/backstage/agents/design/ux-copy
      agentDir: ~/.openclaw/agents/ux-copy/agent
    - id: animator
      workspace: ~/backstage/agents/design/animator
      agentDir: ~/.openclaw/agents/animator/agent
    - id: development
      workspace: ~/backstage/agents/engineering/development
      agentDir: ~/.openclaw/agents/development/agent
    - id: infrastructure
      workspace: ~/backstage/agents/engineering/infrastructure
      agentDir: ~/.openclaw/agents/infrastructure/agent
    - id: marketing
      workspace: ~/backstage/agents/marketing/marketing
      agentDir: ~/.openclaw/agents/marketing/agent
    - id: growth
      workspace: ~/backstage/agents/marketing/growth
      agentDir: ~/.openclaw/agents/growth/agent
    - id: community-organizer
      workspace: ~/backstage/agents/marketing/community-organizer
      agentDir: ~/.openclaw/agents/community-organizer/agent
    - id: legal
      workspace: ~/backstage/agents/resources/legal
      agentDir: ~/.openclaw/agents/legal/agent
    - id: grant-advisor
      workspace: ~/backstage/agents/resources/grant-advisor
      agentDir: ~/.openclaw/agents/grant-advisor/agent
    - id: security
      workspace: ~/backstage/agents/resources/security
      agentDir: ~/.openclaw/agents/security/agent
    - id: secretary
      workspace: ~/backstage/agents/personal/secretary
      agentDir: ~/.openclaw/agents/secretary/agent
    - id: buyer
      workspace: ~/backstage/agents/personal/buyer
      agentDir: ~/.openclaw/agents/buyer/agent
    - id: travel-agent
      workspace: ~/backstage/agents/personal/travel-agent
      agentDir: ~/.openclaw/agents/travel-agent/agent
    - id: nutritionist
      workspace: ~/backstage/agents/personal/nutritionist
      agentDir: ~/.openclaw/agents/nutritionist/agent
    - id: personal-trainer
      workspace: ~/backstage/agents/personal/personal-trainer
      agentDir: ~/.openclaw/agents/personal-trainer/agent
    - id: oracle
      workspace: ~/backstage/agents/personal/oracle
      agentDir: ~/.openclaw/agents/oracle/agent
```

---

## When to add this

**Now:** Agents created but empty (no SOUL.md, skills, etc.)
**Later:** After populating workspace files (SOUL.md, AGENTS.md, skills/)
**Test:** Spawn one agent first, verify discovery works
