// Site-wide constants. Keep this file free of imports: rsbuild.config.ts
// imports it at build time for the static <title> and social meta tags.
export const SITE = {
  name: 'Christopher De Jesus',
  title: 'Christopher De Jesus | Software Engineer',
  description:
    'Portfolio of Christopher De Jesus, a software engineer working at the intersection of cognition and computation: software, robotics and research projects.',
  url: 'https://gamma2653.github.io',
  ogImage: 'https://gamma2653.github.io/og-image.png',
} as const;

export function pageTitle(page?: string): string {
  return page ? `${page} | ${SITE.name}` : SITE.title;
}
