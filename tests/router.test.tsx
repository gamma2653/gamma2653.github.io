import { afterEach, beforeEach, expect, test, describe } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { RouterProvider } from '@tanstack/react-router';
import { createAppRouter } from '../src/router';

beforeEach(() => {
  // jsdom does not implement scrollTo, which scroll restoration calls.
  window.scrollTo = () => {};
});

afterEach(() => {
  window.location.hash = '';
});

describe('createAppRouter', () => {
  test('resolves the initial route from the URL hash', async () => {
    window.location.hash = '#/about';
    const router = createAppRouter();
    render(<RouterProvider router={router} />);

    expect(await screen.findByText('About Me')).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/about');
  });

  test('builds hash-based hrefs', () => {
    expect(createAppRouter().history.createHref('/contact')).toContain(
      '#/contact',
    );
  });
});
