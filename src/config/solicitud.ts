/**
 * Application block ("Sumate al piloto" → solicitud) — DATA plus accessors.
 *
 * >>> THIS IS THE ONLY PLACE THE APPLICATION FORM IS SWITCHED ON. <<<
 *
 * Owner documents: CLAVERA_Dev_Respuesta_v1_4 (2026-10-04) and
 * CLAVERA_Dev_TZ_Bloque_Solicitud_v1_1 §1. The data below is the TZ's JSON
 * config, field for field. It is a TypeScript module rather than a `.json`
 * file for the same reason as candidate-zones.ts: the test suite imports it
 * through Playwright's Node ESM loader.
 *
 * Switching rules (TZ §1):
 * - `enabled: false` OR an empty `form_url` → the block is absent from the
 *   markup, `/solicitud` is not built, and no zone is highlighted in the
 *   selector. The page is the v1_2 page.
 * - Switching on or off is this file plus a rebuild. No template changes.
 * - `form_url` is the application Typeform. It replaces the old "Avisame"
 *   form: there is no separate Avisame form any more (v1_4 §1.1).
 * - `location_hint` stays empty until the owner sends the text; an empty
 *   string for a language means no hint line in that language.
 */
import type { Locale } from '../i18n/config';
import { isCandidateZoneSlug } from './zones';
import type { SolicitudLinkConfig } from './solicitud-attribution';

export const SOLICITUD_DATA = {
	solicitud: {
		enabled: false,
		form_url: '',
		zone_slug: 'villa-crespo',
		zone_label: { es: 'Villa Crespo', en: 'Villa Crespo', ru: 'Вилья-Креспо' },
		highlight_in_selector: true,
		location_hint: { es: '', en: '', ru: '' },
		survey_version: 'SOLICITUD_ES_v1_0',
		consent_v: '2026-09',
		whatsapp_url: 'https://wa.me/message/VWLBN6XDY6ZHP1',
	},
};

export type SolicitudData = (typeof SOLICITUD_DATA)['solicitud'];

/** A real https responder URL; never a placeholder, bare hash or example. */
export function isUsableFormUrl(url: string): boolean {
	if (url.trim() === '') return false;
	let parsed: URL;
	try {
		parsed = new URL(url);
	} catch {
		return false;
	}
	if (parsed.protocol !== 'https:') return false;
	// Host-based, so a real form id that happens to contain "todo" or "tbd"
	// cannot silently switch the block off.
	if (/^(localhost|127\.|0\.0\.0\.0)|(^|\.)example\.(com|org|net)$/i.test(parsed.hostname)) return false;
	return !/placeholder|changeme/i.test(parsed.pathname);
}

/** True when the block, `/solicitud` and the selector highlight are live. */
export function isSolicitudLive(data: SolicitudData = SOLICITUD_DATA.solicitud): boolean {
	return data.enabled === true && isUsableFormUrl(data.form_url);
}

export function solicitudLinkConfig(data: SolicitudData = SOLICITUD_DATA.solicitud): SolicitudLinkConfig {
	return {
		formUrl: data.form_url,
		consentV: data.consent_v,
		surveyVersion: data.survey_version,
		zoneSlug: data.zone_slug,
	};
}

/**
 * The zone selector's slug for the candidate zone, or `null` when nothing is
 * highlighted.
 *
 * The selector's slugs (candidate-zones.ts, owner response v1.2) use `_`; the
 * form's `candidate_zone` uses the TZ's `villa-crespo`. The selector keeps its
 * own slug so research-survey answers stay comparable across all zones.
 */
export function selectorHighlightSlug(data: SolicitudData = SOLICITUD_DATA.solicitud): string | null {
	if (!isSolicitudLive(data) || !data.highlight_in_selector) return null;
	const slug = data.zone_slug.replace(/-/g, '_');
	if (!isCandidateZoneSlug(slug)) {
		throw new Error(`solicitud: zone_slug "${data.zone_slug}" has no candidate-zone entry`);
	}
	return slug;
}

export function solicitudZoneLabel(locale: Locale, data: SolicitudData = SOLICITUD_DATA.solicitud): string {
	return data.zone_label[locale];
}

/** The location hint for a language, or `null` when that language has none. */
export function solicitudLocationHint(locale: Locale, data: SolicitudData = SOLICITUD_DATA.solicitud): string | null {
	const hint = data.location_hint[locale].trim();
	return hint === '' ? null : hint;
}
