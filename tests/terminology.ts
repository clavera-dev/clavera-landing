/**
 * Appendix В — terminology dictionary (brief lines 1633–1671).
 *
 * Tier-1 prohibitions apply in EVERY language (brief §5.3 and Appendix В), so
 * every term below is scanned against every locale: the Spanish page must not
 * contain `bike parking` any more than the English one must not contain
 * `estacionamiento`.
 *
 * Latin-script terms are matched on word boundaries. Cyrillic terms are matched
 * as stems by substring, because `\b` is unreliable against Cyrillic in
 * JavaScript regular expressions — the stricter match is the safer error.
 */

export interface ForbiddenTerm {
	/** Pattern source, used as the readable label in failures. */
	label: string;
	pattern: RegExp;
}

const latin = (term: string): ForbiddenTerm => ({
	label: term,
	pattern: new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'iu'),
});

/** Cyrillic stem: substring match, case-insensitive. */
const cyrillic = (stem: string): ForbiddenTerm => ({
	label: stem,
	pattern: new RegExp(stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu'),
});

/** Appendix В.1 — Tier 1, forbidden everywhere, in all languages. */
export const TIER1: ForbiddenTerm[] = [
	// ES
	latin('estacionamiento'),
	latin('estacionamientos'),
	latin('playa de estacionamiento'),
	latin('garaje'),
	latin('garajes'),
	latin('bicicletero municipal'),
	latin('guardacoches'),
	latin('tarifa por hora'),
	// Appendix В.1 lists this row as "tarifa por hora, por hora": the bare
	// phrase is Tier 1 on its own, not only inside `tarifa por hora`.
	latin('por hora'),
	// EN
	latin('bike parking'),
	latin('parking'),
	latin('parking lot'),
	latin('garage'),
	latin('garages'),
	latin('car space'),
	latin('car spaces'),
	latin('hourly rate'),
	latin('municipal bike rack'),
	latin('valet'),
	// RU
	cyrillic('велопарковк'),
	cyrillic('парковк'),
	cyrillic('парковщик'),
	cyrillic('стоянк'),
	cyrillic('гараж'),
	cyrillic('машиномест'),
	cyrillic('почасов'),
	cyrillic('тариф в час'),
];

/**
 * `cochera` / `кочера` are Tier 1 as a self-description but form the Tier-2
 * comparison terms, so they are scanned separately after the allowlist below
 * has been removed from the corpus.
 */
export const TIER1_COMPARISON_ROOTS: ForbiddenTerm[] = [
	latin('cochera'),
	latin('cocheras'),
	cyrillic('кочер'),
];

/**
 * Appendix В.2 — the Tier-2 column-header phrases, in the owner handoff v1.1
 * B3 wording ("(alternativa)" appended).
 *
 * Each is permitted ONLY as the exact text of an S7 `<th scope="col">`, and
 * only with the lawyer's written approval, which is still outstanding for all
 * three languages. Appearing elsewhere inside `#comparacion` — a cell, the
 * caption, the note, a heading — is a violation, which is why
 * `findHeaderPlacementViolations` checks the DOM location rather than mere
 * membership of the S7 block.
 */
export const TIER2_COLUMN_HEADERS: string[] = [
	'Cochera de auto (alternativa)',
	'Car garage (alternative)',
	'Автомобильная кочера (альтернатива)',
];

/*
  AUTHORITY CONFLICT — the mandatory S7 line (owner handoff v1.1 B3).

  B3 requires a line directly under the table, per locale, stating that
  CLAVERA is not a `cochera`/`estacionamiento` (ES), a `car garage`/`car park`
  (EN), or a `кочера`/`стоянка` (RU). Those words are Tier 1 under Appendix
  В.1, and the handoff's own §6.1 checklist demands zero matches for
  `estacionamiento`, `garage` and `стоянк` — while exempting only
  `cochera`/`кочера` "in the (alternativa) column and the line under it".

  B3 is the specific P0 text, so each line ships verbatim, and this exception
  exists to match it. It is deliberately the ENTIRE sentence, per locale, not
  the bare words: any other occurrence of those terms anywhere on the page
  still fails, and each sentence may appear only on its own locale, only as
  the full text of `#comparacion .comparison__note`. Resolution is an
  owner/lawyer question (PROJECT_DECISIONS.md, reconciliation row 9).

  This replaces the earlier single Spanish `cocheras` market-note exception,
  whose sentence B3 removes.
*/
export const S7_DISCLAIMER_EXCEPTIONS: Record<'es' | 'en' | 'ru', string> = {
	es: 'CLAVERA no es una cochera ni un estacionamiento: es un servicio de depósito y custodia de bicicletas y dispositivos de movilidad personal por membresía, con lugar asignado.',
	en: 'CLAVERA is not a car garage or a car park: it is a membership-based storage and safekeeping service for bicycles and personal mobility devices, with an assigned space.',
	ru: 'CLAVERA — не кочера и не стоянка: это сервис хранения велосипедов и устройств персональной мобильности по подписке, с закреплённым местом.',
};

/**
 * Everything stripped from a corpus before Tier-1 scanning: the permitted
 * column headers plus the three scoped S7 disclaimer sentences.
 */
export const TIER2_S7_ALLOWLIST: string[] = [
	...TIER2_COLUMN_HEADERS,
	...Object.values(S7_DISCLAIMER_EXCEPTIONS),
];

/** Appendix В.4 — forbidden promises, all languages. Literal-string subset. */
export const FORBIDDEN_PROMISES: ForbiddenTerm[] = [
	latin('responsabilidad total'),
	latin('total liability'),
	cyrillic('полная ответственность'),
	latin('garantía contra robo'),
	latin('theft guarantee'),
	cyrillic('гарантия от кражи'),
	latin('climatizado'),
	latin('climate-controlled'),
	cyrillic('климат-контроль'),
];

/*
  24/7 is no longer banned outright. The owner handoff v1.1 (§3.1, §6.2)
  permits it ONLY in S3 pillar 02 and in the access-hours FAQ, both framed as
  a planned property — never in meta, title or hero. Placement is enforced by
  `find247PlacementViolations` below, not by the promise list above.
*/
export const ALWAYS_ON_TERMS: ForbiddenTerm[] = [latin('24/7'), cyrillic('круглосуточ')];

/** Brand names that must never reach public output (PROJECT_DECISIONS.md). */
export const FORBIDDEN_BRANDS: ForbiddenTerm[] = [latin('monTEK'), latin('Hamax')];

function escapeRegExp(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Builds a whole-phrase matcher for an allowlist entry.
 *
 * Case-insensitive on purpose: the S7 column headers are rendered with
 * `text-transform: uppercase`, and `innerText` returns the transformed text,
 * so a case-sensitive strip would leave "АВТОМОБИЛЬНАЯ КОЧЕРА" in the corpus
 * and report it as an unapproved Tier-1 usage.
 *
 * Bounded on purpose too: a plain substring strip would remove `Car garage`
 * from inside `car garages`, leaving a stray "s" and silently permitting the
 * plural — which Appendix В.2 does not permit. The lookarounds reject a match
 * that is glued to another letter or digit, and work for Cyrillic as well as
 * Latin, unlike `\b`.
 */
function allowlistPattern(phrase: string): RegExp {
	return new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(phrase)}(?![\\p{L}\\p{N}])`, 'giu');
}

/** Removes every allowlisted Tier-2 phrase from a corpus before scanning. */
export function stripAllowlisted(corpus: string): string {
	let out = corpus;
	for (const phrase of TIER2_S7_ALLOWLIST) {
		out = out.replace(allowlistPattern(phrase), ' ');
	}
	return out;
}

/** Case-insensitive, whole-phrase occurrence count. */
export function countOccurrences(corpus: string, phrase: string): number {
	return corpus.match(allowlistPattern(phrase))?.length ?? 0;
}

export interface HeaderPlacementInput {
	/** Whole-document corpus: visible text plus metadata plus alt/ARIA text. */
	fullText: string;
	/** Exact rendered text of every `#comparacion th[scope="col"]`. */
	columnHeaders: string[];
}

function normalise(value: string): string {
	return value.replace(/\s+/g, ' ').trim().toLocaleLowerCase();
}

/**
 * Enforces Appendix В.2 at the DOM location, not merely inside the S7 block.
 *
 * Each Tier-2 phrase is permitted only as the entire text of an S7
 * `<th scope="col">`. So every occurrence anywhere in the document must be
 * accounted for by exactly such a header. If the phrase is also dropped into a
 * cell, the caption, the note or a heading, the occurrence count exceeds the
 * number of exact headers and the placement is rejected — which a "does it
 * appear somewhere in #comparacion" check would happily allow.
 *
 * It also rejects the reverse: a header reworded to merely contain the phrase
 * (`Car garage space`) is not an exact header, so its occurrence is unmatched.
 */
export function findHeaderPlacementViolations(input: HeaderPlacementInput): string[] {
	const problems: string[] = [];

	for (const phrase of TIER2_COLUMN_HEADERS) {
		const occurrences = countOccurrences(input.fullText, phrase);
		if (occurrences === 0) continue;

		const exactHeaders = input.columnHeaders.filter(
			(header) => normalise(header) === normalise(phrase),
		).length;

		if (occurrences !== exactHeaders) {
			problems.push(
				`"${phrase}": ${occurrences} occurrence(s) in the document but ` +
					`${exactHeaders} exact <th scope="col"> header(s)`,
			);
		}
	}

	return problems;
}

export interface NoteExceptionInput {
	/** Whole-document corpus: visible text plus metadata plus alt/ARIA text. */
	fullText: string;
	/**
	 * Whitespace-normalised text of `#comparacion .comparison__note`, or null
	 * when that element does not exist.
	 */
	noteText: string | null;
	/** The locale being checked; its own sentence is the only one allowed. */
	locale: 'es' | 'en' | 'ru';
}

/**
 * Enforces the S7 disclaimer exceptions at their exact DOM location.
 *
 * Because each is a legal carve-out (see the AUTHORITY CONFLICT block above),
 * it is pinned rather than merely tolerated:
 *
 *   The locale's own sentence occurs exactly once in the entire document, the
 *   note element exists, and its complete text IS that sentence. Deleting it,
 *   rewording it, moving it, or repeating it anywhere else all fail.
 *
 *   The other locales' sentences occur zero times.
 */
export function findNoteExceptionViolations(input: NoteExceptionInput): string[] {
	const problems: string[] = [];

	for (const [locale, sentence] of Object.entries(S7_DISCLAIMER_EXCEPTIONS)) {
		const occurrences = countOccurrences(input.fullText, sentence);
		if (locale !== input.locale) {
			if (occurrences !== 0) {
				problems.push(
					`the ${locale} S7 disclaimer must not appear on this locale: ${occurrences} occurrence(s)`,
				);
			}
			continue;
		}
		if (occurrences !== 1) {
			problems.push(`the S7 disclaimer must occur exactly once, found ${occurrences} occurrence(s)`);
		}
	}

	if (input.noteText === null) {
		problems.push('#comparacion .comparison__note is missing');
		return problems;
	}

	if (input.noteText !== S7_DISCLAIMER_EXCEPTIONS[input.locale]) {
		problems.push(`note text is not the S7 disclaimer verbatim: "${input.noteText}"`);
	}

	return problems;
}

export interface AlwaysOnPlacementInput {
	/** Metadata and document title. */
	metadata: string;
	/** innerText/textContent of the hero section. */
	hero: string;
	/** textContent of the whole body. */
	body: string;
	/** textContent of S3 pillar 02 plus the access-hours FAQ item. */
	permitted: string;
}

/**
 * 24/7 (and Russian «круглосуточ…») may appear only in S3 pillar 02 and the
 * access-hours FAQ (owner handoff v1.1 §6.2): never in metadata, title or
 * hero, and no occurrence anywhere else in the body.
 */
export function find247PlacementViolations(input: AlwaysOnPlacementInput): string[] {
	const problems: string[] = [];
	for (const term of ALWAYS_ON_TERMS) {
		if (term.pattern.test(input.metadata)) problems.push(`"${term.label}" in metadata/title`);
		if (term.pattern.test(input.hero)) problems.push(`"${term.label}" in the hero`);

		const global = new RegExp(term.pattern.source, 'giu');
		const inBody = input.body.match(global)?.length ?? 0;
		const inPermitted = input.permitted.match(global)?.length ?? 0;
		if (inBody !== inPermitted) {
			problems.push(
				`"${term.label}": ${inBody} occurrence(s) in the body, ${inPermitted} in the permitted places`,
			);
		}
	}
	return problems;
}

export function findViolations(corpus: string, terms: ForbiddenTerm[]): string[] {
	return terms.filter((t) => t.pattern.test(corpus)).map((t) => t.label);
}
