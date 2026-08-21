# CLAVERA Landing — Worklog

This is the current-state companion to `CLAVERA_EXECUTION_PLAN.md`. Update it after every accepted milestone, tool decision, scope change, blocker, or branch change. New chats must read the latest entry before planning work.

## 2026-08-21 — Taste audit skill registered (not run)

The Taste Skill is now installed project-locally and committed to the repository. This is tooling registration only.

### What was installed

- Variant: `redesign-existing-projects` at `.claude/skills/redesign-existing-projects/SKILL.md`.
- Provenance recorded in `skills-lock.json`: source `Leonxlnx/taste-skill` (github), skill path `skills/redesign-skill/SKILL.md`, computed hash `b405eee0e0e80fc243f731d9aa368bca307e356db7e6157d27101d369dac6726`.
- The vendored `SKILL.md` is third-party content and is committed unmodified.
- The experimental default `design-taste-frontend` variant was deliberately not installed.

### Status

- **The skill has not been run.** No audit has been performed.
- **None of its recommendations has been approved.** There are no findings to accept or reject yet.
- M4 remains pending. Installing the skill starts nothing; the audit is an M4 activity.
- No application source, test, copy, design token, dependency or configuration changed in this commit.

### Standing rejection rule

The skill sits at position 5 in the authority order, below `PROJECT_DECISIONS.md`, the brief, `docs/design-system/` and the execution plan. Any suggestion that conflicts with CLAVERA authority is rejected unless separately approved and recorded here first. That explicitly includes:

- automatic font replacement — the skill's published guidance proposes `Geist`, `Outfit`, `Cabinet Grotesk` or `Satoshi`, against the approved Plus Jakarta Sans / Onest / IBM Plex Mono pairing;
- placeholder or stock imagery, against the approved-assets-only rule and the R1–R6 render set;
- fabricated content of any kind, against the canonical Spanish copy authority and the Appendix В terminology constraints;
- runtime motion or an animation library, which needs a separate recorded decision and the M6 motion map;
- smooth-scroll interception or blanket `scroll-behavior: smooth`, against the existing `prefers-reduced-motion` handling;
- framework changes — React, Tailwind, Next or any UI library — against the Astro static / strict TypeScript / Yarn stack;
- replacement or regeneration of the approved design system and its tokens.

Findings must be presented for review before any implementation. The skill audits; it does not decide.

## 2026-08-21 — M2.5 and M3 technically accepted

Codex completed the final independent review of the remote milestone commit. M2.5 (multilingual foundation) and M3 (test infrastructure) are technically accepted. No blocking or non-blocking code findings remain.

### Accepted commit

- Hash: `906f68bfe582d8d2db38a91acf71009f18be9fa1`
- Subject: `feat: add multilingual foundation and test infrastructure`
- Remote `origin/landing-design` independently verified at the same hash.
- 53 files committed.

### Verification reported at acceptance

