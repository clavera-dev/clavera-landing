# CLAVERA Design System

CLAVERA is a premium network of guarded storage hubs for bicycles, e-bikes and personal micromobility in Buenos Aires. The first hub sits at the intersection of Chacarita, Villa Crespo and Palermo. It is infrastructure sold by subscription — an assigned, named spot with personal digital access (QR / one-time code), video surveillance, and per-vehicle registration (make/model/frame number) — not a parking lot or garage. The audience owns transport worth defending: bicycles from ~800k ARS, e-bikes 2–4M ARS, cargo bikes. Positioning sits at the level of the vehicle brand the customer already owns, not "budget bike parking." Long-term goal: a franchise network across Latin America.

**Source of this design system:** a written brief only (see below) — no codebase, Figma file, or existing brand assets were attached. Every color, font, component and screen here is an original proposal built to that brief, not a recreation of existing material. Treat the palette and type pairing as a working hypothesis to validate, not a locked brand.

## Sources
- Brief: company description, tone/language rules, forbidden-lexicon legal constraint, and price-anchor guidance, provided directly in chat (no external links).
- No Figma file, GitHub repo, or slide deck was attached.
- Domain: clavera.ar · Contact: hola@clavera.ar

## Content fundamentals

**Language:** Spanish, Rioplatense register (es-AR). "Vos" is acceptable ("Reservá tu lugar", "vos" over "tú"). Never English-first copy.

**Tone:** sober and premium. No startup hyperbole, no exclamation marketing, no "¡...!". Say less; let the price and the material speak. Compare `"Guardería segura de bicicletas y e-bikes en Chacarita."` (used) against `"¡Guardá tu bici de forma segura ahora!"` (not used — hyperbolic, exclamatory).

**Forbidden vocabulary (legal constraint on clavera.ar copy):** never *estacionamiento, parking, bike parking, garaje, cochera, playa, tarifa por hora* — except when *cochera* or *gimnasio* is used explicitly as a **price anchor/comparison**, never to name CLAVERA's own service. Candidate slogan: *"La mitad de una cochera, al precio de un gimnasio."*

**Preferred vocabulary:** *guardería segura de bicicletas, depósito y custodia por membresía, lugar asignado, hub de micromovilidad.*

**Positioning discipline:** never compare CLAVERA to bike shops or free municipal parking. Frame it next to what the audience already pays for: a private garage space, a premium gym membership.

**Casing / voice:** sentence case throughout (headlines, buttons, badges) — never title case, never all-caps body copy. Uppercase is reserved for the eyebrow/label token (`--text-eyebrow-*`) at small size with wide tracking, e.g. "MEMBRESÍAS". No emoji anywhere.

**Numbers:** ARS amounts written with thousands separators as periods (`45.000`, `2.400.000`), Argentine convention. Dates `DD.MM.AAAA`. Frame numbers, access codes and timestamps are always set in mono (see Type).

## Visual foundations

**Palette (working hypothesis, not yet finalized — see caveats):** matte black / dark graphite as the base surface, concrete grey as the neutral, one warm amber/gold accent standing in for the hub's LED lighting. This is deliberately a two-neutral-plus-one-accent system — no gradients-as-decoration, no second saturated color. Physical materials referenced by the brand (concrete, steel, wood) inform mood and photography more than they inform UI color; only "steel" (cool, desaturated) made it into a token, as the `info` semantic and a divider/imagery mood note. See `guidelines/colors-*.card.html` and `tokens/colors.css`.

**Type:** Plus Jakarta Sans for display and headings (display 2xl/xl/lg + h1–h5); Onest for body and UI text (body xl/lg/md/sm) and labels (label lg/md/sm, eyebrow, caption). IBM Plex Mono for anything technical: access codes, frame numbers, timestamps, membership IDs. All font sizes AND line-heights sit on the 4px grid (e.g. h2 28/32, body-md 16/24). Google Fonts, CDN-linked. Full scale in `tokens/typography.css` and the Type cards.

**Spacing:** 4px base scale (4 → 128). Section rhythm uses the large steps (space-16/24); component internals use the small ones (space-2/3/4).

**Backgrounds:** full-bleed photography in the hero and hub-location moments only (via `<image-slot>` placeholders — none supplied yet); everywhere else, flat token surfaces. No illustration, no repeating patterns/textures, no decorative gradients. The one gradient in the system is a dark scrim over hero photography for text legibility — a functional overlay, not a brand device.

**Animation:** calm and restrained — 120–200ms ease-out for hover/press, 320ms for panel/modal entrances, using a custom no-bounce cubic-bezier (`--ease-standard`). Nothing springs or overshoots. Respect `prefers-reduced-motion` in production use.

**Hover states:** primary buttons brighten one step (`amber-500 → amber-600`) and gain a soft amber glow (`--shadow-glow-accent`) — the system's one deliberate "LED" moment. Neutral surfaces lighten one graphite step. Outline/ghost controls pick up the accent color on hover rather than changing background.

**Press states:** scale down slightly (0.96–0.98) plus a further amber step (`amber-700`) on primary — no color inversion, no shadow removal.

**Borders:** hairline borders (`oklch(100% 0 0 / 0.08–0.16)` on dark) do most of the separation work between surfaces — an architectural "reveal line" rather than a shadow-heavy card language.

