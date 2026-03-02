# Epic Notes

> Version, name, status → see `epic.yaml`

---

# v0.20.0 - Open Source Maps

## Context Snapshot
- **Why this exists:** Replace Google Maps with self-hosted/privacy-first open-source alternative
- **Problem solved:** Google Maps = privacy concerns, no self-hosted option, no Immich photo location integration
- **Date:** 2026-02-15
- **Assumptions:** OpenStreetMap ecosystem, navigation + photo location needed, offline support critical


## Research Summary (2026-02-15)

### Requirements

1. **Directions (routing)** - Turn-by-turn navigation
2. **App integration** - iOS/Android apps
3. **Offline support** - No internet needed (downloaded maps)
4. **Immich photo location overlay** (bonus) - Show photos on map

**Challenge:** No single OSM solution does everything (ecosystem fragmented)


## Options Analysis

### Option 1: OpenStreetMap + Organic Maps (BEST for Offline Navigation)

**What:** Free, open-source maps app (iOS/Android)

**Features:**
- ✅ Directions (routing via OSM data)
- ✅ App integration (native iOS/Android apps)
- ✅ Offline support (download maps per region)
- ❌ No Immich integration (yet)

**Download:** App Store / Google Play (search "Organic Maps")

**Pros:**
- Best offline experience (download entire countries)
- Fast (no ads, no tracking)
- Privacy-first (no Google, no data collection)
- Free

