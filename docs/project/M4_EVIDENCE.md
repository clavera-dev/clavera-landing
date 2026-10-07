# M4.1 — Measured baseline and evidence pack

Date: 2026-09-29
Scope: converts `M4_TASTE_AUDIT.md` §3 `[code-inferred]` items into *measured*, *seen* (contact sheet), *still inferred*, or *open* (needs an owner/designer decision, evidence cannot resolve it). No source, token, copy or legal edit. No dependency install, no purchase, no publication, no reference research performed here.

**This is not visual acceptance, not legal approval, and not public-domain verification.** Everything below is local rendering of commit `4aa30b7` (same code as baseline tag `baseline/clavera-before-m4-2026-09-29` → `e67dc21`). `clavera.ar` did not resolve in this environment, so nothing here confirms what, if anything, is live on the public domain.

## 1. Evidence inventory — what exists and what does not

| Artifact | Location | What it proves | What it does not prove |
|---|---|---|---|
| 9 standard Playwright screenshot checks (`tests/screenshots.spec.ts`) | pass/fail only, not re-run here | Images finish loading before the existing suite's ES/EN/RU × 1440/768/375 captures; 9/9 passed | Nothing about fold, CLS, font family, or sections below the first screen |
| Contact sheet | `docs/project/M4_BASELINE_CONTACT.png` (in repo) | Full-page(-ish), human-viewable renders of ES/EN/RU at 1440 / 768 / 375 px width, hero through the start of S2/S3 | Not viewport-clipped — cannot show fold position by itself; does not reach S4–S13 (comparison table, pillars, hub, overlap, footer) |
| 9 extra diagnostic captures at 375×667, 1280×720, 1440×800 (ES/EN/RU) | Outside the repo (`CLAVERA_before_M4_2026-09-29.zip`, with SHA-256 per file); reviewed after M4.1 | Full-page screenshots exist for all nine views. Gated on `document.fonts.ready` and full image decode; all 9 report 0 broken/undecoded images and 0 px horizontal overflow | The full-page images have not yet received a section-by-section visual audit. Font *family actually used* per glyph is not asserted by this gate |
| Numeric probes (`metrics.json` in the archive) | First survey-link bottom, ES/EN/RU: 375×667 = 555 / 583 / 644 px; 1280×720 = 572 / 572 / 715 px; 1440×800 = 577 / 577 / 724 px. H1 height: 375×667 = 135 / 135 / 180 px; 1440×800 = 147 / 147 / 294 px | DOM `getBoundingClientRect()` measurements. The CTA clears the sampled viewport bottom in every case, by only 5 px in RU at 1280×720 and 23 px in RU at 375×667 | Not a human-usability judgement; no measurement of the hero *image band* height itself, no CLS number, no computed `font-family` |
| DNS check | recorded in `Old/docs/project/M4_BASELINE_SNAPSHOT.md` (summarized in `M4_CURRENT_HANDOFF.md` §1) | `clavera.ar` did not resolve here | Says nothing about the public domain's real state |

No web/public reference research happened in this task (out of scope for M4.1; see §4 below and `M4_REFERENCE_COMPOSITION_SPEC.md` §1).

## 2. O-item evidence table

Legend: **Measured** = a DOM number now exists and directly addresses the item. **Seen** = visible by eye in `M4_BASELINE_CONTACT.png`, i.e. a human visual read, not a measurement. **Still inferred** = no new evidence; the audit's original `[code-inferred]`/`[document-verified]` status stands. **Open** = evidence cannot resolve this; it is a taste/product call for the owner or designer regardless of what is measured or seen.

### 3.1 Hero (S1)

