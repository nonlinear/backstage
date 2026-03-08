import { test, expect } from '@playwright/test';

test('agents page loads and shows list', async ({ page }) => {
  await page.goto('http://localhost:3004/agents');
  
  // Wait for agents to load
  await page.waitForSelector('[id^="defense"]', { timeout: 10000 });
  
  // Take screenshot
  await page.screenshot({ path: 'agents-page.png', fullPage: true });
  
  // Check agents exist
  const agentCards = await page.locator('.flex-none.w-80').count();
  console.log(`Found ${agentCards} agent cards`);
  
  expect(agentCards).toBeGreaterThan(0);
});

test('agent detail page loads', async ({ page }) => {
  await page.goto('http://localhost:3004/agents/main/defense');
  
  // Wait for page to load (either success or loading state)
  await page.waitForTimeout(3000);
  
  // Take screenshot
  await page.screenshot({ path: 'agent-detail-page.png', fullPage: true });
  
  // Check if showing Loading or actual content
  const loadingText = await page.locator('text=Loading').count();
  const agentName = await page.locator('text=Defense').count();
  
  console.log(`Loading: ${loadingText}, Agent name: ${agentName}`);
});
