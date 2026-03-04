# v1.0.1 - Merge Policies with Checks

**Status:** 🔄 Active  
**Started:** 2026-02-20  
**Type:** Patch

---

## Goal

Consolidate `policies/` and `checks/` into unified `checks/` directory with side-by-side `.md` (explanation) + `.sh` (validation).

---

## Decision Log

### 2026-02-20 11:39 - Naming Decision

**Question:** What to call merged directory?

**Options considered:**
- `rules/` - Generic, covers both (but too vague)
- `enforcement/` - Action-focused (uncommon in OSS)
- `checks/` - Expand current scope ✅ **CHOSEN**
- `governance/` - Formal (too corporate)
- `constraints/` - Technical (sounds restrictive)
- `standards/` - Positive (but confusing with external standards)

**Decision:** Keep `checks/` name, expand meaning:
- Deterministic checks (`.sh` scripts)
- Interpretive checks (`.md` policies)

**Rationale:**
- Already has momentum (directory exists)
- "Health check" is accepted concept (not just binary)
- Less migration overhead

---

### 2026-02-20 11:41 - Structure Design

**Decided structure:**
```
checks/
  global/
    *.sh  ← deterministic validation
    *.md  ← interpretive explanation (side-by-side)
  local/
    *.sh
    *.md
```

**Migration plan:**
1. Merge `policies/global/*.md` → `checks/global/*.md`
2. Merge `policies/local/*.md` → `checks/local/*.md`
3. Keep existing `checks/*.sh` in place
4. Update `checks.sh` to read `.sh` + `.md` together

**Read order:** `.sh` first (execute validation), `.md` after (read context)

---

### 2026-02-20 11:44 - Deprecate backstage-end

**Decision:** Delete `backstage-end.sh`

**Rationale:**
- Not used in practice (user does manual "boa noite")
- Anti-drift happens in backstage-start (pre-commit), not post-session
- Cleanup reduces maintenance overhead

**Actions:**
- ❌ Delete `backstage-end.sh`
- ✅ Rename `backstage-start.sh` → `backstage.sh` (simpler name)
- Update SKILL.md (remove -end references, diagrams)

---

### 2026-02-20 11:47 - Backstage.sh Role: Minimal Orchestrator

**Principle:** `backstage.sh` = orchestrator ONLY. All intelligence goes to `checks/global/*.sh`

**Problem discovered:** `backstage.sh` had duplicate logic:
- `ensure_navigation_blocks()` function → duplicates `navigation-block-update.sh`
- `update_readme_tables()` → should be a check
- `ensure_skill_diagrams()` → should be a check
- `generate_roadmap_diagram()` → should be a check
- `update_backstage_diagrams()` → should be a check
- etc.

**Decision:** 
- Delete ALL intelligence from `backstage.sh`
- Keep ONLY:
  - `read_navigation_block()` - needed to find where checks live
  - `run_enforcement()` - calls `checks.sh`
  - `prompt_push()` - final UI
  - `main()` - entry point

**Rationale:**
- Checks have no inherent order (run in any sequence)
- If order matters → merge into ONE check (check handles internal order)
- Backstage.sh should NOT orchestrate phases/steps
- Intelligence distributed = easier to test, extend, override

---

### 2026-02-20 11:48 - Check Execution Order

**Question:** Do checks need execution order?

**Analysis:**
- Some checks CREATE things (`navigation-block-update.sh`)
- Other checks VALIDATE those things (`navigation-block-readme.sh`)
- Order matters!

**Options considered:**

**A) Orchestrate in backstage.sh:**
```bash
run_checks "setup"    # creates files/blocks
run_checks "validate" # validates what was created
```
❌ Rejected: Violates "minimal orchestrator" principle

**B) Checks declare dependencies (metadata):**
```bash
# PHASE: setup
# DEPENDS: none
```
❌ Rejected: Too complex, requires dependency resolver

**C) Numeric prefixes:**
```
00-navigation-block-update.sh
01-required-files.sh
10-epic-format-validation.sh
```
❌ Rejected: Doesn't scale, manual numbering fragile

**D) Merge dependent checks into ONE check** ✅ **CHOSEN**
```
navigation-blocks.sh  ← handles update + validation internally
```

**Decision:** If checks need order → merge into single check with internal order.

**Rationale:**
- Checks run independently (no global order needed)
- Each check is self-contained unit
- Internal order (within check) is explicit and testable
- Simpler mental model: "one check, one concern"

---

### 2026-02-20 11:49 - Navigation Checks Consolidation

