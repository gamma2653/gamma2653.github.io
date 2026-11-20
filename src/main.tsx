import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'

import { createAppRouter } from './router'

const router = createAppRouter()

document.documentElement.lang = 'en'

const rootElement = document.getElementById('root')

if (!rootElement?.innerHTML) {
  const root = ReactDOM.createRoot(rootElement!)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
