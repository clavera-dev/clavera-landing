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
		languageNavFooterLabel: string;
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
		/** No 24/7, no cameras, no "a minutos" (handoff v1.1 B5). */
		lede: string;
		ctaSecondary: string;
		facts: string[];
	};
	/**
	 * The zone selector, used in the hero and in S10 (handoff v1.1 §3.2). Zone
	 * names come from src/config/candidate-zones.ts and are never translated.
	 */
	zoneSelector: {
		heading: string;
		caption: string;
		placeholder: string;
		cta: string;
		/**
		 * Shown when the search matches no zone. Owner-authored copy (M4 spec
		 * decision D7); deliberately absent until supplied, and the selector
		 * renders no empty-state element without it.
		 */
		empty?: string;
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
		/**
		 * Identifies the properties as planned properties of the future service,
		 * not of an operating location. Pillar 02's 24/7 claim depends on it.
		 */
		plannedNote: string;
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
		/** Mixed removable/integrated battery handling (owner response v1.2 §1.4). */
		batteryNote: string;
		/** Lockers, basic tools and seasonal storage are under evaluation (owner response v1.2 §1.5). */
		evaluatingNote: string;
	};
	security: {
		index: string;
		rail: string;
		eyebrow: string;
		heading: string;
		lede: string;
		items: string[];
		/**
		 * Access logging and identification are planned properties of the
		 * future service. No hub is in operation, and this must not read as a
		 * description of one. No cameras (handoff v1.1 B5).
		 */
		plannedNote: string;
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
		/**
		 * The mandatory line under the table stating what CLAVERA is not
		 * (handoff v1.1 B3). Verbatim; never collapsed.
		 */
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
		/**
		 * Under the S10 selector: no location chosen yet, and choosing a zone
		 * implies no commitment to open, no date and no availability.
		 */
		disclaimer: string;
	};
	/**
	 * "Sumate al piloto" (handoff v1.1 B4), which replaces the Socios
	 * Fundadores block. No founding-offer number, discount or price line.
	 */
	founders: {
		index: string;
		rail: string;
		eyebrow: string;
		heading: string;
		lede: string;
		/** Preliminary interest: reserves nothing, no contract, no payment. */
		note: string;
		/** Shown before the survey link only when the Avisame form is live. */
		surveyPrompt: string;
		surveyCta: string;
	};
	faq: {
		index: string;
		rail: string;
		eyebrow: string;
		heading: string;
		items: FaqCopy[];
	};
	/**
	 * The short pilot-interest ("Avisame") form.
	 *
	 * Non-binding: it reserves no space, creates no contract, accepts no
	 * payment, and promises no admission to the pilot. While its URL is `null`
	 * in src/config/typeform.ts nothing is rendered for it (handoff v1.1 B4).
	 */
	pilot: {
		/** Shown only once a real destination exists for this locale. */
		cta: string;
	};
	survey: {
		eyebrow: string;
		heading: string;
		note: string;
		cta: string;
		/**
		 * Stated next to every survey link whose Typeform is not written in
		 * this locale's language. Empty on locales whose survey matches the
		 * page language — only `en` carries it, because the English beta uses
		 * the Spanish survey (`src/config/typeform.ts`).
		 */
		languageNotice: string;
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
		 * Interim marker for footer entries whose route does not exist yet.
		 * Those entries render as plain text rather than as links, so the beta
		 * candidate contains no clickable 404. It does not discharge the
		 * underlying obligation: `/privacidad`, `/terminos` and `/cookies`
		 * remain mandatory blockers for real public deployment.
		 */
		pendingNote: string;
		/**
		 * Shown while `whatsappHref()` returns null (src/config/contact.ts). Plain
		 * text — never a `wa.me` link, a dummy number or a disabled control.
		 */
		whatsappPending: string;
		/**
		 * Shown while `telHref()` returns null (src/config/contact.ts). Plain
		 * text — never a `tel:` link, a dummy number or a disabled control.
		 */
		phonePending: string;
		/*
		  The controller formula and the Spanish-primacy clause are the same
		  Spanish text on every locale, so they live in src/config/legal.ts
		  rather than here.
		*/
	};
	/**
	 * Chrome shared by the three legal pages (/privacidad, /terminos,
	 * /cookies). The document body itself (title, sections) lives in
	 * src/content/legal, not here, because it is long, numbered, and shared
	 * across the three route pairs rather than per-section product copy.
	 */
	legalPage: {
		backToHome: string;
		lastUpdatedLabel: string;
		/** Shown while src/config/legal.ts LEGAL_LAST_UPDATED is null. */
		lastUpdatedPending: string;
		versionLabel: string;
		/**
		 * Shown only on `en` and `ru`: states this is a courtesy translation
		 * and the Spanish version alone is legally valid. Empty on `es`, whose
		 * page already carries that clause in its own body text (Terms §10).
		 */
		courtesyNotice: string;
		/** Link label next to `courtesyNotice`, pointing at the ES equivalent. */
		readInSpanish: string;
	};
	media: {
		/** Mandatory generated-render disclosure, verbatim per brief (blocker). */
		disclosure: string;
		renders: {
			r1: RenderCopy;
			r2: RenderCopy;
			/** Not rendered since handoff v1.1 §3.5; kept so reinstating it is one line. */
			r3: RenderCopy;
			entrance: RenderCopy;
			r4: RenderCopy;
			r5: RenderCopy;
			r6: RenderCopy;
		};
	};
}
