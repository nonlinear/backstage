---
name: backstage-start
description: Pre-commit validation, doc sync, determine next steps
---

# Backstage Start Workflow

**Read POLICY first, then execute:**

1. Read `backstage/global/POLICY.md` (universal rules)
2. Read `backstage/POLICY.md` if exists (project-specific overrides)
3. Execute steps below

---

## STEP 1: Run Health Checks

**Execute checks from HEALTH files:**

```bash
# Run global checks
cd backstage/global && bash -c "$(awk '/```bash/,/```/' HEALTH.md | grep -v '```')"

# Run project checks (if exists)
[ -f backstage/HEALTH.md ] && cd backstage && bash -c "$(awk '/```bash/,/```/' HEALTH.md | grep -v '```')"
```

**If any check fails:**
- Report failure
- Stop workflow
- Suggest fixes

---

## STEP 2: Update Navigation Blocks

**For each file (README.md, ROADMAP.md, CHANGELOG.md, POLICY.md, HEALTH.md):**

1. Remove old `> 🤖 ... 🤖` block
2. Remove old mermaid diagrams
3. Extract mermaid from ROADMAP.md
4. Calculate relative paths (see POLICY.md template)
5. Generate navigation block (table format from POLICY.md)
6. Append mermaid diagram after closing `> 🤖`

**Template source:** `backstage/global/POLICY.md` → "Navigation block template"

---

## STEP 3: Sync ROADMAP ↔ Work Done

**Compare git diff vs ROADMAP checkboxes:**

```bash
git diff main...HEAD --name-only
```

**For each changed file:**
- Find related ROADMAP tasks
- Mark checkboxes as done `[x]`

**If epic complete (all tasks done):**
- Ask: "Move epic to CHANGELOG? (y/n)"
- If yes: Move to CHANGELOG, update version

---

## STEP 4: Display "What's Next"

**Show:**
- Active epics (🚧 status)
- Next actionable tasks (unchecked boxes)
- Suggestions based on context

**Format:**
```
📌 What's next?

Active epics:
- v0.X.0: [Epic Name] (3/5 tasks done)

Next tasks:
- [ ] Task description
```

---

## STEP 5: Confirm Completion

**Reply:**
```
✅ Backstage protocol executed
✅ Health checks: [PASS/FAIL]
✅ Navigation blocks synced
📌 Next: [suggestion]
```

---

**All workflow rules (epic format, commit messages, branching) live in POLICY.md. Read it, don't duplicate here.**
