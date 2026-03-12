# HA Fixes (Guest Mode + Calendar + Curtains)

**Problem:** Need guest privacy mode, calendar-based automations, curtain automation unclear.

**Solution:** Home Assistant scenes + calendar integration + smart curtain sync.

---

## 1. Guest Mode Scene

**Goal:** Privacy mode for guests (disable cameras, limit access, comfort settings).

**Components:**
1. **Disable security cameras** (privacy)
   - Turn off cameras in guest areas (bedroom, bathroom, hallway)
   - Keep front door camera (security)

2. **Limit smart speaker access** (privacy)
   - Disable voice commands in guest bedroom OR
   - Create guest profile (limited commands)

3. **Unlock guest bedroom** (access)
   - If smart lock installed → unlock
   - OR: Send temporary PIN code

4. **Set thermostat comfort range** (comfort)
   - Set to 68-72°F (20-22°C)
   - OR: Let guest control via dashboard

**Automation trigger:**
- `input_boolean.guest_mode` → ON (manual toggle)
- Reverse on OFF

**Implementation:**
```yaml
scene:
  - name: Guest Mode
    entities:
      camera.living_room: off
      camera.hallway: off
      camera.guest_bedroom: off
      camera.front_door: on  # Keep for security
      lock.guest_bedroom: unlocked
      climate.thermostat:
        temperature: 70
        hvac_mode: auto
```

---

## 2. Calendar Integration

**Options:**

### Option A: Google Calendar (Cloud)
- ✅ Easy setup (official integration)
- ✅ Real-time sync
- ❌ Cloud-dependent (privacy concerns)

### Option B: CalDAV (Self-Hosted)
- ✅ Self-hosted (privacy)
- ✅ No cloud dependency
- ❌ More setup (need calendar server)
- ❌ Manual sync (not real-time)

**Recommendation:** Google Calendar (easier), migrate to CalDAV later if privacy critical.

**Calendar Automations:**
```yaml
# Pre-heat before meeting
automation:
  - alias: Pre-heat before meeting
    trigger:
      - platform: calendar
        entity_id: calendar.work
        event: start
        offset: "-00:30:00"  # 30 min before
    action:
      - service: climate.set_temperature
        target:
          entity_id: climate.office
        data:
          temperature: 72
```

---

## 3. Curtain Sync

**Possible triggers:**

### Option A: Email arrives → Close curtain (privacy)
**Use case:** Working from home, email notification → close curtain for video call privacy

### Option B: Morning routine → Open curtain at sunrise
**Use case:** Wake up naturally with sunlight

```yaml
automation:
  - alias: Open curtain at sunrise
    trigger:
      - platform: sun
        event: sunrise
        offset: "+00:15:00"  # 15 min after
    action:
      - service: cover.open_cover
        target:
          entity_id: cover.bedroom_curtain
```

### Option C: Presence-based → Close when away
**Use case:** Privacy when leaving home

```yaml
automation:
  - alias: Close curtains when away
    trigger:
      - platform: state
        entity_id: person.nicholas
        to: 'not_home'
    action:
      - service: cover.close_cover
        target:
          entity_id: cover.all_curtains
```

**Question:** Which trigger makes sense?
- Email = privacy for video calls
- Sunrise = wake-up routine
- Presence = away-from-home security

---

## Open Questions

1. **Guest mode privacy rules:** What can guests control? What's off-limits?
   - Lights? Thermostat? Curtains? Locks? Cameras? Voice commands?

2. **Calendar choice:** Google Calendar (easy) or CalDAV (self-hosted)?
   - Trade-off: Convenience vs. privacy

3. **Curtain sync trigger:** Email, sunrise, or presence?
   - Or: All three (different automations for different contexts)?

4. **Smart speaker guest access:** Disable entirely or limit commands?
   - Option A: Disable in guest bedroom
   - Option B: Guest profile (limited commands: lights, thermostat only)

---

## Success Criteria

- ✅ Guest mode scene working (cameras off, bedroom unlocked, thermostat set)
- ✅ Privacy/access rules defined (what guests can/cannot control)
- ✅ Calendar integration (events visible in HA dashboard)
- ✅ Calendar automations tested (pre-heat, voice announcements)
- ✅ Curtain sync automation defined and working (trigger chosen, tested)

---

**Status:** Planning phase. Define guest mode rules, choose calendar integration, decide curtain trigger.
