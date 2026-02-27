# v1.13.0 - Reminders + Summarize Integration

**Epic:** URL-based reminder research with contextual summarization

**Created:** 2026-02-24

---

## Problem

**Reminders have URL field, but it's underused:**
- URLs (articles, reels, videos) saved without context
- No automatic summarization
- No connection to ongoing projects/epics

**Questions that need answers:**
- "What does this content do?"
- "How does it help my personal epics?"
- "Does this solution work for project X?"
- "How does this compare to book Y?"

---

## Solution

**Two modes of URL reminder processing:**

### Mode 1: URL-only (no notes)
**Auto-research:**
- Summarize content
- Cross-reference with ROADMAP epics
- Answer: "What is this? How does it help?"

**Output:**
```
💎 SUMMARY: Article about X pattern for Y workflow.
RELEVANCE: Matches epic v1.12.0 (Roadmap Skill) - drag-and-drop reordering.
ACTION: Review for implementation ideas?
```

---

### Mode 2: URL + notes (directed research)
**Notes explain WHY:**
- "Compare with book ABC chapter 4"
- "Does this solve epic XYZ problem?"
- "Is this pattern better than our current approach?"

**Skill researches:**
1. Summarize content
2. Research book/epic reference (librarian integration)
3. Compare approaches
4. Answer directed question

**Output:**
```
💎 RESEARCH:
Video teaches servitor creation via sigil + energy charging.
Hine's method (Condensed Chaos ch. 4): Similar but emphasizes banishing.
COMPARISON: Video skips safety step (banishing after charging).
ANSWER: Hine's method safer - includes dismissal protocol.
RECOMMENDATION: Use Hine's approach, video good for visuals only.
```

---

## Content Types

**Supported:**
- ✅ Articles (blog posts, docs, tutorials)
- ✅ Instagram Reels (via yt-dlp + whisper)
- ✅ YouTube videos (via summarize --youtube auto)
- ✅ TikTok shorts
- ✅ Twitter threads (via URL)

**Pipeline:**
1. Detect content type (URL pattern)
2. Extract content:
   - Articles → `summarize` direct
   - Videos → `yt-dlp` + `whisper` or `summarize --video-mode`
   - Reels → `yt-dlp` + `whisper`
3. Summarize with context (project, epic, question)
4. Cross-reference (librarian, ROADMAP, epic notes)
5. Update reminder notes with 💎 + answer

---

## Integration Points

**Skills:**
- `reminder-research` (detect URL field, trigger processing)
- `summarize` (content extraction + summarization)
- `librarian` (book research for comparisons)
- `epic-notes` (cross-reference epics)

**Apple Reminders:**
- URL field (native iOS/macOS support)
- Notes field (directed questions)
- 💎 emoji (processed marker)

**Cronjob:**
- Daily 3AM: batch process URL reminders
- OR: On-demand via heartbeat (2x/day)

---

## Workflow Examples

### Example 1: URL-only (auto-research)

**Reminder:**
```
Title: Cool automation pattern
URL: https://example.com/article
Notes: (empty)
```

**Processing:**
1. Detect URL, no notes → Mode 1
2. Summarize article
3. Scan ROADMAP for topic match
4. Generate relevance report

**Output:**
```
💎 SUMMARY: Article about drag-and-drop reordering in web apps.
TECHNIQUE: Uses HTML5 drag events + state management.
RELEVANCE: Matches epic v1.12.0 (Roadmap Skill) - interactive epic reordering.
ACTION: Review for implementation? [y/n]
```

---

### Example 2: URL + directed question

**Reminder:**
```
Title: Chaos magick servitor tutorial
URL: https://youtube.com/watch?v=XXX
Notes: "Compare with Hine's method in Condensed Chaos. Is this safer?"
```

**Processing:**
1. Detect URL + notes → Mode 2
2. Transcribe YouTube video
3. Research "Condensed Chaos" via librarian
4. Compare methods (LLM analysis)
5. Answer directed question

**Output:**
```
💎 RESEARCH:

VIDEO METHOD:
- Sigil creation (desire → abstract symbol)
- Energy charging (visualization + gnosis)
- Release (burn sigil, forget intent)

HINE'S METHOD (Condensed Chaos ch. 4):
- Similar sigil creation
- Similar charging technique
- **Additional step:** Banishing after release (LBRP or laughter)

COMPARISON:
- Video skips banishing step
- Hine emphasizes safety: "Always banish servitors after charging"
- Video assumes servitor dissipates naturally (risky)

ANSWER: Hine's method safer - includes dismissal protocol.

RECOMMENDATION: Use Hine's approach. Video good for visuals, but incomplete safety-wise.
```

