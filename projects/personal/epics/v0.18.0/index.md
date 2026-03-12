# Open Source Notes

**Problem:** Apple Notes/Reminders locked to Apple ecosystem, no self-hosted option, privacy concerns.

**Solution:** Self-hosted SiYuan (Docker) with iOS app + Siri integration.

---

## Why SiYuan?

**Features:**
- ✅ Docker support (self-hosted)
- ✅ iOS app (native, not PWA)
- ✅ Siri integration (voice notes)
- ✅ Tags + backlinks (block-based, Notion-like)
- ✅ Privacy-first (self-hosted, no cloud)
- ✅ Markdown + rich text
- ✅ Offline mode (sync when online)

**GitHub:** https://github.com/siyuan-note/siyuan

---

## Comparison Table

| Feature | SiYuan | Notesnook | flatnotes |
|---------|--------|-----------|-----------|
| **Docker** | ✅ Yes | ✅ Yes | ✅ Yes |
| **iOS App** | ✅ Native | ✅ Native | ❌ PWA only |
| **Siri** | ✅ Native | ⚠️ Shortcuts | ❌ No |
| **Tags** | ✅ Yes | ✅ Yes | ✅ Frontmatter |
| **Privacy** | ✅ Self-hosted | ✅ E2E encrypted | ✅ Self-hosted |
| **Offline** | ⚠️ Partial | ✅ Full | ⚠️ PWA cache |
| **Markdown** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Backlinks** | ✅ Yes | ❌ No | ❌ No |

**Winner:** **SiYuan** (best iOS + Siri + self-hosted balance)

---

## Docker Setup

```bash
docker run -d \
  -v ~/siyuan:/siyuan/workspace \
  -p 6806:6806 \
  --name siyuan \
  --restart unless-stopped \
  b3log/siyuan
```

**Access:** http://localhost:6806

---

## iOS App Configuration

**App Store:** Search "SiYuan"

**Configuration:**
- Server URL: http://NAS_IP:6806 (or Tailscale URL for remote access)
- Auth: Login with self-hosted account
- Sync: Automatic (when online), manual trigger available

**Offline mode:**
- Notes cached locally (read/write offline)
- Sync when reconnected

---

## Siri Integration

**Native commands:**
- "Create a note" → Opens SiYuan iOS app
- "Add to notes" → Voice dictation → Save

**Shortcuts custom commands:**
- "Quick note to SiYuan" → Capture text → Send to SiYuan API
- "SiYuan reminder" → Create note with tag #reminder

---

## Technical Details

### Storage
- Markdown files (plaintext, portable)
- SQLite database (index, metadata)
- Assets folder (images, attachments)

### Data location
- Docker volume: `~/siyuan/workspace/`
- Notes: `~/siyuan/workspace/data/`
- Assets: `~/siyuan/workspace/assets/`

### Backup
```bash
# Backup entire workspace
tar -czf siyuan-backup-$(date +%Y%m%d).tar.gz ~/siyuan/

# Restore
tar -xzf siyuan-backup-20260214.tar.gz -C ~/
```

---

## Privacy Considerations

**Self-Hosted (SiYuan):**
- ✅ Data stays on your server (NAS/Mac)
- ✅ No third-party access
- ✅ Full control over backups
- ⚠️ Requires server always-on (for sync)
- ⚠️ Remote access needs VPN/Tailscale (security)

**Recommendation:** Self-hosted = simpler, privacy via ownership

---

## Open Questions

1. **Server location:** NAS or Mac?
   - NAS = always-on, better for sync
   - Mac = local, requires always-on or manual sync

2. **Remote access:** VPN or Tailscale?
   - Tailscale = easier, zero-config mesh network

3. **Migration strategy:** Apple Notes → SiYuan?
   - Manual copy (slow, preserves formatting)
   - Automation script (fast, may lose some formatting)

4. **Backup frequency:** Daily, weekly, or on-change?
   - Daily = safer, more storage

5. **Tags vs. folders:** How to organize?
   - Tags = flexible, cross-cutting
   - SiYuan supports both

---

## Success Criteria

- ✅ Self-hosted notes running (Docker on NAS/Mac)
- ✅ iOS app syncs with server
- ✅ Siri can create notes/reminders
- ✅ Tags work (organize by tags)
- ✅ Privacy-first (data on own server)
- ✅ Migration complete (Apple Notes → SiYuan)
- ✅ Backup strategy documented

---

**Status:** Research phase. Setup SiYuan Docker container, test iOS app.
