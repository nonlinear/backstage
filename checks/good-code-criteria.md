# Good Code Criteria

**DESCRIPTION:** Validate code meets quality standards before grooming → ready transition  
**TYPE:** interpretive (probabilistic)  
**SCOPE:** organization  
**TRIGGER:** Epic status change (grooming → ready)

---

## What This Check Does

AI reviews epic implementation against Simon Willison's "good code" criteria.

Reports pass/fail with evidence. Failed checks → new tasks created.

---

## Criteria

### 1. Works
Code does what it's meant to do (no bugs).

**Evidence:**
- Manual testing passed
- No error logs
- Feature demonstrates expected behavior

**Fail if:** Untested, crashes, wrong output

---

### 2. We Know It Works
Tests confirm functionality.

**Evidence:**
- Test suite exists (`tests/` folder)
- Tests run and pass
- Coverage >80% (configurable)

**Fail if:** No tests, tests fail, low coverage

---

### 3. Solves Right Problem
Addresses actual need (not tangential issue).

**Evidence:**
- Epic `goal` clearly achieved
- Stakeholders confirm (grooming discussion)
- Library research cited in notes

**Fail if:** Solves different problem, no stakeholder validation

---

### 4. Handles Errors Gracefully
Error cases considered, not just happy path.

**Evidence:**
- Try/catch blocks present
- Error messages informative
- Edge cases tested

**Fail if:** Crashes on invalid input, silent failures

---

### 5. Simple/Minimal
Does only what's needed (YAGNI).

**Evidence:**
- No unused code
- No premature optimization
- Single responsibility per function

**Fail if:** Overengineered, future-proofing without need

---

### 6. Protected by Tests
Regression suite prevents future breaks.

**Evidence:**
- Tests exist for new features
- Tests would catch regressions
- CI runs tests on every commit

**Fail if:** Tests missing, no CI integration

---

### 7. Documented
Docs reflect current state (not stale).

**Evidence:**
- README updated
- API docs match implementation
- Inline comments explain "why" (not "what")

**Fail if:** Docs outdated, missing, or wrong

---

### 8. Affords Future Changes
Design allows modifications without rewrite.

**Evidence:**
- Modular architecture
- Decoupled components
- Extensible interfaces

**Fail if:** Hardcoded values, tight coupling, monolith

---

## Usage

**AI reads epic notes, commits, diffs, tests.**

**For each criterion:**
- ✅ PASS = evidence found
- ❌ FAIL = evidence missing or contradicted

**Output report:**

```markdown
## Good Code Criteria Report

### ✅ Passed (6)
- Works (manual test confirmed)
- Handles errors (try/catch blocks present)
- Simple/minimal (no unused code)
- Protected by tests (86% coverage)
- Documented (README updated)
- Affords future (modular design)

### ❌ Failed (2)

#### We Know It Works
**Reason:** Test coverage 65% (required 80%)
**Evidence:** `pytest --cov` output
**Action:** Create task "Add tests to reach 80% coverage"

#### Solves Right Problem
**Reason:** No library research cited
**Evidence:** `notes.md` empty, no 📕 citations
**Action:** Create task "Consult libraries, document findings"

---

**Outcome:** FAIL (2 criteria not met)
**Recommendation:** Address failures before ready → done
```

---

## Conservative Heuristic

When in doubt, **FAIL** (better false negative than false positive).

If unsure whether criterion met → request evidence from agent.

---

## Reference

[Simon Willison - Writing code is cheap now](https://simonwillison.net/guides/agentic-engineering-patterns/code-is-cheap/)
