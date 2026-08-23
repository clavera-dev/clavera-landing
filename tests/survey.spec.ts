import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';
import { LOCALES as LOCALE_KEYS } from '../src/i18n/config';
import {
	PILOT_INTEREST_DESTINATIONS,
	getPilotDestination,
	buildDestinationHref,
	destinationLanguageDiffers,
	type SurveyDestination,
} from '../src/config/typeform';

/**
 * Locale-aware RESEARCH-survey routing.
 *
 * The beta has two Typeform flows: the short pilot-interest form (primary,
 * covered by pilot.spec.ts) and this long research survey (secondary, S13).
 * This file covers the research flow only, routed per locale:
 *
 *   es-AR → https://claveraar.typeform.com/ARGCABA
 *   ru    → https://claveraar.typeform.com/latam
 *   en    → https://claveraar.typeform.com/ARGCABA   (Spanish survey, disclosed)
 *
 * English deliberately uses the Spanish survey because no dedicated English
 * research Typeform exists. That is an approved beta compromise, and the
 * English UI must say so — silently sending an English reader to a Spanish
 * form is the failure this file exists to prevent.
 */

/*
  The deferred M9 conversion path, matched by what it actually IS.

  CORRECTED: an earlier version of this list banned any URL containing
  `typeform.com/to/`. That was wrong and would have blocked a legitimate form.
  `/to/{FORM_ID}` is Typeform's ordinary responder path — the pending pilot
  form's own display URL has exactly that shape — so banning the path banned
  the product rather than the deferred flow. See the regression block at the
  bottom of this file.

  What must actually never appear is the deferred founding-price flow: its
  exact known destination (`/gracias`), its slug, and the price-reveal CTA
  labels that were removed from the copy in M3.5.
*/

/** Exact known legacy destinations of the deferred flow. */
const FORBIDDEN_DESTINATIONS = ['/gracias', 'socios-fundadores', 'founding-price', 'precio-fundador'];

/**
 * Semantic markers of the deferred price-reveal flow, in every locale. These
 * are the exact CTA labels M3.5 removed; their reappearance anywhere in the
 * document means the flow came back regardless of which URL it points at.
 */
const FORBIDDEN_PRICE_REVEAL_MARKERS = [
	'Ver mi precio de Socio Fundador',
	'See my Founding Member price',
	'Узнать мою цену участника-основателя',
];

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

			/*
			  The stronger half: the deferred flow is identified by what it says,
			  not by the shape of its URL. textContent, not innerText, so a label
			  hidden inside a collapsed <details> cannot slip through.
			*/
			const text = await page.evaluate(() => document.body.textContent ?? '');
			for (const marker of FORBIDDEN_PRICE_REVEAL_MARKERS) {
				expect(text, `price-reveal marker "${marker}"`).not.toContain(marker);
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


/* =========================================================================
   REGRESSION — a legitimate `/to/{FORM_ID}` URL must be accepted
   =========================================================================

   Guards the defect this file used to contain: `typeform.com/to/` was on the
   forbidden list, so the ordinary Typeform responder path was treated as the
   deferred founding-price flow. The pending pilot form's real display URL has
   that shape, so the ban would have rejected the actual product.

   The real form id is deliberately NOT committed — the RU form is unpublished
   and still under external review. A synthetic id of the same shape is used,
   which is what makes this a shape test rather than a URL test.
   ========================================================================= */

/** Same shape as a real responder URL. Not a real form. */
const SAMPLE_PILOT_URL = 'https://claveraar.typeform.com/to/AbCdEfGh';

test.describe('pilot URL shape', () => {
	test('a /to/{FORM_ID} URL is accepted and is not a forbidden destination', () => {
		// It must not collide with any exact legacy destination...
		for (const forbidden of FORBIDDEN_DESTINATIONS) {
			expect(SAMPLE_PILOT_URL, `wrongly matches "${forbidden}"`).not.toContain(forbidden);
		}
		// ...and it must survive href building intact.
		const href = buildDestinationHref(SAMPLE_PILOT_URL, { lang: 'es', source: 'landing' });
		expect(href).toBe('https://claveraar.typeform.com/to/AbCdEfGh?lang=es&source=landing');
		expect(href).toContain('/to/');
		expect(href).toMatch(/^https:\/\//);
	});

	test('a /to/ destination satisfies the pilot destination contract', () => {
		const destination: SurveyDestination = { url: SAMPLE_PILOT_URL, language: 'es' };

		// Same-language destination needs no disclosure; a mismatched one does.
		expect(destinationLanguageDiffers('es', destination)).toBe(false);
		expect(destinationLanguageDiffers('en', destination)).toBe(true);

		// The URL is well formed and carries no personal data.
		const parsed = new URL(destination.url);
		expect(parsed.protocol).toBe('https:');
		expect(parsed.pathname.startsWith('/to/')).toBe(true);
		expect(parsed.search).toBe('');
	});

	test('activation requires only the central config: nothing else can supply a destination', () => {
		/*
		  The chain the rendered page depends on is config → accessor → DOM.
		  This pins the first link by identity: the accessor returns the very
		  object held in PILOT_INTEREST_DESTINATIONS, so there is no second
		  source, no fallback, and no derived default that could inject a URL
		  the central map does not contain.

		  The second link — DOM state equals config state for every locale — is
		  asserted in pilot.spec.ts.
		*/
		for (const locale of LOCALE_KEYS) {
			expect(getPilotDestination(locale), `accessor for ${locale}`).toBe(
				PILOT_INTEREST_DESTINATIONS[locale],
			);
		}

		/*
		  Deliberately NOT asserted here: that the map is currently all-null.
		  Such an assertion would fail the moment a real URL is supplied, which
		  would mean activation required editing a test — the exact opposite of
		  what this test exists to guarantee. Whether a locale is configured yet
		  is a fact about today, not an invariant.
		*/
	});
});
