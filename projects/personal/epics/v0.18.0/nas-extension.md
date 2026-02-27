# v0.18.0 - NAS Extension (Monitoring, Alerts, Backups)

**Status:** 🚧 PLANNED

**Goal:** Production-grade NAS infrastructure (monitoring, alerts, backup, auto-recovery)

**Why:** Pi-hole Global DNS = single point of failure. Need monitoring + alerts + failover before enabling.

---

## Problem

**Current state:**
- ✅ NAS running critical services (Pi-hole, Home Assistant, Paperless, etc.)
- ❌ **No monitoring** (if service dies, no alert)
- ❌ **No backups** (data loss risk)
- ❌ **No auto-recovery** (manual intervention needed)

**Risk scenario:**
- Enable Pi-hole Global DNS → NAS becomes critical for EVERYONE on tailnet
- NAS dies → **DNS stops → Internet stops for all devices**
- No alert → We don't know until someone complains

**This is unacceptable for production.**

---

## Solution

**Three pillars:**

### 1. 📊 Monitoring
- **Service health checks** (Pi-hole, HA, Paperless, Docker)
- **Resource monitoring** (CPU, RAM, disk, network)
- **Uptime tracking** (SLA metrics, downtime history)

### 2. 🚨 Alerts
- **Telegram notifications** (service down, high CPU, disk full)
- **Escalation levels** (warning → critical → emergency)
- **Smart throttling** (don't spam, batch alerts)

### 3. 💾 Backups
- **Config backups** (Pi-hole settings, HA automations, Docker configs)
- **Data backups** (Paperless docs, critical data)
- **Restore testing** (verify backups work)

---

## Tasks

### Phase 1: Monitoring (Home Assistant Integration)

- [ ] **Setup HA ping sensors** (Pi-hole, Docker containers)
  - Ping 192.168.1.152 every 1min
  - DNS query test (`dig @192.168.1.152 google.com`)
  - HTTP health check (Pi-hole Web UI, HA API)

- [ ] **Resource sensors** (via SSH or Docker stats)
  - CPU usage (%)
  - RAM usage (%)
  - Disk usage (%)
  - Network bandwidth

- [ ] **Service status sensors**
  - Docker container states (running/stopped/restarting)
  - Pi-hole stats (queries, blocked %, uptime)
  - HA state

**Deliverable:** HA dashboard showing NAS health

---

### Phase 2: Alerts (Telegram Integration)

- [ ] **Create Telegram bot** (alerts channel)
- [ ] **HA automation: Service down**
  - Trigger: Ping sensor offline > 5min
  - Action: Telegram alert "🚨 Pi-hole DOWN - DNS failing"

- [ ] **HA automation: High resource usage**
  - Trigger: CPU > 80% for 10min
  - Action: Telegram warning "⚠️ NAS CPU high - investigate"

- [ ] **HA automation: Disk full**
  - Trigger: Disk > 90%
  - Action: Telegram critical "🔴 NAS disk 90% - cleanup needed"

- [ ] **Test alerts** (manually trigger, verify delivery)

**Deliverable:** Working alert system via Telegram

---

### Phase 3: Auto-Recovery

- [ ] **Docker restart policies**
  ```bash
  docker update --restart=unless-stopped pihole
  docker update --restart=unless-stopped homeassistant
  ```

- [ ] **HA automation: Restart container**
  - Trigger: Container stopped unexpectedly
  - Action: SSH restart command + Telegram notification

- [ ] **Watchdog script** (cron every 5min)
  ```bash
  # If Pi-hole down → try restart
  # If restart fails → alert
  ```

**Deliverable:** Self-healing containers

---

### Phase 4: Backups

- [ ] **Config backup script**
  - Pi-hole: `/etc/pihole/` → backup
  - HA: `/config/` → backup
  - Docker configs

- [ ] **Automated backup schedule** (daily, 3AM)
- [ ] **Backup destination**
  - Local: NAS /backups/
  - Remote: ??? (Synology Cloud? Backblaze? Tailscale device?)

- [ ] **Restore testing** (quarterly)
  - Spin up test container from backup
  - Verify config intact

**Deliverable:** Automated config backups + restore playbook

---

### Phase 5: Failover DNS (Tailscale Safety)

- [ ] **Configure Tailscale fallback DNS**
  - Primary: 192.168.1.152 (Pi-hole)
  - Secondary: 1.1.1.1 (Cloudflare)

- [ ] **Test failover**
  - Stop Pi-hole
  - Verify devices switch to 1.1.1.1
  - Verify internet still works

**Deliverable:** Graceful degradation (ads not blocked, but internet works)

---

## Success Criteria

**Before enabling Pi-hole Global DNS:**
- ✅ Monitoring dashboard shows NAS health
- ✅ Alerts working (tested via manual trigger)
- ✅ Auto-recovery tested (kill container → auto-restart)
- ✅ Backups running (daily, verified restore)
- ✅ Failover DNS tested (Pi-hole down → 1.1.1.1 works)

**Then and only then:** Enable Global DNS safely.

---

## Tech Stack

**Monitoring:**
- Home Assistant (ping sensors, resource monitoring, automations)
- SSH commands (docker stats, df -h, top)

**Alerts:**
- Telegram Bot API
- HA Telegram integration

**Backups:**
- Bash scripts (rsync, tar, scp)
- Cron jobs (schedule)

**Auto-recovery:**
- Docker restart policies
- HA automations (SSH restart commands)
- Watchdog script (cron)

---

## Timeline

**Estimated:** 1-2 days (MVP), 1 week (complete)

**Phases:**
1. Monitoring (4h) → Dashboard
2. Alerts (2h) → Telegram working
3. Auto-recovery (2h) → Self-healing
4. Backups (4h) → Automated + tested
5. Failover (1h) → Safety net

**Total:** ~13h work

---

## Notes

**This is infrastructure work** (not sexy, but critical)

**Familiar metaphor:** You're building a temple. The monitoring/alerts/backups are the foundation. Without it, the temple (Pi-hole Global DNS) will collapse.

**Nicholas style:** "meio complicado" → break into phases, ship incrementally

**Dependencies:**
- v0.5.0 Home Assistant (already running)
- v0.10.0 Pi-hole (already running)
- Telegram bot (easy to create)

**Blockers:**
- None (all tech exists, just needs wiring)

---

**Created:** 2026-02-11  
**Priority:** HIGH (blocks Pi-hole Global DNS)  
**Effort:** Medium (13h)
