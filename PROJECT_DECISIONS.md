# CLAVERA Landing — Current Project Decisions

Last updated: 2026-09-29

**Owner response v1.2 (2026-09-27), received 2026-09-28:** `CLAVERA_Dev_Respuesta_v1_2.md` supersedes conflicting v1.1 details for e-bike batteries, evaluated amenities, zone search and zone-list status. The confirmed controller identity and omission of an unissued RNBD number remain as implemented. The S7 negative sentence is an explicit scoped exception to the terminology stop-list; 24/7 remains a planned property in the two already scoped locations. The former 40-place, −20%, 24-month founding offer is retired, including from future-release plans, until a separate approved assignment. Lawyer approval, RNBD launch status, Avisame URL and WhatsApp number remain release gates. No publication is authorized by this response.

This document contains the current approved decisions for the first production landing page.

**2026-09-28:** the owner handoff `CLAVERA_Dev_Handoff_Beta_v1_1.md` (v1.1, dated 2026-09-23) supersedes specifically conflicting older decisions for the proposed beta work. See "Owner handoff v1.1 reconciliation (2026-09-28)" at the end of this document. Older text is preserved and marked superseded where it occurs.

**WhatsApp Business short link supplied (2026-09-29):** the owner supplied the exact wa.me/message short link `https://wa.me/message/VWLBN6XDY6ZHP1`, now configured as `WHATSAPP_LINK` in `src/config/contact.ts` and rendered as a footer anchor on every locale. It has **not been verified by clicking it**. This is a WhatsApp Business short link, not a phone number: `WHATSAPP_NUMBER` stays `null` and is never fabricated from the link. The RNBD registration number is reportedly being obtained by the owner but has not been supplied, and is not invented or displayed anywhere. This local, isolated change does not lift the lawyer-approval, RNBD, Avisame-URL, or publication-approval gates recorded elsewhere in this document.

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

**Superseded for the beta on 2026-09-28** (handoff v1.1 §0.2, B4): every founding-offer number — 40 places, −20 %, 24 months, the discount sentence and the price-calculation/indexation line — is removed from the public beta. Whether the founding offer survives into the full-release track (M9) is an open owner question; see the reconciliation table.

Do not display a monetary price on the landing page.

Do not claim 24/7 availability. Operating-hour wording can be added later when confirmed.

**Superseded on 2026-09-28** (handoff v1.1 §0.3, §3.1, B5, §6.2): 24/7 access is now stated as a *planned* property, only in S3 pillar 02 (which carries the planned-service note) and in the new FAQ on access hours. It must never appear in meta, title or hero.

Initial areas:

**Superseded on 2026-08-23** by the owner-approved nine-area beta set below. The earlier four-area list (Palermo, Chacarita, Villa Crespo, Recoleta) no longer applies; `Recoleta` is not part of the approved set.

## Beta areas (2026-08-23)

**Superseded on the page on 2026-09-28** (handoff v1.1 §0.4, §3.2): the area list is removed from S10 and replaced by a zone selector (hero and S10). The selector's draft zone list is **provisional, pending Anna's verification**; it is not an approved final set. The no-numbering, no-ranking, no-address/pin/date/counter and untransliterated-name rules below still apply to the selector. Historical record follows.

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

### Limited typography delegation (2026-09-29, M5.1)

