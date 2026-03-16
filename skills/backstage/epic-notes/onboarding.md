# Epic: Onboarding - User Preferences Discovery

**Status:** 📋 BACKLOG  
**Version:** v0.4.0  
**Created:** 2026-02-13

---

## Problem

**Current state:** Backstage-skill assumes preferences (auto-commit, diagram style, epic format).

**Issues:**
1. **No user choice** - AI decides everything
2. **Friction on first use** - Users don't know what to expect
3. **Hidden assumptions** - Auto-commit might surprise users
4. **One-size-fits-all** - Different users want different workflows

**Example scenarios:**
- User A wants auto-commit (fast, trusts AI)
- User B wants confirmation always (careful, learning)
- User C wants gantt charts (visual thinker)
- User D wants minimal epics (concise style)

---

## Solution

**Interactive onboarding** on first run (or when PREFERENCES.md missing).

**Workflow:**
1. Detect first run (no PREFERENCES.md)
2. Ask 5-7 preference questions
3. Save answers to `backstage/PREFERENCES.md`
4. Use preferences in all future backstage-skill runs
5. Allow reconfiguration ("backstage configure")

---

## Onboarding Questions

### 1. Auto-Commit Behavior
```
🏴 Posso commitar automaticamente mudanças determinísticas?
(Navigation blocks, mermaid diagrams, version sync)

[ ] Sim, auto-commit (rápido - ideal se você confia no AI)
[ ] Não, sempre pergunte antes (seguro - ideal se tá aprendendo)
```

**Saved as:**
```yaml
auto_commit: true|false
```

---

### 2. Diagram Style
```
🏴 Que tipo de diagram você prefere no ROADMAP?

[ ] Linear graph (padrão - setas sequenciais)
[ ] Gantt chart (timeline visual)
[ ] Flowchart (decisões e branches)
[ ] Nenhum (só texto - minimalista)
```

**Saved as:**
```yaml
diagram_style: linear|gantt|flowchart|none
```

---

### 3. Version Synchronization
```
🏴 Quando global POLICY muda version, atualizo automático?

[ ] Sim, sempre sincronize (zero lag - ideal pra admin)
[ ] Não, deixe manual (controle - ideal pra external users)
```

**Saved as:**
```yaml
auto_sync_version: true|false
```

---

### 4. Epic Format
```
🏴 Prefere formato minimalista ou detalhado nos epics?

[ ] Minimalista (problem/solution/tasks - rápido)
[ ] Detalhado (+ success criteria, risks, learnings - completo)
```

**Saved as:**
```yaml
epic_format: minimal|detailed
```

---

### 5. README Protection
```
🏴 README é especial (nunca edito sem perguntar)?

[ ] Sim, sempre pergunte (README = conteúdo sensível)
[ ] Não, pode editar navigation blocks e versions (pragmático)
```

**Saved as:**
```yaml
readme_protected: true|false
```

---

### 6. POLICY Enforcement Mode
```
🏴 Como você quer enforcement de POLICY?

[ ] Hard fail (bloqueia commit se checks falham - strict)
[ ] Soft warn (avisa mas deixa commitar - tolerante)
[ ] Report only (só mostra, não bloqueia - informativo)
```

**Saved as:**
```yaml
enforcement_mode: hard|soft|report
```

---

### 7. Language Preference
```
🏴 Prefere mensagens em Português ou English?

[ ] Português (brasileiro)
[ ] English
[ ] Auto-detect (usa language do sistema)
```

**Saved as:**
```yaml
language: pt-BR|en|auto
```

---

## PREFERENCES.md Format

**Location:** `<project>/backstage/PREFERENCES.md`

**Structure:**
```yaml
---
# Backstage User Preferences
# Generated: 2026-02-13
# Last updated: 2026-02-13

auto_commit: true
diagram_style: linear
auto_sync_version: true
epic_format: detailed
readme_protected: true
enforcement_mode: hard
language: pt-BR
---

## Notes

You can edit this file manually or run `backstage configure` to re-run onboarding.

**Preference inheritance:**
- Project preferences (this file) override global defaults
- If preference missing → falls back to global POLICY defaults
```

---

## Implementation Phases

### Phase 1: Detection (OPEN)
- Check if `backstage/PREFERENCES.md` exists
- If missing → trigger onboarding
- If exists → load preferences

### Phase 2: Interactive Questions (OPEN)
- CLI prompts (bash `read` or Python `input()`)
- One question at a time
- Show default in parentheses
- Allow skip (uses default)

### Phase 3: Preference Storage (OPEN)
- Write YAML to `backstage/PREFERENCES.md`
- Git commit with message: "Add user preferences (onboarding)"
- Show summary of saved preferences

### Phase 4: Preference Usage (OPEN)
- checks.sh reads PREFERENCES.md
- AI prompts reference preferences
- Auto-commit respects `auto_commit` setting
- Diagram generation uses `diagram_style`

### Phase 5: Reconfiguration (FUTURE)
- `backstage configure` command
- Re-runs onboarding
- Updates existing PREFERENCES.md
- Shows diff (old vs new)

