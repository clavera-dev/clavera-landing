import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';

/**
 * M7 — the two CSS-only motions from M6_MOTION_MAP.md §3, implemented
 * provisionally on 2026-10-06 (owner: «внедряем анимации»).
 *
 * 1. "Sumate al piloto" amber rule draws in, scroll-driven, where the engine
 *    supports view timelines; otherwise the static rule ships as before.
 * 2. Zone-selector suggestions fade and lift in over 120ms on open.
 *
 * Under reduced motion neither may run, and nothing may shift layout.
 */

const ES = LOCALES[0];

test.describe('motion', () => {
	test('the accent rule is scroll-driven where supported, and always ends full width', async ({ page }) => {
		await page.goto(ES.path);
		const supported = await page.evaluate(() => CSS.supports('animation-timeline: view()'));
		const animations = await page.evaluate(() =>
			document
				.getAnimations()
				.map((a) => ({
					name: (a as CSSAnimation).animationName,
					scroll: a.timeline !== null && a.timeline !== document.timeline,
				})),
		);
		const draw = animations.filter((a) => a.name === 'section-accent-draw');
		expect(draw).toHaveLength(supported ? 1 : 0);
		if (supported) expect(draw[0].scroll).toBe(true);

		// Scrolled fully into view, the rule is at full scale in every engine.
		await page.locator('#fundadores').scrollIntoViewIfNeeded();
		await page.evaluate(() => window.scrollBy(0, 400));
		await page.waitForTimeout(100);
		const scale = await page.evaluate(() => {
			const m = new DOMMatrix(getComputedStyle(document.querySelector('#fundadores')!, '::after').transform);
			return m.a;
		});
		expect(scale).toBeCloseTo(1, 1);
	});

	test('the zone list has an entry transition, and closing stays instant', async ({ page }) => {
		await page.goto(ES.path);
		const list = page.locator('#zonas [data-zone-list]');
		const props = await list.evaluate((node) => {
			const el = node as HTMLElement;
			el.hidden = false;
			const style = getComputedStyle(el);
			const result = { property: style.transitionProperty, duration: style.transitionDuration };
			el.hidden = true;
			return result;
		});
		expect(props.property).toContain('opacity');
		expect(props.duration).toContain('0.12s');

		const hiddenTransition = await list.evaluate((el) => getComputedStyle(el).transitionDuration);
		expect(hiddenTransition).toBe('0s');
	});

	test.describe('reduced motion', () => {
		test('runs no animation and no transition', async ({ page }) => {
			await page.emulateMedia({ reducedMotion: 'reduce' });
			for (const locale of LOCALES) {
				await page.goto(locale.path);
				const running = await page.evaluate(() => document.getAnimations().length);
				expect(running, `${locale.key}: animations`).toBe(0);

				const input = page.locator('#zonas [data-zone-input]');
				await input.scrollIntoViewIfNeeded();
				await input.fill('pa');
				const opacity = await page
					.locator('#zonas [data-zone-list]')
					.evaluate((el) => getComputedStyle(el).opacity);
				expect(opacity).toBe('1');
				expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
			}
		});
	});
});
