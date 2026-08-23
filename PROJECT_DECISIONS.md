# CLAVERA Landing — Current Project Decisions

Last updated: 2026-08-23

This document contains the current approved decisions for the first production landing page.

## Authority order

When project sources disagree, use this order:

1. `PROJECT_DECISIONS.md`
2. `docs/brief/CLAVERA_Site_TZ_v1_5.md`
3. `docs/design-system/`
4. Any previous prototype or legacy implementation

The previous prototype at `TheTomre/site` is reference material only. Do not copy its architecture, dependencies, configuration, or implementation.

## Phase-one scope

Build a production marketing landing page that can receive real advertising traffic.

The launch locales are Argentine Spanish (`es-AR`), English (`en`) and Russian (`ru`).

Superseded on 2026-08-21: the previous phase-one rule limited the launch to `es-AR` only and prohibited a language switcher. See "Multilingual scope (2026-08-21)" below. That earlier restriction no longer applies and the brief's Part V multilingual regulation is authoritative again.

The initial founding-member offer is limited to 40 places.

Approved offer:

`20% de descuento sobre el precio de lista, garantizado por 24 meses.`

Do not display a monetary price on the landing page.

Do not claim 24/7 availability. Operating-hour wording can be added later when confirmed.

Initial areas:

**Superseded on 2026-08-23** by the owner-approved nine-area beta set below. The earlier four-area list (Palermo, Chacarita, Villa Crespo, Recoleta) no longer applies; `Recoleta` is not part of the approved set.

## Beta areas (2026-08-23)

Approved by Kirill. Exactly these nine areas, presented strictly alphabetically:

- Almagro
- Belgrano
- Chacarita
- Colegiales
- Núñez
- Palermo
- Palermo Hollywood
- Paternal
- Villa Crespo

Rules:

- The same original Spanish names are used in ES, EN and RU. They are never translated or transliterated — `Chacarita`, never «Чакарита» (brief §5.3).
- **No numbering, ranking, ordering marker, or visual treatment that could imply an opening order or priority.** The list is an unordered list, alphabetized.
- Presented as areas under evaluation, carrying the localized equivalent of: `Barrios en evaluación. No implica compromiso de apertura, fecha ni disponibilidad.`
- No addresses, map pins, dates, application counters, confirmed locations, or a "first district".

This set matches the nine names already in brief §S10 / §10.1. The stale brief §12.2 content checklist line "`Belgrano` отсутствует" is inherited from v1.4 and is superseded by the brief's own v1.5 §10.1 restoration of Belgrano and Núñez, and by this decision.

## Multilingual scope (2026-08-21)

Approved by Kirill on 2026-08-21. This decision replaces the earlier `es-AR`-only phase-one restriction and restores the multilingual regulation already written in `docs/brief/CLAVERA_Site_TZ_v1_5.md` Part V.

### Routes

- `es-AR` at `/` — canonical, no locale prefix
- English at `/en/`
- Russian at `/ru/`

All three are statically rendered. No automatic browser-language redirect is permitted.

### Copy authority

Spanish (`es-AR`) remains the canonical product-copy authority. English and Russian are working translations that carry the same approved product meaning and the same legal constraints. Their wording may receive editorial refinement later; their meaning may not drift from the Spanish canon.

A translation may never weaken:

- approved product claims;
- forbidden Tier-1 vocabulary, which applies in every language (English `bike parking` and Russian `велопарковка` are prohibited exactly as `estacionamiento` is);
- the entity-protection rule — CLAVERA is never described as a `cochera`, garage or `estacionamiento` in any language;
- the generated-render disclosure, which is mandatory verbatim in every locale;
- the insurance constraint;
- the absence of operating-hour claims;
- the `monTEK` and `Hamax` brand-name prohibition.

### Design consequence

Multilingual support is a composition and responsive-design constraint, not a later translation task. Every subsequent design decision is reviewed against all three locales for word length, line wrapping, heading height, navigation width, CTA width, section height and mobile composition. Layout primitives must be direction-safe and must absorb translation expansion through intrinsic sizing rather than fixed heights, clipping, hidden content, reduced body text or locale-specific pixel offsets.

## Design authority

The supplied CLAVERA design system has been reviewed and approved by the project designer.

Treat its logo, colors, typography, spacing, radii, motion rules and general visual language as approved constraints for phase one.

The design-system README may describe some choices as hypotheses or unfinished proposals. That caveat is outdated for this project. The current supplied version is the approved visual baseline.

Do not redesign the brand or replace its tokens without explicit approval.

## Media

Use only approved production-ready assets.

