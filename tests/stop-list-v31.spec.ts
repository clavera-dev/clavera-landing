import { test, expect, type APIRequestContext } from '@playwright/test';
import { builtHtmlToCorpus, runRules, STOP_VOCAB, STOP_CLAIMS, STOP_CONDITIONAL, STOP_SEGURO } from './stop-list-v31';

/**
 * Legal Spec v3.1 §9: the STOP-list runs over the served production build
 * (same build every other spec uses), reading the raw HTML so alt, title,
 * meta and JSON-LD are in scope, not only visible text.
 */
const FILES = [
	'/', '/privacidad', '/terminos', '/cookies',
	'/en/', '/en/privacidad', '/en/terminos', '/en/cookies',
	'/ru/', '/ru/privacidad', '/ru/terminos', '/ru/cookies',
];

async function html(request: APIRequestContext, path: string): Promise<string> {
	const res = await request.get(path);
	expect(res.status(), path).toBe(200);
	return res.text();
}

test.describe('Legal Spec v3.1 §9 STOP-list over the built site', () => {
	for (const [name, rules] of [
		['vocabulary §9.1', STOP_VOCAB],
		['claims §9.2', STOP_CLAIMS],
		['conditional §9.3', STOP_CONDITIONAL],
		['insurance', STOP_SEGURO],
	] as const) {
		for (const file of FILES) {
			test(`${name}: ${file}`, async ({ request }) => {
				const corpus = builtHtmlToCorpus(await html(request, file));
				expect(runRules(corpus, rules), `${file} contains stop terms`).toEqual([]);
			});
		}
	}

	test('§1 footer identity formula and §8 language clause on every page', async ({ request }) => {
		for (const file of FILES) {
			const c = builtHtmlToCorpus(await html(request, file));
			expect(c, file).toContain('CLAVERA es la denominación bajo la cual');
			expect(c, file).toContain('Contacto: hola@clavera.ar');
			expect(c, file).toContain('La versión en español (es-AR) es la única con validez legal. Las traducciones son de cortesía.');
		}
	});

	test('§6.5 every landing figure carries a visible project-image caption', async ({ request }) => {
		const expected: Record<string, string> = {
			'/': 'No corresponden a una sede en operación',
			'/en/': 'not',
			'/ru/': 'не',
		};
		for (const [file, marker] of Object.entries(expected)) {
			const page = await html(request, file);
			const figures = page.match(/<figure[\s\S]*?<\/figure>/g) ?? [];
			expect(figures.length, file).toBeGreaterThan(0);
			for (const fig of figures) {
				const caption = (fig.match(/<figcaption[\s\S]*?<\/figcaption>/)?.[0] ?? '').replace(/<[^>]+>/g, ' ');
				expect(caption.toLowerCase(), `${file}: figure without disclosure caption`).toContain(marker.toLowerCase());
			}
		}
	});

	test('the checker itself catches seeded violations', () => {
		const bad = builtHtmlToCorpus(
			'<title>x</title><img alt="Bike parking ®"><p>Primer hub: Chacarita. Desde $5000. Cochera.</p>',
		);
		const hits = runRules(bad, [...STOP_VOCAB, ...STOP_CLAIMS]);
		for (const h of ['bike parking', 'primer hub', 'currency amount', '® / ™', 'cochera']) expect(hits).toContain(h);
	});
});
