# v1.1.0 - Contract Diagram Adoption

**Status:** 📋 Planned  
**Created:** 2026-02-25  
**Priority:** High (trust maintenance)

---

## Problem

**SKILL.md is too verbose:**
- 3+ mermaid diagrams (polycentric governance, enforcement, workflow)
- Long explanatory sections (mermaid generation, policies)
- Hard to scan, cognitive overload
- No visual contract (changes happen without pre-approval)

**Contract discipline missing:**
- Changes implemented directly in SKILL.md
- No frozen spec to refer back to
- User: "You agreed to X, why did you do Y?" → broken trust

---

## Goal

**Adopt contract diagram pattern for backstage skill:**
1. Create simple contract diagram (visual spec)
2. Simplify SKILL.md (remove verbose diagrams/sections)
3. Document "update backstage" flow in contract
4. Establish contract-first discipline

---

## Tasks

- [ ] **Simplify SKILL.md**
  - Remove: Polycentric governance diagram
  - Remove: Enforcement model diagram
  - Remove: Verbose mermaid generation section
  - Keep: 5 States table, trigger patterns, essential workflow notes
  - Result: Concise reference, not exhaustive spec

- [ ] **Contract diagram exercise**
  - Create contract diagram (mermaid in simple .md file)
  - Show 3 modes: Start, End, Update
  - High-level flow only (not every step)
  - User reviews/approves
  - Becomes frozen spec

- [ ] **Document "update" flow**
  - Show in contract diagram:
    - Trigger: "update backstage"
    - Flow: detect → compare → prompt → apply
    - Edge cases: symlinked, no changes, offline
  - Validate with user before finalizing

---

## Success Criteria

- ✅ SKILL.md reduced to <50% current size
- ✅ Contract diagram exists (approved by user)
- ✅ "Update backstage" flow documented in contract
- ✅ Future changes start with contract update (not SKILL.md)
- ✅ Trust maintained (no surprise changes)

---

## References

- `contract-diagram-discipline.md` (global check)
- Current SKILL.md: `~/Documents/backstage/skills/backstage/SKILL.md`
- Update script: `~/Documents/backstage/skills/backstage/update-backstage.sh`
