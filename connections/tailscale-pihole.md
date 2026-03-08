# Tailscale + Pi-hole Integration

## Como Funciona

**Quando Tailscale ON:**
```
iPhone (4G) → Tailscale VPN → NAS (192.168.1.152) → Pi-hole → Internet
```

**Benefício:**
- ✅ Ads bloqueados FORA de casa (4G, WiFi pública, etc)
- ✅ Zero config no device (automático via Tailscale)

---

## Configuração (Tailscale Admin Console)

### **1. Global Nameservers (Força Pi-hole pra TODOS devices)**

**Acessa:** https://login.tailscale.com/admin/dns

**Configuração:**
1. **DNS** → **Nameservers**
2. **Global nameservers** → Add
3. IP: `192.168.1.152` (Pi-hole)
4. **Save**

**Agora:**
- iPhone Tailscale ON → usa Pi-hole automaticamente
- iPad Tailscale ON → usa Pi-hole automaticamente
- MacBook Tailscale ON → usa Pi-hole automaticamente

---

### **2. Magic DNS (Optional - Hostnames Fáceis)**

**Acessa:** https://login.tailscale.com/admin/dns

**Configuração:**
1. **DNS** → **Magic DNS** → Enable
2. **Devices:**
   - `daddy.adal-rigel.ts.net` → 192.168.1.152 (NAS)
   - `mac.adal-rigel.ts.net` → 192.168.1.166 (MacBook)

**Agora:**
- `http://daddy.adal-rigel.ts.net:8053/admin` → Pi-hole UI (de qualquer lugar)
- `http://daddy.adal-rigel.ts.net:8123` → Home Assistant (de qualquer lugar)

---

## Testando (iPhone/iPad Fora de Casa)

### **Sem Tailscale:**
```bash
# Safari → https://ads-blocker.com/testing/
# Deve mostrar ADS (não bloqueados)
```

### **Com Tailscale ON:**
```bash
# Safari → https://ads-blocker.com/testing/
# Deve mostrar ADS BLOQUEADOS (Pi-hole ativo)
```

---

## ⚠️ Cuidados

### **Battery Drain:**
- Tailscale VPN ON 24/7 = mais bateria consumida
- **Solução:** Liga só quando precisa (WiFi pública, 4G navegando muito)

### **Latência:**
- Tailscale adiciona ~10-50ms latency
- Normalmente imperceptível
- Gaming competitivo = desliga Tailscale

### **Pi-hole Offline:**
- Se NAS desligar → DNS para de funcionar
- **Solução:** Tailscale fallback pra 1.1.1.1 (secondary DNS)

---

## Configuração Atual

**Tailscale Devices:**
- **daddy** (NAS) - 100.x.x.x (Tailscale IP)
- **iPhone 11** - Instalado, funcional
- **iPad Mini** - Instalado, funcional
- **MacBook** - ❓ (verificar se instalado)

**DNS Config:**
- **Primary:** 192.168.1.152 (Pi-hole via Tailscale)
- **Secondary:** 1.1.1.1 (Cloudflare fallback)

---

## Status

**Funciona agora:**
- ✅ iPad/iPhone → Tailscale ON → acessa NAS apps remotamente
- ❓ DNS via Pi-hole → precisa configurar Global Nameservers (acima)

**Depois de configurar Global Nameservers:**
- ✅ iPad/iPhone → Tailscale ON → ads bloqueados automaticamente
- ✅ MacBook → Tailscale ON → ads bloqueados automaticamente

---

## Next Steps

1. **Configure Global Nameservers** (Tailscale admin console)
2. **Testa iPhone 4G:**
   - Tailscale ON
   - Safari → site com ads
   - Verifica se bloqueou
3. **Monitora Pi-hole Query Log:**
   - Vê queries vindas de IP Tailscale (100.x.x.x)

---

**Fonte:** https://tailscale.com/kb/1114/pi-hole/
