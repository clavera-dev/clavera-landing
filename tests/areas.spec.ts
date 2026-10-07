import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';
import { CANDIDATE_ZONES, CANDIDATE_ZONES_STATUS } from '../src/config/zones';
import { buildResearchHref } from '../src/config/typeform';

/**
 * The zone selector (owner handoff v1.1 §3.2, owner response v1.2 §1.8).
 *
 * The working zone list has been confirmed by the owner. These tests read the
 * list from the one config file so a future targeted update stays isolated.
 * What they pin are the rules any list must follow: alphabetical barrios, no
 * numbering or ranking, original Spanish names in every locale, no
 * addresses, pins, dates or counters, and `candidate_zone` in the survey
 * fragment only for a chosen zone.
 */

const BARRIOS = CANDIDATE_ZONES.filter((z) => !['otro_caba', 'fuera_caba'].includes(z.slug));

test.describe('candidate-zone configuration', () => {
	test('uses the owner-confirmed working list', () => {
		expect(CANDIDATE_ZONES_STATUS).toBe('working');
	});

	test('lists the barrios alphabetically, then the two catch-all options', () => {
		const labels = BARRIOS.map((z) => z.label);
		const sorted = [...labels].sort((a, b) => a.localeCompare(b, 'es'));
		expect(labels, 'barrios in collated alphabetical order').toEqual(sorted);

		const tail = CANDIDATE_ZONES.slice(-2).map((z) => z.slug);
		expect(tail).toEqual(['otro_caba', 'fuera_caba']);
	});

	test('uses URL-safe, unique slugs', () => {
		const slugs = CANDIDATE_ZONES.map((z) => z.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
		for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9_]+$/);
		// The four slugs the handoff itself gives as examples.
		for (const given of ['palermo_hollywood', 'belgrano_r', 'otro_caba', 'fuera_caba']) {
			expect(slugs).toContain(given);
		}
	});
});

