# M6 — Motion map (specification only)

Status update 2026-10-06: the owner said «внедряем анимации» (implement the animations), and slices 1 and 2 of §6 are implemented **provisionally** on branch `agent/clavera-m5-m7-20261006`, CSS only, no dependency. The zone list uses an opacity-only fade: the 4px lift made WebKit drop clicks during the transition. The accent rule is a scroll-driven draw inside `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`. Each is one revert away. Tests: `tests/motion.spec.ts`. The Emil Kowalski skills (§5.1) were not installed. FAQ height animation (§5.4) stays native/instant. The original status line follows.

Status: draft for owner/design review. **Nothing in this document was implemented.** No package was installed, no component file was changed, no legal text or product claim was touched. This is the "define a section-by-section motion map… approve before implementation" deliverable from `CLAVERA_EXECUTION_PLAN.md` M6 (lines 388–396) and `M4_M10_LIVE_ROADMAP.md` M6.

## 0. Tooling fact-check

The plan (`CLAVERA_EXECUTION_PLAN.md` line 392, `PROJECT_DECISIONS.md` lines 102–108) calls for installing the official Emil Kowalski skills (`emil-design-eng`, `find-animation-opportunities`, `animation-vocabulary`, `review-animations`, `improve-animations`, from `github.com/emilkowalski/skills`) before this milestone. **They are not present in this worktree.** The only skill installed locally is `.claude/skills/redesign-existing-projects/SKILL.md`. Everything below is this session's own direct reading of the section components and design tokens, not output from those skills, and it has not been run through `find-animation-opportunities` or `review-animations`. This is flagged as an open decision in §5.

`package.json` has no animation dependency (`astro` + Playwright only) — no Motion-for-JavaScript, no GSAP, no framer-motion. Confirmed by grep across the repo.

## 1. Existing motion inventory (do not confuse with proposals below)

| Motion | Where | Mechanism |
|---|---|---|
| Global reduced-motion override: all `animation-duration`/`transition-duration` clamp to `0.001ms`, `scroll-behavior: auto` | `src/styles/global.css:137-146` | CSS `@media (prefers-reduced-motion: reduce)`, blanket `*` selector |
| Smooth in-page anchor scroll | `src/styles/global.css:131-135` | CSS `scroll-behavior: smooth`, gated by `no-preference` |
| Skip-link slide-in on focus | `src/styles/global.css:313-330` | `transform: translateY(-200%)` → `0` on `:focus-visible`, `--duration-base`/`--ease-out` |
| Button hover/active (background, border, color, shadow, and a `scale(0.98)` **press**, not hover, feedback) | `src/styles/global.css:490-566` | CSS `transition` on `.button`, tokens `--duration-fast`/`--duration-base`/`--ease-standard` |
| Link-arrow hover underline/color | `src/styles/global.css:568-587` | Same tokens |
| Footer/nav link hover color | `src/components/layout/Footer.astro:267-277`, `LanguageSwitcher.astro:83-88` | Same tokens |
| FAQ `+`/`−` marker crossfade | `src/components/sections/FaqSection.astro:97-117` | `opacity` transition on `::after`, `--duration-fast` |
| FAQ question hover color | `FaqSection.astro:71` | Same |
| Zone-selector combobox chevron flip | `src/components/lead-form/ZoneSelector.astro:283-298` | **Explicitly no transition** — a prior, deliberate decision (see comment at line 282) |
| Header scrim, disclosure fade | `src/components/layout/Header.astro:56-75` | Static gradient/blur, not animated |
| FAQ open/close, zone listbox open/close | `FaqSection.astro` (`<details>`), `ZoneSelector.astro` (`hidden` toggle) | Native, **instant**, no animation |

Nothing on the page currently animates on scroll. There is no stagger, no hover-scale on content, no scroll hijacking, and no blocking entrance anywhere today.

## 2. Reading of the page that shapes the recommendations

- The design system is deliberately editorial/architectural: numbered index rows (`Section.astro` rail, `PillarsSection`'s `.index`, `HowItWorksSection`'s `.steps`), hairline dividers, a single full-weight amber rule reserved for the Founders CTA (`Section.astro:139-146`, `FoundersSection.astro:38`), one paper-surface break (Comparison). It reads as a drafted document, not a stack of animated cards — there are no card grids anywhere to stagger.
- Hero (`Hero.astro`) is the LCP element: eager image, `fetchpriority="high"`, real headline text in the initial paint. Animating it in would delay perceived readiness for no gain.
- Every render image already reserves its box (`width`/`height` on `<img>`, `RenderFigure.astro:82-83`) and is lazy-loaded with `decoding="async"` for all but the hero — no CLS to mask with a fade.
- D4 (hero short-phone variant A vs. B) is still open per `M5_2_RESULT.md` §2/§5 — the shipped `Hero.astro` is today's unchanged single-band composition. The recommendation below (no motion) holds identically for either outcome of D4, so it is not a blocker for this map.

