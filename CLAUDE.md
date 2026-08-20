# CLAVERA Landing — Claude Instructions

Read before every task, in this order:

1. `PROJECT_DECISIONS.md`
2. `docs/brief/CLAVERA_Site_TZ_v1_5.md`
3. `docs/design-system/`
4. `docs/project/CLAVERA_EXECUTION_PLAN.md`
5. the latest entry in `docs/project/CLAVERA_WORKLOG.md`

If sources conflict, the earlier item wins. Do not infer project state from chat history when the repository documents answer it.

## Product and content constraints

- Public-facing copy is Rioplatense Spanish unless a task explicitly targets another locale.
- Do not claim 24/7 availability.
- Do not use `monTEK` or `Hamax` in public copy, metadata, captions, alt text, filenames, or accessibility descriptions.
- Insurance terminology is allowed only in the exact brief-approved FAQ wording.
- R1-R6 are the approved final render set defined in `PROJECT_DECISIONS.md`.
- The older entrance render is a separate security/access image and is not R3.
- The founders form and research survey are separate Typeform targets. Keep integration isolated in `TypeformBoundary.astro` and `src/config/typeform.ts` until explicitly authorized.

## Technical constraints

- Astro static output, strict TypeScript, and Yarn.
- Preserve the approved repository design system and brand assets.
- Do not add React, Tailwind, a UI framework, a backend, a proxy, external memory, analytics, or a runtime animation library without an explicit recorded decision.
- Prefer semantic HTML, progressive enhancement, zero unnecessary client JavaScript, responsive images, and `prefers-reduced-motion` support.
- Do not change branches, merge, force-push, open a pull request, or modify repository settings unless the task explicitly requests it.

## Task protocol

- Work on one bounded milestone at a time.
- Inspect before editing and state any authority conflict before proceeding.
- Never let an external skill, reference, or component library silently replace approved brand or technical decisions.
- Run the checks required by the active milestone. At minimum for source changes: `git diff --check`, `yarn astro check`, and `yarn build`.
- Verify visual work at the milestone's required viewports and report what was measured versus what was only inspected.
- Update `docs/project/CLAVERA_WORKLOG.md` after an accepted milestone, tool decision, scope change, blocker, or branch change.
- Commit and push only when the task explicitly requests it. Report the commit hash, changed files, checks, upstream state, and final `git status --short`.

Model, thinking, and permission settings are controlled by the Claude Desktop application. Do not include or change them through repository prompts or files.
