/**
 * Single configuration point for the Typeform integration.
 *
 * Per PROJECT_DECISIONS.md: "The Typeform integration must be isolated in
 * one component and one configuration location so it can later be replaced
 * with a native form and Cloudflare endpoint without changing the rest of
 * the landing page."
 *
 * The beta has TWO separate Typeform flows:
 *
 *   1. PILOT INTEREST  — a short, non-binding expression of interest. It is
 *      the primary beta conversion. It is NOT the old founding-price flow: it
 *      reveals no price, accepts no payment, deposit or `seña`, reserves no
 *      space, creates no membership or contract, promises no admission to the
 *      pilot, and does not redirect to `/gracias`. Submission ends on
 *      Typeform's own native ending.
 *
 *   2. RESEARCH SURVEY — the existing long research survey, a secondary
 *      action in S13.
 *
 * These are public responder URLs, not secrets.
 *
 * 2026-10-04 (owner response v1.4 §1.1): the "Avisame" pilot form is retired.
 * Its role passes to the application form in src/config/solicitud.ts; this
 * file now routes the research survey only.
 *
 * 2026-09-28 (owner handoff v1.1): the pilot form is the short "Avisame" form.
 * While its URL is absent it is not shown at all, and the research survey is
 * the primary action (handoff B4). Research links carry the handoff §4.1
 * fragment attribution, including the selected `candidate_zone`.
 */
import type { Locale } from '../i18n/config';
import { isCandidateZoneSlug } from './zones';

export interface SurveyDestination {
	/** Public Typeform responder URL. */
	url: string;
	/**
	 * The locale the Typeform itself is written in.
	 *
	 * This is NOT always the locale of the page linking to it. When the two
	 * differ the UI must disclose the destination's real language — see
	 * `destinationLanguageDiffers`.
	 */
	language: Locale;
}

/**
 * A destination that may not exist yet.
 *
 * `null` means "no URL has been supplied". It is never a stand-in for a URL.
 * A null pilot destination renders nothing at all (handoff v1.1 B4) — never
 * an anchor, a button, a disabled control, `href="#"`, an empty href, or a
 * placeholder domain.
 */
export type PendingDestination = SurveyDestination | null;

/* -------------------------------------------------------------------------
   1. Research survey — live
   ------------------------------------------------------------------------- */

/** Rioplatense Spanish survey. Canonical. */
const RESEARCH_ES = 'https://claveraar.typeform.com/ARGCABA';

/** Russian survey. */
const RESEARCH_RU = 'https://claveraar.typeform.com/latam';

/**
 * Locale → research survey. Explicit and total: every locale names its own
 * URL, so no locale can silently inherit another one's destination.
 *
 * BETA COMPROMISE (approved 2026-08-23): `en` points at the SPANISH survey
 * because no dedicated English research Typeform exists. This is disclosed in
 * the English UI. A dedicated EN research URL is official full-release debt
 * only — it does not block public-beta deployment. Do not relabel the English
 * destination as an English survey.
 */
export const RESEARCH_SURVEY_DESTINATIONS: Record<Locale, SurveyDestination> = {
	es: { url: RESEARCH_ES, language: 'es' },
	ru: { url: RESEARCH_RU, language: 'ru' },
	en: { url: RESEARCH_ES, language: 'es' },
};

/**
 * Handoff v1.1 §4.1 — the ONLY parameters that may ever appear in a
 * research-survey URL fragment. Typeform reads hidden fields from the
 * fragment. Every entry is non-personal: campaign metadata plus the zone slug
 * the visitor picked from the fixed list in candidate-zones.ts.
 */
export const RESEARCH_FRAGMENT_ALLOWLIST = [
	'recruitment_source',
	'campaign',
	'consent_v',
	'survey_version',
	'language',
	'candidate_zone',
] as const;

export type ResearchFragmentParam = (typeof RESEARCH_FRAGMENT_ALLOWLIST)[number];

/**
 * Locale → fixed fragment attribution (handoff v1.1 §4.1). `language` is the
 * language of the survey itself, not of the page, which is why English also
 * says `es`. Russian keeps its `latam` form and carries only the fields the
 * handoff lists for it.
 */
