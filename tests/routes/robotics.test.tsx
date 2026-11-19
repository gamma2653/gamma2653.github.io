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

const CATEGORY_PROJECTS = projectsByCategory('robotics');

describe('Robotics Route (/robotics)', () => {
  test('renders Robotics heading', async () => {
    const main = await renderMain('/robotics');
    expect(main.getByRole('heading', { level: 1, name: 'Robotics' })).toBeInTheDocument();
  });

  test('renders every robotics project title as a heading', async () => {
    const main = await renderMain('/robotics');
    expect(CATEGORY_PROJECTS.length).toBeGreaterThan(0);
    for (const project of CATEGORY_PROJECTS) {
      expect(main.getByRole('heading', { level: 3, name: project.title })).toBeInTheDocument();
    }
  });

  test('renders one article per robotics project', async () => {
    const main = await renderMain('/robotics');
    expect(main.getAllByRole('article')).toHaveLength(CATEGORY_PROJECTS.length);
  });

  test('renders the aRoboticsCompany block with its logo, link and disclaimer', async () => {
    const main = await renderMain('/robotics');
    expect(main.getByRole('heading', { level: 2, name: 'aRoboticsCompany' })).toBeInTheDocument();
    expect(main.getByAltText('aRoboticsCompany logo')).toHaveAttribute('loading', 'lazy');
    expect(main.getByRole('link', { name: /aRoboticsCompany/ })).toHaveAttribute(
      'href',
      'https://www.aroboticscompany.com/',
    );
    expect(
      main.getByText('Disclaimer: This website and its content are not endorsed by nor affiliated with aRoboticsCompany.'),
    ).toBeInTheDocument();
  });

  test('separates the employer block from the project grid with a heading', async () => {
    const main = await renderMain('/robotics');
    expect(main.getAllByRole('heading', { level: 2 })).toHaveLength(2);
  });

  test('shows the Cornell Cup Robotics org on its projects', async () => {
    const main = await renderMain('/robotics');
    const withOrg = CATEGORY_PROJECTS.filter((project) => project.org === 'Cornell Cup Robotics');
    expect(withOrg).toHaveLength(3);
    expect(main.getAllByText(/^Cornell Cup Robotics ·/)).toHaveLength(3);
  });
});
