import type { APIRoute } from 'astro';
import { LOCALES, LOCALE_DEFINITIONS, localeHome, localePath, type Locale } from '../i18n/config';

/**
 * sitemap.xml for every built route, with hreflang alternates. URLs are built
 * from `site` in astro.config.mjs, the same origin the canonicals use, so a
 * domain change is that one config value. Each loc is exactly the page's
 * canonical (home with trailing slash, legal pages without) and the alternates
 * match the <link rel="alternate"> set in BaseLayout.astro.
 */
const LEGAL_ROUTES = ['privacidad', 'terminos', 'cookies'] as const;

type Entry = Record<Locale, string>;

const entries: Entry[] = [
	Object.fromEntries(LOCALES.map((l) => [l, localeHome(l)])) as Entry,
	...LEGAL_ROUTES.map((route) => Object.fromEntries(LOCALES.map((l) => [l, localePath(l, route)])) as Entry),
];

export const GET: APIRoute = ({ site }) => {
	if (!site) throw new Error('astro.config.mjs must set `site` to build sitemap.xml');
	const abs = (path: string) => new URL(path, site).href;

	const urls = entries.flatMap((entry) =>
		LOCALES.map((locale) => {
			const alternates = [
				...LOCALES.map(
					(code) =>
						`    <xhtml:link rel="alternate" hreflang="${LOCALE_DEFINITIONS[code].hreflang}" href="${abs(entry[code])}"/>`,
				),
				`    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(entry.es)}"/>`,
			].join('\n');
			return `  <url>\n    <loc>${abs(entry[locale])}</loc>\n${alternates}\n  </url>`;
		}),
	);

	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
