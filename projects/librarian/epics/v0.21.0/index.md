# Epic Notes

> Version, name, status → see `epic.yaml`

---

# v0.21.0 - Reader App Comparison

**Context:** Kavita ❌ no deep linking. Need alternative.

**What if this is a contract diagram?**
- **Table = contract structure** (rows = candidates, columns = criteria)
- **Research = executing contract** (measure twice: verify each cell)
- **Decision emerges when contract fulfilled** (complete table = obvious choice)
- **Rules:** ✅ verified | ❌ confirmed no | ❓ unknown | ⚠️ yes with caveats | **Never invent data**

**Search strategy:**
- **Full-text search** = SUFFICIENT (can search manually)
- **Search URL param** = IDEAL (link with search embedded, bonus if exists)
- No deep linking found anywhere, but search-based navigation = viable alternative

**Finalist:** Komga (folder-friendly + full-text search)  
**Booklore disqualified:** Requires MariaDB (not folder-only, crashed without DB)  
**Test:** Komga vs Kavita comparison (search quality, URL params, UX)


| Feature | [**Kavita**](https://github.com/Kareadita/Kavita) | [**Komga**](https://komga.org) | [**Calibre-web**](https://github.com/janeczku/calibre-web) | [**Booklore**](https://github.com/booklore-app/booklore) |
|---------|-----------|-----------|-----------------|--------------|
| **Status** | ✅ Stable | ✅ Stable | ✅ Stable | ✅ Stable |
| **Open Source** | ✅ AGPLv3 | ✅ MIT | ✅ GPLv3 | ✅ AGPLv3 |
| **Self-hosted** | ✅ Docker | ✅ Docker | ✅ Docker | ✅ Docker |
| **API** | ✅ [Docs](https://wiki.kavitareader.com/guides/api/) | ✅ [OpenAPI](https://komga.org/docs/openapi/komga-api/) | ✅ [FastAPI](https://github.com/janeczku/calibre-web/pull/3536) | ✅ Yes |
| **EPUB/PDF** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes + comics |
| **Folder-friendly** | ✅ Watches | ✅ Watches | ❌ DB-centric | ❌ Requires MariaDB |
| **Full-text search** | ❌ [Metadata only (#2535)](https://github.com/Kareadita/Kavita/discussions/2535) | ✅ [FTS](https://komga.org/docs/guides/search/) | ✅ [PR #3531](https://github.com/janeczku/calibre-web/pull/3531) | ✅ Yes |
| **Search URL param** | ❓ | ❓ | ❓ | ❓ |
| **Deep linking** | ❌ [No URL params](https://studio.adal-rigel.ts.net:5007/library/1/series/4/book/914) | ❓ | ❓ | ❌ [Feature request #1101](https://github.com/booklore-app/booklore/issues/1101) |
| **Highlights** | ✅ [Annotations](https://github.com/Kareadita/Kavita/issues/4444) | ✅ [PR #1862](https://github.com/gotson/komga/pull/1862) | ⚠️ Kobo sync only | ✅ Yes |
| **Webapp** | ✅ [Demo](https://demo.kavitareader.com) | ✅ Yes | ✅ Yes | ✅ [Demo](https://demo.booklore.org) |
| **Mobile** | ✅ Panels (iOS) | ✅ Komelia (Android) + Panels (iOS) | ❌ No | ✅ OPDS |
| **Auto metadata** | ⚠️ Kavita+ (paid) | ✅ Comics | ✅ Yes | ✅ Google/OpenLib |
| **Device sync** | ✅ [KOReader #3928](https://github.com/Kareadita/Kavita/issues/3928) | ✅ Kobo | ❌ No | ✅ Kobo/KOReader |
| **What sets it apart** | Most popular, comics/manga focus | Comics specialist, excellent metadata | Mature Calibre ecosystem | Most features (BookDrop, auto-metadata, device sync) |

**Removed:** [Ubooquity](https://vaemendis.net/ubooquity/static12/license) (proprietary), [Readest](https://github.com/readest/readest) (client app), [Inkheart](https://gitlab.com/Nystik/inkheart) (PDF-only), [Bookstairs](https://github.com/bookstairs/bookstairs) (EPUB-only, unstable), [Atsumeru](https://github.com/Atsumeru-xyz/Atsumeru) (comics/EPUB, no PDF)

**Disqualified:**
- **Kavita:** ❌ No full-text search (can't search content manually)
- **Calibre-web:** ❌ Not folder-friendly (DB-centric, imports/copies files)
- **Booklore:** ❌ Requires MariaDB (crashed on startup, not folder-only)

**Next:** Test Komga search (manual + URL params)
