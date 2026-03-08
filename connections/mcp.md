# MCP (Model Context Protocol) - Connection Guide

**What:** Protocol for AI assistants to access external tools/services via standardized interface

**Why:** Persistent servers (Docker) > spawning processes per request (2-5s → <1s latency)

**Philosophy:** Centralized management via Docker containers (health checks, logs, auto-restart)

---

## Architecture

```
OpenClaw Gateway
    ↓ (stdio/HTTP)
Docker Container (MCP servers)
    ↓ (API calls)
External Services (Reddit, GitHub, etc.)
```

---

## Source → MCP Mapping

**Currently active (installed):**

| Source Keywords | MCP Server | Status | Auto-Activated Tools |
|----------------|------------|--------|---------------------|
| reddit, subreddit, r/, redditor | Reddit MCP Buddy | 🟢 Running | search_reddit, browse_posts, get_user_activity |

**Planned (not installed yet):**

| Source Keywords | MCP Server | Status | Future Tools |
|----------------|------------|--------|--------------|
| github, repo, repository, gh | GitHub MCP | ⏳ Planned | search_repos, get_issues |
| hacker news, hn, hackernews | HackerNews MCP | ⏳ Planned | search_hn, trending |

**How it works:**
- Mention source naturally: "procura opiniões no Reddit sobre X"
- I detect keyword → auto-activate appropriate MCP
- No need to say "use reddit MCP"

---

## Installed MCPs

### 1. Reddit MCP Buddy

**Package:** `reddit-mcp-buddy` (npm)  
**Repo:** https://github.com/karanb192/reddit-mcp-buddy  
**Docker:** ✅ Running (container: mcp-reddit)  
**Status:** 🟢 Active (installed 2026-03-01)

**Trigger keywords:** reddit, subreddit, r/, redditor, reddit user, reddit post

**Sources covered:**
- Reddit (all subreddits)
- User profiles
- Post comments/discussions

**Features:**
- Browse posts, search content, analyze users
- No API keys required (anonymous mode: 10 req/min)
- Optional auth for higher limits (60-100 req/min)

**Tools available:**
- `search_reddit` - Search across Reddit with filters
- `browse_posts` - Get posts from specific subreddit
- `get_user_activity` - Analyze user posts/comments
- `get_post_comments` - Get full comment tree for post

**Rate limits:**
- Anonymous: 10 requests/min ⚠️ (current mode)
- User auth: 60 requests/min
- App auth: 100 requests/min

---

## Configuration

### OpenClaw Gateway Config

**Location:** `~/.openclaw/openclaw.json`

**Add MCP server:**
```json
{
  "mcp": {
    "servers": {
      "reddit": {
        "command": "docker",
        "args": ["exec", "mcp-reddit", "npx", "-y", "reddit-mcp-buddy"],
        "transport": "stdio"
      }
    }
  }
}
```

**Alternative (HTTP transport):**
```json
{
  "mcp": {
    "servers": {
      "reddit": {
        "url": "http://localhost:8901",
        "transport": "http"
      }
    }
  }
}
```

---

## Docker Setup

### docker-compose.yml

**Location:** `~/Apps/docker-compose.yml`

```yaml
services:
  mcp-reddit:
    image: node:22-alpine
    container_name: mcp-reddit
    restart: unless-stopped
    working_dir: /app
    command: npx -y reddit-mcp-buddy
    environment:
      - REDDIT_CLIENT_ID=${REDDIT_CLIENT_ID:-}
      - REDDIT_CLIENT_SECRET=${REDDIT_CLIENT_SECRET:-}
    healthcheck:
      test: ["CMD", "pgrep", "-f", "reddit-mcp-buddy"]
      interval: 30s
      timeout: 10s
      retries: 3
    stdin_open: true
    tty: true
```

**Start:**
```bash
cd ~/Apps
docker-compose up -d mcp-reddit
```

**Check logs:**
```bash
docker logs -f mcp-reddit
```

**Check status:**
```bash
docker ps | grep mcp-reddit
```

---

## Authentication (Optional)

**Anonymous mode:** ✅ Currently active (10 req/min)

**User auth (60 req/min):**
1. Get credentials: https://www.reddit.com/prefs/apps
2. Create "script" app
3. Add to `~/Documents/personal/.env`:
   ```bash
   REDDIT_CLIENT_ID=your_client_id
   REDDIT_CLIENT_SECRET=your_client_secret
   ```
4. Restart container: `docker restart mcp-reddit`

---

## Usage Examples

### Via OpenClaw Tool Call

```javascript
// Search Reddit for opinions
{
  "tool": "mcp_call",
  "server": "reddit",
  "method": "search_reddit",
  "params": {
    "query": "shadcn ui opinion",
    "subreddit": "webdev",
    "limit": 5
  }
}
```

### Via CLI (testing)

```bash
# Test MCP server directly
docker exec -it mcp-reddit npx -y reddit-mcp-buddy

# Search from host
echo '{"method":"search_reddit","params":{"query":"shadcn ui","limit":3}}' | \
  docker exec -i mcp-reddit npx -y reddit-mcp-buddy
```

---

## Troubleshooting

**Container won't start:**
```bash
docker logs mcp-reddit
# Check for npm install errors
```

**No response from MCP:**
```bash
# Verify container running
docker ps | grep mcp-reddit

# Test manually
docker exec -it mcp-reddit npx -y reddit-mcp-buddy --help
```

**Rate limited:**
- Anonymous: 10/min → Add user auth (see Authentication section)
- User auth: 60/min → Wait or add app auth

---

## Related

- **OpenClaw MCP docs:** /opt/homebrew/lib/node_modules/openclaw/docs/mcp/
- **MCP spec:** https://modelcontextprotocol.io
- **Reddit MCP registry:** https://registry.modelcontextprotocol.io

---

## Adding New MCPs

**When installing a new MCP:**
1. Add to `~/Apps/docker-compose.yml`
2. Update this file (add to "Installed MCPs" section)
3. Add trigger keywords to mapping table
4. Test via CLI before OpenClaw integration

---

**Status:** 🟢 Reddit MCP active | ⏳ GitHub/HN planned (v0.34.0 epic)  
**Last updated:** 2026-03-01
