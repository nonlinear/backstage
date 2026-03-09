# Tailscale Remote Access - Mac Studio Services

**Last updated:** 2026-03-09 13:15 EDT

**Philosophy:** Port without Tailscale = useless. All services must be remotely accessible (server + travel use case).

**Network:**
- **Local:** `localhost`
- **Tailscale:** `studio.adal-rigel.ts.net`

**NAS services:** All accessible via `media.adal-rigel.ts.net` (automatic Tailscale exposure)

---

## 🏴 Critical Services (Always Running + Exposed)

| Service | Port | Local URL | Tailscale URL | Status |
|---------|------|-----------|---------------|--------|
| **Backstage UI** | 3004 | http://localhost:3004 | https://studio.adal-rigel.ts.net:3004 | ✅ HTTPS |
| **OpenClaw Control** | 18789 | http://localhost:18789 | https://studio.adal-rigel.ts.net:18789 | ✅ HTTPS |
| **Uptime Kuma** | 3011 | http://localhost:3011 | https://studio.adal-rigel.ts.net:3011 | ✅ HTTPS |

**CRITICAL RULE:** These services must ALWAYS be online and Tailscale-exposed. Port stability check will FAIL if any are down or missing Tailscale proxy.

---

## Other Mac Studio Services

| Service | Port | Local URL | Tailscale URL | Status |
|---------|------|-----------|---------------|--------|
| **Mattermost** (chat) | 8065 | http://localhost:8065 | https://studio.adal-rigel.ts.net:8065 | ✅ HTTPS |
| **Matrix** (Synapse) | 8008 | http://localhost:8008 | https://studio.adal-rigel.ts.net:8008 | ✅ HTTPS |
| **Kavita** (ebooks) | 5007 | http://localhost:5007 | https://studio.adal-rigel.ts.net:5007 | ⚠️ HTTP |
| **Komga** (comics) | 5008 | http://localhost:5008 | https://studio.adal-rigel.ts.net:5008 | ⚠️ HTTP |
| **SearXNG** (search) | 8889 | http://localhost:8889 | http://studio.adal-rigel.ts.net:8889 | ⚠️ HTTP |
| **Zulip** (chat) | 8090 | http://localhost:8090 | https://studio.adal-rigel.ts.net:8090 | ⚠️ HTTP |
| **VNC/Screen Sharing** | 5900 | — | vnc://studio.adal-rigel.ts.net:5900 | ⚠️ Not enabled |

**Port Notes:** 
- **All ports:** Same locally and via Tailscale (no confusing mappings)
- **HTTPS preferred** for secure remote access (especially on iPad/iPhone)
- **HTTP services** work but not encrypted (use with caution on public networks)

---

## 📱 iPad/iPhone Access

**Active devices:**
- iPad Mini (6th gen) - `100.117.167.48` ✅ Online
- iPhone 11 - Check `tailscale status`

**Quick links for Safari bookmarks:**
- **Backstage:** https://studio.adal-rigel.ts.net:3004
- **OpenClaw:** https://studio.adal-rigel.ts.net:18789
- **Uptime Kuma:** https://studio.adal-rigel.ts.net:3011
- **Kavita (ebooks):** https://studio.adal-rigel.ts.net:5007
- **Komga (comics):** https://studio.adal-rigel.ts.net:5008

**How to use:**
1. Ensure Tailscale app is connected on iPad/iPhone
2. Open Safari and navigate to any URL above
3. Services respond as if local (secure Tailscale tunnel)

**Why this matters:** Nicholas travels with iPad - remote access to Backstage/OpenClaw is CRITICAL for work continuity.

---

## Tailscale Network Configuration

### Subnet Routes (ENABLED)

**TODAS as portas do Mac Studio estão acessíveis via Tailscale automaticamente!**

- **Configuração:** `tailscale up --accept-routes --advertise-routes=192.168.0.0/16 --hostname=studio`
- **Status:** Subnet routes aprovadas no admin console
- **Acesso:** Qualquer porta no Mac Studio acessível via `studio.adal-rigel.ts.net:PORT` ou `100.80.21.16:PORT`
- **Segurança:** Apenas dispositivos autorizados na Tailnet têm acesso (Nicholas only)

**Exemplos:**
- VNC: `vnc://studio.adal-rigel.ts.net:5900`
- SSH: `ssh nonlinear@studio.adal-rigel.ts.net`
- Qualquer serviço: `http://studio.adal-rigel.ts.net:PORT`

### Tailscale Serve Configuration (Web Services)

**Current config:**
```
https://studio.adal-rigel.ts.net → http://localhost:18789 (OpenClaw)
http://studio.adal-rigel.ts.net:5007 → http://localhost:5007 (Kavita)
http://studio.adal-rigel.ts.net:8087 → http://localhost:8087 (OpenProject)
```

**Check what's served:**
```bash
tailscale serve status
```

**Expose new service:**
```bash
# As HTTPS root (no port)
tailscale serve https:443 http://localhost:PORT

# As specific port
tailscale serve http:PORT http://localhost:PORT

# Remove exposure
tailscale serve reset
```

---

## Common Tasks

### Check if service is running
```bash
docker ps | grep <service-name>
```

### Test connectivity
```bash
# Local
curl -I http://localhost:<PORT>

# Tailscale
curl -I http://studio.adal-rigel.ts.net:<PORT>
```

### Restart service
```bash
docker restart <container-name>
```

---

## Port Conflicts

**To avoid:** Check this file before assigning new ports.

---

## See Also

- `connections/docker.md` - Mac container management
- `connections/tailscale.md` - Tailscale configuration

| **Backstage UI** | 3004 | http://localhost:3004 | https://studio.adal-rigel.ts.net:3004 |
| **Zulip** | 8090 | http://localhost:8090 | https://studio.adal-rigel.ts.net:8090 |

---

## Auto-Start no Boot

**Script:** `~/Documents/scripts/tailscale-serve-autostart.sh`

**LaunchAgent:** `~/Library/LaunchAgents/com.nonlinear.tailscale-serve.plist`

**O que faz:**
1. Aguarda Tailscale estar online (até 30s)
2. Reseta config anterior (limpar duplicatas)
3. Expõe todos os serviços automaticamente

**Serviços expostos:**
- OpenClaw (HTTPS root)
- Backstage UI (porta 3004, HTTPS)
- Uptime Kuma (porta 3011, HTTPS)
- Kavita (porta 5007)
- Komga (porta 5008)
- OpenProject (porta 8087)
- SearXNG (porta 8889)
- Zulip (porta 8090)

**Logs:**
- stdout: `/tmp/tailscale-serve.log`
- stderr: `/tmp/tailscale-serve-error.log`

**Rodar manualmente:**
```bash
~/Documents/scripts/tailscale-serve-autostart.sh
```

**Desativar auto-start:**
```bash
launchctl unload ~/Library/LaunchAgents/com.nonlinear.tailscale-serve.plist
```

**Reativar:**
```bash
launchctl load ~/Library/LaunchAgents/com.nonlinear.tailscale-serve.plist
```

---

**Updated:** 2026-03-09 13:15 EDT

**See also:**
- `connections/ports.md` - Port management protocol (hammer + start + expose)
- `connections/docker.md` - Container management
- `scripts/port-start.sh` - Automated service startup with Tailscale exposure
