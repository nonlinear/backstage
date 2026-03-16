---
service: NAS
description: "Access media services (Kavita, Jellyfin, Komga), run Docker commands, check disk space, manage SMB shares, or troubleshoot NAS services"
host: "192.168.1.152"
tailscale: "media.adal-rigel.ts.net"
---

# NAS - Home Media Server

**Host:** `192.168.1.152` (local) / `media.adal-rigel.ts.net` (Tailscale)  
**OS:** OpenMediaVault (Debian-based)  
**SSH User:** `$NAS_USER` (see `.env`)  
**SSH Password:** `$NAS_PASS` (see `.env`)

---

## Network Access Strategy

| Device | Home (Local) | Remote (Outside) | Purpose |
|--------|-------------|-----------------|---------|
| MacBook (work) | ✅ `192.168.1.152` | ❌ No Tailscale | Main workstation |
| iPhone 11 | ✅ `192.168.1.152` | ✅ Tailscale | Pocket remote access |
| iPad Mini | ✅ `192.168.1.152` | ✅ Tailscale | Reading, comics, mobile work |

**Why MacBook can't use Tailscale:** Company policy (Wiley laptop, no VPN installs)

---

## All Services

### Media
- **Jellyfin** (movies/TV): [local](http://192.168.1.152:8096) | [remote](http://media.adal-rigel.ts.net:8096)
- **Immich** (photos): [local](http://192.168.1.152:2283) | [remote](http://media.adal-rigel.ts.net:2283)
- **Kavita** (books/EPUB): [local](http://192.168.1.152:5000) | [remote](http://media.adal-rigel.ts.net:5000)
- **Komga** (comics/manga): [local](http://192.168.1.152:25600) | [remote](http://media.adal-rigel.ts.net:25600)

### Home Automation
- **Home Assistant**: [local](http://192.168.1.152:8123) | [remote](http://media.adal-rigel.ts.net:8123)

### Documents & Productivity
- **Paperless-ngx** (docs): [local](http://192.168.1.152:8010) | [remote](http://media.adal-rigel.ts.net:8010)
- **Actual Budget** (finance): [local](http://192.168.1.152:5006) | [remote](http://media.adal-rigel.ts.net:5006)

### Infrastructure
- **OpenMediaVault** (NAS admin): [local](http://192.168.1.152) | [remote](http://media.adal-rigel.ts.net)
- **Portainer** (Docker UI): [local](https://192.168.1.152:9443) | [remote](https://media.adal-rigel.ts.net:9443)
- **Syncthing** (file sync): [local](http://192.168.1.152:8384) | [remote](http://media.adal-rigel.ts.net:8384)

### Utilities
- **SearXNG** (meta-search): [local](http://192.168.1.152:8888) | [remote](http://media.adal-rigel.ts.net:8888)
- **changedetection.io** (price tracking): [local](http://192.168.1.152:5555) | [remote](http://media.adal-rigel.ts.net:5555)

### To Configure
- **Pi-hole** (ad blocking): See `connections/pi-hole.md`

---

## File Access (SMB)

```bash
# Local
smb://192.168.1.152/media

# Remote (Tailscale)
smb://media.adal-rigel.ts.net/media
```

**macOS Finder:** Cmd+K → `smb://192.168.1.152/media`

---

## Docker Containers

**List all running:**
```bash
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker ps --format '{{.Names}}'"
```

**Current containers:**
- changedetection
- searxng
- paperless-webserver-1, paperless-db-1, paperless-broker-1
- kavita
- jellyfin
- homeassistant
- syncthing
- immich_server, immich_machine_learning, immich_postgres, immich_redis
- budget-actual_server-1, server_self_hosted, db_self_hosted, cache_self_hosted
- komga
- portainer

---

## Common Tasks

### Restart a service
```bash
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker restart <container>"
```

### Check logs
```bash
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker logs <container>"
```

### Check disk space
```bash
ssh $NAS_USER@$NAS_HOST "df -h"
```

### Update containers (Portainer UI)
- Open Portainer → Containers → Select → Recreate

---

## Backup Strategy

**Current uploads:**
- ✅ Instagram backup → `smb://192.168.1.152/media/backup/to-import/instagram`
- ✅ Others → `smb://192.168.1.152/media/backup/to-import/others`
- ✅ Photos duplicates → `smb://192.168.1.152/media/backup/personal/immich`

---

## Related

- See: `connections/ssh.md` for SSH details
- See: `connections/pi-hole.md` for ad blocking setup
- See: `code/media.md` for full service list (may be outdated - use this file)
