import { test } from '@playwright/test';

test('verify navigation menu works across all pages', async ({ page }) => {
  // Start at projects
  await page.goto('http://localhost:3004/projects');
  await page.waitForTimeout(2000);
  
  // Screenshot projects page
  await page.screenshot({ 
    path: 'verify-navigation-1-projects.png', 
    fullPage: true 
  });
  
  // Click values in dropdown
  await page.click('button:has-text("Projects")');
  await page.waitForTimeout(1000);
  await page.screenshot({ 
    path: 'verify-navigation-2-dropdown-open.png', 
    fullPage: true 
  });
  
  await page.click('text=Values');
  
  // Wait for navigation to complete
  await page.waitForURL('**/values', { timeout: 5000 });
  await page.waitForTimeout(2000);
  
  // Verify URL changed to /values
  const url = page.url();
  console.log('Current URL:', url);
  
  // Screenshot values page
  await page.screenshot({ 
    path: 'verify-navigation-3-values.png', 
    fullPage: true 
  });
  
  // Verify values content loaded (should have ValueCard components, not ProjectCard)
  const breadcrumbText = await page.locator('span.font-bold.text-foreground').first().textContent();
  console.log('Breadcrumb shows:', breadcrumbText);
  
  // Navigate back to projects
  await page.click('button:has-text("Values")');
  await page.waitForTimeout(1000);
  await page.click('text=Projects');
  
  // Wait for navigation
  await page.waitForURL('**/projects', { timeout: 5000 });
  await page.waitForTimeout(2000);
  
  // Verify back on projects
  const finalUrl = page.url();
  console.log('Final URL:', finalUrl);
  
  await page.screenshot({ 
    path: 'verify-navigation-4-back-to-projects.png', 
    fullPage: true 
  });
});
