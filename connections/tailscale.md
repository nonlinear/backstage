# Ports - Mac Studio Service Mapping

**Last updated:** 2026-03-05 13:30 EST

**Network:**
- **Local:** `localhost`
- **Tailscale:** `studio.adal-rigel.ts.net`

**NAS services:** All accessible via `media.adal-rigel.ts.net` (automatic Tailscale exposure)

---

## 🏴 Backstage UI - **SEMPRE RODANDO**

**CRITICAL RULE:** Backstage deve estar SEMPRE online no Tailscale, não pode cair!

- **Local:** `http://localhost:3002`
- **Tailscale (direto):** `https://studio.adal-rigel.ts.net:3002`
- **Tailscale (root path):** `https://studio.adal-rigel.ts.net/backstage`
- **Status:** Rodando via Next.js dev server + Tailscale serve auto-start

---

## Mac Studio Services (All Running)

| Service | Port | Status | Local URL | Tailscale URL |
|---------|------|--------|-----------|---------------|
| **OpenClaw Control UI** | 18789 | ✅ Running | http://localhost:18789 | https://studio.adal-rigel.ts.net |
| **Uptime Kuma** (monitoring) | 3010 | ✅ Running | http://localhost:3010 | https://studio.adal-rigel.ts.net:3010 |
| **Mattermost** (chat) | 8065 | ✅ Running | http://localhost:8065 | https://studio.adal-rigel.ts.net:8065 |
| **Matrix** (Synapse) | 8008 | ✅ Running | http://localhost:8008 | https://studio.adal-rigel.ts.net:8008 |
| **Backstage (Next.js)** | 3004 | ✅ Running | http://localhost:3004 | https://studio.adal-rigel.ts.net:3004 |
| **Kavita** (ebooks) | 5007 | ✅ Running | http://localhost:5007 | https://studio.adal-rigel.ts.net:5007 |
| **Komga** (comics) | 5008 | ✅ Running | http://localhost:5008 | https://studio.adal-rigel.ts.net:5008 |
| **SearXNG** (search) | 8889 | ✅ Running | http://localhost:8889 | https://studio.adal-rigel.ts.net:8889 |
| **Zulip** (chat) | 8090 | ✅ Running | http://localhost:8090 | https://studio.adal-rigel.ts.net:8090 |
| **VNC/Screen Sharing** | 5900 | ⚠️ Not enabled | — | vnc://studio.adal-rigel.ts.net:5900 |

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

| **Backstage UI** | 3002 | http://localhost:3002 | https://studio.adal-rigel.ts.net:3002 OR https://studio.adal-rigel.ts.net/backstage |
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
- OpenClaw (HTTPS root + /backstage)
- Backstage UI (porta 3000)
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

**Updated:** 2026-03-01 22:05 EST
