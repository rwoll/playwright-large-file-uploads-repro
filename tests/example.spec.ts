import { expect, test } from '@playwright/test';

test('uploads', async ({ page }) => {
  await page.goto("/form");
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator('text=File').click(),
  ]);
  await fileChooser.setFiles('./large_file');
  const [resp] = await Promise.all([
    page.waitForEvent('response'),
    page.locator('css=input[type=submit]').click(),
  ]);

  const { size } = await resp.json();

  expect(size).toBe(64000000);
});
