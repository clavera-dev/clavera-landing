import type { Page } from '@playwright/test';

/**
 * Proves every image on the page has actually loaded AND decoded.
 *
 * `naturalWidth > 0` alone is not enough for a screenshot: an image can be
 * fetched but not yet rasterised, which is what produced the blank render
 * panels in the earlier diagnostic captures. `decode()` resolves only once the
 * bitmap is ready to paint.
 *
 * Installs `window.__claveraEnsureImages()`, which returns the list of images
 * that failed — empty means every image is safe to capture.
 */
export async function ensureImagesReady(page: Page): Promise<void> {
	await page.addInitScript(() => {
		(window as unknown as Record<string, unknown>).__claveraEnsureImages = async () => {
			const images = Array.from(document.querySelectorAll('img'));

			// Lazy images below the fold would otherwise never start loading and
			// would screenshot as empty boxes.
			images.forEach((img) => {
				img.loading = 'eager';
				img.setAttribute('fetchpriority', 'high');
			});

			const failures: string[] = [];

			await Promise.all(
				images.map(async (img) => {
					const source = img.currentSrc || img.src || '(no src)';
					try {
						if (!img.complete) {
							await new Promise<void>((resolve, reject) => {
								img.addEventListener('load', () => resolve(), { once: true });
								img.addEventListener('error', () => reject(new Error('load error')), {
									once: true,
								});
							});
						}
						// Throws if the bytes are not decodable.
						await img.decode();
						if (img.naturalWidth === 0) {
							failures.push(`${source} — naturalWidth === 0`);
						}
					} catch (error) {
						failures.push(`${source} — ${String(error)}`);
					}
				}),
			);

			return failures;
		};
	});
}

declare global {
	interface Window {
		__claveraEnsureImages: () => Promise<string[]>;
	}
}
