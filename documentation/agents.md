# Backstage Agent Configuration

**Status:** Current state documented (2026-03-16)

## Architecture Overview

Agents are **composites** built from three YAML layers:

1. **organization.yaml** - Global/org-wide settings
2. **squad.yaml** - Squad-specific configuration  
3. **agent.yaml** - Individual agent configuration

Generated files (`.values.md`, `.library.md`, `.mcps.md`) are created by `composite.sh`.

---

## File Structure

```
~/Backstage/
├── organization.yaml          # Org-level config
├── scripts/
│   ├── composite.sh           # Master sync (runs all generators)
│   ├── sync-agent-skills.sh   # Symlink skills
│   ├── generate-agent-values.sh
│   ├── generate-agent-library.sh
│   └── generate-agent-mcps.sh
├── agents/
│   ├── design/
│   │   ├── squad.yaml         # Design squad config
│   │   ├── design-engineer/
│   │   │   ├── agent.yaml     # Individual agent config
│   │   │   ├── .values.md     # Generated (composite)
│   │   │   ├── .library.md    # Generated (composite)
│   │   │   ├── .mcps.md       # Generated (composite)
│   │   │   ├── SOUL.md        # Hand-written
│   │   │   ├── AGENTS.md      # Hand-written
│   │   │   └── ...
```

---

## Configuration Fields

### organization.yaml

**Current content:**
```yaml
name: "Organization"
description: "Organization-wide configuration"

skills:
  - backstage
  - librarian
  - github
  - summarize
  - tmux
  - remove-ambiguity

values:
  - autonomy
  - brevity
  - commons
  - DRY
  - high auditability
  - identity
  - less is more
  - night shift
  - remove ambiguity
  - parity
  - research
```

**Fields:**
- `skills[]` - Skills available to ALL agents
- `values[]` - Values enforced org-wide
- `mcps[]` - **NOT PRESENT** (no org-level MCPs configured)

---

### squad.yaml

**Example (design squad):**
```yaml
name: "Design Squad"
description: "User research, visual design, UX copy, and animation"
status: active

tools: []
skills: []
mcps: []
library:
  - design_usability_general
  - design_usability_rosenfeld
  - creativity_art_direction
  - creativity_brand_strategy
  - creativity_writing
  - design_character
  - design_circular
  - design_data_visualization
  - design_generative
  - design_interaction
  - design_system
  - design_theory
  - design_typography
values: []
```

**Fields:**
- `tools[]` - Squad-specific tools
- `skills[]` - Squad-specific skills (empty = inherit org)
- `mcps[]` - **EMPTY** (no squad MCPs configured)
- `library[]` - Expertise topics for squad
- `values[]` - Squad-specific values (empty = inherit org)

**Status across all squads:**
- design: `mcps: []`
- engineering: `mcps: []`
- marketing: `mcps: []`
- personal: `mcps: []`
- resources: `mcps: []`
- template: `mcps: []`

---

### agent.yaml

**Example (design-engineer):**
```yaml
name: "Design Engineer"
description: "Design engineering agent"
status: active

tools: []
skills:
  - tmux
mcps: []  # Inherits: github-mcp (org), playwright-mcp + figma-mcp (squad)
library:
  - technology_computer_vision
  - technology_hugo
  - technology_internet_of_things
  - technology_threejs
  - technology_vscode
  - technology_web_animation
  - design_data_visualization
  - design_generative
  - design_interaction
  - design_usability_general
  - design_usability_rosenfeld
values: []
```

**Fields:**
- `tools[]` - Agent-specific tools
- `skills[]` - Agent-specific skills (merges with org + squad)
- `mcps[]` - **EMPTY** (comment is aspirational, not implemented)
- `library[]` - Agent-specific expertise (merges with squad)
- `values[]` - Agent-specific values (merges with org + squad)

---

## Composite Generation Process

**Command:** `~/Backstage/scripts/composite.sh <agent_dir>`  
**Or:** `composite.sh all` (runs for all agents)

**Steps:**

