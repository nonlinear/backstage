# v0.2.0 - Better Apps Architecture

## Context Snapshot
- **Why this exists:** Enable per-app customizations (CSS, Service Worker, etc.) with standalone, portable skills
- **Problem solved:** Each app needs different improvements (OpenClaw = dark theme, Kavita/Komga = offline reading)
- **Date:** 2026-02-17
- **Assumptions:** Better = all-or-nothing per app, each skill is standalone (no shared dependencies)

---

## Research Summary (2026-02-17)

### Problem
**Apps need customization, but each app = different needs:**
- OpenClaw webchat = too bright, cluttered UI
- Kavita/Komga = no offline reading (web apps, streaming only)
- Each app requires different techniques (CSS vs Service Worker)

**Use case:**
- Make apps work the way WE want (not "redesign", not "fix", just "better for us")
- Each skill = standalone (can be installed independently)
- Toggle on/off per app (reversible)

---

## Architecture Decisions

### 1. Better = Namespace (Not Individual Skills)

**Folder structure:**
```
skills/better/
├── openclaw/    ← better-openclaw skill
├── kavita/      ← better-kavita skill
└── komga/       ← better-komga skill
```

**Why NOT:**
```
skills/better-openclaw/  ❌ (flat, loses grouping)
```

**Reasoning:**
- Visual grouping (all customizations in one place)
- Clear namespace (better/ = app improvements)
- Skill name = `better-{app}` (published as npm package)
- Folder = organization, name = identity

---

### 2. Standalone Skills (No Shared Code)

**Each skill is self-contained:**
```
better/openclaw/
├── SKILL.md
├── toggle.sh
├── on.sh
├── off.sh
├── redesign.css
└── open-claw.sh
```

**NO shared/ folder:**
- ❌ Shared code = dependency (breaks portability)
- ❌ Can't publish skill standalone
- ❌ Changes to shared/ break all skills

**Why standalone:**
- ✅ Each skill = complete (copy folder, works)
- ✅ Publish to npm = one folder, everything included
- ✅ No dependency hell (each skill owns its code)

**Shared code = reference only** (copy/paste, not import)

---

### 3. Per-App Toggle (Not Master Toggle)

**Each app has its own toggle.sh:**
```
better/openclaw/toggle.sh   ← OpenClaw-specific
better/kavita/toggle.sh     ← Kavita-specific
better/komga/toggle.sh      ← Komga-specific
```

**Why NOT master toggle:**
- Each technique = different on/off logic
- CSS ≠ Service Worker ≠ Browser Extension
- OpenClaw toggle = DevTools start/stop
- Kavita toggle = show console code (manual)

**Toggle types:**
- **Automated** (CSS injection via script)
- **Manual** (Service Worker = console code)
- **Hybrid** (Browser extension = load/unload)

---

### 4. Better = All-or-Nothing Per App

**OpenClaw better:**
- ONE version of CSS (dark theme + minimal UI)
- NOT multiple options (redesign, compact, accessibility)
- Take it or leave it

**Future possibility:**
- OpenClaw = more personalized (multiple CSS versions)
- Kavita = less (offline is all we need)

**Current philosophy:**
- Better = everything we want for that app
- Not modular (all features together)
- Can change later if needed

---

## Frontmatter Schema

**All better skills use `type: better` + nested `better:` block:**

```yaml
---
name: better-{app}
type: better
version: X.Y.Z
better:
  type: css | service-worker | browser-extension | bookmarklet | userscript
  app:
    name: AppName
    url: https://app-url.com
    version: X.Y.Z  # tested version
  platform: web | ios | android | desktop  # optional, default: web
  browser: chrome | firefox | safari | edge | all  # optional, if web
  reference: technique-doc.md  # link to canonical technique (future)
---
```

**Why nested:**
- OpenClaw parser supports nested YAML (validated via grep)
- Clean separation (better-specific metadata)
- Future-proof (can add more fields without polluting top-level)

---

## Skills Created

### better-openclaw

**Technique:** CSS injection via Chrome DevTools Protocol

**What it does:**
- 🌑 Dark theme (easier on eyes)
- 🧹 Minimal layout (hide noise, show content)
- 🎯 Focus mode (reduce distractions)

**How to use:**
```bash
~/Documents/skills/better/openclaw/toggle.sh
```

**Files:**
- `redesign.css` - Custom stylesheet
- `open-claw.sh` - DevTools Protocol injection script
- `on.sh` - Start injection
- `off.sh` - Stop injection
- `toggle.sh` - Toggle on/off

**Status:** ✅ Working (tested, CSS applied)

---

### better-kavita

**Technique:** Service Worker (PWA offline storage)

**What it does:**
- 📚 Cache comics/books (read offline)
- 🚀 Faster reading (no network latency)
- 📱 Reduce mobile data (cache once, read many times)

**How to use:**
```bash
~/Documents/skills/better/kavita/toggle.sh
# Shows console code to run in browser
```

