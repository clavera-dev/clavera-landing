# M4 — Taste Skill art-direction audit

Date: 2026-09-28
Branch / commit audited: `agent/clavera/e12d73832d78` at `4aa30b7` (clean tree, includes the M3.5.2 candidate and owner response v1.2 as committed)
Status: **findings for review. Nothing here is approved, and nothing has been implemented.** This is the isolated, read-only Taste run required by `CLAVERA_EXECUTION_PLAN.md` (tool registry, "Taste Skill"; M4). It is not visual acceptance, not legal approval and not a deployment step.

## 1. Scope, method and honesty statement

**What was done.** The vendored `.claude/skills/redesign-existing-projects/SKILL.md` (unmodified, hash recorded in `skills-lock.json`) was used as a *critique checklist only*. Its "Fix" step was not performed. No site code, design asset, token, legal text, test, dependency or config was changed. Only this file was written.

**Authority applied.** Per the plan, the skill sits at position 5, below `PROJECT_DECISIONS.md`, the brief v1.5, `docs/design-system/` and the plan. Owner response v1.2 and Legal Spec v3.0 are the working basis, as instructed. Where the skill conflicts with any of them, the recommendation is rejected (section 5).

**Evidence actually available — and what is missing.**

| Evidence | State in this worktree |
|---|---|
| Source code, tokens, i18n copy, tests | Present, read |
| Screenshots / images of the built site | **None** (`*.png/jpg` glob: no files; no `test-results/`, no `playwright-report/`) |
| Built output (`dist/`) | **None** |
| `node_modules` | **None** (no Astro, no Playwright available to run) |
| Browser or Playwright run by this audit | **None** |
| Refero | Unavailable by instruction; not connected |

