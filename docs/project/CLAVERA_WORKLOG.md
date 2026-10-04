# CLAVERA Landing — Worklog

This is the current-state companion to `CLAVERA_EXECUTION_PLAN.md`. Update it after every accepted milestone, tool decision, scope change, blocker, or branch change. New chats must read the latest entry before planning work.

## 2026-10-04 — Owner's Figma design-system handoff recorded (document-only)

The owner supplied `Clavera DS.fig` and meeting notes describing the existing design system in Figma. Added `FIGMA_DS_HANDOFF_2026-10-04.md` with a source inventory, exact token/component comparison map, MCP access and rate-limit caveats, and the M4→M5/M6 sequence. Updated the execution plan and decision log to require read-only reconciliation before changing M5.2 or shared UI tokens. The local `.fig` canvas was not inspected in Figma; no exact token equivalence or WCAG result is claimed. No source CSS/component, test, protected file, legal copy, or publication setting changed. CLAVERA's Agent Control queue remains paused, and its existing review gate is untouched. This documentation is on an isolated branch from accepted head `fce39c64`; it is not yet an accepted-head update.

## 2026-09-30 — M5.2 Firefox reduced-motion fix (`da3929d`) statically re-reviewed, not re-run (document-only)

No shell in this session. Statically reviewed every `transition`, `animation`, `@keyframes`, `scroll-behavior` and `.animate()`/`requestAnimationFrame` use across `src/`, including scoped `<style>` blocks in `.astro` components, against `global.css:140-151`'s `prefers-reduced-motion: reduce` block. No `@keyframes` or script-driven animation exists anywhere in `src/`; every component-level `transition:` declaration lacks `!important` and so cannot outrank the universal `*, *::before, *::after { ... !important }` override, regardless of Astro's scoped-style specificity boost. Found no coverage gap — `da3929d` is complete as written; no code changed. Appended §5 to `docs/project/M5_2_EVIDENCE.md` recording this review and marking `yarn astro check` / `yarn build` / `yarn playwright test tests/m5-2.spec.ts` (three browsers) as still owed; the orchestrator runs these next, and their real pass/skip/fail counts are not yet recorded anywhere.

## 2026-09-29 — Owner-decisions digest created (document-only)

