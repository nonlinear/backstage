# macOS Automation & Tricks

**What:** Native macOS commands, automation, config tweaks

---

## Mac Studio Server Config

**Mac Studio = servidor. Sleep OFF permanentemente.**

```bash
sudo pmset -a sleep 0          # System sleep OFF
sudo pmset -a displaysleep 0   # Display sleep OFF
sudo pmset -a disksleep 0      # Disk sleep OFF
```

**Why:**
- Mac Studio = always-on server (não laptop)
- Sleep throttles performance (network, CPU, I/O)
- Agent night jobs precisam full speed
- Downloads/processing unassisted (8+ hours)

**Verify config:**
```bash
pmset -g | grep sleep
```

**Expected output:**
```
 disksleep            0
 sleep                0
 displaysleep         0
```

**Applied:** 2026-02-26 (v0.25.0 Local LLM epic)

---

## Dock Management

### Remove All Dock Icons
```bash
defaults write com.apple.dock persistent-apps -array
killall Dock
```

**What it does:**
- Clears all persistent apps from Dock
- Fresh slate (no icons)
- Dock restarts automatically

**Use case:** Clean setup, minimal Dock, start fresh

---

## Universal Control / Clipboard Sharing

**Status:** ✅ Works (tested 2026-02-19)

**What it is:**
- Share keyboard/mouse between Mac + iPad/iPhone
- Universal Clipboard (copy on one device, paste on another)

**Requirements:**
- Same Apple ID on all devices
- Bluetooth + WiFi enabled
- Devices on same network (or close enough for peer-to-peer)

**How to enable:**
1. **System Settings → Displays**
2. Enable "Link keyboard and mouse"
3. Verify Handoff enabled (Settings → General → AirDrop & Handoff)

**Clipboard sharing:**
- Copy on Mac → paste on iPad (works seamlessly)
- Copy on iPad → paste on Mac (works seamlessly)

---

*Created: 2026-02-19*
