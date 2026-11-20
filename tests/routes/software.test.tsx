import { expect, test, describe } from '@rstest/core';
import { render, screen, within } from '@testing-library/react';
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { routeTree } from '../../src/routeTree.gen';
import { caseStudiesByCategory, caseStudyProjectIds } from '../../src/data/case-studies';
import { earlierProjects, standardProjects } from '../../src/data/projects';

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

const STUDIES = caseStudiesByCategory('software');
const GRID_PROJECTS = standardProjects('software', caseStudyProjectIds('software'));
const EARLIER = earlierProjects('software');

/** The <article> whose h3 is `title`. */
function articleFor(main: ReturnType<typeof within>, title: string) {
  const article = main.getByRole('heading', { level: 3, name: title }).closest('article');
  expect(article).not.toBeNull();
  return article as HTMLElement;
}

describe('Software Route (/software)', () => {
  test('renders Software heading', async () => {
    const main = await renderMain('/software');
    expect(main.getByRole('heading', { level: 1, name: 'Software' })).toBeInTheDocument();
  });

  test('orders the sections: Featured, More projects, Earlier work', async () => {
    const main = await renderMain('/software');
    const sections = main.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent);
    expect(sections).toEqual(['Featured', 'More projects', 'Earlier work']);
  });

  test('opens with Campaign Master and Habitica-Resync as case studies', async () => {
    const main = await renderMain('/software');
    expect(STUDIES.map((study) => study.title)).toEqual(['Campaign Master', 'Habitica-Resync']);

    const articles = main.getAllByRole('article');
    STUDIES.forEach((study, index) => {
      const article = articleFor(main, study.title);
      expect(articles[index]).toBe(article);
      const terms = [...article.querySelectorAll('dt')].map((dt) => dt.textContent);
      expect(terms).toEqual(['Problem', 'What I built', 'Outcome']);
      expect(within(article).getByText(study.problem)).toBeInTheDocument();
      expect(within(article).getByText(study.built)).toBeInTheDocument();
      expect(within(article).getByText(study.outcome)).toBeInTheDocument();
    });
  });

  test('renders one article per case study and per remaining project, with no duplicates', async () => {
    const main = await renderMain('/software');
    expect(GRID_PROJECTS.length).toBeGreaterThan(0);
    expect(main.getAllByRole('article')).toHaveLength(STUDIES.length + GRID_PROJECTS.length);
    for (const project of GRID_PROJECTS) {
      expect(main.getByRole('heading', { level: 3, name: project.title })).toBeInTheDocument();
    }
    // Covered projects appear once, as the case study, and not again as a grid card.
    for (const title of ['Campaign Master', 'Habitica-Resync']) {
      expect(main.getAllByRole('heading', { name: title })).toHaveLength(1);
      expect(within(articleFor(main, title)).queryByTestId('project-thumbnail-placeholder')).not.toBeInTheDocument();
    }
    expect(main.queryByRole('link', { name: 'Campaign Master' })).not.toBeInTheDocument();
  });

  test('renders the projects new to the site', async () => {
    const main = await renderMain('/software');
    expect(main.getByRole('heading', { name: 'OpenVChange' })).toBeInTheDocument();
    expect(main.getByRole('heading', { name: 'GammaPluginTk' })).toBeInTheDocument();
  });

  test('lists StoryBoardWorkshop and BlockHider under Earlier work, outside the grid', async () => {
    const main = await renderMain('/software');
    expect(EARLIER.map((project) => project.title)).toEqual(['StoryBoardWorkshop', 'BlockHider']);

    const earlier = main.getByRole('region', { name: 'Earlier work' });
    expect(within(earlier).queryByRole('article')).not.toBeInTheDocument();
    expect(within(earlier).queryByRole('img')).not.toBeInTheDocument();

    for (const project of EARLIER) {
      const links = main.getAllByRole('link', { name: project.title });
      expect(links).toHaveLength(1);
      expect(earlier).toContainElement(links[0]);
      expect(links[0]).toHaveAttribute('href', project.repo);
      expect(links[0].closest('article')).toBeNull();
      expect(main.queryByRole('heading', { level: 3, name: project.title })).not.toBeInTheDocument();
      expect(within(earlier).getByText(project.blurb)).toBeInTheDocument();
    }
  });

  test('puts Earlier work after the project grid', async () => {
    const main = await renderMain('/software');
    const articles = main.getAllByRole('article');
    const earlier = main.getByRole('region', { name: 'Earlier work' });
    expect(
      articles[articles.length - 1].compareDocumentPosition(earlier) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  test('does not state a project count or number the projects', async () => {
    const main = await renderMain('/software');
    expect(main.queryByText(/three personal projects/)).not.toBeInTheDocument();
    expect(main.queryByRole('heading', { name: /^\d+\./ })).not.toBeInTheDocument();
  });

  test('links case studies and grid cards to their repositories', async () => {
    const main = await renderMain('/software');
    expect(main.getByRole('link', { name: 'Campaign Master repository' })).toHaveAttribute(
      'href',
      'https://github.com/gamma2653/CampaignMaster',
    );
    expect(main.getByRole('link', { name: 'OpenVChange' })).toHaveAttribute(
      'href',
      'https://github.com/gamma2653/OpenVChange',
    );
  });

  test('shows technology chips and lazy screenshots', async () => {
    const main = await renderMain('/software');
    expect(main.getAllByRole('list', { name: 'Technologies' })).toHaveLength(STUDIES.length + GRID_PROJECTS.length);
    const screenshots = within(articleFor(main, 'Campaign Master')).getAllByRole('img');
    expect(screenshots).toHaveLength(5);
    for (const screenshot of screenshots) {
      expect(screenshot).toHaveAttribute('loading', 'lazy');
    }
  });
});
