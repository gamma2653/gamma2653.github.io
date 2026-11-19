import { afterEach, beforeEach, expect, test, describe } from '@rstest/core';
import { render, waitFor } from '@testing-library/react';
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { routeTree } from '../../src/routeTree.gen';
import { SITE, pageTitle } from '../../src/lib/site';

function renderRoute(path: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  // @ts-expect-error - test router vs registered router type mismatch
  return render(<RouterProvider router={router} />);
}

const cases: Array<[string, string]> = [
  ['/', SITE.title],
  ['/about', pageTitle('About')],
  ['/software', pageTitle('Software Projects')],
  ['/robotics', pageTitle('Robotics')],
  ['/academics', pageTitle('Academics & Research')],
  ['/contact', pageTitle('Contact')],
];

describe('Route document titles', () => {
  // The built index.html ships a static <title> (see rsbuild.config.ts), so
  // the route title has to win over one that is already in <head>.
  let staticTitle: HTMLTitleElement;

  beforeEach(() => {
    staticTitle = document.createElement('title');
    staticTitle.textContent = SITE.title;
    document.head.appendChild(staticTitle);
  });

  afterEach(() => {
    staticTitle.remove();
  });

  for (const [path, title] of cases) {
    test(`${path} sets the title to "${title}"`, async () => {
      renderRoute(path);
      await waitFor(() => expect(document.title).toBe(title));
    });
  }
});
