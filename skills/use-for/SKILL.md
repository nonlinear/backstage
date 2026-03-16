---
name: use-for
description: "Meta skill: Scans all SKILL.md frontmatter descriptions and suggests which skill helps with user's current task/struggle. Triggers: 'how do I...?', 'is there a skill for X?', repeated failed attempts, uncertainty. Returns top 3 matches with name + description. Reduces skill discovery overhead."
type: public
version: 1.0.0
status: stable
dependencies: []
author: nonlinear
license: MIT
---

# use-for - Skill Suggester

**Emoji:** 🔍  
**Type:** Meta skill (suggests other skills)

---

## What it does

Scans all installed skills' `use_for` frontmatter and suggests which skill can help based on user's current struggle or question.

---

## When to use

- User asks: "How do I...?" or "Is there a skill for...?"
- User struggling with task (multiple attempts, uncertainty)
- User wants to discover available skills

---

## How it works

1. Read all SKILL.md files in `~/.openclaw/skills/` and `~/Documents/skills/`
2. Extract `use_for` from frontmatter
3. Match user query/context against all `use_for` descriptions
4. Return top 3 matches with skill name + emoji + description

---

## Example

**User:** "I need to track my workouts"

**use-for response:**
```
🔍 Skills that might help:

💪 **fitness-tracker** - Track Gymera workouts, log exercises, voice-guided sessions
🍎 **apple-reminders** - Create reminders for workout times, track habits
📊 **airtable-sync** - Store workout data in Airtable for analysis
```

---

## Frontmatter spec

All skills should have `use_for` in frontmatter:

```yaml
---
name: skill-name
emoji: 🎯
use_for: "Brief description of WHEN to use this skill. Include triggers, use cases, problems it solves."
---
```

---

## Future

- Embedding-based similarity (intelligent matching)
- Proactive suggestions (heartbeat detects struggle)
- Usage analytics (suggest underutilized skills)
