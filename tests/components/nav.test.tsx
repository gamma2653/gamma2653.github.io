import { expect, test, describe } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import Navbar from '../../src/components/nav';

function renderNav() {
  const rootRoute = createRootRoute({
    component: () => <Navbar />,
  });
  const routes = [
    createRoute({ getParentRoute: () => rootRoute, path: '/' }),
    createRoute({ getParentRoute: () => rootRoute, path: '/about' }),
    createRoute({ getParentRoute: () => rootRoute, path: '/software' }),
    createRoute({ getParentRoute: () => rootRoute, path: '/robotics' }),
    createRoute({ getParentRoute: () => rootRoute, path: '/academics' }),
    createRoute({ getParentRoute: () => rootRoute, path: '/contact' }),
  ];
  const routeTree = rootRoute.addChildren(routes);
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  });
  // @ts-expect-error - router type mismatch between test stub and registered router
  return render(<RouterProvider router={router} />);
}

describe('Navbar', () => {
  test('renders navigation element', async () => {
    renderNav();
    expect(await screen.findByRole('navigation')).toBeInTheDocument();
  });

  test('renders Home link in desktop nav', async () => {
    renderNav();
    const homeLinks = await screen.findAllByText('Home');
    expect(homeLinks.length).toBeGreaterThan(0);
  });

  test('renders About link', async () => {
    renderNav();
    const aboutLinks = await screen.findAllByText('About');
    expect(aboutLinks.length).toBeGreaterThan(0);
  });

  test('renders Contact link', async () => {
    renderNav();
    const contactLinks = await screen.findAllByText('Contact');
    expect(contactLinks.length).toBeGreaterThan(0);
  });

  test('renders Projects disclosure button', async () => {
    renderNav();
    const projectsButtons = await screen.findAllByText('Projects');
    expect(projectsButtons.length).toBeGreaterThan(0);
  });

  test('renders logo images', async () => {
    renderNav();
    const logos = await screen.findAllByAltText('Logo');
    expect(logos.length).toBeGreaterThan(0);
  });

  test('renders banner images', async () => {
    renderNav();
    const banners = await screen.findAllByAltText('Banner');
    expect(banners.length).toBeGreaterThan(0);
  });

  test('renders mobile menu button with sr-only text', async () => {
    renderNav();
    expect(await screen.findByText('Open main menu')).toBeInTheDocument();
  });

  test('renders built-with text', async () => {
    renderNav();
    expect(
      await screen.findByText(/Built with React, TypeScript, and Tailwind CSS/),
    ).toBeInTheDocument();
  });
});
