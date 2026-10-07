# Pre-publication readiness — brief §6.5, §9, §12 (plan C8, 2026-10-06)

> **2026-10-07: the pilot spec (Respuesta v1.4, TZ Bloque Solicitud v1.1) was withdrawn by the owner.** References below to the application block, `/solicitud`, `src/config/solicitud.ts` and the Villa Crespo highlight describe code that was removed; the governing spec is Handoff v1.1 + Respuesta v1.2 again (see PROJECT_DECISIONS.md).

Reconciles each acceptance item of `docs/brief/CLAVERA_Site_TZ_v1_5.md` with later owner documents and the code on branch `agent/clavera-m5-m7-20261006`. Status words: **done (test)** — implemented and asserted by the named test; **superseded (decision)** — replaced by a later owner document; **not done (work)** — engineering work remains; **owner value (where)** — needs a value or decision only the owner can give; **not reconciled** — the source needed to decide is not in this repository. Publication itself, the domain, money and legal sign-off stay with the owner (`PROJECT_DECISIONS.md`, owner response v1.4 §1.8).

## §12.1 Blockers

| # | Item | Status |
|---|---|---|
| B1 | Discount wording | **superseded** — founding offer retired (handoff v1.1 B4, v1.2 §1.9, v1.4 §1.1); `tests/pilot.spec.ts` asserts no 40 / 24 / % / discount line |
| B2 | Insurance wording only in FAQ-05 | **done** — `tests/terminology.spec.ts`, `tests/areas.spec.ts` ("no insurance or guaranteed-security claim") |
| B3 | `/privacidad` reachable, linked from form and footer | **done** for footer and application block (`tests/legal.spec.ts`, `tests/solicitud.spec.ts`); "checkbox unchecked by default" lives in the Typeform, not the site (TZ Bloque Solicitud App. A) |
| B4 | Domain `clavera.ar`, 301s, Meta verification | **owner value** — domain, hosting, redirects, Meta verification (brief §9.1); nothing on the site can close it |
| B5 | Test lead carries all hidden fields | **superseded/owner** — now TZ Bloque Solicitud §6 items 15–17 (end-to-end hidden-field test with the real form); needs the form URL |

## §12.2 Content

| Item | Status |
|---|---|
| No Tier-1 word in copy, meta, alt, URL, file names (3 languages) | **done** — `tests/terminology.spec.ts`, `tests/terminology-scanner.spec.ts`, `tests/solicitud.spec.ts` |
| No "40 s" / "10 min" | **done** — `tests/areas.spec.ts` ("no minutes from home"), copy grep clean |
| No "La mitad de una cochera…" slogan | **done** — absent from copy |
| "Belgrano" absent; Paternal and Almagro present | **superseded** — owner response v1.2 §1.8 zone list includes three Belgrano zones; Paternal and Almagro present (`tests/areas.spec.ts`) |
| S7 comparison present, CLAVERA price cell without number | **done** — `tests/survey.spec.ts` "no monetary price", S7 scoped disclaimer in `tests/terminology.ts` |
| Every render has figcaption + alt with the disclosure | **done** — `tests/media.spec.ts` |
| 24/7 not in hero; only in the scoped places | **done** — `find247PlacementViolations` (`tests/terminology.ts`) |
| Exactly one `<h1>` | **done** — `tests/structure.spec.ts`; `/solicitud` too (`tests/solicitud.spec.ts`) |
| Form: 4 visible fields, no WTP question, no "Marca y modelo" | **superseded** — the site has no own form; the application Typeform's fields are TZ Bloque Solicitud App. A (built by the owner) |
| Survey link goes to the Spanish survey | **done** — `tests/survey.spec.ts` (ES/EN → ARGCABA, RU → latam by decision) |
| FAQ: 10 questions, each answer starts with the answer | **done** for the count (10); "direct answer first" is an editorial check — **not done (review)** |
| `/gracias` price page | **superseded** — no `/gracias`, no price reveal (handoff v1.1 B4, v1.4 §1.2) |

## §12.3 Technical

