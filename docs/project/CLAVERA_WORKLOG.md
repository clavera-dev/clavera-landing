# CLAVERA Landing — Worklog

This is the current-state companion to `CLAVERA_EXECUTION_PLAN.md`. Update it after every accepted milestone, tool decision, scope change, blocker, or branch change. New chats must read the latest entry before planning work.

## 2026-08-23 — M3.5.1 beta-conversion preparation (pending review; not accepted, not deployed)

A bounded correction pass on top of M3.5, on `landing-design`. **Implementation complete, pending independent Codex remote-commit review and Kirill's visual review.** Not acceptance, not visual approval, not legal or lawyer approval, not product approval, not advertising readiness, not deployment. No dependency, skill, plugin or tool was installed; no Cloudflare or hosting setting was touched; M4–M10 remain pending and unstarted.

### Two beta Typeform flows

The beta now has **two** flows, replacing M3.5's single-destination rule:

1. **Pilot interest — primary conversion.** A new short, non-binding form for collecting contact details from people interested in the pilot. It is **not** the old founding-price flow: no monetary price, no payment/deposit/`seña`, no space reserved, no membership or contract, no promise of admission, no `/gracias` redirect. Typeform's native ending is used after submission.
2. **Research survey — secondary.** Unchanged in S13: ES `ARGCABA`, RU `latam`, EN `ARGCABA` with the visible Spanish-language disclosure, three-minute wording, and bare URLs with nothing appended.

### Safe pending configuration

`src/config/typeform.ts` now holds two explicit, total mappings: `RESEARCH_SURVEY_DESTINATIONS` (live) and `PILOT_INTEREST_DESTINATIONS` (`es: null, en: null, ru: null`), typed `PendingDestination = SurveyDestination | null`, with **no locale fallback**.

The pilot component is fully implemented now. A configured destination renders an ordinary same-tab link with the live label; `null` renders localized plain, non-interactive text — never an anchor, a button, a disabled control, `href="#"`, an empty href, or a placeholder domain. **No `example.com` or other clickable fake URL exists anywhere.** Activation requires changing only the three values in the central config; this was verified by temporarily configuring Spanish, rebuilding, confirming it rendered `…/pilotoar?lang=es&source=landing` while English and Russian independently stayed pending, then reverting. **No placeholder URL is recorded in any durable document, and the temporary `null` values are not real URLs.**

Attribution is prepared but bounded: only `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `lang`, `source` and `landing_version` may ever be appended, and only to the pilot flow. Arbitrary parameters are never forwarded and no personal datum ever enters a URL. Values are build-time only — forwarding a visitor's own `utm_*` would require client-side JavaScript, so it is deliberately not implemented and **the site still ships zero client JavaScript**.

### CTA hierarchy and copy

- Header and hero keep their internal `#fundadores` link but now read ES `Me interesa el piloto`, EN `I’m interested in the pilot`, RU `Мне интересен пилот` — interest wording, not reservation wording.
- The Founders section keeps the approved offer unchanged: 40 places, 20% off the list price, 24 months guaranteed, month to month, no `garantía`, **no monetary price**. Its explanation now states in all three locales that this is a preliminary expression of interest, reserves no space, creates no contract, accepts no payment, and that CLAVERA may contact the respondent later about the pilot.
- Live pilot labels once URLs exist: ES `Quiero participar`, EN `Join the pilot`, RU `Хочу участвовать`.
- S4 step 1 changed from reservation wording (`Reservá tu lugar` / `Reserve your space` / `Забронируй место`) to interest wording. The S10 note dropped its "leave your request" promise. Nothing else was recopywritten.

### Beta areas

The four-area set is replaced by the owner-approved nine: Almagro, Belgrano, Chacarita, Colegiales, Núñez, Palermo, Palermo Hollywood, Paternal, Villa Crespo — strictly alphabetical, original Spanish names in all three locales, never transliterated in Russian. `Recoleta` is gone. The `<ol>` with `01`–`04` markers became an unnumbered `<ul>`, removing any implied opening order or ranking, and the section carries the localized equivalent of `Barrios en evaluación. No implica compromiso de apertura, fecha ni disponibilidad.` No addresses, pins, dates, counters, confirmed locations or "first district".

