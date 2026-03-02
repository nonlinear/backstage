# Backstage 2.0 Architecture

**Centralized, flat structure for project management**

## Directory Structure

```
~/Documents/backstage/
├── checks/                    # All checks (35+ global)
├── checks.yaml                # Check registry
├── projects/                  # All projects
│   ├── backstage/
│   │   ├── checks.yaml       # Project-specific check manifest
│   │   ├── epics/            # Epic folders
│   │   │   ├── v2.0.0/
│   │   │   │   ├── epic.yaml
│   │   │   │   ├── index.md
│   │   │   │   └── *.md      # Additional notes
│   │   │   └── v2.1.0/
│   │   └── notes/            # General project notes
│   ├── librarian/
│   └── personal/
└── templates/                 # Epic/project templates
```

## Project Syntax

**Location:** `~/Documents/backstage/projects/PROJECT_NAME/`

**Required files:**
- `checks.yaml` - Project-specific check manifest
- `epics/` - Epic folders
- `notes/` - General notes (optional)

**Project naming:**
- Lowercase, hyphen-separated (e.g., `my-project`)
- No spaces, special chars

## Epic Types & Syntax

**Location:** `projects/PROJECT_NAME/epics/vX.Y.Z/`

### Epic Folder Structure

```
vX.Y.Z/
├── epic.yaml       # Metadata + tasks (required)
├── index.md        # Philosophy notes (optional)
└── *.md            # Additional notes (optional)
```

### epic.yaml Schema

```yaml
---
name: epic-name-slug          # Lowercase, hyphen-separated
status: planning              # See Status Lifecycle
tier: 0                       # 0/1/2/3 (priority/maturity)
created: YYYY-MM-DD           # Creation date
started: YYYY-MM-DD           # Start date (null if not started)
completed: YYYY-MM-DD         # Completion date (null if incomplete)
tasks:                        # Flat list (no nesting)
  - Task description
  - Another task
---
```

### Epic Status Lifecycle

See `epic-status-lifecycle.md` for full details.

**Workflow:**
```
Planning → Ready → Active → Review → Published
    ↓        ↓                         ↓
 Blocked  Paused                    Backlog
```

### Epic Types (by tier)

**Tier 0: Core Infrastructure**
- Foundation systems
- Critical protocols
- High priority

**Tier 1: Active Development**
- Current work
- Near-term roadmap

**Tier 2: Maintenance Mode**
- Stable, low churn
- Bug fixes only

**Tier 3: Experimental/Research**
- Exploratory work
- May not ship

## Task Structure

**Tasks = flat list in epic.yaml**

```yaml
tasks:
  - Task 1 description
  - Task 2 description
  - Task 3 description
```

**No nesting** (flat, not cascading).  
**Dependencies** = future (v3.0.0 epic).

**Task format:**
- Brief, actionable
- 1-2 sentences max
- Verb-first (e.g., "Implement X", "Design Y")

## Notes Organization

### Epic Notes (in epic folder)

**index.md:**
- Philosophy
- Goals
- Context
- NOT metadata (metadata in epic.yaml)

**Additional .md files:**
- Detailed research
- Design documents
- Session logs
- Modular (one concern per file)

### Project Notes (in notes/)

**General notes NOT specific to one epic:**
- Architecture decisions
- Team conventions
- Tools/setup guides
- Cross-epic patterns

## Checks System

**Global checks:** `~/Documents/backstage/checks/`  
**Project checks:** Listed in `projects/PROJECT_NAME/checks.yaml`

**Check types:**
1. **Deterministic (.sh):** Executable scripts (exit 0 = pass)
2. **Interpretive (.md):** Human/AI guidelines (manual validation)

**Composite execution:**
- Global checks run first
- Project checks run second
- Results merged (PASS/FAIL/SKIP)

**Check manifest (checks.yaml):**
```yaml
global:
  - check-name-1
  - check-name-2
project:
  - project-specific-check
```

## Philosophy

### Centralized, Not Distributed
**One repo** (`~/Documents/backstage/`) for all projects.  
**Benefits:**
- Single source of truth
- Cross-project visibility
- Easier maintenance
- Unified check system

### Flat, Not Cascading
**No dependencies** tracked (yet).  
**v2.0 = flat structure:**
- Simple coordination (manual)
- Sufficient for current needs

**v3.0 = cascading dependencies:**
- Epic → epic dependencies
- Task → task dependencies
- Automated scheduling

### DRY Principle
**Folder = namespace** (files belong to epic automatically).  
**YAML = metadata** (version, status, tasks).  
**index.md = optional** (philosophy only, no metadata duplication).

### GUI = Read-Only
**Changes via conversational AI** (respects checks).  
**GUI surfaces foundation** (doesn't edit directly).

## Backstage Skill Integration

**Triggers:**
- `bom dia PROJECT` → Start session (load context + run checks)
- `boa noite` → End session (save state)

**Skill location:** `~/.openclaw/workspace/skills/backstage/`

**Core scripts:**
- `backstage.sh` - Main executor (validates projects exist)
- `checks-composite.sh` - Composite check execution
- `parse-epics.sh` - YAML parsing

**Validation:**
- Project must exist in `~/Documents/backstage/projects/`
- Epic folder must have `epic.yaml`

## Migration from 1.0

**1.0 → 2.0 changes:**
- `PROJECT/backstage/` → `~/Documents/backstage/projects/PROJECT/`
- `checks/local` + `checks/global` → unified `checks/`
- `ROADMAP.md` → `epics/vX.Y.Z/` folders
- Distributed repos → single backstage repo

**Backward compatibility:** None (clean break, 2.0 is new foundation).

## Future (v3.0+)

**v3.0 - Dependencies:**
- Epic depends on epic
- Task depends on task
- Cascading execution

**v2.9 - Protocol:**
- Multi-party coordination
- Node discovery
- Handshake (capabilities, history)

See roadmap for full v2.x/v3.x sequence.
