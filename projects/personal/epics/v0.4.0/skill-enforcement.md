# v0.15.0 - Skill Enforcement via Shell Scripts

**Status:** 🚨 URGENT  
**Created:** 2026-02-08  
**Priority:** CRITICAL (blocks trust in all skills)

---

## Problem

**Skills não são confiáveis se o protocolo vive apenas em SKILL.md.**

**Example failure (today):**
- User: "pesquisa SPLIFF method"
- Librarian SKILL.md says: "If no results → say 'não achei', NEVER invent"
- I violated protocol: invented explanation from "general knowledge"
- **Result:** Mentira. Trust broken.

**Root cause:**
- SKILL.md = text prompt (ambiguous, can be ignored by LLM)
- No enforcement mechanism
- Checklist without punishment = teatro

**Analogia:**
- If Jira API breaks and I INVENT tasks → you make decisions based on lies
- If Librarian returns empty and I INVENT facts → same problem
- **Silence > mentira**

---

## Solution

**Move logic from SKILL.md to shell scripts.**

**New model:**

```
┌─────────────────┐
│   User says     │
│  "pesquisa X"   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  I detect       │
│  trigger        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Run script:    │
│  librarian.sh   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Script does:   │
│  1. research.py │
│  2. Check empty │
│  3. Format JSON │
│  4. Return text │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  I show output  │
│  AS-IS (no      │
│  interpretation)│
└─────────────────┘
```

**SKILL.md becomes:**
- Documentation of what script does
- Trigger patterns
- Usage examples

**Script contains:**
- Exact command syntax
- Error handling
- Output formatting
- NO INTERPRETATION by LLM

---

## What You Need From Me

**To migrate librarian skill:**

1. **Current librarian logic (SKILL.md rules):**
   - Run `research.py` with exact syntax
   - If `results: []` → return "Não achei resultados"
   - If results found → format as citations (numbered, with source)
   - NEVER add opinion/interpretation

2. **What should shell script do?**

**Proposal:**

```bash
#!/bin/bash
# ~/.openclaw/skills/librarian/librarian.sh

QUERY="$1"
TOPIC="$2"

cd ~/Documents/librarian

# Run research
OUTPUT=$(python3 engine/scripts/research.py "$QUERY" --topic "$TOPIC" 2>&1)

# Check if empty or error
if echo "$OUTPUT" | jq -e '.results | length == 0' > /dev/null 2>&1; then
  echo "❌ Não achei resultados sobre \"$QUERY\" no topic \"$TOPIC\"."
  exit 1
fi

# Check for actual error
if ! echo "$OUTPUT" | jq empty 2>/dev/null; then
  echo "❌ Erro ao rodar librarian:"
  echo "$OUTPUT"
  exit 1
fi

# Format citations (no interpretation)
echo "📚 **RESEARCH:** $QUERY"
echo ""
echo "$OUTPUT" | jq -r '
  "Achei \(.results | length) resultado(s):\n" +
  (
    .results | to_entries | map(
      "\n\(.key + 1)️⃣ **\(.value.title)**\n**Fonte:** \(.value.source_file)\n\n> \(.value.text)\n"
    ) | join("")
  )
'
```

**This script:**
- ✅ Exact syntax (no ambiguity)
- ✅ Checks empty → returns "não achei"
- ✅ Formats results → numbered citations
- ✅ NO interpretation (just formats JSON)
- ✅ I can only run it AS-IS (no deviation)

**Questions:**
1. Does this logic match what you want?
2. Should I add metadata (book author, page if available)?
3. Error handling: just show raw error or parse it?
4. Should script also handle reindexing if index missing?

---

## Epic Tasks

**Phase 1: Planning (Before Execution)**
- [ ] **Architecture exercise** ([epic-notes/15-architecture.md](epic-notes/15-architecture.md))
  - Answer 5 red notes (triggers, invocation, scope, format, behavior)
  - Discuss → agree → turn yellow
- [ ] **Review best practices** ([epic-notes/15-best-practices.md](epic-notes/15-best-practices.md))
  - Validate our approach against official skills
  - Confirm deviations are justified
- [ ] **Review SKILL.md translation** ([epic-notes/15-skill-translation.md](epic-notes/15-skill-translation.md))
  - Answer 5 questions (wrapper prominence, direct usage, triggers, metadata, tone)
  - Approve new format

**Phase 2: Execution (After Agreement)**
- [ ] **Execute combined architecture**
  - Replace SKILL.md with approved version
  - Update librarian.sh based on architecture decisions
  - Test wrapper works as documented
- [ ] **Review error messages**
  - Test empty index → clear reindex instructions
  - Test empty results → "não achei"
  - Test invalid syntax → helpful error
- [ ] **Test efficiency**
  - Does wrapper prevent invention?
  - Can Claw deviate from script output?
  - Is output format clear/useful?

**Phase 3: Validation**
**Phase 3: Validation**
- [ ] Test with real indexed library (when Nicholas reindexes)
- [ ] Verify: Claw can't invent facts
- [ ] Verify: Empty → "não achei" (not guessing)
- [ ] User acceptance: Does Nicholas trust output?

**Phase 4: Polish (LOW PRIORITY)**
- [ ] Clean up non-critical errors (model loading warnings, etc.)
- [ ] Commit stable version
- [ ] Document lessons learned

**Note:** Script location: `~/.openclaw/skills/librarian/librarian.sh` (outside workspace git)

**Phase 4: Polish (LOW PRIORITY)**
- [ ] Clean up non-critical errors (model loading warnings, etc.)
- [ ] Commit stable version
- [ ] Document lessons learned

**Deferred to future epics:**
**Deferred to future epics:**
- Metadata (v0.16.0)
- Script unification (v0.17.0)
- Features: multi-topic, filters (v0.18.0)

---

## Success Criteria

**Librarian skill is USEFUL when:**
- ✅ I trigger on "pesquisa X"
- ✅ I run script (no interpretation)
- ✅ Empty results → I say "não achei" (NEVER invent)
- ✅ Valid results → I show citations AS-IS
- ✅ You trust the output (no mentira)

**Trust restored when:**
- ✅ You can rely on librarian output
- ✅ No difference between "I checked and found nothing" vs "I didn't check"
- ✅ Skills become binário (script runs or doesn't, no ambiguity)

---

## Open Questions

1. **Reindexing:**
   - Should script auto-detect missing index and prompt reindex?
   - Or should that be separate skill/command?

2. **Topic auto-detection:**
   - Should I try to guess topic from query?
   - Or always require explicit `--topic`?

3. **Multi-topic search:**
   - Should script support `--topic chaos-magick,occult` (comma-separated)?
   - Or one topic per search?

4. **Metadata richness:**
   - Just book title? Or also author, year, page if available?

---

## Next Steps

**Immediate:**
1. Nicholas answers questions above
2. I write `librarian.sh` based on answers
3. I update `SKILL.md` (documentation only)
4. I create branch `epic-15-skill-enforcement`
5. We test together

**After librarian works:**
- Decide: which other skills need this model?
- Document: "How to write enforceable skills" (template)
- Audit: existing skills for protocol violations

---

## Why This Matters

**Skills são a promessa do OpenClaw.**

Se eu não posso seguir protocolo → skills são inúteis → você volta pro VSCode (onde prompt é exato).

**Isso não é feature. É survival.**

Se skills não funcionam, sistema tá quebrado.

**Essa é a correção.**
