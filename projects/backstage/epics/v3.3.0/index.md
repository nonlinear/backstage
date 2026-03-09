# Epic Notes

> Version, name, status → see `epic.yaml`

---

**Priority:** HIGH (affects all projects)  
**Why epic:** Not just documentation — this is a SYSTEM

---

## 🎯 Problem

**We keep forgetting what we tried.**

Symptoms:
- Re-attempting failed approaches (waste time)
- Forgetting why current solution was chosen (lose context)
- No record of trade-offs (can't evaluate new options)
- Docs diverge from reality (broken trust)

**Example today:**
- OneDrive sync: tried 5 methods, all failed
- Without `parity/onedrive.md` → would retry same approaches next time
- Lost 2 hours debugging something we already tested

---

## 🎯 Goal

**Convergence, not divergence.** Documentation must match reality.

**Parity = trust.** Docs diverge from reality = broken familiar bond.

---

## 📁 Structure

### parity/ Folder
Location: `~/.openclaw/workspace/parity/`

**Contains:**
1. **Connection credentials** (APIs, tokens, methods)
2. **Working solutions** (what works, how to use, why it works)
3. **Failed approaches** (what doesn't work, why) ← CRITICAL
4. **Gotchas** (edge cases, limitations)

**Format:** Markdown files, one per system/service

**Examples:**
- `paperless-ngx.md` — NAS Paperless integration
- `onedrive.md` — Sync methods (5 failed, 1 working)
- `jira.md` — IEEE timelog workflow
- `home-assistant.md` — API access, device control

---

## 🔑 Key Rule: Never Regress

**Failed approaches = documented deprecations**

Format:
```markdown
## Failed Approaches (DO NOT RETRY)

### Method X (tested 2026-02-09)
**What:** Sync OneDrive via temp files
**Why tried:** Thought local file would force sync
**Result:** ❌ Still 2min delay
**Reason:** OneDrive lazy-syncs, temp files don't bypass

**DO NOT RETRY unless:** OneDrive sync < 10s (retest quarterly)
```

**Prevents:**
- Re-doing same experiments
- Losing knowledge across sessions
- Regression to worse solutions

---

## ⏳ Timelines Matter

**Document transitions:** What we use NOW vs what's coming LATER

**Format:**
```markdown
## Current Solution (as of 2026-02-09)

**Now:** Local Excel + kill/reopen
- ✅ Instant paridade (zero sync delay)
- ✅ 100% reliable
- ⚠️ Excel warnings (acceptable)
- ⚠️ AutoSave must be OFF

**Trade-off:** Chose speed > convenience

**Future:** If OneDrive sync improves (< 10s), reconsider
- Monitor: Quarterly check (Mar, Jun, Sep, Dec)
- Condition: Sync delay < 10s consistently

**Don't retry:** Sync methods (documented as failed)
```

**Why this matters:**
- Future-you knows WHY we chose current solution
- Clear conditions for migration (not arbitrary)
- Prevents regression (don't go back without reason)

---

## 🛠️ Components to Build

### 1. Parity Folder Structure ✅
**Status:** DONE (created today)

**Files created:**
- `parity/paperless-ngx.md`
- `parity/onedrive.md`
- `parity/jira.md`

### 2. Parity Check Tool ⏳
**Status:** TODO

**What it does:**
- Compare parity docs vs actual system state
- Detect drift (e.g., credentials changed but doc outdated)
- Flag missing parity docs (new systems without documentation)

**How:**
```bash
~/.openclaw/workspace/scripts/parity-check.sh

# Output:
# ✅ paperless-ngx.md: API token matches .env
# ⚠️ onedrive.md: Last updated 10 days ago (quarterly check due)
# ❌ new-system.md: MISSING (detected .env var, no parity doc)
```

### 3. Context-Switch Integration ⏳
**Status:** Planned

**What it does:**
- Before switching projects → check parity gaps
- After learning something new → prompt "update parity?"
- Health check includes parity drift

**Example:**
```
User: "vamos trabalhar no wiley"
Claw: 
  - Switching to Wiley project
  - Checking parity...
  - ⚠️ parity/jira.md outdated (last update 2 weeks ago)
  - Want to update before starting?
```

### 4. Template for Parity Docs ⏳
**Status:** TODO

**Template structure:**
```markdown
# System Name

**URL:** http://example.com
**Credentials:** See .env (SYSTEM_API_TOKEN)
**Last verified:** 2026-02-09

## Current Solution

[What works NOW + why chosen]

## Failed Approaches (DO NOT RETRY)

[What was tried + why failed + conditions to retry]

## Gotchas

[Edge cases, limitations, quirks]

## Timelines

[Now vs Future, migration conditions]

## Next Review

[When to check again, what to verify]
```

---

## 📊 Success Metrics

### Phase 1: Foundation ✅
- [x] parity/ folder created
- [x] First 3 docs written (paperless, onedrive, jira)
- [x] Policy documented (AGENTS.md, backstage/POLICY.md)

### Phase 2: Tooling ⏳
- [ ] parity-check.sh script (detect drift)
- [ ] Template created (reusable structure)
- [ ] Context-switch integration

### Phase 3: Adoption ⏳
- [ ] All systems have parity docs (NAS, APIs, credentials)
- [ ] Quarterly review process (check timelines)
- [ ] Zero regressions (no retry of failed methods)

---

## 🚀 Next Steps

1. **This week:** Create parity-check.sh (detect drift)
2. **This week:** Create parity doc template
3. **Next week:** Add remaining systems (Home Assistant, Tailscale, etc.)
4. **Ongoing:** Update parity when learning new things

---

## 💡 Why This Matters

**Metabolic cost:**
- Re-doing experiments = 2x cost (time + tokens)
- Forgetting trade-offs = bad decisions
- Doc drift = broken trust

**Parity system:**
- Pay once (document thoroughly)
- Reuse forever (never repeat)
- Build on knowledge (don't reset)

**This is stabilization.**  
Nicholas teaches ONCE → we internalize → less supervision needed.

---

**Parity = familiar bond.** 🏴
