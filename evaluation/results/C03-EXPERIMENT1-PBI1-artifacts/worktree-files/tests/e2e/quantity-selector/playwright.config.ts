import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: ['**/*.spec.ts'],
  fullyParallel: true,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'test-results/quantity-selector' }]],
  use: {
    baseURL: 'http://localhost:3333',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'node serve.mjs',
    url: 'http://localhost:3333/fixture.html',
    reuseExistingServer: !process.env.CI,
    timeout: 10000,
  },
});
