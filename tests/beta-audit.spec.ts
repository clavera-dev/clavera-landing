import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';
import { ensureImagesReady } from './images';

/**
 * M3.5 beta-candidate audit.
 *
 * Two jobs:
 *
 *  1. Capture fresh DIAGNOSTIC screenshots at the breakpoints where header and
 *     navigation behaviour actually changes, which the standard 1440/768/375
 *     set steps straight over. These are NOT approved visual-regression
 *     baselines — nothing compares against them. They exist so a human can see
 *     what the build produced at the widths where the layout switches.
 *
 *  2. Assert the beta-specific interaction and containment rules that the
 *     structural suite does not already cover.
 *
 * Header behaviour, from src/components/layout/Header.astro:
 *   < 700px  — header language switcher hidden; the footer switcher carries
 *              language switching, and the header stays one control row tall.
 *   ≥ 700px  — header switcher shown; logo steps up to 28px.
 *   ≥ 1000px — the mono note appears with its divider.
 */

/** Widths that straddle each header/navigation behaviour change. */
const BREAKPOINTS = [
	{ name: '699-below-switcher', width: 699, height: 900, headerSwitcher: false },
	{ name: '700-switcher-appears', width: 700, height: 900, headerSwitcher: true },
	{ name: '999-below-note', width: 999, height: 900, headerSwitcher: true },
	{ name: '1000-note-appears', width: 1000, height: 900, headerSwitcher: true },
];

