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
- `npm run typecheck` - Type-check `src/` and `e2e/` with `tsc`
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests with Rstest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:e2e` - Run the Playwright end-to-end tests against the production build (run `npm run build` first; `npx playwright install` once to get the browsers)
- `npm run test:lighthouse` - Run Lighthouse CI against `dist/` (needs Chrome; thresholds in `lighthouserc.json`)
- `npm run check:dist` - Check the built `dist/` for broken references, missing meta tags and size budgets
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
- `/` - Home page: hero (name, pitch, photo, Projects/Contact buttons), featured case studies, and category entry points
- `/about` - About page: narrative sections (hidden in print) around a printable resume region (`<section id="resume">`)
- `/software`, `/robotics`, `/academics` - Project category pages
- `/contact` - Contact page

### Component Structure

**Layout Components** (in `src/components/`):
- `page.tsx` - Main page wrapper: `max-w-5xl` container, page-in transition, and an in-flow footer with the computed year
- `nav.tsx` - Navigation bar with dropdown menu, dark mode image switching, and project categories
- `collage.tsx` - Image collage component for project showcases
- `container.tsx` - General container component
- `image.tsx` - Image wrapper utilities
- `card.tsx` - `Card` surface (`as`, `interactive` hover lift, `reveal` on by default); with `reveal` the `as` tag is a `Reveal` wrapper around the surface
- `reveal.tsx` - `Reveal` fades/slides content in once on first intersection (uses `src/lib/use-in-view.ts`); shows content immediately without IntersectionObserver or under reduced motion
- `page-header.tsx` - `PageHeader` renders the page `h1` plus an optional lead paragraph block
- `tag.tsx` - `Tag` small rounded accent chip used for technology labels
- `project-card.tsx` - `ProjectCard` renders one `Project` as an interactive `Card` (thumbnail or category placeholder, screenshot strip opening `ImageModal`, tags, repository and other links)
- `category-card.tsx` - `CategoryCard` is a `Link` to a category page wrapping an interactive `Card` (image, label, project count); used on the home page
- `case-study.tsx` - `CaseStudyCard` renders a `CaseStudy` either `full` (problem / what I built / outcome, on category pages) or `compact` (thumbnail, summary and a link to the category page, on the home page)
- `earlier-work.tsx` - `EarlierWork` compact row of projects with `tier: 'earlier'`
- `experience-list.tsx` - `ExperienceList` renders resume roles as cards on About
- `skill-groups.tsx` - `SkillGroups` renders grouped skill tags linked to the projects that use them
- `print-resume-button.tsx` - `PrintResumeButton` calls `window.print()` to print/save the About resume region
- `project-grid.tsx` - `ProjectGrid` lays `ProjectCard`s out in a responsive grid (1 column, 2 from `sm`, 3 from `lg`)

### Data

- Projects live in `src/data/projects.ts` as a typed `Project[]`; the Software, Robotics and Academics pages render from it through `projectsByCategory()`
- To add or change a project, edit that file, not the route JSX
- `src/data/case-studies.ts` - the flagship `caseStudies` (problem / what was built / outcome) shown on the home page and at the top of category pages
- `src/data/resume.ts` - `experience`, `education`, `activities` and `currentRoles()` for the About page and the home hero
- `src/data/skills.ts` - `skillGroups` and `projectsForSkill()` for the About skills section
- `src/data/links.ts` - `LINKS` (GitHub, LinkedIn, contact form); use it instead of hard-coding profile URLs

### Styling

- **Tailwind CSS v4** with PostCSS; there is no Tailwind config file, theme tokens live in the `@theme` block of `src/styles.css`
- Dark mode is class-based: `@custom-variant dark` in `src/styles.css` makes every `dark:` utility follow a `.dark` class on `<html>`. `ThemeToggle` (`src/components/theme-toggle.tsx`) switches it through `src/lib/theme.ts`, which persists the choice in localStorage key `theme` and follows the OS (`prefers-color-scheme`) until the user toggles
- Responsive breakpoints: `sm:`, `md:`, `lg:`; the nav goes horizontal at `md:` and collapses behind a menu button below it
- Global styles in `src/styles.css`
- Uses Headless UI for accessible components (Disclosure, etc.)
- Icons from Heroicons

**Theme tokens** (defined in `src/styles.css`):
- `accent-50` .. `accent-950` - the accent colour scale (Tailwind's teal). Use it for links, buttons and highlights (`text-accent-*`, `bg-accent-*`, `border-accent-*`, `ring-accent-*`). Do not use `blue-*` or `purple-*`.
- `gray-50` .. `gray-950` - re-tinted with Tailwind's slate values, so every `gray-*` utility is a cool neutral
- `font-display` - Space Grotesk Variable, self-hosted through `@fontsource-variable/space-grotesk` (no third-party font requests). Applied to `h1`-`h3` by the base layer.
- `animate-page-in` - short fade/slide used by `Page` as the route transition

**Base styles**: `body` carries the page background and text colour, `#root` is a full-height flex column (which keeps the footer at the bottom on short pages), and links are accent coloured with no visited colour and an accent `:focus-visible` outline.

