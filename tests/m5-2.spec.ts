import { test, expect, type Page } from '@playwright/test';
import { LOCALES, SCREENSHOT_VIEWPORTS } from './locales';
import { CANDIDATE_ZONES } from '../src/config/zones';

/**
 * M5.2 gates: the 375×667 first screen, horizontal containment, and the zone
 * selector's layout stability, list affordance, keyboard behaviour and
 * single selection (M4_REFERENCE_COMPOSITION_SPEC.md §10 SEL-1, §12).
 */

const PHONE = { width: 375, height: 667 };

/** Elements poking past the viewport, ignoring content inside its own scroll or clip region. */
async function horizontalOffenders(page: Page): Promise<string[]> {
	return page.evaluate(() => {
		const vw = document.documentElement.clientWidth;
		const clipped = (el: Element) => {
			for (let node = el.parentElement; node && node !== document.body; node = node.parentElement) {
				if (getComputedStyle(node).overflowX !== 'visible') return true;
			}
			return false;
		};
		const out: string[] = [];
		document.body.querySelectorAll<HTMLElement>('*').forEach((el) => {
			const rect = el.getBoundingClientRect();
			if (rect.width <= 1 || rect.height === 0) return;
			if ((rect.right > vw + 1 || rect.left < -1) && !clipped(el)) {
				out.push(`${el.tagName}.${String(el.className).trim().split(/\s+/)[0]} [${Math.round(rect.left)}, ${Math.round(rect.right)}]`);
			}
		});
		return out;
	});
}

for (const locale of LOCALES) {
	test.describe(`[${locale.key}] M5.2 first screen at 375×667`, () => {
		test.use({ viewport: PHONE });

		test('"Seguir" and the search field are fully on the first screen, below the header', async ({ page }) => {
			await page.goto(locale.path);
			await page.evaluate(() => document.fonts.ready);

			const header = await page.locator('.site-header').boundingBox();
			for (const selector of ['#top [data-zone-continue]', '#top [data-zone-input]']) {
				const target = page.locator(selector);
				await expect(target, selector).toBeInViewport({ ratio: 1 });
				const box = (await target.boundingBox())!;
				expect(box.y, `${selector} not under the fixed header`).toBeGreaterThanOrEqual(header!.y + header!.height);
				expect(box.y + box.height, `${selector} bottom`).toBeLessThanOrEqual(PHONE.height);
			}
		});

		test('nothing overflows horizontally, with the hero list closed or open', async ({ page }) => {
			await page.goto(locale.path);
			await page.evaluate(() => document.fonts.ready);
			expect(await horizontalOffenders(page), 'list closed').toEqual([]);

			await page.locator('#top [data-zone-input]').focus();
			await expect(page.locator('#top [data-zone-list]')).toBeVisible();
			expect(await horizontalOffenders(page), 'list open').toEqual([]);
		});
	});
}

