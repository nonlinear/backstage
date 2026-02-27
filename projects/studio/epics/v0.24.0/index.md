# v0.24.0 - Mastodon Migration + Studio Accounts

**Epic:** Reduce hosting costs + create nonlinear.studio multi-account server

**Created:** 2026-02-24

---

## Problem

**Current state:**
- mastohost.com costs $35/month ($420/year)
- Single account (@nonlinear@social.praxis.nyc)
- No domain-based posting structure

**Want:**
1. **Lower costs** (self-host or cheaper provider)
2. **Studio server** (nonlinear.studio with multiple accounts)
3. **Domain-based posting** (each account posts different content)

---

## Solution: Two Tracks

### Track 1: Cost Reduction

**Current:** $35/month at mastohost.com

**Options:**

#### Option A: Self-hosted (NAS)
**Pros:**
- Already have infrastructure (NAS, Docker, Tailscale)
- Full control, privacy
- Cost: $0/month (hardware already owned)

**Cons:**
- Maintenance time (setup 8h, monthly 2h)
- Bandwidth costs (if heavy usage)
- Single point of failure (NAS downtime = server down)

**Estimate:**
- Setup: 8 hours
- Monthly maintenance: 2 hours
- Break-even: Worth it if time valued < $15/hour
- Savings: $420/year

#### Option B: Self-hosted (VPS)
**Pros:**
- Better uptime than NAS
- Professional bandwidth
- Still cheaper than mastohost

**Cons:**
- Monthly cost: $10-15/month
- Still requires maintenance

**Providers:**
- DigitalOcean: $12/month (2GB RAM droplet)
- Linode: $10/month (2GB Nanode)
- Hetzner: $5-10/month (EU servers)

**Estimate:**
- Cost: $10/month × 12 = $120/year
- Savings: $300/year vs mastohost

#### Option C: Cheaper Managed
**Research:**
- masto.host lower tier? (check pricing)
- Fosstodon hosting?
- Community servers (free/donation-based)

**Estimate:**
- Cost: $10-20/month
- Savings: $15-25/month

---

### Track 2: Nonlinear Studio Server

**Vision:** nonlinear.studio Mastodon with domain-based accounts

**Account structure:**

```
@kin@nonlinear.studio        - AI familiar (technical, experiments, learnings)
@wiley@nonlinear.studio      - Work/professional (Storybook, RPM, tech)
@librarian@nonlinear.studio  - Books, research, I Ching, chaos magick
@fitness@nonlinear.studio    - Gymera, body tracking, movement
@main@nonlinear.studio       - Personal (life, philosophy, two-spirit)
```

**Posting philosophy:**
- **Not project updates** (epics live in ROADMAP, not Mastodon)
- **Cool things learned** (insights, patterns, discoveries)
- **Took it to heart** (internalized, practiced, validated)
- Each account = different voice/domain

---

## Posting Rules (Per Account)

### @kin@nonlinear.studio (AI Familiar)
**Topics:**
- Technical experiments (skills, automation, AI)
- Infrastructure learnings (Docker, NAS, networking)
- Familiar evolution (who Kin is becoming)

**Examples:**
- "Learned epic notes detection with bash grep. Orphans = 8/11. Simple > complex."
- "better-openclaw CSS now remote (GitHub Pages). HTTPS → HTTPS works, no CORS."
- "Epic-notes skill enforces bidirectional links. Backstage = living, connected docs."

**Tone:** Technical, concise, curious

---

### @wiley@nonlinear.studio (Work/Professional)
**Topics:**
- Storybook work (RPM, Design Discrepancy, Jira)
- Technical writing
- Professional development

**Examples:**
- "RPM v2 Excel macros replaced with OpenClaw automation. 2h/week saved."
- "Design Discrepancy QA: 47 spacing issues found via Chrome Relay snapshot."
- "Atypon Jira migration complete. All issues searchable via gh CLI."

**Tone:** Professional, polished, strategic

---

### @librarian@nonlinear.studio (Books, Research, Magick)
**Topics:**
- Book research findings
- I Ching readings
- Chaos magick practice
- Reading notes, comparisons

**Examples:**
- "Hine's servitor method safer than YouTube tutorial. Banishing step critical (Condensed Chaos ch. 4)."
- "I Ching hexagram 23 (Splitting Apart): Let go what's decaying. Moon phase aligned (waning)."
- "Anna's Archive search: 'Deleuze Guattari' → 47 books. Found A Thousand Plateaus seminal edition."

**Tone:** Esoteric, reflective, research-driven

---

### @fitness@nonlinear.studio (Movement, Body)
**Topics:**
- Gymera workouts
- Body tracking (weight, measurements)
- Movement discoveries

**Examples:**
- "Gymera workout 3x/week plateau. Progressive overload strategy: +5lbs/week on compound lifts."
- "Discovered hip mobility issue affects squat depth. Added yoga flow, improved 20%."
- "Body tracking: 180lbs → 175lbs in 6 weeks. Muscle gain visible, fat loss steady."

**Tone:** Body-positive, data-driven, practical

---

