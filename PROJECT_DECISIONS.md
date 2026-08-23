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

- Palermo
- Chacarita
- Villa Crespo
- Recoleta

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
- The three public survey URLs will be supplied separately before M3.5 implementation. This documentation commit does not invent or add URLs.
- The public beta must not expose a disabled, dead, placeholder, or mismatched-locale survey CTA. If one locale's URL is still missing at implementation time, that locale cannot be advertised as having a complete survey conversion path until Kirill makes a separate decision.
- The short founding-member lead path remains deferred to the full product-completion track (M9) unless Kirill later removes it from the full roadmap explicitly.
- The beta accepts no payment, deposit, `seña`, or membership contract of any kind.

### Beta versus final-release distinction

The beta is a stabilization gate for controlled advertising traffic on the existing implementation. It is explicitly not: final visual acceptance (still gated at the composition pass after M4/M5), legal approval, product completion, or completion of M4–M10. Full-quality work resumes on Track B after beta launch.

### Legal and publishing gates

- `/privacidad`, `/terminos`, and `/cookies` are required routes (brief B3, Part XI) and are not currently implemented.
- Their final Spanish legal content is pending external/legal input.
- EN/RU versions must be translations of the approved Spanish legal authority once it exists, and must state that only the Spanish version has legal validity.
- Written legal approval for the S7 comparison table (brief §S7 note 2) remains outstanding, unchanged from the 2026-08-21 worklog entries.
- The Appendix В.2 / §S7 conflict with the canonical Spanish `cocheras` market-reference note (see `docs/project/CLAVERA_WORKLOG.md`, 2026-08-21) remains unresolved.
- If S7 approval is not received before beta launch, S7 requires a separate approved exclusion decision; absence of approval must never be treated as approval.
- Footer links to routes that do not yet exist must not remain broken in a public beta; the implementation choice (build the route, or remove the link) is deferred to M3.5.
- Cloudflare access is expected later but was not available to this documentation task.
- No deployment is authorized by this documentation commit.
- The beta must not be claimed advertising-ready until the survey path, the legal pages (or an approved legal fallback), the S7 decision, internal-link integrity, QA gates, and hosting readiness are all resolved.

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
