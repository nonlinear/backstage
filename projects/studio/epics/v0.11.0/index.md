# v0.11.0 - Memory Architecture Refinement

## Context Snapshot
- **Why this exists:** Design cognitive system for stateless AI + stateful human collaboration
- **Problem solved:** Memory pollution, unclear file lifecycle, decision vs exploration confusion
- **Date:** 2026-02-14
- **Assumptions:** AI sessions are stateless, Nicholas prefers structured tables, git history = versioning

---

## Core Insight (from external AI analysis)

**Three-layer memory problem, not two:**

1. **Conversation Stream** (ephemeral cognition) - Chat logs, inline discussion
2. **Working Artifact** (structured but mutable) - Epic-notes during development
3. **Decision Record** (stable, durable, searchable) - CHANGELOG + cleaned epic-notes

**Most people collapse (2) and (3). That's where pollution begins.**

---

## Proposed Architecture: Dual-Artifact Model

### Layer 1 — Scratch (Ephemeral Working Memory)
- **Purpose:** Thinking, iteration, exploration
- **Form:** Conversation OR `epic-notes/__working/` temporary files
- **Lifetime:** Hours to days
- **Searchable:** No
- **Authoritative:** No

**This is your "staging area". Chaos is allowed here.**

---

### Layer 2 — Decision Artifact (Immutable Concept File)
- **Purpose:** Durable reference for both AI + Nicholas
- **Form:** One MD per complete concept
- **Lifetime:** Permanent
- **Searchable:** Yes
- **Authoritative:** Yes

**This is not a transcript. This is a cleaned synthesis.**

---

## File Lifecycle Protocol

### Phase 0 — Exploration (Inline First)
Default to inline conversation **unless:**
- Tables exceed readability
- 2+ structural reorganizations needed
- Multi-session likely
- Requires side-by-side scanning

**If none of those: stay inline.**

---

### Phase 1 — Promote to Working File (Optional)
Create `epic-notes/__working/analysis.md` **ONLY if:**
- Structural iteration needed
- Visual density high
- Requires multiple passes

**Mark explicitly:**
```markdown
Status: WORKING
Authority: NONE
Delete-after: synthesis
```

**This prevents accidental permanence.**

---

### Phase 2 — Synthesis Gate (The Commit Trigger)
Before creating permanent file, ask:

1. Has the structure stabilized?
2. Are we making micro-adjustments only?
3. Is a decision emerging?
4. Would future-you benefit from a clean version?

**If 3 of 4 = yes → synthesize.**

---

### Phase 3 — Create Decision Artifact
Create: `epic-notes/vX.Y.Z/analysis-name.md`

**This file contains:**
- Final tables
- Explicit decision
- Rationale
- Constraints
- Trade-offs
- "Why not the alternatives"
- Date
- Assumptions
- **Context Snapshot header**

**This is not iteration history. This is judgment crystallized.**

---

### Phase 4 — Cleanup
**Delete:**
- Working files (`__working/`)
- Temporary drafts

**Retain:**
- Conversation log (in session history)
- Final artifact (epic-notes/)

---

## Memory vs File Separation

### Memory (Compact, AI-Oriented)
**Memory should contain:**
- Decision summary (1–5 lines)
- WHERE artifact lives (pointer)
- Key constraint signals

**Example:**
```markdown
## Mac Studio Purchase (2026-02-14)
Chose M4 Max 64GB over Ultra (cost/performance ratio).
Primary workload: embeddings + video rendering.
See: ~/Documents/nonlinear/backstage/epic-notes/mac-studio-comparison-table.md
```

**Memory is an index. Not storage.**

---

### File (Human-Oriented)
**File contains:**
- Tables
- Context
- Trade-off reasoning
- Reversibility notes
- Edge cases

**The file serves Nicholas. Memory serves future-AI.**

---

## Granularity Rule: When to Create Separate File

**Create a permanent MD when:**
- It influences money
- It influences architecture
- It influences long-term direction
- It required comparison matrix
- You argued with yourself for >15 min

**Do NOT create file when:**
- It's a quick config tweak
- It's reversible and trivial
- It's pure exploration
- It won't matter in 30 days

---

## Search Strategy (Hybrid, Ordered)

**1️⃣ Memory-first (for intent)**
Find:
- "What did we decide?"
- "Where is the file?"

