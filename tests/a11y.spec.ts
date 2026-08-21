import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { LOCALES, SCREENSHOT_VIEWPORTS } from './locales';

/**
 * Automatically detectable accessibility issues only. A clean axe run is a
 * floor, not a substitute for manual keyboard and screen-reader review.
 */
for (const locale of LOCALES) {
	for (const viewport of SCREENSHOT_VIEWPORTS) {
		test(`[${locale.key}] axe scan @ ${viewport.name}px`, async ({ page }) => {
			await page.setViewportSize({ width: viewport.width, height: viewport.height });
			await page.goto(locale.path);

			const results = await new AxeBuilder({ page })
				.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
				.analyze();

			const summary = results.violations.map((v) => ({
				id: v.id,
				impact: v.impact,
				nodes: v.nodes.length,
				help: v.help,
			}));

			expect(summary, 'axe violations').toEqual([]);
		});
	}
}