| Item | Status |
|---|---|
| LCP ≤ 2.0 s mobile 4G | **not done (field measurement)** — local report only: `tests/perf-budget.spec.ts` gives 0.26–0.34 s LCP, CLS ≤ 0.035 on the local build; 4G/Buenos Aires needs the deployed site (C12 manual Lighthouse) |
| Content visible without JS | **done** — `tests/survey.spec.ts` / `tests/m5-2.spec.ts` no-JS cases; application link defaults without JS (`tests/solicitud.spec.ts`) |
| hreflang × 3 + x-default, self canonicals | **done** — `tests/locale-head.spec.ts`; canonicals are built from `Astro.site`, so absolute URLs wait on the domain (B4) |
| JSON-LD Organization/WebSite/Service/FAQPage | **done, provisional (C9, branch `agent/clavera-m9-local-20261006`)** — built only from on-page text (`StructuredData.astro`, `tests/seo.spec.ts`); M9 still needs owner approval before it counts |
| No LocalBusiness/Offer/AggregateRating | **done** — `tests/seo.spec.ts` |
| `/llms.txt` | **owner value** — the brief §8.3 template names cameras and "zonas prioritarias", both removed by later decisions (B5, v1.2); new wording is owner copy |
| `robots.txt` not blocking AI crawlers | **done, provisional** — `public/robots.txt` allows all; no Sitemap line until the domain is confirmed (`tests/seo.spec.ts`) |
| `sitemap.xml` with all languages | **owner value** — needs the domain for absolute URLs (plan C9: no file while the domain is `null`) |
| Cookie banner with separate consent | **superseded** — no analytics or tracking at all (v1.1 §1, v1.4 §1.7); `/cookies` declares only the language cookie; `tests/solicitud.spec.ts` asserts no storage |
| SPF / DKIM / DMARC | **owner value** — mail domain setup |
| No personal data in URLs | **done** — `tests/pilot.spec.ts` (allowlist), `tests/survey.spec.ts` (fragment values), `tests/solicitud.spec.ts` (§3.4 rules) |
| WCAG AA: contrast, labels, focus, accordion | **done (automated part)** — `tests/a11y.spec.ts` (axe), `tests/interaction.spec.ts`; FAQ uses native `<details>`/`<summary>`, not `<button aria-expanded>` — accessible by platform semantics, differs from the brief's wording; manual keyboard/VoiceOver pass **not done (C12)** |
| Test lead reaches CRM and operator | **owner value** — Typeform → Google Sheets pipeline is the owner's (TZ Bloque Solicitud App. A) |

## §6.5 Technical SEO (beyond §12.3)

| Item | Status |
|---|---|
| `/gracias` noindex | **superseded** — no `/gracias` |
| Absolute https canonicals, one trailing-slash style | **owner value** — domain |
| Redirects `clavera.com.ar`, `www`, http → https; builder domain noindex/301 | **owner value** — hosting |
| All content in server HTML | **done** — static Astro output |
| Images: width/height, srcset, AVIF+WebP | **done** — `tests/media.spec.ts` |

## §9 Technical requirements (beyond the above)

| Item | Status |
|---|---|
| §9.2 fonts ≤ 2 files, self-hosted | **owner decision (C10)** — today 3 families from the Google Fonts CDN: 7 font files on ES/EN, 10 on RU, 8–11 requests to Google (`tests/perf-budget.spec.ts`); self-hosting needs the font decision, CDN needs the processor listed in `/privacidad` |
| §9.2 JS ≤ 100 KB | **done** — three small inline first-party scripts (zone selector, language switcher, application link) |
| §9.3 reduced motion respected | **done** — global rule in `global.css`; `tests/m5-2.spec.ts`, `tests/motion.spec.ts` |
| §9.4 own form backend | **superseded** — Typeform by decision (`PROJECT_DECISIONS.md` Lead capture; TZ Bloque Solicitud §0) |
| §9.5 GA4 + Pixel after consent | **superseded** — no analytics (v1.4 §1.7) |
| §9.6 HTTPS, HSTS, CSP, nosniff, Referrer-Policy | **owner value** — hosting headers; nothing in the static build sets them |

## §12.4 B2B pages and §12.5 gates

`/desarrolladores` and `/espacios` are unbuilt (footer shows plain text, `AVAILABLE_ROUTES`); §12.4 applies only when they are built. G1 publication = B1–B3: B1 superseded, B2 done, B3 done on the site side. G2 paid traffic needs B4, the TZ hidden-field test, and §12.3; G3–G7 are business gates outside the site.

## What engineering can still do without the owner

1. ~~C9 locally~~ done provisionally (JSON-LD, robots.txt); `/llms.txt` waits on owner wording; no sitemap until the domain exists.
2. An editorial pass on "FAQ answers start with the answer".
3. ~~C10 font facts~~ done: `FONTS_DECISION_FACTS.md` (RU headings fall back to Helvetica/Arial: Plus Jakarta Sans has no basic Cyrillic).
