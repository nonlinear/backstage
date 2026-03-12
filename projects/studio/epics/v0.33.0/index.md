# OpenProject Migration

**Goal:** Establish robust structure for project/epic tracking with:
- OpenProject = tracker (status, assignments, workflow)
- Markdown files = documentation (context, research, decisions)
- Seamless cross-referencing
- Multi-device viewing (localhost reader or sync)

---

## Architecture

### Directory Structure

```
~/Backstage/projects/PROJECT/epics/
├── vX.Y.Z/
│   ├── epic.yaml         # Metadata
│   └── index.md          # Documentation
```

**What got deleted:**
- ❌ `ROADMAP.md` (replaced by Backstage tracker)
- ❌ `CHANGELOG.md` (replaced by epic status)

**What stayed:**
- ✅ `epics/` (structured documentation)
- ✅ `checks/` (validation, anti-drift)
- ✅ `README.md` (project overview)

---

## Cross-Referencing

### OpenProject Epic Format

```
Subject: v0.X.0 - Epic Name

Description:
  Brief 1-2 line summary.
  
  Documentation: ~/Backstage/projects/PROJECT/epics/vX.Y.Z/
```

### Epic YAML Format

```yaml
---
name: "Epic Name"
goal: "What this epic achieves"
status: backlog | active | done
tasks:
  - text: "Task description"
    checked: false
---
```

---

## Anti-Drift Checks

### epic-openproject-parity.sh

**Validations:**
1. Every OpenProject epic → epic YAML exists
2. Every epic YAML → OpenProject epic exists
3. Description links correct directory
4. Git branch ↔ Status sync (active = branch exists)
5. Done epics → no active branches

---

## Multi-Device Viewing

### Localhost HTML Reader

```bash
cd ~/Backstage/projects/PROJECT
python3 -m http.server 8765

# Access:
# http://localhost:8765/epics/
# http://studio.adal-rigel.ts.net:8765/epics/ (Tailscale)
```

**Features:**
- Auto-generated epic index
- Markdown → HTML rendering
- Live files (no sync needed)

---

## Diagram Integration (Future)

**Flow:**
1. Create `vX.Y.Z/diagram.html` (HTML + CSS)
2. Screenshot/export SVG
3. Upload to OpenProject
4. Link in description

**Night Shift (Future):**
- Qwen vision reads epics
- Auto-generates diagram proposals
- Updates HTML files

---

## Philosophy

**OpenProject = launching pad, not destination.**

- Open source, fully migratable
- API-first, no vendor lock-in
- Build custom interfaces later
- Markdown = canonical documentation
- Checkpoints = CI/CD validation

**Goal:** Exhaust OpenProject → custom solution when ready. For now, get structure right.

---

## References

- OpenProject API: https://www.openproject.org/docs/api/
- Connections: `~/Documents/personal/connections/openproject.md`
- Migration scripts: `/tmp/migrate-*.py`
