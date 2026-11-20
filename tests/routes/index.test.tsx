import { expect, test, describe } from '@rstest/core';
import { render, screen, within } from '@testing-library/react';
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { routeTree } from '../../src/routeTree.gen';
import { caseStudies } from '../../src/data/case-studies';

function renderRoute(path: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  // @ts-expect-error - test router vs registered router type mismatch
  return render(<RouterProvider router={router} />);
}

/** Renders / and returns queries scoped to <main> (the nav is excluded). */
async function renderHome() {
  const view = renderRoute('/');
  await screen.findByRole('heading', { level: 1, name: 'Christopher De Jesus' });
  const mainElement = screen.getByRole('main');
  return { ...view, mainElement, main: within(mainElement) };
}

/** The <section> labelled by the heading with this name. */
function sectionOf(main: ReturnType<typeof within>, name: string) {
  return within(main.getByRole('region', { name }));
}

describe('Index Route (/)', () => {
  test('the hero has the name as the only level-1 heading and the pitch', async () => {
    const { main } = await renderHome();
    const headings = main.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Christopher De Jesus');

    const hero = sectionOf(main, 'Christopher De Jesus');
    expect(
      hero.getByText('Software engineer at the intersection of cognition and computation.'),
    ).toBeInTheDocument();
    expect(hero.getByText(/^Currently at Tagup/)).toBeInTheDocument();
  });

  test('the hero links to Projects, Contact, the resume and the public profiles', async () => {
    const { main } = await renderHome();
    const hero = sectionOf(main, 'Christopher De Jesus');
    expect(hero.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/software');
    expect(hero.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
    expect(hero.getByRole('link', { name: 'Resume' })).toHaveAttribute('href', '/about');
    expect(hero.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/gamma2653');
    expect(hero.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/cdejesus26/',
    );
  });

  test('the hero photo loads eagerly with explicit dimensions', async () => {
    const { main } = await renderHome();
    const hero = sectionOf(main, 'Christopher De Jesus');
    const photo = hero.getByAltText('Christopher De Jesus hiking at Buttermilk Falls');
    expect(photo).toHaveAttribute('loading', 'eager');
    expect(photo).toHaveAttribute('width');
    expect(photo).toHaveAttribute('height');
  });

  test('features the three case studies', async () => {
    const { main } = await renderHome();
    expect(main.getByRole('heading', { level: 2, name: 'Featured projects' })).toBeInTheDocument();
    const featured = sectionOf(main, 'Featured projects');
    const articles = featured.getAllByRole('article');
    expect(articles).toHaveLength(3);
    expect(caseStudies).toHaveLength(3);
    caseStudies.forEach((study, index) => {
      expect(within(articles[index]).getByRole('heading', { level: 3, name: study.title })).toBeInTheDocument();
    });
  });

  test('links to the three category pages under Browse by area', async () => {
    const { main } = await renderHome();
    expect(main.getByRole('heading', { level: 2, name: 'Browse by area' })).toBeInTheDocument();
    const areas = sectionOf(main, 'Browse by area');
    const links = areas.getAllByRole('link');
    expect(links.map((link) => link.getAttribute('href'))).toEqual(['/software', '/robotics', '/academics']);
    for (const label of ['Software', 'Robotics', 'Academics']) {
      expect(areas.getByRole('heading', { level: 3, name: label })).toBeInTheDocument();
    }
  });

  test('no longer carries the essay or the sign-off paragraph', async () => {
    const { mainElement } = await renderHome();
    expect(mainElement).not.toHaveTextContent(/computational irreducibility/);
    expect(mainElement).not.toHaveTextContent(/Thanks for taking the time/);
  });
});
