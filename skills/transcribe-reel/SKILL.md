# Transcribe Instagram Reel Skill

**Purpose:** Transcribe Instagram reels with Whisper, save to `life/links/transcriptions/`, link back to source markdown.

---

## Usage

**Point me to a reel in your markdown files:**

> "Transcribe this reel: https://www.instagram.com/p/ABC123/ (from ai.md)"

**Or just the URL:**

> "Transcribe https://www.instagram.com/p/ABC123/"

---

## What It Does

1. **Downloads video** (yt-dlp)
2. **Transcribes audio** (Whisper medium model, local)
3. **Saves transcript** to `~/Documents/life/links/transcriptions/{POST_ID}.txt`
4. **Updates markdown** (adds `📝 transcriptions/{POST_ID}.txt` link)
5. **Deletes video** (cleanup)
6. **Reports time** (how long it took)

---

## Smart Caching

- If transcript already exists → shows cached version (instant)
- If not → transcribes + saves (20-60s depending on video length)

---

## First Run

**Whisper downloads model (~1.5GB) on first use.**
- Takes 5-10 minutes first time
- Cached forever after that
- Subsequent transcriptions: 20-60s each

---

## Output Format

**Markdown update:**
```markdown
- [title](https://www.instagram.com/p/ABC123/) @user #tags
  📝 transcriptions/ABC123.txt
```

**File saved:**
```
~/Documents/life/links/transcriptions/ABC123.txt
```

---

## Dependencies

- `yt-dlp` (download Instagram videos)
- `ffmpeg` (extract audio)
- `whisper` (local transcription)

**Already installed:** ✅

---

## Example

**You:**
> "Transcribe the first reel in ai.md"

**Me:**
1. Read `~/Documents/life/links/ai.md`
2. Extract first URL
3. Run `transcribe-skill.sh <url> ~/Documents/life/links/ai.md`
4. Report transcript + time elapsed

---

## Integration with Librarian (Future)

**Transcripts = searchable knowledge:**

```bash
research.py --topic "cybersecurity signals" --sources reels,books
```

**Results:**
- Reel from @s0phia_ops: "You're surrounded by invisible signals..."
- Book from Schneier: "Applied Cryptography discusses..."

**Unified search across all knowledge sources.** 🧠

---

## Performance

**First transcript:** 5-10 minutes (model download)  
**Subsequent:** 20-60 seconds (model cached)  
**1min video:** ~20s transcription  
**3min video:** ~60s transcription

---

## Storage

**Model:** `~/.cache/whisper/` (~1.5GB, one-time)  
**Transcripts:** `~/Documents/life/links/transcriptions/` (~1-5KB per reel)

---

**Lightweight, fast, local, free.** 🏴
