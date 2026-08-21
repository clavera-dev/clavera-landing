/**
 * Locale registry.
 *
 * One place defines, for every supported locale: its URL segment, the `lang`
 * attribute the document must carry, the hreflang code used in alternate
 * links, and the label shown in the language switcher.
 *
 * `es` is the canonical locale and is served unprefixed at `/`. Its document
 * language is `es-AR` (Rioplatense), which is why the URL key and the `lang`
 * attribute are kept as separate fields rather than reusing one string.
 */

export const LOCALES = ['es', 'en', 'ru'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';

export interface LocaleDefinition {
	/** URL segment. The default locale uses '' (no prefix). */
	segment: string;
	/** Value of the document's `lang` attribute. */
	lang: string;
	/** Value used in `hreflang` alternate links. */
	hreflang: string;
	/** Short label for the language switcher. */
	label: string;
	/** Accessible name for the switcher link, written in that language. */
	switchLabel: string;
}

export const LOCALE_DEFINITIONS: Record<Locale, LocaleDefinition> = {
	es: {
		segment: '',
		lang: 'es-AR',
		hreflang: 'es-AR',
		label: 'ES',
		switchLabel: 'Ver el sitio en español',
	},
	en: {
		segment: 'en',
		lang: 'en',
		hreflang: 'en',
		label: 'EN',
		switchLabel: 'View the site in English',
	},
	ru: {
		segment: 'ru',
		lang: 'ru',
		hreflang: 'ru',
		label: 'RU',
		switchLabel: 'Открыть сайт на русском',
	},
};

/** Switcher order is fixed by the brief (Part V): ES · EN · RU. */
export const SWITCHER_ORDER: readonly Locale[] = ['es', 'en', 'ru'];

export function isLocale(value: unknown): value is Locale {
	return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/**
 * Narrows `Astro.currentLocale`, which is typed as `string | undefined` and
 * falls back to the default locale on the unprefixed root route.
 */
export function resolveLocale(current: string | undefined): Locale {
	return isLocale(current) ? current : DEFAULT_LOCALE;
}

/** Root-relative path for a locale, always with a trailing slash. */
export function localeHome(locale: Locale): string {
	const { segment } = LOCALE_DEFINITIONS[locale];
	return segment === '' ? '/' : `/${segment}/`;
}

/**
 * The same destination in another locale. Anchors are preserved so a language
 * switch keeps the reader in the section they were reading.
 */
export function localeHref(locale: Locale, hash = ''): string {
	return `${localeHome(locale)}${hash}`;
}
