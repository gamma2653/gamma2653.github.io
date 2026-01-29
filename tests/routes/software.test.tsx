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

describe('Software Route (/software)', () => {
  test('renders Software heading', async () => {
    renderRoute('/software');
    expect(await screen.findByRole('heading', { name: 'Software' })).toBeInTheDocument();
  });

  test('renders Campaign Master project', async () => {
    renderRoute('/software');
    const matches = await screen.findAllByText(/Campaign Master/);
    expect(matches.length).toBeGreaterThan(0);
  });

  test('renders Habitica-Resync project', async () => {
    renderRoute('/software');
    const matches = await screen.findAllByText(/Habitica-Resync/);
    expect(matches.length).toBeGreaterThan(0);
  });

  test('renders Magiteknician project', async () => {
    renderRoute('/software');
    const matches = await screen.findAllByText(/Magiteknician/);
    expect(matches.length).toBeGreaterThan(0);
  });

  test('renders StoryBoardWorkshop project', async () => {
    renderRoute('/software');
    const matches = await screen.findAllByText(/StoryBoardWorkshop/);
    expect(matches.length).toBeGreaterThan(0);
  });

  test('renders BlockHider project', async () => {
    renderRoute('/software');
    const matches = await screen.findAllByText(/BlockHider/);
    expect(matches.length).toBeGreaterThan(0);
  });
});
