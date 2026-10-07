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
	 * The mandatory S7 line under the table (owner handoff v1.1 B3), verbatim.
	 * It carries Tier-1 words by the handoff's own instruction, so it is the
	 * one exact-sentence exception for this locale (tests/terminology.ts).
	 */
	s7Disclaimer: string;
	/**
	 * The public Typeform research survey this locale must link to, without
	 * its fragment. Mirrors src/config/typeform.ts and is written out literally
	 * rather than imported, so a wrong edit to the config fails the suite
	 * instead of travelling through it.
	 */
	surveyUrl: string;
	/**
	 * The exact survey href with no zone chosen: base URL plus the handoff
	 * v1.1 §4.1 fragment attribution.
	 */
	surveyHref: string;
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
		s7Disclaimer:
			'CLAVERA no es una cochera ni un estacionamiento: es un servicio de depósito y custodia de bicicletas y dispositivos de movilidad personal por membresía, con lugar asignado.',
		surveyUrl: 'https://claveraar.typeform.com/ARGCABA',
		surveyHref:
			'https://claveraar.typeform.com/ARGCABA#recruitment_source=clavera_ar&campaign=site_es&consent_v=2026-09&survey_version=ARGCABA_ES_v2_0&language=es',
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
		s7Disclaimer:
			'CLAVERA is not a car garage or a car park: it is a membership-based storage and safekeeping service for bicycles and personal mobility devices, with an assigned space.',
		// Beta compromise: English uses the SPANISH survey, and says so.
		surveyUrl: 'https://claveraar.typeform.com/ARGCABA',
		surveyHref:
			'https://claveraar.typeform.com/ARGCABA#recruitment_source=clavera_ar&campaign=site_en&consent_v=2026-09&survey_version=ARGCABA_ES_v2_0&language=es',
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
		s7Disclaimer:
			'CLAVERA — не кочера и не стоянка: это сервис хранения велосипедов и устройств персональной мобильности по подписке, с закреплённым местом.',
		surveyUrl: 'https://claveraar.typeform.com/latam',
		surveyHref:
			'https://claveraar.typeform.com/latam#recruitment_source=clavera_ar&campaign=site_ru',
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
