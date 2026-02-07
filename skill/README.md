# Backstage Skill

**OpenClaw skill for backstage project management framework.**

---

## What It Does

Thin wrapper that dumps POLICY + HEALTH for AI to execute.

**Backstage = AI-driven protocol.** Skill just loads context, AI reads and follows POLICY.

---

## Installation

### For OpenClaw Users

```bash
# Via ClawdHub (when published)
clawdhub install backstage

# Or symlink (development)
ln -s ~/Documents/backstage/skill ~/.openclaw/skills/backstage
```

### For Other Systems

**Use the prompt, not the skill:**

```bash
# Install prompt in your LLM tool (Cursor, Aider, etc)
cp ~/Documents/backstage/backstage.prompt.md ~/.prompts/

# Then use backstage/ structure in your projects
```

**Skill is OpenClaw-specific.** Prompt + POLICY/HEALTH structure works anywhere.

---

## Usage

### Start Workflow

```
User: "backstage start"
Skill: [dumps POLICY + HEALTH]
AI: [reads protocol, executes checks, updates docs, reports next steps]
```

### Merge Epic

```
User: "epic is completed, merge"
User: "backstage start"
AI: [reads POLICY merge workflow, executes merge to main]
```

### Health Checks Only

```
User: "backstage health"
Skill: [dumps HEALTH only]
AI: [runs checks, reports pass/fail]
```

---

## Commands

```bash
backstage start [path]    # Main workflow (pre-commit OR merge)
backstage health [path]   # Health checks only
```

**That's it.** Two commands. Logic lives in POLICY/HEALTH, not skill code.

---

## Project Structure

**Required:**
- `backstage/ROADMAP.md` (your epics)
- `backstage/global/POLICY.md` (universal rules)
- `backstage/global/HEALTH.md` (universal checks)

**Optional:**
- `backstage/POLICY.md` (project-specific overrides)
- `backstage/HEALTH.md` (project-specific checks)

**Polycentric governance:** Project rules win over global rules.

---

## Portability

**OpenClaw-specific:**
- `skill/backstage.sh` (wrapper for OpenClaw)
- `skill/SKILL.md` (OpenClaw skill docs)

**Universal (works anywhere):**
- `backstage.prompt.md` (root prompt)
- `backstage/` structure (POLICY, HEALTH, ROADMAP)

**Use backstage with ANY LLM tool** via prompt + structure. Skill is just OpenClaw convenience.

---

## Version

**0.3.1** - Prompt Cleanup (current)

**Changelog:** See `backstage/CHANGELOG.md`

---

## Links

- **Repository:** https://github.com/nonlinear/backstage
- **Issues:** https://github.com/nonlinear/backstage/issues
- **Docs:** See `backstage/global/POLICY.md` for full workflow
