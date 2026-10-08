# Docs index — read this instead of the five big documents

Rule: `CLAUDE.md` (hard rules) is always loaded. Read this index, then open ONLY the sections the task needs, with an offset/limit around the line from `docs/INDEX-HEADINGS.md` (generated heading -> line map; regenerate with `node scripts/build-docs-index.mjs` after editing a big document). If two sources conflict the earlier one wins: PROJECT_DECISIONS.md > brief > design system > execution plan > worklog.

| Task touches | Open (file, section) |
|---|---|
| Which source wins, scope, stack, locales | `PROJECT_DECISIONS.md` — Authority order, Phase-one scope, Multilingual scope, Technical stack |
| Beta areas / zone selector | `PROJECT_DECISIONS.md` — Beta areas; Respuesta v1.2 note at the end (Owner handoff v1.1 reconciliation) |
| Forms, Typeform, WhatsApp, phone, lead capture | `PROJECT_DECISIONS.md` — Lead capture, Owner handoff v1.1 reconciliation; code in `src/config/typeform.ts`, `src/config/contact.ts` |
| Renders R1-R6, alt text, generated-render disclosure | `PROJECT_DECISIONS.md` — Approved final render set; brief §3.5 (alt), §3.6 (legal filter) |
| Design values, tokens, components | `docs/design-system/` (Figma snapshot `tokens/figma/`) — final source; `docs/project/FIGMA_DS_INTEGRATION_2026-10-06.md` |
| Section copy and content (S1-S15) | brief `CLAVERA_Site_TZ_v1_5.md` — the S-number section only (Hero S1 … Footer S14) |
| Banned vocabulary, legal limits on wording | brief §0.5, §0.6; tests `tests/terminology.ts` |
| SEO / meta / locales | brief Part V (§5.1-5.3), Part VI (§6.1-6.5) |
| Legal pages | `src/components/legal/LegalPage.astro`, `src/content/legal/`, `src/config/legal.ts`; `docs/project/CLAVERA_Legal_Spec_v3_0_received.md` only if the legal text itself changes |
| Milestone status, gates, what is accepted | `docs/project/CLAVERA_EXECUTION_PLAN.md` — Current verified state, Milestones and gates |
| What happened last / current branch | `docs/project/CLAVERA_WORKLOG.md` — the newest entry (top of file) |
| Fonts | `docs/project/FONTS_DECISION_FACTS.md`, PROJECT_DECISIONS 2026-10-07 entries |
| Open owner questions | `docs/project/OWNER_DECISIONS_OPEN.md` |

Everything else under `docs/project/` is milestone evidence (M4-M8, audits): open it only when the task names it.
