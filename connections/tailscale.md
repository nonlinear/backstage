---
service: Tailscale
description: "Expose Mac Studio/NAS services remotely, configure Pi-hole DNS, troubleshoot connection issues, or check which devices are online"
hostname: "studio.adal-rigel.ts.net"
status: active
---

# Tailscale Remote Access

**Admin console:** https://login.tailscale.com/admin  
**Mac Studio hostname:** `studio.adal-rigel.ts.net`  
**NAS hostname:** `media.adal-rigel.ts.net`

---

## Quick Reference

**Expose service via Tailscale:**
```bash
tailscale serve --bg --https=PORT http://localhost:PORT
```

**Check exposed services:**
```bash
tailscale serve status
```

**Remove service:**
```bash
tailscale serve --https=PORT off
```

**Check Tailscale status:**
```bash
tailscale status
```

---

## Devices on Tailnet

| Device | Hostname | IP | Status |
|--------|----------|-----|--------|
| Mac Studio | studio.adal-rigel.ts.net | 100.80.21.16 | ✅ |
| NAS | media.adal-rigel.ts.net | 100.85.217.51 | ✅ |
| iPhone 11 | iphone-11 | 100.87.213.56 | ✅ |
| iPad Mini | ipad-mini-6th-gen-wificellular | 100.70.187.120 | ✅ |

---

## Mac Studio Services (Exposed)

### Critical (Always Running)

**OpenClaw Gateway:**
```bash
tailscale serve --bg --https=18789 http://localhost:18789
```
Access: https://studio.adal-rigel.ts.net:18789

**Backstage (personal projects):**
```bash
tailscale serve --bg --https=3004 http://localhost:3004
```
Access: https://studio.adal-rigel.ts.net:3004

**Mattermost (team chat):**
```bash
tailscale serve --bg --https=8065 http://localhost:8065
```
Access: https://studio.adal-rigel.ts.net:8065

**Librarian (book browser):**
```bash
tailscale serve --bg --https=8766 http://localhost:8766
```
Access: https://studio.adal-rigel.ts.net:8766

**Shelfmark (Calibre alternative):**
```bash
tailscale serve --bg --https=8085 http://localhost:8085
```
Access: https://studio.adal-rigel.ts.net:8085

---

## NAS Services (Exposed)

**See:** `connections/nas.md` for full list

**Most used:**
- Kavita (books): https://media.adal-rigel.ts.net:5000
- Komga (comics): https://media.adal-rigel.ts.net:25600
- Jellyfin (movies): https://media.adal-rigel.ts.net:8096
- Home Assistant: https://media.adal-rigel.ts.net:8123
- Paperless-ngx (docs): https://media.adal-rigel.ts.net:8010

---

## Pi-hole Integration (Network-wide Ad Blocking)

**✅ CONFIGURED:** Global Nameservers = Pi-hole (`192.168.1.152`)

**What this means:**
- ALL devices on tailnet use Pi-hole automatically (when Tailscale ON)
- iPhone, iPad, MacBook → ads blocked **outside home** (4G, public WiFi)
- Zero config per device

### How Configured

1. Tailscale admin → https://login.tailscale.com/admin/dns
2. DNS → Nameservers → **Global nameservers**
3. Add: `192.168.1.152` (Pi-hole local IP)
4. **Primary DNS:** Pi-hole (ads blocked)
5. **Fallback DNS:** 1.1.1.1 (Cloudflare - if NAS offline)

### Trade-offs

**Battery:**
- Slight increase (DNS queries route through Tailscale)
- ~5-10% more drain on mobile (depends on usage)

**Latency:**
- +10-50ms per DNS query (depends on NAS location)
- Negligible for browsing, noticeable for gaming

**Privacy:**
- All DNS queries visible to Pi-hole (but you own it)
- Better than ISP/Google seeing queries

### Test Pi-hole via Tailscale

```bash
# From any Tailscale device (outside home network)
nslookup pi.hole

# Should resolve to 192.168.1.152 (Pi-hole)
```

**Query logs:** http://192.168.1.152:8053/admin → Query Log

---

## Troubleshooting

### Port Not Accessible From Other Tailscale Devices

**Symptom:**
- `https://studio.adal-rigel.ts.net:PORT` → connection refused
- `tailscale serve status` shows service exposed
- Local `http://localhost:PORT` works fine

**Possible causes:**

**1. Tailscale serve proxy not running:**
```bash
tailscale serve status | grep PORT
# If missing → re-expose
tailscale serve --bg --https=PORT http://localhost:PORT
```

**2. Service not listening on localhost:**
```bash
lsof -i :PORT
# Should show process bound to 127.0.0.1:PORT or 0.0.0.0:PORT
```

**3. Firewall blocking:**
```bash
# macOS firewall check
/usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate
# Should be off or allow Tailscale
```

**4. Tailscale not connected:**
```bash
tailscale status
# Should show "online" + list of devices
```

**5. HTTPS vs HTTP confusion:**
- Tailscale serve = HTTPS proxy (auto TLS)
- Local service = HTTP only
- Use `https://studio.adal-rigel.ts.net:PORT` (not http)

### Service Appears "Down" After Reboot

**Cause:** Tailscale serve bindings don't persist across reboots

**Solution:** See `connections/mac-studio-boot.md` for LaunchDaemon setup

**Temporary fix:**
```bash
# Re-expose all services manually
tailscale serve --bg --https=18789 http://localhost:18789
tailscale serve --bg --https=3004 http://localhost:3004
tailscale serve --bg --https=8065 http://localhost:8065
tailscale serve --bg --https=8766 http://localhost:8766
tailscale serve --bg --https=8085 http://localhost:8085
```

### DNS Not Resolving via Pi-hole

**Check Global Nameservers:**
```bash
# Tailscale admin console
https://login.tailscale.com/admin/dns
# Should show 192.168.1.152 (Pi-hole)
```

**Test DNS query:**
```bash
nslookup pi.hole
# Should resolve to 192.168.1.152

nslookup google.com
# Should show query went through Pi-hole
```

**If not working:**
1. Verify NAS online: `ping 192.168.1.152`
2. Verify Pi-hole running: `curl http://192.168.1.152:8053`
3. Check Tailscale connection: `tailscale status`
4. Flush DNS cache (macOS): `sudo dscacheutil -flushcache`

### Tailscale Disconnects Frequently (Mobile)

**iOS/iPadOS behavior:**
- Tailscale disconnects when app backgrounded (battery saving)
- Enable "Always On VPN" in iOS Settings → VPN

**Battery optimization:**
- Global DNS = slight battery drain
- Disable Tailscale when not needed (toggle in Control Center)

---

## Best Practices

**Expose services:**
- Use `--bg` flag (background, survives terminal close)
- Use HTTPS port matching local port (easier to remember)
- Document in `connections/ports.md`

**Security:**
- Tailnet = trusted network (all devices you control)
- Don't expose sensitive services without auth (use app-level auth)
- Use Tailscale ACLs for multi-user tailnets

**Monitoring:**
- Check `tailscale serve status` after reboot
- Monitor exposed ports in `connections/ports.md`
- Use Uptime Kuma for service health checks

---

## Related

- `connections/mac-studio-boot.md` - Persistent service exposure via LaunchDaemon
- `connections/pi-hole.md` - Pi-hole configuration + blocklists
- `connections/nas.md` - NAS services overview
- `connections/ports.md` - Port allocation reference

---

**Docs:** https://tailscale.com/kb/  
**Serve guide:** https://tailscale.com/kb/1242/tailscale-serve/  
**DNS guide:** https://tailscale.com/kb/1054/dns/
