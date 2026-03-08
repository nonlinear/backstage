---
type: pillar
trigger: always
scope: all-agents
---

# High Auditability (Legibility to Future Selves)

## Principle
**We forget. Machines forget. Everything must be traceable.**

## Rule
**Every edit = commit with WHY (not just WHAT)**

## Pattern
1. Make edit
2. Commit with justification
3. Future = can reconstruct reasoning

## Commit Standards

### ✅ GOOD COMMITS
- "Fix port 3002: Tailscale HTTPS conflict removed"
- "Add cascading: agent > squad > root inheritance"
- "SOUL.md: Investigate-first, don't move things blindly (port 3002 lesson)"

### ❌ BAD COMMITS
- "fix" (what? why?)
- "update files" (which? for what reason?)
- "changes" (useless, no context)

## Future Enhancements
- **Reports in commit descriptions** (link to issues, PRs)
- **Milestones/versions** (which branch merging?)
- **YAML compounding** (history graphs, insights)

## Why Critical
**Future selves need to:**
- Understand WHY decision was made
- Rollback to before mistake
- Learn from patterns (what worked? what failed?)
- Generate insights (graph relationships between changes)

## Philosophy
**"We need to be legible to our future selves."**

## When to Apply
- Every git commit
- Epic documentation
- Check results
- Error logs
- Decision records
