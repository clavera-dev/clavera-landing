# CLAVERA Landing — Execution Plan

Status date: 2026-08-23
Plan owner: Kirill
Working repository: `clavera-dev/clavera-landing`
Active delivery branch: `landing-design`
Current next milestone: `M4 — Reference research and composition specification` (blocked until M3.5 is reviewed and accepted)
Current milestone in review: `M3.5.1 — Beta-conversion preparation and correction` — implementation complete, pending Codex remote-commit review and Kirill visual review (builds on M3.5)

## Purpose

This file is the canonical execution plan for the CLAVERA landing page. Chat history is not an authority for sequencing or tool decisions. If a later instruction conflicts with this file, stop, record the approved change here first, and then continue.

## Authority order

1. `PROJECT_DECISIONS.md`
2. `docs/brief/CLAVERA_Site_TZ_v1_5.md`
3. `docs/design-system/`
4. This execution plan
5. Previous implementations and external references, as inspiration only

The approved CLAVERA colors, typography, brand assets, terminology, and product claims must not be replaced by a skill, component library, reference site, or generated design system.

## Working protocol

1. Claude implements one bounded milestone in Claude Desktop Code.
2. Claude runs the milestone checks, commits, and pushes to the active branch.
3. Kirill sends the resulting report to Codex.
4. Codex reviews the actual remote commit independently and reports blocking and non-blocking findings.
5. Kirill performs the local visual check when the site is not available through a public preview.
6. No new milestone begins until the previous milestone is accepted or its follow-up fixes are explicitly recorded.
7. Claude and Codex must not edit the same working tree concurrently.
8. After every accepted milestone, tool decision, scope change, or newly discovered blocker, update this plan and `CLAVERA_WORKLOG.md` before issuing the next implementation prompt.
9. A new chat or compacted context must begin by reading the repository authority documents, this plan, and the latest worklog entry. Do not reconstruct project state from chat memory alone.

Claude prompts are written in English. Model, thinking, and permission settings are configured in the desktop application and must not be included inside prompts. Only changed settings are communicated separately to Kirill.

## Current verified state

- Framework: Astro static output, strict TypeScript, Yarn.
- Locales: `es-AR` at `/` (canonical), `en` at `/en/`, `ru` at `/ru/`. Approved 2026-08-21; supersedes the earlier `es-AR`-only phase-one rule.
- Approved render set: R1-R6.
- Current visual-direction commit: `c04a89f7f57336efe538cc0f62677594e10268e5` (`feat: establish CLAVERA visual direction`).
- Latest precision commit: `c5171d2ec725f4e4c86985c2e0e71264d729bf2f` (`fix: refine landing geometry and visual alignment`).
- Precision commit technical review: diff check, Astro diagnostics, and production build pass; independent visual acceptance remains pending until Kirill's local check and the Playwright layer are available.
- Current Claude project plugin: Anthropic Frontend Design.
- Current Claude settings for visual-critical work: Opus, High, Auto.
- Repository instruction set: root `CLAUDE.md`, `docs/project/CLAVERA_EXECUTION_PLAN.md`, and `docs/project/CLAVERA_WORKLOG.md`. These three files are the durable project context established by the documentation milestone following `c5171d2`.
- `c5171d2` is the technical redesign baseline only. It is not final visual acceptance. Final visual acceptance moves to the composition gate after the multilingual redesign and its QA.
- `906f68b` is the accepted multilingual-foundation and test-infrastructure commit (M2.5 + M3), technically accepted by Codex on the remote ref. It carries no visual acceptance and no legal or publish approval.
- Roles: Claude is the implementation writer, Codex is the independent reviewer. They must not write to the same worktree concurrently.

## Tool registry

### Registry freeze — 2026-08-20

The registry below is frozen for the current delivery cycle. Do not add another skill, plugin, MCP server, component catalog, workflow framework, or runtime library merely because it is recommended in a social post or tool list. A new candidate may be reconsidered only when a concrete uncovered need is recorded in this plan first.