for (const locale of LOCALES) {
	test.describe(`[${locale.key}] beta audit`, () => {
		test.beforeEach(async ({ page }) => {
			await ensureImagesReady(page);
		});

		for (const bp of BREAKPOINTS) {
			test(`header and navigation behave correctly @ ${bp.width}px`, async ({ page }) => {
				await page.setViewportSize({ width: bp.width, height: bp.height });
				await page.goto(locale.path);

				const headerSwitcher = page.locator('header nav.lang');
				if (bp.headerSwitcher) {
					await expect(headerSwitcher, 'header switcher shown').toBeVisible();
				} else {
					await expect(headerSwitcher, 'header switcher hidden').toBeHidden();
					// Language switching must still be reachable somewhere.
					await expect(page.locator('footer nav.lang'), 'footer switcher').toBeVisible();
				}

				// The header must stay a single control row: a wrapped header
				// silently invalidates --header-h, which hero padding and every
				// anchor offset are derived from.
				const geometry = await page.evaluate(() => {
					const header = document.querySelector('.site-header') as HTMLElement;
					const inner = header.querySelector('.site-header__inner') as HTMLElement;
					const logo = header.querySelector('.site-header__logo') as HTMLElement;
					const cta = header.querySelector('.button') as HTMLElement;
					return {
						headerHeight: header.getBoundingClientRect().height,
						innerWidth: inner.getBoundingClientRect().width,
						logoRight: logo.getBoundingClientRect().right,
						ctaLeft: cta.getBoundingClientRect().left,
						ctaRight: cta.getBoundingClientRect().right,
						viewport: document.documentElement.clientWidth,
					};
				});

				// Header contained horizontally.
				expect(geometry.ctaRight, 'header CTA inside the viewport').toBeLessThanOrEqual(
					geometry.viewport + 1,
				);
				// Logo and CTA on the same row, not stacked.
				expect(geometry.logoRight, 'logo does not overlap the CTA').toBeLessThanOrEqual(
					geometry.ctaLeft + 1,
				);
			});

			test(`diagnostic capture @ ${bp.width}px`, async ({ page, browserName }) => {
				test.skip(browserName !== 'chromium', 'chromium captures the diagnostics');

				await page.setViewportSize({ width: bp.width, height: bp.height });
				await page.goto(locale.path);

				const failures = await page.evaluate(() => window.__claveraEnsureImages());
				expect(failures, 'images not ready for capture').toEqual([]);

				await page.screenshot({
					path: `test-results/screenshots/m3-5-audit/${locale.key}-${bp.name}.png`,
					fullPage: true,
				});
			});
		}

		test('hero primary CTA is visible without scrolling on 375x667', async ({ page }) => {
			// Brief S1: "высота первого экрана такова, что основной CTA виден без
			// скролла на 375×667" — the smallest phone the brief names.
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto(locale.path);

			// Measure the settled layout, not the fallback-font first paint:
			// the display face changes the Russian headline's line count, and
			// measuring mid-swap reports a height the reader never sees.
			await page.evaluate(() => document.fonts.ready);

			const cta = page.locator('.hero__actions a').first();
			const box = await cta.boundingBox();
			expect(box, 'hero CTA has a box').not.toBeNull();
			expect(box!.y + box!.height, 'hero CTA bottom within the first screen').toBeLessThanOrEqual(
				667,
			);
		});

		test('survey CTA fits its column and keeps its label on screen at 375px', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 812 });
			await page.goto(locale.path);

			const links = page.locator('[data-typeform-boundary] a');
			// The pilot boundary renders text while its URL is pending, so only
			// the live destinations are measured here.
			expect(await links.count(), 'live destination links').toBeGreaterThan(0);

			for (const link of await links.all()) {
				const box = await link.boundingBox();
				expect(box, 'survey CTA has a box').not.toBeNull();
				expect(box!.x, 'CTA left edge on screen').toBeGreaterThanOrEqual(-1);
				expect(box!.x + box!.width, 'CTA right edge on screen').toBeLessThanOrEqual(376);

				// The label must not be cut off by its own box.
				const overflowing = await link.evaluate(
					(el) => el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX !== 'visible',
				);
				expect(overflowing, 'CTA label clipped').toBe(false);
			}
		});

		test('the render disclosure stays visible and legible', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 812 });
			await page.goto(locale.path);

			// Brief S8 blocker: the marking must be HTML text, at least 12px.
			const disclosures = page.locator('.render-figure__disclosure, .hero__disclosure');
			const count = await disclosures.count();
			expect(count, 'disclosures present').toBeGreaterThan(0);

			const sizes = await disclosures.evaluateAll((els) =>
				els.map((el) => ({
					size: parseFloat(getComputedStyle(el).fontSize),
					hidden:
						getComputedStyle(el).display === 'none' ||
						getComputedStyle(el).visibility === 'hidden',
				})),
			);

			for (const item of sizes) {
				expect(item.hidden, 'disclosure hidden').toBe(false);
				expect(item.size, 'disclosure font size').toBeGreaterThanOrEqual(12);
			}
		});

		test('the footer stays inside the viewport at 375px', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 812 });
			await page.goto(locale.path);

			const offenders = await page.evaluate(() => {
				const vw = document.documentElement.clientWidth;
				const out: string[] = [];
				document.querySelectorAll<HTMLElement>('footer *').forEach((el) => {
					const rect = el.getBoundingClientRect();
					if (rect.width > 0 && (rect.right > vw + 2 || rect.left < -2)) {
						out.push(`${el.tagName}.${String(el.className).trim().split(/\s+/)[0]}`);
					}
				});
				return out;
			});

			expect(offenders, 'footer elements outside the viewport').toEqual([]);
		});

		test('S7 keeps its approved shape: no CLAVERA figure in the cost row', async ({ page }) => {
			await page.goto(locale.path);

			// S7 must not be altered by this milestone. This pins the one property
			// that matters most legally: the CLAVERA cost cell carries no number.
			const costCell = await page.evaluate(() => {
				const table = document.querySelector('#comparacion table');
				if (!table) return null;
				const rows = Array.from(table.querySelectorAll('tbody tr'));
				// The CLAVERA column is the last one in every locale.
				for (const row of rows) {
					const cells = Array.from(row.querySelectorAll('td'));
					if (cells.length === 0) continue;
					const last = cells[cells.length - 1] as HTMLElement;
					if (/ARS|\d{2}\.\d{3}|\d{2},\d{3}/.test(last.innerText)) return last.innerText;
				}
				return '';
			});

			expect(costCell, 'CLAVERA column contains a currency figure').toBe('');
		});
	});
}
