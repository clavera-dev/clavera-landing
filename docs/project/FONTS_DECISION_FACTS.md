# Fonts — facts for the owner's decision (plan C10, 2026-10-06)

Brief §9.2 asks for **at most 2 font files, self-hosted, `font-display: swap`**. The approved design system (and the Figma file, which matches it) uses three Google Fonts families from the CDN: Plus Jakarta Sans (display, headings), Onest (body, UI) and IBM Plex Mono (codes, labels). `docs/design-system/tokens/fonts.css` loads them with one `@import` from `fonts.googleapis.com`; `display=swap` is set.

## Measured on the local build

From `tests/perf-budget.spec.ts`, Chromium, 375×667, 2026-10-06:

| Page | Font files downloaded | Requests to Google Fonts |
| --- | --- | --- |
| ES | 7 | 8 |
| EN | 7 | 8 |
| RU | 10 | 11 |

## Coverage finding: Russian headings do not use Plus Jakarta Sans

Google's CSS for Plus Jakarta Sans offers `latin`, `latin-ext`, `vietnamese` and `cyrillic-ext` subsets. `cyrillic-ext` covers U+0460–052F, **not** the basic Russian alphabet U+0400–045F. Checked against fonts.googleapis.com, 2026-10-06. Onest and IBM Plex Mono do ship the basic `cyrillic` subset.

So every display and heading line on `/ru/` renders in the fallback stack `'Helvetica Neue', Arial, sans-serif`, not in the brand display face. That is visible in the RU screenshots. ES and EN are unaffected.

## Options

| | Self-host, 2 files (brief) | Keep the CDN |
| --- | --- | --- |
| Files | Plus Jakarta Sans variable (Latin) + Onest variable (Latin + Cyrillic), woff2, subset | 3 families, 7–10 files |
| IBM Plex Mono | Dropped. Mono labels use Onest with tabular figures, or the system `ui-monospace` stack | Kept |
| RU headings | Decide: Onest for RU display, or keep the Helvetica/Arial fallback | Same question |
| Legal | Google is no longer contacted; nothing to add to `/privacidad` | Google Fonts becomes a processor; `/privacidad` does not list it today, so the lawyer should confirm |
| Work | Download the two OFL files into `public/fonts/`, replace the `@import`, run the visual checks in 3 locales | None |

Recommendation (not a decision): self-host the two files. Use Onest for RU display, so Russian headings get a designed face instead of Arial. Replace Plex Mono with Onest tabular figures. This meets §9.2 and removes a third-party request. It is a brand-type change, so the designer should see the RU result first.

Owner input needed: choose self-host or CDN, choose the RU display face, and accept dropping Plex Mono.
