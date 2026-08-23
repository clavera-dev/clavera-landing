import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';

/**
 * Internal-link integrity (M3.5).
 *
 * The beta candidate must contain no clickable link to a route that does not
 * exist. `/privacidad`, `/terminos`, `/cookies`, `/espacios` and
 * `/desarrolladores` are not built yet, so the footer renders those entries as
 * plain text instead of anchors.
 *
 * That is an interim presentation choice ONLY. The three legal routes remain
 * mandatory blockers for real public deployment — this file proves the beta
 * has no broken link, not that the legal obligation is discharged.
 */

/** Routes the build actually produces. */
const EXISTING_ROUTES = new Set(['/', '/en/', '/ru/']);

/** Mandatory routes that do not exist yet and must therefore not be linked. */
const UNBUILT_ROUTES = [
	'/privacidad',
	'/terminos',
	'/cookies',
	'/espacios',
	'/desarrolladores',
	'/gracias',
];

for (const locale of LOCALES) {
	test.describe(`[${locale.key}] links`, () => {
		test('every internal link resolves to a route that exists', async ({ page }) => {
			await page.goto(locale.path);

			const internal = await page.evaluate(() =>
				Array.from(document.querySelectorAll('a[href]'))
					.map((a) => a.getAttribute('href') ?? '')
					.filter((href) => href.startsWith('/') && !href.startsWith('//')),
			);

			expect(internal.length, 'internal links found').toBeGreaterThan(0);

			const broken: string[] = [];
			for (const href of internal) {
				// Stylesheet and asset hrefs are not navigation; only <a> is read
				// above, so anything here is a destination a visitor can reach.
				const [path] = href.split('#');
				const normalised = path === '' ? locale.path : path;
				if (!EXISTING_ROUTES.has(normalised)) broken.push(href);
			}

			expect(broken, 'internal links to routes that do not exist').toEqual([]);
		});

		test('every in-page anchor target exists', async ({ page }) => {
			await page.goto(locale.path);

			const missing = await page.evaluate(() => {
				const out: string[] = [];
				document.querySelectorAll('a[href]').forEach((a) => {
					const href = a.getAttribute('href') ?? '';
					const hash = href.includes('#') ? href.slice(href.indexOf('#') + 1) : '';
					if (!hash) return;
					if (!document.getElementById(hash)) out.push(href);
				});
				return out;
			});

			expect(missing, 'anchors with no matching element').toEqual([]);
		});

		test('does not link to any not-yet-built route', async ({ page }) => {
			await page.goto(locale.path);

			const hrefs = await page.evaluate(() =>
				Array.from(document.querySelectorAll('a[href]')).map((a) => a.getAttribute('href') ?? ''),
			);

			for (const route of UNBUILT_ROUTES) {
				const offenders = hrefs.filter((href) => href === route || href.startsWith(`${route}/`));
				expect(offenders, `clickable link to unbuilt route ${route}`).toEqual([]);
			}
		});

		test('names the pending legal routes as text, so the gate stays visible', async ({ page }) => {
			await page.goto(locale.path);

			// The obligation must not vanish from the page just because the routes
			// are not built: the entries are still listed, and marked pending.
			const footer = page.locator('footer');
			await expect(footer.locator('[class*="pending-item"]'), 'pending entries').toHaveCount(5);
			await expect(footer.locator('[class*="site-footer__pending"]').last()).toBeVisible();
		});

		test('every internal navigation actually loads', async ({ page }) => {
			await page.goto(locale.path);

			const internal = await page.evaluate(() =>
				Array.from(
					new Set(
						Array.from(document.querySelectorAll('a[href]'))
							.map((a) => a.getAttribute('href') ?? '')
							.filter((href) => href.startsWith('/') && !href.startsWith('//'))
							.map((href) => href.split('#')[0])
							.filter((href) => href !== ''),
					),
				),
			);

			for (const href of internal) {
				const response = await page.request.get(href);
				expect(response.status(), `GET ${href}`).toBe(200);
			}
		});

		test('the language switcher reaches every locale and each target loads', async ({ page }) => {
			await page.goto(locale.path);

			for (const target of LOCALES) {
				const link = page.locator(`footer nav.lang a[href="${target.path}"]`).first();
				await expect(link, `switcher link to ${target.key}`).toHaveCount(1);
				const response = await page.request.get(target.path);
				expect(response.status(), `GET ${target.path}`).toBe(200);
			}
		});
	});
}
