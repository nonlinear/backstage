# Critical Mistake: Working Outside Epic

**Date:** 2026-03-09  
**What Happened:** We did the work FIRST, created epic AFTER

---

## The Error

### What We Did (Wrong)
1. Started work on main branch (values compaction, agent creation)
2. Made 10 commits with actual work
3. THEN created epic structure
4. THEN rebobinado main to clean it up

### What We Should Have Done (Right)
1. Create epic FIRST (`epic.yaml`, `index.md`)
2. Create branch (`v3.1.0`)
3. Do ALL work on branch
4. Main stays clean (only epic marker commits)

---

## Why This Matters

### Problem 1: Main Branch Pollution
- Main had 10 work commits (should be clean)
- Had to revert/reset (confusing git history)
- Epic marker commits mixed with work commits

### Problem 2: Lost Context
- Epic documentation created AFTER work
- Had to reconstruct what we did (from memory)
- Timeline fragmented (notes scattered)

### Problem 3: Legibility Lost
- Future self won't understand progression
- "Why did we do X before Y?"
- Epic notes = post-hoc rationalization (not real-time decisions)

---

## The Fix

**Rebobinado main:**
```bash
git reset --hard e06cc42  # Before all work
```

**Moved work to branch:**
```bash
git branch v3.1.0  # Contains all 10 commits
```

**Main now clean:**
- Only epic creation commits
- No work-in-progress

**Branch has work:**
- All 10 original commits
- Plus epic documentation (created properly this time)

---

## Lesson Learned

### Epic-Driven Development (Correct Pattern)

**BEFORE any work:**
1. Create `projects/<project>/epics/vX.Y.Z/` folder
2. Write `epic.yaml` (goal, tasks, metadata)
3. Write `index.md` (overview, philosophy)
4. Commit: "Create epic vX.Y.Z"
5. Create branch: `git checkout -b vX.Y.Z`

**DURING work:**
6. Do work on branch (commits as normal)
7. Document decisions in epic notes (real-time)
8. Update `epic.yaml` tasks (check off as done)
9. All commits on branch (main untouched)

**AFTER epic complete:**
10. Merge branch to main
11. Epic status: active → published
12. Branch can be deleted (work in main now)

---

## Why Epic Infrastructure Matters

**Nicholas said:** "eh IMPORTANTE que tenhamos essas informacões, legibility for our future selves"

**Epic folder = complete reconstruction:**
- What we did (commits on branch)
- Why we did it (notes, decisions, analysis)
- How we did it (session timeline, thought process)
- What we learned (mistakes, insights)

**Without epic folder:**
- Git commits show WHAT changed
- But not WHY we chose that approach
- Not WHAT ELSE we considered
- Not WHAT FAILED before we found solution

---

## Commit Message Pattern

**Epic creation (main):**
```
Create epic v3.1.0: Agent Placeholders (active)
```

**Work commits (branch):**
```
Compact values: delete transcript, merge overlapping (-57% words)
Create squad structure: 7 squads with squad.yaml
Create 21 agent placeholders from ai-agents-domains.md
```

**Documentation (branch):**
```
Document epic v3.1.0: decisions, injection model, values analysis
```

**Epic completion (main, after merge):**
```
Merge epic v3.1.0: Agent Placeholders (published)
```

---

## Questions for Future

**Q:** Should epic folder be ON BRANCH or ON MAIN?  
**A:** ON BRANCH! Everything epic-related lives on branch until merge.

**Q:** When does epic folder appear on main?  
**A:** When branch merges (epic complete, published).

**Q:** Can we work on epic without branch?  
**A:** NO. Epic = branch. No branch = no epic (just idea in backlog).

---

**Status:** Mistake documented, pattern clarified, won't repeat 🏴
