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
- The founders form and research survey are separate Typeform targets. Keep integration isolated in `TypeformBoundary.astro` and `src/config/typeform.ts` until explicitly authorized.

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
