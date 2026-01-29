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

describe('Academics Route (/academics)', () => {
  test('renders Academic & Research Projects heading', async () => {
    renderRoute('/academics');
    expect(
      await screen.findByRole('heading', { name: /Academic & Research Projects/ }),
    ).toBeInTheDocument();
  });

  test('renders Odor Sampling Model project', async () => {
    renderRoute('/academics');
    expect(await screen.findByText(/Odor Sampling Model/)).toBeInTheDocument();
  });

  test('renders Cornell B.A.B.Y. Lab section', async () => {
    renderRoute('/academics');
    const matches = await screen.findAllByText(/Cornell B\.A\.B\.Y\. Lab/);
    expect(matches.length).toBeGreaterThan(0);
  });

  test('renders footer', async () => {
    renderRoute('/academics');
    expect(await screen.findByText(/All rights reserved/)).toBeInTheDocument();
  });
});