Given that, the honest map is short: **most sections get no proposed motion.** Adding a scroll-triggered reveal to all thirteen sections would itself be the generic pattern the task asks to avoid.

## 3. Section-by-section map

Legend — Trigger: `load` (page load/hydration), `hover`/`focus`/`active` (existing pseudo-classes), `state` (JS-driven open/close), `view` (scroll into viewport, one-shot). Interruption: how an in-flight transition behaves if re-triggered before it finishes.

| # | Section / component | Path | Proposed motion | Trigger | Duration / easing | CSS vs JS | Interruption | Reduced motion | Perf / a11y |
|---|---|---|---|---|---|---|---|---|---|
| — | Header (`site-header`) | `layout/Header.astro` | None proposed | — | — | — | — | — | Fixed position + static scrim already solves legibility with zero JS; no hamburger exists to animate (nav is always visible; switcher moves to footer under 700px) |
| S1 | Hero | `sections/Hero.astro` | None proposed (see §2) | — | — | — | — | — | Do not add entrance motion to the LCP text/image |
| S2 | Problem | `sections/ProblemSection.astro` | None proposed | — | — | — | — | — | Pure typography; no element benefits from motion |
| S3 | Pillars (index rows) | `sections/PillarsSection.astro` | None proposed | — | — | — | — | — | A per-row stagger here is exactly the "generic stagger" anti-pattern the task names; the rail's own hairlines already give it rhythm without motion |
| S4 | How it works (steps) | `sections/HowItWorksSection.astro` | None proposed | — | — | — | — | — | Same reasoning as S3 |
| S5 | Vehicles | `sections/VehiclesSection.astro` | None proposed | — | — | — | — | — | Full-bleed image already reserves space; no pop-in to mask |
| S6 | Security | `sections/SecuritySection.astro` | None proposed | — | — | — | — | — | — |
| S7 | Comparison (paper switch, scroll region) | `sections/ComparisonSection.astro` | None proposed | — | — | — | — | — | The `comparison__hint` affordance (line 143-153) is a static media-query label, not motion — leave it as is |
| S8 | Hub showcase | `sections/HubShowcaseSection.astro` | None proposed | — | — | — | — | — | — |
| S9 | For whom (casos) | `sections/ForWhomSection.astro` | None proposed | — | — | — | — | — | — |
| S10 | Zones (zone selector reused) | `sections/ZonesSection.astro` | See "Zone selector" row below | — | — | — | — | — | — |
| S11 | Founders (amber accent) | `sections/FoundersSection.astro` | **Optional** — accent rule draws left→right once on first view | `view` (IntersectionObserver, fires once) or `@supports (animation-timeline: view())` scroll-driven, no JS at all | `--duration-slower` (480ms), `--ease-out` | CSS-native; use `transform: scaleX(0→1)` with `transform-origin: left` on `.section--accent::after` (not `width`, to stay compositor-only) | One-shot; a second scroll-past does not replay | Already covered by the blanket rule in §1 — animation collapses to instant, rule is simply present at full width, i.e. today's shipped look | Zero layout cost (transform-only); zero JS if implemented via `animation-timeline: view()` — falls back to the current static full-width rule in engines without support, so it degrades to *exactly what ships today*, never to nothing |
| S12 | FAQ | `sections/FaqSection.astro` | None proposed for the `<details>` open/close itself | — | — | — | — | — | Animating `<details>` height needs `calc-size()`/`interpolate-size`, which is not reliably supported across the three target engines yet; the instant native toggle is the correct choice until that changes. The existing marker crossfade (§1) is sufficient and stays as is |
| S13 | Survey teaser | `sections/SurveyTeaserSection.astro` | None proposed | — | — | — | — | — | Deliberately the quietest block on the page (own comment, line 14) — motion would contradict that intent |
| — | Footer | `layout/Footer.astro` | None proposed | — | — | — | — | — | Existing link hover colors (§1) are sufficient |
| — | Zone selector (combobox), used in S1 + S10 | `lead-form/ZoneSelector.astro` | **Optional** — listbox/empty-state fade+lift in on open, out on close | `state` (existing `hidden` toggle in the script at lines 130-217) | `--duration-fast` (120ms), `--ease-standard` in; same out | CSS-native: `opacity`/`transform: translateY(-4px→0)` via `@starting-style` + `transition-behavior: allow-discrete`, layered onto the existing `hidden`-attribute mechanism — **no JS change** | The existing `close()`/`filter()` logic already re-triggers correctly on every keystroke and on blur; a CSS transition only decorates that, it doesn't change when it fires. Rapid open→close→open is safe: CSS reverses an in-flight transition from its current value | Covered by the blanket rule — collapses to the current instant show/hide | `@starting-style`/`allow-discrete` support should be re-checked against caniuse at implementation time (no browser was available in this session to confirm); if unsupported in one target engine, that engine simply keeps today's instant toggle — safe fallback, not a hard requirement |
| — | Language switcher | `layout/LanguageSwitcher.astro` | None proposed | — | — | — | — | — | Existing color transition is enough |

