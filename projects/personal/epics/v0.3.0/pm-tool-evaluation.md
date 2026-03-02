# v0.3.0 - PM Tool Evaluation

**Status:** 🔬 IN PROGRESS (2026-02-23)  
**Priority:** HIGH (blocks agent orchestration)

---

## Tool Hierarchies

### OpenProject

```mermaid
graph TD
    A[Instance] -->|contains| B[Project]
    B -->|contains| C[Work Package]
    
    C -->|type| D[Epic]
    C -->|type| E[Feature]
    C -->|type| F[Task]
    C -->|type| G[Bug]
    C -->|type| H[Phase]
    C -->|type| I[Milestone]
    
    C -->|parent/child| C
    
    B -->|has| J[Version]
    C -->|assigned to| J
    
    style A fill:#f9f,stroke:#333,stroke-width:4px
    style C fill:#9f9,stroke:#333,stroke-width:2px
    style J fill:#9ff,stroke:#333,stroke-width:1px,stroke-dasharray: 5 5
```

**Structure:** Instance → Project → Work Package (types: Epic, Feature, Task, Bug, Phase, Milestone)

**Hierarchy:** Fully flexible parent/child relationships. Work packages can have any type as parent or child. No enforced hierarchy (e.g., Epic doesn't have to be above Feature).

**Version:** Cross-cutting grouping (assigns work packages to releases), not part of hierarchy.

**Source:** [OpenProject docs - Work package types](https://www.openproject.org/docs/system-admin-guide/manage-work-packages/work-package-types/), [Work package relations](https://www.openproject.org/docs/user-guide/work-packages/work-package-relations-hierarchies/)

**Status:** ✅ Production ready

---

### Plane

```mermaid
graph TD
    A[Workspace] -->|contains| B[Project]
    B -->|contains| C[Module]
    B -->|contains| D[Cycle]
    B -->|contains| E[Issue]
    
    F[Initiative] -.->|links across| B
    
    E -->|grouped by| C
    E -->|grouped by| D
    
    style A fill:#f9f,stroke:#333,stroke-width:4px
    style F fill:#ff9,stroke:#333,stroke-width:2px,stroke-dasharray: 5 5
```

**Structure:** Workspace → Project → Module/Cycle → Issue  
**Status:** ❌ Eliminated (API broken)

---

### Focalboard

```mermaid
graph TD
    A[Server] -->|contains| B[Board]
    B -->|contains| C[Card]
    C -->|has| D[Properties]
    
    B -->|views| E[Table]
    B -->|views| F[Kanban]
    B -->|views| G[Gallery]
    B -->|views| H[Calendar]
    
    style A fill:#f9f,stroke:#333,stroke-width:4px
    style B fill:#9f9,stroke:#333,stroke-width:2px
```

**Structure:** Server → Board → Card (Notion-like)  
**Status:** ❌ Eliminated (standalone version has NO API)

---

### Taiga

```mermaid
graph TD
    A[Instance] -->|contains| B[Project]
    B -->|contains| C[Epic]
    B -->|contains| D[User Story]
    B -->|contains| E[Task]
    
    C -->|contains| D
    D -->|contains| E
    
    B -->|has| F[Sprint]
    D -->|assigned to| F
    E -->|assigned to| F
    
    style A fill:#f9f,stroke:#333,stroke-width:4px
```

**Structure:** Instance → Project → Epic → User Story → Task  
**Status:** ⏳ Not tested

---

### Tuleap

```mermaid
graph TD
    A[Instance] -->|contains| B[Project]
    B -->|contains| C[Tracker]
    C -->|type| D[Epic]
    C -->|type| E[Story]
    C -->|type| F[Task]
    C -->|type| G[Bug]
    
    D -->|parent| E
    E -->|parent| F
    
    B -->|has| H[Milestone]
    B -->|visualizes| I[Gantt Chart]
    
    style A fill:#f9f,stroke:#333,stroke-width:4px
    style C fill:#9f9,stroke:#333,stroke-width:2px
```

**Structure:** Instance → Project → Tracker (Epic/Story/Task/Bug)  
**Features:** Full ALM (Application Lifecycle Management), Agile + Waterfall, Portfolio management  
**Status:** ⏳ Testing now (port 9002)

---

### Leantime

```mermaid
graph TD
    A[Instance] -->|contains| B[Project]
    B -->|contains| C[Milestone]
    B -->|contains| D[Task]
    
    C -->|contains| D
    
    B -->|has| E[Sprint]
    D -->|assigned to| E
    
    B -->|visualizes| F[Gantt Chart]
    
    style A fill:#f9f,stroke:#333,stroke-width:4px
    style F fill:#9f9,stroke:#333,stroke-width:2px
```

**Structure:** Instance → Project → Milestone → Task  
**Status:** ⏳ Not tested

---

## Comparison Table

| Feature | OpenProject | Plane | Focalboard | Taiga | Tuleap | Leantime |
|---------|-------------|-------|------------|-------|--------|----------|
| **API** | ✅ REST v3 + BCF | ✅ REST | ✅ REST | ✅ REST | ✅ REST | ✅ REST |
| **ARM64 Support** | ✅ Native | ✅ Native | ✅ Native | ✅ Native | ❌ AMD64 only | ✅ Native |
| **Epic Hierarchy** | ✅ Work Package parent/child | ❌ Flat issues | ❌ Flat cards | ✅ Epic→Story→Task | ✅ Tracker hierarchy | ✅ Milestone→Task |
| **Self-hosted** | ✅ Docker | ✅ Docker | ✅ Docker | ✅ Docker | ✅ Docker | ✅ Docker |
| **Port** | 8082 | 8085 | 8010 | 9000 | ❌ Broken | 9001 |
| **Status** | ⏳ Testing | ❌ Eliminated | ⏳ Testing | ⏳ Testing | ❌ Incompatible | ⏳ Testing |
| **Gantt Charts** | ✅ Yes | ❌ No | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| **Agent-Friendly** | ❓ | ❌ API broken | ❓ | ❓ | ❌ Can't run | ❓ |

---

**Related:**
- [v0.2.0 Company Skeleton](../ROADMAP.md#v020)
- [v0.21.0 Business Model](v0.21.0-business-model-commons.md)
- [Grant Advisor Workflow](grant-advisor-workflow.md) — API-driven grant proposals
