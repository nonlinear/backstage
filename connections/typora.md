# Typora Auto-Reload

**Problem:** Typora doesn't auto-reload files in OneDrive.

**Cause:** OneDrive virtual files / sync delay / file system monitoring issue.

**Solution:** Use local files (NOT OneDrive) for active editing in Typora.

---

## Auto-Reload Behavior

**✅ WORKS (auto-reload):**
- Local files: `~/Documents/wiley/file.md`
- Local workspace: `~/.openclaw/workspace/file.md`
- Any file NOT in `~/Library/CloudStorage/`

**❌ DOESN'T WORK (needs manual ⌘R or close/reopen):**
- OneDrive files: `~/Library/CloudStorage/OneDrive-Wiley/RPM/file.md`
- Any file in `~/Library/CloudStorage/`

---

## Workflow

**For active editing (need auto-reload):**
1. Keep file in `~/Documents/` or `~/.openclaw/workspace/`
2. Edit freely (Typora auto-reloads)

**For archival/sharing (OneDrive):**
1. Move final version to OneDrive
2. Accept manual reload (⌘R) if need to edit later

**For collaboration (Excel + OneDrive):**
- Use Excel workflow (kill + reopen)
- Don't rely on auto-reload

---

## Manual Reload

**If stuck on OneDrive file:**
- ⌘R (reload)
- Or: Close Typora + reopen file
- Or: Move file to local, edit, move back

---

**Created:** 2026-02-10  
**Tested:** RPM Design Discrepancy exercise (moved OneDrive → local, auto-reload fixed)
