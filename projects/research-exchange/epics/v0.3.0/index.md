# ReX Theme Layer

**Status:** Backlog (depends on v0.2.0 vanilla steps)

---

## Problem

Vanilla MUI steps exist (v0.2.0) but look generic. Need custom theme to transform them into recognizable ReX visual style.

**Why theming last:** Easier to theme existing structure than build themed from scratch.

---

## Scope

**In scope:**
- Extract design tokens from Figma (colors, fonts, spacing, border radii)
- Create `rexTheme.ts` (MUI theme customization)
- Override component defaults (Button, TextField, Card, etc.)
- Apply to all 15 steps
- Visual similarity verification (not pixel-perfect, but recognizable)

**Out of scope:**
- Pixel-perfect matching (too brittle)
- Responsive adjustments (v0.4.0)
- Animation/transitions (nice-to-have, not critical)

---

## MUI Theme Customization

**What theme controls:**

```typescript
// src/theme/rexTheme.ts
import { createTheme } from '@mui/material/styles';

export const rexTheme = createTheme({
  palette: {
    primary: { main: '#...' },      // ReX brand color
    secondary: { main: '#...' },
    background: { default: '#...' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", sans-serif',
    h1: { fontSize: '2rem', fontWeight: 600 },
  },
  spacing: 8,  // Base unit (8px grid)
  shape: {
    borderRadius: 4,  // Global border radius
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',  // No ALL CAPS
          borderRadius: '8px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});
```

**Applied in:**
```tsx
// src/main.tsx
import { ThemeProvider } from '@mui/material/styles';
import { rexTheme } from './theme/rexTheme';

<ThemeProvider theme={rexTheme}>
  <App />
</ThemeProvider>
```

---

## Design Token Extraction

**From Figma API:**

```bash
# Get styles (colors, text styles)
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/CmAtBaedooTgME20c0pE7s/styles"

# Get specific node styles
curl -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/CmAtBaedooTgME20c0pE7s/nodes?ids=594:31935"
```

**Manual extraction (fallback):**
- Open Figma, inspect components
- Document: color hex, font family/size/weight, spacing values
- Create token map: Figma name → MUI theme path

---

## Success Criteria

- [ ] Design tokens extracted and documented
- [ ] `rexTheme.ts` created and applied
- [ ] All 15 steps visually similar to Figma (not pixel-perfect)
- [ ] Component overrides documented (what each controls)
- [ ] Visual regression test passes (screenshot diff < 10% variation)

---

## Visual Similarity Threshold

**"Recognizable, not pixel-perfect"**

**Acceptable differences:**
- Font rendering (browser vs Figma)
- Icon variations (MUI icons vs custom)
- Subtle spacing differences (< 8px)

**Must match:**
- Color palette (exact hex values)
- Typography hierarchy (sizes, weights)
- Component structure (card layout, button placement)
- Overall "feel" (spacing rhythm, visual weight)

---

## Next Steps

1. Extract color palette from Figma (API or manual)
2. Extract typography specs (font stack, sizes, weights)
3. Create `rexTheme.ts` (start with palette + typography)
4. Apply to 1-2 steps (validate approach)
5. Extend to all components
6. Screenshot comparison (Figma vs implementation)
