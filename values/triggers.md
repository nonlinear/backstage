---
id: jit-internal-threshold-triggers
name: Just-in-Time (Internal) - Threshold Triggers
type: policy
trigger: probabilistic
context: decision-making, automation-design
scope: backstage, pipelines, agents
---

# Just-in-Time (Internal) - Triggers Detect Thresholds

## Question
Should the system propose an epic/action now?

## Principle
**Automation detects, human decides. No autopilot without oversight.**

## Applied Rules
- ✅ **System detects threshold** (e.g., article >500 words)
- ✅ **Proposes action** (e.g., suggest summarization epic)
- ✅ **Nicholas approves** (human final decision)
- ❌ **No automatic execution** (no silent changes)

## Examples

### ✅ PASS (Trigger Detected)
- Article >500 words → Suggest summarization epic
- Product promoted to Tier 3 → Suggest translation epic
- 3+ articles per product → Suggest navigation epic
- Flagship product stable → Suggest custom branding epic

### ❌ FAIL
- System creates epic without asking (autopilot)
- Threshold passed, no trigger (silent complexity growth)
- Human unaware of trigger (no notification)

## Philosophy
**Human vision > efficiency loops.** System serves human decision, doesn't replace.

## When to Apply
- Epic creation decisions
- Automation boundaries
- Threshold definitions
- Notification design
- Approval workflows

## Severity
**High** - Core workflow principle (human agency preserved)
