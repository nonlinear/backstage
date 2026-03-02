# Epic: Patch Dance Protocol

**Status:** 📋 Planned  
**Version:** TBD  
**Created:** 2026-02-25  
**Priority:** High (needed for publishing)

---

## Problem

**Publishing requires coordinated steps:**

1. Open ClawHub link to republish
2. Create patch epic (0.0.N) at top of ROADMAP
3. Create branch for patch
4. Rewind main to last deploy
5. Apply patch
6. Test
7. Merge + publish

**Current state:** Manual, error-prone, no documented workflow.

**Questions:**
- Do patch versions (0.0.N) need renumbering? (No, but needs confirmation)
- Where to formalize this? (Global check? Local workflow doc?)
- How to prevent publishing breaking changes as patches?

---

## The "Patch Dance"

**Workflow:**

### 1. Identify Need for Patch
**Triggers:**
- Typo in published version
- Small bug fix (no new features)
- Documentation update
- Security fix (urgent)

**NOT patches:**
- New features (minor version)
- Breaking changes (major version)
- Refactors (minor version)

### 2. Create Patch Epic
```bash
# Add to ROADMAP (top of graph, no renumbering needed)
# Example: v1.0.3 → new patch v1.0.4
```

**Epic format:**
```markdown
## v1.0.4

### [Brief Description]

**Type:** Patch

**Problem:** [What broke / needs fixing]

**Solution:** [Minimal fix]

**Tasks:**
- [ ] Fix X
- [ ] Test Y
- [ ] Update docs
```

### 3. Create Branch
```bash
git checkout main
git pull origin main
git checkout -b patch/v1.0.4
```

### 4. Rewind Main to Last Deploy
```bash
# Find last published commit
git log --oneline | grep "Release v1.0.3"

# Rewind main (locally, NOT pushed yet)
git reset --hard <commit-hash>
```

**⚠️ CRITICAL:** Do NOT push rewound main yet!

### 5. Apply Patch on Branch
```bash
git checkout patch/v1.0.4
# Make changes
git add -A
git commit -m "Fix: [brief description]"
```

### 6. Test Patch
```bash
# Run all checks
backstage.sh checks

# Test functionality
# Verify fix works
# Check no regressions
```

### 7. Merge + Publish
```bash
# Merge patch to main
git checkout main
git merge patch/v1.0.4

# Tag version
git tag v1.0.4
git push origin main --tags

# Publish to ClawHub
# (Open ClawHub link, trigger republish)
```

---

## Patch Numbering

**Semver:** MAJOR.MINOR.PATCH

**Patch version (0.0.N):**
- ✅ No renumbering needed (incremental)
- ✅ Example: v1.0.3 → v1.0.4 → v1.0.5
- ❌ Don't skip numbers (creates confusion)

**Current version check:**
```bash
git describe --tags --abbrev=0
```

---

## Where to Formalize

### Option 1: Global Check (checks/global/patch-workflow.md)
**Pros:** Always visible, enforced by backstage  
**Cons:** Global = affects all projects (maybe not all need patches)

### Option 2: Local Check (checks/local/patch-workflow.md)
**Pros:** Project-specific, only for publishable projects  
**Cons:** Needs duplication across projects

### Option 3: Epic Note (this file)
**Pros:** Reference doc, linked from ROADMAP  
**Cons:** Not enforced, easy to forget

### Option 4: Backstage Script (backstage.sh patch)
**Pros:** Automated, guided workflow  
**Cons:** More code to maintain

**Recommendation:** Start with Option 3 (epic note), upgrade to Option 4 if pattern stabilizes.

---

## Patch Criteria (What Qualifies)

**YES (patch):**
- ✅ Typo fixes
- ✅ Small bug fixes (1-5 line changes)
- ✅ Documentation updates (README, CHANGELOG)
- ✅ Dependency version bumps (security)
- ✅ Check script fixes (non-breaking)

**NO (minor/major):**
- ❌ New features (minor)
- ❌ Breaking changes (major)
- ❌ Refactors (minor)
- ❌ New checks (minor)
- ❌ API changes (minor/major)

**When unsure:** Default to minor version.

---

## Publishing Checklist

- [ ] Version number correct? (check git tags)
- [ ] CHANGELOG updated? (new entry for patch)
- [ ] All checks pass? (backstage.sh checks)
- [ ] Tests pass? (manual verification)
- [ ] Branch merged? (patch/vX.Y.Z → main)
- [ ] Tag created? (git tag vX.Y.Z)
- [ ] Pushed? (git push origin main --tags)
- [ ] ClawHub republished? (open link, trigger)

---

## Open Questions

- [ ] Should patches auto-create CHANGELOG entry? (or manual?)
- [ ] How to prevent accidentally publishing breaking changes as patches?
- [ ] Should backstage.sh detect unpublished changes and warn?
- [ ] What about hotfix branches? (same as patch, or different workflow?)

---

## Next Steps

1. **Document current practice** (what Nicholas actually does)
2. **Formalize in epic note** (this file)
3. **Test on next patch** (backstage or skills project)
4. **If stable:** Promote to global check or script
5. **If not:** Keep as reference doc, iterate

---

## References

- Semver: https://semver.org/
- ClawHub: https://clawhub.com/
- Git tagging: `git tag -a v1.0.4 -m "Patch: Fix XYZ"`
