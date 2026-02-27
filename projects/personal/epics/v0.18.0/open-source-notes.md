# v0.18.0 - Open Source Notes

## Context Snapshot
- **Why this exists:** Self-hosted notes + reminders (replace/supplement Apple Notes + Reminders)
- **Problem solved:** Apple Notes/Reminders locked to Apple ecosystem, no self-hosted option, want privacy-first alternative
- **Date:** 2026-02-14
- **Assumptions:** NAS or Mac running Docker, iOS device, want Siri integration, tag-first organization

---

## Research Summary (2026-02-14)

### Problem
**Apple Notes/Reminders = locked ecosystem:**
- Cannot self-host (iCloud only)
- Cannot access from non-Apple devices (Android, Linux, web)
- Privacy concerns (data stored on Apple servers)
- Limited automation (no API, no third-party integrations)

**Use case:**
- Want self-hosted notes (own data)
- iOS app + Siri integration (same UX as Apple Notes)
- Tags for organization (not folders)
- Privacy-first (E2E encryption or self-hosted = no third-party access)

---

## Solutions Analysis

### Option 1: SiYuan (BEST)
**GitHub:** https://github.com/siyuan-note/siyuan

**Features:**
- ✅ Docker support (self-hosted)
- ✅ iOS app (native, not PWA)
- ✅ Siri integration (voice notes)
- ✅ Tags + backlinks (block-based, Notion-like)
- ✅ Privacy-first (self-hosted, no cloud)
- ✅ Markdown + rich text
- ✅ Offline mode (sync when online)

**Docker command:**
```bash
docker run -d \
  -v ~/siyuan:/siyuan/workspace \
  -p 6806:6806 \
  --name siyuan \
  b3log/siyuan
```

**Pros:**
- Full iOS app (not just web wrapper)
- Siri integration (can create notes via voice)
- Tag-focused (organize by tags, not folders)
- Block-based editing (Notion-style)
- Self-hosted (own data, no third-party servers)

**Cons:**
- Requires server running (NAS or always-on Mac)
- iOS app requires network access to server (no full offline mode)
- Learning curve (block-based editing different from Apple Notes)

**Recommendation:** **BEST option** (full iOS + Siri + self-hosted)

---

### Option 2: Notesnook
**GitHub:** https://github.com/streetwriters/notesnook

**Features:**
- ✅ Docker support (self-hosted)
- ✅ iOS app (native)
- ✅ Siri integration (via shortcuts)
- ✅ E2E encrypted (zero-knowledge encryption)
- ✅ Tags + notebooks
- ✅ Markdown support

**Docker setup:**
- Self-hosted server (sync server, not notes storage)
- Notes stored locally (encrypted), server only syncs

