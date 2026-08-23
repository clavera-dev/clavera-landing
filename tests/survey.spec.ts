import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';

/**
 * Locale-aware survey routing (M3.5).
 *
 * The expedited public beta exposes exactly one Typeform destination — the
 * long research survey — and routes it per locale:
 *
 *   es-AR → https://claveraar.typeform.com/ARGCABA
 *   ru    → https://claveraar.typeform.com/latam
 *   en    → https://claveraar.typeform.com/ARGCABA   (Spanish survey, disclosed)
 *
 * English deliberately uses the Spanish survey because no dedicated English
 * Typeform exists yet. That is an approved beta compromise, and the English UI
 * must say so — silently sending an English reader to a Spanish form is the
 * failure this file exists to prevent.
 */

/** Destinations that must never appear: the deferred M9 conversion path. */
const FORBIDDEN_DESTINATIONS = ['/gracias', 'typeform.com/to/', 'socios-fundadores'];

for (const locale of LOCALES) {
	test.describe(`[${locale.key}] survey routing`, () => {
		test('every research link points at this locale’s survey and nothing else', async ({ page }) => {
			await page.goto(locale.path);

			const links = page.locator('[data-typeform-flow="research"] a');
			await expect(links, 'research survey links on the page').toHaveCount(1);

			const hrefs = await links.evaluateAll((els) =>
				els.map((el) => el.getAttribute('href') ?? ''),
			);
			// Exactly the accepted mapping — bare, with nothing appended.
			expect(hrefs, 'research destinations').toEqual([locale.surveyUrl]);
		});

		test('does not link to any other locale’s survey', async ({ page }) => {
			await page.goto(locale.path);

			const otherSurveys = LOCALES.map((l) => l.surveyUrl).filter(
				(url) => url !== locale.surveyUrl,
			);

			const allHrefs = await page.evaluate(() =>
				Array.from(document.querySelectorAll('a[href]')).map((a) => a.getAttribute('href') ?? ''),
			);

			for (const url of otherSurveys) {
				expect(allHrefs, `must not link to ${url}`).not.toContain(url);
			}
		});

		test('survey links are ordinary links that work without JavaScript', async ({ page }) => {
			await page.goto(locale.path);

			// A real href on a real anchor — not a button, not a script hook.
			// Nothing here may depend on a Typeform embed or client JS.
			// Two boundaries: the pilot flow (pending) and the research flow (live).
			const boundaries = page.locator('[data-typeform-boundary]');
			await expect(boundaries).toHaveCount(2);
			await expect(boundaries.locator('button')).toHaveCount(0);
			await expect(
				page.locator('[data-typeform-flow="research"] a[href^="https://claveraar.typeform.com/"]'),
			).toHaveCount(1);

			// The whole page ships zero client-side JavaScript; assert it, because
			// a Typeform embed would be the obvious way for that to regress.
			const scripts = await page.evaluate(() =>
				Array.from(document.querySelectorAll('script')).map(
					(s) => s.getAttribute('src') ?? '(inline)',
				),
			);
			expect(scripts, 'client scripts').toEqual([]);
		});

		test('survey links carry an accessible name and the survey’s own hreflang', async ({
			page,
		}) => {
			await page.goto(locale.path);
			const links = page.locator('[data-typeform-flow="research"] a');

			for (const link of await links.all()) {
				const name = (await link.textContent())?.trim() ?? '';
				// The arrow is decorative and aria-hidden; strip it before checking
				// the name is real words rather than a bare glyph.
				expect(name.replace(/[↗→\s]/g, '').length, 'accessible name length').toBeGreaterThan(3);

				// The link announces the language of the document it opens, which
				// for English is Spanish — not the page's own language.
				const hreflang = await link.getAttribute('hreflang');
				const expected = locale.surveyLanguageNotice === null ? locale.hreflang : 'es-AR';
				expect(hreflang, 'hreflang of the survey link').toBe(expected);
			}
		});

		test('discloses a mismatched survey language, and only where it applies', async ({ page }) => {
			await page.goto(locale.path);
			const notices = page.locator('[data-destination-language-notice]');

			if (locale.surveyLanguageNotice === null) {
				// ES and RU get their own survey, so a warning here would be wrong.
				await expect(notices, 'no disclosure expected for a matching survey').toHaveCount(0);
				return;
			}

			// One disclosure beside the research link whose survey is Spanish.
			await expect(notices, 'a disclosure beside every mismatched link').toHaveCount(1);

			for (const notice of await notices.all()) {
				await expect(notice).toHaveText(locale.surveyLanguageNotice);
				await expect(notice).toBeVisible();
			}

			// Wired to the link, so it is announced before the link is followed
			// rather than only being visible to sighted readers.
			const links = page.locator('[data-typeform-flow="research"] a');
			for (const link of await links.all()) {
				const describedBy = await link.getAttribute('aria-describedby');
				expect(describedBy, 'aria-describedby on the survey link').toBeTruthy();
				await expect(page.locator(`#${describedBy}`)).toHaveText(locale.surveyLanguageNotice);
			}
		});

		test('never describes the English beta survey as being in English', async ({ page }) => {
			test.skip(locale.key !== 'en', 'English-only rule');
			await page.goto(locale.path);

			const text = await page.evaluate(() => document.body.innerText);
			// The compromise may be disclosed, never disguised.
			expect(text).toContain('The survey is in Spanish.');
			expect(text.toLowerCase()).not.toContain('survey in english');
			expect(text.toLowerCase()).not.toContain('english survey');
		});

		test('exposes no deferred short-form or price-reveal destination', async ({ page }) => {
			await page.goto(locale.path);

			const hrefs = await page.evaluate(() =>
				Array.from(document.querySelectorAll('a[href]')).map((a) => a.getAttribute('href') ?? ''),
			);

			for (const forbidden of FORBIDDEN_DESTINATIONS) {
				expect(
					hrefs.filter((href) => href.includes(forbidden)),
					`links to ${forbidden}`,
				).toEqual([]);
			}
		});

		test('shows no CLAVERA monetary price and no payment path', async ({ page }) => {
			await page.goto(locale.path);

			// The S7 market anchor for the car-storage alternative is approved and
			// is the ONLY currency figure permitted on the page, so it is excluded
			// by location rather than by pattern.
			const outsideComparison = await page.evaluate(() => {
				const clone = document.body.cloneNode(true) as HTMLElement;
				clone.querySelector('#comparacion')?.remove();
				return clone.innerText;
			});

			expect(outsideComparison, 'currency figure outside S7').not.toMatch(/\bARS\b/);
			expect(outsideComparison).not.toMatch(/\$\s?\d/);

			/*
			  No payment, deposit or membership contract is accepted in the beta.

			  Matched on word boundaries, not as substrings: `seña` (deposit) is a
			  substring of the perfectly legitimate `diseñar` / `diseñado`, which
			  appear in the approved S8 and S13 copy. A substring check reports
			  those as a payment flow, which is why the earlier draft of this test
			  failed on Spanish. Lookarounds work for accented Latin where `\b`
			  does not.
			*/
			const paymentTerms = ['seña', 'señas', 'mercado pago', 'mercadopago', 'checkout'];
			for (const term of paymentTerms) {
				const pattern = new RegExp(`(?<![\\p{L}\\p{N}])${term}(?![\\p{L}\\p{N}])`, 'iu');
				expect(pattern.test(outsideComparison), `payment term "${term}"`).toBe(false);
			}

			// The negative control proves the matcher can still see the term when
			// it really is a standalone word, rather than passing vacuously.
			expect(
				/(?<![\p{L}\p{N}])seña(?![\p{L}\p{N}])/iu.test('se reserva con una seña de'),
				'matcher detects a real deposit mention',
			).toBe(true);
			expect(
				/(?<![\p{L}\p{N}])seña(?![\p{L}\p{N}])/iu.test('diseñado para lo que usás'),
				'matcher ignores diseñado',
			).toBe(false);
		});
	});
}
