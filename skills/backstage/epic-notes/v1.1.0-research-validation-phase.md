# Arch Session - 2026-02-11

## arch: Add Research/Validation Phase (Phase 3.5)

**Problem:** Diagram approval without testing against knowledge = blind spots, missed best practices, expensive mistakes in production.

**Solution:** Mandatory research/validation BEFORE turning everything yellow.

**New Phase 3.5 (between "Discuss" and "Approve"):**
1. AI identifies what needs validation
2. Query knowledge bases (librarian for books, web for docs, etc.)
3. Findings → New red notes (discovered issues)
4. Discuss new findings → Iterate
5. Only approve when BOTH resolved + validated

**Flow update:**
```
Gray (structure) 
  → Red (notes) 
  → Discuss 
  → Research/Validate → New Reds (back to discuss)
  → Approve (all yellow + validated)
  → Execute (yellow → blue)
```

**Rule 4 added:** Research before approval = MANDATORY (unless user explicitly skips)

**Why this matters:**
- Diagrams = blueprints (wrong blueprint = expensive execution)
- Bodies of knowledge (books, docs, standards) contain wisdom not in context window
- Validation surfaces blind spots (issues we didn't think to ask)
- Cheaper to iterate on diagram than on code

**Example use case:**
- Decided on JWT auth → Research OWASP best practices → Discovered need for refresh tokens → Added new component → Validated again → Approved

**Integration:**
- Research is format-agnostic (books via librarian, docs via web, principles via VISION.md)
- Discovery cycle prevents premature approval
- User can skip explicitly for prototypes (documented in notes)

---

**Status:** SKILL.md updated with Phase 3.5 + Rule 4 + Example updated

---

## arch: Contract-Seeking Protocol (CRITICAL)

**Problem:** AI moves forward with ambiguities → wastes time, breaks trust, produces wrong outputs.

**Solution:** MANDATORY contract validation before autonomous execution.

**Contract-Seeking Checklist:**
1. ✅ **Entendi tudo?** (zero ambiguidades?)
2. ✅ **Tenho ferramentas?** (posso executar sem supervisão?)
3. ✅ **Contrato claro?** (input/output/boundaries/blockers definidos?)

**If ANY = ❌ → STOP. Go RED. Explain why.**

**Rules:**
1. **Prefer PAUSE over DEVIATION** - Better to stop than improvise
2. **NEVER deviate from contract** - If reality ≠ contract, go RED and explain
3. **Exhaust doubts in planning** - Ask everything BEFORE execution
4. **Document blockers explicitly** - If stuck, explain what's missing
5. **Graph/diagram = contract** - Visual agreement is binding

**Contract Template:**
```markdown
## Contract: [Task Name]

**Goal:** [What to solve]
**Context:** [Why this matters]
**Inputs:** [What you give me]
**Outputs:** [What you expect at end]
**Boundaries:** [What I can/cannot decide alone]
**Blockers:** [What to do if stuck]
**Success criteria:** [How do I know I'm done?]
```

**When to use:**
- Before autonomous execution (overnight work, long tasks)
- When diagram approved (execution phase)
- When switching from discussion to implementation
- Anytime ambiguity detected

**Example (this session):**
- Nicholas: "Finish arch exercise while I sleep"
- Me: 🔴 STOP - Which arch problem? Where to save? What can I decide alone?
- Contract-seeking engaged → Avoided wasted work

**Why this matters:**
- **Triple metabolic cost** when wrong (work + explain + fix)
- **Trust erosion** when AI improvises
- **Stabilization goal** requires predictability
- **Diagram contracts** prevent scope creep

**Integration with arch skill:**
- Before turning yellow → validate contract
- Before execution (yellow → blue) → confirm boundaries
- If reality ≠ diagram during execution → 🔴 STOP, report discrepancy

---

**Status:** Contract-seeking protocol documented, to be added to SKILL.md

---

## arch: Librarian Skill Protocol - Execution Prep (2026-02-11 Evening)

**Contract finalized. Ready for autonomous execution.**

### Domain Assignment (Sandwich Architecture)

**Flow:** 🎤 Skill → 👷 Sh → ⚙️ Py → 👷 Sh → 🎤 Skill

**Nodes mapped:**
- **TRIGGER** = 🎤 Skill (conversational entry)
- **METADATA** = 👷 Sh (load files)
- **CHECK** = 👷 Sh (file exists?)
- **INFER** = 🎤 Skill (confidence >75%, conversational)
- **CLARIFY** = 🎤 Skill (ask again)
- **BUILD** = 👷 Sh (construct command syntax)
- **CHECK_SYSTEM** = ⚙️ Py (engine health)
- **EXEC** = ⚙️ Py (run research.py)
- **JSON** = ⚙️ Py (return results)
- **CHECK_RESULTS** = 👷 Sh (results exist?)
- **FORMAT** = 🎤 Skill (natural language output)
- **ERROR/BROKEN/EMPTY** = 🎤 Skill (user messaging, 🤚 talk to the hand)

### What I Need to Execute (Gaps to Fill)

**1. Sh Script Specs:**
- METADATA: Which files? Path? Format?
- BUILD: Exact command template? Escaping rules?
- CHECK_RESULTS: JSON structure? Empty = null or []?

**2. Py Engine Specs:**
- CHECK_SYSTEM: How to validate? Import test? File exists?
- EXEC: research.py exact invocation? Flags? Working dir?
- JSON: Output format? Keys expected?

**3. Skill Prompts:**
- INFER: Confidence calculation? Pattern matching keywords?
- FORMAT: Citation format? Emoji placement?
- Error messages: Exact wording for 🤚 nodes?

**4. Edge Cases (Italics):**
- Error handling epic (future) = more granular
- Por ora: quebrou = 🤚 talk to the hand
- User messaging = conversational, honest failure

### Color System During Execution

- 🔵 **Blue** = node executed, works
- 🟠 **Orange** = executed but made decisions (need discussion)
- 🔴 **Red** = paralyzed, can't proceed (document why)

**Morning review:**
- All blue = test
- Blue + orange = test, discuss, refine
- Blue + red (+ yellow on blocked nodes) = failed, read notes, refine diagram

### Execution Plan

**Phase 1 - Diagram Update:**
1. Add emoji legend
2. Add sandwich model explanation
3. Mark each node with domain emoji

**Phase 2 - Implementation:**
1. Start with 🔵 obvious nodes (TRIGGER, CLARIFY, FORMAT)
2. 🟠 nodes with decisions (INFER confidence threshold?)
3. 🔴 nodes with blockers (document specs needed)

**Phase 3 - Documentation:**
1. Update arch-session with findings
2. Color-code diagram
3. Note decisions/blockers for morning review

**Not changing diagram structure - only adding (emojis, colors, notes).**

---

**Status:** Paused until Nicholas sleeps. Ready to execute autonomously.
