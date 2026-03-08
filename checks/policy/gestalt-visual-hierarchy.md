---
id: gestalt-visual-hierarchy
name: Gestalt - Visual Hierarchy
type: policy
trigger: probabilistic
context: decision-making, design-review
scope: ui, ux, website, products
---

# Gestalt - Visual Hierarchy Communicates Structure

## Question
Does the user understand the system just by looking?

## Principle
**User understands the system WITHOUT reading instructions.**

## Applied Rules
- ✅ **Visual hierarchy obvious** (flagship = full color, experiments = muted)
- ✅ **Animations obey gestalt logic** (e.g., title grows → entering subset)
- ✅ **Status visually distinct** (tier, branch, mode)

## Examples

### ✅ PASS
- Website tier badges (flagship full color, experiments muted)
- Backstage epic branches (visual distinction from main)
- Animations (title grows = entering, others fade = context shift)

### ❌ FAIL
- User asks "where am I?" (visual hierarchy failed)
- No status indicators (can't tell tier/mode at glance)
- Uniform design (everything looks same priority)

## Philosophy
**"If the user has to ask 'where am I?', we failed."**

## References
- Max Wertheimer - Gestalt Principles
- Kurt Koffka - Principles of Gestalt Psychology

## When to Apply
- Design reviews
- Feature proposals
- Animation choreography
- Status indicators
- Navigation design

## Severity
**High** - Core identity principle
