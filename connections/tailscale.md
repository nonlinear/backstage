# Ports - Mac Studio Service Mapping

**Last updated:** 2026-03-05 13:30 EST

**Network:**
- **Local:** `localhost`
- **Tailscale:** `studio.adal-rigel.ts.net`

**NAS services:** All accessible via `media.adal-rigel.ts.net` (automatic Tailscale exposure)

---

## 🏴 Backstage UI - **SEMPRE RODANDO**

**CRITICAL RULE:** Backstage deve estar SEMPRE online no Tailscale, não pode cair!

- **Local:** `http://localhost:3004`
- **Tailscale (HTTPS):** `https://studio.adal-rigel.ts.net:3004`
- **Status:** Rodando via PM2 (production build) + Tailscale serve auto-start
- **Port Note:** 3004 (NOT 3002 - port conflicts)

---

## Mac Studio Services (All Running)

| Service | Port | Status | Local URL | Tailscale URL |
|---------|------|--------|-----------|---------------|
| **OpenClaw Control UI** | 18789 | ✅ Running | http://localhost:18789 | https://studio.adal-rigel.ts.net |
| **Uptime Kuma** (monitoring) | 3011 | ✅ Running | http://localhost:3011 | https://studio.adal-rigel.ts.net:3011 |
| **Mattermost** (chat) | 8065 | ✅ Running | http://localhost:8065 | https://studio.adal-rigel.ts.net:8065 |
| **Matrix** (Synapse) | 8008 | ✅ Running | http://localhost:8008 | https://studio.adal-rigel.ts.net:8008 |
| **Backstage (Next.js)** | 3004 | ✅ Running | http://localhost:3004 | https://studio.adal-rigel.ts.net:3004 |
| **Kavita** (ebooks) | 5007 | ✅ Running | http://localhost:5007 | https://studio.adal-rigel.ts.net:5007 |
| **Komga** (comics) | 5008 | ✅ Running | http://localhost:5008 | https://studio.adal-rigel.ts.net:5008 |
| **SearXNG** (search) | 8889 | ✅ Running | http://localhost:8889 | https://studio.adal-rigel.ts.net:8889 |
| **Zulip** (chat) | 8090 | ✅ Running | http://localhost:8090 | https://studio.adal-rigel.ts.net:8090 |
| **VNC/Screen Sharing** | 5900 | ⚠️ Not enabled | — | vnc://studio.adal-rigel.ts.net:5900 |

**Port Notes:** 
- **All ports:** Same locally and via Tailscale (no confusing mappings)
- **Backstage:** Port 3004 (NOT 3002 due to persistent conflicts)

**Note:** 
- OpenClaw served as HTTPS root (no port in Tailscale URL)
- All services accessible from iPad/iPhone via Tailscale (subnet routes enabled)
- VNC needs to be enabled in System Settings > General > Sharing > Screen Sharing

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

**Updated:** 2026-03-09 09:26 EDT
