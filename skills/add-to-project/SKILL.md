---
name: add-to-project
description: Add ideas to project epics (auto-detects epic/task/note, parks or creates)
version: 2.0.0
triggers:
  - "add to PROJECT:"
  - "PROJECT note:"
  - "add task to PROJECT:"
---

# Add to Project Skill

**Purpose:** Park ideas immediately in Backstage (never orphaned, always visible).

**Philosophy:** Ideas → parked first → create epic only if needed.

---

## Triggers

- `add to personal: arr suite automation`
- `studio note: compare OPA vs Temporal`
- `add task to librarian: fix search ranking`

---

## Workflow Diagram

```mermaid
flowchart TD
    TRIGGER["User: 'add to PROJECT: IDEA'"]
    PARSE["Parse: Project + Content"]
    
    CHECK_PROJ{"Project exists?"}
    LIST_PROJ["List available:<br/>- personal<br/>- studio<br/>- backstage<br/>- librarian"]
    
    SCAN["Scan epics/<br/>Fuzzy match IDEA"]
    MATCH{"Match?"}
    
    MULTIPLE["Multiple matches:<br/>1. vX - Epic A<br/>2. vY - Epic B<br/>3. Create new"]
    NONE["No match:<br/>Create new epic"]
    
    DETECT_TYPE{"Type?"}
    
    PARK_TASK["Append to ## Tasks<br/>- [ ] IDEA"]
    PARK_NOTE["Append to ## Research"]
    CREATE_EPIC["Create vX.Y.Z/<br/>epic.yaml + index.md"]
    
    COMMIT["git commit"]
    REPORT["✅ Action + Link<br/>http://localhost:3004/..."]
    
    TRIGGER --> PARSE
    PARSE --> CHECK_PROJ
    
    CHECK_PROJ -->|No| LIST_PROJ
    CHECK_PROJ -->|Yes| SCAN
    LIST_PROJ --> SCAN
    
    SCAN --> MATCH
    
    MATCH -->|Multiple| MULTIPLE
    MATCH -->|None| NONE
    MATCH -->|One| DETECT_TYPE
    
    MULTIPLE --> DETECT_TYPE
    NONE --> CREATE_EPIC
    
    DETECT_TYPE -->|Task| PARK_TASK
    DETECT_TYPE -->|Note| PARK_NOTE
    DETECT_TYPE -->|Epic| CREATE_EPIC
    
    PARK_TASK --> COMMIT
    PARK_NOTE --> COMMIT
    CREATE_EPIC --> COMMIT
    
    COMMIT --> REPORT
```

---

## Type Detection

**Epic signals:**
- Multi-component ("arr suite", "meshtastic network")
- New system/area
- No action verb

**Task signals:**
- Action verb: "fix", "add", "configure", "test", "update"
- Specific, bounded action

**Note signals:**
- "research", "compare", "investigate", "learn"
- Questions

**Default:** Task (most common).

---

## Epic Matching

**Fuzzy match on:**
1. Epic name (epic.yaml)
2. Epic goal (epic.yaml)
3. Keywords in index.md

**Multiple matches → Ask user to choose.**

**No match → Create new epic.**

---

## Epic Creation

**Location:** `~/Backstage/projects/PROJECT/epics/vX.Y.Z/`

**Files created:**

### epic.yaml
```yaml
---
name: "Epic Name"
goal: "Brief description from user input"
status: backlog
type: "minor"
created: 2026-MM-DD
started: null
completed: null
tasks:
  - text: "Initial task from user input"
    checked: false
---
```

**CRITICAL:** Tasks use `text:` + `checked:` format (NOT simple strings, NOT emoji prefixes).

### index.md
```markdown
# Epic Name

## Context
[Auto-generated from goal]

## Tasks
- [ ] Initial task from user input

## Research

## Done
```

**Rules:**
- NO version in title (just `# Epic Name`)
- NO redundant metadata (status/goal already in yaml)
- Sections: Context → Tasks → Research → Done

---

## Version Numbering

**Next version = max(existing versions) + 0.1.0**

**Example:**
- Existing: v2.3.0, v2.4.0
- Next: v2.5.0

**Project-specific counters** (studio v2.3.0 ≠ personal v2.3.0).

---

## Report Format

### Parked Task
```
✅ Parked in v2.3.0 - Epic Name
http://localhost:3004/projects/PROJECT#v2.3.0
```

### Created Epic
```
✅ Created v2.5.0 - Epic Name
http://localhost:3004/projects/PROJECT#v2.5.0
```

**Always include Backstage link** (user can click to verify).

---

## Backstage URL Structure

**Format:** `{backstage_base}/projects/{project}#{version}`

**Localhost:**
```
http://localhost:3004/projects/{project}#{version}
```

**Tailscale:**
```
https://studio.adal-rigel.ts.net:3004/projects/{project}#{version}
```

**Examples:**
- Personal epic v1.2.0: `http://localhost:3004/projects/personal#v1.2.0`
- Studio epic v2.7.0: `https://studio.adal-rigel.ts.net:3004/projects/studio#v2.7.0`
- Librarian epic v0.15.0: `http://localhost:3004/projects/librarian#v0.15.0`

**Critical:** Version uses `#` anchor (NOT `/epics/vX.Y.Z` path).

---

## Disambiguation Examples

### Unknown project
```
❓ Which project?
  - personal
  - studio
  - backstage
  - librarian
```

### Multiple matches
```
❓ "search" matches multiple epics:
  1. v2.1.0 - Search UI
  2. v2.5.0 - Performance
  3. Create new epic
```

