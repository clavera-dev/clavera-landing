import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';

/**
 * The owner-approved nine-area beta set (M3.5.1).
 *
 * The areas are under evaluation. Nothing on the page may imply an opening
 * order, a priority ranking, a "first district", a confirmed location, a date,
 * an address or an application count.
 *
 * Barrio names are never translated or transliterated (brief §5.3), so the
 * same nine strings must appear in Spanish, English and Russian.
 */

/** Exact set, in the exact order they must be presented. */
const AREAS = [
	'Almagro',
	'Belgrano',
	'Chacarita',
	'Colegiales',
	'Núñez',
	'Palermo',
	'Palermo Hollywood',
	'Paternal',
	'Villa Crespo',
];

/** Names removed from the earlier four-area set that must not linger. */
const REMOVED_AREAS = ['Recoleta'];

for (const locale of LOCALES) {
	test.describe(`[${locale.key}] beta areas`, () => {
		test('lists exactly the nine approved areas, in alphabetical order', async ({ page }) => {
			await page.goto(locale.path);

			const names = await page
				.locator('#zonas .zones__name')
				.evaluateAll((els) => els.map((el) => (el.textContent ?? '').trim()));

			expect(names, 'rendered area names').toEqual(AREAS);
		});

		test('the order really is alphabetical, not merely the expected array', async ({ page }) => {
			await page.goto(locale.path);
			const names = await page
				.locator('#zonas .zones__name')
				.evaluateAll((els) => els.map((el) => (el.textContent ?? '').trim()));

			// Independent check: sorting must not change anything. Uses Spanish
			// collation so `Núñez` is ordered the way a reader expects.
			const sorted = [...names].sort((a, b) => a.localeCompare(b, 'es'));
			expect(names, 'names are in collated alphabetical order').toEqual(sorted);
		});

		test('uses the original Spanish names, untranslated and untransliterated', async ({ page }) => {
			await page.goto(locale.path);
			const names = await page
				.locator('#zonas .zones__name')
				.evaluateAll((els) => els.map((el) => (el.textContent ?? '').trim()));

			for (const name of names) {
				// A Cyrillic character in a barrio name means it was transliterated
				// — the exact failure the Russian locale is most likely to have.
				expect(/[Ѐ-ӿ]/.test(name), `"${name}" is transliterated`).toBe(false);
			}

			// And the specific transliterations that would be produced.
			const body = await page.locator('#zonas').innerText();
			for (const bad of ['Чакарита', 'Палермо', 'Бельграно', 'Альмагро', 'Ньюньес', 'Патерналь']) {
				expect(body, `transliterated name ${bad}`).not.toContain(bad);
			}
		});

		test('carries no numbering, ranking or implied opening order', async ({ page }) => {
			await page.goto(locale.path);

			// An ordered list is itself a ranking claim.
			await expect(page.locator('#zonas ol'), 'ordered list in the areas section').toHaveCount(0);
			await expect(page.locator('#zonas ul')).toHaveCount(1);

			// No index markers next to the names.
			await expect(page.locator('#zonas .zones__n')).toHaveCount(0);

			// No CSS-generated counters either.
			const generated = await page.evaluate(() => {
				const items = Array.from(document.querySelectorAll('#zonas li'));
				return items
					.map((el) => window.getComputedStyle(el, '::before').content)
					.filter((c) => c && c !== 'none' && c !== 'normal' && c !== '""');
			});
			expect(generated, 'generated list markers').toEqual([]);

			// The area rows must not begin with a number.
			const rows = await page
				.locator('#zonas li')
				.evaluateAll((els) => els.map((el) => (el.textContent ?? '').trim()));
			for (const row of rows) {
				expect(/^\d/.test(row), `area row starts with a number: "${row}"`).toBe(false);
			}
		});

		test('states that the areas are under evaluation and commit to nothing', async ({ page }) => {
			await page.goto(locale.path);

			const disclaimer = page.locator('[data-zones-disclaimer]');
			await expect(disclaimer).toHaveCount(1);
			await expect(disclaimer).toBeVisible();

			const expected: Record<string, string> = {
				es: 'Barrios en evaluación. No implica compromiso de apertura, fecha ni disponibilidad.',
				en: 'Areas under evaluation. This implies no commitment to open, no date and no availability.',
				ru: 'Районы на рассмотрении. Это не означает обязательства открыть хаб, срока или наличия мест.',
			};
			await expect(disclaimer).toHaveText(expected[locale.key]);
		});

		test('shows no address, date, counter or confirmed location', async ({ page }) => {
			await page.goto(locale.path);
			const zones = await page.locator('#zonas').innerText();

			// A street number would be the clearest breach.
			expect(zones, 'street address in the areas section').not.toMatch(/\b\d{3,5}\b/);
			// No opening dates.
			expect(zones).not.toMatch(/\b20\d{2}\b/);
			for (const month of ['enero', 'marzo', 'january', 'march', 'января', 'марта']) {
				expect(zones.toLowerCase(), `date word "${month}"`).not.toContain(month);
			}
			// No map pins.
			await expect(page.locator('#zonas img, #zonas iframe, #zonas svg')).toHaveCount(0);
		});

		test('no longer names an area dropped from the approved set', async ({ page }) => {
			await page.goto(locale.path);

			/*
			  textContent, NOT innerText. A collapsed <details> is hidden, so
			  innerText silently omits every FAQ answer — which is exactly where a
			  stale area list survived this check once already. textContent reads
			  the DOM regardless of visibility.
			*/
			const body = await page.evaluate(() => document.body.textContent ?? '');
			for (const removed of REMOVED_AREAS) {
				expect(body, `removed area "${removed}" still on the page`).not.toContain(removed);
			}
		});

		test('names no priority ordering among the areas, including inside the FAQ', async ({
			page,
		}) => {
			await page.goto(locale.path);
			const body = await page.evaluate(() => document.body.textContent ?? '');

			const ranking: Record<string, string[]> = {
				es: ['zonas prioritarias', 'barrios prioritarios'],
				en: ['priority areas', 'priority neighbourhoods'],
				ru: ['приоритетные районы'],
			};
			for (const phrase of ranking[locale.key]) {
				expect(body.toLowerCase(), `ranking phrase "${phrase}"`).not.toContain(
					phrase.toLowerCase(),
				);
			}
		});
	});

	/* ---------------------------------------------------------------------
	   Planned-service wording
	   --------------------------------------------------------------------- */

	test.describe(`[${locale.key}] planned service`, () => {
		test('identifies cameras, logging and access as planned, not operating', async ({ page }) => {
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

		test('adds no new 24/7, insurance or guaranteed-security claim', async ({ page }) => {
			await page.goto(locale.path);
			const body = await page.evaluate(() => document.body.innerText);

			expect(body).not.toContain('24/7');
			for (const banned of [
				'garantía contra robo',
				'theft guarantee',
				'гарантия от кражи',
				'póliza',
				'insurance policy',
				'страховой полис',
			]) {
				expect(body.toLowerCase(), `banned claim "${banned}"`).not.toContain(banned.toLowerCase());
			}
		});
	});
}