**Problem:** Found 3 navigation-related checks with order dependency:
1. `navigation-block-update.sh` - creates/updates blocks (MUST run first)
2. `navigation-block-readme.sh` - validates README has block
3. `navigation-block-status-files.sh` - validates status files have blocks

**Decision:** Merge into single `navigation-blocks.sh`

**New check does:**
1. Update blocks (count files, generate links, inject into README/ROADMAP/etc.)
2. Validate README has block
3. Validate status files have blocks
4. Order handled INSIDE check (not externally)

**Delete:**
- ❌ `navigation-block-update.sh`
- ❌ `navigation-block-readme.sh`
- ❌ `navigation-block-status-files.sh`

**Create:**
- ✅ `navigation-blocks.sh` (unified, self-contained)

**Rationale:**
- Single responsibility (navigation blocks)
- Internal order explicit (steps 1→2→3)
- No external orchestration needed
- Easier to test as unit

---

## Architecture Principles Established

**1. Backstage.sh = Minimal Orchestrator**
- Read README navigation block (find paths)
- Run checks.sh (execute all checks)
- Prompt user (final UI)
- NO intelligence, NO logic, NO phases

**2. Checks = Self-Contained Units**
- Each check handles ONE concern
- If order matters → internal to check (not external)
- No dependencies between checks (run in any order)

**3. Intelligence Lives in Checks**
- Navigation logic → `navigation-blocks.sh`
- Diagram generation → future check
- Roadmap updates → future check
- Context display → future check

**4. Checks.sh = Dumb Runner**
- Find all `*.sh` in `checks/global/` and `checks/local/`
- Execute each (capture exit code)
- Read corresponding `*.md` (if exists)
- Report results
- NO orchestration, NO phases

---

## Checks Consolidation & Naming (2026-02-20 11:56-11:59)

### Redundancy Elimination

**Merged navigation checks:**
- ❌ Deleted: `navigation-block-update.sh`
- ❌ Deleted: `navigation-block-readme.sh`
- ❌ Deleted: `navigation-block-status-files.sh`
- ✅ Created: `navigation-syntax.sh` (unified: update + validate README + validate status files)

**Merged required-files checks:**
- ❌ Deleted: `required-files.sh`
- ❌ Deleted: `required-global-files.sh`
- ✅ Created: `required-syntax.sh` (unified: project files + global folders)

**Removed deprecated format check:**
- ❌ Deleted: `roadmap-epic-format.sh` (old format: `## v0.1.0 - Title` with emojis)
- ✅ Kept: `epic-format-validation.sh` → renamed to `epic-syntax.sh` (new format: `## v0.1.0` + `### Title` separated)

### Naming Convention: `-syntax`, `-sync`, `-list`

**Principle:** All checks are validation. Suffix describes WHAT we're validating.

**Standardized naming:**
- `epic-syntax.sh` (was: `epic-format-validation.sh`) - Epic structure
- `navigation-syntax.sh` (was: `navigation-blocks.sh`) - Navigation blocks
- `required-syntax.sh` (merged 2 files) - Required files/folders
- `links-syntax.sh` (was: `readme-links.sh`) - Link integrity
- `semver-syntax.sh` (was: `semver-changelog.sh`) - Semantic versioning
- `git-sync.sh` (was: `git-changes-sync.sh`) - Uncommitted changes
- `gaps-list.sh` (unchanged) - Inventory/report

**Pattern categories:**
- **`-syntax`** = Structure/format validation (5 checks)
- **`-sync`** = Parity validation (1 check)
- **`-list`** = Inventory/report (1 check)

**Rationale:**
- Consistent naming → easier to understand role at glance
- Suffix groups related checks
- `-syntax` emphasizes "structure correctness" over "validation" (already implied)
- Shorter names → easier to type/grep

**Final count:** 7 checks, zero redundancy, clear patterns

---

## Dependency Management Decision (2026-02-20 12:02-12:06)

**Problem:** Checks have dependencies on files/structure:
- `epic-syntax.sh` needs `ROADMAP.md` to exist
- `links-syntax.sh` needs all files to exist
- `navigation-syntax.sh` needs `README.md` to exist
- Alphabetical order = no guarantee dependencies run first

**Options considered:**

**A) Frontmatter declares requirements:**
```bash
# epic-syntax.sh
# REQUIRES: backstage/ROADMAP.md
# REQUIRES: required-syntax.sh
```
- Pro: Explicit dependencies, can run in optimal order
- Con: Requires dependency resolver, metadata overhead

**B) Merge dependent checks into intelligent checks:**
- Pro: Self-contained, no external orchestration
- Con: Larger checks, less atomic

**Decision: B (merge dependent checks)**

**Rationale:**
- Simpler mental model (one check, one concern)
- No metadata/frontmatter needed (yet)
- Order handled internally (explicit within check)
- Defer frontmatter to future epic

