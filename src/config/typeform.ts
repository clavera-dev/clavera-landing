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
 */
import type { Locale } from '../i18n/config';

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
 * `null` means "no URL has been supplied". It is never a stand-in for a URL:
 * a null destination renders localized plain text, never an anchor, a button,
 * a disabled control, `href="#"`, an empty href, or a placeholder domain.
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

/* -------------------------------------------------------------------------
   2. Pilot interest — pending
   ------------------------------------------------------------------------- */

/**
 * Locale → pilot-interest form.
 *
 * >>> THIS IS THE ONLY PLACE THE REAL PILOT URLS ARE ENTERED. <<<
 *
 * The Typeform is being created externally. Until each URL is supplied its
 * entry stays `null`, and every pilot call to action renders localized plain
 * text instead of a control. Activation is exactly this: replace a `null`
 * with `{ url: '…', language: '…' }`. No component, template, test or
 * document needs to change.
 *
 * Explicit and total, with no fallback: an unsupplied locale must never
 * inherit another locale's form.
 */
export const PILOT_INTEREST_DESTINATIONS: Record<Locale, PendingDestination> = {
	es: null,
	en: null,
	ru: null,
};

/* -------------------------------------------------------------------------
   Accessors
   ------------------------------------------------------------------------- */

export function getResearchDestination(locale: Locale): SurveyDestination {
	return RESEARCH_SURVEY_DESTINATIONS[locale];
}

export function getPilotDestination(locale: Locale): PendingDestination {
	return PILOT_INTEREST_DESTINATIONS[locale];
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
 * `barrio`, vehicle type or any other personal datum must never appear in a
 * URL (PROJECT_DECISIONS.md), and arbitrary parameters are never forwarded.
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
 * would require reading `location.search` in the browser, which means shipping
 * client-side JavaScript to a page that currently ships none. That trade is
 * not worth it, so it is not done: only values known when the page is
 * generated are appended. If visitor-side forwarding is ever approved, the
 * "zero client JavaScript" claim in the project documents must be corrected in
 * the same change.
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
