---
id: jit-external-progressive-disclosure
name: Just-in-Time (External) - Progressive Disclosure
type: policy
trigger: probabilistic
context: decision-making, feature-design
scope: ui, ux, website
---

# Just-in-Time (External) - Features Appear When Needed

## Question
Are we showing users features they don't need yet?

## Principle
**Respect attention. Don't clutter. Reveal when relevant.**

## Applied Rules
- ✅ **Progressive disclosure** (complexity unfolds as needed)
- ✅ **Reduce cognitive load** (hide irrelevant options)
- ✅ **Context-aware UI** (feature appears when conditions met)

## Examples

### ✅ PASS
- Cookie policy only appears when user changes language
- Translation button only if translations exist
- Sidebar only if article >500 words
- Epic-specific actions only when in epic context

### ❌ FAIL
- All features visible always (overwhelming)
- Cookie banner on every page (nag fatigue)
- Translation button when no translations (dead link)
- Irrelevant actions clutter interface

## Philosophy
**Toyota Production System** adapted to UX - deliver when needed, not before

## When to Apply
- Feature placement decisions
- Modal/drawer triggers
- Button visibility logic
- Navigation structure
- Onboarding flows

## Severity
**Medium** - UX quality, not critical failure
