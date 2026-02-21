# Published Skills Republish Policy

**DESCRIPTION:** Skills MUST be published BEFORE merge. Testing during publish prevents broken releases.  
**TYPE:** interpretive  
**SCOPE:** global

**Applies to:** Projects that contain published skills (ClawHub)

**Rule:** Publish → Test → THEN Merge (not the other way around)

---

## Why Publish BEFORE Merge?

**Publishing = real-world testing:**
- Missing dependencies surface
- Hardcoded paths break
- Symlinks don't transfer
- Companion dependencies fail

**Example:** v0.15.0 librarian skill published → discovered `research.py` missing from parent `engine/` → fixed BEFORE merge.

**If we merged first:** Broken release in production, emergency hotfix needed.

---

## Companion Skills Pattern

**What is a companion skill?**
- Skill depends on parent project (librarian, home-assistant, etc.)
- Can't run standalone
- Uses parent's engine/data/config

**Structure:**
```
parent-project/
├── engine/          ← Core logic
├── data/            ← Data files
└── skill/           ← Conversational layer (companion)
    ├── SKILL.md     ← Frontmatter: requires: [parent-project]
    ├── wrapper.sh   ← Points to ../engine/
    └── README.md    ← Installation: "Install parent first"
```

**Frontmatter example:**
```yaml
---
name: librarian
requires:
  - librarian (parent project)
  - python3 (>=3.11)
companion: librarian
---
```

**README pattern:**
```markdown
# Skill Name

**Companion skill for [Project](github-url)**

## Requirements
You must install [Project] first.

## Installation
1. Install parent: github.com/user/project
2. Activate skill: clawhub install skill-name
```

---

## When to Republish

**ALWAYS publish BEFORE merge to main:**
- Breaking changes (API, behavior, requirements)
- Version bump (major/minor)
- Critical fixes
- **Any functional change** (if in doubt, publish before)

**Why:** Real testing happens during publish. Bugs surface. Fix THEN merge.

---

## Workflow

```bash
# 1. Prepare skill for publish
cd project/skill/
# Remove .bak, .old, test files
# Update SKILL.md frontmatter
# Update package.json version
# Update README

# 2. Commit publish prep
git add -A
git commit -m "Skill publish prep: vX.Y.Z"

# 3. TEST (critical!)
./wrapper.sh "test query" "scope" "value"

# 4. Publish to ClawHub
clawhub publish

# 5. If bugs found → fix → republish → THEN merge
# 6. If tests pass → merge to main
git checkout main
git merge epic/vX.Y.Z
git tag vX.Y.Z
git push --tags
```

---

## Detection (AI Check)

**Before merge, check:**
1. Modified skill has `status: production` OR `companion: project-name`
2. Skill files changed (`git diff` on SKILL.md, wrappers, package.json)
3. If YES → **BLOCK merge** until published + tested

**Alert template:**
```
🚨 Published skill modified: [skill-name]
Status: Companion skill (requires testing)
Action: Publish → Test → THEN Merge
Command: cd skill/ && clawhub publish
```

---

## Testing Checklist (Companion Skills)

Before publish:
- [ ] Wrapper points to parent (`../engine/`, not `./engine/`)
- [ ] No hardcoded paths (use $HOME, relative paths)
- [ ] No .bak, .old, test files
- [ ] README explains parent dependency
- [ ] SKILL.md has `requires:` frontmatter
- [ ] Test with actual query (don't assume it works)

After publish:
- [ ] Install on fresh machine (or clean test env)
- [ ] Verify parent dependency check works
- [ ] Run test queries
- [ ] Check error messages (missing parent, etc.)

---

## Common Bugs Found During Publish

**Librarian v0.15.0 example:**
- ❌ `research.py` missing from parent `engine/`
- ❌ Books symlink broke (user-specific path)
- ❌ Hardcoded config paths

**Fix:** Discovered during publish testing → corrected → republished → merged clean.

**Lesson:** Publish early. Test real. Merge confident.

---

## Future Automation

When this becomes `.sh`:
- Parse frontmatter for `companion:` field
- Detect skill modifications via `git diff`
- Run `clawhub publish --dry-run`
- Block merge if publish needed
- Auto-test wrapper with dummy query
