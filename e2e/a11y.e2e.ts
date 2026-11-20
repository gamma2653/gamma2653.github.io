import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { PAGES, url } from './pages';

// Reveal and page-in animations are skipped under reduced motion, so axe
// measures the final colours instead of a half-faded frame.
test.use({ reducedMotion: 'reduce' });

for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`accessibility (${colorScheme})`, () => {
    test.use({ colorScheme });

    for (const { path } of PAGES) {
      test(`${path} has no WCAG 2.1 A/AA violations`, async ({ page }) => {
        await page.goto(url(path));
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        const { violations } = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();
        expect(
          violations.map(({ id, help, nodes }) => ({ id, help, targets: nodes.map((node) => node.target.join(' ')) })),
        ).toEqual([]);
      });
    }

    test('keyboard focus is visible', async ({ page, isMobile }) => {
      test.skip(isMobile, 'keyboard focus is checked on desktop');
      await page.goto(url('/'));
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      // Tab through the nav: every stop must show a focus outline.
      for (const name of ['Christopher De Jesus', 'About', 'Projects']) {
        await page.keyboard.press('Tab');
        const focused = await page.evaluate(() => {
          const element = document.activeElement as HTMLElement;
          return { text: element.textContent?.trim(), outline: getComputedStyle(element).outlineStyle };
        });
        expect(focused).toEqual({ text: name, outline: 'solid' });
      }
    });
  });
}
