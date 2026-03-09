# Epic Notes

> Version, name, status → see `epic.yaml`

---


### Travel Mode 🧳


**Goal:** Pre-travel checklist + health checks to prevent vacation disasters

**Problem:** No pre-travel verification = risk of discovering broken services when stranded abroad

**Context:** Kavita container deletion incident (2026-02-25) revealed:
> "imagina se to fora num outro pais dai cai? dnao tem como por de volta."

**Solution:** Automated pre-travel checks + calendar integration

**Checklist:**
- [ ] Kavita accessible via Tailscale (`https://studio.adal-rigel.ts.net:5007`)
- [ ] Home Assistant accessible (`http://media.adal-rigel.ts.net:8123`)
- [ ] All critical containers running (health check green)
- [ ] Test from iPad via cellular (not home WiFi)
- [ ] Tailscale URLs resolve
- [ ] Git backups up-to-date (`~/Apps/`)

**Implementation:**
- [ ] `~/Apps/scripts/travel-mode-check.sh` (run all checks, report status)
- [ ] Calendar integration (detect "travel" events, auto-run 3 days before)
- [ ] Telegram notifications (alert if any check fails)
- [ ] Recovery docs (if service down, what to do remotely)

**Success Criteria:**
- Travel-mode check script working (all services verified)
- Tested from iPad via cellular (real remote scenario)
- Calendar integration (auto-triggers before trips)
- Nicholas confident = won't be stranded

**Details:** [v0.X.0-travel-mode.md](epic-notes/v0.X.0-travel-mode.md)
