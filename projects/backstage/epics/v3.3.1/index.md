# v3.3.1: Hot Reload

**Goal:** Auto-reload Backstage UI when YAML files change (no manual restart during grooming)

---

## Implementation Code Examples

**Step 1: Install chokidar**
```bash
cd ~/Backstage/app
npm install chokidar
```

**Step 2: Create file watcher**

**File:** `app/lib/watch-projects.js`
```javascript
import chokidar from 'chokidar';
import { revalidatePath } from 'next/cache';
import path from 'path';

if (process.env.NODE_ENV === 'development') {
  const projectsPath = path.resolve(__dirname, '../../projects');
  
  const watcher = chokidar.watch(`${projectsPath}/**/*.yaml`, {
    ignoreInitial: true,
    persistent: true,
  });

  watcher
    .on('change', (filePath) => {
      console.log(`📝 YAML changed: ${filePath}`);
      revalidatePath('/projects');
    })
    .on('add', (filePath) => {
      console.log(`➕ YAML added: ${filePath}`);
      revalidatePath('/projects');
    })
    .on('unlink', (filePath) => {
      console.log(`🗑️ YAML removed: ${filePath}`);
      revalidatePath('/projects');
    })
    .on('error', (error) => {
      console.error(`❌ Watcher error: ${error}`);
    });

  console.log(`👀 Watching ${projectsPath}/**/*.yaml for changes...`);
}

export {}; // Make it a module
```

**Step 3: Import in layout**

**File:** `app/layout.tsx`
```typescript
import './lib/watch-projects'; // Add at top

export default function RootLayout({ children }) {
  // ... rest of layout
}
```

**Step 4: Alternative - Add to next.config.js (if layout import doesn't work)**

**File:** `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config
  
  webpack: (config, { isServer, dev }) => {
    if (dev && !isServer) {
      // Import watcher in dev mode
      require('./app/lib/watch-projects');
    }
    return config;
  },
};

module.exports = nextConfig;
```

### Test Cases

1. **Edit epic.yaml title → browser auto-reloads with new title**
2. **Add new task → browser shows new task immediately**
3. **Delete epic.yaml → browser removes from list**
4. **Console shows:** `📝 YAML changed: /path/to/epic.yaml`

---

## Success Criteria

**Current card fix:**
- [ ] Current card has visual indicator (border/highlight)
- [ ] Current card does NOT auto-open notes
- [ ] Current card does NOT change width
- [ ] Can click tasks tab on current card (works)
- [ ] Notes tab width = 600px (only when notes active)

**Hot reload:**
- [ ] `chokidar` installed
- [ ] `watch-projects.js` created + imported
- [ ] Edit YAML → browser reloads automatically
- [ ] Console shows file change notifications
- [ ] No more manual Backstage restarts

---

## Implementation Order

1. **Hot reload FIRST** (makes testing easier)
   - Install chokidar
   - Create watcher
   - Test with dummy YAML change

2. **Current card fix SECOND** (once hot reload works)
   - Separate state variables
   - Fix click handlers
   - Remove auto-open logic
   - Test navigation

---

**Created:** 2026-03-12 (Pomodoro grooming session)
**Priority:** High (blocks efficient grooming)
