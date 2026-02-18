# Global Health Checks - README

**Universal health checks** that apply to ALL projects using backstage framework.

**Purpose:** Define what "healthy" means - validation tests, product metrics, system wellness.

**Checks (alphabetical order):**

- `gaps-list.sh` - List existing gaps for AI awareness
- `git-changes-sync.sh` - Documentation sync check
- `navigation-block-readme.sh` - README has navigation block
- `navigation-block-status-files.sh` - All backstage files have navigation blocks
- `readme-links.sh` - Navigation links point to existing files
- `required-files.sh` - Required backstage files exist
- `required-global-files.sh` - Global files exist
- `roadmap-epic-format.sh` - Epics follow standard format
- `semver-changelog.sh` - CHANGELOG versions follow semantic versioning

**Run all checks:**

```bash
# From project root
for check in backstage/health/global/*.sh; do
  bash "$check"
done
```

**Last updated:** 2026-02-18  
**Version:** 2.0 (Exploded from monolithic HEALTH.md)
