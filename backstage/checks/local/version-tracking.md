# Version Tracking in Navigation Block

**🚨 CRITICAL: Backstage framework version must stay in sync with CHANGELOG**

When completing an epic and merging to main:

1. Move epic from ROADMAP → CHANGELOG (standard workflow)
2. **Also update version number in global/POLICY.md navigation template**

**Why backstage-specific:**
- Most projects: version lives in package.json, pyproject.toml, etc.
- Backstage: version lives in POLICY.md (used by all projects)

**Location:** `backstage/global/POLICY.md` → search for `v0.X.0` in navigation block template
