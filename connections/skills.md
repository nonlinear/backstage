# OpenClaw Skills - Best Practices

**Source:** Analysis of 6 official skills (weather, github, imsg, peekaboo, summarize, apple-notes)

**Reference:** `~/Documents/life/backstage/epic-notes/📌15-best-practices.md` (detailed analysis)

---

## 📋 SKILL.md Structure (Standard Pattern)

**All official skills follow this structure:**

```markdown
---
name: skill-name
description: One-line description (used in trigger detection)
homepage: https://link-to-docs (optional)
metadata:
  openclaw:
    emoji: 🎯
    os: ["darwin", "linux"]
    requires:
      bins: ["command-name"]
    install:
      - kind: brew
        package: package-name
        label: Install via Homebrew
---

# Skill Name

Brief intro (1-2 sentences).

## When to use

- Trigger phrase 1
- Trigger phrase 2
- Use case 3

## Quick start

```bash
actual-command --flag value
```

## Common patterns

### Feature 1
```bash
command --feature1
```

### Feature 2
```bash
command --feature2
```

## Examples

### Example 1: Common workflow
```bash
command --real --example
```

### Example 2: Advanced usage
```bash
command --advanced --flags
```
```

---

## ✅ Golden Rules

### 1. CLI-First, No Wrappers (99% of skills)

**Official skills = THIN documentation layers:**
- ✅ Document existing CLIs (don't reinvent)
- ✅ Trust underlying tool to handle errors
- ✅ Examples should be copy-pasteable
- ❌ NO shell script wrappers (unless justified)

**Exception:** Wrapper justified ONLY when:
1. Underlying tool has **silent failures** (empty JSON = valid output)
2. LLM can **misinterpret** empty as "permission to invent"
3. Wrapper **enforces binary behavior** (found vs not found)

---

### 2. SKILL.md = Pure Documentation

**What SKILL.md IS:**
- ✅ User reference (examples, flags, workflows)
- ✅ Trigger phrases (when to use this skill)
- ✅ Common patterns (copy-paste examples)
- ✅ Metadata (deps, install instructions)

**What SKILL.md is NOT:**
- ❌ Protocol enforcement ("you MUST do X")
- ❌ Behavioral instructions for LLM
- ❌ Repeated content from AGENTS.md

**Rule:** If it's a command to Claw (not the user), it belongs in AGENTS.md or a wrapper script.

---

### 3. Trigger Phrases (User-Editable)

**Two approaches:**

**A) In SKILL.md (when skill-specific):**
```markdown
## When to use

Use immediately when user asks:
- "summarize this URL"
- "what's this video about?"
- "transcribe this YouTube"
```

**B) In AGENTS.md (when part of workflow):**
```markdown
| Trigger Pattern | Action | Skill Path |
|----------------|--------|------------|
| "pesquisa" + book/topic | Read librarian SKILL.md | ~/.openclaw/skills/librarian/ |
```

**Guideline:** If trigger is about **when to load skill** → SKILL.md. If about **workflow context** → AGENTS.md.

---

### 4. Error Handling (Trust the CLI)

**Official pattern:**
- ✅ Let CLI fail loudly (exit codes, stderr)
- ✅ Document permission requirements up front
- ✅ Show exact error messages from tool
- ❌ Don't wrap errors to "improve" them

**Exception:** Wrapper justified when tool **fails silently** (valid output that looks like success).

---

### 5. Metadata (Frontmatter)

**Always declare:**

```yaml
metadata:
  openclaw:
    emoji: 🎯              # Visual identity
    os: ["darwin"]        # Platform restrictions
    requires:
      bins: ["command"]   # CLI dependencies
      python: ["package"] # Python deps (if needed)
    install:
      - kind: brew        # Installation method
        package: name
        label: Install via Homebrew
```

**Why:**
- OpenClaw can auto-check dependencies
- Users know what's required before trying
- Install instructions = actionable

---

### 6. Documentation Density (Examples > Theory)

**Official skills are DENSE with examples:**

**Good:**
```markdown
### Search by author
```bash
gh search repos --owner=github --language=python --limit=10
```

### Check PR status
```bash
gh pr checks 123
```

### View CI logs
```bash
gh run view 456 --log
```
```

**Bad:**
```markdown
## Examples

You can search, check PRs, view logs, etc.
```

**Rule:** Every feature = 1+ real, copy-pasteable example.

---

## 🎯 When to Create a Skill

**YES (create skill):**
- ✅ Tool exists, needs documentation (weather, github, imsg)
- ✅ Trigger phrases needed (summarize, peekaboo)
- ✅ Complex CLI with many flags (peekaboo)
- ✅ Silent failures need wrapper (librarian)

