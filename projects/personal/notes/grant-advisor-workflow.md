# Grant Advisor Agent - Workflow

**Agent:** #10 Grant Advisor  
**Squad:** Resources  
**Domain:** Funding Acquisition  
**Epic Role:** Disrupt (adds epics based on grant opportunities)

---

## Responsibilities

1. Monitor grant opportunities (databases, RFPs, foundation announcements)
2. Generate grant proposals from existing roadmaps (API-driven)
3. Disrupt roadmap when grants available (add funded epics)
4. Track submission deadlines + requirements
5. Budget alignment (hours × rate, resource needs)

---

## Grant Proposal Workflow (API-Driven)

**Context:** Commons business model (v0.21.0) = grants are primary funding source.

**Goal:** Fast grant proposal generation from existing PM tool roadmaps.

### Inputs (from PM tool API)

**Data pulled:**
- Tasks (title, description, success criteria)
- Timeline (start/end dates, dependencies)
- Hours logged (time tracking)
- Budget (hours × rate)
- Team structure (agent placeholders = roles needed)

**Required fields:**
- Project summary (epic description)
- Deliverables (task list with success criteria)
- Milestones (Gantt with dependencies)
- Impact statement (why this matters, who benefits)

### Workflow Steps

1. **Work normally** (tasks, epics, time tracking in PM tool)
2. **Grant opportunity appears** (Grant Advisor monitors)
3. **Run skill:** `generate-grant-proposal --project librarian --output slides`
4. **API pulls data:**
   - Tasks → Deliverables
   - Timeline → Gantt chart
   - Hours → Budget (hours × $75/hr)
   - Agents → Team roles
5. **Generate Mermaid Gantt:**
   ```mermaid
   gantt
     title Librarian v0.15.0
     section Research
       Semantic search: 2026-03, 40h
       Book indexing: 2026-04, 30h
   ```
6. **Render slides (Marp/reveal.js):**
   - Title slide (project name)
   - Gantt chart
   - Deliverables (tasks with checkboxes)
   - Budget breakdown
   - Impact statement (from epic notes)
7. **Export PDF** (via puppeteer/playwright)
8. **Customize narrative** (Grant Advisor edits context, impact)
9. **Submit** (grant ready <1 hour)

**Key insight:** PM tool = data storage. API = interface. Grant Advisor controls output format.

---

## Example Use Case

**Scenario:**
```
User: "Generate grant proposal for Librarian epic"

PM tool exports via API:
- Gantt chart (v0.15.0 timeline, 6 months)
- Budget (120 hours × $75/hr = $9,000)
- Deliverables (5 tasks with success criteria)
- Architecture diagram (semantic search + check library)
- Team structure (AI researcher, UX designer, dev)

Grant Advisor adds:
- Impact statement (open access research, commons)
- Community benefit (500+ users, educational access)
- Alignment (Foundation for Open Knowledge mission)

Output: PDF proposal ready to submit
```

---

## PM Tool Requirements

**Must support:**
- ✅ Gantt export (PDF, Excel, Mermaid via API)
- ✅ Budget tracking (cost modules, hours × rate)
- ✅ Time tracking (logged hours per task)
- ✅ Custom fields (success criteria, impact, domain)
- ✅ API access (full CRUD, webhooks)

**Grant-ready exports:**
- PDF (most common submission format)
- Slides (for pitch presentations)
- Markdown (for editing/collaboration)
- Excel/CSV (budget spreadsheets)

---

## Output Formats

### Slides (Marp/reveal.js)

**Structure:**
1. Title slide (project name, submitter)
2. Problem statement (why this matters)
3. Solution overview (what we're building)
4. Timeline (Gantt chart)
5. Deliverables (task list with success criteria)
6. Budget breakdown (hours × rate, total)
7. Team structure (roles, expertise)
8. Impact (who benefits, how measured)
9. Call to action (funding request, next steps)

### PDF Export

**Via:** puppeteer/playwright (headless browser)

**From:** Marp HTML slides → PDF print

**Quality:** 300 DPI, embedded fonts, vector graphics

---

## PM Tool Evaluation (Grant Support)

| Tool | Gantt Export | Budget Tracking | Time Tracking | API Quality | Grant Score |
|------|--------------|-----------------|---------------|-------------|-------------|
| **OpenProject** | ✅ PDF, Excel | ✅ Cost modules | ✅ Hours logged | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ (4/5) |
| **Leantime** | ✅ Built-in | ✅ Yes | ✅ Yes | ❓ Unknown | ⭐⭐⭐⭐ (4/5) |
| **Taiga** | ⚠️ Limited | ⚠️ No built-in | ✅ Yes | ⭐⭐⭐⭐ | ⭐⭐ (2/5) |
| **Focalboard** | ❌ No Gantt | ❌ No | ⚠️ Basic | ⭐⭐⭐ | ❌ Not suitable |

**Recommended:** OpenProject or Leantime (both support grant workflows)

---

## Skills Needed

1. **`generate-grant-proposal`** (main workflow)
   - Pulls PM tool API
   - Generates Mermaid Gantt
   - Renders slides (Marp)
   - Exports PDF

2. **`monitor-grants`** (opportunity detection)
   - Scrapes grant databases
   - Filters by domain (tech, commons, education)
   - Alerts when relevant RFPs appear

3. **`budget-calculator`** (cost estimation)
   - Hours × rate
   - Resource costs (hosting, tools, etc.)
   - Total budget formatting

---

## Disrupt Roadmap Protocol

**When grant opportunity found:**

1. **Assess fit** (domain, timeline, budget match?)
2. **Create epic** (in PM tool via API)
3. **Notify Orchestrator** ("Grant opportunity: X, deadline Y, budget Z")
4. **Wait for approval** (Orchestrator decides priority)
5. **If approved:** Generate proposal immediately
6. **If rejected:** Archive opportunity (may revisit later)

**Example:**
```
Grant: "Foundation for Open Knowledge - Commons Tools ($10k)"
Fit: ✅ Librarian project (commons, open access)
Timeline: 6 months (matches v0.15.0)
Budget: $9k (within range)

→ Create epic v0.15.1 "Grant-funded Librarian"
→ Notify Orchestrator
→ Await approval
→ Generate proposal
```

---

## Success Metrics

**Grant Advisor performance:**
- **Proposal speed:** <1 hour (from roadmap to PDF)
- **Approval rate:** >30% (grants submitted → funded)
- **Budget accuracy:** ±5% (estimated vs actual)
- **Deadline compliance:** 100% (no late submissions)

**Business impact:**
- **Funding secured:** $X/year (sustainable commons work)
- **Overhead reduced:** 80% time saved vs manual proposals
- **Opportunities captured:** No grants missed (monitoring automation)

---

## Related

- [v0.3.0 PM Tool Evaluation](v0.3.0-pm-tool-evaluation.md) — Tool comparison
- [v0.21.0 Business Model](v0.21.0-business-model-commons.md) — Commons funding strategy
- [ai-agents-domains.md](ai-agents-domains.md) — Grant Advisor role (#10)

---

**This is CRITICAL for commons sustainability.** Grant-ready exports = faster funding = viable business model.
