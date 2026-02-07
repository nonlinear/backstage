# Backstage - Universal Health Metrics

> Health metrics that apply to ALL projects using backstage system.

**Purpose:** Define what "healthy" means for your project - validation tests, product metrics, and system wellness indicators.

---

## 📐 Backstage File Formatting (MANDATORY)

All backstage files (HEALTH.md, ROADMAP.md, CHANGELOG.md, POLICY.md) must be both **human-readable** and **machine-readable**.

**Rules:**

1. Each test/check = short, copy-pasteable code block
2. No large monolithic scripts
3. No markdown inside code blocks
4. Explanations outside code blocks
5. Easy for humans AND automation to parse

**Example:**

```bash
python3.11 -c "import sys; print(sys.version)"
```

Expected: Prints Python version
Pass: ✅ Python 3.11+

---

## 🤖 Navigation Block Validation

**Every backstage file must have 🤖 navigation block.**

**Test: README has navigation block**

```bash
grep -q '> 🤖' README.md && echo '✅ Navigation block exists' || echo '❌ Missing navigation block'
```

Expected: Prints '✅ Navigation block exists'
Pass: ✅ Navigation block exists

**Test: All status files have navigation block**

```bash
for file in backstage/CHANGELOG.md backstage/ROADMAP.md backstage/POLICY.md backstage/HEALTH.md; do
  grep -q '> 🤖' "$file" || echo "❌ Missing in $file"
done && echo '✅ All files have navigation blocks'
```

Expected: Prints '✅ All backstage files have navigation blocks'
Pass: ✅ All navigation blocks present

---

## � Knowledge Base Check (gaps/)

**Purpose:** Make AI mindful of existing gaps before starting work. During epic, if relevant pattern emerges, AI can suggest reading specific gap.

**Test: List existing gaps**

```bash
ls -lt gaps/ 2>/dev/null | head -10 || echo "No gaps/ directory yet"
```

Expected: Shows gap files (newest first) or message if directory doesn't exist
Pass: ✅ AI now aware of documented gaps

---

## �📊 Documentation Sync Check

**Changes in code must be reflected in ROADMAP/CHANGELOG.**

**Test: Git changes match documented work**

```bash
# Check if there are uncommitted changes
if git diff --quiet; then
  echo '✅ No uncommitted changes'
else
  echo '⚠️ Uncommitted changes - run backstage to sync docs (see https://github.com/nonlinear/backstage#installation--usage)'
fi
```

Expected: Either no changes or reminder to run /backstage-start
Pass: ✅ Clean state or acknowledged pending sync

---

## 🗂️ File Structure Validation

**Test: Required backstage files exist**

```bash
test -f README.md && \
test -f backstage/ROADMAP.md && \
test -f backstage/CHANGELOG.md && \
test -f backstage/POLICY.md && \
test -f backstage/HEALTH.md && \
test -d backstage/global && \
echo '✅ Required backstage files exist' || echo '❌ Missing required files'
```

Expected: Prints '✅ Required backstage files exist'
Pass: ✅ All required files present

**Test: Global backstage files exist**

```bash
test -f backstage/global/POLICY.md && \
test -f backstage/global/HEALTH.md && \
test -f backstage/global/backstage-update.py && \
echo '✅ Global backstage files exist' || echo '❌ Missing global files'
```

Expected: Prints '✅ Global backstage files exist'
Pass: ✅ Global files present (README.md lives at root, not in global/)

---

## 📝 Epic Format Validation

**Epics must follow standard format defined in global/POLICY.md**

**Test: ROADMAP epics use correct syntax**

```bash
grep -E '\[🚧\]\(.*\).*\*\*|⏳.*\*\*|✅.*\*\*' backstage/ROADMAP.md >/dev/null && \
echo '✅ Epic format correct' || echo '⚠️ Check epic syntax'
```

Expected: Finds properly formatted epics
Pass: ✅ Epics follow format

---

## 🔗 Link Integrity Check

**Navigation links must point to existing files**

**Test: README links are valid**

