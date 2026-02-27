# v0.3.0 - Inspiration Index (Semantic Image Search)

**Status:** Concept validated, not started  
**Priority:** High value, medium effort  
**Effort:** 1-2 days for MVP

---

## Problem

User has **25,674 inspiration images** on NAS, but no way to:
- Find images matching a text description ("cyberpunk neon aesthetic")
- Generate moodboards from project context ("show images like this README")
- Discover visually similar images
- Browse by theme/vibe without manual tagging

Current state:
- ✅ Can show random images
- ❌ No semantic search
- ❌ No way to query by vibe/mood
- ❌ Manual browsing of 25k images impractical

---

## Solution

**CLIP-based semantic search:**
- Index all 25k images with visual embeddings (CLIP model)
- Text query → find visually matching images
- Fast retrieval via FAISS vector index (same tech as Librarian)
- Integration with existing gallery renderer

---

## Use Cases

### 1. 🎨 Moodboard from Text
```
User: "Show me 10 images: minimalist, data visualization, books"
Me: *searches inspiration index*
    *renders gallery with top 10 matches*
```

### 2. 📄 Project-Based Moodboards
```
User: "Moodboard for Librarian based on README"
Me: *reads README → extracts keywords*
    "research, knowledge, books, minimalist, data"
    *searches index → shows 20 matching images*
```

### 3. 🔍 Visual Similarity
```
User: *attaches image* "Show similar images"
Me: *generates embedding → searches*
    *returns top 10 visually similar*
```

### 4. 🏷️ Smart Auto-Tagging
```
Me: *during indexing*
    "Image has: architecture, concrete, minimalism"
    *stores in metadata for filtering*
```

---

## Architecture

### Indexing Pipeline (One-time, ~35 hours)
```python
for image in /nas/pictures/inspiration:
    # 1. Load image
    img = Image.open(path)
    
    # 2. Generate CLIP embedding (512-dim vector)
    embedding = clip_model.encode_image(img)
    
    # 3. Extract metadata
    metadata = {
        'path': path,
        'filename': filename,
        'size': size,
        # Optional: auto-caption via BLIP
        'caption': caption_model(img)
    }
    
    # 4. Store in FAISS + SQLite
    faiss_index.add(embedding)
    db.insert(metadata)
```

**Performance:**
- ~3-5 sec/image on CPU
- 25,674 images × 4 sec = ~28 hours
- Run overnight, incremental updates later

### Search Pipeline (Real-time, <100ms)
```python
def search(text_query, top_k=10):
    # 1. Text → embedding
    query_emb = clip_model.encode_text(text_query)
    
    # 2. FAISS similarity search
    distances, indices = faiss_index.search(query_emb, top_k)
    
    # 3. Fetch metadata
    results = db.query(indices)
    
    # 4. Return image paths
    return [r['path'] for r in results]
```

---

## Technical Stack

### Models
- **CLIP** (OpenAI): Text ↔ Image embeddings
  - `ViT-B/32` (fastest, good quality)
  - Hugging Face: `openai/clip-vit-base-patch32`

- **BLIP** (optional): Auto-captioning
  - Salesforce BLIP-2
  - Generates natural language descriptions

### Storage
- **FAISS**: Vector similarity index
  - Same as Librarian uses
  - IVF-FLAT for 25k images (fast & accurate)

- **SQLite**: Metadata database
  - Paths, filenames, captions, tags
  - Quick lookups by index ID

### Integration
- Python CLI/API for search
- Connects to existing gallery renderer (v0.1.0)
- MCP server (optional, for Claude Desktop)

---

## Data Model

### FAISS Index
```
Row ID → 512-dim embedding vector
```

### SQLite Schema
```sql
CREATE TABLE images (
    id INTEGER PRIMARY KEY,
    path TEXT UNIQUE,
    filename TEXT,
    size INTEGER,
    caption TEXT,
    indexed_at TIMESTAMP
);

CREATE TABLE tags (
    image_id INTEGER,
    tag TEXT,
    confidence FLOAT,
    FOREIGN KEY (image_id) REFERENCES images(id)
);
```

---

## Tasks

### Phase 1: MVP Indexer (1 day)
- [ ] Install CLIP model (Hugging Face)
- [ ] Create index schema (FAISS + SQLite)
- [ ] Build incremental indexer script
- [ ] Run initial index (overnight)

### Phase 2: Search API (0.5 day)
- [ ] Text search function
- [ ] Image search function (similarity)
- [ ] CLI interface (`inspiration-search "query"`)

### Phase 3: Integration (0.5 day)
- [ ] Connect to gallery renderer
- [ ] Test end-to-end workflow
- [ ] Error handling (missing images, bad queries)

### Phase 4: Enhancements (future)
- [ ] Auto-captioning via BLIP
- [ ] Aesthetic scoring (filter low-quality)
- [ ] Clustering (auto-organize by theme)
- [ ] Web UI for exploration

---

## Folder Structure

```
~/Documents/notes/tasks/inspiration-index/
├── index.py              # Indexer script
├── search.py             # Search API
├── inspiration.db        # SQLite metadata
├── embeddings.faiss      # Vector index
├── config.json           # Paths, model settings
└── README.md             # Usage docs
```

---

## Performance Estimates

### Indexing
- **Time:** ~28-35 hours (one-time)
- **CPU:** Can run on M-series Mac (no GPU needed)
- **Storage:** ~2GB (embeddings + metadata)
- **Incremental:** Only new images (check timestamp)

### Search
- **Latency:** <100ms for 25k images
- **Scalability:** FAISS handles millions easily
- **Batch:** Can search multiple queries at once

---

## Blockers

None! Fully local, no API keys needed.

**Optional dependencies:**
- BLIP for auto-captioning (requires more RAM)
- GPU for faster indexing (not required)

---

## Success Criteria

- ✅ Index 25k images successfully
- ✅ Text search returns relevant results
- ✅ Search completes in <100ms
- ✅ Gallery integration works seamlessly
- ✅ Can generate moodboards on demand

---

## Future Vision

### Multi-modal Context
```
User: "Research cyberpunk urbanism"
Me: *finds papers + inspiration images*
    "Here are 3 relevant papers and 10 visual references"
```

### Project Memory
```
Me: *during project work*
    "Librarian feels like: minimalist data viz + academic research"
    *auto-tags relevant inspiration images*
    *suggests visual direction*
```

### Smart Suggestions
```
Me: *proactive during heartbeat*
    "You haven't looked at inspiration in 2 weeks"
    "Here are 5 images matching your recent work"
```

---

## References

- Librarian (FAISS usage example)
- CLIP paper: https://arxiv.org/abs/2103.00020
- FAISS docs: https://faiss.ai/

---

*Epic validated - ready to start on user signal*
