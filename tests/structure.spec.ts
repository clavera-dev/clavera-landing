import { test, expect } from '@playwright/test';
import { LOCALES, VIEWPORTS } from './locales';

/**
 * Structural checks across every locale and every required viewport.
 *
 * These measure geometry only. They do not and cannot establish that the
 * composition looks good — that judgement stays with the visual review.
 */
for (const locale of LOCALES) {
	for (const viewport of VIEWPORTS) {
		test.describe(`[${locale.key}] @ ${viewport.name}px`, () => {
			test.beforeEach(async ({ page }) => {
				await page.setViewportSize({ width: viewport.width, height: viewport.height });
			});

			test('has no page-level horizontal overflow', async ({ page }) => {
				await page.goto(locale.path);
				const metrics = await page.evaluate(() => ({
					scrollWidth: document.documentElement.scrollWidth,
					clientWidth: document.documentElement.clientWidth,
					// `overflow-x: clip` on body means scrollWidth may legitimately
					// exceed clientWidth for full-bleed art; what must never happen
					// is the document actually scrolling sideways.
					canScroll: (() => {
						const before = window.scrollX;
						window.scrollTo(9999, window.scrollY);
						const moved = window.scrollX !== before;
						window.scrollTo(before, window.scrollY);
						return moved;
					})(),
				}));
				expect(metrics.canScroll, 'document scrolls horizontally').toBe(false);
			});

			test('keeps every element inside the viewport', async ({ page }) => {
				await page.goto(locale.path);

				// `overflow-x: clip` hides sideways scrolling, so the scroll test
				// alone cannot see content that runs off the edge and gets cut.
				// This checks the geometry directly.
				const offenders = await page.evaluate(() => {
					const vw = document.documentElement.clientWidth;
					const out: string[] = [];

					document.querySelectorAll<HTMLElement>('body *').forEach((el) => {
						// Designed exceptions: the comparison table is a labelled,
						// focusable scroll region, and full-bleed art deliberately
						// runs to the viewport edge.
						if (el.closest('.table-wrap')) return;
						if (el.closest('.bleed, .bleed-left, .bleed-right')) return;

						const rect = el.getBoundingClientRect();
						if (rect.right > vw + 2 || rect.left < -2) {
							const cls = typeof el.className === 'string' ? el.className : '';
							out.push(
								`${el.tagName}.${cls.trim().split(/\s+/).slice(0, 2).join('.')} ` +
									`[${Math.round(rect.left)}..${Math.round(rect.right)}] vw=${vw} ` +
									`"${(el.textContent ?? '').trim().slice(0, 40)}"`,
							);
						}
					});
					return out;
				});

				expect(offenders, 'elements outside the viewport').toEqual([]);
			});

			test('does not clip navigation, CTA, headings or body copy', async ({ page }) => {
				await page.goto(locale.path);

				const clipped = await page.evaluate(() => {
					const selectors = [
						'.site-header__logo',
						'.site-header .button',
						'header nav.lang a',
						'h1',
						'h2',
						'h3',
						'.lede',
						'.body-md',
						'.body-lg',
						'.button',
						'.faq__q-text',
						'footer a',
					];
					const offenders: string[] = [];

					for (const selector of selectors) {
						document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
							const style = getComputedStyle(el);
							const hidesOverflow = (v: string) => v === 'hidden' || v === 'clip';
							const clippedX = hidesOverflow(style.overflowX) && el.scrollWidth > el.clientWidth + 1;
							const clippedY = hidesOverflow(style.overflowY) && el.scrollHeight > el.clientHeight + 1;
							// A fixed height on a text box is the other way copy gets cut.
							const fixedHeight =
								style.height !== 'auto' &&
								hidesOverflow(style.overflowY) &&
								el.scrollHeight > el.clientHeight + 1;

							if (clippedX || clippedY || fixedHeight) {
								offenders.push(
									`${selector} :: "${(el.textContent ?? '').trim().slice(0, 40)}" ` +
										`scroll=${el.scrollWidth}x${el.scrollHeight} client=${el.clientWidth}x${el.clientHeight}`,
								);
							}
						});
					}
					return offenders;
				});

				expect(clipped, 'clipped elements').toEqual([]);
			});

			test('renders a header whose real height matches --header-h', async ({ page }) => {
				await page.goto(locale.path);

				// The declared token drives hero padding, anchor offsets and sticky
				// offsets. If a longer locale or a wrapped control makes the real
				// header taller, every one of those goes wrong silently.
				const header = await page.evaluate(() => {
					const el = document.querySelector('.site-header')!;
					const declared = getComputedStyle(document.documentElement).getPropertyValue('--header-h');
					const probe = document.createElement('div');
					probe.style.height = declared.trim();
					probe.style.position = 'absolute';
					probe.style.visibility = 'hidden';
					document.body.appendChild(probe);
					const declaredPx = probe.getBoundingClientRect().height;
					probe.remove();
					return { actual: el.getBoundingClientRect().height, declared: declaredPx };
				});

				expect(Math.round(header.actual), '--header-h vs rendered header').toBe(
					Math.round(header.declared),
				);
			});

			test('lands anchored sections clear of the fixed header', async ({ page }) => {
				await page.goto(`${locale.path}#fundadores`);
				const clearance = await page.evaluate(() => {
					const header = document.querySelector('.site-header')!.getBoundingClientRect();
					const section = document.querySelector('#fundadores')!.getBoundingClientRect();
					return Math.round(section.top - header.height);
				});
				expect(clearance, 'gap between header bottom and anchored section').toBeGreaterThanOrEqual(0);
			});

			test('keeps body copy at or above the approved size', async ({ page }) => {
				await page.goto(locale.path);
				const tooSmall = await page.evaluate(() => {
					const offenders: string[] = [];
					document.querySelectorAll<HTMLElement>('.body-md, .body-lg, .lede').forEach((el) => {
						const size = parseFloat(getComputedStyle(el).fontSize);
						if (size < 16) {
							offenders.push(`${el.className} = ${size}px`);
						}
					});
					return offenders;
				});
				expect(tooSmall, 'body copy below 16px').toEqual([]);
			});
		});
	}
}
