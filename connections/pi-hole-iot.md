# Pi-hole IoT Telemetry Blocklists

## Como Adicionar (Web UI)

1. **Pi-hole Admin** → http://192.168.1.152:8053/admin
2. **Group Management** → **Adlists**
3. **Add a new adlist**
4. Paste URL → **Add**
5. **Tools** → **Update Gravity**

---

## Blocklists Recomendadas

### **Amazon Alexa Tracking**
```
https://raw.githubusercontent.com/anudeepND/blacklist/master/adservers.txt
```

**O que bloqueia:**
- `device-metrics-us.amazon.com`
- `avs-alexa-na.amazon.com` (analytics)
- Alexa CONTINUA funcionando, só envia menos telemetria

---

### **Google Home / Chromecast Tracking**
```
https://raw.githubusercontent.com/lightswitch05/hosts/master/ads-and-tracking-extended.txt
```

**O que bloqueia:**
- `googleadservices.com`
- `doubleclick.net`
- `firebase-settings.crashlytics.com`
- Google Home CONTINUA funcionando

---

### **Samsung Smart TV Tracking**
```
https://raw.githubusercontent.com/Perflyst/PiHoleBlocklist/master/SmartTV-AGH.txt
```

**O que bloqueia:**
- `samsungads.com`
- `samsungosp.com`
- `samsungqbe.com`
- TV CONTINUA funcionando, só sem ads

---

### **LG Smart TV Tracking**
```
https://raw.githubusercontent.com/Perflyst/PiHoleBlocklist/master/SmartTV.txt
```

**O que bloqueia:**
- `lgsmartad.com`
- `smartshare.lgtvsdp.com`

---

### **Apple Telemetry (iOS, macOS, tvOS)**
```
https://raw.githubusercontent.com/lightswitch05/hosts/master/ads-and-tracking-extended.txt
```

**O que bloqueia:**
- `metrics.apple.com`
- `metrics.icloud.com`
- `analytics.apple.com`
- Apple devices CONTINUAM funcionando

---

### **Roku Tracking**
```
https://raw.githubusercontent.com/llacb47/mischosts/master/roku/list.txt
```

**O que bloqueia:**
- `logs.roku.com`
- `cooper.logs.roku.com`

---

## ⚠️ Dispositivos Que Podem Quebrar

**Se algum device para de funcionar:**

1. **Vê Query Log:**
   - Pi-hole → Query Log
   - Filtra por device IP
   - Vê quais domínios foram bloqueados

2. **Whitelist temporário:**
   - Whitelist → Add domínio específico
   - Testa se device volta a funcionar

3. **Desabilita blocklist específica:**
   - Group Management → Adlists
   - Desabilita a lista que quebrou
   - Update Gravity

---

## Devices Conhecidos Problemáticos

### **Sensibo (Ar Condicionado)**
- **IP:** 192.168.1.175
- **Possível bloqueio:** Firebase, AWS endpoints
- **Solução:** Whitelist `*.amazonaws.com` se quebrar

### **Mova Vacuum (Aspirador)**
- **IP:** 192.168.1.173
- **Possível bloqueio:** Xiaomi telemetry
- **Solução:** Whitelist `*.mi.com` se quebrar

---

## Status Atual

**Blocklists IoT aplicadas:** (documentar aqui)
- anudeepND adservers - Added 2026-02-10
- SmartTV-AGH - Added 2026-02-10

**Devices monitorados:**
- Sensibo-Air (192.168.1.175) - Funcionando ✅
- mova_vacuum_r2491a (192.168.1.173) - Funcionando ✅

---

## Benefícios

✅ **Menos espionagem:**
- Alexa não envia tudo pra Amazon
- TV não rastreia o que você assiste
- Google Home não envia patterns de uso

✅ **Performance:**
- Devices fazem menos requests
- Rede mais rápida

❌ **Trade-offs:**
- Algumas features podem quebrar (recommendations, voice training)
- Precisa whitelist manual se quebrar

---

**Fonte:** https://github.com/anudeepND/blacklist
