# Epic v0.27.0 - Lessons Learned

**Context:** GUI Index Browser built by copying Backstage app structure.

---

## 1. Copy Working Code, Don't Build From Scratch

**Problem:** Spent 45min troubleshooting Shadcn CSS imports when building from scratch.

**Solution:** Copied entire `~/Backstage/app/` → `~/Documents/librarian/app/`, then gutted what wasn't needed.

**Why it works:**
- Components BY DEFINITION repeat across projects
- Backstage = 838 packages, all configs working
- Change 3 files (page.tsx, metadata, icons) vs configure 838 packages

**Value:** 45min wasted → 10min copy+modify

---

## 2. Port Lifecycle: Tailscale Blocks Before App Binds

**Problem:** Port 8766 zombie process after reboot. Kill didn't work.

**Root cause:** Tailscale serve binds at network layer (invisible to `ps`/`lsof`).

**Correct order:**
1. **Hammer port:** `tailscale serve --https=PORT off`
2. **Start app:** `npm run dev` (binds localhost)
3. **Configure Tailscale:** `tailscale serve --https=PORT http://localhost:PORT`

**Wrong order = EADDRINUSE forever.**

**Value:** Prevents "why won't port clear?" loops

---

## 3. Icon Cache Busting: Rename File, Not URL

**Problem:** Changed `icon.png` content, browser still showed old Backstage icon.

**Attempts failed:**
- `icon.png?v=librarian` (cache buster in URL)
- Hard refresh (Cmd+Shift+R)

**What worked:** Rename file (`icon.png` → `librarian-icon.png`)

**Why:** Browser caches aggressively by path. Different filename = new resource.

**Value:** Don't waste time with cache-busting URLs

---

## 4. URL Encoding: Accept Both Hyphens AND %20

**Problem:** Topics with spaces (`Art Direction`) broke routing.

**Evolution:**
1. ❌ Showed encoded in dropdown: "Art%20direction"
2. ✅ Clean URLs: `/creativity/art-direction`
3. ✅ **Backwards compat:** Accept both `-` and `%20`

**Implementation:**
```typescript
function unslugify(slug: string): string {
  return slug
    .replace(/-/g, ' ')      // New format
    .replace(/%20/g, ' ')    // Old format
    .split(' ')
    .map(capitalize)
    .join(' ');
}
```

**Value:** Clean URLs + don't break existing bookmarks

---

## 5. Conditional Rendering Prevents Placeholders

**Problem:** Header showed "X" when no topic selected (SelectValue placeholder).

**Root cause:** Breadcrumb always rendered, even when `currentRoot === null`.

**Fix:**
```typescript
{currentRoot && (
  <Breadcrumb>...</Breadcrumb>
)}
```

**Value:** Prevent UI artifacts, cleaner header

---

## 6. Cover Extraction: One Script, Two Formats

**Problem:** Needed covers for EPUB (171 files) AND PDF (309 files).

**Temptation:** Create `extract-epub-covers.py` and `extract-pdf-covers.py`.

**Better:** One unified script with format detection.

**Why:**
- DRY (file discovery, error handling shared)
- Easier maintenance (one script to update)
- Consistent CLI interface

**Performance:**
- EPUB: ~0.1s (metadata extraction)
- PDF: ~3s (render first page at 150 DPI)

**Value:** 15min batch job covers entire library (474 covers)

---

## 7. Package Rename: Search-Replace Isn't Enough

**Problem:** Copied Backstage, forgot to rename package.

**Manifestations:**
- `package.json`: `"name": "backstage"`
- Port: `8766` not `8767` initially
- Confusion in logs/errors

**Fix checklist:**
1. `package.json`: name + port
2. `metadata.ts`: title + description
3. Icons: replace with project-specific
4. `README.md`: project name

**Value:** Avoid confusion when debugging

---

## 8. Symlink Strategy: Books Outside App

**Problem:** 581 books × 50KB covers = ~30MB in `app/public/`.

**Solution:** Symlink `app/public/books` → `~/Documents/librarian/books`.

**Why better:**
- Books managed outside Git
- App stays lightweight
- One source of truth (books/)

**Gotcha:** Symlink must exist BEFORE `npm run dev` (or hot reload breaks).

**Value:** Clean separation (code vs data)

---

## 9. Component Hierarchy: Root Topics → Subtopics

**Problem:** Mixed root topics and subtopics in same dropdown (confusing).

**Solution:** Two-level hierarchy:
- **First dropdown:** Root topics only (AI, anarchy, design)
- **Second dropdown:** Subtopics (conditional, only if exist)

**Implementation:**
```typescript
const rootTopics = groupByRootFolder(topics); // First segment
const currentSubtopics = rootTopics[currentRoot]?.subtopics || [];
```

**Value:** Clear navigation, matches mental model

---

## 10. Playwright: Install PER PROJECT, Not Global

**Problem:** Tried `npm install -g @playwright/test` (doesn't work with Next.js).

**Solution:** Install in project: `cd app && npm install -D @playwright/test`.

**Why:**
- Each project = own dependencies (node_modules)
- Global install ≠ accessible to Next.js
- Configs must be local (playwright.config.ts)

**Value:** Screenshots for frontend verification

---

## Summary: Top 3 Traps

1. **Don't build from scratch** → Copy working template (Backstage)
2. **Port lifecycle** → Hammer Tailscale FIRST, then start app
3. **Icon cache** → Rename file, don't cache-bust URL

**Philosophy:** Learn from mistakes, document traps, never repeat.