Wrote `docs/project/OWNER_DECISIONS_OPEN.md` (task 2 of `M4_M10_LIVE_ROADMAP.md`'s "Три независимые локальные задачи"): one table gathering every still-open owner/designer decision scattered across `M4_CURRENT_HANDOFF.md` §3, `M4_REFERENCE_COMPOSITION_SPEC.md` §15/§14, `M4_REFERENCE_FOLLOWUP.md` §2, `M5_2_RESULT.md` §1/§2/§5, `M5_NEXT_RESULT.md` §5, `M5_IMAGE_PRODUCTION_BRIEF_HF.md` §5/§8/§12, `M8_PREFLIGHT.md` §3 and `M5_2_INTERACTION_FIX.md` §1 (16 rows: D1–D8, P8-legend, R-6b, S13-coda, S6-repl, R1-mobile-master, r3-orphan, Escape), plus a short list of decisions answerable without a browser, a list needing screenshots/a run, and the four release gates deliberately deferred (lawyer sign-off, RNBD, publication date, Avisame URL). No discrepancy found between sources for any shared ID. No `src/`, `tests/`, `public/`, `package.json`, legal text or locale string was touched.

## 2026-09-29 — M4 session chain consolidated into a handoff; 4 superseded appendices archived (document-only)

Wrote `docs/project/M4_CURRENT_HANDOFF.md`, consolidating the baseline, verified facts, unresolved design choices, legal/publication gate references and the exact M5 next step from the whole M4 session chain into one document, so a new session no longer needs to read every individual M4 file. Identified four session appendices whose findings are fully superseded by later documents in the same chain and restated in the handoff: `M4_BASELINE_SNAPSHOT.md`, `M4_BASELINE_VISUAL_AUDIT.md`, `M4_FULLPAGE_REVIEW.md`, `M4_NEXT_VISUAL_REVIEW.md`. Recorded the move in `docs/project/M4_ARCHIVE_MOVES.json` (source, reason, replacement per file); the actual `git mv` to `Old/docs/project/` is a separate local filesystem step, not performed by this task. Updated live references to the four files in `M4_EVIDENCE.md`, `M4_P1_P2_REFERENCE_NOTES.md` and `M4_FULLPAGE_AUDIT.md` to point at the future `Old/` path (or the handoff); `CLAVERA_EXECUTION_PLAN.md`'s M4 status line now points to the handoff first. No source, token, copy or legal file was touched; no build, install, publication or purchase; nothing was pushed.

## 2026-09-29 — M4.1 measured-evidence pack (document-only; no site/source edits)

Taste Skill audit (`M4_TASTE_AUDIT.md`, commit `643556e`) and the M4 composition draft (`M4_REFERENCE_COMPOSITION_SPEC.md`, commit `e67dc21`) are both complete and recorded. A local visual baseline was frozen the same day (`782e4f7`): tag `baseline/clavera-before-m4-2026-09-29` → `e67dc21`, code identical to `4aa30b7`; contact sheet `docs/project/M4_BASELINE_CONTACT.png`; full diagnostic archive kept locally outside the repo. This task added `docs/project/M4_EVIDENCE.md`, restating each audit O-item as measured, seen (contact sheet), still inferred, or open, using the baseline's actual numbers (375×667 first survey-link bottom ES 555 / EN 583 / RU 644 px; H1 height ES/EN 135 / RU 180 px; 1440×800 H1 ES/EN 147 / RU 294 px; 0 image/overflow failures across 9 extra captures). Font-family coverage for Russian display type (O-13) is explicitly flagged as **not proven** by this baseline. No code, token, copy or legal text was touched; no dependency was installed; no capture was redone.

**M4.1 status before the reference pass below:** public reference research (spec §1/§3/§15 D1) had not happened — the composition draft was code-derived only. M4.2 evidence needs listed in `M4_EVIDENCE.md` §6 (font-coverage check, visual review of existing short-phone and full-page captures, and reference research itself). CTA-vs-fold measurements already exist for 1280×720 and 1440×800. This local document task was committed on its isolated branch; nothing was pushed or published. M4 evidence work may proceed while M3.5 and lawyer reviews remain pending.

**Addendum, 2026-09-29 (M4.2 continuation).** A first verified public-reference pass (`docs/project/M4_PUBLIC_REFERENCES_2026-09-29.md`) read four live public pages (Vitsœ, Spokesafe, Rapha, Cyclehoop) and recorded their content/information-order patterns only, no viewport screenshots or pixel comparison. `M4_REFERENCE_COMPOSITION_SPEC.md` §3 rows P3, P4, P9 and P10 now cite these sources as supporting content-order patterns, each with its CLAVERA-use and boundary against copying commercial claims. Rows P1, P2, P5–P8 and P11 are still `OPEN` and unresearched. This same continuation folded M4.1's measured numbers into the spec's §1 evidence-basis framing (the spec previously and incorrectly said no screenshots existed; full-page captures do exist per `M4_EVIDENCE.md`, just not yet section-by-section visually audited) and added a short remaining-evidence list to the spec. No source, token, copy or legal text was touched; `M4_EVIDENCE.md` and `M4_PUBLIC_REFERENCES_2026-09-29.md` were read but not edited. Reference-driven status is still partial: content/order only for 4 of 11 purposes, no visual reference example yet for any of the 11.

**Addendum, 2026-09-29 (P5/P6/P7/P8/P11 research attempt).** A separate session, limited to `WebSearch`/`WebFetch` only (no browser or screenshot tool available), attempted the remaining five open rows and recorded findings in `docs/project/M4_REFERENCE_GAPS_P5_P11.md`. Outcome: P5 (Grimshaw — Southern Cross Station) and P8 (Dero — Bike Parking Guide, after rejecting Falco's FalcoHub page for lacking any diagram) each got a weak content-order precedent, text-only; P7 (Rivian — Compare) got a weak categorical-grouping precedent only; P6 and P11 could not be researched at all because their acceptance tests (overlap/luminance; ≈375 px row survival) are inherently visual/viewport properties that a text-to-markdown fetch cannot expose, regardless of which candidate page is chosen. No row reached the visual/viewport evidence tier the spec's §1 remaining-evidence list asks for. `M4_REFERENCE_COMPOSITION_SPEC.md` was not edited by this pass (it already states these rows are open). Nothing was installed, purchased, committed to a shared branch, pushed or published; M4 remains unapproved. Next unit: re-run P1, P2 and all five rows above as direct viewport observations once a browser/screenshot tool is authorized.

## 2026-09-28 — Owner response v1.2 integrated into M3.5.2 candidate (uncommitted)

Source: `/Users/k/Downloads/CLAVERA_Dev_Respuesta_v1_2.md` (27 September 2026). This is owner-supplied direction for the candidate; it does not grant lawyer sign-off or publication approval. The previous v1.1 implementation and review history below remain historical evidence.

- Confirmed controller identity already appeared on all pages: Anna Kazanova, CUIT 20-96380996-5, Aráoz 2686, CABA, hola@clavera.ar. No floor/unit appears. The unissued RNBD number remains absent; the source says the database application was filed on 22 September 2026 (case EX-2026-92595020-APN-DNPDP#AAIP), but this is not a registration number or launch authorization.
- Replaced the old “battery removed” rule in vehicles, security and FAQ for ES/EN/RU with the owner's exact mixed-battery wording: removable batteries leave with owners, integrated batteries go to a separate zone, and charging is not offered. Replaced the old water-cleaning proposal with lockers, a self-service basic-tools station and seasonal storage; repairs FAQ unchanged.
- Changed the one zone config from provisional to the confirmed **working** list and replaced native select type-ahead with a visible substring-search combobox. Matching ignores case and diacritics (`nunez` finds `Núñez`); an empty query exposes the complete alphabetical list. Only prebuilt allowlisted slugs can reach the Typeform URL. The working list does not imply any confirmed opening location.
- S7 comparison remains unchanged. The owner explicitly confirms its negative `cochera / estacionamiento` sentence as a scoped exception to the stop-list, while final lawyer approval remains open. 24/7 remains scoped to planned-service copy and FAQ, not meta/title/hero. The former founding offer is retired; no future release mechanics are reserved without a separate task.
- Exported the current built Spanish `/privacidad`, `/terminos`, `/cookies` content into one six-page lawyer-review PDF: `outputs/CLAVERA_legal_ES_for_lawyer_v1_2.pdf` in the shared Codex task folder. The legal text comes directly from the candidate's rendered Spanish DOM; only paper formatting differs. The publication date remains visibly pending. File prepared locally, not sent or published.
- Checks: `git diff --check` clean; `yarn astro check` reports 75 files, zero diagnostics; focused `tests/areas.spec.ts` + `tests/beta-audit.spec.ts` on Chromium passed 81/81, including 375×667 hero fold in ES/EN/RU, search behavior and e-bike copy. Full multi-browser/full-suite review remains required before acceptance.

Still blocking publication: Argentine lawyer's written sign-off on three pages, S7 and 24/7; RNBD registration number or lawyer's written launch ruling; real publication date; Kirill's visual acceptance; separate explicit deploy approval. The Avisame URL and WhatsApp Business number are pending feature inputs, not reasons to show incomplete controls: their button/footer entry remain absent until supplied. The v1.2 response says these missing inputs do not stop implementation; the site stays unpublished.

## 2026-09-28 — Codex independent review of M3.5.2 candidate (uncommitted; pending human acceptance)

Reviewed the two Claude implementation passes on `codex/clavera-beta-handoff-v1-1`. Confirmed that the local Spec copy and the user's original `/Users/k/Downloads/CLAVERA Legal Spec v3 0 para desarrollador.md` have identical SHA-256 `fe70ffb2d724c0f98b31f5be135ad96cdf4ad6aad746f50a0a5d70a89ae232cc`. Corrected two stale current-sounding statements in the decisions and execution plan that still called the Spec absent. No commit, push, merge or deployment.

**Review fixes.** Handoff B1 requires policy version `2026-09` in the privacy text. It was configured but hidden until a publication date was entered; `/privacidad` now displays the version in all three locales while leaving the real publication date pending. Added a legal-route test for that requirement. A mobile axe scan found the ES-original link in each EN/RU courtesy notice was distinguishable only by colour (`link-in-text-block`, serious). The link is now underlined; the repeated scan reports no serious or critical findings on any of the nine legal pages. No legal wording was changed in these fixes.

**Measured verification.** Installed existing lockfile dependencies with `yarn install --frozen-lockfile` (no dependency or lockfile change). `git diff --check`, `yarn astro check` (75 files, zero errors/warnings/hints), and `yarn build` (12 static pages) passed. Before the review fixes, the focused legal/link/mobile-audit suite passed 240 tests with 24 skips across Chromium, Firefox and WebKit, including the previously failing RU hero fold in all three browsers. After the policy-version fix, all 84 legal tests passed across those browsers. After the link-underline fix, a separate axe scan of all nine legal pages at 375 px had zero serious or critical findings. Landing structure and accessibility checks in Chromium passed 117 tests. On the built preview, the RU hero primary CTA bottom measured 644.25 px in a 375×667 viewport; ES privacy and RU cookies at 375 px and EN terms at 1440 px had no horizontal overflow. Those four views were also visually inspected. The first full pre-legal suite had 1125 passed, 60 skipped and three RU fold failures; the affected fold assertions now pass in all three browsers. The entire full suite was not rerun after the legal pass; the targeted suites above cover changed legal routes, links and hero layout.

**Still open.** Final Argentine-lawyer sign-off and real publication date; RNBD number/status; Avisame Typeform URL; WhatsApp Business number; Anna's verification of the provisional zone list/slugs; written S7 legal approval and the handoff's B3 versus §6.1 forbidden-term conflict; the brief's landlord/consorcio condition for planned 24/7 wording; and Kirill's own visual review plus explicit deployment approval. The selector uses native `<select>` type-ahead and a TypeScript data module, rather than a visible search field and the JSON file specified in handoff §3.2; these deviations are documented in the reconciliation and need owner acceptance or a later correction. M3.5.1's separate review state and M4–M10 are unchanged.

## 2026-09-28 (second pass) — Legal Spec confirmed; three legal routes built; RU hero fold fix (uncommitted; pending review)

Same branch, same worktree, second Claude implementation session the same day. **Not committed, not pushed, not deployed.** Corrects a mistake from the first pass below and completes the legal-route blocker it left open.

**Correction of a false claim.** The first pass (immediately below) stated the legal Spec was absent and that `docs/project/CLAVERA_Legal_Spec_v3_0_received.md` was an unverified, possibly-concurrent write. Both statements were wrong. The owner confirmed the file is authentic: it is byte-identical to `/Users/k/Downloads/CLAVERA Legal Spec v3 0 para desarrollador.md`, both hashing to SHA-256 `fe70ffb2d724c0f98b31f5be135ad96cdf4ad6aad746f50a0a5d70a89ae232cc` (re-verified this session by direct file read of both paths, since the sandbox blocked running `shasum` interactively). It was copied into the repository by the parent task, not written concurrently by another process. See `PROJECT_DECISIONS.md`'s "Correction (2026-09-28, second pass)" for the full record; the original paragraphs are kept there, marked struck-through, rather than deleted.

**Legal routes built.** `/privacidad`, `/terminos`, `/cookies` now exist in `es` (canonical), `en` and `ru` — nine pages total. Source: `src/content/legal/{privacy,terms,cookies}.ts` (one `LegalDocumentByLocale` per document type, shared shape in `src/content/legal/types.ts`), rendered by one component, `src/components/legal/LegalPage.astro`, reused across all nine routes. Text is Spec §2.2 (privacy — patched by handoff §5 for points 2, 4d and 6, the "Canales de contacto" update; point 7, cross-border transfer, is unpatched and keeps its number), §6.6 (terms) and §7.2 (cookies), with the controller placeholders filled from handoff B1 (Anna Kazanova, CUIT 20-96380996-5, Aráoz 2686 CABA, hola@clavera.ar). EN and RU are courtesy translations carrying a visible notice plus a link back to the ES original (`copy.legalPage.courtesyNotice` / `readInSpanish`); ES carries none, since its own Terms §10 already states Spanish primacy. `Footer.astro`'s `AVAILABLE_ROUTES` now includes all three, resolved per-locale through a new `localePath(locale, route)` helper in `src/i18n/config.ts`; `/espacios` and `/desarrolladores` are untouched and still pending text. `BaseLayout.astro` gained optional `title`/`description`/`path`/`alternatePaths` props so a non-home page can set its own `<title>`/canonical/hreflang set instead of inheriting the landing page's; `Header.astro`, `Footer.astro` and `LanguageSwitcher.astro` gained an optional `alternatePaths`/`paths` prop so the language switcher on a legal page stays on the same document instead of jumping to the locale home.

**Withheld on purpose, not invented.** The RNBD registration number never appears (omitted from the text, not shown as a blank or `[TBD]`). The publication date is read from one new config point, `LEGAL_LAST_UPDATED` in `src/config/legal.ts` (alongside the existing `CONTROLLER_NOTICE_ES`/`LANGUAGE_CLAUSE_ES`), currently `null`; while null, the page shows a localized "publication pending" line (`copy.legalPage.lastUpdatedPending`) instead of a date. Activation is exactly one edit: replace `null` with an ISO date. `LEGAL_VERSION = '2026-09'` is recorded (that value was supplied, not invented). ~~The first implementation displayed it only after a date existed.~~ Codex's review fix above displays it on `/privacidad` even while the date is pending, as B1 requires. Final Argentine-lawyer sign-off and the owner's publication approval are still outstanding per the Spec's own §11 and the handoff's §7 — building these pages is not that approval, and nothing in the code claims it is.

**Tests.** New `tests/legal.spec.ts`: all nine routes return 200 with the right `<title>`; privacy's point 7 is cross-border transfer in every locale (via a `data-legal-id` attribute on each heading, not fragile text parsing); no page ever shows "RNBD" or a leftover `[bracket]` placeholder; the controller identity appears on privacy and terms; the "last updated" line states the pending status, not a date; EN/RU carry the courtesy notice and ES does not; the language switcher on a legal page targets the sibling document; header/footer/controller-notice survive on every legal page; section numbering agrees across the three locales for each document (compared by `data-legal-id`, never by translated heading text). `tests/links.spec.ts` updated: `/privacidad`, `/terminos`, `/cookies` (all three locales) moved from `UNBUILT_ROUTES` to `EXISTING_ROUTES`; the footer pending-item count dropped from 6 to 3 (`/espacios`, `/desarrolladores`, WhatsApp); added a check that the footer links to its own locale's three legal pages and that each resolves.

**RU hero fold fix.** The first full Playwright run after the first pass (see that entry's "Verification") came back 1125 passed / 60 skipped / 3 failed, all three browsers, same cause: at 375×667 the RU hero primary CTA (`#top [data-zone-continue]`, i.e. the zone selector's "Seguir"/"Далее") bottomed out at 684.14px, 17.14px past the required 667px fold — pushed down by the zone-selector heading line the first pass added above it, on top of the existing short-phone budget. Fixed by tightening the same short-viewport rhythm generically, not per locale: `Hero.astro`'s `@media (max-width: 599px) and (max-height: 700px)` block now uses a slightly shorter image band (17svh / min 112px / max 160px, was 20/130/180) and a tighter `hero__inner` gap (`--space-2`, was `--space-3`) and body top padding (`--space-3`, was `--space-4`); `ZoneSelector.astro` gained a matching `.zone-selector--hero` modifier (set only on the hero instance via its existing `name` prop) that tightens its own label-to-row gap to `--space-2` in the same media query, leaving the S10 instance's spacing untouched. No text was shortened, no body size reduced, no locale-specific value used — the same CSS applies to all three locales, and Russian simply benefits most because it wraps to the most lines. **Not re-run after this edit** — same permission-mode restriction as the first pass; Codex should confirm the three previously-failing assertions now pass.

**Verification.** `yarn astro check` / `yarn build` / Playwright: **blocked again** by the same non-interactive permission mode (`yarn`/`astro`/`shasum` all required approval that could not be granted). Everything above is from reading the code and content files, not from a build or test run. Confirming the RU fix and the new `tests/legal.spec.ts` suite is Codex's job for this pass.

**Still blocking (superseding the "Still blocking" list in the entry below for the legal-Spec item only):** the legal Spec is no longer a blocker — it is confirmed and the pages are built. Everything else in that list is unchanged: Avisame URL · RNBD number · WhatsApp number · Anna's zone-list verification · S7 written legal approval · the handoff-internal B3 vs §6.1 terminology conflict · the brief's S6 condition for 24/7 · **build and test run of both passes** · Codex review · Kirill's visual review · deployment approval. New for this pass: lawyer sign-off and a real publication date for the three legal texts (Spec §11; handoff §7).

`CLAUDE.md` was also updated this pass — see its own diff — to remove statements that now actively contradict the implementation: the blanket 24/7 ban (now a two-place exception), the nine fixed beta areas (now a provisional zone-selector list), cameras framed as "planned" (now removed from copy entirely, not merely deferred), the pilot `null` rule stated only in its general `WHATSAPP_NUMBER` form (now states the stricter Avisame carve-out too), bare-URL research-survey routing and a "zero client JavaScript" claim (now fragment attribution and the zone selector's one script), and Spanish-only legal pages (now three-locale, per the section above).

## 2026-09-28 — M3.5.2 owner handoff v1.1 reconciliation and beta corrections (uncommitted; pending review)

Branch `codex/clavera-beta-handoff-v1-1`. Claude implementation session; Codex reviews afterwards and did not write concurrently. **Not committed, not pushed, not deployed.** M3.5.1 remains unaccepted and pending review; M4–M10 unchanged.

### Documentation (done first)

- `PROJECT_DECISIONS.md` gained "Owner handoff v1.1 reconciliation (2026-09-28)": a 13-row dated table (old decision → handoff clause → impact → status/blocker) with handoff section citations. Superseded statements are marked inline and not deleted: founding offer, no-24/7, nine areas, pilot pending text, Spanish-only legal pages, `domicilio` omission, cameras-as-planned, R3.
- `docs/project/CLAVERA_EXECUTION_PLAN.md` gained M3.5.2 (proposed) and a decision-log entry.
- ~~**Legal Spec v3.0 not found.** It is not in the repository. The Downloads folder cannot be listed from this environment; every likely filename was probed by exact path and none exists. It is treated as absent, so the three legal routes stay blocked and no legal text was written.~~
- ~~**Unverified file appeared mid-session.** `docs/project/CLAVERA_Legal_Spec_v3_0_received.md` (untracked, 53 KB, created 01:17) appeared while Claude was editing. Claude did not create it, and the worktree was clean at session start. It is dated 2026-08-23, is not the `…_para_desarrollador` file the handoff names, and says the lawyer's sign-off is still pending. It was not used, edited or deleted. **Action for Kirill/Codex:** confirm its provenance, and whether another process wrote to this worktree concurrently.~~
- **Both bullets above were wrong — corrected in the second pass, same day, at the top of this file.** The file is authentic (SHA-256 confirmed against the owner's Downloads copy) and the three legal routes are now built from it.

### Implementation (source)

- **Offer (B4, §0.2):** header chip → `Sumate al piloto` / `Join the pilot` / `Присоединиться к пилоту`. The Socios Fundadores block is now "Sumate al piloto" (anchor `#fundadores` kept): heading, lede and the non-binding note. All of these are gone: the 40 / −20 % / 24 figures, the discount sentence, the price-calculation/indexation line and `Formulario… en preparación`. New FAQ price answer.
- **Pilot / Avisame (B4, §4.2):** label `Avisame` / `Notify me` / `Сообщить мне`. A `null` destination now renders **nothing**. The research survey (`Respondé la encuesta` / `Take the survey` / `Пройти опрос`) is the block's primary button. Once a URL is configured, the block renders Avisame as primary, plus `¿Tenés 3 minutos más?` with the survey as secondary; only the central config value changes.
- **Claims (B5, §3.1, §3.4, §3.5):** new meta description and hero lede, with no cameras and no "a minutos". Pillar 02 is `…, 24/7` with its new copy; pillar 03 says `Limpieza periódica del espacio.`; pillar 04 is `Registro de accesos`; pillar 08 is removed. Security list replaced with the six §3.4 items in order. Planned-service notes no longer name cameras. Entrance alt text no longer names a camera. New access-hours FAQ. 24/7 appears only in pillar 02 and that FAQ.
- **E-bike (B6):** battery-removed sentence in S5, the S6 list and the FAQ (`¿Puedo guardar mi e-bike?`).
- **Lockers/cleaning (§3.5):** S5 gains the "Estamos evaluando…" line. R3 (cleaning render) is removed from S8, leaving R4 as a single figure. R3 derivatives are kept, unreferenced.
- **S9 (§3.6):** first two lines replaced literally, so the e-bike/cargo line is no longer shown. Confirm intent.
- **S7 (B3):** no prices; new headers `… (alternativa)`; new cost and commitment cells; market note removed; the mandatory B3 line is the new `.comparison__note`, at body size and never collapsed.
- **Zones (§3.2):** area list, caption and note removed. New `ZoneSelector` in the hero (replacing the old hero pilot button) and in S10 (heading `¿Dónde la necesitás?`, no-commitment small print). The list lives in `src/config/candidate-zones.ts`, marked **provisional**, with 29 barrios alphabetical plus 2 catch-alls last. It is a data-only TS module rather than JSON because the Playwright suite imports it through Node's ESM loader. The caption sits under the control as helper text (`aria-describedby`) to protect the 375×667 hero fold.
- **Survey attribution (§4.1):** `buildResearchHref` in `src/config/typeform.ts` adds the fixed per-locale fragment, plus `candidate_zone` only for a configured slug; `RESEARCH_FRAGMENT_ALLOWLIST` lists the permitted keys. All four survey links (S13, pilot block, two selectors) carry it. EN keeps `The survey is in Spanish.` beside every survey link, including both `Continue` buttons.
- **Client JavaScript:** the selector ships the page's **first client script** — about 15 lines, first-party, no dependency. It only swaps `Seguir` between hrefs prebuilt at build time. Without JavaScript the select stays hidden and `Seguir` opens the survey without a zone. **The previous "zero client JavaScript" claim is superseded.**
- **Footer (B2):** controller formula, contact line and language clause, verbatim in Spanish with `lang="es-AR"` on all three locales (so ES now carries the clause too). The strings are centralized in `src/config/legal.ts`. TikTok link added. The legal routes remain plain text; no RNBD is published.
- **Survey section / FAQ (§3.3, §3.7):** "primer hub" removed from the eyebrow, note and FAQ; new cancellation answer.
- Editorial minimums, flagged for review: the pilot-block eyebrow/rail `Piloto` / `Pilot` / `Пилот`, and the S10 eyebrow `Mapa de demanda` / `Demand map` / `Карта спроса`, which replaces "Barrios en evaluación" now that there is no list. The handoff specifies neither.

### Tests updated (not run — see Verification)

`tests/locales.ts` (per-locale survey href and S7 line); `terminology.ts` / `terminology.spec.ts` / `terminology-scanner.spec.ts` (new headers; one exact-sentence exception per locale for the B3 line; the Spanish `cocheras` note exception retired; 24/7 moved from a ban to a placement rule with negative controls); `survey.spec.ts` (fragment attribution, allowlist, no query string, cross-locale isolation, a no-JS context, first-party-only scripts, four EN disclosures, no `ARS`/`$`/`%` anywhere); `pilot.spec.ts` (pending means nothing rendered; survey primary; no offer figures; header chip); `areas.spec.ts` rewritten for the selector (config-driven, so editing the list needs no test edit); `interaction.spec.ts`, `beta-audit.spec.ts` (hero fold now measures the select and `Seguir`; S7 has no price in any column; footer formula); `links.spec.ts` (external `#` fragments are no longer treated as in-page anchors — a real false failure the new URLs would otherwise have caused).

### Verification — what actually ran

- `git diff --check`: **clean** (run).
- `yarn astro check`, `yarn build`, Playwright and visual checks: **NOT RUN.** This session's permission policy requires interactive approval for `yarn`, `astro` and similar commands, and no approval can be given in this non-interactive session. `node_modules` is also absent from this worktree, so `yarn install` (network) would be needed first. No build output, test result or screenshot exists for this pass. **Nothing here is measured.** Everything below is from reading the code only.
- Inspected only, highest risk first: (1) the hero primary action at 375×667 — the added selector label may push `Seguir` below the fold, especially in RU; (2) the select-plus-button row staying on one line at 375px (arithmetic suggests it does); (3) the header at 1000px in RU with the longer chip; (4) the S8 layout with R4 alone; (5) Astro emitting the selector script as a first-party module (the test allows inline or `/_astro/`).
- Language sweep of `src/i18n/*` (git grep): the terms left from the handoff §6.1 list occur only where the handoff itself mandates them. `24/7` appears only in pillar 02; `круглосуточ` only in the RU access FAQ; `estacionamiento`, `garage`/`car park` and `стоянка` only in the B3 lines; `cochera`/`кочера` only in the headers and B3 lines. One exception: RU «охраняет» in the §3.6-approved line matches the §6.1 stem `охран`, which is another handoff-internal conflict.

### Still blocking

~~Legal Spec v3.0 (all three legal routes; the unverified mid-session file needs owner confirmation)~~ **Resolved in the second pass above: the Spec is confirmed authentic and the three legal routes are built.** Remaining: Avisame URL · RNBD number · WhatsApp number · Anna's zone-list verification · S7 written legal approval · handoff-internal B3 vs §6.1 terminology conflict · brief S6 condition for 24/7 · ~~stale `CLAUDE.md` lines (24/7, nine areas, pending text, cameras-as-planned, zero client JS), not edited here~~ **edited in the second pass** · **build and test run of both passes** · Codex review · Kirill's visual review · deployment approval.

## 2026-08-23 — M3.5.1 beta-conversion preparation (pending review; not accepted, not deployed)

A bounded correction pass on top of M3.5, on `landing-design`. **Implementation complete, pending independent Codex remote-commit review and Kirill's visual review.** Not acceptance, not visual approval, not legal or lawyer approval, not product approval, not advertising readiness, not deployment. No dependency, skill, plugin or tool was installed; no Cloudflare or hosting setting was touched; M4–M10 remain pending and unstarted.

### Two beta Typeform flows

The beta now has **two** flows, replacing M3.5's single-destination rule:

1. **Pilot interest — primary conversion.** A new short, non-binding form for collecting contact details from people interested in the pilot. It is **not** the old founding-price flow: no monetary price, no payment/deposit/`seña`, no space reserved, no membership or contract, no promise of admission, no `/gracias` redirect. Typeform's native ending is used after submission.
2. **Research survey — secondary.** Unchanged in S13: ES `ARGCABA`, RU `latam`, EN `ARGCABA` with the visible Spanish-language disclosure, three-minute wording, and bare URLs with nothing appended.

### Safe pending configuration

`src/config/typeform.ts` now holds two explicit, total mappings: `RESEARCH_SURVEY_DESTINATIONS` (live) and `PILOT_INTEREST_DESTINATIONS` (`es: null, en: null, ru: null`), typed `PendingDestination = SurveyDestination | null`, with **no locale fallback**.

The pilot component is fully implemented now. A configured destination renders an ordinary same-tab link with the live label; `null` renders localized plain, non-interactive text — never an anchor, a button, a disabled control, `href="#"`, an empty href, or a placeholder domain. **No `example.com` or other clickable fake URL exists anywhere.** Activation requires changing only the three values in the central config; this was verified by temporarily configuring Spanish, rebuilding, confirming it rendered `…/pilotoar?lang=es&source=landing` while English and Russian independently stayed pending, then reverting. **No placeholder URL is recorded in any durable document, and the temporary `null` values are not real URLs.**

Attribution is prepared but bounded: only `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `lang`, `source` and `landing_version` may ever be appended, and only to the pilot flow. Arbitrary parameters are never forwarded and no personal datum ever enters a URL. Values are build-time only — forwarding a visitor's own `utm_*` would require client-side JavaScript, so it is deliberately not implemented and **the site still ships zero client JavaScript**.

### CTA hierarchy and copy

- Header and hero keep their internal `#fundadores` link but now read ES `Me interesa el piloto`, EN `I’m interested in the pilot`, RU `Мне интересен пилот` — interest wording, not reservation wording.
- The Founders section keeps the approved offer unchanged: 40 places, 20% off the list price, 24 months guaranteed, month to month, no `garantía`, **no monetary price**. Its explanation now states in all three locales that this is a preliminary expression of interest, reserves no space, creates no contract, accepts no payment, and that CLAVERA may contact the respondent later about the pilot.
- Live pilot labels once URLs exist: ES `Quiero participar`, EN `Join the pilot`, RU `Хочу участвовать`.
- S4 step 1 changed from reservation wording (`Reservá tu lugar` / `Reserve your space` / `Забронируй место`) to interest wording. The S10 note dropped its "leave your request" promise. Nothing else was recopywritten.

### Beta areas

The four-area set is replaced by the owner-approved nine: Almagro, Belgrano, Chacarita, Colegiales, Núñez, Palermo, Palermo Hollywood, Paternal, Villa Crespo — strictly alphabetical, original Spanish names in all three locales, never transliterated in Russian. `Recoleta` is gone. The `<ol>` with `01`–`04` markers became an unnumbered `<ul>`, removing any implied opening order or ranking, and the section carries the localized equivalent of `Barrios en evaluación. No implica compromiso de apertura, fecha ni disponibilidad.` No addresses, pins, dates, counters, confirmed locations or "first district".

Note: this set matches brief §S10 / §10.1. The stale brief §12.2 checklist line "`Belgrano` отсутствует" is inherited from v1.4 and is superseded by the brief's own v1.5 §10.1 restoration of Belgrano and Núñez, and by this decision.

### Planned-service wording

S3 and S6 gained one localized note each identifying cameras, access logging and identification as **planned properties of the future service**, since the surrounding present-tense copy could be read as describing an operating facility. The approved security boundary, the render disclosures and the S7 table are unchanged, and no new 24/7, insurance or guaranteed-security claim was introduced.

### WhatsApp

One centralized nullable value in `src/config/contact.ts`. While unset the footer renders localized plain text (`WhatsApp Business — próximamente.` / `— coming soon.` / `— скоро.`): no anchor, no `wa.me` URL, no `href="#"`, no dummy number, no disabled button.

### Legal routes

No legal content was created or finalized, and no routing structure was added — creating a route would publish a page, which is exactly what must not happen. The Spanish-only direction is recorded instead: legal pages will carry Spanish authority content only, and EN/RU will eventually link to those Spanish pages with an explicit Spanish-only notice. S7 is unchanged.

### Defects found and fixed

- **Header height.** The longer pilot CTA wrapped to two lines in English and Russian at 375px, making the rendered header 74px against a declared `--header-h` of 64px — the token hero padding, anchor offsets and sticky offsets are all derived from. Fixed by reducing the header control's inline padding below 700px and stepping the wordmark down to its intrinsic 20px height. No label was shortened, clipped or given a locale-specific offset.
- **Squashed wordmark.** The header logo had no `flex-shrink: 0`, so the flex row compressed it from 107px to 98px in English against a fixed height — a horizontally distorted mark. Fixed.

### Verification

- `git diff --check`: clean. `yarn astro check`: 56 files, 0 errors, 0 warnings, 0 hints. `yarn build`: 3 static pages, zero client JavaScript.
- Playwright across Chromium/Firefox/WebKit: **1053 passed, 0 failed, 60 skipped**, all skips justified — 24 breakpoint captures and 18 standard captures that only Chromium takes, 9 "configured pilot destination" assertions that skip precisely because the URLs are still pending (they run automatically once a URL is supplied), 6 English-only survey assertions skipped on ES/RU, and 3 skip-link reveal tests on WebKit.
- axe clean across three locales at 1440/768/375.
- Visual/responsive/interaction audit re-run for ES/EN/RU at 375×667, 375, 699, 700, 768, 999, 1000 and 1440: no horizontal overflow, header height matching the declared token at every width, hero CTA above the fold at 375×667, correct switcher behaviour either side of 700px, nine areas everywhere, the pilot boundary pending with zero controls, no `wa.me` link, and no console errors.
- Screenshot record: exactly **21** persisted diagnostic screenshots after a suite run — 9 standard and 12 breakpoint. They are gitignored and not committed.

### Review corrections applied 2026-08-23

- **Invalid test rule removed.** `tests/survey.spec.ts` forbade any URL containing `typeform.com/to/`. That is Typeform's ordinary responder path — the pending pilot form's own display URL has that shape — so the rule banned the product rather than the deferred flow. It is replaced by exact known legacy destinations (`/gracias`, `socios-fundadores`, `founding-price`, `precio-fundador`) plus semantic markers: the three localized price-reveal CTA labels M3.5 removed, matched with `textContent` so a label inside a collapsed `<details>` cannot slip through. A regression block proves a legitimate `/to/{FORM_ID}` URL is accepted, survives href building, and satisfies the destination contract.
- **A contradictory assertion was caught and removed.** The first draft of that regression block also asserted the pilot map was all-null. That would have failed the moment a real URL was supplied, meaning activation required editing a test — the opposite of the property being asserted. Verified empirically: with a synthetic `/to/AbCdEfGh` URL configured for Spanish only, the suite passed with **no test edits**, Spanish rendered an ordinary link, and English and Russian stayed pending independently. The synthetic URL was reverted; **no pilot URL is committed**, and the real RU form URL is deliberately absent from the repository while that form is unpublished and under external review.
- **Legal direction made unambiguous.** Beta legal content is Spanish-only. EN/RU link to the Spanish pages with an explicit Spanish-only notice and carry no legal translation. Every remaining EN/RU courtesy-translation requirement is marked superseded. The owner chose not to display `domicilio` or an RNBD number in the beta — a display decision that does **not** resolve the legal-sufficiency question or RNBD registration status, both of which remain unresolved pre-deployment checks. No legal text, approval or publication date is invented.
- **Playwright total corrected** from 1044 to **1053 passed / 0 failed / 60 skipped** — the figure for the M3.5.1 commit `6b96575`; the earlier number was recorded before that milestone's final run. This review-correction pass adds three regression tests and runs at **1062 passed / 0 failed / 60 skipped**.
- **Stale single-flow claims removed** from `tests/survey.spec.ts`, `tests/interaction.spec.ts`, `PROJECT_DECISIONS.md` and the execution plan. Historical dated entries carry a supersession marker instead of being rewritten.

### Still blocking real public deployment

Pilot-interest Typeform URLs · `/privacidad`, `/terminos`, `/cookies` (mandatory, unbuilt, awaiting approved Spanish authority text) · controller `domicilio` · RNBD registration/status · final publication date · S7 legal approval · Appendix В.2 / §S7 conflict · WhatsApp number · domain and Meta verification · Cloudflare access and deployment approval · Kirill's visual review · Codex's independent review of the remote commit. A dedicated EN research-survey URL is **full-release debt only**, not a beta deployment blocker.

## 2026-08-23 — M3.5 implemented (beta candidate; not accepted, not deployed)

M3.5 was implemented as one bounded stabilization pass on `landing-design`. This is **implementation complete, pending independent Codex remote-commit review and Kirill's visual review**. It is not acceptance, not visual approval, not legal approval, not product approval, not advertising readiness, and not deployment. No dependency, skill, plugin, MCP server or tool was installed; no Cloudflare or hosting setting was touched; M4–M10 remain pending and unstarted.

### Settled decisions implemented (approved by Kirill, 2026-08-23)

- **RU survey.** `https://claveraar.typeform.com/latam`. The public Russian introduction now states approximately 3 minutes, so it agrees with the site CTA. **The previous 2/3/5-minute readiness blocker is removed** — the obsolete 5-minute introduction is gone. Typeform's automatic UI estimate may still show 2 minutes; that is recorded honestly as a **non-blocking external display detail** outside our control, not a remaining launch blocker. The website continues to describe the survey as approximately 3 minutes.
- **EN survey.** **No separate English Typeform will be created for the expedited beta.** `/en/` temporarily uses the Spanish survey `https://claveraar.typeform.com/ARGCABA`. This is an explicit beta compromise. The English UI discloses that the survey is in Spanish; the destination is never labelled or described as an English survey. **Release debt: a dedicated EN public Typeform URL is required before the official full-quality release.**
- **ES survey.** `https://claveraar.typeform.com/ARGCABA`, unchanged.

### What changed in the source

- **Locale-aware survey routing**, isolated in `src/config/typeform.ts` (explicit, total `Record<Locale, SurveyDestination>` — no locale can silently inherit another's URL) and `src/components/lead-form/TypeformBoundary.astro`. Destinations are ordinary same-tab links that work without JavaScript; the page still ships zero client-side JS; no Typeform embed or SDK; no personal data in any URL.
- **English disclosure**: "The survey is in Spanish." rendered beside every survey link and wired to it with `aria-describedby`, so it is announced before the link is followed. ES and RU carry no such notice by construction.
- **Deferred conversion path removed, not disabled.** The short Socios Fundadores lead/price form, its `Ver mi precio de Socio Fundador` price-reveal CTA, and the `/gracias` redirect no longer exist in the source. Previously both Typeform controls rendered as **disabled buttons** because no URL was configured; the beta now exposes exactly one live destination and no disabled control anywhere.
- **FAQ-03 corrected in all three locales.** It previously promised "we show you the Founding Member price when you leave your details" — a submission-triggered price reveal for a flow the beta does not have. It now states that the price is not published yet and that registration opens later with no payment accepted. The canonical offer definition (20% below list, guaranteed 24 months, quarterly IPC/ICL) is preserved. Reason: `PROJECT_DECISIONS.md` outranks the brief here, and the approved founding-offer language may remain only where it does not imply a working short form or price reveal.
- **Footer interim treatment.** `/privacidad`, `/terminos`, `/cookies`, `/espacios` and `/desarrolladores` are not built, so those five entries render as plain text with a localized pending marker instead of anchors. The candidate now contains **no clickable link to a missing route** in any locale. Reversal is one line — add the path to `AVAILABLE_ROUTES` in `Footer.astro`. **No legal copy was invented.**
- **Brief S1 defect fixed.** The hero primary CTA was **below the fold at 375×667** in every locale — Spanish bottom at y=729 (62px over), Russian at y=790 (123px over), against a 667px viewport. The image band plus the mandatory render disclosure consumed 323px before the first word of copy. A short-viewport rule (`max-width: 599px and max-height: 700px`, all locales, no per-locale offsets) recovers the budget from the image band and vertical rhythm — not from copy: no text shortened, no body size reduced, the disclosure keeps its own line. Measured after fonts settle: ES/EN y=589, RU y=650.

### What was deliberately left alone

- **S7 is unchanged.** No copy, structure, or markup edit. Its written legal approval remains **outstanding**, and the Appendix В.2 / §S7 conflict with the canonical Spanish `cocheras` note remains **unresolved**. Absence of approval is never approval. A test now pins that the CLAVERA cost cell carries no currency figure.
- S4 step 1 (`Dejá tus datos…`) and the S10 zones note (`Dejá tu pedido…`) describe the product, not a beta conversion, and promise no price. They were left as approved brief copy and are flagged for Kirill rather than rewritten.
- Design system, tokens, section order, section IDs, R1–R6 mapping, the separate entrance/security image, the verbatim render disclosure, Tier-1 vocabulary rules, the `monTEK`/`Hamax` ban, the absence of 24/7 claims, and the exact insurance FAQ boundary are all untouched.

### Verification

- `git diff --check`: clean. `yarn astro check`: 53 files, 0 errors, 0 warnings, 0 hints. `yarn build`: 3 static pages, zero client JavaScript.
- Playwright across Chromium/Firefox/WebKit: **882 passed, 0 failed, 51 skipped**, all skips justified — 42 diagnostic captures that only Chromium takes, 6 English-only survey assertions skipped on ES/RU, and 3 skip-link reveal tests on WebKit, which excludes links from the default tab order.
- axe (`@axe-core/playwright`) clean across three locales at 1440/768/375. New low-emphasis text measured separately for contrast: 4.76–4.99:1 against a 4.5:1 requirement, all disclosure text ≥12px per brief S8.
- Terminology suite and its negative controls unchanged and green.
- 21 fresh **diagnostic** screenshots (not baselines) under `test-results/screenshots/`: 9 standard captures (3 locales × 1440/768/375) and 12 breakpoint captures in `m3-5-audit/` (3 locales × 699/700/999/1000px — the widths where header and navigation behaviour actually changes). **Correction (2026-08-23):** an earlier version of this entry also referred to a persisted `m3-5-inspect/` set. That directory was produced by an ad-hoc inspection script, not by the test suite, and does not persist as part of a run — exactly 21 diagnostic screenshots exist after the suite runs. Screenshots are gitignored and are not committed.
- Existing tests were not weakened. One obsolete test (`lead-capture controls stay inert while unconfigured`) was **superseded** by a stronger one asserting live links, the absence of the founders target, and no disabled control anywhere.
- `node_modules` in the working tree predated the M3 devDependencies, so `yarn install --frozen-lockfile` was run to restore the already-pinned contents. No dependency was added and `yarn.lock` is unchanged.

### Still blocking real public deployment

`/privacidad`, `/terminos`, `/cookies` (mandatory, unbuilt, awaiting approved Spanish legal authority copy) · S7 legal approval · Appendix В.2 / §S7 conflict · dedicated EN Typeform URL · domain and Meta verification · analytics and cookie consent · SPF/DKIM/DMARC · Cloudflare access and deployment approval · Kirill's visual review · Codex's independent review of the remote commit.

## 2026-08-23 — Codex review corrections for expedited beta documentation

Codex independently reviewed remote commit `53a0ae3f70641a1aac16f4fae6b672ee23bd58ef` (`docs: add expedited beta release track`). The overall two-track decision was accepted; three documentation corrections were required before M3.5 may begin. This entry and the corresponding edits to `PROJECT_DECISIONS.md` and `docs/project/CLAVERA_EXECUTION_PLAN.md` are the response. **No application source, Typeform configuration, installation, purchase, audit, or deployment changed.**

### Correction 1 — mandatory legal routes tightened

- `/privacidad`, `/terminos`, and `/cookies` are mandatory for the public beta, requiring approved Spanish authority copy, with EN/RU as courtesy translations stating only Spanish has legal validity. **[Superseded 2026-08-23 by M3.5.1: beta legal content is Spanish-only; EN/RU link to the Spanish pages with an explicit Spanish-only notice and carry no legal translation.]** There is no "approved legal fallback" for these routes: if their required content is not available, public deployment remains blocked, and removing footer links does not remove the underlying requirement once the beta sends users to Typeform and processes personal data.
- Of all the beta's legal/publish gates, **only S7** remains eligible for a separately approved beta exclusion, and only if its outstanding written legal approval is not received in time. Absence of S7 approval must never be treated as approval.
- No legal copy was created or invented in making this correction.

### Correction 2 — TypeScript LSP verification wording corrected

- The claim that M3.5 runs on tools "already installed and accepted" including the TypeScript language service was replaced. Frontend Design, Playwright, `@axe-core/playwright`, and Astro diagnostics are installed/currently available as already recorded in the tool registry. TypeScript language-service/LSP support remains approved but must still be verified during M3.5 rather than assumed, per its existing, unchanged registry entry. Astro diagnostics remain mandatory regardless of what that verification finds. The underlying tool decision is unchanged.

### Correction 3 — Typeform survey URL status recorded

- ES survey URL verified public: `https://claveraar.typeform.com/ARGCABA` — Spanish title and introduction; introduction and Typeform's own duration indicator both say approximately 3 minutes.
- RU survey URL verified public: `https://claveraar.typeform.com/latam` — Russian title and introduction; has an unresolved duration inconsistency (introduction ~5 minutes, Typeform indicator 2 minutes, current site CTA 3 minutes) that is an external Typeform/content readiness issue and must be normalized before public advertising.
- EN survey URL remains pending; `/en/` cannot be advertised as having a complete survey conversion path until it is supplied or Kirill makes another explicit decision.
- ES and RU are now known M3.5 inputs and are public responder URLs, not secrets. It is no longer accurate to say all three URLs are pending.

## 2026-08-23 — Two-track release strategy approved; M3.5 added as next milestone (documentation only)

Kirill approved an expedited public-beta track alongside the existing full-quality track. This entry records the decision. **No application source, test, configuration, dependency, skill, lock file, or asset changed. No audit ran. No tool was installed or purchased. No deployment occurred.** Only `PROJECT_DECISIONS.md`, `docs/project/CLAVERA_EXECUTION_PLAN.md`, and this worklog were edited.

### Two-track decision

- **Track A — expedited public beta**, via a new bounded milestone `M3.5 — Expedited public-beta stabilization and release gate`, inserted before M4. M3.5 is now the current next milestone.
- **Track B — full-quality release.** M4–M10 and the frozen tool registry are preserved unchanged and remain pending; the skill sequence already approved for M4+ (Taste, Refero, Impeccable, Emil Kowalski skills, Motion for JavaScript) is untouched.

### M3.5 scope

- Budget: one approximately three-hour implementation session, after this documentation commit is accepted.
- Starts from the existing ES/EN/RU site, the approved CLAVERA design system, approved R1–R6 assets, current multilingual copy, and the accepted M2.5/M3 test infrastructure.
- Fixes only high-impact visual, responsive, interaction, accessibility, routing, internal-link, asset-loading, metadata, console, survey-integration, hosting-readiness, and release blockers — no broad redesign, reference-driven recomposition, motion work, slogan rewriting, design-system replacement, framework changes, speculative refactoring, or new dependency installation.
- Taste, Refero, Impeccable, the Emil Kowalski skills, Motion for JavaScript, and Fable do not run during M3.5.

### Beta form decision

- The long research Typeform survey becomes the only Typeform destination exposed by the beta, now intended for ES, EN, and RU, each with its own public URL — an approved multilingual expansion of the earlier Spanish-only survey rule. **[Superseded 2026-08-23 by M3.5.1: the beta has two flows — the short pilot-interest form is the primary conversion and the research survey is secondary.]** At the time of this entry all three URLs were still pending; see the 2026-08-23 correction entry above this one for the ES and RU URLs subsequently verified and the EN URL still outstanding.
- The short Socios Fundadores lead/price form, the founding-price reveal, and the `/gracias` flow are excluded from the beta and remain deferred to the full product-completion track (M9) unless Kirill later removes the short form from the full roadmap explicitly.
- The beta accepts no payment, deposit, `seña`, or membership contract.

### Legal, S7, route, survey, hosting, and review gates (all still open)

- `/privacidad`, `/terminos`, `/cookies` are mandatory routes for the public beta and are not currently implemented; final Spanish legal content is pending external/legal input; EN/RU are courtesy translations of the approved Spanish authority stating only ES has legal validity. **[Superseded 2026-08-23 by M3.5.1: Spanish-only legal content; EN/RU link to the Spanish pages with an explicit Spanish-only notice.]** See the 2026-08-23 correction entry above for the tightened rule: there is no approved fallback for these routes, and public deployment stays blocked without their required content.
- Of the beta's legal/publish gates, only S7 may receive a separately approved beta exclusion. The S7 written legal approval remains outstanding (unchanged from the 2026-08-21 entries below). The Appendix В.2 / §S7 conflict with the canonical Spanish `cocheras` note remains unresolved. If S7 approval is not received before beta launch, S7 requires a separate approved exclusion decision — absence of approval is never treated as approval.
- Footer links to routes that do not yet exist must not remain broken in a public beta; the implementation choice is deferred to M3.5.
- Cloudflare access is expected later but was not available to this documentation task; no deployment is authorized here.
- The beta cannot be claimed advertising-ready until the survey path, the mandatory legal pages, the S7 decision, internal-link integrity, QA gates, and hosting readiness are all resolved. Public deployment requires a later, separate, explicit approval after Codex review and Kirill's own visual check.

### Preserved decisions carried forward unimplemented

- **Fable budget:** available balance 1,000 credits (≈ USD 100); target project spend ≤ 500 credits (≈ USD 50); at least 500 credits preserved unless Kirill explicitly approves otherwise; Fable excluded from M3.5 and from automatic correction loops; reserved for a small number of separately approved high-value visual/architectural synthesis or final-audit tasks, primarily around M4/M5 and possibly M8; no Fable invocation authorized by this commit. Local Claude Code observed at version 2.1.92 and needs an upgrade before future Fable CLI use — not performed here.
- **Refero status:** Kirill does not currently have Refero Pro; Refero MCP is not connected and is not a beta blocker; official pricing observed was USD 17 month-to-month or USD 120 billed annually; if the business owner approves it, the preferred option is one month only; no annual purchase, connection, account action, or installation approved here; Refero remains conditional M4 research tooling.
- **Future bounded Claude/Codex workflow (approved direction, not implemented infrastructure):** Claude is the only implementation writer; Codex is the independent reviewer; they never write concurrently to the same worktree; work runs in a bounded isolated branch/worktree; maximum two correction cycles per unattended run; no automatic merge to main, deployment, purchase, dependency installation, legal decision, product decision, or visual approval; Fable excluded from automatic loops; the workflow stops for Kirill at visual, legal, product, spending, and publishing gates; this automation harness is not implemented during M3.5.

Full detail is recorded in `PROJECT_DECISIONS.md`, "Release strategy (2026-08-23)", and `docs/project/CLAVERA_EXECUTION_PLAN.md`, the new M3.5 section and the 2026-08-23 decision-log entry.

## 2026-08-21 — Taste audit skill registered (not run)

The Taste Skill is now installed project-locally and committed to the repository. This is tooling registration only.

### What was installed

- Variant: `redesign-existing-projects` at `.claude/skills/redesign-existing-projects/SKILL.md`.
- Provenance recorded in `skills-lock.json`: source `Leonxlnx/taste-skill` (github), skill path `skills/redesign-skill/SKILL.md`, computed hash `b405eee0e0e80fc243f731d9aa368bca307e356db7e6157d27101d369dac6726`.
- The vendored `SKILL.md` is third-party content and is committed unmodified.
- The experimental default `design-taste-frontend` variant was deliberately not installed.

### Status

- **The skill has not been run.** No audit has been performed.
- **None of its recommendations has been approved.** There are no findings to accept or reject yet.
- M4 remains pending. Installing the skill starts nothing; the audit is an M4 activity.
- No application source, test, copy, design token, dependency or configuration changed in this commit.

### Standing rejection rule

The skill sits at position 5 in the authority order, below `PROJECT_DECISIONS.md`, the brief, `docs/design-system/` and the execution plan. Any suggestion that conflicts with CLAVERA authority is rejected unless separately approved and recorded here first. That explicitly includes:

- automatic font replacement — the skill's published guidance proposes `Geist`, `Outfit`, `Cabinet Grotesk` or `Satoshi`, against the approved Plus Jakarta Sans / Onest / IBM Plex Mono pairing;
- placeholder or stock imagery, against the approved-assets-only rule and the R1–R6 render set;
- fabricated content of any kind, against the canonical Spanish copy authority and the Appendix В terminology constraints;
- runtime motion or an animation library, which needs a separate recorded decision and the M6 motion map;
- smooth-scroll interception or blanket `scroll-behavior: smooth`, against the existing `prefers-reduced-motion` handling;
- framework changes — React, Tailwind, Next or any UI library — against the Astro static / strict TypeScript / Yarn stack;
- replacement or regeneration of the approved design system and its tokens.

Findings must be presented for review before any implementation. The skill audits; it does not decide.

## 2026-08-21 — M2.5 and M3 technically accepted

Codex completed the final independent review of the remote milestone commit. M2.5 (multilingual foundation) and M3 (test infrastructure) are technically accepted. No blocking or non-blocking code findings remain.

### Accepted commit

- Hash: `906f68bfe582d8d2db38a91acf71009f18be9fa1`
- Subject: `feat: add multilingual foundation and test infrastructure`
- Remote `origin/landing-design` independently verified at the same hash.
- 53 files committed.

### Verification reported at acceptance

- `git diff --check`: clean.
- Astro check: 50 files, 0 errors, 0 warnings, 0 hints.
- Production build: 3 pages (`/`, `/en/`, `/ru/`), zero client-side JavaScript.
- Playwright across Chromium, Firefox and WebKit: 669 passed, 0 failed, 21 reasoned skips (18 diagnostic screenshot tests captured once by Chromium; 3 skip-link reveal tests skipped on WebKit, which excludes links from the default tab order — the link's presence and first-in-tab-order position are still asserted on all three engines).

### What this acceptance does not cover

- **No visual acceptance.** Diagnostic screenshots are not visual-regression baselines and none is approved. The composition remains Spanish-first; the Russian hero headline still occupies roughly double the height of the Spanish and English ones at desktop. Visual acceptance stays deferred to the composition gate after M4/M5.
- **No legal or publish approval.** Both S7 blockers remain open, unchanged:
  1. the lawyer's written approval to publish the comparison table (brief §S7 note 2), outstanding across all three languages;
  2. the contradiction between Appendix В.2 / §S7 note 2 and the brief's own canonical Spanish market-reference note.
- **Appendix В.4 limitations unchanged.** Opening dates, address before lease signing, comparison with bike shops or free municipal guarderías, and access hours without `según el hub` are not machine-checkable; only the literal-string subset is tested. These still need human review.

### Not in the accepted commit

The Taste Skill installation (`.claude/skills/redesign-existing-projects/`, `skills-lock.json`) was deliberately excluded as M4 tooling and remains untracked. M4 has not started.

## 2026-08-21 — Multilingual scope approved and foundation milestone

### Approved scope change

- The phase-one `es-AR`-only decision is superseded. The landing page now ships three static locales: `es-AR` at `/` (canonical, unprefixed), `en` at `/en/`, `ru` at `/ru/`.
- This restores the multilingual regulation already present in the brief's Part V, which the phase-one decision had narrowed.
- Spanish remains the canonical product-copy authority. English and Russian are working translations carrying identical approved meaning and legal constraints; wording may be refined editorially later, meaning may not drift.
- Multilingual support is treated as a composition and responsive-design constraint. All three locales are required inputs to every future responsive review.
- Tier-1 forbidden vocabulary, the entity-protection rule, render disclosures, insurance constraints, operating-hour constraints and the `monTEK`/`Hamax` prohibition apply in every language and may not be weakened by a translation.
- `c5171d2` is the technical redesign baseline, not final visual acceptance. Visual acceptance moves to the composition gate after the multilingual redesign and its QA.
- Claude is the implementation writer; Codex is the independent reviewer. They must not write to the same worktree concurrently.

### Documents updated

- `PROJECT_DECISIONS.md` — phase-one locale rule superseded; new "Multilingual scope (2026-08-21)" section.
- `CLAUDE.md` — locale routes, translation authority, per-locale responsive review, Tier-1 enforcement in all languages, no browser-language redirect, reviewer/writer separation.
- `docs/project/CLAVERA_EXECUTION_PLAN.md` — current state, M2 status correction, new M2.5 multilingual foundation milestone, M3 locale coverage, two dated decision-log entries.

Historical entries were not rewritten.

### 2026-08-21 — M2.5 + M3 milestone commit

Codex completed the read-only pre-commit review of M2.5 and M3 with no blocking code or test findings. The multilingual foundation and the test infrastructure are committed together as one milestone on `landing-design`.

Deliberately excluded from the commit: the Taste Skill installation (`.claude/skills/redesign-existing-projects/`, `skills-lock.json`). That tooling belongs to M4, not to M2.5 or M3, so it stays untracked until the M4 milestone commit or is ignored, at Kirill's call.

Status after this commit:

- M2.5 and M3 are implementation complete and pending **final Codex review of the remote commit**.
- Nothing here constitutes visual acceptance. The composition is still Spanish-first and the Russian hero headline still occupies roughly double the height of the Spanish and English ones at desktop.
- Nothing here constitutes legal approval. Both S7 blockers remain open (see the two entries below).

### 2026-08-21 — Appendix В second correction round (uncommitted)

Codex verified the first correction round and confirmed the original blockers fixed, but held M2.5/M3 on two remaining Appendix В gaps. Both are now closed.

- **Standalone `por hora` was not scanned.** Appendix В.1 lists the row as `tarifa por hora, por hora`, so the bare phrase is Tier 1 in its own right. It is now in the Tier-1 dictionary, with permanent negative controls proving it is detected and that it does not fire on `por membresía` / `por 24 meses`.
- **Tier 2 had leaked out of the column header.** The EN and RU market-reference notes used `car garages` and «автомобильных кочер». Appendix В.2 and brief §S7 note 2 permit the Tier-2 term **only** as the S7 column header. Both notes are rewritten neutrally, carrying no Tier-1 or Tier-2 term or root, and both phrases are removed from the allowlist. The allowlist is now three column headers plus one scoped Spanish exception, guarded by a test that fails if it grows.
- **A scanner weakness was found by its own negative control.** Stripping the allowlist by plain substring removed `Car garage` from inside `car garages`, leaving a stray "s" so the plural passed. The strip is now bounded by Unicode lookarounds, so a permitted phrase glued to another letter no longer counts as permitted.

#### Outstanding authority conflict — canonical Spanish S7 note `[BLOCKER]`

The brief contradicts itself and this is not resolvable in code:

- §S7 note 2 (line 350): the word `cochera` is used *"только как заголовок колонки и только в этой таблице"* — column header only.
- Appendix В.2 (line 1650): permitted location is *"заголовок колонки таблицы S7"*.
- But the brief's own approved S7 copy (line 345) reads: `Valores de referencia de mercado para cocheras en CABA, {mes} 2026.` — using `cocheras` in the **note**, not the column header.

The brief is the authority for canonical Spanish copy, so the sentence ships verbatim. The automated exception is scoped to that one exact sentence — a reworded variant or the bare word still fails the suite, and English and Russian get no equivalent exception. Resolution needs the lawyer, alongside the still-outstanding written approval for publishing the S7 table at all (§S7 note 2), which now covers three languages.

### 2026-08-21 — Appendix В correction round (uncommitted)

Codex has not accepted M2.5/M3. This round addresses its blockers.

- **Appendix В was found, not missing.** The previous report wrongly recorded the terminology dictionary as absent from the brief. It is at lines 1633–1671 (`# ПРИЛОЖЕНИЕ В`, subsections В.1–В.4); the earlier search missed it on heading case.
- **Two Tier-1 violations shipped and are now fixed.** Appendix В.1 lists English `car space` and Russian «машиноместо»/«кочера» as Tier 1, forbidden everywhere. The EN and RU comparison columns used exactly those. They now use the Appendix В.2 forms `Car garage` and «Автомобильная кочера», which are permitted **only** in the S7 comparison and **still require the lawyer's written approval** — the same blocker that already attaches to the Spanish table (brief §S7 note 2). That approval is still outstanding for all three languages.
- The screen-reader table caption no longer carries the Tier-2 term in any locale; it was not brief copy, so keeping it there widened the legal surface for no benefit.
- **Render alt text now repeats the mandatory disclosure.** Brief S8 requires it in `<figcaption>` *and* `alt`; only the figcaption carried it. Alt is now composed as literal description + the exact localized disclosure, hero R1 included.
- Diagnostic screenshots are gated on every image having loaded *and* decoded; the earlier captures showed blank render panels because they waited on a fixed timeout.
- The Playwright harness no longer reuses an existing server on the test port, and the static server refuses to start against a missing build.

### Implementation outcome (M2.5 + M3, uncommitted)

Astro built-in i18n with `prefixDefaultLocale: false`; three static routes (`/`, `/en/`, `/ru/`) from one component tree. Copy lives in `src/i18n/{es,en,ru}.ts` against a shared `Copy` interface, so a missing translation is a TypeScript error. Components read strings via `getCopy(Astro.currentLocale)` — no locale prop drilling, no per-locale duplication. Alt text, captions and the render disclosure moved out of `src/data/media.ts` into the locale files; that file now owns only paths and measured dimensions.

Three defects were found by the new multilingual QA and fixed:

1. **Paper-surface contrast below AA.** `--text-tertiary` mapped to concrete-500, measuring 3.55:1 on concrete-50. This affected the mandatory generated-render disclosure under the R6 plan sheet, which the brief requires at >=4.5:1. Remapped to the secondary token (6.44:1). Pre-existing since the visual-direction milestone; invisible until axe ran.
2. **Russian CTA overflowed the viewport.** `.button` had `white-space: nowrap`, so the longer Russian founders CTA rendered 415px wide inside a 375px viewport and was clipped. Buttons now wrap and cap at `max-width: 100%`.
3. **Header height diverged from `--header-h` on mobile.** Adding the language switcher wrapped the header to a second row (108px actual vs 64px declared), silently breaking hero padding, anchor offsets and sticky offsets. Root cause was the Astro scoping trap recorded in the previous milestone — a class passed into a child component does not carry the parent's scope, so the rule hiding the switcher never matched. Fixed with a parent-owned wrapper element; the header switcher now appears from 700px up and the footer switcher (required in both places by brief Part V) carries mobile.

Regression cover added for all three: an axe scan per locale/viewport, a viewport-containment assertion that does not rely on scrollability, and a test asserting `--header-h` equals the rendered header height per locale and viewport.

## 2026-08-20 — Tool registry frozen

- Reviewed the previously approved tool plan plus the two supplied recommendation screenshots.
- Finalized the minimal durable documentation set: root `CLAUDE.md`, `docs/project/CLAVERA_EXECUTION_PLAN.md`, and `docs/project/CLAVERA_WORKLOG.md`.
- No newly advertised tool was added automatically.
- Current cycle is limited to: Frontend Design; isolated Taste audit; Refero research when Pro access is confirmed; separate Impeccable critique; Playwright + axe + Astro/TypeScript diagnostics; Emil skills at the motion milestone; conditional Motion for JavaScript; and final Checklist Design plus separate Lighthouse/SEO/accessibility checks.
- Explicitly excluded for this cycle: UI UX Pro Max, Superpowers, gstack, Context7, Claude SEO/marketing suites, Caveman, HyperFrames, Skill Creator, Bulletproof, Dataviz, productivity/external-memory plugins, Anthropic document skills, 21st MCP, Uiverse, and duplicate security-review installation.
- The freeze can be changed only after documenting a specific unmet need in the execution plan.
- No Claude prompt was issued, no tool was installed, and no repository or branch was changed while making this decision.

## 2026-08-20 — Context recovery and precision-pass review

### Repository state

- Repository: `clavera-dev/clavera-landing`
- Active branch: `landing-design`
- Latest remote commit: `c5171d2ec725f4e4c86985c2e0e71264d729bf2f`
- Commit subject: `fix: refine landing geometry and visual alignment`
- Baseline branch: `landing-v1` at `a288758`

### Independently reproduced checks

- Remote branch resolves to `c5171d2ec725f4e4c86985c2e0e71264d729bf2f`.
- `git diff --check c04a89f..c5171d2`: pass.
- Astro diagnostics: 25 files, 0 errors, 0 warnings, 0 hints.
- Production build: pass; one static page generated.
- Source scan: no `24/7`, `Hamax`, or `monTEK` public copy introduced.
- Insurance terminology remains only in the brief-approved FAQ wording.
- Typeform remains isolated in `TypeformBoundary.astro` and `src/config/typeform.ts`; public integration is still inert.
- Removed legacy R1/R2/R4/R5/R6 derivative paths are absent from source and built output.
- Final render directory contains 60 optimized derivatives; the separate entrance render retains 6 derivatives.
- The remote commit does not contain a repository `CLAUDE.md`, although the original plan required a compact one. Its creation is now a blocking documentation follow-up before the next implementation milestone.

### Review limitation

Codex verified the remote diff, source, diagnostics, and production build. Codex did not independently reproduce Claude's pixel measurements in a real browser because browser automation is not yet installed in this review environment. Kirill's local visual check and the upcoming Playwright layer are required before full visual acceptance.

### Restored original workflow decisions

At project start:

- Claude Code without proxy or external memory;
- official Frontend Design;
- compact project `CLAUDE.md`;
- structured project documentation.

After the first visual concept:

- Taste Skill as an isolated art-director audit;
- it may not change the approved brand or stack without explicit justification and approval.

During motion work:

- `emil-design-eng`;
- then `review-animations`.

During QA:

- Playwright;
- TypeScript LSP;
- ordinary code review;
- Lighthouse, SEO, and accessibility checks as separate tasks.

### Additional confirmed tool decisions

- Impeccable: approved as a critique/audit/polish layer; installation pending.
- Official Emil Kowalski skills: approved for the motion milestone; installation pending.
- Refero MCP: approved for reference research, subject to account access.
- Checklist Design: approved for manual final QA; no repository installation.
- Motion for JavaScript: conditional on an approved motion map; not installed yet.
- UI UX Pro Max: evaluation candidate only until an uncovered audit need is demonstrated.
- 21st.dev and Uiverse: not part of the CLAVERA implementation stack.

### Current gate

1. Kirill performs a local visual check of `c5171d2`.
2. Add a compact `CLAUDE.md`, this execution plan, and this worklog to the repository.
3. Install Taste Skill variant `redesign-existing-projects` and run it in audit-only mode.
4. Add Playwright and `@axe-core/playwright` as the next implementation milestone.
5. Do not start motion implementation yet.

### Context and model handling

- Claude visual-critical work: use the Opus model selected in Claude Desktop with High effort and Auto permissions unless a later task explicitly changes them.
- The exact Claude Opus version is not present in the current report and must not be guessed.
- Codex model identity available to this conversation: Codex based on GPT-5. The exact deployment label and adjustable effort value are not exposed inside the conversation, so they must be read from the product UI if the user needs the precise setting.
- Recommended new Codex review window, when the UI exposes these controls: GPT-5.6 Sol with High reasoning. Reserve xhigh for final cross-source architecture or release review rather than routine status handling.
- Before opening a new chat, ensure the plan and worklog are in the repository or attach them to the new chat. The new chat must read both before giving project advice.
