# M4 — Reference composition specification (draft v0.1)

Date: 2026-09-28
Branch / base: `agent/clavera/fed16f73faf0` at `643556e` (clean tree at start; this file is the only change)
Status: **draft for review. Not approved, not implemented, and not reference-backed yet.** This is the M4.2 deliverable named in `M4_TASTE_AUDIT.md` §7, written before M4.1 evidence exists and without web research (see §1). It is not visual acceptance, not legal approval, and not a release step. Owner handoff v1.2 and Legal Spec v3.0 are treated as working content while lawyer approval is pending.

## 1. Research gap and evidence basis — read this first

**Web research did not happen.** The required real-site research was attempted once: the first `WebSearch` call was denied because this session has no way to approve tool permissions. Per that denial, the call was not retried and `WebFetch` was not attempted. Consequently:

- **No real reference site was visited.** This document contains **no reference URL, no claim about any real site's layout, and no "as seen on…" statement.** Nothing is quoted or recalled from memory as if verified.
- §3's reference matrix is therefore a **research plan with empty source cells**, each row labelled `OPEN — not researched`. It defines, per purpose, what to look for and what would make a reference acceptable, so a later session with web tools can fill it in without re-deriving the questions.
- Refero is not connected and nothing was bought or installed. This spec also does not depend on it.

**What the rest of the document is built on** (labels used throughout):

| Label | Meaning |
|---|---|
| `[doc]` | A fact about the repository's own documents (authority files, tokens, brief). |
| `[code]` | Read from source (CSS/markup/copy). Not seen in a browser. |
| `[calc]` | Arithmetic from CSS values or the render dimensions in `src/data/media.ts`. Not measured. |
| `[proposal]` | A recommendation of this spec. Nothing is approved until Kirill records it. |

There are still **no screenshots, no built output and no `node_modules` in this worktree**, so nothing here is visually verified. §13 step M5.0 lists the measurements and by-eye checks that must precede any implementation. The only measured facts in the repository remain Codex's (RU hero CTA bottom 644.25 px at 375×667; recorded in `CLAVERA_WORKLOG.md`).

**Files read for this spec:** `M4_TASTE_AUDIT.md`; `CLAVERA_EXECUTION_PLAN.md` (authority order, tool registry, M4/M5); `PROJECT_DECISIONS.md`; `docs/design-system/README.md`, `renders-README.md`, `tokens/{typography,spacing,colors,motion}.css`; brief v1.5 §1, S1–S10 and §9.2/§9.3; `src/styles/global.css` (layout scale, surfaces, primitives); `LandingPage.astro`, `Section.astro`, `RenderFigure.astro`, `media.ts`; `Hero`, `ProblemSection`, `PillarsSection`, `VehiclesSection`, `SecuritySection`, `ComparisonSection`, `HubShowcaseSection` (full or targeted), plus the layout rules of `HowItWorks`, `ForWhom`, `Zones`, `Founders`, `Faq`, `SurveyTeaser`; `tests/locales.ts`; ES/EN/RU headings in `src/i18n`.

## 2. Authority and the constraints that bound any composition

Authority order (plan, `PROJECT_DECISIONS.md`): decisions → brief v1.5 → `docs/design-system/` → plan → prior implementations and external references, **as inspiration only**. A reference can therefore justify a *pattern* but can never override a token, a claim, a render disclosure or a legal sentence.

Non-negotiable for every M5 change `[doc]`:

| Constraint | Source | Composition consequence |
|---|---|---|
| Tokens, fonts pairing, one amber accent, hairlines, 8/12–16/24 radii, 4px grid | design system; decisions | No new colours, sizes off-scale, gradients other than the hero scrim, textures or glass |
| Approved media only, R1–R6 (R3 removed from the page; derivatives kept unreferenced) | decisions "Media", handoff §3.5 | No stock/placeholder imagery, no new images. R6 and the entrance render never cropped |
| Render disclosure as HTML text outside the bitmap, verbatim per locale, in `<figcaption>` and `alt`, ≥12 px, ≥4.5:1 | brief S8, §9.3 | Any hero/band redesign must keep a real, contrast-checked disclosure line attached to the image |
| Section order fixed (S7↔S8 swap allowed only via A/B) | brief §1 | Rhythm work is spacing/surface/scale only |
| S7 sentences and the uncollapsed line under the table verbatim; lawyer approval outstanding | decisions, handoff B3 | Layout-only changes to the table, and only after approval-status is checked |
| Zone selector: Spanish names untransliterated, no numbering/ranking/pins/dates/counters | decisions | No ordinal styling, map imagery or "popular" emphasis in S10 or hero |
| 24/7 only in pillar 02 and the access FAQ; no cameras/surveillance wording; no monetary price; founding-offer figures removed | decisions, handoff | Composition may not promote these into hero, meta, large display type or captions |
| EN survey disclosure beside every survey link (`aria-describedby`) | decisions | Moving a link must move its notice |
| Page useful before JS; zero-JS scroll and content; ≤1.2 MB, LCP ≤2.0 s, CLS ≤0.05, JS ≤100 KB | decisions, brief §9.2 | No runtime motion or layout-shifting hydration in M5 |
| `prefers-reduced-motion` honoured; motion belongs to M6/M7 | plan | M5 introduces no animation |

