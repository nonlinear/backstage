# Tailscale Global Nameservers (Pi-hole para TODOS devices)

**Data:** 2026-02-21  
**Goal:** TODOS devices no Tailnet usam Pi-hole (ads bloqueados remotamente)

---

## Como Funciona

**Sem configurar:**
```
iPhone 4G → Tailscale VPN → Internet (DNS do carrier, ads NÃO bloqueados)
```

**Depois de configurar Global Nameservers:**
```
iPhone 4G → Tailscale VPN → NAS Pi-hole → Internet (ads bloqueados ✅)
```

**Dispositivos afetados:**
- iPhone (4G, WiFi pública)
- iPad (4G, WiFi pública)
- MacBook (WiFi pública, trabalho)
- **QUALQUER device no Tailnet** com Tailscale ON

---

## Configuração (Web UI)

**1. Acessa Tailscale Admin:**
https://login.tailscale.com/admin/dns

**2. Global Nameservers:**
- **DNS** → **Nameservers** → **Global nameservers**
- **Add:**
  - Primary: `100.x.x.x` (Tailscale IP do NAS - veja abaixo)
  - Secondary: `1.1.1.1` (Cloudflare fallback se NAS offline)
- **Save**

**3. Encontrar Tailscale IP do NAS:**
```bash
# No NAS (via SSH):
tailscale ip -4

# Output: 100.x.x.x (use esse IP como Primary DNS)
```

---

## Magic DNS (Optional - Hostnames)

**Enable Magic DNS:**
- Tailscale Admin → DNS → Magic DNS → **Enable**

**Agora:**
- `http://daddy.adal-rigel.ts.net:8053/admin` → Pi-hole UI (de qualquer lugar)
- `http://daddy.adal-rigel.ts.net:8123` → Home Assistant
- `http://daddy.adal-rigel.ts.net:8765` → Agenda

**Benefício:** Não precisa memorizar IPs/portas.

---

## Teste (iPhone/iPad)

**Antes de configurar Global Nameservers:**
```bash
# iPhone Safari (4G + Tailscale ON):
https://ads-blocker.com/testing/

# Resultado: ADS aparecem (não bloqueados)
```

**Depois de configurar Global Nameservers:**
```bash
# iPhone Safari (4G + Tailscale ON):
https://ads-blocker.com/testing/

# Resultado: ADS bloqueados ✅ (Pi-hole ativo)
```

**Confirma DNS via Settings:**
```
iPhone → Settings → VPN → Tailscale → DNS Servers
Deve mostrar: 100.x.x.x (Pi-hole)
```

---

## Pi-hole Query Log (Verifica Funcionando)

**Pi-hole Admin:**
```
http://192.168.1.152:8053/admin → Query Log
```

**Filtra por IP Tailscale:**
- Queries vindas de `100.x.x.x` = devices remotos via Tailscale
- Queries bloqueadas (vermelho) = Pi-hole funcionando remotamente ✅

---

## ⚠️ Cuidados

### **NAS Offline:**
- Primary DNS (Pi-hole) = morto ❌
- Secondary DNS (1.1.1.1) = assume automaticamente ✅
- Internet continua funcionando (sem Pi-hole, mas funciona)

### **Tailscale OFF:**
- Device volta a usar DNS do WiFi/4G normal
- Sem VPN, sem Pi-hole (volta ao "normal")

### **Battery Drain:**
- Tailscale VPN ON 24/7 = consome mais bateria
- **Solução:** Liga só quando precisa (WiFi pública, 4G navegando muito)

### **Latência:**
- Tailscale adiciona ~10-50ms
- Normalmente imperceptível
- Gaming competitivo = desliga Tailscale

---

## Rollback

**Se precisar desfazer:**

1. Tailscale Admin → DNS → Global Nameservers
2. Remove `100.x.x.x` (Pi-hole)
3. Save

**Devices voltam a usar DNS do carrier/WiFi.**

---

## Status

**Configurado:** 2026-02-21  
**Devices afetados:** TODOS no Tailnet (iPhone, iPad, MacBook, etc.)

**Filosofia:** Ads bloqueados em QUALQUER lugar (casa, trabalho, 4G, WiFi pública). Self-hosted DNS, anarchist infrastructure. 🏴

---

## Próximos Passos

**Depois de configurar Global Nameservers:**
1. Pi-hole Query Log → verifica queries de IPs Tailscale (100.x.x.x)
2. iPhone 4G + Tailscale ON → testa site com ads
3. Magic DNS (optional) → habilita pra hostnames fáceis

---

**Fontes:**
- https://tailscale.com/kb/1114/pi-hole/
- https://tailscale.com/kb/1054/dns/
