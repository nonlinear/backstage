# Epic Notes

> Version, name, status → see `epic.yaml`

---

# v0.1.0 - Visual Communication (Graphs & Images)

**Target:** Week of Feb 3


## Problem

Need to show graphs and images across different communication channels:
- Web chat (no inline image support)
- iMessage (should work, but BlueBubbles blocked)
- Future: Signal, Telegram, Discord

Current state:
- ❌ Screenshots don't render in web chat (MEDIA: paths)
- ❌ `read` tool images don't render in web chat
- ❌ iMessage attachments fail (BlueBubbles Private API disabled)


## Solution

**Channel-aware rendering:**
- Detect current channel (webchat vs imessage vs etc.)
- Adapt output method:
  - **Web chat:** HTML gallery → Chrome → user sees there
  - **iMessage/mobile:** Send as attachments → inline display
  - **Disposable:** Graphs are ephemeral visualizations
  - **Persistent:** Save .md source only when requested


## Architecture

### Mermaid Graphs
```
1. Generate Mermaid code
2. Create HTML (file:// with Mermaid.live CDN)
3. Open in Chrome
4. User sees rendered graph
5. Clean up temp files (optional)
```

### NAS Images
```
1. Python picks random/filtered images
2. IF web chat:
     Create HTML gallery with file:// links
     Open Chrome
   ELSE IF imessage:
     read() each image
     Send as attachments
3. User sees images inline
```


## Tasks

- [x] Mermaid rendering proof-of-concept
- [x] NAS access via SMB
- [x] Python for large folders (25k files)
- [x] Channel detection logic
- [x] HTML gallery template
- [ ] Enable BlueBubbles Private API
- [ ] Test iMessage attachment flow
- [ ] Create reusable gallery component
- [ ] Global graph styles (`graph-styles.css`)
- [ ] Auto-cleanup temp files


## Blockers

### BlueBubbles Private API
**Issue:** iMessage attachment sending requires Private API  
**Requirement:** Disable SIP (System Integrity Protection) on Mac running BlueBubbles server  
**Risk:** Security implications  
**Alternative:** Use Google Messages Bridge or other service


## Technical Notes

### What Works
- ✅ Mermaid renders beautifully in Chrome
- ✅ NAS images accessible via `/tmp/nas-mount`
- ✅ Python `os.listdir()` fast even with 25k files
- ✅ Channel detection via message context

### What Doesn't
- ❌ Web chat doesn't render MEDIA: paths inline
- ❌ BlueBubbles can't send attachments (Private API disabled)
- ❌ Shell commands (`ls`, `find`) timeout on large SMB folders

### Patterns Discovered
- **Python > Shell** for SMB operations
- **file:// URLs** work perfectly for local galleries
- **Disposable by default** - only persist when asked
- **read tool** works for images but doesn't auto-send


## Future Enhancements

1. **Global graph styles**
   - Consistent color schemes
   - Dark mode by default
   - Custom fonts (SF Pro)
   - Reusable themes

2. **Gallery templates**
   - Grid layout (current)
   - Slideshow mode
   - Lightbox/zoom
   - Captions/metadata

3. **Smart cleanup**
   - Auto-delete temp HTML after view
   - Periodic MEDIA: path cleanup (>7 days old)


## Success Criteria

- ✅ Graphs render in Chrome on demand
- ✅ Images from NAS display in Chrome galleries
- ⏳ iMessage receives images as inline attachments
- ⏳ User can request "save this graph" → gets .md
- ⏳ Global styles applied consistently


## Session Log

### 2026-01-30 - Discovery & POC
- Discovered web chat doesn't render images inline
- Built Mermaid → HTML → Chrome pipeline
- Configured NAS SMB access
- Python solved large folder performance issue
- Created librarian project timeline graph (success!)
- Showed 5 random xxx images via Chrome gallery
- Attempted iMessage send → discovered Private API blocker

**Key insight:** Same pattern works for graphs AND images - render local, show where possible.


*Epic active - updates ongoing*


## Agenda Dashboard Fixes (2026-02-09)

### Problems Found
1. Moon phase script didn't save JSON
2. Calendar stopped updating (last update Feb 6)
3. Jira shows "nothing overdue" (Nicholas says tasks exist)
4. Projects count outdated (librarian branches not reflected)
5. GEAR tab missing counts (notes, backstage)

### Fixes Applied
- ✅ Moon phase script now saves to `~/Documents/wiley/data/moon-phase.json`
- ✅ Calendar update added to HEARTBEAT.md (runs every ~30min)
- ✅ Agenda reload automation in HEARTBEAT
- ❌ Jira still debugging (query returns empty, but tasks exist)
- ❌ Projects/notes/backstage counts TODO

### Technical Details
**Moon phase fix:**
```bash
# Script now saves JSON after echoing
echo "$output" > ~/Documents/wiley/data/moon-phase.json
```

**Calendar update (added to HEARTBEAT):**
```bash
export GOG_ACCOUNT=Nicholas.frota@gmail.com
gog calendar events --today --json > ~/.openclaw/workspace/data/calendar-today.json
gog calendar events --from "$(date -v+1d '+%Y-%m-%dT00:00:00%z')" --to "$(date -v+1d '+%Y-%m-%dT23:59:59%z')" --json > ~/.openclaw/workspace/data/calendar-tomorrow.json
```

**Agenda reload (AppleScript):**
```bash
osascript -e 'tell application "Agenda" to activate' \
  -e 'delay 0.5' \
  -e 'tell application "System Events" to keystroke "r" using command down'
```

### Next Steps
- [ ] Debug Jira query (why empty results?)
- [ ] Add projects count update to HEARTBEAT
- [ ] Add notes count to GEAR tab
- [ ] Add backstage count to GEAR tab
- [ ] Test all dashboard sections load correctly
