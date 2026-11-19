import { expect, test, describe } from '@rstest/core';
import { render, screen, within } from '@testing-library/react';
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { routeTree } from '../../src/routeTree.gen';
import { caseStudiesByCategory, caseStudyProjectIds } from '../../src/data/case-studies';
import { standardProjects } from '../../src/data/projects';

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

const STUDIES = caseStudiesByCategory('robotics');
const GRID_PROJECTS = standardProjects('robotics', caseStudyProjectIds('robotics'));

describe('Robotics Route (/robotics)', () => {
  test('renders Robotics heading', async () => {
    const main = await renderMain('/robotics');
    expect(main.getByRole('heading', { level: 1, name: 'Robotics' })).toBeInTheDocument();
  });

  test('orders the sections: case study, employer block, remaining projects', async () => {
    const main = await renderMain('/robotics');
    const sections = main.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent);
    expect(sections).toEqual(['Featured', 'aRoboticsCompany', 'More projects']);
  });

  test('opens with the C1C0 case study', async () => {
    const main = await renderMain('/robotics');
    expect(STUDIES.map((study) => study.id)).toEqual(['c1c0']);

    const article = main.getAllByRole('article')[0];
    expect(within(article).getByRole('heading', { level: 3, name: 'C1C0 lab-assistant robot' })).toBeInTheDocument();
    expect(within(article).getByText('Cornell Cup Robotics · 2020 - 2023')).toBeInTheDocument();
    const terms = [...article.querySelectorAll('dt')].map((dt) => dt.textContent);
    expect(terms).toEqual(['Problem', 'What I built', 'Outcome']);
    expect(within(article).getByText(/from 200 ms to 100 ms per frame/)).toBeInTheDocument();
    expect(within(article).getByText(/80-90% accuracy/)).toBeInTheDocument();
  });

  test('links the case study to the three repositories and the team page', async () => {
    const main = await renderMain('/robotics');
    const article = within(main.getAllByRole('article')[0]);
    const expected: Array<[string, string]> = [
      ['C1C0 Scheduler repository', 'https://github.com/cornell-cup/c1c0-scheduler'],
      ['R2 Object Detection repository', 'https://github.com/cornell-cup/r2-object_detection'],
      ['C1C0 Facial Recognition repository', 'https://github.com/cornell-cup/c1c0-facial-recognition'],
      ['C1C0 at Cornell Cup Robotics', 'https://www.cornellcuprobotics.com/projects/c1c0'],
    ];
    for (const [name, href] of expected) {
      const link = article.getByRole('link', { name });
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
    }
  });

  test('does not repeat the covered projects as grid cards', async () => {
    const main = await renderMain('/robotics');
    expect(GRID_PROJECTS.map((project) => project.id)).toEqual(['c1c0-sounds', 'phone-controlled-robot']);
    expect(main.getAllByRole('article')).toHaveLength(STUDIES.length + GRID_PROJECTS.length);
    for (const project of GRID_PROJECTS) {
      expect(main.getByRole('heading', { level: 3, name: project.title })).toBeInTheDocument();
    }
    for (const title of ['C1C0 Scheduler', 'R2 Object Detection', 'C1C0 Facial Recognition']) {
      expect(main.queryByRole('heading', { name: title })).not.toBeInTheDocument();
    }
  });

  test('renders the aRoboticsCompany block with its logo, link and disclaimer', async () => {
    const main = await renderMain('/robotics');
    expect(main.getByRole('heading', { level: 2, name: 'aRoboticsCompany' })).toBeInTheDocument();
    expect(main.getByAltText('aRoboticsCompany logo')).toHaveAttribute('loading', 'lazy');
    expect(main.getByRole('link', { name: /aRoboticsCompany/ })).toHaveAttribute(
      'href',
      'https://www.aroboticscompany.com/',
    );
    expect(main.getByText('Focus: Civil Inspection Robotics')).toBeInTheDocument();
    expect(main.getByText(/CAN bus communication systems/)).toBeInTheDocument();
    expect(
      main.getByText('Disclaimer: This website and its content are not endorsed by nor affiliated with aRoboticsCompany.'),
    ).toBeInTheDocument();
  });
});
