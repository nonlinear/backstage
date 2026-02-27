# v0.33.0 - OpenProject Migration & MD Mirror

**Created:** 2026-02-26  
**Status:** New  
**OpenProject:** http://localhost:8086/work_packages/302

---

## 🎯 Goal

Establish robust structure for project/epic tracking with:
- OpenProject = tracker (status, assignments, workflow)
- Markdown files = documentation (context, research, decisions)
- Seamless cross-referencing
- Multi-device viewing (localhost reader or sync)

---

## 📋 Architecture

### Directory Structure

```
~/Documents/PROJECT/backstage/
├── epic-notes/
│   ├── INDEX.md              # Auto-generated epic overview
│   ├── vX.Y.Z-name.md       # Deep documentation
│   └── vX.Y.Z-diagram.html  # Visual contracts (optional)
├── checks/
│   ├── global/
│   │   └── epic-openproject-parity.sh  # Anti-drift validation
│   └── local/
│       └── ... (project-specific checks)
└── README.md                 # Project overview
```

**What gets deleted:**
- ❌ `ROADMAP.md` (replaced by OpenProject tracker)
- ❌ `CHANGELOG.md` (replaced by OpenProject Closed status)

**What stays:**
- ✅ `epic-notes/` (deep documentation, Markdown preferred)
- ✅ `checks/` (validation, anti-drift, CI/CD)
- ✅ `README.md` (project overview, public-facing)

---

## 🔗 Cross-Referencing

### OpenProject Epic Format

```
Subject: v0.X.0 - Epic Name

Description:
  Brief 1-2 line summary of what this epic does.
  
  Detailed documentation: epic-notes/vX.Y.Z-name.md
  
  Status: [New/In Progress/Closed]
  Priority: [Low/Normal/High]
```

### Epic-notes/ Format

```markdown
# vX.Y.Z - Epic Name

**Created:** YYYY-MM-DD
**Status:** [New/In Progress/Closed]
**OpenProject:** http://localhost:8086/work_packages/ID

---

## Context
[Deep background, why this epic exists]

## Research
[Findings, explorations, options considered]

## Decisions
[What was chosen and why]

## Implementation
[Technical details, architecture, gotchas]

## Sources
[Links, references, prior art]
```

---

## 🔍 Anti-Drift Checks

### `checks/global/epic-openproject-parity.sh`

**Validations:**

1. **Every OpenProject epic → epic-notes/ exists**
   ```bash
   # Query OpenProject API for all epics
   # For each epic vX.Y.Z:
   #   Check epic-notes/vX.Y.Z-*.md exists
   #   Exit 1 if missing
   ```

2. **Every epic-notes/ → OpenProject epic exists**
   ```bash
   # List all epic-notes/v*.md files
   # Extract version (vX.Y.Z)
   # Query OpenProject for matching subject
   # Exit 1 if orphan found
   ```

3. **Description links correct file**
   ```bash
   # For each epic:
   #   Parse description for "epic-notes/..." link
   #   Verify file exists
   #   Exit 1 if broken link
   ```

4. **Git branch ↔ Status sync**
   ```bash
   # If status = "In Progress" → git branch epic/vX.Y.Z must exist
   # If git branch epic/vX.Y.Z exists → status must be "In Progress"
   # Exit 1 if mismatch
   ```

5. **Closed epics → no active branches**
   ```bash
   # If status = "Closed" → no epic/vX.Y.Z branch
   # Exit 1 if closed epic has active branch
   ```

---

## 📱 Multi-Device Viewing

### Option A: Localhost HTML Reader

**Setup:**
```bash
# Serve epic-notes/ via localhost
cd ~/Documents/personal/backstage
python3 -m http.server 8765

# Access from any device:
# http://localhost:8765/epic-notes/
# http://studio.adal-rigel.ts.net:8765/epic-notes/ (Tailscale)
```

**Features:**
- Auto-generate INDEX.html (epic list)
- Markdown → HTML rendering (client-side or server-side)
- CSS injection for diagram contracts
- Links between epics

**Pros:**
- ✅ Works on iPad/iPhone via Tailscale
- ✅ No sync needed (live files)
- ✅ Markdown stays canonical

**Cons:**
- ❌ Needs Mac Studio running (always-on)
- ❌ No offline access on mobile

---

### Option B: Sync Mechanism

**Setup:**
```bash
# Git-based sync
cd ~/Documents/personal/backstage
git push origin main

# Clone on iPad (Working Copy app)
# Pull latest epic-notes/
```

**Pros:**
- ✅ Offline access
- ✅ Git history

**Cons:**
- ❌ Manual sync (pull to see updates)
- ❌ iPad can't edit (read-only)

---

### Option C: Hybrid (Recommended)

**Localhost reader + Git backup:**
- **Primary:** http://studio.adal-rigel.ts.net:8765/epic-notes/ (live)
- **Fallback:** Git clone on iPad (offline)
- **Auto-generate:** INDEX.html on every epic change (cron/hook)

---

## 🎨 Diagram Embedding

### Current State (2026-02-26)

**OpenProject:**
- ❌ No native Mermaid support
- ✅ Can embed images (attachments)
- ✅ Can embed HTML (limited)

### Simplified Diagram Contract (Finde Goal)

**Flow:**
1. Create `epic-notes/vX.Y.Z-diagram.html` (HTML + CSS inject)
2. Screenshot/export SVG
3. Upload to OpenProject as attachment
4. Link in epic description:
   ```
   Diagram: attachment:vX.Y.Z-diagram.svg
   Live: epic-notes/vX.Y.Z-diagram.html
   ```

**Night Shift (Future):**
- Qwen vision model reads epic-notes/
- Auto-generates diagram proposals
- Updates HTML files
- Re-uploads to OpenProject

---

## 🚀 Implementation Tasks

### Phase 1: Structure (Now)
- [x] Migrate all epics to OpenProject
- [x] Commit "Migrated to OpenProject"
- [ ] Delete ROADMAP.md/CHANGELOG.md
- [ ] Create epic-openproject-parity.sh
- [ ] Test anti-drift checks

### Phase 2: HTML Reader (Finde)
- [ ] Create localhost server for epic-notes/
- [ ] Auto-generate INDEX.html
- [ ] Test Tailscale access from iPad
- [ ] Markdown → HTML rendering

### Phase 3: Diagram Integration (Future)
- [ ] Simplified diagram contract (HTML+CSS)
- [ ] Screenshot/export workflow
- [ ] Night Shift auto-generation (Qwen)

### Phase 4: Optimization (Later)
- [ ] Custom fields (Tier, Maturity)
- [ ] Bulk grooming tools
- [ ] OpenProject → custom solution (if needed)

---

## 📚 References

- OpenProject API: https://www.openproject.org/docs/api/
- OpenProject WYSIWYG: https://www.openproject.org/docs/user-guide/wysiwyg/
- Connections doc: `~/Documents/personal/connections/openproject.md`
- Migration scripts: `/tmp/migrate-*.py`

---

## 🏴 Philosophy

**OpenProject = launching pad, not destination.**

- Open source, fully migratable
- API-first, no vendor lock-in
- Build custom interfaces later
- Markdown = canonical documentation
- Checkpoints = CI/CD validation

**Goal:** Exhaust OpenProject → custom solution when ready. For now, get structure right.
