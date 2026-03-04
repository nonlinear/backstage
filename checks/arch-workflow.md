---
title: "Architecture Workflow Guide"
type: probabilistic
description: "Documents the workflow for architectural decisions and diagrams"
---

```mermaid
graph TD
    Start[Architecture Change Needed] --> Create[Create/Update Diagram in Epic]
    
    Create --> Colors{Apply Color System}
    Colors -->|Yellow| Execute[Agreement Reached - Can Execute]
    Colors -->|Pink| Discuss[Needs Discussion First]
    Colors -->|Gray| Flow[Execution/Data Flow]
    
    Execute --> Sanity{Blueprint Sanity Check}
    Discuss --> Sanity
    Flow --> Sanity
    
    Sanity --> Q1{Does this make sense?}
    Q1 -->|No| Ask1[ASK Nicholas]
    Q1 -->|Yes| Q2{Have tools to execute unsupervised?}
    Q2 -->|No| Ask2[ASK Nicholas]
    Q2 -->|Yes| Implement[Implement Change]
    
    Ask1 --> Clarify[Clarify Blueprint]
    Ask2 --> Clarify
    Clarify --> Sanity
    
    Implement --> Document{arch: prefix?}
    Document -->|Yes| AddToFile[Document in arch-workflow.md]
    Document -->|No| SkipDoc[Just Implement]
    
    AddToFile --> Save[Save Diagram]
    SkipDoc --> Save
    
    Save --> Commit[Auto-commit + Screenshot]
    Commit --> Done[✅ Diagram Evolution Tracked]
    
    style Execute fill:#FFFF99
    style Discuss fill:#FFB6C1
    style Flow fill:#E0E0E0
    style Done fill:#90EE90
```

## Auto-commit on Save

**Concept:** Save .md → auto-commit with diagram screenshot
- **Purpose:** Stop motion of diagram evolution
- **Status:** Not implemented (manual git workflow for now)
- **Future:** fswatch + screencapture automation

## Color System

- **Yellow (#FFFF99):** Agreement reached, can execute
- **Pink (#FFB6C1):** Needs discussion before execution
- **Gray (#E0E0E0):** Execution/data flow (neutral)

## Blueprint Sanity Check (MANDATORY)

Before executing ANY architecture diagram, AI must ask:
1. **"Does this make sense?"** - Logic coherent?
2. **"Do I have the tools to execute unsupervised?"** - Can I run this alone?

**If ambiguous → ASK, ASK, ASK.**

Diagrams = agreements (contracts of execution). Ambiguity in blueprint = wasted effort.

## arch: Prefix Rule

**When Nicholas says "arch:" in conversation:**
1. **Implement** the change/rule immediately
2. **Document** in this file

**Special syntax:**
- **arch: italic means exact copy user sees** - Text in italics = verbatim (error messages, UI copy)

**Example:**
- "arch: screenshot tela toda, simples" → Implement + document here
- Regular conversation → Just implement, don't document

## Diagram Update Workflow

1. **Agreement reached** → Update diagram immediately (node by node is fine)
2. **Each save** → Auto-commit
3. **Screenshot** → Auto-move to `backstage/epic-notes/screenshots/`
4. **Result:** Incremental visual evolution, stop motion on every change
