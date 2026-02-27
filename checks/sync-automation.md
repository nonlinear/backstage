# Sync & Automation - Cross-Project Knowledge Sharing

**Purpose:** Propagate global rules from workspace → other projects, keep backstage framework updated.

## What Syncs FROM Workspace

**Target:** 11 projects (life, librarian, wiley, etc.)

**Files synced:**
- `global/POLICY.md` → Other projects
- `global/HEALTH.md` → Other projects
- `.github/prompts/` → Other projects

**Mechanism:** `Sync_settings.py` (cronjob Mondays 9am)

## What Syncs TO Workspace

**Source:** `nonlinear/backstage` (canonical backstage framework)

**Files synced:**
- `global/` ← nonlinear/backstage
- `templates/` ← nonlinear/backstage
- `.github/prompts/` ← nonlinear/backstage

**Mechanism:** `backstage-update.py`

## Cronjobs

**Mondays 9am:**
```bash
python3 ~/Documents/personal/.github/scripts/Sync_settings.py
```

**Purpose:**
- Push workspace improvements to other projects
- Ensure consistent workflow across projects

## AI Enforcement

**Before suggesting workflow changes:**
- Check if change should be global (affects all projects)
- If global → Update workspace first, let sync propagate
- If project-specific → Update project POLICY.md only

**Monitor sync health:**
- Check sync logs for errors
- Alert if sync hasn't run in >7 days
- Verify synced files match (no drift)

**Example:**
```
User: "Change epic naming convention"
AI check: Global or project-specific?
- Global → Update workspace/global/POLICY.md
- Project → Update ~/Documents/librarian/backstage/POLICY.md
```
