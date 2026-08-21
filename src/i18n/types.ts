/**
 * The copy contract.
 *
 * Every locale file must satisfy this interface exactly, so a missing or
 * renamed string is a TypeScript error rather than a silently untranslated
 * fragment on a live page. Spanish is the canonical authority; English and
 * Russian are working translations that must preserve the same product
 * meaning and the same legal constraints.
 */

export interface RenderCopy {
	/** Literal description of what is visible, per brief §3.5. */
	alt: string;
	/** Short visible label under the image. */
	caption: string;
}

export interface PillarCopy {
	n: string;
	title: string;
	copy: string;
}

export interface StepCopy {
	n: string;
	title: string;
	copy: string;
}

export interface FaqCopy {
	q: string;
	a: string;
}

export interface FigureCopy {
	value: string;
	unit: string;
	note: string;
}

export interface ComparisonRowCopy {
	label: string;
	values: [string, string, string];
}

export interface Copy {
	meta: {
		title: string;
		description: string;
		ogTitle: string;
	};
	a11y: {
		skipLink: string;
		homeLabel: string;
		languageNavLabel: string;
		ownersNavLabel: string;
		legalNavLabel: string;
	};
	header: {
		note: string;
		cta: string;
	};
	hero: {
		eyebrow: string;
		headingHtml: string;
		lede: string;
		ctaPrimary: string;
		ctaSecondary: string;
		facts: string[];
	};
	problem: {
		index: string;
		rail: string;
		eyebrow: string;
		statementLead: string;
		statementDim: string;
		argument: string;
		loop: { label: string; copy: string }[];
		close: string;
	};
	solution: {
		index: string;
		rail: string;
		eyebrow: string;
		heading: string;
		lede: string;
		pillars: PillarCopy[];
	};
	works: {
		index: string;
		rail: string;
		eyebrow: string;
		heading: string;
		steps: StepCopy[];
	};
	vehicles: {
		index: string;
		rail: string;
		eyebrow: string;
		heading: string;
		items: string[];
		note: string;
	};
	security: {
		index: string;
		rail: string;
		eyebrow: string;
		heading: string;
		lede: string;
		items: string[];
	};
	comparison: {
		index: string;
		rail: string;
		eyebrow: string;
		heading: string;
		tableCaption: string;
		columns: [string, string, string];
		rowHeader: string;
		rows: ComparisonRowCopy[];
		scrollHint: string;
		note: string;
	};
	hub: {
		index: string;
		rail: string;
		eyebrow: string;
		heading: string;
		lede: string;
		legendTitle: string;
		legend: string[];
	};
	cases: {
		index: string;
		rail: string;
		eyebrow: string;
		heading: string;
		items: string[];
	};
	zones: {
		index: string;
		rail: string;
		eyebrow: string;
		heading: string;
		lede: string;
		/** Barrio names are never translated (brief §5.3). */
		items: string[];
		note: string;
	};
	founders: {
		index: string;
		rail: string;
		eyebrow: string;
		heading: string;
		figures: [FigureCopy, FigureCopy, FigureCopy];
		offerStrong: string;
		offerRest: string;
		note: string;
		cta: string;
		disclaimer: string;
	};
	faq: {
		index: string;
		rail: string;
		eyebrow: string;
		heading: string;
		items: FaqCopy[];
	};
	survey: {
		eyebrow: string;
		heading: string;
		note: string;
		cta: string;
	};
	footer: {
		claim: string;
		contactTitle: string;
		spacesTitle: string;
		legalTitle: string;
		proposeSpace: string;
		forDevelopers: string;
		privacy: string;
		terms: string;
		cookies: string;
		rights: string;
		location: string;
		languageTitle: string;
		/**
		 * Spanish-primacy notice. Required on non-canonical locales
		 * (brief §5.3); empty string on `es`.
		 */
		translationNotice: string;
	};
	media: {
		/** Mandatory generated-render disclosure, verbatim per brief (blocker). */
		disclosure: string;
		renders: {
			r1: RenderCopy;
			r2: RenderCopy;
			r3: RenderCopy;
			entrance: RenderCopy;
			r4: RenderCopy;
			r5: RenderCopy;
			r6: RenderCopy;
		};
	};
}
