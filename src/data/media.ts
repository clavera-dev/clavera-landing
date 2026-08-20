/**
 * Central media registry.
 *
 * Every place in the site that needs a CLAVERA render or media placeholder
 * reads from here instead of hard-coding a path. When new media arrives,
 * update this file only.
 *
 * Approved content per render: PROJECT_DECISIONS.md § "Approved final render set".
 *
 * public/brand/renders/final/ holds ONLY the optimized AVIF and WebP
 * derivatives of the approved final R1–R6 set. The approved master PNG files
 * are retained outside this repository and outside the public production
 * bundle (PROJECT_DECISIONS.md § "Approved final render set"); the `native`
 * dimensions recorded below describe those masters, not files stored here.
 * R3 is the self-service bicycle-cleaning render, per PROJECT_DECISIONS.md —
 * a real asset for it now exists and replaces the neutral placeholder that
 * used to sit in that gallery slot.
 *
 * One older asset — the "entrance" render from the previous production
 * batch — is kept separately under public/brand/renders/ (not final/). It
 * genuinely shows a controlled-access entrance, so it stays in the
 * Security section only. It must never be labelled R3 or presented as the
 * cleaning zone: R3 in the approved set is the vertical self-cleaning bay,
 * a different scene entirely.
 */

export interface RenderDimensions {
	width: number;
	height: number;
}

export interface RenderAsset {
	id: 'r1' | 'r2' | 'r3' | 'entrance' | 'r4' | 'r5' | 'r6';
	/** Directory the width/format variants live in, relative to /public. */
	basePath: string;
	/** Filename fragment shared by every width/format variant. */
	slug: string;
	/** Spanish alt text describing what is literally visible, per §3.5 of the brief. */
	alt: string;
	/** Short visible label shown under the image. Centralized so every use of a render is consistent. */
	caption: string;
	/**
	 * CSS `object-position` to use if this image is ever shown inside a
	 * fixed-aspect box with `object-fit: cover`. Nothing in the site does
	 * that today — every render is laid out at its natural aspect ratio —
	 * but the value is centralized here so a future crop decision has one
	 * place to live instead of being re-guessed per component.
	 */
	objectPosition: string;
	/** Native (source) pixel dimensions, before any resizing. */
	native: RenderDimensions;
	/**
	 * Available width variants, ascending. Not every render has the same
	 * set — R3 is vertical and native-narrower than 2048px, so its top
	 * variant is its native width (1856px) instead of an upscaled 2048px.
	 */
	widths: number[];
	/** Measured pixel dimensions per generated width (source of truth for width/height attrs). */
	dimensions: Record<number, RenderDimensions>;
}

const FINAL_BASE_PATH = '/brand/renders/final';
const LEGACY_BASE_PATH = '/brand/renders';

/**
 * Required disclosure for digitally generated project renders.
 * Must render as accessible HTML text outside the bitmap (PROJECT_DECISIONS.md § Media).
 */
export const RENDER_DISCLOSURE =
	'Imágenes de proyecto. No corresponden a una sede en operación. Imagen ilustrativa generada digitalmente.';

