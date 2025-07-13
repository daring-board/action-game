import { test, expect } from '@playwright/test';

test('ゲームの表示とタイトルを確認', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // ページタイトルが正しいことを確認
  await expect(page).toHaveTitle('Next.js Action Game');

  // ゲームコンポーネントが表示されていることを確認
  await expect(page.locator('.relative.overflow-hidden.bg-gray-100')).toBeVisible();

  // プレイヤーが表示されていることを確認
  await expect(page.locator('.absolute.bg-blue-500')).toBeVisible();

  // ゲームオーバーのテキストが表示されていないことを確認
  await expect(page.locator('text=Game Over')).not.toBeVisible();
});

test('ゲームオーバー後にリスタートできることを確認', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // ゲームオーバーになるまで待機 (ここでは十分な時間を設定)
  await page.waitForSelector('text=Game Over', { timeout: 10000 });

  // リスタートボタンをクリック
  await page.click('button:has-text("Restart")');

  // ゲームオーバーのテキストが非表示になっていることを確認
  await expect(page.locator('text=Game Over')).not.toBeVisible();

  // スコアがリセットされていることを確認
  const score = await page.textContent('div:has-text("Score:")');
  expect(score).toBe('Score: 0');
});
