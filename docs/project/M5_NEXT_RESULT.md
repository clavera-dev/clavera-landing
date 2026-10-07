# M5 next — result (R-6 (a): tail surface alternation)

Status: **code changed; nothing built, run, rendered or measured by the worker.** This session had file read/write/search tools only — no shell, no browser, no `yarn`, no Playwright. Every visual statement below is `[calc]` (derived from source) or explicitly marked unverified. No copy, legal text, locale string, route, link, anchor, image, disclosure, token or dependency was changed. Nothing was published, pushed or bought.

## 1. Why this unit

Inputs: `M4_CURRENT_HANDOFF.md`, `M4_REFERENCE_FOLLOWUP.md`, `M5_2_RESULT.md`, `M4_REFERENCE_COMPOSITION_SPEC.md` §7, §10, §13–§15.

- **First screen (preferred by the task) is blocked.** H-1 needs **D4** (A vs B), which has no default and whose evidence run (`M5_2_RESULT.md` §4) has still not been executed. H-2 proposes no code change unless a re-check fails the fold. Nothing here was touched.
- **Reference research (P1/P2/P5/P7/P8)** does not authorise any layout change (`M4_REFERENCE_FOLLOWUP.md` §3).
- **R-6 (a) is the one composition change with both evidence and a pre-decided default:**
  - Evidence: S10 and S11 both on the raised surface, back to back, is a **seen** structural fact in the full-page captures (`M4_FULLPAGE_AUDIT.md`, restated in handoff §2).
  - Decision already made: spec §14 ledger "O-05 — S10/S11 both raised — **Accepted** → R-6"; §7 R-6 fixes the order to try: "(a) alternate the tail — S10 raised, S11 base with the amber rule, S12 raised with hairline, S13 base".
  - Constraints met by construction: no new colour (§13 M5.3 stop condition), section order unchanged (brief §1), amber rule stays the single page-level moment (R-5), R-1 still holds.

Other M5.3 items (pillar cell, S-14 padding, S6 overlap) were not touched — each needs a visual pass or a choice between options.

## 2. Exact before / after

| Section | File | Before | After |
|---|---|---|---|
| S10 Zonas | `ZonesSection.astro` | raised, hairline | unchanged |
| S11 Sumate al piloto | `src/components/sections/FoundersSection.astro` | `surface="raised"` (`.surface-raised` → `--bg-surface`), `accent`, `rhythm="loose"` | prop removed → `surface='none'` (page ground, `--bg-base` via body), `accent` and `rhythm="loose"` kept |
| S12 FAQ | `src/components/sections/FaqSection.astro` | no surface prop (base), `divider` | `surface="raised"` added, `divider` kept |
| S13 Encuesta | `SurveyTeaserSection.astro` | base, `coda` | unchanged |

Tail sequence, before → after: `raised · raised · base · base` → `raised · base · raised · base` (S10–S13). One short comment added to each changed file citing R-6 (a). Diff is two prop lines; revert = restore `surface="raised"` on S11 and remove it from S12.

No test asserts section surfaces (`grep` of `tests/` for background checks: no matches), so no test was changed.

## 3. Expected effects `[calc]` — all unverified visually

1. S10→S11 boundary becomes a surface step (raised → base) plus the amber rule, instead of the amber rule alone on a continuous raised field.
2. S11→S12 gains a surface step (base → raised) in addition to the FAQ hairline; S12→S13 gains one (raised → base). S13's `coda` rhythm (48 px top padding, meant to "sit close under the section above") now begins on a different surface from S12 — whether the coda still reads as attached is **unverified**.
3. Text contrast: S11 moves from `--bg-surface` to the darker `--bg-base`, so light text contrast can only rise; S12 moves the other way by the same ≈3-point lightness step (spec §7) — FAQ text, `--accent` marks and hairlines are **not measured** on `--bg-surface` in this section, though the same tokens already sit on raised S3/S6/S10.
4. Spec §7 (b) warns the base↔raised step may be "too faint to read". If captures show that, **(b) is a separate decision** (evaluate `--bg-elevated` for section-level raised) and is not taken here.

## 4. Verification owed (dispatcher / Kirill / Codex — none run here)

```sh
git diff --check
yarn astro check
yarn build
yarn playwright test          # full suite incl. legal, terminology, disclosure, screenshots
```

Visual: full-page captures ES/EN/RU at 375, 768, 1440 of S9–footer, before (`HEAD~1`) and after, judged against: (i) S10/S11 now read as two blocks; (ii) the amber rule still reads as the single accent moment; (iii) S13 still reads as a coda; (iv) FAQ hairlines and `+/−` marks remain legible on raised. Contrast of FAQ `--text-secondary` answer text on `--bg-surface` should be recorded (≥4.5:1).

## 5. Open questions (human decision)

- **If the step is too faint by eye:** try R-6 (b) (`--bg-elevated`), or revert? Needs Kirill/designer — not a default.
- **S13 coda on a new surface:** if it detaches visually, options are moving S13 to raised (breaks the strict alternation R-6 (a) names) or accepting it — a designer call.
- Unchanged and still open: **D4** (hero A/B), **D7** (empty-state copy), and the unrun `M5_2_RESULT.md` §4 evidence commands.

## 6. Next unit

Run §4 here together with `M5_2_RESULT.md` §4 in one shell/browser session; accept or revert R-6 (a) from the captures, then resolve D4.
