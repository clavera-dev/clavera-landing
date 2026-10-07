/**
 * Candidate zones — DATA ONLY. Edit this list; nothing else needs to change.
 *
 * Working list confirmed by owner response v1.2 §1.8 (2026-09-27).
 * Future targeted edits arrive as a replacement config; no location is
 * confirmed for opening.
 *
 * - Labels are the original Spanish names, used unchanged in every locale.
 * - Barrios are alphabetical; the two catch-all options stay last, as in the
 *   draft.
 * - Slugs other than palermo_hollywood, belgrano_r, otro_caba and fuera_caba
 *   are proposed here, not supplied by the handoff. A slug may contain only
 *   a–z, 0–9 and `_`.
 *
 * The handoff asks for "one JSON config". This is a TypeScript data module
 * rather than a `.json` file only because the test suite imports it through
 * Playwright's Node ESM loader, where a bare JSON import is not reliably
 * supported. It holds the same data in JSON-shaped object literals, one
 * config for all three locales.
 */
export const CANDIDATE_ZONE_DATA = {
	status: 'working',
	zones: [
		{ slug: 'almagro', label: 'Almagro' },
		{ slug: 'balvanera', label: 'Balvanera' },
		{ slug: 'barrio_norte', label: 'Barrio Norte' },
		{ slug: 'belgrano_barrancas', label: 'Belgrano — Barrancas' },
		{ slug: 'belgrano_c', label: 'Belgrano — C' },
		{ slug: 'belgrano_r', label: 'Belgrano — R' },
		{ slug: 'boedo', label: 'Boedo' },
		{ slug: 'caballito', label: 'Caballito' },
		{ slug: 'chacarita', label: 'Chacarita' },
		{ slug: 'coghlan', label: 'Coghlan' },
		{ slug: 'colegiales', label: 'Colegiales' },
		{ slug: 'flores', label: 'Flores' },
		{ slug: 'monserrat', label: 'Monserrat' },
		{ slug: 'nunez', label: 'Núñez' },
		{ slug: 'palermo_botanico_plaza_italia', label: 'Palermo — Botánico / Plaza Italia' },
		{ slug: 'palermo_chico', label: 'Palermo — Chico' },
		{ slug: 'palermo_hollywood', label: 'Palermo — Hollywood' },
		{ slug: 'palermo_las_canitas', label: 'Palermo — Las Cañitas' },
		{ slug: 'palermo_soho', label: 'Palermo — Soho' },
		{ slug: 'paternal', label: 'Paternal' },
		{ slug: 'puerto_madero', label: 'Puerto Madero' },
		{ slug: 'recoleta', label: 'Recoleta' },
		{ slug: 'retiro', label: 'Retiro' },
		{ slug: 'saavedra', label: 'Saavedra' },
		{ slug: 'san_nicolas_microcentro', label: 'San Nicolás / Microcentro' },
		{ slug: 'san_telmo', label: 'San Telmo' },
		{ slug: 'villa_crespo', label: 'Villa Crespo' },
		{ slug: 'villa_ortuzar', label: 'Villa Ortúzar' },
		{ slug: 'villa_urquiza', label: 'Villa Urquiza' },
	],
	catchAll: [
		{ slug: 'otro_caba', label: 'Otro barrio de CABA' },
		{ slug: 'fuera_caba', label: 'Fuera de CABA' },
	],
};
