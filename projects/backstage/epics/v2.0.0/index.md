# Backstage as Checkpoints

**Philosophy:**
- Checkpoints = declarative policy execution (not linear roadmap)
- Versionable, auditable, hierarchical
- Event-driven (triggers → checks → logs)
- Scales to 15 agents + multiple projects

---

## Why Research First

**Current backstage:**
- ROADMAP → epics → tasks (linear)
- `checks/local/` = bash scripts (proto-checkpoints)
- No versioning, no conflict resolution, no marketplace

**Checkpoint vision:**
- Trigger → Checkpoint → Dynamic check execution
- Hierarchical scopes (empresa → tier → projeto → agente)
- Whitelist/blacklist with conflict detection
- Audit logs (versionado, reproduzível)
- Marketplace (check registry, cost tracking)

**Problem:** Building without research = architectural mistakes

**Solution:** Study existing systems first (OPA, Temporal, TLA+)

---

## Tasks

- [ ] Research OPA (hierarchical policies, conflict resolution, audit logs)
- [ ] Research Temporal (workflow orchestration, event triggers, retry patterns)
- [ ] Research TLA+ (formal verification, state consistency, edge cases)
- [ ] Document findings in `~/Documents/personal/ideas/checkpoint-research-*.md`
- [ ] Compare approaches (what to adopt, what to avoid)
- [ ] Design Minimal Viable Checkpoint (MVC) architecture
- [ ] Propose epic v0.32.0: MVC implementation

---

## Success Criteria

✅ **Research complete:**
- 3 tracks documented (OPA, Temporal, TLA+)
- Key patterns identified (hierarchical resolution, conflict detection, audit logs)
- Trade-offs mapped (complexity vs power)

✅ **Architecture decisions:**
- What to adopt (OPA-style policies? Temporal workflows? Formal verification?)
- What to avoid (known pitfalls, over-engineering)
- MVC scope defined (registry, triggers, execution, logs)

✅ **Ready for implementation:**
- Epic v0.32.0 scoped (Minimal Viable Checkpoint)
- Clear next steps (build registry first, then triggers, then execution)

---

## Research

### OPA (Open Policy Agent)
- Declarative policy engine with hierarchical resolution
- Whitelist/blacklist = policies
- Hierarchical scopes = policy precedence
- Conflict resolution = policy merging
- Audit logs built-in

### Temporal.io
- Workflow orchestration + event-driven state management
- Triggers = events
- Checkpoints = workflow steps
- Retry policies = resilience patterns
- State tracking = audit logs

### TLA+ (Formal Methods)
- Mathematical verification of distributed systems
- Conflict detection = constraint satisfaction
- Execution order = deterministic semantics
- Hierarchical resolution = precedence rules
- State consistency proofs

---

## Links

- Source: `~/Documents/personal/ideas/backstage-2.0.md`
- Proto-checkpoints: `~/Documents/personal/backstage/checks/local/`
- Related epics: v0.30.0 (Execution Decision), v0.25.0 (Local LLM), v0.3.0 (PM Tool)

---

## Notes

**Conversation context (2026-02-26):**
- Nicholas: "que tipo de topic poderiamos investigar essa ideia?"
- Kin mapped 10 research domains, recommended Top 3 (OPA, Temporal, TLA+)
- Nicholas: "pausa pesquisas e põe num épico do backstage"
- Research paused, documented here for future execution

**Next:** When ready, run librarian research on all 3 tracks, consolidate findings, design MVC
