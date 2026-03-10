# Epic Notes

> Version, name, status → see `epic.yaml`

---

# v0.24.0 - Auto Indexing

**Goal:** Watch folders, automatically reindex on changes.

---

## Context

**Current workflow (manual):**
1. Add EPUB/PDF to `~/Documents/librarian/books/topic/`
2. Run `python index_library.py --smart`
3. Wait ~30s-5min (depending on library size)
4. Book now searchable

**Problem:**
- ❌ Manual step (easy to forget)
- ❌ Delay between adding book and it being searchable
- ❌ Friction (have to remember to reindex)

**Desired workflow (automatic):**
1. Add EPUB/PDF to `~/Documents/librarian/books/topic/`
2. *Watcher detects change automatically*
3. *Reindex happens in background*
4. Book searchable within 30s

---

## How It Works

**File watcher daemon:**
```python
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class LibrarianWatcher(FileSystemEventHandler):
    def on_created(self, event):
        if event.src_path.endswith(('.epub', '.pdf')):
            print(f"New book detected: {event.src_path}")
            reindex_file(event.src_path)
    
    def on_modified(self, event):
        if event.src_path.endswith(('.epub', '.pdf')):
            print(f"Book modified: {event.src_path}")
            reindex_file(event.src_path)

observer = Observer()
observer.schedule(LibrarianWatcher(), path="~/Documents/librarian/books/", recursive=True)
observer.start()
# Run forever (daemon mode)
```

**Reindex logic:**
- Extract topic from path: `books/chaos-magick/file.epub` → topic = `chaos-magick`
- Reindex only that file (incremental, fast)
- Update FAISS index for that topic
- If MCP server running: Hot-reload index in RAM

---

## Always-On (LaunchDaemon)

**plist:** `~/Library/LaunchAgents/com.librarian.watcher.plist`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.librarian.watcher</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/bin/python3</string>
        <string>/Users/nonlinear/Documents/librarian/watcher.py</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/tmp/librarian-watcher.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/librarian-watcher-error.log</string>
</dict>
</plist>
```

**Load:**
```bash
launchctl load ~/Library/LaunchAgents/com.librarian.watcher.plist
```

**Result:** Watcher starts at boot, runs forever, auto-reindexes books.

---

## Integration with MCP (v0.22.0)

**If MCP server running:**
- Watcher reindexes file → updates FAISS index
- Watcher notifies MCP server: "Index updated for topic X"
- MCP reloads index from disk → updates RAM copy
- Next query uses new index (includes new book)

**If MCP not running:**
- Watcher still reindexes (updates disk FAISS)
- Next time MCP starts → loads updated index

---

## Notifications (Optional)

**On reindex complete:**
```bash
# Send Telegram notification
curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
  -d "chat_id=$TELEGRAM_CHAT_ID" \
  -d "text=📚 New book indexed: [title] ([topic])"
```

**Use cases:**
- Nicholas adds book remotely (via Calibre-web)
- Gets notification when indexed
- Can query immediately via OpenClaw

---

## Tasks

See `epic.yaml` for task list.

---

## Success Criteria

- ✅ Add EPUB to folder → auto-indexed within 30s
- ✅ Watcher runs at boot (LaunchDaemon)
- ✅ MCP server hot-reloads index (if running)
- ✅ No manual reindex step needed

---

## Dependencies

**Requires:**
- Python `watchdog` library
- Existing indexing logic (already in `index_library.py`)

**Integrates with:**
- v0.22.0 (MCP server) - hot-reload indexes

**Blocks:**
- None (optional quality-of-life)

---

## Performance

**Current (manual reindex):**
- Add book → remember to reindex → run command → wait 30s-5min

**With watcher:**
- Add book → automatic → indexed in 30s → searchable

**Trade-offs:**
- ✅ Pro: Zero manual steps
- ✅ Pro: Always up-to-date
- ❌ Con: Watcher daemon uses ~20MB RAM (negligible)
- ❌ Con: CPU spike on large reindex (mitigated: incremental only)

---

## Open Questions

**Q1: Reindex on modify or only on create?**
- **Option A:** Both (user edits EPUB metadata)
- **Option B:** Create only (modify = noise)
- **Lean toward A** (metadata changes should reindex)

**Q2: Batch reindex if many files added?**
- **Scenario:** User adds 50 EPUBs at once
- **Option A:** Reindex all 50 sequentially (slow, blocks)
- **Option B:** Queue + batch (faster, smarter)
- **Defer to implementation** (start simple, optimize later)

**Q3: Notification threshold?**
- Send notification for EVERY book? (noisy)
- Or only for manual adds (not bulk imports)?
- **Defer to user preference** (configurable)

---

*Created: 2026-03-10*