test.describe('M5.2 zone selector', () => {
	const locale = LOCALES[0];

	test('reserves the field\'s space before the script reveals it', async ({ page }) => {
		await page.goto(locale.path);

		for (const scope of ['#top', '#zonas']) {
			const field = page.locator(`${scope} [data-zone-field]`);
			const link = page.locator(`${scope} [data-zone-continue]`);
			const shown = await link.boundingBox();

			// Put the field back into its pre-script state and re-measure.
			await field.evaluate((el: HTMLElement) => {
				el.hidden = true;
			});
			await expect(field, `${scope} pre-script field is not visible`).toBeHidden();
			const reserved = await link.boundingBox();
			await field.evaluate((el: HTMLElement) => {
				el.hidden = false;
			});

			expect(reserved, `${scope} "Seguir" does not move when the field appears`).toEqual(shown);
		}
	});

	test('without JavaScript the field takes no space and "Seguir" still links to the survey', async ({
		browser,
		browserName,
	}) => {
		// `@media (scripting)` is only reliably reported as `none` with scripting
		// disabled in Chromium's Playwright build.
		test.skip(browserName !== 'chromium', 'chromium checks the no-script state');
		const context = await browser.newContext({ javaScriptEnabled: false });
		const page = await context.newPage();
		await page.goto(locale.path);

		const field = page.locator('#zonas [data-zone-field]');
		expect(await field.boundingBox(), 'field has no box without scripting').toBeNull();
		const row = (await page.locator('#zonas .zone-selector__row').boundingBox())!;
		const link = page.locator('#zonas [data-zone-continue]');
		expect((await link.boundingBox())!.x, '"Seguir" starts the row').toBeCloseTo(row.x, 0);
		expect(await link.getAttribute('href')).toBe(locale.surveyHref);
		await context.close();
	});

	test('draws a list affordance that flips while the list is open', async ({ page }) => {
		await page.goto(locale.path);
		const field = page.locator('#zonas [data-zone-field]');
		const mark = () =>
			field.evaluate((el) => {
				const style = getComputedStyle(el, '::after');
				return { content: style.content, width: parseFloat(style.width), transform: style.transform };
			});

		const closed = await mark();
		expect(closed.content).not.toBe('none');
		expect(closed.width).toBeGreaterThan(0);

		await page.locator('#zonas [data-zone-input]').focus();
		const open = await mark();
		expect(open.transform, 'chevron flips when open').not.toBe(closed.transform);
	});

	test('works by keyboard: opens on focus, arrows move, Enter chooses, Escape closes', async ({
		page,
		browserName,
	}) => {
		await page.goto(locale.path);
		const input = page.locator('#zonas [data-zone-input]');
		const list = page.locator('#zonas [data-zone-list]');

		await input.focus();
		await expect(input).toBeFocused();
		await expect(input).toHaveAttribute('aria-expanded', 'true');
		await expect(list).toBeVisible();

		// The focus ring is drawn.
		const outline = await input.evaluate((el) => getComputedStyle(el).outlineStyle);
		expect(outline).not.toBe('none');

		await page.keyboard.press('ArrowDown');
		const first = page.locator('#zonas [data-zone-option]').first();
		await expect(input).toHaveAttribute('aria-activedescendant', (await first.getAttribute('id'))!);
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowUp');
		await expect(input).toHaveAttribute('aria-activedescendant', (await first.getAttribute('id'))!);

		await page.keyboard.press('Enter');
		await expect(input).toHaveValue(CANDIDATE_ZONES[0].label);
		await expect(input).toHaveAttribute('aria-expanded', 'false');
		await expect(list).toBeHidden();
		await expect(input, 'focus stays on the field after choosing').toBeFocused();

		await page.keyboard.press('ArrowDown');
		await expect(list).toBeVisible();
		await page.keyboard.press('Escape');
		await expect(list).toBeHidden();
		await expect(input).not.toHaveAttribute('aria-activedescendant');

		// WebKit on macOS does not move Tab focus onto links by default.
		if (browserName !== 'webkit') {
			await page.keyboard.press('Tab');
			await expect(page.locator('#zonas [data-zone-continue]')).toBeFocused();
		}
	});

	test('keyboard focus in S10 is not hidden under the fixed header at 375×667', async ({ page }) => {
		await page.setViewportSize(PHONE);
		await page.goto(locale.path);
		await page.evaluate(() => document.fonts.ready);
		expect(page.viewportSize()).toEqual(PHONE);
		const input = page.locator('#zonas [data-zone-input]');
		await input.focus();
		await expect(input).toBeFocused();
		// html has `scroll-behavior: smooth`, so focusing scrolls with an animation.
		// Measure where focus comes to rest, not the page before it moves.
		await page.evaluate(
			() =>
				new Promise<void>((resolve) => {
					let last = window.scrollY;
					let still = 0;
					const tick = () => {
						if (window.scrollY === last) still += 1;
						else [last, still] = [window.scrollY, 0];
						if (still >= 10) resolve();
						else requestAnimationFrame(tick);
					};
					requestAnimationFrame(tick);
				}),
		);
		const header = (await page.locator('.site-header').boundingBox())!;
		const box = (await input.boundingBox())!;
		expect(box.y).toBeGreaterThanOrEqual(header.y + header.height);
		expect(box.y + box.height).toBeLessThanOrEqual(PHONE.height);
	});

	test('an unmatched search closes the list instead of opening an empty box', async ({ page }) => {
		await page.goto(locale.path);
		const input = page.locator('#zonas [data-zone-input]');
		const list = page.locator('#zonas [data-zone-list]');

		await input.fill('zzzz');
		await expect(list).toBeHidden();
		await expect(input).toHaveAttribute('aria-expanded', 'false');
		// No owner copy for the empty state yet (D7), so no element is rendered.
		await expect(page.locator('[data-zone-empty]')).toHaveCount(0);

		await input.fill('pal');
		await expect(list).toBeVisible();
		await expect(input).toHaveAttribute('aria-expanded', 'true');
	});

	test('never marks more than one barrio as selected', async ({ page }) => {
		await page.goto(locale.path);

		const ids = await page.locator('[data-zone-option]').evaluateAll((els) => els.map((el) => el.id));
		expect(new Set(ids).size, 'option ids are unique across both selectors').toBe(ids.length);

		const selected = (scope: string) =>
			page
				.locator(`${scope} [data-zone-option][aria-selected="true"]`)
				.evaluateAll((els) => els.map((el) => (el as HTMLElement).dataset.slug));

		const hero = page.locator('#top [data-zone-input]');
		const [a, b] = [CANDIDATE_ZONES[3], CANDIDATE_ZONES[5]];

		await hero.fill(a.label.slice(0, 4));
		await page.locator(`#top [data-zone-option][data-slug="${a.slug}"]`).click();
		expect(await selected('#top')).toEqual([a.slug]);

		// Choosing the same zone again by keyboard leaves one selection.
		await hero.focus();
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('Enter');
		expect(await selected('#top')).toEqual([a.slug]);

		await hero.fill(b.label.slice(0, 4));
		expect(await selected('#top'), 'editing clears the old choice').toEqual([]);
		await page.locator(`#top [data-zone-option][data-slug="${b.slug}"]`).click();
		expect(await selected('#top')).toEqual([b.slug]);

		// The S10 instance is independent.
		expect(await selected('#zonas')).toEqual([]);
	});
});

