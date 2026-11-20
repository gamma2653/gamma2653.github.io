import { expect, test, type Page } from '@playwright/test';
import { PAGES, url } from './pages';

/** Collects everything a healthy page must not produce while it loads. */
function watchForProblems(page: Page): string[] {
  const problems: string[] = [];
  page.on('pageerror', (error) => problems.push(`uncaught: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') problems.push(`console: ${message.text()}`);
  });
  page.on('requestfailed', (request) => problems.push(`failed: ${request.url()}`));
  page.on('response', (response) => {
    if (response.status() >= 400) problems.push(`${response.status()}: ${response.url()}`);
  });
  return problems;
}

for (const { path, title, heading } of PAGES) {
  test.describe(`route ${path}`, () => {
    test('loads from a deep link with its title and heading, without errors', async ({ page }) => {
      const problems = watchForProblems(page);
      await page.goto(url(path));
      await expect(page).toHaveTitle(title);
      await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
      await page.waitForLoadState('networkidle');
      expect(problems).toEqual([]);
    });

    test('survives a refresh', async ({ page }) => {
      await page.goto(url(path));
      await page.reload();
      await expect(page).toHaveTitle(title);
      await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
    });

    test('every image loads', async ({ page }) => {
      await page.goto(url(path));
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      for (const image of await page.locator('img:visible').all()) {
        // Below-the-fold images are lazy: bring each one into view first.
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0), {
            message: `image ${await image.getAttribute('src')} did not load`,
          })
          .toBe(true);
      }
    });

    test('has no horizontal overflow', async ({ page }) => {
      await page.goto(url(path));
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test('external links open in a new tab without leaking the opener', async ({ page }) => {
      await page.goto(url(path));
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      for (const link of await page.locator('a[href^="http"]').all()) {
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', /noopener/);
      }
    });
  });
}

test('internal links never point at a server path', async ({ page }) => {
  // GitHub Pages only serves index.html at the root: a raw href="/about" would 404.
  for (const { path } of PAGES) {
    await page.goto(url(path));
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((links) => links.map((a) => a.getAttribute('href')));
    expect(hrefs.filter((href) => !href?.startsWith('/#/'))).toEqual([]);
  }
});

test('Back and Forward move between pages', async ({ page }) => {
  await page.goto(url('/'));
  await page.goto(url('/about'));
  await page.goto(url('/contact'));
  await page.goBack();
  await expect(page).toHaveTitle('About | Christopher De Jesus');
  await page.goBack();
  await expect(page).toHaveTitle('Christopher De Jesus | Software Engineer');
  await page.goForward();
  await expect(page.getByRole('heading', { level: 1, name: 'About Me' })).toBeVisible();
});
