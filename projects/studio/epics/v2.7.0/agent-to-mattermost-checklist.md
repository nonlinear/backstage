# Agent to Mattermost Checklist

**Purpose:** Step-by-step guide to add a new AI agent to Mattermost.

**When to use:** Adding new agent (e.g., UXR, Legal, Marketing) to OpenClaw + Mattermost integration.

---

## Prerequisites

- [ ] OpenClaw Gateway running
- [ ] Mattermost accessible (http://localhost:8065)
- [ ] Admin token available (`$MATTERMOST_ADMIN_TOKEN` in `.env`)
- [ ] Team ID known (`$MATTERMOST_TEAM_ID` in `.env`)

---

## Steps

### 1. Create Bot Account (via API)

```bash
source ~/Documents/personal/.env

curl -s -X POST $MATTERMOST_URL/api/v4/bots \
  -H "Authorization: Bearer $MATTERMOST_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "AGENT_USERNAME",
    "display_name": "Agent Display Name",
    "description": "Agent description/purpose"
  }' | jq -r '{user_id: .user_id, username: .username}'
```

**Save `user_id` for next steps.**

---

### 2. Generate Bot Token

```bash
curl -s -X POST $MATTERMOST_URL/api/v4/users/BOT_USER_ID/tokens \
  -H "Authorization: Bearer $MATTERMOST_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"description": "OpenClaw AGENT_NAME bot token"}' | jq -r '.token'
```

**Save token to `.env`:**

```bash
echo "MATTERMOST_BOT_AGENT_NAME_TOKEN=TOKEN_HERE" >> ~/Documents/personal/.env
```

---

### 3. Add Bot to Team

```bash
curl -s -X POST $MATTERMOST_URL/api/v4/teams/$MATTERMOST_TEAM_ID/members \
  -H "Authorization: Bearer $MATTERMOST_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"team_id": "'"$MATTERMOST_TEAM_ID"'", "user_id": "BOT_USER_ID"}'
```

---

### 4. Create Channel (if new)

```bash
curl -s -X POST $MATTERMOST_URL/api/v4/channels \
  -H "Authorization: Bearer $MATTERMOST_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "team_id": "'"$MATTERMOST_TEAM_ID"'",
    "name": "agent-name",
    "display_name": "Agent Name",
    "type": "O",
    "purpose": "Agent purpose description"
  }' | jq -r '{id: .id, name: .name}'
```

**Save `channel_id` to `.env`:**

```bash
echo "MATTERMOST_CHANNEL_AGENT_NAME=CHANNEL_ID" >> ~/Documents/personal/.env
```

---

### 5. Add Bot to Channel

```bash
curl -s -X POST $MATTERMOST_URL/api/v4/channels/CHANNEL_ID/members \
  -H "Authorization: Bearer $MATTERMOST_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"user_id": "BOT_USER_ID"}'
```

---

### 6. Update OpenClaw Config

Edit `~/.openclaw/openclaw.json`:

```json
{
  "channels": {
    "mattermost": {
      "accounts": {
        "agent-name": {
          "botToken": "$MATTERMOST_BOT_AGENT_NAME_TOKEN",
          "agentId": "agent-name"
        }
      },
      "groups": {
        "CHANNEL_ID": {
          "enabled": true,
          "requireMention": false,
          "account": "agent-name"
        }
      }
    }
  }
}
```

**Or use `jq` to merge:**

```bash
source ~/Documents/personal/.env

jq --arg token "$MATTERMOST_BOT_AGENT_NAME_TOKEN" \
   --arg channel "$MATTERMOST_CHANNEL_AGENT_NAME" \
   '.channels.mattermost.accounts["agent-name"] = {botToken: $token, agentId: "agent-name"} |
    .channels.mattermost.groups[$channel] = {enabled: true, requireMention: false, account: "agent-name"}' \
   ~/.openclaw/openclaw.json > /tmp/openclaw-updated.json && \
   mv /tmp/openclaw-updated.json ~/.openclaw/openclaw.json
```

---

### 7. Restart OpenClaw Gateway

```bash
~/Desktop/openclaw-recovery.sh
```

**Wait for Gateway to come back online (~30s).**

---

### 8. Approve Pairing (when user interacts)

User sends first message → bot replies with pairing code.

**Approve:**

```bash
openclaw pairing approve mattermost PAIRING_CODE
```

---

### 9. Test Bot Response

Send message in channel:

```
@agent-name hello, can you hear me?
```

Bot should respond.

---

## Verification Checklist

- [ ] Bot appears in Mattermost team members
- [ ] Bot appears in channel members
- [ ] Token saved to `.env`
- [ ] Channel ID saved to `.env`
- [ ] `openclaw.json` updated (accounts + groups)
- [ ] Gateway restarted successfully
- [ ] Pairing approved
- [ ] Bot responds to messages

---

## Troubleshooting

### "No team member found for that user ID"
**Fix:** Bot not added to team (step 3)

### "You do not have the appropriate permissions"
**Fix:** Bot not in channel (step 5)

### "OpenClaw: access not configured"
**Fix:** Need pairing approval (step 8)

### Bot doesn't respond
**Fix:** Check `openclaw.json` routing (channel ID must match), restart gateway

---

## Example: Adding "UXR Agent"

```bash
# 1. Create bot
curl -X POST $MATTERMOST_URL/api/v4/bots \
  -H "Authorization: Bearer $MATTERMOST_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"username": "uxr", "display_name": "UX Researcher", "description": "User research and testing"}' \
  | jq -r '.user_id'
# Output: xyz123

# 2. Generate token
curl -X POST $MATTERMOST_URL/api/v4/users/xyz123/tokens \
  -H "Authorization: Bearer $MATTERMOST_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"description": "OpenClaw UXR bot"}' | jq -r '.token'
# Output: abc456

# 3. Add to team
curl -X POST $MATTERMOST_URL/api/v4/teams/$MATTERMOST_TEAM_ID/members \
  -H "Authorization: Bearer $MATTERMOST_ADMIN_TOKEN" \
  -d '{"team_id": "'"$MATTERMOST_TEAM_ID"'", "user_id": "xyz123"}'

# 4. Create channel
curl -X POST $MATTERMOST_URL/api/v4/channels \
  -H "Authorization: Bearer $MATTERMOST_ADMIN_TOKEN" \
  -d '{"team_id": "'"$MATTERMOST_TEAM_ID"'", "name": "uxr", "display_name": "UX Researcher", "type": "O"}' \
  | jq -r '.id'
# Output: def789

# 5. Add to channel
curl -X POST $MATTERMOST_URL/api/v4/channels/def789/members \
  -H "Authorization: Bearer $MATTERMOST_ADMIN_TOKEN" \
  -d '{"user_id": "xyz123"}'

# 6. Save to .env
echo "MATTERMOST_BOT_UXR_TOKEN=abc456" >> ~/Documents/personal/.env
echo "MATTERMOST_CHANNEL_UXR=def789" >> ~/Documents/personal/.env

# 7. Update openclaw.json (manually or via jq)
# 8. Restart: ~/Desktop/openclaw-recovery.sh
# 9. Approve pairing when user messages
# 10. Test!
```

---

**Reference:** `~/Documents/personal/connections/mattermost.md`
