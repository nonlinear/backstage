# v2.7.0 Technical Notes

## Architecture Decision: Multi-Gateway

**Each agent = 1 OpenClaw gateway:**
- Separate port (18790, 18791, 18792...)
- Separate workspace (`~/Backstage/agents/DOMAIN/AGENT_NAME`)
- Separate memory (SOUL.md, AGENTS.md, memory/)
- Shared credentials (via symlink)

**Why:** True isolation - different expertise, behavior, context.

---

## Shared Credentials via Symlink

```bash
ln -s ~/.openclaw/agents/main/agent/auth-profiles.json \
  ~/.openclaw/state-AGENT_NAME/agents/main/agent/auth-profiles.json
```

**Result:** Change API key once, all agents update.

---

## DM Policy: Open

`dmPolicy: "open"` (no pairing required)

**Safe because:**
- Mattermost local-only (localhost:8065)
- Protected by Tailscale
- Only you have access

**When to change:** If exposing publicly, use `"allowlist"` or `"pairing"`.

---

## Port Allocation

**Range:** 18790-18840 (50 slots)

**Allocated:**
- 18790: business-analyst
- 18791: design-engineer

**Registry:** `~/Backstage/projects/studio/ports.md`

---

## Bot Accounts vs PAT

**Bot Accounts (USED):**
- Dedicated automation user
- Own username (@business-analyst)
- Own token (revokable independently)
- Perfect audit trail

**Personal Access Tokens (NOT USED):**
- Inherits user permissions
- Messages appear as you
- Bad auditability

---

## References

- Checklist: `agent-to-mattermost-checklist.md`
- Architecture options: `architecture-options.md`
- Port registry: `~/Backstage/projects/studio/ports.md`
