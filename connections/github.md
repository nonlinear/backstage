---
service: GitHub
description: "Clone repos, push commits, check SSH auth, troubleshoot git operations, or manage GitHub CLI (gh) authentication"
auth: "SSH key"
---

# GitHub Connection

## Authentication

**Method:** SSH key (already configured)

**Test connection:**
```bash
ssh -T git@github.com
# Should reply: "Hi nonlinear! You've successfully authenticated..."
```

**User:** nonlinear
**Git config:** Already set (name, email, ssh key)

---

## Push Protocol

**Standard push:**
```bash
git push origin main
```

**Push with tags:**
```bash
git push origin main --tags
```

**Push specific tag:**
```bash
git push origin v0.3.5
```

**No permission needed** - SSH key handles authentication automatically.

---

## Repositories

**Backstage:**
- Remote: `git@github.com:nonlinear/backstage.git`
- Location: `~/Documents/backstage/`
- Last push: v0.3.5 (2026-02-14)

**Skills:**
- Remote: `git@github.com:nonlinear/skills.git`
- Location: `~/Documents/skills/`
- Last push: v0.1.0 (2026-02-14)

---

## Workflow

1. **Work on epic branch:** `git checkout epic/vX.Y.Z`
2. **Merge to main:** `git merge --no-ff epic/vX.Y.Z`
3. **Tag release:** `git tag -a vX.Y.Z -m "Release message"`
4. **Push:** `git push origin main --tags`

**No manual auth needed** - SSH key configured, just push.

---

## Gotchas

- **Always push tags with releases** (`--tags` flag)
- **SSH key must be loaded** (check with `ssh-add -l`)
- **Remote must be SSH format** (not HTTPS)

---

**Last updated:** 2026-02-14
