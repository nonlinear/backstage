# SSH - NAS Access

**Host:** `192.168.1.152` (local) / `media.adal-rigel.ts.net` (Tailscale)  
**User:** `$NAS_USER` (see `.env`)  
**Password:** `$NAS_PASS` (see `.env`)

---

## Quick Connect

```bash
# Local (home network)
ssh nonlinear@192.168.1.152

# Remote (Tailscale - iPad/iPhone only, NOT MacBook)
ssh nonlinear@media.adal-rigel.ts.net
```

---

## Docker Commands (require sudo)

```bash
# List running containers
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker ps"

# Container logs
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker logs <container>"

# Restart container
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker restart <container>"

# Execute command in container
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker exec <container> <command>"
```

---

## Common Tasks

### Check disk space
```bash
ssh $NAS_USER@$NAS_HOST "df -h"
```

### SMB shares
```bash
ssh $NAS_USER@$NAS_HOST "ls /srv/dev-disk-by-uuid-*/media"
```

### Running services
```bash
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker ps --format '{{.Names}}'"
```

---

## Security Notes

- ✅ Password in `.env` (never hardcode)
- ✅ Local network only (not exposed to internet)
- ✅ Tailscale for remote access (encrypted)
- ❌ MacBook can't use Tailscale (company policy)

---

## Related

- See: `connections/nas.md` for service URLs
- See: `TOOLS.md` for SSH template usage
