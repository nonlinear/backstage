# Tailscale Reliability

**Goal:** Ensure Tailscale + port exposure always work after restart/travel

**Problem:** After Mac restart, Tailscale may not be running or configs may be lost. Blocks remote iPad/iPhone access.

---

## Implementation

### 1. Tailscale Auto-Start
**Solution:**
```bash
sudo brew services start tailscale
```

**Verify:** `brew services list | grep tailscale` shows "started"

### 2. Verify Serve Persistence
**Current exposed services:**
- OpenClaw Studio: `https://studio.adal-rigel.ts.net` (port 18789)
- Kavita: `http://studio.adal-rigel.ts.net:5007`
- Ports 8087, 8090, 3000 also exposed

**Test:**
1. Restart Mac
2. Run `tailscale serve status`
3. Verify all ports still exposed
4. Test from iPad

### 3. iPhone Troubleshooting
**Created:** `~/Documents/personal/connections/tailscale-iphone.md`

**Common failures:**
- iOS kills background processes → Tailscale disconnects
- VPN conflicts (other VPN apps)
- Cellular vs WiFi behavior differences

---

## Success Criteria

✅ Mac restart → Tailscale auto-starts (no manual intervention)  
✅ All `tailscale serve` configs persist after restart  
✅ iPad can access OpenClaw Studio via Tailscale URL  
✅ iPhone troubleshooting guide exists  
✅ All exposed services documented with test results

---

## Notes

**Restart survival test (2026-03-01):**
- Mac restarted
- Tailscale still running (`tailscale status` worked)
- `tailscale serve status` showed all configs intact ✅
- **BUT:** `brew services list` showed "none" (not auto-start) ❌

**Conclusion:** Tailscale configs persist, but daemon may not auto-start reliably. Fixed with `brew services start`.
