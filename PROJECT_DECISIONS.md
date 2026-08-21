# CLAVERA Landing — Current Project Decisions

Last updated: 2026-08-21

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
