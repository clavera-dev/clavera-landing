/**
 * Shape shared by the three legal documents (privacy, terms, cookies), in
 * every locale.
 *
 * ES is the legal authority (CLAVERA_Legal_Spec_v3_0_received.md §2.2, §6.6,
 * §7.2, as patched by CLAVERA_Dev_Handoff_Beta_v1_1.md §5 for the privacy
 * channels update). EN and RU are courtesy translations derived from the
 * Spanish text — see PROJECT_DECISIONS.md. A section's `id` is its numbered
 * heading (e.g. "7" for privacy's cross-border-transfer point) and must stay
 * aligned across all three locales: the numbering itself is part of the
 * authoritative text and may not be renumbered in translation.
 */
export interface LegalSection {
	/** Numbering as printed in the authoritative ES text (e.g. "7"). */
	id: string;
	heading: string;
	/** Rendered first, as ordinary paragraphs, in order. */
	paragraphs?: string[];
	/** Rendered after `paragraphs`, as an unordered list (provider bullets, etc). */
	list?: string[];
	/** Rendered after `list`, as a lettered list a), b), c)… (privacy §4, Finalidades). */
	letteredList?: string[];
	/** Rendered last, after any list — closing text that follows one (privacy §4's final sentence). */
	closingParagraphs?: string[];
}

export interface LegalDocument {
	title: string;
	sections: LegalSection[];
}

export type LegalDocumentByLocale = Record<'es' | 'en' | 'ru', LegalDocument>;