Two pre-existing conflicts this spec does **not** resolve and only routes: fonts (brief §9.2 "≤2 files, self-hosted" vs design-system README "CDN-linked"; audit O-12) and brief S3's "cards, 4×2 grid" vs the implemented hairline index (design-system "cards" are optional; brief is authority 2). Neither blocks composition; see §15 (D5) and §13 "out of M5".

## 3. Reference matrix by purpose (research plan — all sources OPEN)

Each row is a composition **purpose** CLAVERA actually needs. The reference column is empty by design (§1). The "CLAVERA anchor" column is what the repository already does, so a reference is judged as *support, refinement or counter-evidence* to that choice, not as a style to imitate.

| ID | Purpose | CLAVERA anchor `[code]` | Pattern hypothesis to test | Reference source (URL, access date) | Acceptance test for a reference |
|---|---|---|---|---|---|
| P1 | Establishing render-led hero (desktop) | R1 full-bleed, type bottom-left over lateral+bottom scrim, disclosure at content edge | Type sits on the quietest region of the image; image keeps a lit, uncovered zone | `OPEN — not researched` | Shows text-over-image where the image still carries information; scrim strength visible |
| P2 | First screen on a short phone (375×667) | 112–160 px band under a fixed 64 px header, CTA above the fold | Image treated as backdrop behind the text block instead of a separate strip | `OPEN — not researched` | A real mobile capture at ≤700 px height where image and CTA share the first screen |
| P3 | Type-only statement between two images | S2 display statement + narrow argument + two-line loop | A quiet typographic interval keeps its own scale below the hero's | `OPEN — not researched` | Scale relation between hero headline and statement is stated |
| P4 | Numbered specification list ("drawing-sheet" index) | Mono index rail ≥1200; hairline rows; 2-column index ≥860 | Index numerals aligned to a fixed rail read as documentation, not decoration | `OPEN — not researched` | Shows numerals/rules on a consistent left rail across sections |
| P5 | Full-bleed image band with caption on the content edge | R5 band 2.35:1 desktop, 16:10 mobile; caption on `--edge` | Band crop keeps the subject; caption re-enters the grid | `OPEN — not researched` | Crop ratio and caption alignment both visible |
| P6 | Portrait image beside text with controlled overlap | Entrance render pulled up across the S5/S6 boundary ≥900 | Overlap only reads when the surfaces differ enough | `OPEN — not researched` | Surface luminance step around the overlap is described |
| P7 | Comparison presented as a document (paper register) | S7 on `--bg-paper`, CLAVERA column tinted | Paper interval as a "specification sheet" inside a dark page | `OPEN — not researched` | Dark→light→dark entry/exit handled without gradients |
| P8 | Plan/diagram presentation | R6 on an inset paper sheet, legend to the right | Drawing mounted on its own ground; legend uses index numerals | `OPEN — not researched` | Legend/drawing relation and the seam with neighbours |
| P9 | Conversion tail with a single control | S10 selector, S11 "Sumate al piloto", S13 survey | One control per block, no competing chrome | `OPEN — not researched` | Tail structure and how emphasis is created without new colour |
| P10 | Section transitions | Surface change, hairline, one 2 px amber rule, hero image dissolving to graphite | Separation by register, rule and space rather than motion | `OPEN — not researched` | Transition device is static (no scroll-linked effect) |
| P11 | Mobile table | Horizontal scroll region, CLAVERA column third | Stacked rows keeping every cell verbatim | `OPEN — not researched` | Shows a comparison surviving at ≈375 px without dropping cells |

**Reference categories to draw from** (as required by the task; choose a small set, roughly 8–12 pages in total): premium architecture practices' project pages; infrastructure/transport-operator and station-design sites; urban-mobility operators and cargo/e-bike brands; and render-led property or product launches. Selection rule: a page qualifies only if it demonstrates one of P1–P11 in a way that can be described from its own layout.

**Recording protocol for the follow-up research session** (no images copied, no brand assets used):

1. Per reference: direct URL, access date, viewport at which it was observed.
2. The single pattern it supports (one of P1–P11) and one sentence on what specifically it shows.
3. One sentence on what does **not** transfer to CLAVERA (usually: type family, motion, imagery style, or a claim CLAVERA may not make).
4. Verdict per row in §3: *supports*, *refines* (state the change) or *contradicts* the anchor.
5. Where research contradicts a token or legal constraint, the constraint stands and the row records the rejection.

Until that is done, **every composition rule below is justified only by the repository, and is marked `[proposal]`**. That is a weaker basis than the plan's M4 asks for; approving this spec as "reference-driven" would be premature (§15, D1).

## 4. Grid

