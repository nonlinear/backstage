# Composite Generator Architecture (Future)

**Status:** Documented, not yet implemented  
**Priority:** After Matrix DM setup working

---

## Current State

### Values
- **organization.yaml:** `values: [brevity, parity-contract, auditability, research, honesty]`
- **squad.yaml:** `values: []` (empty in design squad)
- **agent.yaml:** `values: []` (empty in design-engineer)
- **Composites:** `.values.md` = placeholder text ("composite values come here")

### Library
- **organization.yaml:** No `library:` field
- **squad.yaml:** `library: [design_usability_general, ...]` (12 topics in design squad)
- **agent.yaml:** `library: []` (empty in design-engineer)
- **Composites:** `.library.md` = template text

---

## Proposed Architecture

### 1. Composite Generator Script

**Path:** `~/Backstage/scripts/generate-composites.sh`

**Features:**
- Reads YAML hierarchy (org → squad → agent)
- Merges values (dedupe, preserve order)
- Merges library topics (dedupe)
- Writes `.values.md` + `.library.md` per agent
- Git commits changes automatically

### 2. Watcher (File System Observer)

**Path:** `~/Backstage/scripts/watch-yaml-changes.sh` (or Node.js watcher)

**Monitors:**
- `organization.yaml`
- `agents/*/squad.yaml`
- `agents/*/*/agent.yaml`

**On change:**
- Runs `generate-composites.sh`
- Commits result

### 3. Values Definition Files

**Path:** `~/Backstage/values/*.md`

**One file per value:**
- `brevity.md`
- `parity-contract.md`
- `auditability.md`
- etc.

**Composite generator reads these, injects full text into `.values.md`**

---

## Implementation Steps

1. ✅ Create `values/*.md` structure
2. ✅ Write `generate-composites.sh` script
3. ✅ Test with design-engineer
4. ✅ Create watcher
5. ✅ Test auto-regeneration on YAML change

---

**Next:** Implement after Matrix DM setup complete.
