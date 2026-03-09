import { test } from '@playwright/test';

test('verify values tabs and used-in content', async ({ page }) => {
  // Go to values page
  await page.goto('http://localhost:3004/values');
  await page.waitForTimeout(2000);
  
  // Screenshot: values page loaded
  await page.screenshot({ 
    path: 'verify-values-1-page-loaded.png', 
    fullPage: true 
  });
  
  // Click first value card to expand
  await page.click('.cursor-pointer');
  await page.waitForTimeout(1000);
  
  // Screenshot: expanded card
  await page.screenshot({ 
    path: 'verify-values-2-expanded.png', 
    fullPage: true 
  });
  
  // Check if tabs exist
  const tabsExist = await page.locator('button:has-text("Used in")').count();
  console.log('Tabs "Used in" found:', tabsExist);
  
  const notesTabExists = await page.locator('button:has-text("Notes")').count();
  console.log('Tabs "Notes" found:', notesTabExists);
  
  // Click "Used in" tab (if exists)
  if (tabsExist > 0) {
    await page.click('button:has-text("Used in")');
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'verify-values-3-used-in-tab.png', 
      fullPage: true 
    });
  }
  
  // Check for scope badges
  const globalBadge = await page.locator('text=Global').count();
  const projectsLabel = await page.locator('text=Projects:').count();
  const squadsLabel = await page.locator('text=Squads:').count();
  const agentsLabel = await page.locator('text=Agents:').count();
  
  console.log('Global badge:', globalBadge);
  console.log('Projects label:', projectsLabel);
  console.log('Squads label:', squadsLabel);
  console.log('Agents label:', agentsLabel);
});