**Existing system `[code]`.** Content box = `.sheet`: max width 1320 px (`--shell`), side padding `--gutter: clamp(20px, 5vw, 72px)`; from 1200 px a left index rail `--rail: clamp(88px, 7vw, 120px)` becomes a real grid column so body content shares one left edge. `.bleed`/`.bleed-right` escape to the viewport using `--edge`/`--edge-inner`; `--edge-exact` is used where alignment matters. Column splits are ad hoc `fr` pairs per section.

**Current splits, expressed as a percentage of the content column `[calc]`:**

| Section | Rule | Ratio | Nearest named split |
|---|---|---|---|
| S3 intro / FAQ | 0.8 : 1 / 0.9 : 1 | 44:56 / 47:53 | 5/7, 6/6 |
| S2 grid | 1 : 0.85 | 54:46 | 6/6 |
| S9 | 0.85 : 1 | 46:54 | 6/6 |
| S6 | 1 : 0.62 | 62:38 | 7/5 |
| S8 plan sheet | 1 : 0.42 | 70:30 | 8/4 |

**Proposal G1 `[proposal]`.** Treat the content column as 12 columns and allow only four splits — **5/7, 6/6, 7/5, 8/4** — snapping the values above to the nearest. Gain: vertical column edges recur from section to section, which is what makes an asymmetric page read as one sheet. Risk: small shifts in image width. Snap only where a before/after screenshot shows no regression; do not add new ratios.

**Proposal G2 `[proposal]`.** Name three width tiers and stop adding thresholds. The code currently switches at 599/600, 700, 760, 800, 860, 900, 1100 and 1200 px (`[code]`, grep of section styles), which makes behaviour between 700 and 900 hard to reason about:

| Tier | Range | Behaviour |
|---|---|---|
| Mobile | <700 (compact hero branch ≤599 wide × ≤700 tall retained) | Single column, stacked composition |
| Tablet | 700–899 | Single column, wider figures, header switcher visible |
| Desktop | ≥900 (rail from ≥1200) | Split compositions, hero overlay |

Consolidation targets: 760 (comparison scroll), 800 (S4 three columns) and 860 (pillar index) fold into 700/900 **only if** the resulting 700–899 rendering is checked at 768. If a tier boundary would degrade a section, keep that threshold and record why.

**Grid rules `[proposal]`:** reading order equals DOM order (no `order:` re-sequencing of content); no fixed heights on text containers; images may bleed, text and captions may not; the mono index rail is decorative and stays `aria-hidden`.

## 5. Type-scale usage

All sizes are the approved tokens (`typography.css`); fluid values interpolate only between token sizes `[doc][code]`.

| Role | Approved token | Current fluid rule `[code]` | Usage rule `[proposal]` |
|---|---|---|---|
| Hero H1 | display-2xl 72/76, 800 | `--fluid-display`: 44 → 72, 72 reached at ≈1333 px `[calc]` | The only 72 px moment on first load |
| S2 statement | display-2xl max | mobile: `--fluid-display`; ≥900: `clamp(56, 5.2vw+1rem, 84px)` | See T1 |
| Section H2 | h2 28/32 → display-lg 44 | `--fluid-h2` | One per section, ≤3 lines at 375 in every locale |
| Vehicles line | h1 36 → display-xl 56 | `--fluid-display-sm` | Only as a run-in list, never as a heading |
| Lede | body-md → body-lg | `--fluid-lede` | ≤48ch in hero, 62ch elsewhere |
| Body | body-md 16/24 | | Default; body-sm (12) never for running content |
| Eyebrow | 12, uppercase, 0.12em | `.eyebrow` | One per section header |
| Mono | mono-sm 12 / md 16 | `.mono` (forces uppercase) | See T2 |

**T1 — S2 statement scale.** The 84 px maximum is not a token (`[doc]`, largest is 72; audit O-11), and the ≥900 override also creates a size step at 900 px: just below it the size is ≈54 px, at it ≈63 px `[calc]`. **Recommend: delete the ≥900 override so S2 uses `--fluid-display` (max 72).** This is the smallest change that is token-conformant and removes the step. A/B option for the visual check: cap S2 at display-xl (56) to keep the hero as the only 72 px moment (hierarchy option). A designer-approved 84 px exception is the third option and needs a recorded decision. Default if no decision is recorded: 72.

**T2 — Uppercase mono.** README reserves uppercase for the eyebrow/label token; `.mono` forces uppercase for the hero facts strip, header note, S2 loop labels, comparison headers and the S8 legend title (audit O-14). **Recommend conforming to README**: keep uppercase only for the eyebrow, index numerals and short labels (≤2 words); set longer mono strings in sentence case. Cyrillic tracked uppercase is the hardest case, which is why RU is the test locale. Needs designer acknowledgement because it departs from current behaviour; it is not a change of tokens.

**T3 — Line-height.** Display uses unitless 1.02–1.08 instead of the token's 4px-grid line (76/72 = 1.056). Acceptable with fluid sizes (audit note); no action.

**T4 — Fonts.** The spec assumes the approved pairing (Plus Jakarta Sans, Onest, IBM Plex Mono). Whether the served Plus Jakarta Sans covers Cyrillic is unverified (audit O-13); if it does not, RU display headings fall back to Helvetica Neue/Arial and every RU line-count judgement below shifts. Verification precedes M5.3.

