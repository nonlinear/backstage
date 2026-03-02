# v2.0.0 - Backstage 2.0

## Goal

Centralized architecture: All projects in one repo, checks unified, epics as folders.

## Changes

**1.0 → 2.0:**
- `PROJECT/backstage/` → `~/Documents/backstage/projects/PROJECT/`
- `checks/local` + `checks/global` → `~/Documents/backstage/checks/` (unified)
- ROADMAP.md (file) → `epics/vX.Y.Z/` (folders with yaml)
- Distributed repos → Single backstage repo

## Architecture

**Structure:**
```
~/Documents/backstage/
├── checks/              # All checks (global + project-specific)
├── checks.yaml          # Check registry + project assignments
├── projects/            # All projects
│   ├── backstage/
│   │   ├── epics/      # Epic folders (yaml + index.md)
│   │   └── notes/
│   ├── librarian/
│   └── personal/
└── templates/
```

## Remaining Tasks

**Documentation:**
1. SKILL.md diagram match implementation?
2. Epic note documenting new architecture:
   - Project syntax
   - Epic types
   - Task structure
   - Notes organization

## Benefits

- Single source of truth (DRY)
- Centralized check management
- Cross-project visibility
- Easier to maintain

## Status

Active (almost complete, needs documentation).
