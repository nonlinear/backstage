import { test } from '@playwright/test';

test('verify research-exchange project page', async ({ page }) => {
  await page.goto('http://localhost:3004/projects/research-exchange');
  
  // Wait for page load
  await page.waitForTimeout(2000);
  
  // Screenshot
  await page.screenshot({ 
    path: 'research-exchange-verification.png', 
    fullPage: true 
  });
  
  // Check what's visible
  const title = await page.title();
  const h1Count = await page.locator('h1').count();
  const epicCount = await page.locator('[data-epic]').count();
  
  console.log('Title:', title);
  console.log('H1 count:', h1Count);
  console.log('Epic count:', epicCount);
  
  // Get all text content
  const bodyText = await page.locator('body').textContent();
  console.log('Page contains "flagship":', bodyText?.includes('flagship'));
  console.log('Page contains "Research Exchange":', bodyText?.includes('Research Exchange'));
  console.log('Page contains "tier":', bodyText?.includes('tier'));
});
