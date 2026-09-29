# M5.2 — orchestrator verification evidence

Date: 2026-09-29. Status: **local verification record, not a design decision.** This is a write-up of commands the orchestrator actually ran after the typecheck fix (`M8_TYPECHECK_FIX.md`), plus one open follow-up. It does not resolve D4 or R-6/R-6b (§3). No source, test, legal copy, asset or config file was changed to produce this document.

## 1. What was run and its result

| Command | Result |
|---|---|
| `yarn astro check` | 0 errors (after the `tests/m5-2.spec.ts` typecheck fix landed — see `M8_TYPECHECK_FIX.md`) |
| `yarn build` | Succeeded; 12 routes built |
| `yarn playwright test tests/m5-2.spec.ts --project=chromium` | Passed (Chromium-only acceptance run) |
| `yarn playwright test tests/m5-2.spec.ts` (all three projects: Chromium, Firefox, WebKit) | **69 passed, 2 skipped, 1 failed** |

The single failure:

- Test: `M5.2 reduced motion — no smooth scroll and no animation while the selector is used`, line 294.
- Browser: **Firefox only** (Chromium and WebKit passed the same assertion).
- Assertion: expected 0 running animations after reduced-motion interaction with the selector; Firefox reported **10**.

## 2. Source of these numbers and its limits

These counts are stated facts handed to this task, matching the raw run log at `/Users/k/Documents/Codex/2026-09-27/clovera-jev-anna-20-100-cloud/work/clavera-m5-all-browsers.txt` on the orchestrator's machine. **That path is outside this worktree and this session's restricted file tools could not open it** — it was not re-read or independently inspected here. Everything in §1 is taken as given from the task brief, not confirmed by direct inspection of the log in this session.

This is distinct from the **workers' own claims** in the prior docs, which should not be mistaken for verification:

- `M5_2_RESULT.md` (the worker that wrote SEL-1 and the H-1 prototypes): explicitly "code and tests written; nothing run by the worker" — no shell, no browser, no `yarn` in that session. All numbers there are marked `[calc]`.
- `M8_TYPECHECK_FIX.md` (the worker that fixed the two typecheck diagnostics): also had no shell access; the fix was reasoned from Playwright's types and the DOM source, not verified by re-running `astro check`.
- `M5_2_FIREFOX_MOTION_FIX.md` (the worker that diagnosed the Firefox failure and wrote the fix, commit `da3929d` "Fix reduced motion transitions in Firefox"): also had no shell; it changed `global.css`'s reduced-motion block from `transition-duration: 0.001ms` to `0s` (positive-vs-zero duration is what stops Firefox from creating a `CSSTransition` object) and left the diagnostic in the test so future failures name their source.

So: §1's pass/fail counts are the first actual run of this suite across all three browsers reported in this chain. The Firefox fix in `da3929d` was written in response to that failure but — per the facts given for this task — **no fresh three-browser run confirming the fix resolves the failure is recorded here.** That re-run is the natural next verification step, not yet done.

## 3. Unresolved decisions (listed, not chosen)

Two owner/designer decisions are open and out of scope for this document to resolve:

- **D4** — short-phone hero: variant A (image as absolute backdrop behind header/disclosure/eyebrow/H1) or variant B (band, unchanged size, repositioned `object-position` and fade). Both are prepared as inert prototypes (`tests/prototypes/hero-h1.css`, unshipped, unreachable from any built route) with per-locale contrast/fold numbers left for a human read; see `M5_2_RESULT.md` §2 and `OWNER_DECISIONS_OPEN.md` row D4.
- **R-6 / R-6b** — the raised/base surface alternation (R-6a) introduced across S10–S13: keep as-is, or move to `--bg-elevated` (R-6b) if it reads too faint; a related open question is whether S13 should also move to a raised surface if it detaches visually as the coda. Needs full-page ES/EN/RU captures at 375/768/1440 before/after; see `M5_NEXT_RESULT.md` §5 and `OWNER_DECISIONS_OPEN.md` rows R-6b / S13-coda.

Neither is decided by this evidence pack. Both require a designer/owner call, and R-6 additionally needs the capture set described above.

## 4. Not covered here

- No screenshots were taken or reviewed in this task.
- No CLS measurement (owed per `M5_2_RESULT.md` §5 item 1) was produced.
- H-2 (desktop hero judgement at 1280×720/1440×800) was not reviewed.
- D7 (empty-state selector copy) remains unresolved and out of scope.

## 5. Re-run after da3929d

This session had no shell either. §5 is a static review of the `da3929d` fix, not a re-run of the failing test.

**Reviewed:** every `transition`, `animation`, `@keyframes`, `scroll-behavior` and `.animate()`/`requestAnimationFrame` use in `src/`, including scoped `<style>` blocks in `.astro` components (`FaqSection.astro:75,109`, `TypeformBoundary.astro:138`, `LanguageSwitcher.astro:83`, `Footer.astro:272`, plus `global.css:331,512,584`). No `@keyframes` or script-driven `.animate()`/`requestAnimationFrame` exist anywhere in `src/`, so all running animations the Firefox test could see are CSS transitions. `global.css:140-151`'s `prefers-reduced-motion: reduce` block matches `*, *::before, *::after` and sets `transition-duration`/`transition-delay`/`animation-duration`/`animation-delay` to `0s !important`. None of the component-level `transition:` declarations use `!important`, and Astro's scoped-style specificity boost (`data-astro-cid-*`) cannot outrank an `!important` declaration, so every transition found is covered regardless of selector scope.

**Changed:** nothing. The static review found no gap in `da3929d`'s coverage — the fix is complete as written.

**Commands actually run by this session:** none (no shell available).

**Still owed:** the three commands from `M5_2_FIREFOX_MOTION_FIX.md` §"Not verified here" — `yarn astro check`, `yarn build`, `yarn playwright test tests/m5-2.spec.ts` (all three browsers) — plus the manual reduced-motion visual check. The orchestrator runs these after this task; their pass/skip/fail counts are not yet recorded anywhere and must not be assumed to match §1.
