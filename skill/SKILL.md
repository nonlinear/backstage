# Backstage Skill

**AI-driven project management protocol for OpenClaw.**

---

## Trigger

When user says:
- `backstage <project-path>`
- `backstage start` (uses current directory)
- `backstage health` (health checks only)
- `backstage close` (end of session workflow)

---

## Architecture (v0.3.0)

**Skill = thin wrapper (80 lines bash)**
- Checks if backstage/ exists
- Dumps POLICY.md content
- Exits

**POLICY = AI execution protocol (900+ lines markdown)**
- All workflow logic lives here
- Human-readable instructions for AI
- Single source of truth

**AI executes protocol:**
- Reads POLICY.md
- Follows steps (health checks, navigation blocks, roadmap sync)
- Reports completion

---

## Diagram (Skill → POLICY → AI)

```
User: "backstage start"
    ↓
skill/backstage.sh (thin wrapper)
    ↓
Dumps: backstage/global/POLICY.md + backstage/POLICY.md
    ↓
AI reads POLICY
    ↓
AI executes protocol:
  1. Run HEALTH checks
  2. Update navigation blocks
  3. Sync ROADMAP with work
  4. Display "What's next"
    ↓
AI reports: "✅ Protocol executed"
```

---

## Why This Architecture?

**Problem (v0.2.0):** Skill had 500+ lines of bash logic. If POLICY changed format, skill broke.

**Solution (v0.3.0):** Empty skill, move ALL logic to POLICY.

**Benefits:**
- ✅ No code duplication (skill ≠ prompt)
- ✅ POLICY changes propagate automatically
- ✅ Human-readable protocol (not bash scripts)
- ✅ Polycentric governance (human decides via POLICY, AI executes)

---

## Files

- **skill/backstage.sh** - Thin wrapper (80 lines)
- **skill/SKILL.md** - This file
- **backstage/global/POLICY.md** - Universal workflow rules (ALL logic lives here)
- **backstage/global/HEALTH.md** - Universal health checks
- **backstage/POLICY.md** - Project-specific overrides (optional)
- **backstage/HEALTH.md** - Project-specific checks (optional)

---

## Core Prompts

**Located in `.github/prompts/`:**

- **backstage-start.prompt.md** - Pre-commit workflow (66 lines)
- **backstage-close.prompt.md** - End of session (47 lines)
- **backstage-update.prompt.md** - Framework updates (48 lines)

**All prompts reference POLICY.md - no duplication!**

---

## Installation

**For users:**
```bash
# Clone backstage repo
git clone https://github.com/nonlinear/backstage
cd your-project

# Copy backstage/ folder
cp -r ../backstage/backstage .
cp -r ../backstage/templates backstage/

# Edit ROADMAP.md to plan your project
```

**For OpenClaw (symlink during development):**
```bash
ln -s ~/Documents/backstage/skill ~/.openclaw/skills/backstage
```

---

**This is a PROTOCOL, not a tool. Logic lives in POLICY.md, not code.**
