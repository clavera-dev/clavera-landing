import { test, expect } from '@playwright/test';
import { LOCALES, SCREENSHOT_VIEWPORTS } from './locales';
import { ensureImagesReady } from './images';

/**
 * Diagnostic screenshots only.
 *
 * These are NOT approved visual-regression baselines. The composition is still
 * being redesigned against three locales, so nothing here is a reference the
 * suite compares against — they exist so a human can look at what the build
 * actually produced. Baselines are established later (execution plan M8).
 *
 * Every capture is gated on proof that all images loaded AND decoded; an
 * earlier version captured blank render panels because it only waited on a
 * fixed timeout.
 *
 * Only chromium writes them, so the three engines do not overwrite each other.
 */
test.describe('diagnostic screenshots', () => {
	test.skip(({ browserName }) => browserName !== 'chromium', 'chromium captures the diagnostics');

	test.beforeEach(async ({ page }) => {
		await ensureImagesReady(page);
	});

	for (const locale of LOCALES) {
		for (const viewport of SCREENSHOT_VIEWPORTS) {
			test(`[${locale.key}] @ ${viewport.name}px`, async ({ page }) => {
				await page.setViewportSize({ width: viewport.width, height: viewport.height });
				await page.goto(locale.path);

				// Hard gate: refuse to capture a page with an unloaded image.
				const failures = await page.evaluate(() => window.__claveraEnsureImages());
				expect(failures, 'images not ready for capture').toEqual([]);

				// Every render must be painting real pixels, not an empty box.
				const unpainted = await page.evaluate(() =>
					Array.from(document.querySelectorAll('figure img'))
						.filter((img) => {
							const el = img as HTMLImageElement;
							const box = el.getBoundingClientRect();
							return el.naturalWidth === 0 || box.width < 1 || box.height < 1;
						})
						.map((img) => (img as HTMLImageElement).currentSrc),
				);
				expect(unpainted, 'render panels with no painted image').toEqual([]);

				await page.screenshot({
					path: `test-results/screenshots/${locale.key}-${viewport.name}.png`,
					fullPage: true,
				});
			});
		}
	}
});