The owner delegated small, reversible typography and letter-case decisions inside the approved token scale, so they can be made without interrupting him. The delegation does not cover new token sizes, brand or token replacement, images, legal text, claims, form destination, zone data or payment behaviour. Each delegated change must be recorded with before/after values and checked visually against the tagged baseline `baseline/clavera-before-m5-2026-09-29`. First use: M5.1 T1, where the S2 statement uses `--fluid-display` with a maximum of 72 px (the spec's default). T2 (mono uppercase scope) is deferred and stays as built.

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
- ~~EN/RU versions are courtesy translations of that approved Spanish authority, and each must state that only the Spanish version has legal validity.~~ **Superseded 2026-08-23 (M3.5.1):** beta legal content is **Spanish-only**. No English or Russian translation of the legal pages will be produced for the beta. `/en/` and `/ru/` link to the Spanish legal pages, accompanied by an explicit Spanish-only notice. See "Legal content direction (2026-08-23, M3.5.1)" below.
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
- The deferred beta conversion path is removed, not merely disabled: the founding-price reveal CTA and the `/gracias` redirect no longer exist in the source. At M3.5 the long research survey was the only Typeform destination exposed; **M3.5.1 added the short pilot-interest form as the primary flow**, so the beta now has two. The deferred flow that stays removed is the *founding-price* one, not short forms in general.
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

**Superseded in part on 2026-09-28** (handoff v1.1 B4, §4.2, §6.6): the pilot form is now the short "Avisame" form, labelled ES `Avisame` · EN `Notify me` · RU `Сообщить мне`. While its URL is absent it is **not shown at all** — no control and no "en preparación" text (B4 removes that line) — and the research survey becomes the primary action of the renamed "Sumate al piloto" block. The Founders offer figures described below are removed from the beta. Research-survey links now carry the §4.1 fragment attribution instead of bare URLs. Historical text follows.

Live CTA labels for the pilot form, used once its URLs exist: ES `Quiero participar`, EN `Join the pilot`, RU `Хочу участвовать`. Header and hero continue to link internally to `#fundadores` and now read ES `Me interesa el piloto`, EN `I’m interested in the pilot`, RU `Мне интересен пилот` — interest wording, not reservation wording.

The Founders section keeps the approved offer unchanged: 40 places, 20% off the list price, guaranteed 24 months, month to month, no `garantía`, and **no monetary price**. Its adjacent explanation states in every locale that this is a preliminary expression of interest, that it reserves no space, creates no contract, accepts no payment, and that CLAVERA may contact the respondent later about the pilot.

**The pilot-interest URLs are pending external input and are not live.** They are held as `null` per locale in `src/config/typeform.ts` (`PILOT_INTEREST_DESTINATIONS`), with no locale fallback. While a locale is `null` the UI renders localized plain, non-interactive text — never an anchor, a button, a disabled control, `href="#"`, an empty href, or a placeholder domain. **No placeholder URL values are recorded in this document or any other durable document, and temporary `null` values are not real URLs.**

Attribution: only an explicit allowlist of non-personal parameters may ever be appended — `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `lang`, `source`, `landing_version`. Arbitrary query parameters are never forwarded, and no name, email, phone or other personal datum ever appears in a URL. Values are applied at build time only; forwarding a visitor's own incoming `utm_*` would require client-side JavaScript, so it is deliberately not implemented and the site still ships **zero client JavaScript**. *(Superseded 2026-09-28: the zone selector ships one small first-party script, and research links now carry the handoff §4.1 fragment attribution — reconciliation row 10. Visitor `utm_*` forwarding is still not implemented.)*

### Legal content direction (2026-08-23, M3.5.1)

Approved by Kirill. This supersedes the earlier EN/RU courtesy-translation requirement wherever it still appears in this repository.

**Superseded on 2026-09-28** (handoff v1.1 header rule, B1, §5): legal pages are required in **three locales, one date**, with Spanish (`es-AR`) as the **sole legally valid** version and EN/RU as courtesy translations derived from it. The controller `domicilio` (`Aráoz 2686, CABA`, no floor or unit) is now supplied for publication; the RNBD number is still absent and must not be published until received. ~~The legal pages remain blocked because the cited Spec is unavailable.~~ The confirmed Spec and prepared pages are recorded in the second-pass correction below; lawyer sign-off and publication data remain open. Historical text follows.

- **Beta legal content is Spanish-only.** `/privacidad`, `/terminos` and `/cookies` will carry approved Spanish authority content and nothing else. No English or Russian version of the legal text is produced for the beta.
- **EN and RU link to the Spanish pages**, accompanied by an explicit notice that the legal content is available in Spanish only and that the Spanish version is the only one with legal validity. They do not carry their own legal text, courtesy translation or summary.
- **The owner chose not to display `domicilio` or an RNBD registration number in the beta.** This is a display decision only.
- **It does not resolve the underlying legal-sufficiency question.** Whether the beta may lawfully publish and collect personal data without displaying a `domicilio`, and what RNBD registration status is required, remain **unresolved pre-deployment checks**. Choosing not to display these fields is not a finding that they are unnecessary, and nothing here is legal advice, legal approval, or confirmation of sufficiency.
- No legal text, `domicilio`, RNBD number, approval or publication date is invented or recorded anywhere in this repository.

### Owner decisions recorded 2026-08-23

**Partly superseded on 2026-09-28** by handoff v1.1 — cameras/`vigilancia` removed rather than marked planned (B5); `domicilio` now supplied (B1/B2); legal pages in three locales (B1); processors list extended by the §5 channels patch (Facebook/TikTok messages handled on-platform). See the reconciliation table.

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

**Superseded in part on 2026-09-28** (handoff v1.1 §3.5): the cleaning zone is no longer a planned feature — pillar 08 and the R3 render are removed from the page, and lockers plus a cleaning space are "under evaluation". R3's optimized derivatives stay in the repository, unreferenced, so reinstating it is a one-line change; they are not deleted. R4 (lockers) stays on the page with its caption, as the handoff instructs, even though lockers are now "under evaluation" — see the reconciliation table.

Do not use the brand names `monTEK` or `Hamax` in public-facing copy, metadata, captions, alt text, filenames introduced by the website implementation, or accessibility descriptions. Use generic product descriptions instead.

The final R1–R6 set is integrated. The approved master PNG files are retained outside this repository and outside the public production bundle; the website uses optimized AVIF and WebP derivatives generated from those approved masters. The older entrance render remains a separate access/security image and is not R3.

## Owner handoff v1.1 reconciliation (2026-09-28)

Source: `CLAVERA_Dev_Handoff_Beta_v1_1.md`, version 1.1, dated 2026-09-23, authored on the basis of the legal Spec v3.0, the v3.1 "Canales de contacto" patch (handoff §5) and Anna's decisions of 2026-09-23. It was supplied from outside the repository (the owner's Downloads folder) and is not committed. Implementation was requested on 2026-09-28 on branch `codex/clavera-beta-handoff-v1-1`. Where the handoff conflicts with an older decision in this document, **the handoff wins for the beta**; the older text above is kept and marked superseded. Where the handoff is internally inconsistent, or depends on a source that is not available, the item is **blocked** and recorded here. Nothing here is legal approval.

**Correction (2026-09-28, second pass).** The first pass above stated that the legal Spec was absent from the repository and from the owner's Downloads folder, and that the file `docs/project/CLAVERA_Legal_Spec_v3_0_received.md` was unverified and unusable. That was wrong. The owner confirmed, and this pass verified by direct file read, that `docs/project/CLAVERA_Legal_Spec_v3_0_received.md` is byte-identical to `/Users/k/Downloads/CLAVERA Legal Spec v3 0 para desarrollador.md` — both hash to SHA-256 `fe70ffb2d724c0f98b31f5be135ad96cdf4ad6aad746f50a0a5d70a89ae232cc`. It is the Spec v3.0 the handoff cites (§2.2, §6.6, §7.1, §7.2, §11), copied into the repository by the parent task, not an unexplained or concurrently-written file. The original two paragraphs are kept below, struck through in spirit but left as prose (not deleted) so the record of the earlier mistaken caution is not erased; they no longer reflect the current state.

~~**Legal Spec availability.** `CLAVERA_Legal_Spec_v3_0_para_desarrollador` (cited by the handoff for Spec §2.2, §4, §6.6, §7.1, §7.2 and §11) is not present in the repository. … It is treated as absent. No legal text is written from memory, from the handoff's §5 patch fragments, or by inference.~~

~~**Unverified file that appeared mid-session.** … Its provenance is unverified, and its appearance suggests another writer in this worktree while Claude was writing, which the Claude/Codex protocol forbids. It was not used, edited or deleted. The owner must confirm whether it is the authoritative Spec v3.0 before any legal page is built from it.~~

**Legal pages built from the confirmed Spec (2026-09-28, second pass).** `/privacidad`, `/terminos` and `/cookies` are now implemented in `es` (canonical, unprefixed), `en` and `ru` (courtesy translations), per Spec §2.2 (privacy, patched by handoff §5 points 2/4d/6 — the "Canales de contacto" update; point 7, cross-border transfer, is unchanged and keeps its number), §6.6 (terms) and §7.2 (cookies). Source: `src/content/legal/{privacy,terms,cookies}.ts`, rendered by `src/components/legal/LegalPage.astro`. Controller fields (Responsable, CUIT, domicilio) are filled from handoff B1, matching the footer formula already in `src/config/legal.ts`. Still withheld, per the Spec's own §11 placeholder list and the task's explicit instruction not to invent them: the RNBD registration number (omitted from the text entirely, not shown as a blank), and the publication date (`LEGAL_LAST_UPDATED` in `src/config/legal.ts` stays `null`; the page shows a localized "publication pending" line instead of a date until a real one is supplied — activation is that one config edit). Final Argentine-lawyer sign-off on the three texts and the owner's publication approval are **still outstanding** (Spec's own status note, §11; handoff §7) — building the pages is not that approval. The footer now links to all three pages on every locale (`AVAILABLE_ROUTES` in `Footer.astro` includes `privacidad`, `terminos`, `cookies`); `/espacios` and `/desarrolladores` remain pending text, unrelated to this change.

| # | Old decision (source) | New handoff clause | Impact | Status / blocker |
|---|---|---|---|---|
| 1 | Beta legal pages are **Spanish-only**; EN/RU link to them with a Spanish-only notice ("Legal content direction (2026-08-23, M3.5.1)") | Header rule: *ES is the only legally valid version; EN and RU derive from ES*. B1: `/privacidad`, `/terminos`, `/cookies` in **three languages, one date**; policy version `2026-09`; numbering of `/privacidad` unchanged, point 7 = cross-border transfer. §5 supplies EN/RU courtesy text only for the channels patch | Legal pages become three-locale; ES remains the sole authority; the Spanish-primacy clause appears on every locale | **Implemented (second pass, 2026-09-28).** All nine routes built (3 documents × es/en/ru) from the now-confirmed Spec §2.2/§6.6/§7.2, patched per §5. Point 7 of `/privacidad` is cross-border transfer in every locale, pinned by `tests/legal.spec.ts`. EN/RU carry a courtesy notice linking back to the ES original; the footer links to all three on every locale. Live-exposure risk resolved: `https://clavera.ar/privacidad` now resolves and its point 7 is the cross-border section the live Typeform cites. Still outstanding: lawyer sign-off, the real publication date, and the RNBD number (see the new note above the table) |
| 2 | Owner chose **not to display** `domicilio` or an RNBD number; legal sufficiency unresolved ("Legal content direction"; "Owner decisions recorded 2026-08-23") | B1 table (Spec §11 placeholders): Responsable Anna Kazanova, CUIT 20-96380996-5, **domicilio `Aráoz 2686, CABA`** (no floor or unit), email `hola@clavera.ar`; RNBD: do not publish until received; WhatsApp not added to point 1 until linked. B2: verbatim footer formula plus the language clause, in Spanish on every locale | Controller formula and language clause rendered in the footer of all three locales, in Spanish, marked `lang="es-AR"` | **Implemented (footer only).** RNBD number absent — not published. Whether the beta may publish and collect data without RNBD registration remains an unresolved pre-deployment check; this is not a legal finding |
| 3 | Founding offer public without a price: 40 places, −20 %, 24 months, quarterly IPC/ICL ("Phase-one scope"; "Beta conversion architecture") | §0.2 and B4: remove the header chip `Socios fundadores · 40 lugares`, the 40 / −20 % / 24 figures, the discount sentence, the price-calculation and indexation line, and `Formulario de interés en preparación`; keep anchor `#fundadores`; new block "Sumate al piloto"; new FAQ price answer; header chip becomes `Sumate al piloto` | Founders section rewritten as "Sumate al piloto"; FAQ price answer replaced; no founding-offer number remains in the beta | **Implemented.** Open owner question: does the founding offer still exist for the full release (M9), or is it retired? |
| 4 | Pilot form `null` renders localized plain text `…en preparación`; label `Quiero participar` (M3.5.1; `CLAUDE.md`) | B4: primary button `Avisame` goes to a short form "made later; **URL delivered separately; until then do not show the button**. Until the form exists the survey becomes the primary button." §6.6: no Avisame button until the URL is supplied. §7 lists the URL as pending | `null` pilot destination renders **nothing** (no control, no pending text). Survey is the primary action of "Sumate al piloto". Once configured: `Avisame` primary plus `¿Tenés 3 minutos más?` and the survey as secondary. Activation still needs only the central config value | **Implemented.** Avisame URL **pending** (§7). `CLAUDE.md` was updated in the second pass (2026-09-28) to state the `null`-pilot carve-out explicitly, alongside the general `WHATSAPP_NUMBER`-style rule it used to state alone |
| 5 | **Do not claim 24/7** ("Phase-one scope"; `CLAUDE.md`; brief S1/S6 notes and §12.2 require landlord/consorcio confirmation and a `según el hub` footnote; Appendix В.4) | §0.3 and §3.1: **add** 24/7 to S3 pillar 02 and a new FAQ after "¿Qué es CLAVERA?", both framed as a planned property. B5: never in meta or hero. §6.2: 24/7 only in pillar 02 and the access-hours FAQ | Pillar 02 title and copy, and the new FAQ, in three locales; the terminology suite now pins 24/7 to those two places instead of banning it | **Implemented.** Residual owner/legal risk: the brief's condition (written landlord and consorcio confirmation, `según el hub` footnote) is not met by the handoff's "planned property" framing. `CLAUDE.md` was updated in the second pass (2026-09-28) to state the two-place exception instead of a blanket ban |
| 6 | **Nine beta areas**, alphabetical, under evaluation ("Beta areas (2026-08-23)") | §0.4 and §3.2: remove the area list and its caption/disclaimer; add a single-select, searchable, alphabetical zone selector in the hero and in S10, list held in one JSON config for all locales. Draft list of 29 barrios/sub-barrios plus `Otro barrio de CABA` and `Fuera de CABA` — "**draft, Anna is verifying**". §7: zone-list edits to follow from Anna | Selector implemented in hero and S10 from `src/config/candidate-zones.ts`, which is marked `provisional`. It is a data-only TypeScript module rather than a `.json` file, because the Playwright suite imports it through Node's ESM loader, where bare JSON imports are unreliable; it is still one config for all locales. Spanish names in every locale; no numbering, pins, dates or counters; no-commitment note under the S10 selector | **Implemented as a provisional candidate.** List and slugs are **pending Anna's verification** and are not an approved set. Open questions: (a) "strictly alphabetical" versus the draft putting `Otro barrio de CABA` and `Fuera de CABA` last — kept last, as in the draft; (b) whether those two catch-all labels should be translated in EN/RU — kept in Spanish, per the literal instruction; (c) slugs other than the four given examples are proposed, not supplied. "Search" is native `<select>` type-ahead only, with no free-text filter — see row 10 |
| 7 | Cameras, `vigilancia` and access logs are **planned** features ("Owner decisions recorded 2026-08-23"; M3.5.1 planned-service notes) | B5: remove cameras and surveillance from meta, hero, pillar 04, the security caption and the entrance alt text; replace the hero lede and meta description; remove "a minutos de tu casa". §3.4: new six-item security list in a fixed order | No camera, surveillance or "minutes from home" wording in any locale; the planned-service notes keep identification and access logging only | **Implemented.** The entrance render still visibly contains a camera; its alt text no longer names it, per B5 |
| 8 | E-bike: "no se cargan baterías dentro del hub" (brief S5/S6, FAQ 06) | B6: e-bikes and e-scooters are stored **with the battery removed**; batteries are neither stored nor charged. New FAQ question and answer | S5 note, the S6 list item and the FAQ replaced in three locales | **Implemented** |
| 9 | S7: ARS price anchor in the car-storage column; Spanish note `Valores de referencia de mercado para cocheras en CABA, agosto 2026.` as the one scoped `cocheras` exception; Tier-2 phrases only as exact column headers; written legal approval outstanding (release strategy; worklog 2026-08-21) | B3 (Spec §4): no prices. Column header `Cochera de auto (alternativa)` · `Car garage (alternative)` · `Автомобильная кочера (альтернатива)`; cost `Alquiler mensual, más garantía y comisión`; commitment `Habitualmente, contrato anual`; the market note removed; a **mandatory, uncollapsed line under the table** naming what CLAVERA is not. §6.1: zero matches for `ARS`, `$`, `%`, `estacionamiento`, `parking`, `garage`, `стоянк`…, *except* `cochera`/`кочера` in the "(alternativa)" column and the line under it | Price and note removed; headers and cells replaced; the mandatory line is the new `.comparison__note` in each locale; the old Spanish note exception is retired and replaced by one exact-sentence exception per locale, pinned to its element | **Implemented, with a recorded conflict.** The handoff is internally inconsistent: B3's mandated lines contain `estacionamiento` (ES), `garage`/`car park` (EN) and `стоянка` (RU), which §6.1 also lists as zero-match terms and which Appendix В.1 classes as Tier 1. B3 is the specific P0 text, so it ships verbatim, and each sentence is exempted only as its exact whole sentence. Needs owner/lawyer confirmation. **Written legal approval for S7 remains outstanding** |
| 10 | Research survey renders the **bare** accepted URLs; attribution is a query-string allowlist applied only to the pilot flow; `barrio` is listed as a personal datum that must never enter a URL; the site ships **zero client JavaScript** (M3.5.1 attribution; `src/config/typeform.ts`) | §4.1: every survey link carries **fragment** parameters — ES/EN `ARGCABA#recruitment_source=clavera_ar&campaign=site_es|site_en&consent_v=2026-09&survey_version=ARGCABA_ES_v2_0&language=es&candidate_zone=<slug>`; RU `latam#recruitment_source=clavera_ar&campaign=site_ru&candidate_zone=<slug>`; omit `candidate_zone` when no zone is chosen; never personal data in a URL (Spec §7.1). §3.2: `Seguir` passes the chosen zone | A separate fragment allowlist in `src/config/typeform.ts`; per-locale fragment values; `candidate_zone` only from config slugs, never free text. Moving a selection into a URL fragment needs **client JavaScript**: one small progressive-enhancement script ships with the selector. Without JavaScript the select stays hidden and `Seguir` still opens the survey, without a zone. The "zero client JavaScript" claim is corrected in the same change | **Implemented.** Flagged for review: (a) `candidate_zone` is a coarse, self-chosen, allowlisted area and the handoff mandates it, but the old rule classed `barrio` as personal and Spec §7.1 cannot be checked; (b) EN keeps its Spanish-survey disclosure, with `campaign=site_en` |
| 11 | R3 (self-service cleaning zone) is part of the approved R1–R6 set of planned features ("Approved final render set") | §3.5: remove pillar 08 `Zona de limpieza` and the `Zona de autolavado` render; lockers and a cleaning space become "Estamos evaluando…"; keep the lockers render with its caption; `Mantenimiento periódico` becomes `Limpieza periódica del espacio.` | R3 and pillar 08 removed from the page; R3 derivatives kept, unreferenced | **Implemented.** Minor tension: R4 still shows lockers as built while copy says lockers are under evaluation; the render disclosure covers it, but the owner should confirm |
| 12 | S9 "Para quién" first line combines lock and balcony; second line is e-bike/cargo (brief S9) | §3.6: "replace the first two lines" with the balcony line and the lock line; "the rest unchanged" | Implemented literally, so the e-bike/cargo line is no longer shown | **Implemented literally; confirm intent.** Restoring the e-bike/cargo line is a one-line change if the owner meant to split line 1 only |
| 13 | Remaining gates | §6 pre-deploy checklist; §7 items delivered later | — | **Open, updated second pass (2026-09-28):** the three legal routes are now built, so the Spec-availability blocker on row 1 is resolved; what remains for them is lawyer sign-off, a real publication date, and the RNBD number (see the note above the table). Also open: Avisame URL; WhatsApp Business number; Anna's zone-list verification; S7 written legal approval; the §6.1/B3 terminology conflict; the 24/7 condition in row 5; Codex independent review; Kirill's visual review; explicit deployment approval. `CLAUDE.md`'s stale lines (24/7, beta areas, pending-text rendering, cameras-as-planned, zero client JS, legal pages) were brought into line with the current implementation in this pass — see `CLAUDE.md`'s own diff, not a separate list here |

Items implemented directly from the handoff that do not conflict with an older decision: TikTok contact link (B2); hero lede and meta description (B5); S3 pillar 03/04 copy (B5, §3.5); FAQ `¿Dónde va a estar CLAVERA?` and the survey eyebrow/note wording that drops "primer hub" (§3.3); cancellation FAQ (§3.7); lockers/cleaning "Estamos evaluando" line (§3.5); header chip (B4).
