import { test } from '@playwright/test';

test('capture librarian epic tasks UI', async ({ page }) => {
  await page.goto('http://localhost:3004/projects/librarian');
  
  // Wait for page to load
  await page.waitForTimeout(2000);
  
  // Take full page screenshot
  await page.screenshot({ 
    path: 'librarian-tasks-debug.png', 
    fullPage: true 
  });
  
  // Find epic v0.22.0 card and click to expand
  const epicCard = page.locator('text=v0.22.0').first();
  await epicCard.click();
  await page.waitForTimeout(1000);
  
  // Screenshot after expansion
  await page.screenshot({ 
    path: 'epic-v0.22.0-expanded.png', 
    fullPage: true 
  });
  
  // Log task elements to console
  const taskElements = await page.locator('[role="checkbox"]').all();
  console.log(`Found ${taskElements.length} task checkboxes`);
  
  for (let i = 0; i < taskElements.length; i++) {
    const label = await taskElements[i].locator('..').locator('label').textContent();
    console.log(`Task ${i}: "${label}"`);
  }
});
