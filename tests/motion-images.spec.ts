import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';

/**
 * Owner review 2026-10-11: a render below the hero must never look as if it
 * were still loading. While it scrolls into view it is never masked
 * (clip-path) or faded (opacity) — its pixels are all there from the first
 * frame. A slow scale settle is allowed, but once the render's centre reaches
 * the middle of the screen it is at rest at its true size, full frame.
 */

const ES = LOCALES[0];

for (const viewport of [
	{ width: 1440, height: 900 },
	{ width: 390, height: 844 },
]) {
	test(`renders scroll in whole, never masked or faded (${viewport.width}px)`, async ({ page }) => {
		await page.setViewportSize(viewport);
		await page.goto(ES.path);
		const count = await page.locator('main .render-figure').evaluateAll(
			(figures) => figures.filter((f) => !f.closest('.hero')).length,
		);
		expect(count, 'renders below the hero').toBeGreaterThan(0);

		for (let i = 0; i < count; i++) {
			// `top` is where the figure's top edge sits, as a share of the
			// viewport height: just entering, then a third of the way up.
			for (const top of [0.95, 0.66]) {
				const state = await page.evaluate(
					async ([index, at]) => {
						const figure = Array.from(document.querySelectorAll('main .render-figure')).filter(
							(f) => !f.closest('.hero'),
						)[index as number];
						const y = figure.getBoundingClientRect().top + window.scrollY;
						window.scrollTo({ top: y - window.innerHeight * (at as number), behavior: 'instant' });
						await new Promise((r) => setTimeout(r, 120));
						// The image, its frame and every wrapper up to <main>: a mask or a
						// fade on any of them hides the render.
						const nodes: Element[] = [figure.querySelector('img')!, figure.querySelector('picture')!];
						for (let node: Element | null = figure; node && node.tagName !== 'MAIN'; node = node.parentElement) {
							nodes.push(node);
						}
						return nodes.map((node) => {
							const style = getComputedStyle(node);
							return {
								tag: `${node.tagName}.${node.classList[0] ?? ''}`,
								opacity: style.opacity,
								clip: style.clipPath,
								visibility: style.visibility,
							};
						});
					},
					[i, top],
				);
				for (const node of state) {
					const where = `render ${i + 1}, ${node.tag}, top edge at ${top * 100}%`;
					expect(node.opacity, where).toBe('1');
					expect(node.visibility, where).toBe('visible');
					// A clip that only reaches outside the box (negative inset) or a
					// rounded frame with no inset hides nothing.
					expect(node.clip, where).toMatch(/^(none|inset\((0px|-\d+px)( (0px|-\d+px)){0,3}( round .*)?\))$/);
				}
			}

			const scale = await page.evaluate(async (index) => {
				const figure = Array.from(document.querySelectorAll('main .render-figure')).filter(
					(f) => !f.closest('.hero'),
				)[index];
				const picture = figure.querySelector('picture')!;
				const rect = picture.getBoundingClientRect();
				const centre = rect.top + window.scrollY + rect.height / 2;
				window.scrollTo({ top: centre - window.innerHeight / 2 + 24, behavior: 'instant' });
				await new Promise((r) => setTimeout(r, 1600));
				const style = getComputedStyle(figure.querySelector('img')!);
				return { scale: style.scale, transform: style.transform };
			}, i);
			expect(['none', '1'], `render ${i + 1} at rest: scale`).toContain(scale.scale);
			expect(scale.transform, `render ${i + 1} at rest: transform`).toBe('none');
		}
	});
}