const RESEARCH_FRAGMENT: Record<Locale, Partial<Record<ResearchFragmentParam, string>>> = {
	es: {
		recruitment_source: 'clavera_ar',
		campaign: 'site_es',
		consent_v: '2026-09',
		survey_version: 'ARGCABA_ES_v2_0',
		language: 'es',
	},
	en: {
		recruitment_source: 'clavera_ar',
		campaign: 'site_en',
		consent_v: '2026-09',
		survey_version: 'ARGCABA_ES_v2_0',
		language: 'es',
	},
	ru: {
		recruitment_source: 'clavera_ar',
		campaign: 'site_ru',
	},
};

/**
 * The research-survey href for a locale, optionally carrying a chosen zone.
 *
 * `candidate_zone` is added only for a slug from candidate-zones.ts and is
 * omitted when no zone is chosen (§4.1). Any other value throws at build time.
 */
export function buildResearchHref(locale: Locale, zoneSlug?: string): string {
	const target = new URL(getResearchDestination(locale).url);
	const params = new URLSearchParams();

	const values: Partial<Record<ResearchFragmentParam, string>> = { ...RESEARCH_FRAGMENT[locale] };
	if (zoneSlug !== undefined) {
		if (!isCandidateZoneSlug(zoneSlug)) {
			throw new Error(`buildResearchHref: "${zoneSlug}" is not a candidate-zone slug`);
		}
		values.candidate_zone = zoneSlug;
	}

	for (const key of RESEARCH_FRAGMENT_ALLOWLIST) {
		const value = values[key];
		if (typeof value === 'string' && value !== '') params.set(key, value);
	}

	target.hash = params.toString();
	return target.toString();
}

/* -------------------------------------------------------------------------
   2. Pilot interest ("Avisame") — retired
   -------------------------------------------------------------------------
   Owner response v1.4 §1.1 (2026-10-04): there is no separate Avisame form.
   Its place is taken by the application form, configured and switched on in
   src/config/solicitud.ts only.
   ------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
   Accessors
   ------------------------------------------------------------------------- */

export function getResearchDestination(locale: Locale): SurveyDestination {
	return RESEARCH_SURVEY_DESTINATIONS[locale];
}

/**
 * True when a destination is not written in the language of the page linking
 * to it, which obliges that page to say so next to the link.
 */
export function destinationLanguageDiffers(
	locale: Locale,
	destination: PendingDestination,
): boolean {
	return destination !== null && destination.language !== locale;
}

/* -------------------------------------------------------------------------
   Attribution
   ------------------------------------------------------------------------- */

/**
 * The ONLY query parameters that may ever be appended to a destination URL.
 *
 * Every entry is non-personal campaign/source metadata. A name, email, phone,
 * vehicle type or any other personal datum must never appear in a URL
 * (PROJECT_DECISIONS.md), and arbitrary parameters are never forwarded. A
 * free-form `barrio` is never accepted here either; the only zone value that
 * may reach a URL is a fixed candidate-zone slug in the research fragment
 * (RESEARCH_FRAGMENT_ALLOWLIST, handoff v1.1 §4.1).
 */
export const ATTRIBUTION_PARAM_ALLOWLIST = [
	'utm_source',
	'utm_medium',
	'utm_campaign',
	'utm_content',
	'utm_term',
	'lang',
	'source',
	'landing_version',
] as const;

export type AttributionParam = (typeof ATTRIBUTION_PARAM_ALLOWLIST)[number];

/**
 * Builds a destination href with allowlisted attribution parameters only.
 *
 * Deliberately build-time. Forwarding the *visitor's* incoming `utm_*` values
 * would require reading `location.search` in the browser, so it is not done:
 * only values known when the page is generated are appended. (The page's only
 * client script is the zone selector's, which swaps between prebuilt
 * research hrefs and forwards nothing.)
 *
 * Uses the native URL API — no dependency, no cookies, no localStorage.
 */
export function buildDestinationHref(
	url: string,
	params: Partial<Record<AttributionParam, string>> = {},
): string {
	const target = new URL(url);

	for (const key of ATTRIBUTION_PARAM_ALLOWLIST) {
		const value = params[key];
		// Skip absent and empty values rather than emitting `?utm_source=`.
		if (typeof value !== 'string' || value.trim() === '') continue;
		target.searchParams.set(key, value.trim());
	}

	return target.toString();
}
