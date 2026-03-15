# Port Allocation Registry

**Last updated:** 2026-03-15

## Range Assignments

| Range | Purpose | Notes |
|-------|---------|-------|
| 18789 | Main OpenClaw Gateway | Kin (webchat, Telegram, main agent) |
| 18790-18840 | Agent Gateways | 50 slots for isolated agent instances |
| 3004 | Backstage | IMMUTABLE (permalinks) |
| 8765 | Agenda Dashboard | localhost http.server |
| 8766 | Librarian Backstage | localhost http.server |

---

## Agent Gateway Ports (18790-18840)

| Port | Agent | Workspace | Status | Notes |
|------|-------|-----------|--------|-------|
| 18790 | business-analyst | `~/Backstage/agents/meta/business-analyst` | ALLOCATED | Requirements, stakeholders |
| 18791 | design-engineer | `~/Backstage/agents/design/design-engineer` | ALLOCATED | UX/UI/Frontend |
| 18792 | uxr-researcher | `~/Backstage/agents/research/uxr-researcher` | RESERVED | User research |
| 18793 | legal-counsel | `~/Backstage/agents/legal/legal-counsel` | RESERVED | Compliance, contracts |
| 18794 | marketing-strategist | `~/Backstage/agents/marketing/marketing-strategist` | RESERVED | GTM, positioning |
| 18795-18840 | (unassigned) | - | AVAILABLE | 46 slots free |

---

## Port Assignment Protocol

**When adding new agent:**

1. **Pick next available port** (18792, 18793, etc.)
2. **Update this file** (add row to table)
3. **Create LaunchAgent** with port in `OPENCLAW_GATEWAY_PORT`
4. **Create config** (`~/.openclaw/openclaw-AGENT.json`) with `gateway.port`
5. **Commit:** `git add ports.md && git commit -m "ports: allocate 187XX for AGENT"`

**NEVER reuse ports** (even if agent deleted - mark as RETIRED to avoid confusion)

---

## Immutable Ports (NEVER MOVE)

**These ports have external dependencies (permalinks, bookmarks, Tailscale):**

- **3004** - Backstage (permalinks in docs, responses, Tailscale serve)
- **8765** - Agenda (bookmark in Nicholas's devices)
- **8766** - Librarian (bookmark)
- **18789** - Main OpenClaw (recovery scripts, Tailscale, external integrations)

**If port blocked:** Find blocker, remove blocker. **NEVER move the port.**

---

## Recovery Commands

**List all OpenClaw gateways:**
```bash
launchctl list | grep "ai.openclaw.gateway"
```

**Check port usage:**
```bash
lsof -ti :PORT
```

**Restart all agent gateways:**
```bash
~/Desktop/restart-openclaw-gateways.sh
```

---

**Version:** 1.0
**Maintainer:** Nicholas + Kin
