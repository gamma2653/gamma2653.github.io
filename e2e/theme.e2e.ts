import { expect, test } from '@playwright/test';
import { url } from './pages';

test.describe('theme', () => {
  test('follows the OS preference until toggled', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto(url('/'));
    await expect(page.locator('html')).toHaveClass(/dark/);

    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });

  test('the toggle switches the theme and the choice survives a refresh', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto(url('/about'));
    await page.getByRole('button', { name: 'Switch to dark theme' }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.getByRole('button', { name: 'Switch to light theme' })).toBeVisible();

    await page.reload();
    await expect(page.locator('html')).toHaveClass(/dark/);

    // An explicit choice wins over the OS.
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});

test.describe('print', () => {
  test('the About page prints the resume without site chrome', async ({ page }) => {
    await page.goto(url('/about'));
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('#resume')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Main' })).toBeHidden();
    await expect(page.getByRole('contentinfo')).toBeHidden();
  });
});
