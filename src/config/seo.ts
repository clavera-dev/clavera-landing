/**
 * Designer-supplied head assets: favicon set and the social-share image.
 *
 * >>> THIS IS THE ONLY PLACE THESE FILES ARE WIRED. <<<
 *
 * Both are `null` until the designer's files exist. Activation is: put the
 * file under `public/` and replace the `null` with its entry below. Nothing
 * else changes: `BaseLayout.astro` renders the tags from these values, and
 * `og:image` / `twitter:image` are made absolute from `site` in
 * `astro.config.mjs`, so a domain change needs no edit here.
 *
 * Alt text for the share image is deliberately not part of this config: it
 * would have to be written per locale and pass the same terminology filter as
 * every other public string (no cameras, no `vigilancia`, no 24/7).
 */

export interface FaviconSet {
	/** Root-relative path of the SVG icon (preferred where supported). */
	svg?: string;
	/** Root-relative path of a 32x32 or multi-size `.ico` fallback. */
	ico?: string;
	/** Root-relative path of the 180x180 PNG for iOS home screens. */
	appleTouch?: string;
}

export interface ShareImage {
	/** Root-relative path under `public/`, e.g. `/brand/og/clavera-og-1200x630.png`. */
	path: string;
	/** MIME type, e.g. `image/png` or `image/jpeg`. */
	type: string;
	width: number;
	height: number;
}

export const FAVICON: FaviconSet | null = null;

export const SHARE_IMAGE: ShareImage | null = null;
