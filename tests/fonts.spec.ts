import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';

/**
 * Display type per locale. Plus Jakarta Sans has no basic Cyrillic, so the
 * designer chose Onest for Russian display type (2026-10-07,
 * docs/project/FONTS_DECISION_FACTS.md). Checks the declared family only, so
 * it does not depend on the font CDN being reachable.
 */

const firstFamily = (stack: string) => stack.split(',')[0]!.trim().replace(/^["']|["']$/g, '');

for (const locale of LOCALES) {
	const expected = locale.key === 'ru' ? 'Onest' : 'Plus Jakarta Sans';

	test(`[${locale.key}] headings are set in ${expected}`, async ({ page }) => {
		await page.goto(locale.path);
		const families = await page
			.locator('h1, h2, h3')
			.evaluateAll((els) => els.map((el) => getComputedStyle(el).fontFamily));
		expect(families.length).toBeGreaterThan(0);
		const display = families.map(firstFamily).filter((f) => f === 'Onest' || f === 'Plus Jakarta Sans');
		expect(display.length).toBeGreaterThan(0);
		expect(new Set(display)).toEqual(new Set([expected]));
	});
}
