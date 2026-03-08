# Pi-hole Amazon Block (TUDO)

**Data:** 2026-02-21  
**Método:** Regex brutal (fecha TUDO Amazon)

---

## Regex Aplicados

**Bloqueia TUDO relacionado a Amazon:**

```regex
(^|\.)amazon\.
(^|\.)amazonaws\.com$
(^|\.)amazonalexa\.
(^|\.)amazontrust\.
```

**O que isso bloqueia:**
- `amazon.com` (site de compras) ❌
- `*.amazon.com` (todos subdomínios) ❌
- `amazonaws.com` (AWS cloud services) ❌
- `amazonalexa.com` (Alexa APIs) ❌
- `amazontrust.com` (CDN/tracking) ❌

---

## ⚠️ Efeitos Colaterais

**Quebra COMPLETAMENTE:**
- Amazon shopping (não abre)
- AWS services (se usar)
- Alexa (para de funcionar)
- Qualquer app/serviço que usa AWS backend

**Isso é PROPOSITAL.** Fuck Amazon. 🏴

---

## Como Aplicar (Manual - Web UI)

1. **Pi-hole Admin:** http://192.168.1.152:8053/admin
2. **Group Management** → **Domains** → **Regex Filters**
3. **Add cada regex:**
   - `(^|\.)amazon\.`
   - `(^|\.)amazonaws\.com$`
   - `(^|\.)amazonalexa\.`
   - `(^|\.)amazontrust\.`
4. **Save**
5. **Tools** → **Update Gravity**

---

## Como Aplicar (CLI - Via SSH)

```bash
ssh $NAS_USER@$NAS_HOST

# Add regex filters
sqlite3 /etc/pihole/gravity.db << 'SQL'
INSERT INTO domainlist (type, domain, enabled, comment) 
VALUES 
  (3, '(^|\.)amazon\.', 1, 'Block ALL Amazon domains - 2026-02-21'),
  (3, '(^|\.)amazonaws\.com$', 1, 'Block AWS - 2026-02-21'),
  (3, '(^|\.)amazonalexa\.', 1, 'Block Alexa - 2026-02-21'),
  (3, '(^|\.)amazontrust\.', 1, 'Block Amazon CDN - 2026-02-21');
SQL

# Reload Pi-hole
pihole restartdns reload-lists
```

---

## Teste

**Depois de aplicar:**

```bash
# De qualquer device na rede ou Tailscale:
nslookup amazon.com 192.168.1.152
# Deve retornar 0.0.0.0 (bloqueado)

# Browser:
Safari → https://amazon.com
# Não deve abrir (site bloqueado)
```

**Pi-hole Query Log:**
```
http://192.168.1.152:8053/admin → Query Log
Filtra por "amazon"
Vê todas queries bloqueadas (vermelho)
```

---

## Rollback (Se Precisar)

**Via Web UI:**
1. Pi-hole Admin → Group Management → Domains → Regex Filters
2. Desabilita ou deleta os 4 regex
3. Update Gravity

**Via CLI:**
```bash
ssh $NAS_USER@$NAS_HOST
sqlite3 /etc/pihole/gravity.db "DELETE FROM domainlist WHERE comment LIKE '%Block%Amazon%';"
pihole restartdns reload-lists
```

---

## Status

**Aplicado:** 2026-02-21  
**Dispositivos afetados:** TODOS na rede local + TODOS no Tailscale (quando configurado Global Nameservers)

**Filosofia:** Fuck Amazon. Fuck surveillance capitalism. Self-hosted, anti-corporate, anarchist infrastructure. 🏴

---

**Fonte:** Nicholas's rage against Amazon + pi-hole regex patterns
