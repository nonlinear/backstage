# connections/playwright.md

**What:** Browser automation and testing framework (industry standard)

**When to use:**
- Testing UI/frontend (Next.js, React, any web app)
- Visual regression testing (screenshot comparison)
- E2E testing (user flows, forms, navigation)
- Scraping/automation (when browser relay unavailable)

**When NOT to use:**
- Simple HTTP requests (use curl/fetch)
- Backend testing (use Jest/Vitest)
- Static content (use web_fetch tool)

---

## Installation

**Per-project (recommended):**
```bash
cd /path/to/project
npm install -D @playwright/test
npx playwright install chromium  # or firefox, webkit
```

**Global (not recommended):**
```bash
npm install -g @playwright/test
playwright install
```

---

## Configuration

**Minimal config (`playwright.config.ts`):**
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:PORT',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

**If server needs to start:**
```typescript
webServer: {
  command: 'npm run dev',
  url: 'http://localhost:PORT',
  reuseExistingServer: true,
},
```

**If server already running (PM2, Docker, etc.):**
- Comment out `webServer` block
- Set `baseURL` to running server

---

## Running Tests

```bash
# Headless (CI mode)
npx playwright test

# Headed (see browser)
npx playwright test --headed

# Debug mode (step-through)
npx playwright test --debug

# Interactive UI
npx playwright test --ui

# Specific test file
npx playwright test tests/my-test.spec.ts

# Specific test by grep
npx playwright test --grep "login flow"
```

---

## Common Patterns

### Take Screenshot

```typescript
import { test } from '@playwright/test';

test('capture page', async ({ page }) => {
  await page.goto('/agents');
  await page.screenshot({ path: 'agents.png', fullPage: true });
});
```

### Wait for Element

```typescript
// Wait for selector
await page.waitForSelector('#my-element');

// Wait for timeout (last resort)
await page.waitForTimeout(3000);

// Wait for network idle
await page.goto('/page', { waitUntil: 'networkidle' });
```

### Inspect Page Content

```typescript
// Count elements
const count = await page.locator('.item').count();

// Get text content
const text = await page.locator('h1').textContent();

// Check visibility
const visible = await page.locator('.modal').isVisible();
```

---

## Gotchas

**1. Server must be running**
- If webServer disabled, start server manually (PM2, npm run dev, etc.)
- Playwright won't start it for you

**2. Timeouts**
- Default: 30s
- Increase if slow: `test.setTimeout(60000);`
- Or globally: `timeout: 60000` in config

**3. Screenshots location**
- Failures: `test-results/[test-name]/test-failed-N.png`
- Manual: wherever you specify (`path: 'my-screenshot.png'`)

**4. Ports must match**
- `baseURL` in config = actual server port
- Mismatch = connection refused errors

---

## Backstage Example

**Location:** `~/Backstage/app/`

**Config:** `playwright.config.ts`
```typescript
use: {
  baseURL: 'http://localhost:3004',
}
// webServer commented out (PM2 runs it)
```

**Test:** `tests/debug.spec.ts`
```typescript
test('debug agents page', async ({ page }) => {
  await page.goto('/agents');
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'debug-agents.png', fullPage: true });
});
```

**Run:**
```bash
cd ~/Backstage/app
npx playwright test debug.spec.ts
```

**Result:** Screenshots in `~/Backstage/app/debug-*.png`

---

## Why Playwright > Browser Relay

**Browser Relay issues:**
- Requires Chrome extension
- Manual tab attach every session
- HTTP 404 errors (unreliable)
- Can't run in CI/CD

**Playwright advantages:**
- ✅ Industry standard (Next.js team uses it)
- ✅ Headless OR headed
- ✅ Screenshots + traces automatic
- ✅ Works with any server (PM2, Docker, local)
- ✅ No manual setup
- ✅ CI/CD ready

---

## Philosophy

**"Look OUTSIDE (standards) not inwards (custom tools)"**

- Playwright = what everyone uses for web testing
- Don't reinvent wheels
- Visual tools = mandatory for UI work
- "Programar sem ver = suicídio" (code without seeing = suicide)

---

## Resources

- Docs: https://playwright.dev
- Config reference: https://playwright.dev/docs/test-configuration
- API: https://playwright.dev/docs/api/class-page

---

**Source:** Session 2026-03-08 15:00 EDT
