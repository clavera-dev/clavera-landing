/** Shared locale table for the test suite. Mirrors src/i18n/config.ts. */
export interface TestLocale {
	key: 'es' | 'en' | 'ru';
	path: string;
	lang: string;
	hreflang: string;
	/** A string that must appear in the rendered page for this locale. */
	marker: string;
	/**
	 * The mandatory generated-render disclosure, exactly as it must appear in
	 * BOTH `<figcaption>` and `alt` (brief S8, blocker).
	 */
	disclosure: string;
	/**
	 * True only for the canonical Spanish route, the sole locale carrying the
	 * Tier-2 market-reference note exception.
	 */
	carriesNoteException: boolean;
	/**
	 * The public Typeform research survey this locale must link to. Mirrors
	 * src/config/typeform.ts and is written out literally rather than imported,
	 * so a wrong edit to the config fails the suite instead of travelling
	 * through it.
	 */
	surveyUrl: string;
	/**
	 * The exact disclosure that must sit next to every survey link when the
	 * survey is not in this locale's language, or null when the survey does
	 * match and no disclosure may appear.
	 */
	surveyLanguageNotice: string | null;
}

export const LOCALES: TestLocale[] = [
	{
		key: 'es',
		path: '/',
		lang: 'es-AR',
		hreflang: 'es-AR',
		marker: 'Tu bici merece',
		disclosure:
			'Imágenes de proyecto. No corresponden a una sede en operación. Imagen ilustrativa generada digitalmente.',
		carriesNoteException: true,
		surveyUrl: 'https://claveraar.typeform.com/ARGCABA',
		surveyLanguageNotice: null,
	},
	{
		key: 'en',
		path: '/en/',
		lang: 'en',
		hreflang: 'en',
		marker: 'Your bike deserves',
		disclosure:
			'Project renderings. They do not depict an operating facility. Illustrative image generated digitally.',
		carriesNoteException: false,
		// Beta compromise: English uses the SPANISH survey, and says so.
		surveyUrl: 'https://claveraar.typeform.com/ARGCABA',
		surveyLanguageNotice: 'The survey is in Spanish.',
	},
	{
		key: 'ru',
		path: '/ru/',
		lang: 'ru',
		hreflang: 'ru',
		marker: 'Твой велосипед',
		disclosure:
			'Изображения проекта. Не соответствуют действующему объекту. Иллюстрация, созданная цифровым способом.',
		carriesNoteException: false,
		surveyUrl: 'https://claveraar.typeform.com/latam',
		surveyLanguageNotice: null,
	},
];

/** Structural viewport matrix required by the execution plan (M3). */
export const VIEWPORTS = [
	{ name: '1440', width: 1440, height: 900 },
	{ name: '1280', width: 1280, height: 900 },
	{ name: '1100', width: 1100, height: 900 },
	{ name: '1024', width: 1024, height: 768 },
	{ name: '768', width: 768, height: 1024 },
	{ name: '375', width: 375, height: 812 },
];

/** Subset used for diagnostic screenshots. */
export const SCREENSHOT_VIEWPORTS = VIEWPORTS.filter((v) => ['1440', '768', '375'].includes(v.name));
