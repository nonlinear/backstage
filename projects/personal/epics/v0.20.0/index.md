# Open Source Maps

**Problem:** Google Maps = privacy concerns, no self-hosted option, no Immich photo location integration.

**Solution:** Replace with open-source alternatives (navigation + photo location + tracking).

---

## Requirements

1. **Directions (routing)** - Turn-by-turn navigation
2. **App integration** - iOS/Android apps
3. **Offline support** - No internet needed (downloaded maps)
4. **Immich photo location overlay** (bonus) - Show photos on map

**Challenge:** No single OSM solution does everything (ecosystem fragmented).

---

## Recommended Stack

### For Navigation (Daily Use)
**Organic Maps** (iOS/Android app)

**Why:**
- Best offline maps (download entire countries)
- Fast, privacy-first, no tracking
- Free
- Replaces Google Maps for navigation

**Setup:**
1. Download Organic Maps (App Store / Google Play)
2. Download offline maps (Settings → Download maps)
3. Use for navigation (search, directions, POI)

---

### For Photo Location Overlay
**Nextcloud Maps** (if running Nextcloud) OR **MapLibre DIY** (full control)

**Nextcloud Maps:**
- Easiest if already running Nextcloud
- Photo geotag integration (auto)
- Routing via GraphHopper or OSRM

**MapLibre DIY:**
- Full control (custom tiles, routing, styling)
- Custom Immich integration
- More complex setup (tile server + OSRM + web UI)

---

### For Location Tracking (HA Integration)
**OwnTracks** (self-hosted location tracking)

**Why:**
- Track devices on map
- Home Assistant automations (arrive home → lights on)

**Setup:**
1. Install OwnTracks app (iOS/Android)
2. Configure MQTT server (Mosquitto)
3. Add to Home Assistant

---

## Options Comparison

| Feature | Organic Maps | Nextcloud Maps | MapLibre + OSRM |
|---------|--------------|----------------|-----------------|
| **Directions** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Offline** | ✅ Yes | ⚠️ Unclear | ✅ Yes (cached) |
| **Photo integration** | ❌ No | ✅ Yes | ✅ Yes (custom) |
| **Self-hosted** | ❌ No (app only) | ✅ Yes | ✅ Yes |
| **Setup complexity** | ✅ Easy | ⚠️ Medium | ❌ Hard |
| **iOS/Android app** | ✅ Yes | ✅ Yes | ⚠️ Web only (PWA) |

**Winner (Navigation):** Organic Maps (best offline, easy setup)  
**Winner (Photo Integration):** Nextcloud Maps (if running Nextcloud) OR MapLibre DIY (full control)

---

## Trade-Offs

**No single solution does everything:**
- Organic Maps = navigation (no photo integration)
- Nextcloud Maps = photos (heavier stack)
- MapLibre DIY = full control (complex setup)

**Recommendation:** Use multiple tools
- **Organic Maps** for daily navigation
- **Nextcloud Maps** OR **MapLibre** for photo location
- **OwnTracks** for location tracking (optional, HA integration)

---

## Open Questions

1. **Nextcloud or MapLibre?** Do you already run Nextcloud?
   - If yes → Nextcloud Maps (easier)
   - If no → MapLibre DIY (more work, more control)

2. **Immich integration priority?** How important is photo location overlay?
   - High → invest in MapLibre DIY
   - Medium → try Nextcloud Maps
   - Low → just use Organic Maps (navigation only)

3. **Self-hosted tile server?** Do you want to host tiles?
   - Pros: Privacy, offline, no third-party
   - Cons: Bandwidth (tiles = lots of data), maintenance

---

## Success Criteria

- ✅ Privacy-first maps working (navigation + directions)
- ✅ Offline maps downloaded (no internet needed)
- ✅ Photo location overlay (Immich photos on map)
- ✅ Google Maps replaced for daily use
- ✅ Optional: OwnTracks + HA integration (location tracking)

---

**Status:** Research phase. Download Organic Maps first, decide on photo integration later.