If a required video or image is unfinished, use a clearly isolated placeholder. Do not attempt to repair or silently replace unfinished media.

Digitally generated project renders must include the required disclosure as accessible HTML text outside the bitmap.

## Technical stack

- Astro
- Static output
- Strict TypeScript
- Semantic HTML
- CSS based on the supplied design tokens
- Minimal client-side JavaScript
- React only when a component has a demonstrated need for React state or lifecycle
- Cloudflare hosting
- GitHub source control

Do not add:

- Next.js
- Express
- Firebase
- D1
- a custom backend
- a custom database
- Tailwind
- shadcn
- a general-purpose UI library
- SSR or on-demand rendering

Do not introduce a dependency without explaining why native HTML, CSS or TypeScript is insufficient.

## Lead capture

Superseded for the expedited beta only on 2026-08-23: see "Release strategy (2026-08-23)" below. The short Socios Fundadores lead/price form, the founding-price reveal, and the `/gracias` flow described in this section are excluded from the M3.5 public beta and remain deferred to the full-quality release track (M9). The rule below still governs the full product-completion track.

For the first release, lead capture uses a separate short Typeform form on the existing Typeform Plus account.

Typeform responses will be synchronized to Google Sheets.

After a successful submission, Typeform redirects the user to `/gracias`.

The existing long Bike Hub research survey remains a separate Typeform. It may be offered from `/gracias`.

The Typeform integration must be isolated in one component and one configuration location so it can later be replaced with a native form and Cloudflare endpoint without changing the rest of the landing page.

Do not expose personal information in URL parameters.

## Domains

Primary production domain:

`https://clavera.ar`

Secondary domain:

`https://clavera.com.ar`

The secondary domain should permanently redirect to the primary domain.

## Implementation principles

- Prefer readable code over clever abstractions.
- Keep the project understandable to a developer familiar with JavaScript, TypeScript, HTML, CSS and React but new to Astro.
- Do not create abstractions for hypothetical future requirements.
- Keep animation restrained and compliant with `prefers-reduced-motion`.
- Preserve semantic HTML, keyboard navigation and visible focus states.
- Optimize images, video, fonts and third-party scripts.
- The landing page must remain useful before JavaScript finishes loading.

## Release strategy (2026-08-23)

Approved by Kirill on 2026-08-23. This section adds a two-track release strategy on top of the existing phase-one scope. It does not erase any decision above; superseded beta-specific statements are marked inline where they occur.

### Two tracks

- **Track A — Expedited public beta.** The immediate priority is a stable multilingual (`es-AR`/`en`/`ru`) public beta suitable for controlled advertising traffic. Delivered by a new milestone `M3.5 — Expedited public-beta stabilization and release gate`, inserted before M4 in `docs/project/CLAVERA_EXECUTION_PLAN.md`. M3.5 gets one approximately three-hour implementation session after this documentation commit is accepted. It starts from the existing ES/EN/RU site, the approved CLAVERA design system, the approved R1–R6 assets, current multilingual copy, and the accepted test infrastructure. It fixes only high-impact visual, responsive, interaction, accessibility, routing, internal-link, asset-loading, metadata, console, survey-integration, hosting-readiness, and release blockers. It does **not** perform broad redesign, reference-driven recomposition, motion work, slogan rewriting, design-system replacement, framework changes, speculative refactoring, or new dependency installation. Taste, Refero, Impeccable, the Emil Kowalski skills, Motion for JavaScript, and Fable are not run during M3.5. Public deployment requires a later, separate, explicit approval after Codex review and Kirill's own visual check. The beta is not final visual acceptance, not legal approval, not product completion, and not completion of M4–M10.
- **Track B — Full-quality release.** M4–M10 and the frozen tool registry (`docs/project/CLAVERA_EXECUTION_PLAN.md`) are preserved unchanged and remain pending. After beta launch, work resumes with the Taste audit, reference research, composition specification, Impeccable, motion planning and implementation, full QA and visual regression, product completion, and designer handoff, in the existing milestone order. M4–M10 are not removed or renumbered.

### Beta form decision (supersedes the beta-only Socios Fundadores lead-capture assumption for M3.5)

