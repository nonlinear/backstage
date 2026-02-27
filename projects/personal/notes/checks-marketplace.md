# Checks Marketplace Analysis

**Parent epic:** [ai-agents-domains.md](./ai-agents-domains.md)

**Question:** Where do agents get checks? Is there a marketplace?

---

## Current State

**No unified check marketplace exists.**

**Approximations:**
1. **ClawHub skills** (some = check suites):
   - quality-documentation-manager
   - lawyer (contract validation)
   - gdpr-dsgvo-expert (compliance)

2. **NPM/PyPI** (linters = domain checks):
   - eslint configs (airbnb, google, standard)
   - prettier, stylelint
   - pytest plugins

3. **Lighthouse CI** (web checks):
   - WCAG 2.1 (accessibility)
   - Performance budgets
   - SEO validators

---

## Gap: CheckHub (Proposed)

**What it would be:**
- Repository of reusable checks
- YAML metadata + external code (not inline)
- Versioned (semver)
- Tagged by domain (design, legal, code, marketing)
- Dependency resolution (check A needs check B)
- Determinism levels (strict, contextual, LLM-assisted)

**Example check:**
```yaml
# spacing-consistency.check
name: spacing-consistency
domain: design
determinism: strict
input: figma-file-url
output: pass/fail + violations[]
dependencies: []
version: 1.0.0
```

**Integration:**
- ClawHub skills = wrappers for check libraries
- Agents discover checks via `clawhub search <domain> check`
- BA grooming = identify missing checks

---

## Interim Solution

**Until CheckHub exists:**

1. **Agent-local checks** (`~/Documents/agents/<name>/checks/`)
2. **Shared checks** (`~/Documents/checks/domains/<domain>/`)
3. **ClawHub skills** (when available)

**BA agent** maintains check library inventory (tracks gaps).

---

## Next Steps

1. Document check file format (YAML spec)
2. Create check templates per domain
3. Build local check registry (~/Documents/checks/)
4. Propose CheckHub to ClawHub community (future)
