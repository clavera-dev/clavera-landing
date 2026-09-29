# M4 — current handoff (consolidated, 2026-09-29)

Status: **consolidation only. Nothing here is a new finding, approval, edit or measurement.** This document restates, in one place, what the M4 session chain (`M4_TASTE_AUDIT.md` → `M4_EVIDENCE.md` → `M4_REFERENCE_COMPOSITION_SPEC.md` → `M4_PUBLIC_REFERENCES_2026-09-29.md` → `M4_REFERENCE_GAPS_P5_P11.md` → `M4_FULLPAGE_AUDIT.md`, plus four now-archived session appendices, see §7) established, so a new session does not have to re-read the whole chain to know the current state. Where a fact came only from an archived file, this document is now its record; the archived file itself still exists, unedited, at the `Old/` path named below.

## 1. Current site baseline

- Local git tag `baseline/clavera-before-m4-2026-09-29` → commit `e67dc21`, code identical to `4aa30b7`. A second tag, `baseline/clavera-before-m5-2026-09-29`, marks the same code before M5.1's edits.
- `clavera.ar` did not resolve via DNS in this environment at the time of the baseline; the public domain's real state is unconfirmed. This snapshot is a local beta build only, not a visual, legal or publication acceptance.
- Evidence artifacts still in the repo: `docs/project/M4_BASELINE_CONTACT.png` (ES/EN/RU × 1440/768/375, hero through start of S2/S3) and `docs/project/M4_FULLPAGE_EVIDENCE/{es-1440,es-375,en-375,ru-375}.png` (full-page, S1–S13). A separate 9-capture diagnostic archive (`CLAVERA_before_M4_2026-09-29.zip`, ES/EN/RU × 375×667/1280×720/1440×800, SHA-256 per file) exists outside the repository and has never been reachable by any session's tools; it is not required for what follows, since the four in-repo full-page captures above already gave a complete S1–S13 visual pass.
- 9/9 `tests/screenshots.spec.ts` checks passed at baseline; the 9 extra diagnostic captures reported 0 broken/undecoded images and 0 px horizontal overflow.

## 2. Verified facts

**Measured (DOM, `M4_EVIDENCE.md`):**
- Hero CTA-vs-fold bottom: 375×667 ES 555 / EN 583 / RU 644 px (RU 23 px spare); 1280×720 ES/EN 572 / RU 715 px (RU 5 px spare — tightest case); 1440×800 ES/EN 577 / RU 724 px. Clears the sampled fold in all six locale/viewport pairs.
- Hero H1 height: 375×667 ES/EN 135 / RU 180 px; 1440×800 ES/EN 147 / RU 294 px — RU consistently needs about double the vertical space.

**Seen (`M4_FULLPAGE_AUDIT.md`, fresh full-page captures — the most complete visual pass and the one to trust over older, narrower captures):**
- All 13 sections (S1–S13) confirmed in the correct order and on the correct surface (base/raised/paper/amber) in one continuous ES/1440 capture, and the section stack is identical across all three locales at 375 px — no broken, missing, overlapping or cut-off section in any of the four captures.
- Full-page pixel height at 375 px: ES 15,473 / EN 15,591 / RU 16,376 px. RU is tallest as expected; EN is atypically 118 px taller than ES (worth a copy-length sanity check on a future EN-copy pass, not itself a defect).
- **N1, resolved:** an earlier composite screenshot (`M4_BASELINE_CONTACT.png`) looked like the hero body rendered as dark text on a light ground at 768/375 px, contradicting the source (`Hero.astro` sets a dark background at every width). Fresh full-page captures at 375 px in all three locales show ordinary dark-on-dark with light text and one orange button — the discrepancy does not reproduce. Treat as a misread of the older composite, not a live bug, unless a live-browser check is specifically requested.
- The seven-pillar grid's empty last-row cell (S3) and S10/S11's back-to-back raised, sparse sections are confirmed as real, deliberate structural facts (not screenshot artifacts) — whether to change either is a taste call, not a defect (§3).

**Code facts worth carrying forward (previously easy to miss):**
- S7 (`ComparisonSection.astro`) already renders a scroll-hint line (`.comparison__hint`, mono, accent-colored, `aria-hidden`) below the table at ≤759 px. Its on-screen prominence at 375 px has never been confirmed visually — flagged as **F1** below.
- S9 (`ForWhomSection.astro`) has a sticky left heading (`position: sticky`) at ≥900 px, undocumented in `M4_REFERENCE_COMPOSITION_SPEC.md` and never visually confirmed at any delivered screenshot resolution — flagged as **F2** below.

**O-13, still unresolved:** whether the served Plus Jakarta Sans covers Cyrillic. One free, unauthenticated attempt to read Google's CSS2 endpoint for per-script `unicode-range` data returned the legacy/reduced response (no subset data either way) — inconclusive, not evidence of absence. Resolving this needs a real browser (`document.fonts.check()` or computed style on a live RU heading), a fetch with a real browser `User-Agent`, or owner confirmation. Every RU line-count judgement in the composition spec stays invalid until this is resolved (spec §11 rule 6, §5 T4).

## 3. Unresolved design choices (owner/designer calls; evidence cannot settle these)

