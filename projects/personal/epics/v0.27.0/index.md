# v0.27.0 - Web Search Infrastructure

**Status:** 📋 Active  
**Created:** 2026-02-25  
**Priority:** High

---

## Problem

**No reliable web search = answering from "general knowledge":**
- Questions about external tools (Kavita, Komga, APIs)
- "Does X support Y?" → should verify, not guess
- Documentation lookups → should cite sources
- Current events, comparisons, prices → need real data

**Brave Search API = paid** (not acceptable)
**SearXNG via SSH (NAS) = timeout issues**

---

## Solution

**Self-hosted SearXNG LOCAL + wrapper script**

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

## Implementation Plan

### Phase 1: NOW (Quick & Necessary)

**1. Wrapper Script**
```bash
# ~/.openclaw/scripts/web-search.sh
# Usage: web-search "query" [limit]
# - Calls localhost:8889
# - Formats output nicely
# - Timeout handling
# - Error fallback (web_fetch)
```

**2. AGENTS.md Protocol**
```markdown
## Web Search Protocol

BEFORE answering questions about:
- External tools/docs (Kavita, Komga, APIs)
- "Does Y support Z?"
- Current events, prices, comparisons

MUST:
1. Use web-search wrapper OR web_fetch
2. Include links in response
3. Cite sources

NEVER: Answer from "general knowledge" when web can verify.
```

**3. Test with Librarian**
- Research Kavita deep linking
- Verify claims with sources
- Include URLs in responses

---

### Phase 2: FUTURE (Improvements)

**4. Query Cache**
```bash
# ~/.openclaw/cache/search-cache.json
# Avoid repeated queries
# TTL: 24h for most, 1h for time-sensitive
```

**5. More Search Engines**
- Brave (if free tier appears)
- Qwant (privacy-focused)
- Startpage (Google proxy)
- Mojeek (independent index)

**6. Logs/Analytics**
```bash
# ~/.openclaw/logs/searxng-queries.jsonl
# Track: query, timestamp, results_count, engines_used
# Debug slow queries
# Usage patterns
```

**7. Master Search Epic (SEPARATE)**
- Unified search: librarian + web + reels + files + everything
- Single query → multiple sources
- Ranked results (relevance + source type)
- Visual report

---

## Tasks

### NOW
- [ ] Create `web-search.sh` wrapper
  - [ ] Localhost:8889 endpoint
  - [ ] Format: `[engine] title\nurl\n---`
  - [ ] Error handling (fallback to web_fetch)
  - [ ] Limit results (default 5)

- [ ] Update AGENTS.md
  - [ ] Add Web Search Protocol section
  - [ ] Triggers: external questions, docs, "does X support Y?"
  - [ ] Mandatory citation

- [ ] Test with Kavita research
  - [ ] "kavita deep linking"
  - [ ] "komga search feature"
  - [ ] Verify vs web_fetch (which faster?)

### FUTURE
- [ ] Query cache implementation
- [ ] Additional engines (Brave, Qwant, Startpage)
- [ ] Logs/analytics system
- [ ] Master Search epic planning

---

## Success Criteria

- ✅ Web search = easy (`web-search "query"`)
- ✅ Web search = fast (<2s)
- ✅ Web search = reliable (no timeouts)
- ✅ Remember to use it (AGENTS.md enforces)
- ✅ No vendor lock-in (self-hosted)
- ✅ No quotas (unlimited queries)

---

## Notes

**Philosophy:**
- Self-hosted > third-party APIs
- Anarchist infrastructure (resilience, autonomy)
- Maximum agency = local control

**SearXNG vs Brave:**
- Brave = paid ($5-175/month)
- SearXNG = free, self-hosted, privacy-focused
- **Choice clear:** SearXNG wins

**Master Search (future):**
- Different epic (much larger scope)
- Unifies: librarian, web, reels, files, everything
- Single interface, ranked results
- Visual report generation
