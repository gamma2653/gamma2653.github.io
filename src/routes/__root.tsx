import { Suspense, lazy } from 'react'
import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import '../styles.css'
import Navbar from '../components/nav';

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
    meta: [
      { name: 'description', content: "Christopher De Jesus's Portfolio Website" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charSet: 'UTF-8' },
      { title: "Christopher De Jesus's Portfolio" },
    ],
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