- The short Socios Fundadores lead/price form is excluded from the expedited beta. The short form, the founding-price reveal, and the `/gracias` flow are not beta requirements.
- The long research Typeform survey becomes the **only** Typeform destination exposed by the beta.
- The long survey is now intended for ES, EN, and RU, each using its own public Typeform URL — an approved multilingual expansion of the earlier Spanish-only survey rule (brief §13, item 3).
- **Superseded 2026-08-23 (later same-day decision, approved by Kirill).** The three locale survey destinations are now settled and implemented in M3.5. These are public responder URLs, not secrets:
  - **ES** — `https://claveraar.typeform.com/ARGCABA`: verified public; Spanish title and introduction; introduction and Typeform's own duration estimate both say approximately 3 minutes.
  - **RU** — `https://claveraar.typeform.com/latam`: verified public; Russian title and introduction. **The previous 2/3/5-minute readiness blocker is removed.** The obsolete 5-minute introduction is gone and the public Russian introduction now states approximately 3 minutes, so it agrees with the website CTA. Typeform's automatic UI estimate may still display 2 minutes; that is recorded honestly as a **non-blocking external display detail** outside our control, not a remaining launch blocker. The website may continue to describe the survey as approximately 3 minutes.
  - **EN** — **no separate English Typeform will be created for the expedited beta.** `/en/` temporarily uses the Spanish survey `https://claveraar.typeform.com/ARGCABA`. This is an explicit beta compromise, not an English survey.
- **English survey-language disclosure is mandatory.** The English UI must clearly state that the survey is in Spanish, next to every survey link. The English destination must never be labelled or described as an English survey.
- **Release debt:** a dedicated EN public Typeform URL is required before the official full-quality release. The beta compromise above does not discharge it.
- The public beta must not expose a disabled, dead, placeholder, or undisclosed mismatched-locale survey CTA. With the disclosure in place, `/en/` has a working — if compromised — survey path.
- The short founding-member lead path remains deferred to the full product-completion track (M9) unless Kirill later removes it from the full roadmap explicitly.
- The beta accepts no payment, deposit, `seña`, or membership contract of any kind.

### Beta versus final-release distinction

The beta is a stabilization gate for controlled advertising traffic on the existing implementation. It is explicitly not: final visual acceptance (still gated at the composition pass after M4/M5), legal approval, product completion, or completion of M4–M10. Full-quality work resumes on Track B after beta launch.

### Legal and publishing gates

- `/privacidad`, `/terminos`, and `/cookies` are **mandatory** for the public beta. They are not optional and may not be replaced by a fallback of any kind. This applies with particular force to the beta because it sends users to an external Typeform and processes personal data.
- They require approved Spanish authority copy. Their final Spanish legal content is pending external/legal input, and this documentation task does not create or invent that legal copy.
- EN/RU versions are courtesy translations of that approved Spanish authority, and each must state that only the Spanish version has legal validity.
- If the required legal content is not available, public deployment remains blocked. There is no "approved legal fallback" for `/privacidad`, `/terminos`, or `/cookies` — removing the footer links does not remove the underlying requirement to have these routes when the beta collects personal data and links out to Typeform.
- Of all the beta's legal/publish gates, **only S7** may receive a separately approved beta exclusion, and only if written legal approval for S7 is not received in time. Absence of S7 approval must never be treated as approval.
- Written legal approval for the S7 comparison table (brief §S7 note 2) remains outstanding, unchanged from the 2026-08-21 worklog entries.
- The Appendix В.2 / §S7 conflict with the canonical Spanish `cocheras` market-reference note (see `docs/project/CLAVERA_WORKLOG.md`, 2026-08-21) remains unresolved.
- Cloudflare access is expected later but was not available to this documentation task.
- No deployment is authorized by this documentation commit.
- The beta must not be claimed advertising-ready until the survey path, the mandatory legal pages, the S7 decision, internal-link integrity, QA gates, and hosting readiness are all resolved.

### M3.5 implementation status (2026-08-23)

**Partly superseded by M3.5.1 (see below):** M3.5 exposed the research survey as the *only* Typeform destination. The beta now has two flows — pilot interest (primary) and research survey (secondary). Everything else in this section still stands.

M3.5 is implemented on `landing-design`. What that does and does not mean:

**Implemented**

- Locale-aware survey routing, isolated in `src/config/typeform.ts` and `src/components/lead-form/TypeformBoundary.astro`: ES → `ARGCABA`, RU → `latam`, EN → `ARGCABA` (Spanish survey, beta only).
- The English UI discloses that the survey is in Spanish, beside every survey link, wired to the link with `aria-describedby`. ES and RU carry no such notice, because their survey matches the page language.
- The deferred beta conversion path is removed, not merely disabled: the short Socios Fundadores lead/price form, its price-reveal CTA, and the `/gracias` redirect no longer exist in the source. The long research survey is the only Typeform destination exposed.
- FAQ-03 no longer promises a price reveal in exchange for submitting details, because that flow does not exist in the beta. The canonical offer definition (20% below list, guaranteed 24 months) is preserved.
- Footer entries whose routes do not exist render as plain text with a localized "pending" marker instead of as links, so the candidate contains no clickable 404. No legal copy was invented.
- Brief S1 defect fixed: the hero primary call to action was below the fold at 375×667 in all three locales (Spanish 62px, Russian 123px). It now clears the fold in every locale.

