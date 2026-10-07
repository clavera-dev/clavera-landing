# M5.2 Firefox reduced-motion fix

Base: cf9de13. The full `tests/m5-2.spec.ts` run on three browsers gave 69
passed, 2 skipped and 1 failed. The failure was in Firefox only:
`M5.2 reduced motion — no smooth scroll and no animation while the selector
is used`, line 294. `document.getAnimations()` returned 10 running
animations, where the test expects 0.

## Diagnosis

- `src/` has no `@keyframes` and no `element.animate()`. That means no
  CSSAnimation or script animation can exist, so all 10 must be
  CSSTransitions.
- `global.css` sets `transition-duration: 0.001ms !important` under
  `prefers-reduced-motion: reduce`. That is a positive duration, so every
  state change on an element with `transition` (the `.button` and
  `.link-arrow` colour, border, shadow and transform lists, the skip link,
  footer/FAQ/language links) still creates a real CSSTransition. Firefox
  reports these as `running` until its next refresh tick. The test reads
  them right after the last key press. Chromium and WebKit retired them
  before the read.
- Conclusion: this was transient bookkeeping, not visible persistent motion.
  Each transition lasts 1µs and ends at its final value. The guarantee was
  still weaker than the test states, though: the animations existed.

The exact 10 was not broken down per element. This session had no shell.
The test now names every running animation on failure (see below), so a
rerun will list them if any remain.

## Fix

`src/styles/global.css`, reduced-motion block: `0.001ms` → `0s` for
transition and animation durations, and `transition-delay` /
`animation-delay` are forced to `0s`. The CSS Transitions spec starts no
transition when the combined duration (duration + delay) is ≤ 0, so no
Animation object is created in any engine. The common 0.001ms idiom keeps
`transitionend`/`animationend` firing, but nothing in `src/` listens for
them, so nothing depends on that.

`scroll-behavior: auto` and `animation-iteration-count: 1` are unchanged.
ZoneSelector itself did not need changes.

## Test

The assertion is still as strict: zero running animations of any kind. It
now collects `transition:<property>` / `animation:<name>` with the duration
and target for each running animation. It asserts `toEqual([])` instead of
comparing a count, so any future failure names its source. No animation is
filtered out.

## Not verified here

This session had no shell. `astro check` and the Firefox test were not run.
Acceptance:

```
yarn astro check
yarn playwright test tests/m5-2.spec.ts --project=firefox -g "M5.2 reduced motion"
```

Port 4321 must be free. The config rebuilds and never reuses an existing
server, so each run serves a fresh preview. A full three-browser rerun of
`m5-2.spec.ts` is also advisable, since the CSS change applies to every
engine.

Manual visual check remaining: with OS "reduce motion" on, hover and focus
the buttons and links, and use the zone selector. States should switch
instantly, with no fade. Without reduced motion, transitions should be
unchanged.
