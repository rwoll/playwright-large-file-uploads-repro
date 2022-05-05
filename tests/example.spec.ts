import { test } from '@playwright/test';

test('uploads', async ({ page }) => {
  await page.goto("/form");
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator('text=File').click(),
  ]);
  await fileChooser.setFiles('./package.json');
  await page.locator('css=input[type=submit]').click();
});