## 6. Image scale and cropping

Native sizes and ratios from `media.ts` `[doc]`; crops from section CSS `[code]`.

| Render | Role | Native (ratio) | Desktop | Tablet / mobile | Crop rule |
|---|---|---|---|---|---|
| R1 | S1 hero, only true full-viewport image | 2752×1536 (1.79) | full-bleed, section `min(92svh, 900px)`, `object-position 50% 42%` | 40svh band (260–420 px); ≤599×≤700: 112–160 px | Cover crop only; keeps lit corridor right |
| R2 | S3 opener, bleeds right | 2528×1696 (1.49) | ≈60vw, natural ratio | 100vw, natural | No crop |
| R5 | S5 full-bleed band | 2752×1536 (1.79) | 2.35:1 (trims ≈24 % height `[calc]`), `50% 55%` | 16:10 (trims ≈11 % width `[calc]`) | Only render besides R1 allowed to bleed both edges |
| Entrance | S6 portrait (never R3) | 3712×4608 (0.81) | ≈38vw, pulled up ≥900 | 100vw, max 480 px | Never cropped |
| R6 | S8 plan on paper | 2048×2048 (1.0) | ≈52vw inside sheet | 88vw | **Never cropped** (legend legibility) |
| R4 | S8, lockers, with caption | 2528×1696 (1.49) | 64 % width, right-aligned | 100vw | No crop |
| R3 | Removed | — | — | — | Derivatives kept, unreferenced |

**Scale cadence `[proposal]`.** Alternate large and small so no two neighbours compete: hero (viewport) → R2 (60vw, bleed one side) → R5 (full-width, short) → entrance (38vw portrait) → R6 (inset on paper) → R4 (64 % offset). Keep this order of scales when adjusting anything.

**Rules `[proposal]`:** (1) at most one image taller than 80 % of the viewport per screen; (2) any cover crop trims ≤25 % of an axis and the important region is confirmed **by eye** at 1440, 768 and 375 (audit O-08 remains open); (3) captions/disclosures re-enter the content edge even when the image bleeds (already true for R5); (4) `sizes` follow the table so no image is fetched wider than it is displayed; (5) hero remains `loading=eager`, `fetchpriority=high` with intrinsic width/height; all others lazy.

**Ultra-wide note `[calc]`.** The widest R1 derivative is 2048 px, so viewports wider than 2048 px upscale it. Not assessed; record if the visual pass includes ≥2200 px.

## 7. Section rhythm and surfaces

Current sequence `[code]` (base = graphite-950; raised = graphite-900; the lightness step is ≈3 points, `colors.css` `[calc]`):

| # | Section | Surface | Rhythm | Character |
|---|---|---|---|---|
| S1 | Hero | base | own | image, type over it |
| S2 | Problema | base | loose | type only |
| S3 | Solución | raised, hairline | loose | R2 bleed + index |
| S4 | Cómo funciona | base | tight | 3-step rail |
| S5 | Vehículos | base | tight | R5 full-bleed + run-in list |
| S6 | Seguridad | raised | default | text + portrait overlap |
| S7 | Comparación | paper | default | document |
| S8 | Hub | base (+ paper sheet) | loose | plan + R4 |
| S9 | Casos | base | loose | quiet list |
| S10 | Zonas | raised, hairline | default | heading + selector |
| S11 | Sumate al piloto | raised, 2 px amber rule | loose | conversion |
| S12 | FAQ | base, hairline | default | disclosure list |
| S13 | Encuesta | base | coda | tail |

**Rules `[proposal]`:**

- **R-1** Never more than two consecutive sections on the same surface, except S4→S5 (linked content) and S13 (a coda).
- **R-2** Rhythm steps are the existing three (`tight`, default, `loose`) plus `coda`; do not add values. Dense sections (S4, S5) stay tight; sections that end an argument (S2, S3, S8, S9, S11) stay loose.
- **R-3** One paper interval (S7) and one paper inset (S8). No third.
- **R-4** No two image-dominant sections adjacent. S5 (R5) and S6 (portrait) are adjacent today; S5's list and note plus S6's text/portrait split satisfy this only if the visual pass agrees.
- **R-5** The 2 px amber rule stays a single, page-level moment (S11).

**Tail proposal (R-6, resolves audit O-05) `[proposal]`.** S10 and S11 are both raised, separated only by the amber rule, and S10 is a heading plus the same selector as the hero. Try, in this order: (a) alternate the tail — S10 raised, **S11 base with the amber rule**, **S12 raised with hairline**, S13 base; (b) if the surface step is too faint to read, evaluate the existing `--bg-elevated` (graphite-850) for section-level "raised", which is an approved semantic token, before considering anything else. Each is a screenshot comparison; neither introduces a colour.

**Pillar grid (O-07).** Seven rows in two columns leave one empty cell. Accept as content-defined, or place the planned-service note in that cell; do not restore pillar 08 or add filler.

