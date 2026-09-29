# M5.1 result — type conformance, first slice

Date: 2026-09-29. Baseline for comparison: tag `baseline/clavera-before-m5-2026-09-29` (same website code as `4aa30b7`).
Source: `M4_REFERENCE_COMPOSITION_SPEC.md` §5 T1 and §13 M5.1; `M4_FULLPAGE_AUDIT.md` O-11 and O-19.

## Scope

| Item | Status |
|---|---|
| T1 — S2 statement uses `--fluid-display`, max 72 px (default; owner delegation) | Done |
| T2 — mono uppercase scope | **Deferred**: `.mono` stays as built |
| Raw `ZoneSelector` shadow → token | Done (scoped token, identical value) |
| A/B option (S2 capped at 56 px) | Not implemented; still open for the visual check |

No changes were made to images, legal text, claims, the Typeform destination, zone data, payment behaviour or any other section.

## Changed files

- `src/components/sections/ProblemSection.astro` — removed the `.problem__statement` override inside `@media (min-width: 900px)`. The `max-width: 22ch` in that block was a duplicate of the base rule, so removing it has no effect.
- `src/components/lead-form/ZoneSelector.astro` — defined `--zone-selector-shadow-popover` on `.zone-selector` and used it in `.zone-selector__list`.
- `PROJECT_DECISIONS.md` — added the "Limited typography delegation" subsection under Design authority.
- `docs/project/M5_1_RESULT.md` — this file.

## Before / after CSS

**S2 `.problem__statement` font-size**

| Viewport | Before | After |
|---|---|---|
| < 900 px | `var(--fluid-display)` = `clamp(44px, 4.2vw + 1rem, 72px)` | unchanged |
| ≥ 900 px | `clamp(var(--text-display-xl-size) /*56px*/, 5.2vw + 1rem, 84px)` | `var(--fluid-display)` (the override was removed) |

Calculated sizes, not measured in a browser:

| Width | Before | After |
|---|---|---|
| 375 | 44 px | 44 px |
| 768 | ≈48.3 px | ≈48.3 px |
| 899 | ≈53.8 px | ≈53.8 px |
| 900 | ≈62.8 px (a +9 px jump) | ≈53.8 px (no jump) |
| 1280 | ≈82.6 px | ≈69.8 px |
| 1440 | 84 px | 72 px |

Line-height (1.04), tracking, weight, colour and `max-width: 22ch` are unchanged. Because `max-width` is in `ch` of the element's own font, the text box narrows along with the type: at 1440 it goes from ≈22ch at 84 px to ≈22ch at 72 px, which is about 14% narrower in pixels.

**ZoneSelector list shadow**

- Before: `box-shadow: 0 12px 24px rgb(0 0 0 / 18%);`
- After: `box-shadow: var(--zone-selector-shadow-popover);` with `--zone-selector-shadow-popover: 0 12px 24px rgb(0 0 0 / 18%);` on `.zone-selector`, which is the ancestor of the list.
- No existing token matches this value. The closest ones are `--shadow-e2` (`0 12px 32px -8px … / 0.55` plus a hairline ring) and `--shadow-e3`, and both would change how it looks. `.surface-paper` also remaps `--shadow-e2`. A scoped token with the identical value keeps the rendered output the same.

## Expected visual effects (not yet verified)

- At S2, ≥900 px: the statement is smaller (84 → 72 at ≥1440, and about 13 px smaller at 1280). Line breaks may shift because of `text-wrap: balance` and the narrower `22ch` box. S2 then matches the hero H1 maximum of 72 px, so the hero is no longer outsized by S2.
- The 900 px size step is gone.
- Below 900 px there should be no change.
- ZoneSelector dropdown: there should be no pixel change.

## Tests

No shell was available in this session, so **no build, lint or test was run, and no commit was made**. To run:

```
npm run build   # astro build
npm test        # playwright test
git add src/components/sections/ProblemSection.astro src/components/lead-form/ZoneSelector.astro PROJECT_DECISIONS.md docs/project/M5_1_RESULT.md
git commit -m "M5.1: S2 statement uses --fluid-display (72px max); tokenise ZoneSelector popover shadow"
```

A repository search found no test or source file that references the removed `84px` / `5.2vw` values or the raw shadow string.

## Visual comparison — still to be run

No browser was available, so no "after" screenshots exist. The existing baseline PNGs (`docs/project/M4_FULLPAGE_EVIDENCE/*.png`, `M4_BASELINE_CONTACT.png`) were **not** compared against a new render. Nothing here claims a visual improvement.

Still to do: render S2 at 1440 / 1280 / 900 / 899 / 768 / 375 in ES / EN / RU and compare with the tag baseline. Open the ZoneSelector dropdown once to confirm the shadow is identical.

## Needs a human eye

1. **S2 hierarchy**: now 72 px, the same as the hero H1. Is that acceptable, or should the A/B option (cap at 56 px, `--fluid-display-sm`-style) be taken so the hero stays the only 72 px moment? This is D2 in the spec.
2. **S2 line breaks** at 1280–1440 in RU (longest words) after the smaller `22ch` box. Check for orphans or awkward balance.
3. T2 is still open (designer acknowledgement, D3).

## Next unit

M5.1 remainder: T2 if the designer acknowledges it, and the optional S2 A/B check. Then M5.2 (Hero).