1. **sync-agent-skills.sh** - Symlinks skills from `~/Backstage/skills/` to agent dir
2. **generate-agent-values.sh** - Merges values from org → squad → agent into `.values.md`
3. **generate-agent-library.sh** - Merges library topics into `.library.md`
4. **generate-agent-mcps.sh** - Merges MCPs from org → squad → agent into `.mcps.md`

**Merge order:** organization → squad → agent (deduplicated)

---

## MCP Configuration (CURRENT STATE)

**Configured in YAMLs:**
- organization.yaml: No `mcps` field
- squad.yaml: `mcps: []` (empty array)
- agent.yaml: `mcps: []` (empty array)

**Result:**
- `generate-agent-mcps.sh` produces `.mcps.md` with "No MCP servers configured"
- MCPs are NOT running (no processes, not in OpenClaw status)

**Supported MCPs (in script, not enabled):**
- `github-mcp` - GitHub API (repos, issues, PRs, code search)
- `playwright-mcp` - Browser automation, screenshots
- `figma-mcp` - Figma layout/component extraction
- `context7-mcp` - Framework documentation (requires API key)

**Why MCPs don't work:**
- YAMLs have empty arrays
- `.mcps.md` is documentation only (not executable config)
- OpenClaw doesn't read `.mcps.md` to start MCPs
- MCPs need to be configured elsewhere (OpenClaw config, not Backstage YAMLs)

---

## Skills Configuration (CURRENT STATE)

**Configured in YAMLs:**
- organization.yaml: `skills: [backstage, librarian, github, summarize, tmux, remove-ambiguity]`
- squad.yaml (design): `skills: []` (inherits org)
- agent.yaml (design-engineer): `skills: [tmux]` (adds to org list)

**Available skills (system-wide):**
- From `/opt/homebrew/lib/node_modules/openclaw/skills/`:
  - apple-notes, apple-reminders, clawhub, gh-issues, github, healthcheck
  - node-connect, skill-creator, summarize, tmux, video-frames, weather

**Custom skills (Backstage):**
- From `~/Backstage/skills/`:
  - add-to-project, backstage, librarian, remove-ambiguity, etc.

**Symlinks:**
- `sync-agent-skills.sh` creates symlinks in agent dir
- Example: `design-engineer/skills/tmux` → `~/Backstage/skills/tmux/`

**Skills WORK because:**
- OpenClaw loads skills from agent workspace
- Skills have `SKILL.md` with instructions
- Agent reads `SKILL.md` when triggered

---

## Values & Library (CURRENT STATE)

**Values:**
- Defined in `organization.yaml` and optionally in `squad.yaml`/`agent.yaml`
- Merged into `.values.md` by `generate-agent-values.sh`
- Example values: autonomy, brevity, commons, DRY, high auditability, parity

**Library:**
- Defined in `squad.yaml` and `agent.yaml`
- Merged into `.library.md` by `generate-agent-library.sh`
- Contains expertise topics (e.g., `design_usability_general`, `technology_threejs`)
- Agent consults `.library.md` for domain knowledge

---

## Gap: MCPs Not Integrated

**Problem:**
- Backstage YAMLs define `mcps: []` but it's empty
- `.mcps.md` is generated but only contains documentation
- OpenClaw doesn't automatically start MCPs based on `.mcps.md`

**Missing link:**
- OpenClaw config (`~/.config/openclaw/config.yaml` or Gateway config) needs MCP server definitions
- MCPs must be started as processes (via `npx`, stdio, or stdio+npx transports)
- `.mcps.md` should reference running MCPs, not define them

**To fix (requires investigation):**
- Find OpenClaw MCP configuration location
- Define MCP servers in OpenClaw config (not Backstage YAML)
- Update Backstage YAMLs to list which MCPs each agent uses
- Regenerate `.mcps.md` to document available MCPs
- Test that OpenClaw exposes MCP tools to agent sessions

---

## Summary

**What works:**
- ✅ Skills (org + custom)
- ✅ Values (composite merge)
- ✅ Library (composite merge)
- ✅ Composite generation (`composite.sh`)

**What doesn't work:**
- ❌ MCPs (YAMLs empty, no OpenClaw integration)

**Next:** Investigate OpenClaw MCP configuration, then enable MCPs.b
