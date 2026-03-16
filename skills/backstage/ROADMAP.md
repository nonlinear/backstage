# Skills - Roadmap






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
    E[📋 v1.2.0 Contract Diagram Updates]
    D --> E
    F[📋 v1.3.0 Roadmap Skill]
    E --> F
    G[📋 v1.4.0 i-ching]
    F --> G
    H[📋 v1.5.0 notify]
    G --> H
    I[📋 v1.6.0 system-detective]
    H --> I
    J[📋 v1.7.0 find-books]
    I --> J
    K[📋 v1.8.0 open-with]
    J --> K
    L[📋 v1.9.0 use-for]
    K --> L
    M[📋 v1.10.0 rebranding]
    L --> M
    N[📋 v1.11.0 proton-mail]
    M --> N
    O[📋 v1.12.0 design-discrepancy]
    N --> O
    P[📋 v1.13.0 Automate Clawhub Publication]
    O --> P
    Q[📋 v2.1.0 Roadmap Add CLI]
    P --> Q
    R[📋 v2.0.0 Contract Diagram Wrapper v2]
    Q --> R
```

## v1.1.0

### Contract Diagram

**Description:** Architecture design exercises with contract diagrams

**Tasks:**
- [x] Initial announcement https://social.praxis.nyc/@nonlinear/116037514895910044

- [x] How you START an exercise? how you CONTINUE? how you do 2 at same time? (Phases agreed: Design → Ready to approve → Development → Has blockers? → Pass checks? → Publish)

- [x] Add SKILL.md with frontmatter

- [x] Test and validate

- [x] Add mermaid workflow diagram
- [ ] Mermaid lint/check (define standards, prevent syntax errors) - research for v1.2.0

- [x] Research mermaid customization (padding, spacing) - documented in v1.2.0 Topic 13
- [x] develop
- [x] Test
- [x] publish as contract-diagram on claw
- [ ] check errors
- [x] **Security enhancement:** Restrict server.js file reads to safe directory (DONE v1.1.1)
  - ✅ Vendored CDN dependencies (marked, mermaid) - offline/air-gapped support
  - ✅ Path whitelist (HOME/Documents, skills root, engine dir) - blocks path traversal
  - Reference: OpenClaw security review 2026-02-22

**Success:**
- Architecture exercises documented
- Clear workflow (start, continue, parallel)
- Integration with librarian (optional)

---

## v1.12.0

### Contract Diagram Updates

**Description:** Advanced contract diagram features (domains, timeline, multi-device)

**Tasks:**
- [ ] **README installation instructions:** Instead of "published" badge, show "How to install" section
  - Example: `curl -O url && chmod +x script.sh` or `git clone` or clawhub install
  - Make installation obvious (don't assume user knows clawhub CLI)
  - Keep published link (for discovery), add install steps
- [ ] **Local check:** Scan all SKILL.md frontmatter (validate required fields: name, description, version, status)
  - Check: name matches folder name
  - Check: version is semver
  - Check: status is valid (published, stable, testing, draft)
  - Check: description exists and non-empty
  - Exit 1 if any skill fails validation
  - Location: `backstage/checks/local/skill-frontmatter.sh`
- [ ] Mermaid lint/check (define standards, prevent syntax errors)
- [ ] Git timeline navigation (slider through commit history)
- [ ] Domain system (departments claim nodes, become stakeholders)
- [ ] Cross-product pattern detection (domains scan all contracts)
- [ ] Stakeholder orchestration (multi-agent supervised phase)
- [ ] Meta diagrams (pipelines as contracts)
- [ ] Mermaid type support (gantt, ER, sequential, mind maps)
- [ ] Backstage integration (epic-aware contracts)
- [ ] Voice + Multi-Device (iPhone chat + iPad view sync)
- [ ] Hypercare → Autonomy transition (check maturity gates)
- [ ] Diagram history (recent contracts quick-load)
- [ ] Diagram type suggestions (AI recommends best format)

**Success:**
- Mermaid validation prevents broken diagrams
- Timeline slider shows contract evolution
- Domains claim nodes across products
- Multi-agent supervised workflows
- Voice-driven contract editing

**Notes:** [epic-notes/v1.2.0-contract-diagram-updates.md](epic-notes/v1.2.0-contract-diagram-updates.md)

---

## v1.12.0 | [notes](epic-notes/v1.1.0-arch/)

### Roadmap Skill

**Description:** Localhost wrapper (like arch) that loads ROADMAP.md and displays as interactive to-do list organized by epics

**Goal:** Visual epic management with automatic renumbering and task reordering

**Tasks:**
- [ ] Phase 1: Load ROADMAP.md (read-only viewer)
- [ ] Phase 2: Check tasks (mark complete)
- [ ] Phase 3: Add/remove/reorder tasks within epics
- [ ] Phase 4: Reorder epics
- [ ] Phase 5: Automatic renumbering (v0.X.0 → v0.Y.0 on reorder)

**Success:**
- Interactive ROADMAP viewer (localhost)
- Task completion (checkboxes work)
- Drag-and-drop epic reordering
- Auto-renumber on epic move
- Saves back to ROADMAP.md

---

## v1.12.0

### i-ching

**Description:** I Ching divination

**Tasks:**
- [ ] different divination ways
  - [ ] dice (2 trigrams)
  - [ ] cards (one hexagram)
  - [ ] coins (6 lines, plus mutable lines)

- [ ] como conectar com OUTRO skill, librarian, mas poder funcionar SEM ele?
- [ ] Document usage examples
- [ ] iching oracle diary?
- [ ] Test and validate

**Success:**
- Multiple divination methods working
- Librarian integration (optional)
- Oracle diary tracking

- [ ] **Approve to merge**

---

## v1.12.0 | [notes](epic-notes/v1.8.0-rebranding-menu.md)

### Rebranding Menu

**Description:** GitHub README SVG menu/banner redesign

**Problem:** Current README navigation needs visual refresh, want custom SVG menu/banner

**Solution:** Design SVG menu following GitHub's sanitization rules

**Tasks:**
- [ ] Research GitHub SVG rules (allowed: static SVG, SMIL animations, inline CSS; blocked: JavaScript, external resources, event handlers)
- [ ] Design menu/banner concept (navigation, branding, interactive elements)
- [ ] Create SVG (inline all resources, base64 images if needed)
- [ ] Test SMIL animations (hover effects, loading states)
- [ ] Validate in GitHub preview (no blocked elements)
- [ ] Document SVG best practices (inline resources, SMIL > CSS, sanitizer rules)
- [ ] Update skills README with new menu

**Details:** [epic-notes/v1.8.0-rebranding-menu.md](epic-notes/v1.8.0-rebranding-menu.md)

**Success Criteria:**
- SVG menu renders correctly on GitHub
- Animations work (SMIL-based)
- No blocked elements (JavaScript, external resources)
- Links functional (<a xlink:href>)
- Documented best practices for future updates

- [ ] **Approve to merge**

---

## v1.12.0

### notify

**Description:** Notifications

**Tasks:**

- [ ] Whats this?

**Success:**
- TBD

- [ ] **Approve to merge**

---

## v1.12.0

### system-detective

**Description:** System diagnostics

**Tasks:**
- [ ] Hmmmm... isso conectar com relay ON, ne?
- [ ] rlay ON keystroke

**Success:**
- Chrome Relay integration
- Keystroke automation

- [ ] **Approve to merge**

---

## v1.12.0

### find-books

**Description:** Book search

**Tasks:**
- [ ] it is librarian, but cant be toooo close since its piracy

**Success:**
- Book search working
- Separate from librarian (piracy concerns)

- [ ] **Approve to merge**

---

## v1.12.0

### open-with

**Description:** "Open in app" as a skill - maps file types/contexts to default apps

**Problem:**
- "Abra X" should open in correct app (Typora, VSCode, Excel, etc.)
- Context matters: README → Typora, .py → VSCode, .xlsx → Excel
- Need extensible mapping (user preferences, project defaults)

**Tasks:**
- [ ] Define open-with mapping (file extensions → apps)
- [ ] Support context overrides (project-specific apps)
- [ ] Handle URLs (browser tabs, specific profiles)
- [ ] Document usage examples
- [ ] Test and validate

**Examples:**
- `open README.md` → Typora
- `open script.py` → VSCode
- `open data.xlsx` → Excel (local app)
- `open https://example.com` → Chrome