**Cons:**
- No photo integration (can't show Immich photos on map)
- No web UI (mobile-only)

**Recommendation:** **Best for navigation** (replace Google Maps day-to-day)


### Option 2: Nextcloud Maps (BEST for Photo Integration)

**What:** Self-hosted maps via Nextcloud (web UI + mobile app)

**Features:**
- ✅ Self-hosted (own server)
- ✅ Photo geotag integration (show photos on map)
- ✅ Routing (via GraphHopper or OSRM backend)
- ⚠️ Requires Nextcloud stack (heavy)

**Setup:**
1. Install Nextcloud (Docker or native)
2. Install Nextcloud Maps app
3. Configure routing backend (GraphHopper or OSRM)
4. Upload photos (auto-geotagged)

**Pros:**
- Photo integration (show Immich-like photo map)
- Self-hosted (privacy)
- Web + mobile

**Cons:**
- **Requires Nextcloud** (big stack, overkill if only using for maps)
- Offline support unclear (may need custom setup)
- Slower than Organic Maps

**Recommendation:** Only if already running Nextcloud


### Option 3: OwnTracks + Home Assistant (Location Tracking Only)

**What:** Self-hosted location tracking (not a full maps app)

**Features:**
- ✅ Location tracking (track devices on map)
- ✅ Self-hosted (MQTT or HTTP)
- ✅ Home Assistant integration (automations based on location)
- ❌ Not a full maps replacement (no directions, no POI search)

**Setup:**
1. Install OwnTracks app (iOS/Android)
2. Configure MQTT server (or HTTP endpoint)
3. Integrate with Home Assistant

**Pros:**
- Location tracking (where are you now?)
- HA automations (arrive home → turn on lights)

**Cons:**
- **Not a maps app** (no navigation, no search)
- Requires MQTT server

**Recommendation:** Complement to Organic Maps (tracking + automation)


### Option 4: MapLibre + OSRM (DIY Stack, Full Control)

**What:** Build custom maps stack (tile server + routing engine)

**Features:**
- ✅ Full control (custom tiles, routing, styling)
- ✅ Can integrate Immich photos (custom overlay)
- ⚠️ Requires hosting tile server (bandwidth-heavy)
- ⚠️ Complex setup (Docker Compose, OSM data import)

**Stack:**
- **MapLibre** (map renderer, replaces Google Maps JS)
- **OSRM** (routing engine, turn-by-turn directions)
- **Tile server** (render OSM tiles, serve to client)
- **Immich overlay** (custom layer, show photos on map)

**Setup:**
1. Download OSM data (region or world)
2. Import to PostgreSQL + PostGIS
3. Run tile server (Tileserver GL, Tegola, or Mapnik)
4. Run OSRM (routing backend)
5. Build web UI (MapLibre + custom photo overlay)

**Pros:**
- **Full control** (customize everything)
- **Immich integration** (build custom photo layer)
- Self-hosted (privacy)

**Cons:**
- **Complex setup** (multiple services, Docker Compose)
- **Bandwidth-heavy** (tile server = lots of data)
- **Maintenance** (OSM data updates, server upkeep)

**Recommendation:** Only if you want full DIY control (overkill for most)


## Comparison Table

| Feature | Organic Maps | Nextcloud Maps | OwnTracks | MapLibre + OSRM |
|---------|--------------|----------------|-----------|-----------------|
| **Directions** | ✅ Yes | ✅ Yes | ❌ No | ✅ Yes |
| **Offline** | ✅ Yes | ⚠️ Unclear | ❌ No | ✅ Yes (if tiles cached) |
| **Photo integration** | ❌ No | ✅ Yes | ❌ No | ✅ Yes (custom) |
| **Self-hosted** | ❌ No (app only) | ✅ Yes | ✅ Yes | ✅ Yes |
| **Setup complexity** | ✅ Easy | ⚠️ Medium | ⚠️ Medium | ❌ Hard |
| **iOS/Android app** | ✅ Yes | ✅ Yes | ✅ Yes | ⚠️ Web only (PWA) |

**Winner (Navigation):** **Organic Maps** (best offline, easy setup)  
**Winner (Photo Integration):** **Nextcloud Maps** (if running Nextcloud) OR **MapLibre DIY** (full control)


## Recommendation

### For Navigation (Daily Use):
**Organic Maps** (iOS/Android app)

**Why:**
- Best offline maps (download entire countries)
- Fast, privacy-first, no tracking
- Free
- Replaces Google Maps for navigation

**Setup:**
1. Download Organic Maps (App Store / Google Play)
2. Download offline maps (Settings → Download maps → Select region)
3. Use for navigation (search, directions, POI)


### For Photo Location Overlay:
**Nextcloud Maps** (if running Nextcloud) OR **DIY MapLibre** (if want full control)

**Why:**
- Nextcloud Maps = easiest if already running Nextcloud
- MapLibre DIY = full control, custom Immich integration

**Setup (Nextcloud Maps):**
1. Install Nextcloud (if not already running)
2. Install Nextcloud Maps app
3. Upload photos (auto-geotagged)
4. View photos on map

**Setup (MapLibre DIY):**
1. Run tile server (Docker: Tileserver GL)
2. Run OSRM (routing backend)
3. Build web UI (MapLibre + Immich photo layer)


### For Location Tracking (HA Integration):
**OwnTracks** (self-hosted location tracking)

**Why:**
- Track devices on map
- Home Assistant automations (arrive home → lights on)

**Setup:**
1. Install OwnTracks app (iOS/Android)
2. Configure MQTT server (Mosquitto)
3. Add to Home Assistant (Configuration → Integrations → OwnTracks)


## Trade-Offs

**No single solution does everything:**
- Organic Maps = navigation (no photo integration)
- Nextcloud Maps = photos (heavier stack)
- MapLibre DIY = full control (complex setup)

**Recommendation:** Use multiple tools
- **Organic Maps** for daily navigation
- **Nextcloud Maps** OR **MapLibre** for photo location
- **OwnTracks** for location tracking (optional, HA integration)


## Implementation Plan

### Phase 1: Navigation (Organic Maps)
- [ ] Download Organic Maps app (iOS/Android)
- [ ] Download offline maps (Brooklyn, NYC, USA)
- [ ] Test navigation (search, directions, POI)
- [ ] Compare to Google Maps (UX, accuracy)

### Phase 2: Photo Location (Choose One)

#### Option A: Nextcloud Maps (if running Nextcloud)
- [ ] Install Nextcloud (Docker)
- [ ] Install Nextcloud Maps app
- [ ] Upload photos (auto-geotagged)
- [ ] View photos on map
- [ ] Test routing (GraphHopper or OSRM backend)

#### Option B: MapLibre DIY (full control)
- [ ] Run tile server (Tileserver GL Docker)
- [ ] Run OSRM (routing backend Docker)
- [ ] Build web UI (MapLibre JS + Immich photo layer)
- [ ] Test photo overlay (fetch Immich photos, show on map)

### Phase 3: Location Tracking (OwnTracks)
- [ ] Install OwnTracks app (iOS)
- [ ] Configure MQTT server (Mosquitto Docker)
- [ ] Add to Home Assistant
- [ ] Test location tracking (arrive home automation)


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

4. **OSM data updates?** How often to update maps?
   - Organic Maps: Auto-updates (app downloads new data)
   - Self-hosted: Manual (re-import OSM data monthly/quarterly)


## Success Criteria

- ✅ Self-hosted or privacy-first maps working (navigation + directions)
- ✅ Offline maps downloaded (no internet needed)
- ✅ Photo location overlay (Immich photos on map, OR Nextcloud integration)
- ✅ Google Maps replaced for daily use (Organic Maps primary navigation)
- ✅ Optional: OwnTracks + HA integration (location tracking automations)


## Related Epics
- v0.5.0 - Home Augmented Calendar (location-based automations)
- v0.19.0 - HA Fixes (location triggers, presence detection)


**Next:** Download Organic Maps, test navigation, decide on photo integration (Nextcloud vs MapLibre)
