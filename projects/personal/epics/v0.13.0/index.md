# Epic Notes

> Version, name, status → see `epic.yaml`

---

# v0.13.0 - Security & Secrets Management 🔒

**Epic Note - Full Implementation Details**


## Security Layers

### Layer 1: Obscurity (Script Kiddie Defense)
**Rename default paths to non-obvious names**

**Current paths (obvious targets):**
```
~/.openclaw/          ← Screams "AI agent data here!"
~/.openclaw/workspace ← Known structure
```

**Proposed obfuscated paths:**
```
~/.config/system-prefs/     (looks like boring config)
~/.cache/build-artifacts/   (looks like dev junk)
~/.local/share/telemetry/   (nobody wants to touch telemetry)
```

**Benefits:**
- ✅ Automated scripts looking for `.openclaw` find nothing
- ✅ Casual browsing misses important data
- ✅ Rename is one-time operation (symlink for compatibility)

**Tasks:**
- [ ] Choose obfuscated path name (vote: `.config/system-prefs`)
- [ ] Create migration script (mv + symlink for backward compat)
- [ ] Update all hardcoded paths in scripts
- [ ] Test: ensure OpenClaw still boots after rename
- [ ] Document: "Where is my data actually stored?"


### Layer 2: Access Control (Biometric Authentication)
**Maximum device security on `.openclaw` folder (or renamed equivalent)**

**macOS options:**
1. **File Vault encryption** (whole disk, already enabled?)
2. **Folder-specific ACL** (Access Control Lists)
3. **Encrypted DMG with biometric unlock** (strongest)

**Recommended: Encrypted DMG approach**
```
~/Library/Containers/SecureWorkspace.dmg (encrypted, biometric unlock)
  → Mounts to ~/.local/share/telemetry/ (obfuscated path)
  → Requires Touch ID/Face ID/password to mount
  → Auto-dismounts on screen lock
```

**Benefits:**
- ✅ Touch ID/Face ID/password required to access
- ✅ Encrypted at rest (AES-256)
- ✅ Auto-locks when device locks
- ✅ Works across macOS/iOS if same Apple ID

**Tasks:**
- [ ] Research: macOS encrypted DMG with biometric unlock
- [ ] Create secure container for workspace
- [ ] Script: auto-mount on OpenClaw start (with biometric prompt)
- [ ] Script: auto-dismount on screen lock or idle timeout
- [ ] Test: Try accessing data without auth (should fail)
- [ ] Document: "How to unlock workspace if Touch ID fails"

**Session timeout config:**
- Idle timeout: 15 minutes → auto-lock
- Screen lock → immediate auto-lock
- Sleep → immediate auto-lock


### Layer 3: Intrusion Detection (Stealth Surveillance)
**If unauthorized access detected → silent alert with evidence**

**Detection triggers:**
- ❌ Failed biometric auth (3+ attempts)
- ❌ Folder access without OpenClaw running
- ❌ File modification outside normal session
- ❌ Attempt to copy secrets/ folder

