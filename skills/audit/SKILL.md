# Audit Skill - Post-Mortem Analysis

**Purpose:** When something goes wrong, investigate root causes and create preventive measures.

**Trigger:** "audit [error description]", "post-mortem", "what went wrong"

---

## Protocol

### 1. Incident Documentation
- **What happened?** (factual description)
- **When?** (timestamp, session context)
- **Impact?** (what broke, data lost, service down)
- **User affected?** (Nicholas, remote access, vacation scenario)

### 2. Root Cause Analysis
- **Immediate cause** (what action triggered it)
- **Contributing factors** (why did I think it was OK?)
- **Missing safeguards** (what check/rule would have prevented it)
- **System gaps** (what infrastructure/process failed)

### 3. Evidence Collection
- Git history (what commits led to this)
- Chat history (what was discussed, what was missed)
- Session logs (what tool calls were made)
- Docker logs (what containers affected)
- File changes (what got modified/deleted)

### 4. Prevention Design
- **Immediate fix** (restore service, document damage)
- **Short-term prevention** (add rule to AGENTS.md)
- **Long-term safeguard** (create check, skill, or automation)
- **Testing** (how to verify prevention works)

### 5. Documentation
- Create `memory/post-mortem-YYYY-MM-DD-incident-name.md`
- Update AGENTS.md with new rule
- Create check if applicable
- Commit with clear message

---

## Template: Post-Mortem File

```markdown
# Post-Mortem: [Incident Name]

**Date:** YYYY-MM-DD HH:MM
**Session:** [session context]
**Severity:** Critical/High/Medium/Low

## What Happened

[Factual description of incident]

## Impact

- **Service affected:** [Kavita, etc.]
- **Data lost:** [user, progress, etc.]
- **Downtime:** [duration]
- **User scenario:** [what if traveling?]

## Timeline

- HH:MM - [action taken]
- HH:MM - [consequence observed]
- HH:MM - [recovery attempted]

## Root Cause

**Immediate:** [what action caused it]
**Contributing:** [why did I do it]
**Missing safeguard:** [what would have stopped me]

## Evidence

- Git commits: [relevant commits]
- Chat messages: [key quotes]
- Tool calls: [docker stop, etc.]
- Logs: [error messages]

## Prevention

### Immediate
- [ ] Restore service
- [ ] Document damage
- [ ] Create user if needed

### Short-term
- [ ] Add rule to AGENTS.md
- [ ] Update VISION.md if principle violated
- [ ] Test new rule with hypothetical

### Long-term
- [ ] Create check (if automatable)
- [ ] Create skill (if repeatable pattern)
- [ ] Update workflow docs

## Lessons

1. [Key lesson]
2. [Key lesson]
3. [Key lesson]

## Verification

- [ ] New rule in AGENTS.md
- [ ] Check created (if applicable)
- [ ] Tested prevention
- [ ] Committed changes
- [ ] User approved

---

**This must never happen again.**
```

---

## Usage

**Nicholas:** "audit kavita container deletion"

**Kin:**
1. Creates `memory/post-mortem-2026-02-25-kavita-deletion.md`
2. Collects evidence (git log, chat, docker history)
3. Documents root cause (why I thought it was OK)
4. Proposes prevention (check, rule, skill)
5. Commits documentation
6. Reports back with findings

---

## Philosophy

**Errors happen. Repeating errors = negligence.**

- Post-mortem = learning opportunity
- Documentation = shared memory
- Prevention = trust rebuilding
- Testing = verification

**Every major error MUST have:**
1. Post-mortem file
2. AGENTS.md update
3. Prevention measure
4. Verification test

**No error is too small to audit if it broke trust.**

---

## Related

- AGENTS.md § Production Services (created after Kavita incident)
- VISION.md § Trust & Accountability
- memory/ (incident documentation)
