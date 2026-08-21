import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright runs against the real production build served by
 * `scripts/serve-dist.mjs`, not the dev server: the dev server can serve stale
 * scoped CSS after a component edit, which would make layout assertions
 * untrustworthy.
 *
 * This config deliberately reads no environment variables. Doing so would need
 * `@types/node` purely to typecheck the harness, and the project rule is not to
 * add a dependency where plain TypeScript suffices. When CI is introduced,
 * add `@types/node` at that point and reintroduce the CI switches
 * (`forbidOnly`, `retries`, `reuseExistingServer`) together with it.
 */
const PORT = 4321;
export const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	reporter: [['list']],

	use: {
		baseURL: BASE_URL,
		trace: 'retain-on-failure',
	},

	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		{ name: 'firefox', use: { ...devices['Desktop Firefox'] } },
		{ name: 'webkit', use: { ...devices['Desktop Safari'] } },
	],

	webServer: {
		// `astro preview` detaches in this Astro version, so Playwright would see
		// its process exit immediately. scripts/serve-dist.mjs stays in the
		// foreground and adds no dependency.
		command: `yarn build && node scripts/serve-dist.mjs dist ${PORT}`,
		url: `${BASE_URL}/`,
		/*
		  Never reuse whatever happens to hold the port. Reuse would silently
		  test a stale dist from an earlier run — or an entirely unrelated
		  server — and report it as a pass. With this false, Playwright always
		  runs `yarn build` and serves that fresh output, and fails loudly if
		  the port is already taken.
		*/
		reuseExistingServer: false,
		timeout: 180_000,
		stdout: 'ignore',
		stderr: 'pipe',
	},
});
