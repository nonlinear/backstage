# Backstage Close - 2026-02-02

## 🏠 Home Assistant Deep Dive

### ✅ Accomplished

**1. Fixed Winter Automations:**
- Converted Fahrenheit → Celsius (18-21°C valid ranges)
- Removed "Already running" loop in Away Mode
- Fixed temperature thresholds: < 13°C (was < 55°F mixed with Celsius)

**2. Cleaned Up Integrations:**
- Removed 3x Apple TV (phantoms, not existing anymore)
- Removed Alexa integration (as requested)
- Removed Cloud integration (related to Alexa)
- Result: Logs now clean (no more 640 warnings + 114 errors)

**3. Analyzed HA Setup:**
- Total: 212 active entities
- Key devices:
  - person.nicholas (location tracking via mobile app)
  - 2x climate (Bedroom + Living Room via Sensibo)
  - 10x lights
  - 2x window covers
  - 4x binary sensors (doors, freezer, murphy bed)
  - 20x automations

**4. Log Analysis:**
- Created Python script to analyze behavioral patterns
- Discovered "activity peaks" were actually just errors looping
- Real activity tracking requires database access (not just logs)
- Documented need for HA long-lived access token for future analysis

### 🔍 SearXNG Installation

**Why:** Brave Search API requires CC (dark pattern), need self-hosted alternative

**What was installed:**
- SearXNG via Docker Compose on NAS
- URL: http://192.168.1.152:8888
- Meta-search aggregating: Google, DuckDuckGo, Brave, Wikipedia, Startpage
- JSON API enabled for programmatic access
- Created Python wrapper: `~/.openclaw/workspace/scripts/searxng_search.py`

**Access constraints:**
- ✅ Works at home (192.168.1.*)
- ❌ Not accessible from work (MacBook has no Tailscale)
- ✅ Accessible remotely on iPad/iPhone via Tailscale
- **Future:** Expose via Caddy reverse proxy with rate limiting + auth

**Documentation:**
- Added to `/Users/nfrota/Documents/notes/code/reverse-proxy.md`
- Included as example alongside Komga, Jellyfin, Inspiration folder

### 📋 Discoveries

**Portainer:**
- Already installed and running (16 months, up 5 months)
- URL: https://192.168.1.152:9443
- Can be used for container management instead of SSH
- Consider using for future Docker deployments

**Location Detection:**
- Home: WiFi SSID "Verizon*" or IP 192.168.1.*
- Work: WiFi SSID "JWS", IP 10.4.*.*
- Mobile: Everything else

### 🔄 Next Steps (Not Done Today)

**For v0.5.0 (Home Assistant Voice):**
- [ ] Get HA long-lived access token (create in profile → Long-Lived Access Tokens)
- [ ] Analyze real device usage patterns via HA API
- [ ] Build ML predictions based on actual behavior

**For future (Caddy Reverse Proxy):**
- [ ] Install Caddy on NAS
- [ ] Expose SearXNG with rate limiting (10 queries/min)
- [ ] Add auth layer (basic auth or Authelia)
- [ ] Configure HTTPS via Let's Encrypt

**General:**
- [ ] Integrate location detection into search behavior (SearXNG at home, web_fetch elsewhere)
- [ ] Consider using Portainer API for future Docker automation

---

## 🤔 Philosophy Moments

**On "Free" Services:**
> "If the product is grátis but asks for CC, you ARE the product." 🏴
> 
> Dark patterns (CC required for "free" tier) are scammy. Self-host everything when possible.

**On Tools:**
- Portainer > raw docker commands (for human management)
- SSH/scripts > Portainer (for automation)
- SearXNG > Brave API (self-hosted > renting from oligarchs)

---

## 📊 Session Stats

**What worked well:**
- Direct SSH access to NAS
- Docker compose for quick deployments
- Python scripts for analysis
- Mermaid graphs for visualization

**What needs improvement:**
- HA API access (need token)
- Web search availability (location-dependent)

**Time spent:**
- ~2 hours analyzing HA logs and fixing automations
- ~30 min installing + configuring SearXNG
- ~15 min documenting reverse proxy setup

---

**Session closed:** 2026-02-02 23:50 EST