**Freeze reaffirmed 2026-08-23.** The two-track release strategy (see the decision log entry below and `PROJECT_DECISIONS.md`, "Release strategy (2026-08-23)") does not unfreeze this registry. M3.5 is scoped to Frontend Design, Playwright, `@axe-core/playwright`, and Astro diagnostics, which are already installed/currently available as recorded in this registry. TypeScript language-service/LSP support is approved but, per its existing registry entry below, its environment setup must still be verified rather than assumed — that verification happens during M3.5, and Astro diagnostics remain mandatory regardless of what the LSP verification finds. Taste, Refero, Impeccable, the Emil Kowalski skills, and Motion for JavaScript remain M4+ tooling and are explicitly excluded from M3.5. Fable is not part of this registry's approved-and-required or approved-conditionally sections; it is tracked separately in `PROJECT_DECISIONS.md` as reserved, budget-limited M4/M5/M8 tooling and is excluded from M3.5 and from any automatic correction loop.

Current sequence:

1. Frontend Design remains the implementation skill.
2. Taste Skill runs once as an isolated, read-only art-direction audit.
3. Refero MCP is used for reference research if Kirill confirms an active Refero Pro account.
4. Impeccable is used after the reference specification for a separate critique/polish pass.
5. Playwright, `@axe-core/playwright`, Astro diagnostics, and the TypeScript language service provide QA infrastructure.
6. Emil Kowalski skills are introduced only at the motion milestone.
7. Motion for JavaScript remains conditional on the approved motion map.
8. Checklist Design and separate Lighthouse/SEO/accessibility reviews are final handoff gates.

### Approved and required

#### Anthropic Frontend Design

Role: primary interface implementation and broad visual direction.
Status: installed.
Constraint: it must follow the repository authority order and may not redefine the approved design system.

#### Taste Skill

Source: `https://github.com/Leonxlnx/taste-skill`
Role: isolated art-direction and anti-generic audit after the first visual concept exists.
Status: installed project-locally, not yet run.
Installed variant: `redesign-existing-projects`, at `.claude/skills/redesign-existing-projects/SKILL.md`.
Provenance: recorded in `skills-lock.json` — source `Leonxlnx/taste-skill` (github), skill path `skills/redesign-skill/SKILL.md`, computed hash `b405eee0e0e80fc243f731d9aa368bca307e356db7e6157d27101d369dac6726`. The vendored `SKILL.md` is third-party content and is committed unmodified.
Timing: audit runs inside M4, which remains pending. Installation alone starts nothing.
Constraint: audit only for the first use. It may not change the approved brand, public claims, Astro/Yarn/TypeScript stack, or add a runtime animation library without a separate approved decision. Findings must be presented before implementation.
Authority precedence: this skill sits at position 5 in the authority order — below `PROJECT_DECISIONS.md`, the brief, `docs/design-system/` and this plan. Where its generic guidance conflicts with an approved CLAVERA decision, the approved decision wins and the recommendation is rejected. Its published guidance already contains such conflicts, including replacing the typeface with `Geist`/`Outfit`/`Cabinet Grotesk`/`Satoshi`, introducing placeholder or stock imagery, adding runtime motion, and applying blanket `scroll-behavior: smooth`.
Do not install the default experimental `design-taste-frontend` variant for this milestone.

#### Impeccable

Source: `https://github.com/pbakaus/impeccable`
Role: shape, critique, audit, polish, responsive review, and anti-pattern detection.
Status: approved; installation pending.
Timing: install after the current precision milestone is reviewed, before the next large composition pass.
Constraint: do not run a workflow that overwrites or regenerates the approved CLAVERA design system. Use it as a critique and refinement layer, not an independent art director.

#### Emil Kowalski Skills for Design Engineers

Source: `https://github.com/emilkowalski/skills`
Required skills: `emil-design-eng`, `find-animation-opportunities`, `animation-vocabulary`, `review-animations`, and `improve-animations`.
Role: motion opportunity analysis, motion specification, implementation guidance, and final animation review.
Status: approved; installation pending.
Timing: install before the motion-planning milestone. The opportunity analysis and motion map must be completed before choosing or adding a runtime animation library.

#### Playwright

