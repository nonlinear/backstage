# v0.4.0 - Offline Browser Storage (Kavita/Komga)

## Context Snapshot
- **Why this exists:** Enable offline reading for Kavita/Komga web apps (comics/books cached in browser)
- **Problem solved:** Kavita/Komga are web apps, no native offline mode → Can't read without internet
- **Date:** 2026-02-15
- **Assumptions:** Kavita/Komga running on NAS, web-based readers, no native offline support

---

## Research Summary (2026-02-15)

### Problem
**Kavita/Komga = web apps, no offline mode:**
- Comics/books streamed from server (page-by-page loading)
- No browser caching (can't read offline)
- Mobile data usage (streaming pages on-the-go)

**Use case:**
- Download comics/books for offline reading (airplane, subway, etc.)
- Reduce mobile data usage (cache once, read many times)
- Faster reading (no network latency)

---

## Approaches

### Option 1: Service Worker Interception (PWA Pattern) ✅ CLEANEST

**How it works:**
1. Register Service Worker on Kavita/Komga domain
2. Intercept fetch requests (book pages, metadata, images)
3. Cache responses in Cache API or IndexedDB
4. Serve from cache when offline

**Implementation:**
```javascript
// service-worker.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('kavita-v1').then((cache) => {
      return cache.addAll([
        '/api/book/metadata',
        '/api/book/pages'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if available
      return response || fetch(event.request).then((fetchResponse) => {
        // Cache new responses
        return caches.open('kavita-v1').then((cache) => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    })
  );
});
```

**Registration (inject via browser console or extension):**
```javascript
// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
      console.log('SW registered:', registration);
    })
    .catch((error) => {
      console.error('SW registration failed:', error);
    });
}
```

**Pros:**
- ✅ Cleanest approach (PWA standard)
- ✅ Works across browsers (Chrome, Firefox, Safari)
- ✅ No extension needed (just inject SW once)
- ✅ Cache API optimized for resources

**Cons:**
- ⚠️ Requires SW registration (one-time setup)
- ⚠️ May need HTTPS (some browsers block SW on HTTP)
- ⚠️ Complex cache invalidation (when to refresh?)

**Recommendation:** **Best approach** (standard PWA pattern)

---

### Option 2: Browser Extension (More Invasive)

**How it works:**
1. Build browser extension (Chrome/Firefox)
2. Intercept fetch requests (background script)
3. Store blobs in IndexedDB
4. Serve from cache when offline

**Implementation:**
```javascript
// background.js
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    // Intercept book page requests
    if (details.url.includes('/api/book/page')) {
      // Fetch and cache in IndexedDB
      fetch(details.url).then((response) => {
        return response.blob();
      }).then((blob) => {
        // Store in IndexedDB
        saveToIndexedDB(details.url, blob);
      });
    }
  },
  { urls: ['http://NAS_HOST:*/api/*'] },
  ['blocking']
);
```

**Pros:**
- ✅ More control (can intercept all requests)
- ✅ Can inject UI (download button, cache manager)
- ✅ Works on HTTP (no HTTPS needed)

**Cons:**
- ❌ Requires extension installation (not one-click)
- ❌ Maintenance burden (update for Chrome/Firefox changes)
- ❌ More invasive (needs permissions)

**Recommendation:** Only if Service Worker insufficient

---

### Option 3: Kavita/Komga Native Features (Check First)

**Research needed:**
- Does Kavita have offline mode built-in?
- Does Komga have download API?
- Are there mobile apps with offline support?

**Kavita docs:** https://wiki.kavitareader.com/  
**Komga docs:** https://komga.org/

**Expected answer:**
- Kavita may have download feature (check API endpoints)
- Komga may have bulk download (check docs)
- Mobile apps may support offline (check iOS/Android apps)

**Action:**
- [ ] Check Kavita wiki for offline mode
- [ ] Check Komga docs for download API
- [ ] Test Kavita/Komga mobile apps (do they support offline?)

**If native support exists:** Use that instead of custom SW/extension

---

## Comparison Table

| Feature | Service Worker | Browser Extension | Native (if exists) |
|---------|----------------|-------------------|--------------------|
| **Setup** | ⚠️ One-time (inject SW) | ❌ Install extension | ✅ Built-in |
| **Complexity** | ⚠️ Medium | ❌ High | ✅ Low |
| **Browser support** | ✅ Chrome/Firefox/Safari | ⚠️ Chrome/Firefox only | ✅ All browsers |
| **HTTPS required** | ⚠️ Yes (some browsers) | ❌ No | N/A |
| **Maintenance** | ✅ Low (standard API) | ❌ High (extension updates) | ✅ None |

**Winner:** **Native features** (if available) OR **Service Worker** (if no native support)

---

## Technical Details

### Service Worker Architecture

**1. Cache Strategy (Network First, Fallback to Cache):**
```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).then((response) => {
      // Cache successful responses
      const responseClone = response.clone();
      caches.open('kavita-v1').then((cache) => {
        cache.put(event.request, responseClone);
      });
      return response;
    }).catch(() => {
      // Fallback to cache if network fails
      return caches.match(event.request);
    })
  );
});
```

**2. IndexedDB Storage (for large files):**
```javascript
// Store book pages in IndexedDB
const dbPromise = indexedDB.open('kavita-db', 1);

dbPromise.onsuccess = (event) => {
  const db = event.target.result;
  const transaction = db.transaction(['books'], 'readwrite');
  const store = transaction.objectStore('books');
  
  // Save book page
  store.put({ url: '/api/book/page/123', blob: pageBlob });
};
```

**3. Cache Invalidation (refresh on new version):**
```javascript
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['kavita-v2'];  // New version
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            // Delete old cache
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

---

### Injection Methods

#### Method A: Browser Console (Manual)
```javascript
// Paste in browser console (on Kavita/Komga page)
navigator.serviceWorker.register('/service-worker.js');
```

**Pros:** Quick test  
**Cons:** Must re-inject on new domains

---

#### Method B: Bookmarklet (One-Click)
```javascript
javascript:(function(){navigator.serviceWorker.register('/service-worker.js').then(r=>alert('SW registered')).catch(e=>alert('SW failed: '+e))})();
```

**Usage:** Save as bookmark, click to inject SW

**Pros:** One-click activation  
**Cons:** Still requires SW file hosted

---

#### Method C: Browser Extension (Automatic)
```javascript
// content-script.js (auto-inject on Kavita/Komga)
if (window.location.hostname === 'NAS_HOST') {
  navigator.serviceWorker.register(chrome.runtime.getURL('service-worker.js'));
}
```

**Pros:** Automatic (no manual injection)  
**Cons:** Requires extension installation

---

## DRM/Copy Protection Concerns

**Question:** Does Kavita/Komga have DRM?

**Expected answer:**
- Kavita/Komga are self-hosted (no DRM by default)
- Comics/books are files on your own NAS (you own them)
- No DRM to break (unlike Kindle, Audible, etc.)

**Action:**
- [ ] Verify Kavita/Komga don't use DRM
- [ ] Check if caching violates terms of service (unlikely for self-hosted)

**Assumption:** Self-hosted = no DRM, caching is fine

---

## Implementation Plan

### Phase 1: Research Native Support
- [ ] Check Kavita wiki (offline mode? download API?)
- [ ] Check Komga docs (bulk download? offline mode?)
- [ ] Test Kavita/Komga mobile apps (iOS/Android offline support?)
- [ ] Document findings (native support exists? API endpoints?)

### Phase 2: Service Worker Proof-of-Concept
- [ ] Write minimal SW (cache one book page)
- [ ] Inject via console (test on Kavita instance)
- [ ] Test offline reading (disconnect network, load cached page)
- [ ] Verify cache size (how many books fit in browser storage?)

### Phase 3: Build Full SW
- [ ] Cache book metadata (title, author, cover)
- [ ] Cache all pages (iterate through book API)
- [ ] Implement cache invalidation (version bumping)
- [ ] Add UI (download button, cache manager)

### Phase 4: Deployment
- [ ] Host SW file (on NAS or bookmarklet)
- [ ] Document injection (console, bookmarklet, or extension)
- [ ] Test on mobile (iOS Safari, Android Chrome)
- [ ] Measure storage usage (how many books cached?)

---

## Open Questions

1. **Native support:** Does Kavita/Komga already support offline?
   - Check docs first (may already be solved)

2. **HTTPS requirement:** Does Service Worker need HTTPS?
   - Some browsers (Safari) block SW on HTTP
   - Solution: Use Tailscale (HTTPS via MagicDNS) or self-signed cert

3. **Cache size limits:** How many books can browser store?
   - Chrome: ~60% of disk space (quota API)
   - Safari: ~50MB (smaller limit)
   - IndexedDB: Larger (GB+)

4. **Cache invalidation:** When to refresh cached books?
   - Option A: Manual (user triggers refresh)
   - Option B: Version-based (cache v1 → v2 on update)
   - Option C: Time-based (refresh every 30 days)

5. **Mobile support:** iOS Safari vs Android Chrome?
   - Both support Service Worker (test compatibility)

---

## Success Criteria

- ✅ Books/comics cached in browser (offline reading works)
- ✅ Service Worker or extension deployed (user can enable)
- ✅ DRM/copy protection respected (no terms violation)
- ✅ Documentation complete (how to setup, how to use)
- ✅ Mobile tested (iOS Safari + Android Chrome)
- ✅ Cache management UI (view cached books, clear cache)

---

## Related Epics
- apps v0.1.0 - Agenda Fixes (PWA offline mode pattern)
- apps v0.3.0 - Webchat Redesign (PWA architecture)

---

**Status:** 🔍 RESEARCH PHASE
**Next:** Check Kavita/Komga docs for native offline support, test Service Worker PoC
