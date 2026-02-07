---
name: backstage-merge
description: Merge completed epic to main (pre-merge checks + merge + post-merge updates)
---

# Backstage Merge Workflow

**Trigger:** User says "epic is completed, merge" or similar

**Read POLICY/HEALTH first:**
1. Read `backstage/global/POLICY.md` (Step 9-10: merge workflow)
2. Read `backstage/HEALTH.md` (project-specific merge checks)
3. Execute steps below

---

## STEP 1: Pre-Merge Checks

**Run HEALTH checks:**

```bash
# Global + project HEALTH
cd backstage/global && bash -c "$(awk '/```bash/,/```/' HEALTH.md | grep -v '```')"
cd backstage && bash -c "$(awk '/```bash/,/```/' HEALTH.md | grep -v '```')"
```

**Verify all tasks complete:**

```bash
grep "^- \[ \]" backstage/ROADMAP.md
```

- If incomplete tasks found → STOP, ask user to finish
- If all done → proceed

**Version sync check (CRITICAL for backstage project):**

```bash
NAV_VERSION=$(grep "backstage rules.*v[0-9]" backstage/global/POLICY.md | sed 's/.*v\([0-9.]*\).*/\1/')
EPIC_VERSION=$(grep -m1 "^## v[0-9]" backstage/ROADMAP.md | sed 's/^## v//')
```

- If versions don't match → STOP, update global/POLICY.md first
- If match → proceed

---

## STEP 2: Move Epic to CHANGELOG

**Extract epic from ROADMAP:**
- Find `## vX.Y.Z` section
- Copy entire epic (header + tasks + notes)
- Paste at TOP of CHANGELOG (after header)
- Change status: 🚧 → ✅, add date
- Remove from ROADMAP

**Example:**
```markdown
# CHANGELOG

## v0.3.0 - 2026-02-07

### ✅ OpenClaw Skill

**Completed:** AI-driven skill that reads POLICY and executes protocol

- Created skill/backstage.sh (thin wrapper)
- Created skill/SKILL.md (documentation)
- ...
```

---

## STEP 3: Merge to Main

**Execute merge:**

```bash
git checkout main
git pull origin main
git merge epic/vX.Y.Z-name --no-ff
git tag vX.Y.Z -m "Epic vX.Y.Z complete"
git push origin main
git push origin vX.Y.Z
```

**Delete feature branch:**

```bash
git branch -d epic/vX.Y.Z-name
git push origin --delete epic/vX.Y.Z-name
```

---

## STEP 4: Post-Merge Updates

**For backstage project specifically:**

If project has OpenClaw skill (check if `skill/` folder exists):

```bash
# Remove dev symlink
rm ~/.openclaw/skills/backstage

# Restore official skill (from main)
ln -s ~/Documents/backstage/skill ~/.openclaw/skills/backstage

# Test
backstage start .
```

**For other projects:** Skip skill update

---

## STEP 5: Announce Completion

**Report:**
```
✅ Epic vX.Y.Z merged to main
✅ CHANGELOG updated
✅ Tag created: vX.Y.Z
✅ Branch deleted
[✅ Skill updated (if applicable)]

📌 Next: [suggest next epic from ROADMAP]
```

---

**All merge rules live in POLICY.md and HEALTH.md. This prompt just orchestrates.**