Source: `https://playwright.dev/`
Role: browser smoke tests, interaction tests, responsive viewport checks, overflow checks, cross-browser coverage, screenshot capture, and later visual regression testing.
Status: installed (`@playwright/test` 1.62.1) with Chromium, Firefox and WebKit binaries; suite green and accepted at commit `906f68b`.
Timing: add immediately after the current precision milestone is accepted. Add functional and structural tests first. Create visual-regression baselines only after the corrected geometry is accepted.

#### TypeScript language service / LSP

Role: editor diagnostics, symbol navigation, references, and type-aware feedback during implementation and review.
Status: approved in the original project plan; environment setup must be verified rather than assumed.
Timing: verify during the QA-infrastructure milestone.
Constraint: this complements, not replaces, `astro check` and the production build.
Coverage note: verify which extensions the installed plugin actually maps. Do not assume that a TypeScript LSP automatically understands `.astro` files; Astro diagnostics remain mandatory.

#### `@axe-core/playwright`

Source: `https://playwright.dev/docs/accessibility-testing`
Role: automatically detectable accessibility checks inside Playwright.
Status: installed (`@axe-core/playwright` 4.13.0); scanning all three locales at 1440/768/375.
Constraint: automated accessibility checks supplement rather than replace manual review.

#### Refero MCP

Source: `https://doc.refero.design/mcp/getting-started`
Role: research of real shipped interface compositions, flows, and presentation patterns before the next art-direction pass.
Status: approved in principle; connection depends on account availability and must be confirmed by Kirill.
Constraint: research only. Do not copy code, brand language, or complete layouts. Never store an access token in the repository.

#### Checklist Design

Source: `https://www.checklist.design/`
Role: manual UX/UI completeness review before designer handoff.
Status: approved; no repository installation required.

#### Lighthouse, SEO, and accessibility audits

Role: separate QA tasks after interaction and motion implementation, with a final run before designer handoff.
Status: approved in the original project plan.
Constraint: keep performance, SEO, and accessibility findings separate so one aggregate score does not hide blockers in another category.

### Approved conditionally

#### Motion for JavaScript

Source: `https://motion.dev/docs`
Role: runtime implementation of motion that cannot be expressed adequately with CSS and browser-native APIs.
Status: conditional; do not install yet.
Decision gate: install only after the motion map identifies a concrete need. Do not add React or the legacy `framer-motion` package to this Astro project.

### Evaluation candidates, not approved for installation

#### UI UX Pro Max

Source: `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill`
Potential role: supplementary UX audit.
Status: evaluation only. First determine whether Impeccable leaves a material audit gap. It must never generate a replacement CLAVERA design system.

Freeze decision: do not install during the current delivery cycle. Its design-system generator and broad automatic UI activation overlap with Frontend Design, Taste, and Impeccable, while CLAVERA already has an approved design system.

#### Context7

Source: `https://github.com/upstash/context7`
Potential role: current, version-specific library documentation.
Freeze decision: do not connect now. The current stack is small, pinned, and already validated by Astro diagnostics and the production build. Reconsider only if a later milestone introduces a non-trivial library/API question that official documentation does not resolve efficiently. It is not project memory and must never become a substitute for repository authority files.

### Not part of the CLAVERA implementation stack

#### 21st.dev

Reason: its component workflow is primarily useful for React/Next/Tailwind ecosystems and is not required for the current custom Astro implementation.

#### Uiverse

Reason: it is a community component inspiration source, not an authority for CLAVERA composition, accessibility, or design consistency. Do not install or copy components wholesale.

#### Superpowers

Reason: its broad TDD, planning, debugging, and execution methodology overlaps with the already approved milestone protocol and can auto-trigger a competing workflow. Use the CLAVERA execution plan instead.

#### gstack

Reason: it installs a large opinionated operating layer, browser tooling, specialist roles, and repository instructions that would compete with the current Claude/Codex review loop, Playwright plan, and repository authority order. Do not install for this project cycle.

#### Claude SEO / Marketing plugins

Reason: broad SEO/marketing agent suites are unnecessary during composition work and risk introducing unapproved copy or claims. Use the approved public copy, then run a bounded technical SEO task at the final QA milestone.

