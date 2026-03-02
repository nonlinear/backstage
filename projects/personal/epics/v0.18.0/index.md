# Epic Notes

> Version, name, status → see `epic.yaml`

---

# v0.18.0

### Open Source Notes

**Goal:** Self-hosted notes + reminders (replace/supplement Apple Notes + Reminders)

**Problem:** Apple Notes/Reminders = locked to Apple ecosystem, no self-hosted option

**Solution:** Docker-based notes app with iOS support, Siri integration, privacy-first

**Tasks:**
- [ ] Research options (SiYuan, Notesnook, flatnotes)
- [ ] Test SiYuan (Docker + iOS app + Siri + tags)
- [ ] Setup Docker container (NAS or Mac)
- [ ] iOS app configuration (sync, offline mode)
- [ ] Siri integration test (voice notes, reminders)
- [ ] Migration plan (export Apple Notes → import to SiYuan)
- [ ] Backup strategy (where data lives, how to backup)

**Details:** [epic-notes/v0.18.0-open-source-notes.md](epic-notes/v0.18.0-open-source-notes.md)

**Success Criteria:**
- Self-hosted notes running (Docker container)
- iOS app syncs with server
- Siri can create notes/reminders
- Tags work (organize notes)
- Privacy-first (E2E encryption or self-hosted = no third-party access)
