# Security & Secrets Management

Fortifying security so system is dependable.

---

## Security Layers

### Layer 1: Obscurity (Script Kiddie Defense)
Rename default paths to non-obvious names (e.g., `.config/system-prefs` instead of `.openclaw`).

### Layer 2: Access Control (Biometric Authentication)
Encrypted DMG with Touch ID/Face ID unlock, auto-dismounts on screen lock/idle.

### Layer 3: Intrusion Detection (Stealth Surveillance)
If unauthorized access detected → silent webcam snapshot + screenshot + location + SMS alert.

---

## Biometric Token Vault

**Problem:** Tokens stored in plaintext `.env`
- ✅ Works for automation (cron, heartbeat, API calls)
- ❌ Security risk if machine compromised
- ❌ No audit trail (who accessed what token when)
- ❌ No revocation (if token leaked, must regenerate)

**Solution:** Tokens stored in encrypted vault (macOS Keychain)
- **First access per session:** Requires Touch ID / Face ID (Nicholas present)
- **Subsequent accesses:** Token cached in memory (session-only)
- **Automation friendly:** Once unlocked, cron/heartbeat work unattended

**User experience:**
1. Claw needs Jira token (first time today)
2. macOS prompt: "OpenClaw wants to access Jira token" → Touch ID
3. Nicholas approves (muscle memory, takes 1 second)
4. Token cached for rest of session
5. Next API call → uses cached token (no prompt)

**Nicholas happy:** Biometric = legitimate gate, muscle memory  
**Claw happy:** Automation still works  
**Security happy:** No plaintext tokens, audit trail

---

## macOS Keychain Implementation

**Storage:**
```bash
# Store token (prompts for Touch ID)
security add-generic-password \
  -a "$USER" \
  -s "WILEY_JIRA_TOKEN" \
  -w "token_value" \
  -T "/usr/bin/security" \
  -T "/usr/bin/python3"
```

**Retrieval:**
```bash
# First access → Touch ID prompt
# Subsequent → cached until reboot/timeout
security find-generic-password \
  -a "$USER" \
  -s "WILEY_JIRA_TOKEN" \
  -w
```

**Python wrapper:**
```python
import subprocess
import os

_token_cache = {}

def get_token(service_name):
    # Check session cache
    if service_name in _token_cache:
        return _token_cache[service_name]
    
    # Request from Keychain (may prompt Touch ID)
    result = subprocess.run(
        ['security', 'find-generic-password', 
         '-a', os.getenv('USER'),
         '-s', service_name,
         '-w'],
        capture_output=True,
        text=True
    )
    
    if result.returncode == 0:
        token = result.stdout.strip()
        _token_cache[service_name] = token  # Cache for session
        return token
    else:
        raise Exception(f"Failed to get token: {result.stderr}")
```

---

## Migration Plan (Biometric Vault)

**Phase 1:** Wrapper library
- Create `~/Documents/life/scripts/secure_tokens.py`
- Wrapper tries Keychain first, falls back to .env
- Gradual migration (both work during transition)

**Phase 2:** Move critical tokens
- Jira, Figma, GitHub → Keychain
- Less sensitive (NAS password) → can stay in .env

**Phase 3:** Deprecate .env
- Once all tokens migrated
- Keep .env for non-secret config (URLs, account IDs)

**Phase 4:** Audit & test
- Verify cron jobs work after first Touch ID unlock
- Test session cache timeout
- Confirm automation still unattended

---

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

---

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

---

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

---

## Open Questions (Biometric Vault)

1. **Cron jobs without user session:** How to handle 3am automated tasks?
   - Possible: Keep SOME tokens in .env (least sensitive)
   - Or: Run cron jobs in LaunchAgent (has keychain access)

2. **Server migration:** When Claw moves to always-on server?
   - Keychain won't work (no Touch ID on headless server)
   - May need different solution (encrypted .env with key in Keychain?)

3. **Token rotation:** How to update tokens in Keychain?
   - Manual: `security delete-generic-password` + `add-generic-password`
   - Or: Script that prompts for new token, stores automatically

---

## Security Audit

**Scorecard:**
- ✅ Secure: 7/10 points
- ⚠️ Medium risk: 2/10 points (Fail2ban, alerts)
- 🔴 High risk: 1/10 points (default port)

**Next review:** Monthly security audit
