# v0.4.0 - Scripts → Skills Migration

**Status:** Paused by user request  
**Priority:** Low (user overwhelmed)  
**Effort:** 1 week total (~1 day per script set)

---

## Problem

Useful utility scripts scattered across `~/Documents/notes/tasks/`:
- Hard to discover ("what scripts do I have?")
- No documentation (have to read code to understand)
- Not integrated with OpenClaw (can't invoke naturally)
- No automation (manual runs, forget to use them)

Current state:
- ✅ `Sync_settings.py` converted to cronjob (success!)
- ❌ 5 other script folders remain unconverted
- ❌ User overwhelmed, needs mental space

---

## Solution

Convert to AgentSkills with:
- **SKILL.md** documentation (what it does, when to use)
- **CLI wrappers** where needed
- **Cronjobs** for periodic tasks
- **Natural invocation** ("sync my airtable data")

---

## Script Inventory

### ✅ Completed

#### `system/Sync_settings.py`
- **Status:** Automated (cronjob, Mondays 9am)
- **Purpose:** Sync .env, global/, .github/prompts/ across 11 projects
- **Next run:** 2026-02-03 09:00

---

### 📋 Pending Conversion

#### `airtable/`
**Scripts:**
- (Need to inventory)

**Potential skill:** "Airtable sync" - fetch/update Airtable data  
**Automation:** Daily cronjob? On-demand?

---

#### `content/`
**Scripts:**
- (Need to inventory)

**Potential skill:** Content management automation  
**Automation:** TBD based on scripts

---

#### `library/`
**Scripts:**
- (Need to inventory)

**Potential skill:** Library/book management utilities  
**Automation:** TBD

---

#### `media/`
**Scripts:**
- (Need to inventory)

**Potential skill:** Media processing/organization  
**Automation:** TBD

---

#### `reels-library/`
**Scripts:**
- (Need to inventory)

**Potential skill:** Reels/video library management  
**Automation:** TBD

---

## Tasks (When Resumed)

### Phase 1: Inventory
- [ ] List all scripts in each folder
- [ ] Document what each does
- [ ] Identify automation opportunities
- [ ] Prioritize by usefulness

### Phase 2: Design
- [ ] Group related scripts into skills
- [ ] Write SKILL.md templates
- [ ] Plan CLI interfaces
- [ ] Design cronjob schedules

### Phase 3: Conversion
- [ ] airtable/ → skill
- [ ] content/ → skill
- [ ] library/ → skill
- [ ] media/ → skill
- [ ] reels-library/ → skill

### Phase 4: Automation
- [ ] Create cronjobs where appropriate
- [ ] Test invocation patterns
- [ ] Document in workspace POLICY

---

## Blockers

**User mental bandwidth:** Paused until user ready  
**No technical blockers**

---

## Success Criteria

- ⏳ All utility scripts accessible as skills
- ⏳ SKILL.md documentation exists
- ⏳ Periodic tasks automated (cronjobs)
- ⏳ Natural invocation works
- ⏳ User rediscovers forgotten utilities

---

## Lessons from Sync_settings.py

### What Worked
- ✅ Weekly cronjob (not too frequent, not forgotten)
- ✅ Syncs critical files (.env, global/, prompts/)
- ✅ Low-maintenance (just runs)

### Patterns to Replicate
- Cronjob for periodic tasks
- systemEvent to main session (not agentTurn)
- Silent success, alert on failure
- Logs for debugging

---

## Future Vision

### Skill Discovery
```
User: "What automations do I have?"
Me: "You have 6 skills running:
     - Sync settings (weekly)
     - Airtable sync (daily)
     - Content backup (weekly)
     ..."
```

### Smart Suggestions
```
Me: *during heartbeat*
    "You haven't synced Airtable in 3 days"
    "Want me to run it now?"
```

### Skill Marketplace
- Share useful skills with community
- Install skills from ClawdHub
- Version management

---

*Epic paused - resume on user signal*
