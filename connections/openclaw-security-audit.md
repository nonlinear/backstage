---
service: "OpenClaw Security Audit"
description: "Review security posture, check exposed services, audit permissions, or harden OpenClaw configuration"
scope: "Security hardening + risk assessment"
---

# OpenClaw Security Audit - 2026-02-10

**Based on:** https://www.instagram.com/p/DUVvUMrEQnh/ (Matt Ganzak security tips)

---

## ✅ SECURE (Already Implemented)

### 2️⃣ Never run as root
- ✅ OpenClaw runs as `nfrota` (unprivileged user)
- ✅ No sudo access for OpenClaw process
- ✅ File permissions: `~/.openclaw/` owned by `nfrota`

### 4️⃣ Tailscale installed
- ✅ iPad/iPhone have Tailscale (remote access)
- ⚠️ MacBook doesn't (Wiley policy - can't install)
- ✅ NAS accessible via Tailscale (media.adal-rigel.ts.net)

### 7️⃣ Allowlist users
- ✅ `dmPolicy: "pairing"` (must pair before messaging)
- ✅ `groupPolicy: "allowlist"` (Telegram/Signal groups restricted)
- ✅ Webchat = direct 1:1 (no group exposure)

### 🔟 DMs only
- ✅ Primary interface: Webchat (localhost, 1:1)
- ✅ Telegram configured but pairing required
- ✅ Signal configured but pairing required
- ✅ No public group chats enabled

### Gateway Auth
- ✅ `mode: "token"` (requires auth token)
- ✅ `bind: "loopback"` (only localhost can connect)
- ✅ Token: `f483e7dc918e42195594da7816a416ba21ad731537269fe3`

---

## ⚠️ MEDIUM RISK (Needs Improvement)

### 1️⃣ Don't run on main machine
- ⚠️ **Current:** MacBook M3 (personal device)
- ⚠️ **Risk:** If compromised, personal files exposed
- ✅ **Mitigation:** Server migration planned (epic-server-migration.md)
- 📅 **Timeline:** When server hardware ready

### 5️⃣ SSH keys + Fail2ban
- ✅ NAS uses SSH keys (password auth disabled)
- ❌ **Missing:** Fail2ban not installed on NAS
- ⚠️ MacBook SSH = local only (not exposed to internet)
- 📋 **Action:** Install Fail2ban on NAS Docker

### 6️⃣ Firewall (UFW)
- ⚠️ Mac firewall = default settings (permissive)
- ❌ UFW not available on macOS (Linux-only)
- ✅ **Mitigation:** Gateway bind=loopback (only localhost)
- ⚠️ NAS has no firewall (Docker ports exposed to LAN)
- 📋 **Action:** Configure NAS firewall (iptables or Docker network isolation)

### 9️⃣ Real-time alerts
- ⚠️ Heartbeat = 2x/day (morning + evening)
- ❌ **Missing:** Real-time monitoring (failed logins, errors, crashes)
- 📋 **Action:** Add systemd watchdog or process monitor with Telegram alerts

---

## 🔴 HIGH RISK (Fix Immediately)

### 3️⃣ Change default port
- 🔴 **Current:** Port 18789 (OpenClaw default)
- 🔴 **Risk:** "Every hacker knows it" (Matt Ganzak)
- ✅ **Mitigation:** `bind: "loopback"` (not exposed to internet)
- ⚠️ **BUT:** If Tailscale enabled on MacBook → port exposed to Tailscale network
- 📋 **Action:** Change to random high port (e.g., 47392)

**Recommendation:**
```json
{
  "gateway": {
    "port": 47392,  // Random port (was 18789)
    "bind": "loopback"
  }
}
```

### 8️⃣ Bot audit security
- ❌ **Missing:** Automated log monitoring
- ❌ **Missing:** Failed login detection
- ❌ **Missing:** Suspicious activity alerts
- 📋 **Action:** Create security audit skill

---

## 📋 Action Items (Priority Order)

### IMMEDIATE (Today)

1. **Change OpenClaw port** (18789 → random)
   ```bash
   # Edit ~/.openclaw/openclaw.json
   # Change "port": 18789 → "port": 47392
   # Restart gateway
   ```

2. **Create security audit skill**
   - Monitor failed logins (Telegram, Signal, webchat)
   - Alert on suspicious activity
   - Daily security report (cron 6am)

### SHORT TERM (This Week)

3. **Install Fail2ban on NAS**
   ```bash
   ssh $NAS_USER@$NAS_HOST
   sudo apt install fail2ban
   # Configure SSH jail (3 failures = 24h ban)
   ```

4. **NAS firewall rules**
   - Block external access to Docker ports (8053, 8123, 8010, etc.)
   - Allow only LAN + Tailscale IPs
   - Document in `connections/nas-firewall.md`

5. **Real-time monitoring**
   - Process watchdog (restart on crash)
   - Telegram alert on failures
   - Log rotation (prevent disk fill)

### LONG TERM (Server Migration)

6. **Move OpenClaw to dedicated server**
   - Separate from personal MacBook
   - Always-on infrastructure
   - Better isolation (containerized)

7. **Harden server**
   - UFW firewall (strict rules)
   - Fail2ban (all services)
   - Tailscale-only access (no public IP)
   - Regular security audits

---

## 🔐 Security Best Practices (Ongoing)

- ✅ Keep OpenClaw updated (run `openclaw update` monthly)
- ✅ Rotate API tokens every 6 months
- ✅ Review logs weekly (failed auth attempts)
- ✅ Audit user allowlists quarterly
- ✅ Test disaster recovery (backup restore) monthly
- ✅ Document all security changes (this file)

---

## 📚 References

- Matt Ganzak security guide: https://www.instagram.com/p/DUVvUMrEQnh/
- OpenClaw security docs: /opt/homebrew/lib/node_modules/openclaw/docs/security.md
- Tailscale best practices: https://tailscale.com/kb/1077/secure-server-ubuntu-18-04/
- Fail2ban tutorial: https://www.digitalocean.com/community/tutorials/how-to-protect-ssh-with-fail2ban-on-ubuntu

---

**Last updated:** 2026-02-10 23:30 EST  
**Next review:** 2026-03-10 (monthly)