/**
 * structure.spec.ts checks page-level horizontal overflow at every required
 * viewport, but never opens the zone-selector list while measuring — and the
 * list is absolutely positioned, so a regression there would only show up
 * with it open. This closes that gap at the three required breakpoints,
 * across all three locales, for both selector instances.
 */
test.describe('zone selector list stays inside the viewport with the list open', () => {
	for (const locale of LOCALES) {
		for (const viewport of SCREENSHOT_VIEWPORTS) {
			test(`[${locale.key}] @ ${viewport.name}px`, async ({ page }) => {
				await page.setViewportSize({ width: viewport.width, height: viewport.height });
				await page.goto(locale.path);
				await page.evaluate(() => document.fonts.ready);

				for (const scope of ['#top', '#zonas']) {
					await page.locator(`${scope} [data-zone-input]`).focus();
					await expect(page.locator(`${scope} [data-zone-list]`)).toBeVisible();
					expect(await horizontalOffenders(page), `${scope} list open`).toEqual([]);
					await page.keyboard.press('Escape');
				}
			});
		}
	}
});

test.describe('M5.2 reduced motion', () => {
	test.use({ viewport: PHONE, contextOptions: { reducedMotion: 'reduce' } });

	test('no smooth scroll and no animation while the selector is used', async ({ page }) => {
		await page.goto(LOCALES[0].path);
		expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');

		const input = page.locator('#top [data-zone-input]');
		await input.focus();
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('Enter');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('Escape');

		// Described, not just counted, so a failure says what is still moving.
		const running = await page.evaluate(() =>
			document
				.getAnimations()
				.filter((animation) => animation.playState === 'running')
				.map((animation) => {
					const target = (animation.effect as KeyframeEffect | null)?.target;
					const name =
						'transitionProperty' in animation
							? `transition:${(animation as CSSTransition).transitionProperty}`
							: 'animationName' in animation
								? `animation:${(animation as CSSAnimation).animationName}`
								: 'script';
					const duration = animation.effect?.getComputedTiming().duration;
					return `${name} ${duration}ms on ${target?.tagName.toLowerCase()}.${target?.className}`;
				}),
		);
		expect(running).toEqual([]);
	});
});

test.describe('M5.2 hero prototypes stay local', () => {
	test('no shipped page sets or styles the H-1 prototype switch', async ({ page }) => {
		for (const locale of LOCALES) {
			await page.goto(`${locale.path}?hero-proto=a#hero-proto=b`);
			expect(await page.evaluate(() => document.documentElement.dataset.heroProto)).toBeUndefined();

			const mentions = await page.evaluate(() =>
				Array.from(document.styleSheets).some((sheet) => {
					try {
						return Array.from(sheet.cssRules).some((rule) => rule.cssText.includes('hero-proto'));
					} catch {
						return false;
					}
				}),
			);
			expect(mentions, `${locale.key}: prototype CSS in the build`).toBe(false);
		}
	});
});
