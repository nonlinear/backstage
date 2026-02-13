# Epic: Backstage as Anti-Drift Machine

**Status:** 🏗️ ACTIVE  
**Version:** v0.4.0  
**Created:** 2026-02-13

---

## Problem

Backstage protocol exists, but **drift happens:**
- Global POLICY/HEALTH out of sync across projects
- Navigation blocks missing or outdated
- Mermaid diagrams not propagated
- Versions mismatched
- **Rules documented but not enforced**

**Root cause:** No automated enforcement mechanism.

---

## Solution

**Backstage-skill becomes anti-drift machine:**
1. **Symlinks** - Global files always latest (no sync lag)
2. **POLICY enforcement** - Every "good morning/night" checks compliance
3. **Executable vs Interpretive** - Deterministic rules (SH) + contextual rules (AI)
4. **Integrated reporting** - What passed, what failed, what needs discussion

---

## Implementation

### Phase 1: Symlink Global Files ✅

**For backstage admins (Nicholas):**

```bash
# Source of truth
~/Documents/backstage/backstage/global/

# All other projects symlink to it
~/Documents/life/backstage/global → symlink
~/Documents/skills/backstage/global → symlink
~/Documents/librarian/backstage/global → symlink
~/Documents/nonlinear/backstage/global → symlink
# etc.
```

**Result:** Edit global POLICY once → ALL projects see changes instantly.

**Completed:** 2026-02-13 (librarian, storybook, life, nonlinear)

---

### Phase 2: POLICY/HEALTH Enforcement ✅

**Backstage-skill executes POLICY on every start/end:**

**Executable enforcement (checks.sh):**
- Extract templates from POLICY (navigation blocks, versions)
- Extract code blocks from HEALTH
- Execute deterministic rules
- Report pass/fail

**Interpretive enforcement (AI):**
- Read prose rules from POLICY
- Apply contextual judgment (README protection, surgical changes)
- Act or discuss with user
- Propagate mermaid diagrams

**Completed:** 2026-02-13 (checks.sh rewritten, SKILL.md updated)

---

### Phase 3: POLICY/HEALTH Consolidation (OPEN)

**Question:** Can we merge POLICY + HEALTH into single file?

**Current split:**
- **POLICY.md** = Interpretive rules (AI domain)
- **HEALTH.md** = Executable rules (SH domain)

**Why separate:**
- Different consumption patterns (AI reads prose, SH extracts code)
- Different audiences (developers vs machines)
- Clear domain boundaries

**Why merge:**
- Single file = easier to maintain
- Humans read both anyway
- AI can parse both sections

**Decision pending:** Test merged format, measure complexity.

---

### Phase 4: Project-Specific Overrides (DOCUMENTED)

**Polycentric governance:**
- **Global POLICY/HEALTH** = Universal rules (symlinked)
- **Project POLICY/HEALTH** = Local overrides (in project folder)
- **Project wins on conflict**

**Rule:** Project-specific stuff lives in project folder, NOT global.

**Examples:**
- `life/backstage/POLICY.md` - Life-specific epic rules
- `skills/backstage/POLICY.md` - Skills publication workflow
- `backstage/backstage/POLICY.md` - Backstage meta-rules

---

## Success Criteria

**Anti-drift achieved when:**
1. ✅ Global POLICY changes propagate instantly (symlinks)
2. ✅ Every "good morning" enforces compliance (backstage-skill)
3. ✅ Navigation blocks auto-update (version, paths, diagrams)
4. ✅ Doc drift detected + fixed automatically
5. ⏳ Projects self-report compliance status
6. ⏳ No manual sync needed (symlinks + automation)

---

## Open Questions

1. **POLICY + HEALTH merge?**
   - Test merged format
   - Measure AI parsing complexity
   - Keep separation if clear advantage

2. **Community adoption?**
   - How do external users sync global files?
   - Copy vs symlink (local vs remote)
   - Document both workflows in POLICY

3. **Enforcement escalation?**
   - Start = hard fail (block commit)
   - End = soft fail (warn + ROADMAP)
   - What about critical violations?

---

## Related Epics

- **Nimble-Ready Prep** - Backstage as knowledge network foundation
- **Changelog as Milestone** - Git trailers for cross-repo coordination
- **Epic Planning Protocol** - Meta-epic about epic planning

---

## Notes

**This epic uses fast-track governance:**
- Minor feature (v0.4.0) → Requires epic + branch
- Already implemented Phase 1+2 (symlinks + enforcement)
- Epic documents AFTER implementation (meta-documentation pattern)

**Anti-drift = self-enforcing system:**
- POLICY says "must have navigation blocks"
- Backstage-skill reads POLICY → enforces rule
- System polices itself
