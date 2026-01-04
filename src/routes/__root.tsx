import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
// import Navbar from '../features/shared/components/nav'
import '../styles.css'
import Navbar from '../components/nav';
// import Head from '../components/head';

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    meta: [
      { name: 'description', content: "Christopher De Jesus's Portfolio Website" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charSet: 'UTF-8' },
      { title: "Christopher De Jesus's Portfolio" },
    ],
    links: [
      { rel: 'icon', href: '/favicon.png' },
    ]
  })

})

function RootComponent() {
  return (
    <>
      {/* <link rel="stylesheet" href="/styles.css" /> */}
      <HeadContent />
      {/* <Head title="Christopher De Jesus's Portfolio" /> */}
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}