# Code is Cheap, Good Code is Not

## Principle

Code generation = almost free (agents can write hundreds of lines in seconds).

Good code = still expensive (requires checks, tests, documentation, thoughtful design).

## Rule

Don't skip checks to "save time." **Time is no longer the constraint. Quality is.**

## Pattern

**Old habit:**
> "Don't build that feature, it's not worth 2 days of coding time."

**New habit:**
> "Fire off prompt to agent. Worst case = 10 minutes wasted. Best case = feature shipped."

## What "Good Code" Means

(Simon Willison's criteria)

- Works (does what it's meant to do)
- **We know it works** (tests prove it)
- **Solves the right problem** (not just any problem)
- Handles errors gracefully
- Simple/minimal (YAGNI)
- Protected by tests (regression suite)
- Documented (reflects current state)
- Affords future changes

## Trade-offs

**Cheap to generate:**
- Initial implementation
- Boilerplate
- Refactoring existing patterns

**Still expensive:**
- Understanding requirements (what to build)
- Validation (does it work?)
- Integration (fits with existing system?)
- Maintenance (future changes)

## When to Apply

**Before dismissing scope:**
- "Too small to bother" → Let agent try (async session)
- "Nice to have" → Prompt it, check result later
- "Would take hours" → Now takes minutes (try it)

**Still requires judgment:**
- "Should we build this?" (product decision)
- "Is this the right approach?" (architecture decision)
- "Does this meet our quality bar?" (review decision)

## Anti-Pattern

❌ **"Agent wrote it fast, ship it without review"**

Speed of generation ≠ quality of output.

**Always run checks.** Fast code that fails checks = waste.

---

**Reference:** [Simon Willison - Writing code is cheap now](https://simonwillison.net/guides/agentic-engineering-patterns/code-is-cheap/)
