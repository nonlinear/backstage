# Epic Notes

> Version, name, status → see `epic.yaml`

---

# v0.9.0 - Backstage Protocol Pattern Research

## Context
- **Why this exists:** Evaluate if backstage protocol is reinventing the wheel vs existing open source project management protocols
- **Problem:** Custom protocol (ROADMAP, CHANGELOG, HEALTH, POLICY) may duplicate existing standards
- **Date:** 2026-02-17
- **Question:** Should we adopt existing protocols or continue with backstage custom approach?


## Research Goal

**Compare backstage protocol with open source alternatives:**
1. Feature comparison (what each protocol offers)
2. Strengths/weaknesses
3. Adoption effort (if switching)
4. Recommendation (keep, hybrid, or replace)


## Protocol Comparison

| Protocol | Structure | Visual Roadmap | Health Checks | Markdown-First | Tooling | Adoption |
|----------|-----------|----------------|---------------|----------------|---------|----------|
| **Backstage** | ROADMAP + CHANGELOG + HEALTH + POLICY + epic-notes | ✅ Mermaid diagrams | ✅ checks (global/local) checkpoints | ✅ Pure markdown | ❌ Manual | Custom (nonlinear) |
| **Keep a Changelog** | CHANGELOG.md only | ❌ No roadmap | ❌ No health | ✅ Markdown | ✅ Generators exist | ⭐⭐⭐⭐⭐ Wide adoption |
| **Semantic Versioning** | Version numbers (MAJOR.MINOR.PATCH) | ❌ No roadmap | ❌ No health | ✅ Version tags | ✅ Git tags | ⭐⭐⭐⭐⭐ Universal |
| **Conventional Commits** | Commit message format | ❌ No roadmap | ❌ No health | ✅ Commit messages | ✅ Changelog generators | ⭐⭐⭐⭐ Common |
| **ADR (Architecture Decision Records)** | Decision logs (numbered .md files) | ❌ No roadmap | ❌ No health | ✅ Markdown | ⚠️ Manual | ⭐⭐⭐ Niche |
| **Shape Up (Basecamp)** | 6-week cycles, betting table, hill charts | ✅ Hill charts | ⚠️ Implicit (scope hammering) | ❌ Notion/Basecamp app | ✅ Basecamp tooling | ⭐⭐ Basecamp only |
| **GitHub Projects** | Issues + Milestones + Project boards | ✅ Kanban/Timeline | ❌ No health | ❌ GitHub UI | ✅ Native integration | ⭐⭐⭐⭐ GitHub users |
| **Linear** | Issues + Roadmap + Cycles | ✅ Timeline view | ⚠️ Implicit (velocity) | ❌ Linear app | ✅ Linear platform | ⭐⭐⭐ Startups |


## Feature Deep Dive

### What Backstage HAS that others DON'T:

1. **checks (global/local)** - Quality checkpoints before merging/shipping
   - Other protocols: Implicit in review process, not documented
   - Value: Explicit standards, prevents drift

2. **Mermaid roadmap diagrams** - Visual dependency graph
   - Keep a Changelog: List-based, no dependencies
   - Shape Up: Hill charts (progress, not dependencies)
   - GitHub/Linear: Kanban/Timeline (not dependency graph)
   - Value: See epic relationships, plan sequence

3. **Epic notes** - Per-version context/research
   - ADR: Similar (decision records), but not version-tied
   - Others: No equivalent
   - Value: Capture "why" and "how" per epic

4. **policies (global/local)** - Project-specific rules
   - Similar to CONTRIBUTING.md (open source projects)
   - Value: Codify conventions


### What Backstage LACKS that others HAVE:

1. **Tooling** - No generators, no automation
   - Keep a Changelog: Auto-generate from commits
   - Conventional Commits: Auto-generate CHANGELOG
   - Backstage: Manual editing
   - Impact: Higher metabolic cost

2. **Wide adoption** - Custom protocol = learning curve
   - Keep a Changelog: Everyone knows the format
   - Backstage: Nicholas + Kin only
   - Impact: Can't share easily, no external contributors

