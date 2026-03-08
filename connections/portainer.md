# Portainer - Docker Management UI

**Web UI:** [local](https://192.168.1.152:9443) | [remote](https://media.adal-rigel.ts.net:9443)  
**Version:** 2.22.0  
**Container:** `portainer`

---

## Why Portainer > Code

✅ **Visual** - See all containers at once  
✅ **Logs in real-time** - No SSH needed  
✅ **One-click restart** - No commands  
✅ **Compose editor** - Edit stacks without vim  
✅ **Resource monitoring** - CPU/RAM per container  
✅ **Templates** - Install apps with one click  

---

## Access

**Local (home network):**
```
https://192.168.1.152:9443
```

**Remote (Tailscale - iPad/iPhone only):**
```
https://media.adal-rigel.ts.net:9443
```

**Login:** (credentials in password manager)

---

## Common Tasks

### View All Containers
- Portainer → Environments → local → Containers

### Restart Container
- Select container → Stop/Start buttons

### View Logs
- Select container → Logs (live tail)

### Install New App (Stacks)
- Stacks → Add stack → Paste docker-compose.yml → Deploy

### Update Container
- Containers → Select → Recreate (pulls latest image)

---

## API Access

**Base URL:** `https://192.168.1.152:9443/api`  
**Version:** 2.22.0

### Status Check (No Auth Required)
```bash
curl -sk "https://192.168.1.152:9443/api/status"
# Returns: {"Version":"2.22.0","InstanceID":"7cf9dd6a-0cc6-4025-b2b8-4802cf4e008e"}
```

### Authentication

**Portainer requires JWT token for most endpoints.**

**Get token:**
```bash
# Login
curl -sk -X POST "https://192.168.1.152:9443/api/auth" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"YOUR_PASSWORD"}' \
  | jq -r '.jwt'
```

**Use token:**
```bash
TOKEN="<jwt_token>"
curl -sk -H "Authorization: Bearer $TOKEN" \
  "https://192.168.1.152:9443/api/endpoints"
```

### Useful Endpoints

**List containers:**
```bash
curl -sk -H "Authorization: Bearer $TOKEN" \
  "https://192.168.1.152:9443/api/endpoints/1/docker/containers/json"
```

**Container logs:**
```bash
curl -sk -H "Authorization: Bearer $TOKEN" \
  "https://192.168.1.152:9443/api/endpoints/1/docker/containers/<id>/logs?stdout=1&stderr=1&tail=100"
```

**Restart container:**
```bash
curl -sk -X POST -H "Authorization: Bearer $TOKEN" \
  "https://192.168.1.152:9443/api/endpoints/1/docker/containers/<id>/restart"
```

### Findings

✅ **API is accessible** - No CORS issues from localhost  
✅ **Status endpoint works** - No auth required  
✅ **Token-based auth** - JWT from `/api/auth`  
⚠️ **HTTPS only** - Self-signed cert (use `-k` flag)  
📝 **Endpoint ID = 1** - Local Docker environment

**Reference:** https://docs.portainer.io/api/access

---

## Container Info

**Name:** `portainer`  
**Ports:** `9443` (HTTPS)  
**Volumes:** Portainer data persisted

**View via SSH:**
```bash
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker ps | grep portainer"
```

---

## Related

- See: `connections/nas.md` for all NAS services
- See: `connections/pi-hole.md` for Pi-hole installation (via Portainer Stacks)