for (const locale of LOCALES) {
	test.describe(`[${locale.key}] zone selector`, () => {
		test('appears in the hero and in S10, and the old area list is gone', async ({ page }) => {
			await page.goto(locale.path);
			await expect(page.locator('#top [data-zone-selector]')).toHaveCount(1);
			await expect(page.locator('#zonas [data-zone-selector]')).toHaveCount(1);

			// No area list, no ordered list, no index markers.
			await expect(page.locator('#zonas ul:not([role="listbox"]), #zonas ol')).toHaveCount(0);
			await expect(page.locator('#zonas .zones__name, #zonas .zones__n')).toHaveCount(0);
		});

		test('offers exactly the configured zones, in order', async ({ page }) => {
			await page.goto(locale.path);

			for (const scope of ['#top', '#zonas']) {
				const options = await page
					.locator(`${scope} [data-zone-option]`)
					.evaluateAll((els) =>
						els.map((el) => ({
							value: (el as HTMLElement).dataset.slug,
							// The zone name itself; a live application form adds a label
							// to one option (owner response v1.4 §1.4), outside the name.
							label: (el as HTMLElement).dataset.label,
						})),
					);

				expect(options, `${scope} zones`).toEqual(
					CANDIDATE_ZONES.map((z) => ({ value: z.slug, label: z.label })),
				);
			}
		});

		test('uses the original Spanish names, untranslated and untransliterated', async ({ page }) => {
			await page.goto(locale.path);
			const labels = await page
				.locator('#zonas [data-zone-option]')
				.evaluateAll((els) => els.map((el) => (el as HTMLElement).dataset.label ?? ''));

			for (const label of labels) {
				expect(/[Ѐ-ӿ]/.test(label), `"${label}" is transliterated`).toBe(false);
			}
			for (const bad of ['Чакарита', 'Палермо', 'Бельграно', 'Альмагро', 'Ньюньес', 'Патерналь']) {
				expect(labels.join(' '), `transliterated name ${bad}`).not.toContain(bad);
			}
		});

		test('carries no numbering, ranking or implied opening order', async ({ page }) => {
			await page.goto(locale.path);
			const labels = await page
				.locator('[data-zone-option]')
				.evaluateAll((els) => els.map((el) => (el.textContent ?? '').trim()));
			for (const label of labels) {
				expect(/^\d/.test(label), `option starts with a number: "${label}"`).toBe(false);
			}

			// No zone is preselected.
			const selected = await page
				.locator('[data-zone-input]')
				.evaluateAll((els) => els.map((el) => (el as HTMLInputElement).value));
			expect(selected).toEqual(['', '']);

			const body = (await page.evaluate(() => document.body.textContent ?? '')).toLowerCase();
			const ranking: Record<string, string[]> = {
				es: ['zonas prioritarias', 'barrios prioritarios', 'primer hub'],
				en: ['priority areas', 'priority neighbourhoods', 'first hub'],
				ru: ['приоритетные районы', 'первый хаб'],
			};
			for (const phrase of ranking[locale.key]) {
				expect(body, `ranking phrase "${phrase}"`).not.toContain(phrase);
			}
		});

		test('states under the S10 selector that no location is chosen and nothing is committed', async ({
			page,
		}) => {
			await page.goto(locale.path);

			const disclaimer = page.locator('#zonas [data-zones-disclaimer]');
			await expect(disclaimer).toHaveCount(1);
			await expect(disclaimer).toBeVisible();

			const expected: Record<string, string> = {
				es: 'Todavía no elegimos ubicaciones: las define la demanda. Elegir una zona no implica compromiso de apertura, fecha ni disponibilidad.',
				en: 'We have not chosen any locations yet: demand decides. Choosing an area implies no commitment to open, no date and no availability.',
				ru: 'Мы ещё не выбрали локации: их определяет спрос. Выбор зоны не означает обязательства открыть хаб, срока или наличия мест.',
			};
			await expect(disclaimer).toHaveText(expected[locale.key]);
		});

		test('shows no address, date, counter or map pin', async ({ page }) => {
			await page.goto(locale.path);
			const zones = await page.locator('#zonas').innerText();

			expect(zones, 'street address in the zones section').not.toMatch(/\b\d{3,5}\b/);
			expect(zones).not.toMatch(/\b20\d{2}\b/);
			await expect(page.locator('#zonas img, #zonas iframe, #zonas svg')).toHaveCount(0);
		});

		test('"Seguir" carries the chosen zone in the fragment, and only then', async ({ page }) => {
			await page.goto(locale.path);

			for (const scope of ['#top', '#zonas']) {
				const input = page.locator(`${scope} [data-zone-input]`);
				const link = page.locator(`${scope} [data-zone-continue]`);
				await expect(input).toBeVisible();

				// No zone chosen: no candidate_zone.
				expect(await link.getAttribute('href')).toBe(locale.surveyHref);

				const zone = CANDIDATE_ZONES[3];
				await input.fill('Barrancas');
				await page.locator(`${scope} [data-zone-option][data-slug="${zone.slug}"]`).click();
				const chosen = new URL((await link.getAttribute('href')) ?? '');
				const params = new URLSearchParams(chosen.hash.slice(1));
				expect(params.get('candidate_zone'), `${scope} candidate_zone`).toBe(zone.slug);
				expect(`${chosen.origin}${chosen.pathname}`).toBe(locale.surveyUrl);
				expect(chosen.search, 'nothing in the query string').toBe('');
				// Exactly the prebuilt href: the rest of the attribution is unchanged.
				expect(chosen.toString()).toBe(buildResearchHref(locale.key, zone.slug));

				// Editing the choice removes the parameter; arbitrary text stays local.
				await input.fill('my-private-address@example.com');
				expect(await link.getAttribute('href')).toBe(locale.surveyHref);
			}
		});

		test('filters by substring without case or accents, and shows all on empty input', async ({ page }) => {
			await page.goto(locale.path);
			const input = page.locator('#zonas [data-zone-input]');
			const visible = page.locator('#zonas [data-zone-option]:visible');
			await input.fill('holly');
			await expect(visible).toHaveCount(1);
			await expect(visible.first()).toHaveText('Palermo — Hollywood');
			await input.fill('nunez');
			await expect(visible).toHaveCount(1);
			await expect(visible.first()).toHaveText('Núñez');
			await input.fill('');
			await expect(visible).toHaveCount(CANDIDATE_ZONES.length);
		});
	});

	/* ---------------------------------------------------------------------
	   Planned-service wording
	   --------------------------------------------------------------------- */

	test.describe(`[${locale.key}] planned service`, () => {
		test('identifies access logging and identification as planned, not operating', async ({
			page,
		}) => {
			await page.goto(locale.path);

			const notes = page.locator('[data-planned-note]');
			await expect(notes, 'planned-service notes').toHaveCount(2);

			for (const note of await notes.all()) {
				await expect(note).toBeVisible();
				const text = ((await note.textContent()) ?? '').toLowerCase();
				const marker: Record<string, string[]> = {
					es: ['previst', 'operación'],
					en: ['planned', 'operation'],
					ru: ['планируем', 'работает'],
				};
				const hit = marker[locale.key].some((m) => text.includes(m));
				expect(hit, `planned-service note lacks a future-tense marker: "${text}"`).toBe(true);
			}
		});

		test('names no camera or surveillance, and no "minutes from home"', async ({ page }) => {
			await page.goto(locale.path);

			// Handoff v1.1 B5 and §6.1, across visible copy, metadata and alt text.
			const corpus = await page.evaluate(() => {
				const clone = document.body.cloneNode(true) as HTMLElement;
				clone.querySelectorAll('script, style').forEach((el) => el.remove());
				const meta = Array.from(document.querySelectorAll('meta'))
					.map((m) => m.getAttribute('content') ?? '')
					.join(' ');
				const alts = Array.from(document.querySelectorAll('[alt]'))
					.map((el) => el.getAttribute('alt') ?? '')
					.join(' ');
				return `${document.title} ${meta} ${alts} ${clone.textContent ?? ''}`.toLowerCase();
			});

			for (const banned of [
				'vigilancia',
				'surveillance',
				'cámara',
				'camera',
				'камер',
				'видеонаблюд',
				'a minutos',
				'minutes from home',
				'минутах от дома',
			]) {
				expect(corpus, `"${banned}"`).not.toContain(banned);
			}
		});

		test('adds no insurance or guaranteed-security claim', async ({ page }) => {
			await page.goto(locale.path);
			const body = await page.evaluate(() => document.body.innerText);

			for (const banned of [
				'garantía contra robo',
				'theft guarantee',
				'гарантия от кражи',
				'póliza',
				'insurance policy',
				'страховой полис',
				'garantiz',
				'guaranteed',
				'гарантир',
			]) {
				expect(body.toLowerCase(), `banned claim "${banned}"`).not.toContain(banned.toLowerCase());
			}
		});

		test('uses mixed removable and integrated-battery handling', async ({ page }) => {
			await page.goto(locale.path);
			const expected: Record<string, string> = {
				es: 'E-bikes y monopatines eléctricos: si la batería es removible, te la llevás con vos; si está integrada, la bici se guarda en una zona separada. No se cargan baterías dentro del hub.',
				en: 'E-bikes and e-scooters: if the battery is removable, you take it with you; if it is built in, the bike is stored in a separate area. Batteries are not charged inside the hub.',
				ru: 'E-bike и электросамокаты: съёмную батарею забираешь с собой, а велосипед со встроенной батареей хранится в отдельной зоне. Батареи внутри хаба не заряжаются.',
			};
			await expect(page.locator('[data-battery-note]')).toHaveText(expected[locale.key]);
			const body = await page.evaluate(() => document.body.textContent ?? '');
			// The answer to the e-bike FAQ repeats it.
			expect(body.split(expected[locale.key]).length - 1).toBe(2);
		});
	});
}