#### Caveman

Reason: output and memory compression directly conflicts with the current priority of preserving exact constraints and complete audit evidence.

#### HyperFrames

Reason: it is a programmatic video-rendering framework, not a landing-page motion library.

#### Skill Creator

Reason: no custom CLAVERA skill is needed while a compact `CLAUDE.md` and structured project documents cover the project-specific rules.

#### Bulletproof

Reason: a generic plan/test/review/deploy workflow would duplicate the repository plan, milestone checks, Playwright, ordinary review, and release gates without a demonstrated gap.

#### Dataviz

Reason: CLAVERA is not a data-visualization or dashboard project.

#### Productivity and external-memory plugins

Reason: external project memory was explicitly excluded. Repository documents are the durable source of truth.

#### Anthropic document skills

Reason: Word, spreadsheet, presentation, and PDF creation skills are unrelated to implementing and testing the landing page.

#### 21st MCP / 21st.dev

Reason: the catalog and generated components are primarily React/shadcn/Tailwind-oriented and could pull the custom Astro implementation away from the approved design system.

#### Additional security-review installation

Reason: Claude Code already provides a built-in `/security-review` capability. Schedule a bounded security review before release; do not install a duplicate skill now.

#### Third-party `design-motion-principles`

Status: not currently required. The official Emil Kowalski skill set is the selected motion-design authority. Reconsider only if an explicit gap is documented.

## Milestones and gates

### M0 — Foundation

Status: implementation foundation complete; repository instruction files established by the documentation milestone.

- Astro static scaffold
- strict TypeScript
- approved content authority
- approved render integration
- baseline responsive layout
- Claude Code without proxy or external memory
- official Frontend Design skill
- compact repository `CLAUDE.md` and the two project-state documents are included in the documentation milestone immediately after `c5171d2`
- structured project authority documents

### M1 — Visual direction

Status: complete, pending precision correction acceptance.

- architectural/infrastructure art direction
- numbered section rail
- render-led layout
- typography and colors connected to the approved design system

### M2 — Precision correction

Status: implementation complete at `c5171d2`; technical review passed. This commit is the technical redesign baseline, not final visual acceptance; visual acceptance is deferred to the composition gate after the multilingual redesign (M2.5, M4, M5) and its QA.

Acceptance requirements:

- header declared height and rendered geometry agree;
- header logo, navigation, and CTA align optically;
- numbered section rail aligns consistently at 1440, 1280, 1100, 1024, 768, and 375 CSS pixels;
- section spacing follows a coherent rhythm;
- heading hierarchy is valid;
- no horizontal overflow;
- no obsolete render assets remain without a documented use;
- Astro check and production build pass.

### M2.5 — Multilingual foundation

Status: **technically accepted by Codex at commit `906f68b`** (`906f68bfe582d8d2db38a91acf71009f18be9fa1`), verified independently on the remote `origin/landing-design` ref with no blocking or non-blocking findings. Technical acceptance only — this is not visual acceptance, which remains deferred to the composition gate, and not legal approval.

Approved 2026-08-21. Establishes ES/EN/RU as a design constraint before the composition work, so no layout is accepted that only survives Spanish.

- Astro built-in i18n and static routing; no client-side i18n runtime, no per-locale component-tree duplication;
- routes `/`, `/en/`, `/ru/` with `es-AR` canonical and unprefixed;
- correct `<html lang>`, self-referencing canonical, and `hreflang` for `es-AR`, `en`, `ru`, `x-default` on every route;
- semantic keyboard-accessible language switcher using ordinary links, working without JavaScript, placed per brief Part V (end of navigation and in the footer, order ES · EN · RU);
- no automatic browser-language redirect;
- working EN and RU translations of the full public page, including render captions, alt text and the mandatory disclosure;
- Tier-1 vocabulary enforcement in all three languages;
- layouts absorb translation expansion through intrinsic sizing rather than fixed heights, clipping or hidden content;
- existing section order, IDs, render mapping and Typeform isolation preserved.

### M3 — Test infrastructure

