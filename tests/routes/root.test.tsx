import { expect, test, describe } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { routeTree } from '../../src/routeTree.gen';

function renderRoute(path: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  // @ts-expect-error - test router vs registered router type mismatch
  return render(<RouterProvider router={router} />);
}

describe('Root layout', () => {
  test('does not render the router devtools', async () => {
    renderRoute('/contact');
    await screen.findByRole('heading', { name: /Get in Touch/ });
    expect(screen.queryByLabelText(/TanStack Router Devtools/i)).toBeNull();
  });

  test('does not render a stale /favicon.png icon link', async () => {
    renderRoute('/contact');
    await screen.findByRole('heading', { name: /Get in Touch/ });
    expect(
      document.querySelector('link[rel="icon"][href="/favicon.png"]'),
    ).toBeNull();
  });
});
