# SearXNG Skill

**Purpose:** Web search via self-hosted SearXNG (privacy-respecting metasearch)

**Service:** http://localhost:8890  
**Container:** `searxng-local` (Docker)  
**Format:** JSON API

---

## When to Use

- Web search (technical docs, libraries, best practices)
- Research topics (MUI, CSS, React, design systems)
- Find examples (code snippets, tutorials)
- Check current info (not in training data)

**NOT for:**
- Internal files (use `read` tool)
- Private data (SearXNG is for public web only)

---

## Usage

### Basic Search

```bash
curl -s "http://localhost:8890/search?q=react+mui+theming&format=json" | jq '.results'
```

**Response structure:**
```json
{
  "results": [
    {
      "title": "Page title",
      "url": "https://...",
      "content": "Snippet preview...",
      "engine": "google",
      "score": 1.0
    }
  ],
  "number_of_results": 42
}
```

### Query Syntax

**Basic:**
- `react mui` - Multiple terms (AND)
- `"exact phrase"` - Exact match
- `react OR vue` - Either term

**Operators:**
- `site:mui.com theming` - Specific site
- `filetype:pdf design` - File type
- `-word` - Exclude term

**Categories:**
- `!g query` - Google only
- `!ddg query` - DuckDuckGo only
- `!gh query` - GitHub only

---

## Parameters

| Param | Description | Example |
|-------|-------------|---------|
| `q` | Query string | `react+hooks` |
| `format` | Response format | `json`, `html` |
| `category` | Search category | `general`, `it`, `science` |
| `language` | Result language | `en`, `pt` |
| `pageno` | Page number | `1`, `2`, `3` |

---

## Examples

### Search MUI docs

```bash
curl -s "http://localhost:8890/search?q=site:mui.com+theming&format=json" | \
  jq -r '.results[0] | "\(.title)\n\(.url)"'
```

### Search GitHub

```bash
curl -s "http://localhost:8890/search?q=!gh+react+component+library&format=json" | \
  jq -r '.results[0:5] | .[] | .title'
```

### Search StackOverflow

```bash
curl -s "http://localhost:8890/search?q=site:stackoverflow.com+react+mui+theme&format=json" | \
  jq -r '.results[0:3] | .[] | "\(.title)\n\(.url)\n"'
```

---

## Best Practices

**Query construction:**
- Use `+` for spaces in URLs
- Quote exact phrases: `"material ui"`
- Combine operators: `site:mui.com filetype:pdf`

**Result filtering:**
- Use `jq` to extract title/url/content
- Limit results: `.results[0:5]`
- Check score: `.results[] | select(.score > 0.8)`

**Performance:**
- Default returns ~10 results
- Use `pageno` for pagination
- SearXNG aggregates multiple engines (can be slow)

---

## Container Management

**Check status:**
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
- Port: 8890 (external) → 8080 (internal)
- Auto-restart: enabled

---

## Troubleshooting

**No results:**
- Check query syntax (use `+` for spaces)
- Try different engine: `!g query`, `!ddg query`
- Verify container running: `docker ps | grep searxng`

**Timeout:**
- SearXNG aggregates multiple engines (slow)
- Reduce number of engines in config
- Or specify single engine: `!g query`

**Container down:**
- Auto-restart should handle it
- Manual: `docker start searxng-local`
- Check logs: `docker logs searxng-local`

---

## Integration Pattern

**In agent code:**

```typescript
async function webSearch(query: string, limit = 5) {
  const url = `http://localhost:8890/search?q=${encodeURIComponent(query)}&format=json`;
  const response = await fetch(url);
  const data = await response.json();
  
  return data.results.slice(0, limit).map(r => ({
    title: r.title,
    url: r.url,
    snippet: r.content
  }));
}

// Usage:
const results = await webSearch("react mui button variants");
console.log(results[0].title, results[0].url);
```

---

## Privacy

**What SearXNG knows:**
- Search queries (logged locally only)
- No tracking, no cookies, no user profiling

**What engines know:**
- Queries come from SearXNG server IP (not your IP)
- No user identification possible

**Self-hosted benefits:**
- Full control over logs
- No third-party API keys
- No rate limits (except upstream engines)

---

**Created:** 2026-03-16  
**Container:** searxng-local  
**Port:** 8890  
**Status:** Always-on (auto-restart enabled)