| ID | Item | Status | Detail |
|---|---|---|---|
| O-01 | Mobile hero image reduced to a sliver on short phones | **Captured / visual decision open** | The contact sheet's 375 px column was captured at 375×812, above the 700 px `max-height` breakpoint. A 375×667 full-page capture exists in the archive and was opened after M4.1. The first survey CTA ends at 644 px in RU, leaving 23 px at the bottom. The band itself was not measured; whether its short-phone treatment reads as intended remains a design decision. |
| O-02 | Desktop hero fold and density unmeasured above mobile | **Measured / visual decision open** | H1 height at 1440×800 is ES/EN 147 px vs RU 294 px, confirming RU uses twice the vertical space. The first survey CTA ends at ES/EN/RU 572/572/715 px at 1280×720 and 577/577/724 px at 1440×800; it clears the sampled fold in all cases, but RU at 1280×720 has only 5 px spare. This measurement does not settle perceived density. |
| O-03 | Triple gradient/scrim over the hero image | **Seen, open** | Visible by eye in the 1440 and 768 px contact-sheet columns: a lateral scrim darkens roughly the left half of the image with the wordmark faintly showing through on the right, and a bottom scrim separates the image from the caption. It reads as a deliberate vignette rather than an obviously muddy image in this render, but that is one person's read of a compressed screenshot at one point in time, not a design decision of record. |
| O-04 | Selector affordance, no-JS state, load shift | **Still inferred / open** | The contact sheet shows only the post-load, post-JS state (Playwright waits for load). No indicator/chevron is visible next to the "Elegí tu zona" field in any locale, which is consistent with the audit's code-level finding that no indicator is drawn. No no-JS render, no CLS trace, and no empty-result state was captured by anything available here. |

### 3.2 Composition, rhythm and imagery

| ID | Item | Status |
|---|---|---|
| O-05 | Two consecutive raised sections + near-empty S10 | **Still inferred** — S10/S11 are below the fold; the contact sheet stops around S2/S3 and does not reach them. |
| O-06 | Portrait overlap may not read | **Still inferred** — S5/S6 boundary not captured. |
| O-07 | Seven-pillar grid empty cell | **Still inferred** — PillarsSection not captured. |
| O-08 | R5 band crop vs native ratio | **Still inferred** — VehiclesSection not captured. |
| O-09 | Comparison table hides CLAVERA column first on mobile | **Still inferred** — ComparisonSection not captured; also legally gated (S7), out of scope for any layout change regardless. |
| O-10 | R6 sheet / R4 alignment | **Still inferred** — HubShowcaseSection not captured. |

The contact sheet crops end near S2/S3. The archive does contain full-page screenshots for all nine extra views, so a later evidence pass can inspect S4–S11 without recapturing them. Those sections have not yet received a section-by-section visual audit.

### 3.3 Typography, fonts and locales

| ID | Item | Status | Detail |
|---|---|---|---|
| O-11 | 84 px display type exceeds the token scale in S2 | **Document-verified (unchanged)** | This is a source-code fact (`ProblemSection.astro:134` vs `typography.css:9`), already confirmed by reading the file; the baseline neither adds nor removes evidence for it. No computed font-size at 1440 px was captured here, and S2 itself is below the contact sheet's crop, so the *visual* legibility question is still open. |
| O-12 | Fonts: brief §9.2 vs design-system README | **Document-verified (unchanged)** | A code/config and legal-authority fact, not a rendering question; unaffected by any screenshot. Still routed to the owner. |
| O-13 | Russian display coverage unverified | **Still open — flagged explicitly** | **The baseline does not prove font-family coverage.** The `document.fonts.ready` gate used for the 9 extra captures only confirms the declared font files finished loading; it does not confirm which face Chromium actually selected to draw Cyrillic glyphs, since a loaded font can still lack Cyrillic coverage and silently fall back per-glyph. Visually, the RU headline in the contact sheet has letterforms broadly consistent in weight and geometry with the ES/EN headline (no obvious swap to a generic system serif/sans), but this is a low-confidence read of a compressed screenshot, not a `document.fonts.check()`/computed-`font-family` check, and it does not settle O-13. A real answer needs either a browser devtools computed-style check on a live RU heading, or a `document.fonts.check('700 32px "Plus Jakarta Sans"', 'Твой')`-style probe with network access. |
| O-14 | Uppercase mono used more widely than README describes | **Seen (legibility), open (scope ruling)** | Cyrillic uppercase mono/tracked labels (e.g. "БЕЗОПАСНОЕ ХРАНЕНИЕ · БУЭНОС-АЙРЕС", "ЗАКРЕПЛЁННОЕ МЕСТО") are visible and legible at the contact sheet's resolution in both the 768 and 375 px columns. This does not settle whether the wider (non-eyebrow) uppercase-mono usage should be scoped down — that is a designer/owner call per the audit's own framing, not something a screenshot can decide. |
| O-15 | Locale length hot spots (`ch`-based measures) | **Measured + seen** | H1 heights confirm RU wraps to more lines than ES/EN at both 375×667 (180 vs 135 px) and 1440×800 (294 vs 147 px). The contact sheet's 375 px column visually shows RU's headline running to what looks like 4 lines against ES/EN's 3, consistent with the character-count difference (52 vs 44) already noted in the audit. Other `ch`-measured elements (S2 statement, vehicles list, founders heading, S9 items, FAQ question, header CTA) are below the captured area and remain unmeasured. |

