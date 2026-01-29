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

describe('Index Route (/)', () => {
  test('renders the home page with Software banner text', async () => {
    renderRoute('/');
    expect(await screen.findByText('Software')).toBeInTheDocument();
  });

  test('renders the Robotics banner text', async () => {
    renderRoute('/');
    expect(await screen.findByText('Robotics')).toBeInTheDocument();
  });

  test('renders the Academics banner text', async () => {
    renderRoute('/');
    expect(await screen.findByText('Academics')).toBeInTheDocument();
  });

  test('renders the paragraph about information processing', async () => {
    renderRoute('/');
    expect(
      await screen.findByText(/computational irreducibility/),
    ).toBeInTheDocument();
  });
});
