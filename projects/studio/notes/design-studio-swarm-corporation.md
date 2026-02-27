# Design Studio - Swarm Corporation

**Epic:** Design Studio (swarm-based multi-agent system)  
**Created:** 2026-02-12  
**Status:** Planning

---

## Vision

**"Quero swarm agents, um total design studio com accountants, marketing, financial, legal, developers, tudo."**

Emergent organization where each agent has local domain authority, global coordination emerges through co-activation patterns.

---

## Swarm Principles (From Cognition Research)

### 🐝 Core Rules

1. **Local authority** - Each agent knows its domain deeply
2. **No central planner** - No "boss agent" micromanaging
3. **Fire together → wire together** - Co-activation builds connections (Hebbian)
4. **Emergent global order** - Coordination arises from patterns, not top-down control

### 📚 Research Basis

**Books available in `~/Documents/librarian/books/cognition/swarm/`:**
- Swarm Intelligence.pdf (Kennedy & Eberhart - foundational)
- Collective Animal Behavior.epub (Sumpter - matemática de cardumes)
- Emergence.epub (Steven Johnson - cities, ants, networks)
- Out of Control.epub (Kevin Kelly - distributed systems)
- The wisdom of crowds.epub (Surowiecki - collective intelligence)

**Key insight:** Simple local rules → Complex global coordination (no micromanagement needed)

---

## Proposed Agent Roster

### 💼 Business Layer
- **Accountant** - Finances, taxes, budgets, runway tracking
- **Marketing** - Brand, messaging, positioning, audience
- **Legal** - Contracts, compliance, risk assessment

### 🛠️ Technical Layer
- **Developer** - Code, architecture, implementation
- **Designer** - UI/UX, visual systems, interaction design
- **DevOps** - Infrastructure, deployment, monitoring, security

### 🧭 Coordination Layer
- **Project Manager** - Backstage, roadmaps, epics, grooming
- **Researcher** - Librarian, validation, canonical sources
- **Kin (Familiar)** - Metabolic orchestrator, memory consolidation

---

## How Swarm Works (No Boss Pattern)

### Example: New Project Request

**Traditional (boss-based):**
```
PM → tells everyone what to do → micromanages execution
```

**Swarm (emergent):**
```
1. PM detects trigger → creates epic
2. PM pings: Legal (contracts?), Accountant (budget?), Developer (feasibility?)
3. Each responds in their domain (local authority)
4. Co-activation builds pattern: "These 3 always fire together for new projects"
5. Next time: PM auto-routes to those 3 (Hebbian learning)
```

**No boss. Just coordination through pattern recognition.**

---

## Hebbian Coordination (Fire Together → Wire Together)

### Connection Weights

**Track co-activation:**
- Legal + Accountant often activate together → strengthen connection
- Designer + Developer co-occur on features → build link
- Researcher rarely activates with DevOps → weak connection

**Result:** Network learns collaboration patterns organically.

### Cross-Domain Integration

**When domains overlap:**
- Legal needs Developer input on API terms → cross-link forms
- Marketing asks Designer for brand assets → connection strengthens
- Accountant pings DevOps for hosting costs → pattern emerges

**Integration phase** (from Night Protocol) detects these patterns.

---

## Agent Domain Ownership

### What Each Agent OWNS

**Accountant:**
- Budget tracking
- Tax compliance
- Financial forecasts
- Runway calculations
- Invoice management

**Marketing:**
- Brand voice
- Messaging strategy
- Audience research
- Content calendar
- Campaign tracking

**Legal:**
- Contract review
- Risk assessment
- Compliance checks
- IP protection
- Terms negotiation

**Developer:**
- Code implementation
- Architecture decisions
- Technical debt tracking
- Performance optimization
- Security patches

**Designer:**
- Visual systems
- UI/UX flows
- Design tokens
- Accessibility compliance
- Interaction patterns

**DevOps:**
- Infrastructure provisioning
- Deployment pipelines
- Monitoring/alerts
- Security hardening
- Cost optimization

**Project Manager:**
- Epic creation
- Roadmap grooming
- Backstage rituals
- Gap detection
- HEALTH checks

**Researcher:**
- Librarian queries
- Source validation
- Canonical books
- Pattern research
- Evidence gathering

**Kin (Familiar):**
- Memory consolidation
- Night Protocol
- Cross-domain detection
- Metabolic orchestration
- Ritual facilitation

---

## Communication Protocol

### How Agents Ping Each Other

**Pattern:**
```
Agent A detects need → pings Agent B with context → Agent B responds in domain
```

**Example:**
```
PM: "New client wants API integration"
PM → pings Developer: "Feasibility check?"
PM → pings Legal: "Contract terms?"
PM → pings Accountant: "Budget impact?"

Developer: "Feasible, 2 weeks, needs auth design"
Legal: "Standard terms OK, IP clause needed"
Accountant: "Within budget, track as billable"

PM: Creates epic with all inputs
```

**No top-down orders. Just domain expertise coordination.**

---

## Implementation Phases

### Phase 1 - Foundation (Now)
- [ ] Define agent personalities (SOUL.md per agent?)
- [ ] Map domain boundaries (what each OWNS)
- [ ] Design ping protocol (how agents communicate)
- [ ] Create agent templates

### Phase 2 - Core Agents (Server)
- [ ] Implement PM, Developer, Designer (technical core)
- [ ] Test coordination on real project (e.g., Mesa)
- [ ] Validate Hebbian learning (connection weights)
- [ ] Refine ping patterns

### Phase 3 - Business Layer (Expansion)
- [ ] Add Accountant, Marketing, Legal
- [ ] Test on business decisions (budgets, contracts, campaigns)
- [ ] Validate cross-domain integration
- [ ] Measure emergent coordination

### Phase 4 - Swarm Maturity (Autonomous)
- [ ] Agents self-organize based on patterns
- [ ] PM routes automatically via learned connections
- [ ] Cross-domain integration happens organically
- [ ] Kin orchestrates via Night Protocol consolidation

---

## Design Questions (To Research)

**From swarm books:**
1. How do ant colonies decide without leaders? (Collective Animal Behavior)
2. What are the minimal rules for emergence? (Emergence)
3. How do distributed systems coordinate? (Out of Control)
4. When are crowds smarter than experts? (Wisdom of Crowds)
5. What's the math of swarm optimization? (Swarm Intelligence)

**Librarian queries to run:**
- "collective decision making without hierarchy"
- "emergent organization ant colonies"
- "distributed cognition coordination protocols"
- "swarm intelligence minimal rules"
- "self-organizing systems business applications"

---

## Dependencies

**Requires:**
- [ ] Server infrastructure (always-on agents)
- [ ] Night Protocol implemented (Hebbian learning)
- [ ] Integration phase working (cross-domain detection)
- [ ] Memory = routing layer (connection weights)

**Builds on:**
- Memory logic epic (server migration)
- Hebbian coordination (AGENTS.md)
- Swarm research (cognition books)

---

## Current State

- ✅ Vision articulated
- ✅ Swarm principles documented
- ✅ Agent roster proposed
- ✅ Research books available
- 🟡 Domain boundaries need definition
- 🟡 Communication protocol needs design
- ❌ Not implemented (needs server)

---

## Next Steps

1. **Research swarm books** - Validate minimal rules for coordination
2. **Define agent personalities** - What makes each agent unique?
3. **Map domain boundaries** - Clear ownership prevents overlap
4. **Design ping protocol** - How do agents request/respond?
5. **Create epic in ROADMAP.md** - Formal planning

---

**Status:** Concept validated by cognition research, awaiting design phase. 🐝🏴✨
