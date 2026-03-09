# v3.1.0 - Agent Placeholders

## Goal

Build agent infrastructure with values injection and governance.

## Philosophy

**Agents = Domain Specialists**
- 21 agents across 7 squads
- Each with: identity, values, skills, memory, journal
- Values auto-inject (global → squad → agent)

**Values = Policies (Enforceable)**
- Not aspirational - deterministic/probabilistic checks
- Bidirectional enforcement (agents ↔ Nicholas)
- Evolution: vague → precise through practice

**Backstage = Agent OS**
- Runtime injection (resolve YAML references)
- Anti-drift monitoring (detect violations)
- Governance dashboard (visualize alignment)

## Approach

### 1. Values Compaction
**Problem:** 20 files, 6074 words - redundant

**Solution:**
- Delete raw material (pillars-transcript.md)
- Merge overlapping concepts (parity + no-ambiguity, jit-internal + jit-external, gestalt + wayfinding)
- DRY frontmatter

**Result:** 16 files, 2633 words (-57%)

### 2. Squad Structure
**Created:** 7 squads with `squad.yaml`
- meta, design, engineering, marketing, resources, personal, support
- Each with: value suggestions, agent list, shared resources

### 3. Agent Placeholders
**Created:** 21 agents with complete structure
- agent.yaml (config: model, values refs, library, skills, checks, APIs)
- IDENTITY.md (purpose, domain, capabilities)
- values/, skills/, memory/, journal/ folders

**Data source:** `ai-agents-domains.md` (domain mapping table)

### 4. Hierarchy Flattening
**Before:** `~/Backstage/squads/<squad>/agents/<agent>/` (too nested)  
**After:** `~/Backstage/agents/<squad>/<agent>/` (cleaner)

**Reason:** Squad config in `squads/`, agents in `agents/` (separation of concerns)

### 5. Values Injection Architecture

**Auto-inject model:**
```yaml
# agent.yaml - DON'T list global/squad (injected automatically)
values:
  - agent/specific-value  # Only agent-specific
```

**Resolution order:** agent > squad > global (most specific wins)

**Future:** Blacklist support (squad can disable global value)

### 6. Anti-Drift Monitoring

**Checks:**
- Deterministic (e.g., `wc -w < 200` for brevity)
- Probabilistic (LLM: "Does commit explain WHY?")
- Parity (docs ↔ system alignment)

**When drift detected:**
- Alert Nicholas (Telegram, Backstage UI)
- Lock agent (prevent execution until review)
- Log violation (audit trail)

**Never auto-fix** - human decides: override, reject, or refine value

## Commits (on branch v3.1.0)

1. `e06cc42` - Before values/ compactation: 20 files, 6074 words
2. `371a38a` - Delete pillars-transcript.md (-3011 words)
3. `fd21fb8` - Merge parity.md + no-ambiguity.md → parity-contract.md
4. `3a3a668` - Merge jit-internal.md + jit-external.md → jit.md
5. `83b2519` - Merge gestalt.md + wayfinding.md → visual-hierarchy.md
6. `6542148` - DRY frontmatter
7. `fbc50b8` - Create squad structure (7 squads)
8. `2451ac0` + `1a81e8a` - Create 21 agent placeholders
9. `4efccfb` + `cebc0ba` - Flatten hierarchy (agents moved)
10. `81b4319` - Document governance architecture
11. `1de3239` - Update design squad.yaml (remove redundant values)

## Status

**In Progress** (branch `v3.1.0`)

**Remaining:**
- [ ] Identify global vs squad-specific values (analysis done)
- [ ] Move squad-specific values from global to squads/
- [ ] Update remaining 6 squad.yaml files
- [ ] Implement values injection in Backstage runtime
- [ ] Implement anti-drift monitoring
- [ ] Build governance dashboard UI

## Documentation

- `~/Backstage/docs/agent-governance-architecture.md` - Full specification
- Scripts: `create-squad-structure.sh`, `create-agents.sh`
