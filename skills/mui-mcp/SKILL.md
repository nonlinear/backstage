---
name: mui-mcp
description: Material UI documentation and component examples via MCP
type: MCP
version: 1.0.0
author: MUI Team
homepage: https://mui.com/material-ui/getting-started/mcp/
emoji: 🎨
requires:
  - docker-mcp
  - "@mui/mcp@latest"
---

# MUI MCP Skill

Access official Material UI documentation and component examples via the MUI Model Context Protocol server.

**Architecture:** Skill → docker-mcp → @mui/mcp (NPM package)

---

## When to Use

- Looking up MUI component APIs, props, or usage patterns
- Need accurate, up-to-date Material UI code examples
- Verifying component behavior or feature availability
- Checking migration guides or breaking changes

**Do NOT use for:**
- General React questions (use web search)
- Custom component logic (write code directly)
- Design system decisions (that's your domain expertise)

---

## How It Works

This skill wraps the official `@mui/mcp` server via docker-mcp, which provides:

1. **`useMuiDocs`** — Fetch docs for a specific MUI package/topic
2. **`fetchDocs`** — Retrieve additional docs from URLs returned by previous calls

### Docker MCP Integration

**What is docker-mcp:**
- Single MCP server that runs multiple containerized tools
- Each skill defines its own container config
- OpenClaw Gateway manages the docker-mcp lifecycle

**How this skill connects:**
```
OpenClaw Agent → docker-mcp (stdio) → mui-mcp container → @mui/mcp NPM package
```

**Config:** See `references/mcp-config.json` for container spec

---

## Usage Pattern

```
1. Call `useMuiDocs` with the relevant package or component name
2. If needed, call `fetchDocs` with URLs from the returned content
3. Repeat until you have all relevant docs
4. Use the fetched content to answer the question
```

### Examples

**Q: "How do I customize Button colors?"**
1. `useMuiDocs({ package: "@mui/material", topic: "Button" })`
2. Extract API docs, check `color` prop options
3. If custom palette needed, `fetchDocs` the theming guide URL

**Q: "What's new in MUI v6?"**
1. `useMuiDocs({ topic: "migration" })`
2. Parse breaking changes
3. Cite specific doc URLs in response

---

## Anti-Drift

**Why MUI MCP exists:** LLMs hallucinate MUI API details (wrong prop names, deprecated patterns, 404 doc links). MCP ensures we quote real sources.

**When to skip it:** If you're designing component *behavior* (interaction patterns, visual hierarchy), don't defer to docs. That's your job. Use MCP only to verify technical implementation.

---

## Configuration

**MCP runs via docker-mcp wrapper:**
- Container name: `mui-mcp` (same as skill name with dashes)
- Command: `npx -y @mui/mcp@latest`
- No auth required (docs are public)

**Config file:** `references/mcp-config.json`

---

## Troubleshooting

**"MCP not responding"**
- Check docker-mcp is running: `docker ps | grep mcp`
- Verify skill name matches container name (dashes, not underscores)
- Check OpenClaw Gateway logs for connection errors

**"Tools not available"**
- Restart Gateway: `openclaw gateway restart`
- Verify `agent.yaml` includes `mui-mcp` in skills list
- Check MCP inspector: `npx @modelcontextprotocol/inspector`

---

**Last updated:** 2026-03-17  
**Status:** ✅ Active (docker-mcp integration)

