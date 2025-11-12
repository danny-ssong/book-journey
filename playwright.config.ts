import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

export default defineConfig({
  testDir: "./tests/e2e",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  globalSetup: "./tests/e2e/fixture/db-reset.setup.ts",

  use: {
    baseURL: "http://localhost:3001",
    ignoreHTTPSErrors: true,
    locale: "ko-KR",
    timezoneId: "Asia/Seoul",
    actionTimeout: 3000,

    trace: "on-first-retry",
  },

  projects: [
    { name: "setup", testMatch: ["tests/e2e/**/*.setup.spec.ts"] },
    {
      name: "guest",
      use: { ...devices["Desktop Chrome"] },
      testMatch: ["tests/e2e/**/*.guest.spec.ts"],
    },
    {
      name: "authenticated",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "tests/e2e/.auth.json",
      },
      testIgnore: [
        "tests/e2e/**/*.setup.spec.ts",
        "tests/e2e/**/*.guest.spec.ts",
      ],
      dependencies: ["setup"],
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: "npm run start",
  //   url: "http://localhost:3001",
  //   reuseExistingServer: !process.env.CI,
  // },
});
