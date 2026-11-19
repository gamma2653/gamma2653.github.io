// Checks the production build in dist/ the way GitHub Pages will serve it:
// every local file the page references exists, the document carries the tags
// crawlers and browsers need, nothing dev-only shipped, and sizes stay in budget.
// Usage: npm run build && npm run check:dist
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { gzipSync } from 'node:zlib';

const DIST = 'dist';
const KB = 1024;

// Budgets sit roughly 25% above the build at the time of writing.
const BUDGETS = {
  initialJsGzip: 160 * KB, // scripts in index.html, gzipped
  initialCssGzip: 12 * KB,
  largestImage: 250 * KB,
  total: 1700 * KB,
};

const errors = [];
const fail = (message) => errors.push(message);
const kb = (bytes) => `${(bytes / KB).toFixed(1)} kB`;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('dist/index.html not found. Run `npm run build` first.');
  process.exit(1);
}

const html = readFileSync(join(DIST, 'index.html'), 'utf8');
const files = walk(DIST);

// --- Document ---------------------------------------------------------------
const required = [
  [/<!doctype html>/i, 'a doctype'],
  [/<html[^>]*\slang="[a-z-]+"/i, 'a lang attribute on <html>'],
  [/<meta charset="utf-8"/i, 'a UTF-8 charset'],
  [/<meta name="viewport"/i, 'a viewport meta tag'],
  [/<title>[^<]+<\/title>/i, 'a non-empty <title>'],
  [/<meta name="description" content="[^"]{50,}"/i, 'a meta description of at least 50 characters'],
  [/<link rel="icon"/i, 'a favicon link'],
  [/<div id="root">/i, 'the #root mount point'],
  ...['og:type', 'og:site_name', 'og:title', 'og:description', 'og:url', 'og:image'].map((property) => [
    new RegExp(`<meta property="${property}" content="[^"]+"`),
    `the ${property} tag`,
  ]),
  ...['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'].map((name) => [
    new RegExp(`<meta name="${name}" content="[^"]+"`),
    `the ${name} tag`,
  ]),
];
for (const [pattern, what] of required) {
  if (!pattern.test(html)) fail(`index.html is missing ${what}`);
}

// --- References ---------------------------------------------------------------
const SITE_ORIGIN = 'https://gamma2653.github.io';
const references = [...html.matchAll(/(?:src|href|content)="([^"]+)"/g)]
  .map(([, value]) => (value.startsWith(SITE_ORIGIN + '/') ? value.slice(SITE_ORIGIN.length) : value))
  .filter((value) => value.startsWith('/') && !value.startsWith('//'));
for (const reference of references) {
  if (!existsSync(join(DIST, reference.split(/[?#]/)[0]))) fail(`index.html references ${reference}, which is not in dist/`);
}

// Asset URLs inside the CSS and JS bundles (images, fonts, lazy chunks).
for (const file of files.filter((path) => ['.js', '.css'].includes(extname(path)))) {
  const source = readFileSync(file, 'utf8');
  for (const [reference] of source.matchAll(/\/?static\/(?:image|font|css|js|svg|media)\/[\w./-]+\.\w+/g)) {
    if (!existsSync(join(DIST, reference))) fail(`${relative(DIST, file)} references ${reference}, which is not in dist/`);
  }
}

// --- Nothing dev-only -----------------------------------------------------------
for (const file of files) {
  const name = relative(DIST, file);
  if (extname(file) === '.map') fail(`${name}: source maps should not be deployed`);
  if (extname(file) !== '.js') continue;
  const source = readFileSync(file, 'utf8');
  if (/TanStackRouterDevtools/.test(source)) fail(`${name} contains the router devtools`);
  if (/\blocalhost:\d+/.test(source)) fail(`${name} references localhost`);
}

// --- Budgets ------------------------------------------------------------------
const gzipOf = (paths) => paths.reduce((sum, path) => sum + gzipSync(readFileSync(join(DIST, path))).length, 0);
const initialJs = [...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map(([, src]) => src);
const initialCss = [...html.matchAll(/<link[^>]*href="([^"]+\.css)"/g)].map(([, href]) => href);
const images = files.filter((path) => /\.(png|jpe?g|webp|avif|gif|svg)$/.test(path));
const largestImage = images.reduce((largest, path) => (statSync(path).size > statSync(largest).size ? path : largest));

const measured = [
  ['Initial JS (gzip)', gzipOf(initialJs), BUDGETS.initialJsGzip],
  ['Initial CSS (gzip)', gzipOf(initialCss), BUDGETS.initialCssGzip],
  [`Largest image (${relative(DIST, largestImage)})`, statSync(largestImage).size, BUDGETS.largestImage],
  ['Total dist/', files.reduce((sum, path) => sum + statSync(path).size, 0), BUDGETS.total],
];
for (const [label, size, budget] of measured) {
  console.log(`${size > budget ? '✗' : '✓'} ${label}: ${kb(size)} (budget ${kb(budget)})`);
  if (size > budget) fail(`${label} is ${kb(size)}, over the ${kb(budget)} budget`);
}

for (const image of images.filter((path) => /\.jpe?g$/.test(path))) {
  fail(`${relative(DIST, image)}: ship photos as WebP or AVIF, not JPEG`);
}

if (errors.length > 0) {
  console.error(`\n${errors.length} problem(s) in dist/:`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log(`\ndist/ looks good: ${files.length} files, ${references.length} references checked.`);
