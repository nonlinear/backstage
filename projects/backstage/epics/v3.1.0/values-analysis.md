# Values Analysis: Global vs Squad-Specific

**Date:** 2026-03-09  
**Context:** Epic v3.1.0 - Determining which values should be global (auto-inject to all agents) vs squad-specific

---

## Current State

**Location:** `~/Backstage/values/` (16 files, 2633 words after compaction)

**Files:**
- auditability.md
- boundaries.md
- brevity.md
- design-language.md
- dna.md
- honesty.md
- identity.md
- jit.md
- metrics.md
- parity-contract.md
- references.md
- research.md
- sprezzatura.md
- tiers.md
- vision.md
- visual-hierarchy.md

---

## Analysis

| Value | Type | Scope | Reasoning |
|-------|------|-------|-----------|
| **auditability** | policy/pillar | ✅ **GLOBAL** | All agents commit with WHY |
| **brevity** | policy/pillar | ✅ **GLOBAL** | All agents be concise |
| **parity-contract** | policy/pillar | ✅ **GLOBAL** | All agents stop on discrepancy |
| **research** | policy/pillar | ✅ **GLOBAL** | All agents look outward before proposing |
| **honesty** | policy | ✅ **GLOBAL** | All agents use tier system, no false promises |
| **jit** | policy | 🎨 **SQUAD: design** | Progressive disclosure (design principle) |
| **sprezzatura** | policy | 🎨 **SQUAD: design** | Effortless appearance (design aesthetic) |
| **visual-hierarchy** | policy | 🎨 **SQUAD: design** | Only design squad needs this |
| **design-language** | system | 🎨 **SQUAD: design** | Cross-product design only |
| **dna** | principle | 📖 **PHILOSOPHY** (not policy) | Describes studio identity, not enforceable |
| **identity** | principle | 📖 **PHILOSOPHY** | Same as dna |
| **vision** | roadmap | 📖 **PHILOSOPHY** | Long-term, not day-to-day policy |
| **metrics** | system | 📖 **PHILOSOPHY** | Success definition, not enforceable |
| **tiers** | system | 🎨 **SQUAD: design/marketing** | Quality signaling (visual + messaging) |
| **boundaries** | boundary | 📖 **PHILOSOPHY** | What we don't do (philosophical) |
| **references** | references | 📖 **PHILOSOPHY** | Foundational texts (not policy) |

---

## Proposed Reorganization

### Keep in Global (`~/Backstage/values/`)
**Enforceable policies that apply to ALL agents:**
```
✅ auditability.md
✅ brevity.md
✅ parity-contract.md
✅ research.md
✅ honesty.md
```

### Move to Squad: Design (`~/Backstage/squads/design/values/`)
**Design-specific policies:**
```
🎨 jit.md
🎨 sprezzatura.md
🎨 visual-hierarchy.md
🎨 design-language.md
```

### Move to Squad: Marketing (`~/Backstage/squads/marketing/values/`)
**Messaging/positioning:**
```
📣 tiers.md (quality signaling = marketing message)
```

### Create Philosophy Folder (`~/Backstage/philosophy/`)
**Meta documents (identity, vision, not day-to-day policies):**
```
📖 dna.md
📖 identity.md
📖 vision.md
📖 metrics.md
📖 boundaries.md
📖 references.md
```

---

## Rationale

**Global values = Enforceable policies**
- Must be deterministic or probabilistic checks
- Apply to ALL agents (no exceptions without explicit blacklist)
- Examples: word count limit, commit message format, parity checks

**Squad values = Domain-specific policies**
- Only relevant to agents in that squad
- Examples: visual hierarchy rules (design), brand voice (marketing)

**Philosophy = Not policies**
- Aspirational, descriptive, foundational
- Don't enforce via checks (inform context instead)
- Examples: "What we are", "What we don't do", "Long-term vision"

---

## Next Steps

1. **Move squad-specific values** from global to squads/
2. **Create philosophy/** folder for meta docs
3. **Update backstage.yaml** values list (only global)
4. **Update squad.yaml** files with squad-specific values
5. **Document in governance architecture** (philosophy vs policy distinction)

---

**Status:** Analysis complete, moves pending (epic v3.1.0)
