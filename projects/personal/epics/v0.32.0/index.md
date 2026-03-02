# Epic Notes

> Version, name, status → see `epic.yaml`

---

# v0.32.0 - Simplify Skills System



## Problem

**Current skills structure:**
```
~/Documents/skills/          # Source (many skills)
~/.openclaw/workspace/skills/ # Symlinks to ~/Documents/skills/
```

**Issues:**
1. **Scattered:** Skills in two locations (confusing)
2. **Symlinks:** Indirection layer (complexity, can break)
3. **Sync overhead:** Managing what lives where
4. **Separate repo:** Extra maintenance (commits, pushes, pulls)

**Goal:** Single location, properly committed, no symlinks.


## Solution

**Move everything to workspace:**
```
~/.openclaw/workspace/skills/  # Single source of truth (no symlinks)
```

**Git handles backup:**
- Daily auto-commit (`~/.openclaw/workspace/.git`)
- Skills tracked like any other workspace file
- No separate repo needed

**Benefits:**
- ✅ One location (no confusion)
- ✅ No symlinks (direct access)
- ✅ Git backup (already committed daily)
- ✅ Simpler skill discovery (OpenClaw scans one dir)


## Tasks

### Phase 1: Move Skills
- [ ] List current skills (`ls ~/Documents/skills/`)
- [ ] Move each to `~/.openclaw/workspace/skills/`
- [ ] Verify no symlinks remain in workspace
- [ ] Test skill loading (OpenClaw recognizes skills)

### Phase 2: Update References
- [ ] Update AGENTS.md (skill paths)
- [ ] Update connections/ docs (skill management)
- [ ] Update SOUL.md (skill references if any)

### Phase 3: Cleanup
- [ ] Delete old `~/Documents/skills/` (after verification)
- [ ] Remove symlink creation logic (if scripted)
- [ ] Verify auto-commit includes skills (`git status` in workspace)

### Phase 4: Documentation
- [ ] Update TOOLS.md (skills location)
- [ ] Update any skill READMEs (paths)
- [ ] Document new workflow (create skill directly in workspace)


## Migration Plan

**Before:**
```bash
~/Documents/skills/memory/
  ├── SKILL.md
  └── ROADMAP.md

~/.openclaw/workspace/skills/memory → symlink to ~/Documents/skills/memory
```

**After:**
```bash
~/.openclaw/workspace/skills/memory/
  ├── SKILL.md
  └── ROADMAP.md

# No symlinks, no separate repo
```

**Commands:**
```bash
# Move skills
mv ~/Documents/skills/* ~/.openclaw/workspace/skills/

# Remove symlinks (they'll break, delete them)
find ~/.openclaw/workspace/skills/ -type l -delete

# Verify OpenClaw loads skills
ls ~/.openclaw/workspace/skills/

# Commit
cd ~/.openclaw/workspace
git add skills/
git commit -m "Simplified skills: moved from ~/Documents/skills, removed symlinks"

# Delete old location (after verification)
rm -rf ~/Documents/skills/
```


## Success Criteria

✅ All skills in `~/.openclaw/workspace/skills/` (no symlinks)  
✅ OpenClaw loads skills correctly (test trigger activation)  
✅ Git tracks skills (daily auto-commit works)  
✅ No infrastructure overhead (one location, simple)  
✅ Documentation updated (AGENTS.md, TOOLS.md, connections/)  


## Notes

### Why This Matters

**Current overhead:**
- Create skill in `~/Documents/skills/`
- Symlink to `~/.openclaw/workspace/skills/`
- Commit in both repos (workspace + skills repo)
- Sync changes (pull/push skills repo)

**After simplification:**
- Create skill in `~/.openclaw/workspace/skills/`
- Commit (workspace auto-commit handles it)
- Done.

**Savings:** 3 steps → 1 step. No sync complexity.


### Skill Discovery

**OpenClaw scans:**
```
~/.openclaw/workspace/skills/*/SKILL.md
```

**No difference after migration** (same scan pattern, just no symlinks).


### Git Backup

**Workspace already git-tracked:**
- Auto-commit daily (existing cron)
- Skills become part of workspace (like MEMORY.md, AGENTS.md)
- No separate repo needed

**If skills need separate versioning later:**
- Git submodule (if specific skill needs own repo)
- But default = all in workspace (simpler)


## Related

- **AGENTS.md:** Skill trigger system (update paths after migration)
- **TOOLS.md:** Skills section (update location)
- **backstage skill:** Context-switch protocol (may reference skill paths)


## Future

- [ ] Skill marketplace (if skills shared publicly, separate repo makes sense)
- [ ] But for personal skills: workspace = home (this epic)
