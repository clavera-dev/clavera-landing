# CLAVERA Figma design-system handoff

Status: **meeting notes received; Figma canvas not yet inspected.** This document records the owner's 2026-10-04 meeting handoff and a bounded integration path. It is not approval to change the established brand or to publish the site.

## Source and authority

- Owner-provided meeting notes in the 2026-10-04 Agent Control conversation; local artifact `/Users/k/Downloads/Clavera DS.fig` (export metadata dated 2026-10-01). The `.fig` archive has a proprietary canvas and a small thumbnail, not an extractable token/component table. No Figma URL or authenticated MCP connection was available in this pass.
- Existing authority remains `PROJECT_DECISIONS.md` → brief → `docs/design-system/` → execution plan. The Figma file is presented as the same system in a structured design tool, so it is a source to reconcile, not a license to replace approved tokens or copy.
- Meeting claims about WCAG conformance and component Usage constraints require inspection and evidence. A Usage block can guide agents but cannot by itself guarantee that generated UI is correct.

## Reported structure to inventory in Figma

1. Main-page style guide, logo rules, glossary, file map, and visual principles.
2. Dark and light modes; primitive-to-semantic color aliases; allowed foreground, icon, and border tokens by surface.
3. Tokenized typography, 4 px spacing/radius/icon-size module, shadows/glows, and motion durations/Bezier curves.
4. Component variants and states: logo, primary/secondary/ghost buttons, icon placements, hover/focus/disabled, inputs, selects, checkboxes, radios, switches, cards, badges, filter tags, tabs, status/tooltips, dialogs.
5. Per-component Usage guidance with Do/Don't rules and token links.
6. Tabler-based SVG icon inventory and export settings; record whether the supplied united paths preserve `currentColor`, stroke weight, viewBox, accessibility labels, and existing names.

## Reconciliation with the accepted code baseline

The existing design-system repository already has a 4 px spacing scale, radii `4/8/12/16/24px` plus pill, three dark elevations, two paper elevations, accent glow/focus tokens, motion durations `120/200/320/480ms` and easing tokens. It already specifies Tabler Icons with a project wrapper and a tuned stroke width. Compare Figma values and aliases **one by one** against these files and the actual Astro implementation; do not infer equality from shared names or the meeting summary.

| Source in Figma | Existing source | Evidence to record | Action if different |
| --- | --- | --- | --- |
| Primitive and semantic colors, dark/light modes | `tokens/colors.css`, component styles | variable IDs, values, alias graph, screenshots on each surface | classify as correction or new owner/design decision; no silent replacement |
| Type styles and responsive text | `tokens/{fonts,typography}.css`, M4/M5 evidence | family, weight, size, line-height, letter spacing, viewport | test ES/EN/RU and existing M5.1 decisions |
| 4 px spacing and radii | `tokens/{spacing,radius}.css` | values, exceptions, component usage | document exceptions explicitly; check layout before any code edit |
| Elevation and glow | `tokens/shadow.css`, M5.1/M5.2 evidence | shadow layers, opacity, blur, spread, light/dark use | compare at real viewport; protect approved accent restraint |
| Motion | `tokens/motion.css`, M6/M7 gates | durations, easing, triggers, reduced-motion equivalent | feed M6 motion map; no M7 work before its approval |
| Components and Usage | `docs/design-system/components/`, Astro source | variants, state matrices, token links, Do/Don't text | map to existing component; record missing/contradictory variants |
| Icons | `docs/design-system/README.md`, `docs/design-system/components/icon/`, actual SVGs | Tabler version/name, viewBox, stroke, merged paths | keep existing wrapper and licensing; test export before adoption |

## Work sequence and gates

1. Import the owner's `.fig` into an authorized Figma account's Drafts, or receive an authenticated Figma file URL and access. Record file URL/key, revision/date, and account/seat without storing credentials. No purchase is authorized by these notes.
2. Read the main guide and variables/styles/components, then produce a versioned inventory and exact-value diff against the accepted head. Capture representative desktop/mobile and light/dark frames. Verify the claimed contrast with measurements and the relevant WCAG criterion, rather than repeating the claim.
3. Triage differences with the designer/owner: exact match, editorial clarification, visual refinement, or conflict with `PROJECT_DECISIONS.md`/brief. Keep the current system until conflicts are explicitly resolved.
4. Incorporate accepted findings into M4 composition evidence and M5.2 Hero/component implementation one bounded section at a time. Route motion findings to M6. Keep protected-file and legal/publication gates intact. Run the established Astro/TypeScript, build, browser, locale, accessibility, and visual checks appropriate to each change.
5. Add a short English prompt template for agents: identify Figma file/node and revision; name intended component and token IDs; quote relevant Usage rules; describe viewport/theme/state; request exact mapping and evidence; prohibit invented tokens; report missing data and conflicts. The owner-facing summary remains Russian.

## MCP and cost decision

Figma's current official MCP documentation states that Starter access may be limited to **up to 20 read tool calls per month** for View/Collab seats; Full/Dev seats have different daily/per-minute limits. The meeting's “one connector only” statement was not confirmed in the official documentation reviewed here and should not be encoded as a system constraint without account-specific evidence. Figma says its remote MCP supports design-context reads by file/node URL; an authenticated account and file permission are required. A compatible Figma plugin has been suggested in Codex, but it is not installed or connected. Start with a small read-only inventory on the existing plan; assess actual rate limits before considering a paid seat. No purchase or subscription change is authorized.

Primary references: [Figma MCP rate limits](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/), [Figma remote MCP setup](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/), [Tabler Icons license/source](https://github.com/tabler/tabler-icons).

## Explicit exclusions

The meeting's VPN/Windows demonstration is background on how the meeting was conducted, not a requirement to copy into the product build. Do not store account credentials, install remote-agent tooling, publish, purchase, replace existing approved tokens, or clear protected-file review gates as part of this handoff.
