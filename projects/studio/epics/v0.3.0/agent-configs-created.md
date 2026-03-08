# Agent Configs Created

**Date:** 2026-03-08

**Location:** `~/Backstage/agents/`

---

## Structure

```
agents/
├── main/
│   ├── business-analyst/ (template, já existia)
│   ├── defense/ ✅ CREATED
│   ├── secretaria/ ✅ CREATED
│   └── strategic/ ✅ CREATED
├── research/
│   ├── research-analyst/ ✅ CREATED
│   ├── uxr/ ✅ CREATED
│   └── legal/ ✅ CREATED
├── engineering/
│   ├── design-engineer/ (template, já existia)
│   └── design/ ✅ CREATED
└── marketing/
    └── marketing-strategist/ (template, já existia)
```

---

## Agent Definitions

### Main Squad

**Defense** (`main/defense/`)
- **Type:** Assisted
- **Model:** Qwen 32B
- **Capabilities:** code_review, debugging, test_generation, rapid_iteration
- **Description:** Code iteration, debugging, TDD - Nicholas present

**Secretaria** (`main/secretaria/`)
- **Type:** Assisted  
- **Model:** Qwen 7B
- **Capabilities:** scheduling, email_triage, task_management, data_entry
- **Description:** Clerical work, admin - Nicholas present

**Strategic** (`main/strategic/`)
- **Type:** Strategic
- **Model:** Claude Sonnet 4.5 (cloud)
- **Capabilities:** epic_planning, architecture_design, multi_project_coordination, long_context_analysis
- **Description:** Epic planning, architecture - high-level decisions

### Research Squad

**Research Analyst** (`research/research-analyst/`)
- **Type:** Unassisted
- **Model:** Qwen 72B
- **Capabilities:** deep_research, book_search, data_synthesis, report_generation
- **Description:** Deep investigation - works alone

**UXR** (`research/uxr/`)
- **Type:** Unassisted
- **Model:** Qwen 72B
- **Capabilities:** user_interviews, persona_creation, flow_mapping, usability_analysis
- **Description:** User research - works alone

**Legal** (`research/legal/`)
- **Type:** Unassisted
- **Model:** Qwen 72B
- **Capabilities:** contract_review, compliance_check, policy_analysis, risk_assessment
- **Description:** Legal work - works alone

### Engineering Squad

**Design** (`engineering/design/`)
- **Type:** Unassisted
- **Model:** Qwen 72B
- **Capabilities:** ui_design, visual_design, figma_work, design_systems
- **Description:** UI/UX design - works alone

**Design Engineer** (`engineering/design-engineer/`) - TEMPLATE
- **Capabilities:** component_architecture, design_systems, frontend_implementation
- **Description:** Component architecture, design systems

### Marketing Squad

**Marketing Strategist** (`marketing/marketing-strategist/`) - TEMPLATE
- **Capabilities:** brand_positioning, content_strategy, community_engagement
- **Description:** Brand, content, community

---

## Notes

- **agents/ is gitignored** (individual workspaces, not shared)
- Each agent needs SOUL.md, AGENTS.md, USER.md, etc. (like main Kin workspace)
- Templates already exist for design-engineer, business-analyst, marketing-strategist
- New agents created: defense, secretaria, strategic, research-analyst, uxr, legal, design

---

## Next Steps

1. ✅ Agent configs created (agent.yml for each)
2. [ ] Copy workspace files (SOUL.md, AGENTS.md, etc.) to each agent
3. [ ] Customize SOUL.md per agent (different personalities)
4. [ ] Test spawning agents via OpenClaw
5. [ ] Matrix setup (communication backbone)

---

**Source:** Epic v0.3.0 autonomous work session 2026-03-08