Status: **technically accepted by Codex at commit `906f68b`** (`906f68bfe582d8d2db38a91acf71009f18be9fa1`), verified independently on the remote `origin/landing-design` ref with no blocking or non-blocking findings. Playwright, `@axe-core/playwright` and the Chromium/Firefox/WebKit matrix are installed and green. Diagnostic screenshots remain explicitly non-baseline: no visual-regression baseline is approved, and visual acceptance stays deferred to the composition gate.

- install Playwright and `@axe-core/playwright`;
- verify TypeScript LSP/editor diagnostics;
- add smoke tests for page load, anchors, CTA boundaries, FAQ, and keyboard navigation;
- run every structural check across all three locales;
- assert `<html lang>`, canonical, `hreflang` and language-switcher destinations per locale;
- assert no clipped navigation, CTA labels, headings or essential body copy in any locale;
- check horizontal overflow at defined viewports;
- configure Chromium, Firefox, and WebKit where the environment supports them;
- capture diagnostic screenshots without yet treating them as approved visual baselines;
- gate every capture on proof that all images loaded and decoded, so a blank render panel fails the run instead of being saved;
- never reuse an existing server on the test port, so each run verifies the freshly built output;
- enforce Appendix В terminology against the built output in all three locales, across visible copy, metadata, alt/ARIA text and public URLs/filenames;
- keep the Tier-2 allowlist to the three S7 column headers plus the one scoped canonical Spanish sentence, with negative controls proving the scanner detects what it claims to.

### M3.5 — Expedited public-beta stabilization and release gate

Status: **implementation complete on `landing-design` (2026-08-23), pending independent Codex remote-commit review and Kirill's visual review.** Not acceptance, not visual approval, not legal approval, not deployment. Approved 2026-08-23 as an insertion before M4, in response to the Track A expedited-beta decision recorded in `PROJECT_DECISIONS.md` ("Release strategy (2026-08-23)"). This milestone does not replace or reorder M4–M10; it is a bounded, additional gate.

- Scope: one approximately three-hour implementation session, starting from the existing ES/EN/RU site, the approved CLAVERA design system, the approved R1–R6 assets, current multilingual copy, and the accepted M2.5/M3 test infrastructure.
- In scope: high-impact visual, responsive, interaction, accessibility, routing, internal-link, asset-loading, metadata, console, survey-integration, hosting-readiness, and release blockers only.
- Out of scope: broad redesign, reference-driven recomposition, motion work, slogan rewriting, design-system replacement, framework changes, speculative refactoring, and new dependency installation.
- Tooling excluded from M3.5: Taste, Refero, Impeccable, the Emil Kowalski skills, Motion for JavaScript, and Fable.
- Beta form (settled and implemented; **the single-destination rule below is superseded by M3.5.1**, which added the short pilot-interest form as the primary flow — the research survey is now the secondary one): the long research Typeform survey, routed per locale — **ES → `https://claveraar.typeform.com/ARGCABA`, RU → `https://claveraar.typeform.com/latam`, EN → `https://claveraar.typeform.com/ARGCABA`**. EN deliberately uses the **Spanish** survey because no separate English Typeform will be created for the expedited beta; the English UI discloses that the survey is in Spanish beside every survey link, and the destination is never described as an English survey. A dedicated EN public Typeform URL is **release debt** required before the official full-quality release. The earlier RU 2/3/5-minute readiness blocker is **removed**: the obsolete 5-minute introduction is gone and the Russian introduction now states approximately 3 minutes, matching the site CTA; Typeform's automatic 2-minute UI estimate is a **non-blocking external display detail**, not a launch blocker. The short Socios Fundadores lead/price form, the founding-price reveal, and the `/gracias` flow are excluded from the beta, removed from the source, and remain deferred to M9. No payment, deposit, `seña`, or membership contract is accepted in the beta.
- Legal/publish gates that must be resolved before public deployment: `/privacidad`, `/terminos`, `/cookies` routes are **mandatory** for the public beta — currently unimplemented, requiring approved Spanish authority legal content (pending external/legal input, not created by this documentation task), **(superseded by M3.5.1: beta legal content is Spanish-only; EN/RU link to the Spanish pages with an explicit Spanish-only notice rather than carrying courtesy translations)**. There is no approved legal fallback for these routes; if their required content is not available, public deployment stays blocked, and removing footer links does not remove the underlying requirement since the beta sends users to Typeform and processes personal data. **Only S7** may receive a separately approved beta exclusion, and only if its outstanding written legal approval is not received in time; absence of that approval is never treated as approval. The unresolved Appendix В.2 / §S7 conflict with the canonical Spanish `cocheras` note also remains open. No broken footer links to not-yet-existing routes.
- Public deployment itself requires a later, separate, explicit approval after Codex review and Kirill's own visual check. This milestone's acceptance is not visual acceptance, not legal approval, not product completion, and not completion of M4–M10.