- `git diff --check`: clean.
- Astro check: 50 files, 0 errors, 0 warnings, 0 hints.
- Production build: 3 pages (`/`, `/en/`, `/ru/`), zero client-side JavaScript.
- Playwright across Chromium, Firefox and WebKit: 669 passed, 0 failed, 21 reasoned skips (18 diagnostic screenshot tests captured once by Chromium; 3 skip-link reveal tests skipped on WebKit, which excludes links from the default tab order — the link's presence and first-in-tab-order position are still asserted on all three engines).

### What this acceptance does not cover

- **No visual acceptance.** Diagnostic screenshots are not visual-regression baselines and none is approved. The composition remains Spanish-first; the Russian hero headline still occupies roughly double the height of the Spanish and English ones at desktop. Visual acceptance stays deferred to the composition gate after M4/M5.
- **No legal or publish approval.** Both S7 blockers remain open, unchanged:
  1. the lawyer's written approval to publish the comparison table (brief §S7 note 2), outstanding across all three languages;
  2. the contradiction between Appendix В.2 / §S7 note 2 and the brief's own canonical Spanish market-reference note.
- **Appendix В.4 limitations unchanged.** Opening dates, address before lease signing, comparison with bike shops or free municipal guarderías, and access hours without `según el hub` are not machine-checkable; only the literal-string subset is tested. These still need human review.

### Not in the accepted commit

The Taste Skill installation (`.claude/skills/redesign-existing-projects/`, `skills-lock.json`) was deliberately excluded as M4 tooling and remains untracked. M4 has not started.

## 2026-08-21 — Multilingual scope approved and foundation milestone

### Approved scope change

- The phase-one `es-AR`-only decision is superseded. The landing page now ships three static locales: `es-AR` at `/` (canonical, unprefixed), `en` at `/en/`, `ru` at `/ru/`.
- This restores the multilingual regulation already present in the brief's Part V, which the phase-one decision had narrowed.
- Spanish remains the canonical product-copy authority. English and Russian are working translations carrying identical approved meaning and legal constraints; wording may be refined editorially later, meaning may not drift.
- Multilingual support is treated as a composition and responsive-design constraint. All three locales are required inputs to every future responsive review.
- Tier-1 forbidden vocabulary, the entity-protection rule, render disclosures, insurance constraints, operating-hour constraints and the `monTEK`/`Hamax` prohibition apply in every language and may not be weakened by a translation.
- `c5171d2` is the technical redesign baseline, not final visual acceptance. Visual acceptance moves to the composition gate after the multilingual redesign and its QA.
- Claude is the implementation writer; Codex is the independent reviewer. They must not write to the same worktree concurrently.

### Documents updated

- `PROJECT_DECISIONS.md` — phase-one locale rule superseded; new "Multilingual scope (2026-08-21)" section.
- `CLAUDE.md` — locale routes, translation authority, per-locale responsive review, Tier-1 enforcement in all languages, no browser-language redirect, reviewer/writer separation.
- `docs/project/CLAVERA_EXECUTION_PLAN.md` — current state, M2 status correction, new M2.5 multilingual foundation milestone, M3 locale coverage, two dated decision-log entries.

Historical entries were not rewritten.

### 2026-08-21 — M2.5 + M3 milestone commit

Codex completed the read-only pre-commit review of M2.5 and M3 with no blocking code or test findings. The multilingual foundation and the test infrastructure are committed together as one milestone on `landing-design`.

Deliberately excluded from the commit: the Taste Skill installation (`.claude/skills/redesign-existing-projects/`, `skills-lock.json`). That tooling belongs to M4, not to M2.5 or M3, so it stays untracked until the M4 milestone commit or is ignored, at Kirill's call.

Status after this commit:

- M2.5 and M3 are implementation complete and pending **final Codex review of the remote commit**.
- Nothing here constitutes visual acceptance. The composition is still Spanish-first and the Russian hero headline still occupies roughly double the height of the Spanish and English ones at desktop.
- Nothing here constitutes legal approval. Both S7 blockers remain open (see the two entries below).

### 2026-08-21 — Appendix В second correction round (uncommitted)

Codex verified the first correction round and confirmed the original blockers fixed, but held M2.5/M3 on two remaining Appendix В gaps. Both are now closed.

- **Standalone `por hora` was not scanned.** Appendix В.1 lists the row as `tarifa por hora, por hora`, so the bare phrase is Tier 1 in its own right. It is now in the Tier-1 dictionary, with permanent negative controls proving it is detected and that it does not fire on `por membresía` / `por 24 meses`.
- **Tier 2 had leaked out of the column header.** The EN and RU market-reference notes used `car garages` and «автомобильных кочер». Appendix В.2 and brief §S7 note 2 permit the Tier-2 term **only** as the S7 column header. Both notes are rewritten neutrally, carrying no Tier-1 or Tier-2 term or root, and both phrases are removed from the allowlist. The allowlist is now three column headers plus one scoped Spanish exception, guarded by a test that fails if it grows.
- **A scanner weakness was found by its own negative control.** Stripping the allowlist by plain substring removed `Car garage` from inside `car garages`, leaving a stray "s" so the plural passed. The strip is now bounded by Unicode lookarounds, so a permitted phrase glued to another letter no longer counts as permitted.

#### Outstanding authority conflict — canonical Spanish S7 note `[BLOCKER]`

The brief contradicts itself and this is not resolvable in code:

- §S7 note 2 (line 350): the word `cochera` is used *"только как заголовок колонки и только в этой таблице"* — column header only.
- Appendix В.2 (line 1650): permitted location is *"заголовок колонки таблицы S7"*.
- But the brief's own approved S7 copy (line 345) reads: `Valores de referencia de mercado para cocheras en CABA, {mes} 2026.` — using `cocheras` in the **note**, not the column header.

The brief is the authority for canonical Spanish copy, so the sentence ships verbatim. The automated exception is scoped to that one exact sentence — a reworded variant or the bare word still fails the suite, and English and Russian get no equivalent exception. Resolution needs the lawyer, alongside the still-outstanding written approval for publishing the S7 table at all (§S7 note 2), which now covers three languages.

### 2026-08-21 — Appendix В correction round (uncommitted)

Codex has not accepted M2.5/M3. This round addresses its blockers.

- **Appendix В was found, not missing.** The previous report wrongly recorded the terminology dictionary as absent from the brief. It is at lines 1633–1671 (`# ПРИЛОЖЕНИЕ В`, subsections В.1–В.4); the earlier search missed it on heading case.
- **Two Tier-1 violations shipped and are now fixed.** Appendix В.1 lists English `car space` and Russian «машиноместо»/«кочера» as Tier 1, forbidden everywhere. The EN and RU comparison columns used exactly those. They now use the Appendix В.2 forms `Car garage` and «Автомобильная кочера», which are permitted **only** in the S7 comparison and **still require the lawyer's written approval** — the same blocker that already attaches to the Spanish table (brief §S7 note 2). That approval is still outstanding for all three languages.
- The screen-reader table caption no longer carries the Tier-2 term in any locale; it was not brief copy, so keeping it there widened the legal surface for no benefit.
- **Render alt text now repeats the mandatory disclosure.** Brief S8 requires it in `<figcaption>` *and* `alt`; only the figcaption carried it. Alt is now composed as literal description + the exact localized disclosure, hero R1 included.
- Diagnostic screenshots are gated on every image having loaded *and* decoded; the earlier captures showed blank render panels because they waited on a fixed timeout.
- The Playwright harness no longer reuses an existing server on the test port, and the static server refuses to start against a missing build.

### Implementation outcome (M2.5 + M3, uncommitted)

Astro built-in i18n with `prefixDefaultLocale: false`; three static routes (`/`, `/en/`, `/ru/`) from one component tree. Copy lives in `src/i18n/{es,en,ru}.ts` against a shared `Copy` interface, so a missing translation is a TypeScript error. Components read strings via `getCopy(Astro.currentLocale)` — no locale prop drilling, no per-locale duplication. Alt text, captions and the render disclosure moved out of `src/data/media.ts` into the locale files; that file now owns only paths and measured dimensions.

Three defects were found by the new multilingual QA and fixed:

1. **Paper-surface contrast below AA.** `--text-tertiary` mapped to concrete-500, measuring 3.55:1 on concrete-50. This affected the mandatory generated-render disclosure under the R6 plan sheet, which the brief requires at >=4.5:1. Remapped to the secondary token (6.44:1). Pre-existing since the visual-direction milestone; invisible until axe ran.
2. **Russian CTA overflowed the viewport.** `.button` had `white-space: nowrap`, so the longer Russian founders CTA rendered 415px wide inside a 375px viewport and was clipped. Buttons now wrap and cap at `max-width: 100%`.
3. **Header height diverged from `--header-h` on mobile.** Adding the language switcher wrapped the header to a second row (108px actual vs 64px declared), silently breaking hero padding, anchor offsets and sticky offsets. Root cause was the Astro scoping trap recorded in the previous milestone — a class passed into a child component does not carry the parent's scope, so the rule hiding the switcher never matched. Fixed with a parent-owned wrapper element; the header switcher now appears from 700px up and the footer switcher (required in both places by brief Part V) carries mobile.

Regression cover added for all three: an axe scan per locale/viewport, a viewport-containment assertion that does not rely on scrollability, and a test asserting `--header-h` equals the rendered header height per locale and viewport.

## 2026-08-20 — Tool registry frozen

- Reviewed the previously approved tool plan plus the two supplied recommendation screenshots.
- Finalized the minimal durable documentation set: root `CLAUDE.md`, `docs/project/CLAVERA_EXECUTION_PLAN.md`, and `docs/project/CLAVERA_WORKLOG.md`.
- No newly advertised tool was added automatically.
- Current cycle is limited to: Frontend Design; isolated Taste audit; Refero research when Pro access is confirmed; separate Impeccable critique; Playwright + axe + Astro/TypeScript diagnostics; Emil skills at the motion milestone; conditional Motion for JavaScript; and final Checklist Design plus separate Lighthouse/SEO/accessibility checks.
- Explicitly excluded for this cycle: UI UX Pro Max, Superpowers, gstack, Context7, Claude SEO/marketing suites, Caveman, HyperFrames, Skill Creator, Bulletproof, Dataviz, productivity/external-memory plugins, Anthropic document skills, 21st MCP, Uiverse, and duplicate security-review installation.
- The freeze can be changed only after documenting a specific unmet need in the execution plan.
- No Claude prompt was issued, no tool was installed, and no repository or branch was changed while making this decision.

## 2026-08-20 — Context recovery and precision-pass review

### Repository state

- Repository: `clavera-dev/clavera-landing`
- Active branch: `landing-design`
- Latest remote commit: `c5171d2ec725f4e4c86985c2e0e71264d729bf2f`
- Commit subject: `fix: refine landing geometry and visual alignment`
- Baseline branch: `landing-v1` at `a288758`

### Independently reproduced checks

- Remote branch resolves to `c5171d2ec725f4e4c86985c2e0e71264d729bf2f`.
- `git diff --check c04a89f..c5171d2`: pass.
- Astro diagnostics: 25 files, 0 errors, 0 warnings, 0 hints.
- Production build: pass; one static page generated.
- Source scan: no `24/7`, `Hamax`, or `monTEK` public copy introduced.
- Insurance terminology remains only in the brief-approved FAQ wording.
- Typeform remains isolated in `TypeformBoundary.astro` and `src/config/typeform.ts`; public integration is still inert.
- Removed legacy R1/R2/R4/R5/R6 derivative paths are absent from source and built output.
- Final render directory contains 60 optimized derivatives; the separate entrance render retains 6 derivatives.
- The remote commit does not contain a repository `CLAUDE.md`, although the original plan required a compact one. Its creation is now a blocking documentation follow-up before the next implementation milestone.

### Review limitation

Codex verified the remote diff, source, diagnostics, and production build. Codex did not independently reproduce Claude's pixel measurements in a real browser because browser automation is not yet installed in this review environment. Kirill's local visual check and the upcoming Playwright layer are required before full visual acceptance.

### Restored original workflow decisions

At project start:

- Claude Code without proxy or external memory;
- official Frontend Design;
- compact project `CLAUDE.md`;
- structured project documentation.

After the first visual concept:

- Taste Skill as an isolated art-director audit;
- it may not change the approved brand or stack without explicit justification and approval.

During motion work:

- `emil-design-eng`;
- then `review-animations`.

During QA:

- Playwright;
- TypeScript LSP;
- ordinary code review;
- Lighthouse, SEO, and accessibility checks as separate tasks.

### Additional confirmed tool decisions

- Impeccable: approved as a critique/audit/polish layer; installation pending.
- Official Emil Kowalski skills: approved for the motion milestone; installation pending.
- Refero MCP: approved for reference research, subject to account access.
- Checklist Design: approved for manual final QA; no repository installation.
- Motion for JavaScript: conditional on an approved motion map; not installed yet.
- UI UX Pro Max: evaluation candidate only until an uncovered audit need is demonstrated.
- 21st.dev and Uiverse: not part of the CLAVERA implementation stack.

### Current gate

1. Kirill performs a local visual check of `c5171d2`.
2. Add a compact `CLAUDE.md`, this execution plan, and this worklog to the repository.
3. Install Taste Skill variant `redesign-existing-projects` and run it in audit-only mode.
4. Add Playwright and `@axe-core/playwright` as the next implementation milestone.
5. Do not start motion implementation yet.

### Context and model handling

- Claude visual-critical work: use the Opus model selected in Claude Desktop with High effort and Auto permissions unless a later task explicitly changes them.
- The exact Claude Opus version is not present in the current report and must not be guessed.
- Codex model identity available to this conversation: Codex based on GPT-5. The exact deployment label and adjustable effort value are not exposed inside the conversation, so they must be read from the product UI if the user needs the precise setting.
- Recommended new Codex review window, when the UI exposes these controls: GPT-5.6 Sol with High reasoning. Reserve xhigh for final cross-source architecture or release review rather than routine status handling.
- Before opening a new chat, ensure the plan and worklog are in the repository or attach them to the new chat. The new chat must read both before giving project advice.
