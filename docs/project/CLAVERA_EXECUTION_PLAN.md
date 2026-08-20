# CLAVERA Landing — Execution Plan

Status date: 2026-08-20
Plan owner: Kirill
Working repository: `clavera-dev/clavera-landing`
Active delivery branch: `landing-design`

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
- Approved render set: R1-R6.
- Current visual-direction commit: `c04a89f7f57336efe538cc0f62677594e10268e5` (`feat: establish CLAVERA visual direction`).
- Latest precision commit: `c5171d2ec725f4e4c86985c2e0e71264d729bf2f` (`fix: refine landing geometry and visual alignment`).
- Precision commit technical review: diff check, Astro diagnostics, and production build pass; independent visual acceptance remains pending until Kirill's local check and the Playwright layer are available.
- Current Claude project plugin: Anthropic Frontend Design.
- Current Claude settings for visual-critical work: Opus, High, Auto.
- Repository instruction set: root `CLAUDE.md`, `docs/project/CLAVERA_EXECUTION_PLAN.md`, and `docs/project/CLAVERA_WORKLOG.md`. These three files are the durable project context established by the documentation milestone following `c5171d2`.

## Tool registry

### Registry freeze — 2026-08-20

The registry below is frozen for the current delivery cycle. Do not add another skill, plugin, MCP server, component catalog, workflow framework, or runtime library merely because it is recommended in a social post or tool list. A new candidate may be reconsidered only when a concrete uncovered need is recorded in this plan first.

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
Status: approved in the original project plan; installation pending.
Timing: now, after the first concept and its precision correction.
Constraint: audit only for the first use. It may not change the approved brand, public claims, Astro/Yarn/TypeScript stack, or add a runtime animation library without a separate approved decision. Findings must be presented before implementation.
Selected install variant: `redesign-existing-projects`. The project already has a visual implementation, and this variant is explicitly intended to audit an existing UI before proposing changes. Do not install the default experimental `design-taste-frontend` for this milestone.

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
Status: approved; installation pending.
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
Status: approved with Playwright.
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

Status: implementation complete at `c5171d2`; technical review passed; local visual acceptance pending.

Acceptance requirements:

- header declared height and rendered geometry agree;
- header logo, navigation, and CTA align optically;
- numbered section rail aligns consistently at 1440, 1280, 1100, 1024, 768, and 375 CSS pixels;
- section spacing follows a coherent rhythm;
- heading hierarchy is valid;
- no horizontal overflow;
- no obsolete render assets remain without a documented use;
- Astro check and production build pass.

### M3 — Test infrastructure

Status: pending.

- install Playwright and `@axe-core/playwright`;
- verify TypeScript LSP/editor diagnostics;
- add smoke tests for page load, anchors, CTA boundaries, FAQ, and keyboard navigation;
- check horizontal overflow at defined viewports;
- configure Chromium, Firefox, and WebKit where the environment supports them;
- capture diagnostic screenshots without yet treating them as approved visual baselines.

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
