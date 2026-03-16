# Epic Writing Guide

**Purpose:** Standard format for Backstage epics (ideas → execution)

**Location:** `~/Backstage/projects/{PROJECT}/epics/v{X.Y.Z}/`

---

## File Structure

```
epics/v2.7.0/
├── epic.yaml          # Metadata + tasks (source of truth)
├── index.md           # Human narrative (optional)
├── notes.md           # Technical details (optional)
└── {other-docs}.md    # Supporting materials (optional)
```

**Rule:** `epic.yaml` = metadata ONLY. Long-form content = separate `.md` files.

---

## epic.yaml Format

### Minimal (Backlog)

```yaml
---
version: v2.7.0
name: "Epic Name"
status: backlog
created: 2026-03-16
type: minor
goal: "One-line description of what we want"
tasks: []
---
```

**Required fields:**
- `version` - Epic identifier (v{major}.{minor}.{patch})
- `name` - Display name
- `status` - `backlog`, `active`, `done`, `archive`
- `created` - Date (YYYY-MM-DD)
- `type` - `minor`, `major`, `patch`
- `goal` - One-line summary
- `tasks` - Array (can be empty)

---

### Full (Active/Grooming)

```yaml
---
version: v2.7.0
name: "Mattermost Agent Integration"
status: active
created: 2026-03-16
started: 2026-03-16
completed: null
updated: 2026-03-16 15:56 EDT
priority: P0
category: integration
type: major

summary: |
  Multi-line summary explaining the epic.
  Context, motivation, high-level approach.

goal: |
  What success looks like (measurable outcome).
  Keep this crisp - detailed context goes in index.md.

tasks:
  - text: "Task description (action verb + deliverable)"
    checked: false
  - text: "Another task"
    checked: true
    notes: "Optional explanation or context for this task"

scope: |
  What's included, what's excluded.
  
  In scope:
  - Feature X
  - Integration Y
  
  Out of scope:
  - Feature Z (deferred to v3.0.0)

dependencies:
  - Epic v1.5.0 - Foundation (must complete first)
  - External API access (requires credentials)

references:
  - OpenClaw docs: https://docs.openclaw.ai
  - Related issue: #123

success_criteria:
  - "Agents respond to mentions in public channels"
  - "Bot creates grooming rooms automatically"
  - "Zero manual configuration per agent"

estimated_completion: "2026-03-20"

notes: |
  Brief inline notes (implementation hints, gotchas).
  Long technical details → notes.md file.
---
```

---

## Field Reference

### Core Metadata

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | ✅ | Epic ID (v{major}.{minor}.{patch}) |
| `name` | string | ✅ | Display name |
| `status` | enum | ✅ | `backlog`, `active`, `done`, `archive` |
| `created` | date | ✅ | YYYY-MM-DD |
| `type` | enum | ✅ | `minor`, `major`, `patch` |
| `goal` | string | ✅ | One-line summary |
| `tasks` | array | ✅ | Can be empty `[]` |

### Optional Metadata

| Field | Type | Description |
|-------|------|-------------|
| `started` | date | When work began (YYYY-MM-DD) |
| `completed` | date | When work finished (YYYY-MM-DD) |
| `updated` | datetime | Last edit (YYYY-MM-DD HH:MM TZ) |
| `priority` | string | P0 (critical), P1 (high), P2 (medium), P3 (low) |
| `category` | string | E.g., `integration`, `tooling`, `workflow` |

### Content Fields

| Field | Type | Description |
|-------|------|-------------|
| `summary` | string | Multi-line explanation (keep <500 words) |
| `scope` | string | What's in/out of scope |
| `dependencies` | array | Blockers (other epics, external factors) |
| `references` | array | Links (docs, issues, PRs) |
| `success_criteria` | array | Measurable outcomes |
| `estimated_completion` | date | Target date (YYYY-MM-DD) |
| `notes` | string | Brief inline notes |

### Extended Fields (Complex Epics)

| Field | Type | Description |
|-------|------|-------------|
| `context` | string | Background (why this epic exists) |
| `philosophy` | string | Guiding principles |
| `phases` | array | Workflow stages (for process epics) |
| `workflows` | object | Process definitions |
| `risks` | array | Known risks + mitigations |
| `future_work` | object | Next iterations |
| `architecture_decisions` | array | ADRs (date, decision, rationale) |
| `key_insights` | object | Learnings / wisdom |

---

## Task Format

**ONLY valid format (Backstage UI parser requirement):**

```yaml
tasks:
  - text: "Task description"
    checked: false
  - text: "Another task"
    checked: true
    notes: "Optional context for this specific task"
```

**WRONG (breaks UI):**
```yaml
# ❌ Simple strings
tasks: ["Task description"]

# ❌ Emoji prefixes
tasks: ["✅ Task"]

# ❌ Markdown inside YAML
tasks:
  - "### Section\n- [ ] Task"
```

---