- **O-01/H-1 — short-phone hero.** At ≤599×≤700 the image band is ≈113 px, of which ≈49 px is visible below the fixed header; RU's CTA clears the fold by only 23 px. Two options are prototyped, neither implemented: **A** (image as backdrop behind text, stronger local scrim) or **B** (keep the band, retune `object-position`/scrim). Decision **D4**, no default.
- **O-02/O-03/H-2 — desktop hero density and triple scrim.** CTA clears the fold in every locale/viewport measured, tightest at RU 1280×720 (5 px). Whether that margin, and the triple-gradient scrim, read as intentional is a by-eye call, not yet made.
- **O-04/SEL-1 — zone selector.** Load-shift on field un-hide, no visual "this is a list" affordance, no empty-result state. Structural fix proposed (reserve space, add affordance, reserve an empty-state slot); wording needs owner-supplied ES/EN/RU copy (**D7**).
- **F1 — S7 scroll hint prominence** (see §2) — needs a look at an actual 375 px render, not resolvable from code or from the current screenshot resolution.
- **F2 — S9 sticky heading** (see §2) — confirm intentional vs. leftover; if unwanted, removing `position: sticky` is a one-line change, not proposed here.
- **T2/D3 — uppercase mono scope.** Deferred in M5.1 (`.mono` stays as built); needs designer acknowledgement before scoping uppercase to short labels only.
- **D2 — S2 statement scale**, already implemented at its default (72 px, see §5); the 56 px hierarchy alternative remains available if the owner wants the hero to stay the page's only 72 px moment.
- **Reference research (D1).** Content-order support only exists for 4 of 11 composition-matrix rows (P3, P4, P9, P10 — Vitsœ, Spokesafe, Rapha, Cyclehoop) plus weaker partial precedents for P1, P2, P5, P7, P8. **No row has a visual (viewport-rendered) reference example.** P6 and P11 are structurally unresearchable by text-only tools — their acceptance tests (a surface-luminance step around an overlap; row survival at ≈375 px) are viewport/rendering properties that a text-to-markdown fetch cannot expose regardless of which candidate page is chosen; two independent sessions confirmed this and further search time on them is not recommended. Advancing any of P1/P2/P5–P8/P11, or upgrading P3/P4/P9/P10 from content-order to visual support, needs a session with a real browser or screenshot tool, which no M4 session has had.
- **O-06/O-07/O-08/O-09** (portrait overlap legibility, pillar grid asymmetry, R5 crop, comparison-table mobile discoverability) — each confirmed as a real, deliberate-by-construction state; changing any is a preference, not a bug fix, and O-09 is additionally gated on S7's legal sign-off (§4).

## 4. Legal / publication gates (references only)

Full text lives in `CLAVERA_Legal_Spec_v3_0_received.md` and the reconciliation table in `CLAVERA_EXECUTION_PLAN.md`'s M3.5.1/M3.5.2 sections; not restated here. Outstanding, unaffected by M4/M5 design work: lawyer sign-off on the legal pages, the real publication date, the RNBD number (or a written launch ruling in its absence), Kirill's visual review, and publication approval. S7 (comparison table) additionally needs its own legal approval before any layout change beyond what §3's O-09 already describes. None of this blocks continued local M4/M5 design work.

## 5. M5 status so far

M5.1 (type conformance) landed: S2's statement now uses `--fluid-display` (max 72 px, the spec's default D2) instead of the old `clamp(56px, 5.2vw+1rem, 84px)` override, removing the +9 px step at exactly 900 px; `ZoneSelector`'s raw `box-shadow` value was moved to a scoped token with an identical value. T2 (mono uppercase scope) was deferred, not implemented. Full detail, including the exact before/after CSS and the still-outstanding visual comparison, is in `M5_1_RESULT.md` (kept active; not archived).

## 6. Exact M5 next step

**M5.2 — Hero**, per `M4_REFERENCE_COMPOSITION_SPEC.md` §13: prototype H-1 options A and B at 375×667 in ES/EN/RU and choose one (or escalate to Kirill for **D4**, which has no default); re-check H-2's fold clearance and the triple scrim by eye at 1280×720 and 1440×800; apply SEL-1's structural layout-stability fix to `ZoneSelector.astro` (no new copy). Evidence to attach: RU/EN/ES CTA-bottom-vs-fold screenshots at 375×667, 1280×720, 1440×800; contrast numbers for the disclosure and H1 against whichever scrim variant is chosen; a CLS reading for the selector fix. Stop condition: the fold test fails in any locale, or disclosure contrast drops below 4.5:1. This step needs a session with a real browser/screenshot tool (or Kirill/Codex running the build locally) — no prior M4 session in this harness has had one.

## 7. Archive note

Four M4 session appendices were archived to `Old/docs/project/` in this pass because their findings are fully superseded by later documents in the same chain and are restated above: `M4_BASELINE_SNAPSHOT.md`, `M4_BASELINE_VISUAL_AUDIT.md`, `M4_FULLPAGE_REVIEW.md`, `M4_NEXT_VISUAL_REVIEW.md`. See `M4_ARCHIVE_MOVES.json` for the exact source path and reason per file. All other M4 documents (`M4_TASTE_AUDIT.md`, `M4_EVIDENCE.md`, `M4_REFERENCE_COMPOSITION_SPEC.md`, `M4_PUBLIC_REFERENCES_2026-09-29.md`, `M4_P1_P2_REFERENCE_NOTES.md`, `M4_REFERENCE_GAPS_P5_P11.md`, `M4_FULLPAGE_AUDIT.md`, `M5_1_RESULT.md`, `M5_IMAGE_PRODUCTION_BRIEF_HF.md`) remain active source documents and were not moved; several are still-open bibliographies (the reference-research files) or the current measurement/spec/result record, not superseded appendices.
