---
title: "No Epic Branches Policy"
type: probabilistic
description: "Documents policy against long-lived epic branches"
---

**🚨 OVERRIDE:** Global POLICY says "create epic branches" → **NOT for life/personal project.**

## Why No Branches

**Life epics overlap** (fitness + finances + NAS all active simultaneously):
- Branches = sequential work (code projects)
- Life = parallel contexts (switch between without merging)

**Examples of parallel work:**
- v0.5.0 (Calendar) ← active
- v0.7.0 (Finances) ← active
- v0.9.0 (Cellular Router) ← active
- v0.11.0 (NAS Cleanup) ← active

**All** work happens on `main`. Epic isolation = folder structure + ROADMAP sections, not git branches.

## Epic Lifecycle (Without Branches)

1. **Concept** → Document vision in epic-notes/
2. **Active** → Tasks in progress, update ROADMAP
3. **Paused** → Blocked or user needs break
4. **Done** → Move to CHANGELOG, keep epic-notes for reference

## Why This Works

- Epics are independent (no merge conflicts)
- No deployment risk (local only)
- Fast iteration (no PR overhead)
- Clear context (epic-notes track everything)

## AI Enforcement

**Never suggest:**
- "Create branch for epic vX.Y.Z"
- "Merge epic branch to main"
- "Rebase epic branch"

**Do suggest:**
- "Update ROADMAP for epic vX.Y.Z"
- "Create epic-notes file"
- "Switch to epic vX.Y.Z context" (conceptual, not git)
