# Cross-browser QA, 2026-10-10 (workstream C)

Scope: Chromium run in the cloud container; Firefox/WebKit steps for a Mac session at the end.

## Measured in the cloud (Chromium 1194, local `dist` build)

| Check | Result |
|---|---|
| `yarn build` | pass, 12 pages |
| Full Playwright suite, `--project=chromium` | 30 passed, 0 failed |
| Tab order ES / EN (1280px) | logical, 40 stops, no keyboard trap, visible focus indicator on every stop |
| Zone selector by keyboard (type, ArrowDown, Enter, Escape) | works; Enter sets `candidate_zone` in the Continue href; typing again resets the href to the base survey link |
| Horizontal overflow at 320px (ES, EN) | none |
| EN survey links (hero, zones, founders, survey block) | all carry "The survey is in Spanish." and are linked by `aria-describedby` |
| External links | `wa.me` link has `target=_blank` with `rel="me noopener noreferrer"`; Typeform links carry only allowlisted fragment params |
| Console errors | EN, RU clean. ES shows one 404: `/favicon.ico` (no favicon yet, designer asset pending; owned by workstreams D/G, not changed here) |

## Not measurable in the cloud

- Firefox and WebKit: the container has no such browsers, and the Playwright download hosts return 403 through the proxy.
- Live reachability of Typeform, Instagram, Facebook, TikTok and WhatsApp links: the proxy blocks these hosts. Hrefs were verified, not the destinations.
- VoiceOver pass and Lighthouse on a real device.

## Defects found

None requiring a code change. No source files were modified.

## Steps for a Mac session (Firefox, WebKit, live links)

Run from the repository root:

1. `yarn install --frozen-lockfile`
2. `npx playwright install firefox webkit`
3. `yarn test` (config already runs chromium, firefox and webkit; it builds and serves `dist` itself). Expect 0 failures; report any per-engine failure with its trace.
4. Manual, in real Safari and Firefox, at `/`, `/en/`, `/ru/`: tab through the page, use the zone selector with the keyboard, check the language switcher, FAQ `<details>` toggling, and that no layout overflow appears at 375px (Safari responsive mode).
5. Click each external link once: both Typeform surveys (ES `ARGCABA`, RU `latam`), WhatsApp Business, Instagram, Facebook, TikTok, `tel:` and `mailto:`. Confirm they open and the Typeform URL fragment does not break the form.
6. VoiceOver (Cmd+F5) on `/` and `/en/`: landmarks, the zone combobox announces its options, the "survey is in Spanish" notice is read with the link.

## Results of the Mac run (local, 2026-10-10 ~16:08Z)

Reported by the coordinator session after a local run on the owner's Mac; not re-measured here.

| Check | Result |
|---|---|
| Playwright on Chromium, Firefox and WebKit | 1402 passed, 68 skipped by design, 0 failed |
| Live external links | Both Typeform surveys (ES, RU, including the `#` parameters), Instagram, Facebook and WhatsApp returned HTTP 200 |
| TikTok | HTTP 200 but a stub page; needs one manual visual check of the profile |
| Defects / code changes | None found, none made |

## Optional pre-launch checks (need a person at the screen)

- VoiceOver pass on `/` and `/en/` (steps 6 above).
- Manual visual pass in real Safari and Firefox (steps 4 above).
- Open the TikTok profile once and confirm it shows the real account.
