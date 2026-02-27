# v0.10.0 - Pi-hole (Network-Wide Ad Blocking)

**Status:** ✅ COMPLETE (2026-02-10)

**Goal:** Ad blocking, DNS control, network-wide privacy

---

## ✅ Tasks Completed

### Installation & Setup
- [x] Docker container on NAS (192.168.1.152)
- [x] Port 8053 (web UI) + 53 (DNS)
- [x] 6 aggressive blocklists (300k+ domains)
- [x] Router DNS configured (Verizon FiOS)

### Configuration
- [x] Primary DNS: 192.168.1.152 (Pi-hole)
- [x] Secondary DNS: 1.1.1.1 (Cloudflare fallback)
- [x] All devices on network = auto-blocked ads

---

## 📊 Results

**Blocklists Active:**
1. StevenBlack Unified
2. oisd (Big List)
3. HaGeZi Pro++
4. YouTube Ads
5. Easylist
6. AdguardDns
7. **SmartTV-AGH** (IoT tracking - Samsung/LG)
8. **ads-and-tracking-extended** (Google Home, Alexa, Apple)

**Regex Filters (4):**
1. `^(.+[_.-])?telemetry[_.-]` - Block telemetry
2. `^(.+[_.-])?tracking[_.-]` - Block tracking
3. `^(.+[_.-])?analytics[_.-]` - Block analytics
4. `^(.+[_.-])?doubleclick[_.-]` - Block Google ads

**Total Domains Blocked:** 360,055 (updated after IoT lists)

**Devices Protected:**
- MacBook M3 (192.168.1.166)
- iPhone 11
- iPad Mini
- Sensibo-Air (192.168.1.175)
- mova_vacuum_r2491a (192.168.1.173)
- Smart TV
- All future devices (automatic)

---

## 🎯 Advanced Features (Documented)

Created 3 new connection docs:

1. **`connections/pi-hole-regex.md`**
   - Regex blocking patterns
   - Telemetry, tracking, analytics
   - Google Ads, Facebook Pixel
   - Crypto miners

2. **`connections/pi-hole-iot.md`**
   - IoT telemetry blocklists
   - Alexa, Google Home, Samsung TV
   - Apple telemetry (iOS, macOS)
   - Roku tracking

3. **`connections/tailscale-pihole.md`**
   - Remote ad-blocking via VPN
   - Global Nameservers config
   - Testing guide (iPhone 4G)
   - Battery/latency trade-offs

---

## 🔮 Future Enhancements (Optional)

- [x] Add regex filters (telemetry, tracking, analytics, doubleclick)
- [x] Add IoT blocklists (SmartTV, extended tracking)
- [x] Configure Tailscale Split DNS (ts.net → 192.168.1.152)
- [ ] Local DNS records (nas.local, pihole.local)
- [ ] CNAME aliases (jellyfin.home, paperless.home)
- [ ] Query Log monitoring (analytics)
- [ ] Conditional Forwarding (device names)
- [ ] DHCP server (replace router DHCP - advanced)

---

## 📝 Lessons Learned

**Router DNS Location (Verizon):**
- NOT in DHCP settings (that's LAN config)
- NOT in "DNS Server" (that's hostname table)
- **IS IN:** Advanced → Network Settings → Network Connections → Broadband Connection (Ethernet) → IPv4 DNS

**Browser Automation:**
- Chrome Relay worked perfectly
- Nicholas learned: "nao precisa me dizer o que a fazendo. on." (don't narrate, just do)
- Connection drops when navigating away = expected

**Nicholas Decision-Making:**
- Rejected Unbound (privacy vs speed = prefers speed)
- Wants practical features (regex, IoT, Tailscale)
- Understands limitations (Instagram feed ads = same origin)

---

## 🔗 References

- Pi-hole Web UI: http://192.168.1.152:8053/admin
- Documentation: `~/.openclaw/workspace/connections/pi-hole-*.md`
- Memory: `~/.openclaw/workspace/memory/2026-02-10.md`

---

**Epic Duration:** ~5 hours (planning + install + router config + regex + IoT + Tailscale + docs)

**Nicholas Satisfaction:** "Oba!" 🎉

**Impact:** Network-wide ad blocking for ALL devices, zero per-device config needed.
