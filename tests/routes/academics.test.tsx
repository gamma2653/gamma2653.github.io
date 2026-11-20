import { expect, test, describe } from '@rstest/core';
import { render, screen, within } from '@testing-library/react';
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { routeTree } from '../../src/routeTree.gen';
import { projectsByCategory } from '../../src/data/projects';

function renderRoute(path: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  // @ts-expect-error - test router vs registered router type mismatch
  return render(<RouterProvider router={router} />);
}

/** The page's <main>, so assertions cannot collide with nav text. */
async function renderMain(path: string) {
  renderRoute(path);
  return within(await screen.findByRole('main'));
}

const CATEGORY_PROJECTS = projectsByCategory('academics');

describe('Academics Route (/academics)', () => {
  test('renders Academic & Research Projects heading', async () => {
    const main = await renderMain('/academics');
    expect(
      main.getByRole('heading', { level: 1, name: 'Academic & Research Projects' }),
    ).toBeInTheDocument();
  });

  test('renders every academics project title as a heading', async () => {
    const main = await renderMain('/academics');
    expect(CATEGORY_PROJECTS.length).toBeGreaterThan(0);
    for (const project of CATEGORY_PROJECTS) {
      expect(main.getByRole('heading', { level: 3, name: project.title })).toBeInTheDocument();
    }
  });

  test('renders one article per academics project', async () => {
    const main = await renderMain('/academics');
    expect(main.getAllByRole('article')).toHaveLength(CATEGORY_PROJECTS.length);
  });

  test('links the B.A.B.Y. Lab card to the lab website', async () => {
    const main = await renderMain('/academics');
    expect(main.getByRole('link', { name: 'Lab website' })).toHaveAttribute(
      'href',
      'https://babylab.cornell.edu',
    );
  });

  test('renders footer', async () => {
    renderRoute('/academics');
    expect(await screen.findByText(/All rights reserved/)).toBeInTheDocument();
  });
});
