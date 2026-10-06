import { test, expect, type Page } from '@playwright/test';
import { LOCALES } from './locales';
import { es } from '../src/i18n/es';
import { en } from '../src/i18n/en';
import { ru } from '../src/i18n/ru';
import type { Copy } from '../src/i18n/types';
import { WHATSAPP_LINK } from '../src/config/contact';
import {
	SOLICITUD_DATA,
	isSolicitudLive,
	isUsableFormUrl,
	selectorHighlightSlug,
	solicitudLinkConfig,
	solicitudLocationHint,
} from '../src/config/solicitud';
import {
	SOLICITUD_FRAGMENT_KEYS,
	buildSolicitudHref,
	safeValue,
} from '../src/config/solicitud-attribution';

/**
 * Application block — CLAVERA_Dev_TZ_Bloque_Solicitud_v1_1 and owner response
 * CLAVERA_Dev_Respuesta_v1_4 (2026-10-04).
 *
 * Pure tests pin the config contract, the §3.4 link rules and the §6 copy
 * checks. Browser tests branch on whether src/config/solicitud.ts is live, so
 * switching the form on needs no test edit; both states were verified locally
 * on 2026-10-06 (docs/project/SOLICITUD_V1_4_2026-10-06.md).
 */

/** Same shape as a real responder URL. Not a real form; never committed as config. */
const SAMPLE_FORM_URL = 'https://claveraar.typeform.com/to/AbCdEfGh';
const COPY: Record<'es' | 'en' | 'ru', Copy> = { es, en, ru };
const live = isSolicitudLive();
const sampleConfig = { ...solicitudLinkConfig(), formUrl: SAMPLE_FORM_URL };

const fragmentOf = (href: string) => new URLSearchParams(new URL(href).hash.slice(1));

/* -------------------------------------------------------------------------
   Config (TZ §1)
   ------------------------------------------------------------------------- */

test.describe('solicitud config', () => {
	test('carries the TZ §1 fields and values', () => {
		const data = SOLICITUD_DATA.solicitud;
		expect(data.zone_slug).toBe('villa-crespo');
		expect(data.zone_label).toEqual({ es: 'Villa Crespo', en: 'Villa Crespo', ru: 'Вилья-Креспо' });
		expect(data.survey_version).toBe('SOLICITUD_ES_v1_0');
		expect(data.consent_v).toBe('2026-09');
		expect(data.highlight_in_selector).toBe(true);
	});

	test('uses the same WhatsApp chat as the footer', () => {
		expect(SOLICITUD_DATA.solicitud.whatsapp_url).toBe(WHATSAPP_LINK);
	});

	test('is live only with enabled=true and a usable form URL', () => {
		const data = SOLICITUD_DATA.solicitud;
		expect(isSolicitudLive({ ...data, enabled: true, form_url: SAMPLE_FORM_URL })).toBe(true);
		expect(isSolicitudLive({ ...data, enabled: false, form_url: SAMPLE_FORM_URL })).toBe(false);
		expect(isSolicitudLive({ ...data, enabled: true, form_url: '' })).toBe(false);
		for (const bad of ['http://claveraar.typeform.com/to/x', '#', 'https://example.com/form', 'not a url']) {
			expect(isUsableFormUrl(bad), bad).toBe(false);
		}
	});

	test('highlights the selector zone only while live, mapped to the selector slug', () => {
		const data = SOLICITUD_DATA.solicitud;
		const on = { ...data, enabled: true, form_url: SAMPLE_FORM_URL };
		expect(selectorHighlightSlug(on)).toBe('villa_crespo');
		expect(selectorHighlightSlug({ ...on, highlight_in_selector: false })).toBeNull();
		expect(selectorHighlightSlug({ ...on, enabled: false })).toBeNull();
	});

	test('an empty location hint renders no hint, per language', () => {
		const data = { ...SOLICITUD_DATA.solicitud, location_hint: { es: 'Av. Ejemplo', en: '', ru: '  ' } };
		expect(solicitudLocationHint('es', data)).toBe('Av. Ejemplo');
		expect(solicitudLocationHint('en', data)).toBeNull();
		expect(solicitudLocationHint('ru', data)).toBeNull();
	});
});

/* -------------------------------------------------------------------------
   Link attribution (TZ §3.4, §6 item 11)
   ------------------------------------------------------------------------- */