**Layout conventions**:
- `Page` provides a centred `max-w-5xl` container; content inside it is left-aligned (no `text-center` page wrappers)
- Body text is constrained with `max-w-prose`
- The footer is a normal in-flow element after `<main>` (never `fixed`) and is hidden when printing

**Motion**: all animation, transitions that move things, and hover transforms must use `motion-safe:` variants (e.g. `motion-safe:animate-page-in`, `motion-safe:hover:-translate-y-1`) so nothing moves under `prefers-reduced-motion: reduce`.

### Key Patterns

1. **Dark Mode Images**: The navbar brand renders the logo as a light/dark pair (`favicon.png` with `block dark:hidden`, `favicon_darkmode.png` with `hidden dark:block`); use the same pair of classes for any image that needs a dark variant

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
- End-to-end tests live in `e2e/` as `*.e2e.ts` (Playwright, not picked up by Rstest) and run against `rsbuild preview` in Chromium, Firefox, WebKit and a mobile viewport: every route (deep link, refresh, images, overflow, link targets), navigation, theme toggle, print, and axe WCAG 2.1 A/AA checks in light and dark
- When adding a route, add it to `PAGES` in `e2e/pages.ts` and to the `url` list in `lighthouserc.json`

## Continuous Integration

- `.github/workflows/ci.yml` runs on every pull request and is called by the deploy workflow: lint + typecheck, unit tests, build + `check:dist`, Playwright (one job per browser project), Lighthouse CI, `npm audit` for production dependencies, and dependency review on pull requests. The `CI passed` job is the single check to require in branch protection
- `.github/workflows/links.yml` checks external links weekly, and on pull requests that touch `README.md`, `src/data/` or `src/routes/`
- `.github/dependabot.yml` opens weekly grouped updates for npm packages and GitHub Actions
- Size budgets are in `scripts/check-dist.mjs`; raise them deliberately when the site legitimately grows

## Deployment

- Deployed to GitHub Pages by the GitHub Actions workflow at `.github/workflows/static.yml`
- Pushing to `master` triggers the workflow, which runs the full CI suite (`ci.yml`), builds, and publishes the `dist/` artifact to GitHub Pages
- Production build goes to `dist/`, which is gitignored and must **never** be committed
- `npm run deploy` (`gh-pages` package) is a manual alternative to the workflow
- Uses hash history routing (`/#/about`) so deep links and refresh work with GitHub Pages static hosting

## Important Notes

- The README.md contains generic TanStack template documentation and doesn't fully reflect the actual project setup
- AGENTS.md already exists with basic command documentation
- The project is **not** using Vite - it uses Rsbuild/Rspack
- The project is **not** using Vitest - it uses Rstest
