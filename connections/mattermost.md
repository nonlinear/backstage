---
service: Mattermost
description: "Access team chat, set up agent bot tokens, create channels/teams, troubleshoot OpenClaw integration, or manage multi-agent communication"
host: "localhost:8065"
tailscale: "studio.adal-rigel.ts.net:8065"
---

# Mattermost - Open Source Team Chat

**Type:** Self-hosted team collaboration platform  
**Use case:** Multi-agent communication, meeting rooms, organized conversations

---

## Connection Details

**Local URL:** http://localhost:8065  
**Tailscale URL:** https://studio.adal-rigel.ts.net:8065 (iPad/iPhone remote access)

**Admin credentials:**
- First user to sign up becomes admin
- Create account on first visit

---

## Docker Setup

**Location:** `~/Apps/mattermost/`

**Start/stop:**
```bash
cd ~/Apps/mattermost
docker-compose up -d      # Start
docker-compose down       # Stop
docker-compose logs -f    # View logs
```

**Auto-start:** Configured with `restart: always` (survives Mac restart)

**Ports:**
- 8065: Mattermost web interface
- 5432: PostgreSQL (internal only)

**Data persistence:**
- `~/Apps/mattermost/data/` - all Mattermost data
- Git-tracked for backups
- Time Machine backup enabled

---

## iPad App

**App Store:** Search "Mattermost"  
**Download:** https://apps.apple.com/app/mattermost/id1257222717

**Setup:**
1. Install app on iPad
2. Enter server URL: `https://studio.adal-rigel.ts.net:8065`
3. Create account (first user = admin)
4. Done!

---

## OpenClaw Integration

### Incoming Webhooks (Agents → Mattermost)

**Setup:**
1. Mattermost → Integrations → Incoming Webhooks
2. Create webhook for each agent (Defense, UXR, Legal, etc)
3. Copy webhook URL
4. Store in `~/.env`:
   ```bash
   MATTERMOST_WEBHOOK_DEFENSE=https://studio.adal-rigel.ts.net:8065/hooks/xxx
   MATTERMOST_WEBHOOK_UXR=https://studio.adal-rigel.ts.net:8065/hooks/yyy
   ```

**Agent posts message:**
```bash
curl -X POST $MATTERMOST_WEBHOOK_DEFENSE \
  -H 'Content-Type: application/json' \
  -d '{"text": "Defense agent: Task completed ✅"}'
```

### Outgoing Webhooks (Mattermost → Agents)

**Setup:**
1. Mattermost → Integrations → Outgoing Webhooks
2. Trigger words: "@defense", "@uxr", etc
3. Callback URL: OpenClaw webhook endpoint
4. Agent receives command, executes, posts result back

---

## Organization Strategy

**Channels:**
- `#defense` - Defense agent (code review, PR management)
- `#uxr` - UX Research agent
- `#legal` - Legal agent (contract review)
- `#secretaria` - Secretaria agent (clerical tasks)
- `#general` - Multi-agent discussions
- `#status` - Agent health checks, notifications

**Direct Messages:** You ↔ specific agent (1-on-1)

**Threads:** Keep context organized within channels

---

## Tailscale Serve

**Command:**
```bash
tailscale serve --bg --https=8065 http://localhost:8065
```

**Already configured** (part of setup script)

---

## Security Notes

- **Self-hosted** = full data control
- **No external surveillance** (unlike Slack, Teams)
- **Local-first** = works offline on home network
- **Tailscale encrypted** = secure remote access

---

## Future Enhancements

- [ ] Bot user for each agent (vs webhooks)
- [ ] Slash commands (`/defense review PR-123`)
- [ ] File sharing (agents attach screenshots, logs)
- [ ] Voice integration (Home Assistant → Mattermost notifications)

---

**Philosophy:** Mattermost = meeting room where you + agents collaborate. OpenClaw UI = control panel. Backstage = planning. All complementary. 🏴
