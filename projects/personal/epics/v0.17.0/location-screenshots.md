# v0.17.0 - Location on Screenshots

## Context Snapshot
- **Why this exists:** Add GPS location metadata to screenshots automatically (helps memory/context when reviewing later)
- **Problem solved:** macOS/iOS screenshots don't include GPS EXIF by default (privacy design)
- **Date:** 2026-02-14
- **Assumptions:** Doesn't need EXACT location, just helpful context. Low battery impact preferred.

---

## Research Summary (2026-02-14)

### Challenge
**Screenshots don't have GPS data by default** (privacy design choice by Apple)

**Why:** Screenshots are UI captures, not photos. OS assumes no location context needed.

**Use case:** Want location context when reviewing old screenshots (where was I when I took this?)

---

## Solutions Analysis

### Option 1: Exiftool + Location Service (Manual/Script)
**How:**
- Post-process screenshots with current location
- Command: `exiftool -GPSLatitude=X -GPSLongitude=Y screenshot.png`
- Requires location permission + automation

**Pros:**
- Works on macOS + iOS (via SSH/script)
- Precise control over metadata

**Cons:**
- Requires exiftool installed
- Need location service running (battery impact)
- Manual trigger or cronjob (delayed tagging)

**Implementation:**
```bash
#!/bin/bash
# Get current location (via CoreLocation API or service)
LAT=$(get_current_lat)
LON=$(get_current_lon)

# Tag all new screenshots
for file in ~/Pictures/screenshots/*.png; do
  exiftool -GPSLatitude="$LAT" -GPSLongitude="$LON" "$file"
done
```

---

### Option 2: Shortcuts (iOS)
**How:**
- iOS Shortcuts automation
- Trigger: Screenshot taken
- Action: Get current location → Embed EXIF → Save to Photos

**Pros:**
- Built-in (no third-party tools)
- Reliable (iOS automation framework)
- Can customize (choose precision, add timestamp)

