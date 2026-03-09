# Epic Notes

> Version, name, status → see `epic.yaml`

---

## Context

Replace Google Maps with self-hosted/privacy-first open-source alternative. Need navigation + photo location + offline support.

**Challenge:** No single OSM solution does everything (ecosystem fragmented)

---

## Requirements

1. **Directions** - Turn-by-turn navigation
2. **App integration** - iOS/Android apps
3. **Offline support** - Downloaded maps, no internet
4. **Immich photo overlay** (bonus) - Show photos on map

---

## Options

### Organic Maps (BEST for Navigation)

**Features:**
- ✅ Directions (OSM routing)
- ✅ Native iOS/Android apps
- ✅ Offline (download regions)
- ❌ No Immich integration

**Pros:** Best offline, fast, privacy-first, free  
**Cons:** No photo integration, mobile-only

**Download:** App Store / Google Play

---

### Nextcloud Maps (BEST for Photos)

**Features:**
- ✅ Self-hosted (own server)
- ✅ Photo geotag integration
- ✅ Routing (GraphHopper/OSRM)
- ⚠️ Requires Nextcloud stack (heavy)

**Pros:** Photo integration, self-hosted, web + mobile  
**Cons:** Requires Nextcloud (overkill if only for maps), slower

**Use case:** Only if already running Nextcloud

---

### OwnTracks (Location Tracking)

**Features:**
- ✅ Track devices on map
- ✅ Self-hosted (MQTT/HTTP)
- ✅ Home Assistant integration
- ❌ Not a full maps app (no directions)

**Use case:** Complement to Organic Maps (tracking + automation)

---

### MapLibre + OSRM (DIY Full Control)

**Stack:**
- MapLibre (renderer)
- OSRM (routing)
- Tile server (OSM tiles)
- Custom Immich overlay

**Pros:** Full control, custom photo layer  
**Cons:** Complex setup, bandwidth-heavy, maintenance

**Use case:** Only if want full DIY control (overkill for most)

---

## Comparison

| Feature | Organic Maps | Nextcloud Maps | OwnTracks | MapLibre DIY |
|---------|--------------|----------------|-----------|--------------|
| **Directions** | ✅ | ✅ | ❌ | ✅ |
| **Offline** | ✅ | ⚠️ | ❌ | ✅ (cached) |
| **Photos** | ❌ | ✅ | ❌ | ✅ (custom) |
| **Self-hosted** | ❌ | ✅ | ✅ | ✅ |
| **Setup** | Easy | Medium | Medium | Hard |
| **App** | ✅ | ✅ | ✅ | Web (PWA) |

**Winner (Navigation):** Organic Maps  
**Winner (Photos):** Nextcloud Maps OR MapLibre DIY

---

## Recommendation

**Use multiple tools:**

1. **Organic Maps** - Daily navigation (replaces Google Maps)
2. **Nextcloud Maps** OR **MapLibre** - Photo location overlay
3. **OwnTracks** - Location tracking (HA integration, optional)

**No single solution does everything.**

---

## Trade-Offs

- Organic Maps = navigation (no photos)
- Nextcloud Maps = photos (heavier stack)
- MapLibre DIY = full control (complex)

---

## Open Questions

1. **Nextcloud or MapLibre?** Already running Nextcloud?
   - Yes → Nextcloud Maps (easier)
   - No → MapLibre DIY (more work, more control)

2. **Photo overlay priority?** How important?
   - High → MapLibre DIY
   - Medium → Nextcloud Maps
   - Low → Organic Maps only

3. **Self-hosted tiles?** Want to host?
   - Pros: Privacy, offline
   - Cons: Bandwidth, maintenance

4. **OSM updates?** How often?
   - Organic: Auto-updates
   - Self-hosted: Manual (monthly/quarterly)

---

## Success Criteria

- ✅ Self-hosted or privacy-first maps working
- ✅ Offline maps downloaded
- ✅ Photo location overlay (Immich or Nextcloud)
- ✅ Google Maps replaced for daily use
- ✅ Optional: OwnTracks + HA integration

---

**Next:** Download Organic Maps, test navigation, decide on photo integration
