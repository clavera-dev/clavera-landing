# M4 — full-page evidence audit (2026-09-29, continuation)

Scope: visually inspect the four new full-page captures in `docs/project/M4_FULLPAGE_EVIDENCE/` (`es-1440.png`, `es-375.png`, `en-375.png`, `ru-375.png`), with particular attention to S4 and S9, compare section hierarchy and mobile readability against `M4_REFERENCE_COMPOSITION_SPEC.md`, and reconcile the hero light/dark question raised in `Old/docs/project/M4_NEXT_VISUAL_REVIEW.md` §1.1 (N1). Code was read only to identify which component renders a given section and to confirm CSS breakpoints already visible in the screenshots — no source, token, copy or legal file was edited, no dependency install, no build, no publication, no M5 work.

**Tool note, for calibration of future sessions.** All four PNGs opened successfully this session — a genuine step up from prior sessions, which could not reach S4–S13 at all. But the image tool delivers a *downscaled* render for analysis, not the original pixels: the tool itself reports, e.g., `es-1440.png` as "original 1440×14221, displayed at 203×2000" (≈7.1:1 reduction) and the three 375-wide pages at ≈7.8–8.2:1. There is no crop/zoom/split tool available in this session (no shell access), so anything smaller than a large, high-contrast block — a whole section's background color, its position in the page order, whether a list is one column or two, overall text density — is legible; anything at the scale of a single hairline, a 2px accent tick, a font-family substitution, or a 5–20px spacing difference is not. Facts below are labeled `[seen]` only where the downscaled image genuinely supports them at that resolution; finer claims are labeled `[not resolvable at delivered resolution]` rather than guessed.

## 1. Section hierarchy: full S1–S13 order and surface, confirmed for the first time

Reading `es-1440.png` top to bottom against `M4_REFERENCE_COMPOSITION_SPEC.md`'s S1–S13 surface table (lines 176–188):

| # | Section (heading seen) | Spec surface | Observed surface | Match |
|---|---|---|---|---|
| S1 | "Tu bici merece un lugar seguro en la ciudad." | own (image, type over it) | dark photo, headline over it | `[seen]` yes |
| S2 | "La ciudad se llenó de bicis..." | base | dark | `[seen]` yes |
| S3 | "Siempre el mismo lugar..." | raised, hairline | dark, visually distinct band, numbered index list | `[seen]` yes |
| S4 | "Tres pasos, y la bici deja de ser un problema." | base, tight | dark, tight spacing | `[seen]` yes |
| S5 | "Diseñado para lo que realmente usás." | base, tight | dark, full-width image + list | `[seen]` yes |
| S6 | "Nadie entra de pasada." | raised | dark, text + door image | `[seen]` yes |
| S7 | "Ni la calle, ni un lugar pensado para autos." | paper | visibly the one **light** block on the whole page | `[seen]` yes |
| S8 | "Así está diseñado un hub CLAVERA." | base + paper sheet | dark section containing one light card (plan) + a separate photo below it | `[seen]` yes |
| S9 | "Si te pasa alguna de estas, CLAVERA es para vos." | base, loose | dark, quiet, no visible rules/boxes | `[seen]` yes |
| S10 | "¿Dónde la necesitás?" | raised, hairline | dark, visibly the sparsest section on the page (heading + one control) | `[seen]` yes |
| S11 | "Sumate al piloto" | raised, 2px amber rule | the one **amber/orange** full-width block on the page | `[seen]` yes |
| S12 | "Lo importante, sin letra chica." | base, hairline | dark, disclosure/FAQ list | `[seen]` yes |
| S13 | final CTA + footer | base, coda | dark, ends in footer | `[seen]` yes |

**This closes the largest open gap from `M4_EVIDENCE.md` §3.2 and `Old/docs/project/M4_BASELINE_VISUAL_AUDIT.md`: all 13 sections have now had at least one direct visual read, in the correct order, on the correct surface, in one continuous ES/1440 capture.** This is an order-and-surface check, not a pixel-perfect layout audit — see the per-item caveats below for what it does not settle.

Re-checking the specific O-items that previous docs marked "still inferred" because they had never seen S4–S11:

