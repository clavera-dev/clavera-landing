import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';

/**
 * Brief §6.5 / §8.2 / §8.4 — local technical SEO (plan C9, provisional).
 * No sitemap.xml and no Sitemap line until the production domain is confirmed.
 */

for (const locale of LOCALES) {
	test(`[${locale.key}] JSON-LD describes the entity from on-page text only`, async ({ page }) => {
		await page.goto(locale.path);
		const blocks = await page
			.locator('script[type="application/ld+json"]')
			.evaluateAll((els) => els.map((el) => JSON.parse(el.textContent ?? '{}')));
		expect(blocks).toHaveLength(1);
		const graph = blocks[0]['@graph'] as Array<Record<string, unknown>>;
		expect(graph.map((node) => node['@type'])).toEqual(['Organization', 'WebSite', 'Service', 'FAQPage']);

		const text = JSON.stringify(blocks[0]);
		for (const forbidden of ['LocalBusiness', 'ParkingFacility', 'Offer', 'AggregateRating', 'Review']) {
			expect(text, forbidden).not.toContain(`"${forbidden}"`);
		}

		// FAQPage repeats the rendered FAQ exactly.
		const faq = graph[3]['mainEntity'] as Array<{ name: string; acceptedAnswer: { text: string } }>;
		const rendered = await page.locator('.faq__item').evaluateAll((items) =>
			items.map((item) => ({
				q: item.querySelector('.faq__q-text')!.textContent!.trim(),
				a: item.querySelector('.faq__a')!.textContent!.trim(),
			})),
		);
		expect(faq.map((entry) => ({ q: entry.name, a: entry.acceptedAnswer.text }))).toEqual(rendered);

		// The entity definition is FAQ-01's first sentence, word for word.
		expect(rendered[0].a.startsWith(graph[0]['description'] as string)).toBe(true);
	});

	test(`[${locale.key}] legal pages carry no JSON-LD`, async ({ page }) => {
		await page.goto(`${locale.path}privacidad`);
		await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
	});
}

test('robots.txt allows every crawler and names no sitemap yet', async ({ request }) => {
	const response = await request.get('/robots.txt');
	expect(response.status()).toBe(200);
	const body = await response.text();
	expect(body).toMatch(/User-agent: \*\s+Allow: \//);
	expect(body).not.toMatch(/^Disallow:/m);
	expect(body).not.toMatch(/^Sitemap:/m);
});
