# Design & Development Workflow - Parallel Validation

**Principle:** Separate design flow from development flow. Validate each before integration.

## Design Flow

1. **Explore** (diverge)
   - Sketch, ideate, research
   - Multiple directions considered

2. **Define** (converge)
   - Choose direction
   - Spec it out (detailed design)

3. **Validate** (test)
   - Usability test
   - Feedback from stakeholders
   - Iterate based on learnings

4. **Deliver** (hand off)
   - Design ready for development
   - Specs clear, assets prepared

## Development Flow

1. **Understand**
   - Review design
   - Ask clarifying questions
   - Ensure alignment

2. **Build** (in sandbox/branch)
   - Implement design
   - Test locally
   - Ensure functionality

3. **Validate** (QA)
   - Does it match design?
   - Does it work as intended?
   - Edge cases handled?

4. **Integrate**
   - Merge to main
   - Deploy (if applicable)
   - Monitor for issues

## Parallel Execution

**Design can work ahead:**
- Next feature designed while dev builds current
- Prevents dev bottleneck

**Dev can't start without validated design:**
- No guessing what user wants
- Reduces rework (design changes mid-dev)

**Feedback loops:**
- Dev finds design issue → Design adjusts
- Design discovers technical constraint → Adapt solution

## Tools

**Design:**
- Figma (UI/UX)
- Sketches (quick ideation)
- Prototypes (interactive testing)

**Development:**
- Git branches (isolation)
- Backstage sandbox (local testing)
- Testing frameworks (validation)

**Validation:**
- Usability tests (design)
- Peer review (code)
- Dogfooding (real-world use)

## Why This Matters

**Prevents:**
- ❌ Wasted dev effort (design changes mid-build)
- ❌ Misaligned implementation (dev guesses wrong)
- ❌ Poor UX (no validation before ship)

**Ensures:**
- ✅ Quality output (validated at each stage)
- ✅ Clear handoffs (design → dev)
- ✅ Efficient iteration (parallel work)

## AI Enforcement

**Before implementing design:**
- Verify design is validated (not just sketched)
- Ask clarifying questions if ambiguous
- Ensure all assets/specs available

**During development:**
- Flag misalignment with design early
- Suggest design adjustments if technical blocker
- Validate before marking "done"

**Example:**
```
User: "Build this feature"
AI: "Design validated? (usability test done?)"
- Yes → Proceed with development
- No → "Let's validate design first (sketch → prototype → test)"
```

---

**Added:** 2026-02-09 (from OpenClaw planning discussion)