**Pros:**
- E2E encryption (zero-knowledge, even server can't read notes)
- iOS app + Siri (via Shortcuts integration)
- Tag-first organization
- Offline mode (notes stored locally)

**Cons:**
- Requires Shortcuts for Siri (not native Siri integration)
- More complex setup (self-hosted sync server)
- Encryption adds overhead (slower sync)

**Recommendation:** Good alternative if E2E encryption critical

---

### Option 3: flatnotes
**GitHub:** https://github.com/dullage/flatnotes

**Features:**
- ✅ Docker support (self-hosted)
- ⚠️ Web-only (PWA, no native iOS app)
- ❌ No Siri integration
- ✅ Tags via frontmatter (markdown files)
- ✅ Simple, lightweight (just markdown files)

**Docker command:**
```bash
docker run -d \
  -v ~/flatnotes:/data \
  -p 8080:8080 \
  --name flatnotes \
  dullage/flatnotes
```

**Pros:**
- Simplest setup (just markdown files)
- Lightweight (no database, just files)
- Tag-based (frontmatter tags)

**Cons:**
- **No native iOS app** (web-only, PWA)
- **No Siri integration** (web app can't access Siri)
- Limited offline mode (PWA cache, not full offline)

**Recommendation:** Only if web-only acceptable (not ideal for iOS/Siri)

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
| **Complexity** | ⚠️ Medium | ⚠️ High | ✅ Low |

**Winner:** **SiYuan** (best iOS + Siri + self-hosted balance)

---

## Implementation Plan

### Phase 1: Docker Setup (SiYuan)
- [ ] Install Docker on NAS or Mac
- [ ] Run SiYuan container:
  ```bash
  docker run -d \
    -v ~/siyuan:/siyuan/workspace \
    -p 6806:6806 \
    --name siyuan \
    --restart unless-stopped \
    b3log/siyuan
  ```
- [ ] Access web UI: http://localhost:6806
- [ ] Create account (local, self-hosted)

### Phase 2: iOS App Configuration
- [ ] Download SiYuan iOS app (App Store)
- [ ] Configure server URL (http://NAS_IP:6806 or http://localhost:6806)
- [ ] Test sync (create note on iOS → verify on web)
- [ ] Test offline mode (airplane mode → create note → reconnect → sync)

### Phase 3: Siri Integration
- [ ] Test Siri commands:
  - "Hey Siri, create a note in SiYuan"
  - "Hey Siri, add a reminder in SiYuan"
- [ ] Configure Shortcuts (if needed for custom Siri commands)
- [ ] Test voice dictation (speak note content)

### Phase 4: Migration from Apple Notes
- [ ] Export Apple Notes (manual copy or automation script)
- [ ] Import to SiYuan (paste markdown, preserve tags)
- [ ] Verify migration (all notes present, tags preserved)
- [ ] Test search (find old notes)

### Phase 5: Backup Strategy
- [ ] Document data location (~/siyuan/workspace/)
- [ ] Setup backup (rsync, Time Machine, or NAS backup)
- [ ] Test restore (delete container → restore from backup → verify)

---

## Technical Details

### SiYuan Architecture
**Storage:**
- Markdown files (plaintext, portable)
- SQLite database (index, metadata)
- Assets folder (images, attachments)

**Sync:**
- WebDAV (self-hosted sync)
- S3-compatible (optional, for cloud sync)
- Local network (direct server access)

**Data location:**
- Docker volume: `~/siyuan/workspace/`
- Notes: `~/siyuan/workspace/data/`
- Assets: `~/siyuan/workspace/assets/`

**Backup:**
```bash
# Backup entire workspace
tar -czf siyuan-backup-$(date +%Y%m%d).tar.gz ~/siyuan/

# Restore
tar -xzf siyuan-backup-20260214.tar.gz -C ~/
```

---

### iOS App Details
**App Store:** Search "SiYuan"

**Configuration:**
- Server URL: http://NAS_IP:6806 (or Tailscale URL for remote access)
- Auth: Login with self-hosted account
- Sync: Automatic (when online), manual trigger available

**Offline mode:**
- Notes cached locally (read/write offline)
- Sync when reconnected
- Conflict resolution (last-write-wins or manual merge)

---

### Siri Integration
**Native commands:**
- "Create a note" → Opens SiYuan iOS app
- "Add to notes" → Voice dictation → Save

**Shortcuts custom commands:**
- "Quick note to SiYuan" → Capture text → Send to SiYuan API
- "SiYuan reminder" → Create note with tag #reminder

**API endpoint:**
```bash
# Create note via API (for Shortcuts)
curl -X POST http://localhost:6806/api/block/insertBlock \
  -H "Authorization: token YOUR_API_TOKEN" \
  -d '{"dataType": "markdown", "data": "# Quick Note\n\nContent here", "notebook": "default"}'
```

---

## Privacy Considerations

### Self-Hosted (SiYuan, flatnotes)
**Pros:**
- Data stays on your server (NAS/Mac)
- No third-party access
- Full control over backups

**Cons:**
- Requires server always-on (for sync)
- Remote access needs VPN/Tailscale (security)

### E2E Encrypted (Notesnook)
**Pros:**
- Zero-knowledge encryption (server can't read notes)
- Secure even if server compromised

**Cons:**
- Slower sync (encryption overhead)
- Password loss = data loss (no recovery)

**Recommendation:** Self-hosted (SiYuan) = simpler, privacy via ownership

---

## Open Questions

1. **Server location:** NAS or Mac?
   - NAS = always-on, better for sync
   - Mac = local, requires always-on or manual sync

2. **Remote access:** VPN or Tailscale?
   - VPN = traditional, more setup
   - Tailscale = easier, zero-config mesh network

3. **Migration strategy:** Apple Notes → SiYuan?
   - Manual copy (slow, preserves formatting)
   - Automation script (fast, may lose some formatting)

4. **Backup frequency:** Daily, weekly, or on-change?
   - Daily = safer, more storage
   - On-change = efficient, requires automation

5. **Tags vs. folders:** How to organize?
   - Tags = flexible, cross-cutting
   - Folders = hierarchical, traditional
   - SiYuan supports both (choose workflow)

---

## Success Criteria

- ✅ Self-hosted notes running (Docker container on NAS/Mac)
- ✅ iOS app syncs with server (create note on iOS → visible on web)
- ✅ Siri can create notes/reminders (voice commands work)
- ✅ Tags work (organize notes by tags)
- ✅ Privacy-first (data on own server, no third-party access)
- ✅ Migration complete (Apple Notes → SiYuan, all notes present)
- ✅ Backup strategy documented (how to backup, how to restore)

---

## Related Epics
- v0.5.0 - Home Augmented Calendar (integrate notes with calendar events)
- v0.11.0 - NAS Cleanup (organize notes storage)
- v0.12.0 - Media Automation (notes for media tracking, watchlists)

---

**Status:** 🔍 RESEARCH PHASE
**Next:** Setup SiYuan Docker container (Phase 1), test iOS app (Phase 2)