Note: this set matches brief §S10 / §10.1. The stale brief §12.2 checklist line "`Belgrano` отсутствует" is inherited from v1.4 and is superseded by the brief's own v1.5 §10.1 restoration of Belgrano and Núñez, and by this decision.

### Planned-service wording

S3 and S6 gained one localized note each identifying cameras, access logging and identification as **planned properties of the future service**, since the surrounding present-tense copy could be read as describing an operating facility. The approved security boundary, the render disclosures and the S7 table are unchanged, and no new 24/7, insurance or guaranteed-security claim was introduced.

### WhatsApp

One centralized nullable value in `src/config/contact.ts`. While unset the footer renders localized plain text (`WhatsApp Business — próximamente.` / `— coming soon.` / `— скоро.`): no anchor, no `wa.me` URL, no `href="#"`, no dummy number, no disabled button.

### Legal routes

No legal content was created or finalized, and no routing structure was added — creating a route would publish a page, which is exactly what must not happen. The Spanish-only direction is recorded instead: legal pages will carry Spanish authority content only, and EN/RU will eventually link to those Spanish pages with an explicit Spanish-only notice. S7 is unchanged.

### Defects found and fixed

- **Header height.** The longer pilot CTA wrapped to two lines in English and Russian at 375px, making the rendered header 74px against a declared `--header-h` of 64px — the token hero padding, anchor offsets and sticky offsets are all derived from. Fixed by reducing the header control's inline padding below 700px and stepping the wordmark down to its intrinsic 20px height. No label was shortened, clipped or given a locale-specific offset.
- **Squashed wordmark.** The header logo had no `flex-shrink: 0`, so the flex row compressed it from 107px to 98px in English against a fixed height — a horizontally distorted mark. Fixed.

### Verification

- `git diff --check`: clean. `yarn astro check`: 56 files, 0 errors, 0 warnings, 0 hints. `yarn build`: 3 static pages, zero client JavaScript.
- Playwright across Chromium/Firefox/WebKit: **1053 passed, 0 failed, 60 skipped**, all skips justified — 24 breakpoint captures and 18 standard captures that only Chromium takes, 9 "configured pilot destination" assertions that skip precisely because the URLs are still pending (they run automatically once a URL is supplied), 6 English-only survey assertions skipped on ES/RU, and 3 skip-link reveal tests on WebKit.
- axe clean across three locales at 1440/768/375.
- Visual/responsive/interaction audit re-run for ES/EN/RU at 375×667, 375, 699, 700, 768, 999, 1000 and 1440: no horizontal overflow, header height matching the declared token at every width, hero CTA above the fold at 375×667, correct switcher behaviour either side of 700px, nine areas everywhere, the pilot boundary pending with zero controls, no `wa.me` link, and no console errors.
- Screenshot record: exactly **21** persisted diagnostic screenshots after a suite run — 9 standard and 12 breakpoint. They are gitignored and not committed.

### Review corrections applied 2026-08-23

- **Invalid test rule removed.** `tests/survey.spec.ts` forbade any URL containing `typeform.com/to/`. That is Typeform's ordinary responder path — the pending pilot form's own display URL has that shape — so the rule banned the product rather than the deferred flow. It is replaced by exact known legacy destinations (`/gracias`, `socios-fundadores`, `founding-price`, `precio-fundador`) plus semantic markers: the three localized price-reveal CTA labels M3.5 removed, matched with `textContent` so a label inside a collapsed `<details>` cannot slip through. A regression block proves a legitimate `/to/{FORM_ID}` URL is accepted, survives href building, and satisfies the destination contract.
- **A contradictory assertion was caught and removed.** The first draft of that regression block also asserted the pilot map was all-null. That would have failed the moment a real URL was supplied, meaning activation required editing a test — the opposite of the property being asserted. Verified empirically: with a synthetic `/to/AbCdEfGh` URL configured for Spanish only, the suite passed with **no test edits**, Spanish rendered an ordinary link, and English and Russian stayed pending independently. The synthetic URL was reverted; **no pilot URL is committed**, and the real RU form URL is deliberately absent from the repository while that form is unpublished and under external review.
- **Legal direction made unambiguous.** Beta legal content is Spanish-only. EN/RU link to the Spanish pages with an explicit Spanish-only notice and carry no legal translation. Every remaining EN/RU courtesy-translation requirement is marked superseded. The owner chose not to display `domicilio` or an RNBD number in the beta — a display decision that does **not** resolve the legal-sufficiency question or RNBD registration status, both of which remain unresolved pre-deployment checks. No legal text, approval or publication date is invented.
- **Playwright total corrected** from 1044 to **1053 passed / 0 failed / 60 skipped** — the figure for the M3.5.1 commit `6b96575`; the earlier number was recorded before that milestone's final run. This review-correction pass adds three regression tests and runs at **1062 passed / 0 failed / 60 skipped**.
- **Stale single-flow claims removed** from `tests/survey.spec.ts`, `tests/interaction.spec.ts`, `PROJECT_DECISIONS.md` and the execution plan. Historical dated entries carry a supersession marker instead of being rewritten.

