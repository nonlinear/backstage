# NAS Hardening (Backlog)

**Source:** v0.40.0 "Uptime Alerts + NAS Production Hardening" (deprecated 2026-03-14)

**Why backlog:** Core monitoring consolidated in v0.38.0. These are nice-to-have improvements.

---

## Resource Monitoring

- [ ] Add resource sensors to Uptime Kuma (CPU, RAM, disk usage via SSH)
- [ ] Configure thresholds (alert when disk >85%, RAM >90%)
- [ ] Dashboard view (all resources in one page)

---

## Alert Improvements

- [ ] Configure alert escalation levels (warning → critical → emergency)
- [ ] Smart throttling (batch alerts, don't spam during outages)
- [ ] Alert routing (different channels for different severity)

---

## Backup System

- [ ] Create config backup script (Pi-hole, Home Assistant, Docker configs)
- [ ] Schedule daily backups (cron 3AM)
- [ ] Choose backup destination (local /backups/ + remote S3/B2?)
- [ ] Test restore quarterly (verify backup integrity)
- [ ] Document restore playbook

---

## Failover DNS

- [ ] Configure Tailscale fallback DNS (Primary: Pi-hole, Secondary: 1.1.1.1)
- [ ] Test failover (stop Pi-hole → verify 1.1.1.1 works)
- [ ] Document failover behavior

---

## Documentation

- [ ] Auto-add workflow for new services (add to Kuma when deploying)
- [ ] Disaster recovery playbook (NAS failure scenarios)

---

**Future epic:** When needed, promote to new epic (e.g., v0.42.0 "NAS Resilience")
