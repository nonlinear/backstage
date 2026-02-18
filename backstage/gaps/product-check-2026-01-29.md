# Backstage Product Validation Check

> Metrics for success/failure of backstage v0.2.0 workflow components

**Date:** 2026-01-29
**Branch:** v0.2.0
**Requestor:** nfrota

---

## 🎯 Components Being Tested

1. **backstage-start** - Pre-commit validation workflow
2. **backstage-close** - Session end workflow
3. **backstage-update** - Framework update prompt
4. **backstage-update.py** - Python update script

---

## 1️⃣ backstage-start

**File:** `.github/prompts/backstage-start.prompt.md`

### Success Metrics

| Metric                       | Target                     | Actual                     | Status |
| ---------------------------- | -------------------------- | -------------------------- | ------ |
| Reads README 🤖 block        | MUST find file paths       | Has STEP 0                 | ✅     |
| Runs global + project CHECKS | MUST run both              | Polycentric check          | ✅     |
| Stops on failures            | MUST not proceed           | STEP 2C gate               | ✅     |
| Auto-updates ROADMAP         | SHOULD mark checkboxes     | STEP 3A                    | ✅     |
| Auto-updates CHANGELOG       | SHOULD move complete epics | STEP 3B                    | ✅     |
| References global/POLICY.md  | **MUST not hardcode**      | **Has hardcoded examples** | ❌     |
| 5 outcomes                   | MUST provide outcome       | STEP 4 has all 5           | ✅     |
| Time context                 | SHOULD show last worked    | Has time analysis          | ✅     |

**Result: ⚠️ 7/8 PASS** (87.5%)

**Critical Issue:**

- ROADMAP task: "Update backstage-start prompt to reference global/POLICY.md for syntax"
- Found: Only 1 reference in polycentric section
- Problem: **Epic format examples hardcoded in STEP 3A** instead of saying "Read from global/POLICY.md"

**Example of violation:**

```markdown
# STEP 3A in backstage-start.prompt.md

> **v0.3**
> [🚧](link) **Delta Indexing**
```

**Should be:**

```markdown
# Read epic format from global/POLICY.md section "Epic Format"

# Do not hardcode - user may customize syntax
```

---

## 2️⃣ backstage-close

**File:** `.github/prompts/backstage-close.prompt.md`

### Success Metrics

| Metric           | Target                    | Actual              | Status |
| ---------------- | ------------------------- | ------------------- | ------ |
| Runs CHECKS      | MUST validate             | Step 1              | ✅     |
| Handles failures | MUST add fixes to ROADMAP | Step 2 w/ format    | ✅     |
| Push on success  | MUST commit+push          | Step 3 git commands | ✅     |
| Victory lap      | SHOULD be brief           | "not verbose"       | ✅     |
| Body check       | SHOULD remind             | Step 5              | ✅     |
| Fix task format  | SHOULD use 🔧             | Shows prefix        | ✅     |

**Result: ✅ 6/6 PASS** (100%)

**Notes:**

- Well-designed workflow
- Handles both success and failure paths clearly
- Respects user context (brief victory lap)

---

## 3️⃣ backstage-update (prompt)

**File:** `.github/prompts/backstage-update.prompt.md`

### Success Metrics

| Metric                  | Target               | Actual           | Status |
| ----------------------- | -------------------- | ---------------- | ------ |
| Check current version   | MUST read local      | Step 1           | ✅     |
| Fetch remote CHANGELOG  | MUST get from GitHub | Step 2 (blocked) | 🚧     |
| Compare versions        | MUST show diff       | Step 3           | ✅     |
| Show changes            | SHOULD list epics    | Step 3 format    | ✅     |
| User confirmation       | MUST ask yes/no      | Step 4           | ✅     |
| Call .py script         | MUST execute         | Step 5           | ✅     |
| Suggest backstage-start | SHOULD remind        | Step 6           | ✅     |

**Result: 🚧 6/7 PASS** (86%) - **Blocked on infrastructure**

**Blocker:**

- Repo not published to GitHub yet
- Can't test actual fetching
- Prompt logic is correct, waiting on `https://github.com/nonlinear/backstage`

---

## 4️⃣ backstage-update.py

**File:** `global/backstage-update.py`

### Success Metrics - Initial Scaffolding

| Metric                 | Target                    | Actual          | Status |
| ---------------------- | ------------------------- | --------------- | ------ |
| Detect missing files   | MUST check existence      | Not implemented | ❌     |
| Copy templates         | MUST copy to root         | Not implemented | ❌     |
| Create ROADMAP         | MUST create from template | Not implemented | ❌     |
| Create CHANGELOG       | MUST create from template | Not implemented | ❌     |
| Create POLICY          | MUST create from template | Not implemented | ❌     |
| Create CHECKS          | MUST create from template | Not implemented | ❌     |
| Create .github/prompts | MUST copy 3 prompts       | Not implemented | ❌     |

**Result: ❌ 0/7 PASS** (0%)

### Success Metrics - Framework Updates