**Shadows:** soft, dark, low-spread (`--shadow-e1/e2/e3`) — elevation is subtle since hairline borders already separate surfaces. The one expressive shadow is the amber glow, reserved for the primary accent moment (CTA hover, active status dot, focus ring).

**Corner radii:** soft and contemporary, every step on the 4px grid — 8px for controls (buttons, inputs, selects, tabs), 12–16px for containers, 24px for large media. Nested radii follow the concentric rule: container radius = inner control radius + gap to the edge (the Dialog computes its radius as `radius-sm + space-6` = 8 + 24 = 32px; segmented Tabs as 8px items + 4px padding = 12px shell). Pill radius is reserved for status badges, tags-as-pills are avoided (Tag is rectangular; Badge is the pill). All spacing, sizing, and radius values across components are multiples of 4.

**Transparency & blur:** used narrowly — the site nav gains a translucent blurred background only after scrolling past the hero (a functional legibility aid), and modal scrims are a blurred dark overlay. Never a general glass/frosted aesthetic across cards or panels.

**Imagery mood (once supplied):** nocturnal industrial — concrete and steel lit by warm LED, low saturation, nothing staged or cartoonish; should look "realistically buildable," not a render-for-render's-sake hero shot.

**Cards:** flat token surface + 1px hairline border + `--radius-lg` + a soft `e1` shadow; never a colored left-border accent strip.

## Iconography

Tabler Icons (CDN, MIT-licensed, ~5900 icons, 2px stroke on a 24px grid) — plain geometric stroke linework matching the brand's restrained industrial character. Wrapped by the `Icon` component (`components/icon/Icon.jsx`), which fetches each glyph's raw outline SVG from the `@tabler/icons` CDN, caches it, and inlines it so `currentColor` and size resolve against CLAVERA's own tokens — icons are never emoji, never unicode glyphs, never hand-drawn SVG. Default stroke width is tuned to 1.75 (vs. Tabler's default 2) for a slightly finer, more refined line. Icon names are Tabler's outline names (`qrcode`, `alert-triangle`, `home`…). See `components/icon/icon.card.html` for the glyph set in current use.

## Components

Fifteen components across seven directories under `components/`. No Figma/codebase inventory was supplied, so this is the brief's standard set, sized to CLAVERA's needs, plus one intentional addition:

- **icon/** — `Icon`
- **buttons/** — `Button`, `IconButton`
- **inputs/** — `Input`, `Select`, `Checkbox`, `Radio`, `Switch`
- **data-display/** — `Card`, `Badge`, `Tag`
- **navigation/** — `Tabs`
- **overlay/** — `Dialog`
- **feedback/** — `Toast`, `Tooltip`

**Intentional addition:** `Icon` — not in the standard list, but every other component needed a consistent glyph and no icon package was supplied to import instead.

Each component directory has a `<Name>.jsx` + `<Name>.d.ts` + `<Name>.prompt.md`, plus one `@dsCard`-tagged `.html` demoing its states/variants. Import components in any consumer as `const { Button } = window.CLAVERADesignSystem_249479`.

## UI kits

Two products recreated as click-through prototypes (assembled from the components above, per the brief — no existing app/site to copy pixel-for-pixel):

- **`ui_kits/website/`** — clavera.ar marketing site: nav, hero, cómo funciona, membresías (mensual/anual price toggle, the cochera/gimnasio price anchor), hubs, seguridad, FAQ, footer, and a reservation dialog.
- **`ui_kits/member-app/`** — the member app: login, home (assigned spot + activity), access (QR + one-time code), vehicle registration, profile/membership.

## Index

```
styles.css                  global CSS entry — @import list only
tokens/                     colors, typography, spacing, radius, shadow, motion, fonts, base reset
components/                 15 components, 7 directories (see above) — each with .jsx + .d.ts + .prompt.md + a @dsCard demo
guidelines/                 19 foundation specimen cards — Colors (5), Type (5), Spacing/Radius/Elevation/Motion (5), Brand (4)
ui_kits/website/             marketing site click-through
ui_kits/member-app/          member app click-through
assets/                      logo.svg (supplied brand mark) — see assets/README.md
thumbnail.html               design-system homepage tile
SKILL.md                     Claude Code / Agent Skills-compatible package wrapper
```

## Caveats — please help iterate

- **No brand source material was attached** — no Figma, codebase, logo, or photography. Everything here (palette, type pairing, component visual style, both UI kits) is an original proposal from the written brief, not a recreation. Please review against any internal materials that exist and tell me what to correct.
- **Fonts are CDN-linked Google Fonts**: Plus Jakarta Sans / Onest / IBM Plex Mono. To self-host, send the font files and I'll swap the `@import` for local `@font-face`.
- **Logo**: the supplied `assets/logo.svg` (orange wordmark) is wired into the wordmark spots — nav, footer, app login, brand card, project thumbnail.
- **No photography exists** — hero, hub, and vehicle-photo spots are `<image-slot>` placeholders. Real hub/product photography would sharpen the "realistically buildable industrial architecture" feeling a lot.
- **Palette/type are a hypothesis**, per the brief's own note that these aren't fixed — flag anything that should change.

Tell me what to fix and I'll iterate — more feedback here makes the next pass much better.
