# Simplify Skills System

**Problem:** Skills scattered in two locations with symlinks creating infrastructure overhead.

**Solution:** Single source of truth in workspace, git-backed, no symlinks.

---

## Before & After

**Before:**
```
~/Documents/skills/memory/
  ├── SKILL.md
  └── ROADMAP.md

~/.openclaw/workspace/skills/memory → symlink
```

**After:**
```
~/.openclaw/workspace/skills/memory/
  ├── SKILL.md
  └── ROADMAP.md

# No symlinks, no separate repo
```

---

## Benefits

✅ One location (no confusion)  
✅ No symlinks (direct access)  
✅ Git backup (workspace auto-commit)  
✅ Simpler skill discovery  
✅ **3 steps → 1 step** (create skill in workspace, done)

---

## Migration Commands

```bash
# Move skills
mv ~/Documents/skills/* ~/.openclaw/workspace/skills/

# Remove symlinks
find ~/.openclaw/workspace/skills/ -type l -delete

# Commit
cd ~/.openclaw/workspace
git add skills/
git commit -m "Simplified skills: moved from ~/Documents/skills, removed symlinks"

# Delete old location (after verification)
rm -rf ~/Documents/skills/
```

---

## Why This Matters

**Before overhead:**
1. Create skill in `~/Documents/skills/`
2. Symlink to workspace
3. Commit in both repos
4. Sync changes

**After simplification:**
1. Create skill in workspace
2. Done (auto-commit handles it)

**Savings:** 3 steps → 1 step, no sync complexity.

---

## Skill Discovery

**OpenClaw scans:**
```
~/.openclaw/workspace/skills/*/SKILL.md
```

No difference after migration (same scan pattern, no symlinks).

---

## Future

- Skill marketplace (if shared publicly, separate repo makes sense)
- Personal skills: workspace = home (this epic)