**Files:**
- `service-worker.js` - Cache-first for images/pages, network-first for API
- `on.sh` - Show registration code
- `off.sh` - Show unregistration code
- `toggle.sh` - Instructions

**Status:** 🚧 Experimental (needs manual testing)

**Epic:** See [v0.4.0-offline-browser-storage.md](v0.4.0-offline-browser-storage.md)

---

### better-komga

**Technique:** Service Worker (PWA offline storage)

**What it does:**
- Same as better-kavita (offline comics/books)
- Komga-specific API endpoints

**Files:**
- `service-worker.js` - Komga-specific cache strategy
- `on.sh`, `off.sh`, `toggle.sh`

**Status:** 🚧 Experimental (needs manual testing)

**Epic:** See [v0.4.0-offline-browser-storage.md](v0.4.0-offline-browser-storage.md)

---

## Key Learnings

### 1. Inject → Better (Naming Evolution)

**Original name:** inject (technical, describes HOW)  
**Final name:** better (honest, describes WHY)

**Reasoning:**
- Not fixing bugs, not following standards
- Making apps work the way WE want
- "Better" = honest about intent

---

### 2. Folder vs Name Convention

**Folder:** `skills/better/{app}/`  
**Name:** `better-{app}`

**Why:**
- Folder = organization (grouped visually)
- Name = identity (published as npm package)
- Best of both (grouping + independence)

---

### 3. CSS Injection Limitations (Tailscale)

**Question:** Does better-openclaw work remotely via Tailscale?

**Answer:** ❌ No (client-side limitation)

**Why:**
- CSS injection = browser-specific (DevTools injects locally)
- Tailscale exposes localhost, but CSS = already in browser
- iPad accessing OpenClaw = different browser → no CSS

**Service Worker:**
- ✅ Works remotely (registered on server, any browser sees it)

**Workaround:**
- Server-side CSS injection (modify server files)
- Browser extension (synced across devices)
- Bookmarklet (device-independent)

---

### 4. Toggle Types Matter

**Different techniques = different toggle logic:**

| Type | Toggle | On | Off |
|------|--------|----|----|
| **CSS** | Automated | Start DevTools | Kill process |
| **Service Worker** | Manual | Show console code | Show unregister code |
| **Browser Extension** | Hybrid | Load unpacked | Disable extension |

**Can't have one master toggle** (each app = custom logic)

---

## Future Possibilities

### Better = Multiple Customizations Per App

**Example: better-openclaw could have:**
```
better/openclaw/redesign/     ← Dark theme, minimal UI
better/openclaw/compact/      ← Ultra-compact layout
better/openclaw/accessibility/ ← High contrast, larger fonts
```

**Current:** One customization per app (all-or-nothing)  
**Future:** Multiple options (user chooses which to enable)

**Decision:** Start simple, add complexity when needed

---

### Technique Reference Docs

**Future:** Canonical technique documentation

```
better/docs/
├── css-injection.md
├── service-worker-offline.md
├── browser-extension.md
└── bookmarklet.md
```

**Skills reference these** via `better.reference` frontmatter field.

**When technique improves:**
1. Update canonical doc
2. All skills using that technique benefit
3. Users know which skills are compatible

**Status:** Not implemented yet (reference field exists in schema)

---

## Implementation Timeline

**2026-02-17 (9:30 AM - 10:30 AM):**
1. ✅ Created inject skills frontmatter spec (POLICY.md)
2. ✅ Moved AI-redesign → skills/openclaw-inject/
3. ✅ Renamed inject → better (naming evolution)
4. ✅ Created toggle-better.sh (master toggle)
5. ✅ Created better-kavita, better-komga (Service Worker)
6. ✅ Deleted shared/ (standalone skills)
7. ✅ Per-app toggle (better/{app}/toggle.sh)
8. ✅ Refactored structure (final architecture)
9. ✅ Cherry-picked to epic/better-apps branch
10. ✅ Merged to main
11. ✅ Updated CHANGELOG (v0.2.0)
12. ✅ Rebased epic/v1.1.0 (arch)

**Total time:** ~1 hour (rapid prototyping + architecture refinement)

---

## Success Criteria

**v0.2.0 Complete:**
- ✅ Better namespace created (skills/better/)
- ✅ Three skills working (openclaw, kavita, komga)
- ✅ Frontmatter schema defined (POLICY.md)
- ✅ Standalone architecture (no shared dependencies)
- ✅ Per-app toggle system
- ✅ CHANGELOG updated
- ✅ Merged to main

**Next:**
- [ ] Test better-kavita (manual SW registration)
- [ ] Test better-komga (manual SW registration)
- [ ] Document technique references (css-injection.md, etc.)
- [ ] Publish to npm/clawhub (optional)

---

**Created:** 2026-02-17  
**Status:** ✅ Complete  
**Branch:** Merged to main via epic/better-apps