test.describe('solicitud link', () => {
	test('without page tags it carries the defaults, in the TZ order', () => {
		for (const language of ['es', 'en', 'ru'] as const) {
			expect(buildSolicitudHref(sampleConfig, language)).toBe(
				`${SAMPLE_FORM_URL}#recruitment_source=clavera_ar&campaign=site_${language}` +
					`&consent_v=2026-09&survey_version=SOLICITUD_ES_v1_0&language=${language}&candidate_zone=villa-crespo`,
			);
		}
	});

	test('takes the four allowlisted tags and drops click ids and anything else', () => {
		const href = buildSolicitudHref(
			sampleConfig,
			'es',
			'?utm_source=instagram&utm_medium=social&utm_campaign=test&fbclid=abc&x=1&gclid=1&utm_content=Story_A',
		);
		const params = fragmentOf(href);
		expect(params.get('recruitment_source')).toBe('instagram');
		expect(params.get('campaign')).toBe('test');
		expect(params.get('utm_medium')).toBe('social');
		expect(params.get('utm_content')).toBe('story_a');
		expect([...params.keys()]).toEqual([...SOLICITUD_FRAGMENT_KEYS]);
		for (const leaked of ['fbclid', 'gclid', 'abc', 'x=']) expect(href).not.toContain(leaked);
		expect(new URL(href).search).toBe('');
	});

	test('an invalid tag falls back to the default', () => {
		const params = fragmentOf(buildSolicitudHref(sampleConfig, 'ru', '?utm_source=Ig%20Test!&utm_medium=a%40b'));
		expect(params.get('recruitment_source')).toBe('clavera_ar');
		expect(params.get('campaign')).toBe('site_ru');
		expect(params.has('utm_medium')).toBe(false);
	});

	test('safeValue enforces ^[a-z0-9_-]{1,40}$ after lower-casing', () => {
		expect(safeValue('Instagram')).toBe('instagram');
		expect(safeValue('a'.repeat(40))).toBe('a'.repeat(40));
		expect(safeValue('a'.repeat(41))).toBeNull();
		expect(safeValue('mail@x.com')).toBeNull();
		expect(safeValue('')).toBeNull();
		expect(safeValue(null)).toBeNull();
	});
});

/* -------------------------------------------------------------------------
   Copy (TZ §3.2–3.3, §4, §6 items 1–5; v1.4 §1.2)
   ------------------------------------------------------------------------- */

const PILOT_PHRASE = { es: /primer piloto/i, en: /first pilot/i, ru: /перв(ый|ого) пилот/i };
const BINDING_WORDS = {
	es: /\b(reserva|reservá|seña|señal|depósito|pago|pagar)\b/i,
	en: /\b(reservation|reserve|deposit|payment|pay)\b/i,
	ru: /(брон|депозит|оплат|платеж|платёж)/i,
};
const FORBIDDEN = [
	/darwin/i,
	/651/,
	/primer hub|первый хаб|primera sede/i,
	/próximamente|abrimos|abriremos|será|estaremos en|будет|откроемся/i,
	/\bARS\b|\$|%|por hora|desde|gratis|sin costo/i,
	/estacionamiento|parking|cochera|garaje|стоянк|парковк/i,
	/®|™|marca registrada/i,
];

for (const key of ['es', 'en', 'ru'] as const) {
	test.describe(`[${key}] solicitud copy`, () => {
		const c = COPY[key].solicitud;
		const strings: Array<[string, string]> = [
			['eyebrow', c.eyebrow],
			['heading', c.heading],
			['hint', c.hint],
			['lead', c.lead],
			...c.steps.map((s, i): [string, string] => [`step${i + 1}`, s]),
			['cta', c.cta],
			['microcopy', c.microcopy],
			['privacyLink', c.privacyLink],
			['disclaimer', c.disclaimer],
			['secondary', c.secondary],
			['whatsapp', c.whatsapp],
			['selectorBadge', c.selectorBadge],
			['pageTitle', c.pageTitle],
		];

		test('"first pilot" appears only in the heading and the selector badge', () => {
			const where = strings.filter(([, s]) => PILOT_PHRASE[key].test(s)).map(([n]) => n);
			expect(where).toEqual(['heading', 'selectorBadge']);
		});

		test('binding words appear only inside the disclaimer', () => {
			const where = strings.filter(([, s]) => BINDING_WORDS[key].test(s)).map(([n]) => n);
			expect(where).toEqual(['disclaimer']);
		});

		test('no digit, price, date promise, address or stop-list term', () => {
			for (const [name, s] of strings) {
				expect(s, `${name} has a digit`).not.toMatch(/\d/);
				for (const pattern of FORBIDDEN) expect(s, `${name} matches ${pattern}`).not.toMatch(pattern);
			}
			for (const label of Object.values(SOLICITUD_DATA.solicitud.zone_label)) {
				expect(label).not.toMatch(/\d/);
			}
		});

		test('the price FAQ answer is the v1.4 §1.2 text', () => {
			const expected = {
				es: {
					q: '¿Cuánto cuesta?',
					a: 'Todavía no publicamos precios. Si dejás tu solicitud y confirmás que necesitás guardar tu vehículo en la zona en evaluación, te enviamos el precio y las condiciones.',
				},
				en: {
					q: 'How much does it cost?',
					a: 'We do not publish prices yet. If you leave a request and confirm that you need to store your vehicle in the area under evaluation, we send you the price and terms.',
				},
				ru: {
					q: 'Сколько это стоит?',
					a: 'Цены мы пока не публикуем. Если ты оставишь заявку и подтвердишь, что тебе нужно хранить транспорт в оцениваемой зоне, мы пришлём цену и условия.',
				},
			}[key];
			const item = COPY[key].faq.items.find((i) => i.q === expected.q);
			expect(item?.a).toBe(expected.a);
			expect(item!.a).not.toMatch(/\d|desde|por mes|gratis|sin costo/i);
		});
	});
}

