---
id: wayfinding-orientation
name: Wayfinding - User Always Knows Location
type: policy
trigger: probabilistic
context: decision-making, navigation-design
scope: ui, ux, website, backstage, pipelines
---

# Wayfinding - User Always Knows Where They Are

## Question
Can the user answer these 4 questions?

1. **Orientation:** Where am I?
2. **Route decisions:** Where can I go?
3. **Mental mapping:** How do I get back?
4. **Closure:** Did I reach my goal?

## Principle
**Lost users abandon. Clear paths build trust.**

## Applied Rules
- ✅ **Breadcrumbs persist** across page transitions
- ✅ **URLs reflect hierarchy** (`/projects/studio/epics/v3.0.0`)
- ✅ **Links to parent context** (epic notes → ROADMAP)
- ✅ **History visible** (CHANGELOG shows where we've been)
- ✅ **Current step highlighted** (agent knows which check)

## Examples

### ✅ PASS
- Website breadcrumbs (Home > Projects > Studio > Epic v3.0.0)
- Backstage epic notes link to ROADMAP
- Agent pipeline shows current check + remaining
- URLs tell hierarchy (`/agents/main/defense`)

### ❌ FAIL
- Dead-end pages (no way back)
- Opaque URLs (`/page?id=12345`)
- No indication of progress (where am I in pipeline?)
- Can't tell parent context (epic disconnected from project)

## Philosophy
**Kevin Lynch:** "The Image of the City" - legibility = findability

## When to Apply
- Navigation design
- URL structure decisions
- Breadcrumb placement
- Progress indicators
- Link architecture

## Severity
**High** - Core UX principle
