
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