**Vertical padding (S-14).** Symmetric padding is used; test an optical reduction of the bottom padding on the loosest sections only if the visual pass shows sections ending heavy. No token change.

## 8. Full-bleed rules

1. **Two full-bleed images only:** R1 (hero) and R5 (band). R2 bleeds one side; nothing else touches the viewport edge.
2. Never place full-bleed images in adjacent sections; hero and R5 are separated by S2, S3 and S4.
3. The only permitted gradient is the hero scrim (functional). No scrim over R5; no text on R5.
4. Full-bleed images are cover-cropped from a stated ratio per tier (hero: viewport; R5: 2.35:1 desktop, 16:10 mobile). Crops are decided by eye, not by ratio alone.
5. Captions, disclosures and any text stay on the content edge (`--edge-inner`/`--edge`), even when the image escapes.
6. Full-bleed uses `100vw` escape tokens and `body { overflow-x: clip }`; any new bleed must be checked for horizontal scroll at 320 and 375 px.
7. Height ceiling: a bleed band never exceeds 80svh at any tier.

## 9. Transition logic

Separation is made with **register, rule and space**, never motion (`[proposal]`, consistent with README and plan).

| Device | Where | Rule |
|---|---|---|
| Surface change (base ↔ raised) | S3, S6, S10–S12 | Only as strong as the token step allows; never add a colour to compensate |
| Hairline `--border-hairline` | section tops (`divider`), rows, table | The default separator |
| Amber 2 px rule | S11 only | One per page |
| Image dissolve to graphite | hero bottom | Bottom scrim ends on exactly `graphite-950` so S2 starts seamlessly |
| Paper register | S7, S8 sheet | Entered and left by a hard edge, no gradient; inset sheet keeps 24–48 px graphite margin |
| Overlap | S6 portrait, ≥900 only | Kept only if the visual pass shows it reads (audit O-06). If it does not, the fallback is an aligned, non-overlapping portrait; do not raise the surface contrast beyond an approved token to force it |
| Anchor scrolling | all `[id]` | `scroll-margin-top: var(--anchor-offset)`; smooth only under `no-preference` |

No parallax, scroll-linked, sticky-reveal or stagger effects in M5. Anything of that kind is an M6 map item and needs a recorded decision.

## 10. Per-breakpoint composition

Tiers per G2. The table describes the current build `[code]`; changes are only those in §13.

| Section | Desktop (≥900; rail ≥1200) | Tablet (700–899) | Mobile (<700; 375 wide) |
|---|---|---|---|
| S1 Hero | Full-viewport R1; eyebrow, H1 (15ch), lede, selector, ghost CTA, facts stacked bottom-left; scrim; disclosure bottom-right. **Fold at 1440×800 / 1280×720 unmeasured** | Stacked: 40svh band, text below | Band → text; buttons and facts stack full width. ≤700 tall: 112–160 px band (see H-1) |
| S2 Problema | Statement over 2-col (argument / daily loop); accent-ruled close | Single column | Single column; statement at token clamp |
| S3 Solución | Text left + R2 bleeding right; 2-col hairline index (≥860) | Single-column index | Single-column index |
| S4 Cómo funciona | 3-step rail (≥800), amber ticks | Stacked (<800) | Stacked |
| S5 Vehículos | R5 2.35:1 full-bleed; list run-in at 32ch; note under a hairline | R5 16:10 | R5 16:10; list stacks, separators hidden |
| S6 Seguridad | Text 1 : 0.62 portrait, overlap ≥900 | Portrait below text | Portrait below text, ≤480 px |
| S7 Comparación | Full table on paper | Table; scroll region <760 | Scroll region, hint; CLAVERA column starts off-screen (see C-1) |
| S8 Hub | Plan sheet 1 : 0.42 with legend; R4 at 64 % right | Sheet stacked; R4 100 % | Sheet stacked, 24 px inset; R4 100 % |
| S9 Casos | 0.85 : 1 header / list | Single column | Single column |
| S10 Zonas | Heading + selector + note | Same | Same |
| S11 Sumate | Amber rule; heading (16ch), non-binding text, survey action | Single column | Single column |
| S12 FAQ | 0.9 : 1 header / list | Single column | Single column; question 28ch |
| S13 Encuesta | Row (≥800) | Row/column | Column |

**H-1 — Hero at 375×667 `[proposal]`.** `[calc]`: at this height the band is ≈113 px (`17svh`, min 112). The header is fixed at 64 px and the hero starts at y=0, so roughly 64 px of that band sits under the header's scrim and blur, leaving ≈49 px of visible image. R1 cover-cropped to 375×113 shows ≈54 % of the render's height (audit O-01); the visible part below the header is ≈23 % `[calc]`. The fold rule (brief S1) and Codex's 644.25 px CTA measurement leave ≈23 px of slack, so the budget cannot come from the copy. Two candidates, to be **prototyped and screenshotted in three locales before choosing**:

