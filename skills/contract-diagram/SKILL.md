---
name: contract-diagram
description: "Diagram as contract for agreed-upon AI development"
type: public
version: 1.1.1
status: published
dependencies: []
author: nonlinear

license: MIT
---

| Legend | Description |
|--------|-------------|
| ![default](https://img.shields.io/badge/default-lightgray) | Not discussed yet |
| ![approved](https://img.shields.io/badge/approved-yellow) | Agreed by stakeholders |
| ![blocker](https://img.shields.io/badge/blocker-red) | Needs discussion/failed implementation (always has notes) |
| ![developed](https://img.shields.io/badge/developed-lightgreen) | Agreed and implemented |
| ![notes](https://img.shields.io/badge/notes-blue) | Implemented but developer made decisions (in notes) |
| ![outside](https://img.shields.io/badge/outside-lightgreen) | (dashed border) To be performed outside system |

---

## SKILL contract diagram ![Published](https://img.shields.io/badge/Published-lightgray) [ℹ️](https://github.com/nonlinear/skills/tree/main/contract-diagram/SKILL.md)

```mermaid
%%{init: {'theme':'base','themeVariables':{"primaryColor":"#4A90E2","primaryTextColor":"#fff","primaryBorderColor":"#2E5C8A","lineColor":"#666","secondaryColor":"#50E3C2","tertiaryColor":"#FFD700","edgeLabelBackground":"#666"},'flowchart':{"nodeSpacing":50,"rankSpacing":50,"padding":15,"curve":"basis"}}}%%
flowchart TD
    TRIGGER["Trigger + contract"]
    CHECK_CONTRACT{"Has contract?"}
    OPEN["Open contract"]
    CLARIFY["Clarify"]
    CHECK_DIAGRAM{"Has diagram?"}
    CREATE["New 1️⃣"]
    CLAIM["Claimed 1️⃣"]
    ERROR["Error 2️⃣"]
    
    DESIGN["Design phase"]
    SIGNOFF["Ready to approve"]
    DEVELOPMENT["Developing..."]
    BLOCKERS{"Has blockers?"}
    TESTS{"Pass checks? 3️⃣"}
    PUBLISH["Publish 3️⃣"]
    
    TRIGGER --> CHECK_CONTRACT
    CHECK_CONTRACT -->|Yes| OPEN
    CHECK_CONTRACT -->|Yes but<br/>not editable| ERROR
    CHECK_CONTRACT -->|No| CLARIFY
    CLARIFY --> TRIGGER
    
    OPEN --> CHECK_DIAGRAM
    CHECK_DIAGRAM -->|Yes, more<br/>than one| ERROR
    CHECK_DIAGRAM -->|Yes, one| CLAIM
    CHECK_DIAGRAM -->|No| CREATE
    
    CREATE --> DESIGN
    CLAIM --> DESIGN
    DESIGN --> SIGNOFF
    SIGNOFF -->|Approved| DEVELOPMENT
    DEVELOPMENT --> BLOCKERS
    BLOCKERS -->|Yes| DESIGN
    BLOCKERS -->|No| TESTS
    TESTS -->|Yes| PUBLISH
    TESTS -->|No| DESIGN
    
    classDef default fill:#e0e0e0,stroke:#666,color:#000
    classDef approved fill:#FFF9C4,stroke:#F9A825,color:#000
    classDef developed fill:#D5F5D5,stroke:#388E3C,color:#000
    classDef blocker fill:#FFCDD2,stroke:#D32F2F,color:#000
    classDef notes fill:#E3F2FD,stroke:#1976D2,color:#000
    classDef outside fill:#D5F5D5,stroke:#388E3C,stroke-dasharray:5 5,color:#000
    
    class CHECK_DIAGRAM,CREATE,CLAIM,ERROR,SIGNOFF,DESIGN,DEVELOPMENT,BLOCKERS,CHECK_CONTRACT,OPEN,CLARIFY,TRIGGER developed
    class PUBLISH,TESTS outside
```

**1️⃣** Wrapper auto-injects title + phase badge + CSS on first load and watches for change of phase on badge.

**2️⃣** More than one diagram confuses system. For now, only one per md in order to run.

**3️⃣** Checks and publication depend on what and where final product goes, so it's user discretion.

---





## Numbered Notes (1️⃣ 2️⃣ 3️⃣)

**When to use:**

**Pre-execution (design phase):**
- Questions that need discussion
- Trade-offs that need decisions
- Unclear requirements

**During execution:**
- Errors AI can't resolve alone
- Permission needed (destructive action, cost implications)
- Ambiguity in implementation

**Format:**

```markdown
### 1️⃣ [Component Name] - [Issue Title]
**Question/Error:** ...
**Context:** ...
**Options:** A, B, C
**Needed:** Decision / Permission / Help
```

**Notes without numbers = just explanations, turn yellow when approved.**

---

## 🚧 Known Issues / Enhancements Needed

### Remote Access (HTTPS via Tailscale)
**Problem:** Contract diagram reads `.md` files via `file://` protocol (works local, breaks remote).

**Current behavior:**
- Local (Mac): ✅ Works (`http://localhost:8767/?md=../path/to/file.md`)
- Remote (iPad): ❌ Breaks (can't access Mac filesystem via `file://`)

**Solution needed:**
1. **Embed MD in URL** (like CSS inline):
   - Read `.md` content server-side
   - Serve as data/base64 in HTML
   - OR: Pass MD content via query param/POST

2. **OR: Tailscale file access** (if exists):
   - Serve files via Tailscale (not just HTTP proxy)
   - Allow remote devices to read Mac filesystem

**Impact:** Contract diagrams not usable on iPad until fixed.

**Priority:** Medium (OpenClaw remote access works, diagram is nice-to-have)

---

## Localhost Trigger

**Trigger:** "lets diagram [PATH]"

**Assumes:** File at PATH already has mermaid diagram.

**Action:**
1. Start localhost server (port 8767)
2. Open browser with diagram

**Example:**
```
User: "lets diagram epic-notes/webhook-contract.md"

AI executes:
  cd ~/Documents/skills/contract-diagram
  ./serve.sh &
  open "http://localhost:8767/?md=../../epic-notes/webhook-contract.md"
```

**Hot reload enabled by default** (2s interval).

---


---

## 📝 Contract v2.0 Design Session (2026-03-02)

**Goal:** Generalize contract-diagram → contract skill. Support multiple contract types (wireframe, diagram, sequence, etc.)

### Key Decisions

**1. Contract = index.md (not separate file)**
- Every epic has `index.md` = THE CONTRACT
- Located: `~/Documents/backstage/projects/PROJECT/vN.N.N/index.md`
- Frontmatter includes `contract_type: wireframe|diagram|sequence|other`

**2. Glossary = Source of Truth**
- Created: `~/Documents/backstage/glossary.yaml`
- Defines: Project, Epic, Epic Note, Tier, Agent, Squad, Check, Checklist, Checkpoint
- When we say "Project", we mean `~/Documents/backstage/projects/*`

**3. Template Project Created**
- Location: `~/Documents/backstage/projects/template/v0.0.0/`
- Files:
  - `index.yml` (epic metadata with all fields documented)
  - `index.md` (contract template with setup checklist)
- Workflow: Copy template → follow checklist → delete checklist when done

**4. Setup Checklist (in template)**
```markdown
- [ ] Define goal (one sentence)
- [ ] Choose contract type (diagram | wireframe | sequence | other)
- [ ] Define framework (if wireframe: shadcn/ui, etc.)
- [ ] Define tier (infrastructure | product | research)
- [ ] List deliverables
- [ ] Identify dependencies
- [ ] Update index.yml
- [ ] Delete this checklist
- [ ] Delete unused contract type sections
```

**5. Contract Types Supported**

**Diagram:**
- Format: mermaid flowchart
- Use case: workflows, state machines
- Framework: mermaid

**Wireframe:**
- Format: markdown + component references
- Use case: UI design contracts
- Framework: shadcn/ui (or other)
- Example: v2.1.0 Backstage GUI

**Sequence:**
- Format: mermaid sequence diagram
- Use case: API interactions, event flows
- Framework: mermaid

**Other:**
- TBD based on epic goal

### Changes from v1.x

**REMOVE:**
- ❌ Localhost server (serve.sh, server.js, index.html)
- ❌ Hot reload (not needed, Typora handles it)
- ❌ `file://` protocol issues (remote access broken)

**KEEP:**
- ✅ `inject.js` - Inject title + badge + CSS
- ✅ Phase detection (git branch, ROADMAP, CHANGELOG)
- ✅ Mermaid CSS theming

**ADD:**
- ✅ Support multiple contract types (not just diagram)
- ✅ Template workflow (copy → checklist → refine)
- ✅ Glossary integration
- ✅ index.yml metadata schema

### Workflow (Manual - To Be Automated)

**Today's session (wireframe for v2.1.0):**

1. ✅ Created glossary.yaml (source of truth for terms)
2. ✅ Created template project (v0.0.0 with index.md + index.yml)
3. ✅ Added setup checklist to template
4. ✅ Removed "created" field (git knows)
5. 🔄 Opened existing v2.1.0/index.md (wireframe in progress)
6. 🔄 Annotating this session in SKILL.md (for automation)

**Future automation:**
- Detect "criar epic vN.N.N [name]"
- Copy template → new epic folder
- Pre-fill version, name, date
- Open Typora with checklist
- User follows checklist → contract ready

### Next Steps

**Contract v2.0 Spec (Deliverables):**
1. ✅ Glossary (done)
2. ✅ Template (done)
3. 🔄 Wireframe example (v2.1.0 - in progress)
4. ⏳ Update SKILL.md workflow (remove localhost, add types)
5. ⏳ Update inject.js (detect contract_type, apply correct formatting)
6. ⏳ Rename skill: contract-diagram → contract

**Example wireframe being refined:**
- Path: `~/Documents/backstage/projects/backstage/epics/v2.1.0/index.md`
- Type: wireframe
- Framework: shadcn/ui
- Status: Draft (5 ambiguities to resolve)

### Questions/Ambiguities from Today

**Wireframe v2.1.0:**
1. Initial load - which project default?
2. Epic sorting - default column?
3. Tier "all" - semantics?
4. Dialog actions - read-only or "Edit in AI" button?
5. Empty states - what to show?

**Contract skill:**
1. Keep inject.js or replace with simpler logic?
2. How to detect contract_type (frontmatter only)?
3. Skill name: "contract" or keep "contract-diagram"?

---

**Session paused here. Continue refinement + automation next.**

### Wireframe Contract Workflow (2026-03-02)

**Structure:**
- Wireframe contracts use **named blocks** = component names
- Each block describes a UI component (from framework, e.g., shadcn/ui)

**AI Validation Role (before Night Shift approval):**

1. **Validate logic** - Does the idea make sense?
   - Component choices appropriate for use case?
   - Data flow logical?
   - Interactions well-defined?

2. **Suggest improvements** - Based on research/experience
   - Better component for this use case?
   - Missing accessibility considerations?
   - Performance implications?
   - Best practices from framework docs?

3. **Point out ambiguities/confusion** - Set blocker status
   - Undefined behavior (what happens when X?)
   - Missing states (loading, error, empty)
   - Unclear data sources
   - Conflicting requirements
   - Tag with 🔴 or numbered notes (1️⃣, 2️⃣)

4. **Test toolset** - Warn if auth fails
   - Framework docs accessible? (e.g., shadcn/ui)
   - APIs reachable? (if wireframe uses external data)
   - Dependencies available?

5. **Approve** - Ready for Night Shift
   - ✅ Zero ambiguities
   - ✅ All blockers resolved
   - ✅ Toolset tested
   - ✅ Improvements incorporated or documented
   - Status: `approved` (yellow badge)
   - Agent can execute unattended

**Blockers prevent Night Shift execution** until human resolves them.

**Example blocked item:**
```markdown
### 1️⃣ Initial Load - Project Selection
**Question:** Which project selected by default?
**Options:** 
  A) Last used (requires localStorage)
  B) First alphabetical
  C) None (empty state)
**Needed:** Decision from Nicholas
```

**After resolution → remove numbered note → continue validation.**

