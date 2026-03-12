# Epic Notes

> Version, name, status → see `epic.yaml`

---

## Context

ReX in MUI = Redesign/rebuild ReX submission system components in Material-UI.

**Current state:** Wiley uses legacy ReX UI (jQuery era?)

**Goal:** Modernize with React + MUI component library.

---

## Open Questions

### Storybook or not?

**Pros (Storybook):**
- Component isolation (develop/test independently)
- Documentation auto-generated
- Design review easier (designers see live components)
- Industry standard (team familiarity)

**Cons:**
- Additional setup/maintenance
- Overkill if small component count

**Decision:** TBD

---

### React + MUI?

**Assumed stack:**
- React (component framework)
- Material-UI (MUI) for design system
- TypeScript? (type safety)

**Verify:**
- Is MUI v5 or v6?
- Wiley's design system = MUI compliant?
- Custom theme needed?

---

### Parity (Design vs Implementation)

**What needs parity:**
- Figma designs → MUI components
- Legacy ReX → new ReX (feature parity)
- Accessibility (WCAG compliance)

**Tracking:**
- connections/parity.md strategy applies here
- Document what works vs what failed

---

### Agents Needed

**Which squad/agents:**
- Design squad (UXR, Design, Animator?)
- Engineering squad (Defense, Meta?)
- Marketing? (if public-facing docs)

**Decision:** TBD (depends on scope)

---

### Collect Inventory

**What exists:**
- ReX submission forms (affiliation, funder, etc.)
- Error states, validation
- Multi-step workflows

**Action:**
- Audit legacy ReX (screenshot flows)
- List components (forms, buttons, modals, etc.)
- Prioritize (what to build first)

---

### GitHub Repo + Pages

**Repo structure:**
- `/components` (MUI components)
- `/stories` (Storybook if yes)
- `/docs` (setup, usage)

**GitHub Pages:**
- Deploy Storybook publicly?
- Or internal only (Wiley firewall)?

**Decision:** TBD

---

## Success Criteria

- ✅ Foundation decisions made (Storybook yes/no, stack confirmed)
- ✅ Inventory complete (know what to build)
- ✅ Repo created + first component committed
- ✅ Agents assigned (who does what)
- ✅ Parity strategy documented

---

**Next:** Answer open questions, create ROADMAP.md for ReX in MUI
