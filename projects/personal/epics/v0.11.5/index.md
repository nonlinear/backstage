# Epic Notes

> Version, name, status → see `epic.yaml`

---

## Overview

Merge of Daily Rituals (v0.11.5) + Moon Cycles (v0.15.0) into unified lunar-aligned ritual system.


## 🌙 SPLIFF Lunar Calendar (Ritual Timing Framework)

Combining Chaos Magick's SPLIFF method with lunar timing for ADHD-friendly ritual practice.

| Moon Phase | SPLIFF Stage | Action | ADHD Notes |
|-----------|--------------|--------|-----------|
| 🌑 **New Moon** | **S** Statement | Declare clear intention | OPENER ✅ — brainstorm everything |
| 🌑 **New Moon** | **P** Pathways | Check available paths (SWOT, divination) | Don't filter yet |
| 🌓 **Waxing Crescent** | **L** Link | Create sigil (monogram/mantra) | OPENER ✅ — sketch quickly |
| 🌕 **Full Moon** | **I** Intense Gnosis | Gnosis (orgasm, hyperventilation, etc.) | ⚠️ SET ALARM or you'll forget |
| 🌕 **Full Moon** | **F** Fire | Fire it (carve on aspirin, dissolve) | ⚠️ Low activation energy |
| 🌗 **Waning Moon** | **F** Forget | **FORGET** — get out of the way | NATURAL ✅ — ADHD automatic |

**S.P.L.I.F.F.** — 6-stage sigil magic process:
- **S** — Statement of Intent
- **P** — Pathways available?
- **L** — Link intent to symbolic carrier
- **I** — Intense Gnosis / Indifferent Vacuity
- **F** — Fire
- **F** — Forget

**Source:** *Condensed Chaos* by Phil Hine (chaos magick)

**Forget = Get Out of the Way:**
> "Once your sigil has been fired, you're supposed to forget the original intent and let the Butterfly Effect take its course."

Garden analogy: You tend a plant (intention), then go watch TV. When you look at the garden again, **don't notice** the plant you tended. The result comes when the intent becomes latent—completely forgotten.


## 🌙 Moon Phase Energy Map

**Moon phase calendar:**
- ✅ Already integrated: "Phases of the Moon" (Google Calendar)
- 🌑 **New moon** → Intention setting, new beginnings, planting seeds
- 🌓 **Waxing crescent** → First steps, experimentation, linking intent
- 🌓 **First quarter** → Action, momentum, growth, pushing through resistance
- 🌕 **Waxing gibbous** → Refinement, preparation, almost there
- 🌕 **Full moon** → Manifestation, completion, power, harvest, gnosis
- 🌗 **Waning gibbous** → Release what was collected, compost, let go
- 🌗 **Last quarter** → Deep release, letting go, reflection
- 🌑 **Waning crescent** → Rest, darkness, preparation for new cycle


## 🔶 Double Diamond Integration

Map Double Diamond design process to lunar phases:

1. **Discover** (waxing crescent → first quarter) - Exploration, divergent thinking
2. **Define** (first quarter → waxing gibbous) - Convergence, clarity, decision
3. **Develop** (waxing gibbous → full moon) - Refinement, iteration, preparation
4. **Deliver** (full moon → new moon) - Manifestation, release, completion, rest

**Why this mapping:**
- Waxing = energy builds → perfect for divergent then convergent thinking
- Full moon = peak energy → delivery/manifestation
- Waning = energy releases → natural completion/rest phase
- New moon = darkness → preparation for next cycle


## 🛠️ Skills to Create

### Daily Skills (v0.11.5)
- **bom-dia** - Morning routine (Jira + calendar + agenda + moon phase)
- **boa-noite** - Evening close (sync + commit + tomorrow prep + ritual check)
- **backstage-update** - Anytime workspace sync
- **backstage-start** - Pre-work context check
- **backstage-close** - End-of-day wrap

### Lunar Ritual Skills (v0.15.0)
- **moon-now** - Current moon phase + energy guidance
- **moon-remind** - Set reminder for next phase (new/full/quarter)
- **vision-log** - Log dream/insight with current moon phase
- **vision-recall** - Show visions from specific phase or cycle
- **ritual-prompt** - Phase-appropriate ritual suggestion


## 🔗 Integration Points

**Daily rituals aligned with lunar phases:**
- "bom-dia" on **new moon** → Statement + Pathways review (SPLIFF S+P)
- "bom-dia" on **waxing crescent** → Link creation prompt (SPLIFF L)
- "boa-noite" on **full moon** → Fire rituals before sleep (SPLIFF I+F)
- "boa-noite" on **waning moon** → Forget phase (SPLIFF F) - work on other things

