# Epic Status Lifecycle

**Status workflow for epic.yaml**

## Status Options

### Planning
**Ready for planning, needs grooming**
- Epic exists but needs detail
- Tasks undefined or ambiguous
- Requires discussion/refinement
- **Not ready for execution**

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
              ↓                        ↓
           Backlog ←-------------------┘
```

**Key transitions:**
- Planning → Ready: Grooming complete, unambiguous
- Ready → Active: Work started, branch created
- Active → Review: Night shift done, checks need human
- Review → Published: Approved, merged to main
- Any → Backlog: Deprioritized

## Philosophy

**Status = execution readiness**
- Planning: Human needed (grooming)
- Ready: Agent ready (autonomous)
- Active: Work happening
- Review: Human needed (validation)
- Published: Done (visible)
- Backlog: Not now
