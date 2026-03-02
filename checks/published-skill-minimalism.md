# Published Skill Minimalism

**DESCRIPTION:** Published skills must be minimal (concise language, essential files only, no subfolders)  
**TYPE:** interpretive  
**SCOPE:** global (applies to all published skills)

---

## Rule

**IF skill is published (Status: Published in README):**
- **Minimize language:** SKILL.md concise, no verbose explanations
- **Essential files only:** Delete unused scripts, examples, docs
- **No subfolders:** Flat structure (all files in skill root)

**WHY:**
- Published = public consumption
- Users want clarity, not exhaustive docs
- Less to maintain, less to break
- Faster to scan, easier to understand

---

## Checklist (Before Publishing)

### Language Minimalism
- [ ] SKILL.md under 300 lines (preferably under 200)
- [ ] Remove verbose diagrams (keep 1-2 essential ones max)
- [ ] Remove long explanatory sections (link to external docs if needed)
- [ ] Clear trigger patterns (concise, scannable)
- [ ] Essential workflow notes only (not every implementation detail)

### File Minimalism
- [ ] Delete unused scripts
- [ ] Delete example files (unless critical to usage)
- [ ] Delete contract.html, test files, dev docs
- [ ] Keep only:
  - SKILL.md (spec)
  - Core scripts (what skill actually runs)
  - README.md (if needed for ClawHub)

### Structure Minimalism
- [ ] No subfolders (flat structure)
- [ ] Exception: `checks/` folder (if skill uses backstage protocol internally)
- [ ] All scripts in root
- [ ] No `docs/`, `examples/`, `tests/` folders

---

## How to Check

**AI checks before publishing:**
```bash
# Count SKILL.md lines
wc -l SKILL.md
# If >300 → suggest simplification

# List files
ls -la
# Flag: subfolders (except checks/), unused files

# Check README frontmatter
grep "^Status:" README.md
# If "Published" → enforce minimalism
```

---

## Enforcement

**When publishing (merge to main):**
1. AI reads this check
2. AI scans skill folder
3. AI reports: "SKILL.md is 450 lines (recommend <300). Found subfolder: examples/. Delete?"
4. User decides: simplify or publish as-is

**Not blocking:**
- User can publish verbose skills (their choice)
- Check SUGGESTS minimalism, doesn't enforce

---

## Examples

### ❌ TOO VERBOSE (Before Cleanup)
```
skills/backstage/
  SKILL.md (600 lines, 3 diagrams, verbose sections)
  contract.html (unused visualizer)
  examples/
    example-project/
  docs/
    architecture.md
  tests/
    test-backstage.sh
  backstage.sh
  checks.sh
  parse-roadmap.sh
```

### ✅ MINIMAL (After Cleanup)
```
skills/backstage/
  SKILL.md (200 lines, 1 diagram, concise)
  backstage.sh
  checks.sh
  parse-roadmap.sh
  update-backstage.sh
```

---

## Edge Cases

**Skill needs examples:**
- Embed in SKILL.md (code blocks)
- Or link to external repo/gist

**Skill needs architecture docs:**
- Link to external wiki/docs
- Or epic-notes in protocol (not skill)

**Skill has tests:**
- Keep tests in protocol repo (not published skill)
- Or separate repo

**Skill uses backstage internally:**
- `checks/` folder allowed (part of protocol)
- But minimize checks (only essential)

---

## Success Criteria

**Published skill is minimal when:**
- ✅ SKILL.md under 300 lines
- ✅ No unused files
- ✅ Flat structure (no subfolders except checks/)
- ✅ Scannable in <5 minutes
- ✅ Clear what it does, how to use it

---

**Created:** 2026-02-25  
**Applies to:** All published skills (Status: Published in README)  
**Enforcement:** Interpretive (AI suggests, user decides)
