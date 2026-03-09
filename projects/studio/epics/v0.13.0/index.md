# Epic Notes

> Version, name, status → see `epic.yaml`

---

## Security Layers

### Layer 1: Obscurity (Script Kiddie Defense)
Rename default paths to non-obvious names (e.g., `.config/system-prefs` instead of `.openclaw`).

### Layer 2: Access Control (Biometric Authentication)
Encrypted DMG with Touch ID/Face ID unlock, auto-dismounts on screen lock/idle.

### Layer 3: Intrusion Detection (Stealth Surveillance)
If unauthorized access detected → silent webcam snapshot + screenshot + location + SMS alert.

## Implementation Options

**Option A: Encrypted Secrets Only (Minimal)**
- Tokens in macOS Keychain
- Git ignore rules
- Simple, but still vulnerable to unlocked laptop access

**Option B: Keychain + Biometrics (Moderate)**
- Tokens in Keychain
- Encrypted DMG for workspace (Touch ID unlock)
- Auto-lock on idle
- Strong protection, reasonable effort

**Option C: Full Hardening (Maximum - RECOMMENDED)**
- Layer 1: Obfuscated paths
- Layer 2: Encrypted DMG + biometric unlock
- Layer 3: Stealth surveillance
- Defense in depth, paranoia-grade security

## Attack Vectors Prevented

**Before:**
- Tokens in git commits
- Tokens in screenshots
- Unencrypted NAS backups
- Unlocked laptop = full access
- Script kiddies targeting known paths

**After:**
- Tokens encrypted in Keychain
- Obfuscated paths
- Biometric locks
- Stealth surveillance
- Auto-lock on idle

## Matt Ganzak Security Tips

**Source:** https://www.instagram.com/p/DUVvUMrEQnh/

**Already Implemented:**
- ✅ Never run as root
- ✅ Tailscale installed
- ✅ Allowlist users (pairing)
- ✅ DMs only (webchat 1:1)

**Not Yet Implemented:**
- Change default port (18789 → random)
- SSH keys + Fail2ban (NAS)
- Firewall with UFW (NAS)
- Bot self-audits security logs
- Real-time alerts (24/7 monitoring)

## Files to Protect

```
~/.config/system-prefs/  (obfuscated from ~/.openclaw)
├── secrets/ (encrypted DMG, biometric unlock)
│   ├── graph-tokens.json
│   ├── jira-api-key
│   ├── nas-credentials
│   └── telegram-bot-token
└── workspace/
```

## Stealth Surveillance Implementation

```bash
# Webcam snapshot (silent)
imagesnap -q -w 1 /tmp/.sys_snapshot.jpg

# Screenshot
screencapture -x /tmp/.sys_screen.jpg

# Location (WiFi-based)
CoreLocationCLI -once -json

# Send via Telegram
curl -F photo=@/tmp/.sys_snapshot.jpg \
     https://api.telegram.org/bot$TOKEN/sendPhoto?chat_id=$CHAT
```

**Stealth requirements:**
- NO visual feedback on device
- NO process visible in Activity Monitor
- Evidence sent before intruder can stop it
- Works even if network disconnected (queue)

## Priority Order

**IMMEDIATE:**
- Change OpenClaw port (18789 → 47392)

**SHORT TERM:**
- Install Fail2ban on NAS
- Configure NAS firewall (UFW)
- Create security audit skill

**MEDIUM TERM:**
- Real-time monitoring + alerts
- Weekly security reports

**LONG TERM:**
- Move to dedicated server
- Full hardening (all best practices)

## Security Audit

**Scorecard:**
- ✅ Secure: 7/10 points
- ⚠️ Medium risk: 2/10 points (Fail2ban, alerts)
- 🔴 High risk: 1/10 points (default port)

**Next review:** Monthly security audit

**Updated:** 2026-02-10 (Matt Ganzak tips)  
**Owner:** Nicholas (with Claw implementation)
