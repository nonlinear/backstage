---
service: SearXNG
description: "Self-hosted metasearch engine (privacy-respecting web search)"
url: "http://localhost:8890"
container: "searxng-local"
---

# SearXNG - Self-Hosted Web Search

**What it is:** Privacy-respecting metasearch engine (aggregates Google, Bing, DuckDuckGo, etc.)

**URL:** http://localhost:8890  
**Container:** `searxng-local` (Docker, always-on)  
**Port:** 8890 (external) → 8080 (internal)

---

## Quick Search

### Web UI
```
http://localhost:8890
```

### JSON API
```bash
curl "http://localhost:8890/search?q=react+hooks&format=json" | jq '.results[0]'
```

---

## Why SearXNG (Not Brave API)

**SearXNG:**
- ✅ Self-hosted (full privacy)
- ✅ No API key needed
- ✅ No rate limits (except upstream engines)
- ✅ No credit card required
- ✅ Aggregates multiple engines

**Brave Search API:**
- ❌ Requires credit card (even for free tier)
- ❌ Dark pattern (deceptive "free" tier)
- ❌ External dependency
- ❌ Rate limits

**Decision:** SearXNG preferred. Brave rejected due to credit card requirement.

---

## Container Info

**Status:**
```bash
docker ps | grep searxng
```

**Restart:**
```bash
docker restart searxng-local
```

**Logs:**
```bash
docker logs searxng-local --tail 50
```

**Config:**
- Volume: `~/Apps/searxng:/etc/searxng`
- Auto-restart: enabled
- Timezone: America/New_York

---

## API Usage

**Basic search:**
```bash
curl "http://localhost:8890/search?q=query&format=json"
```

**Parameters:**
- `q` - Query string (use `+` for spaces)
- `format` - `json` or `html`
- `category` - `general`, `it`, `science`, etc.
- `language` - `en`, `pt`, etc.
- `pageno` - Page number (pagination)

**Response:**
```json
{
  "results": [
    {
      "title": "Page title",
      "url": "https://...",
      "content": "Snippet...",
      "engine": "google",
      "score": 1.0
    }
  ],
  "number_of_results": 42
}
```

---

## Query Operators

**Site-specific:**
```bash
curl "http://localhost:8890/search?q=site:mui.com+theming&format=json"
```

**Engine-specific:**
```bash
curl "http://localhost:8890/search?q=!g+react+hooks&format=json"  # Google only
curl "http://localhost:8890/search?q=!ddg+react+hooks&format=json"  # DuckDuckGo
curl "http://localhost:8890/search?q=!gh+react+component&format=json"  # GitHub
```

**File type:**
```bash
curl "http://localhost:8890/search?q=design+system+filetype:pdf&format=json"
```

---

## Integration

**OpenClaw skill:** `searxng` (organization-level, all agents have access)

**Usage in agent:**
```bash
# Via exec tool:
curl "http://localhost:8890/search?q=react+mui&format=json" | jq '.results[0:5]'
```

**Future:** Custom tool integration (direct `search(query)` function)

---

## Privacy

**What SearXNG knows:**
- Search queries (logged locally only, in container)
- No user tracking, no cookies, no profiling

**What upstream engines know:**
- Queries come from SearXNG server IP (not user IP)
- No user identification possible

**Logs:**
- Container logs: `docker logs searxng-local`
- Not persisted (unless explicitly configured)

---

## Troubleshooting

**No results:**
- Check query syntax (use `+` for spaces, not `%20`)
- Try different engine: `!g query` or `!ddg query`
- Verify container running: `docker ps | grep searxng`

**Slow response:**
- SearXNG aggregates multiple engines (can take 2-5 seconds)
- Specify single engine for faster results: `!g query`

**Container not accessible:**
```bash
# Check if running
docker ps | grep searxng

# If stopped, start it
docker start searxng-local

# If error, check logs
docker logs searxng-local --tail 50
```

**Port conflict (8890 already in use):**
- Change external port: `-p 8891:8080`
- Update connection doc + skill

---

## Configuration

**Config location:** `~/Apps/searxng/` (Docker volume)

**Settings file:** `~/Apps/searxng/settings.yml`

**Common tweaks:**
- Enable/disable specific engines
- Change result count (default: 10)
- Adjust timeout (default: 3s)
- Enable autocomplete

**After config change:**
```bash
docker restart searxng-local
```

---

**Created:** 2026-03-16  
**Status:** Always-on (auto-restart enabled)  
**Access:** Local only (not exposed to internet)
