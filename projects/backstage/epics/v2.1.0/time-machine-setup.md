# Time Machine → NAS Setup

**Status:** Pending (SSH unavailable, execute when home)

---

## NAS Space Check Needed

**Run when home:**

```bash
ssh nonlinear@192.168.68.79 "df -h /volume1"
```

**Decide quota based on output** (recommend 1.5TB-2TB for Mac Studio backups).

---

## Setup Steps

### NAS Side (http://192.168.68.79:5000)

1. **Shared Folder → Create**
   - Name: `Sync/studio`
   - Quota: 1.5TB (adjust after checking free space)
   - Permissions: nonlinear = Read/Write

2. **File Services → SMB → Enable**

---

### Mac Studio Side

**System Settings → Time Machine:**

1. Add Backup Disk → `smb://192.168.68.79/Sync/studio`
2. **✅ Encrypt backup disk**
3. Password: `DFXT8kmeSdnZCMc$NQrU` (from Proton Pass)
4. Start backup

---

## Password

**Single source:** Proton Pass  
**Value:** `DFXT8kmeSdnZCMc$NQrU`

⚠️ **Without password = cannot restore backup!**

---

**Documented:** 2026-03-01 (Kin)
