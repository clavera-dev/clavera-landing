/**
 * Attribution for the application-form link (TZ Bloque Solicitud v1.1 §3.4).
 *
 * Pure and dependency-free, because the same code runs twice: at build time,
 * to put the default href in the markup (so the link works without
 * JavaScript), and in the browser, where the block's script re-reads the
 * page's own query string and rewrites the href.
 *
 * Only four values ever come from the page address — utm_source, utm_campaign,
 * utm_medium and utm_content — and each must match SAFE_VALUE after
 * lower-casing, or it is dropped and the default is used. Nothing else is
 * forwarded: no click ids (fbclid, gclid, ttclid, igshid…), no personal data,
 * and nothing is written to cookies or any storage.
 */

export type SolicitudLanguage = 'es' | 'en' | 'ru';

/** Fragment keys, in the order the TZ lists them. */
export const SOLICITUD_FRAGMENT_KEYS = [
	'recruitment_source',
	'campaign',
	'utm_medium',
	'utm_content',
	'consent_v',
	'survey_version',
	'language',
	'candidate_zone',
] as const;

export type SolicitudFragmentKey = (typeof SOLICITUD_FRAGMENT_KEYS)[number];

export const SAFE_VALUE = /^[a-z0-9_-]{1,40}$/;

export const DEFAULT_RECRUITMENT_SOURCE = 'clavera_ar';

export interface SolicitudLinkConfig {
	formUrl: string;
	consentV: string;
	surveyVersion: string;
	zoneSlug: string;
}

/** A page-address value after the §3.4 rule 1 check, or `null`. */
export function safeValue(raw: string | null | undefined): string | null {
	if (typeof raw !== 'string') return null;
	const value = raw.toLowerCase();
	return SAFE_VALUE.test(value) ? value : null;
}

/**
 * The fragment values for a page language and (optionally) the page's own
 * query string. Without a query string this is the no-JavaScript default.
 */
export function solicitudFragment(
	config: SolicitudLinkConfig,
	language: SolicitudLanguage,
	search = '',
): Array<[SolicitudFragmentKey, string]> {
	const incoming = new URLSearchParams(search);
	const values: Partial<Record<SolicitudFragmentKey, string>> = {
		recruitment_source: safeValue(incoming.get('utm_source')) ?? DEFAULT_RECRUITMENT_SOURCE,
		campaign: safeValue(incoming.get('utm_campaign')) ?? `site_${language}`,
		consent_v: config.consentV,
		survey_version: config.surveyVersion,
		language,
		candidate_zone: config.zoneSlug,
	};
	const medium = safeValue(incoming.get('utm_medium'));
	if (medium !== null) values.utm_medium = medium;
	const content = safeValue(incoming.get('utm_content'));
	if (content !== null) values.utm_content = content;

	const entries: Array<[SolicitudFragmentKey, string]> = [];
	for (const key of SOLICITUD_FRAGMENT_KEYS) {
		const value = values[key];
		if (typeof value === 'string' && value !== '') entries.push([key, value]);
	}
	return entries;
}

/** `{form_url}#recruitment_source=…&…&candidate_zone=…` (§3.4). */
export function buildSolicitudHref(
	config: SolicitudLinkConfig,
	language: SolicitudLanguage,
	search = '',
): string {
	const target = new URL(config.formUrl);
	target.hash = solicitudFragment(config, language, search)
		.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
		.join('&');
	return target.toString();
}
