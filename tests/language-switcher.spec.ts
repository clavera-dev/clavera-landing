import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';

/**
 * The switcher must be ordinary links: reachable by keyboard, working with
 * JavaScript disabled, and pointing at the equivalent page in each locale.
 */
for (const locale of LOCALES) {
	test.describe(`[${locale.key}] language switcher`, () => {
		test('offers all three locales in the fixed ES · EN · RU order', async ({ page }) => {
			await page.goto(locale.path);
			const links = page.locator('footer nav.lang').locator('a');
			await expect(links).toHaveCount(3);
			const hrefs = await links.evaluateAll((els) => els.map((e) => e.getAttribute('href')));
			expect(hrefs).toEqual(['/', '/en/', '/ru/']);
		});

		test('marks the active locale with aria-current', async ({ page }) => {
			await page.goto(locale.path);
			const current = page.locator('footer nav.lang').locator('a[aria-current="true"]');
			await expect(current).toHaveCount(1);
			await expect(current).toHaveAttribute('href', locale.path);
		});

		test('is always reachable in the footer, and in the header from 700px up', async ({ page }) => {
			await page.goto(locale.path);

			// The footer switcher is present at every width.
			await expect(page.locator('footer nav.lang')).toHaveCount(1);

			// The header switcher is in the DOM at every width but is only shown
			// once the header row has space for it; below that the header would
			// grow a second row and break the derived --header-h.
			await page.setViewportSize({ width: 375, height: 812 });
			await expect(page.locator('header nav.lang')).toBeHidden();
			await expect(page.locator('footer nav.lang')).toBeVisible();

			await page.setViewportSize({ width: 1024, height: 768 });
			await expect(page.locator('header nav.lang')).toBeVisible();
		});

		test('navigates to every other locale without JavaScript', async ({ browser }) => {
			const context = await browser.newContext({ javaScriptEnabled: false });
			const page = await context.newPage();

			for (const target of LOCALES) {
				await page.goto(locale.path);
				await page.locator(`header nav.lang a[href="${target.path}"]`).click();
				await page.waitForURL(`**${target.path}`);
				await expect(page.locator('html')).toHaveAttribute('lang', target.lang);
				await expect(page.locator('body')).toContainText(target.marker);
			}

			await context.close();
		});
	});
}
