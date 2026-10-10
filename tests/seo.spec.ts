import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';

/**
 * Brief §6.5 / §8.2 / §8.4 — local technical SEO (plan C9, provisional).
 * sitemap.xml and the robots.txt Sitemap line follow `site` in astro.config.mjs.
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

		// FAQPage repeats the rendered FAQ exactly, minus the access-hours item
		// (24/7 never in metadata, CLAUDE.md).
		const faq = graph[3]['mainEntity'] as Array<{ name: string; acceptedAnswer: { text: string } }>;
		const rendered = await page.locator('.faq__item').evaluateAll((items) =>
			items.map((item) => ({
				q: item.querySelector('.faq__q-text')!.textContent!.trim(),
				a: item.querySelector('.faq__a')!.textContent!.trim(),
			})),
		);
		expect(faq.map((entry) => ({ q: entry.name, a: entry.acceptedAnswer.text }))).toEqual(
			rendered.filter((item) => !/24|круглосуточ/i.test(item.a)),
		);
		expect(text).not.toMatch(/24\/7|24 h|круглосуточ/i);

		// The entity definition is FAQ-01's first sentence, word for word.
		expect(rendered[0].a.startsWith(graph[0]['description'] as string)).toBe(true);
	});

	test(`[${locale.key}] legal pages carry no JSON-LD`, async ({ page }) => {
		await page.goto(`${locale.path}privacidad`);
		await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
	});
}

test('robots.txt allows every crawler and points at the sitemap on the canonical origin', async ({ request, page }) => {
	const response = await request.get('/robots.txt');
	expect(response.status()).toBe(200);
	const body = await response.text();
	expect(body).toMatch(/User-agent: \*\s+Allow: \//);
	expect(body).not.toMatch(/^Disallow:/m);
	await page.goto('/');
	const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
	const origin = new URL(canonical!).origin;
	expect(body).toContain(`Sitemap: ${origin}/sitemap.xml`);
});

test('sitemap.xml lists every built page once per locale, matching canonicals and hreflang', async ({ request, page }) => {
	const response = await request.get('/sitemap.xml');
	expect(response.status()).toBe(200);
	const xml = await response.text();
	const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
	expect(locs).toHaveLength(12);
	expect(new Set(locs).size).toBe(12);
	for (const loc of locs) {
		const path = new URL(loc).pathname;
		await page.goto(path);
		expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toBe(loc);
		for (const tag of await page.locator('link[rel="alternate"][hreflang]').all()) {
			expect(xml).toContain(`hreflang="${await tag.getAttribute('hreflang')}" href="${await tag.getAttribute('href')}"`);
		}
	}
});
