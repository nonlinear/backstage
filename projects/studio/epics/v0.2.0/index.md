# Design Strategy - Synthetic Company Architecture

> **Epic:** v0.2.0 - Design Strategy  
> **Status:** Active  
> **Created:** 2026-03-06

---

## Executive Summary

This document consolidates the design strategy sessions (talk1 & talk2) into a coherent vision for building a **synthetic company** — a fully agentic organization where AI agents work as department specialists within a modular, auditable, and deterministic workflow system.

**Core Vision:** A company DNA made of reusable checks, pipelines, and domain expertise that can be evolved, shared, and composed on-demand.

---

## The Big Picture

### What We're Building

**Not** a virtual company. A **synthetic company** — real work, real outputs, AI agents as employees.

**Components:**
1. **Project Management Layer** (Plane) - Task tracking, roadmaps, epics
2. **Agent Orchestration Layer** (TBD) - Domain agents, checks, pipelines
3. **Check Library** - Modular quality gates (deterministic + probabilistic)
4. **Librarian Integration** - Topic-based knowledge graphs per domain

### Why This Matters

- **Scalable Quality:** Add new checks without rebuilding infrastructure
- **Transparent Process:** Every decision is auditable (git commits, reasoning logs)
- **Modular DNA:** Share/remix checks, pipelines, and domains across projects
- **Incremental Trust:** Start high-maintenance → plateau to autopilot as checks stabilize

---

## Architecture Philosophy

### Hierarchy: Initiatives → Projects → Epics → Tasks

**Initiatives** (Vision-level)
- Cross-project strategic alignment
- Example: "Enter European market"
- Have their own checks (e.g., GDPR compliance)

**Projects** (Deliverable-level)
- Specific outcomes
- Have multiple epics
- Each project has a roadmap

**Epics** (Feature-level)
- All-or-nothing delivery units
- Branch-based development
- Pass all checks → merge to main → published

**Tasks** (Execution-level)
- Deterministic, unambiguous tickets
- Assigned to domain agents
- Success metrics defined upfront

### Cascading Rules

- Epics can belong to 0 or 1 initiative (binary)
- Projects can have epics linked to different initiatives
- Checks cascade: Initiative checks → Project checks → Domain checks → Task checks

---

## Agent Domains (Employees)

Each domain agent has:

1. **Name** - Identity (e.g., "UXR Agent", "Legal Agent")
2. **Library** - 3 core topics defining expertise
3. **Books** - Research materials (via Librarian)
4. **Checks** - Domain-specific quality gates
5. **APIs** - Tools they can access (Figma, GitHub, etc.)
6. **Repository** - Git-tracked work journal (auditability)
7. **Proactive Participation** - Can volunteer as stakeholder on epics

### Example Domains

- **UXR** (User Experience Research)
- **Marketing**
- **Design**
- **Development**
- **Legal**
- **Business Analyst** - Epic grooming, ticket creation
- **Process Optimizer** - Audit completed work, propose improvements

---

## The Check Library

### What is a Check?

A modular, versionable quality gate that can be:

- **Deterministic** - Same input → same output (spacing, disk usage)
- **Contextual** - Depends on external API (Lighthouse score)
- **LLM-assisted** - Requires reasoning (design critique)

### Check Structure

```yaml
---
name: spacing-consistency
domain: design
version: 1.0.0
deterministic: true
reusable: true
---

Success Metrics:
- All spacing divisible by 8px
- No orphan values (1px, 3px)

Dependencies:
- Figma API access

Execution:
- executor.py (separate file)
```

### Check Composition

Checks can call other checks (composite pattern):

```yaml
---
name: full-design-qa
domain: design
composite: true
---

Sub-checks:
- spacing-consistency
- color-palette
- accessibility
- responsive-breakpoints

Success: ALL sub-checks pass
```

### Check Conflict Detection

When adding a check to an initiative, the system can detect:
- Conflicts with existing project checks
- Cost/time impact across all affected epics
- Scenarios: "What if we add GDPR check to all projects?"

---

## Workflow: Epic Grooming

### Phase 1: Explore (Collaborative)

1. Nicholas has an idea
2. **Business Analyst Agent** facilitates discussion
3. All relevant domain agents participate as stakeholders
4. Goal: Define scope everyone agrees on

### Phase 2: Build (Execution)

1. Epic broken into deterministic tasks
2. Each task has:
   - Domain assignment
   - Success metrics (checks)
   - Deliverable definition
   - Pipeline order (parallel vs cascade)

3. Agents pick tasks from queue
4. Execute → commit with justification → run checks

### Phase 3: Approval

**High Maintenance Mode (Start):**
- Every deliverable requires Nicholas approval
- Weekly review meetings per domain
- Iterate until checks pass

