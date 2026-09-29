# M8 — Early QA preflight (not final M8 acceptance)

Status: **code/test review and two small regression tests written; nothing executed by the worker.** The Claude worker that produced this document had file read/write tools only — no shell, no browser, no `yarn`, no Playwright, and `node_modules` is not installed in this worktree (confirmed: `node_modules/.bin/playwright` does not exist here). This mirrors the stated limitation in `M5_2_RESULT.md` and `WHATSAPP_LINK_RESULT.md`/`PHONE_LINK_RESULT.md` — it is not new to this session.

This document is a **preflight**, done after M6 (`M6_MOTION_MAP.md`, specification only, nothing implemented) and ahead of the real M8 gate defined in `CLAVERA_EXECUTION_PLAN.md` lines 408–421. It does not satisfy that gate by itself: no Playwright run, no axe run, no manual keyboard/screen-reader pass, no Lighthouse, and no visual-regression baseline was actually captured in this session. Every claim below is either (a) a static read of the existing test suite and source, correctly reflecting what the tests assert, or (b) explicitly marked **not verified** where it would require running code. No legal copy, public claim, or publishing action was touched.

## 0. What the worker actually did vs. what the dispatcher must run

| | Worker (this session) | Dispatcher / human |
|---|---|---|
| Read `playwright.config.ts`, `package.json`, and all 22 files under `tests/` | Done | — |
| Read the M5.2/WhatsApp/phone changes (`ZoneSelector.astro`, `Hero.astro`, `Footer.astro`, `src/config/contact.ts`) and their result docs | Done | — |
| Identified two genuine coverage gaps (zone-list overflow at non-phone breakpoints; render-caption content) and added regression tests for both | Done (`tests/m5-2.spec.ts`, `tests/media.spec.ts`) | — |
| `yarn install` / confirm `node_modules` | Not possible (no shell) | **Owed** |
| `yarn astro check` | Not run | **Owed** |
| `yarn build` | Not run | **Owed** |
| `yarn test` (full Playwright suite, 3 browser projects) | Not run | **Owed** |
| Manual keyboard-only pass in a real browser | Not run | **Owed** |
| Manual screen-reader pass (VoiceOver/NVDA) | Not run | **Owed** |
| Lighthouse (performance/SEO/a11y) | Out of scope for this preflight per the task brief ("performance and Lighthouse later") | Owed at full M8 |
| Visual-regression baseline capture | Out of scope — `screenshots.spec.ts` itself says diagnostic only, "baselines are established later (execution plan M8)" | Owed at full M8 |

Because nothing executable ran, **no item in this document is marked "pass."** Where the existing test suite already asserts a behaviour by static reading, it is marked "asserted by \<file\>, not run this session" — that is a statement about test coverage, not a result.

## 1. Existing automated coverage (read, not run)

The suite already covers most of the M8 preflight scope. Summary, by concern (file: what it asserts):

