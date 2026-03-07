# Epic Notes

> Version, name, status → see `epic.yaml`

---

# v0.3.0 - Website

**Goal:** Hugo-based website with product templates, branding, and CTAs

**Status:** Active  
**Flagship:** Yes (maximum attention)

---

## Philosophy

### Core Principles

**Gestalt** - Visual hierarchy communicates structure
- User understands wayfinding without reading
- Animations obey gestalt (title grows, others fade = entering subset)
- Tier status visually obvious (no ambiguity)

**Wayfinding** - User always knows where they are
- Breadcrumbs persist across page transitions
- URL structure reflects hierarchy
- Permalink stability (shareable, trackable)

**Sprezzatura** - Effortless elegance (Italian Renaissance)
- Minimal gestures convey maximum meaning
- Complex work appears simple
- DRY at user level (don't repeat yourself)

**Just-in-Time** (External + Internal)
- **External (UX):** Features appear when needed (cookie policy only when language changes)
- **Internal (Workflow):** Triggers detect thresholds → suggest epics (article >500 words → sumarização epic)

---

## Product Tiers

**1. Flagship** - Maximum attention
- Site itself (document process)
- Agregore (collaboration showcase)
- Backstage (meta: how we organize)
- Full branding, custom assets, detailed docs

**2. Experiments** - Take at your own risk
- Documented but unstable
- Basic docs, disclaimer visible
- Studio branding (no custom assets)

**3. Ideas** - Backstage only
- Not yet surfaced to public
- Minimal visibility
- Can be promoted to Experiments/Flagship later

---

## NOW Tasks (v0.3.0)

### 1. Hugo Foundation
- [ ] Install Hugo
- [ ] Base theme / blank start
- [ ] Multi-language structure (en/pt/es ready)
- [ ] Deployment pipeline (GitHub Pages / Netlify)
- [ ] Folder structure: projects, tiers, docs

**Success:** `hugo server` runs, build works, deployment automated

---

### 2. Typography System
- [ ] Serif typeface (flagship elegance)
- [ ] Type hierarchy: Title, Body, Copy, Blockquote ("olho")
- [ ] Font loading (self-hosted vs CDN)
- [ ] Cross-device readability

**Success:** 4 distinct styles, consistent, fast

---

### 3. Microanimations (Gestalt)
- [ ] Page transitions (Barba.js or similar)
- [ ] Hover states (subtle feedback)
- [ ] Click confirmations (tactile)
- [ ] Scroll reveals
- [ ] Wayfinding preserved during transitions

**Success:** Effortless feel, user never lost

---

### 4. Wayfinding System
- [ ] Breadcrumbs (always visible)
- [ ] Tier visual distinction (flagship vs experiments vs ideas)
- [ ] URL hierarchy (`/project/product-name/`)
- [ ] Permalinks (stable, shareable)

**Success:** User never feels lost, tier immediately clear

---

### 5. Product Presentation (Tiers)
- [ ] Flagship template (max detail)
- [ ] Experiments template (disclaimer visible)
- [ ] Ideas template (minimal)
- [ ] Visual gestalt per tier (color/opacity/layout)

**Success:** Tier status obvious at a glance

---

### 6. Call to Action (Per Product)
- [ ] Define CTAs per tier:
  - Flagship: "Use", "Contribute", "Translate"
  - Experiments: "Test", "Give Feedback"
  - Ideas: "Follow Progress"
- [ ] Form integration (contact, volunteer)
- [ ] Funnel tracking (backstage feeds)
- [ ] Context-aware (CTA evolves with product)

**Success:** CTA matches maturity, clear next step, tracking works

---

### 7. Flagship Products (Initial Content)
- [ ] Site itself (document microanimations, typography, wayfinding)
- [ ] Agregore (explain collaboration)
- [ ] Backstage (meta: tier system, epic workflow)

**Success:** 3 flagships documented, process transparent

---

### 8. Branding (Studio-Level)
- [ ] Visual identity (logo, colors, typography)
- [ ] Favicon
- [ ] Social cards (Open Graph)
- [ ] Default branding for tier 1-2 products

**Success:** Consistent studio identity, shareable previews work

---

## LATER (Future Epics)

### 🔮 v0.4.0 - Translation & i18n
**Trigger:** Tier 3 product needs internationalization
- Language switcher (en/pt/es)
- Cookie policy (just-in-time)
- URL structure per language
- Smooth transitions

**Why later:** Costly (translation per product), tier 3+ feature

---

### 🔮 v0.5.0 - Slides & Summarization
**Trigger:** Article >500 words needs presentation version
- Markdown → Slides (reveal.js)
- AI-assisted summarization (manual review)
- Toggle button (article ↔ slides)
- Scroll position mapping
- QR code auto-generation

**Why later:** Requires summarization workflow (AI + review), tier 3+ feature

---

### 🔮 v0.6.0 - Inter/Intra Navigation
**Trigger:** Product has >3 long articles
- Sticky sidebar (table of contents)
- Inter-document links
- Responsive (desktop/mobile)
- Threshold-based (only if article >X paragraphs)

**Why later:** Needs content volume first

---

### 🔮 v0.7.0 - Vector Animations & Video
**Trigger:** Flagship product needs custom branding
- Vector animation system (ads + site)
- Interactive backgrounds (per product)
- Vertical video generation
- Timing sync (scroll/click)

**Why later:** Requires design capacity, tier 3+ branding

---

## Epic Dependencies

```
v0.3.0 (NOW) - Website MVP
    ↓
v0.4.0 (Translation) - when flagship content stable
    ↓
v0.5.0 (Slides) - when long articles exist
    ↓
v0.6.0 (Navigation) - when content volume grows
    ↓
v0.7.0 (Animations) - when branding matures
```

---

## Just-in-Time Triggers (Internal Workflow)

**Examples:**
- Article >500 words → Suggest summarization epic
- Product promoted to Tier 3 → Suggest translation epic
- 3+ articles per product → Suggest navigation epic
- Flagship product mature → Suggest custom branding epic

**Philosophy:** System detects thresholds, proposes epics. Nicholas approves. Epic created.

---

## MVP Scope (v0.3.0 ONLY)

**Include:**
- Hugo foundation
- Typography
- Microanimations
- Wayfinding
- Product tiers (3)
- CTAs (per tier)
- 3 flagship products
- Studio branding

**Exclude (future):**
- Translation
- Slides
- Long navigation
- Vector animations

---

## Stakeholders

- **Design** - Typography, microanimations, visual tier distinction
- **Development** - Hugo setup, Barba.js, deployment
- **Marketing** - CTAs, funnel tracking, flagship narratives
- **UX Copy** - Microcopy, tier descriptions, CTAs

---

## Deliverable

Live website at custom domain:
- 3 flagship products showcased
- Tier system visually clear
- Wayfinding pristine
- CTAs context-aware
- Studio branding = quality seal

---

**Last updated:** 2026-03-07  
**Philosophy:** Start minimal, grow maximal. Every feature earns its place.
