import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';
import { LOCALES as LOCALE_KEYS } from '../src/i18n/config';
import {
	RESEARCH_FRAGMENT_ALLOWLIST,
	buildDestinationHref,
	buildResearchHref,
	destinationLanguageDiffers,
	type SurveyDestination,
} from '../src/config/typeform';
import { SOLICITUD_DATA, isSolicitudLive, isUsableFormUrl } from '../src/config/solicitud';

/**
 * Locale-aware RESEARCH-survey routing.
 *
 * The beta has two Typeform flows: the application form (owner response v1.4,
 * which retired the short "Avisame" form; covered by pilot.spec.ts and
 * solicitud.spec.ts, absent while switched off) and this research survey.
 * This file covers the research flow only, routed per locale:
 *
 *   es-AR → https://claveraar.typeform.com/ARGCABA
 *   ru    → https://claveraar.typeform.com/latam
 *   en    → https://claveraar.typeform.com/ARGCABA   (Spanish survey, disclosed)
 *
 * Since the owner handoff v1.1 §4.1 every survey link carries fragment
 * attribution (`#recruitment_source=…&campaign=site_<locale>…`), plus
 * `candidate_zone=<slug>` when a zone was chosen in the selector.
 *
 * English deliberately uses the Spanish survey because no dedicated English
 * research Typeform exists. That is an approved beta compromise, and the
 * English UI must say so — silently sending an English reader to a Spanish
 * form is the failure this file exists to prevent.
 */

