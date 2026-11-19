import { expect, test, describe, rstest, afterEach } from '@rstest/core';
import { fireEvent, render, screen, within } from '@testing-library/react';
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { routeTree } from '../../src/routeTree.gen';
import { LINKS } from '../../src/data/links';
import { projects } from '../../src/data/projects';

function renderRoute(path: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  // @ts-expect-error - test router vs registered router type mismatch
  return render(<RouterProvider router={router} />);
}

/** Renders /about and returns queries scoped to <main> (the nav is excluded). */
async function renderAbout() {
  const view = renderRoute('/about');
  await screen.findByRole('heading', { level: 1, name: 'About Me' });
  const mainElement = screen.getByRole('main');
  return { ...view, mainElement, main: within(mainElement) };
}

const originalPrint = window.print;

afterEach(() => {
  window.print = originalPrint;
});

describe('About Route (/about)', () => {
  test('renders the section headings', async () => {
    const { main } = await renderAbout();
    for (const name of [
      'Professional Experience',
      'Education',
      'Technical Skills',
      'Achievements & Activities',
      'Beyond Code',
      "Let's Connect",
    ]) {
      expect(main.getByRole('heading', { name })).toBeInTheDocument();
    }
  });

  test('no longer claims to be job hunting and has no skill ratings', async () => {
    const { mainElement } = await renderAbout();
    expect(mainElement).not.toHaveTextContent(/seeking opportunities/i);
    expect(mainElement).not.toHaveTextContent(/\d+\/10/);
    expect(mainElement).not.toHaveTextContent(/deep but outdated/);
  });

  test('introduces the current roles', async () => {
    const { main } = await renderAbout();
    expect(
      main.getByText(/currently a Software Engineer at Tagup and a part-time Founding Engineer at Saga Healthcare Co/),
    ).toBeInTheDocument();
    expect(main.getByText(/early years in the Bronx/)).toBeInTheDocument();
  });

  test('lists current and past roles with their dates', async () => {
    const { main } = await renderAbout();
    const cardFor = (company: string) =>
      main
        .getAllByRole('article')
        .find((article) => within(article).queryByText(company) !== null) as HTMLElement;

    for (const company of ['Tagup', 'Saga Healthcare Co']) {
      const card = cardFor(company);
      expect(card).toBeDefined();
      expect(card).toHaveTextContent('Mar 2026');
      expect(card).toHaveTextContent('Present');
    }
    expect(cardFor('Saga Healthcare Co')).toHaveTextContent('part-time');

    const arobotics = cardFor('aRoboticsCompany');
    expect(arobotics).toHaveTextContent('Sept 2023');
    expect(arobotics).toHaveTextContent('June 2025');

    expect(main.getAllByRole('article')).toHaveLength(6);
  });

  test('renders education from the resume and keeps the influential courses', async () => {
    const { main } = await renderAbout();
    expect(main.getByRole('heading', { level: 3, name: 'Cornell University' })).toBeInTheDocument();
    expect(main.getByText('Class of 2023')).toBeInTheDocument();
    expect(
      main.getByText(/B\.A\. Psychology \(Computational Focus\), Minor in Computer Science/),
    ).toBeInTheDocument();
    expect(main.getByText(/Influential Courses & Professors/)).toBeInTheDocument();
    expect(main.getByText(/Robbert van Renesse/)).toBeInTheDocument();
  });

  test('renders grouped skills tied to projects', async () => {
    const { main } = await renderAbout();
    for (const group of ['Languages', 'Frameworks', 'Tooling']) {
      expect(main.getByRole('heading', { level: 3, name: group })).toBeInTheDocument();
    }

    const languages = main.getByRole('list', { name: 'Languages' });
    const python = within(languages).getByText('Python', { selector: 'span' }).closest('li') as HTMLElement;
    const pythonLinks = within(python).getAllByRole('link');
    expect(pythonLinks.length).toBeGreaterThan(0);
    for (const link of pythonLinks) {
      const project = projects.find((candidate) => candidate.title === link.textContent);
      expect(project).toBeDefined();
      expect(project!.tags).toContain('Python');
      expect(link.getAttribute('href')).toContain(`/${project!.category}`);
    }

    const rust = within(languages).getByText('Rust', { selector: 'span' }).closest('li') as HTMLElement;
    expect(within(rust).queryByRole('link')).not.toBeInTheDocument();
  });

  test('renders achievements and activities', async () => {
    const { main } = await renderAbout();
    expect(main.getByRole('heading', { name: 'Cornell Cup Robotics' })).toBeInTheDocument();
    expect(main.getByRole('heading', { name: /Cornell Animal Health Hackathon/ })).toBeInTheDocument();
    expect(main.getByText(/Encompass, a unified veterinarian health portal/)).toBeInTheDocument();
  });

  test('the print button calls window.print', async () => {
    const print = rstest.fn();
    window.print = print;
    const { main } = await renderAbout();
    fireEvent.click(main.getByRole('button', { name: 'Print / save resume as PDF' }));
    expect(print).toHaveBeenCalledTimes(1);
  });

  test('only the resume region prints, with a print-only header of public URLs', async () => {
    const { mainElement, main } = await renderAbout();
    const resume = mainElement.querySelector('#resume') as HTMLElement;
    expect(resume).not.toBeNull();
    expect(resume).toHaveAccessibleName('Resume');
    for (const name of ['Professional Experience', 'Education', 'Technical Skills', 'Achievements & Activities']) {
      expect(within(resume).getByRole('heading', { name })).toBeInTheDocument();
    }

    const header = main.getByTestId('resume-print-header');
    expect(resume).toContainElement(header);
    expect(header).toHaveClass('hidden', 'print:block');
    expect(header).toHaveTextContent('Christopher De Jesus');
    for (const url of ['https://gamma2653.github.io', LINKS.github, LINKS.linkedin]) {
      expect(header).toHaveTextContent(url);
    }

    // Everything outside the resume region is hidden when printing.
    for (const sibling of Array.from(resume.parentElement!.children)) {
      if (sibling !== resume) {
        expect(sibling).toHaveClass('print:hidden');
      }
    }
    for (const name of ['Beyond Code', "Let's Connect"]) {
      expect(resume).not.toContainElement(main.getByRole('heading', { name }));
    }
    expect(resume).not.toContainElement(main.getByAltText('Hiking Buttermilk Falls'));
  });

  test('keeps the GitHub, LinkedIn and contact links', async () => {
    const { main } = await renderAbout();
    expect(main.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/gamma2653');
    expect(main.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/cdejesus26/',
    );
    expect(main.getByRole('link', { name: 'contact page' }).getAttribute('href')).toContain('/contact');
  });

  test('publishes no phone number or email address', async () => {
    await renderAbout();
    expect(document.body.textContent).not.toMatch(/\(\d{3}\)\s?\d{3}/);
    expect(document.body.querySelector('a[href^="mailto:"]')).toBeNull();
  });

  test('renders footer copyright', async () => {
    await renderAbout();
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });
});
