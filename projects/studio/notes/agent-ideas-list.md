# Agent Ideas from talk1.md & talk2.md

**Extracted:** 2026-02-23

---

## Domain/Department Agents

### 1. **UXR** (User Experience Research)
- **Focus:** User research, insights, testing
- **Mentioned in:** talk1, talk2
- **Library topics:** TBD
- **Checks:** User feedback validation, research methodology
- **APIs:** Survey tools, analytics platforms

### 2. **Design** (UI/UX Design)
- **Focus:** Visual design, interface, user flows
- **Mentioned in:** talk1, talk2
- **Library topics:** Design systems, accessibility, visual hierarchy
- **Checks:** spacing-consistency (8px grid), color-palette, accessibility, responsive-breakpoints
- **APIs:** Figma, browser automation, design systems

### 3. **Development** (Engineering)
- **Focus:** Implementation, code quality, deployment
- **Mentioned in:** talk1, talk2
- **Library topics:** Software architecture, testing, DevOps
- **Checks:** Code quality, test coverage, API compliance
- **APIs:** GitHub, CI/CD, deployment tools

### 4. **Marketing**
- **Focus:** Campaigns, messaging, brand
- **Mentioned in:** talk1, talk2
- **Library topics:** Brand strategy, copywriting, growth hacking
- **Checks:** voice-and-tone, brand-consistency, campaign effectiveness
- **APIs:** Social media, analytics, email platforms

### 5. **Legal**
- **Focus:** Compliance, contracts, risk management
- **Mentioned in:** talk1, talk2
- **Library topics:** Contract law, compliance, IP
- **Checks:** Contract completeness, compliance validation
- **APIs:** Document management, legal research

### 6. **Growth** (Growth Agents)
- **Focus:** User acquisition, retention, conversion
- **Mentioned in:** talk1, talk2
- **Library topics:** Growth frameworks, analytics, experimentation
- **Checks:** Conversion funnel, A/B test validity
- **APIs:** Analytics, experimentation platforms

### 7. **Infrastructure** (Infra/DevOps)
- **Focus:** Servers, NAS, deployment, monitoring
- **Mentioned in:** talk1, talk2
- **Library topics:** System administration, Docker, monitoring
- **Checks:** backup-health, disk-usage, uptime monitoring
- **APIs:** NAS, Docker, monitoring tools

---

## Special Function Agents

### 8. **Orchestrator** (Enterprise Architect)
- **Role:** Company-wide coordination, org chart management
- **Mentioned in:** talk1, talk2
- **Focus:**
  - Manages departments, access, permissions
  - Coordinates pipelines across domains
  - Ensures checks are modular/reusable
  - Runs scenario simulations (what-if analysis)
  - Tracks quality plateau (when checks become stable)
- **Skills:** Systems thinking, governance design, quality metrics
- **Alternative names:** Enterprise Architect, Organizational Orchestrator

### 9. **Business Analyst** (Requirements Engineer)
- **Role:** Epic grooming, ticket creation
- **Mentioned in:** talk1, talk2
- **Focus:**
  - Takes conversation/idea
  - Breaks down into epics
  - Identifies stakeholders (which domains?)
  - Creates deterministic tickets (no ambiguity)
  - Maps success criteria
  - Ensures all checks pass before epic approval
- **Skills:**
  - Conversation → structured requirements
  - Deterministic writing
  - Stakeholder mapping
- **Alternative names:** Requirements Engineer, Epic Groomer, Groomer Agent

### 10. **Process Improvement Specialist** (Audit & Optimization)
- **Role:** Post-publication analysis, continuous improvement
- **Mentioned in:** talk1, talk2
- **Focus:**
  - Reviews all published epics (merged to main, in CHANGELOG)
  - Analyzes time spent, bottlenecks
  - Proposes optimizations
  - Suggests tool/API additions
  - Identifies redundant processes
- **Skills:**
  - Pattern recognition
  - Cost-benefit analysis
  - Tool evaluation
- **Alternative names:** Business Operations Analyst, Process Optimization Agent, Audit Agent

---

## Librarian Integration (Topic-Based Agent)

### 11. **Librarian**
- **Role:** Research, book-based knowledge, topic expertise
- **Mentioned in:** talk1, talk2
- **Focus:**
  - Topic-specific research (chaos magick, finance, etc.)
  - Book consultation for decisions
  - Generates topic-based checks (e.g., ritual-completion.check)
  - 3 topics = expert knowledge base per domain
- **Integration:** Each domain agent has library (Librarian provides books)
- **Example checks:** chaos-magick.check, finance.check
- **Already exists:** ~/Documents/librarian/

---

## Agent Structure (Universal Requirements)

**Every agent needs:**
1. **Name** (department/role identifier)
2. **Library** (3 topic-specific books via Librarian)
3. **Checks** (domain-specific + general, deterministic or probabilistic)
4. **API Access** (tools for reading/writing)
5. **Repository** (own folder, git-tracked, commit justifications)
6. **Journal/Notes** (diaries, logs, audio recordings)

---

## Agent Count Summary

**Domain agents:** 7 (UXR, Design, Dev, Marketing, Legal, Growth, Infrastructure)

**Special function agents:** 3 (Orchestrator, Business Analyst, Process Specialist)

**Topic-based agents:** 1 (Librarian - already exists)

**Total unique agent types:** 11

---

## Notes

- **Synthetic company:** Agents = employees (human or AI, doesn't matter)
- **Highly auditable:** Git commits = decision trail
- **Proactive participation:** Agents can self-nominate for epics or decline
- **Pipeline evolution:** High maintenance → plateau → sample-based review
- **Check library = Company DNA:** Reusable, portable, modular quality standards

---

**This is the foundation. 11 agent types to build a synthetic company.** 🏴
