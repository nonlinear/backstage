# Epic Notes

> Version, name, status → see `epic.yaml`

---

# v0.31.0 - Checkpoint System Research



## Goal

Research architectural patterns for **Backstage 2.0 checkpoint system** before implementation.

**Philosophy:**
- Checkpoints = declarative policy execution (not linear roadmap)
- Versionable, auditable, hierarchical
- Event-driven (triggers → checks → logs)
- Scales to 15 agents + multiple projects


## Why Research First

**Current backstage:**
- ROADMAP → epics → tasks (linear)
- `checks/local/` = bash scripts (proto-checkpoints)
- No versioning, no conflict resolution, no marketplace

**Checkpoint vision (from backstage-2.0.md):**
- Trigger → Checkpoint → Dynamic check execution
- Hierarchical scopes (empresa → tier → projeto → agente)
- Whitelist/blacklist with conflict detection
- Audit logs (versionado, reproduzível)
- Marketplace (check registry, cost tracking)

**Problem:** Building without research = architectural mistakes

**Solution:** Study existing systems first (OPA, Temporal, TLA+)


## Research Tracks

### 1. Open Policy Agent (OPA)

**What:** Declarative policy engine with hierarchical resolution

**Why relevant:**
- Whitelist/blacklist = policies
- Hierarchical scopes = policy precedence
- Conflict resolution = policy merging
- Audit logs built-in

**Questions:**
- How does OPA handle conflict resolution?
- Versioning policies?
- Performance at scale (100s of checks)?
- Integration patterns (CLI, API, embedded)?

**Output:** `~/Documents/personal/ideas/checkpoint-research-opa.md`


### 2. Temporal.io

**What:** Workflow orchestration + event-driven state management

**Why relevant:**
- Triggers = events
- Checkpoints = workflow steps
- Retry policies = resilience patterns
- State tracking = audit logs

**Questions:**
- How to model checkpoint workflows?
- Dependency graphs (DAGs)?
- Retry strategies for probabilistic checks?
- Cost tracking (time, resources)?

**Output:** `~/Documents/personal/ideas/checkpoint-research-temporal.md`


### 3. Formal Methods (TLA+)

**What:** Mathematical verification of distributed systems

**Why relevant:**
- Conflict detection = constraint satisfaction
- Execution order = deterministic semantics
- Hierarchical resolution = precedence rules
- State consistency proofs

**Questions:**
- Can we model checkpoint resolution formally?
- Prove no deadlocks / conflicts?
- Edge cases (horizontal conflict, circular deps)?
- Verification tools (model checking)?

**Output:** `~/Documents/personal/ideas/checkpoint-research-formal.md`


## Tasks

- [ ] Research OPA (hierarchical policies, conflict resolution, audit logs)
- [ ] Research Temporal (workflow orchestration, event triggers, retry patterns)
- [ ] Research TLA+ (formal verification, state consistency, edge cases)
- [ ] Document findings (`~/Documents/personal/ideas/checkpoint-research-*.md`)
- [ ] Compare approaches (what to adopt, what to avoid)
- [ ] Design Minimal Viable Checkpoint (MVC) architecture
- [ ] Propose epic v0.32.0: MVC implementation


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


## Notes

**Conversation context (2026-02-26):**
- Nicholas asked: "que tipo de topic poderiamos investigar essa ideia?"
- Kin mapped 10 research domains, recommended Top 3 (OPA, Temporal, TLA+)
- Nicholas: "pausa pesquisas e põe num épico do backstage"

**Research paused, documented here for future execution.**

**Next:** When ready, run librarian research on all 3 tracks, consolidate findings, design MVC.


## Related Epics

- **v0.30.0:** Execution Decision Protocol (precursor to checkpoints)
- **v0.25.0:** Local LLM Infrastructure (agents need governance)
- **v0.3.0:** PM Tool Evaluation (roadmap management, migration context)


## References

