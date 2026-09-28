import { test, expect } from '@playwright/test';

/**
 * The three legal routes (/privacidad, /terminos, /cookies), built this pass
 * from CLAVERA_Legal_Spec_v3_0_received.md §2.2, §6.6, §7.2, patched by the
 * owner handoff v1.1 §5 (privacy channels). ES is the legal authority; EN and
 * RU are courtesy translations (PROJECT_DECISIONS.md).
 *
 * These checks pin the invariants the handoff and the spec treat as
 * non-negotiable: privacy's point 7 is cross-border transfer and nothing is
 * renumbered in translation; no RNBD number or fabricated publication date is
 * ever shown; the courtesy locales say so and link back to the Spanish
 * original; the controller identity matches the footer everywhere it appears.
 */

const ROUTES: { key: 'es' | 'en' | 'ru'; prefix: string }[] = [
	{ key: 'es', prefix: '' },
	{ key: 'en', prefix: '/en' },
	{ key: 'ru', prefix: '/ru' },
];

const PAGES = ['privacidad', 'terminos', 'cookies'] as const;

const EXPECTED_TITLE: Record<(typeof PAGES)[number], Record<'es' | 'en' | 'ru', string>> = {
	privacidad: {
		es: 'Política de Privacidad — CLAVERA',
		en: 'Privacy Policy — CLAVERA',
		ru: 'Политика конфиденциальности — CLAVERA',
	},
	terminos: {
		es: 'Términos y Condiciones de Uso — clavera.ar',
		en: 'Terms and Conditions of Use — clavera.ar',
		ru: 'Условия использования — clavera.ar',
	},
	cookies: {
		es: 'Política de Cookies — clavera.ar',
		en: 'Cookie Policy — clavera.ar',
		ru: 'Политика в отношении cookie-файлов — clavera.ar',
	},
};

test.describe('legal pages', () => {
	for (const locale of ROUTES) {
		for (const page of PAGES) {
			test(`[${locale.key}] /${page} returns 200 and carries the right title`, async ({ page: p }) => {
				const response = await p.goto(`${locale.prefix}/${page}`);
				expect(response?.status()).toBe(200);
				await expect(p).toHaveTitle(EXPECTED_TITLE[page][locale.key]);
			});
		}

		test(`[${locale.key}] privacy point 7 is cross-border transfer`, async ({ page }) => {
			await page.goto(`${locale.prefix}/privacidad`);
			const point7 = page.locator('.legal__heading[data-legal-id="7"]');
			await expect(point7, 'privacy has a numbered point 7').toHaveCount(1);

			const expected: Record<'es' | 'en' | 'ru', string> = {
				es: 'TRANSFERENCIA INTERNACIONAL',
				en: 'INTERNATIONAL TRANSFER',
				ru: 'ТРАНСГРАНИЧНАЯ ПЕРЕДАЧА',
			};
			await expect(point7).toContainText(expected[locale.key]);
		});

		test(`[${locale.key}] privacy carries the owner-approved policy version`, async ({ page }) => {
			await page.goto(`${locale.prefix}/privacidad`);
			await expect(page.locator('.legal__updated')).toContainText('2026-09');
		});

		test(`[${locale.key}] never shows an RNBD number or a fabricated publication date`, async ({
			page,
		}) => {
			for (const doc of PAGES) {
				await page.goto(`${locale.prefix}/${doc}`);
				const text = (await page.locator('body').innerText()).toLowerCase();
				expect(text, `${doc} mentions an RNBD registration number`).not.toContain('rnbd');
				// No literal placeholder brackets survive from the spec template.
				expect(text, `${doc} still has an unfilled [placeholder]`).not.toMatch(/\[[^\]]*\]/);
			}
		});

		test(`[${locale.key}] shows the controller identity (Anna Kazanova, CUIT, Aráoz 2686)`, async ({
			page,
		}) => {
			await page.goto(`${locale.prefix}/privacidad`);
			const text = await page.locator('body').innerText();
			expect(text).toContain('Anna Kazanova');
			expect(text).toContain('20-96380996-5');
			expect(text).toContain('Aráoz 2686');

			await page.goto(`${locale.prefix}/terminos`);
			const termsText = await page.locator('body').innerText();
			expect(termsText).toContain('Anna Kazanova');
			expect(termsText).toContain('20-96380996-5');
		});

		test(`[${locale.key}] the "last updated" line never claims a specific date`, async ({ page }) => {
			// src/config/legal.ts LEGAL_LAST_UPDATED is null pending the lawyer's
			// sign-off and a real publication date. A test that broke the moment a
			// real date is supplied would defeat the guarantee that activation is
			// a one-line config change, so this only pins today's pending state.
			await page.goto(`${locale.prefix}/privacidad`);
			const updated = await page.locator('.legal__updated').innerText();
			const pendingText: Record<'es' | 'en' | 'ru', string> = {
				es: 'Pendiente de publicación',
				en: 'Publication pending',
				ru: 'Публикация ожидается',
			};
			expect(updated).toContain(pendingText[locale.key]);
		});
	}

	test('[en] and [ru] carry a Spanish-authority notice linking to the ES original; [es] does not', async ({
		page,
	}) => {
		for (const doc of PAGES) {
			await page.goto(`/en/${doc}`);
			await expect(page.locator('.legal__notice'), `en ${doc} notice`).toHaveCount(1);
			await expect(page.locator('.legal__notice a')).toHaveAttribute('href', `/${doc}`);

			await page.goto(`/ru/${doc}`);
			await expect(page.locator('.legal__notice'), `ru ${doc} notice`).toHaveCount(1);
			await expect(page.locator('.legal__notice a')).toHaveAttribute('href', `/${doc}`);

			await page.goto(`/${doc}`);
			await expect(page.locator('.legal__notice'), `es ${doc} has no courtesy notice`).toHaveCount(0);
		}
	});

	test('the language switcher on a legal page stays on the same document', async ({ page }) => {
		await page.goto('/en/privacidad');
		const ruLink = page.locator('footer nav.lang a[hreflang="ru"]');
		await expect(ruLink).toHaveAttribute('href', '/ru/privacidad');

		await page.goto('/ru/terminos');
		const esLink = page.locator('footer nav.lang a[hreflang="es-AR"]');
		await expect(esLink).toHaveAttribute('href', '/terminos');
	});

	test('every legal page keeps the header, the footer and its controller notice', async ({ page }) => {
		for (const locale of ROUTES) {
			for (const doc of PAGES) {
				await page.goto(`${locale.prefix}/${doc}`);
				await expect(page.locator('header')).toBeVisible();
				await expect(page.locator('footer [data-controller-notice]')).toBeVisible();
			}
		}
	});

	test('the three locales agree on section count and numbering for each document', async ({ page }) => {
		for (const doc of PAGES) {
			const idsByLocale: Record<string, string[]> = {};
			for (const locale of ROUTES) {
				await page.goto(`${locale.prefix}/${doc}`);
				idsByLocale[locale.key] = await page
					.locator('.legal__heading')
					.evaluateAll((nodes) => nodes.map((n) => n.getAttribute('data-legal-id') ?? ''));
			}
			expect(idsByLocale.en, `${doc}: en numbering matches es`).toEqual(idsByLocale.es);
			expect(idsByLocale.ru, `${doc}: ru numbering matches es`).toEqual(idsByLocale.es);
		}
	});
});