**Success:**
- File type mapping working
- Context-aware app selection
- User preferences supported

- [ ] **Approve to merge**

---

## v1.12.0 | [notes](epic-notes/v1.8.0-rebranding-menu.md)

### use-for

**Description:** Skill suggester (scans all skills, suggests based on context)

**Tasks:**
- [ ] Define skill purpose
- [ ] Add SKILL.md with frontmatter
- [ ] Document usage examples
- [ ] Test and validate

**Success:**
- Context-based skill suggestions
- Auto-discovery working
- User gets right skill for task

- [ ] **Approve to merge**

---

## v1.12.0 | [notes](epic-notes/v1.9.0-proton-mail-finder.md)

### proton-mail-finder

**Description:** Proton Mail search URL builder (direct links to search results)

**Problem:** Proton Mail has powerful search syntax but no CLI/API access

**Solution:** Build URLs with search parameters for quick access (metadata search + content search)

**Tasks:**
- [ ] Research Proton Mail search syntax (from/to, subject, date range, folder, advanced operators)
- [ ] Build URL pattern library (from=X, to=Y, subject=Z, folder=inbox, etc.)
- [ ] Support advanced syntax (OR |, NOT !, phrase "", proximity ~N, wildcards)
- [ ] Check Proton Pass API (is there similar search/URL pattern?)
- [ ] Create SKILL.md with examples
- [ ] Test URL builders (verify links work in Proton Mail web UI)

