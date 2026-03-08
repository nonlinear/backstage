# Epic Notes

> Version, name, status → see `index.yml`

---

# v0.3.0 - Agents First Pass

**Goal:** First working multi-agent system with communication + memory

**Why now:** Studio needs multiple agents (defense, secretaria, research, etc.) working together. Foundation = define roles, wire up comms, solve memory.

---

## Contract

### Agents to Create

1. **Defense** (assisted) - code + design iteration
2. **Secretaria** (assisted) - clerical, scheduling, admin
3. **Research** (unassisted) - deep work, investigation
4. **UXR** (unassisted) - user research
5. **Legal** (unassisted) - contracts, compliance
6. **Marketing** (unassigned) - content, brand
7. **Design** (unassisted) - creative work
8. **Strategic** (cloud) - epic planning, architecture

### Vision Explosion

- Separate `VISION.md` per agent (not one generic file)
- Shared principles (anarchism, anti-surveillance) vs agent-specific (defense = cautious, research = bold)

### Backstage Integration

- Surface agents on UI (status dashboard, spawn controls, task queue)
- Agent routing (skill-based, context-based)

### Matrix Communication

- Set up Matrix server (agent comms backbone)
- Room per project (studio, librarian, wiley, etc.)
- Agent-to-agent DMs
- Test actionable things (delegation, notifications)

### Memory Architecture

- Review solutions (shared vs isolated memory)
- Hebbian principle (fire together, wire together)
- Consolidation cycles (night protocol)
- Pruning strategy

---

## Tasks

- [x] List all agents (roles, capabilities, models) → `agents-matrix.md`
- [x] Create agent configs (agent.yml) → `agent-configs-created.md`
- [x] Customize SOUL.md for Defense, Secretaria, Strategic, Research, UXR, Legal, Design → `soul-customization.md`
- [x] Define shared vs agent-specific principles → `VISION-SHARED.md` + agent VISION.md
- [ ] Surface agents on Backstage UI (verify /api/agents picks up new agents)
- [ ] Agent routing (skill + context based)
- [ ] Set up Matrix server
- [ ] Test Matrix actionable things
- [ ] Review memory solutions
- [ ] Decision: Memory strategy

---

## Success Criteria

**Minimum viable:**
- Agents defined (roles, capabilities, models documented)
- Matrix working (agents can communicate)
- Backstage shows agent status
- Memory strategy decided

**Stretch:**
- Agents autonomously collaborate on task
- Memory consolidation automated

---

## Open Questions

1. Matrix vs other comms? (Discord, Telegram, custom protocol?)
2. Agent isolation? (separate OpenClaw instances, or shared?)
3. Supervision model? (Nicholas oversees all, or agents semi-autonomous?)
4. Cost management? (local models for unassisted, cloud for strategic only?)

---

## Log

**2026-03-08 14:00:** Epic created.  
**2026-03-08 14:22:** UNSUPERVISED session started.  
**2026-03-08 14:25:** Agents matrix documented, configs created, SOUL.md customized.  
**2026-03-08 14:35:** VISION.md shared + agent-specific completed (all 7 agents). Next: Backstage UI integration.