### M3.5.1 — Beta-conversion preparation and correction

Status: **implementation complete on `landing-design` (2026-08-23), pending independent Codex remote-commit review and Kirill's visual review.** Not acceptance, not visual approval, not legal approval, not deployment. A bounded correction pass on top of M3.5; it does not replace or reorder M4–M10.

- **Two beta Typeform flows.** Pilot interest (short, non-binding, primary conversion) and the research survey (secondary, S13, unchanged URLs). Full detail in `PROJECT_DECISIONS.md`, "Beta conversion architecture (2026-08-23, M3.5.1)".
- **Pilot-interest URLs are pending external input.** Held as `null` per locale in `src/config/typeform.ts` with no fallback; the UI shows localized plain text, never a control or a fake URL. Activation = replacing the three `null` values. No placeholder URL is recorded in any durable document.
- **Attribution prepared, not speculative.** Allowlist only (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `lang`, `source`, `landing_version`), applied at build time. Visitor-side `utm_*` forwarding is deliberately not implemented because it would require client JavaScript; the site still ships zero client JavaScript.
- **Nine-area beta set**, alphabetized, unnumbered, presented as under evaluation with a no-commitment disclaimer. Original Spanish names in all three locales.
- **Planned-service wording** corrected in S3 and S6 so cameras, access logging and identification read as planned properties of the future service. No new 24/7, insurance or guaranteed-security claim.
- **WhatsApp number pending**, centralized and nullable in `src/config/contact.ts`; plain text while unset.
- **S7 unchanged.** No legal page created, no legal content invented.
- **Legal content is Spanish-only.** EN/RU will link to the Spanish legal pages with an explicit Spanish-only notice; no EN/RU legal translation is produced for the beta. The owner chose not to display `domicilio` or an RNBD number in the beta — a display decision that leaves the legal-sufficiency question, and RNBD registration status, unresolved pre-deployment checks.
- Unresolved external publish/legal items: controller `domicilio`, RNBD registration/status, final approved Spanish privacy/terms/cookies text, final publication date. A dedicated EN research-survey URL is full-release debt only, not a beta deployment blocker.

### M4 — Reference research and composition specification

Status: pending.

- connect Refero MCP if account access is available;
- research real premium architectural, infrastructure, urban-mobility, and render-led landing pages;
- document references by pattern and purpose, not by superficial style;
- define grid, type scale usage, image scale, section rhythm, full-bleed behavior, transition logic, and mobile composition;
- approve the composition specification before implementation.

Before reference implementation, run Taste Skill as an isolated art-director audit. Record its findings, accept or reject each material recommendation against the repository authority order, and do not allow it to mutate the project during the audit.

### M5 — Reference-driven composition pass

Status: pending.

- implement the approved composition specification with Frontend Design;
- critique and audit with Impeccable;
- correct findings before proceeding;
- preserve all approved CLAVERA brand tokens and claims.

### M6 — Motion specification

Status: pending.

- install the official Emil Kowalski skills;
- run motion-opportunity analysis;
- define a section-by-section motion map with purpose, trigger, duration, easing, interruption behavior, reduced-motion behavior, and performance impact;
- choose CSS/browser-native APIs or Motion for JavaScript per interaction;
- approve the motion map before implementation.

### M7 — Motion and interaction implementation

Status: pending.