**Source material:**
- `~/Documents/personal/ideas/backstage-2.0.md` (checkpoint architecture discussion)
- `~/Documents/personal/backstage/checks/local/` (proto-checkpoint scripts)
- AGENTS.md analysis (Top 3 research areas mapped)

**Future output:**
- `checkpoint-research-opa.md`
- `checkpoint-research-temporal.md`
- `checkpoint-research-formal.md`
# Modes - Execution Context Framework

**Purpose:** Define execution modes for agent workflows and task processing


## What Are Modes?

**Modes** define the execution context for agent work, determining:
- **Supervision level** (supervised vs unsupervised)
- **Interface type** (device vs desktop)
- **Execution environment** (local vs remote, headless vs UI)
- **Approval requirements** (manual gates vs automatic pass-through)

**Philosophy:** Modes = runtime metadata that tells agents HOW to execute, not WHAT to execute.


## Mode Dimensions

### 1. Supervision Mode

**Supervised (Assisted):**
- Human present during execution
- Can correct/guide in real-time
- Lower reasoning requirements (faster models OK)
- Examples: Defense agent (Nicholas iterating), Secretaria (clerical work)
- Models: Qwen 7B (Secretaria), Qwen 32B (Defense)

**Unsupervised (Unattended):**
- Agent works alone (night shift, batch jobs)
- Needs high reasoning (decide independently, detect problems)
- Must handle blockers gracefully (report, don't break)
- Examples: Development, UXR, Legal, Marketing, Design
- Models: Qwen 32B (code), Qwen 72B (text/vision)

**Strategic:**
- Complex decisions, epic planning, >32k context
- Human-in-loop for major decisions
- Model: Claude Sonnet 4.5 (cloud, GitHub Copilot subscription)


### 2. Interface Mode

**Device:**
- Mobile/tablet interface (iOS, Android)
- Touch-first, limited screen real estate
- Voice-friendly (Siri shortcuts, audio input)
- Examples: iPad workflow, iPhone notifications

**Desktop:**
- Full keyboard/mouse, large screen
- Multi-window, terminal access
- Browser automation, localhost servers
- Examples: Mac Studio workstation, development work


### 3. Execution Environment

**Local:**
- Runs on Mac Studio (M4 Max, 64GB RAM)
- Full filesystem access
- Docker containers, localhost ports
- Examples: OpenProject, Kavita, contract-diagram

**Remote (Tailscale):**
- Accessible via MagicDNS (studio.adal-rigel.ts.net)
- HTTPS required for iOS PWAs
- Limited to exposed services
- Examples: OpenClaw webchat, OpenProject (HTTP browser only), Kavita

**Headless:**
- No UI required
- CLI/API only
- Cron jobs, background tasks
- Examples: Night shift reminders, billable-hours automation


## Mode Combinations (Real-World Examples)

### Night Shift (Unsupervised + Headless + Local)
- **Context:** 3AM daily, Nicholas asleep
- **Tasks:** Process reminders without 🤖, download models, batch jobs
- **Supervision:** None (full autonomy within scope)
- **Interface:** CLI only (no browser, no UI)
- **Environment:** Mac Studio local


### Secretaria (Supervised + Desktop + Local)
- **Context:** 9-5 M-F, Nicholas at desk
- **Tasks:** Calendar checks, Jira updates, meeting prep
- **Supervision:** High (Nicholas present, can correct)
- **Interface:** Desktop (terminal, browser, notifications)
- **Environment:** Mac Studio local
- **Model:** Qwen 7B (fast latency > high reasoning)


### Development (Unsupervised + Desktop + Local)
- **Context:** Epic implementation, testing phases
- **Tasks:** Code changes, git commits, check execution
- **Supervision:** Low (Nicholas reviews afterward)
- **Interface:** Desktop (terminal, browser, file system)
- **Environment:** Mac Studio local
- **Model:** Qwen 32B (high reasoning for decisions)


### iPad Workflow (Supervised + Device + Remote)
- **Context:** Nicholas traveling, iPad + keyboard
- **Tasks:** OpenProject review, Kavita reading, OpenClaw chat
- **Supervision:** High (Nicholas present, limited tools)
- **Interface:** Device (touch, Safari browser, no localhost)
- **Environment:** Remote (Tailscale HTTPS only)
- **Constraint:** No PWAs with HTTP (iOS restriction)


## Mode Selection Rules

**When to use Supervised:**
- Human available for real-time feedback
- Task requires judgment calls
- Latency matters more than reasoning depth

**When to use Unsupervised:**
- Human away (night, travel, meetings)
- Task has clear success criteria
- Agent can handle blockers (report, don't break)

**When to use Device:**
- Mobile-first workflow
- Voice input/output
- Screen real estate limited

**When to use Desktop:**
- Complex UI interactions
- Multi-window workflows
- Localhost server access

**When to use Remote:**
- Outside home network
- iPad/iPhone access
- Tailscale-exposed services only


## Mode Configuration (Future)

**Per-agent mode preferences:**
```yaml
agent: UXR
default_mode:
  supervision: unsupervised
  interface: desktop
  environment: local
  
overrides:
  - condition: nicholas_traveling
    supervision: supervised
    interface: device
    environment: remote
```

**Per-task mode requirements:**
```yaml
task: UXPMS-251
required_mode:
  supervision: supervised  # Nicholas approval needed
  interface: desktop       # Figma requires browser
  environment: local       # API tokens on Mac
```


## Key Insights

**Trade-offs:**
- Supervised = fast feedback, lower reasoning
- Unsupervised = slow feedback, high reasoning
- Device = portable, limited tools
- Desktop = powerful, location-bound
- Remote = accessible anywhere, service-dependent

**Infrastructure investment ethics:**
- Mac Studio = permanent local power (M4 Max, 64GB)
- Tailscale = remote access without cloud dependency
- Mode-aware agents = right tool for right context


## Related Concepts

- **Execution Decision Protocol** (v0.30.0): <5min = execute, >5min = queue, discussion = epic
- **Night Shift** (HEARTBEAT.md): Unsupervised + headless batch processing
- **Local LLM Strategy** (v0.25.0): MLX-first, supervised vs unsupervised models
- **Tailscale Access** (iPad setup): Remote mode constraints (HTTPS, no localhost)


**Source:** talk1.md, talk2.md, memory/2026-02-27.md, AGENTS.md
# Check Anatomy - Modular Quality Control

**Purpose:** Define structure and execution model for reusable quality checks


## What Is a Check?

**Check** = modular quality gate that validates work against defined criteria.

**Properties:**
- **Reusable** across projects/epics
- **Deterministic** (same input → same output) OR **Probabilistic** (LLM-assisted)
- **Composable** (checks can call other checks)
- **Versionable** (git-tracked, semantic versioning)
- **Domain-aware** (web, design, infra, legal, etc.)


## Check File Structure

**Location:** `~/Documents/checks/domains/{domain}/{check-name}/`

```
spacing-consistency/
├── check.yaml           # Metadata + schema
├── executor.py          # Logic (Python, Shell, or container)
├── fixtures/            # Test data
│   └── sample.json
└── README.md            # Human docs
```


## check.yaml Format

```yaml
name: spacing-consistency
domain: design
version: 1.0.0
deterministic: true
description: "Verify spacing follows 8px grid system"

input_schema: figma_file_id
output_schema: qa_report_v1

entrypoint: executor.py

dependencies:
  - figma-api
  - browser

success_metrics:
  - spacing.divisible_by_8 == true
  - orphan_values.count == 0
  - vertical_rhythm.consistent == true
```


## Execution Model

### Input (stdin JSON)
```json
{
  "check": "spacing-consistency",
  "input": {
    "file_id": "abc123"
  }
}
```

### Output (stdout JSON)
```json
{
  "passed": false,
  "score": 0.85,
  "violations": [
    {"node": "Button/Primary", "spacing": "3px", "expected": "8px"}
  ],
  "metadata": {
    "executed_at": "2026-02-27T12:46:00Z",
    "duration_ms": 1234
  }
}
```

### Exit Codes
- `0` = Check passed
- `1` = Check failed
- `2` = Execution error (invalid input, API timeout, etc.)


## Check Types

### 1. Deterministic Checks

**Same input always produces same output.**

**Examples:**
- Spacing consistency (8px grid)
- Color palette compliance
- Disk usage threshold
- SSL certificate expiry
- API response time

**Guarantees:**
- Snapshot tests
- Fixtures with known outputs
- Locked dependency versions
- Hash of input in report


### 2. Probabilistic Checks (LLM-Assisted)

**Output may vary based on model/prompt.**

**Examples:**
- Design critique
- Copy tone/voice
- Code quality review
- UX heuristic evaluation

**Safeguards:**
- Score with tolerance (>0.9 instead of ==1.0)
- Human review when score borderline
- Model version locked in check.yaml
- Prompt versioned in git


### 3. Composite Checks

**Check that runs multiple sub-checks.**

```yaml
name: full-design-qa
domain: design
composite: true

sub_checks:
  - spacing-consistency >= 0.95
  - color-palette.violations == 0
  - accessibility >= 0.90

success_criteria:
  - ALL sub_checks pass
```


## Domain Organization

```
~/Documents/checks/
├── README.md
├── domains/
│   ├── web/
│   │   ├── accessibility/
│   │   ├── performance/
│   │   └── seo/
│   ├── design/
│   │   ├── spacing-consistency/
│   │   ├── color-palette/
│   │   └── contrast-ratio/
│   ├── api/
│   │   ├── rest-compliance/
│   │   └── rate-limiting/
│   ├── infra/
│   │   ├── backup-health/
│   │   └── disk-usage/
│   └── governance/
│       ├── task-definition-complete/
│       └── success-criteria-defined/
├── librarian/              # Topic-based checks
│   ├── chaos-magick/
│   └── finance/
└── templates/
    ├── deterministic.template
    └── probabilistic.template
```


## Integration with OpenProject

**Task YAML (in description):**

```yaml
domain: design
checks:
  - spacing-consistency
  - color-palette
  
success_criteria:
  - spacing-consistency.score >= 0.95
  - color-palette.violations == 0
```

**Agent workflow:**
1. Agent picks task from OpenProject
2. Reads `checks: []` declaration
3. Loads checks from library (`~/Documents/checks/domains/design/`)
4. Executes checks sequentially (or parallel if independent)
5. Updates task status (Pass/Fail + report)


## Check Execution Modes

### Local Execution
```bash
check run spacing-consistency --input file.json
```

### Containerized Execution (Future)
```bash
docker run checks/spacing-consistency:1.0.0 < input.json
```

### API Execution (Future)
```bash
curl -X POST http://localhost:8000/checks/spacing-consistency \
  -d @input.json
```


## Check Library as Product

**Internal use:**
- Quality gates for epics
- Automated QA before publishing
- Continuous improvement (new checks added as patterns emerge)

**External use:**
- Checks-as-a-Service (SaaS)
- Shareable with clients/collaborators
- Grant proposals (quality methodology)

**Example:**
> "We use check X for design consistency. You can adopt it too."


## Check Lifecycle

### 1. Discovery
- Pattern emerges (spacing issues repeated)
- Manual review becomes bottleneck

### 2. Design
- Define success metrics
- Choose deterministic vs probabilistic
- Write check.yaml

### 3. Implementation
- Write executor.py
- Create fixtures
- Test against known inputs

### 4. Integration
- Add to domain library
- Update task templates
- Document in README

### 5. Evolution
- Version bumps when logic changes
- Backward compatibility via schema versions
- Deprecation path for old checks


## Librarian Integration

**Research → Check generation:**

**Example:**
- Research "chaos magick rituals" (Librarian)
- Extract ritual components (intent, symbols, banishing, record)
- Generate check: `ritual-completion.check`

```yaml
name: ritual-completion
domain: librarian/chaos-magick
topic: ritual design
deterministic: false  # LLM-assisted validation

success_metrics:
  - intent.declared == true
  - symbols.chosen == true
  - banishing.included == true
  - record.kept == true
```

**Safeguard:** Librarian generates **draft check**, human approves before becoming executable.


## Mode-Aware Checks

**Some checks require specific modes:**

```yaml
name: figma-browser-qa
domain: design
required_mode:
  interface: desktop   # Browser automation
  environment: local   # API tokens
```

**Agent respects mode constraints:**
- Desktop-only checks skip on device mode
- Remote checks skip when localhost required


## Key Principles

**Modularity:**
- One check = one concern
- Compose for complex validations

**Reusability:**
- Same check across multiple projects
- Share with collaborators

**Determinism (when possible):**
- Prefer deterministic over probabilistic
- Use LLMs only when determinism impossible

**Auditability:**
- All inputs/outputs logged
- Git history = check evolution
- Version lock = reproducibility

**Low metabolic cost:**
- Check execution fast (<5s ideal)
- Clear pass/fail (no ambiguity)
- Reports actionable (fix path obvious)


## Related Concepts

- **Modes** (modes.md): Execution context (supervised, device, local, etc.)
- **Execution Decision Protocol** (v0.30.0): When to run checks
- **OpenProject Integration**: Task → Check mapping
- **Check Library** (talk1.md, talk2.md): Full infrastructure vision


**Source:** talk1.md, talk2.md, v0.31.0 checkpoint research


## Epic Tasks (YAML)

```yaml
epic:
  version: 2.0.0
  name: backstage-as-checkpoints
  status: design
  
tasks:
  - id: roadmap-as-yaml
    description: Convert ROADMAP.md to YAML files (epics as data)
    domain: development
    success_criteria:
      - ROADMAP.md remains source of truth
      - YAML files generated from MD (not vice versa)
      - UI reads YAML (Tailwind + shadcn/ui)
    
  - id: ui-framework-selection
    description: Choose modern UI framework for roadmap visualization
    domain: design
    success_criteria:
      - Framework decided (Tailwind + shadcn/ui recommended)
      - No npm bloat (copy-paste components preferred)
      - Works with YAML data sources
    
  - id: epic-notes-as-data
    description: Migrate epic-notes/ to structured format
    domain: development
    success_criteria:
      - Epic notes remain markdown
      - Frontmatter YAML with metadata
      - Links to tasks, checks, domains
```


## Task: Decide on UI Framework

**Goal:** Choose modern framework for YAML-driven roadmap UI

**Constraints:**
- Filesystem = database (no containers, no fragile DBs)
- YAML + Markdown = source of truth
- Must be readable by: human, UI, AI
- Prefer lightweight (copy-paste > npm bloat)

**Options:**

### Option 1: Next.js + Tailwind + shadcn/ui
**Stack:**
- Next.js (React framework, file-based routing, SSG)
- Tailwind CSS (utility-first styling)
- shadcn/ui (copy-paste components, no npm dependency)
- gray-matter (YAML frontmatter parser)
- remark (Markdown renderer)

**Pros:**
- Modern, widely adopted
- shadcn = no component library lock-in
- Static site generation (fast, hostable anywhere)
- Great DX (TypeScript, hot reload)

**Cons:**
- React learning curve (if unfamiliar)
- Build step required

**Examples:**
- https://ui.shadcn.com/ (component library)
- https://nextjs.org/showcase (Next.js apps)
- https://github.com/shadcn-ui/taxonomy (full stack example)


### Option 2: Astro + Tailwind + Shoelace
**Stack:**
- Astro (content-focused framework, multi-framework)
- Tailwind CSS
- Shoelace (Web Components, framework-agnostic)
- gray-matter (YAML parser)

**Pros:**
- Minimal JS (ships 0kb by default)
- Markdown-first (built-in support)
- Multi-framework (can use React, Vue, Svelte components)
- Fast builds

**Cons:**
- Smaller ecosystem than Next.js
- Less familiar to most devs

**Examples:**
- https://astro.build/themes/ (starter themes)
- https://shoelace.style/ (Web Components)
- https://github.com/withastro/astro (official repo)


### Option 3: SvelteKit + Tailwind + DaisyUI
**Stack:**
- SvelteKit (Svelte framework, file-based routing)
- Tailwind CSS
- DaisyUI (Tailwind component classes)
- gray-matter (YAML parser)

**Pros:**
- Less boilerplate than React
- Reactive by default (no hooks)
- DaisyUI = semantic class names (easy theming)
- Fast runtime

**Cons:**
- Smaller community than React
- Fewer ready-made examples

**Examples:**
- https://daisyui.com/components/ (components)
- https://kit.svelte.dev/ (SvelteKit docs)
- https://github.com/sveltejs/kit (official repo)


### Option 4: Eleventy + Tailwind + Alpine.js
**Stack:**
- Eleventy (static site generator, zero-JS)
- Tailwind CSS
- Alpine.js (minimal JS for interactivity)
- Markdown + YAML native support

**Pros:**
- Zero framework (just HTML/CSS/JS)
- Extremely fast builds
- YAML/Markdown first-class citizens
- No build complexity (optional)

**Cons:**
- Manual routing (no framework magic)
- Less structure (more DIY)

**Examples:**
- https://www.11ty.dev/docs/ (Eleventy docs)
- https://alpinejs.dev/examples (Alpine examples)
- https://github.com/11ty/eleventy-base-blog (starter)


### Option 5: Plain HTML + Tailwind (Zero framework)
**Stack:**
- Plain HTML files
- Tailwind CSS (via CDN or build)
- Vanilla JS (fetch YAML, render)
- No build step (optional)

**Pros:**
- Zero dependencies
- Instant load (no framework overhead)
- Full control
- Works offline (no npm, no node_modules)

**Cons:**
- Manual everything (routing, state, rendering)
- No hot reload (unless custom setup)

**Examples:**
- https://tailwindcss.com/docs/installation/play-cdn (CDN setup)
- https://github.com/tailwindlabs/tailwindcss (official repo)


**Decision criteria:**
- **Speed:** How fast to prototype?
- **Maintenance:** How easy to update/extend?
- **Portability:** Can run without internet/npm?
- **AI-friendly:** Can LLM help build/modify?

**Recommendation:** Start with **Option 1 (Next.js + Tailwind + shadcn/ui)** for speed, then evaluate portability needs.


## Epic Note: Philosophy

**Backstage legível para:**
- **Humanos** - Folder-friendly, markdown, visual hierarchy
- **AIs** - YAML structure, semantic versioning, predictable paths
- **GUIs** - Structured data, relationships, status tracking

**Checks enforce policy:**
- Folder changes detected automatically
- Sync with others (templates, shared checks)
- Policy-as-code (declarative, versionable)

**If folders change, checks detect and adapt.**


## Epic Note: DRY Principle

**Redundância = mismatch, confusão, bugs.**

**Problema exemplo:**
- Folder name: `v2.0.0/`
- YAML field: `version: v2.0.0`

**Se folder = v2.0.0, por que repetir no YAML?**

**Consequências:**
- Folder diz uma coisa, YAML diz outra
- Rename folder → esquece atualizar YAML → inconsistência
- Checks precisam validar dois lugares
- Mais código, mais bugs

**Solução:**
- **Folder name = source of truth** (version inferida do path)
- YAML só tem o que NÃO está no folder (name, status, tier, tasks)

**Future refactor:** Remove `version` field do epic.yaml completamente.
