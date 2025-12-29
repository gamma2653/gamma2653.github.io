import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
// import Navbar from '../features/shared/components/nav'
import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <link rel="stylesheet" href="/styles.css" />
      {/* <Navbar /> */}
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}