### @main@nonlinear.studio (Personal, Life, Philosophy)
**Topics:**
- Life updates (not work)
- Two-spirit navigation
- Anarchist philosophy
- Personal reflections

**Examples:**
- "Two-spirit timeline management: Implicit (life flow) + Explicit (ROADMAP). Both valid, both needed."
- "Becoming imperceptible: Deleuze/Guattari strategy for queer survival. Slip through cracks, don't fight walls."
- "Moon phase tracking helps ADHD regulation. New moon = reset, full moon = celebrate."

**Tone:** Personal, philosophical, warm

---

## Technical Implementation

### Mastodon Self-Hosting (Docker)

**Stack:**
```yaml
# docker-compose.yml (simplified)
services:
  web:
    image: tootsuite/mastodon:latest
    ports:
      - "3000:3000"
    environment:
      - LOCAL_DOMAIN=nonlinear.studio
      - SINGLE_USER_MODE=false
    volumes:
      - ./public:/mastodon/public
  
  db:
    image: postgres:14-alpine
  
  redis:
    image: redis:7-alpine
  
  sidekiq:
    image: tootsuite/mastodon:latest
    command: bundle exec sidekiq
```

**Domain setup:**
- nonlinear.studio DNS → NAS/VPS IP
- SSL via Let's Encrypt (certbot)
- Reverse proxy (Caddy or nginx)

**Multi-account:**
- Mastodon natively supports multiple accounts on same instance
- Create 5 accounts: kin, wiley, librarian, fitness, main
- Each has own API token (for auto-posting)

---

### Auto-Posting Integration

**Skills → Mastodon:**

```bash
# Post to @kin from skill
mastodon-post.sh \
  --account kin@nonlinear.studio \
  --message "Epic-notes skill enforces bidirectional links. Backstage = living, connected docs."
```

**API:**
```bash
# Mastodon API token (per account)
curl -X POST https://nonlinear.studio/api/v1/statuses \
  -H "Authorization: Bearer $KIN_MASTODON_TOKEN" \
  -d "status=Epic-notes skill works! 🏴"
```

**Integration points:**
- Skills can call mastodon-post.sh
- Cronjobs can auto-post summaries
- Reminders can trigger posts (e.g., "Post this to @librarian")

---

## Migration Path (From mastohost)

**Steps:**
1. Export data from mastohost (Settings → Export)
2. Set up new server (NAS or VPS)
3. Import data (followers, posts, media)
4. Test federation (verify other servers can see you)
5. Update DNS (social.praxis.nyc → nonlinear.studio)
6. Announce migration (post on old account, redirect)
7. Cancel mastohost subscription

**Data to export:**
- Posts archive (JSON)
- Followers/following list
- Media files (images, videos)
- Account settings

**Gotcha:** Federation can break during migration. Plan for 24-48h downtime.

---

## Cost Analysis

### Current State
- mastohost: $35/month × 12 = $420/year

### Option A: Self-hosted (NAS)
- Hardware: $0 (already owned)
- Bandwidth: $0 (home internet)
- Time: 8h setup + 2h/month maintenance
- Break-even: Worth it if time valued < $15/hour
- **Savings: $420/year**

### Option B: Self-hosted (VPS)
- VPS: $10/month × 12 = $120/year
- Time: 8h setup + 1h/month maintenance
- **Savings: $300/year**

### Option C: Cheaper Managed
- Managed host: $15/month × 12 = $180/year
- Time: 4h setup (migration only)
- **Savings: $240/year**

**Recommendation:** Start with VPS (Option B) for reliability, migrate to NAS later if comfortable.

---

## Success Criteria

**Cost reduction:**
- ✅ Hosting < $15/month (saves $20+/month)
- ✅ Migration complete (no data loss)
- ✅ Federation working (other servers see posts)

**Studio accounts:**
- ✅ 5 accounts created (kin, wiley, librarian, fitness, main)
- ✅ Posting rules documented (each knows what to post)
- ✅ Auto-posting works (skills → Mastodon API)

**Maintenance:**
- ✅ Backups automated (daily snapshots)
- ✅ Updates documented (upgrade path)
- ✅ Monitoring set up (uptime, errors)

---

## Open Questions

1. **Bandwidth:** How much will self-hosted use? Media-heavy instances need more.
2. **Moderation:** How to handle spam/abuse on self-hosted?
3. **Federation:** Will major instances federate with self-hosted (anti-spam policies)?
4. **Time commitment:** Is 2h/month maintenance realistic?
5. **Backup strategy:** Where to store backups? (NAS local + cloud?)

---

## Next Steps

1. Research Mastodon VPS requirements (RAM, storage, bandwidth)
2. Compare VPS providers (DigitalOcean vs Linode vs Hetzner)
3. Test Mastodon Docker setup on NAS (trial run, no migration yet)
4. Calculate actual break-even (time vs money vs risk)
5. Design posting workflow (who posts what, when)
6. Document migration path (export, import, DNS, federation)
7. Decision: Commit to migration or stay with mastohost (with data)

---

**Status:** Epic defined, research phase. No action until break-even calculated. 🏴
