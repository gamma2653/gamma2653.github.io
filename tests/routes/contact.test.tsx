import { expect, test, describe } from '@rstest/core';
import { render, screen } from '@testing-library/react';
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

describe('Contact Route (/contact)', () => {
  test('renders Get in Touch heading', async () => {
    renderRoute('/contact');
    expect(
      await screen.findByRole('heading', { name: /Get in Touch/ }),
    ).toBeInTheDocument();
  });

  test('does not embed an iframe', async () => {
    renderRoute('/contact');
    await screen.findByRole('heading', { name: /Get in Touch/ });
    expect(document.querySelector('iframe')).toBeNull();
  });

  test('links to the contact form in a new tab', async () => {
    renderRoute('/contact');
    await screen.findByRole('heading', { name: /Get in Touch/ });
    const formLink = screen
      .getAllByRole('link')
      .find((el) => el.getAttribute('href') === LINKS.contactForm);
    expect(formLink).toBeDefined();
    expect(formLink).toHaveAttribute('target', '_blank');
    expect(formLink).toHaveAttribute('rel', 'noopener noreferrer');
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
