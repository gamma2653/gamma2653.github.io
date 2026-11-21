import { expect, test, describe, rstest, afterEach } from '@rstest/core';
import { fireEvent, render, screen, within } from '@testing-library/react';
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { routeTree } from '../../src/routeTree.gen';
import { LINKS } from '../../src/data/links';

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
      'Experience',
      'Projects',
      'Education',
      'Skills & Frameworks',
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

  test('carries the essay under "Why cognition and computation", outside the printed resume', async () => {
    const { mainElement, main } = await renderAbout();
    const essay = main.getByRole('region', { name: 'Why cognition and computation' });
    expect(within(essay).getByRole('heading', { level: 2, name: 'Why cognition and computation' })).toBeInTheDocument();
    expect(essay).toHaveTextContent(/computational irreducibility/);
    expect(essay).toHaveTextContent(/This led me down/);
    expect(essay).toHaveClass('print:hidden');
    expect(mainElement.querySelector('#resume')).not.toContainElement(essay);
    expect(mainElement.textContent!.match(/computational irreducibility/g)).toHaveLength(1);
  });

  test('lists the resume roles with their dates', async () => {
    const { mainElement } = await renderAbout();
    const resume = within(mainElement.querySelector('#resume') as HTMLElement);
    const entryFor = (company: string) =>
      resume
        .getAllByRole('article')
        .find((article) => within(article).queryByRole('heading', { name: new RegExp(company) }) !== null) as HTMLElement;

    for (const company of ['Tagup', 'Saga Healthcare Co']) {
      const entry = entryFor(company);
      expect(entry).toBeDefined();
      expect(entry).toHaveTextContent('Mar 2026 – Present');
    }
    expect(entryFor('Saga Healthcare Co')).toHaveTextContent('(Part-time)');
    expect(entryFor('Tompkins Consolidated Area Transit')).toHaveTextContent('(Contract)');
    expect(entryFor('aRoboticsCompany')).toHaveTextContent('Sept 2023 – June 2025');
    expect(entryFor('Tagup')).toHaveTextContent(/Contributed to the agent harness and tool-calling layer for Argus/);

    // Four roles and two projects, as on the resume document.
    expect(resume.getAllByRole('article')).toHaveLength(6);
  });

  test('lists the resume projects and points to the category pages for the rest', async () => {
    const { mainElement } = await renderAbout();
    const resume = within(mainElement.querySelector('#resume') as HTMLElement);
    expect(resume.getByRole('heading', { level: 4, name: /Campaign Master - AI-enabled TTRPG Planner/ })).toBeInTheDocument();
    expect(resume.getByRole('heading', { level: 4, name: /C1C0 - Automated Lab Assistant Robot/ })).toBeInTheDocument();
    for (const [name, path] of [['Software', '/software'], ['Robotics', '/robotics'], ['Academics', '/academics']]) {
      expect(resume.getByRole('link', { name }).getAttribute('href')).toContain(path);
    }
  });

  test('renders education from the resume and keeps the influential courses outside it', async () => {
    const { mainElement, main } = await renderAbout();
    const resume = mainElement.querySelector('#resume') as HTMLElement;
    expect(within(resume).getByText('Cornell University')).toBeInTheDocument();
    expect(within(resume).getByText('Class of 2023')).toBeInTheDocument();
    expect(
      within(resume).getByText(/B\.A\. Psychology \(Computational Focus\), Minor in Computer Science/),
    ).toBeInTheDocument();
    expect(resume).toHaveTextContent('Relevant Coursework: Systems Programming');
    expect(resume).not.toContainElement(main.getByRole('heading', { name: 'Influential Courses & Professors' }));
    expect(main.getByText(/Robbert van Renesse/)).toBeInTheDocument();
  });

  test('renders the skills as the resume\'s three lines', async () => {
    const { mainElement } = await renderAbout();
    const resume = mainElement.querySelector('#resume') as HTMLElement;
    expect(resume).toHaveTextContent('Languages: Python, TypeScript, Rust, C++, SQL');
    expect(resume).toHaveTextContent(/Frameworks & Tools: FastAPI, Next\.js/);
    expect(resume).toHaveTextContent(/Specialized: LLM agent tooling/);
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

  test('only the resume region prints, under a header of public URLs', async () => {
    const { mainElement, main } = await renderAbout();
    const resume = mainElement.querySelector('#resume') as HTMLElement;
    expect(resume).not.toBeNull();
    expect(resume).toHaveAccessibleName('Resume');
    for (const name of ['Experience', 'Projects', 'Education', 'Skills & Frameworks']) {
      expect(within(resume).getByRole('heading', { level: 3, name })).toBeInTheDocument();
    }

    const header = main.getByTestId('resume-header');
    expect(resume).toContainElement(header);
    expect(header).toHaveTextContent('Christopher De Jesus');
    for (const url of ['https://gamma2653.github.io', LINKS.github, LINKS.linkedin]) {
      expect(within(header).getByRole('link', { name: url })).toHaveAttribute('href', url);
    }

    // Everything outside the resume region is hidden when printing.
    for (const sibling of Array.from(resume.parentElement!.children)) {
      if (sibling !== resume) {
        expect(sibling).toHaveClass('print:hidden');
      }
    }
    for (const name of ['Achievements & Activities', 'Beyond Code', "Let's Connect"]) {
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
