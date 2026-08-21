import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';

/** Anchors, CTA boundaries, FAQ keyboard operation and visible focus. */
const ANCHORS = ['problema', 'solucion', 'works', 'vehiculos', 'seguridad', 'comparacion', 'hub', 'casos', 'zonas', 'fundadores', 'faq', 'encuesta'];

for (const locale of LOCALES) {
	test.describe(`[${locale.key}] interaction`, () => {
		test('every in-page section anchor exists', async ({ page }) => {
			await page.goto(locale.path);
			for (const id of ANCHORS) {
				await expect(page.locator(`#${id}`), `#${id}`).toHaveCount(1);
			}
		});

		test('header CTA targets the founders section and clears the fixed header', async ({ page }) => {
			await page.goto(locale.path);
			const cta = page.locator('.site-header .button').first();
			await expect(cta).toHaveAttribute('href', `${locale.path}#fundadores`);

			await cta.click();
			await page.waitForURL(/#fundadores$/);

			const clearance = await page.evaluate(() => {
				const header = document.querySelector('.site-header')!.getBoundingClientRect();
				const section = document.querySelector('#fundadores')!.getBoundingClientRect();
				return Math.round(section.top - header.height);
			});
			expect(clearance, 'gap between header and anchored section').toBeGreaterThanOrEqual(0);
		});

		test('the lead-capture controls stay inert while unconfigured', async ({ page }) => {
			await page.goto(locale.path);
			const boundaries = page.locator('[data-typeform-boundary]');
			await expect(boundaries).toHaveCount(2);

			// Both targets present and independent.
			await expect(page.locator('[data-typeform-target="founders"]')).toHaveCount(1);
			await expect(page.locator('[data-typeform-target="survey"]')).toHaveCount(1);

			// Inert means a disabled button, never a link to nowhere.
			await expect(boundaries.locator('button[disabled]')).toHaveCount(2);
			await expect(boundaries.locator('a')).toHaveCount(0);
		});

		test('FAQ opens and closes from the keyboard', async ({ page }) => {
			await page.goto(locale.path);
			const firstItem = page.locator('.faq__item').first();
			const summary = firstItem.locator('summary');

			await expect(firstItem).not.toHaveAttribute('open', '');

			await summary.focus();
			await expect(summary).toBeFocused();

			await page.keyboard.press('Enter');
			await expect(firstItem).toHaveAttribute('open', '');
			await expect(firstItem.locator('.faq__a')).toBeVisible();

			await page.keyboard.press('Enter');
			await expect(firstItem).not.toHaveAttribute('open', '');
		});

		test('exposes a skip link to the main landmark, first in the tab order', async ({ page }) => {
			await page.goto(locale.path);

			const skip = page.locator('.skip-link');
			await expect(skip).toHaveAttribute('href', '#contenido');
			await expect(page.locator('#contenido')).toHaveCount(1);

			// First focusable element in DOM order, so it is reached before any
			// site navigation regardless of engine.
			const isFirst = await page.evaluate(() => {
				const focusable = document.querySelectorAll<HTMLElement>(
					'a[href], button, summary, input, select, textarea, [tabindex]:not([tabindex="-1"])',
				);
				return focusable[0]?.classList.contains('skip-link') ?? false;
			});
			expect(isFirst, 'skip link is first in DOM tab order').toBe(true);
		});

		test('reveals the skip link when it receives keyboard focus', async ({ page, browserName }) => {
			// WebKit mirrors Safari's default of excluding links from the Tab
			// order ("Press Tab to highlight each item" is off), so a Tab press
			// there lands on the first focusable *control* instead. That is a
			// platform preference, not a page defect, and the assertion above
			// still covers the link's presence and position on every engine.
			test.skip(browserName === 'webkit', 'WebKit excludes links from the default tab order');

			await page.goto(locale.path);
			await page.keyboard.press('Tab');

			const skip = page.locator('.skip-link');
			await expect(skip).toBeFocused();

			// The reveal is a transform transition, so poll until it settles
			// instead of racing the animation.
			await expect
				.poll(async () => skip.evaluate((el) => Math.round(el.getBoundingClientRect().top)), {
					message: 'focused skip link moves on screen',
				})
				.toBeGreaterThanOrEqual(0);
		});

		test('keyboard focus is visibly indicated', async ({ page }) => {
			await page.goto(locale.path);
			const cta = page.locator('.site-header .button').first();
			await cta.focus();

			const indicator = await cta.evaluate((el) => {
				const s = getComputedStyle(el);
				return {
					outlineStyle: s.outlineStyle,
					outlineWidth: parseFloat(s.outlineWidth || '0'),
					boxShadow: s.boxShadow,
				};
			});

			const hasOutline = indicator.outlineStyle !== 'none' && indicator.outlineWidth > 0;
			const hasShadow = indicator.boxShadow !== 'none' && indicator.boxShadow !== '';
			expect(hasOutline || hasShadow, 'visible focus indicator').toBe(true);
		});
	});
}
