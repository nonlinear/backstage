# Backstage Glossary

**"When we say X, we mean XYZ"**

---

## Core Concepts

**Backstage**  
Central project management system. Single source of truth for projects, epics, tasks, checks.

**Project**  
Collection of related epics. Location: `~/Backstage/projects/{PROJECT}/`

**Epic**  
Unit of work with version, tasks, status. Structure: `epics/v{X.Y.Z}/`

**Task**  
Actionable item within epic. Format: `text` + `checked` in `epic.yaml`

**Check**  
Validation rule (deterministic `.sh` or interpretive `.md`). Enforces policies.

**Checkpoint**  
Triggered validation gate. Runs checks at specific moments (pre-commit, pre-merge, scheduled).

**Policy**  
Human-defined rule or principle. Becomes check when formalized.

**Tier**  
Project priority/maturity level:
- `0` - Core (critical infrastructure)
- `1` - Active (current focus)
- `2` - Maintenance (stable, minimal changes)
- `3` - Experimental (proof of concept)

**Night Shift**  
Autonomous agent execution (unsupervised, no human to ask). Requires zero ambiguity.

**Retro**  
Retrospective process: learnings → policy → checks (continuous improvement).

---

## Epic Status Lifecycle

**backlog**  
Created, not picked up yet.

**intake**  
Nicholas + business-analyst write basics. Refining problem statement.

**grooming**  
Agents bid as stakeholders. Discuss until zero ambiguities. Branch created.

**ready**  
Night shift ready. All ambiguities resolved, agents can execute autonomously.

**done**  
Merged to main. All tasks complete, checks passed.

---

## Agent Modes

**Supervised (Day Mode)**  
Human present. Fast feedback. Can clarify. Lower reasoning models OK.

**Unsupervised (Night Shift)**  
Agent works alone. No human to ask. Must handle ambiguity. Higher reasoning required.

---

## Architecture

**Centralized**  
Single repo (`~/Backstage/`) for all projects (vs distributed per-project repos).

**Flat**  
No dependency tracking between epics (vs cascading dependencies).

> 🔜 **Cascading:** Track epic/task dependencies, enforce order.

**Composable**  
Git commits scannable → generates state (rebuilds from history).

---

## GUI Philosophy

**Read-Only GUI**  
Visual interface never edits files. Changes via conversational AI (respects checks).

**Foundation First, GUI Second**  
Build logic/structure first, visualize after. No GUI-first design.

---

## Meta Concepts

**Meta Epic**  
Epic that enables other epics (e.g., Epic Phases, Retro as Checks).

**Enforcement**  
Automated validation (checks execute, not just document rules).

**Retroalimentação** (Feedback Loop)  
Execution results → policy adjustments → refined checks → better execution.

---

## Values (Organization-Level)

Referenced in agent `.values.md`:

- **autonomy** - Agents decide how, not just what
- **brevity** - More focus, fewer words
- **commons** - Shared resources over duplication
- **DRY** - Don't repeat yourself (Git, folder names, etc.)
- **high auditability** - Decisions traceable via Git history
- **identity** - Each agent has distinct personality/role
- **less is more** - Minimal viable everything
- **night shift** - Autonomous execution mode (zero ambiguity)
- **remove ambiguity** - Clarify before execute
- **parity** - Consistent structure across projects
- **research** - Validate assumptions before building
