# Epic Status Lifecycle

**Status workflow for epic.yaml**

## Status Options

### Planning
**Ready for planning, needs grooming**
- Epic exists but needs detail
- Tasks undefined or ambiguous
- Requires discussion/refinement
- **Not ready for execution**

### Blocked
**Cannot proceed (missing dependencies or clarity)**
- No planning done yet → blocked
- Not ready for night shift → blocked
- Missing information/resources
- **Waiting on something**

### Paused
**Intentionally stopped (not abandoned)**
- Work started but paused
- Waiting for external event
- Temporarily deprioritized
- **Will resume later**

### Ready
**Ready for night shift / autonomous execution**
- All ambiguities resolved
- Tasks clear and actionable
- Agents can run background (unsupervised)
- **No human needed for execution**

### Active
**Has branch, tasks incomplete**
- Work in progress
- Branch exists (epic/vX.Y.Z)
- Some tasks done, some pending
- **Currently being worked**

### Review
**Night shift completed, needs supervision**
- Agents finished work
- Some checks require human review
- Awaiting approval/feedback
- **Almost done, needs eyes**

### Published
**Merged to main, all tasks complete**
- Branch merged back to main
- All tasks completed
- **Milestone** (visible, released)
- Critical: touches many checks

### Backlog
**Not thinking about now**
- Deferred indefinitely
- No immediate priority
- May revisit later
- **Archived**

## Workflow

```
Planning → Ready → Active → Review → Published
    ↓         ↓                        ↓
 Blocked   Paused                   Backlog
    ↓         ↓                        ↑
    └─────────┴────────────────────────┘
```

**Key transitions:**
- Planning → Blocked: Missing info/dependencies
- Planning → Ready: Grooming complete, unambiguous
- Ready → Active: Work started, branch created
- Active → Paused: Intentionally stopped
- Active → Review: Night shift done, checks need human
- Review → Published: Approved, merged to main
- Any → Backlog: Deprioritized

## Night Shift Concept

**Why we need two settings (supervised vs unsupervised):**

Local AI agents run in two modes:

### Supervised (Day Mode)
- Human present (Nicholas iterating)
- Fast feedback loops
- Can correct/clarify
- **Lower reasoning models OK** (Qwen 7B/32B)

### Unsupervised (Night Shift)
- Agent works alone (Nicholas asleep)
- No human to ask questions
- Must handle ambiguity independently
- **Higher reasoning models required** (Qwen 32B/72B)

**Ready status = night shift ready:**
- Zero ambiguity in tasks
- Agent can execute without asking
- Checks validate correctness
- Human reviews results next morning

**Blocked = not night shift ready:**
- Still has questions
- Needs planning/grooming
- Would fail without human input

## Philosophy

**Status = execution readiness**
- Planning: Human needed (grooming)
- Blocked: Can't proceed (missing something)
- Paused: Stopped intentionally (resume later)
- Ready: Agent ready (autonomous)
- Active: Work happening
- Review: Human needed (validation)
- Published: Done (visible)
- Backlog: Not now
