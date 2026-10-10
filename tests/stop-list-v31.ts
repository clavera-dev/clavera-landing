/**
 * Legal Spec v3.1 §9 — machine STOP-list, run over the BUILT site.
 *
 * The spec requires a machine search over the assembled site in all three
 * languages including alt text, meta descriptions, titles, button text and
 * captions. This module turns a built HTML file into one corpus containing
 * visible text AND the text-bearing attributes (alt, title, aria-label,
 * placeholder, content of <meta>, JSON-LD), then applies the §9 lists.
 *
 * `marca en trámite` is deliberately NOT a stop term (§9.2): only its
 * combination with ®, ™, "registrada" etc. is.
 */
import { stripAllowlisted } from './terminology';

export interface StopRule {
	label: string;
	pattern: RegExp;
}

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** Letter-bounded phrase; works for Latin and Cyrillic (unlike \b). */
const word = (s: string): StopRule => ({
	label: s,
	pattern: new RegExp(`(?<![\\p{L}\\p{N}])${esc(s).replace(/ /g, '\\s+')}(?![\\p{L}\\p{N}])`, 'iu'),
});
/** Stem: substring, for inflected Cyrillic. */
const stem = (s: string): StopRule => ({ label: `${s}…`, pattern: new RegExp(esc(s), 'iu') });
const raw = (label: string, re: RegExp): StopRule => ({ label, pattern: re });

/** §9.1 — qualification-risk vocabulary. */
export const STOP_VOCAB: StopRule[] = [
	word('estacionamiento'), word('estacionamientos'), word('parking'), word('bike parking'),
	word('garaje'), word('garajes'), word('garage'), word('garages'), word('playa'),
	word('cochera'), word('cocheras'), word('cochera para bicis'),
	word('tarifa por hora'), word('precio por hora'), word('por hora'),
	stem('парковк'), stem('велопарковк'), stem('паркинг'), stem('стоянк'), stem('гараж'),
	stem('почасов'), stem('кочер'),
];

