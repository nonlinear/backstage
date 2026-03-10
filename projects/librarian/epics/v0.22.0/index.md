# Epic Notes

> Version, name, status → see `epic.yaml`

---

# v0.22.0 - Librarian as MCP

**Goal:** Move librarian from script to MCP server (auto-detect topics, keep as tags).

---

## Context

**Current architecture:**
- CLI script: `research.py "query" --topics chaos-magick,anarchy`
- Manual topic selection (user must know which topics)
- Folder-based organization: `books/chaos-magick/`, `books/anarchy/`

**MCP vision:**
- Tool exposed via MCP server
- Auto-detect relevant topics (scan ALL indexes)
- Topics as tags (metadata, not folder structure)
- OpenClaw calls via MCP client (no shell wrapper)

---

## Questions to Answer

### 1. How hard is it to move to MCP?

**Need to research:**
- MCP server SDK (Python available?)
- Wrapper complexity (expose existing research.py as tool?)
- Breaking changes (can we keep current CLI for backward compat?)

### 2. Auto-detect topics

**Current:** User must specify `--topics chaos-magick,anarchy`

**Proposed:** Query scans ALL topics, returns top-k across entire library

**Trade-offs:**
- ✅ **Pro:** No manual topic selection
- ✅ **Pro:** Discover content in unexpected topics
- ❌ **Con:** Slower (scan 20+ indexes vs 2-3)
- ❌ **Con:** May return irrelevant results

**Mitigation:**
- Keep `--topics` as optional filter (power users)
- Cache/optimize FAISS queries (batch search?)
- Limit total results (top 10 across ALL topics)

### 3. Keep topics as tags?

**Current:** Topics = folder names (`books/chaos-magick/`)

**Proposed:** Topics = metadata tags (books can have multiple)

**Use cases:**
- Book spans multiple topics (e.g., "Debt" = anarchy + economics + history)
- Same book in multiple contexts
- Search by tag filter: `query="debt" tags=anarchy,economics`

**Migration:**
- Folder structure still valid (1 folder = 1 primary tag)
- Add `tags` field to metadata.json
- Support both: folder-based + multi-tag

---

## Tasks

*(See epic.yaml for grouped tasks)*

---

## Success Criteria

- ✅ MCP server running (localhost or remote)
- ✅ OpenClaw calls librarian via MCP (no shell script)
- ✅ Auto-detect works (scan all topics, return top-k)
- ✅ Topics as tags (optional multi-tagging)
- ✅ Backward compatible (CLI script still works)

---

## Open Questions

**Q1: Keep folder structure?**
- **Option A:** Folders = primary tag (backward compat)
- **Option B:** Flat structure + tags only (big migration)
- **Lean toward A** (folder-friendly still valuable)

**Q2: Performance of scanning 20+ topics?**
- Test with current library (how slow is it?)
- Optimize if needed (batch FAISS queries?)

**Q3: MCP server hosting?**
- **Option A:** Same host as OpenClaw (localhost)
- **Option B:** Separate service (remote server)
- **Start with A** (simple > complex)

---

## Next Steps

1. Research MCP Python SDK
2. Prototype: Expose research.py as MCP tool
3. Test auto-detect performance (scan all topics)
4. Design tags schema (metadata.json extension)
5. Implement + test with OpenClaw

---

*Created: 2026-03-10*
