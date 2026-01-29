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

describe('About Route (/about)', () => {
  test('renders About Me heading', async () => {
    renderRoute('/about');
    expect(await screen.findByText('About Me')).toBeInTheDocument();
  });

  test('renders Education section', async () => {
    renderRoute('/about');
    expect(await screen.findByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Cornell University')).toBeInTheDocument();
  });

  test('renders Technical Skills section', async () => {
    renderRoute('/about');
    expect(await screen.findByText('Technical Skills')).toBeInTheDocument();
  });

  test('renders skill names', async () => {
    renderRoute('/about');
    expect(await screen.findByText('Python')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  test('renders Professional Experience section', async () => {
    renderRoute('/about');
    expect(await screen.findByText('Professional Experience')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  test('renders GitHub link with correct href', async () => {
    renderRoute('/about');
    await screen.findByText('About Me');
    const githubLinks = screen.getAllByRole('link', { name: /GitHub/ });
    const aboutGithub = githubLinks.find(
      (el) => el.getAttribute('href') === 'https://github.com/gamma2653',
    );
    expect(aboutGithub).toBeDefined();
  });

  test('renders LinkedIn link with correct href', async () => {
    renderRoute('/about');
    await screen.findByText('About Me');
    const linkedinLinks = screen.getAllByRole('link', { name: /LinkedIn/ });
    const aboutLinkedin = linkedinLinks.find(
      (el) =>
        el.getAttribute('href') === 'https://www.linkedin.com/in/cdejesus26/',
    );
    expect(aboutLinkedin).toBeDefined();
  });

  test('renders footer copyright', async () => {
    renderRoute('/about');
    expect(await screen.findByText(/All rights reserved/)).toBeInTheDocument();
  });
});
