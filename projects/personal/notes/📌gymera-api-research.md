# Gymera API Research

**Date:** 2026-01-30  
**Status:** In progress (user eating, I'm investigating)

---

## Credentials (user provided)
- Email: info@nicholasfrota.com
- Password: NpEP9Ujwh7nD

---

## Findings

### Website
- URL: https://gymera.net
- Language: Chinese (官网 = official site)
- Tech: Vue.js SPA (Single Page Application)

### API Endpoints
- **api.gymera.net** exists (DNS resolves)
- Likely REST API for mobile app
- No public documentation found (user confirmed "escassa e em inglês")

---

## Next Steps (while user is away)

1. **Reverse engineer app:** ⏳ IN PROGRESS
   - [x] Check if Gymera has website (yes, gymera.net, Chinese)
   - [x] Test common API endpoints (api.gymera.net exists but timeouts)
   - [ ] Need mobile app traffic sniffing OR documentation
   - [ ] Document login flow

**Findings so far:**
- `api.gymera.net` DNS resolves ✅
- Common endpoints (`/api/login`, `/auth/login`, etc.) timeout ❌
- May need different base URL or authentication headers
- Mobile app likely has API key/secret in addition to user credentials

2. **Test authentication:**
   - [x] Tried POST /auth/login variants (no response)
   - [ ] Need to inspect mobile app network traffic
   - [ ] Check if API requires API key header
   - [ ] Look for Gymera developer docs (if any)

3. **Alternative: Airtable as source of truth** ✅ RECOMMENDED
   - If Gymera API too limited/undocumented
   - User catalogs exercises manually in Airtable (one-time effort)
   - OpenClaw reads from Airtable (easier integration, full control)
   - Gymera app = separate (user logs there manually, or we sync later)

**Recommendation:** Start with Airtable, add Gymera API later if we crack it.

---

## Questions for user (when back)

1. **Do you use Gymera mobile app?** (iOS/Android?)
2. **Does Gymera app show workout history?** (if yes, data exists in API!)
3. **Would Airtable-only work for now?** (bypass Gymera API complexity)
4. **Can you export data from Gymera?** (CSV/JSON?)

---

## Decision Tree

### **If Gymera API works:**
- ✅ Fetch exercises from Gymera
- ✅ Log workouts to Gymera (keeps app in sync)
- ✅ Airtable = optional (backup/analytics)

### **If Gymera API too hard:**
- ⚠️ Airtable = primary database
- ⚠️ Manual entry in Airtable (one-time catalog)
- ⚠️ Gymera app = separate (ignore for now)
- ✅ OpenClaw reads Airtable (works fine!)

---

*Continuing investigation...*
