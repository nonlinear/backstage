# Code/Agenda Grooming → Main Roadmap Epics

**Date:** 2026-02-02  
**Source:** `~/Documents/notes/code/agenda.md`

---

## Mapping: Agenda Items → Epics

### ✅ Already in Main Roadmap

1. **Home Assistant Voice** → **v0.5.0** ✅
2. **Pi-hole** → **v0.10.0** ✅
3. **Backup strategy** → **v0.11.0** ✅

---

### 📚 Personal Library → Librarian Project (Own Backstage)

**NOT in main roadmap** — Librarian is a separate project with own ROADMAP.

Items from agenda:
- Personal Library MCP
- Personal Library vscode frontend
- epub reader, highlights (webapp)

**Action:** Move to `~/Documents/librarian/ROADMAP.md` (project-specific)

---

### 🆕 New Epics to Create

#### v0.12.0 - Reverse Proxy & Public Access
**Goal:** Expose NAS services securely via reverse proxy (Caddy/Nginx)

**What it provides:**
- Access NAS apps from anywhere (without Tailscale)
- HTTPS with auto-certificates (Let's Encrypt)
- Secure external access (fail2ban, authentication)

**Use cases (from agenda):**
- Komga (comics) public access
- Jellyfin (maybe)
- Inspiration folder sharing
- Quick file share (24h expiring links)

**Tech:** Caddy or Nginx Proxy Manager + Cloudflare DNS + fail2ban

**Notes:** `~/Documents/notes/code/reverse-proxy.md` has full guide

---

#### v0.13.0 - File Conversion (VERT)
**Goal:** Self-hosted file converter (250+ formats, local WebAssembly)

**What it provides:**
- Convert images, audio, documents, video
- Fully local (privacy-first)
- No file size limits
- User-friendly web interface

**Tech:** VERT.sh (Svelte + TypeScript + WebAssembly)

**Link:** https://github.com/VERT-sh/VERT

---

#### Add to v0.5.0 (HA Voice)
**From `code/ha-calendar.md`:**

**Task:** Integrate calendar with Home Assistant Voice

**Steps:**
- [ ] Choose calendar: Google, Outlook/Teams, or CalDAV
- [ ] Add integration via HA UI (OAuth or configuration.yaml)
- [ ] Use calendar entities in automations/voice reminders
- [ ] Home calendar → triggers actions
- [ ] Work calendar → triggers notifications

**Use case:** "Hey assistant, what's on my calendar today?"

---

### 🔧 Infrastructure Items (Not Full Epics)

**Crontab UI** → Add to Infrastructure/automation toolkit
- https://github.com/alseambusher/crontab-ui
- Web UI for managing cron jobs
- Nice-to-have for NAS maintenance

**JSON parsing via browser** → Unclear use case, ask user for context

---

## Summary

**New epics to add:**
1. **v0.12.0 - Reverse Proxy & Public Access** (Caddy, external access)
2. **v0.13.0 - File Conversion (VERT)** (local file converter)

**Enhancements to existing:**
- **v0.5.0 (HA Voice):** Add calendar integration tasks

**Move to other projects:**
- Personal Library items → Librarian project ROADMAP

**Infrastructure notes:**
- Crontab UI (nice-to-have)
- JSON parsing (needs clarification)

---

**Next:** Review with user, then update main ROADMAP.
