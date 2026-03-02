# Backstage Glossary

**"Quando dissemos X queremos dizer XYZ"**

## Core Concepts

### Backstage
Central project management system. Single source of truth for all projects, epics, tasks, checks.

### Project
Collection of related epics. Lives in `~/Documents/backstage/projects/PROJECT_NAME/`.

### Epic
Unit of work with version, tasks, status. Folder structure: `epics/vX.Y.Z/`.

### Task
Actionable item within epic. Listed in `epic.yaml` tasks array.

### Check
Validation rule (deterministic `.sh` or interpretive `.md`). Enforces policies.

### Checkpoint
Triggered validation gate. Enforces checks at specific moments (pre-commit, pre-merge, scheduled).

### Policy
Human-defined rule or principle. Can become check when formalized.

### Tier
Project priority/maturity level (0 = core, 1 = active, 2 = maintenance, 3 = experimental).

### Night Shift
Autonomous agent execution mode (unsupervised, while human sleeps).

### Retro
Retrospective process. Learnings → policy → checks (continuous improvement).

## Status Lifecycle

### Planning
Ready for planning, needs grooming. Not ready for execution.

### Blocked
Cannot proceed (missing dependencies or clarity). Not night shift ready.

### Paused
Intentionally stopped. Will resume later.

### Ready
Night shift ready. All ambiguities resolved, agents can run autonomous.

### Active
Work in progress. Has branch, tasks incomplete.

### Review
Night shift completed. Some checks need human supervision.

### Published
Merged to main, all tasks complete. Milestone, visible to all.

### Backlog
Deferred indefinitely. Not thinking about now.

## Agent Modes

### Supervised (Day Mode)
Human present. Fast feedback. Can clarify. Lower reasoning models OK.

### Unsupervised (Night Shift)
Agent works alone. No human to ask. Must handle ambiguity. Higher reasoning models required.

## Architecture Terms

### Centralized
Single repo (`~/Documents/backstage/`) for all projects (vs distributed).

### Flat
No dependency tracking (vs cascading).

### Cascading
Epic/task dependencies tracked and enforced (v3.0+).

### Composable
Git commits scannable → generates YAML files (rebuilds state from history).

## GUI Philosophy

### Read-Only GUI
Visual interface never edits directly. Changes via conversational AI (respects checks).

### Foundation First, GUI Second
Build logic/structure first, visualize after.

## Meta Concepts

### Meta Epic
Epic that enables other epics (e.g., Retro as Checks, Dependencies).

### Enforcement
Automated validation (checks/checkpoints execute, not just document).

### Retroalimentação
Feedback loop. Execution results → policy adjustments → refined checks.
