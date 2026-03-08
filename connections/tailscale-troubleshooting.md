# Tailscale Troubleshooting

**Created:** 2026-02-21  
**Context:** Debugging remote port access (studio.adal-rigel.ts.net:PORT not accessible from iPhone)

---

## Problem: Ports Not Accessible From Other Tailscale Devices

**Symptom:**
- Local access works: `curl http://127.0.0.1:9999` ✅
- DNS resolves: `dig studio.adal-rigel.ts.net` → `100.80.21.16` ✅
- iPhone connected to Tailnet ✅
- BUT: `http://studio.adal-rigel.ts.net:9999` → timeout/not found ❌

**Debugging steps (2026-02-21):**

### ✅ What Works
- Local server running (verified with `lsof -i :9999`)
- Localhost access (curl 127.0.0.1:9999 returns HTML)
- Tailscale connected (iPhone shows in `tailscale status`)
- MagicDNS resolves hostname → IP
- macOS firewall OFF (not blocking)

### ❌ What Doesn't Work
- Remote access from iPhone Safari: `http://studio.adal-rigel.ts.net:9999`
- Remote access with IP: `http://100.80.21.16:9999` (needs testing)

### 🔍 Possible Causes

**1. Tailscale ACL (Access Control Lists)**
- Default: devices in same tailnet can reach each other
- BUT: Ports may need explicit allow rules
- Check: https://login.tailscale.com/admin/acls

**2. Server Bind Address**
- Python server binds to `0.0.0.0:9999` (all interfaces) ✅
- OpenClaw binds to `127.0.0.1:18789` (loopback only)
- **Question:** Does Tailscale route loopback-only ports?

**3. Tailscale Serve vs Direct Port Access**
- `tailscale serve` = proxy (HTTPS, specific paths)
- Direct port access = IP:PORT routing
- **OpenClaw uses:** `tailscale serve` → proxies `127.0.0.1:18789`
- **Test server uses:** Direct binding `0.0.0.0:9999`

**4. DNS Resolution on iPhone**
- Mac Studio DNS: Fixed (100.100.100.100 Tailscale DNS) ✅
- iPhone DNS: May still use ISP DNS (not Tailscale)
- **Solution:** Configure Tailscale Global Nameservers (admin console)

**5. Subnet Routing**
- Tailscale routes 100.x.x.x/10 (Tailscale IPs)
- Home network: 192.168.1.0/24
- **Question:** Is subnet routing needed for LAN services?

---

## Next Steps (Not Executed Yet)

### 1. Test IP Direct Access (iPhone)
```
http://100.80.21.16:9999
```
- If works → DNS problem on iPhone
- If fails → Routing/ACL problem

### 2. Check Tailscale ACLs
- https://login.tailscale.com/admin/acls
- Verify port access rules
- Default should allow, but confirm

### 3. Test OpenClaw Port (18789)
```
http://studio.adal-rigel.ts.net:18789/chat
```
- OpenClaw uses `tailscale serve` (different architecture)
- May work even if 9999 doesn't

### 4. Configure Tailscale Global Nameservers
- Admin console → DNS → Global nameservers
- Add: 100.100.100.100 (Tailscale MagicDNS)
- Forces all devices to use MagicDNS

### 5. Enable Tailscale Subnet Router (If Needed)
- If accessing LAN services (192.168.1.x), may need subnet routing
- Mac Studio = subnet router
- Routes 192.168.1.0/24 → Tailscale

---

## Relevant Docs

**Tailscale ACLs:**
- https://tailscale.com/kb/1018/acls

**Tailscale Serve:**
- https://tailscale.com/kb/1242/tailscale-serve

**Subnet Routers:**
- https://tailscale.com/kb/1019/subnets

**MagicDNS:**
- https://tailscale.com/kb/1081/magicdns

---

## Current Configuration

**Mac Studio (studio.adal-rigel.ts.net):**
- Tailscale IP: 100.80.21.16
- Hostname: studio
- DNS: 100.100.100.100 (Tailscale), 1.1.1.1 (fallback)
- Gateway: `bind=loopback`, `tailscale.mode=serve`
- Firewall: OFF

**iPhone 11:**
- Tailscale IP: 100.87.213.56
- Tailscale: ON
- DNS: ❓ (may not be using Tailscale DNS)

**Test Server:**
- Port: 9999
- Bind: 0.0.0.0 (all interfaces)
- Status: Running (PID 52129)

---

## Lessons Learned

**DNS != Routing:**
- MagicDNS resolving hostname doesn't mean ports are accessible
- DNS works (studio.adal-rigel.ts.net → IP)
- BUT: Port access may need ACL rules or serve proxy

**Tailscale Serve vs Direct Access:**
- `tailscale serve` = HTTP/HTTPS proxy (works for OpenClaw)
- Direct port access = requires routing rules
- May need to use `serve` for all services

**Loopback vs All Interfaces:**
- `127.0.0.1` = localhost only (not routable via Tailscale?)
- `0.0.0.0` = all interfaces (should be routable)
- OpenClaw uses loopback + serve proxy (works)
- Test server uses 0.0.0.0 (not working - why?)

---

**Status:** IN PROGRESS (debugging continues)
