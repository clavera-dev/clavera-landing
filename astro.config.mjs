// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://clavera.ar',
	output: 'static',

	/**
	 * Three static locales (PROJECT_DECISIONS.md § "Multilingual scope (2026-08-21)",
	 * brief Part V). Spanish is canonical and unprefixed at `/`; English and
	 * Russian sit under `/en/` and `/ru/`.
	 *
	 * `redirectToDefaultLocale: false` and the absence of any locale-detection
	 * middleware are deliberate: the brief forbids automatic browser-language
	 * redirects, so a visitor only changes locale by following a real link.
	 *
	 * The locale keys below are URL segments. The `lang` attribute and the
	 * hreflang code are separate values and live in src/i18n/config.ts, because
	 * the Spanish route must serve `lang="es-AR"` from an unprefixed URL.
	 */
	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'en', 'ru'],
		routing: {
			prefixDefaultLocale: false,
			redirectToDefaultLocale: false,
		},
	},
});