**Proposed merges:**
1. `required-syntax.sh` + `navigation-syntax.sh` → `navigation-syntax.sh` (structure + blocks)
2. `epic-syntax.sh` + `semver-syntax.sh` + `links-syntax.sh` → `content-syntax.sh` (validates file content)

**Result:** 4 checks, zero inter-check dependencies

---

## Future Epic: Frontmatter for Checks

**Deferred features to explore later:**

### 1. Requirements Declaration
```bash
# epic-syntax.sh
# REQUIRES: backstage/ROADMAP.md
# REQUIRES: required-syntax.sh
# REQUIRES_OPTIONAL: backstage/VERSION
```

**Behavior:**
- If requirement missing → skip check (with warning) OR fail hard
- Optional requirements → degrade gracefully
- File requirements vs check requirements

### 2. Cancelling Out (Override System)
```bash
# local check overrides global
# group check overrides individual
```

**Patterns:**
- **local/global:** Local always wins (already implemented)
- **group cancelling:** Group check can disable individual checks
- **selective override:** Override specific behavior, inherit rest

**Example:**
```bash
# checks/global/epic-syntax.sh - strict format
# checks/local/epic-syntax.sh - relaxed format (cancels global)
```

### 3. Explode & Reuse (Atomic Checks)
```bash
# Instead of monolithic checks, compose from atoms:

# atoms/file-exists.sh
test -f "$1" || exit 1

# atoms/semver-format.sh
grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' "$1" || exit 1

# epic-syntax.sh sources atoms:
source atoms/file-exists.sh
source atoms/semver-format.sh
```

**Benefits:**
- Reusable validation primitives
- Easier testing (test atoms individually)
- Compose complex checks from simple parts

**Challenges:**
- Where do atoms live? (`checks/atoms/`?)
- How to share between global/local?
- Discoverability (how does user know what atoms exist?)

### 4. Variable Passing Between Checks
```bash
# navigation-syntax.sh outputs:
# ROADMAP_PATH=backstage/ROADMAP.md

# epic-syntax.sh consumes:
# Uses $ROADMAP_PATH if set, falls back to default
```

**Patterns:**
- Environment variables (export from one check, read in another)
- Temp file (.backstage-env) with key=value pairs
- JSON output (structured data between checks)

**Use cases:**
- Share parsed navigation block paths
- Pass version number across checks
- Avoid re-parsing same files

**Challenges:**
- Order matters (producer must run before consumer)
- Back to dependency problem (circular?)
- Cleanup (who deletes temp files?)

### 5. Conditional Execution (Check Triggers Another Check)

**Use case:** `merge-to-main.md` should ONLY run when `roadmap-tasks.sh` reports all tasks complete.

**Current solution (v1.0.1):** Keep as interpretive (.md), AI reads roadmap-tasks.sh output and decides whether to activate merge workflow.

**Future automation options:**

**Option A: Check calls check directly**
```bash
# merge-to-main.sh
# Só roda se roadmap-tasks.sh passou

if ! bash roadmap-tasks.sh > /dev/null 2>&1; then
  echo "⏭️  Skipped (tasks incomplete)"
  exit 0
fi

# Continue with merge logic...
```

**Option B: checks.sh orchestrates based on exit codes**
```bash
# checks.sh reads exit codes and chains
run roadmap-tasks.sh
if [[ $? -eq 0 ]]; then
  run merge-to-main.sh
fi
```

**Option C: Frontmatter conditional**
```bash
# merge-to-main.sh
# REQUIRES: roadmap-tasks.sh
# REQUIRES_EXIT_CODE: 0
# SKIP_IF_FAILED: true
```

**Option D: Keep interpretive** (current choice)
- `roadmap-tasks.sh` reports status
- `merge-to-main.md` AI reads output, decides whether to activate

**Decision for v1.0.1:** D (interpretive orchestration)

**Rationale:**
- Checks stay independent (testable in isolation)
- AI handles complex conditional logic
- `merge-to-main` is workflow, not validation
- Defer automation to future epic

**When to revisit:** When merge workflow becomes deterministic enough to automate fully.

---

## Next Steps

- [ ] Clean `backstage.sh` (remove all intelligence functions) ✅ DONE
- [ ] Merge dependent checks (navigation, content)
- [ ] Update `checks.sh` to read `.md` + `.sh` side-by-side
- [ ] Migrate `policies/*.md` → `checks/*.md`
- [ ] Update README navigation blocks (remove `policies:`, keep `checks:`)
- [ ] Test on backstage project
- [ ] Document new architecture in POLICY.md
