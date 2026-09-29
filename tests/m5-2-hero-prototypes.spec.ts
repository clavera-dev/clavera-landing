import { test, expect, type Page } from '@playwright/test';
import { LOCALES } from './locales';
import { ensureImagesReady } from './images';

/**
 * M5.2 — H-1 comparison harness (evidence only, Chromium only).
 *
 * Renders the hero at 375×667 in ES/EN/RU three ways — the shipped default
 * and the two prototypes in tests/prototypes/hero-h1.css, which is injected
 * here and exists nowhere in the build — and, for each, writes a first-screen
 * capture and logs one `M5.2 {…}` JSON line with:
 *
 *   ctaBottom / fold       "Seguir" bottom vs 667 (brief S1; stop if over)
 *   contrast.*             worst-case WCAG ratio of the disclosure, eyebrow
 *                          and H1 against the brightest pixel behind each,
 *                          sampled from a capture with that text hidden
 *   pass                   fold held, disclosure/eyebrow ≥ 4.5, H1 ≥ 3
 *
 * It also captures the unchanged desktop hero at 1280×720 and 1440×800 (H-2).
 * Measurements never fail the run: choosing A or B is a visual decision (D4),
 * so this spec records evidence and only fails if the page cannot be measured.
 *
 *   yarn playwright test tests/m5-2-hero-prototypes.spec.ts --project=chromium
 *   → test-results/screenshots/m5-2/*.png plus the JSON lines on stdout
 */

const OUT = 'test-results/screenshots/m5-2';
const VARIANTS = ['current', 'a', 'b'] as const;

async function applyVariant(page: Page, variant: (typeof VARIANTS)[number]) {
	if (variant !== 'current') {
		await page.addStyleTag({ path: 'tests/prototypes/hero-h1.css' });
		await page.evaluate((v) => {
			document.documentElement.dataset.heroProto = v;
		}, variant);
	}
	await page.evaluate(() => document.fonts.ready);
	expect(await page.evaluate(() => window.__claveraEnsureImages())).toEqual([]);
}

/** Worst-case contrast of `selector`'s text against what is painted behind it. */
async function worstContrast(page: Page, selector: string): Promise<number> {
	const target = page.locator(selector).first();
	const box = (await target.boundingBox())!;
	const clip = {
		x: Math.max(0, Math.floor(box.x)),
		y: Math.max(0, Math.floor(box.y)),
		width: Math.floor(box.width),
		height: Math.floor(box.height),
	};

	await target.evaluate((el) => {
		(el as HTMLElement).style.visibility = 'hidden';
	});
	const png = await page.screenshot({ clip, animations: 'disabled' });
	await target.evaluate((el) => {
		(el as HTMLElement).style.visibility = '';
	});

	return target.evaluate(async (el, bytes) => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
		const luminance = (r: number, g: number, b: number) => {
			const lin = (c: number) => {
				const s = c / 255;
				return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
			};
			return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
		};

		// Resolve the computed text colour (oklch) to sRGB through the canvas.
		canvas.width = canvas.height = 1;
		ctx.fillStyle = getComputedStyle(el).color;
		ctx.fillRect(0, 0, 1, 1);
		const [tr, tg, tb] = ctx.getImageData(0, 0, 1, 1).data;
		const text = luminance(tr, tg, tb);

		const bitmap = await createImageBitmap(new Blob([new Uint8Array(bytes)], { type: 'image/png' }));
		canvas.width = bitmap.width;
		canvas.height = bitmap.height;
		ctx.drawImage(bitmap, 0, 0);
		const data = ctx.getImageData(0, 0, bitmap.width, bitmap.height).data;
		let brightest = 0;
		for (let i = 0; i < data.length; i += 4) {
			brightest = Math.max(brightest, luminance(data[i], data[i + 1], data[i + 2]));
		}
		const [hi, lo] = text > brightest ? [text, brightest] : [brightest, text];
		return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
	}, Array.from(png as unknown as Uint8Array));
}

test.describe('M5.2 H-1 prototypes', () => {
	test.beforeEach(async ({ page, browserName }) => {
		test.skip(browserName !== 'chromium', 'chromium captures the evidence');
		await ensureImagesReady(page);
	});

	for (const locale of LOCALES) {
		for (const variant of VARIANTS) {
			test(`[${locale.key}] ${variant} @ 375×667`, async ({ page }) => {
				await page.setViewportSize({ width: 375, height: 667 });
				await page.goto(locale.path);
				await applyVariant(page, variant);

				const cta = (await page.locator('#top [data-zone-continue]').boundingBox())!;
				const band = (await page.locator('.hero__media picture').boundingBox())!;
				const contrast = {
					disclosure: await worstContrast(page, '.hero__disclosure'),
					eyebrow: await worstContrast(page, '.hero__eyebrow'),
					h1: await worstContrast(page, '#hero-heading'),
				};
				const ctaBottom = Math.round((cta.y + cta.height) * 100) / 100;
				const result = {
					locale: locale.key,
					variant,
					viewport: '375x667',
					ctaBottom,
					fold: 667,
					spare: Math.round((667 - ctaBottom) * 100) / 100,
					imageBox: { top: Math.round(band.y), height: Math.round(band.height) },
					contrast,
					pass: ctaBottom <= 667 && contrast.disclosure >= 4.5 && contrast.eyebrow >= 4.5 && contrast.h1 >= 3,
				};
				console.log(`M5.2 ${JSON.stringify(result)}`);
				await test.info().attach('metrics', { body: JSON.stringify(result, null, 2), contentType: 'application/json' });

				await page.screenshot({ path: `${OUT}/${locale.key}-375x667-${variant}.png` });
			});
		}

		for (const viewport of [
			{ width: 1280, height: 720 },
			{ width: 1440, height: 800 },
		]) {
			test(`[${locale.key}] desktop hero (H-2) @ ${viewport.width}×${viewport.height}`, async ({ page }) => {
				await page.setViewportSize(viewport);
				await page.goto(locale.path);
				await applyVariant(page, 'current');

				const cta = (await page.locator('#top [data-zone-continue]').boundingBox())!;
				const ctaBottom = Math.round((cta.y + cta.height) * 100) / 100;
				const result = {
					locale: locale.key,
					variant: 'current',
					viewport: `${viewport.width}x${viewport.height}`,
					ctaBottom,
					fold: viewport.height,
					spare: Math.round((viewport.height - ctaBottom) * 100) / 100,
					contrast: {
						disclosure: await worstContrast(page, '.hero__disclosure'),
						eyebrow: await worstContrast(page, '.hero__eyebrow'),
						h1: await worstContrast(page, '#hero-heading'),
					},
				};
				console.log(`M5.2 ${JSON.stringify(result)}`);
				await page.screenshot({ path: `${OUT}/${locale.key}-${viewport.width}x${viewport.height}-current.png` });
			});
		}
	}
});
