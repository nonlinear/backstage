# Parallel Epics - Overlapping Workstreams

**Principle:** Life epics can run simultaneously, unlike code projects with sequential versions.

## How Parallel Epics Work

**Traditional code workflow:**
```
main (protected) ← PR ← feature-branch
v1.0.0 → v1.1.0 → v1.2.0 (sequential)
```

**Life project workflow:**
```
main (everything lives here)
├── epic v0.5.0 (active) - Calendar
├── epic v0.7.0 (active) - Finances
├── epic v0.9.0 (active) - Cellular Router
└── epic v0.11.0 (planned) - NAS Cleanup
```

## Why This Works

1. **Independence:** Epics don't block each other
   - Calendar work ≠ Finances work
   - Can switch contexts without merging

2. **No deployment risk:** Local only, no production impact

3. **Fast iteration:** No PR/review overhead

4. **Clear attribution:** Epic-notes track decisions per workstream

## Epic Structure

### Parallel States

- **Active** - Multiple epics can be active simultaneously
- **Paused** - Blocked or waiting, doesn't block others
- **Done** - Moved to CHANGELOG, epic-notes preserved

### Context Switching

**AI role:**
- Track which epic is "current focus"
- Switch contexts when user says "trabalhar no X"
- Load appropriate epic-notes for context
- Update ROADMAP to reflect active work

**Example:**
```
User: "vamos trabalhar no finances"
AI: Load v0.7.0 epic-notes, surface recent tasks
User: "agora quero mexer no calendar"
AI: Switch to v0.5.0 context, save finances state
```

## Documentation Rules

**ROADMAP sections:**
- Group tasks by epic (v0.X.Y headers)
- Mark status: Active, Paused, Done
- Cross-reference epic-notes

**Epic-notes:**
- One file per epic
- Living document (update as work progresses)
- Permanent record (keep after completion)

**CHANGELOG:**
- Group by epic when moved from ROADMAP
- Clear attribution (which epic delivered what)
- Discoveries documented (not just features)

## AI Enforcement

**Never assume:**
- Sequential completion (v0.5.0 must finish before v0.7.0)
- One epic at a time
- Linear progression

**Do track:**
- Which epic user is currently focused on
- State of each parallel epic
- Context needed to resume paused work
