# Epic Notes

> Version, name, status → see `epic.yaml`

---

# v1.8.0 - Rebranding Menu

## Context Snapshot
- **Why this exists:** GitHub README navigation needs visual refresh, want custom SVG menu/banner
- **Problem solved:** Understand GitHub SVG sanitization rules before designing menu
- **Date:** 2026-02-14
- **Assumptions:** Skills README gets custom menu, follows GitHub markdown rendering rules


## Research Summary (2026-02-14)

### GitHub README SVG Rules

**Sanitizer:** cmark-gfm + custom HTML/SVG filter

**Allowed Elements:**
- ✅ Static SVG (shapes, paths, text)
- ✅ Inline CSS (styles within `<style>` or `style=""`)
- ✅ Links (`<a xlink:href="URL">`)
- ✅ SMIL animations (`<animate>`, `<animateTransform>`)
- ✅ Data URI images (`<image xlink:href="data:image/png;base64,...">`)
- ✅ Gradients, filters (SVG native effects)

**Blocked Elements:**
- ❌ JavaScript (`<script>`)
- ❌ External resources (`<image xlink:href="http://...">`)
- ❌ Event handlers (`onclick`, `onload`, `onmouseover`)
- ❌ `<foreignObject>` with HTML
- ❌ `<iframe>`, `<object>`, `<embed>`

**Best Practices:**
- **Inline all resources** (base64 encode images, no external URLs)
- **Use SMIL for animations** (CSS animations may not work)
- **Test in GitHub preview** (sanitizer strips blocked elements silently)
- **Keep SVG simple** (complex animations may lag on mobile)


## Design Concepts

### Option 1: Navigation Menu Bar
**Layout:** Horizontal menu with skill categories

```
┌─────────────────────────────────────────────────┐
│  🏴 Skills                                       │
│  ┌────────┬────────┬────────┬────────┬────────┐ │
│  │ Design │ System │ I Ching│ Books  │ Notify │ │
│  └────────┴────────┴────────┴────────┴────────┘ │
└─────────────────────────────────────────────────┘
```

**Features:**
- Clickable categories (links to sections)
- Hover effects (SMIL animations)
- Icon + label for each skill

**Implementation:**
```svg
<svg width="600" height="80">
  <a xlink:href="#arch">
    <rect x="10" y="20" width="100" height="40" fill="#333">
      <animate attributeName="fill" from="#333" to="#555" begin="mouseover" end="mouseout" dur="0.3s" />
    </rect>
    <text x="60" y="45" text-anchor="middle" fill="white">Design</text>
  </a>
  <!-- Repeat for other skills -->
</svg>
```


### Option 2: Hero Banner
**Layout:** Full-width banner with branding + navigation

```
┌───────────────────────────────────────────────────┐
│                                                   │
│          🏴 OpenClaw Skills                       │
│          Agent tooling for the ungovernable       │
│                                                   │
│  [Design] [System] [I Ching] [Books] [Notify]    │
│                                                   │
└───────────────────────────────────────────────────┘
```

**Features:**
- Tagline + branding
- Navigation links below
- Animated flag emoji (SMIL)

**Implementation:**
```svg
<svg width="800" height="200">
  <!-- Background -->
  <rect width="800" height="200" fill="#1a1a1a"/>
  
  <!-- Title -->
  <text x="400" y="80" text-anchor="middle" font-size="32" fill="white">
    🏴 OpenClaw Skills
  </text>
  
  <!-- Tagline -->
  <text x="400" y="110" text-anchor="middle" font-size="16" fill="#aaa">
    Agent tooling for the ungovernable
  </text>
  
  <!-- Navigation links -->
  <a xlink:href="#arch">
    <text x="200" y="150" fill="#0af">Design</text>
  </a>
  <!-- Repeat for other skills -->
</svg>
```


### Option 3: Card Grid
**Layout:** Skill cards in grid

```
┌──────────┬──────────┬──────────┐
│  Design  │  System  │ I Ching  │
│  arch    │detective │ oracle   │
└──────────┴──────────┴──────────┘
┌──────────┬──────────┬──────────┐
│  Books   │  Notify  │  More    │
│  search  │  alerts  │  soon    │
└──────────┴──────────┴──────────┘
```

**Features:**
- Card per skill (icon + name + description)
- Hover effects (scale, glow)
- Grid layout (responsive)

**Implementation:**
```svg
<svg width="600" height="400">
  <!-- Card 1 -->
  <a xlink:href="#arch">
    <rect x="10" y="10" width="180" height="180" fill="#222" rx="8">
      <animate attributeName="transform" from="scale(1)" to="scale(1.05)" begin="mouseover" end="mouseout" dur="0.2s" />
    </rect>
    <text x="100" y="100" text-anchor="middle" font-size="48">🎨</text>
    <text x="100" y="130" text-anchor="middle" fill="white">Design</text>
    <text x="100" y="150" text-anchor="middle" fill="#aaa" font-size="12">arch</text>
  </a>
  <!-- Repeat for other skills -->
</svg>
```


