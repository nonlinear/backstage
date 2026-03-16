# Responsive (Mobile/Tablet)

**Status:** Backlog (depends on v0.3.0 themed desktop)

---

## Problem

Desktop ReX steps exist and look correct (v0.3.0). Now need mobile/tablet variants for real-world usage.

**Why last:** Desktop validates concept, mobile scales it. Easier to adapt working desktop than build responsive from scratch.

---

## Scope

**In scope:**
- Mobile (< 600px): stacked layout, collapsible nav, touch-friendly inputs
- Tablet (600-960px): hybrid layout (some desktop, some mobile patterns)
- Responsive theme adjustments (font sizes, spacing, component variants)

**Out of scope:**
- Landscape tablet (use desktop layout)
- Foldable devices (use nearest breakpoint)
- Print styles (not needed)

---

## Breakpoints

**MUI default:**
```typescript
// Already defined in MUI
xs: 0px      // Mobile
sm: 600px    // Tablet
md: 960px    // Desktop
lg: 1280px   // Large desktop
xl: 1920px   // Extra large
```

**ReX usage:**
- `xs` - Mobile (single column, collapsible nav)
- `sm` - Tablet (2-column where possible)
- `md+` - Desktop (current implementation)

---

## Mobile Patterns

**Navigation:**
- Desktop: sidebar always visible
- Mobile: hamburger menu (MUI Drawer)

**Forms:**
- Desktop: multi-column inputs
- Mobile: single-column, full-width

**Tables:**
- Desktop: full table
- Mobile: card-based list (MUI Card)

**Buttons:**
- Desktop: inline
- Mobile: fixed bottom bar (sticky actions)

---

## Responsive Theme Adjustments

```typescript
// src/theme/rexTheme.ts (additions)
export const rexTheme = createTheme({
  typography: {
    h1: {
      fontSize: '2rem',           // Desktop
      '@media (max-width:600px)': {
        fontSize: '1.5rem',       // Mobile
      },
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '16px',        // Desktop
          '@media (max-width:600px)': {
            padding: '8px',       // Mobile (tighter)
          },
        },
      },
    },
  },
});
```

---

## Success Criteria

- [ ] All 15 steps usable on mobile (iPhone 13 size)
- [ ] Navigation works on mobile (drawer/hamburger)
- [ ] Forms fully functional on touch devices
- [ ] Visual similarity maintained across breakpoints
- [ ] Tested on real devices (iOS + Android)
- [ ] GitHub Pages deployment works on mobile browsers

---

## Testing

**Devices:**
- iPhone 13/14 (375px wide)
- iPad (768px wide)
- Android phone (360px wide)

**Browsers:**
- Safari (iOS)
- Chrome (Android)
- Chrome DevTools (responsive mode)

**Checklist per step:**
- [ ] Text readable (font size appropriate)
- [ ] Touch targets ≥ 44px (WCAG 2.5.5)
- [ ] No horizontal scroll
- [ ] Forms submit correctly
- [ ] Navigation accessible

---

## Next Steps

1. Extract mobile layouts from Figma (reference SVGs exist)
2. Define breakpoint strategy (xs, sm, md)
3. Update theme with responsive overrides
4. Adapt navigation (Drawer for mobile)
5. Convert multi-column forms to single-column
6. Test on real devices
7. Deploy and verify on GitHub Pages
