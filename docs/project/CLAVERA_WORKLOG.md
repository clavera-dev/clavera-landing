# CLAVERA Landing — Worklog

This is the current-state companion to `CLAVERA_EXECUTION_PLAN.md`. Update it after every accepted milestone, tool decision, scope change, blocker, or branch change. New chats must read the latest entry before planning work.

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
