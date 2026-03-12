# Server Migration

Migrate OpenClaw from MacBook M3 → always-on server.

---

## Memory Logic - Night Protocol

**Core concept:** "Right now Kin eats but does not digest. Sleep is digestion." 🌙

**When server is always-on:** Implement Night Protocol for cognitive metabolism.

---

## Three-Phase Memory System

### 🧠 Wake Phase (Active Sessions)
- Raw conversations
- Working files
- High entropy allowed
- No filtering

**Location:** Ephemeral (session-based)

---

### 🌙 Sleep Phase (Daily 3AM)

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

### 🧬 Integration Phase (Continuous)

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

## Decision Framework

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

## Migration Status

- ✅ Server migration complete (MacBook M3 → Mac Studio)
- ✅ OpenClaw running 24/7
- ✅ Files synced, skills/memory intact
- ✅ Remote access working (Tailscale)
- ❌ Night Protocol NOT automated (needs LaunchAgent)
- ❌ Integration phase NOT implemented (needs tracking)