Consequently **no observation below is visually verified or measured.** Every item is labelled `[code-inferred]` (derived from reading CSS/markup/copy, sometimes with arithmetic from CSS values) or `[document-verified]` (a fact about the repository's own files, e.g. a conflict between two documents). The only measured/visual claims in the repository are Codex's, recorded in `CLAVERA_WORKLOG.md` (2026-09-28 review: RU hero CTA bottom 644.25 px at 375×667; four legal-page views inspected). I cite that as secondary evidence and do not extend it.

**Files read:** `PROJECT_DECISIONS.md`; `docs/project/CLAVERA_EXECUTION_PLAN.md`; latest `CLAVERA_WORKLOG.md` entries; `CLAUDE.md`; brief v1.5 (§1, S1, §9.2, §9.3 and headings); `docs/design-system/README.md`, `renders-README.md`, all `tokens/*.css`, and the type-mono, type-labels, motion, spacing-in-use and elevation cards; `src/styles/global.css`; `BaseLayout`, `LandingPage`, `Header`, `Footer`, `Section`, `RenderFigure`, `ZoneSelector` and all 13 section components; `src/data/media.ts`; i18n key structure and hero/section copy in `es/en/ru`; `tests/screenshots.spec.ts`, `tests/locales.ts`; `package.json`.

## 2. What is already working (positive controls, `[code-inferred]`)

These are recorded so the audit is not only a fault list, and so M5 does not "fix" them.

- Section pacing is deliberately varied rather than a stack of identical bands: full-bleed hero → type-only S2 → bleed-right R2 + hairline index → 3-step rail → full-bleed R5 band → portrait overlap → paper comparison → paper plan sheet → quiet S9 list → conversion tail (`LandingPage.astro`, each section file's header comment).
- Cards are avoided: hairline rows, amber ticks, index numerals. This matches README "Cards"/"Borders" and avoids the skill's "generic card" and "three equal cards" flags.
- Tokens are respected almost everywhere: graphite (never `#000`), one amber accent, hairlines, 8px controls, 4px grid spacing (`global.css`, `tokens/*.css`).
- Layout is left-aligned and asymmetric with a real max-width shell and a rail (`global.css:26-116`, `.sheet`, `.bleed*`); `svh` is used instead of `vh` for full-height sections (`Hero.astro:236,347`).
- Focus ring, active-press scale, hover states, skip link, `prefers-reduced-motion` handling and a *gated* `scroll-behavior: smooth` already exist (`base.css:7`, `global.css:131-146,483-550`).
- Hero LCP image is eager with `fetchpriority="high"` and intrinsic width/height (`Hero.astro:33-41`), as brief S1 asks.

## 3. Observations

Severity words are an audit judgement, not a defect ruling: **Concern** (likely worth a decision), **Question** (needs eyes or a measurement), **Note** (low priority / housekeeping).

### 3.1 Hero (S1)

**O-01 — Mobile hero image is reduced to a sliver on short phones. Concern. `[code-inferred]`**
`Hero.astro:290-299`: at `max-width:599px` and `max-height:700px` the image band is `height:17svh; min-height:112px; max-height:160px`. At 375×667 that resolves to ≈113 px. R1 is 2752×1536 (`media.ts:72`), so a 375×113 box shows roughly the middle 54 % of the image's height. On taller phones (e.g. 390×844) the band is ≈338 px and shows roughly the middle 64 % of its width (arithmetic from `object-fit: cover`, `object-position: 50% 42%`). The trade-off was deliberate and documented (`Hero.astro:267-289`) to satisfy brief S1's "primary CTA visible at 375×667", and it recovered the budget from the image rather than the copy. Whether a 113 px strip still carries the "render-led" establishing shot is a visual judgement. Locale: sized against Russian, the longest; ES/EN have slack the design does not use.

**O-02 — Desktop hero stacks many blocks over the image; fold behaviour above mobile is unmeasured. Question. `[code-inferred]`**
`Hero.astro:48-64` stacks eyebrow, display H1 (up to 72 px, `max-width:15ch`, `:177`), lede, the zone selector (label + row + caption + EN notice), the secondary button, and the facts strip, inside `min-height: min(92svh, 900px)` with top padding `header + 64px` and bottom `96px` (`:347-352`). Only 375×667 has a fold assertion. The RU heading is 52 characters against 44 in ES/EN, so it will take more lines. Whether the selector's "Seguir/Далее" clears the fold at, say, 1440×800 or 1280×720 in each locale is not established by anything in the repository.

**O-03 — Three stacked gradients darken the left ~60 % of the hero image on desktop. Question. `[code-inferred]`**
`Hero.astro:120-139`: a lateral scrim (0.92 → 0 by 80 %) plus a bottom scrim plus the header's own top scrim (`Header.astro:56-75`). The code comment says this is intentional to separate the headline from the render's lit wordmark. The audit cannot tell whether the result reads as a considered vignette or as a muddy image; it needs eyes.

**O-04 — Zone selector: affordance, no-JS state and load shift. Concern. `[code-inferred]`**
- The field is `hidden` until the script ends (`ZoneSelector.astro:68,198`). The visible `<label for>` question ("¿Dónde la necesitás?") therefore has no control without JavaScript, and before the script runs. `PROJECT_DECISIONS.md` says the page "must remain useful before JavaScript finishes loading"; the button still works, but the page asks a question it cannot take an answer to.
- Un-hiding a flex item that was absent changes the row's layout after first paint (button moves as the field appears). Whether this produces measurable CLS against the ≤0.05 budget (brief §9.2) is unmeasured.
- The input reserves `padding-right: var(--space-10)` (`:249`) but no indicator is drawn, so the only cue that this is a list is the placeholder. It is `type="search"`, so WebKit may draw its own clear control in that gap.
- When a query matches nothing, all options are hidden but the list stays open with its border and padding (`:146-153`), i.e. an empty box and no "no results" state.

### 3.2 Composition, rhythm and imagery

**O-05 — Two consecutive raised sections plus a near-empty S10. Question. `[code-inferred]`**
S10 (`ZonesSection.astro`) is heading + the same selector as the hero + a caption, on `surface="raised"`, immediately followed by S11 also `raised` (`FoundersSection.astro`), separated only by S11's 2 px amber rule. The tail S10 / S11 / S13 is three "one control + note" blocks. Brief §1 fixes section order ("Порядок секций фиксирован"), so any change here is spacing/surface, not restructuring.

**O-06 — The portrait "overlap" may not read. Question. `[code-inferred]`**
`SecuritySection.astro:8-14,112-115` pulls the entrance render up by `rhythm + 64px` to cross into the previous section, described as a "controlled overlap". The two surfaces are S5 on `--bg-base` (graphite-950, L 15 %) and S6 on `--bg-surface` (graphite-900, L 18 %): a 3-point lightness step. The image will cross a boundary that is barely visible, so the device may read as a misplaced image rather than deliberate layering. Desktop only (`≥900px`).

**O-07 — Seven pillars in a two-column grid leave an empty bottom-right cell. Note. `[code-inferred]`**
Pillar 08 was removed (`es.ts:67-79`). At `≥860px` the index is two columns (`PillarsSection.astro:153-171`); with seven rows the last row has one item and the closing-rule logic ends the right column one row above the left. Cosmetic.

**O-08 — R5 band crop differs from the render's native ratio. Question. `[code-inferred]`**
R5 is 2752×1536 ≈ 1.79:1. Desktop band ratio is 2.35:1 (`VehiclesSection.astro:134-136`), which trims ≈24 % of the height; mobile is 16:10 (`:60-62`), which trims ≈11 % of the width. The section comment says R5's composition survives the crop; nothing verifies it.

**O-09 — Comparison table on mobile hides the highlighted column first. Concern. `[code-inferred]`**
`ComparisonSection.astro:85` sets `min-width:660px`; below 760 px it becomes a horizontal scroll region with an accent hint (`:147-153`). CLAVERA's column is the third and the only emphasised one (`:42,55,128-138`), so at 375 px it starts off-screen. Any alternative (stacked rows) would have to keep every cell and the mandatory line under the table verbatim, since S7 is legally sensitive and its approval is outstanding; the constraint is on layout only, not copy.

**O-10 — R6 plan sheet and R4 alignment. Note. `[code-inferred]`**
R6 sits on a paper sheet inset in graphite (`HubShowcaseSection.astro:42`), then R4 is right-aligned at 64 % width (`:142-145`). Coherent on paper; a visual check of the seam between the comparison (paper) and hub (graphite with a paper sheet) is needed.

### 3.3 Typography, fonts and locales

**O-11 — Display type exceeds the approved token scale in S2. Concern. `[document-verified]`**
`ProblemSection.astro:134`: `clamp(var(--text-display-xl-size), 5.2vw + 1rem, 84px)`. The maximum, 84 px, is not a design-system size (largest token: display-2xl 72 px, `typography.css:9`). It reaches 84 px at ≈1308 px viewport width. This contradicts the page's own rule in `global.css:44-46` ("Both ends of every clamp are approved token sizes, so the type never leaves the design system's scale"). Line-heights in display use unitless 1.02–1.08 rather than the tokens' 4px-grid values; that one is unavoidable with fluid sizes and is only a note.

**O-12 — Fonts: brief §9.2 and the design system disagree, and the site follows the design system. Concern. `[document-verified]`**
Fonts load through a CSS `@import` from Google Fonts (`docs/design-system/tokens/fonts.css:2`, preconnect in `BaseLayout.astro:68-69`): three families, roughly 14 face/weight/style combinations. Brief §9.2 (authority position 2) requires "≤ 2 files, `font-display: swap`, self-hosted". The design-system README (position 3) says "CDN-linked" and offers to self-host. By the authority order the brief wins, and the current setup does not meet it. Two consequences to route to the owner rather than decide here: (a) whether the page may fetch fonts from a third party while the privacy text lists only Typeform, Google Workspace/Sheets, Cloudflare and Meta-for-messaging as processors (`CLAUDE.md`; a legal question, not a finding); (b) "≤ 2 files" cannot be met with three families as specified without a decision about subsetting/variable files or a brief waiver. Self-hosting the *same* fonts is not the skill's font swap and is not rejected.

**O-13 — Russian display coverage is unverified. Question. `[code-inferred]`, my recollection is uncertain**
RU headings use `--font-display` (Plus Jakarta Sans) with a Helvetica Neue/Arial fallback (`typography.css:2`). I could not check offline whether the served Plus Jakarta Sans subset covers basic Cyrillic. If it does not, every RU display heading renders in the fallback face and RU has a different typographic voice from ES/EN, and the `Hero.astro:292-296` comment about fallback metrics applies to the settled state, not just first paint. Nothing in `tests/` asserts glyph coverage; `beta-audit.spec.ts:106-109` only waits for `document.fonts.ready`. Needs one check in a browser with network.

**O-14 — Uppercase mono is used more widely than README describes. Question. `[document-verified]` for the code, ruling needed for the intent**
README: "Uppercase is reserved for the eyebrow/label token", and mono is for "access codes, frame numbers, timestamps" (`type-mono.card.html`). `.mono` forces `text-transform: uppercase` (`global.css:361-371`) and is used for the hero facts strip (`Hero.astro:63`), the header note (`Header.astro:23`), S2 loop labels (`ProblemSection.astro:35`), comparison headers/hint (`ComparisonSection.astro:64,100-110`) and the S8 legend title. Uppercase Cyrillic mono with tracking is the least legible case. This is a designer/owner interpretation question, not a proposal to change it.

**O-15 — Locale length hot spots are composition questions, not overflow bugs. Question. `[code-inferred]`**
M3 tests cover clipping and overflow. They do not judge line counts or heading heights. Places where a fixed `ch` measure meets the longest locale: hero H1 15ch (`Hero.astro:177`), S2 statement 22ch (`ProblemSection.astro:68,135`), mobile section header 26ch (`Section.astro:193`), vehicles list 32ch (`VehiclesSection.astro:141`), founders heading 16ch (`FoundersSection.astro:96`), S9 items 34ch, FAQ question 28ch (`FaqSection.astro:140`), header CTA on one line under 700 px (`Header.astro:142-158`). `ch` also depends on which font actually loaded (O-12/O-13).

### 3.4 Chrome, motion and housekeeping

**O-16 — Header blur is always on; README says only after scrolling past the hero. Question. `[document-verified]`**
README "Transparency & blur": the nav gains a blurred background "only after scrolling past the hero". `Header.astro:56-75` applies scrim plus `backdrop-filter: blur(10px)` from first paint, deliberately without a scroll listener (`:39-45`). It is masked to fade out, so it may look fine; it is still a deviation from the approved wording that the designer should acknowledge, or that a CSS-only scroll-driven approach could satisfy later (M6 territory).

**O-17 — Language switching on phones is footer-only. Note. `[document-verified]`**
Under 700 px the header hides the switcher to keep its derived height (`Header.astro:112-127`), as brief Part V permits (footer required in both places). For EN/RU visitors arriving on `/`, that is a full-page scroll; whether ad traffic will be routed to locale URLs directly is an owner question.

**O-18 — No motion beyond hover/press transitions. Note. `[document-verified]`**
There is no `@keyframes`, no IntersectionObserver and no reveal in `src/` (grep). FAQ `<details>` open/close is instant. Consistent with the plan (motion is M6/M7). `scroll-behavior: smooth` exists but only under `prefers-reduced-motion: no-preference` (`global.css:131-135`).

**O-19 — Stale and untokenised leftovers. Note. `[document-verified]`**
- `.button:disabled` (`global.css:552-566`) describes controls "inert until the Typeform URLs are configured". Nothing in `src/` renders a disabled button now (the only `disabled` match is that rule); pending controls render text or nothing.
- The selector listbox shadow is a raw `rgb(0 0 0 / 18%)` (`ZoneSelector.astro:273`) instead of a `--shadow-e*` token.
- `BaseLayout.astro` sets `twitter:card=summary_large_image` and `og:*` but no `og:image`; there is intentionally no favicon (`:59-61`) because no mark exists.
- No `src/pages/404.astro`.

## 4. Locale (ES / EN / RU) and mobile summary

| Topic | ES | EN | RU |
|---|---|---|---|
| Hero H1 length | 44 chars | 44 chars | 52 chars; longest, most lines (O-02, O-15) |
| Survey link | Spanish, native | Spanish survey; disclosure required beside every link, adds a line under both selectors (`ZoneSelector.astro:48-52,106-112`) | Native RU survey |
| Uppercase mono labels | Latin | Latin | Cyrillic uppercase, tracked (O-14) |
| Display face | Plus Jakarta | Plus Jakarta | **Unverified Cyrillic coverage (O-13)** |
| Zone names | Original Spanish, `lang="es-AR"` on options | same | same (never transliterated) |

Mobile-specific items: O-01 (hero band on short phones), O-04 (selector on load), O-09 (comparison scroll), O-17 (footer-only switcher). Existing diagnostic screenshots use 375×**812**, not 375×667 (`tests/locales.ts:96`), so the short-phone hero branch that O-01 is about (`max-height:700px`) is not captured by the current screenshot suite; only Codex's fold measurement covers it.

## 5. Skill recommendation ledger

Verdicts: **Accepted** (recommend for a later approved task), **Accepted, modified**, **Rejected** (conflicts with authority or needs no action), **Deferred** (to a named milestone), **N/A / Already met**. Nothing here is approved until Kirill records it.

| # | Skill recommendation | Verdict | Reason / authority |
|---|---|---|---|
| S-01 | Replace fonts with Geist / Outfit / Cabinet Grotesk / Satoshi; "font swap first" | **Rejected** | Approved pairing in design system and `PROJECT_DECISIONS.md`; plan names this exact conflict. Self-hosting the same fonts is separate (O-12) |
| S-02 | Headline presence, tracking, line-height, weights 500/600, tabular figures, measure ≈65ch, `text-wrap: balance/pretty` | **Already met** | `.heading-*`, `--measure:62ch`, `.mono`/`.numeral` tabular-nums, weights 400–800 |
| S-03 | All-caps subheaders everywhere → try sentence case | **Deferred** | Eyebrow uppercase is tokenised; wider mono uppercase is an open ruling (O-14) |
| S-04 | Replace pure `#000`; single accent; no AI gradient; consistent grays | **Already met** | graphite-950, one amber, neutral grays |
| S-05 | Tint shadows / colored shadows | **Rejected**; one **Accepted** sub-item | Shadows are design-system tokens (`shadow.css`). Only the raw shadow in `ZoneSelector` should move to a token (O-19) |
| S-06 | Noise/grain, textures, mesh gradients, spotlight borders, true glassmorphism | **Rejected** | README: no textures, no decorative gradients, no general glass |
| S-07 | "Random dark section in a light page" / commit to one mode | **Rejected** | Dark-first system with a sanctioned single paper register (`README` "Palette"; `global.css:164-205`) |
| S-08 | Add background imagery to empty sections, use `picsum.photos` placeholders | **Rejected** | Approved assets only (`PROJECT_DECISIONS.md` "Media"); no stock/placeholder imagery |
| S-09 | Break symmetry; avoid centered layouts; asymmetric grids; overlap/depth | **Already met** | Left-aligned sheet, bleeds, overlap in S6. Overlap legibility is O-06 |
| S-10 | Avoid three equal card columns | **Rejected (no action)** | S4's three steps are content-defined (brief S4) and set as a hairline rail, not cards |
| S-11 | `100dvh` instead of `100vh` | **Already met** | `svh` used |
| S-12 | Max-width container | **Already met** | `--shell:1320px` |
| S-13 | Double the whitespace | **Rejected** | Rhythm tokens already loose; page length matters on mobile 4G; spacing is design-system |
| S-14 | Asymmetric vertical padding (optical bottom) | **Deferred** | Section padding is symmetric (`Section.astro:106-109`); judge visually first, candidate for M5 |
| S-15 | Hover / active / focus states, transitions 200–300 ms | **Already met** | See section 2 |
| S-16 | Empty / error / loading states | **Accepted, modified** | Only the selector's empty-result state is a real gap (O-04). It needs new ES/EN/RU copy from the owner; not invented here |
| S-17 | Smooth anchor scrolling | **Already met (gated)** | Present under `no-preference`; no ungated addition |
| S-18 | Replace accordion FAQ | **Rejected** | Brief S12/§9.3/AEO require FAQ content and accessible disclosure |
| S-19 | Replace pill badges, avoid one-filled-one-ghost buttons | **Rejected (no action)** | README already limits pills to status; the hero/primary pair is a brief-defined hierarchy |
| S-20 | Footer link farm | **N/A** | Footer is legal-driven and minimal |
| S-21 | Lucide/Feather icon critique | **N/A** | The page uses no icon library |
| S-22 | Copywriting cliché audit, names, dates, numbers | **Rejected / N/A** | Copy is owner-authored and legally controlled; the skill may not edit it |
| S-23 | Missing meta tags (`og:image`), favicon, custom 404 | **Deferred to M9** | Need an approved asset (image, mark) and product decisions; not composition work |
| S-24 | Cookie consent banner | **Rejected** | No browser tracking by decision; consent is a legal matter (see also O-12) |
| S-25 | Form validation | **N/A** | Forms live in Typeform; the selector only filters a fixed list |
| S-26 | Smooth scroll with inertia, staggered entries, spring physics, scroll-driven reveals, parallax stacks, split-screen scroll | **Rejected now / Deferred to M6** | Runtime motion or scroll hijacking needs a recorded decision and the M6 motion map; README: calm, no bounce. CSS-only reveals may be assessed at M6 |
| S-27 | Variable-font animation, outlined-to-fill text, text-mask reveals | **Rejected** | Off-brand and decorative; typography is fixed by the design system |
| S-28 | Div soup, inline styles, hardcoded px, z-index scale, dead code | **Largely met** | Semantic landmarks present; only the leftovers in O-19 |
| S-29 | Legal links, skip link | **Already met** | Footer legal routes and skip link exist |
| S-30 | "Fix priority" ordering (font swap first) | **Rejected** | CLAVERA's order is authority conflicts (O-11, O-12), then composition spec, then polish |

## 6. Unresolved visual and product questions

Each needs a person looking at the built page or a measurement; none can be answered from source.

1. **Hero on short phones (O-01):** is a ≈113 px image band acceptable at 375×667, or should the fold budget be met differently (owner decision, since brief S1's fold rule is a hard requirement)?
2. **Hero desktop fold and density (O-02, O-03):** does the RU selector CTA clear the fold at 1440×800 / 1280×720, and does the triple scrim look intentional?
3. **Selector (O-04):** load shift, empty-result state, whether "search" reads as a control, and what the no-JS state should show.
4. **Portrait overlap (O-06)** and **R5 crop (O-08):** do they read as intended?
5. **Comparison on mobile (O-09):** is starting with the CLAVERA column off-screen acceptable?
6. **Token scale (O-11):** is 84 px in S2 a designer-approved exception, or should it clamp to 72 px?
7. **Fonts (O-12, O-13):** does the owner accept CDN fonts or require self-hosting per brief §9.2, how are "≤ 2 files" and three families reconciled, and does Plus Jakarta Sans cover Cyrillic as served?
8. **Uppercase mono (O-14)** and **header blur (O-16):** does the designer accept the current usage?
9. **Seven-pillar grid (O-07)** and **S10/S11 surfaces (O-05):** cosmetic, worth a look during the same review.
10. **Locale line counts (O-15):** do RU headings and the S2 statement wrap acceptably at 1440, 768 and 375?

## 7. Bounded proposal for the next M4 task

**Proposed: M4.1 — Measured baseline and evidence pack. No source edits, no purchases, no publication.**

Purpose: convert the `[code-inferred]` items above into measured or seen facts, so the M4 composition specification is written from evidence. This is also the only useful M4 work available while Refero is unavailable.

Steps (one session):
1. **Preconditions.** This worktree has no `node_modules` or `dist`. Install existing locked dependencies (`yarn install --frozen-lockfile`, no lockfile or dependency change), then `yarn build`, then use the existing Playwright setup. Needs approval in this harness (see blocker note).
2. **Font gate.** Capture only after `document.fonts` confirms the three families loaded, in the same spirit as the image gate in `tests/images.ts`. If Google Fonts is unreachable, mark every type-dependent finding *invalid for this run* rather than judging fallback rendering.
3. **Screenshots (Chromium, diagnostic, non-baseline).** ES/EN/RU at the existing 1440/768/375 set plus the two viewports the suite lacks: **375×667** and **1280×720** (and 1440×800). Keep them outside git.
4. **Throwaway probes (not added to the suite):** hero CTA bottom vs fold per locale and viewport; hero image band height at 375×667; layout shift during load (selector un-hide); comparison table's CLAVERA column x-position at 375; pillar grid last-row layout at ≥860; computed S2 font-size at 1440; H1/S2 line counts per locale; which font family each RU heading actually renders in.
5. **Deliverable:** `docs/project/M4_EVIDENCE.md` restating each O-item as *measured*, *seen* or *still inferred*, with paths to the captures, plus a contact sheet for Kirill to answer section 6.
6. **Stop conditions:** any needed edit to code, tokens, copy or legal text; any network/paid step; any result that contradicts a `[document-verified]` claim (then correct this audit first).

Explicitly **not** in M4.1: composition specification, Impeccable, any fix from section 3, font self-hosting, copy for the empty-result state, Refero. The composition specification is M4.2, after the evidence and after the decisions below.

## 8. Decisions and blockers

**Decisions for Kirill / owner (none blocks M4.1):**
- Font hosting versus brief §9.2 and the privacy processor list (O-12), and whether 84 px in S2 is accepted (O-11).
- Refero: buy one month, or write M4.2 from the repository's own renders and owner-supplied references instead. Nothing is bought or connected by this audit.
- Approval of the accepted/modified items in section 5 before any implementation task (S-05 sub-item, S-16).
- Copy for a selector empty-result message in ES/EN/RU, if S-16 is approved.

**Actual blocker for the next non-public step (M4.1):** dependencies are not installed in this worktree, and the worklog records that earlier non-interactive sessions in this harness could not get `yarn`/`astro` approved. If that persists, M4.1's build, screenshots and probes must be run by Kirill or Codex locally. There is no blocker for reviewing this audit, and the audit itself is complete as a code-only document.

**Bookkeeping left undone on purpose:** `CLAVERA_EXECUTION_PLAN.md` still says the Taste Skill is "installed … not yet run", and neither it nor `CLAVERA_WORKLOG.md` was edited by this task. Update both after the audit is reviewed, per plan protocol item 8.