```bash
# Extract file paths from README navigation block
# (This is a simplified check - full implementation would parse markdown links)
test -f backstage/CHANGELOG.md && \
test -f backstage/ROADMAP.md && \
test -f backstage/POLICY.md && \
test -f backstage/HEALTH.md && \
echo '✅ README links valid' || echo '❌ Broken links in README'
```

Expected: All linked files exist
Pass: ✅ Links valid

---

## 🎯 Version Consistency

**CHANGELOG versions must follow semantic versioning**

**Test: Version format validation**

```bash
grep -E '^## v[0-9]+\.[0-9]+\.[0-9]+' backstage/CHANGELOG.md >/dev/null && \
echo '✅ Versions follow semver' || echo '⚠️ Check version format'
```

Expected: Finds semantic version headings
Pass: ✅ Semantic versioning

---

## Summary

**These checks ensure:**

- ✅ Documentation stays in sync with code
- ✅ Navigation works across all files
- ✅ Epics follow standard format
- ✅ Files are properly structured
- ✅ Versions follow semver
- ✅ Links aren't broken

**Run all checks:**

````bash
# From project root
bash -c "$(grep -A 1 '^```bash' backstage/global/HEALTH.md | grep -v '^```' | grep -v '^--$')"
````

---

**Last updated:** 2026-01-26
**Version:** 1.0.0

---

## 🏥 Product Health Metrics

> **What makes backstage "production ready"?**
>
> These metrics define system health across all workflow components.

### Workflow Component Health

**Success threshold:** Each component must pass ≥90% of its metrics to ship.


> **What makes backstage "production ready"?**
>
> These metrics define system health across all workflow components.

### Workflow Component Health

**Success threshold:** Each component must pass ≥90% of its metrics to ship.

---

#### backstage-start Health (8 metrics)

**Purpose:** Pre-commit validation, doc sync, determine next steps

| #   | Metric                       | Type   | Test                                  |
| --- | ---------------------------- | ------ | ------------------------------------- |
| 1   | Reads README 🤖 block        | MUST   | Has STEP 0 dedicated to finding paths |
| 2   | Runs global + project CHECKS | MUST   | Documents polycentric governance      |
| 3   | Stops on check failures      | MUST   | STEP 2C validation gate exists        |
| 4   | Auto-updates ROADMAP         | SHOULD | STEP 3A marks checkboxes              |
| 5   | Auto-updates CHANGELOG       | SHOULD | STEP 3B moves complete epics          |
| 6   | References global/POLICY.md  | MUST   | NO hardcoded epic format examples     |
| 7   | Provides 5 outcomes          | MUST   | STEP 4 documents all states           |
| 8   | Shows time context           | SHOULD | Displays "last worked X ago"          |

**Test:**

```bash
# Metric 6: Critical - must reference global/POLICY.md, not hardcode format
! grep -q "## v0.*\[🚧\]" .github/prompts/backstage-start.prompt.md && \
grep -q "global/POLICY.md.*epic.*format" .github/prompts/backstage-start.prompt.md && \
echo '✅ References global/POLICY.md for epic syntax' || \
echo '❌ FAIL: Epic format hardcoded in prompt'
```

Expected: No epic format examples, has reference to global/POLICY.md
Pass: ✅ Must pass before shipping

---

#### backstage-close Health (6 metrics)

**Purpose:** Safe pause, share progress, preserve context

| #   | Metric                 | Type   | Test                         |
| --- | ---------------------- | ------ | ---------------------------- |
| 1   | Runs CHECKS validation | MUST   | Step 1 documented            |
| 2   | Handles check failures | MUST   | Step 2 adds fixes to ROADMAP |
| 3   | Commit + push on pass  | MUST   | Step 3 has git commands      |
| 4   | Victory lap brief      | SHOULD | Respects user context        |
| 5   | Body check reminder    | SHOULD | Step 5 asks physical needs   |
| 6   | Fix task format        | SHOULD | Uses 🔧 **FIX:** prefix      |

**Test:**

