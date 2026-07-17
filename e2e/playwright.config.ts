import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:4300",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npx serve ../app/out -l 4300",
    url: "http://localhost:4300",
    reuseExistingServer: !process.env.CI,
    cwd: __dirname,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