**Explicitly not implied by M3.5 completion**

M3.5 completion means *implementation complete, pending Codex remote-commit review and Kirill visual review*. It is **not** acceptance, deployment, legal approval, product approval, advertising readiness, or finality.

- `/privacidad`, `/terminos`, `/cookies` remain **mandatory and unbuilt**. They still block real public deployment. Rendering them as pending text is a presentation choice for the candidate only and discharges nothing.
- S7 is **unchanged**, and its written legal approval remains **outstanding**. The Appendix В.2 / §S7 conflict with the canonical Spanish `cocheras` note remains unresolved. Absence of S7 approval is never approval.
- A dedicated EN public Typeform URL remains outstanding release debt.
- Domain, Meta verification, analytics, consent, SPF/DKIM/DMARC and the other publish gates are untouched and unresolved.
- Cloudflare/deployment is **not authorized**. No deployment, hosting change, or production setting was touched.
- M4–M10 remain pending and unstarted.

Legal and strategic-SEO answers did not block assembling, building, testing, or visually auditing the beta candidate — and they remain real public-deployment gates.

### M3.5.1 implementation status (2026-08-23)

M3.5.1 is implemented on `landing-design`: the beta-conversion architecture above is fully built, with the pilot-interest destinations held pending.

**Implemented**

- Two explicit, total locale mappings in `src/config/typeform.ts`: `RESEARCH_SURVEY_DESTINATIONS` (live, unchanged) and `PILOT_INTEREST_DESTINATIONS` (`null` for every locale), typed `PendingDestination = SurveyDestination | null`, with no fallback.
- The pilot boundary is fully implemented: a configured destination renders an ordinary same-tab link with the live label; `null` renders localized plain text. Activation requires changing only the three values in the central config — verified by temporarily configuring one locale, rebuilding, and confirming the other two stayed pending.
- Header and hero CTAs reworded to interest wording; the Founders section's primary external action is the pilot boundary; its explanation states the non-binding terms in all three locales.
- S4 step 1 and the S10 note corrected narrowly so they describe submitting interest rather than completing a reservation.
- The nine-area beta set, alphabetized, unnumbered, with the evaluation disclaimer.
- Planned-service notes added to S3 and S6 so cameras, access logging and identification read as planned properties of the future service.
- One centralized nullable WhatsApp value in `src/config/contact.ts`, rendered as plain text while unset.
- Two defects found and fixed: the longer pilot CTA wrapped in EN and RU at 375px, pushing the rendered header to 74px against a declared `--header-h` of 64px; and the header wordmark was being flex-squashed from 107px to 98px in EN.

**Not implied**

M3.5.1 completion means *implementation complete, pending Codex remote-commit review and Kirill visual review*. It is not acceptance, deployment, legal approval, lawyer approval, product approval, advertising readiness, or finality. S7 is unchanged. No legal page was created and no legal content was invented. No dependency was installed. No deployment or Cloudflare change was made. M4–M10 remain pending.

### Beta conversion architecture (2026-08-23, M3.5.1)

Approved by Kirill. The beta has **two separate Typeform flows**.

**1. Pilot interest — primary conversion.** A new short, non-binding form collecting contact details from people interested in the pilot. It is **not** the old founding-price flow. It must never: reveal a monetary price; accept payment, deposit or `seña`; reserve a space; create a membership or contract; promise admission to the pilot; or redirect to `/gracias`. Submission ends on Typeform's own native ending.

**2. Research survey — secondary.** The existing long research survey in S13, with its current URLs, three-minute wording and the English Spanish-language disclosure.

Live CTA labels for the pilot form, used once its URLs exist: ES `Quiero participar`, EN `Join the pilot`, RU `Хочу участвовать`. Header and hero continue to link internally to `#fundadores` and now read ES `Me interesa el piloto`, EN `I’m interested in the pilot`, RU `Мне интересен пилот` — interest wording, not reservation wording.

The Founders section keeps the approved offer unchanged: 40 places, 20% off the list price, guaranteed 24 months, month to month, no `garantía`, and **no monetary price**. Its adjacent explanation states in every locale that this is a preliminary expression of interest, that it reserves no space, creates no contract, accepts no payment, and that CLAVERA may contact the respondent later about the pilot.