```bash
grep -q "Run.*CHECKS" .github/prompts/backstage-close.prompt.md && \
grep -q "🔧.*FIX:" .github/prompts/backstage-close.prompt.md && \
grep -q "git commit" .github/prompts/backstage-close.prompt.md && \
echo '✅ backstage-close has all critical steps' || \
echo '❌ FAIL: Missing required workflow steps'
```

Expected: All steps documented
Pass: ✅ backstage-close is production ready

---

#### backstage-update (prompt) Health (7 metrics)

**Purpose:** Update global backstage files from GitHub repo

| #   | Metric                   | Type   | Test                               |
| --- | ------------------------ | ------ | ---------------------------------- |
| 1   | Check current version    | MUST   | Step 1 reads from global/README.md |
| 2   | Fetch remote CHANGELOG   | MUST   | Step 2 has fetch logic             |
| 3   | Compare versions         | MUST   | Step 3 shows version diff          |
| 4   | Show changes per epic    | SHOULD | Step 3 lists improvements          |
| 5   | User confirmation        | MUST   | Step 4 asks yes/no                 |
| 6   | Calls .py script         | MUST   | Step 5 runs backstage-update.py    |
| 7   | Suggests backstage-start | SHOULD | Step 6 reminds validation          |

**Test:**

```bash
# Blocked until repo published
test -f .github/prompts/backstage-update.prompt.md && \
echo '✅ Prompt exists (blocked on repo publication)' || \
echo '❌ FAIL: Prompt missing'
```

Expected: Prompt exists with all steps
Pass: 🚧 Blocked on GitHub repo publication

---

#### backstage-update.py Health (13 metrics)

**Purpose:** Download and overwrite global framework files

**Scaffolding mode (7 metrics):**

| #   | Metric                  | Type   | Test                        |
| --- | ----------------------- | ------ | --------------------------- |
| 1   | Detect missing files    | MUST   | Checks if ROADMAP.md exists |
| 2   | Copy ROADMAP template   | MUST   | From templates/             |
| 3   | Copy CHANGELOG template | MUST   | From templates/             |
| 4   | Copy POLICY template    | MUST   | From templates/             |
| 5   | Copy CHECKS template    | MUST   | From templates/             |
| 6   | Copy .github/prompts    | MUST   | All 3 workflow prompts      |
| 7   | Explain what files do   | SHOULD | User guidance               |

**Update mode (6 metrics):**

| #   | Metric                    | Type   | Test                          |
| --- | ------------------------- | ------ | ----------------------------- |
| 1   | Fetch global/POLICY.md    | MUST   | From GitHub raw URL           |
| 2   | Fetch global/HEALTH.md    | MUST   | From GitHub raw URL           |
| 3   | Fetch backstage-update.py | MUST   | Self-update capability        |
| 4   | Fetch 3 prompt files      | MUST   | All backstage-\*.prompt.md    |
| 5   | Preserve project files    | MUST   | Never touch ROADMAP/CHANGELOG |
| 6   | Show progress             | SHOULD | Download indicators           |

**Test:**

```bash
# Check if it's still a placeholder
grep -q "This script is a placeholder" global/backstage-update.py && \
echo '❌ FAIL: Still placeholder (0% implementation)' || \
echo '✅ Implementation exists'
```

Expected: No placeholder message, has real implementation
Pass: ❌ Currently 0% implemented - **BLOCKS v0.2.0 RELEASE**

---

### Overall System Health

**Ship criteria:**

- [ ] backstage-start: ≥90% (currently 87.5% - needs metric 6 fix)
- [x] backstage-close: ≥90% (currently 100% ✅)
- [ ] backstage-update (prompt): ≥90% (currently 86% - blocked on infra)
- [ ] backstage-update.py: ≥90% (currently 0% - not implemented)

**v0.2.0 Shippability:** ❌ **2 of 4 components failing**

**Action items:**

1. Fix backstage-start metric 6 (remove hardcoded epic format)
2. Implement backstage-update.py (0% → 100%)
3. Publish backstage repo to GitHub (unblocks update testing)

---

