# Organization

**Name:** Nonlinear Studio  
**Type:** Design/development atelier

---

## Differentials

What makes Backstage unique.

### Commons
Polycentric governance (global + local checks, local wins).

Squads share expertise (library topics, skills, checks) instead of siloing.

**Inspired by:** Elinor Ostrom - polycentric systems, self-governance

---

### Night Shift
Zero ambiguity requirement for autonomous execution.

Agents work unsupervised (no human to ask). Grooming must eliminate ALL ambiguities before ready.

**Discovery loop:** Night shift finds NEW ambiguities → back to grooming → iterate.

**Inspired by:** Supervised → unsupervised ML (plateau = autonomous quality)

---

### Library
Research-first (validate with theory before code).

Agents consult domain libraries (📕 citations) to ground decisions in established knowledge.

**Anti-pattern:** "Just build it" → zig-zag, failure, drift

**Pattern:** Library research → informed brief → zero ambiguity → ship

**Inspired by:** Academic rigor, design research, theory of constraints

---

## How These Combine

```
Commons (who decides what)
  ↓
Library (what does theory say)
  ↓
Night Shift (can we execute without asking)
```

**Example:**
1. **Commons:** Development squad + Design squad collaborate on epic
2. **Library:** Development consults `technology/` topics, Design consults `design/usability/`
3. **Night Shift:** All ambiguities resolved, agents execute autonomously

**Without any one pillar:**
- No Commons → siloed decisions, wasted work
- No Library → opinion-based, drift
- No Night Shift → supervised only, doesn't scale

---

## Comparison to Industry Practices

| Practice | Industry Standard | Backstage |
|----------|-------------------|-----------|
| Code generation | Claude/Copilot (supervised) | Night shift (unsupervised) |
| Decision making | Product manager dictates | Polycentric (expertise-based authority) |
| Requirements | PRD doc | Grooming (consensus until zero ambiguity) |
| Validation | Manual QA / Tests | Checks (deterministic + probabilistic) |
| Knowledge | Tribal (in people's heads) | Library (📕 cited sources) |
| Governance | Top-down | Commons (global + local, local wins) |

**What others do:** TDD, async agents, checks

**What we add:** Polycentric governance + theory grounding + zero ambiguity protocol

---

**Reference:**
- [Simon Willison - Agentic Engineering](https://simonwillison.net/guides/agentic-engineering-patterns/)
- Elinor Ostrom - Understanding Institutional Diversity
- Night shift concept - Supervised → unsupervised learning
