import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;
const isCI = !!process.env.CI;

// Docs: https://playwright.dev/docs/test-configuration
// End-to-end tests run against the production build served by `rsbuild preview`,
// so run `npm run build` first (CI downloads the build job's `dist/`).
export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e.ts',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: `npm run preview -- --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !isCI,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] }, testIgnore: '**/a11y.e2e.ts' },
    { name: 'webkit', use: { ...devices['Desktop Safari'] }, testIgnore: '**/a11y.e2e.ts' },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
