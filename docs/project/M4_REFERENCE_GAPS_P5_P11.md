# M4 reference gaps — P5, P6, P7, P8, P11 (research continuation, 2026-09-29)

Continuation of `M4_PUBLIC_REFERENCES_2026-09-29.md`, which closed P3/P4/P9/P10 on content-order grounds only. This pass targets the remaining five composition-matrix rows in `M4_REFERENCE_COMPOSITION_SPEC.md` §3: P5, P6, P7, P8, P11.

## 0. Tool constraint — read this first

This session had `WebSearch` and `WebFetch` only. Both are text pipelines: `WebFetch` converts a page to markdown and summarizes it with a small model; it does not render the page, take a screenshot, or expose CSS, image position, crop, overlap, colour, or viewport-specific layout. **No browser, screenshot, or viewport-rendering tool was available or used.** Per the task instruction, nothing below is reported as screenshot or visual-viewport evidence. Every row is marked with what was actually obtained: content/structure read as text, or not researched at all.

This matters more for P5–P8/P11 than it did for P3/P4/P9/P10: those four rows' acceptance tests were about *information order*, which text extraction can partially answer. P5, P6, P8 and P11's acceptance tests are explicitly about crop ratio, caption alignment, overlap/luminance, legend-drawing seams, and responsive row-stacking — **properties a text pipeline cannot observe even in principle.** P7 partially overlaps (categorical grouping is readable as text; "paper register" and dark/light/dark entry are not). This is a hard tool limitation, not a research shortfall that more searching would fix.

## 1. P5 — Full-bleed image band with caption on the content edge

**CLAVERA acceptance test:** crop ratio and caption alignment both visible.

- **Source:** [Grimshaw — Southern Cross Station](https://grimshaw.global/projects/rail-and-mass-transit/southern-cross-station/), accessed 2026-09-29, text-only via `WebFetch`.
- **Content observed (text only, not visually verified):** the page opens with a large banner image immediately followed by a single caption line, "Southern Cross Station, Melbourne, Victoria, Australia," then an intro paragraph, a photo gallery, body text, a pull quote, more photos, and a project-metadata block. No other image on the page carries an individual caption.
- **Fit for CLAVERA:** supports the *pattern* — one full-bleed image, one short caption directly under it, before body text resumes — matching P5's hypothesis that the band and caption belong to the same reading column. Category fit is good (infrastructure/station-design, matches the plan's suggested categories).
- **Rejected/does not transfer:** Grimshaw's gallery-of-many-photos structure and its project-metadata block (client, area, photographer) do not apply; CLAVERA has one band (R5), not a gallery.
- **Still missing:** the actual crop ratio (CLAVERA needs 2.35:1 desktop / 16:10 mobile), whether the caption sits on a shared content edge or is centered under the full-bleed image, and whether the caption "re-enters the grid" as the spec's anchor requires. None of this is visible in text. **Row stays `OPEN` for the visual acceptance test**; only a content-order precedent is added.

## 2. P6 — Portrait image beside text with controlled overlap

**CLAVERA acceptance test:** surface luminance step around the overlap is described.

