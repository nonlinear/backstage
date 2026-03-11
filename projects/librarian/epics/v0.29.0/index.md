# v0.29.0 - Product Flow (Portability & Launch)

**Goal:** Make Librarian installable by anyone + launch campaign.

---

## 🎯 Product Flow

**Vision:** From "Nicholas's personal tool" → "Anyone can install in 5min"

**Stages:**
1. **Setup Wizard** - `librarian init` (config-driven, not hardcoded)
2. **Structure Validation** - Support flexible folder structures
3. **Documentation** - Clear README, setup guide
4. **Launch Campaign** - nonlinear.nyc article + social/community outreach

---

## 📋 Tasks

### Phase 1: Portability (Config-Driven)

- [ ] Create `~/.librarian/config.json` structure
  - `books_path` (default: `~/Documents/librarian/books/`)
  - `index_path` (default: `~/Documents/librarian/.library-index.json`)
  - `gui_port` (default: 8766)
  - `mcp_enabled` (default: true)

- [ ] Init wizard (`librarian init`)
  - Ask: Where are your books?
  - Auto-detect common paths (~/Books/, ~/Documents/, etc.)
  - Write config.json
  - Run initial index

- [ ] MCP auto-setup (`librarian mcp-setup`)
  - Read config.json
  - Auto-edit `~/Library/Application Support/Claude/claude_desktop_config.json`
  - Add librarian MCP entry with correct `LIBRARIAN_BOOKS_PATH`
  - Prompt to restart Claude Desktop

- [ ] GUI reads config (remove hardcoded paths)
  - Load books_path from config
  - Load index_path from config
  - Dynamic port (from config)

- [ ] Watchdog reads config
  - Monitor books_path (from config)
  - Trigger reindex on file changes

- [ ] CLI commands
  - `librarian init` - Setup wizard
  - `librarian index` - Manual reindex
  - `librarian gui` - Start GUI server
  - `librarian mcp-setup` - Configure MCP
  - `librarian config` - Show current config

### Phase 2: Folder Structure Flexibility

**Problem:** Current indexer assumes "either subtopics OR books, never both"

**Decision needed:**
- Option A: Document limitation (faster, enforce consistency)
- Option B: Support mixed structure (flexible, more complex)

**Tasks (if Option B):**

- [ ] Support mixed folder structure
  - Index loose books in topic root (`AI/intro.epub`)
  - Index subtopic folders (`AI/policy/book1.epub`)
  - GUI displays both (loose books first, then subtopics)

- [ ] Update indexer logic
  ```python
  for topic in topics:
      loose_books = [f for f in topic.glob("*.epub")]
      subtopics = [d for d in topic.iterdir() if d.is_dir()]
      result[topic.name] = {
          "books": loose_books,
          "subtopics": subtopics
      }
  ```

- [ ] GUI rendering
  - Show loose books (horizontal scroll)
  - Show subtopics (dropdown navigation)
  - Clear visual separation

- [ ] Validation warnings
  - Detect mixed structures
  - Log warning (not error)
  - Suggest organizing (but don't enforce)

**Tasks (if Option A):**

- [ ] Document folder structure rules
  - README section: Valid vs Invalid structures
  - Either subtopics OR books, never mixed
  - Example diagrams

- [ ] Add validation check
  - Detect mixed structure
  - Warn user (clear message)
  - Don't index ambiguous cases

### Phase 3: Documentation

- [ ] README overhaul
  - Installation (`npm install -g librarian`)
  - Setup wizard (`librarian init`)
  - Folder structure rules
  - MCP setup (auto + manual)
  - GUI usage
  - CLI reference

- [ ] Setup guide (separate doc)
  - Step-by-step screenshots
  - Common troubleshooting
  - FAQ

- [ ] Video walkthrough (optional)
  - 3-5min screencast
  - Install → setup → first use

### Phase 4: Launch Campaign

- [ ] **nonlinear.nyc article**
  - Title: "Librarian: Your Personal Book Search MCP"
  - Sections:
    - Why (pirate library chaos, can't find books)
    - What (semantic search, MCP integration, GUI)
    - How (install, setup, use)
    - Philosophy (anti-DRM, ownership, privacy)
  - Screenshots (GUI, MCP in Claude Desktop)
  - Link to GitHub repo

- [ ] **GitHub README polish**
  - Hero image (GUI screenshot)
  - Clear value proposition
  - Installation instructions
  - Feature list
  - Demo GIF/video

- [ ] **Social media launch**
  - Bluesky post (Nicholas's account)
  - Mastodon post
  - Link to article

- [ ] **Community outreach**
  - Post in MCP community Discord/forum
  - Share in book/piracy communities (reddit, etc.)
  - DM to MCP early adopters

- [ ] **Analytics setup**
  - Track npm downloads
  - Track GitHub stars/forks
  - Track article views
  - Feedback collection (GitHub issues)

---

## 📚 Research

### Config-Driven Architecture

**Reference:** How other CLI tools handle config
- `git` → `~/.gitconfig`
- `npm` → `~/.npmrc`
- `claude` → `~/Library/Application Support/Claude/`

**Best practices:**
- JSON for structured config (easy to parse)
- XDG Base Directory spec (`~/.config/librarian/` on Linux)
- Fallback to defaults if config missing
- `--config` flag to override path

### Folder Structure Patterns

**Common patterns in book libraries:**
- **Calibre:** Flat (author/title/book.epub)
- **Archive.org:** Hierarchical (topic/subtopic/book.epub)
- **Personal:** Mixed (chaos, but that's real-world)

**Decision:** Support mixed (Option B) = more robust, handles real-world chaos

### MCP Auto-Setup Challenges

**Claude Desktop config:**
- Location: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Format: JSON
- Requires restart after edit

**Safe editing:**
- Read existing config
- Merge new entry (don't overwrite)
- Validate JSON before writing
- Backup original (`.bak` file)

---

## ✅ Done

_(Empty)_

---

## 📝 Notes

**Dependencies:**
- Blocks: v0.30.0 (npm package publish)
- Requires: v0.27.0 complete (stable GUI)
- Requires: v0.28.0 complete (EPUB reader working)

**Launch timing:**
- After GUI + reader are solid
- Before MCP gets too crowded (early mover advantage)
- Ideally: before end of Q1 2026

**Success metrics:**
- 100+ npm downloads (first week)
- 10+ GitHub stars
- 5+ community feedback/issues
- 1+ external contributor

**Philosophy:**
- Piracy-positive (Anna's Archive spirit)
- Privacy-first (local-only, no telemetry)
- Anti-DRM (EPUB over Kindle)
- Commons-focused (open source, MIT license)