**NO (don't create skill):**
- ❌ One-off command (just run it)
- ❌ Tool self-documents well (man pages enough)
- ❌ Rarely used (not worth maintaining)

**Rule:** Skills are for **frequent, complex, or trigger-worthy tools**.

---

## 🔄 When Wrappers Are Justified

**Official skills: 0 wrappers (just docs)**

**Wrapper justified when:**
1. **Silent failure** - Tool returns valid output that looks like success (empty JSON array)
2. **LLM misinterpretation** - Empty result = "I can guess from knowledge"
3. **Binary enforcement** - Wrapper detects empty → forces "não achei" message

**Example (librarian.sh):**
```bash
RESULTS=$(python3 research.py --topic "$TOPIC" 2>/dev/null)
COUNT=$(echo "$RESULTS" | jq -r '.results | length')

if [ "$COUNT" -eq 0 ]; then
  echo "❌ Nenhum resultado encontrado para: $TOPIC"
  echo "💡 Sugestão: Reindexe a biblioteca com sync-library.sh"
  exit 1
fi

# Format results (pretty JSON, not raw)
echo "$RESULTS" | jq -r '.results[] | "📖 \(.title) - \(.author)"'
```

**Why justified:**
- research.py returns `{"results": []}` (valid, not error)
- LLM sees empty → invents content from training data
- Wrapper detects empty → exits with "não achei"

**Rule:** Wrapper = last resort, only for silent failures.

---

## 📚 Skill Lifecycle

### Phase 1: Documentation (Start Here)

**Create SKILL.md:**
1. Name, description, triggers
2. Frontmatter metadata (emoji, deps, install)
3. Quick start (1 minimal example)
4. Common patterns (3-5 examples)
5. Advanced usage (optional)

**Stop here if:** Tool has clear errors, LLM won't invent.

---

### Phase 2: Wrapper (Only If Needed)

**Create wrapper script when:**
- Tool has silent failures
- LLM invents content from empty results
- Binary enforcement needed (found vs not found)

**Wrapper responsibilities:**
1. Detect silent failures (empty arrays, null results)
2. Provide actionable error messages
3. Format output for readability
4. Exit with clear status codes

**Don't add wrappers for:**
- "Better" error messages (trust CLI)
- "Convenience" (users can alias)
- "Validation" (let tool validate)

---

### Phase 3: Integration (AGENTS.md)

**Add to trigger table:**
```markdown
| Trigger Pattern | Action | Skill Path |
|----------------|--------|------------|
| "keyword" + context | Read SKILL.md | ~/.openclaw/skills/name/ |
```

**Add to skill trigger section:**
```markdown
## 🎯 Skill Triggers - Auto-Activation System

"keyword" → skill-name
```

**Don't repeat:** SKILL.md content in AGENTS.md (link, don't duplicate).

---

## 🏴 Comparison: Official vs Custom

| Aspect | Official Skills | Custom (Librarian) | Guideline |
|--------|----------------|-------------------|----------|
| **SKILL.md role** | Pure docs | Pure docs | Always docs-only |
| **Wrappers** | None | librarian.sh | Only for silent failures |
| **Error handling** | CLI errors | Script enforces | Trust CLI unless silent |
| **Triggers** | In SKILL.md | In AGENTS.md | User-editable location |
| **Metadata** | Frontmatter | Should add | Always declare |
| **Examples** | Dense | Should expand | More examples = better |

---

## 📖 Official Skills (Study These)

**Simple (no wrappers):**
- `weather` - Pure curl + docs
- `apple-notes` - Thin wrapper around `memo`
- `github` - Documents `gh` CLI

**Complex (still no wrappers):**
- `peekaboo` - 200+ lines of examples, no wrapper
- `summarize` - Explicit triggers, delegates to CLI
- `imsg` - Permissions documented, CLI handles errors

**Location:** `/opt/homebrew/lib/node_modules/openclaw/skills/`

**Study pattern:** Read SKILL.md → notice no protocol enforcement → examples dense.

---

## 🎯 Quick Checklist (New Skill)

**Before creating:**
- [ ] Tool exists and is stable
- [ ] Used frequently (>1x/week)
- [ ] Has complex flags or workflows
- [ ] Needs trigger detection

**SKILL.md must have:**
- [ ] Frontmatter metadata (emoji, deps, install)
- [ ] One-line description (for trigger detection)
- [ ] Quick start (minimal example)
- [ ] 3-5 common patterns
- [ ] Real, copy-pasteable examples

