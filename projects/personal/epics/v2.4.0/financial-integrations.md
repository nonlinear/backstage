# Financial Integrations Setup

**Status:** In Progress  
**Updated:** 2026-02-02

---

## 🔐 Credentials & Access

### Paperless-ngx
- **URL Local:** http://192.168.1.152:8010
- **URL Remote:** http://media.adal-rigel.ts.net:8010 (Tailscale, iPad/iPhone only)
- **API Token:** `600750567fff3165bda240d2ee12d2bbae424955`
- **User:** nonlinear
- **Status:** ✅ Connected

**API Test:**
```bash
# Local (home network)
curl -H "Authorization: Token 600750567fff3165bda240d2ee12d2bbae424955" \
  "http://192.168.1.152:8010/api/documents/?query=NYS"

# Remote (Tailscale devices only)
curl -H "Authorization: Token 600750567fff3165bda240d2ee12d2bbae424955" \
  "http://media.adal-rigel.ts.net:8010/api/documents/?query=NYS"
```

---

### Actual Budget
- **URL Local:** http://192.168.1.152:5006
- **URL Remote:** http://media.adal-rigel.ts.net:5006 (Tailscale)
- **API:** TBD (need to enable)
- **Status:** 🔄 Running, API setup pending

**Next steps:**
- [ ] Enable Actual Budget API access
- [ ] Get API credentials
- [ ] Test connection from OpenClaw

---

### SimpleFIN
- **Cost:** ~$1/month
- **Purpose:** Bank connection → Actual Budget
- **Setup URL:** https://beta-bridge.simplefin.org/
- **Status:** 🔄 Need credentials

**Next steps:**
- [ ] Locate SimpleFIN access token
- [ ] Document which banks are connected
- [ ] Test SimpleFIN → Actual sync

---

## 🎯 Integration Goals

### Phase 1: Read-Only Access
- [x] Paperless API working
- [ ] Actual Budget API connection
- [ ] SimpleFIN credentials documented

### Phase 2: Document Automation
- [ ] Auto-download tax docs → Paperless
- [ ] OCR search integration
- [ ] Tag automation (NYS, tax, mortgage, etc.)

### Phase 3: Budget Intelligence
- [ ] Pull Actual Budget reports
- [ ] Spending alerts ("80% through grocery budget")
- [ ] Debt payoff tracking
- [ ] Monthly summaries

### Phase 4: Bank Automation
- [ ] SimpleFIN sync status monitoring
- [ ] Transaction categorization suggestions
- [ ] Duplicate detection

---

## 📋 TODO

**Immediate:**
- [ ] Find SimpleFIN access token
- [ ] Enable Actual Budget API
- [ ] Document NYS tax warrant details from Paperless

**This Week:**
- [ ] Build Paperless upload script
- [ ] Test Actual Budget API
- [ ] Create spending alert prototype

---

*Updated while user is on NYS phone call (2026-02-02 11:08)*
