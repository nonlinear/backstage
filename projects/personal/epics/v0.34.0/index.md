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

## Success Criteria

- [ ] Reddit MCP running in Docker container
- [ ] OpenClaw configured to use it (HTTP or stdio)
- [ ] <1s response time for Reddit API calls
- [ ] Can fetch community opinions for UI frameworks
- [ ] Documented in connections/reddit-mcp.md
