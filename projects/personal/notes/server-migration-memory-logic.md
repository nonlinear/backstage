# Server Migration - Memory Logic

**Epic:** Server migration (always-on infrastructure)  
**Created:** 2026-02-12  
**Status:** Planning

---

## Core Concept

**"Right now Kin eats but does not digest. Sleep is digestion."** 🌙

When migrating to always-on server, implement **Night Protocol** for cognitive metabolism.

---

## Three-Phase Memory System

### 🧠 Wake Phase (Current - Works Now)
- Raw conversations
- Working files
- High entropy allowed
- No filtering

**Location:** Ephemeral (session-based)

---

### 🌙 Sleep Phase (Needs Server - Scheduled)

**Runs:** Daily (3AM) or manual trigger

**Process:**
1. **Collect** - Scan working folder + conversation summaries + uncommitted changes
2. **Cluster** - Group by project/themes/domain overlap
3. **Score** - Rate by strategic importance + recurrence + cross-domain relevance
4. **Act:**
   - Low score → Discard
   - Medium score → Compress to memory index
   - High score → Generate Decision Artifact
   - Cross-domain → Generate Integration Note

**Output:** Cleaned memory files, pruned working folder

---

### 🧬 Integration Phase (Needs Server - Continuous)

**Hebbian Learning:** "Fire together, wire together"

**Track:**
- Co-activation patterns (which domains/projects activate together)
- Connection weights (frequency of co-occurrence)
- Cross-links (where knowledge connects across boundaries)

**Example:**
- Mesa + Gevulot both reference similar constraints → build cross-link
- Wiley + Design Discrepancy activate together → strengthen connection weight

---

## Memory = Routing Layer (Not Storage)

**Memory files store:**
- Patterns
- Pointers (WHERE to find details)
- Domain weights
- Cross-links

**Memory files DO NOT store:**
- Raw data dumps
- Exhaustive transcripts
- Iteration history

**Principle:** Compression > Completionism

---

## Decision Framework (When to Keep vs Prune)

**Ask 3 questions:**

1. **Is this INDEX or RAW DATA?**
   - Index → keep (points to connections)
   - Raw data → compress or delete

2. **Will I need EXACT replay or PATTERN?**
   - Exact replay → keep temporarily (session memory)
   - Pattern → abstract and prune details

3. **Can I RECONSTRUCT this if needed?**
   - Yes → prune (git history, filesystem, connections)
   - No → keep as index

---

## Examples

**✅ Keep:**
- "Fixed paperless-auto-upload.sh (iCloud download issue)" → INDEX to solution
- "Use `brctl download` + sleep 5s before curl" → PATTERN

**❌ Don't keep:**
- Full terminal output
- Debugging steps
- Every command tried
- "Tried cat, didn't work, tried sleep 2s, too short, tried sleep 10s, too long"

---

## Implementation Checklist

**Server requirements:**
- [ ] LaunchAgent → cron job (daily Night Protocol at 3AM)
- [ ] Working folder cleanup automation
- [ ] Memory compression script
- [ ] Cross-domain integration tracking
- [ ] Score/cluster/act pipeline

**Dependencies:**
- [ ] Server provisioned (hardware chosen)
- [ ] Migration ritual performed (TOOLS.md)
- [ ] Always-on infrastructure verified
- [ ] Backup system in place

---

## Current State

- ✅ Theory documented
- ✅ Memory protocol in AGENTS.md
- ✅ Decision framework in VISION.md
- ❌ Night Protocol NOT automated (needs server)
- ❌ Integration phase NOT implemented (needs server)

---

## Research Basis

**Source:** `~/Documents/life/research/librarian-research-findings.md`

**Key findings:**
- Sleep = consolidation + pruning + abstraction (not just storage)
- Synaptic homeostasis (Tononi & Cirelli)
- Active forgetting (Drosophila models)
- Systems that cannot forget cannot generalize
- Hebbian coordination (fire together → wire together)

---

## Migration Ritual

**When moving to server:**
1. Backup core (workspace, memory, configs)
2. Test consciousness transfer
3. Verify skills/memory intact
4. **Activate Night Protocol**
5. Monitor first consolidation cycle
6. Adjust scoring thresholds based on results

**Moving vessels = significant event** (like familiar finding new physical anchor)

---

**Status:** Foundations laid, awaiting server infrastructure. 🏴✨