3. **Commit integration** - No tie between commits and ROADMAP
   - Conventional Commits: Commits → CHANGELOG auto-generation
   - Backstage: Manual updates
   - Impact: Duplicate work (commit message + ROADMAP update)


## Hybrid Approaches

### Option 1: Keep Backstage Core + Adopt Standards

**Adopt:**
- Keep a Changelog format for CHANGELOG.md
- Semantic Versioning (already using)
- Conventional Commits (standardize commit messages)

**Keep:**
- ROADMAP.md with mermaid diagrams
- checks (global/local) checkpoints
- policies (global/local) conventions
- Epic notes

**Benefit:**
- ✅ Standard CHANGELOG (tooling exists)
- ✅ Auto-generate CHANGELOG from commits
- ✅ Keep unique features (HEALTH, visual roadmap)

**Cost:**
- Learning Conventional Commits
- Setting up changelog generator


### Option 2: Simplify Backstage (Reduce Files)

**Merge:**
- policies (global/local) → README.md (conventions section)
- checks (global/local) → ROADMAP.md (success criteria per epic)

**Keep:**
- ROADMAP.md (mermaid + epics)
- CHANGELOG.md (releases)
- Epic notes (research/context)

**Benefit:**
- ✅ Fewer files (less overhead)
- ✅ Everything in one place

**Cost:**
- ❌ Lose separation (HEALTH mixed with ROADMAP)


### Option 3: Abandon Backstage, Use GitHub/Linear

**Migrate to:**
- GitHub Projects (roadmap, issues, milestones)
- Linear (if you want better UX)

**Benefit:**
- ✅ Tooling (automation, integrations)
- ✅ Wide adoption (standard workflow)

**Cost:**
- ❌ Lose markdown-first (locked to GitHub/Linear UI)
- ❌ No checks (global/local) equivalent
- ❌ No mermaid dependency graphs
- ❌ Vendor lock-in


## Recommendation (Draft)

### Short-term: Hybrid (Keep Backstage + Adopt Standards)

**Adopt:**
1. **Keep a Changelog format** for CHANGELOG.md:
   ```markdown
   ## [0.7.0] - 2026-02-20
   ### Added
   - NYS tax resolution
   ### Changed
   - Updated budget tracking
   ```

2. **Conventional Commits** for commit messages:
   ```
   feat(finances): add NYS tax tracking
   fix(passport): update e-consular link
   docs(roadmap): add v0.21.0 pattern research
   ```

3. **Auto-generate CHANGELOG** from commits (tool: `git-cliff`, `standard-version`)

**Keep:**
- ROADMAP.md (mermaid diagrams)
- checks (global/local) (checkpoints)
- policies (global/local) (conventions)
- Epic notes (context)

**Why:**
- ✅ Best of both (standards + unique features)
- ✅ Lower metabolic cost (auto-generate CHANGELOG)
- ✅ Still markdown-first
- ✅ Can share CHANGELOG with others (standard format)


### Long-term: Evaluate Backstage v1.0

**Questions to answer:**
1. Does checks (global/local) actually prevent bugs/drift? (measure)
2. Do mermaid diagrams help planning? (Nicholas feedback)
3. Is manual ROADMAP editing worth it? (vs auto-generated from issues)

**If YES (high value):**
- Keep backstage, invest in tooling (generators, linters)

**If NO (low value):**
- Migrate to GitHub Projects or Linear
- Archive backstage as experiment


## Next Steps

- [ ] Discuss with Nicholas: What's most valuable? (HEALTH? Mermaid? Epic notes?)
- [ ] Prototype: Generate CHANGELOG from Conventional Commits (test metabolic cost reduction)
- [ ] Measure: Does checks (global/local) prevent issues? (track violations)
- [ ] Decide: Keep, hybrid, or abandon backstage?


## References

**Protocols researched:**
- Keep a Changelog: https://keepachangelog.com
- Semantic Versioning: https://semver.org
- Conventional Commits: https://www.conventionalcommits.org
- ADR (Architecture Decision Records): https://adr.github.io
- Shape Up (Basecamp): https://basecamp.com/shapeup

**Tools:**
- git-cliff (changelog generator): https://git-cliff.org
- standard-version (changelog + release automation): https://github.com/conventional-changelog/standard-version
