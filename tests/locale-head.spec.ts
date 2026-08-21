import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';

/** Every locale must be a complete, self-describing static document. */
for (const locale of LOCALES) {
	test.describe(`[${locale.key}] document head`, () => {
		test('loads and renders its own copy', async ({ page }) => {
			const response = await page.goto(locale.path);
			expect(response?.status(), 'HTTP status').toBe(200);
			await expect(page.locator('body')).toContainText(locale.marker);
		});

		test('declares the correct html lang', async ({ page }) => {
			await page.goto(locale.path);
			await expect(page.locator('html')).toHaveAttribute('lang', locale.lang);
		});

		test('canonical points at itself', async ({ page }) => {
			await page.goto(locale.path);
			const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
			expect(canonical, 'canonical href').toBe(`https://clavera.ar${locale.path}`);
		});

		test('declares hreflang for all locales plus x-default', async ({ page }) => {
			await page.goto(locale.path);
			const alternates = await page.locator('link[rel="alternate"]').evaluateAll((links) =>
				links.map((l) => ({
					hreflang: l.getAttribute('hreflang'),
					href: l.getAttribute('href'),
				})),
			);

			expect(alternates).toEqual(
				expect.arrayContaining([
					{ hreflang: 'es-AR', href: 'https://clavera.ar/' },
					{ hreflang: 'en', href: 'https://clavera.ar/en/' },
					{ hreflang: 'ru', href: 'https://clavera.ar/ru/' },
					{ hreflang: 'x-default', href: 'https://clavera.ar/' },
				]),
			);
		});

		test('has exactly one h1', async ({ page }) => {
			await page.goto(locale.path);
			await expect(page.locator('h1')).toHaveCount(1);
		});

		test('serves localized content in the static HTML, without JavaScript', async ({ browser }) => {
			// A context with JavaScript disabled proves the copy is server-rendered.
			const context = await browser.newContext({ javaScriptEnabled: false });
			const page = await context.newPage();
			await page.goto(locale.path);
			await expect(page.locator('body')).toContainText(locale.marker);
			await context.close();
		});
	});
}
