# OpenProject + Docker Desktop Setup

**Created:** 2026-02-21  
**Status:** Researching / Not installed yet

---

## Decision: Docker Desktop vs Colima

### Docker Desktop
**Pros:**
- MCP integration (OpenClaw can manage containers conversationally)
- GUI for monitoring
- Auto-updates
- Better ecosystem integration

**Cons:**
- Heavier (GUI overhead)
- Corporate license (free for personal use)
- More resource usage

### Colima (Homebrew)
**Pros:**
- Lightweight (CLI-only)
- Open source
- Consistent with Homebrew setup
- Less background resource usage

**Cons:**
- No MCP integration
- Manual management via exec/scripts
- No GUI

---

## Recommendation: Docker Desktop

**Why:** MCP integration = OpenClaw can manage containers naturally (start, stop, logs, debug via conversation).

**Install:**
```bash
# Download from: https://www.docker.com/products/docker-desktop
# Or via Homebrew:
brew install --cask docker
```

---

## OpenProject Setup (After Docker Installed)

**Directories:**
```bash
mkdir -p ~/Documents/openproject/{pgdata,assets}
```

**Run container:**
```bash
docker run -d -p 8081:80 --name openproject \
  -e OPENPROJECT_HOST__NAME=nonlinear.adal-rigel.ts.net:8081 \
  -e SECRET_KEY_BASE=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 32) \
  -e OPENPROJECT_HTTPS=false \
  -v ~/Documents/openproject/pgdata:/var/openproject/pgdata \
  -v ~/Documents/openproject/assets:/var/openproject/assets \
  openproject/openproject:17
```

**Access:**
- Local: `http://localhost:8081`
- Tailscale IP: `http://100.80.21.16:8081`
- Hostname: `http://nonlinear.adal-rigel.ts.net:8081` (if DNS resolves)

**Default login:**
- User: `admin`
- Password: `admin` (change immediately!)

---

## Tailscale Integration

**Tag:** Keep `tag:ai` (allows all ports, including 8081)

**Serve config (HTTPS):**
```bash
tailscale serve --bg --yes 8081
```

**Access via HTTPS:**
```
https://nonlinear.adal-rigel.ts.net/openproject
```

---

## OpenClaw Integration

**Once MCP enabled:**
- Ask OpenClaw to start/stop/restart containers
- View logs conversationally
- Debug issues without manual `docker exec`

**Example:**
```
"OpenClaw, restart OpenProject container"
"OpenClaw, show me OpenProject logs from last 10 minutes"
```

---

## Security Notes

**Post-teclado Touch ID:**
- Move credentials to macOS Keychain (Touch ID protected)
- Or 1Password / Bitwarden
- .env → encrypted vault
- Docker secrets for sensitive env vars

---

## Next Steps

1. ✅ Research Docker Desktop + OpenProject (eating + reading)
2. ⏳ Install Docker Desktop
3. ⏳ Run OpenProject container
4. ⏳ Test local access (localhost:8081)
5. ⏳ Test Tailscale access (IP + hostname)
6. ⏳ Configure Tailscale serve (HTTPS)
7. ⏳ Enable MCP integration
8. ⏳ Migrate backstage → OpenProject (evaluate)

---

## Resources

- OpenProject Docker docs: https://www.openproject.org/docs/installation-and-operations/installation/docker/
- Docker Desktop: https://www.docker.com/products/docker-desktop
- Docker MCP: (research in progress)

---

**Decision:** Install Docker Desktop for MCP integration with OpenClaw  
**Timeline:** After eating + research, install when ready  
**Blocker:** None (just need to download + install)