**Low Maintenance Mode (Plateau):**
- If >90% auto-approve → switch to sampling
- Agent publishes directly if checks pass
- Nicholas only notified of anomalies

### Phase 4: Optimize

**Process Optimizer Agent** reviews completed epics:
- Identifies bottlenecks
- Proposes pipeline improvements
- Suggests new tools/APIs to reduce friction

---

## Project Management Tool: Plane

### Why Plane?

- **Open source** (self-hosted via Docker)
- **Modern UI** (iPhone app for mobile monitoring)
- **API-first** (integrate with check runner)
- **Flexible workflows** (custom states, approvals)

### Taxonomy in Plane

- **Workspace** → Company
- **Initiatives** → Strategic themes
- **Projects** → Deliverables
- **Cycles** → Sprints
- **Modules** → Epic groups
- **Issues** → Tasks

### Integration Points

- Task descriptions include YAML frontmatter:
  ```yaml
  ---
  domain: design
  checks:
    - spacing-consistency >= 0.95
    - color-palette.violations == 0
  ---
  ```

- Agent reads task → loads checks from library → executes → updates status

---

## Agent Orchestration (TBD)

### Requirements

1. **Self-hosted** (all data stays local)
2. **Open source** (maximum customization)
3. **API-driven** (connects to Plane)
4. **Git-based** (every action logged)

### Candidate Tools

- **n8n** - Workflow automation (low-code)
- **Prefect** - Data pipeline orchestration
- **Temporal** - Durable execution framework
- **Custom** - Python + LangGraph + Plane API

### Agent Capabilities

- Pull tasks from Plane queue
- Consult Librarian for domain knowledge
- Execute checks from library
- Commit work with justification
- Update task status in Plane
- Request human approval when needed

---

## Auditability & Trust

### Every Action is Logged

- **Git commits** - Every edit has justification
- **Check results** - Pass/fail with detailed reports
- **Agent reasoning** - Why did they make this choice?
- **Human approvals** - Nicholas decisions are recorded

### Rollback Strategy

- Epic branches allow full rollback
- Check library versioned (can revert to old checks)
- Domain repositories track all changes

### Trust Building

Start: High friction (approve everything)  
→ Checks stabilize (fewer failures)  
→ Nicholas approves 90%+ automatically  
→ Switch to sampling mode  
→ Agents operate autonomously with audit trail

---

## Scenario Simulation

### Use Case: Add GDPR Check

**Question:** "What if I add GDPR compliance check to all projects?"

**System Response:**
- **Affected epics:** 12 across 4 projects
- **New tasks generated:** 8 (compliance audits)
- **Estimated time:** +40 hours total
- **Conflicts detected:** None
- **Cost to implement:** €3,200 (based on hourly rates)

**Decision:** Nicholas approves → system updates all roadmaps

---

## Key Roles (Agent Types)

### 1. Business Analyst
**Job:** Transform conversations into deterministic tickets
- Grooming epics
- Defining success metrics
- Mapping stakeholders
- Breaking down scope

**Human Equivalent:** Requirements Engineer, Product Owner

### 2. Process Optimizer
**Job:** Audit completed work, propose improvements
- Analyze ChangeLog (published epics)
- Identify bottlenecks
- Suggest tooling/API changes
- Measure pipeline efficiency

**Human Equivalent:** Business Operations Analyst, Process Improvement Specialist

### 3. Domain Agents (UXR, Marketing, Design, Dev, Legal, etc.)
**Job:** Execute domain-specific tasks
- Research via Librarian
- Apply domain checks
- Produce deliverables
- Participate in epic grooming

---

## Philosophy: DNA as Infrastructure

**The company DNA lives in:**
- Check library (quality gates)
- Domain repositories (agent knowledge)
- Pipeline definitions (workflow logic)
- Librarian topics (expertise graphs)

**Why this matters:**
- **Portable** - Share DNA with collaborators
- **Evolvable** - Upgrade checks without breaking old projects
- **Composable** - Mix/match checks like LEGO blocks
- **Auditable** - Every decision has a paper trail

**End Goal:** Company runs itself. Nicholas only intervenes on strategic decisions and edge cases.

---

## Next Steps

1. **Deploy Plane** (project management)
2. **Build check library MVP** (3 initial checks)
3. **Define agent orchestration architecture**
4. **Create Business Analyst agent** (epic grooming)
5. **Test one epic end-to-end** (UXR domain)
6. **Measure approval rate** (when to switch to autopilot?)

---

## Related Documents

- `ai-agents-domains.md` - Agent structure from talk1
- `agent-ideas-list.md` - 11 agent types from talk1/talk2
- `talk2-decisions.md` - Decisions log from triage

---

**Last Updated:** 2026-03-06  
**Maintainer:** Nicholas (@nonlinear_nyc)  
**Status:** Active exploration → Build phase pending