- **A (recommended to try):** on short phones make R1 a backdrop behind header, eyebrow and H1 (as on desktop) under a stronger local scrim, so the image occupies the whole text block at zero fold cost. Constraints: the disclosure stays real text with ≥4.5:1 measured against the scrim behind it; H1 contrast ≥4.5:1 (large text ≥3:1); no bitmap text is added.
- **B (fallback):** keep the current band, adjust `object-position` and the scrim so the most informative strip of R1 falls in the ≈49 px visible below the header.

If neither passes by eye, the decision goes to Kirill because the fold rule is a hard brief requirement; the alternative "relax the fold" is not proposed here.

**H-2 — Hero at desktop `[proposal]`.** Measure the selector button's bottom in each locale at 1440×800 and 1280×720. If it falls below the fold, trim `padding-block` (top `header + 64`, bottom `96`) before touching copy or type. Judge the triple scrim (audit O-03) by eye; if it reads muddy, reduce the lateral scrim toward the left column only, keeping the bottom scrim and the wordmark separation.

**C-1 — Comparison on mobile `[proposal, gated]`.** Keep the scroll region by default (approval for S7 is outstanding). A stacked per-row layout is the candidate if approved: every cell and the uncollapsed line under the table stay verbatim, source column order is kept, column-header text is reused (no new copy), table semantics preserved. This is layout-only, but because S7 is legally sensitive it should not start until Kirill confirms.

**SEL-1 — Selector (audit O-04) `[proposal]`.** Reserve the space of the revealed field so the button does not move on un-hide; add a visible list affordance; define an empty-result state **structurally** (a reserved element). The words need ES/EN/RU copy from the owner and are not written here.

## 11. ES / EN / RU text expansion

Rule: **design for the longest of the three per element, never with per-locale offsets** (decision "Design consequence"). All intrinsic sizing; no `height` on text containers; no clipped or hidden text.

Heading lengths counted by hand from `src/i18n` (characters, ±1; recount with a script in M5.3):

| Element | ES | EN | RU | Longest |
|---|---|---|---|---|
| Hero H1 | 44 | 44 | 52 | RU |
| S3 heading | 48 | 48 | 50 | RU |
| S4 heading | 46 | 48 | 48 | EN/RU |
| S5 heading | 36 | 36 | **57** | RU (+58 % vs ES) |
| S6 heading | 22 | 18 | 26 | RU |
| S7 heading | 44 | 50 | 47 | EN |
| S8 heading | 33 | 38 | 30 | EN |
| S9 heading | 48 | 51 | 55 | RU |
| S10 heading | 20 | 21 | 19 | EN |
| S11 heading | 16 | 14 | 22 | RU |
| S12 heading | 31 | 38 | 28 | EN |
| S13 heading | 36 | 41 | 45 | RU |

Observations `[code][calc]`: RU is longest in 7 of 12 headings; Cyrillic capitals and the tracked eyebrow are wider than Latin at the same size, but this is **not measured**. Fixed `ch` measures meet the longest locale at the hero H1 (15ch), S2 (22ch), section header on mobile (26ch), R5 list (32ch), S11 (16ch), S9 items (34ch), FAQ question (28ch), header CTA (one line <700).

**Rules `[proposal]`:**

1. `ch` values are *preferred* measures; the longest locale must wrap to more lines, not shrink or clip. Verify line counts of the hero H1, S2 statement, S5 heading and S9 heading at 1440, 768, 375 per locale.
2. Headings ≤3 lines at 375 in every locale for section H2; the hero H1 has no line cap but must keep the fold.
3. Buttons and the header CTA: intrinsic width; no locale-specific offsets; RU is the fold test locale.
4. English carries the survey-language disclosure (one extra line under both selectors) — count it in every EN layout budget.
5. Zone names stay Spanish and carry `lang="es-AR"`; never transliterated.
6. Line-count judgements are **invalid until fonts are confirmed loaded** and Cyrillic coverage of the display face is verified (audit O-13, T4).

## 12. Accessibility (WCAG 2.2 AA, brief §9.3)

`[proposal]` checks the composition must pass; none has been run.

- **Contrast over imagery:** hero H1, lede, eyebrow and the disclosure measured against the scrim at desktop and on any mobile backdrop variant (H-1 A). Disclosure ≥4.5:1 and ≥12 px in every variant. On paper, tertiary text uses the existing paper override (concrete-700).
- **Focus not obscured (2.4.11):** the fixed 64/72 px header and `--anchor-offset` already clear anchors; verify that keyboard focus inside S10/S11/FAQ is not hidden by the header at 375×667 and at 200 % zoom.
- **Reflow (1.4.10):** no horizontal page scroll at 320 CSS px; the comparison table is the one accepted scroll region (data table), it is keyboard-focusable and labelled.
- **Target size (2.5.8):** selector control, footer links and language switcher ≥24 CSS px.
- **Text spacing (1.4.12):** no fixed heights on text; test with user text-spacing overrides.
- **Reading order:** DOM order equals visual order (G rules), including the S6 overlap and the S8 sheet.
- **Non-text contrast (1.4.11):** the selector's input border and focus ring ≥3:1 on both surfaces; hairlines are decorative.
- **Overlap and scrim:** no text over an image without a measured scrim; no text over R5.
- **Headings and landmarks:** one H1; each section keeps `aria-labelledby`; the header/footer switcher rules stay as built.
- **Motion:** none added; reduced-motion rules unchanged.
- **Language:** `lang` on ES legal footer text and Spanish zone names remains.

