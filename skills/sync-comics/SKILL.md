---
name: sync-comics
description: Organize and sync comics from Downloads to NAS via terminal
version: 1.0.0
author: Nicholas Frota
emoji: 📚
requires:
  - python3
  - rsync
  - tmux
dependencies:
  python:
    - send2trash
    - python-dotenv
triggers:
  - "sync comics"
  - "organize comics"
  - "upload comics"
---

# Sync Comics

**What it does:** Opens Terminal running `sync_comics.py` in tmux session.

**Script location:** `~/.openclaw/workspace/skills/sync-comics/sync_comics.py`

---

## Protocol

**When triggered:**

```bash
# Create tmux session (don't run yet)
tmux new-session -d -s sync-comics

# Send command (prepopulated, NOT executed)
tmux send-keys -t sync-comics "cd ~/.openclaw/workspace/skills/sync-comics && python3 sync_comics.py"

# Open Terminal attached
osascript -e 'tell application "Terminal" to do script "tmux attach -t sync-comics"'
```

**User sees:** Command typed in Terminal, waiting for Enter.

No monitoring. No token waste.

---

## Configuration

**Uses .env variables:**
- `NAS_HOST`, `NAS_USER`, `NAS_PASS`
- Destination: `/srv/media/comics` on NAS

**Always merge:** `--ignore-existing` flag

---

## Troubleshooting

**"No module named 'send2trash'":**
```bash
pip3 install --break-system-packages send2trash python-dotenv
```

**Session died:**
- tmux server not running
- Restart: just trigger skill again

---

**Status:** ✅ Production
