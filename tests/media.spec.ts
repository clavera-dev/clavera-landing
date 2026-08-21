import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';
import { ensureImagesReady } from './images';

for (const locale of LOCALES) {
	test.describe(`[${locale.key}] media`, () => {
		test.beforeEach(async ({ page }) => {
			await ensureImagesReady(page);
		});

		test('loads and decodes every image', async ({ page }) => {
			await page.goto(locale.path);
			const broken = await page.evaluate(() => window.__claveraEnsureImages());
			expect(broken, 'images that failed to load or decode').toEqual([]);
		});

		test('gives every image non-empty alt text in this locale', async ({ page }) => {
			await page.goto(locale.path);
			const missing = await page.locator('img').evaluateAll((imgs) =>
				imgs.filter((i) => !i.getAttribute('alt')?.trim()).map((i) => i.getAttribute('src')),
			);
			expect(missing, 'images without alt text').toEqual([]);
		});

		test('carries the exact disclosure in every figcaption', async ({ page }) => {
			await page.goto(locale.path);

			const figures = await page.locator('figure').count();
			const captions = page.locator('.render-figure__disclosure, .hero__disclosure');
			await expect(captions, 'one disclosure per render figure').toHaveCount(figures);

			const texts = await captions.evaluateAll((els) =>
				els.map((e) => (e.textContent ?? '').replace(/\s+/g, ' ').trim()),
			);
			for (const text of texts) {
				expect(text, 'figcaption disclosure is verbatim').toBe(locale.disclosure);
			}
		});

		test('repeats the exact disclosure in every render alt', async ({ page }) => {
			await page.goto(locale.path);

			// Brief S8 blocker: the disclosure must be duplicated in <figcaption>
			// AND in alt, so a screen-reader user is told the image is not an
			// operating facility even though they never reach the caption.
			const alts = await page
				.locator('figure img')
				.evaluateAll((imgs) => imgs.map((i) => (i.getAttribute('alt') ?? '').replace(/\s+/g, ' ').trim()));

			expect(alts.length, 'every figure has an image').toBeGreaterThan(0);
			for (const alt of alts) {
				expect(alt.endsWith(locale.disclosure), `alt ends with the disclosure: "${alt}"`).toBe(true);
				// The literal visual description must survive in front of it.
				const description = alt.slice(0, -locale.disclosure.length).trim();
				expect(description.length, 'alt keeps its visual description').toBeGreaterThan(30);
			}
		});

		test('includes the hero render in the disclosure guarantee', async ({ page }) => {
			await page.goto(locale.path);
			const heroAlt = await page.locator('.hero__media img').getAttribute('alt');
			expect(heroAlt ?? '', 'hero R1 alt carries the disclosure').toContain(locale.disclosure);

			const heroCaption = await page.locator('.hero__disclosure').textContent();
			expect((heroCaption ?? '').replace(/\s+/g, ' ').trim()).toBe(locale.disclosure);
		});
	});
}