export const renders: RenderAsset[] = [
	{
		id: 'r1',
		basePath: FINAL_BASE_PATH,
		slug: 'clavera-final-r1-overview',
		alt: 'Vista general de un hub CLAVERA: hilera de bicicletas en soportes verticales numerados, junto a una pared de lockers y un banco de madera.',
		caption: 'Vista general del hub',
		objectPosition: 'center',
		native: { width: 2752, height: 1536 },
		widths: [640, 960, 1280, 1600, 2048],
		dimensions: {
			640: { width: 640, height: 357 },
			960: { width: 960, height: 536 },
			1280: { width: 1280, height: 714 },
			1600: { width: 1600, height: 893 },
			2048: { width: 2048, height: 1143 },
		},
	},
	{
		id: 'r2',
		basePath: FINAL_BASE_PATH,
		slug: 'clavera-final-r2-storage',
		alt: 'Bicicletas en soportes verticales individuales numerados, cada uno anclado a la pared de un hub CLAVERA.',
		caption: 'Soportes verticales individuales',
		objectPosition: 'center',
		native: { width: 2528, height: 1696 },
		widths: [640, 960, 1280, 1600, 2048],
		dimensions: {
			640: { width: 640, height: 429 },
			960: { width: 960, height: 644 },
			1280: { width: 1280, height: 858 },
			1600: { width: 1600, height: 1073 },
			2048: { width: 2048, height: 1374 },
		},
	},
	{
		id: 'r3',
		basePath: FINAL_BASE_PATH,
		slug: 'clavera-final-r3-cleaning',
		alt: 'Zona de autolavado para bicicletas en un hub CLAVERA, con manguera, productos de limpieza y piso con desagüe.',
		caption: 'Zona de autolavado',
		// Vertical composition (native 1856×2304) — never force this into a
		// wide landscape object-fit: cover crop. Its top width variant is
		// its native width (1856px), not an upscaled 2048px.
		objectPosition: 'center',
		native: { width: 1856, height: 2304 },
		widths: [640, 960, 1280, 1600, 1856],
		dimensions: {
			640: { width: 640, height: 794 },
			960: { width: 960, height: 1191 },
			1280: { width: 1280, height: 1589 },
			1600: { width: 1600, height: 1986 },
			1856: { width: 1856, height: 2304 },
		},
	},
	{
		id: 'entrance',
		basePath: LEGACY_BASE_PATH,
		slug: 'clavera-brand-entrance-r3',
		alt: 'Ingreso de un hub CLAVERA, con puerta de acceso, panel de acceso digital y cámara de seguridad.',
		caption: 'Ingreso controlado',
		objectPosition: 'center',
		native: { width: 3712, height: 4608 },
		widths: [640, 1280, 1920],
		dimensions: {
			640: { width: 640, height: 794 },
			1280: { width: 1280, height: 1589 },
			1920: { width: 1920, height: 2383 },
		},
	},
	{
		id: 'r4',
		basePath: FINAL_BASE_PATH,
		slug: 'clavera-final-r4-lockers',
		alt: 'Lockers individuales en un hub CLAVERA, con uno abierto que muestra espacio para una silla portabebé de bicicleta.',
		caption: 'Lockers y espacio para silla de bebé',
		objectPosition: 'center',
		native: { width: 2528, height: 1696 },
		widths: [640, 960, 1280, 1600, 2048],
		dimensions: {
			640: { width: 640, height: 429 },
			960: { width: 960, height: 644 },
			1280: { width: 1280, height: 858 },
			1600: { width: 1600, height: 1073 },
			2048: { width: 2048, height: 1374 },
		},
	},
	{
		id: 'r5',
		basePath: FINAL_BASE_PATH,
		slug: 'clavera-final-r5-cargo',
		alt: 'Zona para bicicletas cargo y e-bikes de gran tamaño, con lugares delimitados a nivel de piso en un hub CLAVERA.',
		caption: 'Zona cargo y e-bikes',
		objectPosition: 'center',
		native: { width: 2752, height: 1536 },
		widths: [640, 960, 1280, 1600, 2048],
		dimensions: {
			640: { width: 640, height: 357 },
			960: { width: 960, height: 536 },
			1280: { width: 1280, height: 714 },
			1600: { width: 1600, height: 893 },
			2048: { width: 2048, height: 1143 },
		},
	},
	{
		id: 'r6',
		basePath: FINAL_BASE_PATH,
		slug: 'clavera-final-r6-zoning',
		alt: 'Esquema isométrico de zonificación de un hub CLAVERA: ingreso, ocho lugares numerados de guarda, zona cargo, lockers y sala técnica.',
		caption: 'Esquema de zonificación',
		// Square, full-scene diagram — must render uncropped so every
		// zone in the diagram stays legible.
		objectPosition: 'center',
		native: { width: 2048, height: 2048 },
		widths: [640, 960, 1280, 1600, 2048],
		dimensions: {
			640: { width: 640, height: 640 },
			960: { width: 960, height: 960 },
			1280: { width: 1280, height: 1280 },
			1600: { width: 1600, height: 1600 },
			2048: { width: 2048, height: 2048 },
		},
	},
];

export function getRender(id: RenderAsset['id']): RenderAsset {
	const render = renders.find((item) => item.id === id);
	if (!render) {
		throw new Error(`Unknown render id: ${id}`);
	}
	return render;
}

export function avifSrcset(render: RenderAsset): string {
	return render.widths.map((w) => `${render.basePath}/${render.slug}-${w}.avif ${w}w`).join(', ');
}

export function webpSrcset(render: RenderAsset): string {
	return render.widths.map((w) => `${render.basePath}/${render.slug}-${w}.webp ${w}w`).join(', ');
}

export function webpSrc(render: RenderAsset, width?: number): string {
	const w = width ?? render.widths[Math.floor(render.widths.length / 2)];
	return `${render.basePath}/${render.slug}-${w}.webp`;
}

export const logo = {
	src: '/brand/logo.svg',
	alt: 'CLAVERA',
};
