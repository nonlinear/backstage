# Deployment Strategy

**Decision:** Hybrid approach (dev + production)

---

## Development (Real-time Paridade)

**Tool:** Vite dev server + Tailscale

**How:**
```bash
cd ~/Documents/wiley/Research\ Exchange
npm run dev -- --host 0.0.0.0
```

**Access:**
- Nicholas: `http://studio.adal-rigel.ts.net:3000`
- Hot reload: automatic (< 100ms)

**Pros:**
- Instant feedback (hot reload)
- Self-hosted (Tailscale network)
- Zero deploy overhead

**Cons:**
- Dev build (not production-optimized)
- Only available when server running

---

## Production Preview (Permanent Versions)

**Tool:** Docker + Nginx

**Dockerfile:**
```dockerfile
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 80
```

**Deploy:**
```bash
docker build -t rex-mui:v1 .
docker run -d -p 8091:80 --name rex-v1 --restart unless-stopped rex-mui:v1
```

**Access:**
- v1: `http://studio.adal-rigel.ts.net:8091`
- v2: `http://studio.adal-rigel.ts.net:8092`
- v3: `http://studio.adal-rigel.ts.net:8093`

**Pros:**
- Production build (optimized)
- Always-on (auto-restart)
- Multiple versions side-by-side (compare v1 vs v2)

**Cons:**
- Manual trigger (rebuild + restart)
- Slower iteration (30-60s rebuild)

---

## Version Management

**Each iteration = Git branch + Docker container:**

```bash
# Step 1, version 1
git checkout -b step-1-v1
docker build -t rex-mui:step-1-v1 .
docker run -d -p 8091:80 --name rex-step-1-v1 rex-mui:step-1-v1

# Step 1, version 2 (iterate)
git checkout -b step-1-v2
docker build -t rex-mui:step-1-v2 .
docker run -d -p 8092:80 --name rex-step-1-v2 rex-mui:step-1-v2
```

**Compare side-by-side:**
- Open both URLs in split screen
- Visual diff directly in browser

---

## Workflow

### Daily Work (Development)

1. design-engineer runs dev server
   ```bash
   npm run dev -- --host 0.0.0.0
   ```

2. Nicholas accesses via Tailscale
   ```
   http://studio.adal-rigel.ts.net:3000
   ```

3. Real-time collaboration:
   - "Change button color" → design-engineer edits → Nicholas sees instantly
   - Hot reload = < 100ms feedback loop

### Milestone Review (Production)

4. When version approved:
   ```bash
   git add -A && git commit -m "Step 1 v2 complete"
   docker build -t rex-mui:step-1-v2 .
   docker run -d -p 8092:80 --name rex-step-1-v2 rex-mui:step-1-v2
   ```

5. Permanent URL available:
   ```
   http://studio.adal-rigel.ts.net:8092
   ```

6. Compare with previous:
   - v1: port 8091
   - v2: port 8092
   - Open both, visual diff

---

## Testing Strategy

**Code-based (Not screenshot diff):**

**Tool:** Playwright Component Testing

**Example test:**
```typescript
import { test, expect } from '@playwright/experimental-ct-react';
import { ReXButton } from '../src/components/ReXButton';

test('button renders correct variant', async ({ mount }) => {
  const component = await mount(
    <ReXButton variant="primary">Submit</ReXButton>
  );
  
  // Semantic assertions (not pixel diff)
  await expect(component).toHaveClass('MuiButton-containedPrimary');
  await expect(component).toHaveCSS('background-color', 'rgb(25, 118, 210)');
  
  // Interaction
  await component.click();
  await expect(component).toHaveFocus();
});
```

**Why code-based:**
- Tests CSS properties (semantic, not visual)
- Handles elastic layouts (responsive OK)
- Tests interactions (click, focus, hover)
- Self-hosted (no cloud service)

**Screenshot diff (optional, for final polish):**
- Playwright screenshot baseline (from Figma export)
- Compare implementation vs design
- Threshold: < 10% diff OK (not pixel-perfect)

---

## Auto-Deploy (Future)

> 🔜 **Git watcher that auto-rebuilds on push:**
> 
> ```bash
> # ~/Apps/rex-watcher.sh
> while true; do
>   git fetch origin
>   if [ $(git rev-parse @) != $(git rev-parse @{u}) ]; then
>     git pull
>     docker stop rex-mui && docker rm rex-mui
>     docker build -t rex-mui .
>     docker run -d -p 8091:80 --name rex-mui --restart unless-stopped rex-mui
>   fi
>   sleep 10
> done
> ```

---

## Container Management

**List running versions:**
```bash
docker ps | grep rex
```

**Stop/remove old version:**
```bash
docker stop rex-step-1-v1
docker rm rex-step-1-v1
```

**Restart container:**
```bash
docker restart rex-step-1-v2
```

**View logs:**
```bash
docker logs rex-step-1-v2 --tail 50
```

---

**Decision rationale:**
- Dev server = real-time feedback (Nicholas sees changes instantly)
- Docker = permanent versions (compare iterations side-by-side)
- Self-hosted = full privacy, no cloud dependencies
- Playwright = code-based testing (semantic, not brittle pixel diff)
