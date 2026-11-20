import { createHashHistory, createRouter } from '@tanstack/react-router'
import type { RouterHistory } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

// Hash history keeps every route under the single index.html that GitHub Pages
// serves, so deep links (/#/about), refresh and Back/Forward all work.
export function createAppRouter(history: RouterHistory = createHashHistory()) {
  return createRouter({ routeTree, history, scrollRestoration: true })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>
  }
}
