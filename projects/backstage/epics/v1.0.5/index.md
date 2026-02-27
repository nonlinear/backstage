# v1.0.5 - Update Backstage + Security Notice + Minimalism Checks

**Status:** ✅ Complete  
**Created:** 2026-02-25  
**Type:** Patch

---

## Changes

### Features
- **"update backstage" trigger** - Sync local `checks/global/` with upstream
  - Script: `update-backstage.sh`
  - Detects symlinks (admin mode)
  - Shows mini changelog before applying
  - User confirmation required

### Documentation
- **Security notice** added to SKILL.md (admin tool warning)
- **Workflow notes** for update trigger
- **Update flow diagram** added to workflow diagram

### Checks Added
- **contract-diagram-discipline.md** - If contract exists, update it first before implementation
- **published-skill-minimalism.md** - Published skills must be minimal (language, files, structure)

### Cleanup
- Removed `contract.html` (unused visualizer)

### Epic Notes
- **v1.1.0** - Contract diagram adoption (future work)
- **update-backstage-flow-diagram.md** - Visual spec for update trigger

---

## Success Criteria

- ✅ Update backstage works (tested manually)
- ✅ Security notice visible in SKILL.md
- ✅ Checks enforce discipline (contract-first, minimalism)
- ✅ Cleanup complete (no unused files)
- ✅ Workflow documented (triggers, diagrams, notes)

---

## Git Log

```
7a1e205 Add security notice to SKILL.md (admin tool warning)
9ba923c Add published-skill-minimalism check
b43d078 Remove contract.html (unused visualizer)
db66805 Add v1.1.0 epic: contract diagram adoption
2ad9625 Add contract-diagram-discipline check
16722c6 Add workflow notes for 'update backstage' trigger
46051ad Add 'update backstage' branch to workflow diagram
c7ce502 Add update-backstage.sh script
9c480d6 Add 'update backstage' subtrigger to SKILL.md
```

---

## ClawHub Feedback Addressed

**Issue:** Security concerns about global checks path + remote code execution

**Response:**
- Added security notice to SKILL.md (⚠️ Admin tool warning)
- Documented intended use (personal/trusted teams only)
- Mitigations listed (user confirmation, git history, symlink detection)
- Use at your own risk + review scripts before running

---

**Ready to publish:** Yes (after merge to main + tag)
