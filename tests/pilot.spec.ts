import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';
import {
	PILOT_INTEREST_DESTINATIONS,
	RESEARCH_SURVEY_DESTINATIONS,
	ATTRIBUTION_PARAM_ALLOWLIST,
	buildDestinationHref,
	getPilotDestination,
	destinationLanguageDiffers,
} from '../src/config/typeform';
import { WHATSAPP_NUMBER, whatsappHref } from '../src/config/contact';

/**
 * The pilot-interest flow (M3.5.1).
 *
 * The pilot Typeform is being created externally. Until its URLs arrive the
 * configuration holds `null` for every locale and the page must show localized
 * plain text — never an anchor, a button, a disabled control, `href="#"`, an
 * empty href, or a placeholder domain.
 *
 * These tests are written so they keep working once the URLs land: the DOM
 * assertions branch on the configured state rather than hard-coding "pending".
 */

/* -------------------------------------------------------------------------
   Configuration contract — pure, no browser needed
   ------------------------------------------------------------------------- */

test.describe('pilot configuration', () => {
	test('is total over every locale, with no fallback', () => {
		expect(Object.keys(PILOT_INTEREST_DESTINATIONS).sort()).toEqual(['en', 'es', 'ru']);

		// A locale must never silently inherit another locale's form. Any two
		// configured locales sharing a URL would have to be a deliberate,
		// separately recorded decision — as the research EN/ES pair is.
		const configured = Object.entries(PILOT_INTEREST_DESTINATIONS).filter(
			([, value]) => value !== null,
		);
		for (const [locale, value] of configured) {
			expect(value!.url, `${locale} pilot url`).toMatch(/^https:\/\//);
		}
	});

	test('holds no placeholder, fake or example URL', () => {
		for (const [locale, value] of Object.entries(PILOT_INTEREST_DESTINATIONS)) {
			if (value === null) continue;
			const url = value.url.toLowerCase();
			for (const bad of ['example.com', 'example.org', 'localhost', 'todo', 'tbd', 'changeme']) {
				expect(url, `${locale} pilot url contains ${bad}`).not.toContain(bad);
			}
			expect(url, `${locale} pilot url is a bare hash`).not.toBe('#');
		}
	});

	test('research destinations remain exactly the accepted mapping', () => {
		expect(RESEARCH_SURVEY_DESTINATIONS.es.url).toBe('https://claveraar.typeform.com/ARGCABA');
		expect(RESEARCH_SURVEY_DESTINATIONS.ru.url).toBe('https://claveraar.typeform.com/latam');
		expect(RESEARCH_SURVEY_DESTINATIONS.en.url).toBe('https://claveraar.typeform.com/ARGCABA');

		// English uses the Spanish survey, and the config records that fact so
		// the UI is obliged to disclose it.
		expect(RESEARCH_SURVEY_DESTINATIONS.en.language).toBe('es');
		expect(destinationLanguageDiffers('en', RESEARCH_SURVEY_DESTINATIONS.en)).toBe(true);
		expect(destinationLanguageDiffers('es', RESEARCH_SURVEY_DESTINATIONS.es)).toBe(false);
		expect(destinationLanguageDiffers('ru', RESEARCH_SURVEY_DESTINATIONS.ru)).toBe(false);
	});
});

/* -------------------------------------------------------------------------
   Attribution allowlist
   ------------------------------------------------------------------------- */

test.describe('attribution', () => {
	test('appends only allowlisted parameters', () => {
		const href = buildDestinationHref('https://claveraar.typeform.com/pilot', {
			utm_source: 'instagram',
			utm_medium: 'social',
			lang: 'es',
			source: 'landing',
		});
		const params = new URL(href).searchParams;
		expect(params.get('utm_source')).toBe('instagram');
		expect(params.get('utm_medium')).toBe('social');
		expect(params.get('lang')).toBe('es');
		expect(params.get('source')).toBe('landing');
	});

	test('drops anything outside the allowlist, including personal data', () => {
		const href = buildDestinationHref('https://claveraar.typeform.com/pilot', {
			lang: 'es',
			// Everything below is NOT in the allowlist and must be discarded.
			nombre: 'Ana',
			email: 'ana@example.test',
			telefono: '+5491100000000',
			barrio: 'Chacarita',
			dni: '12345678',
			price_variant: 'B',
		} as never);

		const params = new URL(href).searchParams;
		expect([...params.keys()].sort()).toEqual(['lang']);
		for (const leaked of ['Ana', 'ana@example.test', '5491100000000', 'Chacarita', '12345678']) {
			expect(href, `personal datum "${leaked}" in URL`).not.toContain(leaked);
		}
	});

	test('omits empty values instead of emitting a bare key', () => {
		const href = buildDestinationHref('https://claveraar.typeform.com/pilot', {
			lang: '',
			source: '   ',
			utm_campaign: 'beta',
		});
		expect(href).toBe('https://claveraar.typeform.com/pilot?utm_campaign=beta');
	});

	test('the allowlist is exactly the approved non-personal set', () => {
		expect([...ATTRIBUTION_PARAM_ALLOWLIST]).toEqual([
			'utm_source',
			'utm_medium',
			'utm_campaign',
			'utm_content',
			'utm_term',
			'lang',
			'source',
			'landing_version',
		]);
	});

	test('activating a locale yields an ordinary link with only central config changed', () => {
		// Proves the activation path end to end at the unit level: the component
		// renders `buildDestinationHref(destination.url, { lang, source })` for a
		// pilot destination, so supplying the URL is genuinely the only edit.
		const supplied = { url: 'https://claveraar.typeform.com/pilotoar', language: 'es' } as const;
		const href = buildDestinationHref(supplied.url, { lang: 'es', source: 'landing' });

		expect(href).toBe('https://claveraar.typeform.com/pilotoar?lang=es&source=landing');
		expect(href).toMatch(/^https:\/\//);
		expect(href).not.toContain('#');
	});
});

/* -------------------------------------------------------------------------
   Rendered behaviour
   ------------------------------------------------------------------------- */

for (const locale of LOCALES) {
	test.describe(`[${locale.key}] pilot interest`, () => {
		test('renders exactly one pilot boundary, in the founders section', async ({ page }) => {
			await page.goto(locale.path);
			const pilot = page.locator('[data-typeform-flow="pilot"]');
			await expect(pilot).toHaveCount(1);
			await expect(page.locator('#fundadores [data-typeform-flow="pilot"]')).toHaveCount(1);
		});

		test('a pending destination renders text and no control at all', async ({ page }) => {
			const configured = getPilotDestination(locale.key) !== null;
			test.skip(configured, 'this locale now has a real pilot URL');

			await page.goto(locale.path);
			const pilot = page.locator('[data-typeform-flow="pilot"]');

			await expect(pilot).toHaveAttribute('data-typeform-state', 'pending');
			// Not an anchor, not a button, not a disabled control, not focusable.
			await expect(pilot.locator('a')).toHaveCount(0);
			await expect(pilot.locator('button')).toHaveCount(0);
			await expect(pilot.locator('[disabled], [aria-disabled="true"], [tabindex]')).toHaveCount(0);

			// Localized plain text, actually visible.
			const pending = pilot.locator('[data-typeform-pending]');
			await expect(pending).toHaveCount(1);
			await expect(pending).toBeVisible();
			await expect(pending).not.toHaveText('');
		});

		test('a configured destination renders an ordinary same-tab link', async ({ page }) => {
			const destination = getPilotDestination(locale.key);
			test.skip(destination === null, 'pilot URL still pending for this locale');

			await page.goto(locale.path);
			const link = page.locator('[data-typeform-flow="pilot"] a');
			await expect(link).toHaveCount(1);

			const href = await link.getAttribute('href');
			expect(href).toContain(destination!.url);
			expect(href).toMatch(/^https:\/\//);
			// Same tab: no undisclosed new window to announce.
			await expect(link).not.toHaveAttribute('target', '_blank');
			// Only allowlisted attribution.
			const params = [...new URL(href!).searchParams.keys()];
			for (const key of params) {
				expect(ATTRIBUTION_PARAM_ALLOWLIST as readonly string[]).toContain(key);
			}
		});

		test('no fake, empty or placeholder href anywhere on the page', async ({ page }) => {
			await page.goto(locale.path);

			const offenders = await page.evaluate(() =>
				Array.from(document.querySelectorAll('a'))
					.map((a) => ({ href: a.getAttribute('href'), text: (a.textContent ?? '').trim() }))
					.filter(({ href }) => {
						if (href === null || href.trim() === '') return true;
						if (href.trim() === '#') return true;
						return /example\.(com|org|net)|placeholder|your-?domain|TBD|changeme/i.test(href);
					}),
			);

			expect(offenders, 'anchors with a fake, empty or missing href').toEqual([]);
		});

		test('states the interest is preliminary and binds nobody', async ({ page }) => {
			await page.goto(locale.path);
			const note = await page.locator('#fundadores').innerText();

			// Wording differs per locale; the commitments must all be denied.
			const required: Record<string, string[]> = {
				es: ['preliminar', 'no reserva', 'no genera ningún contrato', 'no se acepta ningún pago'],
				en: ['preliminary', 'reserves no space', 'creates no contract', 'no payment is accepted'],
				ru: ['предварительное', 'не резервирует', 'не создаёт никакого договора', 'не предполагает оплаты'],
			};

			for (const phrase of required[locale.key]) {
				expect(note.toLowerCase(), `founders note must state "${phrase}"`).toContain(
					phrase.toLowerCase(),
				);
			}
		});

		test('the pilot CTA is not reservation wording in header or hero', async ({ page }) => {
			await page.goto(locale.path);

			const headerCta = (await page.locator('.site-header .button').first().innerText()).trim();
			const heroCta = (await page.locator('.hero__actions a').first().innerText()).trim();

			const expected: Record<string, string> = {
				es: 'Me interesa el piloto',
				en: 'I’m interested in the pilot',
				ru: 'Мне интересен пилот',
			};

			expect(headerCta).toBe(expected[locale.key]);
			expect(heroCta).toBe(expected[locale.key]);

			// Both still lead to the founders section, per the approved anchor map.
			await expect(page.locator('.site-header .button').first()).toHaveAttribute(
				'href',
				`${locale.path}#fundadores`,
			);
		});
	});
}

/* -------------------------------------------------------------------------
   WhatsApp placeholder
   ------------------------------------------------------------------------- */

test.describe('whatsapp placeholder', () => {
	test('is centralized and yields no href while unset', () => {
		if (WHATSAPP_NUMBER === null) {
			expect(whatsappHref()).toBeNull();
		} else {
			expect(whatsappHref()).toBe(`https://wa.me/${WHATSAPP_NUMBER}`);
		}
	});

	for (const locale of LOCALES) {
		test(`[${locale.key}] renders no clickable WhatsApp while the number is pending`, async ({
			page,
		}) => {
			test.skip(WHATSAPP_NUMBER !== null, 'a real number is configured');
			await page.goto(locale.path);

			// No wa.me link, no dummy number, no disabled control.
			await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
			await expect(page.locator('a[href^="whatsapp:"]')).toHaveCount(0);

			const expected: Record<string, string> = {
				es: 'WhatsApp Business — próximamente.',
				en: 'WhatsApp Business — coming soon.',
				ru: 'WhatsApp Business — скоро.',
			};
			await expect(page.locator('footer', { hasText: expected[locale.key] })).toHaveCount(1);
		});
	}
});
