/**
 * Single configuration point for the Typeform lead-capture integration.
 *
 * Per PROJECT_DECISIONS.md: "The Typeform integration must be isolated in
 * one component and one configuration location so it can later be replaced
 * with a native form and Cloudflare endpoint without changing the rest of
 * the landing page."
 *
 * Not implemented yet — forms are not embedded in this pass. Fill these in
 * and wire src/components/lead-form/TypeformBoundary.astro to the real
 * embed when the Typeform account and redirect are ready.
 */

export const typeformConfig = {
	/** Socios Fundadores lead form (S11). Typeform Plus account, TBD. */
	foundersFormUrl: '',
	/** Long-form Bike Hub research survey, offered from /gracias. */
	surveyFormUrl: '',
	/** Typeform redirects here after a successful founders-form submission. */
	redirectPath: '/gracias',
};
