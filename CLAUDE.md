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
- Do not claim 24/7 availability, with one exception (owner handoff v1.1 §3.1, §6.2): it may appear as a *planned property of the future service*, only in the solution section's "digital access" pillar and in the dedicated access-hours FAQ item — never in meta, title or hero. `tests/terminology.ts`'s `find247PlacementViolations` enforces the two-place limit.
- Do not use `monTEK` or `Hamax` in public copy, metadata, captions, alt text, filenames, or accessibility descriptions.
- Tier-1 forbidden vocabulary applies in every language. English `bike parking` and Russian `велопарковка` are prohibited exactly as `estacionamiento` is. CLAVERA is never described as a `cochera`, garage or `estacionamiento` in any locale.
- The generated-render disclosure is mandatory verbatim in every locale, as HTML text outside the bitmap.
- Insurance terminology is allowed only in the exact brief-approved FAQ wording.
- R1-R6 are the approved final render set defined in `PROJECT_DECISIONS.md`. R3 (the cleaning zone) is currently unreferenced on the page (handoff v1.1 §3.5) — its derivatives stay in the repository so reinstating it is a one-line change, not a re-export.
- The older entrance render is a separate security/access image and is not R3. Its alt text must not name a camera even though the image visibly contains one (handoff v1.1 B5).
- The beta has exactly two Typeform flows, both isolated in `TypeformBoundary.astro` and `src/config/typeform.ts`: **pilot interest** (short, non-binding) and the **research survey**. Per handoff v1.1 B4, the research survey is the *primary* action of the "Sumate al piloto" block while the pilot ("Avisame") URL is unset; once a locale's `PILOT_INTEREST_DESTINATIONS` entry is filled, Avisame becomes primary and the survey moves to a secondary "¿Tenés 3 minutos más?" prompt. The pilot form must never reveal a price, take payment/deposit/`seña`, reserve a space, create a contract, promise admission, or redirect to `/gracias`. The old founding-price reveal stays deferred to M9.
- `/to/{FORM_ID}` is Typeform's ordinary responder path. Never ban it as a URL pattern — the pilot form's own URL has that shape. Identify the deferred founding-price flow by its exact known destinations and its localized price-reveal CTA labels instead.
- No test may assert that a pending destination is still pending. Activation must require changing only the central config value; a test that fails on activation defeats that guarantee.
- A destination that has no URL yet is `null` in the central config, never a placeholder, and activation must require changing only that central config value. `src/config/contact.ts` stays the general rule: `WHATSAPP_LINK` (the owner-supplied `wa.me/message/…` short link, PROJECT_DECISIONS.md 2026-09-29) is checked first by `whatsappHref()`, with `WHATSAPP_NUMBER` (a direct phone number, if one is ever supplied separately — never derived from the link) as fallback; while both are `null`, `whatsappHref()` renders localized plain text, never an anchor, a button, a disabled control, `href="#"`, an empty href, or a fake domain. `PILOT_INTEREST_DESTINATIONS` (`src/config/typeform.ts`) is a stricter carve-out (handoff v1.1 B4): while a locale's entry is `null`, the pilot control renders **nothing at all** — no button and no "in preparation" text — because the research survey already carries the primary action in that state.
- Only allowlisted non-personal attribution parameters may ever be appended to a destination URL (`utm_*`, `lang`, `source`, `landing_version`), and research-survey links additionally carry the fixed `RESEARCH_FRAGMENT_ALLOWLIST` fragment parameters from `src/config/typeform.ts` (handoff v1.1 §4.1), including an optional `candidate_zone` slug from `src/config/zones.ts` — never free text, never any other personal datum. Attribution values are computed at build time; the zone selector's own client script only swaps between prebuilt hrefs already computed at build time and never reads or forwards anything the visitor typed. The site is **not** zero-client-JavaScript: the zone selector (`src/components/lead-form/ZoneSelector.astro`) ships one small progressive-enhancement script for exactly that swap.
- The beta area list is superseded by a searchable zone selector (hero and S10), fed by `src/config/candidate-zones.ts` and validated through `src/config/zones.ts`. The **working list is confirmed by owner response v1.2 §1.8** and may receive targeted updates. It confirms no opening location. Original Spanish names are used in every locale, never transliterated; barrios are alphabetical, unnumbered, with no zone highlighted or marked first; no addresses, pins, dates, counters or ranking.
- Cameras and `vigilancia` are removed from public copy entirely (handoff v1.1 B5) — not framed as planned, not present at all in meta, hero, pillar copy or captions, even though the entrance render still visibly shows a camera. Access logging and identification remain **planned** properties of the future service. No hub is in operation; copy must not read as describing one.
- Do not add Meta Pixel, GA4 or any browser tracking. Current processors are Typeform, Google Workspace/Sheets, Cloudflare, and Meta only for WhatsApp Business/social (Instagram and Facebook messages too, per the handoff §5 channels patch reflected in `/privacidad`).
- Research-survey routing is per locale and explicit: `es-AR` → `ARGCABA`, `ru` → `latam`, `en` → `ARGCABA`. Every locale names its own URL — never let one locale fall back to another's destination. Rendered links carry the handoff v1.1 §4.1 fragment attribution (`buildResearchHref` in `src/config/typeform.ts`), not a bare URL.
- `en` deliberately points at the **Spanish** research survey as a beta compromise. Wherever a destination is not in the page's language, the UI must say so next to the link. Never describe the English destination as an English survey. A dedicated EN research-survey URL is **full-release debt only**, not a public-beta deployment blocker.
- Never link to a route that does not exist. `/espacios` and `/desarrolladores` are unbuilt; the footer renders them as plain text, gated by `AVAILABLE_ROUTES` in `Footer.astro`. `/privacidad`, `/terminos` and `/cookies` **are built**, in `es` (canonical, unprefixed), `en` and `ru` (`src/components/legal/LegalPage.astro`, `src/content/legal/`) — ES is the sole legal authority; EN/RU are courtesy translations that carry a Spanish-authority notice and a link back to the ES original. Never invent an RNBD registration number or a publication date to fill them in: the RNBD line stays absent and `LEGAL_LAST_UPDATED` in `src/config/legal.ts` stays `null`, showing localized "pending" text, until the owner supplies real values. Final lawyer sign-off and owner publication approval remain outstanding regardless of the pages existing.

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
