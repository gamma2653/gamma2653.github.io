import { expect, test, describe } from '@rstest/core';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import Navbar from '../../src/components/nav';

function renderNav(initialPath = '/') {
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
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  });
  // @ts-expect-error - router type mismatch between test stub and registered router
  return render(<RouterProvider router={router} />);
}

const categoryLinks = [
  ['Software', '/software'],
  ['Robotics', '/robotics'],
  ['Academics', '/academics'],
] as const;

describe('Navbar', () => {
  test('renders a navigation landmark', async () => {
    renderNav();
    expect(await screen.findByRole('navigation', { name: 'Main' })).toBeInTheDocument();
  });

  test('brand links home and carries the logo pair', async () => {
    renderNav();
    const logos = await screen.findAllByAltText('Logo');
    expect(logos).toHaveLength(2);
    const brand = logos[0].closest('a');
    expect(brand).toHaveAttribute('href', '/');
    expect(brand).toHaveTextContent('Christopher De Jesus');
    expect(brand).toContainElement(logos[1]);
  });

  test('renders About and Contact links', async () => {
    renderNav();
    expect(await screen.findByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });

  test('has no Home link, banner image or built-with tagline', async () => {
    renderNav();
    await screen.findByRole('navigation');
    expect(screen.queryByRole('link', { name: 'Home' })).not.toBeInTheDocument();
    expect(screen.queryByAltText('Banner')).not.toBeInTheDocument();
    expect(screen.queryByAltText(/Banner/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Built with React/)).not.toBeInTheDocument();
  });

  test('Projects popover reveals category links only after it is opened', async () => {
    const user = userEvent.setup();
    renderNav();
    const trigger = await screen.findByRole('button', { name: 'Projects' });
    for (const [label] of categoryLinks) {
      expect(screen.queryByRole('link', { name: label })).not.toBeInTheDocument();
    }

    await user.click(trigger);

    for (const [label, href] of categoryLinks) {
      expect(await screen.findByRole('link', { name: label })).toHaveAttribute('href', href);
    }
  });

  test('desktop list is hidden below md', async () => {
    renderNav();
    const about = await screen.findByRole('link', { name: 'About' });
    const list = about.closest('ul');
    expect(list).toHaveClass('hidden');
    expect(list).toHaveClass('md:flex');
  });

  test('mobile menu button reveals the mobile links', async () => {
    const user = userEvent.setup();
    renderNav();
    const button = await screen.findByRole('button', { name: 'Open main menu' });
    expect(button).toHaveClass('md:hidden');
    expect(screen.getAllByRole('link', { name: 'About' })).toHaveLength(1);

    await user.click(button);

    const desktopList = screen.getAllByRole('link', { name: 'About' })[0].closest('ul')!;
    const mobileList = screen.getByRole('link', { name: 'Software' }).closest('ul')!;
    expect(mobileList).not.toBe(desktopList);
    const mobile = within(mobileList);
    expect(mobile.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    for (const [label, href] of categoryLinks) {
      expect(mobile.getByRole('link', { name: label })).toHaveAttribute('href', href);
    }
    expect(mobile.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });

  test('mobile menu closes after choosing a link', async () => {
    const user = userEvent.setup();
    renderNav();
    await user.click(await screen.findByRole('button', { name: 'Open main menu' }));
    await user.click(screen.getByRole('link', { name: 'Robotics' }));

    expect(screen.queryByRole('link', { name: 'Robotics' })).not.toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Projects' })).toHaveAttribute(
      'data-status',
      'active',
    );
  });

  test('marks the current page with aria-current', async () => {
    renderNav('/about');
    expect(await screen.findByRole('link', { name: 'About' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('link', { name: 'Contact' })).not.toHaveAttribute('aria-current');
    expect(screen.getAllByAltText('Logo')[0].closest('a')).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('button', { name: 'Projects' })).not.toHaveAttribute('data-status');
  });

  test('Projects trigger is active on a category page', async () => {
    renderNav('/robotics');
    expect(await screen.findByRole('button', { name: 'Projects' })).toHaveAttribute(
      'data-status',
      'active',
    );
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current');
  });

  test('renders the theme toggle', async () => {
    renderNav();
    expect(
      await screen.findByRole('button', { name: /Switch to (dark|light) theme/ }),
    ).toBeInTheDocument();
  });
});
