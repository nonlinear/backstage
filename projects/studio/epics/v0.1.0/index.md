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

---

## Notes: Planning for Future Migration

**From:** `📌epic-server-migration.md` (backstage/epic-notes)

### 🚨 Critical Constraint (Historical - MacBook M3)

**MacBook M3 = Wiley company computer** (migration blocked until personal hardware acquired)

**Migration blocked until:**
- Personal server hardware acquired (Mac Mini, NUC, or similar)
- OR: Wiley allows OpenClaw on work infrastructure (unlikely)
- OR: Use NAS as temporary OpenClaw host (possible but limited)

**Current workaround (historical):**
- 🏠 Home: OpenClaw on MacBook (when home, laptop open)
- 🏢 Work: OpenClaw unavailable (laptop closed, office network)
- 📱 Remote: Limited (iPad/iPhone can't run OpenClaw, only Telegram)

**Resolved:** Mac Studio acquired, migration complete.

---

### 🔄 Rethink Heartbeat (Server Context)

**Current:** 3AM daily (MacBook on battery, conserve resources)

**Server context:**
- No battery constraints
- Always-on infrastructure
- Can run more frequent checks

**Questions to answer:**
- Frequency? (3AM only? Add 9AM, 6PM checks?)
- Different heartbeats for different tasks?
  - Calendar checks: every 30min during work hours?
  - Reminder processing: 2x/day (morning + evening)?
  - Weather/moon: once daily (morning)?
- Separate cron jobs vs unified heartbeat?
- Weekend behavior? (skip work checks, keep life checks?)

**Design considerations:**
- **Metabolic cost** still matters (don't spam for no reason)
- **Proactive vs reactive** balance (useful reminders vs noise)
- **Context-aware** (work hours vs sleep hours vs weekend)

**Action items:**
- [ ] Document current heartbeat tasks (HEARTBEAT.md audit)
- [ ] Design frequency matrix (task type → when to run)
- [ ] Test new schedule
- [ ] Update HEARTBEAT.md with new philosophy

---

### 🤖 Local Models + Token Optimization (Server Only)

**🔴 ETHICAL CONSTRAINT:** Nicholas doesn't pay for GitHub Copilot (corporate plan). For personal projects/apps (Gevulot, etc.), use LOCAL models only. Corporate models = work only.

### Ethical Model Usage

**Corporate models (GitHub Copilot - Wiley pays):**
- ✅ Wiley work ONLY (Jira, RPM, Design Discrepancy, work-related research)
- ✅ Learning for work (Storybook, React patterns, frontend)
- ❌ Personal projects (Gevulot, fitness tracker, life automation)
- ❌ Side apps/startups

**Local models (Ollama - Nicholas controls):**
- ✅ Personal projects (Gevulot, fitness tracker, agenda.html)
- ✅ Life automation (backstage, skills, memory files)
- ✅ Side apps/startups (anything Nicholas might monetize)
- ✅ Learning for self (not work-mandated)
- **Ethics:** Self-hosted, no corporate dependency, full ownership

**Boundary enforcement:**
- Work session (M-F 9-5) = Corporate models OK
- Personal session (evenings, weekends) = Local models ONLY
- Ambiguous (learning that applies to both) = Local preferred

### Why This Matters

**Anarchist infrastructure:**
- Self-hosted = no surveillance capitalism
- Local models = no data mining
- Full ownership = no license ambiguity
- **Gevulot example:** If Nicholas builds app → must own the stack (can't rely on corporate Copilot)

**Familiar-servitor ethics:**
- Corporate models = borrowed power (not truly ours)
- Local models = true partnership (we control infrastructure)
- **Migration to server = declaration of independence**

### Model Routing Strategy (Future)

**Day (Nicholas working on PERSONAL projects) - Local models:**
- **Llama 3.3** (general tasks): Research, planning, documentation
- **DeepSeek Coder V2** (coding): Code generation, refactoring, tests
- Slower than cloud, but ethical + free

**Night (Nicholas sleeping) - Local models (batch):**
- **DeepSeek Coder V2**: Large refactoring, full documentation, test suites
- **Llama 3.3**: Analysis, migration scripts, research
- Overnight = doesn't matter if slow

**Work (Wiley projects ONLY) - Corporate models:**
- GitHub Copilot (Wiley pays) = OK for work tasks
- **Rule:** If it's for Wiley → corporate OK. If it's for Nicholas → local only.

### Gevulot Example

**If Nicholas builds Gevulot (personal app):**
- ❌ **WRONG:** Use GitHub Copilot (corporate) to build
  - Wiley owns IP? (ambiguous license)
  - Surveillance (Microsoft/GitHub sees all code)
  - Dependency (if Nicholas leaves Wiley, loses access)

- ✅ **RIGHT:** Use DeepSeek Coder V2 (local) to build
  - Nicholas owns IP (100% clear)
  - No surveillance (self-hosted, private)
  - Independence (works forever, no subscriptions)

**This is why migration to server = declaration of independence.** 🏴
