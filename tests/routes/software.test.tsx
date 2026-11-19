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

const CATEGORY_PROJECTS = projectsByCategory('software');

describe('Software Route (/software)', () => {
  test('renders Software heading', async () => {
    const main = await renderMain('/software');
    expect(main.getByRole('heading', { level: 1, name: 'Software' })).toBeInTheDocument();
  });

  test('renders every software project title as a heading', async () => {
    const main = await renderMain('/software');
    expect(CATEGORY_PROJECTS.length).toBeGreaterThan(0);
    for (const project of CATEGORY_PROJECTS) {
      expect(main.getByRole('heading', { level: 3, name: project.title })).toBeInTheDocument();
    }
  });

  test('renders one article per software project', async () => {
    const main = await renderMain('/software');
    expect(main.getAllByRole('article')).toHaveLength(CATEGORY_PROJECTS.length);
  });

  test('renders the projects new to the site', async () => {
    const main = await renderMain('/software');
    expect(main.getByRole('heading', { name: 'OpenVChange' })).toBeInTheDocument();
    expect(main.getByRole('heading', { name: 'GammaPluginTk' })).toBeInTheDocument();
  });

  test('does not state a project count or number the projects', async () => {
    const main = await renderMain('/software');
    expect(main.queryByText(/three personal projects/)).not.toBeInTheDocument();
    expect(main.queryByRole('heading', { name: /^\d+\./ })).not.toBeInTheDocument();
  });

  test('links project titles to their repositories', async () => {
    const main = await renderMain('/software');
    expect(main.getByRole('link', { name: 'Campaign Master' })).toHaveAttribute(
      'href',
      'https://github.com/gamma2653/CampaignMaster',
    );
  });

  test('shows technology chips and screenshots on the cards', async () => {
    const main = await renderMain('/software');
    expect(main.getAllByRole('list', { name: 'Technologies' })).toHaveLength(CATEGORY_PROJECTS.length);
    expect(main.getByAltText('Campaign Master screenshot 1')).toHaveAttribute('loading', 'lazy');
  });
});
