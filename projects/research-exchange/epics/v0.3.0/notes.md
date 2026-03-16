# v0.3.0 True Parity - Notes

## Session 2026-03-16 (12:30-12:43)

### Problem Diagnosis

**Trigger:** Librarian v0.27.0 marked done → merged to main → covers broken

**Root cause analysis:**
1. Agent edited code without seeing result
2. Claimed "done" based on code inspection only
3. No visual verification protocol
4. Merged broken code to main

**AGENTS.md quote violated:**
> "Visual Tools Are Mandatory (UI/Frontend Work): Programar sem ver resultado = suicídio."

### Key Realizations

**Nicholas clarification:**
- Commits = unrestricted (quebrado OK dentro de branch)
- Afirmações (task ✓, epic done) = require verification
- Git hook would block normal dev workflow (wrong approach)

**Agent can't:**
- See `headless=False` browser window
- Do visual inspection like human

**Agent can:**
- Run Playwright headless tests
- DOM inspection + assertions
- Screenshot capture
- Automated verification

### Solutions Discussed

**Option A: Protocol enforcement (trust-based)**
```markdown
BEFORE checking task OR marking epic done:
1. Run Playwright test with assertions
2. Test MUST pass
3. Screenshot captured + committed
4. Reference screenshot in task notes/commit
```

**Option B: Technical enforcement**
- Git hook (rejected - blocks commits)
- CI check (possible - blocks merge)
- Pre-task-check script (possible)

**Option C: Visual regression (future)**
- Chromatic, Percy, Applitools
- Auto-screenshot comparison
- Baseline management

### Next Steps

1. Research industry solutions (Task 1)
2. Define protocol in AGENTS.md (Task 2)
3. Implement Playwright tests for Librarian (Task 3)
4. Choose + implement enforcement (Task 4)

---

## Research Keywords

- Visual regression testing
- Component development tools
- UI snapshot testing
- Storybook
- Chromatic
- Percy
- Applitools
- Git hooks for UI verification
- Playwright assertions
- Next.js testing patterns

---

## Lessons Learned

**Trust without verification = broken code.**

Agent needs:
- Clear protocol (what to do)
- Automated tools (how to verify)
- Enforcement (prevent shortcuts)

**Philosophy:**
> "Config ≠ Working. TEST, then report. Never claim 'it works' without proof."