/** Every link on the page that opens the research survey. */
const SURVEY_LINKS = '[data-typeform-flow="research"] a, [data-zone-continue]';

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
		test('every research link points at this locale’s survey with its §4.1 attribution', async ({
			page,
		}) => {
			await page.goto(locale.path);

			// S13 and the "Sumate al piloto" block each carry one research
			// boundary, whether or not the application form is live.
			const links = page.locator('[data-typeform-flow="research"] a');
			await expect(links, 'research boundary links on the page').toHaveCount(2);

			const hrefs = await page
				.locator(SURVEY_LINKS)
				.evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));
			// Two boundaries plus the two zone selectors, none with a zone chosen.
			expect(hrefs, 'research destinations').toEqual(Array(4).fill(locale.surveyHref));
			// The locale table and the central config agree.
			expect(buildResearchHref(locale.key)).toBe(locale.surveyHref);
		});

		test('the fragment carries only allowlisted, non-personal parameters', async ({ page }) => {
			await page.goto(locale.path);
			const hrefs = await page.evaluate(() =>
				// The application link is not a research link (solicitud.spec.ts
				// covers it). Zone options are role="option" list items, not
				// <option> elements: the old selector matched none of them.
				Array.from(
					document.querySelectorAll(
						'a[href*="typeform.com"]:not([data-solicitud-link]), [role="option"][data-href]',
					),
				).map(
					(el) => el.getAttribute('href') ?? el.getAttribute('data-href') ?? '',
				),
			);
			expect(hrefs.length).toBeGreaterThan(4);

			for (const href of hrefs) {
				const url = new URL(href);
				// Nothing in the query string: attribution lives in the fragment.
				expect(url.search, `query string on ${href}`).toBe('');
				const params = new URLSearchParams(url.hash.slice(1));
				for (const key of params.keys()) {
					expect(RESEARCH_FRAGMENT_ALLOWLIST as readonly string[], `fragment key ${key}`).toContain(key);
				}
				expect(params.get('campaign'), 'campaign names this locale').toBe(`site_${locale.key}`);
				expect(params.get('recruitment_source')).toBe('clavera_ar');
				// No free text, e-mail or phone ever reaches a fragment value.
				for (const value of params.values()) {
					expect(value, `fragment value "${value}"`).toMatch(/^[A-Za-z0-9_.-]+$/);
				}
			}
		});

		test('does not link to any other locale’s survey or campaign', async ({ page }) => {
			await page.goto(locale.path);

			const hrefs = await page.evaluate(() =>
				// The application link is not a research link (solicitud.spec.ts
				// covers it). Zone options are role="option" list items, not
				// <option> elements: the old selector matched none of them.
				Array.from(
					document.querySelectorAll(
						'a[href*="typeform.com"]:not([data-solicitud-link]), [role="option"][data-href]',
					),
				).map(
					(el) => el.getAttribute('href') ?? el.getAttribute('data-href') ?? '',
				),
			);

			for (const href of hrefs) {
				const url = new URL(href);
				expect(`${url.origin}${url.pathname}`, 'survey base URL').toBe(locale.surveyUrl);
			}
		});

		test.describe('without JavaScript', () => {
			test.use({ javaScriptEnabled: false });

			test('survey links are ordinary links that still work', async ({ page }) => {
				/*
				  With JavaScript disabled the zone <select> cannot move a choice
				  into the fragment, so it stays hidden, and "Seguir" is still an
				  ordinary link to the survey, without a zone.
				*/
				await page.goto(locale.path);

				await expect(page.locator('[data-typeform-boundary] button')).toHaveCount(0);
				await expect(page.locator('[data-zone-field]')).toHaveCount(2);
				for (const field of await page.locator('[data-zone-field]').all()) {
					await expect(field).toBeHidden();
				}

				const hrefs = await page
					.locator(SURVEY_LINKS)
					.evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));
				expect(hrefs).toEqual(Array(4).fill(locale.surveyHref));
			});
		});

		test('ships no third-party or Typeform script — only the site’s own', async ({
			page,
		}) => {
			await page.goto(locale.path);

			/*
			  First-party scripts only, bundled by Astro and possibly inlined: the
			  zone selector (handoff v1.1 §3.2, §4.1), the language switcher's
			  query-string carry-over, and — while the application form is live —
			  the application link's tag reader (TZ Bloque Solicitud v1.1 §3.4).
			  A Typeform embed or an analytics tag would be the obvious way for
			  this to regress.
			*/
			const scripts = await page.evaluate(() =>
				// JSON-LD (brief §8.2) is data, not code: it is not counted here.
				Array.from(document.querySelectorAll('script:not([type="application/ld+json"])')).map((s) => ({
					src: s.getAttribute('src'),
					type: s.getAttribute('type'),
					text: s.textContent ?? '',
				})),
			);
			expect(scripts.length, 'client scripts').toBeLessThanOrEqual(isSolicitudLive() ? 3 : 2);
			for (const script of scripts) {
				if (script.src !== null) {
					expect(script.src, 'script is first-party').toMatch(/^\/_astro\//);
				}
				expect(script.type).toBe('module');
				expect(script.text, 'no embed or tracker').not.toMatch(/embed\.typeform|gtag|fbq|googletagmanager|localStorage|sessionStorage|document\.cookie/);
			}
		});

		test('survey links carry an accessible name and the survey’s own hreflang', async ({
			page,
		}) => {
			await page.goto(locale.path);
			const links = page.locator(SURVEY_LINKS);

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

			// One disclosure beside each of the four links that open the Spanish
			// survey: S13, "Sumate al piloto", and the two zone selectors.
			await expect(notices, 'a disclosure beside every mismatched link').toHaveCount(4);

			for (const notice of await notices.all()) {
				await expect(notice).toHaveText(locale.surveyLanguageNotice);
				await expect(notice).toBeVisible();
			}

			// Wired to the link, so it is announced before the link is followed
			// rather than only being visible to sighted readers.
			const links = page.locator(SURVEY_LINKS);
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

		test('shows no monetary price, percentage or payment path anywhere', async ({ page }) => {
			await page.goto(locale.path);

			/*
			  Since the owner handoff v1.1 (B3, B4, §6.1) there is no currency
			  figure anywhere, S7 included, and no founding-offer percentage.
			  textContent, so collapsed FAQ answers are scanned too, plus metadata.
			*/
			const outsideComparison = await page.evaluate(() => {
				const meta = Array.from(document.querySelectorAll('meta'))
					.map((m) => m.getAttribute('content') ?? '')
					.join(' ');
				// Script source is not copy: minified names may contain `$`.
				const clone = document.body.cloneNode(true) as HTMLElement;
				clone.querySelectorAll('script, style').forEach((el) => el.remove());
				return `${document.title} ${meta} ${clone.textContent ?? ''}`;
			});

			expect(outsideComparison, 'currency code').not.toMatch(/\bARS\b/);
			expect(outsideComparison, 'currency sign').not.toContain('$');
			expect(outsideComparison, 'percentage').not.toContain('%');

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

	test('a /to/ responder URL is a usable application-form URL', () => {
		expect(isUsableFormUrl(SAMPLE_PILOT_URL)).toBe(true);
	});

	test('activation requires only the central config: nothing else can supply a destination', () => {
		/*
		  The application form (which replaced the Avisame form, owner response
		  v1.4 §1.1) is switched on by src/config/solicitud.ts alone: the live
		  state is a pure function of that data. Whether it is live today is a
		  fact about today and deliberately not asserted.
		*/
		const data = SOLICITUD_DATA.solicitud;
		expect(isSolicitudLive()).toBe(isSolicitudLive(data));
		expect(isSolicitudLive({ ...data, enabled: true, form_url: SAMPLE_PILOT_URL })).toBe(true);
		expect(isSolicitudLive({ ...data, enabled: false, form_url: SAMPLE_PILOT_URL })).toBe(false);
		expect(isSolicitudLive({ ...data, enabled: true, form_url: '' })).toBe(false);
	});
});