## SMIL Animation Examples

### Hover Effect (Fill Color)
```svg
<rect x="10" y="10" width="100" height="40" fill="#333">
  <animate 
    attributeName="fill" 
    from="#333" 
    to="#555" 
    begin="mouseover" 
    end="mouseout" 
    dur="0.3s" 
  />
</rect>
```

### Loading Spinner
```svg
<circle cx="50" cy="50" r="40" stroke="#0af" stroke-width="4" fill="none">
  <animateTransform
    attributeName="transform"
    type="rotate"
    from="0 50 50"
    to="360 50 50"
    dur="1s"
    repeatCount="indefinite"
  />
</circle>
```

### Fade In
```svg
<text x="100" y="50" fill="white" opacity="0">
  OpenClaw Skills
  <animate 
    attributeName="opacity" 
    from="0" 
    to="1" 
    dur="1s" 
    fill="freeze" 
  />
</text>
```


## Data URI Images (Inline Base64)

**Convert image to base64:**
```bash
# macOS
base64 -i icon.png -o icon.txt

# Linux
base64 icon.png > icon.txt
```

**Embed in SVG:**
```svg
<image 
  x="10" 
  y="10" 
  width="100" 
  height="100" 
  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..." 
/>
```

**Why:** GitHub blocks external URLs (`http://...`), must inline all resources.


## Testing Process

### 1. Local Preview
- Save SVG to file: `menu.svg`
- Open in browser: `file:///path/to/menu.svg`
- Test animations (hover, click)

### 2. GitHub Preview
- Create test repo or branch
- Add SVG to README.md:
  ```markdown
  ![Menu](menu.svg)
  ```
- Push to GitHub
- View README (animations should work)

### 3. Sanitizer Check
- If elements missing → blocked by sanitizer
- Check GitHub's allowed list (no `<script>`, no external URLs)
- Rewrite using SMIL instead of CSS/JavaScript


## Implementation Plan

### Phase 1: Design
- [ ] Choose layout (menu bar, hero banner, or card grid)
- [ ] Sketch design (colors, spacing, typography)
- [ ] Select icons (emoji or inline SVG shapes)

### Phase 2: Build SVG
- [ ] Create base SVG (static elements)
- [ ] Add links (`<a xlink:href="...">`)
- [ ] Inline images (base64 encode if needed)
- [ ] Test in browser (local preview)

### Phase 3: Add Animations
- [ ] Hover effects (fill, scale, opacity)
- [ ] Loading states (spinners, fade-ins)
- [ ] Use SMIL (`<animate>`, `<animateTransform>`)
- [ ] Test performance (smooth on mobile?)

### Phase 4: GitHub Integration
- [ ] Add SVG to skills README
- [ ] Push to GitHub
- [ ] Verify rendering (no blocked elements)
- [ ] Test links (navigate to sections)

### Phase 5: Documentation
- [ ] Document SVG best practices (inline resources, SMIL animations)
- [ ] Add to backstage POLICY (menu design guidelines)
- [ ] Create template (reusable for other projects)


## SVG Best Practices (GitHub)

### ✅ DO:
- Inline all resources (base64 images, embedded fonts)
- Use SMIL for animations (`<animate>`, `<animateTransform>`)
- Keep SVG simple (complex animations lag on mobile)
- Test in GitHub preview (sanitizer may strip elements)
- Use `<a xlink:href="...">` for links (not `<a href="...">`)

### ❌ DON'T:
- Use JavaScript (`<script>`) - blocked by sanitizer
- Link external resources (`http://...`) - blocked
- Use event handlers (`onclick`) - blocked
- Embed HTML in `<foreignObject>` - blocked
- Use `<iframe>`, `<object>`, `<embed>` - blocked

### 🧪 Test:
- Local browser (file:// URL)
- GitHub preview (push to repo, view README)
- Mobile (animations smooth? readable?)


## Open Questions

1. **Layout choice:** Menu bar, hero banner, or card grid?
   - Menu bar = compact, navigation-focused
   - Hero banner = branding + navigation
   - Card grid = skill discovery, visual

2. **Icons:** Emoji or custom SVG?
   - Emoji = simple, consistent across platforms
   - SVG = custom design, more control

3. **Animations:** Subtle or bold?
   - Subtle = hover effects, fade-ins
   - Bold = spinners, transitions, interactive

4. **Links:** Section anchors or external URLs?
   - Section anchors = navigate within README
   - External URLs = link to skill docs, GitHub repos


## Success Criteria

- ✅ SVG menu renders correctly on GitHub
- ✅ Animations work (SMIL-based, no JavaScript)
- ✅ No blocked elements (passes sanitizer)
- ✅ Links functional (`<a xlink:href>`)
- ✅ Documented best practices (for future updates)
- ✅ Template created (reusable for other projects)


## Related Epics
- v0.1.0 - Skill Reordering (formatting protocol)
- v2.1.0 - use-for (companion skill protocol)


**Next:** Choose layout (menu bar, hero banner, or card grid), sketch design
