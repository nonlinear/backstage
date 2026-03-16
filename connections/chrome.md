---
service: "Chrome Relay"
description: "Automate browser (snapshots, clicks, forms), compare UI with design (Figma vs live), capture screenshots with accessibility tree, or test WCAG compliance"
extension: "OpenClaw Browser Relay"
---

# Chrome Relay - Browser Control

**What it is:** OpenClaw Browser Relay extension for Chrome automation (snapshots, clicks, form filling, etc.)

**When to use:**
- Design discrepancy exercises (compare live system with Figma)
- UI testing (WCAG checks, state testing)
- Form automation
- Screenshot capture with accessibility tree

---

## Installation

**Chrome Web Store link doesn't work** ("This item is not available")

**Use Developer Mode instead:**

1. **Install/update extension files:**
   ```bash
   openclaw browser extension install
   ```
   This copies extension to: `~/.openclaw/browser/chrome-extension`

2. Open Chrome extensions: `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right)
4. Click **"Load unpacked"**
5. Navigate to: `~/.openclaw/browser/chrome-extension`
6. Click **"Select"**

**Extension installed!** Look for OpenClaw icon in toolbar.

**After OpenClaw updates:** 
1. Re-run `openclaw browser extension install`
2. Reload extension in `chrome://extensions/` (⟳ icon)

---

## Configuration (First Time)

**Before first use, set gateway token:**

1. Chrome → `chrome://extensions/` → OpenClaw → **Details**
2. Scroll to **"Extension options"** → click link
3. Configure:
   - **Port:** 18792 (default)
   - **Gateway token:** Get from `echo $OPENCLAW_GATEWAY_TOKEN`
4. Click **Save**

**Without gateway token:** Extension shows `!` badge (WebSocket auth fails)

---

## Troubleshooting

### Extension shows "!" (error icon)

**Possible causes:**

1. **Gateway token missing/wrong** (most common after 2026.2.26 update)
   - Solution: Set token in Extension Options (see Configuration above)

2. **Host permissions missing** for external sites
   - Solution: Edit `~/.openclaw/browser/chrome-extension/manifest.json`:
     ```json
     "host_permissions": [
       "http://127.0.0.1/*",
       "http://localhost/*",
       "https://*/*",
       "http://*/*"
     ],
     ```
   - Then reload extension in `chrome://extensions/` (⟳ icon)

3. **Relay server not running**
   - Check: `curl http://127.0.0.1:18792/` should return "OK"
   - Solution: Restart gateway (`openclaw gateway restart`)

### Badge won't turn ON

- **Check:** Extension must be installed (no "!" icon)
- **Check:** Page must be loaded (not chrome:// URLs)
- **Try:** Refresh page, click icon again
- **Try:** Remove extension, load unpacked again

### Connection drops after reload

**Normal behavior!** Click icon again to reconnect.

---

## Usage

### Activate Relay on a Tab

1. Open the page you want to control
2. Click **OpenClaw Browser Relay icon** in toolbar
3. Badge turns **ON** (green/active)
4. Relay is connected to this tab

**Connection drops on page reload** - normal behavior, click icon again to reconnect.

---

## Commands

### Take Snapshot

```bash
browser action=snapshot profile=chrome
```

**Returns:** Accessibility tree with element references (e.g., `e12`, `e45`)

### Click Element

```bash
browser action=act profile=chrome request='{"kind":"click","ref":"e12"}'
```

### Type Text

```bash
browser action=act profile=chrome request='{"kind":"type","ref":"e45","text":"Hello"}'
```

---

## Gotchas

- **Badge must be ON** - if OFF, relay not connected (click icon)
- **Reload breaks connection** - click icon again after page reload
- **One tab at a time** - relay connects to one tab, switch by clicking icon on new tab
- **Developer mode warning** - Chrome shows "Extensions in developer mode" banner (ignore)
- **Gateway token required** (since 2026.2.26) - WebSocket auth will fail without it

---

## References

- **Extension location:** `~/.openclaw/browser/chrome-extension` (installed via `openclaw browser extension install`)
- **OpenClaw docs:** https://docs.openclaw.ai/tools/chrome-extension

---

*Created: 2026-02-12*  
*Updated: 2026-02-27* (gateway token requirement, new extension path)
