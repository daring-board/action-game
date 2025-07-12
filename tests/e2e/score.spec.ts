
import { test, expect } from '@playwright/test';

test('score should increase over time', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const initialScore = await page.textContent('div:has-text("Score:")');
  expect(initialScore).toBe('Score: 0');

  await page.waitForTimeout(2000);

  const scoreAfterTime = await page.textContent('div:has-text("Score:")');
  expect(scoreAfterTime).not.toBe('Score: 0');
});