- **Searches run:** architecture-firm about/project pages (Herzog & de Meuron, BIG towers), e-bike brand homepages (Cowboy).
- **Result:** no source was fetched, because this row's acceptance test is a pixel-level layout property (image bleeding across a surface-colour boundary) that a text/markdown extraction cannot expose even when a page is fetched — a `WebFetch` of cowboy.com's homepage came back with page copy and section order only and explicitly no image position or overlap information (confirmed by the tool's own output: "no image descriptions included... no information indicating portrait product photos positioned beside text, overlapping sections, or bridging imagery").
- **Fit for CLAVERA:** not assessed. **Row stays `OPEN — not researched`,** honestly, because this session's tools cannot research it at all, not because no candidate exists.
- **Still missing:** everything — a candidate page, and a way to view it at a real viewport (screenshot or direct render) to check whether the image crosses a surface-colour boundary and whether that boundary still reads.

## 3. P7 — Comparison presented as a document (paper register)

**CLAVERA acceptance test:** dark→light→dark entry/exit handled without gradients.

- **Source:** [Rivian — Compare](https://rivian.com/compare), accessed 2026-09-29, text-only via `WebFetch`.
- **Content observed (text only, not visually verified):** the page groups specs by model column (Quad-Motor AWD, Tri-Motor AWD, Dual-Motor AWD) under named categories — "At a glance," "Design," "Performance," "Upgrades," "Options and gear," "Dimensions," "Cargo and capacity," several features groups, "Lighting," "Sustainability" — with a "show differences only" toggle and colour swatches for paint/interior options.
- **Fit for CLAVERA:** weak, partial support at the *content-order* level only — categorical grouping of a spec comparison is a recognizable "document" structure. Does not transfer: Rivian's per-model column format (CLAVERA's S7 compares CLAVERA vs. competitors, not CLAVERA's own model line), the colour-swatch/toggle interactivity (CLAVERA's page must work with zero JS), and any vehicle/price/spec claims.
- **Still missing:** the entire visual register this row asks about — whether the page reads as "paper" against surrounding chrome, how it enters/exits a differently coloured section, and whether that's done without gradients. Rivian's page is an interactive configurator-style tool, not a static document, so even a visual look at it would only partly answer this row. **Row stays `OPEN` for the visual/register test**; a better category match (an actual printed-style spec sheet, e.g. from an architecture or industrial-design practice) was not found in this pass.

## 4. P8 — Plan/diagram presentation

**CLAVERA acceptance test:** legend/drawing relation and the seam with neighbours.

- **Rejected candidate:** [Falco — FalcoHub Cycle Hub](https://www.falco.co.uk/products/shelters-canopies-and-walkways/cycle-shelters/falcohub-cycle-hub.html), accessed 2026-09-29. Text-only reading found ~30 installation photographs and a cladding-options image, but **no technical drawing, plan, or legend** on this product page (CAD drawings are offered on request, not shown inline). Does not fit P8; discarded.
- **Source used instead:** [Dero — Bike Parking Guide](https://www.dero.com/bike-parking-guide/), accessed 2026-09-29, text-only via `WebFetch`.
- **Content observed (text only, not visually verified):** under "Capacity and Space Use," a space-planning diagram is paired with a caption-like sentence ("a 20'×20' area should be able to park about 60 bikes"); under "Setbacks," an illustration is attributed to DC DOT / Minneapolis Public Works recommendations; three further diagrams show surface-mount, in-ground-mount and rail-mount installation types, each labelled with its method. The guide is prose with diagrams embedded, not a numbered/indexed legend next to a drawing.
- **Fit for CLAVERA:** partial, content-order support — a labelled installation diagram embedded in explanatory prose is a plausible precedent for "drawing mounted on its own ground," but the labelling here is a caption under each diagram, not an index-numeral legend beside it as CLAVERA's anchor (R6 + numbered legend) proposes.
- **Does not transfer:** Dero's setback/space-use recommendations are specific to US municipal guidance and are not CLAVERA content.
- **Still missing:** exactly what the acceptance test asks for — the legend-to-drawing spatial relation and how the diagram's edge meets neighbouring content — none of which is visible without seeing the page rendered. **Row stays `OPEN` for the visual test.**

## 5. P11 — Mobile table

**CLAVERA acceptance test:** shows a comparison surviving at ≈375 px without dropping cells.

- **Result: not researched.** This row's acceptance test is defined entirely in terms of a mobile viewport (≈375 px width) and whether cells survive there. `WebFetch` returns the same document regardless of requested viewport — it does not evaluate CSS media queries, so it is structurally incapable of showing what a page does at 375 px. No search substitutes for this (a written description of "the table is responsive" would not be primary visual evidence, and none was found in any case).
- **Fit for CLAVERA:** not assessed.
- **Still missing:** everything — a candidate page (any of the P4/P9 sources, or a new one, could be tried) and a way to actually load it at ≈375 px, which requires a browser or screenshot tool this session does not have.

## 6. Summary

| Row | Text-only candidate found | Content/order support | Visual acceptance test met | Status |
|---|---|---|---|---|
| P5 | Grimshaw — Southern Cross Station | Yes (band + single caption, in sequence) | No — not observable by text | `OPEN` for visual test; content-order precedent added |
| P6 | None | No | No | `OPEN — not researched`, tool-limited |
| P7 | Rivian — Compare | Weak (categorical grouping only) | No | `OPEN` for visual test; weak content precedent added |
| P8 | Dero — Bike Parking Guide (Falco rejected, no diagram) | Partial (labelled diagram in prose) | No | `OPEN` for visual test; partial content-order precedent added |
| P11 | None | No | No | `OPEN — not researched`, tool-limited |

**No screenshot, browser render, or viewport-specific observation was made for any row in this document.** Everything above is a text/markdown reading of a live public page, cited with URL and access date, same evidentiary class as `M4_PUBLIC_REFERENCES_2026-09-29.md`. Nothing here upgrades any row past `[ref]`-for-content-order in `M4_REFERENCE_COMPOSITION_SPEC.md` terms; none reaches the `[ref]`-visual tier the spec's §1 remaining-evidence list requires. No purchase, install, or paid API was used; nothing was pushed, published, or merged.

**Next reviewable unit:** obtain a viewport-capable tool (browser automation or an approved screenshot capability) and re-run P1, P2, P5, P6, P7, P8, P11 (all seven) as direct viewport observations at the composition spec's target widths (375, 768/900, 1280, 1440) — this is a single bounded task once such a tool is authorized. Until then, these five rows and P1/P2 remain `OPEN` in the composition spec, and the spec's D1 decision (§15) and status line in `CLAVERA_EXECUTION_PLAN.md` should not be changed to claim visual reference coverage.
