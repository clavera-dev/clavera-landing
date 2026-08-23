/**
 * Single configuration point for the Typeform survey integration.
 *
 * Per PROJECT_DECISIONS.md: "The Typeform integration must be isolated in
 * one component and one configuration location so it can later be replaced
 * with a native form and Cloudflare endpoint without changing the rest of
 * the landing page."
 *
 * M3.5 (expedited public beta) exposes exactly ONE Typeform destination: the
 * long research survey. The short Socios Fundadores lead/price form, the
 * founding-price reveal and the `/gracias` redirect are deliberately absent —
 * they are deferred to M9 and must not be reintroduced here without a
 * recorded decision.
 *
 * These are public responder URLs, not secrets.
 */
import type { Locale } from '../i18n/config';

/** Rioplatense Spanish survey. Canonical. */
const SURVEY_ES = 'https://claveraar.typeform.com/ARGCABA';

/** Russian survey. */
const SURVEY_RU = 'https://claveraar.typeform.com/latam';

export interface SurveyDestination {
	/** Public Typeform responder URL. */
	url: string;
	/**
	 * The locale the Typeform itself is written in.
	 *
	 * This is NOT always the locale of the page linking to it. When the two
	 * differ the UI must disclose the survey's real language — see
	 * `surveyLanguageDiffers`.
	 */
	language: Locale;
}

/**
 * Locale → survey destination. Explicit and total: every locale names its own
 * URL, so no locale can silently inherit another one's survey.
 *
 * BETA COMPROMISE (approved 2026-08-23): `en` points at the SPANISH survey
 * because no dedicated English Typeform exists yet. This is disclosed in the
 * English UI and is recorded as release debt — a dedicated EN public Typeform
 * URL is required before the official full-quality release. Do not relabel the
 * English destination as an English survey.
 */
export const SURVEY_DESTINATIONS: Record<Locale, SurveyDestination> = {
	es: { url: SURVEY_ES, language: 'es' },
	ru: { url: SURVEY_RU, language: 'ru' },
	en: { url: SURVEY_ES, language: 'es' },
};

export function getSurveyDestination(locale: Locale): SurveyDestination {
	return SURVEY_DESTINATIONS[locale];
}

/**
 * True when the survey is not written in the language of the page linking to
 * it, which obliges that page to say so next to the link.
 */
export function surveyLanguageDiffers(locale: Locale): boolean {
	return SURVEY_DESTINATIONS[locale].language !== locale;
}