### Still blocking real public deployment

Pilot-interest Typeform URLs · `/privacidad`, `/terminos`, `/cookies` (mandatory, unbuilt, awaiting approved Spanish authority text) · controller `domicilio` · RNBD registration/status · final publication date · S7 legal approval · Appendix В.2 / §S7 conflict · WhatsApp number · domain and Meta verification · Cloudflare access and deployment approval · Kirill's visual review · Codex's independent review of the remote commit. A dedicated EN research-survey URL is **full-release debt only**, not a beta deployment blocker.

## 2026-08-23 — M3.5 implemented (beta candidate; not accepted, not deployed)

M3.5 was implemented as one bounded stabilization pass on `landing-design`. This is **implementation complete, pending independent Codex remote-commit review and Kirill's visual review**. It is not acceptance, not visual approval, not legal approval, not product approval, not advertising readiness, and not deployment. No dependency, skill, plugin, MCP server or tool was installed; no Cloudflare or hosting setting was touched; M4–M10 remain pending and unstarted.

### Settled decisions implemented (approved by Kirill, 2026-08-23)

- **RU survey.** `https://claveraar.typeform.com/latam`. The public Russian introduction now states approximately 3 minutes, so it agrees with the site CTA. **The previous 2/3/5-minute readiness blocker is removed** — the obsolete 5-minute introduction is gone. Typeform's automatic UI estimate may still show 2 minutes; that is recorded honestly as a **non-blocking external display detail** outside our control, not a remaining launch blocker. The website continues to describe the survey as approximately 3 minutes.
- **EN survey.** **No separate English Typeform will be created for the expedited beta.** `/en/` temporarily uses the Spanish survey `https://claveraar.typeform.com/ARGCABA`. This is an explicit beta compromise. The English UI discloses that the survey is in Spanish; the destination is never labelled or described as an English survey. **Release debt: a dedicated EN public Typeform URL is required before the official full-quality release.**
- **ES survey.** `https://claveraar.typeform.com/ARGCABA`, unchanged.

### What changed in the source

