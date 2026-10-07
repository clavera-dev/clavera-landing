# M4 baseline visual audit — S4–S11, RU font coverage, hero density

Date: 2026-09-29. Continuation of the M4 local-evidence queue after `M4_EVIDENCE.md` (M4.1) and `M4_FULLPAGE_REVIEW.md` (M4.3, which visually reviewed only 2 of the 9 archived full-page captures: `es-desktop.png` and `ru-short-phone.png`). No source, copy, token or legal file was read for editing purposes and none was changed. No dependency install, no build, no publication, no purchase.

**This is not visual acceptance, not legal approval, and not a new screenshot pass.** It is a bounded continuation with a materially narrower tool set than earlier M4 sessions had (see §0).

## 0. Session constraints — read this first

This session's tools are `Read`, `Edit`, `Write`, `Glob`, `Grep`, `WebFetch`, `WebSearch` — **no shell/Bash tool and no browser-automation tool**. Two consequences, stated plainly:

1. **The archived screenshots are not reachable from here.** `M4_EVIDENCE.md` and `M4_BASELINE_SNAPSHOT.md` both state the 9 full-page captures live in `CLAVERA_before_M4_2026-09-29.zip`, "in the papka results Codex" / "in the local results folder" — outside this repository. `Glob` on any path outside the current worktree (e.g. `/Users/k/**/CLAVERA_before_M4*`) returns a hard restriction error: *"is outside … --restricted confines the file tools to the working directory."* I could not open the archive, and therefore could not extend `M4_FULLPAGE_REVIEW.md`'s two-capture visual pass to the remaining seven captures, or to S4/S9 at all (see §4). This is the same underlying archive the M4.3 session used; whatever gave that session access is not available here.
2. **No new browser rendering was possible.** There is no way in this session to start a dev server, run Playwright, or open a live page. Every claim below that is not sourced from an existing document is sourced from **reading source files** (Astro components and their scoped CSS) — labelled `[code]`/`[calc]` in the existing spec's convention — not from a rendered view. Nothing here should be read as a visual confirmation.

Given that, this pass does three things instead: (a) records that the screenshots are inaccessible here rather than silently reusing the two-capture review as if it covered S4–S11; (b) attempts one real, free, unauthenticated network check for the RU font-coverage question (§2) and reports its actual — inconclusive — result rather than a guess; (c) re-derives the S4–S11 facts directly from the current section source files to catch any drift from `M4_REFERENCE_COMPOSITION_SPEC.md`'s summary and to surface a couple of code facts that summary does not mention (§4).

## 1. What already exists (unchanged by this session)

| Document | Covers |
|---|---|
| `M4_EVIDENCE.md` | O-item evidence table; DOM measurements (CTA-vs-fold, H1 height) in ES/EN/RU at 375×667, 1280×720, 1440×800; confirms the 9-capture archive exists but had not been visually audited |
| `M4_FULLPAGE_REVIEW.md` | First visual read of exactly **2 of 9** archived captures: `es-desktop.png` (1440×800) and `ru-short-phone.png` (375×667). Covers O-01, O-05, O-06, O-07, O-08, O-09, O-10 from those two views only |
| `M4_REFERENCE_COMPOSITION_SPEC.md` | Code-derived (`[code]`/`[calc]`) composition rules and proposals for every section, including S4–S11; not visually verified |
| `M4_PUBLIC_REFERENCES_2026-09-29.md`, `M4_P1_P2_REFERENCE_NOTES.md`, `M4_REFERENCE_GAPS_P5_P11.md` | Public-reference research (content/order only), out of this task's scope |

This session adds no new screenshot review beyond what `M4_FULLPAGE_REVIEW.md` already recorded. Everything in §4 is a source-code re-check, explicitly not a visual one.

## 2. RU font coverage (O-13) — attempted, still unresolved

The open question: does the served `Plus Jakarta Sans` (the display/heading face) actually include Cyrillic glyphs, or does Chromium silently fall back to a system font for RU headings? `src/layouts/BaseLayout.astro` loads fonts via a single `@import` from Google Fonts' CSS2 endpoint (CDN-linked, not self-hosted — the existing O-12 conflict):

```
https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Onest:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap
```

