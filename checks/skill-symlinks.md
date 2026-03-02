# Skill Symlinks Management

**Rule:** All skills in `~/Documents/skills/` must have symlinks in `~/.openclaw/workspace/skills/` to be activated.

## When Creating New Skill

**After creating skill folder:**
```bash
ln -s ~/Documents/skills/NEW-SKILL-NAME ~/.openclaw/workspace/skills/NEW-SKILL-NAME
```

**Check it worked:**
```bash
ls -la ~/.openclaw/workspace/skills/NEW-SKILL-NAME
# Should show: lrwxr-xr-x ... NEW-SKILL-NAME -> /Users/.../Documents/skills/NEW-SKILL-NAME
```

---

## When Renaming Skill

**Delete old symlink + create new:**
```bash
# Remove old symlink
rm ~/.openclaw/workspace/skills/OLD-NAME

# Create new symlink
ln -s ~/Documents/skills/NEW-NAME ~/.openclaw/workspace/skills/NEW-NAME
```

**Commit in skills project:**
```bash
cd ~/Documents/skills
git add -A
git commit -m "skill: rename OLD-NAME → NEW-NAME"
```

---

## Verification

**List all symlinks:**
```bash
ls -la ~/.openclaw/workspace/skills/ | grep "^l"
```

**Expected:** All skills in `~/Documents/skills/` should appear in list.

---

## Why This Matters

**Symlinks = Activation:**
- ✅ OpenClaw reads SKILL.md from symlink location
- ✅ Triggers work (skill can be activated by AI)
- ✅ Skills can be edited in project + used in workspace
- ❌ No symlink = skill exists but not activated

**Without symlink:**
- Skill exists in project (can edit, commit, push)
- But OpenClaw won't detect it (won't activate on triggers)
- Like having a plugin installed but not enabled

---

## Automation Opportunity

**Future:** Could automate with script:
```bash
# Detect skills without symlinks
for skill in ~/Documents/skills/*/; do
  name=$(basename "$skill")
  if [ ! -L ~/.openclaw/workspace/skills/"$name" ]; then
    echo "Missing symlink: $name"
  fi
done
```

**For now:** Manual check (documented here).
