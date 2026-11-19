import { expect, test, describe } from '@rstest/core';
import { SITE, pageTitle } from '../../src/lib/site';

describe('pageTitle', () => {
  test('returns the site title when no page is given', () => {
    expect(pageTitle()).toBe(SITE.title);
    expect(pageTitle('')).toBe(SITE.title);
  });

  test('prefixes the page name to the site name', () => {
    expect(pageTitle('About')).toBe('About | Christopher De Jesus');
    expect(pageTitle('Academics & Research')).toBe(
      `Academics & Research | ${SITE.name}`,
    );
  });
});

describe('SITE', () => {
  test('og image is an absolute URL under the site URL', () => {
    expect(SITE.ogImage.startsWith(`${SITE.url}/`)).toBe(true);
  });
});
