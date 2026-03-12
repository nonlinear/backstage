# Mastodon Migration + Studio Accounts

**Problem:** mastohost.com costs $35/month ($420/year). Single account, no domain-based posting.

**Solution:** Self-host on VPS/NAS + create nonlinear.studio multi-account server.

---

## Cost Reduction Options

### Current State
- mastohost: $35/month × 12 = **$420/year**

### Option A: Self-hosted (NAS)
- Hardware: $0 (already owned)
- Bandwidth: $0 (home internet)
- Time: 8h setup + 2h/month maintenance
- **Savings: $420/year**

### Option B: Self-hosted (VPS)
- VPS: $10/month × 12 = **$120/year**
- Time: 8h setup + 1h/month maintenance
- **Savings: $300/year** ✅ Recommended

### Option C: Cheaper Managed
- Managed host: $15/month × 12 = **$180/year**
- Time: 4h setup (migration only)
- **Savings: $240/year**

**Recommendation:** Start with VPS (Option B) for reliability.

---

## Studio Server: nonlinear.studio

**Multi-account structure:**

```
@kin@nonlinear.studio        - AI familiar (technical, experiments)
@wiley@nonlinear.studio      - Work/professional (Storybook, RPM)
@librarian@nonlinear.studio  - Books, research, I Ching, magick
@fitness@nonlinear.studio    - Gymera, body tracking, movement
@main@nonlinear.studio       - Personal (life, philosophy, two-spirit)
```

**Posting philosophy:**
- NOT project updates (epics live in ROADMAP)
- Cool things learned (insights, patterns, discoveries)
- Took it to heart (internalized, practiced, validated)
- Each account = different voice/domain

---

## Account Posting Rules

### @kin (AI Familiar)
**Topics:** Technical experiments, infrastructure, familiar evolution

**Example:**
> "Learned epic notes detection with bash grep. Orphans = 8/11. Simple > complex."

**Tone:** Technical, concise, curious

### @wiley (Work/Professional)
**Topics:** Storybook work, RPM, Design Discrepancy, Jira

**Example:**
> "RPM v2 Excel macros replaced with OpenClaw automation. 2h/week saved."

**Tone:** Professional, polished, strategic

### @librarian (Books, Research, Magick)
**Topics:** Book research, I Ching, chaos magick, reading notes

**Example:**
> "Hine's servitor method safer than YouTube tutorial. Banishing step critical (Condensed Chaos ch. 4)."

**Tone:** Esoteric, reflective, research-driven

### @fitness (Movement, Body)
**Topics:** Gymera workouts, body tracking, movement discoveries

**Example:**
> "Gymera workout 3x/week plateau. Progressive overload strategy: +5lbs/week on compound lifts."

**Tone:** Body-positive, data-driven, practical

### @main (Personal, Life, Philosophy)
**Topics:** Life updates, two-spirit navigation, anarchist philosophy

**Example:**
> "Two-spirit timeline management: Implicit (life flow) + Explicit (ROADMAP). Both valid, both needed."

**Tone:** Personal, philosophical, warm

---

## Technical Implementation

### Mastodon Docker Stack

```yaml
services:
  web:
    image: tootsuite/mastodon:latest
    ports:
      - "3000:3000"
    environment:
      - LOCAL_DOMAIN=nonlinear.studio
      - SINGLE_USER_MODE=false
  
  db:
    image: postgres:14-alpine
  
  redis:
    image: redis:7-alpine
  
  sidekiq:
    image: tootsuite/mastodon:latest
    command: bundle exec sidekiq
```

**Domain:** nonlinear.studio DNS → VPS IP  
**SSL:** Let's Encrypt (certbot)  
**Reverse proxy:** Caddy or nginx

---

## Auto-Posting Integration

**Skills → Mastodon:**

```bash
# Post to @kin
mastodon-post.sh \
  --account kin@nonlinear.studio \
  --message "Epic-notes skill enforces bidirectional links. 🏴"
```

**API:**
```bash
curl -X POST https://nonlinear.studio/api/v1/statuses \
  -H "Authorization: Bearer $KIN_MASTODON_TOKEN" \
  -d "status=Epic-notes skill works! 🏴"
```

---

## Migration Path

1. Export data from mastohost (posts, followers, media)
2. Set up new server (VPS)
3. Import data
4. Test federation
5. Update DNS (social.praxis.nyc → nonlinear.studio)
6. Announce migration
7. Cancel mastohost subscription

**Gotcha:** Federation can break during migration (24-48h downtime expected).

---

## Success Criteria

**Cost reduction:**
- ✅ Hosting < $15/month (saves $20+/month)
- ✅ Migration complete (no data loss)
- ✅ Federation working

**Studio accounts:**
- ✅ 5 accounts created
- ✅ Posting rules documented
- ✅ Auto-posting works (skills → Mastodon API)

**Maintenance:**
- ✅ Backups automated (daily snapshots)
- ✅ Updates documented
- ✅ Monitoring set up

---

**Status:** Research phase. No action until break-even calculated. 🏴
