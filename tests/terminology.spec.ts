import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';
import {
	TIER1,
	TIER1_COMPARISON_ROOTS,
	TIER2_NOTE_EXCEPTION,
	FORBIDDEN_PROMISES,
	FORBIDDEN_BRANDS,
	stripAllowlisted,
	findViolations,
	countOccurrences,
	findHeaderPlacementViolations,
	findNoteExceptionViolations,
} from './terminology';

/** The one Tier-2 header phrase each locale actually ships. */
const HEADER_PHRASE: Record<string, string> = {
	es: 'Cochera de auto',
	en: 'Car garage',
	ru: 'Автомобильная кочера',
};

/**
 * Terminology compliance against the built output, per Appendix В.
 *
 * Scans four surfaces the appendix names explicitly — visible copy, metadata,
 * alt/ARIA text, and public URLs/filenames — for every locale.
 */
interface Corpus {
	visible: string;
	metadata: string;
	altAria: string;
	urls: string;
	comparisonText: string;
	fullText: string;
	/** Exact rendered text of every `#comparacion th[scope="col"]`. */
	columnHeaders: string[];
	/** Exact text of `#comparacion .comparison__note`, or null if absent. */
	noteText: string | null;
}

async function collect(page: import('@playwright/test').Page): Promise<Corpus> {
	return page.evaluate(() => {
		const meta = Array.from(document.querySelectorAll('meta'))
			.map((m) => m.getAttribute('content') ?? '')
			.concat(document.title)
			.join(' \n ');

		const altAria = Array.from(
			document.querySelectorAll('[alt], [aria-label], [aria-labelledby], [title]'),
		)
			.map((el) =>
				[
					el.getAttribute('alt'),
					el.getAttribute('aria-label'),
					el.getAttribute('title'),
				]
					.filter(Boolean)
					.join(' '),
			)
			.join(' \n ');

		const urls = Array.from(document.querySelectorAll('[href], [src], [srcset]'))
			.map((el) =>
				[el.getAttribute('href'), el.getAttribute('src'), el.getAttribute('srcset')]
					.filter(Boolean)
					.join(' '),
			)
			.join(' \n ');

		const comparison = document.querySelector('#comparacion');
		const columnHeaders = comparison
			? Array.from(comparison.querySelectorAll('th[scope="col"]')).map((th) =>
					((th as HTMLElement).innerText ?? '').replace(/\s+/g, ' ').trim(),
				)
			: [];

		const noteEl = comparison ? comparison.querySelector('.comparison__note') : null;

		return {
			columnHeaders,
			noteText: noteEl ? ((noteEl as HTMLElement).innerText ?? '').replace(/\s+/g, ' ').trim() : null,
			visible: document.body.innerText,
			metadata: meta,
			altAria,
			urls,
			comparisonText: comparison ? (comparison as HTMLElement).innerText : '',
			fullText: `${document.body.innerText}\n${meta}\n${altAria}`,
		};
	});
}

