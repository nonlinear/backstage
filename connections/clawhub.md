---
service: ClawHub
description: "Search, install, update, or publish agent skills from clawhub.com using the npm-installed clawhub CLI"
cli: clawhub
---

# ClawHub - Skill Publishing

**Platform:** https://clawhub.com
**Profile:** https://clawhub.com/@nonlinear

---

## Authentication

**Login:**
```bash
clawhub login
# Opens browser, authenticate, stores token
```

**Check status:**
```bash
clawhub whoami
# Returns: nonlinear
```

**Logout:**
```bash
clawhub logout
```

---

## Publishing Skills

**Requirements:**
1. Skill folder with SKILL.md (complete frontmatter)
2. All files ready (scripts, references, assets)
3. Tested locally
4. Status set to `stable` in frontmatter

**Publish command:**
```bash
clawhub publish /path/to/skill \
  --slug skill-name \
  --name "Display Name" \
  --version 1.0.0 \
  --tags latest \
  --changelog "What changed or initial release notes"
```

**After publish:**
1. Update frontmatter: `status: published`
2. Add ClawHub link to SKILL.md:
   ```markdown
   **Published:** https://clawhub.com/skills/skill-name
   ```
3. Commit changes to git

---

## Example: apple-reminders-smart

**Command used:**
```bash
clawhub publish ~/Documents/skills/apple-reminders \
  --slug apple-reminders-smart \
  --name "Apple Reminders Smart" \
  --version 1.0.0 \
  --tags latest \
  --changelog "Smart reminder processing: Gen 3 custom instructions + 💎 result tracking. Heartbeat-triggered auto-research for reminders without notes."
```

**Result:**
- Skill ID: `k9748r65hb69wx333kb55h15t5812yss`
- URL: https://clawhub.com/skills/apple-reminders-smart
- Profile: https://clawhub.com/@nonlinear

**Note:** `apple-reminders` slug was taken, used `apple-reminders-smart` instead.

---

## Republishing (Updates)

**When to republish:**
- Bug fixes (bump PATCH version)
- New features (bump MINOR version)
- Breaking changes (bump MAJOR version)

**Workflow:**
1. Git commit current state
2. Make changes
3. Test locally
4. Bump version in SKILL.md frontmatter
5. Git commit + push
6. Republish:
   ```bash
   clawhub publish /path/to/skill \
     --slug same-slug \
     --name "Same Name" \
     --version X.Y.Z \
     --tags latest \
     --changelog "What changed in this version"
   ```

---

## Searching Skills

**Find skills:**
```bash
clawhub search <query>
# Returns: top 10 matches with scores
```

**Example:**
```bash
clawhub search apple reminders
# Shows: apple-reminders, apple-remind-me, etc.
```

---

## Installing Skills

**Install from registry:**
```bash
clawhub install <slug>
# Installs to skills/<slug>/
```

**Update installed skills:**
```bash
clawhub update <slug>
# Or update all:
clawhub update
```

---

## Listing Installed Skills

**Show installed:**
```bash
clawhub list
# Reads from lockfile, shows installed skills
```

**Note:** This lists what YOU installed, not what you published.

---

## Exploring Registry

**Browse latest:**
```bash
clawhub explore --limit 25 --sort newest
# Shows recently published skills
```

**Sort options:**
- `newest` - Latest published
- `downloads` - Most downloaded
- `trending` - Popular now
- `rating` - Highest rated

---

## Inventory Your Published Skills

**No CLI command exists.** Use web:
- https://clawhub.com/@nonlinear

Or grep local skills:
```bash
cd ~/Documents/skills
grep "^status: published" */SKILL.md
```

---

## Gotchas

**Slug conflicts:**
- ClawHub slugs are global (first-come, first-served)
- If slug taken, choose different name
- Example: `apple-reminders` → `apple-reminders-smart`

**Ownership:**
- Only original publisher can update
- Error: "Only the owner can publish updates"
- Solution: Use different slug for your version

**Private skills:**
- NEVER publish `type: private` skills
- Security risk (work data, credentials)
- HEALTH checks enforce this

---

## Skills Published

**reminder-research** (1.0.1)
- Slug: `reminder-research`
- ID: `k97emv92r9519pr2tc660b0ka18133d4`
- URL: https://clawhub.com/skills/reminder-research
- Published: 2026-02-13
- Changelog: Complete setup docs (binaries, APIs, credentials declared)

---

*Connection established 2026-02-13*
