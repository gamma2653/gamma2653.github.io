import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/rspack';
import { SITE } from './src/lib/site';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  
  tools: {
      rspack: {
          plugins: [
              tanstackRouter({
                  target: 'react',
                  autoCodeSplitting: true,
                  routesDirectory: "./src/routes",
                  generatedRouteTree: "./src/routeTree.gen.ts",
              }),
          ],

      },
  },
  source: {
        entry: {
            index: './src/main.tsx',
        },
    //     tsconfigPath: 'tsconfig.json',
    },
  html: {
    // Custom template only to declare the document language.
    template: './src/template.html',
    favicon: 'src/assets/images/favicon.png',
    title: SITE.title,
    // Site-wide social tags are static: URL fragments (/#/about) are never
    // sent to crawlers, so per-route tags could not be seen anyway.
    meta: {
      description: SITE.description,
      'twitter:card': 'summary_large_image',
      'twitter:title': SITE.title,
      'twitter:description': SITE.description,
      'twitter:image': SITE.ogImage,
    },
    tags: [
      { tag: 'meta', attrs: { property: 'og:type', content: 'website' }, head: true },
      { tag: 'meta', attrs: { property: 'og:site_name', content: SITE.name }, head: true },
      { tag: 'meta', attrs: { property: 'og:title', content: SITE.title }, head: true },
      { tag: 'meta', attrs: { property: 'og:description', content: SITE.description }, head: true },
      { tag: 'meta', attrs: { property: 'og:url', content: SITE.url }, head: true },
      { tag: 'meta', attrs: { property: 'og:image', content: SITE.ogImage }, head: true },
    ],
  },
  // output: {
  //   distPath: 'docs'
  // }
});
