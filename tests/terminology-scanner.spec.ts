import { test, expect } from '@playwright/test';
import {
	TIER1,
	TIER1_COMPARISON_ROOTS,
	TIER2_S7_ALLOWLIST,
	FORBIDDEN_PROMISES,
	FORBIDDEN_BRANDS,
	S7_DISCLAIMER_EXCEPTIONS,
	stripAllowlisted,
	findViolations,
	find247PlacementViolations,
} from './terminology';

/**
 * Negative controls for the Appendix В scanner.
 *
 * A compliance suite that cannot fail is worthless. These assertions prove the
 * dictionary actually detects the terms it claims to, so a future edit that
 * breaks the matcher fails here instead of silently passing every page.
 *
 * They are pure-function checks — no page is loaded.
 */
test.describe('Appendix В scanner — negative controls', () => {
	test('detects standalone "por hora", not only "tarifa por hora"', () => {
		// Appendix В.1 lists the row as "tarifa por hora, por hora".
		expect(
			findViolations('El acceso se cobra por hora en el hub.', TIER1),
			'standalone "por hora"',
		).toContain('por hora');

		expect(
			findViolations('Sin tarifa por hora.', TIER1),
			'"tarifa por hora"',
		).toContain('tarifa por hora');

		// And it must not fire on unrelated Spanish that merely starts with "por".
		expect(
			findViolations('Guardería segura por membresía, garantizada por 24 meses.', TIER1),
			'no false positive on "por membresía" / "por 24 meses"',
		).toEqual([]);
	});

	test('detects the Tier-1 terms that previously shipped', () => {
		expect(findViolations('Nobody wanders into the car space.', TIER1)).toContain('car space');
		expect(findViolations('Арендованное машиноместо в центре.', TIER1)).toContain('машиномест');
	});

	test('detects a representative Tier-1 term from each language', () => {
		expect(findViolations('estacionamiento de bicicletas', TIER1)).toContain('estacionamiento');
		expect(findViolations('secure bike parking downtown', TIER1)).toContain('bike parking');
		expect(findViolations('удобная велопарковка рядом', TIER1)).toContain('велопарковк');
	});

	test('detects bare comparison roots once the allowlist is stripped', () => {
		// The permitted column headers are removed...
		const permitted = stripAllowlisted(
			'Cochera de auto (alternativa) · Car garage (alternative) · Автомобильная кочера (альтернатива)',
		);
		expect(findViolations(permitted, TIER1_COMPARISON_ROOTS), 'permitted headers').toEqual([]);
		expect(findViolations(permitted, TIER1), 'permitted headers, Tier 1').toEqual([]);

		// ...but the pre-handoff header without "(alternativa)" is no longer exempt.
		expect(
			findViolations(stripAllowlisted('Cochera de auto'), TIER1_COMPARISON_ROOTS),
			'old header wording',
		).toContain('cochera');

		// ...but any other use of the same roots still fails.
		expect(
			findViolations(stripAllowlisted('CLAVERA es una cochera para bicicletas.'), TIER1_COMPARISON_ROOTS),
			'unapproved "cochera"',
		).toContain('cochera');

		expect(
			findViolations(stripAllowlisted('CLAVERA — это кочера для велосипедов.'), TIER1_COMPARISON_ROOTS),
			'unapproved "кочера"',
		).toContain('кочер');
	});

	test('scopes each S7 disclaimer exception to its exact sentence only', () => {
		// Each B3 sentence is exempt in full...
		for (const sentence of Object.values(S7_DISCLAIMER_EXCEPTIONS)) {
			const stripped = stripAllowlisted(sentence);
			expect(findViolations(stripped, TIER1), `Tier 1 in "${sentence}"`).toEqual([]);
			expect(findViolations(stripped, TIER1_COMPARISON_ROOTS), `roots in "${sentence}"`).toEqual([]);
		}

		// ...but the words inside them are not exempt on their own, and neither
		// is a reworded variant of a sentence.
		expect(
			findViolations(stripAllowlisted('CLAVERA es un estacionamiento de bicis.'), TIER1),
			'bare "estacionamiento"',
		).toContain('estacionamiento');
		expect(
			findViolations(stripAllowlisted('Secure car park for bikes, not a garage.'), TIER1),
			'bare "garage"',
		).toContain('garage');
		expect(
			findViolations(stripAllowlisted('Удобная стоянка для велосипедов.'), TIER1),
			'bare "стоянка"',
		).toContain('стоянк');
		expect(
			findViolations(
				stripAllowlisted(S7_DISCLAIMER_EXCEPTIONS.es.replace('CLAVERA', 'CLAVERA hoy')),
				TIER1,
			),
			'reworded Spanish disclaimer',
		).toContain('estacionamiento');
	});

	test('the retired Spanish market note is no longer exempt', () => {
		expect(
			findViolations(
				stripAllowlisted('Valores de referencia de mercado para cocheras en CABA, agosto 2026.'),
				TIER1_COMPARISON_ROOTS,
			),
			'retired note',
		).toContain('cocheras');
	});

	test('detects forbidden promises and prohibited brand names', () => {
		expect(findViolations('Ofrecemos responsabilidad total.', FORBIDDEN_PROMISES)).toContain(
			'responsabilidad total',
		);
		expect(findViolations('Soportes monTEK y sillas Hamax.', FORBIDDEN_BRANDS)).toEqual([
			'monTEK',
			'Hamax',
		]);
	});

	test('rejects 24/7 outside its two permitted places', () => {
		const clean = {
			metadata: 'Guardería segura de bicicletas.',
			hero: 'Tu bici merece un lugar seguro.',
			body: 'Intro. Acceso digital personal, 24/7. FAQ.',
			permitted: 'Acceso digital personal, 24/7',
		};
		expect(find247PlacementViolations(clean), 'permitted placement').toEqual([]);

		expect(
			find247PlacementViolations({ ...clean, metadata: 'Acceso 24/7.' }),
			'24/7 in metadata',
		).not.toEqual([]);
		expect(
			find247PlacementViolations({ ...clean, hero: 'Acceso 24/7.', body: `${clean.body} Acceso 24/7.` }),
			'24/7 in the hero',
		).not.toEqual([]);
		expect(
			find247PlacementViolations({ ...clean, body: `${clean.body} Abierto 24/7.` }),
			'24/7 elsewhere in the body',
		).not.toEqual([]);
		expect(
			find247PlacementViolations({ ...clean, body: `${clean.body} Работаем круглосуточно.` }),
			'круглосуточно elsewhere',
		).not.toEqual([]);
	});

	test('keeps the allowlist to the six documented entries', () => {
		// A guard against the allowlist quietly growing.
		expect(TIER2_S7_ALLOWLIST).toEqual([
			'Cochera de auto (alternativa)',
			'Car garage (alternative)',
			'Автомобильная кочера (альтернатива)',
			S7_DISCLAIMER_EXCEPTIONS.es,
			S7_DISCLAIMER_EXCEPTIONS.en,
			S7_DISCLAIMER_EXCEPTIONS.ru,
		]);
	});
});
