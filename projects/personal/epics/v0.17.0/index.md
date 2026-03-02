# Epic Notes

> Version, name, status → see `epic.yaml`

---

# v0.17.0

### Location on Screenshots

**Goal:** Auto-tag screenshots with GPS location (helps memory/context)

**Problem:** macOS/iOS screenshots don't include GPS EXIF by default (privacy design)

**Solution:** Automated cronjob/workflow to add location metadata after screenshot taken

**Tasks:**
- [ ] Research location tagging methods (exiftool, Shortcuts, Hazel, custom script)
- [ ] **iOS:** Setup Shortcuts automation (screenshot → get location → embed EXIF)
- [ ] **macOS:** Setup Hazel rule (watch Screenshots folder → add location on new file)
- [ ] Test accuracy (location precision vs battery impact)
- [ ] Privacy review (when to enable/disable auto-tagging)
- [ ] Document setup (Hazel rules, Shortcuts workflow)

**Details:** [epic-notes/v0.17.0-location-screenshots.md](epic-notes/v0.17.0-location-screenshots.md)

**Success Criteria:**
- Screenshots auto-tagged with location (macOS + iOS)
- Location accurate enough (doesn't need EXACT, just helpful)
- Low battery impact (not continuous monitoring)
- Easy to disable when needed (privacy mode)
