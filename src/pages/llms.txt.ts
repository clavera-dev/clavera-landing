import type { APIRoute } from 'astro';
import { LOCALES, LOCALE_DEFINITIONS, localeHome, localePath, type Locale } from '../i18n/config';
import { getCopy } from '../i18n';

/**
 * /llms.txt — a short, plain-text map of the site for language-model crawlers
 * (llmstxt.org format). DRAFT: owner wording pending.
 *
 * It states only what the page already says. The summary line of each locale is
 * that locale's approved meta description, so it inherits the same terminology
 * limits (no cameras, no `vigilancia`, no 24/7, no hub in operation). The
 * status line says the service is not operating yet. URLs follow `site` in
 * astro.config.mjs, so a domain change is that one config value.
 */
const STATUS: Record<Locale, string> = {
	es: 'Estado: proyecto en etapa de pilotos. Todavía no hay un servicio en funcionamiento; las imágenes del sitio son renders generados.',
	en: 'Status: pilot-stage project. No service is operating yet; the images on the site are generated renders.',
	ru: 'Статус: проект на этапе пилотов. Сервис ещё не работает; изображения на сайте — сгенерированные рендеры.',
};

const SECTION: Record<Locale, { home: string; legal: Record<'privacidad' | 'terminos' | 'cookies', string> }> = {
	es: { home: 'Sitio en español (versión canónica)', legal: { privacidad: 'Política de privacidad', terminos: 'Términos y condiciones', cookies: 'Política de cookies' } },
	en: { home: 'Site in English', legal: { privacidad: 'Privacy policy (courtesy translation)', terminos: 'Terms and conditions (courtesy translation)', cookies: 'Cookie policy (courtesy translation)' } },
	ru: { home: 'Сайт на русском', legal: { privacidad: 'Политика конфиденциальности (перевод для удобства)', terminos: 'Условия использования (перевод для удобства)', cookies: 'Политика cookie (перевод для удобства)' } },
};

export const GET: APIRoute = ({ site }) => {
	if (!site) throw new Error('astro.config.mjs must set `site` to build llms.txt');
	const abs = (path: string) => new URL(path, site).href;

	const sections = LOCALES.map((locale) => {
		const copy = getCopy(locale);
		const names = SECTION[locale];
		const links = [
			`- [${names.home}](${abs(localeHome(locale))}): ${copy.meta.title}`,
			...(['privacidad', 'terminos', 'cookies'] as const).map(
				(route) => `- [${names.legal[route]}](${abs(localePath(locale, route))})`,
			),
		];
		return `## ${LOCALE_DEFINITIONS[locale].lang}\n\n${copy.meta.description}\n\n${STATUS[locale]}\n\n${links.join('\n')}`;
	});

	const body = `# CLAVERA\n\n> ${getCopy('es').meta.description}\n\nSpanish (es-AR) is the canonical language and the only legal authority; English and Russian are translations with the same meaning.\n\n${sections.join('\n\n')}\n`;
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
