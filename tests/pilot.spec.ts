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
import {
	WHATSAPP_NUMBER,
	WHATSAPP_LINK,
	whatsappHref,
	isValidWhatsappLink,
	PHONE_NUMBER,
	telHref,
	isValidPhoneNumber,
} from '../src/config/contact';

/**
 * The pilot-interest ("Avisame") flow.
 *
 * The pilot Typeform is being created externally. Until its URLs arrive the
 * configuration holds `null` for every locale and, per the owner handoff v1.1
 * B4, the page shows NOTHING for it — no anchor, no button, no disabled
 * control, no `href="#"`, no placeholder, and no "en preparación" text — while
 * the research survey becomes the primary action of "Sumate al piloto".
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
		test('renders the pilot boundary only when configured, and only in the pilot block', async ({
			page,
		}) => {
			const configured = getPilotDestination(locale.key) !== null;
			await page.goto(locale.path);
			const expected = configured ? 1 : 0;
			await expect(page.locator('[data-typeform-flow="pilot"]')).toHaveCount(expected);
			await expect(page.locator('#fundadores [data-typeform-flow="pilot"]')).toHaveCount(expected);
		});

		test('a pending Avisame form shows nothing, and the survey is the primary action', async ({
			page,
		}) => {
			const configured = getPilotDestination(locale.key) !== null;
			test.skip(configured, 'this locale now has a real pilot URL');

			await page.goto(locale.path);
			const block = page.locator('#fundadores');

			// No Avisame control, label or pending text of any kind.
			const labels: Record<string, string[]> = {
				es: ['Avisame', 'en preparación'],
				en: ['Notify me', 'being prepared'],
				ru: ['Сообщить мне', 'готовится'],
			};
			const text = (await block.textContent()) ?? '';
			for (const label of labels[locale.key]) {
				expect(text, `"${label}" in the pilot block`).not.toContain(label);
			}
			await expect(block.locator('[data-typeform-pending]')).toHaveCount(0);
			await expect(block.locator('button, [disabled], [aria-disabled="true"]')).toHaveCount(0);

			// The survey takes the primary slot, without the "3 more minutes" prompt
			// that only makes sense next to Avisame.
			const primary = block.locator('[data-typeform-flow="research"] a.button--primary');
			await expect(primary).toHaveCount(1);
			const surveyCta: Record<string, string> = {
				es: 'Respondé la encuesta',
				en: 'Take the survey',
				ru: 'Пройти опрос',
			};
			await expect(primary).toContainText(surveyCta[locale.key]);
			const prompt: Record<string, string> = {
				es: '¿Tenés 3 minutos más?',
				en: 'Got 3 more minutes?',
				ru: 'Есть ещё 3 минуты?',
			};
			expect(text).not.toContain(prompt[locale.key]);
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
				ru: ['предварительное', 'не резервирует', 'не создаёт договора', 'не предполагает оплаты'],
			};

			for (const phrase of required[locale.key]) {
				expect(note.toLowerCase(), `founders note must state "${phrase}"`).toContain(
					phrase.toLowerCase(),
				);
			}
		});

		test('the header CTA is interest wording and still leads to the pilot block', async ({
			page,
		}) => {
			await page.goto(locale.path);

			const headerCta = (await page.locator('.site-header .button').first().innerText()).trim();
			const expected: Record<string, string> = {
				es: 'Me interesa el piloto',
				en: 'I’m interested in the pilot',
				ru: 'Мне интересен пилот',
			};
			expect(headerCta).toBe(expected[locale.key]);

			// The anchor stays #fundadores (handoff v1.1 §4.2).
			await expect(page.locator('.site-header .button').first()).toHaveAttribute(
				'href',
				`${locale.path}#fundadores`,
			);

			// The hero's old pilot button is replaced by the zone selector.
			await expect(page.locator('#top [data-zone-selector]')).toHaveCount(1);
			await expect(page.locator('#top a[href$="#fundadores"]')).toHaveCount(0);
		});

		test('carries no founding-offer figure, discount or price line', async ({ page }) => {
			await page.goto(locale.path);

			// Handoff v1.1 B4: the chip, the 40 / −20 % / 24 figures, the discount
			// sentence and the price-calculation/indexation line are all gone.
			const header = (await page.locator('.site-header').textContent()) ?? '';
			const block = (await page.locator('#fundadores').textContent()) ?? '';
			for (const text of [header, block]) {
				expect(text).not.toMatch(/\b40\b/);
				expect(text).not.toMatch(/\b24\b/);
				expect(text).not.toContain('%');
				expect(text).not.toMatch(/IPC|ICL/);
			}

			const chip: Record<string, string> = {
				es: 'Sumate al piloto',
				en: 'Join the pilot',
				ru: 'Присоединиться к пилоту',
			};
			expect(header).toContain(chip[locale.key]);

			const body = await page.evaluate(() => document.body.textContent ?? '');
			for (const gone of ['Socios Fundadores', 'Socio Fundador', 'Founding Member', 'основател']) {
				expect(body, `"${gone}"`).not.toContain(gone);
			}
		});
	});
}

/* -------------------------------------------------------------------------
   WhatsApp
   ------------------------------------------------------------------------- */

