# Debug Questions: Research Exchange Project Not Appearing in Backstage UI

## Context
- **System:** Next.js 15 app running in production mode (LaunchAgent)
- **Issue:** Research Exchange project appears in API response but NOT in UI list
- **All other projects:** Display correctly (16/17 working)

## API Response Verification

```bash
# API returns Research Exchange correctly:
curl -s http://localhost:3004/api/projects | jq '.projects[] | select(.name == "Research Exchange")'
```

**Output:**
```json
{
  "name": "Research Exchange",
  "description": "",
  "tier": "flagship",
  "type": "product",
  "activeCount": 0,
  "backlogCount": 1,
  "publishedCount": 0,
  "archiveCount": 0,
  "checks": []
}
```

✅ **API returns data correctly**

## File Structure

```
~/Backstage/projects/research-exchange/
├── README.md
├── project.yml  (renamed from project.yaml today)
└── epics/
    ├── v0.1.0/
    │   ├── epic.yaml
    │   └── index.md
    └── v0.2.0/
        └── epic.yaml
```

**project.yml content:**
```yaml
name: "Research Exchange"
goal: "Redesign/rebuild ReX submission system components in Material-UI"
tier: "flagship"
type: "product"
status: "backlog"
owner: "Nicholas"
created: 2026-03-09
started: null
completed: null
```

**Note:** File was renamed from `project.yaml` → `project.yml` to match other projects (16/17 use `.yml`)

## Code Changes Made Today

### 1. Fixed `projectTier` type (string instead of number)

**File:** `~/Backstage/app/app/projects/[project]/page.tsx`

**Change:**
```typescript
// BEFORE (wrong)
let projectTier = 1
projectTier = metadata.tier || 1

// AFTER (correct)
let projectTier = 'experimental'
projectTier = metadata.tier || 'experimental'
```

**Reason:** All projects use string tiers (`"flagship"`, `"experimental"`, `"backlog"`), not numbers

### 2. Removed YAML front matter markers

**File:** `~/Backstage/projects/research-exchange/project.yml`

**Change:**
```yaml
# BEFORE (wrong - had --- markers)
---
name: "Research Exchange"
...
---

# AFTER (correct - no markers)
name: "Research Exchange"
...
```

**Reason:** Other project.yml files don't use front matter markers

## Questions for AI Assistant

### 1. React Rendering Issue

The API route `/api/projects` returns all 17 projects including Research Exchange.

**Question:** Why would a Next.js client component (`app/projects/page.tsx`) receive the API data but fail to render ONE specific project in the list?

**Code:**
```typescript
// app/projects/page.tsx
useEffect(() => {
  async function fetchProjects() {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()
      setProjects(data.projects)  // Should include all 17
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }
  if (section === 'projects') {
    fetchProjects()
  }
}, [section])
```

**Map/render:**
```typescript
{projects.map(project => (
  <ProjectCard
    key={project.name}
    projectName={project.name}
    projectDescription={project.description}
    projectTier={project.tier}
    projectType={project.type}
    // ...
  />
))}
```

**Possible causes to investigate:**
- Browser cache preventing re-render?
- React key collision (multiple projects with same name)?
- Filter/sort logic hiding specific project?
- ProjectCard component rejecting certain prop combinations?

### 2. YAML Parsing Consistency

All projects parse correctly EXCEPT research-exchange (which recently had YAML format changes).

**Question:** Could residual parsing issues cause the project to be filtered out client-side even though API returns it?

**Test:**
```bash
# Verify YAML parses correctly
cd ~/Backstage/app
node -e "const yaml = require('js-yaml'); const fs = require('fs'); console.log(JSON.stringify(yaml.load(fs.readFileSync(process.env.HOME + '/Backstage/projects/research-exchange/project.yml', 'utf-8')), null, 2))"
```

**Output:** ✅ Parses correctly (tier: "flagship", name: "Research Exchange", etc.)

