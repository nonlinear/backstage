# NAS Monitors para Uptime Kuma

**Data:** 2026-03-09

## Monitores a adicionar (11 total):

### 1. Paperless-ngx
- **Nome:** NAS - Paperless
- **URL:** http://192.168.1.152:8010
- **Tipo:** HTTP(s)
- **Interval:** 60s
- **Retries:** 3

### 2. Home Assistant
- **Nome:** NAS - Home Assistant
- **URL:** http://192.168.1.152:8123
- **Tipo:** HTTP(s)
- **Interval:** 60s
- **Retries:** 3

### 3. Pi-hole
- **Nome:** NAS - Pi-hole
- **URL:** http://192.168.1.152:8053/admin
- **Tipo:** HTTP(s)
- **Interval:** 60s
- **Retries:** 3

### 4. Kavita (ebooks)
- **Nome:** NAS - Kavita
- **URL:** http://192.168.1.152:5000
- **Tipo:** HTTP(s)
- **Interval:** 60s
- **Retries:** 3

### 5. Komga (comics)
- **Nome:** NAS - Komga
- **URL:** http://192.168.1.152:25600
- **Tipo:** HTTP(s)
- **Interval:** 60s
- **Retries:** 3

### 6. Jellyfin (movies/TV)
- **Nome:** NAS - Jellyfin
- **URL:** http://192.168.1.152:8096
- **Tipo:** HTTP(s)
- **Interval:** 60s
- **Retries:** 3

### 7. Immich (photos)
- **Nome:** NAS - Immich
- **URL:** http://192.168.1.152:2283
- **Tipo:** HTTP(s)
- **Interval:** 60s
- **Retries:** 3

### 8. Actual Budget
- **Nome:** NAS - Actual Budget
- **URL:** http://192.168.1.152:5006
- **Tipo:** HTTP(s)
- **Interval:** 60s
- **Retries:** 3

### 9. SearXNG
- **Nome:** NAS - SearXNG
- **URL:** http://192.168.1.152:8888
- **Tipo:** HTTP(s)
- **Interval:** 60s
- **Retries:** 3

### 10. changedetection.io
- **Nome:** NAS - changedetection
- **URL:** http://192.168.1.152:5555
- **Tipo:** HTTP(s)
- **Interval:** 60s
- **Retries:** 3

### 11. Portainer (Docker UI)
- **Nome:** NAS - Portainer
- **URL:** https://192.168.1.152:9443
- **Tipo:** HTTP(s)
- **Interval:** 60s
- **Retries:** 3
- **Nota:** HTTPS self-signed, pode precisar "Ignore TLS/SSL Error"

---

## Configuração de Alertas (Telegram)

**Já configurado (verificar):**
- Telegram bot token
- Chat ID
- Notificar quando: Down

**Testar:**
1. Parar um container no NAS
2. Verificar se Telegram alert chega
3. Restart container
4. Verificar recovery notification

---

## Próximos passos

1. Adicionar 11 monitores acima (manual via UI)
2. Configurar notification rules (Telegram)
3. Testar com 1 serviço (stop/start)
4. Documentar em ~/Backstage/connections/uptime-kuma.md