## 13. Bounded M5 implementation sequence

Nothing below starts without Kirill approving this spec (§14). Each step is one session, one commit, one Codex review (plan protocol 6–7). **No step edits copy or legal text, adds a dependency or asset, or touches motion.**

| Step | Scope | Files (expected) | Evidence to attach | Stop condition |
|---|---|---|---|---|
| **M5.0** Baseline (this is audit M4.1) | Install locked deps, build, measure and screenshot the O-items at 375×667, 1280×720, 1440×800, plus 1440/768/375, ES/EN/RU; font gate first | none (evidence only; `docs/project/M4_EVIDENCE.md`) | Contact sheet; each O-item marked measured/seen/inferred | Any needed source edit; deps not installable here |
| **M5.1** Type conformance | T1 (S2 uses `--fluid-display`; A/B 56 optional), T2 (mono uppercase scope, if designer acknowledges), raw selector shadow → token | `ProblemSection`, `global.css`, `ZoneSelector` | Before/after at 1440/768/375, ES/EN/RU | Designer rejects T2; any new size |
| **M5.2** Hero | H-1 prototype A vs B; H-2 fold and scrim; SEL-1 layout stability (no copy) | `Hero.astro`, `ZoneSelector.astro` | RU/EN/ES CTA bottom vs fold at 375×667, 1440×800, 1280×720; contrast numbers; CLS reading | Fold test fails in any locale; disclosure contrast <4.5:1 |
| **M5.3** Rhythm and surfaces | R-1…R-6, pillar cell, S-14 test, S6 overlap decision | `LandingPage`, `Section`, section files | Full-page captures per tier | Needs a colour outside tokens |
| **M5.4** Grid and images | G1 snapping, R5/R2/R4 crops by eye, `sizes` review | section files, `RenderFigure` call sites | Crops at 3 tiers; network transfer for images | Disclosure/`alt` altered; bytes over budget |
| **M5.5** Tablet and thresholds | G2 consolidation checked at 700, 768, 899, 900 | section CSS | 700–899 captures | Any tier regression that cannot be justified |
| **M5.6** Locale expansion | §11 measures and line counts fixed where they fail | section CSS | Per-locale line counts | Fix needs copy change |
| **M5.7** Comparison mobile (**gated**) | C-1 only if Kirill confirms S7 handling | `ComparisonSection` | Cell-for-cell text diff; a11y snapshot | Any cell/line differs; approval not recorded |
| **M5.8** Critique | Impeccable critique of the result | — | Findings list | Impeccable is **not installed** (plan: approved, install pending); installing is a separate approved task |

Existing gates apply at each step: `git diff --check`, `yarn astro check`, `yarn build`, the Playwright suite including `tests/legal.spec.ts`, and the terminology and disclosure tests. Add 375×667 and 1280×720 to the screenshot suite only as a test-tooling change approved in M5.0.

**Explicitly out of M5:** motion (M6/M7); font self-hosting and the ≤2-file budget (separate decision, audit O-12); og:image, favicon, 404 (M9); the empty-result copy, any FAQ/legal/S7 wording; the header-blur wording vs README (M6 territory, O-16); footer-only language switching (owner question, O-17).

## 14. How each material Taste recommendation was decided

Verdicts are for this specification only. Section refs point here; IDs point to `M4_TASTE_AUDIT.md`.

