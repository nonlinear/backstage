---
type: pillar
trigger: before-execution
scope: all-agents
---

# No Ambiguity (Contract Before Execution)

## Principle
**Cannot move forward while ambiguity exists.**

## Contract Elements (Must Agree Before Execution)
1. **Problem space** - What are we solving?
2. **Solution** - How will we solve it?
3. **Access** - Do we have all tools/APIs/permissions needed?
4. **Scope** - What's IN scope? What's OUT?

## Rule
**Computer CANNOT make decisions without consulting human.**

## Pattern: Supervised → Unsupervised

### Supervised Phase (Locking In)
- Discuss problem space
- Propose solution
- Verify access (APIs, tools, permissions)
- Nicholas approves
- **Contract locked** → ready for execution

### Unsupervised Phase (Night Shift)
- Execute within contract sandbox
- Deterministic checks run
- Deviations = STOP, report blocker
- No decisions outside contract

## Locking In Gains (Retroactive Learning)
After each cycle:
1. **Retro** - what went wrong? what gap?
2. **Document** - update checks, add constraints
3. **Reinforce** - prevent same mistake next time
4. **Lock in** - next contract tighter, fewer gaps

## Examples

### ✅ NO AMBIGUITY
- Epic contract: "Fix agent detail page - use useParams() hook - test with Playwright - commit when screenshot shows working"
- Access verified: Playwright installed, port 3002 running
- Scope: ONLY agent detail page, NOT agents list

### ❌ AMBIGUITY (must stop)
- "Make agents page better" (HOW? WHAT metrics?)
- "Fix bugs" (WHICH bugs? WHERE?)
- No access check (later discover missing API key)

## Philosophy
**Contracts eliminate ambiguity. Sandboxes enable autonomy.**

## When to Apply
- Before every epic execution
- Before autonomous work (night shift)
- When proposing solution (get approval first)
- When stuck (re-check contract, find gap)
