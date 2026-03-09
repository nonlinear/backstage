# Epic Notes

> Version, name, status → see `epic.yaml`


## Context Snapshot
- **Why this exists:** Home Assistant improvements (guest mode for privacy, calendar integration, curtain automation)
- **Problem solved:** Need guest privacy mode, want calendar-based automations, curtain sync unclear
- **Date:** 2026-02-15
- **Assumptions:** Home Assistant running, security cameras installed, smart curtain/blinds available

---

## Tasks

### 1. Guest Mode Scene

**Goal:** Privacy mode for guests (disable cameras, limit access, comfort settings)

**Components:**
1. **Disable security cameras** (privacy)
   - Turn off cameras in guest areas (bedroom, bathroom, hallway)
   - Keep front door camera (security)
   - OR: Just stop recording (keep live view for host only)

2. **Limit smart speaker access** (privacy)
   - Disable voice commands in guest bedroom
   - OR: Create guest profile (limited commands)

3. **Unlock guest bedroom** (access)
   - If smart lock installed → unlock
   - OR: Send unlock code to guest (temporary PIN)

4. **Set thermostat comfort range** (comfort)
   - Set to 68-72°F (20-22°C) range
   - OR: Let guest control (give access in HA dashboard)

**Automation trigger:**
- `input_boolean.guest_mode` → ON (manual toggle or automation)
- Reverse on `input_boolean.guest_mode` → OFF

**Privacy/Access Rules (Context Needed):**
- What can guests control? (lights, thermostat, curtains?)
- What's off-limits? (security system, cameras, locks outside guest room?)
- Voice commands? (disable entirely or limit to guest room?)

**Implementation:**
```yaml
# configuration.yaml
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
      media_player.guest_bedroom_speaker: off  # Disable voice commands

automation:
  - alias: Activate Guest Mode
    trigger:
      - platform: state
        entity_id: input_boolean.guest_mode
        to: 'on'
    action:
      - service: scene.turn_on
        target:
          entity_id: scene.guest_mode

  - alias: Deactivate Guest Mode
    trigger:
      - platform: state
        entity_id: input_boolean.guest_mode
        to: 'off'
    action:
      - service: camera.turn_on
        target:
          entity_id:
            - camera.living_room
            - camera.hallway
            - camera.guest_bedroom
      - service: lock.lock
        target:
          entity_id: lock.guest_bedroom
```

---

### 2. Calendar Integration

**Goal:** HA reads calendar, displays events, triggers automations

**Options:**

#### Option A: Google Calendar (Cloud)
**Integration:** HA Google Calendar integration (official)

**Setup:**
1. Enable Google Calendar API (Google Cloud Console)
2. Add integration in HA (Configuration → Integrations → Google Calendar)
3. Authenticate (OAuth)
4. Select calendars to sync

**Pros:**
- Easy setup (official integration)
- Real-time sync

**Cons:**
- Cloud-dependent (privacy concerns)
- Requires Google account

#### Option B: CalDAV (Self-Hosted)
**Integration:** HA CalDAV integration

**Setup:**
1. Self-host calendar server (Nextcloud, Radicale, etc.)
2. Add CalDAV integration in HA
3. Configure server URL, username, password

**Pros:**
- Self-hosted (privacy)
- No cloud dependency

**Cons:**
- More setup (need calendar server)
- Manual sync (not real-time)

**Recommendation:** Google Calendar (easier), migrate to CalDAV later if privacy critical

---

**Calendar Display:**
- Dashboard card (show upcoming events)
- OR: Voice announcements ("Next event: Meeting at 2pm")

**Calendar Automations:**
```yaml
# Example: Pre-heat before meeting
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

### 3. Curtain Sync

**Goal:** Automate curtain/blind based on triggers

**Possible triggers:**

#### Option A: Email arrives → Close curtain (privacy)
**Use case:** Working from home, email notification → close curtain for video call privacy

**Implementation:**
```yaml
automation:
  - alias: Close curtain on email
    trigger:
      - platform: state
        entity_id: sensor.email_count  # Requires email integration
        attribute: unread_count
    condition:
      - condition: state
        entity_id: binary_sensor.workday
        state: 'on'
    action:
      - service: cover.close_cover
        target:
          entity_id: cover.office_curtain
```

**Gotcha:** Requires email integration (IMAP sensor or notification forwarding)

---

#### Option B: Morning routine → Open curtain at sunrise
**Use case:** Wake up naturally with sunlight

**Implementation:**
```yaml
automation:
  - alias: Open curtain at sunrise
    trigger:
      - platform: sun
        event: sunrise
        offset: "+00:15:00"  # 15 min after sunrise
    action:
      - service: cover.open_cover
        target:
          entity_id: cover.bedroom_curtain
```

---

#### Option C: Presence-based → Close when away
**Use case:** Privacy when leaving home

**Implementation:**
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

---

**Question:** Which trigger makes sense?
- Email = privacy for video calls
- Sunrise = wake-up routine
- Presence = away-from-home security

**Next:** Define logic, test automation

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
- ✅ Calendar automations tested (pre-heat, voice announcements, etc.)
- ✅ Curtain sync automation defined and working (trigger chosen, tested)

---

## Related Epics
- v0.5.0 - Home Augmented Calendar (calendar integration, cronjob visualization)
- v0.20.0 - Open Source Maps (location-based automations)

---

**Status:** 🔍 PLANNING PHASE
**Next:** Define guest mode privacy rules, choose calendar integration, decide curtain trigger
