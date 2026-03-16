# README Tables - Auto-Generated from Frontmatter

**README.md has TWO skill tables, both auto-generated from SKILL.md frontmatter.**

## Table 1: What's Here

**Source:** All folders in `~/Documents/skills/` with `SKILL.md`  
**Order:** Alphabetical  
**Format:** HTML table with `valign="top"` (top-aligned rows)

## Table 2: Companion Skills

**Source:** Auto-discovered via `~/Documents/*/skill/` (exclude `~/Documents/skills/`)  
**Order:** Alphabetical  
**Format:** Same as Table 1  
**Description suffix:** `<br>companion for [project](git-repo-link)`

## Table Columns

**Name:**
- `name:` from frontmatter
- If published: `<br>[published](clawhub-link)`
- If has diagram: `<br>[flow diagram](path/to/SKILL.md#diagram)`

**Description:**
- `description:` from frontmatter

**Status:**
- `status:` from frontmatter (raw value: `published`, `stable`, `testing`, `draft`)
- No emoji (plain text)

## Single Source of Truth

**Frontmatter = canonical data**
- No manual sync drift
- Auto-discovered companions (no hardcoding)
- Clear separation: this project vs external projects

## AI Enforcement

**When updating skills:**
- Extract frontmatter data (name, description, status)
- Regenerate README tables
- Verify all SKILL.md have diagrams (see `skill-diagrams.sh`)

**Never:**
- Manually edit README tables
- Hardcode companion skill list
- Add skills without SKILL.md frontmatter