/** §9.2 — statements that cannot be supported today. */
export const STOP_CLAIMS: StopRule[] = [
	// safety / insurance
	word('asegurado'), word('asegurada'), word('aseguradas'), word('cobertura'), word('tu bici está asegurada'),
	word('garantizamos'), word('100% seguro'), word('sin riesgo de robo'),
	word('responsabilidad total'), word('respondemos por tu bici'),
	word('vigilancia 24 horas'), word('monitoreo permanente'), word('guardia'),
	word('we guarantee'), word('fully insured'), word('insured'), word('no risk of theft'),
	word('total liability'), word('24-hour surveillance'), word('security guard'),
	stem('гарантируем'), stem('застрахован'), stem('страхов'), raw('охрана', /(?<!\p{L})охран(?:а|ник|ы|н)/iu),
	// location / dates
	word('primer hub'), word('nuestra ubicación'), word('estaremos en'), word('próximas ubicaciones'),
	word('próximamente'), word('llegamos a'), word('abrimos en'), word('abriremos'),
	raw('apertura + fecha', /apertura\s+(?:prevista\s+|el\s+|en\s+|de\s+)?(?:\d|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/iu),
	word('first hub'), word('our location'), word('we will be in'), word('next locations'),
	word('coming soon'), word('we open in'), raw('opening + date', /\bopening\s+(?:in|on)\s+(?:\d|january|february|march|april|may|june|july|august|september|october|november|december)/iu),
	word('we are opening'),
	stem('первый хаб'), stem('наш район'), stem('мы открываемся'), stem('откроемся'), stem('скоро в'),
	// prices (any currency amount; the page must not state one)
	raw('currency amount', /(?:\$\s?\d|\bUSD\s?\d|\bARS\s?\d|\d[\d.,]*\s?(?:ARS|USD|pesos|dólares|dollars|долл|песо|руб)\b)/iu),
	word('más barato que una cochera'),
	// trademark
	raw('® / ™', /[®™]/u),
	word('marca registrada'), word('registered trademark'), stem('зарегистрированная торговая марка'),
	stem('зарегистрированный товарный знак'),
	raw('marca en trámite next to registrada/®/™', /marca en trámite[^.]{0,40}(?:registrada|®|™)/iu),
	// legal entity
	word('CLAVERA S.A.S.'), word('CLAVERA SRL'), word('nuestra empresa'), word('nuestro equipo'),
	word('nuestras oficinas'), word('fundada en'),
	word('our company'), word('our team'), word('our offices'), word('founded in'),
	stem('наша компания'), stem('наша команда'), stem('наши офисы'), stem('основана в'),
	// superlatives
	word('el primero'), word('el único'), word('el mejor'), word('líder'), word('la red más grande'),
	raw('the first hub/location', /\bthe first (?:hub|location|branch|site|neighbou?rhood|zone)\b/iu),
	raw('the only + product claim', /\bthe only (?:secure|safe|service|company|option|storage|solution|bike)/iu), word('the best'), word('market leader'), word('the largest network'),
	raw('единственный + claim', /единственн(?:ый|ая|ое)\s+(?:сервис|компани|вариант|безопасн)/iu), stem('лучш'), stem('лидер'), stem('самая большая сеть'),
	// social proof that does not exist
	word('ya somos'), word('lista de espera'), word('waiting list'), stem('лист ожидания'), stem('список ожидания'),
	word('testimonios'), word('reseñas'), word('testimonials'), raw('отзывы (reviews)', /(?<!\p{L})отзыв(?:ы|ов|ам)(?!\p{L})/iu),
];

/** Conditionally permitted (§9.3): not published on the beta. */
export const STOP_CONDITIONAL: StopRule[] = [
	word('cámaras de seguridad'), word('cámaras'), word('cámara'), word('vigilancia'),
	word('security cameras'), word('surveillance'), word('camera'), stem('видеонаблюд'), stem('камер'),
];

/**
 * Insurance wording: Spec §9.2 bans insurance claims; CLAUDE.md allows the
 * terminology only in the exact brief-approved FAQ item, which is stripped from
 * the corpus below. The plain adjective `seguro` ("lugar seguro") is not an
 * insurance claim; its claim forms ("100% seguro", "asegurada") are rules above.
 */
export const STOP_SEGURO: StopRule[] = [word('seguros'), word('insurance'), word('страховка')];

export const INSURANCE_FAQ_APPROVED = [
	'¿Necesito tener mi bici asegurada?', 'No. Recibimos bicicletas aseguradas y no aseguradas.',
	'Do I need my bike to be insured?', 'No. We take insured and uninsured bikes.',
	'Нужно ли страховать велосипед?', 'Нет. Мы принимаем застрахованные и незастрахованные велосипеды.',
];

export function builtHtmlToCorpus(html: string): string {
	let h = html.replace(/<style[\s\S]*?<\/style>/gi, ' ');
	// keep JSON-LD, drop every other script
	h = h.replace(/<script(?![^>]*application\/ld\+json)[\s\S]*?<\/script>/gi, ' ');
	const attrs: string[] = [];
	for (const m of h.matchAll(/\s(?:alt|title|aria-label|placeholder|content|aria-description)="([^"]*)"/gi)) {
		attrs.push(m[1]);
	}
	const title = h.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '';
	const text = h.replace(/<[^>]+>/g, ' ');
	return `${title}\n${attrs.join('\n')}\n${text}`
		.replace(/&nbsp;|&#160;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"')
		.replace(/&#39;|&#x27;/g, "'")
		.replace(/\s+/g, ' ');
}

export function runRules(corpus: string, rules: StopRule[]): string[] {
	let text = stripAllowlisted(corpus);
	for (const phrase of INSURANCE_FAQ_APPROVED) text = text.split(phrase).join(' ');
	return rules.filter((r) => r.pattern.test(text)).map((r) => r.label);
}
