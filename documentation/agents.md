# Agent Configuration Guide

**Location:** `~/Backstage/agents/{SQUAD}/{AGENT}/`

**Composition:** 3-layer merge (organization → squad → agent)

---

## Configuration Objects

Four types of configuration, each merged from organization/squad/agent levels:

1. **Skills** - Tools and capabilities
2. **MCPs** - Model Context Protocol servers
3. **Values** - Behavioral constraints
4. **Library** - Knowledge topics to consult

---

## Composition System

### Current: Merge Only

Organization → Squad → Agent (additive merge)

```yaml
# organization.yaml
skills: [backstage, librarian, github]

# squad/design/squad.yaml
skills: [figma, typography]

# squad/design/design-engineer/agent.yaml
skills: [playwright]

# Result: [backstage, librarian, github, figma, typography, playwright]
```

### Future: Deny List

> 🔜 **Agent > Squad > Organization precedence**
> 
> ```yaml
> # organization.yaml
> skills: [github, slack]
> 
> # agent.yaml
> skills: [github]
> deny_skills: [slack]  # Agent refuses slack access
> 
> # Result: [github] (agent denial wins)
> ```

---

## 1. Skills

**Source:** `~/Backstage/skills/` (organization-level)

**Mechanism:** Symlinks in agent workspace

```bash
~/Backstage/agents/design/design-engineer/skills/
├── backstage -> ~/Backstage/skills/backstage/
├── librarian -> ~/Backstage/skills/librarian/
├── github -> ~/Backstage/skills/github/
└── figma -> ~/Backstage/skills/figma/
```

**Why symlinks:** No duplication, single source of truth per skill.

**Script:** `scripts/composite.sh` generates symlinks based on YAML configs.

---

## 2. MCPs (Model Context Protocol)

**Status:** Not currently configured (all YAMLs have `mcps: []`)

**Process:**
1. Install MCP server in Docker MCP container
2. Add to organization/squad/agent YAML: `mcps: [github-mcp]`
3. Composite generates `.mcps.md` (reference doc for agent)

**Supported MCPs:**
- `github-mcp` - GitHub API access
- `playwright-mcp` - Browser automation
- `figma-mcp` - Figma API
- `context7-mcp` - Context management

**Location:** Configured in OpenClaw Gateway (not Backstage YAMLs)

**Script:** `scripts/generate-agent-mcps.sh`

---

## 3. Values

**Purpose:** Behavioral constraints for agents

**Mechanism:** Append organization → squad → agent values into `.values.md`

**Referenced in:** `SOUL.md` (first line: "Use the values defined in `.values.md` as constraints.")

**Example composite:**

```yaml
# organization.yaml
values:
  - "Prioritize user needs over business metrics"
  - "Fail fast, learn faster"

# squad/design/squad.yaml
values:
  - "Form follows function"
  - "Accessible by default"

# agent.yaml
values:
  - "Code as documentation"
```

**Result `.values.md`:**
```markdown
# Values

## Organization
- Prioritize user needs over business metrics
- Fail fast, learn faster

## Squad (design)
- Form follows function
- Accessible by default

## Agent (design-engineer)
- Code as documentation
```

**Script:** `scripts/generate-agent-values.sh`

---

## 4. Library

**Purpose:** Define WHICH topics agent MUST consult (via librarian skill)

**Mechanism:** Composite lists topics from organization/squad/agent, generates `.library.md`

**Referenced in:** `SOUL.md` ("Consult topics in `.library.md` for expertise.")

**Example composite:**

```yaml
# organization.yaml
library:
  - backstage-architecture
  - git-workflow

# squad/design/squad.yaml
library:
  - design-systems
  - accessibility

# agent.yaml
library:
  - react-patterns
  - css-grid
```

**Result `.library.md`:**
```markdown
# Library Topics

Consult these topics when relevant:

- backstage-architecture
- git-workflow
- design-systems
- accessibility
- react-patterns
- css-grid

Use `librarian` skill to retrieve topic content.
```

**Script:** `scripts/generate-agent-library.sh`

**Skill:** `librarian` (organization-level, all agents have access)

---

## File Structure

```
~/Backstage/agents/design/design-engineer/
├── agent.yaml              # Agent-specific config
├── SOUL.md                 # Personality (references .values.md, .library.md)
├── .values.md              # Generated: composite values
├── .library.md             # Generated: composite library topics
├── .mcps.md                # Generated: MCP reference (currently empty)
├── skills/                 # Symlinks to ~/Backstage/skills/
│   ├── backstage -> ...
│   ├── librarian -> ...
│   └── github -> ...
├── AGENTS.md               # Workspace rules (read-only)
├── USER.md                 # Human context
├── TOOLS.md                # Local notes (camera names, SSH, etc.)
└── memory/                 # Daily logs
    └── 2026-03-16.md
```

---

## Scripts

All located in `~/Backstage/scripts/`:

- `composite.sh` - Main orchestrator (calls all generators)
- `generate-agent-values.sh` - Merges values → `.values.md`
- `generate-agent-library.sh` - Merges library → `.library.md`
- `generate-agent-mcps.sh` - Lists MCPs → `.mcps.md`

**Run after editing YAML:**
```bash
cd ~/Backstage
./scripts/composite.sh
```

---

## Precedence (Future)

When deny lists implemented:

**Agent > Squad > Organization**

Most specific configuration wins. Agent can refuse organization-level defaults.

**Use case:** Security-sensitive agent denies network access granted at org level.

---

## Examples

**Simple agent:** `agents/research/librarian/` (minimal config, inherits most from org)

**Complex agent:** `agents/design/design-engineer/` (many skills, custom values, extended library)

---

> 🔜 **Future enhancements:**
> - Deny lists (`deny_skills`, `deny_mcps`, `deny_values`)
> - Project-level library (inherit topics from assigned projects)
> - Conditional skills (enable only when working on specific projects)
