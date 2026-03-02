# v3.0.0 - From Flat to Cascading

## Goal

Add dependency tracking for epics and tasks.

## Philosophy

**v2.0 = centralized and flat**
- Covers current needs
- Simple structure
- No dependencies tracked

**v3.0 = cascading dependencies**
- Epic depends on epic
- Task depends on task
- Validation enforces order
- Auto-scheduling possible

## Why Later (v3.0 not v2.x)

**Dependency tracking = significant work:**
- Schema changes (epic.yaml, task structure)
- Validation logic (circular deps, missing deps)
- Execution engine (respect order)
- GUI updates (visualize dependency graph)

**v2.0 sufficient for now:**
- Manual coordination works
- Adds complexity without immediate value
- Focus on foundation first

## Approach

1. Define dependency syntax (epic/task level)
2. Validation (circular detection, missing refs)
3. Execution engine (respect order)
4. Migration path (add deps to existing epics)

## Status

Planning (deferred until v2.x complete).
