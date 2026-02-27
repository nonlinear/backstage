# talk2.md Triage - Decisions Log

**Date:** 2026-02-23

**Source:** talk2.md (ChatGPT conversation about Check Library + Agents)

---

## Key Decisions

### Check Library Architecture

**Check library = Company DNA** (reusable, modular, portable)

- Checks are reusable assets across projects/domains
- Quality standards can be shared with collaborators
- Modular design allows swapping checks on-the-fly
- Enables scenario testing (simulate pipeline changes)

### Separation of Concerns

**PM tool (OpenProject/Plane) + Agent orchestration (custom)**

- PM layer: ROADMAP, epics, tasks, Gantt, time tracking
- Orchestration layer: Agent workflow, check execution, quality gates
- Both open source, connected via API
- "Last mile" integration only (not rebuilding existing tools)

### Check File Format

**YAML metadata + external code** (not inline Python in .check files)

**Why:**
- Clean versionamento semântico
- Testability (fixtures, snapshots)
- Execution isolation (sandbox safety)
- CI/CD compatibility
- Future containerization path

**Structure:**
```
spacing-consistency/
├── check.yaml       # Metadata
├── executor.py      # Logic
├── fixtures/        # Test data
└── README.md        # Docs
```

### Determinism Levels

**3 classification levels:**

1. **Strict** - Same input → same output (spacing, disk usage)
2. **Contextual** - Depends on external API (Lighthouse score)
3. **LLM-assisted** - Depends on model (design critique)

**Each check declares its determinism level in metadata.**

### Synthetic Company Model

**Agents = employees (human or AI doesn't matter)**

- Highly auditable (git commits = decision trail)
- Each agent has: name, library (3 books), checks, APIs, repository, journal
- Proactive participation (agents can self-nominate or decline epics)
- Domain-based organization (UXR, Design, Dev, Marketing, Legal, Growth, Infrastructure)

### Pipeline Evolution Strategy

**High maintenance → plateau → sample-based**

1. **Start:** Nicholas approves everything (high maintenance)
2. **Plateau:** Checks robust enough (≥90% auto-approve)
3. **Mature:** Sample-based review (trust + spot checks)

**Goal:** Nicholas exits the loop as checks mature.

### Epic Participation Model

**Proactive stakeholder engagement**

- All applicable domains MUST participate in grooming
- Domains can self-nominate ("I need to be in this epic")
- Domains can decline ("Not relevant to me")
- Business Analyst coordinates stakeholder mapping
- No ambiguity allowed at Work stage (grooming must be complete)

### Gantt for Past & Future

**Gantt charts serve dual purpose:**

**Future (Planning):**
- Roadmap → visualize epics over time
- Epic → visualize tasks in parallel/cascade

**Past (Audit):**
- Historical Gantt shows who did what, when
- Time real vs estimated
- Bottleneck detection (where work stalled)
- Process Specialist uses this for optimization proposals

---

## Architecture Decisions

### Storage Location

**Pending decision:** `~/Documents/checks/` vs separate repo

**Considerations:**
- Check library = product (not just internal tool)
- May need separate versioning from app code
- Future marketplace potential

### Execution Model

**Start with Python** (pragmatic) → **Containerize later** (scalable)

**Phase 1:** Python-based checks with standard I/O (JSON in/out)
**Phase 2:** Container-per-check (stdin → JSON, stdout → JSON, exit code)

### Quality Profile System

**Idea:** `design-default-v1` instead of repeating checks per task

**Task references profile:**
```yaml
quality_profile: design-default-v1
```

**Profile defines checks:**
```yaml
design-default-v1:
  - spacing-consistency >= 0.95
  - color-palette.violations == 0
```

**Avoids YAML duplication in every task.**

---

## Integration Points

### OpenProject/Plane Integration

**Task declaration format:**
```yaml
---
domain: design
checks:
  - spacing-consistency
  - color-palette
success_criteria:
  - spacing-consistency.score >= 0.95
  - color-palette.violations == 0
---
```

**Agent workflow:**
1. Pick task from PM tool (via API)
2. Read `checks: []` declaration
3. Load checks from library
4. Execute checks
5. Update task status (Pass/Fail + report)

### Librarian Integration

**Topic research → check proposals → validation → executable**

**NOT:** Arbitrary check generation (self-mutating governance = dangerous)

**IS:** Librarian generates check proposals, human validates, then becomes executable

**Example:** Research "chaos magick rituals" → proposes `ritual-completion.check` → Nicholas validates → becomes domain check

---

## Open Questions (from talk2)

1. **Check storage location:** `~/Documents/checks/` or separate repo?
2. **Agent personality names:** Role titles (Design Agent) or actual names (Maya, Alex)?
3. **Repository structure:** One repo per agent or monorepo?
4. **Orchestrator scenario simulation:** How to implement what-if analysis?
5. **Mobile app:** iPhone status viewer - build or defer?

---

**This log captures architectural decisions from talk2.md that will shape the synthetic company infrastructure.** 🏴
