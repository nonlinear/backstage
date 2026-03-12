# Backstage Context Switch Merge

**Problem:** Two overlapping systems (context-switch skill + backstage protocol) creating redundancy.

**Solution:** Merge context-switch workflow INTO backstage.

---

## What Backstage Gained

- Morning/evening ritual triggers
- Session state tracking (active project/epic)
- Project switching orchestration (close A, open B)
- Victory lap (review work done)

## What Context-Switch Lost

- Separate skill (absorbed into backstage)
- Old HEALTH.md pattern (migrated to checks/ folder)

---

## Implementation

### Session State

**Files:**
- `~/.openclaw/workspace/.current-context.json` (current project/epic)
- `~/.openclaw/workspace/.context-history-YYYY-MM-DD.jsonl` (append-only log)

**Helpers:**
- `get_current` - read current context
- `set_context` - update context
- `clear_context` - close project

### Morning Ritual

```bash
backstage morning
→ Run checks/local/*.sh on main project
→ If M-F: also run wiley checks
→ Set context to main
→ Output: Current epic, roadmap, gaps
```

### Evening Ritual

```bash
backstage evening
→ Run checks on current project
→ Read .context-history-YYYY-MM-DD.jsonl
→ Victory lap (summarize work)
→ Clear context
```

### Project Switching

```bash
bom dia librarian
→ Detect: different project
→ Close main (health check)
→ Open librarian (health check)
→ Set context to librarian
→ Output: Current epic, roadmap, branch
```

---

## Success Criteria

✅ "bom dia personal" loads personal + health checks  
✅ "bom dia librarian" switches projects (2 health checks)  
✅ "boa noite" closes project + victory lap  
✅ State tracking works (active project/epic known)  
✅ Context-switch skill deleted (functionality absorbed)  
✅ AGENTS.md updated (no context-switch references)

---

## References

- Context-switch SKILL.md: `~/.openclaw/workspace/skills/.context-switch.disabled/SKILL.md`
- Backstage SKILL.md: `~/.openclaw/workspace/skills/backstage/SKILL.md`
- Personal health checks: `~/Documents/personal/backstage/health-check.sh`
- Librarian backstage: `~/Documents/librarian/backstage/`
