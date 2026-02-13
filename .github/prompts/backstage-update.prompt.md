# 🔄 MGMT Update Prompt

**Purpose:** Update global MGMT system files from the MGMT repository.

**When to use:** When you want to get latest MGMT workflow improvements, or periodically (monthly/quarterly).

**Status:** 🚧 Placeholder - awaiting MGMT repo publication

---

## Workflow (Future Implementation)

### Step 1: Check Current Version

```bash
# Read current version from MGMT/global/README.md
cat MGMT/global/README.md | grep "Version:"
```

**AI reports:**

```
🔍 Current MGMT version: v1.0.0
Checking for updates...
```

### Step 2: Fetch Latest CHANGELOG

```python
# Fetch MGMT repo CHANGELOG from GitHub
# (Once MGMT repo is published at https://github.com/nonlinear/MGMT)

import requests
response = requests.get('https://raw.githubusercontent.com/nonlinear/MGMT/main/CHANGELOG.md')
```

### Step 3: Compare Versions

**AI analyzes CHANGELOG and shows:**

```markdown
## 📦 MGMT Updates Available

**Your version:** v1.0.0
**Latest version:** v1.2.0

### What's New

**v1.2.0** (2026-02-15)

- Added: Auto-detection of project type
- Improved: MGMT-start error messages
- Fixed: Navigation block parsing edge cases

**v1.1.0** (2026-02-01)

- Added: MGMT-update prompt (this one!)
- Improved: Epic format examples
- Added: Link integrity checks

**Update?** [Yes/No]
```

### Step 4: User Confirms

**If Yes:**

```bash
python3.11 MGMT/global/update-MGMT.py
```

**Script downloads and overwrites:**

- `MGMT/global/README.md`
- `MGMT/global/POLICY.md`
- `MGMT/global/HEALTH.md`
- `MGMT/global/update-MGMT.py`
- `.github/prompts/MGMT-start.prompt.md`
- `.github/prompts/MGMT-end.prompt.md`
- `.github/prompts/MGMT-update.prompt.md`

**Your files stay untouched:**

- `MGMT/CHANGELOG.md`
- `MGMT/ROADMAP.md`
- `MGMT/POLICY.md`
- `MGMT/HEALTH.md`
- `MGMT/gaps/`, `schemas/`, `epic-notes/`

### Step 5: Verification

**AI runs checks:**

```bash
# Verify navigation blocks still work
grep -q '> 🤖' README.md && echo '✅ README navigation OK'

# Verify global files updated
cat MGMT/global/README.md | grep "Version:"
```

**Reports:**

```
✅ MGMT updated to v1.2.0
✅ All navigation blocks intact
✅ All checks passing

Summary of changes:
- 3 files updated in MGMT/global/
- 3 prompts updated in .github/prompts/
- 0 project files modified
```

---

## Manual Update (Current Method)

**Until MGMT repo is published, update manually:**

1. **Check for announcements** in [Signal group](https://signal.group/#CjQKIKD7zJjxP9sryI9vE5ATQZVqYsWGN_3yYURA5giGogh3EhAWfvK2Fw_kaFtt-MQ6Jlp8)
2. **Copy updated files** from reference repo to your project
3. **Test navigation** with `/MGMT-start`
4. **Commit** if everything works

---

## Breaking Changes

**MGMT follows semantic versioning:**

- **Patch (v1.0.0 → v1.0.1):** Bug fixes, no action needed
- **Minor (v1.0.x → v1.1.0):** New features, backward compatible
- **Major (v1.x → v2.0):** Breaking changes, may require project updates

**If major version update:**

- AI will show migration guide
- May need to update project files to match new format
- Test thoroughly before committing

---

## Philosophy

**Global files define structure, your content adapts automatically.**

When MGMT updates improve epic format syntax, your existing epics keep working because they follow the pattern, not hardcoded rules.

Example:

- MGMT v1.0: `[🚧](link) Title`
- MGMT v1.1: Same format, better examples
- Your epics: No changes needed! ✅

---

## Rollback

**If update breaks something:**

```bash
# Undo last commit
git revert HEAD

# Or restore specific file
git checkout HEAD~1 -- MGMT/global/POLICY.md
```

**Then:**

- Report issue in Signal group
- Wait for hotfix
- Or stay on previous version

---

**Last updated:** 2026-01-26
**Version:** 1.0 (Placeholder prompt)
**MGMT Repo:** https://github.com/nonlinear/MGMT (coming soon)
