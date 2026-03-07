# Website Epic - Tasks & Structure

**Based on:** Desktop conversation (website.md)

**Created:** 2026-03-06

---

## Epic Hierarchy

### 🏴 v0.3.0 - Website (Current Epic - NOW)

**Flagship status**

**Core philosophy:**
- Gestalt (visual hierarchy communicates structure)
- Wayfinding (user always knows where they are)
- Dry/Sprezzatura (effortless elegance, minimal gestures)
- Just-in-time (features appear when needed, not before)

**Tiers for products:**
1. **Flagship** - Maximum attention (site itself, agregore, backstage)
2. **Experiments** - Take at your own risk (documented but unstable)
3. **Ideas** - Backstage only (not yet surfaced)

---

## NOW Tasks (v0.3.0)

### 1. Hugo Foundation
- [ ] Install Hugo locally
- [ ] Choose base theme (or start with blank)
- [ ] Configure `config.toml` for multi-language support (en/pt/es structure)
- [ ] Set up deployment (GitHub Pages / Netlify)
- [ ] Create folder structure for projects, tiers, docs

**Success criteria:**
- `hugo server` runs locally
- Build generates static site
- Deployment automated

---

### 2. Typography System
- [ ] Choose serif typeface (flagship products)
- [ ] Define type hierarchy: Title, Body, Copy, Blockquote (pullquote/"olho")
- [ ] Configure font loading (self-hosted vs CDN)
- [ ] Test readability across devices

**Success criteria:**
- 4 distinct type styles defined
- Consistent across pages
- Fast loading

---

### 3. Microanimations (Gestalt)
- [ ] Page transitions (Barba.js or similar)
- [ ] Hover states (subtle scale, color shift)
- [ ] Click confirmations (tactile feedback)
- [ ] Scroll-based reveals (content appears on scroll)
- [ ] Inter-page transitions preserve wayfinding (breadcrumb stays visible)

**Success criteria:**
- Transitions feel effortless
- User always knows where they are
- No jarring reloads

---

### 4. Wayfinding System
- [ ] Breadcrumb navigation (always visible during transitions)
- [ ] Product tier visual distinction (flagship vs experiments vs ideas)
- [ ] URL structure reflects hierarchy (`/project/product-name/`)
- [ ] Permalink system (shareable, trackable)

**Success criteria:**
- User never feels lost
- Tier status immediately clear
- Links are stable and shareable

---

### 5. Product Presentation (Tiers)
- [ ] Flagship template (maximum detail, branding, custom assets)
- [ ] Experiments template (disclaimer, basic docs, "take at own risk")
- [ ] Ideas template (minimal, backstage-only visibility)
- [ ] Visual gestalt for each tier (e.g., flagship = full color, experiments = muted, ideas = grayscale)

**Success criteria:**
- Tier status visually obvious
- User understands stability level at a glance

---

### 6. Call to Action (Per Product)
- [ ] Define CTAs per tier:
  - Flagship: "Use", "Contribute", "Translate"
  - Experiments: "Test", "Give Feedback"
  - Ideas: "Follow Progress"
- [ ] Form integration (contact, volunteer signup)
- [ ] Funnel tracking (where did link come from, where does it go)
- [ ] Context-aware CTAs (changes as product matures)

**Success criteria:**
- CTA matches product maturity
- Clear next steps for user
- Tracking feeds back to backstage

---

### 7. Flagship Products (Initial Content)
- [ ] Site itself (document process: microanimations, typography, wayfinding)
- [ ] Agregore (explain collaboration, what was built)
- [ ] Backstage (meta: how we organize, tier system, epic workflow)

**Success criteria:**
- 3 flagship products documented
- Process transparently shown
- Reflects Nonlinear Studio quality standard

---

### 8. Branding (Studio-Level)
- [ ] Nonlinear Studio visual identity (logo, colors, typography)
- [ ] Favicon
- [ ] Social media cards (Open Graph previews)
- [ ] Flagship products inherit studio branding (tier 1-2 use default fonts/colors)

**Success criteria:**
- Studio branding consistent across products
- Shareable links have good previews
- Branding = quality seal

---

## LATER Tasks (Future Epics)

### 🔮 Translation & i18n (v0.4.0 or beyond)
- [ ] Language switcher (en/pt/es)
- [ ] URL structure per language (`/en/product/`, `/pt/produto/`)
- [ ] Cookie policy (just-in-time, only when needed for language preference)
- [ ] Smooth language transitions (Barba.js preserves scroll position)

**NOT NOW because:**
- Costly (requires translation per product)
- Tier 3+ feature
- MVP works with single language

---

### 🔮 Slides & Summarization (v0.5.0 or beyond)
- [ ] Markdown → Slides (reveal.js or similar)
- [ ] Summarization workflow (AI-assisted, manual review)
- [ ] Toggle button (article ↔ slides)
- [ ] Scroll position mapping (paragraph 5 → slide 3)
- [ ] QR code auto-generation for presentations

**NOT NOW because:**
- Requires summarization epic (costly, needs AI workflow)
- Tier 3+ feature
- Few products need it initially

---

### 🔮 Inter/Intra Document Navigation (v0.6.0 or beyond)
- [ ] Sticky sidebar (table of contents for long articles)
- [ ] Inter-document links (related products, topics)
- [ ] Responsive sidebar (desktop vs mobile)
- [ ] Threshold-based activation (only appears if article >X paragraphs)

**NOT NOW because:**
- No long documents yet
- Needs content volume first
- Nice-to-have, not critical

---

### 🔮 Vector Animations & Video (v0.7.0 or beyond)
- [ ] Vector animation system (same assets for video ads + site)
- [ ] Interactive backgrounds (per product)
- [ ] Vertical video generation (for ads)
- [ ] Animation timing sync with scroll/clicks

**NOT NOW because:**
- Requires design capacity
- Tier 3+ branding
- After MVP validation

---

## Design Principles (Reference)

### Gestalt
- **Proximity** - Related elements grouped visually
- **Similarity** - Similar items = similar visual treatment
- **Closure** - User fills in the gaps (implied structure)
- **Continuity** - Smooth transitions guide the eye
- **Figure/Ground** - Clear foreground/background distinction

### Wayfinding (Nielsen Norman Group)
- **Orientation** - Where am I?
- **Route decisions** - Where can I go?
- **Mental mapping** - How do I get back?
- **Closure** - Did I reach my goal?

### Sprezzatura (Italian Renaissance)
- **Effortless mastery** - Complex work appears simple
- **Studied carelessness** - Precision that looks casual
- **Grace under pressure** - No visible strain

---

## Epic Dependencies

```
v0.3.0 (NOW)
    ↓
v0.4.0 (Translation) - depends on flagship content stabilizing
    ↓
v0.5.0 (Slides) - depends on summarization workflow
    ↓
v0.6.0 (Navigation) - depends on content volume
    ↓
v0.7.0 (Animations) - depends on branding maturity
```

---

## MVP Scope (v0.3.0 ONLY)

**Include:**
- Hugo foundation
- Typography system
- Microanimations (gestalt)
- Wayfinding (breadcrumbs, tiers)
- Product presentation (3 tiers)
- Call to action (per tier)
- 3 flagship products
- Studio branding

**Exclude (future epics):**
- Translation (i18n)
- Slides
- Long document navigation
- Vector animations
- Video integration

---

**Philosophy:** Start minimal, grow maximal. Every feature earns its place.

**Next step:** Commit this as index.md update, begin Hugo setup.

---

**Last updated:** 2026-03-06
