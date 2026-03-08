import { test } from '@playwright/test';

test('verify notes select has all files', async ({ page }) => {
  await page.goto('http://localhost:3004/agents/main/defense');
  await page.waitForTimeout(2000);
  
  // Click Notes tab
  await page.locator('text=Notes').click();
  await page.waitForTimeout(1000);
  
  // Click select to open dropdown
  await page.locator('button:has-text("SOUL.md")').click();
  await page.waitForTimeout(500);
  
  // Take screenshot of dropdown
  await page.screenshot({ path: 'verify-notes-dropdown.png', fullPage: true });
  
  // Count options
  const soulMd = await page.locator('text=SOUL.md').count();
  const agentsMd = await page.locator('text=AGENTS.md').count();
  const visionMd = await page.locator('text=VISION.md').count();
  const toolsMd = await page.locator('text=TOOLS.md').count();
  
  console.log('SOUL.md:', soulMd);
  console.log('AGENTS.md:', agentsMd);
  console.log('VISION.md:', visionMd);
  console.log('TOOLS.md:', toolsMd);
});
