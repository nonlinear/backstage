# Epic Notes

> Version, name, status, tasks → see `epic.yaml`

---

**Philosophy:** Centralized MCP management via Docker = faster, more reliable, easier to maintain.

## Goal

Run MCP servers (Reddit, GitHub, etc.) in persistent Docker containers instead of spawning processes per request.

## Why

**Problem with current MCP:**
- Each call spawns new process (2-5s latency)
- No health checks
- Scattered configs
- Hard to debug

**Solution:**
- Docker container = persistent process (instant response)
- Health checks + auto-restart
- Centralized config (docker-compose.yml)
- Logs in one place

## Time Estimate

**Research + setup:** ~2-3h total
- Research (30min): Pick best Reddit MCP
- Local test (30min): npx test, verify works
- Dockerize (1h): Write Dockerfile, test build
- Integration (30min): Add to docker-compose, configure OpenClaw
- Testing (30min): Fetch real Reddit data, verify latency improvement

**Can be done incrementally** (start with Reddit MCP, add more later).

## Future Ideas

**Context-aware MCP routing:**
- Agent → MCP mapping (defense → github/figma, secretaria → calendar/email)
- Project → MCP mapping (librarian → books/research, wiley → jira/figma)
- Auto-routing: "procura X" → checks active project → uses project MCPs
- Override-able: explicit "procura no Reddit" still works
- Zero cognitive load (context determines source)

**Schema example:**
```yaml
agents:
  defense: [github, figma, reddit]
  secretaria: [calendar, email, jira]
projects:
  librarian: [books, research, pdf-extraction]
  wiley: [jira, figma, confluence]
```

**Status:** Idea phase (not implemented yet)

**MCP routing (default-only approach):**
- Each agent has `default` MCPs (preferred sources)
- Example: `wiley: [jira]`, `defense: [github]`, `secretaria: [calendar, jira]`
- Any agent can use any MCP if needed (not blocked)
- Default = suggest first, not enforce
- Flexible > rigid (context changes, MCPs evolve)

**Schema:**
```yaml
agents:
  defense:
    default: [github, figma]
  secretaria:
    default: [calendar, jira]
  wiley:
    default: [jira]
```

**Status:** Idea phase (not implemented yet)

**Multi-agent chat identities:**
- Each agent = separate user in Zulip/Mastodon
- Examples: @defense, @secretaria, @wiley, @uxr
- Squads = groups of agents (DevSquad = defense + uxr + qa)
- Benefits:
  - Visible work (who did what)
  - @mentions (Nicholas calls specific agent)
  - Squad coordination (agents collaborate in channels)
  - Social presence (agents as workspace citizens)
- Platform options: Zulip (self-hosted), Mastodon (federated)

**Status:** Future idea (not implemented yet)

**MCP topic scoping (refined):**
- Not just `librarian` (all books), but `librarian:topic` (focused)
- Example:
  ```yaml
  wiley:
    default:
      - jira
      - librarian:design-systems
      - librarian:ux-patterns
  
  defense:
    default:
      - github
      - librarian:chaos-magick
      - librarian:cybernetics
  ```
- Benefits:
  - Focused context (agent sees only relevant books)
  - Faster search (fewer embeddings)
  - Better precision (scoped results)
  - Semantic routing ("wiley needs design → query design-systems")

**Status:** Idea phase (depends on Librarian MCP v0.16.0)

**Expert system architecture (topic-bounded agents):**
- Agent decisions = ONLY from required topics (bounded knowledge domain)
- Classic expert system: Knowledge Base (facts) + Inference Engine (rules)
- Our version: Topic-scoped Librarian (facts) + Agent (inference)
- Example:
  ```yaml
  wiley-agent:
    expert_domains:
      - librarian:design-systems
      - librarian:ux-patterns
      - librarian:accessibility
    enforcement: strict  # Can't query outside
    fallback: "Outside my expertise, consult @defense"
  ```
- Benefits:
  - Verifiable decisions (every answer traceable to source)
  - Domain expertise (focused > generic)
  - No context pollution (wiley doesn't cite anarchism)
  - Bounded rationality (knows limits, refers when needed)
- Implementation: Librarian MCP enforces topic whitelist per agent

**Status:** Idea phase (requires Librarian MCP v0.16.0 + agent configs)