- **Locale-aware survey routing**, isolated in `src/config/typeform.ts` (explicit, total `Record<Locale, SurveyDestination>` — no locale can silently inherit another's URL) and `src/components/lead-form/TypeformBoundary.astro`. Destinations are ordinary same-tab links that work without JavaScript; the page still ships zero client-side JS; no Typeform embed or SDK; no personal data in any URL.
- **English disclosure**: "The survey is in Spanish." rendered beside every survey link and wired to it with `aria-describedby`, so it is announced before the link is followed. ES and RU carry no such notice by construction.
- **Deferred conversion path removed, not disabled.** The short Socios Fundadores lead/price form, its `Ver mi precio de Socio Fundador` price-reveal CTA, and the `/gracias` redirect no longer exist in the source. Previously both Typeform controls rendered as **disabled buttons** because no URL was configured; the beta now exposes exactly one live destination and no disabled control anywhere.
- **FAQ-03 corrected in all three locales.** It previously promised "we show you the Founding Member price when you leave your details" — a submission-triggered price reveal for a flow the beta does not have. It now states that the price is not published yet and that registration opens later with no payment accepted. The canonical offer definition (20% below list, guaranteed 24 months, quarterly IPC/ICL) is preserved. Reason: `PROJECT_DECISIONS.md` outranks the brief here, and the approved founding-offer language may remain only where it does not imply a working short form or price reveal.
- **Footer interim treatment.** `/privacidad`, `/terminos`, `/cookies`, `/espacios` and `/desarrolladores` are not built, so those five entries render as plain text with a localized pending marker instead of anchors. The candidate now contains **no clickable link to a missing route** in any locale. Reversal is one line — add the path to `AVAILABLE_ROUTES` in `Footer.astro`. **No legal copy was invented.**
- **Brief S1 defect fixed.** The hero primary CTA was **below the fold at 375×667** in every locale — Spanish bottom at y=729 (62px over), Russian at y=790 (123px over), against a 667px viewport. The image band plus the mandatory render disclosure consumed 323px before the first word of copy. A short-viewport rule (`max-width: 599px and max-height: 700px`, all locales, no per-locale offsets) recovers the budget from the image band and vertical rhythm — not from copy: no text shortened, no body size reduced, the disclosure keeps its own line. Measured after fonts settle: ES/EN y=589, RU y=650.

### What was deliberately left alone

- **S7 is unchanged.** No copy, structure, or markup edit. Its written legal approval remains **outstanding**, and the Appendix В.2 / §S7 conflict with the canonical Spanish `cocheras` note remains **unresolved**. Absence of approval is never approval. A test now pins that the CLAVERA cost cell carries no currency figure.
- S4 step 1 (`Dejá tus datos…`) and the S10 zones note (`Dejá tu pedido…`) describe the product, not a beta conversion, and promise no price. They were left as approved brief copy and are flagged for Kirill rather than rewritten.
- Design system, tokens, section order, section IDs, R1–R6 mapping, the separate entrance/security image, the verbatim render disclosure, Tier-1 vocabulary rules, the `monTEK`/`Hamax` ban, the absence of 24/7 claims, and the exact insurance FAQ boundary are all untouched.

### Verification

- `git diff --check`: clean. `yarn astro check`: 53 files, 0 errors, 0 warnings, 0 hints. `yarn build`: 3 static pages, zero client JavaScript.
- Playwright across Chromium/Firefox/WebKit: **882 passed, 0 failed, 51 skipped**, all skips justified — 42 diagnostic captures that only Chromium takes, 6 English-only survey assertions skipped on ES/RU, and 3 skip-link reveal tests on WebKit, which excludes links from the default tab order.
- axe (`@axe-core/playwright`) clean across three locales at 1440/768/375. New low-emphasis text measured separately for contrast: 4.76–4.99:1 against a 4.5:1 requirement, all disclosure text ≥12px per brief S8.
- Terminology suite and its negative controls unchanged and green.
- 21 fresh **diagnostic** screenshots (not baselines) under `test-results/screenshots/`: 9 standard captures (3 locales × 1440/768/375) and 12 breakpoint captures in `m3-5-audit/` (3 locales × 699/700/999/1000px — the widths where header and navigation behaviour actually changes). **Correction (2026-08-23):** an earlier version of this entry also referred to a persisted `m3-5-inspect/` set. That directory was produced by an ad-hoc inspection script, not by the test suite, and does not persist as part of a run — exactly 21 diagnostic screenshots exist after the suite runs. Screenshots are gitignored and are not committed.
- Existing tests were not weakened. One obsolete test (`lead-capture controls stay inert while unconfigured`) was **superseded** by a stronger one asserting live links, the absence of the founders target, and no disabled control anywhere.
- `node_modules` in the working tree predated the M3 devDependencies, so `yarn install --frozen-lockfile` was run to restore the already-pinned contents. No dependency was added and `yarn.lock` is unchanged.

### Still blocking real public deployment

`/privacidad`, `/terminos`, `/cookies` (mandatory, unbuilt, awaiting approved Spanish legal authority copy) · S7 legal approval · Appendix В.2 / §S7 conflict · dedicated EN Typeform URL · domain and Meta verification · analytics and cookie consent · SPF/DKIM/DMARC · Cloudflare access and deployment approval · Kirill's visual review · Codex's independent review of the remote commit.

## 2026-08-23 — Codex review corrections for expedited beta documentation

Codex independently reviewed remote commit `53a0ae3f70641a1aac16f4fae6b672ee23bd58ef` (`docs: add expedited beta release track`). The overall two-track decision was accepted; three documentation corrections were required before M3.5 may begin. This entry and the corresponding edits to `PROJECT_DECISIONS.md` and `docs/project/CLAVERA_EXECUTION_PLAN.md` are the response. **No application source, Typeform configuration, installation, purchase, audit, or deployment changed.**

### Correction 1 — mandatory legal routes tightened

- `/privacidad`, `/terminos`, and `/cookies` are mandatory for the public beta, requiring approved Spanish authority copy, with EN/RU as courtesy translations stating only Spanish has legal validity. **[Superseded 2026-08-23 by M3.5.1: beta legal content is Spanish-only; EN/RU link to the Spanish pages with an explicit Spanish-only notice and carry no legal translation.]** There is no "approved legal fallback" for these routes: if their required content is not available, public deployment remains blocked, and removing footer links does not remove the underlying requirement once the beta sends users to Typeform and processes personal data.
- Of all the beta's legal/publish gates, **only S7** remains eligible for a separately approved beta exclusion, and only if its outstanding written legal approval is not received in time. Absence of S7 approval must never be treated as approval.
- No legal copy was created or invented in making this correction.

### Correction 2 — TypeScript LSP verification wording corrected

- The claim that M3.5 runs on tools "already installed and accepted" including the TypeScript language service was replaced. Frontend Design, Playwright, `@axe-core/playwright`, and Astro diagnostics are installed/currently available as already recorded in the tool registry. TypeScript language-service/LSP support remains approved but must still be verified during M3.5 rather than assumed, per its existing, unchanged registry entry. Astro diagnostics remain mandatory regardless of what that verification finds. The underlying tool decision is unchanged.

### Correction 3 — Typeform survey URL status recorded

- ES survey URL verified public: `https://claveraar.typeform.com/ARGCABA` — Spanish title and introduction; introduction and Typeform's own duration indicator both say approximately 3 minutes.
- RU survey URL verified public: `https://claveraar.typeform.com/latam` — Russian title and introduction; has an unresolved duration inconsistency (introduction ~5 minutes, Typeform indicator 2 minutes, current site CTA 3 minutes) that is an external Typeform/content readiness issue and must be normalized before public advertising.
- EN survey URL remains pending; `/en/` cannot be advertised as having a complete survey conversion path until it is supplied or Kirill makes another explicit decision.
- ES and RU are now known M3.5 inputs and are public responder URLs, not secrets. It is no longer accurate to say all three URLs are pending.

## 2026-08-23 — Two-track release strategy approved; M3.5 added as next milestone (documentation only)

Kirill approved an expedited public-beta track alongside the existing full-quality track. This entry records the decision. **No application source, test, configuration, dependency, skill, lock file, or asset changed. No audit ran. No tool was installed or purchased. No deployment occurred.** Only `PROJECT_DECISIONS.md`, `docs/project/CLAVERA_EXECUTION_PLAN.md`, and this worklog were edited.

### Two-track decision

- **Track A — expedited public beta**, via a new bounded milestone `M3.5 — Expedited public-beta stabilization and release gate`, inserted before M4. M3.5 is now the current next milestone.
- **Track B — full-quality release.** M4–M10 and the frozen tool registry are preserved unchanged and remain pending; the skill sequence already approved for M4+ (Taste, Refero, Impeccable, Emil Kowalski skills, Motion for JavaScript) is untouched.

### M3.5 scope

- Budget: one approximately three-hour implementation session, after this documentation commit is accepted.
- Starts from the existing ES/EN/RU site, the approved CLAVERA design system, approved R1–R6 assets, current multilingual copy, and the accepted M2.5/M3 test infrastructure.
- Fixes only high-impact visual, responsive, interaction, accessibility, routing, internal-link, asset-loading, metadata, console, survey-integration, hosting-readiness, and release blockers — no broad redesign, reference-driven recomposition, motion work, slogan rewriting, design-system replacement, framework changes, speculative refactoring, or new dependency installation.
- Taste, Refero, Impeccable, the Emil Kowalski skills, Motion for JavaScript, and Fable do not run during M3.5.

### Beta form decision

- The long research Typeform survey becomes the only Typeform destination exposed by the beta, now intended for ES, EN, and RU, each with its own public URL — an approved multilingual expansion of the earlier Spanish-only survey rule. **[Superseded 2026-08-23 by M3.5.1: the beta has two flows — the short pilot-interest form is the primary conversion and the research survey is secondary.]** At the time of this entry all three URLs were still pending; see the 2026-08-23 correction entry above this one for the ES and RU URLs subsequently verified and the EN URL still outstanding.
- The short Socios Fundadores lead/price form, the founding-price reveal, and the `/gracias` flow are excluded from the beta and remain deferred to the full product-completion track (M9) unless Kirill later removes the short form from the full roadmap explicitly.
- The beta accepts no payment, deposit, `seña`, or membership contract.

### Legal, S7, route, survey, hosting, and review gates (all still open)

- `/privacidad`, `/terminos`, `/cookies` are mandatory routes for the public beta and are not currently implemented; final Spanish legal content is pending external/legal input; EN/RU are courtesy translations of the approved Spanish authority stating only ES has legal validity. **[Superseded 2026-08-23 by M3.5.1: Spanish-only legal content; EN/RU link to the Spanish pages with an explicit Spanish-only notice.]** See the 2026-08-23 correction entry above for the tightened rule: there is no approved fallback for these routes, and public deployment stays blocked without their required content.
- Of the beta's legal/publish gates, only S7 may receive a separately approved beta exclusion. The S7 written legal approval remains outstanding (unchanged from the 2026-08-21 entries below). The Appendix В.2 / §S7 conflict with the canonical Spanish `cocheras` note remains unresolved. If S7 approval is not received before beta launch, S7 requires a separate approved exclusion decision — absence of approval is never treated as approval.
- Footer links to routes that do not yet exist must not remain broken in a public beta; the implementation choice is deferred to M3.5.
- Cloudflare access is expected later but was not available to this documentation task; no deployment is authorized here.
- The beta cannot be claimed advertising-ready until the survey path, the mandatory legal pages, the S7 decision, internal-link integrity, QA gates, and hosting readiness are all resolved. Public deployment requires a later, separate, explicit approval after Codex review and Kirill's own visual check.

### Preserved decisions carried forward unimplemented

- **Fable budget:** available balance 1,000 credits (≈ USD 100); target project spend ≤ 500 credits (≈ USD 50); at least 500 credits preserved unless Kirill explicitly approves otherwise; Fable excluded from M3.5 and from automatic correction loops; reserved for a small number of separately approved high-value visual/architectural synthesis or final-audit tasks, primarily around M4/M5 and possibly M8; no Fable invocation authorized by this commit. Local Claude Code observed at version 2.1.92 and needs an upgrade before future Fable CLI use — not performed here.
- **Refero status:** Kirill does not currently have Refero Pro; Refero MCP is not connected and is not a beta blocker; official pricing observed was USD 17 month-to-month or USD 120 billed annually; if the business owner approves it, the preferred option is one month only; no annual purchase, connection, account action, or installation approved here; Refero remains conditional M4 research tooling.
- **Future bounded Claude/Codex workflow (approved direction, not implemented infrastructure):** Claude is the only implementation writer; Codex is the independent reviewer; they never write concurrently to the same worktree; work runs in a bounded isolated branch/worktree; maximum two correction cycles per unattended run; no automatic merge to main, deployment, purchase, dependency installation, legal decision, product decision, or visual approval; Fable excluded from automatic loops; the workflow stops for Kirill at visual, legal, product, spending, and publishing gates; this automation harness is not implemented during M3.5.

Full detail is recorded in `PROJECT_DECISIONS.md`, "Release strategy (2026-08-23)", and `docs/project/CLAVERA_EXECUTION_PLAN.md`, the new M3.5 section and the 2026-08-23 decision-log entry.

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