test.describe('whatsapp configuration', () => {
	test('yields exactly the configured short link, or falls back to a number, or null', () => {
		if (WHATSAPP_LINK !== null) {
			expect(isValidWhatsappLink(WHATSAPP_LINK)).toBe(true);
			expect(whatsappHref()).toBe(WHATSAPP_LINK);
		} else if (WHATSAPP_NUMBER !== null) {
			expect(whatsappHref()).toBe(`https://wa.me/${WHATSAPP_NUMBER}`);
		} else {
			expect(whatsappHref()).toBeNull();
		}
	});

	test('never fabricates WHATSAPP_NUMBER from a short link', () => {
		if (WHATSAPP_LINK !== null) {
			expect(WHATSAPP_NUMBER).toBeNull();
		}
	});

	test('rejects malformed or placeholder short links', () => {
		for (const bad of [
			'https://wa.me/message/', // empty code
			'http://wa.me/message/VWLBN6XDY6ZHP1', // not https
			'https://wa.me/VWLBN6XDY6ZHP1', // missing /message/
			'https://example.com/message/VWLBN6XDY6ZHP1', // wrong host
			'https://wa.me/message/VWLBN6XDY6ZHP1 ', // trailing whitespace
			'https://wa.me/message/<script>', // injected markup
		]) {
			expect(isValidWhatsappLink(bad), bad).toBe(false);
		}
		expect(isValidWhatsappLink('https://wa.me/message/VWLBN6XDY6ZHP1')).toBe(true);
	});

	for (const locale of LOCALES) {
		test(`[${locale.key}] renders the exact configured WhatsApp link as an anchor, or nothing at all`, async ({
			page,
		}) => {
			await page.goto(locale.path);
			const href = whatsappHref();

			if (href === null) {
				// No wa.me link, no dummy number, no disabled control.
				await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
				await expect(page.locator('a[href^="whatsapp:"]')).toHaveCount(0);

				const expected: Record<string, string> = {
					es: 'WhatsApp Business — próximamente.',
					en: 'WhatsApp Business — coming soon.',
					ru: 'WhatsApp Business — скоро.',
				};
				await expect(page.locator('footer', { hasText: expected[locale.key] })).toHaveCount(1);
				return;
			}

			// Exactly one anchor, carrying exactly the configured link — never a
			// placeholder, a truncated value or `href="#"`.
			const link = page.locator(`footer a[href="${href}"]`);
			await expect(link).toHaveCount(1);
			await expect(page.locator('footer a[href="#"]')).toHaveCount(0);
			const pendingWhatsapp = page
				.locator('footer')
				.locator('[class*="pending-item"]', { hasText: 'WhatsApp' });
			await expect(pendingWhatsapp).toHaveCount(0);
		});
	}
});

/* -------------------------------------------------------------------------
   Click-to-call phone
   ------------------------------------------------------------------------- */

test.describe('phone configuration', () => {
	test('telHref() yields exactly tel: + the configured number, or null', () => {
		if (PHONE_NUMBER !== null) {
			expect(isValidPhoneNumber(PHONE_NUMBER)).toBe(true);
			expect(telHref()).toBe(`tel:${PHONE_NUMBER}`);
		} else {
			expect(telHref()).toBeNull();
		}
	});

	test('is a distinct destination from the WhatsApp chat link', () => {
		// The phone entry must never be derived from, or replace, the
		// owner-supplied wa.me short link.
		if (PHONE_NUMBER !== null && WHATSAPP_LINK !== null) {
			expect(telHref()).not.toBe(whatsappHref());
			expect(WHATSAPP_LINK).not.toContain(PHONE_NUMBER.replace('+', ''));
		}
	});

	test('rejects malformed phone numbers', () => {
		for (const bad of [
			'5491128329931', // missing +
			'+0491128329931', // leading zero after +
			'+549112832993a', // non-digit
			'+54 9 11 2832 9931', // spaces
			'+1', // too short
		]) {
			expect(isValidPhoneNumber(bad), bad).toBe(false);
		}
		expect(isValidPhoneNumber('+5491128329931')).toBe(true);
	});

	for (const locale of LOCALES) {
		test(`[${locale.key}] renders the exact configured tel: link as an anchor, or nothing at all`, async ({
			page,
		}) => {
			await page.goto(locale.path);
			const href = telHref();

			if (href === null) {
				await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);

				const expected: Record<string, string> = {
					es: 'Teléfono — próximamente.',
					en: 'Phone — coming soon.',
					ru: 'Телефон — скоро.',
				};
				await expect(page.locator('footer', { hasText: expected[locale.key] })).toHaveCount(1);
				return;
			}

			// Exactly one anchor, carrying exactly the configured tel: href —
			// never a placeholder, a truncated value or href="#".
			const link = page.locator(`footer a[href="${href}"]`);
			await expect(link).toHaveCount(1);

			// Separate control from the WhatsApp chat anchor — no merged or
			// duplicate destination.
			const whatsapp = whatsappHref();
			if (whatsapp !== null) {
				await expect(page.locator(`footer a[href="${whatsapp}"]`)).toHaveCount(1);
				expect(href).not.toBe(whatsapp);
			}

			const pendingPhone = page
				.locator('footer')
				.locator('[class*="pending-item"]', { hasText: /Tel|Phone|Телефон/ });
			await expect(pendingPhone).toHaveCount(0);
		});
	}
});
