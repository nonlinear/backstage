# Web Search Infrastructure

**Problem:** No reliable web search = answering from "general knowledge" instead of verifying with sources.

**Solution:** Self-hosted SearXNG local + wrapper script.

---

## Implementation

**Installed:**
- ✅ SearXNG container (`searxng-local`)
- ✅ Running: http://localhost:8889
- ✅ Config: `~/.openclaw/searxng/`
- ✅ Engines: DuckDuckGo, Google, Wikipedia, GitHub, Stack Overflow

**Benefits:**
- Zero latency (localhost)
- Zero dependency (NAS can be down)
- Zero cost (no API quotas)
- Maximum agency (self-hosted)
- Anarchist-aligned (unplug from bro-oligarch internet)

---

## Wrapper Script

```bash
# ~/.openclaw/scripts/web-search.sh
# Usage: web-search "query" [limit]
# - Calls localhost:8889
# - Formats output: [engine] title\nurl\n---
# - Timeout handling
# - Error fallback (web_fetch)
```

---

## AGENTS.md Protocol

**BEFORE answering questions about:**
- External tools/docs (Kavita, Komga, APIs)
- "Does Y support Z?"
- Current events, prices, comparisons

**MUST:**
1. Use web-search wrapper OR web_fetch
2. Include links in response
3. Cite sources

**NEVER:** Answer from "general knowledge" when web can verify.

---

## Future Improvements

**Query Cache:**
```bash
# ~/.openclaw/cache/search-cache.json
# TTL: 24h for most, 1h for time-sensitive
```

**More Search Engines:**
- Brave (if free tier appears)
- Qwant (privacy-focused)
- Startpage (Google proxy)
- Mojeek (independent index)

**Logs/Analytics:**
```bash
# ~/.openclaw/logs/searxng-queries.jsonl
# Track: query, timestamp, results_count, engines_used
```

**Master Search (separate epic):**
- Unified search: librarian + web + reels + files + everything
- Single query → multiple sources
- Ranked results (relevance + source type)

---

## Philosophy

- Self-hosted > third-party APIs
- Anarchist infrastructure (resilience, autonomy)
- Maximum agency = local control

**SearXNG vs Brave:**
- Brave = paid ($5-175/month)
- SearXNG = free, self-hosted, privacy-focused
- **Choice clear:** SearXNG wins