### Ambiguous type
```
❓ Is "arr suite" a new epic or task for existing epic?
```

---

## Critical Rules

1. **Park in Backstage ONLY** (never epic-notes/)
2. **Always git commit** after changes
3. **Always report with link** (user verifies visually)
4. **Create epic if no match** (don't leave orphaned)
5. **Tasks in BOTH** (epic.yaml for UI, index.md for humans)

---

## Task Syntax Reference

**epic.yaml (CORRECT):**
```yaml
tasks:
  - text: "Task description"
    checked: false
```

**epic.yaml (WRONG):**
```yaml
# ❌ Simple strings
tasks: ["Task description"]

# ❌ Emoji prefixes  
tasks: ["✅ Task"]
```

**index.md (CORRECT):**
```markdown
## Tasks
- [ ] Task description
- [x] Completed task
```

---

## CRITICAL: Epic YAML Format (STANDARD - enforced 2026-03-16)

**Backstage UI parser requires EXACT format. Deviations = epic invisible.**

**MANDATORY fields:**
```yaml
---
version: v0.1.0               # REQUIRED (epic identifier)
name: "Epic Name"             # REQUIRED (display name)
status: backlog               # REQUIRED (backlog|active|done)
type: minor                   # REQUIRED (minor|major|patch)
created: 2026-03-15           # REQUIRED (YYYY-MM-DD)
started: null                 # OPTIONAL (null or YYYY-MM-DD)
completed: null               # OPTIONAL (null or YYYY-MM-DD)
goal: "Brief description"     # REQUIRED (one-line summary)
tasks:                        # REQUIRED (can be empty list)
  - text: "Task description"  # REQUIRED per task
    checked: false            # REQUIRED per task (true|false)
---
```

**Status values:**
- `backlog` - not started
- `active` - currently working
- `done` - completed

**Type values:**
- `minor` - feature/improvement
- `major` - breaking change/large scope
- `patch` - bugfix/small change

**Task format (ONLY valid syntax):**
```yaml
tasks:
  - text: "Task description"
    checked: false
  - text: "Another task"
    checked: true
```

**WRONG (breaks UI parsing):**
```yaml
# ❌ Missing version field
---
name: "Epic Name"
status: active
---

# ❌ Markdown headers inside YAML
---
version: v2.7.0
name: "Epic Name"
---
# Epic v2.7.0
## Context
...

# ❌ Extra fields (ignored or breaks parser)
---
version: v2.7.0
summary: "Long text..."
context: ["Multiple sections"]
decisions:
  - date: 2026-03-15
    decision: "..."
technical_notes:
  key: "More text..."
---

# ❌ Wrong task format
tasks: ["Simple string"]          # Missing text:/checked: keys
tasks:
  - "✅ Task with emoji"          # Wrong format
  - id: T1                        # Extra fields
    text: "Task"
    status: done                  # Wrong key (use checked:)
```

**Why it breaks:**
- Backstage parser expects minimal keys
- Extra fields = ignored or malformed
- Large YAML = slow parsing, UI times out
- Technical notes belong in `notes.md`, NOT `epic.yaml`

**Structure:**
```
epics/vX.Y.Z/
  epic.yaml          ← Simple (name, goal, status, tasks)
  index.md           ← Human-readable narrative
  notes.md           ← Technical details, decisions, references
  other-docs.md      ← Supporting materials
```

**Rule:** epic.yaml = metadata ONLY. Everything else = separate .md files.

**Parity lesson (v2.7.0):**
- Created 18KB epic.yaml with decisions/notes/references
- Epic invisible in Backstage UI
- Simplified to 851 bytes → appeared instantly
- Moved notes to `notes.md` → works perfectly

**Remember:** UI expects structure, not novel. Keep epic.yaml lean.

---

## Lessons Learned (2026-03-16)

**What I did WRONG today:**
- Created research-exchange v0.2.0 using Markdown sections inside YAML
- Created research-exchange v0.3.0 using Markdown sections inside YAML
- Both epics INVISIBLE in Backstage UI
- Ignored the skill's own documentation

**What I learned:**
- Backstage parser ONLY reads YAML tasks format
- Markdown sections (### 1. Task Group) = ignored completely
- Epic appears in UI ONLY if `version:` field exists
- Must use `text:` + `checked:` format (NOT Markdown checkboxes in YAML)

**Corrected format (research-exchange v0.2.0 & v0.3.0):**
```yaml
---
version: v0.2.0
name: Config Design Engineer
status: active
created: 2026-03-13
type: minor
goal: "Configure design-engineer agent..."
tasks:
  - text: "Define agent role & responsibilities"
    checked: false
  - text: "Select core values"
    checked: false
---
```

**Before (WRONG - epic invisible):**
```yaml
---
version: v0.2.0
name: Config Design Engineer
status: active
---

# Epic v0.2.0: Config Design Engineer

### 1. Define Framework
- [ ] Agent role & responsibilities
- [ ] Decision boundaries
```

**Why it broke:**
- Markdown inside YAML = parser stops at `---` 
- Tasks not in YAML = UI can't render checkboxes
- No `version:` field = epic not found by router

**Rule I violated:**
> "epic.yaml = metadata ONLY. Everything else = separate .md files."

**Trust the skill documentation. It exists for this reason.**

---

**Created:** 2026-03-12  
**Updated:** 2026-03-16 (lessons learned: YAML tasks mandatory)  
**Location:** `~/.openclaw/workspace/skills/add-to-project/SKILL.md`
