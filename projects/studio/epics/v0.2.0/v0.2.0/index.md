# Epic Notes

> Version, name, status → see `epic.yaml`

---

# v0.2.0 - Tier Logic

**Description:** Define tiers and what assets each one has

---

## Tier System Architecture

### What Are Tiers?

**Tiers = meta-organization of products (portfolio strategy)**

Tiers define **how much attention a product deserves** based on resources, stability, impact.

### Product Hierarchy

```
TIERS
  └─ Products
      ├─ Roadmaps
      │   └─ Epics
      │       └─ Tasks
      │           └─ Deliverables
      └─ Dept (responsible agent/team)
```

### Why Tiers Matter

1. **Resource allocation** - Higher tier = more attention, budget, marketing
2. **Lifecycle management** - Products move up/down tiers based on traction
3. **Portfolio strategy** - Not all products deserve equal investment
4. **Transparency** - Users/donors know what's actively supported vs experimental

### Tier Definitions (Example)

**Tier 1: Flagship**
- Active development, full support
- Regular updates, bug fixes, feature requests
- Marketing investment, social media presence
- Documentation maintained, onboarding optimized
- **Examples:** Contact list game (if successful), Audio librarian (if stable)

**Tier 2: Maintained**
- Stable, bug fixes only
- Minimal marketing, community-driven support
- Documentation exists, but not actively updated
- **Examples:** Tools that work well but don't need new features

**Tier 3: Experimental**
- Prototypes, proof-of-concepts
- No guaranteed support, may break
- Open source = others can pick up if interested
- **Examples:** Early-stage experiments, research projects

**Tier 4: Archived**
- No longer maintained
- Code available (open source), but dormant
- Documentation frozen, no new updates
- **Examples:** Projects that didn't find traction, superseded by better solutions

### Tier Movement

**Products can move up/down tiers based on:**
- **User traction** - Engagement, downloads, community interest
- **Resource availability** - Nicholas's time, donor funding, grants
- **Strategic fit** - Alignment with company vision, commons goals
- **Stability** - Is it production-ready? Does it need ongoing dev?

**Decision criteria:**
- Monthly review: Which products get attention this month?
- Quarterly review: Should we promote/demote any products?
- Annual review: Portfolio-wide strategy (what to sunset, what to invest in)

### Tier Offerings (Variable by Resources)

**High resources** (grants approved, donations flowing):
- Tier 1: 3-5 flagship products
- Tier 2: 5-10 maintained products
- Tier 3: Unlimited experiments

**Low resources** (bootstrapping, Nicholas-only time):
- Tier 1: 1-2 flagship products
- Tier 2: 2-3 maintained products
- Tier 3: Limited experiments (must archive fast if not promising)

### Open Source + Tiers

**All tiers are open source** - Even Tier 3 experiments.

**Why:**
- Tier 3 = experimental, may not become products
- But code is public = others can fork if interested
- Tier 4 = archived, but available for community pickup

**Transition:**
- Prototype stabilizes → Community interest → Someone else maintains → Can move back to Tier 2 (community-maintained)

---

**Updated:** 2026-03-09
