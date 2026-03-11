# Epic v0.28.0 - Librarian as Reader

**Goal:** Turn Librarian GUI into full EPUB reader (replace Kavita for reading workflow).

## Architecture

```
LibraryBrowser
  ├── Topic View (current)
  └── EpubReader (NEW)
       ├── Portrait layout (default)
       ├── Landscape layout (CSS media query)
       ├── Page memory (localStorage)
       └── Deep link support (/AI/policy#book.epub)
```

## User Flow

**1. Browse → Read:**
- User clicks book card → Opens EpubReader
- Reader shows book at page 1 (or last CFI if pinned)
- Breadcrumb: Librarian / AI / policy / Book Title

**2. Read → Save:**
- User reads, turns pages
- If book pinned → CFI auto-saved to localStorage
- Progress indicator shows % read

**3. Close → Return:**
- Close button → Returns to topic view
- URL updates to topic (no hash)

**4. Deeplink → Resume:**
- User navigates: `/AI/policy#debt.epub`
- If book pinned + CFI exists → Warning: "Return to reading Debt?"
- Click "Resume" → Opens reader at last CFI

## Technical Decisions

### EPUB.js (Chosen)
- **Pros:** MIT license, active maintenance, CFI support, responsive
- **Cons:** Large bundle (~200KB), requires careful CSS overrides
- **Alternatives:** Readium (complex), Foliate (Linux-only)

### Page Memory Storage
- **Format:** `{ bookPath: string, cfi: string, progress: number, pinnedAt: timestamp }`
- **Storage:** localStorage (5MB limit = ~1000 books metadata)
- **Key:** `librarian:reading:${bookPath}`
- **Backup:** Export/import JSON (future epic)

### Deep Link Logic
```typescript
// On page load
if (hash && isPinned(hash)) {
  showBanner(`Return to reading ${bookTitle}?`);
  onResume → openReader(hash, loadCFI(hash));
}
```

### Layouts (CSS Media Queries)
```css
/* Portrait (default) */
.epub-reader {
  max-width: 600px;
  margin: 0 auto;
}

/* Landscape (desktop/iPad horizontal) */
@media (orientation: landscape) {
  .epub-reader {
    max-width: 900px;
    column-count: 2;
  }
}
```

## Pin/Unpin UX

**Star icon in book card:**
- Unpinned: ⭐ (outline)
- Pinned: ⭐ (filled)
- Click → Toggle pin state
- Persisted in localStorage

**Pinned benefits:**
1. Page position saved
2. "Return to reading" banner
3. Quick access list (future: sidebar)

## Progress Tracking

**CFI = Canonical Fragment Identifier** (EPUB standard)
- Example: `epubcfi(/6/4[chap01ref]!/4/2/2[page-001]/1:0)`
- Maps to exact position in book
- EPUB.js handles parsing/navigation

**Progress calculation:**
```typescript
const progress = (currentCFI.location / totalLocations) * 100;
```

## Research Questions

**Q: EPUB.js bundle size impact?**
- A: ~200KB gzipped. Lazy load on reader open (not index view).

**Q: localStorage 5MB limit sufficient?**
- A: Yes. 1000 books × 500 bytes = 500KB metadata. Room for growth.

**Q: CFI parsing failures?**
- A: Graceful fallback → Open at page 1, log error, show warning.

**Q: Landscape on iPad Mini?**
- A: Test with DevTools responsive mode (810×1080 landscape).

## Phase Breakdown

### Phase 1: EPUB Rendering (3 tasks)
- Install epub.js
- Create EpubReader component
- Test sample book (TOC, fonts, pagination)

### Phase 2: Page Memory (4 tasks)
- localStorage schema
- Pin/unpin button
- Save CFI on page turn
- Load CFI on open

### Phase 3: Deep Linking (3 tasks)
- Hash routing update
- Reader opens at saved CFI
- Breadcrumb navigation

### Phase 4: Layouts (4 tasks)
- Portrait CSS
- Landscape CSS
- Media query implementation
- iPad Mini testing

### Phase 5: UX Polish (4 tasks)
- "Return to reading" banner
- Close button
- Progress indicator
- Font size controls

## Dependencies

**Blocked by:**
- Epic v0.27.0 (GUI Index Browser) must be stable

**Blocks:**
- Epic v0.29.0 (Search/Filter) - can work in parallel
- Epic v0.30.0 (Quick Access Sidebar) - needs pin state

## Success Metrics

**MVP (Phase 1-3):**
- ✅ EPUB renders correctly
- ✅ Page position saved (pinned books)
- ✅ Deep links open reader at last CFI

**Polish (Phase 4-5):**
- ✅ Portrait/landscape layouts responsive
- ✅ "Return to reading" UX clear
- ✅ Progress tracking accurate

## Inspiration Sources

**Apple Books:**
- Pin/unpin metaphor (star icon)
- Clean reader UI (minimal chrome)
- Progress dots at bottom

**Calibre Web:**
- EPUB.js integration example
- CFI-based bookmarks
- Font size controls

**Kavita:**
- "Continue reading" banner
- Server-side progress sync (we use localStorage)
- Comic/manga layout inspiration

## Notes

**Why replace Kavita:**
- Docker overhead (memory, complexity)
- Separate login (friction)
- No search integration with Librarian MCP
- **Librarian as reader = unified workflow** (browse → search → read)

**Future epics:**
- v0.29.0: Search inside book (EPUB.js search API)
- v0.30.0: Quick access sidebar (pinned books)
- v0.31.0: Highlights/annotations (localStorage + export)
- v0.32.0: Multi-device sync (optional, IndexedDB + sync API)
