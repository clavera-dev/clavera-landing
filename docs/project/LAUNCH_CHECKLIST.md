# Launch checklist — domain, hosting, deploy (2026-10-10)

Hosting is already decided: Cloudflare (PROJECT_DECISIONS.md, Technical stack). Cloudflare Pages is free for a static site, so no paid service is needed. Primary domain `https://clavera.ar`; `clavera.com.ar` and `www` redirect to it (PROJECT_DECISIONS.md, Domains). `astro.config.mjs` already has `site: 'https://clavera.ar'`.

## Ready in the repo (this PR, no owner action)
- `public/_headers`: security headers, immutable cache for `/_astro/*` and `/fonts/*`, `X-Robots-Tag: noindex` on `*.pages.dev` (brief 6.5).
- `.node-version` (22) so Cloudflare builds with the same Node as `package.json` engines.
- `.github/workflows/ci.yml`: `yarn astro check` + `yarn build` on PRs and main. Deploy is NOT here; Cloudflare's Git integration builds on push, so no secrets are stored in GitHub.
- Cloudflare Pages settings: framework Astro, build `yarn build`, output `dist`, `NODE_VERSION=22`, production branch `main`.

## Owner-only (see handoff/clavera/LAUNCH_STEPS.md)
Domain registration/holder check, Cloudflare account and Pages project, DNS, redirects, deploy approval.

## Publication gates (updated 2026-10-10 under Legal Spec v3.1 and Respuesta v1.5)
The lawyer's sign-off is **no longer a launch blocker**: Anna decided to publish without it (decision 04.10, confirmed 07.10; PROJECT_DECISIONS.md, owner response v1.5) and lawyer edits follow after launch. What still gates the public deploy:
- Anna names the publication date and hour **in writing**, after the Handoff v1.1 §6 checklist passes and she approves the preview.
- `LEGAL_LAST_UPDATED` in `src/config/legal.ts` is set to the real publication date (`null` until then; the three legal pages show "pending" text).
- RNBD number: the line stays unpublished until a number exists (Spec §11); the site does not wait for it unless the owner decides so. Registration "before launch" per Spec §2.1 is an owner action.
- Responsable name, CUIT and domicilio (Spec §11) are already supplied and live in `src/config/legal.ts` and the legal texts; nothing to fill.
- Domain holder for `.ar` registration (owner, LAUNCH_STEPS.md step 1).
- Machine STOP-list (Spec §9) must pass on the built site: `tests/stop-list-v31.spec.ts`.

## Config values still `null` (one-line activation each)
- `PILOT_INTEREST_DESTINATIONS` es/en/ru in `src/config/typeform.ts` (pilot control renders nothing while null; the research survey is primary).
- Meta domain verification (brief 9.1); SPF/DKIM/DMARC if mail is used on the domain.

## After the domain is live
- Add a `Sitemap:` line to `public/robots.txt` and a `sitemap.xml` (plan C9; needs the domain); optional `llms.txt` (needs owner copy).
- Lighthouse on the real URL, mobile 4G (LCP target 2.0 s, brief 12.3).
- Check: http -> https, `www` -> apex, `clavera.com.ar` -> apex (301), `*.pages.dev` returns noindex, hreflang canonicals are absolute `clavera.ar` URLs.
- Run the Playwright suite against the production URL.

## Not verified
The cloud sandbox blocks outbound access to `clavera.ar`, so whether the domain is registered, who holds it and where its DNS points was NOT checked; the owner confirms it in step 1 of LAUNCH_STEPS.md.
