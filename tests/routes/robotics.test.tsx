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

describe('Robotics Route (/robotics)', () => {
  test('renders Robotics heading', async () => {
    renderRoute('/robotics');
    expect(await screen.findByRole('heading', { name: 'Robotics' })).toBeInTheDocument();
  });

  test('renders aRoboticsCompany section', async () => {
    renderRoute('/robotics');
    expect(await screen.findByText('aRoboticsCompany')).toBeInTheDocument();
  });

  test('renders C1C0 Scheduler project', async () => {
    renderRoute('/robotics');
    const matches = await screen.findAllByText(/C1C0 Scheduler/);
    expect(matches.length).toBeGreaterThan(0);
  });

  test('renders R2 Object Detection project', async () => {
    renderRoute('/robotics');
    const matches = await screen.findAllByText(/R2 Object Detection/);
    expect(matches.length).toBeGreaterThan(0);
  });

  test('renders Phone-Controlled Robot Arm project', async () => {
    renderRoute('/robotics');
    expect(await screen.findByText(/Phone-Controlled Robot Arm/)).toBeInTheDocument();
  });
});
