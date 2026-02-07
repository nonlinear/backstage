---
name: backstage-close
description: Safe pause, share progress, preserve context (includes merge if epic complete)
---

# Backstage Close Workflow

**Read POLICY first:**

1. Read `backstage/global/POLICY.md` (universal rules)
2. Read `backstage/POLICY.md` if exists (project overrides)
3. Read `backstage/HEALTH.md` if exists (project-specific merge checks)
4. Execute steps below

---

## STEP 1: Run Health Checks

```bash
# Run checks from HEALTH.md files
cd backstage/global && bash -c "$(awk '/```bash/,/```/' HEALTH.md | grep -v '```')"
[ -f backstage/HEALTH.md ] && cd backstage && bash -c "$(awk '/```bash/,/```/' HEALTH.md | grep -v '```')"
```

---

## STEP 2: Check If Epic Complete

**Look at ROADMAP:**

```bash
# Check current epic for incomplete tasks
grep "^- \[ \]" backstage/ROADMAP.md
```

**If incomplete tasks found:**
- Proceed to STEP 3 (regular close)

**If all tasks done AND user said "epic is completed, merge":**
- Proceed to STEP 2A (merge workflow)

---

## STEP 2A: Merge Workflow (If Epic Complete)

**Pre-merge checks:**

```bash
# Version sync (CRITICAL for backstage project)
NAV_VERSION=$(grep "backstage rules.*v[0-9]" backstage/global/POLICY.md | sed 's/.*v\([0-9.]*\).*/\1/')
EPIC_VERSION=$(grep -m1 "^## v[0-9]" backstage/ROADMAP.md | sed 's/^## v//')
```

- If versions don't match → warn user, add to ROADMAP as fix task
- If match → proceed

**Move epic to CHANGELOG:**

- Extract `## vX.Y.Z` section from ROADMAP
- Paste at TOP of CHANGELOG (after header)
- Change status: 🚧 → ✅, add date
- Remove from ROADMAP

**Merge to main:**

```bash
git checkout main
git pull origin main
git merge epic/vX.Y.Z-name --no-ff
git tag vX.Y.Z -m "Epic vX.Y.Z complete"
git push origin main
git push origin vX.Y.Z
git branch -d epic/vX.Y.Z-name
git push origin --delete epic/vX.Y.Z-name
```

**Post-merge (backstage project only):**

If `skill/` folder exists:

```bash
# Remove dev symlink, restore official
rm ~/.openclaw/skills/backstage
ln -s ~/Documents/backstage/skill ~/.openclaw/skills/backstage
```

**Victory lap:**

```
✅ Epic vX.Y.Z merged to main
✅ CHANGELOG updated
✅ Tag created
✅ Branch deleted
[✅ Skill updated]

📌 Next epic: [suggest from ROADMAP]
```

**Skip to STEP 5**

---

## STEP 3: Handle Check Failures (Regular Close)

**If checks fail:**
- Add fix tasks to ROADMAP (use 🔧 **FIX:** prefix)
- Don't commit broken state
- Report what needs fixing

---

## STEP 4: Commit + Push (Regular Close, if checks pass)

```bash
git add -A
git commit -m "wip: [brief description of work done]"
git push origin <branch-name>
```

---

## STEP 5: Victory Lap

**Brief summary:**
- What was accomplished
- What's left to do
- Any blockers

**Keep it short** - respect user's context

---

## STEP 6: Body Check Reminder

**Ask:**
- "Stretch? Water? Bathroom break?"

**Why:** Physical health matters during long sessions

---

**Trigger for merge:** User says "epic is completed, merge" → execute STEP 2A instead of STEP 3-4

**All workflow rules live in POLICY.md and HEALTH.md. This prompt just orchestrates.**
