# Epic: Definition of Project

**Status:** 📋 Planned  
**Version:** TBD  
**Created:** 2026-02-25  
**Priority:** Medium

---

## Problem

**Ambiguity about what belongs in which project.**

**Current state:**
- `~/Documents/backstage/` = backstage protocol development (meta-tool)
- `~/Documents/skills/` = skill development (uses backstage)
- `~/Documents/personal/backstage/` = personal life project (uses backstage)
- `~/Documents/librarian/backstage/` = librarian project (uses backstage)

**Confusion:**
- Epics about backstage-skill coordination → skills or backstage?
- Epics about onboarding workflow → backstage or skills?
- "Companion skills" = affects both projects

**Example (2026-02-25):**
- `dealing-with-companion-skills.md` lives in skills/backstage/
- **Affects backstage protocol** (symlinks, versioning, compatibility)
- **But NOT backstage protocol itself** (about coordination)

---

## Goal

**Clear definition of project scope.**

**What belongs in each project:**

### ~/Documents/backstage/ (Backstage Protocol)
**Scope:** The protocol itself, checks, global policies, meta-workflow

**Belongs here:**
- ✅ New checks (global or local templates)
- ✅ Protocol improvements (ROADMAP format, CHANGELOG semantics)
- ✅ Core scripts (backstage.sh, checks.sh, parse-roadmap.sh)
- ✅ Documentation (README, templates, examples)
- ✅ Global policies (branch workflow, commit style, epic format)

**Does NOT belong:**
- ❌ Specific skills (those go in ~/Documents/skills/)
- ❌ Usage of backstage in other projects (those go in their own backstage/)
- ❌ Coordination between projects (gray area, see below)

### ~/Documents/skills/ (Skill Development)
**Scope:** Individual OpenClaw skills (backstage-skill, librarian, etc.)

**Belongs here:**
- ✅ Skill implementations (SKILL.md, scripts, assets)
- ✅ Skill-specific epics (onboarding, companion coordination)
- ✅ Cross-skill integration (how skills work together)
- ✅ Backstage-skill development (uses backstage protocol)

**Does NOT belong:**
- ❌ Backstage protocol changes (those go in ~/Documents/backstage/)
- ❌ Personal/life projects (those go in ~/Documents/personal/)

### Gray Area: Coordination Epics
**Examples:**
- `dealing-with-companion-skills.md` (skills uses backstage)
- `onboarding.md` (backstage-skill first-run UX)

**Current decision:** Keep in skills project (affects usage, not protocol)

**Future:** May need "integration/" folder for cross-project concerns?

---

## Solution (Draft)

### Option 1: Strict Boundaries
**Rule:** If epic changes protocol code → backstage. If epic changes skill code → skills.

**Pros:** Clear, no ambiguity  
**Cons:** Coordination epics still unclear

### Option 2: README Declaration
**Each project's README declares:**
```markdown
## Scope

**This project covers:**
- [x] Item 1
- [x] Item 2

**This project does NOT cover:**
- [ ] Item A (see ~/Documents/other-project/)
- [ ] Item B (see ~/Documents/another/)
```

**Pros:** Explicit, self-documenting  
**Cons:** Maintenance overhead, still subjective

### Option 3: Tag System
**Epic frontmatter includes tags:**
```yaml
scope: backstage-protocol
affects: [skills, personal]
```

**Pros:** Flexible, machine-readable  
**Cons:** Adds complexity, AI must parse/respect

### Option 4: "When in Doubt, Ask"
**Rule:** If unclear where epic belongs → ask Nicholas before creating.

**Pros:** Simple, defers to human judgment  
**Cons:** Interrupts flow, not scalable

---

## Open Questions

- [ ] Should coordination epics live in BOTH projects? (symlink? duplicate?)
- [ ] What about global/ folder? (currently symlinked from backstage → skills)
- [ ] How to handle breaking changes across projects? (versioning strategy)
- [ ] Is "gray area" a feature or a bug? (maybe embrace ambiguity?)

---

## Next Steps

1. **Short-term:** Document current practice (what actually happens)
2. **Medium-term:** Add scope declaration to each project's README
3. **Long-term:** Formalize with checks or tags (if needed)

---

## Notes

**Not about perfection.** Projects overlap, that's fine. Goal is reducing confusion, not eliminating it.

**Scalability concern:** As more projects use backstage, how to avoid epic sprawl? (future problem)

---

## References

- Skills project: `~/Documents/skills/`
- Backstage protocol: `~/Documents/backstage/`
- Personal life: `~/Documents/personal/backstage/`
- Librarian: `~/Documents/librarian/backstage/`
