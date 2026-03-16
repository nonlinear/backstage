# Skills - Changelog







> 🤖
> This project follows [backstage protocol](https://github.com/nonlinear/backstage) v0.3.4
>
> - [README](../README.md) 👏 [ROADMAP](ROADMAP.md) 👏 [CHANGELOG](CHANGELOG.md) 👏 checks: [local](checks/local/) <sup>5</sup>, [global](checks/global/) <sup>0</sup>
>
> 🤖







```mermaid
graph LR
    A[✅ v1.0.0 Skill Protocol]
    B[✅ v0.1.0 Skill Reordering]
    C[✅ v0.2.0 Better Apps]
    D[📋 v1.1.0 Contract Diagrams]
    A --> B
    B --> C
    C --> D
    E[📋 v1.2.0 Roadmap Skill]
    D --> E
    F[📋 v1.3.0 i-ching]
    E --> F
    G[📋 v1.4.0 notify]
    F --> G
    H[📋 v1.5.0 system-detective]
    G --> H
    I[📋 v1.6.0 find-books]
    H --> I
    J[📋 v1.7.0 open-with]
    I --> J
    K[📋 v1.8.0 use-for]
    J --> K
    L[📋 v1.9.0 rebranding]
    K --> L
    M[📋 v1.10.0 proton-mail]
    L --> M
    N[📋 v1.11.0 design-discrepancy]
    M --> N
```

## v1.1.1 - 2026-02-22

### Security Fixes

**Description:** Address OpenClaw security review findings

**Fixed:**
- ✅ **Vendor CDN dependencies:** marked.js + mermaid.js now bundled locally (offline/air-gapped support, no supply-chain risk)
- ✅ **Path whitelist:** server.js now restricts file reads to allowed directories (HOME/Documents, skills root, engine dir) - blocks path traversal attacks
- ✅ Validated security: `?md=../../../../etc/passwd` → Access denied

**Impact:**
- Skill works offline (no CDN dependency)
- Protected against arbitrary file reads
- Safe for air-gapped/restricted environments

**Files changed:**
- `contract-diagram/marked.min.js` (new, 39KB)
- `contract-diagram/mermaid.min.js` (new, 2.8MB)
- `contract-diagram/index.html` (CDN → local imports)
- `contract-diagram/server.js` (path validation)

**Reference:** OpenClaw security review 2026-02-22 (HIGH CONFIDENCE findings addressed)

**Status:** ✅ Published to clawhub

---

## v1.1.0 - 2026-02-22

### Contract Diagram

**Description:** Architecture design exercises with contract diagrams

**Accomplished:**
- Added mermaid workflow diagram to SKILL.md (trigger → draft → notes → research → approve → execute)
- Converted from submodule to regular folder (removed .git, integrated into skills repo)
- Documented architecture patterns (gray/red/yellow/blue color protocol)
- Research/validation phase (Phase 3.5) before approval
- Visual diff for async collaboration
- Contract stability rules (single file, stable position, edit in place)

**Skills updated:**
- `contract-diagram` (arch skill with full protocol documentation)

**Status:** ✅ Complete

---

## v0.2.0 - 2026-02-17

### Better Apps Architecture

**Description:** App customization skills (CSS, Service Worker, per-app toggle)

**Accomplished:**
- Created better/ folder structure (app customization namespace)
- Created better-openclaw (CSS injection, dark theme, minimal UI)
- Created better-kavita (Service Worker offline storage)
- Created better-komga (Service Worker offline storage)
- Per-app toggle system (better/{app}/toggle.sh)
- Standalone skills (no shared dependencies)
- Updated POLICY.md (better frontmatter schema: type, app, platform, browser)
- Epic notes: v0.4.0-offline-browser-storage.md (Service Worker research)

**Skills created:**
- `better-openclaw` (CSS customization)
- `better-kavita` (offline reading)
- `better-komga` (offline reading)

**Details:** [epic-notes/v0.4.0-offline-browser-storage.md](epic-notes/v0.4.0-offline-browser-storage.md)

---

## v1.0.0 - 2026-02-15

### Skill Protocol

**Description:** Universal skill formatting rules (frontmatter, diagrams, statuses)

**Accomplished:**
- Created skill-protocol.md (frontmatter/formatting rules for all skills)
- Updated skills/POLICY.md to reference skill-protocol.md
- Companion skills reference skill-protocol.md (prevent drift)
- Defined status values (draft, testing, stable, published)
- Renumbered all epics v1.0.0-v1.9.0 (semantic versioning)
- Epic-notes folders + mermaid diagram updated
- Arch learnings documented (morphological computation → transparent equipment)

**Details:** [epic-notes/v1.0.0](epic-notes/) (multiple files from renumbering)

---

## v0.1.0 - 2026-02-14

### Skill Reordering

**Description:** Reorganized skills structure + promoted published skills

**Accomplished:**
- Moved reels-library from life/tasks/ to skills/ (transformed to skill epic)
- Created epic: v2.0.0 - open-with ("abra X" → app mapping)
- Refactored README.md (table format, frontmatter-driven status)
- Updated skills/POLICY.md (README table = frontmatter-driven, auto-discovery, top-aligned)
- Regenerated README table from SKILL.md frontmatters (HTML, valign=top)
- Updated POLICY: companions auto-discovered via ~/Documents/*/skill/
- Updated POLICY: status without emoji (raw frontmatter values)
- Decided: two tables (standalone + companions)
- Moved librarian/ to librarian/skill/ (on epic/v0.15.0-skill-protocol branch), created symlink
- Removed librarian .git (follows parent project)
- Added "Diagram" column to README tables (link to SKILL.md)
- POLICY: Every SKILL.md must have diagram after frontmatter
- Removed backstage-skill/ and librarian/ from skills folder (duplicates, are companions)
- Moved backstage-skill/ to backstage/skill/, created symlink
- OpenClaw system prompt auto-updated via dynamic skill discovery
- Created symlink for librarian skill

**Philosophy:**
"Companion skills pertencem ao projeto que participam"
- Source in project (git, commits, paridade)
- Discovery via symlinks (~/.openclaw/workspace/skills/)
- Versioning follows project ROADMAP
- Only show in main branch (epic branches = WIP, sandboxed)

**Success:**
- Companion skills live in projects, symlinked for discovery
- README auto-generates from frontmatter
- Only stable companions appear (main branch only)
- Clear path: sandbox → test → merge main → appear in README
- Repeatable pattern for future companions

---
    B --> C
    D[📋 v1.4.0 notify]
    C --> D
    E[📋 v1.6.0 system-detective]
    D --> E
    F[📋 v1.7.0 find-books]
    E --> F
    G[📋 v2.0.0 open-with]
    F --> G
    H[📋 v2.1.0 use-for]
    G --> H
```



---

## v1.3.0 - apple-reminders-processing

**Status:** ✅ COMPLETE

**Description:** Smart reminder processing with custom instructions

**What we did:**
- [x] Auto-process reminders without notes (2x/day heartbeat)
- [x] Custom research instructions support (multi-source: books + web + constraints)
- [x] List-based defaults (claw=system solutions, shopping=price comparison, generic=how-to)
- [x] Result tracking with 💎 signifier
- [x] Usage analytics (usage.jsonl + analyze-usage.py)
- [x] Auto-generate shortcuts for top 10 topics

**Published:** https://clawhub.com/skills/reminder-research

**Note:** Skill is HEARTBEAT-integrated, runs automatically. Published as `reminder-research`.

---

_Older completed epics will be moved here from ROADMAP.md_