| ID | Recommendation | Verdict here | Reason against brand and legal constraints |
|---|---|---|---|
| S-01 / S-30 | Replace the type family; "font swap first" | **Rejected** | Approved pairing; plan names this conflict. Self-hosting the *same* fonts is a separate decision (§5 T4, §13 out-of-scope) |
| S-02 | Headline presence, tracking, measure, balance | **Already met**; extended | Kept as §5 rules; no token change |
| S-03 | Sentence case instead of caps | **Accepted, modified** (T2) | Applies only where README already says uppercase is reserved; the eyebrow stays uppercase |
| S-04 | No pure black, one accent | **Already met** | Kept (R-5) |
| S-05 | Tinted/coloured shadows | **Rejected**; one sub-item **accepted** | Shadows are tokens; only the raw shadow in `ZoneSelector` becomes a token (M5.1) |
| S-06 | Noise, grain, mesh, glass | **Rejected** | README forbids textures, decorative gradients and general glass |
| S-07 | "Random dark section in a light page" | **Rejected** | Sanctioned single paper register (R-3) |
| S-08 | Background imagery for empty sections; placeholder images | **Rejected** | Approved renders only; S2 is deliberately image-free (P3) |
| S-09 | Break symmetry, overlap, depth | **Already met** → tested | Kept; overlap legibility is a visual check (§9), fallback defined |
| S-10 | Avoid three equal columns | **Rejected (no action)** | S4 is content-defined and set as a rail, not cards |
| S-13 | Double the whitespace | **Rejected** | Rhythm tokens already loose; mobile 4G page weight and length |
| S-14 | Asymmetric vertical padding | **Accepted, modified** | Test on loosest sections only (§7) |
| S-16 | Empty/error states | **Accepted, modified** (SEL-1) | Structure only; copy is owner-authored and legally controlled, not invented here |
| S-17 | Smooth scroll | **Already met** | Gated on `no-preference` |
| S-18 | Replace FAQ accordion | **Rejected** | Brief S12/§9.3 and AEO |
| S-19 | Change button pair | **Rejected** | Brief hierarchy |
| S-22 | Copy audit | **Rejected** | Copy is owner-authored and legally controlled |
| S-23 | og:image, favicon, 404 | **Deferred to M9** | Needs approved assets |
| S-24 | Cookie banner | **Rejected** | Consent is a legal matter; no browser tracking by decision |
| S-26 / S-27 | Scroll-linked motion, text-mask effects | **Rejected now / M6** | README calm/no bounce; plan puts motion after this spec |
| O-01 | Mobile hero band a sliver | **Accepted** → H-1 | Fold rule is a hard brief requirement; disclosure stays real text |
| O-02 / O-03 | Desktop fold and scrim | **Accepted** → H-2 | Measure first; trim padding before copy |
| O-04 | Selector affordance/no-JS/CLS | **Accepted, modified** → SEL-1 | No new words; the no-JS question ("page useful before JS") stays owner-visible |
| O-05 | S10/S11 both raised | **Accepted** → R-6 | Section order unchanged (brief §1) |
| O-06 | Overlap may not read | **Accepted, conditional** → §9 | Fallback defined |
| O-07 | Seven-pillar empty cell | **Accepted as note** | Do not restore pillar 08 (removed per handoff) |
| O-08 | R5 crop | **Accepted** → §6 rule 2 | Verified by eye; R6/entrance stay uncropped |
| O-09 | Comparison mobile | **Accepted, gated** → C-1 | S7 approval outstanding; text verbatim |
| O-11 | 84 px exceeds scale | **Accepted** → T1 | Design system outranks the current override |
| O-12 | Fonts vs brief §9.2 | **Routed, not decided** | Legal (processor list) and performance decision; not composition |
| O-13 | RU display coverage | **Accepted as precondition** → T4 | Blocks line-count judgement |
| O-14 | Uppercase mono | **Accepted, modified** → T2 | Conform to README; needs designer |
| O-15 | Locale hot spots | **Accepted** → §11 | Longest-locale rule |
| O-16 | Header blur vs README | **Deferred to M6** | Departs from README wording; outside composition |
| O-17 | Footer-only switcher on phones | **Routed to owner** | Brief Part V permits; not a composition defect |
| O-18 | No motion | **Confirmed** | M6/M7 |
| O-19 | Leftovers | **Partly accepted** | Shadow token in M5.1; `.button:disabled`, og:image, favicon, 404 not composition |

## 15. Decisions needed

**Nothing blocks the specification as a document.** These decisions are needed before the steps that depend on them; each has a default.

| # | Decision | Needed before | Default if unrecorded |
|---|---|---|---|
| D1 | Approve reference research to run with web tools in an interactive session (this session could not grant them). No purchase is involved; Refero is optional and unbought | Calling this spec "reference-driven"; M5 approval | Spec stays `[proposal]`, code-derived only |
| D2 | S2 scale: 72 (default), 56 (hierarchy option) or an 84 exception | M5.1 | 72 |
| D3 | Designer acknowledgement of T2 (mono uppercase scope) | M5.1 | Leave as built |
| D4 | Short-phone hero: A (backdrop), B (band), or Kirill's ruling after the prototype | M5.2 | Prototype both; no default choice |
| D5 | Font hosting and the Cyrillic check | M5.6 | Type-dependent judgements marked invalid |
| D6 | S7 mobile layout (C-1) and S7 legal status | M5.7 | Scroll region stays |
| D7 | Owner copy for the selector's empty state | Any wording in SEL-1 | Structure only |
| D8 | Whether the M4.1 evidence run can be executed in this harness or must be run by Kirill/Codex (deps not installed; earlier sessions could not get `yarn`/`astro` approved) | M5.0 | Run locally by Kirill/Codex |

**Approval checklist for Kirill:** (1) accept §1's research gap and D1; (2) accept or amend §4 G1/G2; (3) accept §5 T1–T2; (4) accept §6–§9 rules; (5) accept the §13 sequence and its stop conditions; (6) accept the §14 ledger. Approval of the spec is not visual acceptance and not legal approval.

## 16. Bookkeeping left undone on purpose

`CLAVERA_EXECUTION_PLAN.md` (M4 status, Taste "not yet run") and `CLAVERA_WORKLOG.md` were **not** edited by this task. Update both after this spec and the audit are reviewed (plan protocol 8). Nothing was committed, pushed, installed, published or bought.
