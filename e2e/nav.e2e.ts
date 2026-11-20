import { expect, test } from '@playwright/test';
import { url } from './pages';

test.describe('navigation', () => {
  test('the bar links navigate and mark the current page', async ({ page, isMobile }) => {
    test.skip(isMobile, 'the horizontal bar is hidden below md');
    await page.goto(url('/'));
    const nav = page.getByRole('navigation', { name: 'Main' });

    await nav.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/#\/about$/);
    await expect(nav.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');

    await nav.getByRole('button', { name: 'Projects' }).click();
    await nav.getByRole('link', { name: 'Robotics' }).click();
    await expect(page).toHaveURL(/#\/robotics$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Robotics' })).toBeVisible();
    // The popover closes after choosing a page.
    await expect(nav.getByRole('link', { name: 'Software' })).toBeHidden();

    await nav.getByRole('link', { name: 'Christopher De Jesus' }).click();
    await expect(page).toHaveURL(/#\/$/);
  });

  test('the menu button opens the links on small screens', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'the menu button only exists below md');
    await page.goto(url('/'));
    const nav = page.getByRole('navigation', { name: 'Main' });
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeHidden();

    await nav.getByRole('button', { name: 'Open main menu' }).click();
    await nav.getByRole('link', { name: 'Software' }).click();
    await expect(page).toHaveURL(/#\/software$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Software' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeHidden();
  });

  test('the hero buttons lead to projects and contact', async ({ page }) => {
    await page.goto(url('/'));
    await page.getByRole('main').getByRole('link', { name: 'Contact' }).first().click();
    await expect(page).toHaveURL(/#\/contact$/);
  });

  test('the nav stays in view while scrolling', async ({ page }) => {
    await page.goto(url('/software'));
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByRole('navigation', { name: 'Main' })).toBeInViewport();
  });
});