**On detection, execute stealth surveillance:**
1. **Snapshot webcam** (photo of intruder)
2. **Screenshot** (what they're looking at)
3. **Location** (WiFi/GPS if available)
4. **System info** (IP, WiFi SSID, device name)
5. **Silent SMS to Nicholas** via Telegram/iMessage
   - "⚠️ Unauthorized access detected"
   - Timestamp + location + screenshot + photo
   - NO notification on compromised device (stealth)

**macOS implementation:**
```bash
# Webcam snapshot (silent, no shutter sound)
imagesnap -q -w 1 /tmp/.sys_snapshot.jpg

# Screenshot
screencapture -x /tmp/.sys_screen.jpg

# Location (WiFi-based)
CoreLocationCLI -once -json

# Send via Telegram (headless, no UI)
curl -F photo=@/tmp/.sys_snapshot.jpg \
     -F caption="Unauthorized access $(date)" \
     https://api.telegram.org/bot$TOKEN/sendPhoto?chat_id=$CHAT

# Clean up evidence
rm /tmp/.sys_*.jpg
```

**Stealth requirements:**
- ❌ NO visual feedback on device (no alerts, no sounds)
- ❌ NO process visible in Activity Monitor (background daemon)
- ✅ Evidence sent before intruder can stop it
- ✅ Works even if network disconnected (queue for later send)

**Tasks:**
- [ ] Install `imagesnap` (brew install imagesnap)
- [ ] Install `CoreLocationCLI` (brew install corelocationcli)
- [ ] Create stealth surveillance script (`~/.local/bin/stealth-alert`)
- [ ] Integrate with file system monitoring (fswatch)
- [ ] Test: Trigger false alarm, verify SMS received
- [ ] Configure Telegram bot token in secrets (encrypted)
- [ ] Document: "How to disable surveillance (when lending device)"

**Edge cases:**
- If network down → queue alert, send when online
- If Telegram blocked → fallback to iMessage
- If both blocked → write encrypted log to NAS (retrieve later)


## Attack Vectors Prevented

**Before v0.13.0 (vulnerable):**
- ❌ Tokens in git commits → Anyone with repo access can steal
- ❌ Tokens in screenshots → Accidental sharing leaks credentials
- ❌ Unencrypted NAS backups → Backup compromise = full access
- ❌ Unlocked laptop → Anyone can browse `.openclaw/`
- ❌ Script kiddies → Automated scripts target known paths

**After v0.13.0 (hardened):**
- ✅ Tokens encrypted in Keychain → OS-level protection
- ✅ Obfuscated paths → Automated scripts find nothing
- ✅ Biometric locks → Touch ID required to access
- ✅ Stealth surveillance → Intruders photographed + reported
- ✅ Auto-lock on idle → No window of opportunity


## Implementation Options

### Option A: Encrypted Secrets Only (Minimal)
- Tokens in macOS Keychain (encrypted)
- Git ignore rules (prevent commits)
- **No path obfuscation, no biometrics, no surveillance**
- **Pro:** Simple, fast to implement
- **Con:** Still vulnerable to unlocked laptop access

### Option B: Keychain + Biometrics (Moderate)
- Tokens in Keychain
- Encrypted DMG for workspace (Touch ID unlock)
- Auto-lock on idle
- **No path obfuscation, no surveillance**
- **Pro:** Strong protection, reasonable effort
- **Con:** No intrusion detection

### Option C: Full Hardening (Maximum - RECOMMENDED)
- **Layer 1:** Obfuscated paths (`.config/system-prefs`)
- **Layer 2:** Encrypted DMG + biometric unlock
- **Layer 3:** Stealth surveillance on unauthorized access
- **Pro:** Defense in depth, paranoia-grade security
- **Con:** Most complex, requires testing

**Recommendation: Option C (Full Hardening)**
- Worth the effort given sensitivity of work credentials
- Each layer catches what previous layer missed
- Stealth surveillance = evidence if breach happens


## Tasks (Full Hardening Path)

**Phase 1: Secrets Encryption (CRITICAL for v0.12.0)**
- [ ] Choose storage method (Keychain vs encrypted file)
- [ ] Implement token save/load functions
- [ ] Add token refresh automation (check expiry daily)
- [ ] Create .gitignore rules (block /tokens/, /secrets/)
- [ ] Audit existing files for accidental token leaks
- [ ] Test: save Graph API token, reload after restart
- [ ] Document: "How to rotate tokens if compromised"

**Phase 2: Path Obfuscation (Low priority, high value)**
- [ ] Choose obfuscated path (e.g., `.config/system-prefs`)
- [ ] Create migration script (mv + symlink)
- [ ] Update hardcoded paths in all scripts
- [ ] Test: OpenClaw boots and finds data
- [ ] Document: "Real location of workspace"

**Phase 3: Biometric Access Control (High security)**
- [ ] Create encrypted DMG for workspace
- [ ] Script: auto-mount with Touch ID on OpenClaw start
- [ ] Script: auto-dismount on screen lock/idle (15min)
- [ ] Test: Access data without auth (should fail)
- [ ] Document: "Unlock workspace if biometrics fail"

**Phase 4: Stealth Surveillance (Intrusion detection)**
- [ ] Install imagesnap + CoreLocationCLI
- [ ] Create stealth alert script
- [ ] Integrate with fswatch (file monitoring)
- [ ] Test: Trigger alert, verify SMS received
- [ ] Configure Telegram bot token (encrypted)
- [ ] Implement offline queue (send when network returns)
- [ ] Document: "Disable surveillance when lending device"


## Files to Protect

```
~/.config/system-prefs/              (obfuscated from ~/.openclaw)
├── .gitignore (add: tokens/, secrets/, *.token)
├── secrets/ (encrypted DMG, biometric unlock)
│   ├── graph-tokens.json (encrypted)
│   ├── jira-api-key (encrypted)
│   ├── nas-credentials (encrypted)
│   └── telegram-bot-token (for stealth alerts)
└── workspace/ (on encrypted DMG)
```


## Integration with v0.12.0

- Graph API tokens stored via v0.13.0
- Auto-refresh before expiry
- Never logged or committed
- Protected by 3 layers of security


**Rationale:** Defense in depth - multiple layers ensure no single point of failure. If one layer is bypassed, others still protect. Stealth surveillance provides evidence if all layers fail.


**Updated:** 2026-02-10 (Matt Ganzak security tips added)  
**Owner:** Nicholas (with Claw implementation support)


## 🔐 Additional Security Recommendations (Matt Ganzak)

**Source:** https://www.instagram.com/p/DUVvUMrEQnh/

### ✅ Already Implemented

- **2️⃣ Never run as root** ✅ OpenClaw runs as `nfrota` (unprivileged user)
- **4️⃣ Tailscale installed** ✅ iPad/iPhone have Tailscale
- **7️⃣ Allowlist users** ✅ `dmPolicy: "pairing"` configured
- **🔟 DMs only** ✅ Webchat = 1:1, no group chats

### 🚨 NOT Yet Implemented (Add to Epic)

#### **3️⃣ Change Default Port (CRITICAL)**

**Problem:** OpenClaw runs on port 18789 (default)
- "Every hacker knows it" (Matt Ganzak)
- Easy target for automated scanners

**Current mitigation:** `bind: "loopback"` (localhost only)
- ✅ Not exposed to internet
- ⚠️ But if Tailscale enabled on MacBook → exposed to Tailscale network

**Action:**
- [ ] Change port from 18789 → random high port (e.g., 47392)
- [ ] Update webchat URL
- [ ] Document port change in `connections/openclaw-security-audit.md`
- [ ] Test: verify webchat works on new port

**Config change:**
```json
{
  "gateway": {
    "port": 47392,  // Random port (was 18789)
    "bind": "loopback"
  }
}
```


#### **5️⃣ SSH Keys + Fail2ban (NAS)**

**Current state:**
- ✅ NAS uses SSH keys (password auth disabled)
- ❌ No Fail2ban installed

**Risk:** Brute force attacks on SSH (even with keys)

**Action:**
- [ ] Install Fail2ban on NAS
  ```bash
  ssh $NAS_USER@$NAS_HOST
  sudo apt install fail2ban
  sudo systemctl enable fail2ban
  ```
- [ ] Configure SSH jail (3 failures = 24h ban)
  ```ini
  # /etc/fail2ban/jail.local
  [sshd]
  enabled = true
  maxretry = 3
  bantime = 86400  # 24 hours
  findtime = 600   # 10 minutes
  ```
- [ ] Test: trigger false login attempts, verify ban
- [ ] Document in `connections/nas-security.md`


#### **6️⃣ Firewall with UFW (NAS)**

**Current state:**
- ✅ Mac firewall = default (permissive but localhost-only)
- ❌ NAS has NO firewall (Docker ports exposed to LAN)

**Risk:** Docker services exposed to entire LAN
- Pi-hole (8053), Home Assistant (8123), Paperless (8010), etc.
- Anyone on network can access without auth

**Action:**
- [ ] Install UFW on NAS
  ```bash
  ssh $NAS_USER@$NAS_HOST
  sudo apt install ufw
  ```
- [ ] Configure firewall rules
  ```bash
  # Default deny incoming
  sudo ufw default deny incoming
  sudo ufw default allow outgoing
  
  # Allow SSH (from specific IPs only)
  sudo ufw allow from 192.168.1.0/24 to any port 22
  
  # Allow Tailscale subnet
  sudo ufw allow from 100.64.0.0/10
  
  # Allow Docker services (LAN + Tailscale only)
  sudo ufw allow from 192.168.1.0/24 to any port 8053  # Pi-hole
  sudo ufw allow from 192.168.1.0/24 to any port 8123  # HA
  sudo ufw allow from 192.168.1.0/24 to any port 8010  # Paperless
  
  # Enable firewall
  sudo ufw enable
  ```
- [ ] Test: verify services accessible from LAN, blocked from outside
- [ ] Document in `connections/nas-firewall.md`

**Alternative:** Docker network isolation (container-level firewall)
```yaml
# docker-compose.yml
networks:
  internal:
    internal: true  # No external access
  exposed:
    driver: bridge  # Only specific services
```


#### **8️⃣ Ask Bot to Audit Security (Self-Monitoring)**

**Concept:** "Check my logs for failed logins" → Claw does the work

**Implementation:**
- [ ] Create security audit skill (`~/.openclaw/skills/security-audit/`)
- [ ] Daily cron job (6am): analyze logs, report suspicious activity
- [ ] Monitor:
  - Failed login attempts (Telegram, Signal, webchat)
  - Unauthorized file access (workspace, secrets)
  - Port scan attempts (if firewall logs available)
  - Unusual API usage (Graph, Jira, NAS)
- [ ] Alert via Telegram if anomalies detected
- [ ] Weekly security report (summary of week's activity)

**Files to monitor:**
```bash
# OpenClaw logs
~/.openclaw/logs/*.log

# NAS logs (SSH, Docker, Pi-hole)
ssh $NAS_USER@$NAS_HOST "sudo tail -n 1000 /var/log/auth.log"

# System logs (Mac)
log show --predicate 'eventMessage contains "failed"' --last 24h
```

**Skill structure:**
```
~/.openclaw/skills/security-audit/
├── SKILL.md (how to use)
├── audit-logs.sh (analyze logs)
├── detect-intrusion.sh (pattern matching)
└── report-security.sh (generate daily report)
```


#### **9️⃣ Real-Time Alerts (24/7 Monitoring)**

**Current state:**
- ⚠️ Heartbeat = 2x/day (morning + evening)
- ❌ No real-time crash detection
- ❌ No instant alerts on failures

**Matt's recommendation:** "Claude monitors your server and messages you the second something's off. 24/7."

**Implementation options:**

**Option A: systemd watchdog (Linux/NAS only)**
```ini
# /etc/systemd/system/openclaw.service
[Service]
WatchdogSec=30s
Restart=on-failure
RestartSec=10s
```

**Option B: Process monitor + Telegram alerts (cross-platform)**
```bash
# ~/Documents/life/backstage/scripts/monitor-openclaw.sh
#!/bin/bash
while true; do
  if ! pgrep -f "openclaw-gateway" > /dev/null; then
    # OpenClaw crashed!
    curl -s "https://api.telegram.org/bot$TOKEN/sendMessage" \
      -d chat_id=$CHAT_ID \
      -d text="🚨 OpenClaw crashed at $(date)"
    
    # Auto-restart
    openclaw gateway start
  fi
  sleep 60  # Check every minute
done
```

**Option C: macOS launchd (current platform)**
```xml
<!-- ~/Library/LaunchAgents/ai.openclaw.watchdog.plist -->
<plist>
  <dict>
    <key>Label</key>
    <string>ai.openclaw.watchdog</string>
    <key>ProgramArguments</key>
    <array>
      <string>/Users/nfrota/Documents/life/backstage/scripts/monitor-openclaw.sh</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
  </dict>
</plist>
```

**Action:**
- [ ] Choose monitoring approach (launchd for Mac, systemd for server)
- [ ] Create watchdog script
- [ ] Test: kill OpenClaw, verify alert + auto-restart
- [ ] Monitor additional services (NAS Docker containers)
- [ ] Document in `connections/openclaw-monitoring.md`


### 📋 Priority Order (Matt Ganzak Tips)

**IMMEDIATE (Today):**
1. ✅ Change OpenClaw port (18789 → 47392)

**SHORT TERM (This Week):**
2. ✅ Install Fail2ban on NAS
3. ✅ Configure NAS firewall (UFW)
4. ✅ Create security audit skill

**MEDIUM TERM (This Month):**
5. ✅ Real-time monitoring + alerts
6. ✅ Weekly security reports

**LONG TERM (Server Migration):**
7. ✅ Move to dedicated server (epic-server-migration.md)
8. ✅ Harden server (all best practices)


## Security Audit Documentation

**Full audit created:** `~/.openclaw/workspace/connections/openclaw-security-audit.md`

**Scorecard:**
- ✅ **Secure:** 7/10 points (good baseline)
- ⚠️ **Medium risk:** 2/10 points (Fail2ban, real-time alerts)
- 🔴 **High risk:** 1/10 points (default port 18789)

**Next review:** 2026-03-10 (monthly security audit)
