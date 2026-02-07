# Backstage Skill

**Project management framework for epic-driven development.**

**Trigger:** `backstage [project-path]`
- `backstage` → uses current directory
- `backstage Documents/myproject` → specific project

---

## What It Does

Backstage provides structure for managing projects through:
- **Epics** (semantic versioned milestones)
- **Health checks** (ensure project quality)
- **Polycentric governance** (project rules override global rules)
- **Branch dance** (epic → branch → merge workflow)

---

## Installation

### Via ClawdHub (Recommended)

```bash
clawdhub install backstage
```

### Manual (for development)

```bash
# Clone or download skill/
ln -s ~/path/to/backstage/skill ~/.openclaw/skills/backstage
```

---

## Usage

### Start a Work Session

```bash
backstage.sh start [project-path]
```

**What it does:**
1. Checks if backstage/ exists (installs if needed)
2. Checks for updates (once/day)
3. Executes POLICY protocol (updates navigation, version)
4. Runs HEALTH checks (validates project state)
5. Shows active epics from ROADMAP

**Output:**
```
✅ All health checks passed - ready to work

📌 What's next?

Active epics:
  • v0.1.0 - Environment Setup
  • v0.2.0 - Navigation Logic

✅ Session ready! 🚀
```

---

### Run Health Checks Only

```bash
backstage.sh health
```

Executes all bash code blocks from:
- `backstage/global/HEALTH.md`
- `backstage/POLICY

.md` (if exists, overrides global)

---

### Manual Install

```bash
backstage.sh install
```

Fetches latest backstage files from GitHub and installs to `backstage/` folder.

---

### Force Update

```bash
backstage.sh update
```

Updates `backstage/global/` from repo main (bypasses timestamp check).

---

## Flow Diagram

See `backstage-skill-flow.html` for visual architecture.

**Key steps:**
1. Has Backstage? → No: Install | Yes: Check version
2. Up to date? → No: Ask update → Yes: Continue
3. Execute POLICY (project wins global)
4. Execute HEALTH (project wins global)
5. Health pass? → No: User + AI fix → Yes: Display next steps
6. What's next? → Show active epics

---

## Files Structure

```
backstage/
├── README.md           # Project overview
├── ROADMAP.md          # Planned epics (future)
├── CHANGELOG.md        # Completed epics (past)
├── POLICY.md           # Project-specific rules (overrides global/)
├── HEALTH.md           # Project-specific checks (overrides global/)
└── global/
    ├── POLICY.md       # Framework rules (canonical)
    └── HEALTH.md       # Framework checks (canonical)
```

---

## Configuration

### Update Frequency

Update checks run once per day. Timestamp stored in:
```
backstage/.last-update-check
```

Format: `YYYY-MM-DD|answer` (e.g., `2026-02-07|no`)

### Repository

Default: `github.com/nonlinear/backstage` branch `main`

To change, edit `REPO_OWNER`, `REPO_NAME`, `REPO_BRANCH` in `backstage.sh`.

---

## Polycentric Governance

**Global vs Project rules:**

- **Global** (`backstage/global/POLICY.md`): Framework canonical rules
- **Project** (`backstage/POLICY.md`): Project-specific overrides

**Precedence:** Project ALWAYS wins over global.

**Why:** Allows framework evolution without breaking existing projects.

---

## Health Checks

**Format:** Bash code blocks in HEALTH.md

```markdown
## Check Example

```bash
if [ ! -f "README.md" ]; then
  echo "❌ Missing README.md"
  exit 1
fi
echo "✅ README.md exists"
```
```

**Execution:** Skill extracts and runs each bash block independently.

**Failures:** Reported to user, auto-fix attempted, then manual fix if needed.

---

## Version Tracking

**Version lives in navigation block:**

```markdown
> 🤖 backstage rules [v0.3.0](https://github.com/nonlinear/backstage)
```

**Detection:**
- **Epic branch:** Extract from branch name (`epic/v0.3.0-*` → v0.3.0)
- **Main branch:** Read latest CHANGELOG epic

**Meta-rule (backstage-specific):**

When working on epic branch, `global/POLICY.md` version MUST match epic version.

Example:
```bash
git checkout -b epic/v0.3.0-openclaw-skill
# Update global/POLICY.md: v0.2.0 → v0.3.0 immediately
```

**Why:** When epic merges, version becomes official (CHANGELOG = source of truth).

---

## Update Tease Message

When update available, shows storytelling message (not feature list):

```
🔄 Backstage v0.3.0 available

The protocol learned to automate itself. Health checks run in the background,
epics create themselves with the right version numbers, and you can finally
see the whole workflow as a diagram instead of imagining it.

Oh, and it stops asking you to update every five minutes.

Full story: [CHANGELOG.md link]
Browse the skill: [skill/ link]
Updated rules: [global/POLICY.md link]

Update? (y/n):
```

**Vibe:** Hook, intrigue, inline links, personality.

---

## Prompt Equivalent

For non-OpenClaw environments (VSCode, other AI assistants):

See `backstage.prompt.md` for equivalent prompt-based workflow.

**Same logic, different execution:**
- Skill: Bash script (`backstage.sh`)
- Prompt: AI executes markdown instructions

---

## Development

### Testing Changes

```bash
# Symlink skill for live testing
ln -s ~/Documents/backstage/skill ~/.openclaw/skills/backstage

# Test
backstage.sh start ~/path/to/test-project

# When done, restore published version
rm ~/.openclaw/skills/backstage
clawdhub install backstage
```

### Publishing Updates

```bash
cd ~/Documents/backstage
clawdhub publish skill/ --slug backstage --version 0.3.0
```

---

## Meta: Backstage Uses Backstage

**Bootstrapping paradox:**

Backstage IS a project, so it uses its own protocol to build itself.

**Implications:**
- `epic/v0.3.0-*` branch has `global/POLICY.md` with v0.3.0 (future)
- `main` branch has `global/POLICY.md` with v0.2.0 (current stable)
- Both correct for their context

**This is intentional meta-design.** The protocol builds itself using its own rules.

---

## License

MIT (or your preferred license)

---

**Questions? Issues?**

- Repo: https://github.com/nonlinear/backstage
- Issues: https://github.com/nonlinear/backstage/issues
