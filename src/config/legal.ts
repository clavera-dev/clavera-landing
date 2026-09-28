/**
 * Controller identification shown in the footer of every page.
 *
 * Verbatim from the owner handoff v1.1 B2 (values from its B1 table). It stays
 * in Spanish on every locale — the handoff says so explicitly — and is
 * rendered with `lang="es-AR"`.
 *
 * The RNBD registration number has not been issued and must not be published
 * until it is (handoff B1) — it never appears here or in the legal pages.
 */
export const CONTROLLER_NOTICE_ES =
	'CLAVERA es la denominación bajo la cual Anna Kazanova, CUIT 20-96380996-5, con domicilio en Aráoz 2686, CABA, desarrolla su actividad.';

export const CONTROLLER_CONTACT_ES = 'Contacto: hola@clavera.ar';

/** Spanish-primacy clause. Shown on every locale, `es` included (B2). */
export const LANGUAGE_CLAUSE_ES =
	'La versión en español (es-AR) es la única con validez legal. Las traducciones son de cortesía.';

/**
 * `/privacidad`, `/terminos` and `/cookies`.
 *
 * >>> THIS IS THE ONLY PLACE THE REAL PUBLICATION DATE IS ENTERED. <<<
 *
 * The legal Spec (CLAVERA_Legal_Spec_v3_0_received.md §11) and the owner
 * handoff v1.1 (§7) both withhold the lawyer's final sign-off and the actual
 * publication date. Inventing a date here would misrepresent when the text
 * took effect, so this stays `null` until a real date is supplied — the pages
 * then show localized "pending publication" text instead of a date
 * (LegalPage.astro), never a fabricated one.
 *
 * Activation is exactly this: replace `null` with an ISO date (e.g.
 * `'2026-10-01'`). Nothing else changes.
 */
export const LEGAL_LAST_UPDATED: string | null = null;

/**
 * Policy version printed on /privacidad even while the publication date is
 * pending. Supplied by the owner handoff v1.1 B1, not invented.
 */
export const LEGAL_VERSION = '2026-09';

/**
 * Lawyer sign-off and owner publication approval are still outstanding (Spec
 * §11; handoff §7). Nothing in this file, or in the legal pages it feeds,
 * asserts that either has happened.
 */
export const LEGAL_SIGNOFF_PENDING = true;
