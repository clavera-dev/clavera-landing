/**
 * Centralized contact configuration.
 *
 * >>> THIS IS THE ONLY PLACE WHATSAPP AND PHONE CONTACT DETAILS ARE ENTERED. <<<
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

/**
 * Owner-supplied click-to-call number (PROJECT_DECISIONS.md, 2026-09-29), in
 * E.164 international format. This is a distinct destination from
 * `WHATSAPP_LINK`/`WHATSAPP_NUMBER` above: it renders as its own `tel:` link,
 * never as a `wa.me` URL, and never replaces the WhatsApp chat link. Set to
 * `null` to remove the click-to-call entry from the footer.
 */
export const PHONE_NUMBER: string | null = '+5491128329931';

/** Human-readable rendering of `PHONE_NUMBER`, shown as the link text. */
export const PHONE_DISPLAY: string | null = '+54 9 11 2832-9931';

/** E.164: a leading `+`, no spaces or punctuation, 8–15 digits total. */
const PHONE_NUMBER_PATTERN = /^\+[1-9]\d{7,14}$/;

/** True only for a well-formed E.164 number. */
export function isValidPhoneNumber(number: string): boolean {
	return PHONE_NUMBER_PATTERN.test(number);
}

/**
 * The `tel:` href to render, or `null` while no phone number is configured.
 * Never returns a placeholder or a malformed URL — callers must branch on
 * `null` and render nothing (or plain text), same as `whatsappHref()`.
 */
export function telHref(): string | null {
	if (PHONE_NUMBER === null) return null;
	return isValidPhoneNumber(PHONE_NUMBER) ? `tel:${PHONE_NUMBER}` : null;
}
