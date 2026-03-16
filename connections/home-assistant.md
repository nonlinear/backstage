---
service: "Home Assistant"
description: "Control lights/covers/climate, check device status, add automations, use voice commands (Hey Jarvis), or troubleshoot smart home devices"
host: "192.168.1.152:8123"
tailscale: "media.adal-rigel.ts.net:8123"
---

# Home Assistant - Smart Home Control

**Web UI:** [local](http://192.168.1.152:8123) | [remote](http://media.adal-rigel.ts.net:8123)  
**API Token:** `$HA_TOKEN` (see `.env`)  
**Nabu Casa:** `hi@nonlinear.nyc` (connected)

---

## Voice Control

**Device:** Home Assistant Voice PE  
**Wake word:** "Hey Jarvis"  
**Status:** ✅ Working

---

## API Access

### From Terminal

```bash
# Endpoint
HA_URL="http://192.168.1.152:8123/api"
HA_TOKEN="$HA_TOKEN"  # from .env

# List all entities
curl -H "Authorization: Bearer $HA_TOKEN" $HA_URL/states

# Get specific entity state
curl -H "Authorization: Bearer $HA_TOKEN" $HA_URL/states/light.kitchenlight
```

### Control Devices

```bash
# Turn on light
curl -X POST -H "Authorization: Bearer $HA_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"entity_id": "light.kitchenlight"}' \
  $HA_URL/services/light/turn_on

# Turn off light
curl -X POST -H "Authorization: Bearer $HA_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"entity_id": "light.kitchenlight"}' \
  $HA_URL/services/light/turn_off

# Set brightness (0-255)
curl -X POST -H "Authorization: Bearer $HA_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"entity_id": "light.kitchenlight", "brightness": 128}' \
  $HA_URL/services/light/turn_on
```

---

## Available Domains

**Devices Claw can control:**
- `light.*` - Lights
- `switch.*` - Switches
- `cover.*` - Blinds/shades
- `climate.*` - Thermostat/AC
- `media_player.*` - Media devices

**List all:**
```bash
curl -H "Authorization: Bearer $HA_TOKEN" $HA_URL/services | jq '.[] | .domain' | sort -u
```

---

## Docker Container

**Name:** `homeassistant`  
**Image:** LinuxServer.io build

```bash
# View logs
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker logs homeassistant"

# Restart
echo "$NAS_PASS" | ssh $NAS_USER@$NAS_HOST "sudo -S docker restart homeassistant"
```

---

## Common Tasks

### Check if reachable
```bash
curl -s http://192.168.1.152:8123/api/ -H "Authorization: Bearer $HA_TOKEN" | jq .message
# Should return: "API running."
```

### List scenes/automations
```bash
# Scenes
curl -H "Authorization: Bearer $HA_TOKEN" $HA_URL/states | jq '.[] | select(.entity_id | startswith("scene."))'

# Automations
curl -H "Authorization: Bearer $HA_TOKEN" $HA_URL/states | jq '.[] | select(.entity_id | startswith("automation."))'
```

### Trigger automation
```bash
curl -X POST -H "Authorization: Bearer $HA_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"entity_id": "automation.example"}' \
  $HA_URL/services/automation/trigger
```

---

## Related

- See: `connections/nas.md` for NAS access
- See: `TOOLS.md` for HA API examples in HEARTBEAT
