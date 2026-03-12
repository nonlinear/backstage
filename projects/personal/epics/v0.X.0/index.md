# Travel Mode

**Context:** Before traveling (especially international), critical services must be verified to prevent vacation disasters.

**Problem:** No pre-travel checklist = risk of discovering broken services when stranded abroad.

**Examples of critical failures:**
- Kavita down → no ebooks on iPad
- Tailscale broken → can't reach home services
- Home Assistant offline → no voice control remotely
- Containers stopped → no recovery without Mac physical access

---

## Implementation Ideas

### 1. Manual Script (MVP)
```bash
~/Apps/scripts/travel-mode-check.sh
```

**Checks:**
- `tailscale status` (running?)
- `curl https://studio.adal-rigel.ts.net:5007` (Kavita up?)
- `docker ps | grep kavita` (container running?)
- Report pass/fail

### 2. Calendar-Triggered (Advanced)
- Google Calendar API
- Scan for "travel" keyword in upcoming events
- Run check 3 days before
- Telegram alert if failures

### 3. Cron (Scheduled)
- Run check every Sunday (weekly reminder)
- Report health to Telegram
- Only alerts if problems found

---

## Success Criteria

**Before any trip:**
- Run travel-mode check
- All services ✅ green
- Tested from iPad via cellular
- Confidence = high (won't be stranded)

**Recovery documented:**
- If service down = clear steps to fix remotely
- If unfixable remotely = fallback plan (NAS services? Cloud backups?)

---

## Notes

**Lesson from 2026-02-25 Kavita incident:**
> "imagina se to fora num outro pais dai cai? dnao tem como por de volta."

**This epic exists to prevent that nightmare.**
