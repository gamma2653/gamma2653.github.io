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
- **Memory history** is used instead of browser history (see `src/main.tsx:7-11`) for GitHub Pages compatibility
- Root route at `src/routes/__root.tsx` contains the layout with Navbar and meta tags
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
- `head.tsx` - Head/meta tag management (currently unused in favor of TanStack Router's built-in head support)

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
   })
   ```

3. **TypeScript**: Full TypeScript throughout, with strict mode enabled

4. **Router Configuration**: Uses memory history instead of browser history for GitHub Pages static hosting compatibility

## Testing

- Uses Rstest (not Vitest) with React Testing Library
- Test environment: jsdom
- Setup file: `rstest.setup.ts`
- Test files in `tests/` directory

## Deployment

- Deployed to GitHub Pages via `gh-pages` package
- Production build goes to `dist/` directory
- GitHub Actions workflow at `.github/workflows/static.yml` handles deployment
- **IMPORTANT**: To push changes live to the website:
  1. Run `npm run build` to build the production bundle to `dist/`
  2. Commit the changes in `dist/` along with source changes
  3. Push to the remote repository (via `git push`) to trigger the GitHub Actions workflow and deploy changes live
- Uses memory history routing to work with GitHub Pages static hosting

## Important Notes

- The README.md contains generic TanStack template documentation and doesn't fully reflect the actual project setup
- AGENTS.md already exists with basic command documentation
- The project is **not** using Vite - it uses Rsbuild/Rspack
- The project is **not** using Vitest - it uses Rstest
