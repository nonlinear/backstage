# Pi-hole Regex Filters

## Como Adicionar (Web UI)

1. **Pi-hole Admin** → http://192.168.1.152:8053/admin
2. **Group Management** → **Domains**
3. Tab **"Regex Filters"**
4. **Add a new Regex filter**

---

## Regex Recomendados (Anti-Tracking)

### **Bloquear Telemetry (Microsoft, Google, Apple)**
```regex
^(.+[_.-])?telemetry[_.-]
^(.+[_.-])?tracking[_.-]
^(.+[_.-])?analytics[_.-]
^(.+[_.-])?metrics[_.-]
```

**O que bloqueia:**
- `telemetry.microsoft.com`
- `tracking.google.com`
- `app-analytics.apple.com`
- Qualquer subdomínio com "telemetry", "tracking", "analytics", "metrics"

---

### **Bloquear Double-Click Ads (Google Ads)**
```regex
^(.+[_.-])?doubleclick[_.-]
^(.+[_.-])?googlesyndication[_.-]
^(.+[_.-])?googleadservices[_.-]
```

**O que bloqueia:**
- `doubleclick.net`
- `googlesyndication.com`
- `googleadservices.com`

---

### **Bloquear Facebook Tracking (Pixel, CDN)**
```regex
^(.+[_.-])?facebook[_.-].*analytics
^(.+[_.-])?fbcdn[_.-].*tracking
^(.+[_.-])?graph\.facebook
```

**O que bloqueia:**
- `analytics.facebook.com`
- `tracking.fbcdn.net`
- `graph.facebook.com` (API tracking)

---

### **Bloquear Crypto Miners**
```regex
^(.+[_.-])?coinhive[_.-]
^(.+[_.-])?cryptoloot[_.-]
^(.+[_.-])?coin-hive[_.-]
```

**O que bloqueia:**
- Sites que rodam mineração de crypto no browser

---

## ⚠️ Cuidados

**Regex = poder + risco:**
- Muito agressivo = sites quebram
- Testa aos poucos
- Se algo quebra → whitelist específico

**Exemplo de falso positivo:**
- Regex: `^(.+[_.-])?analytics[_.-]`
- Bloqueia: `google-analytics.com` ✅
- MAS TAMBÉM: `myapp-analytics.internal.company.com` ❌

**Solução:** Whitelist o domínio específico que quebrou.

---

## Testando Regex

**Antes de adicionar, testa:**
1. Pi-hole → **Tools** → **Query Lists**
2. Digita domínio (ex: `telemetry.microsoft.com`)
3. Vê se regex pegaria

---

## Status Atual

**Regex aplicados:** (documentar aqui quando adicionar)
- `^(.+[_.-])?telemetry[_.-]` - Added 2026-02-10
- `^(.+[_.-])?tracking[_.-]` - Added 2026-02-10

---

**Fonte:** https://github.com/mmotti/pihole-regex