- **Horizontal overflow, clipping, header geometry** — `tests/structure.spec.ts`, all of `VIEWPORTS` (1440/1280/1100/1024/768/375) × 3 locales: no page-level horizontal scroll, no element outside the viewport (except the labelled `.table-wrap` scroll region and deliberate bleed), no clipped nav/heading/body copy, `--header-h` matches the rendered header, anchored sections clear the fixed header, body copy ≥16px.
- **Zone selector / hero, 375×667** — `tests/m5-2.spec.ts`: "Seguir" and the search field on the first screen under the header; no horizontal overflow with the list closed or open; field space reserved before the script runs; no-JS fallback (Chromium only, feature-detection limitation, documented in the file); list affordance chevron flips; full keyboard operation (focus/arrows/Enter/Escape/Tab); S10 focus not hidden under the header; unmatched search closes the list; single-selection invariant; reduced-motion (`scroll-behavior: auto`, zero running animations after keyboard use); hero prototypes (M5.2 H-1) confirmed not shipped.
- **Accessibility automation** — `tests/a11y.spec.ts`: axe (`wcag2a`/`wcag2aa`/`wcag21a`/`wcag21aa`) at 1440/768/375 × 3 locales, zero violations required.
- **Keyboard / focus** — `tests/interaction.spec.ts`: skip link first in tab order and visible on focus (WebKit excluded from the Tab-order assertion only, per platform default — documented), FAQ open/close by keyboard, visible focus indicator on the header CTA, no disabled/dead control anywhere.
- **Console/network hygiene** — `tests/console.spec.ts`: zero console errors, zero failed/4xx+ requests per locale.
- **Images / alt / captions** — `tests/media.spec.ts`: every image loads and decodes; every image has non-empty alt; every `<figure>` has exactly one disclosure element and it is verbatim; every render alt ends with the exact disclosure and keeps a real visual description in front of it; hero R1 is included in the disclosure guarantee. **Gap found and closed this session** — see §2.
- **Three-locale link destinations** — `tests/links.spec.ts` (internal routes resolve/load, unbuilt routes stay text-only, legal pages resolve, language switcher targets load), `tests/survey.spec.ts` (research survey routes to the correct per-locale Typeform URL with allowlisted fragment attribution, no cross-locale leakage, no deferred/price-reveal destination), `tests/pilot.spec.ts` (pilot/WhatsApp/phone destinations render as the exact configured anchor or the exact localized pending text, never a placeholder, `href="#"`, or disabled control), `tests/language-switcher.spec.ts` (fixed ES·EN·RU order, `aria-current`, footer always present, header shown ≥700px, works with JavaScript disabled). No gap found here — this is already the most thoroughly tested area of the suite.
- **Legal pages** — `tests/legal.spec.ts`: routes exist per locale, controller identity, no RNBD number or fabricated date, cross-border transfer clause, EN/RU carry the Spanish-authority notice, section counts agree across locales.
- **Document head** — `tests/locale-head.spec.ts`: `lang`, canonical, hreflang (incl. `x-default`), exactly one `h1`, localized static HTML without JavaScript.
- **Beta-specific audit** — `tests/beta-audit.spec.ts`: header/nav at breakpoints, hero CTA above the fold at 375×667, survey CTA column fit, disclosure legibility, footer inside the viewport at 375px, no price anywhere in S7.

## 2. Gaps found and closed this session

Two gaps were real (the tested behaviour was genuinely unverified, not merely undocumented) and small enough to fix directly, per the task's "small and reversible" instruction. No implementation code was changed — only tests were added.