**Proactive reminders (heartbeat or cron):**
- "New moon tonight 🌑 - time to set intentions for this cycle"
- "Full moon in 2 days 🌕 - what are you manifesting?"
- "Last quarter 🌗 - focus on release, not creation"

**Weather Today integration:**
- Include current moon phase in daily oracle
- Align task advice with lunar energy
- Example: "Waning gibbous says release, but system demands output. Let the moon wait."


## 📊 Vision Tracking System

**Goal:** Correlate dreams/insights with moon phases, discover patterns

**Data structure:**
```json
{
  "visions": [
    {
      "date": "2026-02-03",
      "moon_phase": "waning_gibbous",
      "type": "dream|insight|synchronicity",
      "content": "...",
      "tags": ["work", "creative", "financial"]
    }
  ]
}
```

**Storage:** `memory/visions.json` or Airtable

**Analysis:**
- Which phases produce most creative insights?
- Do dreams at full moon manifest differently?
- Patterns across cycles (e.g., always creative ideas at waxing crescent)


## 🎙️ Voice Integration (HA Voice)

**Spoken commands:**
- "What moon phase are we in?" → Context + energy guidance
- "Remind me at new moon" → Intention-setting ritual
- "Log this vision" → Voice → transcribe → save with moon phase
- "Show my visions from last full moon cycle" → Pattern tracking

**Daily summary includes moon phase:**
- "Good morning. Today is Tuesday, February 3rd. Waning gibbous moon—release what you collected at full. You have one overdue task..."


## 📚 Research & Book Sources

**To find/read:**
- [ ] Ritual book (moon cycles + Double Diamond) - exact title TBD
- [ ] More chaos magick sources beyond Condensed Chaos
- [ ] Wicca/lunar magic integration (practical rituals)

**Current sources:**
- *Condensed Chaos* by Phil Hine (SPLIFF method)
- *The Chaos Apple* by Thumper Forge (aspirin moon water ritual)
- `~/Documents/notes/magick/moon.md` (personal notes)


## 🧪 Experiments & Observations

**Track over time:**
- [ ] Energy/productivity correlation with moon phases
- [ ] Do ADHD symptoms vary by phase? (anecdotal observation)
- [ ] Which rituals work best for Nicholas? (document what sticks)
- [ ] Does "forget" phase actually improve manifestation? (test SPLIFF)

**Personal ritual practices:**
- Document what works for Nicholas specifically
- Not all rituals will resonate—find the ones that do
- ADHD-friendly = low activation energy, batching, alarms


## 🏴 Chaos Magick + ADHD = Natural Match

**Features, not bugs:**
- **Diverse Approaches** (ADHD loves experimenting)
- **Avoidance of Dogma** (ADHD hates rigidity)
- **Results over process** (ADHD wants results NOW)
- **Natural forget** (ADHD forgets without effort)

**You don't close circles** → you **open infinite portals**. The waning moon closes them (nature does the work). 🌀


**Merged from:** v0.11.5 (Daily Rituals) + v0.15.0 (Moon Cycles)  
**Reference:** `~/Documents/notes/magick/moon.md`


## HEARTBEAT Integration (2026-02-09)

### What Was Added
**Moon phase + Calendar updates added to HEARTBEAT.md**

**Commands run every heartbeat (~30min during work hours):**
```bash
# Moon phase (SPLIFF integration)
~/.openclaw/workspace/scripts/get-moon-phase.sh

# Calendar (today + tomorrow)
export GOG_ACCOUNT=Nicholas.frota@gmail.com
gog calendar events --today --json > ~/.openclaw/workspace/data/calendar-today.json
gog calendar events --from "$(date -v+1d '+%Y-%m-%dT00:00:00%z')" --to "$(date -v+1d '+%Y-%m-%dT23:59:59%z')" --json > ~/.openclaw/workspace/data/calendar-tomorrow.json

# Reload Agenda app
osascript -e 'tell application "Agenda" to activate' -e 'delay 0.5' -e 'tell application "System Events" to keystroke "r" using command down'
```

**Why it matters:**
- Agenda dashboard always current
- Moon phase visible in work context
- Calendar alerts work (2h, 30min, at-time)

**Next step:** 
- Build bom-dia/boa-noite skills (use these data sources)
- Add moon phase context to morning briefing
- SPLIFF stage prompts in rituals
