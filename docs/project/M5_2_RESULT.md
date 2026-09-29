# M5.2 — result (hero H-1 prototypes, SEL-1 selector fix)

Status: **code and tests written; nothing run by the worker.** The Claude worker that made this change had file read/write tools only — no shell, no browser, no `yarn`, no Playwright (and `node_modules` is not installed in this worktree). Every number below marked `[calc]` is derived from source, not measured. All acceptance evidence must come from the dispatcher (or Kirill/Codex) running the commands in §4. No publication, push, image, purchase, analytics, copy or legal-text change was made.

Scope source: `M4_CURRENT_HANDOFF.md` §6, `M4_REFERENCE_COMPOSITION_SPEC.md` §10 (H-1, H-2, SEL-1) and §13 (M5.2 row).

## 1. SEL-1 — zone selector layout stability (implemented)

File: `src/components/lead-form/ZoneSelector.astro` (+ one optional type field in `src/i18n/types.ts`). No ES/EN/RU string was added or changed.

| | Before | After |
|---|---|---|
| Field before the script runs | `[hidden]` → `display: none`; "Seguir" sits at the row's left edge, then jumps right by the field's width (the field's width plus the 12 px gap, roughly 200–230 px at 375 px depending on the button label `[calc]`, or down a row where the row wraps) when the script un-hides it — the CLS source named in audit O-04 | With `@media (scripting: enabled)` the hidden field keeps its box (`display: block; visibility: hidden` — invisible, unfocusable, out of the a11y tree), so "Seguir" is already where it will stay. Without scripting the old `display: none` still applies, so no-JS visitors get no empty gap. Browsers without the `scripting` media feature keep the old behaviour |
| "This is a list" affordance | None | CSS-drawn chevron (`.zone-selector__field::after`, 8 px, 2 px `--text-secondary` stroke, in the input's existing 40 px right padding), same idiom as the FAQ's drawn mark; flips while `aria-expanded="true"` with **no transition**; `pointer-events: none`; decorative (the `combobox` role already carries the semantics) |
| Search with no match | Listbox opened as an empty bordered sliver (padding + border only) with `aria-expanded="true"` | Listbox stays closed and `aria-expanded="false"`; typed text is kept |
| Empty-result message | None | Structural slot only: `zoneSelector.empty?: string` in the copy type; when present, a `<p role="status" data-zone-empty>` opens in the list's popover position (absolute, so no layout shift). **No locale defines it** — the words are owner copy (**D7**), so today nothing renders |

Unchanged: filtering, `candidate_zone` fragment behaviour, Spanish zone names, the no-JS link, the hero short-phone gap, all copy.

## 2. H-1 — short-phone hero prototypes (prepared, not chosen)

The shipped hero is **unchanged**; `Hero.astro` only gained a comment pointing to the prototypes.

- `tests/prototypes/hero-h1.css` — both variants, scoped to `(max-width: 599px) and (max-height: 700px)` and behind `html[data-hero-proto="a"|"b"]`. It sits outside `src/`, is imported by nothing, and is not part of `yarn build`, so **it cannot reach a deployment and there is no dev route, query parameter or script that turns it on**. `tests/m5-2.spec.ts` asserts that no built page sets `data-hero-proto` (even with `?hero-proto=a#hero-proto=b` in the URL) and that no shipped stylesheet mentions it.
- **A (backdrop):** R1 becomes an absolute backdrop `56svh` tall (≈373 px at 667) behind header, disclosure, eyebrow and H1; scrim `0.86` over the top 34 % (header + disclosure), `0.66` at 60 %, `0.8` at 82 %, solid at 100 %. The figure keeps only `padding-top: var(--header-h)` + the disclosure in flow, so the copy moves up by ≈49 px `[calc]` (the band's 113 px minus the 64 px header). Disclosure colour steps up from tertiary to secondary, as the hero eyebrow already does over photography — colour only, text and size unchanged.
- **B (band):** band size and fold budget unchanged; `object-position: 50% 0%` (was `50% 42%`), which puts R1 rows ≈31–54 % of its height — wordmark, rack tops, lockers — in the ≈49 px visible below the header `[calc]`; the band's fade is pulled down (`solid 0 %, 0.55 at 12 %, 0.04 at 40–55 %, 0.6 at the top` vs. the current `2 % / 26 % / 58 % / 100 %`) so that strip is not darkened away. Disclosure stays on the plain ground below the band, as today.

**Recommendation: unresolved — D4 stays open.** The worker could not render either variant. On paper, A is the only one that also adds fold slack (≈+49 px for RU, today 23 px), which argues for A *if* its disclosure and eyebrow contrast pass; B is the lower-risk change since no text moves onto the image. The harness below reports both numbers; pick by this rule:

1. Drop any variant whose `pass` is `false` in any locale (fold, disclosure/eyebrow ≥ 4.5:1, H1 ≥ 3:1 — spec §12 and the M5.2 stop conditions).
2. If both pass, prefer **A** unless the captures show R1 reading as muddy behind the text; then **B**.
3. If neither passes, keep the current band and escalate to Kirill (spec §10: "relax the fold" is not proposed).

The winner moves into `Hero.astro`'s short-phone block and `tests/prototypes/hero-h1.css` is deleted in the same commit.

## 3. Tests added

`tests/m5-2.spec.ts` (all three browser projects unless noted; these are gates):

- 375×667 × ES/EN/RU: "Seguir" and the hero search field fully in the viewport, below the fixed header, bottom ≤ 667.
- 375×667 × ES/EN/RU: no element past the viewport edge (outside its own scroll/clip region), with the hero list closed and open.
- Field space reserved: "Seguir"'s box is identical with the field hidden (pre-script state) and shown, hero and S10.
- No JavaScript (Chromium only): field has no box, "Seguir" starts the row and keeps the plain survey href.
- Chevron present and flips when the list opens.
- Keyboard: opens on focus, focus ring drawn, ArrowDown/ArrowUp move `aria-activedescendant`, Enter chooses and closes with focus kept, Escape closes; Tab reaches "Seguir" (skipped on WebKit, which does not Tab to links on macOS).
- S10 input focus is not hidden under the fixed header at 375×667 (WCAG 2.4.11).
- Unmatched search keeps the list closed with `aria-expanded="false"`; no empty-state element rendered (D7).
- Never more than one `aria-selected="true"` per selector (click, re-choose by keyboard, edit, choose another); option ids unique page-wide; S10 unaffected by the hero choice.
- Reduced motion: `scroll-behavior` computes to `auto`, and no animation is running after keyboard use of the selector.
- Prototype switch is not shipped (see §2).

`tests/m5-2-hero-prototypes.spec.ts` (Chromium only; **evidence, never fails on a measurement**): current/A/B × ES/EN/RU at 375×667, plus the unchanged desktop hero at 1280×720 and 1440×800 (H-2). Logs one `M5.2 {…}` JSON line per case: CTA bottom and spare vs the fold, image box, and worst-case WCAG contrast of the disclosure, eyebrow and H1 — the text's computed colour against the **brightest** pixel in its box, sampled from a capture with that text hidden.

No existing test was changed: `survey.spec.ts`'s no-JS `toBeHidden()` holds for both `display: none` and `visibility: hidden`, and `areas.spec.ts`' unmatched-text step only checks the href.

## 4. Commands (for the dispatcher — none of these were run by the worker)

```sh
git diff --check
yarn astro check
yarn build
yarn playwright test tests/m5-2.spec.ts
yarn playwright test tests/m5-2-hero-prototypes.spec.ts --project=chromium | grep '^M5.2 '
# captures: test-results/screenshots/m5-2/{es,en,ru}-375x667-{current,a,b}.png
#           test-results/screenshots/m5-2/{es,en,ru}-{1280x720,1440x800}-current.png
yarn playwright test   # full suite incl. legal, terminology, disclosure
```

`test-results/` is git-ignored and Playwright clears it on each run; copy the PNGs to `docs/project/M5_2_EVIDENCE/` if they should be kept. A CLS reading for SEL-1 in a real browser (DevTools Performance, S10 and hero, cold load) is still owed per handoff §6; the reservation test proves the mechanism, not the page-level CLS number.

Risks the run should watch: `@media (scripting)` needs Chrome 120 / Firefox 113 / Safari 17 (older engines fall back to today's shift); if a script ever fails to load while scripting is on, an invisible field-sized gap sits left of "Seguir"; the horizontal-overflow scan may flag a deliberate bleed clipped only by `body { overflow-x: clip }` — treat a named offender as something to look at, not automatically a bug.

## 5. Next step

1. Dispatcher runs §4 and records the JSON lines and pass/fail here (fill in the table: locale × variant × CTA bottom × disclosure/eyebrow/H1 contrast).
2. Apply §2's rule to choose A or B, or escalate D4 to Kirill with the nine 375×667 captures; fold the winner into `Hero.astro` and delete the prototype file.
3. H-2: judge the 1280×720/1440×800 captures by eye (5 px RU spare, triple scrim); no code change proposed.
4. Kirill supplies ES/EN/RU empty-state copy (D7) whenever wanted; adding `empty:` to the three locale files is the whole change.

Then M5.3 (rhythm and surfaces) per spec §13.
