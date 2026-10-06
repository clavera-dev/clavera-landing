# CLAVERA Figma design system: token integration (2026-10-06)

Status: **token layer integrated on branch `agent/clavera-ds-integration-20261006`; zero rendered change; component-level differences listed for owner/designer decision.** Not an accepted-head update, not published.

## Source and method

- File: [Clavera DS](https://www.figma.com/design/EgsFk8V4OWGv0i6oitDVgM/Clavera-DS), read 2026-10-06 in the owner's logged-in browser (Free plan).
- Read-only through the Figma web UI: the Variables table (all five collections, both Semantic modes), the Styles panel and each style's Edit dialog (text styles and every drop-shadow layer of every effect style), and the Button page's Tokens table. No Figma MCP, REST API, plugin, export, purchase or edit of the file.
- Snapshot committed as `docs/design-system/tokens/figma/clavera-ds-2026-10-06.json`. Counts match Figma's own totals: Primitives 108, Semantic 87, Radius 7, Spacing 23, Motion 7; 21 text styles; 8 effect styles.

## Result of the exact comparison

| Area | Figma vs accepted CSS (`docs/design-system/tokens/*.css`) |
| --- | --- |
| Color primitives (graphite, concrete, amber 200–700, steel 300/500/600, wood, moss 500/600, rust 500/600, white, black) | Identical hex after converting the CSS OKLCH values to sRGB, except `amber-700`: CSS `oklch(52% 0.14 55)` renders `#A34D00`, Figma `#9F5100` (ΔE_ok 1.1, not visible; contrast on paper 5.24 vs 5.19:1). `amber-600` differs by rounding only. |
| Typography (21 styles: family, weight, size, line height, tracking) | Identical for every style the CSS defines. Figma adds `label/button-md` and `label/button-sm`. |
| Effects (e1, e2, e3, paper-e1, paper-e2, glow accent, glow accent-lg, focus ring) | Identical layer by layer (offset, blur, spread, color, opacity). |
| Radius, spacing, motion | Identical. Figma adds `radius/dialog` 32, `space/7` 28, icon/control/stroke sizes. |
| Wordmark | `brand/orange #F58800` equals the fill already used in `public/brand/logo.svg`. |

So the Figma file is the same system as the accepted CSS, extended. Nothing in the accepted tokens had to change.

## What was integrated

1. `docs/design-system/tokens/figma.css` (imported by `src/styles/global.css` after the other token files): Figma-only primitives (amber 50/100/800, steel 50/100/400, moss 50/100/400, rust 50/100/400, brand orange), the 24 alpha primitives, `--space-7`, size tokens, `--radius-dialog`, font-weight tokens, button label tokens, and Figma's semantic layer in Dark mode under its own names (`--bg-*`, `--overlay-*`, `--border-*`, `--text-*`, `--icon-*`, `--brand-logo-*`). Names that already existed with the same value were not redefined.
2. `src/styles/global.css` `.surface-paper`: Figma's Light mode for those new semantic tokens, because the site's paper register is its light surface. Icon aliases are redeclared there so they follow the paper text tokens.
3. No component, layout, copy, image slot, test or protected file changed.

## Verification

- `git diff --check`, `yarn astro check` (0 errors, 0 warnings, 0 hints), `yarn build` (12 pages) all pass.
- Full-page Chromium screenshots of all 12 built pages (ES/EN/RU home, cookies, privacidad, terminos) at 375, 768 and 1440 px, before vs after: **36/36 byte-identical**.
- Computed-style probe: `--bg-accent-subtle` resolves on `:root`; inside `.surface-paper`, `--icon-primary` resolves to the dark paper text, `--text-accent` to amber-700 and `--bg-neutral` to concrete-100.
- The Playwright suite was not rerun: rendered output is byte-identical, so its results cannot change.

## Open decisions (owner / designer)

Each item is a visible change to an existing component, not a layout change. Recommendation in bold. **Applied 2026-10-06 (second commit on this branch):** D1, D2, D3, D5, D6, D7 as recommended, at the coordinator's request while the owner was away ("take your recommendation"); D4, D8, D9 kept as they were. Reversible by reverting that one commit.

| # | Figma says | Site does now | Effect if adopted | Recommendation |
| --- | --- | --- | --- | --- |
| D1 | `text/on-paper-secondary` = graphite/600 (#4F4D49, 7.61:1 on paper) | `--text-on-paper-secondary` = concrete-700 (6.42:1) | Secondary text on paper sections becomes a little darker | **Adopt** (more contrast, matches designer) |
| D2 | `text/on-paper-tertiary` = concrete/700 | Token = concrete-500 (3.56:1, fails AA), but the paper register already substitutes concrete-700 | None visible; token value would match practice | **Adopt** together with D1 |
| D3 | Subtle fills at 16% (`bg/accent-subtle`, success/critical/info/warning-subtle) | `--accent-subtle` and `--status-*-subtle` at 14% (used in the comparison table highlight) | Highlight 2 points stronger | **Adopt** |
| D4 | Paper borders 8% / 16% (`border/paper-subtle`, `paper-neutral`) | `--border-on-paper` 10%, `-strong` 18% | Hairlines on paper sections slightly lighter | Designer to confirm; **keep current** until then |
| D5 | Button padding sm 8×16, md 12×20, lg 16×28; icon gap 8 | md 12×24, lg 16×32, gap 12 | Buttons 8 px narrower; RU CTA wrapping must be rechecked at 375 px | **Adopt** after ES/EN/RU check |
| D6 | Primary hover = `glow/accent` (3 px amber ring); README says the same | Hover uses `--shadow-glow-accent-lg` (40 px ambient glow) | Hover glow becomes a tight ring | **Adopt** (two sources agree) |
| D7 | Button label = `label/button-md` (600, tracking 0.01em) | label-lg tracking 0.005em, weight 600 | Imperceptible tracking change | **Adopt** with D5 |
| D8 | Ghost hover fill `bg/elevated`, pressed `bg/neutral`; stroke `border/neutral` | Ghost hover recolors text and border to accent, no fill | Different hover feel on secondary CTAs | Designer to confirm which ghost/outline variant the site uses |
| D9 | `amber-700` = #9F5100 | Renders #A34D00 | Not visible | **Keep CSS** |

Not compared yet: the Inputs, Selection controls, Card, Badge & Tag, Tabs, Dialog and Feedback pages, the Iconography page, and the per-component Usage text beyond Button. The site uses only a small subset (buttons, the zone selector input, FAQ disclosure). Measured WCAG contrast is recorded above only where it decides a token.

## Agent prompt template (English)

When implementing a component from this system: name the Figma page and component, the tokens it uses from `tokens/figma.css` or the base token files, the theme register (dark default or `.surface-paper` = Figma Light), and the viewport/locale set to check. Use only tokens that exist in these files; report any missing value instead of inventing one. Quote the relevant Usage rule if the component has one. Do not change layout, image slots or copy under a design-system task.

## Applied decisions — verification (2026-10-06)

- `git diff --check`, `yarn astro check` 0/0/0, `yarn build` pass.
- Buttons measured in ES/EN/RU at 320, 375, 768 and 1440 px before/after: every button 6–11 px narrower, no button clipped, no new page overflow, one ES survey button at 320 px now fits one line instead of two. RU at 320 px already had page-level horizontal overflow before this change (below the 375 px minimum the brief requires); unchanged.
- Full Playwright suite (3 engines): 1333 passed, 92 skipped, 15 failed. The 15 failures (`survey.spec.ts:88` expects more than 4 fragment links; `m5-2-hero-prototypes.spec.ts:135` desktop clip) fail identically on accepted head `fce39c6` and are not caused by these changes.
