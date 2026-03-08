# OneDrive Connection

**Problem:** OneDrive sync delay (2-10 min) breaks instant paridade.

**Solution:** Local Excel app + auto-backup + history folder.

**Script:** `~/.openclaw/workspace/scripts/edit-excel.sh`

---

## File Structure

```
FILE.xlsx                    ← Active file (edit this)
FILE history/                ← History folder
  FILE-20260210-095530.xlsx  ← Timestamped backups
  FILE-20260210-101245.xlsx
  ...
  (max 10 files, delete oldest)
```

**Example:**
```
~/Library/CloudStorage/OneDrive-Wiley/RPM/
  Design-Discrepancy.xlsx
  Design-Discrepancy history/
    Design-Discrepancy-20260210-095530.xlsx
    Design-Discrepancy-20260210-101245.xlsx
    ...
```

---

## Workflow

**Automated (recommended):**
```bash
~/.openclaw/workspace/scripts/edit-excel.sh ~/Library/CloudStorage/OneDrive-Wiley/RPM/Design-Discrepancy.xlsx
```

**What script does:**
1. Backup to history folder (timestamped)
2. Open file in Excel
3. Wait for you to close Excel
4. Cleanup history (keep last 10)

---

## Why This Works

**OneDrive sync = slow:**
- Browser reload → waits for sync (2-10 min)
- Temp files → still sync delay
- Chrome Relay iframe → empty (doesn't load OneDrive)

**Local Excel + auto-backup = instant:**
- File is local (no sync wait)
- History folder = organized backups
- Max 10 files = low disk usage
- Always edit active file (not timestamped copy)

---

## Known Issues & Solutions

### Issue 1: Python openpyxl "File is not a zip file" (2026-02-12)

**Problem:**
- `openpyxl.load_workbook()` fails with "BadZipFile: File is not a zip file"
- Error: `OSError: [Errno 11] Resource deadlock avoided`
- Affects ALL files in OneDrive folder (active + history backups)

**Root cause:**
- OneDrive file locking (even with OneDrive killed/paused)
- Python cannot read OneDrive-synced Excel files directly
- Not corruption - Excel app opens file fine

**Solutions tested:**
- ❌ Kill OneDrive (`pkill -9 OneDrive`) - still locked
- ❌ Pause OneDrive (`pkill -STOP OneDrive`) - still locked
- ❌ Copy to /tmp - fails with "Resource deadlock avoided"
- ❌ Read from history folder - same error on all backups

**Working solution:**
- ✅ **Open in Excel app** (`open -a "Microsoft Excel" FILE.xlsx`)
- ✅ **Manual Save As workflow** (for paridade):
  1. Edit in OneDrive Excel normally
  2. File → Save As → `/tmp/Design-Discrepancy.xlsx` (overwrites previous)
  3. Kin reads from `/tmp/` (no OneDrive lock)
  4. Repeat Save As when you make changes (maintains paridade)

**Conclusion:**
- Python + OneDrive = incompatible for direct read
- Excel app = only reliable way to access OneDrive .xlsx files
- For paridade: Save As to `/tmp/` workflow (manual but reliable)

---

**Created:** 2026-02-10  
**Last updated:** 2026-02-12  
**Location:** `~/Documents/life/connections/onedrive.md`  
**Script:** `~/.openclaw/workspace/scripts/edit-excel.sh`