## Version Numbering

**Format:** `v{major}.{minor}.{patch}`

**Semantic meaning:**
- `major` - Breaking changes, large scope (e.g., v2.0.0 → v3.0.0)
- `minor` - Features, improvements (e.g., v2.1.0 → v2.2.0)
- `patch` - Bugfixes, small tweaks (e.g., v2.1.0 → v2.1.1)

**Auto-increment rule:**
- Next version = `max(existing versions) + 0.1.0`
- Example: If `v2.5.0` and `v2.6.0` exist → next is `v2.7.0`

**Project-specific counters:**
- `backstage` v2.7.0 ≠ `studio` v2.7.0
- Each project has independent versioning

---

## Epic Lifecycle

### 1. Backlog (Idea)

**State:** Exists but not prioritized

**Minimal YAML:**
```yaml
version: v2.7.0
name: "Epic Name"
status: backlog
created: 2026-03-16
type: minor
goal: "One sentence"
tasks: []
```

**Artifacts:** Epic YAML only (no channel, no assignments)

---

### 2. Intake (Thinking)

**State:** Being refined by Nicholas + business-analyst

**Additions:**
- `summary` - Multi-line explanation
- `context` - Why this epic exists
- `dependencies` - Blockers identified
- `success_criteria` - Draft goals

**Artifacts:**
- Epic YAML with expanded fields
- Problem statement clarified
- Constraints documented

---

### 3. Grooming (Alignment)

**State:** Ambiguity resolution via Mattermost

**Additions:**
- `tasks` - Populated with agent assignments
- `mattermost_channel_id` - Discussion room link
- `architecture_decisions` - Key choices documented
- `risks` - Identified and mitigated

**Artifacts:**
- Mattermost room: `#grooming-{PROJECT}-{EPIC_ID}`
- Agent bids recorded
- Task breakdown finalized
- All ambiguity resolved

**Channel lifecycle:**
- Created when epic enters grooming
- Archived when epic moves to ready/active
- Permanent link in epic.yaml for auditability

---

### 4. Ready (Execution Prep)

**State:** All tasks clear, ready for autonomous execution

**Validation:**
- Zero ambiguous tasks
- Tool access verified
- Success criteria finalized
- Rollback plan exists

**Artifacts:**
- Grooming channel archived
- Tasks locked (no more changes without re-grooming)

---

### 5. Active (Execution)

**State:** Agents working on tasks

**Updates:**
- `started` - Date set
- `tasks[].checked` - Marked as completed
- `updated` - Timestamp on changes

**Artifacts:**
- Code commits
- Test results
- Progress updates (in Mattermost OR task notes)

---

### 6. Done (Complete)

**State:** All tasks completed, approved

**Final updates:**
- `completed` - Date set
- `status: done`
- All tasks `checked: true`

**Artifacts:**
- Final documentation
- Lessons learned (in `notes.md` or `key_insights`)
- Mattermost room export (if applicable)

---

## Writing Guidelines

### Summary
- **Length:** 2-5 paragraphs (500 words max)
- **Content:** Context, motivation, high-level approach
- **Avoid:** Implementation details (→ notes.md)

### Goal
- **Length:** 1-3 sentences
- **Format:** "Enable {capability} so that {outcome}"
- **Example:** "Enable agents to participate in Mattermost channels so that grooming sessions can happen collaboratively"

### Tasks
- **Format:** Action verb + deliverable
  - ✅ "Implement WebSocket event filtering"
  - ✅ "Document bot permission requirements"
  - ❌ "Work on Mattermost stuff"
  - ❌ "Fix the thing"
- **Granularity:** 1-4 hours of work each
- **Ownership:** Assign to specific agent (if known)

### Scope
- **Structure:**
  ```
  In scope:
  - Feature X
  - Use case Y
  
  Out of scope:
  - Feature Z (reason)
  ```
- **Purpose:** Prevent scope creep

### Success Criteria
- **Format:** Bullet list of measurable outcomes
- **Example:**
  ```yaml
  success_criteria:
    - "Bot responds to @mention in <2 seconds"
    - "3+ agents participate in grooming session"
    - "Zero manual config per new agent"
  ```

---

## Common Patterns

### Process Epic (v4.1.0 style)

**Use when:** Defining workflows, not code

**Structure:**
```yaml
phases:
  - phase: intake
    description: "..."
    entry: "..."
    exit: "..."
    artifacts: [...]
    participants: [...]

workflows:
  agent_bidding:
    trigger: "..."
    process: |
      Step-by-step flow

architecture_decisions:
  - date: YYYY-MM-DD
    decision: "..."
    rationale: |
      Why this choice
```

---

### Implementation Epic (v0.26.0 style)

**Use when:** Building features, fixing bugs

**Structure:**
```yaml
tasks:
  - text: "Implement X"
    checked: false
  - text: "Test Y"
    checked: false
  - text: "Document Z"
    checked: false

dependencies:
  - Epic v1.0.0 (foundation)

references:
  - PR: https://github.com/...
```

