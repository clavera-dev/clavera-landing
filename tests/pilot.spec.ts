import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';
import {
	RESEARCH_SURVEY_DESTINATIONS,
	ATTRIBUTION_PARAM_ALLOWLIST,
	buildDestinationHref,
	destinationLanguageDiffers,
} from '../src/config/typeform';
import { SOLICITUD_DATA, isSolicitudLive } from '../src/config/solicitud';
import { SOLICITUD_FRAGMENT_KEYS } from '../src/config/solicitud-attribution';
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
 * "Sumate al piloto" and its conversion.
 *
 * Owner response v1.4 §1.1 retired the short "Avisame" form: its place is
 * taken by the application form (TZ Bloque Solicitud v1.1), switched on only
 * in src/config/solicitud.ts. While it is off the page shows NOTHING for it —
 * no anchor, no button, no disabled control, no `href="#"`, no placeholder —
 * and the research survey is the primary action of "Sumate al piloto".
 *
 * These tests keep working once the form is switched on: the DOM assertions
 * branch on the configured state rather than hard-coding "off".
 * solicitud.spec.ts covers the application block itself.
 */

/* -------------------------------------------------------------------------
   Configuration contract — pure, no browser needed
   ------------------------------------------------------------------------- */

test.describe('application form configuration', () => {
	test('a live form has a real https URL', () => {
		const data = SOLICITUD_DATA.solicitud;
		if (!isSolicitudLive()) return;
		expect(data.form_url).toMatch(/^https:\/\//);
	});

	test('holds no placeholder, fake or example URL', () => {
		const url = SOLICITUD_DATA.solicitud.form_url.toLowerCase();
		for (const bad of ['example.com', 'example.org', 'localhost', 'todo', 'tbd', 'changeme']) {
			expect(url, `form url contains ${bad}`).not.toContain(bad);
		}
		expect(url, 'form url is a bare hash').not.toBe('#');
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
		test('renders the application block only when live, and only in the pilot block', async ({
			page,
		}) => {
			const expected = isSolicitudLive() ? 1 : 0;
			await page.goto(locale.path);
			await expect(page.locator('[data-solicitud]')).toHaveCount(expected);
			await expect(page.locator('#fundadores [data-solicitud]')).toHaveCount(expected);
			await expect(page.locator('[data-typeform-flow="pilot"]')).toHaveCount(0);
		});

		test('a switched-off application form shows nothing, and the survey is the primary action', async ({
			page,
		}) => {
			test.skip(isSolicitudLive(), 'the application form is live');

			await page.goto(locale.path);
			const block = page.locator('#fundadores');

			// No Avisame or application control, label or pending text of any kind.
			const labels: Record<string, string[]> = {
				es: ['Avisame', 'en preparación', 'Solicitar un lugar'],
				en: ['Notify me', 'being prepared', 'Request a spot'],
				ru: ['Сообщить мне', 'готовится', 'Оставить заявку'],
			};
			const text = (await block.textContent()) ?? '';
			for (const label of labels[locale.key]) {
				expect(text, `"${label}" in the pilot block`).not.toContain(label);
			}
			await expect(block.locator('[data-typeform-pending]')).toHaveCount(0);
			await expect(block.locator('button, [disabled], [aria-disabled="true"]')).toHaveCount(0);

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

		test('a live application form opens in a new tab with only its own fragment', async ({ page }) => {
			test.skip(!isSolicitudLive(), 'application form switched off');

			await page.goto(locale.path);
			const link = page.locator('#fundadores [data-solicitud-link]');
			await expect(link).toHaveCount(1);

			const href = (await link.getAttribute('href'))!;
			expect(href.startsWith(SOLICITUD_DATA.solicitud.form_url)).toBe(true);
			await expect(link).toHaveAttribute('target', '_blank');
			await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
			const url = new URL(href);
			expect(url.search).toBe('');
			for (const key of new URLSearchParams(url.hash.slice(1)).keys()) {
				expect(SOLICITUD_FRAGMENT_KEYS as readonly string[]).toContain(key);
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

		test('states that interest or a request binds nobody', async ({ page }) => {
			await page.goto(locale.path);
			const note = (await page.locator('#fundadores').innerText()).toLowerCase();

			// Off: the preliminary-interest note. Live: the mandatory disclaimer.
			const required: Record<string, string[]> = isSolicitudLive()
				? {
						es: ['no está confirmada', 'no implica reserva, pago ni compromiso'],
						en: ['not confirmed', 'does not imply a reservation, payment'],
						ru: ['не подтверждена', 'не является бронью, оплатой'],
					}
				: {
						es: ['preliminar', 'no reserva', 'no genera ningún contrato', 'no se acepta ningún pago'],
						en: ['preliminary', 'reserves no space', 'creates no contract', 'no payment is accepted'],
						ru: ['предварительное', 'не резервирует', 'не создаёт договора', 'не предполагает оплаты'],
					};

			for (const phrase of required[locale.key]) {
				expect(note, `pilot block must state "${phrase}"`).toContain(phrase.toLowerCase());
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
			// innerText: rendered copy only, not the block's inline script source.
			const block = await page.locator('#fundadores').innerText();
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