- implement only approved motion;
- support `prefers-reduced-motion`;
- avoid decorative stagger spam, universal hover scaling, long blocking entrances, and scroll hijacking;
- run `review-animations` and `improve-animations`;
- correct all critical motion findings.

### M8 — Full QA and visual regression

Status: pending.

- Playwright interaction suite passes;
- accessibility automation passes with documented exceptions only;
- manual keyboard and screen-reader-oriented review;
- Chrome, Safari/WebKit, and Firefox review;
- desktop, tablet, and mobile visual review;
- performance and asset audit;
- establish stable visual-regression baselines in a controlled environment;
- no console errors or unexpected network failures.
- run Lighthouse performance, SEO, and accessibility tasks separately;
- perform an ordinary human-readable code review in addition to automated checks.

### M9 — Product completion

Status: pending.

- Typeform integration when account and redirect decisions are approved;
- required legal and audience routes;
- SEO metadata, sitemap, robots, structured data where applicable;
- analytics and consent only after explicit product decisions;
- production deployment configuration.

### M10 — Designer handoff

Status: pending.

The designer receives a public preview only after M8 blockers are resolved. The handoff includes supported breakpoints, motion behavior, known limitations, and a short decision log. Obvious alignment, hierarchy, overflow, interaction, accessibility, or console defects must not be deferred to the designer.

## Plan-change protocol

Every change to scope, sequence, tool status, or authority must be added below before implementation.

Required entry format:

```text
YYYY-MM-DD — Decision
Reason:
Affected milestones:
Approved by Kirill: yes/no
```

## Decision log

### 2026-08-20 — Canonical execution plan created

Reason: previous tool and sequencing decisions were lost when conversation context was compacted, causing approved tools to be omitted from a later plan.
Affected milestones: all remaining milestones.
Approved by Kirill: requested; repository placement still pending.

### 2026-08-20 — Original tool sequence restored

Reason: Kirill recovered the previously agreed sequence that was missing after chat compaction: no proxy/external memory and compact `CLAUDE.md` at startup; Taste Skill after the first concept; `emil-design-eng` then `review-animations` during motion; Playwright, TypeScript LSP, ordinary code review, and separate Lighthouse/SEO/accessibility tasks during QA.
Affected milestones: M0, M2, M3, M4, M6, M7, M8.
Approved by Kirill: yes.

### 2026-08-20 — Taste Skill audit variant selected

Reason: the current site is an existing Astro implementation, and the official Taste Skill repository describes `redesign-existing-projects` as the variant that audits an existing UI before fixing layout, spacing, hierarchy, and styling.
Affected milestones: M4 and M5.
Approved by Kirill: requested selection of the tools to install next; final audit recommendations still require separate approval.

### 2026-08-21 — Multilingual scope approved (ES / EN / RU)

Reason: the `es-AR`-only phase-one restriction in `PROJECT_DECISIONS.md` conflicted with the brief's Part V, which already regulates ES/EN/RU with `/`, `/en/`, `/ru/`, `hreflang` and a language switcher. Kirill approved restoring multilingual scope and making it a composition constraint rather than a later translation task, so that no layout is accepted that only holds together in Spanish.
Affected milestones: M0, M2, new M2.5, M3, M4, M5, M8, M9, M10.
Approved by Kirill: yes.

### 2026-08-21 — Visual acceptance gate moved

Reason: `c5171d2` was reviewed only as a technical baseline, and the page must now be redesigned against three locales. Accepting its visuals now would freeze a Spanish-only composition.
Affected milestones: M2, M5, M8, M10.
Approved by Kirill: yes.

### 2026-08-23 — Two-track release strategy and multilingual long-survey beta decision

