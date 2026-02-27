# v0.19.0

### HA Fixes

**Goal:** Home Assistant improvements (guest mode, calendar integration, curtain sync)

**Tasks:**
- [ ] **Guest mode scene:**
  - Disable security cameras (privacy)
  - Limit smart speaker access
  - Unlock guest bedroom
  - Set thermostat comfort range
  - Automation: trigger on `input_boolean.guest_mode`, reverse on depart
  - Context: Define privacy/access rules (what guests can/cannot control)
- [ ] **Calendar integration:**
  - HA reads calendar (Google Calendar API or CalDAV)
  - Display upcoming events on dashboard
  - Automate based on calendar (pre-heat before events, etc.)
- [ ] **Curtain sync:**
  - Check email trigger (when email arrives → close curtain for privacy?)
  - Or: Morning routine (open curtain at sunrise)
  - Define trigger logic

**Details:** [epic-notes/v0.19.0-ha-fixes.md](epic-notes/v0.19.0-ha-fixes.md)

**Success Criteria:**
- Guest mode scene working (cameras off, bedroom unlocked, thermostat set)
- Calendar integration (events visible in HA, automations triggered)
- Curtain sync automation defined and tested

---