**Wrapper needed?**
- [ ] Tool has silent failures (empty = valid)
- [ ] LLM would invent content
- [ ] Binary enforcement needed
- [ ] **If NO to all → skip wrapper**

**AGENTS.md integration:**
- [ ] Add to trigger table
- [ ] Add to skill trigger section
- [ ] Link to SKILL.md (don't duplicate)

---

## 💡 Key Insights

1. **Skills = documentation, not enforcement** - Protocol lives in AGENTS.md or wrappers
2. **CLI-first = trust the tool** - Don't reinvent what already works
3. **Wrappers = last resort** - Only for silent failures LLM can misinterpret
4. **Examples > theory** - Show, don't tell
5. **Metadata = declarative deps** - OpenClaw can auto-check

**Golden rule:** If official skills don't need it, you probably don't either. 🏴

---

---

## 🔗 Symlink Management (Custom Skills)

**Philosophy:** Skills live in projects, workspace only links to them.

**Why symlinks:**
- ✅ Skills stay with their projects (git tracked)
- ✅ Multiple OpenClaw instances can share skills
- ✅ No duplication (single source of truth)
- ✅ Easy to version control (each project owns its skills)

### Directory Structure

**Skill locations:**
- `~/Documents/skills/` - Standalone skills (not project-specific)
- `~/Documents/PROJECT/skills/` - Project-owned skills

**Workspace links:**
- `~/.openclaw/workspace/skills/NAME` → symlink to actual skill

**Example:**
```bash
# Standalone skill
ln -s ~/Documents/skills/context-switch ~/.openclaw/workspace/skills/context-switch

# Project-owned skill
ln -s ~/Documents/backstage/skills/backstage ~/.openclaw/workspace/skills/backstage
ln -s ~/Documents/librarian/skill ~/.openclaw/workspace/skills/librarian
```

### Current Symlinks (as of 2026-02-20)

**Standalone skills (15):**
```bash
ln -s ~/Documents/skills/apple-reminders-processing ~/.openclaw/workspace/skills/apple-reminders-processing
ln -s ~/Documents/skills/arch ~/.openclaw/workspace/skills/arch
ln -s ~/Documents/skills/better ~/.openclaw/workspace/skills/better
ln -s ~/Documents/skills/context-switch ~/.openclaw/workspace/skills/context-switch
ln -s ~/Documents/skills/dashboard ~/.openclaw/workspace/skills/dashboard
ln -s ~/Documents/skills/design-discrepancy ~/.openclaw/workspace/skills/design-discrepancy
ln -s ~/Documents/skills/find-books ~/.openclaw/workspace/skills/find-books
ln -s ~/Documents/skills/fitness ~/.openclaw/workspace/skills/fitness
ln -s ~/Documents/skills/i-ching ~/.openclaw/workspace/skills/i-ching
ln -s ~/Documents/skills/notify ~/.openclaw/workspace/skills/notify
ln -s ~/Documents/skills/reels-library ~/.openclaw/workspace/skills/reels-library
ln -s ~/Documents/skills/reminder-research ~/.openclaw/workspace/skills/reminder-research
ln -s ~/Documents/skills/roadmap ~/.openclaw/workspace/skills/roadmap
ln -s ~/Documents/skills/system-detective ~/.openclaw/workspace/skills/system-detective
ln -s ~/Documents/skills/token-management ~/.openclaw/workspace/skills/token-management
ln -s ~/Documents/skills/use-for ~/.openclaw/workspace/skills/use-for
```

**Project-owned skills (2):**
```bash
ln -s ~/Documents/backstage/skills/backstage ~/.openclaw/workspace/skills/backstage
ln -s ~/Documents/librarian/skill ~/.openclaw/workspace/skills/librarian
```

### Maintenance Commands

**List all symlinks:**
```bash
ls -la ~/.openclaw/workspace/skills/ | grep '^l'
```

**Verify targets exist:**
```bash
for link in ~/.openclaw/workspace/skills/*; do
  if [ -L "$link" ] && [ ! -e "$link" ]; then
    echo "BROKEN: $link"
  fi
done
```

**Recreate all symlinks:**
```bash
# Remove broken/old links first
cd ~/.openclaw/workspace/skills/
find . -type l -exec sh -c 'for x; do [ -e "$x" ] || rm "$x"; done' _ {} +

# Recreate (paste commands from list above)
```

---

## 📚 Further Reading

- Official skills: `/opt/homebrew/lib/node_modules/openclaw/skills/`
- ClawdHub: https://clawdhub.com (skill catalog)
- Skill creator skill: `~/.openclaw/skills/skill-creator/`
- Detailed analysis: `~/Documents/life/backstage/epic-notes/📌15-best-practices.md`