/* -------------------------------------------------------------------------
   Rendered page — branches on the live state (TZ §6 items 6–14)
   ------------------------------------------------------------------------- */

async function storageIsEmpty(page: Page) {
	return page.evaluate(() => ({
		local: window.localStorage.length,
		session: window.sessionStorage.length,
		cookie: document.cookie,
	}));
}

for (const locale of LOCALES) {
	test.describe(`[${locale.key}] solicitud on the page`, () => {
		test('the block, the selector highlight and /solicitud follow the config', async ({ page }) => {
			await page.goto(locale.path);
			await expect(page.locator('[data-solicitud]')).toHaveCount(live ? 1 : 0);
			await expect(page.locator('#solicitud')).toHaveCount(live ? 1 : 0);
			// Two selectors (hero and S10), one candidate zone each when live.
			await expect(page.locator('[data-zone-candidate]')).toHaveCount(live ? 2 : 0);
			await expect(page.locator('[data-zone-badge]')).toHaveCount(live ? 2 : 0);

			const response = await page.goto(`${locale.path}solicitud`);
			expect(response?.status()).toBe(live ? 200 : 404);
		});

		test('the price FAQ answer is rendered', async ({ page }) => {
			await page.goto(locale.path);
			const answer = COPY[locale.key].faq.items.find((i) => /cuesta|cost|стоит/i.test(i.q))!.a;
			await expect(page.locator('.faq')).toContainText(answer);
		});

		test('the language switcher keeps the query string', async ({ page }) => {
			await page.goto(`${locale.path}?utm_source=test&utm_campaign=test`);
			const hrefs = await page.locator('.lang__link').evaluateAll((els) =>
				els.map((el) => (el as HTMLAnchorElement).href),
			);
			expect(hrefs.length).toBeGreaterThan(0);
			for (const href of hrefs) expect(new URL(href).search).toBe('?utm_source=test&utm_campaign=test');
			expect(await storageIsEmpty(page)).toEqual({ local: 0, session: 0, cookie: '' });
		});

		test.describe('live block', () => {
			test.skip(!live, 'application form switched off');

			test('has the TZ §3.1 structure, with no image and no hint while empty', async ({ page }) => {
				await page.goto(locale.path);
				const block = page.locator('#fundadores [data-solicitud]');
				await expect(block.locator('ol > li')).toHaveCount(3);
				await expect(block.locator('img, picture, video, iframe, button, form')).toHaveCount(0);
				await expect(block.locator('[data-solicitud-hint]')).toHaveCount(
					solicitudLocationHint(locale.key) === null ? 0 : 1,
				);
				await expect(block.locator('h2')).toContainText(SOLICITUD_DATA.solicitud.zone_label[locale.key]);
				const text = (await block.innerText()) ?? '';
				expect(text, 'no digit in the block').not.toMatch(/\d/);
				await expect(block.locator('a[href$="privacidad"]')).toHaveCount(1);
				await expect(block.locator('[data-solicitud-whatsapp]')).toHaveAttribute(
					'href',
					SOLICITUD_DATA.solicitud.whatsapp_url,
				);
			});

			test('the disclaimer is visible, at least 12px, and not collapsed', async ({ page }) => {
				for (const width of [375, 1440]) {
					await page.setViewportSize({ width, height: 900 });
					await page.goto(locale.path);
					const disclaimer = page.locator('[data-solicitud-disclaimer]');
					await disclaimer.scrollIntoViewIfNeeded();
					await expect(disclaimer).toBeVisible();
					const size = await disclaimer.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
					expect(size).toBeGreaterThanOrEqual(12);
				}
			});

			test('the link carries validated page tags, and only them', async ({ page }) => {
				await page.goto(
					`${locale.path}?utm_source=instagram&utm_medium=social&utm_campaign=test&fbclid=abc&x=1`,
				);
				const href = (await page.locator('[data-solicitud-link]').getAttribute('href'))!;
				const params = fragmentOf(href);
				expect(params.get('recruitment_source')).toBe('instagram');
				expect(params.get('campaign')).toBe('test');
				expect(params.get('utm_medium')).toBe('social');
				expect(params.get('language')).toBe(locale.key);
				expect(params.get('candidate_zone')).toBe('villa-crespo');
				expect(href).not.toContain('fbclid');
				expect(href).not.toContain('x=1');

				await page.goto(`${locale.path}?utm_source=Ig%20Test!`);
				const fallback = fragmentOf((await page.locator('[data-solicitud-link]').getAttribute('href'))!);
				expect(fallback.get('recruitment_source')).toBe('clavera_ar');
				expect(await storageIsEmpty(page)).toEqual({ local: 0, session: 0, cookie: '' });
			});

			test.describe('without JavaScript', () => {
				test.use({ javaScriptEnabled: false });

				test('the link already holds the defaults', async ({ page }) => {
					await page.goto(`${locale.path}?utm_source=instagram`);
					const href = (await page.locator('[data-solicitud-link]').getAttribute('href'))!;
					expect(href).toBe(buildSolicitudHref(solicitudLinkConfig(), locale.key));
				});
			});

			test('the selector labels only the candidate zone, and search finds it', async ({ page }) => {
				await page.goto(locale.path);
				const selector = page.locator('#zonas [data-zone-selector]');
				const input = selector.locator('[data-zone-input]');
				for (const query of ['vill', 'crespo', 'villa crespo']) {
					await input.fill(query);
					const option = selector.locator('[data-zone-option][data-zone-candidate]');
					await expect(option).toBeVisible();
					await expect(option).toContainText(COPY[locale.key].solicitud.selectorBadge);
				}
				await expect(selector.locator('[data-zone-badge]')).toHaveCount(1);
				await input.fill('crespo');
				await selector.locator('[data-zone-option][data-zone-candidate]').click();
				await expect(input).toHaveValue('Villa Crespo');
				const continueHref = await selector.locator('[data-zone-continue]').getAttribute('href');
				expect(fragmentOf(continueHref!).get('candidate_zone')).toBe('villa_crespo');
			});

			test('/solicitud renders the same block with header and footer', async ({ page }) => {
				await page.goto(`${locale.path}solicitud`);
				await expect(page.locator('[data-solicitud]')).toHaveCount(1);
				await expect(page.locator('.site-header')).toHaveCount(1);
				await expect(page.locator('footer')).toHaveCount(1);
				await expect(page.locator('h1')).toHaveCount(1);
				const title = await page.title();
				for (const label of Object.values(SOLICITUD_DATA.solicitud.zone_label)) {
					expect(title).not.toContain(label);
				}
			});

			test('"first pilot" appears only in the block heading and the selector badges', async ({ page }) => {
				await page.goto(locale.path);
				const source = { es: 'primer piloto', en: 'first pilot', ru: 'перв(ый|ого) пилот' }[locale.key];
				const places = await page.evaluate((src) => {
					const pattern = new RegExp(src, 'i');
					const found: string[] = [];
					const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
					for (let node = walker.nextNode(); node; node = walker.nextNode()) {
						if (!pattern.test(node.textContent ?? '')) continue;
						const owner = node.parentElement!.closest('#solicitud-heading, [data-zone-badge]');
						found.push(owner ? (owner.id || 'badge') : node.parentElement!.outerHTML.slice(0, 80));
					}
					const meta = [document.title, ...Array.from(document.querySelectorAll('meta')).map((m) => m.content ?? '')];
					return { found, inMeta: meta.some((m) => pattern.test(m)) };
				}, source);
				expect(places.inMeta).toBe(false);
				expect(places.found.sort()).toEqual(['badge', 'badge', 'solicitud-heading']);
			});
		});
	});
}
