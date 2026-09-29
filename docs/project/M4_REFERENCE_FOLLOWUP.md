# M4 reference follow-up — P1/P2/P5/P7/P8 (2026-09-29)

Scope: consolidate existing content-order findings for composition-matrix rows P1, P2, P5, P7, P8 (`M4_REFERENCE_COMPOSITION_SPEC.md` §3) with two new primary-source reads, then record what remains open and the smallest safe next M5 step. Tools this session: file read/write, `WebSearch`, `WebFetch` only — no browser, no screenshot, no shell. Every `WebFetch` converts a page to text/markdown; it does not render CSS, images, crops, overlaps, colour or viewport-specific layout. **Nothing below is visual evidence.** No purchase, install, paid API, publish or push.

## 1. Findings by row

**P1 — render-led desktop hero.** [Zaha Hadid Architects — Heydar Aliyev Centre](https://www.zha.com/architecture/heydar-aliyev-centre), accessed 2026-09-29 (from `M4_P1_P2_REFERENCE_NOTES.md`, reused — same day, not re-fetched). Confirmed order only: large project image → short disclosure line (location/date/client) → title → prose → credited gallery. Supports a short disclosure line directly under the hero image as a plausible slot for CLAVERA's own disclosure. Does not confirm full-bleed treatment, scrim, or bottom-left type placement — those stay open pending a rendered view. Nothing from ZHA's project content, imagery or brand transfers.

**P2 — short-phone first screen.** [Rad Power Bikes — home](https://www.radpowerbikes.com/) and [Tern Bicycles — home](https://www.ternbicycles.com/), accessed 2026-09-29 (from `M4_P1_P2_REFERENCE_NOTES.md`, reused). Rad Power: header → headline → one-line subheading → single CTA, before any product grid — supports "CTA close after the headline." Tern lacks a single CTA in the same position, so the pattern is not universal. Header height, band height, and whether the image sits as backdrop or strip remain unverified — text extraction cannot expose viewport geometry. No commercial/discount/scale claim from either brand transfers.

**P5 — full-bleed band with edge caption.** [Grimshaw — Southern Cross Station](https://grimshaw.global/projects/rail-and-mass-transit/southern-cross-station/), accessed 2026-09-29 (from `M4_REFERENCE_GAPS_P5_P11.md`, reused). Confirmed order: banner image → one caption line → intro paragraph → gallery → body → metadata. Supports one image, one caption, immediately in sequence — matches the hypothesis that band and caption share a reading column. Crop ratio, caption alignment (shared edge vs. centered) and whether the caption "re-enters the grid" are not stated in text and stay open. Grimshaw's gallery/metadata block does not transfer (CLAVERA's R5 is a single band, not a gallery).

**P7 — comparison as a document (paper register).** Two sources, one reused, one new:
- [Rivian — Compare](https://rivian.com/compare), accessed 2026-09-29 (reused). Weak: groups specs by model column under named categories (At a glance, Design, Performance, Dimensions, etc.) with a "show differences only" toggle — an interactive configurator, not a static document, and it compares Rivian's own model line, not a vs.-competitor table.
- **New, this session:** [Apple — iPhone Compare](https://www.apple.com/iphone/compare/), accessed 2026-09-29, text-only via `WebFetch`. Confirmed order: a spec table grouped under named categories — Display, Design, Durability, Processor, Battery, Camera, Connectivity, Apple Intelligence & Siri, Peace of Mind, Size and Weight — compared across multiple model columns. This is a cleaner, more widely recognized instance of categorical spec grouping than Rivian's, and it strengthens the *content-order* case that named spec categories are a legible, standard "document" structure. It has the same limitation as Rivian: it compares Apple's own products, not a vs.-competitor table, and the fetch could not confirm any paper/light register, or a dark→light→dark transition — those remain unobservable by text extraction.
- **Net verdict:** still `OPEN` for the visual/register acceptance test; two independent content-order precedents (categorical grouping) now exist, neither vs.-competitor. Neither brand's product claims, pricing, or configurator interactivity transfers to CLAVERA's zero-JS table.

**P8 — plan/diagram presentation.** Two sources, one reused, one new:
- [Dero — Bike Parking Guide](https://www.dero.com/bike-parking-guide/), accessed 2026-09-29 (reused). Diagrams embedded in prose with a caption sentence under each — not an index-numeral legend beside a drawing.
- **New, this session:** [The Bike Storage Company — 20 Space Original Cycle Shelter](https://www.thebikestoragecompany.co.uk/product/20-space-original-cycle-shelter/), accessed 2026-09-29, text-only via `WebFetch`. Confirmed content: a plan/elevation-style diagram captioned "20 Space Original Shelter" with dimensions (width/depth/height) labelled directly on the drawing, under a "Dimensions" heading; downloadable spec sheet and CAD files are offered separately, not embedded. **No numbered legend is present** — this is a negative data point against CLAVERA's anchor (R6 + index-numeral legend to the right): the closest in-category precedent found so far labels a drawing with dimensions in place, not with a separate numbered key.
- **Net verdict:** still `OPEN` for the visual acceptance test (legend/drawing spatial relation, seam with neighbours). Across three sources now read (Dero, Falco — rejected, no drawing — and Bike Storage Company), no primary source has shown CLAVERA's specific index-numeral-legend-beside-drawing pattern; the anchor stays a repository-only construction (`[code]`) until a visual reference is found or the owner accepts it as original.

## 2. Remaining owner/designer decisions touched by this pass

These are unchanged from `M4_REFERENCE_COMPOSITION_SPEC.md` §15 — this pass adds evidence but resolves none of them:

- **D1** — whether continued text-only research is sufficient to call any row "reference-driven," or whether the spec should keep marking P1/P2/P5/P7/P8 as content-order-only until a viewport-capable session exists. No default changes this: content-order support does not authorize a grid, crop, scale or spacing decision (spec §3, explicit rule).
- **D4** — short-phone hero A vs. B: still unresolved; this pass adds no hero-viewport evidence and does not touch it.
- **D7** — zone-selector empty-state copy: unaffected by this pass.
- New, narrow: whether P8's anchor (index-numeral legend beside R6) should be revised toward "dimensions/caption labelled in place" (the pattern actually found three times now) or kept as an original CLAVERA construction with no external precedent — a designer call, not evidence this pass can settle.

## 3. Smallest safe M5 implementation slice

**None of the above unlocks a new M5 code change.** Per the composition spec's own rule (§3: "content-order support alone does not settle grid, scale, crop or spacing choices"), P1/P2/P5/P7/P8 remain below the bar needed to justify any layout, crop, or spacing edit — this pass only strengthens or narrows the content-order record.

The smallest safe next unit is therefore **not** a new composition change but the already-queued, already-written step blocking further M5 progress: `M5_2_RESULT.md` §4's dispatcher commands (`yarn astro check`, `yarn build`, the `tests/m5-2.spec.ts` and `tests/m5-2-hero-prototypes.spec.ts` suites) have code and tests in place but have never been run, because no M4/M5 session in this harness (including this one — file/search tools only, no shell) has had a shell or browser. Running them would: (a) produce the CTA-vs-fold and contrast numbers needed to resolve **D4**, and (b) produce the first real screenshots that could finally upgrade any of P1/P2/P5/P7/P8 (or P3/P4/P6/P9/P10/P11) from content-order to visual evidence. This is a session-capability gap, not a design or research gap — no further web research closes it.

**If a shell/browser session is not available next:** the only safe, code-only action available is documentation — recording new content-order findings as this file does — and no `.astro`/CSS file should be touched based on this pass alone.

## 4. Sources read or reused this pass (max five-page budget)

| Row | Source | Status this session |
|---|---|---|
| P1 | ZHA — Heydar Aliyev Centre | Reused (same-day prior read) |
| P2 | Rad Power Bikes home; Tern Bicycles home | Reused (same-day prior read) |
| P5 | Grimshaw — Southern Cross Station | Reused (same-day prior read) |
| P7 | Rivian — Compare (reused); **Apple — iPhone Compare (new fetch)** | 1 new fetch |
| P8 | Dero — Bike Parking Guide (reused); **The Bike Storage Company — 20 Space Cycle Shelter (new fetch)** | 1 new fetch |

Two new pages fetched this session, within the five-page budget. No screenshot, browser render, or viewport-specific claim is made for any source above, new or reused.
