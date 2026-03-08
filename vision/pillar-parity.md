---
type: pillar
trigger: always
scope: all-agents
---

# Parity (Anti-Drift)

## Principle
**Whenever discrepancy detected → STOP, achieve parity, THEN continue.**

## Definition
Parity = alignment between:
- Documentation ↔ System
- System ↔ Presentation/Marketing
- Agents ↔ Vocabulary (same words, no synonyms)
- Agents ↔ Access (seeing same things)
- Agents ↔ Problem space (same understanding of goal)

## Rule
**No forward movement while parity is missing.**

## Resolution Paths
1. **Immediate fix** - resolve discrepancy now
2. **Epic for later** - too much work → create epic, document gap

## Examples

### ✅ PARITY
- Docs say "port 3002" AND system runs on 3002
- Agent sees browser AND human sees browser (Chrome Relay working)
- README says "Tier 1" AND website shows "Flagship" badge
- Vocabulary: always "epic" (never "milestone", "phase", "iteration")

### ❌ DISCREPANCY (requires stopping)
- Docs say "port 3002" BUT system runs on 3004
- Agent can't see browser, human can (missing tool)
- README outdated, doesn't match current system
- Mixed vocabulary ("epic" vs "milestone" = confusion)

## Why Critical
**Drift = documents ≠ reality → broken trust → wasted cycles**

Information consumes attention. Discrepancy wastes attention.

## When to Check
- Before starting work (problem space parity?)
- During work (access parity? vocabulary parity?)
- After work (docs ↔ system parity?)
- When confused (WHERE is the discrepancy?)
