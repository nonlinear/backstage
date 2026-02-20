# OpenClaw Skill Workflow

**Context:** The `skill/` folder contains the OpenClaw skill for backstage project management.

## Development Flow

**During epic development (e.g., v0.3.0):**

```bash
# Symlink skill to OpenClaw
ln -s ~/Documents/backstage/skill ~/.openclaw/skills/backstage

# Edit source, test instantly (no reinstall needed)
```

**After merge to main:**

```bash
# Publish to npm (if public)
# OR document manual install in README
```
