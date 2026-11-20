// The routes of the site, with what each one must show. Titles mirror
// `pageTitle()` in src/lib/site.ts.
export const PAGES = [
  { path: '/', title: 'Christopher De Jesus | Software Engineer', heading: 'Christopher De Jesus' },
  { path: '/about', title: 'About | Christopher De Jesus', heading: 'About Me' },
  { path: '/software', title: 'Software Projects | Christopher De Jesus', heading: 'Software' },
  { path: '/robotics', title: 'Robotics | Christopher De Jesus', heading: 'Robotics' },
  { path: '/academics', title: 'Academics & Research | Christopher De Jesus', heading: 'Academic & Research Projects' },
  { path: '/contact', title: 'Contact | Christopher De Jesus', heading: 'Get in Touch' },
] as const;

/** Hash-history URL for a route (`/about` is served as `/#/about`). */
export function url(path: string): string {
  return `/#${path}`;
}
