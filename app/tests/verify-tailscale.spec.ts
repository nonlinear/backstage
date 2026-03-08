import { test, expect } from '@playwright/test';

test('Backstage accessible via Tailscale HTTPS 3002', async ({ page }) => {
  // Try Tailscale URL (requires Tailscale running)
  await page.goto('https://studio.adal-rigel.ts.net:3002');
  
  // Screenshot
  await page.screenshot({ path: 'test-results/tailscale-3002.png', fullPage: true });
  
  // Verify page loaded (check for known element)
  const heading = await page.locator('h1').first().textContent();
  console.log('Page heading:', heading);
  
  expect(heading).toBeTruthy();
});
