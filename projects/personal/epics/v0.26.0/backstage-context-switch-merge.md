# v0.26.0 - Backstage + Context-Switch Merge

**Status:** 📋 Planned  
**Created:** 2026-02-25  
**Priority:** High (blocking morning workflow)

---

## Problem

**Two overlapping systems:**

1. **Context-switch skill** (workflow automation)
   - "bom dia" trigger
   - Session state tracking (`.current-context.json`)
   - Project switching orchestration
   - Morning/evening rituals
   - **Uses:** `HEALTH.md` (old pattern)

2. **Backstage protocol** (health checks library)
   - Modular health checks (`checks/local/*.sh`)
   - Documentation parity validation
   - Epic/roadmap management
   - **Missing:** Morning/evening triggers, state tracking

**Current state:**
- Context-switch DISABLED (`.context-switch.disabled/`)
- "bom dia" trigger patched into backstage skill description
- NO actual implementation yet (manual patch only)

---

## Goal

**Merge context-switch workflow INTO backstage.**

**What backstage gains:**
- Morning/evening ritual triggers
- Session state tracking (know which project/epic is active)
- Project switching orchestration (close A, open B)
- Victory lap (review what was worked on)

**What context-switch loses:**
- Separate skill (absorbed into backstage)
- Old HEALTH.md pattern (migrates to checks/ folder)

---

## Tasks

### 1. Add session state to backstage

- [ ] Create `.current-context.json` tracking (project, epic, timestamp)
- [ ] Create `.context-history-YYYY-MM-DD.jsonl` (append-only log)
- [ ] Add state helpers (get_current, set_context, clear_context)

### 2. Add morning ritual to backstage

- [ ] Implement `backstage morning` (or `--morning`)
- [ ] Run health checks on `main` project
- [ ] If M-F, also run `wiley` health checks
- [ ] Set current context to `main`
- [ ] Output structured for AI parsing

### 3. Add evening ritual to backstage

- [ ] Implement `backstage evening` (or `--evening`)
- [ ] Close current project (health check)
- [ ] Victory lap (read history, summarize work)
- [ ] Clear context state
- [ ] Output structured for AI parsing

### 4. Add project switching to backstage

- [ ] Detect project vs epic (based on backstage folder existence)
- [ ] If switching projects: close current, open new (2 health checks)
- [ ] If switching epic: single health check, update context
- [ ] Update state tracking appropriately

### 5. Migrate context-switch state

- [ ] Move `.current-context.json` to `~/.openclaw/workspace/` (if exists)
- [ ] Archive `.context-history-*.jsonl` files
- [ ] Update AGENTS.md references (remove context-switch, point to backstage)

### 6. Update skill documentation

- [ ] Update backstage SKILL.md with full trigger list
- [ ] Document state files (location, format, usage)
- [ ] Add examples (morning, evening, switching)
- [ ] Update AGENTS.md (remove context-switch references)

### 7. Cleanup

- [ ] Delete `.context-switch.disabled/` folder
- [ ] Commit changes with clear message
- [ ] Test morning/evening workflows
- [ ] Verify state tracking works

---

## Design Notes

**Backstage script structure:**
```bash
backstage.sh [morning|evening|start|end|PROJECT]
```

**Morning workflow:**
```
bom dia personal
→ backstage.sh morning
→ Run checks/local/*.sh on main project
→ If M-F: also run wiley checks
→ Set context to main
→ Output: Current epic, roadmap, gaps
```

**Evening workflow:**
```
boa noite
→ backstage.sh evening
→ Run checks on current project
→ Read .context-history-YYYY-MM-DD.jsonl
→ Victory lap (summarize work)
→ Clear context
```

**Project switching:**
```
bom dia librarian
→ backstage.sh librarian
→ Detect: different project
→ Close main (health check)
→ Open librarian (health check)
→ Set context to librarian
→ Output: Current epic, roadmap, branch
```

**State files location:**
- `~/.openclaw/workspace/.current-context.json`
- `~/.openclaw/workspace/.context-history-YYYY-MM-DD.jsonl`

---

## Open Questions

- [ ] Should backstage script live in backstage repo or skill folder?
- [ ] Keep both `backstage morning` AND `bom dia` triggers, or unify?
- [ ] How to handle projects without backstage folder? (fail gracefully?)
- [ ] Should victory lap be automated or manual?

---

## Success Criteria

- ✅ "bom dia personal" loads personal project + health checks
- ✅ "bom dia librarian" switches from personal → librarian (2 health checks)
- ✅ "boa noite" closes current project + victory lap
- ✅ State tracking works (know which project/epic is active)
- ✅ Context-switch skill deleted (functionality absorbed)
- ✅ AGENTS.md updated (no more context-switch references)

---

## References

- Context-switch SKILL.md: `~/.openclaw/workspace/skills/.context-switch.disabled/SKILL.md`
- Backstage SKILL.md: `~/.openclaw/workspace/skills/backstage/SKILL.md`
- Personal health checks: `~/Documents/personal/backstage/health-check.sh`
- Librarian backstage: `~/Documents/librarian/backstage/`
