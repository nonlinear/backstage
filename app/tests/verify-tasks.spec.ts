import { test } from '@playwright/test';

test('capture librarian epic tasks UI + console logs', async ({ page }) => {
  // Capture console logs
  const consoleLogs: string[] = [];
  page.on('console', msg => {
    consoleLogs.push(msg.text());
  });
  
  await page.goto('http://localhost:3004/projects/librarian');
  
  // Wait for page to load
  await page.waitForTimeout(2000);
  
  // Find epic v0.22.0 card and click to expand
  const epicCard = page.locator('text=v0.22.0').first();
  await epicCard.click();
  await page.waitForTimeout(1000);
  
  // Screenshot after expansion
  await page.screenshot({ 
    path: 'epic-v0.22.0-expanded.png', 
    fullPage: true 
  });
  
  // Print captured console logs
  console.log('\n=== CAPTURED CONSOLE LOGS ===');
  consoleLogs.forEach(log => console.log(log));
  console.log('=== END CONSOLE LOGS ===\n');
});
