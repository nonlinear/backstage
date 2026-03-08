# NAS SSH Access

**Host:** `$NAS_HOST` (192.168.1.152)  
**User:** `$NAS_USER` (nonlinear)  
**Password:** `$NAS_PASS` (sambalele)

**Stored in:** `~/Documents/personal/.env`

---

## SSH Usage

**Direct SSH:**
```bash
ssh $NAS_USER@$NAS_HOST
# Password: $NAS_PASS
```

**With sshpass (automated):**
```bash
sshpass -p "$NAS_PASS" ssh -o StrictHostKeyChecking=no $NAS_USER@$NAS_HOST 'command'
```

**Via Tailscale:**
```bash
ssh $NAS_USER@100.85.217.51
# Password: $NAS_PASS
```

---

## Docker Commands (Requires sudo)

**Pi-hole:**
```bash
sshpass -p "$NAS_PASS" ssh $NAS_USER@$NAS_HOST \
  'echo $NAS_PASS | sudo -S docker exec pihole pihole COMMAND'
```

**Home Assistant:**
```bash
sshpass -p "$NAS_PASS" ssh $NAS_USER@$NAS_HOST \
  'echo $NAS_PASS | sudo -S docker exec homeassistant COMMAND'
```

---

## Setup sshpass (if needed)

```bash
brew install hudochenkov/sshpass/sshpass
```

---

## Tailscale IPs

- **NAS (media):** 100.85.217.51
- **Mac (studio):** 100.104.35.127
- **iPhone 11:** 100.87.213.56
- **iPad Mini:** 100.70.187.120

---

**Updated:** 2026-02-21
