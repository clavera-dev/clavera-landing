# M8 checkpoint — result (static re-check of M8_PREFLIGHT.md, M5_NEXT_RESULT.md)

Status: **static verification only; no command executed.** This worker session had file read/search/write tools only — no shell/Bash tool, no browser. `node_modules` is still absent from this worktree (`node_modules/.bin/playwright` — not found). This is the same constraint recorded in `M8_PREFLIGHT.md` §0 and `M5_NEXT_RESULT.md` §4; it has not changed between sessions. Every row below is either a static re-check against source (marked **pass** only when the source itself confirms the claim) or **not-run** with the exact command owed. Nothing was built, served, or measured in a browser. No legal, copy, route, link, or dependency was touched.

## 1. What this session did

Re-read `M8_PREFLIGHT.md` and the accepted M5 result (`M5_NEXT_RESULT.md`, R-6 (a): FoundersSection → `surface="none"` (default), FaqSection → `surface="raised"` added) and cross-checked the preflight's claims against current source, looking specifically for an evidenced regression from that change:

| Check | Method | Result |
|---|---|---|
| `Section.astro` accepts `surface: 'deep' \| 'raised' \| 'paper' \| 'none'`, default `'none'` | Read `src/components/layout/Section.astro:28,52` | **pass** — `FoundersSection.astro` omitting `surface` is equivalent to the documented `surface="none"`, not a typo |
| No test asserts section background/surface class (would make R-6 (a) a silent breaking change) | `Grep` `surface-raised\|surface=\|fundadores.*surface\|faq.*surface` across `tests/` | **pass** — zero matches, confirms `M5_NEXT_RESULT.md` §2's own claim |
| `tests/m5-2.spec.ts` "list stays inside the viewport" test exists as described (§2.1 of preflight) | Read `tests/m5-2.spec.ts:239-256` | **pass** — present, all `LOCALES` × `SCREENSHOT_VIEWPORTS` (1440/768/375), both `#top`/`#zonas` scopes |
| `tests/media.spec.ts` caption test exists and is order-independent (§2.2 of preflight) | Read `tests/media.spec.ts:59-94` | **pass** — present; compares `captions.sort()` to `expected[locale].sort()`, so the actual DOM order (Pillars r2 → Vehicles r5 → Security entrance → HubShowcase r4, per `LandingPage.astro:30-35`) does not falsely fail the test despite the comment on line 65 listing a different order — comment is cosmetically stale, not a test bug |
| Expected caption strings in the new test match `src/i18n/{es,en,ru}.ts` verbatim | `Grep` all 4 caption strings × 3 locale files | **pass** — exact match, all 12 strings |
| `LOCALES` (es/en/ru) and `VIEWPORTS`/`SCREENSHOT_VIEWPORTS` (incl. 375/768/1440) exist as the preflight assumes | Read `tests/locales.ts` | **pass** — `SCREENSHOT_VIEWPORTS` = [1440, 768, 375] exactly, `LOCALES` = [es, en, ru] |
| `package.json` scripts match the commands the preflight tells the dispatcher to run | Read `package.json` | **pass** — `test`→`playwright test`, `typecheck`→`astro check`, `build`→`astro build` |
| `r3` orphaned render (flagged in preflight §3 as a human decision, not a bug) | Not re-touched | unchanged — still a flag, not fixed, per the preflight's own instruction not to fix it without a decision |

**No regression was found with evidence.** The one discrepancy noticed (stale code-comment ordering vs. actual section order in `tests/media.spec.ts:65`) does not affect test correctness — the assertion itself is order-independent — so it was left alone rather than "fixed" without a reproducible failure behind it, per this task's instruction to fix only an *observed* regression.

## 2. Exact command matrix — pass / fail / not-run

Environment: no shell tool is available to this worker in this session (confirmed by the absence of a Bash/PowerShell tool and by `node_modules` not existing in this worktree). Every command below is therefore **not-run**, not fail — none of them were attempted. This is a tooling limitation of the worker, not a fresh finding; it is the same gap the dispatcher was already told it owed in `M8_PREFLIGHT.md` §0/§5.

| # | Command | Result |
|---|---|---|
| 1 | `yarn install` | not-run — no shell tool |
| 2 | `yarn astro check` | not-run — no shell tool |
| 3 | `yarn build` | not-run — no shell tool |
| 4 | `yarn test` (full Playwright suite, chromium/firefox/webkit) | not-run — no shell tool |
| 5 | `yarn playwright test --project=chromium` | not-run |
| 6 | `yarn playwright test --project=firefox` | not-run |
| 7 | `yarn playwright test --project=webkit` | not-run |
| 8 | `yarn playwright test tests/m5-2.spec.ts --grep "list stays inside the viewport"` | not-run |
| 9 | `yarn playwright test tests/links.spec.ts tests/survey.spec.ts tests/pilot.spec.ts tests/language-switcher.spec.ts tests/legal.spec.ts` | not-run |
| 10 | `yarn playwright test tests/interaction.spec.ts tests/m5-2.spec.ts --grep "keyboard\|Tab\|Escape\|Enter"` | not-run |
| 11 | Manual keyboard-only pass (header → hero zone selector → footer, 3 browsers) | not-run — no browser tool |
| 12 | `yarn playwright test tests/m5-2.spec.ts --grep "reduced motion"` | not-run |
| 13 | `yarn playwright test tests/media.spec.ts` | not-run |
| 14 | `yarn playwright test tests/structure.spec.ts tests/m5-2.spec.ts --grep "overflow"` | not-run |
| 15 | `yarn playwright test tests/console.spec.ts` | not-run |
| 16 | `yarn playwright test tests/a11y.spec.ts` | not-run |
| 17 | `yarn playwright test tests/screenshots.spec.ts --project=chromium` | not-run |
| 18 | Manual screen-reader pass (VoiceOver/NVDA) | not-run — no browser/AT tool, and explicitly out of scope for preflight per `M8_PREFLIGHT.md` §4.13 |
| 19 | Lighthouse (perf/SEO/a11y) | not-run — out of scope per `M8_PREFLIGHT.md` §4.13 |
| 20 | Visual-regression baseline capture | not-run — out of scope per `M8_PREFLIGHT.md` §4.13 |

## 3. Responsive matrix — 1440 / 768 / 375 × ES / EN / RU

Per the task's explicit instruction to record this distinctly. All 9 cells: **not-run** (no browser/shell tool this session). Static structural coverage for each cell already exists in `tests/structure.spec.ts` and `tests/m5-2.spec.ts` (confirmed present by read, §1 above) but has not been executed.

| Viewport | es | en | ru |
|---|---|---|---|
| 1440px | not-run | not-run | not-run |
| 768px | not-run | not-run | not-run |
| 375px | not-run | not-run | not-run |

## 4. Regression fix

None. No regression was observed with reproducible evidence in this session (§1). Per the task's instruction ("fix a small observed regression only if evidenced"), nothing was changed in `src/`. The one stale comment noted in §1 (`tests/media.spec.ts:65`) is a documentation nit, not a regression, and was left as-is to keep this checkpoint to file-reading only, as instructed.

## 5. Next unit

Identical to `M8_PREFLIGHT.md` §6: a session with actual shell + browser tool access must run `yarn install`, then the matrix in §2 above, and fill in real `pass` / `fail: <assertion + file:line + repro>` for each row and each of the 9 cells in §3. Nothing in this document should be read as those results — it is a re-confirmation that the exact commands and expected coverage are correctly specified and still current against source, not a run.
