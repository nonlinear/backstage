# Backstage Skill

**OpenClaw skill for backstage project management framework.**

## Installation

```bash
# Via symlink (for development)
ln -s ~/Documents/backstage/skill ~/.openclaw/skills/backstage

# Or copy (for production)
cp -r ~/Documents/backstage/skill ~/.openclaw/skills/backstage
```

## Usage

### Start work session
```
User: "vamos trabalhar no nonlinear"
Claw: [reads POLICY, HEALTH, ROADMAP, offers to create epic or work on existing]
```

### Create epic
```
User: "criar epic data-driven-links"
Claw: [creates v0.6.0-data-driven-links.md, adds to ROADMAP, optionally creates branch]
```

### Health check
```
User: "roda health check"
Claw: [runs global + project HEALTH checks, reports pass/fail]
```

### Close session
```
User: "boa noite"
Claw: [runs health, commits if pass, victory lap, body check]
```

## Commands

All commands via `backstage.sh`:

```bash
backstage.sh start [project-path]     # Start work session
backstage.sh epic create <name>       # Create new epic
backstage.sh health                   # Run health checks
backstage.sh close                    # Close session
```

## Project Structure

Required:
- `backstage/ROADMAP.md`

Optional:
- `backstage/POLICY.md` (project workflow rules)
- `backstage/HEALTH.md` (project health checks)
- `backstage/global/POLICY.md` (universal rules)
- `backstage/global/HEALTH.md` (universal checks)

## Polycentric Governance

Project rules win over global rules. Read both levels, project takes precedence.

## Version

**0.3.0** - OpenClaw Skill (initial release)

## Links

- **Repository:** https://github.com/nonlinear/backstage
- **Issues:** https://github.com/nonlinear/backstage/issues
