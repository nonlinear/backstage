# Component Inventory & MUI Mapping

**Status:** Intake (design-engineer + Nicholas)

---

## Problem

ReX submission system has 15 steps with modular, Lego-style components. Need to map each ReX component to best Material-UI equivalent before rebuilding.

**Why mapping first:** Validate MUI covers ReX needs, identify gaps early, avoid rework.

---

## Scope

**In scope:**
- Inventory all components from Figma (Steps canvas, 15 folders)
- Map to MUI components + variants
- Prototype 2-3 components (validate mapping works)
- Document decisions (why TextField vs Input, which Button variant, etc.)

**Out of scope:**
- Theming (v0.3.0)
- Full implementation (v0.2.0)
- Mobile variants (v0.4.0)

---

## Success Criteria

- [ ] Complete mapping doc (component → MUI equivalent)
- [ ] Gap analysis documented (what MUI doesn't cover)
- [ ] 2-3 prototype components deployed (GitHub Pages)
- [ ] Visual similarity threshold defined ("recognizable, not pixel-perfect")
- [ ] Mapping decisions documented (template for other components)

---

## Resources

**Figma:**
- File: `CmAtBaedooTgME20c0pE7s` (ReX Components)
- Node: Steps canvas (`594:31935`)
- API access: `~/Documents/personal/.env` (FIGMA_TOKEN)

**Reference:**
- 15 folders: `/Users/nonlinear/Documents/wiley/storybook/reference/ReX steps/`
- SVG exports (desktop/mobile, variations, error states)

**MUI:**
- Docs: https://mui.com/material-ui/
- Component API: https://mui.com/material-ui/api/

---

## Stakeholders

**Primary:**
- Nicholas (product owner, knows ReX inside-out)
- design-engineer (mapping work, prototypes)

**Future:**
- front-end-engineer (full implementation in v0.2.0)
- QA (visual regression testing)

---

## Next Steps

1. Extract component list from Figma (API or manual)
2. Create spreadsheet: ReX component | MUI component | Variant | Props | Notes
3. Prototype Button, TextField, Card (most common)
4. Deploy to GitHub Pages (validate permalinks work)
5. Document template for remaining components
