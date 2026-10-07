/**
 * Copy access.
 *
 * Components read their strings through `getCopy(Astro.currentLocale)`, so no
 * component needs a `locale` prop and the component tree is written once
 * rather than duplicated per locale.
 */
import type { Copy } from './types';
import { es } from './es';
import { en } from './en';
import { ru } from './ru';
import { resolveLocale, type Locale } from './config';

const DICTIONARIES: Record<Locale, Copy> = { es, en, ru };

export function getCopy(current: string | undefined): Copy {
	return DICTIONARIES[resolveLocale(current)];
}

/**
 * Alt text for a project render.
 *
 * Brief S8 requires the mandatory generated-render disclosure to be duplicated
 * in `<figcaption>` AND in `alt` — a blocker, because a screen-reader user who
 * never sees the caption must still be told the image is not an operating
 * facility. Composing it here rather than writing it into every alt string in
 * every locale keeps the two copies byte-identical by construction.
 */
export function renderAlt(copy: Copy, id: keyof Copy['media']['renders']): string {
	return `${copy.media.renders[id].alt} ${copy.media.disclosure}`;
}

export type { Copy } from './types';
export * from './config';
