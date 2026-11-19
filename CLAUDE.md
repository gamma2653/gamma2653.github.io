# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Christopher De Jesus, built as a static site deployed to GitHub Pages. The site showcases software, robotics, and academic projects with a focus on computational psychology and AI.

## Build System & Development

### Commands

- `npm run dev` - Start Rsbuild dev server with hot reload
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests with Rstest
- `npm run test:watch` - Run tests in watch mode
- `npm run deploy` - Deploy to GitHub Pages (runs build first)

### Build Configuration

- **Bundler**: Rsbuild (modern bundler built on Rspack, not Vite)
- **Entry point**: `src/main.tsx`
- **Config file**: `rsbuild.config.ts`
- **Test config**: `rstest.config.ts` (Rstest, not Vitest)

## Architecture

### Routing

Uses **TanStack Router** with file-based routing:

- Routes are defined in `src/routes/` directory
- TanStack Router plugin auto-generates route tree at `src/routeTree.gen.ts`
- **Hash history** is used (created by `createAppRouter()` in `src/router.tsx`, mounted in `src/main.tsx`), so URLs look like `https://gamma2653.github.io/#/about` and deep links, refresh and Back/Forward all work on GitHub Pages
- Root route at `src/routes/__root.tsx` contains the layout with Navbar and the default document title
- Per-route titles are set with the route's `head` option and `pageTitle()` from `src/lib/site.ts`
- Site-wide description and Open Graph/Twitter tags are static in the `html` section of `rsbuild.config.ts` (values from `SITE` in `src/lib/site.ts`), because URL fragments are never sent to crawlers; the share image is `public/og-image.png`
- Route files export a `Route` constant created via `createFileRoute()`

Key routes:
- `/` - Home page with project category banners
- `/about` - About page
- `/software`, `/robotics`, `/academics` - Project category pages
- `/contact` - Contact page

### Component Structure

**Layout Components** (in `src/components/`):
- `page.tsx` - Main page wrapper with consistent padding, dark mode support, and footer
- `nav.tsx` - Navigation bar with dropdown menu, dark mode image switching, and project categories
- `banner.tsx` - Clickable banner images used on home page
- `collage.tsx` - Image collage component for project showcases
- `container.tsx` - General container component
- `image.tsx` - Image wrapper utilities

### Styling

- **Tailwind CSS v4** with PostCSS
- Dark mode support via `dark:` utility classes
- Responsive breakpoints: `sm:`, `xl:`, `2xl:`
- Global styles in `src/styles.css`
- Uses Headless UI for accessible components (Disclosure, etc.)
- Icons from Heroicons

### Key Patterns

1. **Dark Mode Images**: Navbar uses separate light/dark mode images with `block dark:hidden` and `hidden dark:block` classes (see `src/components/nav.tsx:49-56`)

2. **Route Structure**: Each route file follows this pattern:
   ```tsx
   export const Route = createFileRoute('/path')({
     component: RouteComponent,
     head: () => ({ meta: [{ title: pageTitle('Page Name') }] }),
   })
   ```
   Keep the `head` property when rewriting a route; `pageTitle` comes from `src/lib/site.ts`.

3. **TypeScript**: Full TypeScript throughout, with strict mode enabled

4. **Router Configuration**: Uses hash history (`createHashHistory`, see `src/router.tsx`) instead of browser history, because GitHub Pages only serves `index.html` at the root. Routes live in the URL fragment (`/#/about`), so they are shareable and survive a refresh

5. **Internal Navigation**: **CRITICAL** - Always use TanStack Router's `Link` component for internal navigation instead of anchor tags:
   ```tsx
   import { Link } from '@tanstack/react-router'

   // Good - uses Link component for client-side routing
   <Link to="/contact">Contact</Link>

   // Bad - requests /contact from GitHub Pages and 404s
   <a href="/contact">Contact</a>
   ```
   Because this project uses hash history, a raw `<a href="/contact">` asks GitHub Pages for `/contact`, which does not exist and returns a 404. Internal links must be `Link` components with `to` props, which resolve to `/#/contact`. Only use `<a>` tags for external URLs (e.g., `https://github.com/...`).

## Testing

- Uses Rstest (not Vitest) with React Testing Library
- Test environment: jsdom
- Setup file: `rstest.setup.ts`
- Test files in `tests/` directory

## Deployment

- Deployed to GitHub Pages by the GitHub Actions workflow at `.github/workflows/static.yml`
- Pushing to `master` triggers the workflow, which runs the tests, builds, and publishes the `dist/` artifact to GitHub Pages
- Production build goes to `dist/`, which is gitignored and must **never** be committed
- `npm run deploy` (`gh-pages` package) is a manual alternative to the workflow
- Uses hash history routing (`/#/about`) so deep links and refresh work with GitHub Pages static hosting

## Important Notes

- The README.md contains generic TanStack template documentation and doesn't fully reflect the actual project setup
- AGENTS.md already exists with basic command documentation
- The project is **not** using Vite - it uses Rsbuild/Rspack
- The project is **not** using Vitest - it uses Rstest
