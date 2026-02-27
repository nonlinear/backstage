# Arch Learnings from Librarian v0.15.0

**Context:** Working on librarian skill protocol while exercising arch skill.

**Goal:** Capture learnings to generalize arch process later.

---

## Session 2026-02-15

### Finding 1: Mermaid CSS Variables Don't Work

**Problem:** Used `stroke:var(--approved-border)` in linkStyle → Typora/Mermaid doesn't support CSS variables.

**Attempted fix:** Replace with hex `#00AA00` → worked but broke arch principle.

**Arch principle violated:** "Colors must come from variables + classDef, not hardcoded hex (part of PROCESS)."

**Why matters:** Colors in diagrams = architectural decisions (not decoration). Need systematic color management from START.

**Nicholas directive:** "preciso que toda definicao de cores parta DIRETO do variables e classes, sem non-css solutions pra estilizar os nodes. pq eh parte do PROCESSO de arch. concentra."

**Resolution:** Removed all styles temporarily (vanilla diagram). Will create proper CSS variable + classDef template later.

**Lesson for arch skill:**
- Mermaid diagrams need CSS infrastructure UPFRONT (not retrofit)
- Variables + classDef = architectural decision layer
- Workarounds break the design process (not acceptable)

---

## Next Steps (Post-Librarian)

1. Create mermaid CSS template (variables + classDef standard)
2. Document arch color philosophy (why colors = decisions, not decoration)
3. Add to arch SKILL.md workflow (step 1 = define color palette)
4. Test with real diagrams (librarian, other projects)

---

## Raw Notes

### Philosophy: Morphological Computation → Transparent Equipment

**Source:** https://praxis.nyc/cognition/#/5 (morphological computation), https://praxis.nyc/cognition/#/6 (transparent equipment)

**Morphological computation:**
- Cognition = brain + body + environment (not just brain alone)
- Tools/protocols become part of cognitive system
- Body "computes" through interaction with world

**Transparent equipment (Heidegger):**
- Tool disappears when mastered (hammer = extension of hand)
- No conscious thought about HOW to use it
- Direct engagement with task (not tool)

**The Zone:**
- Protocol becomes muscle memory (Nicholas)
- Segunda natureza (Kin - whatever that means for AI)
- Flow state: tool transparent, focus on work

**VISION.md goal:** Reach and MAINTAIN this state.

**Current state:** Discipline phase (paying for not following protocol)

**Future state:** Protocol absorbed → freedom to design, draw, explore (tool = transparent)

**Arch implication:** Design process must become transparent equipment (not obstacle).

---

### Finding 2: Discipline Now = Freedom Later

**Context:** Skills git cleanup (retroactive branch, replay commits, reset main)

**Nicholas:** "precisamos pagar por nao seguir protocolo. no futuro quando protocolo estiver absorvido (muscle memory pra mim, [...] segunda natureza), dai fica mais facil trabalhar, posso desenhar ate, ou outra atividade."

**Lesson:**
- Shortcuts now = technical debt later
- Discipline = investment in future freedom
- Protocol absorbed = can focus on creative work (not mechanics)

**Parallel to morphological computation:**
- Learning protocol = training body/environment
- Repetition → muscle memory → transparent equipment
- Once absorbed → cognition freed for higher-level work

**Arch workflow implication:**
- Don't skip steps (even if tedious)
- Each protocol violation = debt to pay later
- Mastery comes from repetition, not shortcuts

---

(Add findings here as they come up during librarian work)