| Metric                        | Target           | Actual          | Status |
| ----------------------------- | ---------------- | --------------- | ------ |
| Fetch global/POLICY.md        | MUST download    | Not implemented | ❌     |
| Fetch global/HEALTH.md        | MUST download    | Not implemented | ❌     |
| Fetch backstage-update.py     | MUST self-update | Not implemented | ❌     |
| Fetch backstage-start.prompt  | MUST download    | Not implemented | ❌     |
| Fetch backstage-close.prompt  | MUST download    | Not implemented | ❌     |
| Fetch backstage-update.prompt | MUST download    | Not implemented | ❌     |
| Preserve project files        | MUST not touch   | N/A             | N/A    |

**Result: ❌ 0/6 PASS** (0%)

**Current State:**

```python
print("⚠️  This script is a placeholder.")
```

**Complete failure - no implementation exists.**

---

## 📊 Overall Assessment

### Component Health

| Component                 | Score | Status              | Shippable?             |
| ------------------------- | ----- | ------------------- | ---------------------- |
| backstage-start           | 87.5% | ⚠️ Minor fix needed | **After 1 fix**        |
| backstage-close           | 100%  | ✅ Pass             | ✅ **YES**             |
| backstage-update (prompt) | 86%   | 🚧 Blocked          | **After repo publish** |
| backstage-update.py       | 0%    | ❌ Fail             | ❌ **NO**              |

### v0.2.0 Shippability: ❌ **NOT READY**

**Blockers:**

1. **CRITICAL:** backstage-update.py has zero implementation
2. **IMPORTANT:** backstage-start still hardcodes epic format (violates own spec)

---

## 🔧 Action Items to Ship v0.2.0

### Must Fix (P0)

**1. Implement backstage-update.py (0% → 100%)**

**Scaffolding mode:**

```python
# Detect: Does ROADMAP.md exist?
if not Path("ROADMAP.md").exists():
    # Initial setup
    copy("templates/ROADMAP-template.md", "ROADMAP.md")
    copy("templates/CHANGELOG-template.md", "CHANGELOG.md")
    copy("templates/POLICY-template.md", "POLICY.md")
    copy("templates/HEALTH-template.md", "HEALTH.md")
    # Copy prompts
    copy("global/../.github/prompts/*.prompt.md", ".github/prompts/")
```

**Update mode:**

```python
else:
    # Existing project - update framework
    fetch_and_replace([
        "global/POLICY.md",
        "global/HEALTH.md",
        "global/backstage-update.py",
        ".github/prompts/backstage-start.prompt.md",
        ".github/prompts/backstage-close.prompt.md",
        ".github/prompts/backstage-update.prompt.md",
    ])
```

**Estimated effort:** 2-3 hours coding + testing

---

**2. Fix backstage-start epic format reference**

**Current (wrong):**

```markdown
# STEP 3A shows hardcoded examples:

> **v0.3**
> [🚧](link) **Delta Indexing**
```

**Should be:**

```markdown
# STEP 3A: Read epic format

> 🤖 **CRITICAL:** Always read epic format from global/POLICY.md#epic-format
> User may customize syntax - NEVER use hardcoded format
```

**Estimated effort:** 15 minutes (find/replace in prompt)

---

### Should Fix (P1)

**3. Test backstage-update after repo publish**

- Publish backstage repo to GitHub
- Test full update workflow
- Verify 6 files download correctly
- Verify project files untouched

**Estimated effort:** 1 hour (after repo is public)

---

## 📈 Definition of Done

**v0.2.0 is shippable when:**

- [x] backstage-close works (already done)
- [ ] backstage-start references global/POLICY.md (not hardcoded)
- [ ] backstage-update.py scaffolds new projects (copies templates)
- [ ] backstage-update.py updates existing projects (fetches from GitHub)
- [ ] All 4 components pass their metrics
- [ ] Tested on at least 1 non-backstage project

**Current progress:** 1/6 complete (17%)

---

## 🎯 Test Protocol

### Manual Testing Checklist

**Test backstage-start:**

- [ ] Make changes on epic branch
- [ ] Run `/backstage-start`
- [ ] Verify it reads 🤖 block from README
- [ ] Verify it runs CHECKS from both global + project
- [ ] Verify it stops if checks fail
- [ ] Make a task complete, re-run
- [ ] Verify ROADMAP checkbox marked
- [ ] Verify correct commit message generated

**Test backstage-close:**

- [ ] At end of session
- [ ] Break something (fail checks)
- [ ] Run `/backstage-close`
- [ ] Verify fix tasks added to ROADMAP top
- [ ] Fix issues, re-run
- [ ] Verify commit + push happens
- [ ] Verify victory lap brief

**Test backstage-update.py scaffolding:**

- [ ] Create empty project: `mkdir test-project && cd test-project`
- [ ] Create README.md only
- [ ] Clone backstage: `git clone ... backstage`
- [ ] Run: `python backstage/global/backstage-update.py`
- [ ] Verify ROADMAP, CHANGELOG, POLICY, CHECKS created
- [ ] Verify .github/prompts/ has 3 files
- [ ] Verify files have correct content from templates

**Test backstage-update.py updates:**

- [ ] In existing backstage project
- [ ] Manually edit global/POLICY.md (add comment)
- [ ] Run: `python backstage/global/backstage-update.py`
- [ ] Verify global/POLICY.md reset (comment gone)
- [ ] Verify project ROADMAP.md untouched
- [ ] Verify all 6 framework files updated

---

**Next steps:** Implement backstage-update.py, then re-test all components