---

### Example 3: Instagram Reel

**Reminder:**
```
Title: [Reel] Check library pattern example
URL: https://instagram.com/reel/XXX
Notes: "Similar to our librarian checks? Better approach?"
```

**Processing:**
1. Download reel (yt-dlp)
2. Extract audio (ffmpeg)
3. Transcribe (whisper)
4. Research librarian epic notes
5. Compare patterns

**Output:**
```
💎 RESEARCH:

REEL PATTERN:
- Reusable validation checks (YAML definitions)
- Composable (combine checks via config)
- Version-controlled (git-tracked checks/)

LIBRARIAN APPROACH (v0.15.0):
- Similar YAML structure
- Similar composability
- **Difference:** Reel suggests central registry, we use local checks/

COMPARISON:
- Reel's registry = overkill for solo dev
- Our local approach = simpler, faster iteration
- Both valid, depends on team size

ANSWER: Not better, just different scale. Our approach fits current needs.

ACTION: Bookmark pattern for when we scale to multi-user.
```

---

## Technical Implementation

### Detection Logic

**reminder-research.sh extension:**
```bash
# Detect URL field
url=$(remindctl show "$id" --format json | jq -r '.url // empty')

if [ -n "$url" ]; then
  notes=$(remindctl show "$id" --format json | jq -r '.notes // empty')
  
  if [ -z "$notes" ]; then
    # Mode 1: URL-only
    process_url_auto "$url" "$title"
  else
    # Mode 2: URL + directed question
    process_url_directed "$url" "$notes" "$title"
  fi
fi
```

### Content Extraction

**content-capture.sh:**
```bash
#!/bin/bash
# Extract and summarize URL content

url="$1"
context="${2:-}"  # Optional: project/epic context

# Detect content type
if echo "$url" | grep -qE "instagram.com/reel"; then
  # Instagram Reel
  yt-dlp -f "best" -o "/tmp/reel.mp4" "$url"
  ffmpeg -i /tmp/reel.mp4 -vn -ar 16000 -ac 1 /tmp/reel.wav
  whisper /tmp/reel.wav --model medium --output_format txt --output_dir /tmp
  summary=$(cat /tmp/reel.txt)
  
elif echo "$url" | grep -qE "youtube.com|youtu.be"; then
  # YouTube
  summary=$(summarize "$url" --youtube auto --extract-only)
  
else
  # Article/webpage
  summary=$(summarize "$url" --extract-only)
fi

# Cross-reference with context
if [ -n "$context" ]; then
  # Search ROADMAP, epic notes for context
  epic_match=$(grep -r "$context" ~/Documents/*/backstage/ROADMAP.md)
fi

# Generate report
echo "💎 SUMMARY: $summary"
[ -n "$epic_match" ] && echo "RELEVANCE: $epic_match"
```

---

## Cronjob Integration

**Daily processing:**
```bash
# crontab -e
0 3 * * * ~/.openclaw/skills/reminder-research/process-reminders.sh --urls-only
```

**OR: Extend heartbeat (2x/day):**
```bash
# HEARTBEAT.md
- Run reminder processing (includes URL detection)
```

---

## Success Criteria

**Mode 1 (URL-only):**
- ✅ Auto-summarize content
- ✅ Cross-reference with ROADMAP epics
- ✅ Relevance report clear and actionable

**Mode 2 (URL + notes):**
- ✅ Directed questions answered
- ✅ Book comparisons via librarian
- ✅ Epic cross-references accurate
- ✅ Recommendations actionable

**Content types:**
- ✅ Instagram Reels work (yt-dlp + whisper)
- ✅ YouTube videos work (summarize)
- ✅ Articles work (summarize direct)

**Integration:**
- ✅ Reminder-research detects URL field
- ✅ Cronjob runs reliably
- ✅ 💎 output format consistent

---

## Open Questions

1. **Rate limiting:** Instagram/YouTube may block bulk downloads. Throttle? Proxy?
2. **Storage:** Where to store transcripts? Cache for re-use?
3. **Privacy:** Transcripts of private reels? Delete after processing?
4. **Accuracy:** Whisper transcription quality on reels (background music, accents)?

---

## Next Steps

1. Test `summarize` with Instagram Reel (verify yt-dlp works)
2. Extend reminder-research.sh (detect URL field)
3. Create content-capture.sh (URL extraction + summarization)
4. Test Mode 1 (URL-only, auto-research)
5. Test Mode 2 (URL + directed question, librarian integration)
6. Document URL reminder format (best practices)
7. Add cronjob (3AM daily or heartbeat 2x/day)

---

**Status:** Epic defined, ready for implementation. 🏴
