import { Suspense, lazy } from 'react'
import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import '../styles.css'
import Navbar from '../components/nav';
import { SITE } from '../lib/site';

// Dev-only: the dynamic import sits behind a build-time constant, so the
// devtools chunk is dropped from the production bundle entirely.
const RouterDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-router-devtools').then((m) => ({
        default: m.TanStackRouterDevtools,
      })),
    )
  : null

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    meta: [{ title: SITE.title }],
  })

})

function RootComponent() {
  return (
    <>
      <HeadContent />
      <Navbar />
      <Outlet />
      {RouterDevtools && (
        <Suspense fallback={null}>
          <RouterDevtools position="bottom-right" />
        </Suspense>
      )}
    </>
  )
}
