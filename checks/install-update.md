---
title: "Install and Update Guide"
type: probabilistic
description: "Instructions for installing and updating backstage"
---

**Backstage is AI-driven - no install scripts.**

## Initial Install

**Clone templates from GitHub:**

```bash
mkdir -p backstage/global

for file in ROADMAP CHANGELOG POLICY HEALTH; do
  curl -fsSL "https://raw.githubusercontent.com/nonlinear/backstage/main/templates/${file}-template.md" \
    -o "backstage/${file}.md"
done

curl -fsSL "https://raw.githubusercontent.com/nonlinear/backstage/main/backstage/global/POLICY.md" \
  -o "backstage/global/POLICY.md"
curl -fsSL "https://raw.githubusercontent.com/nonlinear/backstage/main/backstage/global/HEALTH.md" \
  -o "backstage/global/HEALTH.md"
```

**OR: Clone entire repo and copy backstage/ folder**

## Framework Updates

**Pull latest global files:**

```bash
curl -fsSL "https://raw.githubusercontent.com/nonlinear/backstage/main/backstage/global/POLICY.md" \
  -o "backstage/global/POLICY.md"
curl -fsSL "https://raw.githubusercontent.com/nonlinear/backstage/main/backstage/global/HEALTH.md" \
  -o "backstage/global/HEALTH.md"

curl -fsSL "https://raw.githubusercontent.com/nonlinear/backstage/main/.github/prompts/backstage-start.prompt.md" \
  -o ".github/prompts/backstage-start.prompt.md"
```

**What stays unchanged:**
- `backstage/ROADMAP.md` (your epics)
- `backstage/CHANGELOG.md` (your history)  
- `backstage/POLICY.md` (your rules)
- `backstage/HEALTH.md` (your tests)

**Why no install script:** Backstage = files + AI protocol. Just copy files, AI reads POLICY and executes.
