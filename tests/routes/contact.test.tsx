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

describe('Contact Route (/contact)', () => {
  test('renders Get in Touch heading', async () => {
    renderRoute('/contact');
    expect(
      await screen.findByRole('heading', { name: /Get in Touch/ }),
    ).toBeInTheDocument();
  });

  test('renders contact form iframe', async () => {
    renderRoute('/contact');
    const iframe = await screen.findByTitle('Contact Form');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      expect.stringContaining('docs.google.com/forms'),
    );
  });

  test('renders LinkedIn link in page content', async () => {
    renderRoute('/contact');
    await screen.findByRole('heading', { name: /Get in Touch/ });
    // Find the LinkedIn link in the contact page content (not nav)
    const links = screen.getAllByRole('link');
    const linkedinLink = links.find(
      (el) =>
        el.getAttribute('href') === 'https://www.linkedin.com/in/cdejesus26/' &&
        el.textContent?.includes('LinkedIn'),
    );
    expect(linkedinLink).toBeDefined();
  });

  test('renders GitHub link in page content', async () => {
    renderRoute('/contact');
    await screen.findByRole('heading', { name: /Get in Touch/ });
    const links = screen.getAllByRole('link');
    const githubLink = links.find(
      (el) =>
        el.getAttribute('href') === 'https://github.com/gamma2653' &&
        el.textContent?.includes('GitHub'),
    );
    expect(githubLink).toBeDefined();
  });
});
