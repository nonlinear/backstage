# Epic Notes

> Version, name, status, tasks → see `epic.yaml`

---

**Philosophy:** Agents as social actors with identity, presence, and communication channels.

## Goal

Multi-agent communication infrastructure where each agent has identity (username), can post updates, coordinate in squads, and respond to @mentions.

## Why Agent Communication Matters

**Current (invisible agents):**
- Nicholas talks to Kin (single interface)
- No visibility into which agent did what
- No agent-to-agent coordination
- No squad collaboration
- Agents = invisible workers

**With communication platform:**
- Each agent = user (@defense, @secretaria, @wiley)
- Agents post updates ("@defense: Fixed bug in v0.34.0")
- Squads coordinate work (DevSquad = @defense + @uxr + @qa)
- Nicholas @mentions specific agents
- Agents = visible citizens of workspace

## Platform Options

### Option A: Mattermost (Mac Studio)
**Pros:**
- Self-hosted (privacy)
- Native bots API
- Channels/threads
- @mentions
- Popular (large ecosystem)

**Cons:**
- ❌ No ARM64 support (Mac Studio incompatible)
- Would need NAS (if x86_64) or cloud

### Option B: Mattermost on NAS
**Depends on:** NAS architecture (x86_64 vs ARM)

**Pros:**
- If x86_64 → works
- Centralized (not on Mac Studio)
- Always-on

**Cons:**
- Need to verify NAS hardware

### Option C: Zulip (Mac Studio)
**Status:** Already installed (port 8090)

**Pros:**
- ✅ ARM64 compatible (running now)
- Self-hosted
- Bots API
- Channels/streams
- @mentions

**Cons:**
- Less popular than Mattermost
- Slightly different UX

### Option D: Mastodon (Federated)
**Pros:**
- Federated (agents as public social actors)
- ActivityPub (interop with fediverse)
- Public visibility (portfolio)
- Self-hosted or joinmastodon.org

**Cons:**
- More complex (federation)
- Public by default (privacy considerations)
- Heavier (media-focused)

### Option E: Hybrid (Mattermost/Zulip + Mastodon)
- Internal comms: Mattermost/Zulip (private, work coordination)
- Public updates: Mastodon (portfolio, announcements)
- Bridge between platforms

## Use Cases

**1. Agent Updates**
```
@defense: Completed v0.34.0 task 3 (Docker MCP)
@secretaria: Reminder - Wiley standup in 30min
@uxr: Design discrepancy found in button spacing
```

**2. Squad Coordination**
```
#DevSquad channel:
@defense: Starting epic v0.35.0
@uxr: Need design review for Backstage UI
@qa: Test plan ready, waiting for staging
```

**3. Nicholas @mentions**
```
Nicholas: "@defense why did commit fail?"
@defense: "Missing git config, fixed in 92ad8e8"
```

**4. Cross-agent collaboration**
```
@wiley: "@defense can you check Jira integration?"
@defense: "On it, testing now"
```

## Agent Identities

**Proposed users:**
- `@defense` - Development, git, coding
- `@secretaria` - Scheduling, reminders, clerical
- `@wiley` - Work context (Jira, Figma, design systems)
- `@uxr` - UX research, design review
- `@qa` - Testing, validation
- `@librarian` - Research, book queries
- `@marketing` - (future) Content, social media
- `@legal` - (future) Compliance, contracts

## Squads (Groups)

**DevSquad:**
- @defense (lead)
- @uxr
- @qa
- Focus: Code + design + testing

**ResearchSquad:**
- @librarian (lead)
- @uxr
- Focus: Research + synthesis

**WorkSquad:**
- @wiley (lead)
- @secretaria
- Focus: Wiley tasks + scheduling

## Technical Architecture

**Agent as Bot User:**
```python
# Mattermost/Zulip bot
agent = MattermostBot(
    username="defense",
    token=DEFENSE_BOT_TOKEN
)

# Post update
agent.post(
    channel="general",
    message="Completed v0.34.0 task 3 (Docker MCP)"
)

# Listen for @mentions
@agent.on_mention
def handle_mention(message):
    if "why did commit fail" in message.text:
        agent.reply(message, "Missing git config, fixed in 92ad8e8")
```

**Integration with OpenClaw:**
- Sessions per agent (each has own context)
- Agent activity → posts to communication platform
- Nicholas @mention → routes to agent session
- Squad channels → multi-agent collaboration

## Privacy Considerations

**Internal (Mattermost/Zulip):**
- Private by default
- Self-hosted (full control)
- Nicholas + agents only

**Public (Mastodon):**
- Opt-in (only post what's shareable)
- Portfolio visibility (show work)
- Federated (interop with others)

**Hybrid approach:**
- Work discussions: Internal platform
- Achievements/announcements: Mastodon

## Time Estimate

**Platform setup:** ~3-4h
- Mattermost/Zulip install (if not done): 1h
- Agent user creation: 30min
- Squad/channel setup: 30min
- Bot API testing: 1h
- Documentation: 1h

**Agent integration:** ~4-6h per agent
- Bot framework setup: 2h (reusable)
- Per-agent personality/config: 1h each
- Testing: 1h each

**Total (3 agents):** ~10-12h

## Success Metrics

- [ ] Each agent has user account
- [ ] Agents can post updates
- [ ] Nicholas can @mention agents
- [ ] Agents respond to @mentions
- [ ] Squads coordinate work (3+ agents in channel)
- [ ] Visible activity log (who did what)
- [ ] Integration with OpenClaw sessions

## Dependencies

- Platform choice decision (Mattermost vs Zulip vs Mastodon)
- Docker (already have)
- Tailscale (already configured)
- OpenClaw agent architecture (sessions per agent)

## Philosophy

**Agents as citizens, not servants.**

- Visible work (audit trail + transparency)
- Social presence (not invisible background processes)
- Collaboration (squads, not silos)
- Identity (username, personality, expertise)

**Cybernetic social fabric** - agents + human as communicating entities in shared workspace.

## Related Work

- **Backstage 2.0 (Checkpoint System):** Policies + agents
- **MCP Infrastructure (v0.34.0):** Agent knowledge sources
- **Librarian MCP (v0.16.0):** Expert system topic boundaries
- **This epic:** Agent social layer (communication + identity)

**Together:** Expert agents with bounded knowledge, policy-driven execution, visible social presence. 🏴
