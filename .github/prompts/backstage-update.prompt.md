---
name: backstage-update
description: Update backstage framework files from upstream
---

# Backstage Update Workflow

**Updates framework files, preserves project content**

---

## STEP 1: Show What Will Update

**Files that will be updated:**
- `backstage/global/POLICY.md`
- `backstage/global/HEALTH.md`
- `backstage/global/backstage-update.py`
- `.github/prompts/backstage-*.prompt.md`

**Files that will NOT change:**
- `backstage/ROADMAP.md` (your epics)
- `backstage/CHANGELOG.md` (your history)
- `backstage/POLICY.md` (your rules)
- `backstage/HEALTH.md` (your tests)

---

## STEP 2: Fetch Latest from GitHub

```bash
# Download latest framework files
curl -fsSL https://raw.githubusercontent.com/nonlinear/backstage/main/backstage/global/POLICY.md \
  -o backstage/global/POLICY.md

# Repeat for other global files
```

---

## STEP 3: Show Diff

**Display changes:**
```bash
git diff backstage/global/POLICY.md
```

**Ask user:** "Accept these changes? (y/n)"

---

## STEP 4: Commit Updates

```bash
git add backstage/global/*.md .github/prompts/backstage-*.prompt.md
git commit -m "chore: update backstage framework to vX.Y.Z"
git push origin <branch>
```

---

## STEP 5: Suggest Next Step

**Recommend:** Run `/backstage-start` to sync navigation blocks with new framework version

---

**Update logic lives in backstage-update.py, not here. This prompt just orchestrates.**
