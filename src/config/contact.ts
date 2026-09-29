/**
 * Centralized contact configuration.
 *
 * >>> THIS IS THE ONLY PLACE WHATSAPP CONTACT DETAILS ARE ENTERED. <<<
 *
 * The owner supplied a WhatsApp Business *short link* (`wa.me/message/…`),
 * not a phone number (PROJECT_DECISIONS.md, 2026-09-29). A `wa.me/message`
 * link and a phone number are different things — never derive one from the
 * other, and never fabricate a number to fill `WHATSAPP_NUMBER` because a
 * link exists.
 *
 * `WHATSAPP_LINK` is checked first by `whatsappHref()`. `WHATSAPP_NUMBER`
 * remains as a fallback for the (currently hypothetical) case where the
 * owner later supplies a direct number instead of, or in addition to, a
 * short link. Until either exists, its slot stays `null` and the footer
 * renders localized plain text instead of a control: no anchor, no `wa.me`
 * URL, no `href="#"`, no dummy number, no disabled button.
 */
export const WHATSAPP_NUMBER: string | null = null;

/**
 * Owner-supplied `wa.me/message/<code>` short link, or `null` while none
 * exists. Activation/replacement is exactly this: change this string (or set
 * it back to `null`). Nothing else changes.
 */
export const WHATSAPP_LINK: string | null = 'https://wa.me/message/VWLBN6XDY6ZHP1';

/** Exact shape of a `wa.me/message/<code>` short link — nothing else qualifies. */
const WHATSAPP_LINK_PATTERN = /^https:\/\/wa\.me\/message\/[A-Za-z0-9]+$/;

/**
 * True only for a well-formed `wa.me/message/<code>` short link. Guards
 * against a malformed or mistyped `WHATSAPP_LINK` silently reaching the DOM.
 */
export function isValidWhatsappLink(link: string): boolean {
	return WHATSAPP_LINK_PATTERN.test(link);
}

/**
 * The WhatsApp href to render, or `null` while none exists.
 *
 * Prefers the owner-supplied `WHATSAPP_LINK` short link when it is present
 * and well-formed. Falls back to a `wa.me/<number>` link built from
 * `WHATSAPP_NUMBER` if a phone number is supplied instead. Never returns a
 * placeholder or a malformed URL — callers must branch on `null` and render
 * text.
 */
export function whatsappHref(): string | null {
	if (WHATSAPP_LINK !== null) {
		return isValidWhatsappLink(WHATSAPP_LINK) ? WHATSAPP_LINK : null;
	}
	if (WHATSAPP_NUMBER !== null) return `https://wa.me/${WHATSAPP_NUMBER}`;
	return null;
}
