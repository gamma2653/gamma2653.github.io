import { render, type RenderOptions } from '@testing-library/react';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  Outlet,
} from '@tanstack/react-router';
import type { ReactElement } from 'react';

/**
 * Renders a component inside a TanStack Router context.
 * The component is placed as the root route's component so that
 * <Link> elements have a valid router context.
 */
export function renderWithRouter(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  const rootRoute = createRootRoute({
    component: () => (
      <>
        {ui}
        <Outlet />
      </>
    ),
  });

  const childRoutes = [
    createRoute({ getParentRoute: () => rootRoute, path: '/' }),
    createRoute({ getParentRoute: () => rootRoute, path: '/about' }),
    createRoute({ getParentRoute: () => rootRoute, path: '/software' }),
    createRoute({ getParentRoute: () => rootRoute, path: '/robotics' }),
    createRoute({ getParentRoute: () => rootRoute, path: '/academics' }),
    createRoute({ getParentRoute: () => rootRoute, path: '/contact' }),
  ];

  const routeTree = rootRoute.addChildren(childRoutes);
  const memoryHistory = createMemoryHistory({ initialEntries: ['/'] });
  const router = createRouter({ routeTree, history: memoryHistory });

  // @ts-expect-error - router type mismatch between test stub and registered router
  return render(<RouterProvider router={router} />, options);
}