- **O-05** (two consecutive raised sections + "near-empty" S10) — `[seen]`, **confirmed as a real structural fact**: S10 and S11 are the two visually raised/sparse sections back-to-back, and S10 (zone question + one dropdown/button) is visibly the least dense section on the page. Whether this sparseness is a *problem* remains the taste call the original audit already framed it as — not something a screenshot can decide either way.
- **O-06** (portrait overlap at S5/S6) — `[seen]` for placement (the door photo sits beside/after the S6 text, not overlapping the S5 image), `[not resolvable]` for how subtle any deliberate overlap effect is — consistent with `Old/docs/project/M4_FULLPAGE_REVIEW.md`'s own earlier finding that this is "subtle on desktop."
- **O-07** (seven-pillar grid, S3) — `[seen] + [code]`: the index list visibly ends with one row sitting alone against an empty cell, and `PillarsSection.astro:153-171` confirms why — 7 items (`solution.pillars`, `src/i18n/es.ts:67-78`) in a `repeat(2, ...)` grid at ≥860px always leaves the last row's second cell empty, with `nth-last-child(-n+2)` deliberately giving both column-ends a closing rule so the asymmetry still reads as "finished." Not a bug; a known, deliberate consequence of an odd item count. Already recorded, now visually reconfirmed rather than only inferred.
- **O-08** (R5 band crop) — `[seen]`: image reads as a recognizable full-width interior shot; no new detail beyond the prior finding.
- **O-09** (comparison table on mobile) — still `[not resolvable at delivered resolution]` on the specific discoverability question (whether a cut-off column is visible as a scroll cue); the light "paper" block itself is clearly visible in all three 375px captures at the expected position. No new evidence either way; still legally gated (S7) regardless.
- **O-10** (R6 sheet / R4 alignment) — `[seen]`: matches the prior finding — plan and legend share one light sheet, the next render is a separate card below it.

## 2. S4 — "Cómo funciona" (3-step rail)

- `[seen]` **Desktop (es-1440):** the three numbered steps appear side by side, roughly evenly spaced across the row — consistent with `HowItWorksSection.astro`'s `@media (min-width: 800px)` rule switching `.steps` to `repeat(3, minmax(0,1fr))`.
- `[seen]` **Mobile (es-375/en-375/ru-375):** the same three steps stack in a single column, each separated by a hairline — consistent with the same file's default (`grid-template-columns: 1fr` below 800px) and with the `:last-child` bottom rule added under `max-width: 799px`.
- `[code]` The amber 2px "tick" mark at the top-left of each step (`.steps__item::before`) is a real rule in the stylesheet but is far too small a feature to confirm or deny at the delivered image resolution — `[not resolvable]`.
- No hierarchy problem found: order, rhythm (`tight`, i.e. less vertical air than neighboring sections), and column count both match the spec and the code at both viewports shown.

## 3. S9 — "Casos" / "Para quién" (quiet list)

- `[seen]` **Both mobile captures (es-375/en-375/ru-375) and desktop (es-1440):** the section reads as the quietest on the page exactly as `ForWhomSection.astro`'s own code comment intends — no numbering, no boxes, large type, generous gaps between the five statements (`src/i18n/es.ts:173-179`).
- `[not resolvable at delivered resolution]` The desktop **two-column split with a sticky left heading** (`@media (min-width: 900px)`, `.casos { grid-template-columns: minmax(0,0.85fr) minmax(0,1fr) }`, `.casos__head { position: sticky }`) is a real rule in the code, but at ≈7:1 downscale a two-column split next to a single-column stack of large text is not reliably distinguishable from a single wide column of the same text — this claim is `[code]`-only, not independently confirmed by this pass's image read. A fresh, higher-resolution capture of this section alone (or a live scroll test) would be needed to confirm the sticky-heading behavior visually.
- `[code]` The small amber 2px tick before each item (`.casos__item::before`) is likewise a real rule, not confirmable at this resolution.
- No hierarchy problem found: S9 sits exactly where the spec places it (between S8/Hub and S10/Zones), on the `base` surface, with `loose` rhythm (visibly more vertical air around it than S4/S5).

## 4. Hero light/dark discrepancy (N1) — reconciled, not reproduced

`Old/docs/project/M4_NEXT_VISUAL_REVIEW.md` §1.1 flagged, from the older `M4_BASELINE_CONTACT.png` composite, that the hero body (headline, lede, zone selector, CTA) in the 768/375 columns *looked* like dark text on a light ground — inconsistent with `Hero.astro`'s code, which sets `.hero { background: var(--bg-base) }` (near-black `graphite-950`) at every width with no override (confirmed again this session, `Hero.astro:70-369`).

`[seen]`, high confidence at the resolution available: in all three fresh 375px full-page captures (`es-375.png`, `en-375.png`, `ru-375.png`), the block immediately below the hero image reads as **dark background with light text and one orange button** — the same dark treatment as the image above it and as every other dark-surface section further down the same page. This is a large, high-contrast, whole-block color judgement, which is exactly the kind of fact that survives a ≈7.8:1 downscale reliably (unlike fine typographic detail). No light panel is visible anywhere below the hero image in any of the three locales.

**Conclusion: the discrepancy does not reproduce in this fresh evidence.** This supports options (a) or (b) already listed in `Old/docs/project/M4_NEXT_VISUAL_REVIEW.md` — a misread of the old, compressed composite, or that composite predating current source — over (c), a live rendering bug. Recommend closing N1 as "not a bug, superseded by fresh full-page evidence" rather than leaving it open, **unless** the owner specifically wants a live-browser or devtools check before fully trusting a downscaled screenshot for this question.

