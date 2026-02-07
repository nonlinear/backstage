---
name: backstage-close
description: Safe pause, share progress, preserve context
---

# Backstage Close Workflow

**Read POLICY first:**

1. Read `backstage/global/POLICY.md` (universal rules)
2. Read `backstage/POLICY.md` if exists (project overrides)
3. Execute steps below

---

## STEP 1: Run Health Checks

```bash
# Run checks from HEALTH.md files
cd backstage/global && bash -c "$(awk '/```bash/,/```/' HEALTH.md | grep -v '```')"
[ -f backstage/HEALTH.md ] && cd backstage && bash -c "$(awk '/```bash/,/```/' HEALTH.md | grep -v '```')"
```

---

## STEP 2: Handle Check Failures

**If checks fail:**
- Add fix tasks to ROADMAP (use 🔧 **FIX:** prefix)
- Don't commit broken state
- Report what needs fixing

---

## STEP 3: Commit + Push (if checks pass)

```bash
git add -A
git commit -m "wip: [brief description of work done]"
git push origin <branch-name>
```

---

## STEP 4: Victory Lap

**Brief summary:**
- What was accomplished
- What's left to do
- Any blockers

**Keep it short** - respect user's context

---

## STEP 5: Body Check Reminder

**Ask:**
- "Stretch? Water? Bathroom break?"

**Why:** Physical health matters during long sessions

---

**All workflow rules live in POLICY.md. Read it, don't duplicate here.**
