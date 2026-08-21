import { test, expect } from '@playwright/test';
import {
	TIER1,
	TIER1_COMPARISON_ROOTS,
	TIER2_S7_ALLOWLIST,
	FORBIDDEN_PROMISES,
	FORBIDDEN_BRANDS,
	stripAllowlisted,
	findViolations,
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
		const permitted = stripAllowlisted('Cochera de auto · Car garage · Автомобильная кочера');
		expect(findViolations(permitted, TIER1_COMPARISON_ROOTS), 'permitted headers').toEqual([]);

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

	test('scopes the Spanish note exception to that exact sentence only', () => {
		// The canonical sentence is exempt in full...
		const canonical = 'Valores de referencia de mercado para cocheras en CABA, agosto 2026.';
		expect(
			findViolations(stripAllowlisted(canonical), TIER1_COMPARISON_ROOTS),
			'canonical Spanish note',
		).toEqual([]);

		// ...but the bare word is not exempt on its own, and neither is a
		// reworded variant of the same sentence.
		expect(
			findViolations(stripAllowlisted('Precios de cocheras en Palermo.'), TIER1_COMPARISON_ROOTS),
			'bare "cocheras" outside the canonical sentence',
		).toContain('cocheras');

		expect(
			findViolations(
				stripAllowlisted('Valores de mercado para cocheras en CABA, agosto 2026.'),
				TIER1_COMPARISON_ROOTS,
			),
			'reworded variant of the canonical sentence',
		).toContain('cocheras');
	});

	test('grants no Tier-2 exception to English or Russian notes', () => {
		// `car garages` and `автомобильных кочер` were removed from the
		// allowlist; the note wording must not reintroduce them.
		expect(
			findViolations(stripAllowlisted('Market reference values for car garages in CABA.'), TIER1),
			'"car garages" in an English note',
		).toContain('garages');

		expect(
			findViolations(
				stripAllowlisted('Справочные значения для автомобильных кочер в CABA.'),
				TIER1_COMPARISON_ROOTS,
			),
			'"автомобильных кочер" in a Russian note',
		).toContain('кочер');
	});

	test('detects forbidden promises and prohibited brand names', () => {
		expect(findViolations('Ofrecemos responsabilidad total.', FORBIDDEN_PROMISES)).toContain(
			'responsabilidad total',
		);
		expect(findViolations('Acceso 24/7.', FORBIDDEN_PROMISES)).toContain('24/7');
		expect(findViolations('Soportes monTEK y sillas Hamax.', FORBIDDEN_BRANDS)).toEqual([
			'monTEK',
			'Hamax',
		]);
	});

	test('keeps the allowlist to the four documented entries', () => {
		// A guard against the allowlist quietly growing.
		expect(TIER2_S7_ALLOWLIST).toEqual([
			'Cochera de auto',
			'Car garage',
			'Автомобильная кочера',
			'Valores de referencia de mercado para cocheras en CABA, agosto 2026.',
		]);
	});
});
