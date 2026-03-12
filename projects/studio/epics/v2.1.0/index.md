# Uptime Alerts

**Why NAS?**
- Mac Studio can reboot/crash → Kuma on Mac = silent failure
- Nicholas travels with iPad → needs remote alerts when Mac is down
- External monitoring = "firefighter outside the burning building"

---

## Tasks

### Phase 3: Alerts
- [ ] Configure Telegram notifications
  - Bot token: `$TELEGRAM_BOT_TOKEN` (in .env)
  - Chat ID: `$TELEGRAM_CHAT_ID`
  - Test: Send alert when service goes down
- [ ] Alert templates (concise, actionable)
- [ ] Test failure scenarios (docker stop → verify alert received)

### Phase 4: Automation
- [ ] Auto-add new apps to Kuma
  - When new port opens → auto-create monitor?
  - Script vs manual workflow?
- [ ] Document: "New service checklist" (Docker → Tailscale → Kuma)

---

## Done

### Phase 1: Setup
- ✅ Installed Uptime Kuma on NAS (Docker, port 3001)
- ✅ Exposed via Tailscale: https://media.adal-rigel.ts.net:3001
- ✅ Updated `connections/tailscale.md` (subnet routes philosophy)

### Phase 2: Monitors
- ✅ Created 17 monitors:
  - **Tailscale Health:** Studio, NAS
  - **Mac Studio (5):** Backstage, Librarian, Shelfmark, OpenClaw, Uptime Kuma
  - **NAS (10):** Jellyfin, Immich, Paperless, Syncthing, Home Assistant, Actual Budget, Komga, SearXNG, Portainer, changedetection.io

**Philosophy:** "Se existe no port, existe no Tailscale" → 1 monitor per service (Tailscale only, not local+Tailscale)

---

## Research

### Monitoring Philosophy
- **Subnet routes = automatic** (every port exposed via Tailscale)
- **No `tailscale serve` needed** (deprecated for this use case)
- **Monitor Tailscale URLs only** (local = tailscale when subnet routes enabled)

### What to Monitor
- **Critical:** Services Nicholas uses remotely (Jellyfin, Paperless, Home Assistant)
- **Infrastructure:** Tailscale connectivity (Studio, NAS)
- **Development:** Backstage, Librarian, OpenClaw

---

## Links

- Uptime Kuma: https://media.adal-rigel.ts.net:3001
- `connections/tailscale.md` (updated 2026-03-12)
- `connections/services.md` (service list)

---

## Notes

- changedetection.io runs HTTP (not HTTPS): `http://media.adal-rigel.ts.net:5555`
- All monitors accept 200-399 status codes (handles redirects)