Reason: Kirill wants a stable multilingual (`es-AR`/`en`/`ru`) public beta ready for controlled advertising traffic ahead of the full-quality composition and QA work in M4–M10. Kirill explicitly approved this scope and sequence change: a new bounded milestone `M3.5 — Expedited public-beta stabilization and release gate` is inserted before M4, with one approximately three-hour implementation session after the documentation commit is accepted. The long research Typeform survey becomes the only Typeform destination exposed by the beta, now intended for ES, EN, and RU with separate public URLs (an approved multilingual expansion of the earlier Spanish-only survey rule), while the short Socios Fundadores lead/price form, founding-price reveal, and `/gracias` flow are excluded from the beta and remain deferred to M9. **[Superseded 2026-08-23 by M3.5.1: the beta has two flows. A short pilot-interest form is the primary conversion; the research survey is secondary. Only the founding-price reveal and `/gracias` remain deferred.]** No beta payments are accepted. Full details, including the legal/publish gates, the preserved Fable budget, the Refero status, and the future bounded Claude/Codex workflow direction, are recorded in `PROJECT_DECISIONS.md`, "Release strategy (2026-08-23)".
Affected milestones: new M3.5 inserted before M4; M4–M10 preserved unchanged and remain pending; tool registry freeze reaffirmed, not lifted.
Approved by Kirill: yes.

### 2026-08-23 — Codex review corrections to expedited-beta documentation

Reason: Codex independently reviewed remote commit `53a0ae3` and accepted the overall two-track strategy, but required three corrections: (1) removing any implication that the mandatory `/privacidad`, `/terminos`, `/cookies` routes could be skipped via an "approved legal fallback" or a generic separate exclusion — only S7 may receive a separately approved beta exclusion; (2) correcting the TypeScript language-service status so M3.5 does not claim it as already installed/accepted when its registry entry still requires verification; (3) recording the newly verified ES and RU Typeform survey URLs while leaving EN correctly marked pending.
Affected milestones: M3.5 (legal/publish gate wording and beta-form Typeform status only; scope and budget unchanged).
Approved by Kirill: yes.

### 2026-08-23 — M3.5 implemented: settled locale survey routing, deferred path removed

Reason: Kirill settled the two open beta-form questions. (1) The Russian public Typeform introduction now states approximately 3 minutes, so the previous 2/3/5-minute readiness blocker is removed; Typeform's automatic 2-minute UI estimate is recorded as a non-blocking external display detail, not a launch blocker. (2) No separate English Typeform will be created for the expedited beta, so `/en/` temporarily uses the Spanish survey `ARGCABA` as an explicit compromise, disclosed honestly in the English UI, with a dedicated EN URL recorded as official-release debt. M3.5 was then implemented as one bounded stabilization pass: locale-aware survey routing isolated in `src/config/typeform.ts` and `TypeformBoundary.astro`; the short Socios Fundadores form, its price-reveal CTA and the `/gracias` redirect removed from the source rather than disabled; FAQ-03 corrected so it no longer promises a price reveal for a submission flow that does not exist; footer entries for unbuilt routes rendered as pending text so the candidate has no clickable 404, with no legal copy invented; and a brief-S1 defect fixed where the hero primary CTA sat below the fold at 375×667 in all three locales. Legal and strategic-SEO answers did not block candidate assembly, build, test or visual audit, and remain real public-deployment gates.
Affected milestones: M3.5 (implementation complete, pending review). M4–M10 unchanged and still pending. Tool registry freeze unchanged — no dependency, skill, plugin or tool was installed.
Approved by Kirill: yes.

### 2026-08-23 — M3.5.1: two-flow beta conversion prepared, areas and planned-service wording corrected

Reason: the real pilot-interest Typeform is being created concurrently, so the whole integration was built now against safe non-link pending placeholders rather than waiting. The beta gains a second, primary flow — a short non-binding pilot-interest form that reveals no price, takes no payment, reserves nothing and creates no contract — alongside the existing research survey. Kirill also approved the nine-area beta set (alphabetized, unnumbered, under evaluation), the owner/controller details, the processor list, the no-browser-tracking rule, the Spanish-only legal direction, and the pending WhatsApp number. Two real defects were found and fixed while implementing the new CTA wording: the longer pilot label wrapped in English and Russian at 375px, pushing the rendered header to 74px against a declared `--header-h` of 64px, and the header wordmark was being flex-squashed from 107px to 98px in English.
Affected milestones: M3.5.1 added after M3.5 (implementation complete, pending review). M4–M10 unchanged and still pending. Tool registry freeze unchanged — no dependency, skill, plugin or tool was installed.
Approved by Kirill: yes.