**Details:** [epic-notes/v1.9.0-proton-mail-finder.md](epic-notes/v1.9.0-proton-mail-finder.md)

**Success Criteria:**
- URL builder creates valid Proton Mail search links
- Advanced syntax supported (OR, NOT, wildcards)
- Proton Pass research complete (API/URL patterns documented)
- Examples documented (common searches)

- [ ] **Approve to merge**

---

## v1.12.0 | [notes](epic-notes/v1.8.0-rebranding-menu.md)

### git-flipbook

**Description:** Git commit timeline → visual report (quarterly retrospectives, ethical drift detection)

**Concept:** 
- Parse git log for timeframe → generate slideshow (Marp/reveal.js)
- Visualize: commits, diffs, milestones, VISION.md alignment
- Suggest new/updated skills based on repeat patterns

**Tasks:**
- [ ] Phase 1: Basic flipbook (commits → markdown → slideshow)
- [ ] Parse git log (--since, --until, --grep for milestones)
- [ ] Generate slideshow format (Marp or reveal.js)
- [ ] Phase 2: VISION.md comparison (ethical drift detection)
- [ ] Flag deviations from VISION.md (manual review)
- [ ] Phase 3: Calendar triggers (moon-aligned quarterly reports)
- [ ] Phase 4: Cross-repo aggregation (multiple projects)
- [ ] Auto-suggest skills based on repeat patterns
- [ ] Test on 2026-Q1, validate format, iterate

**Integration:**
- Extends backstage changelog-as-milestone (quarterly-report.sh)
- Requires: Force commit on core file edits (substrate ready)
- CHANGELOG commits with trailers = milestones

**Success Criteria:**
- Quarterly flipbook generated automatically
- VISION.md drift detected and flagged
- Skills suggested based on patterns
- Timeline visualization clear and useful

---


## v1.12.1

### Epic Notes - Lifecycle Management

**Description:** Skill to detect orphan epic notes and enforce ROADMAP/CHANGELOG sync

**Problem:** Epic notes (like `creating-skills.md`) live disconnected from epics → orphans, no context

**Solution:** Skill that checks epic notes, links to ROADMAP/CHANGELOG, suggests actions

**Tasks:**
- [ ] Implement `epic-notes check <note>` (detect orphan, search ROADMAP/CHANGELOG)
- [ ] Implement `epic-notes check-all <project>` (scan all notes)
- [ ] Implement `epic-notes fix <note>` (interactive: create epic, link, or mark orphan)
- [ ] Implement `epic-notes orphans <project>` (list orphans)
- [ ] Add HEALTH integration (report orphans in backstage checks)
- [ ] Test on skills project (`creating-skills.md` → this epic)
- [ ] Document usage examples

**Success:**
- Orphan detection works
- ROADMAP/CHANGELOG search accurate
- Interactive fix prompts clear
- HEALTH integration reports orphans

**Notes:** [epic-notes/creating-skills.md](epic-notes/creating-skills.md) (OpenClaw docs converted to epic note)

---

## v2.1.0 | [notes](epic-notes/v2.1.0-roadmap-add-cli.md)

### Roadmap Add CLI

