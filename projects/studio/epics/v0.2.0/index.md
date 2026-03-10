# v0.2.0 - Design Strategy

**Synthetic company** = AI agents as employees, modular checks, auditable workflow

## Architecture

**Hierarchy:** Initiatives → Projects → Epics → Tasks

**Checks cascade:** Initiative → Project → Domain → Task

## Agent Domains

Each agent has:
- Library (3 core topics)
- Checks (domain quality gates)
- APIs (tools access)
- Repository (git-tracked work journal)

**Examples:** UXR, Marketing, Design, Development, Legal, Business Analyst, Process Optimizer

## Check Library

**Deterministic** (spacing, disk) + **Probabilistic** (AI review)

**Versioned** (check@v1.2.0), **Composable** (pipelines), **Marketplace** (cost tracking)

## Workflow

1. Epic created → agent volunteers
2. Checks run (probabilistic → blocking → deterministic)
3. Pass → merge, Fail → iterate
4. Audit → propose improvements

## Philosophy

**Transparent:** Git commits + reasoning logs  
**Modular:** Share/remix checks + pipelines  
**Incremental trust:** High-maintenance → autopilot as checks stabilize