**Cons:**
- iOS only (doesn't help macOS)
- Requires Shortcuts automation setup
- May prompt for location permission each time (if strict privacy settings)

**Implementation:**
1. Create Shortcut: "Tag Screenshot with Location"
2. Automation trigger: Screenshot taken (detect new file in Photos)
3. Actions:
   - Get current location
   - Get latest screenshot
   - Set EXIF metadata (GPSLatitude, GPSLongitude)
   - Save modified screenshot

---

### Option 3: Hazel (macOS)
**How:**
- Hazel watches `~/Pictures/screenshots/` folder
- Rule: On new file → Add location metadata (via exiftool)
- Location from system location service (CoreLocation)

**Pros:**
- Automatic (no manual trigger)
- Works for ALL screenshots (keyboard shortcut, screenshot app)
- Can customize (filters, conditions)

**Cons:**
- Requires Hazel license ($42)
- Requires exiftool installed
- Need location service running (battery impact)

**Implementation:**
1. Install Hazel
2. Install exiftool (`brew install exiftool`)
3. Create Hazel rule:
   - Watch folder: `~/Pictures/screenshots/`
   - Condition: Kind is Image
   - Action: Run shell script (get location → tag EXIF)

**Script:**
```bash
#!/bin/bash
# Get current location (via CoreLocation wrapper or service)
LAT=$(location -l | cut -d',' -f1)
LON=$(location -l | cut -d',' -f2)

# Tag file
exiftool -GPSLatitude="$LAT" -GPSLongitude="$LON" -overwrite_original "$1"
```

---

### Option 4: Custom Script (Hook Screenshot Event)
**How:**
- Monitor screenshot keyboard shortcut (Cmd+Shift+4/5)
- Hook event → Geolocate → Tag EXIF

**Pros:**
- Immediate tagging (no delay)
- Custom logic (choose when to tag, precision level)

**Cons:**
- **Gotcha:** macOS screenshots trigger on keyboard shortcut (harder to hook than file creation)
- Requires custom scripting (Hammerspoon, Karabiner-Elements, or Accessibility API)
- Fragile (OS updates may break hook)

**Implementation (via Hammerspoon):**
```lua
hs.hotkey.bind({"cmd", "shift"}, "4", function()
  -- Trigger screenshot
  os.execute("screencapture -i ~/Pictures/screenshots/screenshot.png")
  
  -- Get location
  local lat, lon = get_current_location()
  
  -- Tag EXIF
  os.execute(string.format("exiftool -GPSLatitude=%s -GPSLongitude=%s ~/Pictures/screenshots/screenshot.png", lat, lon))
end)
```

---

## Recommendation

### iOS: Shortcuts Automation (BEST)
**Why:**
- Built-in, reliable, no third-party tools
- Easy to setup
- Low battery impact (triggers only on screenshot)

**Setup:**
1. Create Shortcut: "Tag Screenshot with Location"
2. Automation: Screenshot taken → Run shortcut
3. Actions: Get location → Tag EXIF → Save

---

### macOS: Hazel Rule + Exiftool (BEST)
**Why:**
- Automatic (watch folder, no manual trigger)
- Works for ALL screenshot methods (keyboard, app, third-party)
- Reliable (file creation event easier to hook than keyboard shortcut)

**Setup:**
1. Install Hazel ($42 license)
2. Install exiftool (`brew install exiftool`)
3. Create Hazel rule (watch `~/Pictures/screenshots/`, run script on new file)

---

## Trade-Offs

### Battery Impact
**Continuous location monitoring** (Option 1, 3, 4):
- Drains battery (GPS always on)
- Not needed if tagging AFTER screenshot (file creation event)

**On-demand location** (Option 2, 3):
- Get location only when screenshot taken
- Lower battery impact
- Slight delay (1-2 seconds to get GPS fix)

**Recommendation:** On-demand (get location when screenshot detected, not continuous monitoring)

---

### Accuracy vs Privacy
**Exact location:**
- Accurate GPS (within meters)
- Privacy concern (EXIF visible if screenshot shared)

**Approximate location:**
- City/neighborhood level (not exact address)
- Less privacy risk
- Still helpful for memory ("oh, this was in Brooklyn")

**Recommendation:** Approximate location (city/neighborhood) unless exact needed

---

## Implementation Plan

### Phase 1: iOS Setup (Quick Win)
- [ ] Create Shortcuts automation (screenshot → get location → tag EXIF)
- [ ] Test accuracy (does location tag correctly?)
- [ ] Test battery impact (is it noticeable?)

### Phase 2: macOS Setup (Hazel)
- [ ] Purchase Hazel license (if not already owned)
- [ ] Install exiftool (`brew install exiftool`)
- [ ] Create Hazel rule (watch Screenshots folder)
- [ ] Write shell script (get location → tag EXIF)
- [ ] Test automation (take screenshot, verify EXIF tagged)

### Phase 3: Privacy Review
- [ ] Test screenshot sharing (is GPS EXIF visible to others?)
- [ ] Document when to disable (privacy mode, work screenshots)
- [ ] Create toggle (enable/disable automation easily)

### Phase 4: Refinement
- [ ] Adjust accuracy (exact vs approximate location)
- [ ] Monitor battery impact (continuous vs on-demand)
- [ ] Add timestamp metadata (when screenshot taken)
- [ ] Document setup (README for future reference)

---

## Tools Needed

### macOS
- **Hazel** ($42 license) - https://www.noodlesoft.com/
- **Exiftool** (free) - `brew install exiftool`
- **Location service** (CoreLocation wrapper) - `brew install location` or custom script

### iOS
- **Shortcuts** (built-in, free)
- **Location permission** (Settings → Privacy → Location Services)

---

## Open Questions

1. **Location service on macOS:** Which tool to use?
   - Option A: `location` CLI tool (brew install location)
   - Option B: Custom CoreLocation wrapper script
   - Option C: Third-party service (GPSd, etc.)

2. **Privacy mode:** How to toggle on/off?
   - Option A: Disable Hazel rule manually (Settings → Hazel → Disable)
   - Option B: Keyboard shortcut to toggle (Hammerspoon script)
   - Option C: Contextual (disable at work, enable at home)

3. **Accuracy level:** Exact GPS or approximate?
   - Exact = privacy risk if screenshot shared
   - Approximate = less risk, still helpful
   - User choice? (toggle in Shortcuts/Hazel)

4. **Timestamp metadata:** Add when screenshot taken?
   - EXIF already has DateTimeOriginal (file creation time)
   - Add custom tag (DateTimeScreenshot)?
   - Useful for sorting/filtering later

---

## Success Criteria

- ✅ Screenshots auto-tagged with location (macOS + iOS)
- ✅ Location accurate enough (doesn't need EXACT, just helpful)
- ✅ Low battery impact (not continuous monitoring)
- ✅ Easy to disable when needed (privacy mode)
- ✅ Works for ALL screenshot methods (keyboard, app, third-party)
- ✅ Documented setup (README for future reference)

---

## Related Epics
- v0.11.0 - NAS Cleanup (organize screenshots with location metadata)
- v0.5.0 - Home Augmented Calendar (location context for events)

---

**Status:** 🔍 RESEARCH PHASE
**Next:** Setup iOS Shortcuts automation (quick test), then decide on macOS tool (Hazel vs custom script)
