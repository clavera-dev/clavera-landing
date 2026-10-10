# Launch checklist — domain, hosting, deploy (2026-10-10)

Hosting is already decided: Cloudflare (PROJECT_DECISIONS.md, Technical stack). Cloudflare Pages is free for a static site, so no paid service is needed. Primary domain `https://clavera.ar`; `clavera.com.ar` and `www` redirect to it (PROJECT_DECISIONS.md, Domains). `astro.config.mjs` already has `site: 'https://clavera.ar'`.

## Ready in the repo (this PR, no owner action)
- `public/_headers`: security headers, immutable cache for `/_astro/*` and `/fonts/*`, `X-Robots-Tag: noindex` on `*.pages.dev` (brief 6.5).
- `.node-version` (22) so Cloudflare builds with the same Node as `package.json` engines.
- `.github/workflows/ci.yml`: `yarn astro check` + `yarn build` on PRs and main. Deploy is NOT here; Cloudflare's Git integration builds on push, so no secrets are stored in GitHub.
- Cloudflare Pages settings: framework Astro, build `yarn build`, output `dist`, `NODE_VERSION=22`, production branch `main`.

## Owner-only (see handoff/clavera/LAUNCH_STEPS.md)
Domain registration/holder check, Cloudflare account and Pages project, DNS, redirects, deploy approval.

## Depends on the lawyer / owner values (public deploy stays blocked until resolved)
- `/privacidad`, `/terminos`, `/cookies` final sign-off, or the owner's written decision to publish without it (PROJECT_DECISIONS.md, Legal and publishing gates).
- Domain holder and company data (CUIT/legal name) for `.ar` registration and for the legal pages.
- RNBD number (`src/config/legal.ts` stays absent until issued) and `LEGAL_LAST_UPDATED` (`null` until a real date).
- S7 comparison legal approval (or a separately approved exclusion).

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
