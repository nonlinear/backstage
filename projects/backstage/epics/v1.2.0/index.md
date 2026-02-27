# Epic v1.2.0 - Contract Diagram Updates

**Enhancements and future features for contract diagram skill.**

---

## Features

### Manual Phase Check Button

**Problem:** Periodic update (5s) can fail silently. No way to force phase re-detection.

**Solution:** Add reload button in wrapper UI.

**Implementation:**
- Button in top-right corner (next to phase badge)
- On click:
  - Re-run detectPhase()
  - Update badge if phase changed
  - POST /write to save
  - Visual feedback (button animation/icon)

**Why:** User control when automatic update fails.

---

## Future Considerations

- Theme switcher (dark mode)
- Multiple diagrams per page with navigation
- Export rendered diagrams (SVG/PNG)
- Absolute path support (beyond engine directory)

---

**Created:** 2026-02-22  
**Status:** Backlog (pending v1.1.0 completion)
