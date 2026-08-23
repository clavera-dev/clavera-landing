# CLAVERA Landing — Claude Instructions

Read before every task, in this order:

1. `PROJECT_DECISIONS.md`
2. `docs/brief/CLAVERA_Site_TZ_v1_5.md`
3. `docs/design-system/`
4. `docs/project/CLAVERA_EXECUTION_PLAN.md`
5. the latest entry in `docs/project/CLAVERA_WORKLOG.md`

If sources conflict, the earlier item wins. Do not infer project state from chat history when the repository documents answer it.

## Product and content constraints

- The site ships three static locales: `es-AR` at `/`, `en` at `/en/`, `ru` at `/ru/`. `es-AR` is canonical and has no URL prefix.
- Rioplatense Spanish is the canonical product-copy authority. English and Russian are working translations that must carry the same approved meaning and the same legal constraints; wording may be refined editorially, meaning may not drift.
- Every locale is a required input to responsive-design review. Check word length, wrapping, heading height, navigation width, CTA width, section height and mobile composition in ES, EN and RU before calling a layout done.
- Absorb translation expansion with intrinsic sizing, `minmax()`, wrapping and real breakpoints. Never with fixed text-container heights, clipping, hidden content, body text below the approved size, or locale-specific pixel offsets.
- Do not add automatic browser-language redirects.
- Do not claim 24/7 availability.
- Do not use `monTEK` or `Hamax` in public copy, metadata, captions, alt text, filenames, or accessibility descriptions.
- Tier-1 forbidden vocabulary applies in every language. English `bike parking` and Russian `велопарковка` are prohibited exactly as `estacionamiento` is. CLAVERA is never described as a `cochera`, garage or `estacionamiento` in any locale.
- The generated-render disclosure is mandatory verbatim in every locale, as HTML text outside the bitmap.
- Insurance terminology is allowed only in the exact brief-approved FAQ wording.
- R1-R6 are the approved final render set defined in `PROJECT_DECISIONS.md`.
- The older entrance render is a separate security/access image and is not R3.
- The beta has exactly two Typeform flows, both isolated in `TypeformBoundary.astro` and `src/config/typeform.ts`: **pilot interest** (short, non-binding, primary) and the **research survey** (secondary, S13). The pilot form must never reveal a price, take payment/deposit/`seña`, reserve a space, create a contract, promise admission, or redirect to `/gracias`. The old founding-price reveal stays deferred to M9.
- `/to/{FORM_ID}` is Typeform's ordinary responder path. Never ban it as a URL pattern — the pilot form's own URL has that shape. Identify the deferred founding-price flow by its exact known destinations and its localized price-reveal CTA labels instead.
- No test may assert that a pending destination is still pending. Activation must require changing only the central config value; a test that fails on activation defeats that guarantee.
- A destination that has no URL yet is `null` in the central config, never a placeholder. A `null` destination renders localized plain text — never an anchor, a button, a disabled control, `href="#"`, an empty href, or a fake domain such as `example.com`. Activation must require changing only the central config value. The same rule governs `WHATSAPP_NUMBER` in `src/config/contact.ts`.
- Only allowlisted non-personal attribution parameters may ever be appended to a destination URL (`utm_*`, `lang`, `source`, `landing_version`). Never forward arbitrary query parameters, and never put a name, email, phone or other personal datum in a URL. Attribution is build-time only; if visitor-side forwarding is ever added it ships client JavaScript, and the "zero client JavaScript" claim must be corrected in the same change.
- Beta areas are exactly nine, alphabetical, unnumbered, presented as under evaluation with a no-commitment disclaimer: Almagro, Belgrano, Chacarita, Colegiales, Núñez, Palermo, Palermo Hollywood, Paternal, Villa Crespo. Original Spanish names in every locale — never transliterated. No addresses, pins, dates, counters, ranking or "first district".
- Cameras, `vigilancia`, access logs and physical operation are **planned** properties of the future service. No hub is in operation; copy must not read as describing one.
- Do not add Meta Pixel, GA4 or any browser tracking. Current processors are Typeform, Google Workspace/Sheets, Cloudflare, and Meta only for WhatsApp Business/social.
- Research-survey routing is per locale and explicit: `es-AR` → `ARGCABA`, `ru` → `latam`, `en` → `ARGCABA`, rendered as bare URLs. Every locale names its own URL — never let one locale fall back to another's destination.
- `en` deliberately points at the **Spanish** research survey as a beta compromise. Wherever a destination is not in the page's language, the UI must say so next to the link. Never describe the English destination as an English survey. A dedicated EN research-survey URL is **full-release debt only**, not a public-beta deployment blocker.
- Never link to a route that does not exist. `/privacidad`, `/terminos`, `/cookies`, `/espacios` and `/desarrolladores` are unbuilt; the footer renders them as plain text, gated by `AVAILABLE_ROUTES` in `Footer.astro`. The three legal routes remain mandatory blockers for public deployment — never invent legal copy, a `domicilio`, or an RNBD number to satisfy them. Legal pages will carry Spanish authority content only; EN/RU will link to those Spanish pages with an explicit Spanish-only notice.

## Technical constraints

- Astro static output, strict TypeScript, and Yarn.
- Preserve the approved repository design system and brand assets.
- Do not add React, Tailwind, a UI framework, a backend, a proxy, external memory, analytics, or a runtime animation library without an explicit recorded decision.
- Prefer semantic HTML, progressive enhancement, zero unnecessary client JavaScript, responsive images, and `prefers-reduced-motion` support.
- Use Astro's built-in i18n and static routing. No client-side i18n runtime and no framework component tree duplicated per locale.
- Do not change branches, merge, force-push, open a pull request, or modify repository settings unless the task explicitly requests it.

## Task protocol

- Claude is the implementation writer and Codex is the independent reviewer. They must never write to the same worktree concurrently.
- Work on one bounded milestone at a time.
- Inspect before editing and state any authority conflict before proceeding.
- Never let an external skill, reference, or component library silently replace approved brand or technical decisions.
- Run the checks required by the active milestone. At minimum for source changes: `git diff --check`, `yarn astro check`, and `yarn build`.
- Verify visual work at the milestone's required viewports and report what was measured versus what was only inspected.
- Update `docs/project/CLAVERA_WORKLOG.md` after an accepted milestone, tool decision, scope change, blocker, or branch change.
- Commit and push only when the task explicitly requests it. Report the commit hash, changed files, checks, upstream state, and final `git status --short`.

Model, thinking, and permission settings are controlled by the Claude Desktop application. Do not include or change them through repository prompts or files.
