
import { test, expect } from '@playwright/test';

test('score should increase over time', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const initialScore = await page.textContent('div:has-text("Score:")');
  expect(initialScore).toBe('Score: 0');

  await page.waitForFunction(async (initialScoreText) => {
    const scoreElement = Array.from(document.querySelectorAll('div')).find(el => el.textContent?.startsWith('Score:'));
    return scoreElement && scoreElement.textContent !== initialScoreText;
  }, initialScore);
});