### 3.4 Chrome, motion and housekeeping

| ID | Item | Status |
|---|---|---|
| O-16 | Header blur always on vs README wording | **Document-verified (unchanged)** — a code-vs-README mismatch, not something a screenshot changes; deferred to M6 per the composition spec. |
| O-17 | Footer-only language switching on phones | **Document-verified (unchanged)** — the 375 px contact-sheet header shows no switcher, consistent with the code; routed to owner as before. |
| O-18 | No motion beyond hover/press | **Document-verified (unchanged)** — a grep-level fact about `src/`, unrelated to screenshots. |
| O-19 | Stale/untokenised leftovers | **Document-verified (unchanged)** — code-level items (disabled-button rule, raw shadow value, missing `og:image`/404); not visual. |

## 3. Cross-check against the audit's ten open questions (§6)

1. Hero on short phones (O-01) — short-phone capture exists; design judgement **still open** (see O-01 above).
2. Desktop fold/density (O-02, O-03) — CTA fold position is **measured** in three locales at 1280×720 and 1440×800; density judgement **still open**.
3. Selector (O-04) — **still open**.
4. Portrait overlap (O-06) / R5 crop (O-08) — **still inferred**, present in full-page captures but not visually audited.
5. Comparison on mobile (O-09) — **still inferred**; also legally gated regardless.
6. Token scale 84 px (O-11) — **unchanged**, a document fact, not decided by evidence.
7. Fonts (O-12, O-13) — **O-12 unchanged (legal/owner question); O-13 explicitly still open, font coverage not proven.**
8. Uppercase mono (O-14) / header blur (O-16) — legibility **seen** for O-14, scope ruling **open**; O-16 **unchanged**.
9. Seven-pillar grid (O-07) / S10-S11 surfaces (O-05) — **still inferred**, captured but not visually audited.
10. Locale line counts (O-15) — **measured and seen** at the hero H1 for 375×667 and 1440×800; other measures **still unmeasured**.

## 4. Reference research status — not complete

`M4_REFERENCE_COMPOSITION_SPEC.md` §1 and §3 remain a **research plan with empty, `OPEN` source cells**. No public reference site was visited by this task or any prior one; no image or citation was fetched. This evidence pack does not change that. The composition draft is still entirely code-derived (`[doc]`/`[code]`/`[calc]` labels only) and requires either an interactive session with web-research tools approved, or owner-supplied reference material, before it can be called reference-driven (spec §15 D1). No such research was attempted in this task.

## 5. What this pack does not cover (explicitly out of scope here)

- No code, token, copy, or legal-text change.
- No re-capture of screenshots and no dependency installation (per task instructions — the existing captures stand).
- No section-by-section visual audit of the full-page images in `CLAVERA_before_M4_2026-09-29.zip`.
- No CLS trace, no no-JS render, no computed `font-family`/glyph-coverage check.
- Full-page captures exist, but §3.2 items (O-05 through O-10) have not yet been audited from them.
- No public-domain check (`clavera.ar` unresolved here).
- No reference research, no Refero, no purchase.

## 6. Next M4.2 evidence needed

M4.2 (per `M4_TASTE_AUDIT.md` §7 and `M4_REFERENCE_COMPOSITION_SPEC.md` §13 M5.0) still needs, before the composition spec can be called evidence-based:

1. **Font-family verification for O-13**: a computed-style or `document.fonts.check()` read on a live RU heading, or owner confirmation of which font file serves Cyrillic.
2. **Short-phone hero band (O-01)**: review the archived 375×667 captures visually and measure the band height if needed; owner/designer call either way.
3. **Desktop hero density (O-02)**: use the measured CTA-vs-fold positions above; decide whether RU's 5 px clearance at 1280×720 is acceptable.
4. **Below-the-fold audit**: inspect the archived full-page captures for O-05–O-10 (S4–S11), since the contact sheet stops near S2/S3.
5. **Public reference research** (spec §1/§3/§15 D1) — either an interactive session with web-research tools approved, or owner-supplied reference links/images, before the composition spec can drop its `[proposal]`/code-derived caveat.

None of the above requires code, copy or legal changes to gather; all are measurement/observation tasks.