**The pilot-interest URLs are pending external input and are not live.** They are held as `null` per locale in `src/config/typeform.ts` (`PILOT_INTEREST_DESTINATIONS`), with no locale fallback. While a locale is `null` the UI renders localized plain, non-interactive text — never an anchor, a button, a disabled control, `href="#"`, an empty href, or a placeholder domain. **No placeholder URL values are recorded in this document or any other durable document, and temporary `null` values are not real URLs.**

Attribution: only an explicit allowlist of non-personal parameters may ever be appended — `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `lang`, `source`, `landing_version`. Arbitrary query parameters are never forwarded, and no name, email, phone or other personal datum ever appears in a URL. Values are applied at build time only; forwarding a visitor's own incoming `utm_*` would require client-side JavaScript, so it is deliberately not implemented and the site still ships **zero client JavaScript**.

### Owner decisions recorded 2026-08-23

- **Responsable:** Kazanova Anna.
- **CUIT:** 20-96380996-5.
- **No payment, deposit, `seña` or reservation is accepted in the beta.**
- The founding offer remains public **without a monetary price**.
- **Cameras, `vigilancia` and access logs are planned features of the future service, not features of an operating location.** Public copy must not read as describing a facility already in operation.
- **Current processors/services:** Typeform, Google Workspace/Sheets, Cloudflare, and Meta **only** for WhatsApp Business and social communication.
- **Do not add Meta Pixel, GA4, or any browser tracking.**
- Future transfer of the personal-data database to a legal entity is **not** part of the beta decision.
- **Legal pages will use Spanish authority content only.** EN and RU will eventually link to those Spanish pages with an explicit Spanish-only notice, rather than carrying their own legal text.
- **WhatsApp number is still pending.** It is held as `null` in `src/config/contact.ts`; until it is supplied there is no WhatsApp anchor, no `wa.me` URL, no `href="#"`, no dummy number and no disabled button — only localized plain text.
- **A dedicated EN research-survey URL is official full-release debt only.** It is **not** a public-beta deployment blocker.

Unresolved external publish/legal items, none of which are approved or invented here: controller `domicilio`; RNBD registration and status; the final approved Spanish privacy, terms and cookies text; and the final publication date. No fake `domicilio`, RNBD number or placeholder legal policy is published, and no claim of legal, lawyer, advertising or deployment approval is made.

### Preserved tool and workflow decisions

- **Fable budget.** User-stated available balance: 1,000 credits (≈ USD 100). Target project spend: no more than 500 credits (≈ USD 50). At least 500 credits are preserved unless Kirill explicitly approves otherwise. Fable is excluded from M3.5 and from any automatic correction loop; it is reserved for a small number of separately approved high-value visual/architectural synthesis or final-audit tasks, primarily around M4/M5 and possibly M8. No Fable invocation is authorized by this documentation change. Local Claude Code was observed at version 2.1.92 and needs an upgrade before future Fable CLI use; that upgrade is not performed here.
- **Refero status.** Kirill does not currently have Refero Pro. Refero MCP is not connected and is not a beta blocker. Official pricing observed during research: USD 17 month-to-month or USD 120 billed annually. If the business owner approves it, the preferred option is one month only. No annual purchase, connection, account action, or installation is approved by this commit. Refero remains conditional M4 research tooling (see the frozen tool registry).
- **Future bounded Claude/Codex workflow (approved direction, not implemented infrastructure).** Claude is the only implementation writer; Codex is the independent reviewer; they never write concurrently to the same worktree. Work runs in a bounded, isolated branch/worktree, with a maximum of two correction cycles per unattended run. No automatic merge to main, deployment, purchase, dependency installation, legal decision, product decision, or visual approval. Fable is excluded from automatic loops. The workflow stops for Kirill at visual, legal, product, spending, and publishing gates. This automation harness is not implemented during M3.5.

## Approved final render set

The final CLAVERA R1–R6 render set delivered on 2026-08-19 is approved for production use and replaces the previous render descriptions in the project brief wherever they conflict.

Approved content:

- R1: general hub overview
- R2: vertical lifting bicycle storage systems
- R3: self-service bicycle cleaning zone
- R4: lockers and family storage module with space for a child bicycle seat
- R5: cargo and oversized bicycle storage
- R6: functional zoning scheme

All features shown in these renders are planned parts of the CLAVERA product and are not visual concepts only.

Do not use the brand names `monTEK` or `Hamax` in public-facing copy, metadata, captions, alt text, filenames introduced by the website implementation, or accessibility descriptions. Use generic product descriptions instead.

The final R1–R6 set is integrated. The approved master PNG files are retained outside this repository and outside the public production bundle; the website uses optimized AVIF and WebP derivatives generated from those approved masters. The older entrance render remains a separate access/security image and is not R3.
