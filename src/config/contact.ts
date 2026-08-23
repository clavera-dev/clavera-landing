/**
 * Centralized contact configuration.
 *
 * >>> THIS IS THE ONLY PLACE THE REAL WHATSAPP NUMBER IS ENTERED. <<<
 *
 * The WhatsApp Business number has not been supplied. Until it is, the value
 * stays `null` and the footer renders localized plain text instead of a
 * control: no anchor, no `wa.me` URL, no `href="#"`, no dummy number, no
 * disabled button.
 *
 * Activation is exactly this: replace `null` with the number in international
 * form without punctuation, e.g. `'5491123456789'`. Nothing else changes.
 */
export const WHATSAPP_NUMBER: string | null = null;

/**
 * The `wa.me` link for the configured number, or `null` while none exists.
 *
 * Never returns a placeholder. Callers must branch on `null` and render text.
 */
export function whatsappHref(): string | null {
	if (WHATSAPP_NUMBER === null) return null;
	return `https://wa.me/${WHATSAPP_NUMBER}`;
}