### 3. Project Filtering Logic

**Question:** Does the Backstage UI apply any filters that would exclude projects with:
- Empty `description` field?
- `status: "backlog"`?
- Zero active epics (`activeCount: 0`)?
- `type: "product"` (vs `"undefined"`)?

**Research Exchange unique characteristics:**
```json
{
  "description": "",           // Empty (most others have text)
  "type": "product",          // Specific type (most are "undefined")
  "status": "backlog",        // In project.yml
  "activeCount": 0,
  "backlogCount": 1
}
```

### 4. Production Build vs Dev Mode

**Question:** Could production build caching cause stale rendering after file changes?

**Actions taken:**
- Deleted `.next/` cache
- Ran `npm run build`
- Restarted LaunchAgent (production mode)

**Symptoms:**
- API returns fresh data
- UI shows stale state (0 projects, then 16/17)

**Question:** Does Next.js production mode cache component rendering separately from API data?

### 5. Playwright Screenshot Analysis

**Test run:**
```bash
cd ~/Backstage/app
npx playwright test verify-research-exchange
```

**Results:**
- Page loads: ✅ 200 OK
- Title: "Backstage" ✅
- H1 count: 1 ✅
- **Epic count: 0** ❌ (should be 2: v0.1.0, v0.2.0)
- **"flagship" text: NOT FOUND** ❌
- **"Research Exchange" text: NOT FOUND** ❌

**Question:** Why would `/projects/research-exchange` return 200 OK but render empty content?

### 6. Comparison with Working Project

**Librarian (WORKS):**
```yaml
name: "Librarian"
tier: experimental
type: undefined
description: "Librarian project"
```

**Research Exchange (BROKEN):**
```yaml
name: "Research Exchange"
tier: "flagship"
type: "product"
description: ""
```

**Differences:**
- Research Exchange uses QUOTED values (`"flagship"` vs `flagship`)
- Research Exchange has empty description
- Research Exchange has `type: "product"` (not `undefined`)

**Question:** Do quoted YAML strings cause type mismatches in TypeScript when compared to unquoted strings?

### 7. Browser DevTools Investigation

**Cannot verify (user on iPad):**
- Console errors?
- Network tab shows API response?
- React DevTools component state?

**Question:** What client-side debugging steps can diagnose why API data arrives but component doesn't render?

## Reproduction Steps

1. Navigate to http://localhost:3004/projects
2. UI shows 16 project cards (missing Research Exchange)
3. API returns 17 projects including Research Exchange
4. Navigate to http://localhost:3004/projects/research-exchange → timeout/empty

## Expected Behavior

Research Exchange should appear in `/projects` list with:
- Badge showing "flagship" tier
- Title "Research Exchange"
- 1 backlog epic
- Click navigates to `/projects/research-exchange` with 2 epics listed

## Actual Behavior

- Research Exchange missing from `/projects` list
- Direct URL `/projects/research-exchange` times out or shows empty

## System Info

- **macOS:** Darwin 25.3.0 (arm64)
- **Node:** v22.22.0
- **Next.js:** 15.x (production build)
- **Browser:** iPad Safari
- **Server:** LaunchAgent (auto-start on boot)

## Related Files

- `/Users/nonlinear/Backstage/app/app/projects/page.tsx` (client component)
- `/Users/nonlinear/Backstage/app/app/projects/[project]/page.tsx` (dynamic route)
- `/Users/nonlinear/Backstage/app/app/api/projects/route.ts` (API handler)
- `/Users/nonlinear/Backstage/app/lib/epics.ts` (data fetching logic)
- `/Users/nonlinear/Backstage/app/components/ProjectCard.tsx` (rendering component)

## What We Need

Specific debugging steps to identify why Research Exchange project:
1. Returns in API response ✅
2. Fails to render in UI list ❌
3. Fails to load on direct URL ❌

**Priority:** User is exhausted and frustrated. Need clear, actionable fix.
