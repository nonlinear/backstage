# Checkpoints

**Status:** Future state  
**Triggers:** Automated validation gates at epic lifecycle transitions

> 🔜 Not implemented yet

---

## What Checkpoints Do

**Checkpoint = triggered validation gate.**

Runs composite checks (organization + project + squad + agent) when epic status changes or conditions met.

**Example triggers:**
- Epic status: `grooming` → `ready`
- Epic status: `ready` → `done`
- All tasks marked checked
- Branch merged to main
- Scheduled (daily, weekly)

**Output:** Highly-auditable report (pass/fail per check, evidence, recommendations)

---

## Composite Check Resolution

Checks cascade from organization → project → squad → agent.

**Hierarchy (precedence):**
1. **Agent** (most specific, highest priority)
2. **Squad**
3. **Project**
4. **Organization** (least specific, lowest priority)

**Conflict resolution:**
- Lower level wins (agent > squad > project > org)
- If agent says "don't use X" but project says "use X" → agent wins
- Failed conflict = FAIL report (document why, propose resolution)

**Annulment (cancellation):**
- Agent check can annul (override) organization check
- Explicit syntax: `annuls: [check-id]`
- Report shows: "Check X annulled by agent Y (reason: Z)"

---

## Check Variables (Future)

Checks can accept variables (parameterized validation).

**Example:**
```yaml
# checks/test-coverage.sh
THRESHOLD=${COVERAGE_THRESHOLD:-80}
pytest --cov-fail-under=$THRESHOLD
```

**Override per level:**
```yaml
# organization.yaml
checks:
  test-coverage:
    COVERAGE_THRESHOLD: 80

# projects/backstage/project.yaml
checks:
  test-coverage:
    COVERAGE_THRESHOLD: 90  # Higher standard for backstage
```

---

## Failed Checks → New Tasks

**When checkpoint fails:**

1. Generate report (which checks failed, why)
2. Create tasks in epic (one per failed check)
3. Block status transition until tasks resolved

**Example:**
```yaml
# Epic transitions grooming → ready
# Checkpoint runs, test-coverage.sh fails

# Auto-generated task:
- text: "Fix test coverage (currently 65%, required 80%)"
  checked: false
  source: checkpoint
  check: test-coverage.sh
  evidence: "pytest output: 65% coverage"
```

**Status remains `grooming` until task checked.**

---

## Report Format

```markdown
## Checkpoint Report: Epic v4.3.0 (grooming → ready)

**Trigger:** Status transition  
**Timestamp:** 2026-03-16 17:30 EDT  
**Composite:** organization + backstage + meta + business-analyst

### ✅ Passed (12)

- roadmap-tasks.sh (all tasks complete)
- epic-syntax.sh (valid YAML)
- doc-parity.md (README reflects reality)
- ...

### ❌ Failed (2)

#### test-coverage.sh
**Level:** organization  
**Threshold:** 80%  
**Actual:** 65%  
**Evidence:** `pytest --cov output`  
**Action:** Created task "Fix test coverage"

#### design-review.md
**Level:** squad (design)  
**Reason:** Figma link missing in epic notes  
**Evidence:** No .fig file linked in index.md  
**Action:** Created task "Add Figma link to notes"

### ⚠️ Annulled (1)

#### port-stability.sh
**Level:** organization (required)  
**Annulled by:** agent (business-analyst)  
**Reason:** "BA doesn't manage ports, N/A"  
**Action:** None (acceptable override)

---

**Outcome:** BLOCK transition (2 failed checks)  
**Next:** Resolve failed checks, re-run checkpoint
```

---

## Trigger Syntax (Future)

```yaml
# checkpoints.yaml (organization-level)
checkpoints:
  - name: "grooming-to-ready"
    trigger:
      type: status_change
      from: grooming
      to: ready
    checks:
      - roadmap-tasks.sh
      - epic-syntax.sh
      - test-coverage.sh
      - design-review.md
    
  - name: "daily-health"
    trigger:
      type: scheduled
      cron: "0 9 * * *"  # 9am daily
    checks:
      - broken-links.sh
      - parity-freshness.sh
```

---

## Examples

**Simple:** Pre-merge checkpoint (all tasks checked)  
**Complex:** Grooming → ready (composite checks, failed → tasks)

---

> 🔜 **Implementation blocked by:**
> - v4.0.0 - Checkpoints (GUI)
> - Trigger engine (status change detection)
> - Report generator (markdown output)
