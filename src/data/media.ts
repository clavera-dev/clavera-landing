/**
 * Central media registry.
 *
 * Every place in the site that needs a CLAVERA render or media placeholder
 * reads from here instead of hard-coding a path. When the final master
 * renders or real hub photography arrive, update this file only.
 *
 * Source assets: public/brand/renders/ (see docs/design-system/renders-README.md).
 * Approved content per render: PROJECT_DECISIONS.md § "Approved final render set".
 */

export const RENDER_WIDTHS = [640, 1280, 1920] as const;
export type RenderWidth = (typeof RENDER_WIDTHS)[number];

/**
 * PROJECT_DECISIONS.md approves R1, R2, R4, R5, R6 and defines R3 as the
 * "self-service bicycle cleaning zone" — but no asset for that content has
 * been delivered. The one file that used to be labelled r3 actually shows
 * the hub entrance, so it is kept under the honest id `entrance` and must
 * never be presented as R3 or as the cleaning zone. It is used only in the
 * security/access section, where an entrance shot is genuinely on-topic.
 * The R3 slot in the hub gallery renders a neutral MediaPlaceholder instead.
 */
export interface RenderAsset {
	id: 'r1' | 'r2' | 'entrance' | 'r4' | 'r5' | 'r6';
	/** Filename fragment shared by every width/format variant. */
	slug: string;
	/** Spanish alt text describing what is literally visible, per §3.5 of the brief. */
	alt: string;
	/** Short visible label shown under the image. Centralized so every use of a render is consistent. */
	caption: string;
	/** Pixel dimensions per delivered width, used to set width/height and avoid layout shift. */
	dimensions: Record<RenderWidth, { width: number; height: number }>;
}

const RENDER_BASE_PATH = '/brand/renders';

/**
 * Required disclosure for digitally generated project renders.
 * Must render as accessible HTML text outside the bitmap (PROJECT_DECISIONS.md § Media).
 */
export const RENDER_DISCLOSURE =
	'Imágenes de proyecto. No corresponden a una sede en operación. Imagen ilustrativa generada digitalmente.';

export const renders: RenderAsset[] = [
	{
		id: 'r1',
		slug: 'clavera-brand-overview-r1',
		alt: 'Vista general de un hub CLAVERA: hilera de bicicletas en soportes verticales individuales junto a una pared de lockers, con pasillo de circulación.',
		caption: 'Vista general del hub',
		dimensions: {
			640: { width: 640, height: 357 },
			1280: { width: 1280, height: 714 },
			1920: { width: 1920, height: 1072 },
		},
	},
	{
		id: 'r2',
		slug: 'clavera-brand-rack-r2',
		alt: 'Bicicleta en un soporte vertical individual anclado a la pared, con el lugar contiguo libre.',
		caption: 'Soporte vertical individual',
		dimensions: {
			640: { width: 640, height: 429 },
			1280: { width: 1280, height: 859 },
			1920: { width: 1920, height: 1288 },
		},
	},
	{
		id: 'entrance',
		slug: 'clavera-brand-entrance-r3',
		alt: 'Ingreso de un hub CLAVERA, con puerta de acceso, panel de acceso digital y cámara de seguridad.',
		caption: 'Ingreso controlado',
		dimensions: {
			640: { width: 640, height: 794 },
			1280: { width: 1280, height: 1589 },
			1920: { width: 1920, height: 2383 },
		},
	},
	{
		id: 'r4',
		slug: 'clavera-brand-lockers-r4',
		alt: 'Fila de lockers individuales para casco y equipo, con uno abierto mostrando su interior.',
		caption: 'Lockers para casco y equipo',
		dimensions: {
			640: { width: 640, height: 429 },
			1280: { width: 1280, height: 859 },
			1920: { width: 1920, height: 1288 },
		},
	},
	{
		id: 'r5',
		slug: 'clavera-brand-cargo-r5',
		alt: 'Zona para e-bikes y bicicletas cargo, con soportes independientes a nivel de piso.',
		caption: 'Zona para e-bike y cargo',
		dimensions: {
			640: { width: 640, height: 357 },
			1280: { width: 1280, height: 714 },
			1920: { width: 1920, height: 1072 },
		},
	},
	{
		id: 'r6',
		slug: 'clavera-brand-zoning-r6',
		alt: 'Esquema isométrico de zonificación de un hub CLAVERA: ingreso, guarda estándar, zona cargo y lockers.',
		caption: 'Esquema de zonificación',
		dimensions: {
			640: { width: 640, height: 640 },
			1280: { width: 1280, height: 1280 },
			1920: { width: 1920, height: 1920 },
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
	return RENDER_WIDTHS.map((w) => `${RENDER_BASE_PATH}/${render.slug}-${w}.avif ${w}w`).join(', ');
}

export function webpSrcset(render: RenderAsset): string {
	return RENDER_WIDTHS.map((w) => `${RENDER_BASE_PATH}/${render.slug}-${w}.webp ${w}w`).join(', ');
}

export function webpSrc(render: RenderAsset, width: RenderWidth = 1280): string {
	return `${RENDER_BASE_PATH}/${render.slug}-${width}.webp`;
}

export const logo = {
	src: '/brand/logo.svg',
	alt: 'CLAVERA',
};
