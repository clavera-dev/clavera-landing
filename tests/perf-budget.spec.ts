import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';

/**
 * M8b — brief §9.2 budgets, measured on the local production build (plan C7).
 *
 * Thresholds: LCP ≤ 2.0 s, CLS ≤ 0.05, transfer ≤ 1.2 MB, JS ≤ 100 KB.
 * They are reported, not enforced: the font decision (self-hosted ≤ 2 files
 * vs. today's Google Fonts CDN) is still open, and a local server says
 * little about real-network LCP. Each run attaches the numbers as test
 * annotations and fails only if the page cannot be measured. Chromium only —
 * the paint-timing APIs used here are Chromium's.
 *
 * Requests to fonts.googleapis.com (none expected since self-hosting) / fonts.gstatic.com are counted separately
 * so the font question has a number.
 */

const BUDGET = { lcpMs: 2000, cls: 0.05, totalBytes: 1.2 * 1024 * 1024, jsBytes: 100 * 1024 };

for (const locale of LOCALES) {
	test(`[${locale.key}] §9.2 budget report (mobile 375×667)`, async ({ page, browserName }) => {
		test.skip(browserName !== 'chromium', 'paint timing is measured in Chromium');
		await page.setViewportSize({ width: 375, height: 667 });

		// Decoded body bytes (an upper bound on transfer size), collected as
		// promises and awaited before summing so no late response is lost.
		const pending: Array<Promise<{ url: string; type: string; bytes: number }>> = [];
		page.on('response', (response) => {
			pending.push(
				response
					.body()
					.catch(() => null)
					.then((body) => ({
						url: response.url(),
						type: response.request().resourceType(),
						bytes: body?.length ?? 0,
					})),
			);
		});

		await page.addInitScript(() => {
			const w = window as unknown as { __lcp: number; __cls: number };
			w.__lcp = 0;
			w.__cls = 0;
			new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) w.__lcp = entry.startTime;
			}).observe({ type: 'largest-contentful-paint', buffered: true });
			new PerformanceObserver((list) => {
				for (const entry of list.getEntries() as Array<PerformanceEntry & { value: number; hadRecentInput: boolean }>) {
					if (!entry.hadRecentInput) w.__cls += entry.value;
				}
			}).observe({ type: 'layout-shift', buffered: true });
		});

		await page.goto(locale.path, { waitUntil: 'networkidle' });
		await page.evaluate(() => document.fonts.ready);
		// Scroll the whole page once so lazy images load and late shifts count.
		await page.evaluate(async () => {
			for (let y = 0; y < document.body.scrollHeight; y += 500) {
				window.scrollTo(0, y);
				await new Promise((r) => setTimeout(r, 30));
			}
			window.scrollTo(0, 0);
		});
		await page.waitForLoadState('networkidle');

		const { lcp, cls } = await page.evaluate(() => {
			const w = window as unknown as { __lcp: number; __cls: number };
			return { lcp: w.__lcp, cls: w.__cls };
		});

		const sizes = await Promise.all(pending);
		const total = sizes.reduce((sum, r) => sum + r.bytes, 0);
		const js = sizes.filter((r) => r.type === 'script').reduce((sum, r) => sum + r.bytes, 0);
		const fontFiles = sizes.filter((r) => r.type === 'font');
		const googleFonts = sizes.filter((r) => /fonts\.(googleapis|gstatic)\.com/.test(r.url)).length;

		const report = {
			lcpMs: Math.round(lcp),
			cls: Number(cls.toFixed(4)),
			totalKB: Math.round(total / 1024),
			jsKB: Number((js / 1024).toFixed(1)),
			fontFiles: fontFiles.length,
			googleFontRequests: googleFonts,
			overBudget: [
				lcp > BUDGET.lcpMs && 'lcp',
				cls > BUDGET.cls && 'cls',
				total > BUDGET.totalBytes && 'transfer',
				js > BUDGET.jsBytes && 'js',
			].filter(Boolean),
		};
		test.info().annotations.push({ type: 'budget', description: JSON.stringify(report) });
		console.log(`BUDGET ${locale.key} ${JSON.stringify(report)}`);

		// Measurable at all — the only hard condition.
		expect(lcp).toBeGreaterThan(0);
		expect(total).toBeGreaterThan(0);
	});
}
