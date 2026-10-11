import type { LegalDocumentByLocale } from './types';

/**
 * Política de Cookies / Cookie Policy / Политика в отношении cookie-файлов.
 *
 * ES is the authoritative text: CLAVERA_Legal_Spec_v3_0_received.md §7.2,
 * unpatched by the handoff. No consent banner is required (§7.1): the site
 * uses only strictly necessary cookies/local storage, and GA4/Meta Pixel are
 * not connected.
 *
 * This document has no numbered points in the source text, so sections carry
 * only a heading used for internal structure, not a printed number.
 */
export const cookies: LegalDocumentByLocale = {
	es: {
		title: 'Política de Cookies — clavera.ar',
		description: 'Qué cookies y tecnologías similares usa el sitio de CLAVERA y cómo controlarlas.',
		sections: [
			{
				id: 'intro',
				heading: '',
				paragraphs: [
					'Este sitio utiliza únicamente cookies y almacenamiento local técnicamente necesarios para su funcionamiento y seguridad. No utilizamos cookies analíticas, publicitarias ni de seguimiento entre sitios.',
				],
			},
			{
				id: 'list',
				heading: 'Cookies y almacenamiento en uso',
				list: [
					'Cloudflare (__cf_bm, cf_clearance) — protección contra tráfico automatizado y entrega segura del sitio. Duración: hasta 30 minutos y hasta 1 año respectivamente.',
					'Almacenamiento local del navegador — recuerda el idioma elegido. No se transmite a ningún servidor.',
				],
			},
			{
				id: 'utm',
				heading: '',
				paragraphs: [
					'Parámetros de origen (UTM): cuando llegás desde un anuncio o un enlace externo, el sitio puede registrar el origen de la visita para medir qué canales funcionan. Estos parámetros no identifican a la persona por sí solos.',
				],
			},
			{
				id: 'analytics',
				heading: '',
				paragraphs: [
					'Al momento de esta publicación no utilizamos Google Analytics ni Meta Pixel. Si en el futuro los incorporamos, lo haremos previa solicitud de tu consentimiento y actualizaremos esta política.',
					'El formulario de interés se aloja en Typeform, que aplica sus propias cookies y su propia política de privacidad, disponible en su sitio.',
					'Podés bloquear o eliminar cookies desde la configuración de tu navegador. El bloqueo de las cookies de seguridad puede impedir el acceso al sitio.',
				],
			},
			{
				id: 'contact',
				heading: '',
				paragraphs: ['Consultas: hola@clavera.ar'],
			},
		],
	},
	en: {
		title: 'Cookie Policy — clavera.ar',
		description: 'Which cookies and similar technologies the CLAVERA website uses and how to control them. Courtesy translation; Spanish prevails.',
		sections: [
			{
				id: 'intro',
				heading: '',
				paragraphs: [
					'This site uses only cookies and local storage that are technically necessary for it to work and stay secure. We do not use analytics, advertising or cross-site tracking cookies.',
				],
			},
			{
				id: 'list',
				heading: 'Cookies and storage in use',
				list: [
					'Cloudflare (__cf_bm, cf_clearance) — protection against automated traffic and secure delivery of the site. Duration: up to 30 minutes and up to 1 year respectively.',
					'Browser local storage — remembers the chosen language. It is not sent to any server.',
				],
			},
			{
				id: 'utm',
				heading: '',
				paragraphs: [
					'Source parameters (UTM): when you arrive from an ad or an external link, the site may record where the visit came from, to measure which channels work. These parameters do not identify you by themselves.',
				],
			},
			{
				id: 'analytics',
				heading: '',
				paragraphs: [
					'As of this publication we do not use Google Analytics or Meta Pixel. If we add them in the future, we will do so only after asking for your consent, and we will update this policy.',
					'The interest form is hosted on Typeform, which applies its own cookies and its own privacy policy, available on its site.',
					'You can block or delete cookies from your browser settings. Blocking the security cookies may prevent access to the site.',
				],
			},
			{
				id: 'contact',
				heading: '',
				paragraphs: ['Questions: hola@clavera.ar'],
			},
		],
	},
	ru: {
		title: 'Политика в отношении cookie-файлов — clavera.ar',
		description: 'Какие файлы cookie и похожие технологии использует сайт CLAVERA и как ими управлять. Перевод для удобства; приоритет у испанской версии.',
		sections: [
			{
				id: 'intro',
				heading: '',
				paragraphs: [
					'Этот сайт использует только cookie-файлы и локальное хранилище, технически необходимые для его работы и безопасности. Мы не используем аналитические, рекламные cookie-файлы и cookie-файлы для межсайтового отслеживания.',
				],
			},
			{
				id: 'list',
				heading: 'Используемые cookie-файлы и хранилище',
				list: [
					'Cloudflare (__cf_bm, cf_clearance) — защита от автоматизированного трафика и безопасная доставка сайта. Срок действия: до 30 минут и до 1 года соответственно.',
					'Локальное хранилище браузера — запоминает выбранный язык. Не передаётся ни на один сервер.',
				],
			},
			{
				id: 'utm',
				heading: '',
				paragraphs: [
					'Параметры источника (UTM): когда вы переходите с рекламы или внешней ссылки, сайт может фиксировать источник визита, чтобы оценить эффективность каналов. Эти параметры сами по себе не идентифицируют человека.',
				],
			},
			{
				id: 'analytics',
				heading: '',
				paragraphs: [
					'На момент публикации мы не используем Google Analytics или Meta Pixel. Если в будущем мы их подключим, это произойдёт только после запроса вашего согласия, и мы обновим эту политику.',
					'Форма для выражения интереса размещена на Typeform, который применяет собственные cookie-файлы и собственную политику конфиденциальности, доступную на его сайте.',
					'Вы можете заблокировать или удалить cookie-файлы в настройках браузера. Блокировка cookie-файлов безопасности может помешать доступу к сайту.',
				],
			},
			{
				id: 'contact',
				heading: '',
				paragraphs: ['Вопросы: hola@clavera.ar'],
			},
		],
	},
};
