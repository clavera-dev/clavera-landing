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
 * Appendix В.2 — the Tier-2 column-header phrases.
 *
 * Each is permitted ONLY as the exact text of an S7 `<th scope="col">`
 * ("заголовок колонки таблицы S7"), and only with the lawyer's written
 * approval, which is still outstanding for all three languages. Appearing
 * elsewhere inside `#comparacion` — a cell, the caption, the note, a heading —
 * is a violation, which is why `findHeaderPlacementViolations` checks the DOM
 * location rather than mere membership of the S7 block.
 *
 * The English and Russian market-reference notes are neutral and carry no
 * Tier-2 term, so no declined or plural form appears here.
 */
export const TIER2_COLUMN_HEADERS: string[] = [
	'Cochera de auto',
	'Car garage',
	'Автомобильная кочера',
];

/*
  AUTHORITY CONFLICT — canonical Spanish market-reference note.

  The brief contradicts itself. §S7 note 2 (line 350) says the word `cochera`
  is used "только как заголовок колонки и только в этой таблице", and
  Appendix В.2 names the column header as the sole permitted location. But the
  brief's own approved S7 copy (line 345) reads:

      Valores de referencia de mercado para cocheras en CABA, {mes} 2026.

  which uses `cocheras` in the NOTE, not the column header.

  The brief is the authority for canonical Spanish copy, so the sentence is
  published verbatim and this exception exists to match it. The exception is
  deliberately the entire sentence, not the bare word: any other occurrence of
  `cochera`/`cocheras` anywhere on the page still fails. English and Russian
  get no equivalent exception — their notes are neutral.

  Resolution is a lawyer question, tracked as an outstanding blocker.
*/
export const TIER2_NOTE_EXCEPTION =
	'Valores de referencia de mercado para cocheras en CABA, agosto 2026.';

/**
 * Everything stripped from a corpus before Tier-1 scanning: the permitted
 * column headers plus the one scoped Spanish note sentence.
 */
export const TIER2_S7_ALLOWLIST: string[] = [...TIER2_COLUMN_HEADERS, TIER2_NOTE_EXCEPTION];

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
	latin('24/7'),
	cyrillic('круглосуточ'),
];

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
	/** True only for the canonical Spanish route, which ships the exception. */
	expectPresent: boolean;
}

/**
 * Enforces the one Tier-2 note exception at its exact DOM location.
 *
 * The exception exists solely because the brief's own canonical Spanish S7
 * copy uses `cocheras` in the market-reference note while §S7 note 2 and
 * Appendix В.2 restrict the term to the column header (see the AUTHORITY
 * CONFLICT block above). Because it is a legal carve-out, it is pinned rather
 * than merely tolerated:
 *
 *   Spanish route — the sentence occurs exactly once in the entire document,
 *   the note element exists, and its complete text IS that sentence. Deleting
 *   it, rewording it, moving it, or repeating it anywhere else all fail.
 *
 *   English and Russian routes — the sentence occurs zero times. Those locales
 *   get no carve-out; their notes are neutral.
 */
export function findNoteExceptionViolations(input: NoteExceptionInput): string[] {
	const problems: string[] = [];
	const occurrences = countOccurrences(input.fullText, TIER2_NOTE_EXCEPTION);

	if (!input.expectPresent) {
		if (occurrences !== 0) {
			problems.push(
				`canonical Spanish note must not appear on this locale: ${occurrences} occurrence(s)`,
			);
		}
		return problems;
	}

	if (occurrences !== 1) {
		problems.push(
			`canonical Spanish note must occur exactly once, found ${occurrences} occurrence(s)`,
		);
	}

	if (input.noteText === null) {
		problems.push('#comparacion .comparison__note is missing');
		return problems;
	}

	if (input.noteText !== TIER2_NOTE_EXCEPTION) {
		problems.push(
			`note text is not the canonical sentence verbatim: "${input.noteText}"`,
		);
	}

	return problems;
}

export function findViolations(corpus: string, terms: ForbiddenTerm[]): string[] {
	return terms.filter((t) => t.pattern.test(corpus)).map((t) => t.label);
}
