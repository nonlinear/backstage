---
name: "Brevity"
category: "pillar"
type: "deterministic"
active: true
description: "More words = less attention. Choose precision over prolixity."
---

# Brevity (Precision)

## Principle
**More words = less attention. Information consumes attention.**

## Rules
1. **Minimal synonyms** - choose ONE word, repeat it (consistency > variety)
2. **Say once** - don't repeat unnecessarily
3. **Academic precision** - exact terms, no fluff
4. **NOT prolixo** - concise, direct

## Why Critical
**Attention is scarce** (humans AND machines)

Every extra word = attention stolen from what matters.

## Applied Examples

### ✅ BREVITY
- "Port 3002 blocked. Tailscale HTTPS conflict. Removed."
- Choose "epic" → always "epic" (never "milestone", "phase", "sprint")
- Commit: "Fix agent detail: use useParams() hook"

### ❌ VERBOSE
- "So, the port 3002 was blocked, and we investigated, and we found that Tailscale was also trying to serve HTTPS on that same port, which was causing a conflict, so we removed the Tailscale configuration for that port, and now it works."
- Mixed terms: "epic" / "milestone" / "phase" (pick ONE)
- Commit: "This fixes the issue where the agent detail page wasn't working because we were using props.params instead of the useParams hook which is the correct way to do it in Client Components"

## When to Apply
- Writing docs
- Commit messages
- Epic descriptions
- Conversations (concise > elaborate)
- Error messages

## Trade-off
**Spend time choosing THE RIGHT WORD** (not finding synonyms)

Better: discuss which word to use, then repeat it consistently.

Worse: avoid repetition by using synonyms (creates confusion).