**Description:** CLI tool to add tasks/epics to project roadmaps (prevents orphan epic notes)

**Problem:** Epic notes created without ROADMAP entry = invisible for grooming

**Solution:** Force ROADMAP entry at creation time

**Status:** v0.1.0 - Documentation complete, script stub (implementation pending)

**Tasks:**
- [ ] Implement script logic (project detection, fuzzy matching, epic creation)
- [ ] Test with librarian project (add task to existing epic)
- [ ] Test with personal project (create new epic)
- [ ] Test ambiguity handling (multiple matches, ask user)
- [ ] Add to skills checks (verify epic notes have ROADMAP entries)
- [ ] Document usage examples

**Triggers:**
- "add to roadmap [item]"
- "create epic [name]"
- "[project]: add to roadmap [item]"

**Workflow:**
1. Detect project (ask if unclear)
2. Scan ROADMAP.md
3. Match epic (fuzzy, ask if multiple)
4. Add task OR create epic
5. Report back ("✅ Added to vX.Y.Z")

**Success Criteria:**
- Script working (project detection, fuzzy matching, epic creation)
- No orphan epic notes (all have ROADMAP entries)
- User-friendly (asks when unclear, reports what happened)

**Details:** `~/Documents/skills/roadmap-add/SKILL.md`

---

## v1.13.0

### Reminders + Summarize Integration

**Description:** URL-based reminder research with contextual summarization

**Problem:** 
- Reminders have URL field (underused)
- URLs (articles, reels, videos) need summarization
- Context matters: WHY did I save this? How does it help my projects?

**Solution:** Integrate reminder-research with summarize skill

**Two modes:**

**1. URL-only (no notes):**
- Auto-summarize content
- Answer: "What does this do? How does it help my personal epics?"
- Cross-reference: Check if topic matches any ROADMAP epic
- Output: 💎 Summary + relevance to ongoing projects

**2. URL + notes (directed research):**
- Notes explain WHY URL was saved
- Questions like:
  - "Do you think this solution helps with project/epic XYZ?"
  - "Research book ABC and compare with what they say here... is it comparable? What did context get wrong?"
  - "How does this technique apply to librarian v0.15.0?"
- Output: 💎 Directed answer (researched, cross-referenced, actionable)

**Content types:**
- Articles (blog posts, docs, tutorials)
- Instagram Reels
- YouTube videos
- TikTok shorts
- Twitter threads (via URL)

**Workflow:**
```
User adds reminder:
  Title: [Reel] Design pattern example
  URL: https://instagram.com/reel/XXX
  Notes: "Compare with librarian check library. Is this pattern better?"

Skill processes:
  1. Download/transcribe reel (yt-dlp + whisper)
  2. Summarize content (summarize skill)
  3. Research librarian check library (grep epic notes)
  4. Compare patterns (LLM analysis)
  5. Update notes: 💎 ANSWER: "Pattern X similar but..."
```

**Integration points:**
- `reminder-research` skill (detect URL field)
- `summarize` skill (content extraction)
- `librarian` skill (research books for comparison)
- Apple Reminders URL field (native iOS/macOS)

**Tasks:**
- [ ] Extend reminder-research to detect URL field
- [ ] Create content-capture.sh (URL → summary with project context)
- [ ] Create content-bulk.sh (batch process URL reminders)
- [ ] Test with Instagram Reels (yt-dlp + whisper)
- [ ] Test with YouTube videos (summarize --youtube auto)
- [ ] Test with articles (summarize direct)
- [ ] Integrate librarian for book comparison
- [ ] Add epic cross-reference (scan ROADMAP for topic matches)
- [ ] Document URL reminder format (best practices)
- [ ] Cronjob for bulk processing (3AM daily)

**Success Criteria:**
- URL-only reminders get auto-summary + epic relevance
- URL + notes reminders get directed research answers
- Instagram Reels, YouTube, articles all work
- Book comparisons via librarian integration
- Cron automation runs reliably
- 💎 output format consistent and actionable

**Examples:**

**Example 1 (URL-only):**
```
Title: Cool automation pattern
URL: https://example.com/article
Notes: (empty)

Output:
💎 SUMMARY: Article about X pattern for Y workflow.
RELEVANCE: Matches epic v1.12.0 (Roadmap Skill) - drag-and-drop reordering.
ACTION: Review for implementation ideas?
```