---

### Research Epic

**Use when:** Exploring options, not building yet

**Structure:**
```yaml
goal: "Evaluate {options} for {problem}"

tasks:
  - text: "Research option A (pros/cons)"
  - text: "Benchmark option B (performance)"
  - text: "Document recommendation"

success_criteria:
  - "Decision documented with rationale"
  - "Benchmark results reproducible"
```

---

## Anti-Patterns

### ❌ Markdown inside epic.yaml

**Problem:** UI parser breaks

```yaml
# WRONG
summary: |
  # Epic v2.7.0
  
  ## Context
  - Point 1
  - Point 2
```

**Fix:** Use plain text, or move to `index.md`

---

### ❌ Vague tasks

**Problem:** Agents don't know what to do

```yaml
# WRONG
tasks:
  - text: "Fix Mattermost"
  - text: "Make it work"
```

**Fix:** Be specific

```yaml
# RIGHT
tasks:
  - text: "Diagnose WebSocket event filtering in monitor.ts"
  - text: "Test bot mention detection with test messages"
```

---

### ❌ Nested structure in tasks

**Problem:** Parser expects flat array

```yaml
# WRONG
tasks:
  group1:
    - text: "Task A"
  group2:
    - text: "Task B"
```

**Fix:** Use flat list + notes for grouping

```yaml
# RIGHT
tasks:
  - text: "[Phase 1] Task A"
    checked: false
  - text: "[Phase 1] Task B"
    checked: false
  - text: "[Phase 2] Task C"
    checked: false
```

---

### ❌ Epic as knowledge dump

**Problem:** 20KB YAML = slow UI, hard to read

**Fix:** Split content

```
epics/v2.7.0/
├── epic.yaml      # <1KB (metadata + tasks)
├── index.md       # Human narrative
├── notes.md       # Technical deep dive
└── decisions.md   # Architecture decisions
```

---

## Mattermost Integration

**When grooming:**

### Create channel
- **Name:** `#grooming-{PROJECT}-{EPIC_ID}`
  - ✅ `#grooming-backstage-034`
  - ❌ `#grooming-v2.7.0-mattermost` (version changes)
- **Type:** Private
- **Participants:** Nicholas + approved agents + business-analyst

### Record in epic.yaml
```yaml
mattermost_channel_id: "xyz123"
mattermost_url: "http://localhost:8065/..."
```

### Archive when done
- When epic moves to `ready` or `active`
- Channel stays archived (auditability)
- Link in epic.yaml remains permanent

### Commands
- `/decision {text}` - Record architectural decision
- `/task {agent} {task}` - Add task to epic
- `/risk {description}` - Document risk

---

## Tools

### Create epic
```bash
backstage epic create "Epic Name"
# Auto-generates next version, opens editor
```

### Add task
```bash
backstage epic task "Implement X"
# Appends to current epic's tasks
```

### Update status
```bash
backstage epic status active
backstage epic complete
```

### View
```bash
backstage read epics/v2.7.0/epic.yaml
# Renders in terminal (Mermaid diagrams, tables, etc.)
```

---

## Examples

### Simple (Backlog)
See: `epics/v0.28.0/epic.yaml` (Project-Level Library Topics)

### Complex (Active)
See: `epics/v4.1.0/epic.yaml` (Epic Phases)

### Done
See: `epics/v0.26.0/epic.yaml` (Context Switch Merge)

---

## Lessons Learned

### From v2.7.0 creation attempt

**Mistake:** Tried to create epic with Markdown sections inside YAML

**Result:** Epic invisible in UI (parser choked)

**Fix:** Minimal YAML + separate `.md` files

**Rule:** Trust the spec. UI expects structure, not novel.

---

### From v4.1.0 (Epic Phases)

**Insight:** Process epics need different structure than implementation epics

**Solution:** Extended schema (`phases`, `workflows`, `philosophy`)

**Rule:** Adapt format to epic type, but keep `epic.yaml` minimal

---

## Quick Reference

**Backlog epic (5 minutes):**
```yaml
version: v2.7.0
name: "Epic Name"
status: backlog
created: 2026-03-16
type: minor
goal: "One sentence"
tasks: []
```

**Active epic (30 minutes):**
```yaml
version: v2.7.0
name: "Epic Name"
status: active
created: 2026-03-16
started: 2026-03-16
type: minor
priority: P1
category: integration

summary: |
  Multi-line explanation (2-3 paragraphs)

goal: |
  Measurable outcome

tasks:
  - text: "Task 1"
    checked: false
  - text: "Task 2"
    checked: false

success_criteria:
  - "Criterion 1"
  - "Criterion 2"
```

---

**Created:** 2026-03-16  
**Last updated:** 2026-03-16 15:56 EDT  
**Location:** `~/Backstage/documentation/epics.md`