## 5. Mobile readability — cross-locale observations

- `[measured]` (image-metadata fact, not a visual read) Full-page pixel heights at 375px width: ES 15,473px, EN 15,591px, RU 16,376px. RU is the tallest by a wide margin (+903px vs ES, +785px vs EN), consistent with — and now extending beyond the hero — the H1-height finding already recorded in `M4_EVIDENCE.md` (RU 294px vs ES/EN 147px at 1440×800). **New, minor observation:** EN is 118px taller than ES, which is not the usual pattern (Spanish translations are typically longer than English); this is worth a quick content-length sanity check by whoever next touches EN copy, but is not itself a defect — no section looked broken or overflowing in the EN capture.
- `[seen]` All three mobile captures stack every section to a single column in the same order as desktop, with no section appearing cut off, overlapping, or missing. No broken layout found in any of the three locales at 375px.
- `[seen]` Contrast pattern (light text on dark ground, with S7 as the sole light/paper exception and S11 as the sole amber exception) holds identically across ES/EN/RU — locale does not change which sections are light vs dark.
- `[not resolvable at delivered resolution]` Actual line-wrap counts and letter-spacing/legibility at small sizes (e.g., the mono eyebrow labels, S4/S9 body copy) — the downscaled image is not sharp enough to count wrapped lines reliably below the hero H1 (which was already separately measured via DOM in `M4_EVIDENCE.md`).

## 6. Issues found, by severity

**High** — none. No broken layout, no missing section, no overlapping content found in any of the four captures.

**Medium**
- None newly found this pass beyond what prior docs already logged (S10 sparseness / O-05, S3's empty grid cell / O-07) — both already correctly filed as design-taste items, not defects, and are unchanged by this session.

**Low / informational**
- EN full-page height (15,591px) exceeds ES (15,473px) at 375px width — atypical direction, worth a copy-length sanity check, not urgent, not a defect on its own (§5).
- S9's desktop two-column/sticky-heading behavior (`ForWhomSection.astro`) remains visually unverified — not because anything looks wrong, but because this session's tools cannot resolve it either way (§3).

## 7. Owner-dependent decisions — status after this pass

No new owner-gated decision was created by this pass. The existing list stands, with one item resolved:

- **N1 (`Old/docs/project/M4_NEXT_VISUAL_REVIEW.md`)** — **resolved by this session's evidence** (§4 above): treat the hero body as dark-on-dark at all widths, matching code; the earlier concern does not reproduce in fresh full-page captures. Recommend the owner not spend further time on this specific question unless a live-browser check is wanted for full certainty.
- **N2/N3/N4** and **D2–D8** (`M4_REFERENCE_COMPOSITION_SPEC.md` §15, `Old/docs/project/M4_NEXT_VISUAL_REVIEW.md` §3) — **unchanged by this pass**; this session did no external reference research and did not touch the archived 9-capture zip question. Still genuinely owner-dependent:
  - D2 (S2 scale default), D3 (mono-case scope) — pure taste calls, evidence cannot resolve them.
  - Whether S10's sparseness (O-05) or S3's asymmetric last row (O-07) should change at all — both are legitimate-as-built states with a known, documented cause; changing them is a design preference, not a bug fix.
  - P1/P2/P6/P11 external-reference research — still blocked on a browser/screenshot-capable tool per `Old/docs/project/M4_NEXT_VISUAL_REVIEW.md` §2, unaffected by this session's image-reading pass.

## 8. Non-gated implementation fixes — shortlist (not applied here)

Carried over from `M4_EVIDENCE.md` O-19 and `Old/docs/project/M4_NEXT_VISUAL_REVIEW.md` §4, re-confirmed as still applicable and still not requiring an owner/design decision:

1. **O-11** — `ProblemSection.astro`'s 84px override exceeds the token scale (`typography.css`); switching S2 to `--fluid-display` is a pure conformance fix (T1 in the prior doc's plan).
2. **O-19** — the disabled-button rule, one raw (non-tokenised) shadow value in `ZoneSelector.astro`, and the missing `og:image`/404 page are all code-hygiene items independent of any visual taste call.

No further non-gated candidates were identified from this specific pass's S4/S9/hero review — the S3 empty-cell and S10 sparseness items above are deliberately **not** added to this list, since prior docs and this session both treat "whether to change them" as a design preference rather than a defect.

## 9. What this pass does not cover

- No pixel-level or sub-hairline verification of any section (tool ceiling, §0 above).
- No live-browser or devtools check — everything here is a read of four static PNGs already in the repo.
- No new external reference research (P1/P2/P6/P11 unchanged).
- No font-family/glyph-coverage check (O-13 unchanged).
- No code, copy, token, or legal-text change; no M5 work started; no publication.