**2️⃣ File-second (for depth)**
Open artifact for:
- Details
- Tables
- Assumptions

**Never search working files. Working files should never survive synthesis.**

---

## Implementation Tasks

### ✅ Completed (Patch)
- [x] Add Context Snapshot template to global POLICY.md

### 📋 Remaining (Epic Work)
- [ ] Add `__working/` subfolder convention to epic-notes structure
- [ ] Refactor MEMORY.md to index format (pointers, not content duplication)
- [ ] Create file granularity checklist in POLICY.md
- [ ] Document synthesis gate protocol (when ROADMAP → CHANGELOG)
- [ ] Add auto-cleanup `__working/` to backstage-start (after epic merge)
- [ ] Apply Context Snapshot headers to existing decision files

---

## Key Principles

### 1. Delete the Right File
**Never delete decision artifact.**
**Always delete working file after synthesis.**

Working = disposable.
Artifact = sacred.

---

### 2. Never Update Decision Artifact Silently
If revision needed:
- Create: `analysis-v2.md`
- OR append: `## Revision 2026-03-01`

**This prevents invisible drift.**

---

### 3. Exploration is Disposable, Decisions are Sacred
**Don't mix them.**

Scratch pad = whiteboard (gets erased)
Decision artifact = architectural spec (goes in binder)
Memory = index card in cabinet (tells you where spec lives)

---

## What We Already Do Right

✅ **Three-layer separation:**
- Conversation (chat) / Working (epic-notes during epic) / Decision (CHANGELOG)

✅ **Epic-notes as working artifact:**
- Session logs during development
- Chaotic, mutable, exploratory

✅ **CHANGELOG as decision record:**
- Past tense, immutable, clean synthesis

✅ **Git history as versioning:**
- Commits = revisions
- No need for v2 files (can revert via git)

---

## What We Need to Add

### 1. Explicit `__working/` subfolder
**Purpose:** Temporary files that auto-delete after synthesis

**Structure:**
```
epic-notes/
├── __working/           # Temp files (delete after synthesis)
│   ├── scratch.md
│   └── exploration.md
└── vX.Y.Z/              # Stable session logs + decision artifacts
    ├── MAIN.md
    └── analysis.md
```

---

### 2. MEMORY.md as Index (Not Storage)
**Current problem:** MEMORY.md duplicates content from epic-notes, CHANGELOG, etc.

**Solution:** Refactor to pointer format:
```markdown
## Decision Title (Date)
One-line summary.
See: path/to/file.md
```

---

### 3. File Granularity Checklist
Add to POLICY.md:
```markdown
## File Creation Gate

Use this checklist:
- [ ] Is this a decision?
- [ ] Is it multi-variable?
- [ ] Will I revisit it?
- [ ] Is it non-trivial to reconstruct?
- [ ] Would future-me be annoyed if it vanished?

If ≥3 yes → file.
Else → inline.
```

---

### 4. Synthesis Gate Protocol
**When to move ROADMAP → CHANGELOG:**

Ask:
1. Has the structure stabilized?
2. Are we making micro-adjustments only?
3. Is a decision emerging?
4. Would future-you benefit from a clean version?

**If 3 of 4 = yes → ready to merge.**

---

## Success Criteria

✅ **MEMORY.md = index** (WHERE decisions live), not storage
✅ **Epic-notes = working artifact** (session logs) + decision artifact (cleaned synthesis)
✅ **Clear protocol** for file creation vs inline conversation
✅ **Stateless AI** can reconstruct context from headers alone
✅ **No pollution:** Working files deleted, decision artifacts preserved

---

## Open Questions

1. **Should we version Context Snapshot template?** (v1, v2 as it evolves?)
2. **Auto-cleanup `__working/` during backstage-start?** (safe? or risky?)
3. **Apply headers retroactively to existing files?** (one-time migration task?)

---

## References

- External AI analysis (2026-02-14 23:35 EST) - "Three-layer memory problem"
- Hebbian memory architecture (AGENTS.md) - "Links matter more than content"
- Global POLICY.md - Context Snapshot template (added 2026-02-14)

---

**Status:** 🏗️ PLANNING (epic created, not started)
**Next step:** Review with Nicholas, approve tasks, create branch when ready
