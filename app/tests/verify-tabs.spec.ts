import { test } from '@playwright/test';

test('verify agent detail tabs', async ({ page }) => {
  await page.goto('http://localhost:3004/agents/main/defense');
  await page.waitForTimeout(3000);
  
  // Take screenshot
  await page.screenshot({ path: 'verify-tabs.png', fullPage: true });
  
  // Check tabs
  const infoTab = await page.locator('text=Info').count();
  const notesTab = await page.locator('text=Notes').count();
  
  console.log('Info tab:', infoTab);
  console.log('Notes tab:', notesTab);
  
  // Click Notes tab
  if (notesTab > 0) {
    await page.locator('text=Notes').click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'verify-tabs-notes.png', fullPage: true });
    
    // Check for MD files
    const soulMd = await page.locator('text=SOUL.md').count();
    const visionMd = await page.locator('text=VISION.md').count();
    
    console.log('SOUL.md visible:', soulMd);
    console.log('VISION.md visible:', visionMd);
  }
});
