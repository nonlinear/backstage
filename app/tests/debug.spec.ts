import { test, expect } from '@playwright/test';

test('debug agents page', async ({ page }) => {
  // Navigate
  await page.goto('http://localhost:3002/agents');
  
  // Wait a bit
  await page.waitForTimeout(5000);
  
  // Take screenshot
  await page.screenshot({ 
    path: 'debug-agents.png', 
    fullPage: true 
  });
  
  // Get page content
  const html = await page.content();
  console.log('Page HTML length:', html.length);
  
  // Check what's visible
  const loadingText = await page.locator('text=Loading').count();
  const agentsText = await page.locator('text=Agents').count();
  
  console.log('Loading count:', loadingText);
  console.log('Agents count:', agentsText);
});

test('debug agent detail', async ({ page }) => {
  await page.goto('http://localhost:3002/agents/main/defense');
  await page.waitForTimeout(5000);
  
  await page.screenshot({ 
    path: 'debug-agent-detail.png', 
    fullPage: true 
  });
  
  const html = await page.content();
  console.log('Detail page HTML length:', html.length);
  
  const loadingText = await page.locator('text=Loading').count();
  const defenseText = await page.locator('text=Defense').count();
  
  console.log('Loading count:', loadingText);
  console.log('Defense count:', defenseText);
});