**Example 2 (URL + directed question):**
```
Title: Chaos magick servitor tutorial
URL: https://youtube.com/watch?v=XXX
Notes: "Compare with Hine's method in Condensed Chaos. Is this safer?"

Output:
💎 RESEARCH:
Video teaches servitor creation via sigil + energy charging.
Hine's method (Condensed Chaos ch. 4): Similar but emphasizes banishing.
COMPARISON: Video skips safety step (banishing after charging).
ANSWER: Hine's method safer - includes dismissal protocol.
RECOMMENDATION: Use Hine's approach, video good for visuals only.
```

**Notes:** [epic-notes/v1.13.0-reminders-summarize.md](epic-notes/v1.13.0-reminders-summarize.md)

---

## v1.14.0

### Automate Clawhub Publication

**Description:** Script to publish skills to clawhub from CLI (reduce manual steps)

**Tasks:**
- [ ] **Test `openclaw skill` commands:** Verify install/uninstall/list work correctly
  - Test: `openclaw skill install nonlinear/contract-diagram`
  - Test: `openclaw skill list` (shows installed skills)
  - Test: `openclaw skill uninstall nonlinear/contract-diagram`
  - Validate: Skills actually work after installation
  - Document: Any gotchas or edge cases
- [ ] **Dual-repo strategy:** Commit locally (all skills), push selectively (published only)
  - Research: pre-push hook vs dual-branch (main/public) vs separate repo
  - Design: "commit locally ≠ push to GitHub" workflow
  - Goal: Unpublished skills versioned locally, hidden from GitHub
  - Future-proof: When "open project" decouples epics from projects, this becomes critical
- [ ] Research clawhub publication API/CLI
- [ ] Create publish-skill.sh (inputs: skill name, validates frontmatter, publishes)
- [ ] Integrate with ROADMAP workflow (epic complete → publish prompt)
- [ ] Auto-update git tracking (add to public branch/repo when published)
- [ ] Update README.md automatically (add published skill section)

**Success:**
- One command publishes skill to clawhub
- Frontmatter validated before publish
- .gitignore + README auto-updated

---

## v2.0.0

### Contract Diagram Wrapper v2 - Network-Agnostic

**Description:** Redesign contract-diagram wrapper to work on any network (local, Tailscale, remote)

**Context:** v1.1.1 wrapper works localhost only (`file://` protocol breaks remote access). Core skill reverted to Typora-based (local markdown editing). Wrapper deprioritized until we can do it right.

**Problem:**
- Current wrapper: `file://` protocol → Mac local only
- Remote devices (iPad/iPhone): Can't access Mac filesystem via Tailscale
- Hot-reload + phase detection = nice features, but blocked by network limitations

**Solution Options:**
1. **Embed MD in URL** (base64/data URI)
   - Read `.md` content server-side
   - Serve as inline data in HTML
   - OR: Pass MD content via query param/POST
2. **Tailscale file sharing** (if exists)
   - Serve files via Tailscale (not just HTTP proxy)
   - Allow remote devices to read Mac filesystem
3. **Full server API** (read/write markdown over HTTP)
   - Markdown-over-HTTP protocol
   - GET `/md/:path` → serve content
   - POST `/md/:path` → save changes
   - Preserve hot-reload (2s interval)

**Tasks:**
- [ ] Research Tailscale file sharing capabilities (does it exist? how to use?)
- [ ] Prototype: Embed MD content in URL (data URI / base64)
- [ ] Prototype: Full server API (read/write markdown endpoints)
- [ ] Test on iPad/iPhone (via Tailscale)
- [ ] Preserve features: hot-reload, phase detection, badge auto-update
- [ ] Security review (path traversal, arbitrary file read)
- [ ] Documentation: Setup, usage, limitations
- [ ] Publish wrapper v2.0.0

**Success Criteria:**
- Wrapper works on any network (local, Tailscale, internet)
- iPad/iPhone can view/edit contract diagrams remotely
- Hot-reload still works (2s interval)
- Phase detection still works (badge auto-update)
- Security vetted (no path traversal, safe file access)

**References:**
- [Wrapper Separation ADR](epic-notes/contract-diagram-wrapper-separation.md)
- [v1.1.1 Known Issues](../contract-diagram/SKILL.md#remote-access-https-via-tailscale)
- [v1.2.0 Contract Diagram Updates](epic-notes/v1.2.0-contract-diagram-updates.md)

---
