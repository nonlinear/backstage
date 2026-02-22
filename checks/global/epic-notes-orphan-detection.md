# Epic Notes Orphan Detection

**Type:** Global check  
**Applies to:** All projects with backstage protocol

---

## Rule

**Every epic note MUST link to an epic.**

If epic doesn't exist yet → epic note goes to `orphan-epic-notes/` temporarily.

---

## Why This Matters

**Epic notes without epics = context without structure.**

- Can't trace decision → epic → roadmap
- Memory search finds note, but no clear "why this exists"
- Orphaned context = harder to maintain

---

## Check Script

```bash
#!/bin/bash
# Detect epic notes without epic link

find epic-notes/ -name "*.md" -type f | while read file; do
  # Check if file contains "Epic:" link
  if ! grep -q "^**Epic:**" "$file"; then
    basename=$(basename "$file")
    echo "📌 Orphan: $basename (no epic link)"
  fi
done
```

---

## What to Do When Check Fails

### If Epic Exists
1. Add epic link to note frontmatter:
   ```markdown
   **Epic:** [v0.X.0 Epic Name](../ROADMAP.md#vXX0)
   ```

### If Epic Doesn't Exist
1. Move note to `orphan-epic-notes/`:
   ```bash
   mv epic-notes/v0.X.0-topic.md orphan-epic-notes/
   ```
2. Create epic in ROADMAP.md
3. Move note back + add epic link

---

## Exception: Orphan Folder

**`orphan-epic-notes/` is allowed.**

Contains notes for future epics (research, proposals, experiments).

When epic created → move note to `epic-notes/` + add link.

---

## Grep Pattern for Orphans

```bash
# Find orphan notes (missing epic link)
grep -L "^\*\*Epic:\*\*" epic-notes/*.md
```

Output format:
```
📌 v0.21.0-business-model-commons.md
📌 v0.22.0-feedback-loops.md
```

---

**Created:** 2026-02-21  
**Purpose:** Prevent epic notes from drifting without roadmap connection