### Explicitly considered and rejected

- **Fade-in on lazy-loaded render images (`RenderFigure.astro`)** — rejected. Space is already reserved (no CLS to hide), the page's own taste direction is restraint, not a photography-reveal gimmick, and applying it to every `<img>` on the page is precisely the generic, repeated pattern the brief says to avoid.
- **Hover-scale on any section illustration or numbered row** — rejected; there is no card grid on this page for the pattern to apply to, and it would be new, not restorative.
- **Scroll-snap/hijack on the Comparison table's horizontal scroll region** — rejected; the region is a native, keyboard-focusable scroll container (`role="region"`, `tabindex="0"`) and must stay that way.
- **Sequenced/staggered reveal of index rows (S3/S4/S8 legend)** — rejected for the reason in the S3/S4 table rows.

## 4. Motion-for-JavaScript decision

Every proposal above is achievable with CSS transitions/animations on existing tokens, or (Founders rule) with a pure CSS `@supports` feature query and no script at all. **No interaction on this page currently needs a JavaScript animation runtime.** Recommendation: do not install Motion for JavaScript for M7 as currently scoped; it would be a dependency with no concrete use yet, contrary to the registry-freeze principle already stated in `CLAVERA_EXECUTION_PLAN.md` (line 59: "do not add … merely because it is recommended"). Revisit only if a future interaction needs coordinated/interruptible sequencing CSS cannot express (e.g., a genuine shared-element transition).

## 5. Decisions requiring owner/design approval

1. **Skills gap.** Install the Emil Kowalski skill set locally before this map is treated as authoritative, or accept this direct-analysis version as the M6 deliverable and install the skills before M7's `review-animations`/`improve-animations` gate instead. Installation itself is local and safe (per `PROJECT_DECISIONS.md` line 99) but is a separate step this session did not take.
2. **Founders accent-rule draw (§3, S11).** Optional, Chromium-leaning progressive enhancement (or a small one-shot IntersectionObserver if the owner wants it in all three engines instead of only where `animation-timeline: view()` is supported). Approve, defer, or drop.
3. **Zone-selector open/close transition (§3).** Optional 120ms polish on an already-functional instant toggle. Approve, defer, or drop.
4. **FAQ open/close height animation.** Recommendation is to leave native/instant given current cross-engine support for animating `<details>`. Confirm this is acceptable, or ask for a JS-based height animation despite the added complexity that would introduce.
5. **D4 (hero short-phone variant).** Not a motion decision, but noted because it's the one open item from M5.2 that touches the same component (`Hero.astro`) this map also covers with "no motion" — flagging so it isn't mistaken for something this map left unresolved.

## 6. Independent implementation slices (after approval, cheapest first)

1. **Zone-selector open/close CSS transition.** Single file (`ZoneSelector.astro`), CSS-only, existing tokens, testable against the existing `tests/m5-2.spec.ts` reduced-motion assertions plus one new open/close timing check.
2. **Founders accent-rule draw.** Two files (`Section.astro`'s `--accent` styles, `FoundersSection.astro`), CSS-only or CSS + ~10-line one-shot observer, zero risk to unsupported browsers (identical to current shipped look).
3. **Install the Emil Kowalski skills** (if approved) and run `find-animation-opportunities`/`review-animations` against this map and the two slices above once implemented — a tooling step, no code change.

Each slice is independent of the other two and of D4; none blocks M7's broader "no stagger / no hover-scaling / no blocking entrances" gate, since neither introduces any of those patterns.
