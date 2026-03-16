---
service: "Time Machine"
description: "Restore files from backup, configure Time Machine targets, check backup status, or troubleshoot backup failures"
platform: macOS
---

# Time Machine - Mac Studio → NAS Backup

**Destination:** OpenMediaVault NAS (daddy)  
**Host:** 192.168.1.152  
**Share:** `smb://192.168.1.152/TimeMachine`  
**Access:** Guest (no password required)  
**Encryption:** ✅ Enabled  
**Encryption Password:** `DFXT8kmeSdnZCMc$NQrU` (stored in Proton Pass)

---

## Setup Summary

**NAS Side:**
- Path: `/srv/dev-disk-by-uuid-a8fb36c5-caa9-40a9-9b2d-39f90df88b50/TimeMachine`
- Samba config: `guest ok = yes`, `fruit:time machine = yes`
- Space allocated: 300GB custom limit

**Mac Studio Side:**
- System Settings → Time Machine
- Destination: TimeMachine (NAS)
- Encryption: Enabled
- Backup frequency: Hourly (automatic)
- First backup: 2026-03-01

---

## Browse Backups

### Via UI

1. Click Time Machine icon (menu bar)
2. "Browse Time Machine"
3. Navigate with arrows (timeline view)
4. Drag & drop to restore files

### Via CLI

**List all backups:**
```bash
tmutil listbackups
```

**Compare snapshots:**
```bash
tmutil compare SNAPSHOT1 SNAPSHOT2
```

**See what changed since last backup:**
```bash
tmutil calculatedrift /Volumes/TimeMachine/Backups.backupdb/
```

**Restore specific file:**
```bash
tmutil restore /path/to/backup/file.txt /destination/
```

**Latest backup info:**
```bash
tmutil latestbackup
```

**Backup status:**
```bash
tmutil status
```

---

## Git vs Time Machine

| | Git | Time Machine |
|---|-----|--------------|
| **Granularity** | Per commit (manual) | Hourly snapshots (automatic) |
| **Restore** | `git checkout` | UI or `tmutil restore` |
| **Space** | Efficient (delta) | Full snapshots (more space) |
| **Scope** | Specific repos | Entire system |
| **Use for** | Code/docs (fine control) | Disaster recovery (full system) |

**Use both:**
- **Git** = version control (code, docs, DRY commits)
- **Time Machine** = system backup (disaster recovery, accidental deletes)

---

## Troubleshooting

**If backup fails:**
```bash
# Check connection
ping 192.168.1.152

# Check if share is mounted
df -h | grep TimeMachine

# Remount manually
open "smb://192.168.1.152/TimeMachine"
```

**If encryption password lost:**
- ⚠️ **Backup is unrecoverable** without password
- Password stored in: Proton Pass (single source of truth)

---

## Space Management

**Current limit:** 300GB

**Adjust limit:**
1. System Settings → Time Machine
2. Click (i) next to TimeMachine destination
3. Disk Usage Limit → Custom Limit → adjust

**Why 300GB:**
- NAS has 373GB free
- Mac Studio ~493GB total
- 300GB = safety margin + multiple snapshots

---

## Related

- `connections/nas.md` - NAS services overview
- `connections/nas-ssh.md` - SSH access to NAS

---

**Created:** 2026-03-01 22:20 EST