---

## Success Criteria

1. ✅ First-time users get onboarding automatically
2. ✅ Preferences saved to PREFERENCES.md (YAML)
3. ✅ All backstage-skill behavior respects preferences
4. ✅ Users can reconfigure anytime
5. ✅ Clear documentation (what each preference does)
6. ✅ Graceful degradation (missing preference = use default)

---

## Design Decisions

### Why YAML?
- Human-readable (easy to edit manually)
- Machine-parseable (bash + Python can read)
- Comments allowed (users can annotate)

### Why project-level (not global)?
- Different projects = different workflows
- External users might want different settings than admins
- Polycentric governance (project decides)

### Why backstage/PREFERENCES.md?
- Lives with other backstage files (ROADMAP, POLICY, HEALTH)
- Tracked in git (preferences versioned)
- Shareable (team can standardize)

### Why allow manual edit?
- Power users prefer files over wizards
- Quick tweaks (no need to re-run full onboarding)
- Transparency (see all settings in one place)

---

## Open Questions

1. **Should preferences be global + project?**
   - Global: `~/.backstage/preferences.yaml` (cross-project defaults)
   - Project: `backstage/PREFERENCES.md` (overrides)
   - Decision: TBD (start with project-only, add global later?)

2. **Interactive vs config file first-run?**
   - Interactive: Ask questions (friendly)
   - Config: Copy template, edit manually (power user)
   - Decision: TBD (start with interactive?)

3. **What if user skips all questions?**
   - Use all defaults
   - Create PREFERENCES.md anyway (documents defaults)
   - Decision: Yes (explicit > implicit)

4. **Should onboarding be skill or script?**
   - Skill: `~/.openclaw/skills/backstage-onboarding/`
   - Script: `~/Documents/skills/backstage-skill/onboarding.sh`
   - Decision: TBD (script simpler, skill more powerful)

5. **Commit strategy preference (NEW):**
   - How often to commit during session?
   - Options:
     - **Immediate** (current - commit each fix)
     - **Checkpoint** (user says "checkpoint"/"salva")
     - **Session** (1 commit on "boa noite")
     - **Smart** (30min window + crash protection)
   - Decision: TBD (add as preference question #8)

---

## Preference Questions (Updated)

### 8. Commit Strategy (NEW)
```
🏴 Quando devo commitar mudanças durante "bom dia → boa noite"?

[ ] Imediato (cada fix = 1 commit - seguro mas verboso)
[ ] Checkpoint manual (você controla quando commitar)
[ ] Fim de sessão (1 commit em "boa noite" - limpo mas arriscado)
[ ] Smart (commit a cada 30min + proteção contra crash)
```

**Saved as:**
```yaml
commit_strategy: immediate|checkpoint|session|smart
```

**Workflow changes:**
- **immediate:** Current behavior (no change)
- **checkpoint:** "bom dia" stages changes, "checkpoint"/"salva" commits
- **session:** Accumulate in staging, "boa noite" commits all
- **smart:** Auto-commit after 30min of changes + on "boa noite"

---

## Related Work

- **backstage-skill** - Main skill that uses preferences
- **checks.sh** - Enforcement engine (reads preferences)
- **v0.3.0 Companion Skills** - Version parity (preferences solve this)
- **Global POLICY** - Defines defaults (preferences override)

---

## Examples

### Example 1: Conservative User
```yaml
auto_commit: false        # Always ask before commit
diagram_style: none       # Text-only (no diagrams)
auto_sync_version: false  # Manual version updates
epic_format: minimal      # Concise epics
readme_protected: true    # Never touch README
enforcement_mode: hard    # Strict checks
language: en
```

**Result:** Maximum control, minimal automation.

---

### Example 2: Power User (Admin)
```yaml
auto_commit: true         # Fast workflow
diagram_style: linear     # Visual roadmaps
auto_sync_version: true   # Always latest
epic_format: detailed     # Complete documentation
readme_protected: false   # Pragmatic edits
enforcement_mode: soft    # Don't block me
language: pt-BR
```

**Result:** Maximum automation, trust AI.

---

### Example 3: Learning User
```yaml
auto_commit: false        # See what AI does
diagram_style: flowchart  # Visual learner
auto_sync_version: true   # Keep up-to-date
epic_format: detailed     # Understand process
readme_protected: true    # Careful with content
enforcement_mode: report  # Learn without blocking
language: auto
```

**Result:** Educational, transparent, non-blocking.

---

## Notes

**Why this epic matters:**
- Delegation triple cost (work + explain + store methodology)
- Onboarding reduces explanation cost (ask once, remember forever)
- Preferences = documented methodology (AI learns user style)
- Stabilization = less supervision needed each session

**Analogy:**
- No onboarding = AI guesses every time (annoying)
- Onboarding = AI remembers preferences (respectful)
- PREFERENCES.md = contract (clear expectations)

**Future extensions:**
- Team preferences (shared PREFERENCES.md in git)
- Preference versioning (migrate old formats)
- Preference validation (catch typos)
- Preference export/import (share across projects)