1. **Zone-selector list overflow was only checked at 375×667.** `structure.spec.ts` checks page-level overflow at every required viewport but never opens the zone-selector's listbox while measuring. The listbox is `position: absolute; left: 0; right: 0` inside a flex field (`ZoneSelector.astro`), so a regression there would only be visible with it open — and only `m5-2.spec.ts`'s phone-only test opened it. Added: `tests/m5-2.spec.ts` → `zone selector list stays inside the viewport with the list open`, both selector instances (`#top`, `#zonas`), all 3 locales × 1440/768/375 (`SCREENSHOT_VIEWPORTS`).
2. **Render captions were never asserted.** `media.spec.ts` checked the disclosure text but not the `caption` prop's own text (`RenderFigure.astro`, used with `caption` on Pillars/r2, Security/entrance, HubShowcase/r4, Vehicles/r5). A regression that dropped the `caption` prop, showed the wrong locale's caption, or leaked a caption onto an uncaptioned figure (hero R1, HubShowcase's own R6) would have passed the existing suite. Added: `tests/media.spec.ts` → `shows the correct localized caption on every captioned render, and nowhere else`, per locale, comparing the full set of rendered `.render-figure__caption` texts against the exact strings in `src/i18n/{es,en,ru}.ts`.

Both are **not verified** — they are code that was read carefully against the source and existing test conventions, not a passing test run. They must run in §4 before being trusted.

No other gap in the task's named scope (responsive hero/zone selector, three-locale link destinations, image captions, horizontal overflow) was found; adding further tests there would mirror implementation rather than catch a real regression, which the task asked to avoid.

## 3. Bugs found

None with reproduction evidence. No shell/browser was available to reproduce anything, so nothing is claimed as a bug. One item is flagged as worth the dispatcher's attention, not as a defect:

- `src/data/media.ts` / `src/i18n/*.ts` define an `r3` render (`Zona de autolavado` / self-service cleaning bay) with its own alt and caption copy, but no component currently renders `id="r3"` anywhere under `src/components/sections/`. This may be intentional (a render awaiting a section slot) or dead config. **Not verified as a bug** — flagging for a human decision, not fixing, since removing or wiring it up is a product/content call outside this preflight's scope.

## 4. Exact local verification matrix

All commands run from the worktree root. The suite already parametrizes locale × viewport × browser internally (`tests/locales.ts` `LOCALES`/`VIEWPORTS`/`SCREENSHOT_VIEWPORTS`, `playwright.config.ts` `projects`), so the full matrix is one command; the per-cell commands below are for isolating a single failure.

### 4.1 Setup (owed once)

```sh
yarn install
yarn astro check
```

### 4.2 Full suite, all 3 engines, every locale and viewport

```sh
yarn test
```

This alone executes: structure/overflow (§1, all `VIEWPORTS`), the two new zone-selector-list-open checks (§2.1, `SCREENSHOT_VIEWPORTS`), axe (`SCREENSHOT_VIEWPORTS`), keyboard/interaction, console/network, media/alt/captions (incl. §2.2), links/survey/pilot/legal/head, and beta-audit — across `chromium`, `firefox`, `webkit`.

### 4.3 Per-engine

```sh
yarn playwright test --project=chromium
yarn playwright test --project=firefox
yarn playwright test --project=webkit
```

### 4.4 Responsive hero / zone selector — 1440 / 768 / 375 × ES / EN / RU

| Viewport | Locale | Chrome | WebKit | Firefox | Command to isolate |
|---|---|---|---|---|---|
| 1440px | es / en / ru | not verified | not verified | not verified | `yarn playwright test tests/structure.spec.ts tests/m5-2.spec.ts --project=<engine> --grep "1440px"` |
| 768px | es / en / ru | not verified | not verified | not verified | `--grep "768px"` |
| 375px | es / en / ru | not verified | not verified | not verified | `--grep "375px"` |

Zone-selector-specific (open-list) checks, all three breakpoints and locales:

```sh
yarn playwright test tests/m5-2.spec.ts --grep "list stays inside the viewport"
```

### 4.5 Three-locale link destinations

```sh
yarn playwright test tests/links.spec.ts tests/survey.spec.ts tests/pilot.spec.ts tests/language-switcher.spec.ts tests/legal.spec.ts
```

### 4.6 Keyboard

```sh
yarn playwright test tests/interaction.spec.ts tests/m5-2.spec.ts --grep "keyboard|Tab|Escape|Enter"
```
Plus a manual pass owed: Tab from the top of the page through header → hero zone selector → footer in all three browsers, confirming no keyboard trap and a visible focus ring throughout (not just on the elements the automated test samples).

### 4.7 Reduced motion

```sh
yarn playwright test tests/m5-2.spec.ts --grep "reduced motion"
```
Scope note: per `M6_MOTION_MAP.md`, nothing beyond the already-shipped motion inventory exists to test yet — M6 was specification only, M7 (implementation) has not run. This command re-verifies today's baseline (`scroll-behavior: auto`, zero running animations under `prefers-reduced-motion: reduce`), not any new M7 motion.

### 4.8 Alt text / captions

```sh
yarn playwright test tests/media.spec.ts
```

### 4.9 No horizontal overflow

```sh
yarn playwright test tests/structure.spec.ts tests/m5-2.spec.ts --grep "overflow"
```

### 4.10 Console / network

```sh
yarn playwright test tests/console.spec.ts
```

### 4.11 Accessibility automation

```sh
yarn playwright test tests/a11y.spec.ts
```

### 4.12 Diagnostic screenshots (not visual-regression baselines)

```sh
yarn playwright test tests/screenshots.spec.ts --project=chromium
```
Writes to `test-results/screenshots/` (git-ignored, cleared each run). For a human visual pass, not a pass/fail gate.

### 4.13 Owed later, explicitly out of scope for this preflight

- Lighthouse performance/SEO/accessibility (`CLAVERA_EXECUTION_PLAN.md` M8 bullet "run Lighthouse … separately").
- Stable visual-regression baselines in a controlled environment.
- Manual screen-reader pass (VoiceOver/NVDA), beyond the axe automation in §4.11.
- Performance/asset audit (bundle size, image weight budget).

## 5. Result recording convention for the dispatcher

For every row/command above, replace "not verified" with either:
- `pass` — command run, zero failures, paste the Playwright summary line; or
- `fail: <exact assertion + file:line + one repro step>` — never replace "not verified" with "pass" without the run actually happening.

## 6. Next unit

1. Dispatcher runs §4.1–§4.2 (full suite) and records real pass/fail per §5.
2. If the full suite passes, the two new tests (§2) become load-bearing gates rather than untested additions.
3. Any failure gets a bug entry here with the exact assertion and repro command, per §5 — not folded silently into a "fix" without recording what broke.
4. Full M8 acceptance (Lighthouse, visual baselines, manual screen-reader pass) stays a separate, later unit per the task brief.