Google's CSS2 endpoint normally splits each family into per-script `@font-face` blocks (each preceded by a `/* cyrillic */`, `/* latin */`, etc. comment and a `unicode-range`), which would answer the question directly and for free. I fetched that exact URL with `WebFetch` to check.

**Result: inconclusive, and worth recording why.** The response contained one `@font-face` block per requested weight/style (13 total) with **no preceding subset comments and no `unicode-range` properties at all**. This is the legacy/reduced response Google's font service serves to clients whose request does not look like a modern browser (this tool cannot set a browser `User-Agent` header); it says nothing about which scripts the returned files cover, in either direction. **This attempt does not confirm or rule out Cyrillic coverage** — it only confirms that a free, unauthenticated check of this specific kind cannot be completed with the tools available in this session.

O-13 therefore stands exactly as `M4_EVIDENCE.md` and the composition spec (§5 T4) left it: **open**, and still resolvable only by one of:
- a real browser's computed-style/`document.fonts.check()` read on a live RU heading (needs a browser, not available here), or
- fetching the same URL with a real browser `User-Agent` (a session with a shell/`curl`-with-headers or browser tool could do this in minutes; no purchase involved), or
- owner/designer confirmation of which font file is actually used for Cyrillic.

No line-count or type-scale judgement anywhere in the composition spec should be treated as font-verified until one of these happens (spec §11 rule 6, already correctly caveated).

## 3. Hero density (O-01, O-02, H-1, H-2) — no new measurement, restated for continuity

No browser was available in this session, so no new CTA-vs-fold or contrast number was produced. The figures already on record stand unchanged:

- **Short-phone band (O-01/H-1):** at ≤599×≤700, `Hero.astro`'s own code comment documents the band was iteratively trimmed from an original 267 px (plus a 56 px disclosure line) after measuring the Russian primary action at y=729, then y=790, then y=684 — all below the 667 px fold — down to the current `17svh`, min 112 / max 160 px. `M4_EVIDENCE.md` records the resulting RU action bottom at 644 px (23 px of clearance). This is consistent history, not a new measurement, and the code comment itself is evidence that "does it actually clear the fold" has already failed twice before landing on the current values — i.e. the margin is thin by the team's own record, not just by outside audit. The **design judgement** (does the ≈49 px of visible image below the header read as an establishing shot, per H-1 options A/B) remains open and requires a screenshot or live render neither of which this session can produce.
- **Desktop fold (O-02/H-2):** unchanged from `M4_EVIDENCE.md` — CTA bottom clears the sampled fold in all six locale/viewport combinations, tightest at RU 1280×720 (5 px spare). No new number to add.
- **Triple scrim (O-03):** `Hero.astro`'s CSS confirms two literal gradient layers on mobile and three on desktop (lateral, top, bottom-to-transparent), each with a code comment stating its purpose (separating the headline from the render's own visible wordmark). This is now a **confirmed code fact** (previously only "seen" in a screenshot); whether it *reads* as intentional rather than muddy is still a by-eye judgement this session cannot make.

Nothing here changes any default in composition spec §15.

## 4. S4–S11 — section-by-section code re-check

Mapping confirmed directly from `LandingPage.astro` import order and each section's `id`:

| Composition-spec label | Component | DOM `id` |
|---|---|---|
| S4 Cómo funciona | `HowItWorksSection.astro` | `works` |
| S5 Vehículos | `VehiclesSection.astro` | `vehiculos` |
| S6 Seguridad | `SecuritySection.astro` | `seguridad` (+ `entrance` figure) |
| S7 Comparación | `ComparisonSection.astro` | `comparacion` |
| S8 Hub | `HubShowcaseSection.astro` | `hub` |
| S9 Casos | `ForWhomSection.astro` | `casos` |
| S10 Zonas | `ZonesSection.astro` | `zonas` |
| S11 Sumate al piloto | `FoundersSection.astro` | `fundadores` (anchor kept from the old "Socios Fundadores" name per its own code comment; content is confirmed to be the "Sumate al piloto" replacement, not a mismatch) |

**Visual coverage status per section, against the 9-capture archive (all inaccessible here):**

