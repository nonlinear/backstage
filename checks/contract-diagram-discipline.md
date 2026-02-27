# Contract Diagram Discipline

**DESCRIPTION:** If contract diagram exists, changes start there (update contract → approval → implement)  
**TYPE:** interpretive  
**SCOPE:** global

**Applies to:** Projects with existing contract diagrams (optional pattern)

---

## Rule

**IF contract diagram exists for this epic/feature:**
1. **Never edit implementation without consent**
2. **Start changes in contract diagram** (update visual spec first)
3. **Get user approval** (confirm updated contract)
4. **THEN implement** (code, docs, scripts follow approved contract)

**IF no contract diagram exists:**
- Pattern is optional (not required)
- Proceed with normal workflow

---

## How to Detect Contract

**Contract diagram typically lives in:**
- `contract.html` (visualizer + embedded mermaid)
- `epic-notes/[epic-name]/contract.md` (standalone diagram)
- SKILL.md frontmatter: `contract: path/to/diagram.md`

**AI checks:**
```bash
# Look for contract files
find . -name "contract.html" -o -name "*contract*.md"

# Check SKILL.md frontmatter
grep "^contract:" SKILL.md
```

---

## Workflow (When Contract Exists)

### ❌ WRONG (Contract Violation)
```
User: "Add update backstage trigger"
AI: [edits SKILL.md directly, adds workflow]
```

**Why wrong:** Contract exists, implementation changed without updating contract first.

---

### ✅ CORRECT (Contract-First)
```
User: "Add update backstage trigger"
AI: "Contract diagram detected. Should I:
     1. Update contract with new trigger flow
     2. You approve updated contract
     3. THEN update SKILL.md implementation
     
     Or skip contract and edit directly?"
```

**If user says update contract:**
1. Edit contract diagram (add new flow)
2. Show user: "Here's updated contract [link/preview]"
3. Wait for approval
4. After approval: update implementation

**If user says skip contract:**
- Note: "Skipping contract update (user approved direct edit)"
- Proceed with implementation
- Contract now out of sync (user's choice)

---

## Suggestions (Not Requirements)

**AI may suggest creating contract when:**
- Complex epic with multiple phases
- User mentions "diagram" or "visual spec"
- Repeated back-and-forth on design decisions

**Suggestion format:**
```
"This epic seems complex. Want to create a contract diagram first?
 (Helps align on design before implementation)"
```

**User can always decline.** Contract is a tool, not a mandate.

---

## Why This Matters

**Contract = frozen spec:**
- Visual agreement between human and AI
- Pre-approval reduces rework
- Implementation follows agreed design

**Without contract discipline:**
- AI diverges from agreed design
- User: "You agreed to X, why did you do Y?"
- Broken trust, wasted cycles

**With contract discipline:**
- Changes start with visual update
- User approves before implementation
- Implementation matches agreement
- Trust maintained

---

## Edge Cases

**Contract exists but outdated:**
- AI should notice: "Contract diagram doesn't show [new feature]. Should I update it?"

**Multiple contracts (different epics):**
- Each epic can have its own contract
- Check relevant contract for current work

**Contract removed:**
- If user deletes contract → pattern no longer applies
- Proceed without contract discipline

---

## Enforcement

**Interpretive (AI reads, acts):**
- AI checks for contract existence before major changes
- AI suggests contract-first workflow
- AI does NOT block work (user can override)

**Not deterministic:**
- Can't be automated script (requires judgment)
- AI must interpret: "Is this change significant enough to update contract?"
- User has final say

---

## Examples

### Example 1: Adding New Trigger
**Scenario:** Backstage skill has contract.html, user wants "update backstage" trigger

**AI response:**
```
Contract diagram detected at skills/backstage/contract.html.

Should I update contract first? (Recommended workflow):
1. Add "Update" mode to contract diagram
2. You review/approve updated contract
3. Then I implement in SKILL.md + scripts

Or skip contract and implement directly?
```

### Example 2: Small Fix (No Contract Update Needed)
**Scenario:** Fix typo in SKILL.md, contract exists

**AI response:**
```
[Just fixes typo, no contract update needed]
```

**Reasoning:** Minor change, doesn't affect contract spec.

### Example 3: No Contract Exists
**Scenario:** User wants new feature, no contract diagram

**AI response:**
```
[Proceeds with implementation]

(Optional suggestion: "Want to create contract diagram for this? 
 Might help align on design.")
```

---

## Implementation Note

**This check is GUIDANCE for AI, not enforcement.**

- AI reads this, understands pattern
- AI suggests contract-first when appropriate
- User always has override authority
- No blocking behavior

**If user violates pattern:**
- AI may remind: "Contract exists, update it too?"
- User can say: "Skip contract, just implement"
- AI complies (user's choice)

---

**Created:** 2026-02-25  
**Reason:** Learned from backstage skill edits without contract update
