# Local Health Checks - README

**Backstage-specific project checks** (not universal framework checks).

**Context:** Backstage is meta - both framework (global/) AND project using that framework (root files).

**Checks (alphabetical order):**

- `dual-layer-global.sh` - Global framework files exist
- `dual-layer-project.sh` - Project status files exist at root
- `pre-merge-tasks.sh` - All tasks complete in ROADMAP before merge

**Run all checks:**

```bash
# From project root
for check in backstage/health/local/*.sh; do
  bash "$check"
done
```

**Universal checks:** See `../global/HEALTH.md`

**Last updated:** 2026-02-18  
**Version:** 2.0 (Exploded from monolithic HEALTH.md)
