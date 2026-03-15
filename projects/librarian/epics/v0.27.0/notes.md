# v0.27.0 Notes

## Design Decision: covers/ Folder (2026-03-12)

**Location:** `~/Documents/librarian/covers/`

**Strategy:**
- **Visible folder** (NOT hidden with `.`)
- **Committed to git** (NOT in .gitignore)
- **Scan filter:** Skip `covers/` when scanning books

**Why visible:**
- Need to commit covers for GUI (part of repo)
- Hidden folders (`.covers/`) would need explicit gitignore exception
- Simpler to keep visible and filter during scan

**Scan filter implementation:**
```python
epubs = [
    p for p in books_dir.rglob('*.epub')
    if 'covers' not in p.parts  # Skip covers/ folder
]
```

## File Structure

```
~/Documents/librarian/
  ├── books/
  │   ├── AI/
  │   │   └── policy/
  │   │       └── book.epub
  │   └── ...
  ├── covers/           # Extracted covers (committed)
  │   ├── ABC123.jpg
  │   └── XYZ789.jpg
  ├── librarian.db
  └── .library-index.json
```

## Cover Naming

**Format:** Hash of relative path (same as current)
- `books/AI/policy/book.epub` → `covers/ABC123.jpg`
- Ensures unique filenames
- No filesystem path issues

## Git Strategy

**DO commit:**
- `covers/*.jpg` (GUI needs them)

**DO NOT gitignore:**
- Covers are part of the repo (not temp files)

## Success Criteria

- [ ] `covers/` folder exists
- [ ] `extract-covers.py` outputs to `covers/`
- [ ] Book scan skips `covers/` folder
- [ ] GUI loads covers from `covers/`
- [ ] Covers committed to git
- [ ] No .gitignore for covers/
