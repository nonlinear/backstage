import { test, expect } from '@playwright/test';

test('Kavita accessible via Tailscale HTTP 5009', async ({ page }) => {
  // Tailscale HTTP (port 5009)
  await page.goto('http://studio.adal-rigel.ts.net:5009');
  
  await page.screenshot({ path: 'test-results/kavita-5009.png', fullPage: true });
  
  const title = await page.title();
  console.log('Kavita page title:', title);
  
  expect(title).toContain('Kavita');
});
