import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';

/**
 * No page may scroll sideways on a phone, in any locale (CLAUDE.md: absorb
 * translation expansion with wrapping, never clipping). The comparison table
 * scrolls inside its own labelled region and is the only intended exception;
 * it does not widen the document.
 *
 * 320px is the narrowest supported width. Russian display headings at the
 * 44px step used to overflow here (велосипедами, присоединяйся).
 */
for (const locale of LOCALES) {
	for (const width of [320, 360, 375]) {
		test(`[${locale.key}] the home page does not scroll sideways at ${width}px`, async ({ page }) => {
			await page.setViewportSize({ width, height: 800 });
			await page.goto(locale.path);
			const { scrollWidth, clientWidth } = await page.evaluate(() => ({
				scrollWidth: document.documentElement.scrollWidth,
				clientWidth: document.documentElement.clientWidth,
			}));
			expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
		});
	}
}