| Section | Visually reviewed so far (`M4_FULLPAGE_REVIEW.md`) | Locales/viewports still unreviewed |
|---|---|---|
| S4 Cómo funciona | **None.** Not mentioned in the M4.3 pass at all. | All 9 |
| S5 Vehículos | O-08 (R5 crop), ES desktop + RU short-phone only | ES/EN/RU × 1280×720; EN desktop; EN/ES short-phone |
| S6 Seguridad | O-06 (entrance overlap), same 2 views | Same 7 remaining |
| S7 Comparación | O-09 (mobile discoverability), same 2 views | Same 7 remaining |
| S8 Hub | O-10 (plan/legend), same 2 views | Same 7 remaining |
| S9 Casos | **None.** Not mentioned in the M4.3 pass at all. | All 9 |
| S10 Zonas | O-05 (rhythm, jointly with S11), same 2 views | Same 7 remaining |
| S11 Sumate al piloto | O-05, same 2 views | Same 7 remaining |

**S4 and S9 have had zero visual review from any archived capture, in any locale or viewport, as of this document.** This is a gap this session cannot close (§0) and should be the first thing a session with archive access does next.

**Code-derived facts** (re-read directly from each file; `[code]`/`[calc]`, not visual):

- **S4 `works`** — three-step index. Single column below 800 px; `repeat(3, 1fr)` grid at ≥800 px. Each step has a 2 px amber "tick" (`::before`) at the top-left of its hairline border, described in-code as "the way stations are marked on a drawing." No image in this section. Confirms the spec's "3-step rail" description exactly; no drift.
- **S5 `vehiculos`** — R5 full-bleed band, `--figure-ratio: 16/10` under 900 px, `2.35/1` at ≥900 px, `object-position: 50% 55%`, matching the spec's crop table. The vehicle list is a single wrapped `mid-dot`-separated line ≥700 px, stacked with dots removed <700 px (`@media (max-width: 699px)`), capped at `32ch` only ≥900 px (no cap below that, so it wraps at column width). No drift from the spec.
- **S6 `seguridad`** — confirms the portrait (`id="entrance"`) is pulled up over the section boundary only at ≥900 px, via `margin-top: calc(var(--rhythm) * -1 - var(--space-16))` — a literal negative-margin overlap, not an illusion of one. Below 900 px the portrait sits in normal flow after the text (`grid-template-columns: 1fr`), so there is **no overlap at all on any narrower tablet/phone width** — the "may not read" question (O-06) is desktop-only by construction, which the spec states but is worth confirming exists in code, not just in the two reviewed captures.
- **S7 `comparacion`** — `.comparison { min-width: 660px }` inside a scrollable `.table-wrap`; 4 total columns (row header + 3, third being CLAVERA's, `i === 2`). **Code fact not previously called out explicitly: a visible scroll-hint paragraph (`.comparison__hint`, `aria-hidden="true"`, mono, accent-coloured) is unconditionally rendered below the table at ≤759 px.** This sits in tension with `M4_FULLPAGE_REVIEW.md`'s finding that "the screenshot provides no obvious horizontal-scroll instruction in the visible table header" — the hint does exist in code, but it renders *below* the table (not in the header), and that review may simply not have scrolled to or focused on that specific line in the RU short-phone capture. This is not a contradiction resolved by code alone: it needs an actual look at whether the rendered hint is prominent enough, which needs the archive or a browser, neither available here. Recorded as a specific, narrow follow-up rather than leaving O-09 as one undifferentiated "still inferred."
- **S8 `hub`** — `.hub__plan` is single-column <900 px (drawing above the legend list, both inside the same paper sheet), `minmax(0,1fr) minmax(0,0.42fr)` at ≥900 px. `.hub__wide` (R4) is 64 % width, right-aligned, only at ≥900 px; 100 % width below that. Matches the spec table exactly.
- **S9 `casos`** — single column <900 px; `minmax(0,0.85fr) minmax(0,1fr)` at ≥900 px. **One code fact absent from the composition spec entirely: `.casos__head` is `position: sticky; top: calc(var(--header-h) + var(--space-8))` at ≥900 px.** The heading/eyebrow column stays pinned while the five statements scroll past it in the right column. This is a real scroll-tied layout behaviour, not JS-driven motion, so it does not contradict O-18's "no motion beyond hover/press" (a grep for animation/transition/JS motion, not for `position: sticky`), but it is a rhythm/behaviour decision the composition spec's §7 and §10 tables do not mention at all and that has never been visually reviewed (S9 has zero coverage, above). Worth a designer's explicit look, since sticky headings can read as a bug on a page that otherwise has no scroll-linked effects.
- **S10 `zonas`** — confirmed genuinely minimal: `ZoneSelector` plus one `<p class="caption">` disclaimer, no image, no list, no other content. This is a direct code confirmation of O-05's "near-empty S10" (previously "seen" in one screenshot; now also a structural fact independent of any screenshot).
- **S11 `fundadores`** — confirmed as the "Sumate al piloto" section by its own code comment (not a naming mismatch). `surface="raised"` and `accent` (the page's one amber top-rule) are both set on this `<Section>`, consistent with the spec's R-5. Primary/secondary button configuration is conditional on `getPilotDestination(...)`; since that destination is "not yet delivered" per the same comment, the pilot CTA is presumably not currently rendered as primary in any locale — this is a content/config fact, not new evidence for O-05's "raised-raised-amber-rule" adjacency, which stands as recorded.

None of the above required or produced a code change.

## 5. Cross-check against the task's four evidence targets

1. **Archived baseline screenshots** — looked for; confirmed to exist per prior docs but **not reachable by this session's tools** (§0). Stated plainly, not worked around.
2. **S4–S11 audit at the recorded viewports** — not possible visually (no archive, no browser). Delivered instead: a full code re-check of all eight sections (§4), which confirms the composition spec's summary is accurate for S4, S5, S6, S8, S10, S11, and surfaces two things the spec's summary omitted (the S7 scroll-hint's existence and exact placement; the S9 sticky heading).
3. **RU font coverage** — one real, free network check attempted; result is honestly reported as inconclusive, with the concrete reason (§2).
4. **Hero-density open items** — no new measurement possible; existing numbers restated for continuity, plus one newly-confirmed code fact (the mobile band's iterative-trim history is documented in the component's own comments, and the triple scrim is now a confirmed code fact rather than only a screenshot impression) (§3).

## 6. Bounded decisions/follow-ups for the owner

Nothing here is a new decision beyond composition-spec §15 (D1–D8); this section only adds what this pass specifically surfaced:

- **F1 — S7 scroll hint.** Decide whether `.comparison__hint`'s current placement (below the table, small mono accent text, `aria-hidden`) is prominent enough once someone can actually look at the RU/ES/EN short-phone captures, or whether it needs to move above the table or gain stronger styling. Needs the archive or a browser; not decidable from code alone.
- **F2 — S9 sticky heading.** Confirm whether the `.casos__head` sticky behaviour (≥900 px) is an intentional design decision or a leftover; it is currently undocumented in the composition spec and has never been visually reviewed. If unintentional, removing `position: sticky` is a one-line, layout-only change (not proposed here, just flagged).
- **F3 — RU font coverage (restates O-13/D5).** No progress possible without either a browser session or an owner-supplied answer. Flagging again because it blocks every RU line-count judgement in the composition spec, and because this session's one attempt to resolve it for free was inconclusive rather than silently skipped.
- **F4 — Archive access.** Whoever picks up the next M4 evidence item needs either (a) a session whose tools can reach the archive's actual location, or (b) the archive copied into this repository/worktree (a plain file copy, not a publish/push), or (c) fresh captures taken in a session with a real browser tool. Until one of these happens, S4 and S9 remain **completely unreviewed visually**, and S5–S8/S10–S11 remain reviewed for exactly one locale/viewport pair each out of nine.

## 7. Explicitly out of scope / not done here

- No M5 implementation, no composition-spec approval, no legal-copy change.
- No screenshot capture, no dependency install, no build, no publish, no push.
- No paid API call or new subscription; the one network call in §2 is a free, unauthenticated fetch of a public stylesheet.
- No visual review of S4 or S9 in any locale/viewport (archive inaccessible).
- No resolution of O-13, O-09's full discoverability question, or the S9 sticky-heading question — all three need either the archive, a browser, or an owner decision, none of which this session had.