for (const locale of LOCALES) {
	test.describe(`[${locale.key}] Appendix В terminology`, () => {
		test('contains no Tier-1 vocabulary in copy, metadata or alt/ARIA text', async ({ page }) => {
			await page.goto(locale.path);
			const corpus = await collect(page);

			// Tier-1 applies in every language, so every term is scanned here.
			// The permitted Tier-2 phrases contain Tier-1 roots (`car garage`
			// contains `garage`), so they are removed first; a separate test
			// proves they occur only inside #comparacion.
			expect(
				findViolations(stripAllowlisted(corpus.visible), TIER1),
				'Tier-1 in visible copy',
			).toEqual([]);
			expect(
				findViolations(stripAllowlisted(corpus.metadata), TIER1),
				'Tier-1 in metadata',
			).toEqual([]);
			expect(
				findViolations(stripAllowlisted(corpus.altAria), TIER1),
				'Tier-1 in alt/ARIA text',
			).toEqual([]);
		});

		test('contains no Tier-1 vocabulary in public URLs or filenames', async ({ page }) => {
			await page.goto(locale.path);
			const corpus = await collect(page);

			// No allowlist applies to URLs: Appendix В.2 permits the Tier-2 terms
			// in the S7 column only, never in a path or an asset filename.
			expect(findViolations(corpus.urls, TIER1), 'Tier-1 in URLs/filenames').toEqual([]);
			expect(
				findViolations(corpus.urls, TIER1_COMPARISON_ROOTS),
				'comparison roots in URLs/filenames',
			).toEqual([]);
		});

		test('permits Tier-2 terms only as the exact text of an S7 column header', async ({ page }) => {
			await page.goto(locale.path);
			const corpus = await collect(page);

			// Appendix В.2 permits the phrase as the column header, not merely
			// somewhere in the S7 block. Every occurrence in the document must be
			// accounted for by a <th scope="col"> whose entire text is the phrase.
			expect(
				findHeaderPlacementViolations(corpus),
				'Tier-2 phrase outside an exact S7 column header',
			).toEqual([]);

			// And the locale's own phrase really is present as a header, so the
			// check above cannot pass vacuously.
			const phrase = HEADER_PHRASE[locale.key];
			expect(
				corpus.columnHeaders.map((h) => h.toLocaleLowerCase()),
				`"${phrase}" is an S7 column header`,
			).toContain(phrase.toLocaleLowerCase());
		});

		test('rejects an allowlisted header phrase moved into S7 body or note text', async ({
			page,
		}) => {
			await page.goto(locale.path);
			const phrase = HEADER_PHRASE[locale.key];

			// Baseline: the shipped page is clean.
			expect(findHeaderPlacementViolations(await collect(page)), 'baseline').toEqual([]);

			// Appending the phrase to the market-reference note keeps it inside
			// #comparacion, so a block-membership check would still pass. Exact
			// placement enforcement must reject it.
			await page.evaluate((injected) => {
				const note = document.querySelector('#comparacion .comparison__note');
				if (!note) throw new Error('S7 market-reference note not found');
				note.textContent = `${note.textContent} ${injected}`;
			}, phrase);

			expect(
				findHeaderPlacementViolations(await collect(page)),
				'phrase injected into the S7 note',
			).not.toEqual([]);

			// Same again for an ordinary table cell.
			await page.goto(locale.path);
			await page.evaluate((injected) => {
				const cell = document.querySelector('#comparacion tbody td');
				if (!cell) throw new Error('S7 table cell not found');
				cell.textContent = `${cell.textContent} ${injected}`;
			}, phrase);

			expect(
				findHeaderPlacementViolations(await collect(page)),
				'phrase injected into an S7 table cell',
			).not.toEqual([]);
		});

		test('pins the canonical Spanish note exception to its exact element', async ({ page }) => {
			await page.goto(locale.path);
			const corpus = await collect(page);

			// The carve-out is legal, not stylistic, so it is pinned rather than
			// tolerated: exactly once on Spanish, as the complete text of the note
			// element, and never on English or Russian.
			expect(
				findNoteExceptionViolations({
					fullText: corpus.fullText,
					noteText: corpus.noteText,
					expectPresent: locale.carriesNoteException,
				}),
				'canonical note exception placement',
			).toEqual([]);

			if (locale.carriesNoteException) {
				expect(corpus.noteText, 'note is the canonical sentence verbatim').toBe(
					TIER2_NOTE_EXCEPTION,
				);
				expect(
					countOccurrences(corpus.fullText, TIER2_NOTE_EXCEPTION),
					'canonical note occurs exactly once',
				).toBe(1);
			} else {
				expect(
					countOccurrences(corpus.fullText, TIER2_NOTE_EXCEPTION),
					'canonical note absent from this locale',
				).toBe(0);
			}
		});

		test('rejects tampering with the canonical Spanish note exception', async ({ page }) => {
			const violations = async () => {
				const corpus = await collect(page);
				return findNoteExceptionViolations({
					fullText: corpus.fullText,
					noteText: corpus.noteText,
					expectPresent: locale.carriesNoteException,
				});
			};

			await page.goto(locale.path);
			expect(await violations(), 'baseline').toEqual([]);

			if (!locale.carriesNoteException) {
				// No carve-out here: introducing the Spanish sentence at all fails.
				await page.evaluate((sentence) => {
					const note = document.querySelector('#comparacion .comparison__note');
					if (!note) throw new Error('S7 note not found');
					note.textContent = `${note.textContent} ${sentence}`;
				}, TIER2_NOTE_EXCEPTION);
				expect(await violations(), 'Spanish sentence injected into a non-Spanish locale').not.toEqual(
					[],
				);
				return;
			}

			// (a) Deleting the note must fail.
			await page.evaluate(() => {
				document.querySelector('#comparacion .comparison__note')?.remove();
			});
			expect(await violations(), 'note deleted').not.toEqual([]);

			// (b) Moving the sentence into an S7 heading must fail.
			await page.goto(locale.path);
			await page.evaluate((sentence) => {
				const note = document.querySelector('#comparacion .comparison__note');
				const heading = document.querySelector('#comparacion h2');
				if (!note || !heading) throw new Error('S7 note or heading not found');
				note.textContent = '';
				heading.textContent = `${heading.textContent} ${sentence}`;
			}, TIER2_NOTE_EXCEPTION);
			expect(await violations(), 'sentence moved into the S7 heading').not.toEqual([]);

			// (c) Moving the sentence into a table cell must fail.
			await page.goto(locale.path);
			await page.evaluate((sentence) => {
				const note = document.querySelector('#comparacion .comparison__note');
				const cell = document.querySelector('#comparacion tbody td');
				if (!note || !cell) throw new Error('S7 note or cell not found');
				note.textContent = '';
				cell.textContent = `${cell.textContent} ${sentence}`;
			}, TIER2_NOTE_EXCEPTION);
			expect(await violations(), 'sentence moved into an S7 table cell').not.toEqual([]);

			// (d) Duplicating it outside the note must fail, even with the note intact.
			await page.goto(locale.path);
			await page.evaluate((sentence) => {
				const footer = document.querySelector('footer');
				if (!footer) throw new Error('footer not found');
				const echo = document.createElement('p');
				echo.textContent = sentence;
				footer.append(echo);
			}, TIER2_NOTE_EXCEPTION);
			expect(await violations(), 'sentence duplicated outside the note').not.toEqual([]);

			// (e) Rewording the note must fail.
			await page.goto(locale.path);
			await page.evaluate(() => {
				const note = document.querySelector('#comparacion .comparison__note');
				if (!note) throw new Error('S7 note not found');
				note.textContent = 'Valores de mercado para cocheras en CABA, agosto 2026.';
			});
			expect(await violations(), 'note reworded').not.toEqual([]);
		});

		test('contains no bare comparison roots once the S7 allowlist is removed', async ({ page }) => {
			await page.goto(locale.path);
			const corpus = await collect(page);

			// `cochera` / `кочера` are Tier 1 as a self-description. Removing the
			// exact permitted phrases first means anything still matching is an
			// unapproved use.
			const stripped = stripAllowlisted(corpus.fullText);
			expect(
				findViolations(stripped, TIER1_COMPARISON_ROOTS),
				'unapproved cochera/кочера usage',
			).toEqual([]);
		});

		test('makes none of the Appendix В.4 forbidden promises', async ({ page }) => {
			await page.goto(locale.path);
			const corpus = await collect(page);
			expect(findViolations(corpus.fullText, FORBIDDEN_PROMISES), 'forbidden promises').toEqual([]);
		});

		test('never exposes the prohibited supplier brand names', async ({ page }) => {
			await page.goto(locale.path);
			const corpus = await collect(page);
			expect(findViolations(corpus.fullText, FORBIDDEN_BRANDS), 'brand names').toEqual([]);
			expect(findViolations(corpus.urls, FORBIDDEN_BRANDS), 'brand names in URLs').toEqual([]);
		});
	});
}
