# Epic: Dealing with Companion Skills

**Status:** 🏗️ ACTIVE  
**Version:** v0.3.0  
**Created:** 2026-02-13

---

## Problem

**Companion skills** (backstage-skill, librarian) live OUTSIDE skills project but need coordination:

1. **Version parity:** Skills project uses backstage-skill v0.X, but skill itself is v0.Y
2. **Symlink dependency:** backstage/global/ is symlinked to backstage project
3. **Update detection:** How to know when companion skill updated?
4. **Compatibility:** Skills project POLICY/HEALTH might break with new backstage-skill version

**Example drift:**
- Skills uses backstage-skill with parse-roadmap.sh
- Skill updated to v2.0 (breaking changes)
- Skills project doesn't know → breaks silently

---

## Solution

### Phase 1: Symlink Strategy ✅

**For admins (Nicholas):**
- `backstage/global/` → symlink to `~/Documents/backstage/backstage/global/`
- Always latest global POLICY/HEALTH
- No sync lag

**For external users:**
- Download global files via curl (copy, not symlink)
- Manual update (or backstage-skill constructs if missing)

**Completed:** 2026-02-13 (symlinks created)

---

### Phase 2: Parity Detection (OPEN)

**Problem:** How to know if companion skill version ≠ project expectation?

**Possible solutions:**

1. **Version check in HEALTH.md:**
   ```bash
   # Check backstage-skill version
   SKILL_VERSION=$(grep "^version:" ~/Documents/skills/backstage-skill/SKILL.md | cut -d: -f2 | tr -d ' ')
   EXPECTED="0.3.0"
   [ "$SKILL_VERSION" = "$EXPECTED" ] && echo "✅ Version match" || echo "⚠️ Update needed"
   ```

2. **Skill self-report:**
   - backstage-skill checks its own version vs POLICY expectation
   - If mismatch → "⚠️ Update me: `clawhub install backstage` or pull latest"

3. **Parity file (manual):**
   - `backstage/PARITY.md` documents:
     - Companion skill versions used
     - Last tested date
     - Known compatibility issues

**Question:** Which approach? All three?

---

### Phase 3: Graceful Degradation (OPEN)

**Scenario:** Companion skill missing or outdated

**Options:**

1. **Hard fail:** Block commit if version mismatch (strict)
2. **Soft warn:** Continue but report issue (tolerant)
3. **Feature detect:** Check if feature exists, fallback if not (adaptive)

**Example (feature detect):**
```bash
if [ -f ~/Documents/skills/backstage-skill/parse-roadmap.sh ]; then
  # Use mermaid generation
else
  # Skip diagram, log warning
fi
```

---

### Phase 4: Update Prompts (FUTURE)

**Idea:** Companion skills suggest updates when detected

```
⚠️ Companion skill update available:
backstage-skill v0.4.0 released (you have v0.3.0)

Changes:
- New mermaid styles
- Breaking: parse-roadmap.sh output format changed

Update: clawhub install backstage
```

---

## Current Work (2026-02-13 Evening)

### Debug: Global POLICY Template Not Propagating

**Problem:**
- Changed global/POLICY.md → "backstageeee protocol" (test)
- Symlinks work (skills/life see change via `backstage/global/`)
- **But READMEs didn't update** after "bom dia"
- Skill should read template → update all READMEs
- Not happening

**Expected behavior:**
1. Read `backstage/global/POLICY.md` (navigation block template)
2. Extract "We use **[backstageeee protocol]**, v0.3.4"
3. Update README.md with new text
4. Commit change

**Actual behavior:**
- READMEs still say "backstage protocol" (old text)
- Skill not reading template
- Manual edits required

**Investigation needed:**
- Where does skill read template? (SKILL.md prompt? checks.sh?)
- Why isn't it executing? (logic missing? conditional skipped?)
- Should this be deterministic (checks.sh) or interpretive (AI)?

**Related:** v0.5.0 Harden Skill (migrate AI logic → executable)

---

### Branch Logic for Skills Project

**Problem:**
- Skills project has git branches (for epic work)
- Live skills IN USE by Nicholas (e.g., backstage-skill, context-switch)
- **Question:** How do branches affect live skills?

**Scenarios:**

1. **Working on epic/v0.4.0-onboarding:**
   - Edit `backstage-skill/onboarding.sh`
   - Nicholas runs "bom dia" → which version executes?
   - Main branch? Current branch? Latest commit?

2. **Rebase vs merge:**
   - Epic branch diverges from main
   - Does rebase cover mismatches?
   - What if live skill called mid-rebase?

3. **Publishing from branch:**
   - ClawHub publish from `epic/v1.0.0-arch`?
   - Or must merge to main first?
   - Version tags on branches?

**Need to define:**
- [ ] **Execution environment:** Skills always run from main? Or current HEAD?
- [ ] **Safety:** Can we work on skills while using them? (test namespace?)
- [ ] **Release process:** Branch → test → merge → tag → publish?
- [ ] **Rollback:** If published skill breaks, how to revert?

**Related questions:**
- Does OpenClaw cache skill files? (stale vs fresh reads)
- Can we have test skills (`backstage-skill-test/`)? (parallel installation)
- Should epic branches be short-lived? (minimize divergence)

---

## Open Questions

1. **Symlink for everyone?**
   - Pros: Always latest
   - Cons: Breaks if backstage repo deleted/moved
   - Decision: Symlink for admins, copy for external users?

2. **Parity on SOME projects, not others?**
   - Why: Different projects use different companion skill versions
   - Example: `life/` uses backstage v0.3, `skills/` uses v0.4
   - Solution: Project-specific version expectations in POLICY?

3. **Skill says "update me"?**
   - Where: checks.sh? HEALTH.md? Skill SKILL.md?
   - When: Every run? Only on version mismatch?
   - How: Log message? Block commit? Telegram alert?

---

## Success Criteria

1. ✅ Symlinks work (no manual sync)
2. ⏳ Version mismatches detected automatically
3. ⏳ Clear update path (clawhub install or git pull)
4. ⏳ Graceful degradation (missing features don't break workflow)
5. ⏳ Projects can pin specific companion skill versions

---

## Related Work

- **Backstage v0.3.4** - Mermaid diagram generation rules
- **Backstage-as-anti-drift-machine** - Symlink strategy, POLICY enforcement
- **Nimble-ready prep** - Knowledge networks, cross-project coordination

---

## Notes

**Why "companion skills"?**
- External projects (backstage, librarian) that enhance skills ecosystem
- Not IN skills/, but skills/ DEPENDS on them
- Like libraries vs applications

**Parity is contextual:**
- `life/` might use old backstage (stable)
- `skills/` might use bleeding edge (testing)
- Both valid, both need version tracking
