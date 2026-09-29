# WhatsApp Business short link — local implementation result

Date: 2026-09-29. Local-only worktree change; not built, not deployed, not published.

## Input

Owner-supplied WhatsApp Business short link, received 2026-09-29:

```
https://wa.me/message/VWLBN6XDY6ZHP1
```

This is a `wa.me/message` short link, **not** an international phone number. It has **not been verified by clicking it** in this task. The RNBD registration number is reportedly being obtained by the owner but has not been supplied, and is not invented or displayed anywhere by this change.

## Exact changes

- `src/config/contact.ts`
  - Added `WHATSAPP_LINK: string | null`, set to the exact link above.
  - Added `isValidWhatsappLink(link)`, a pure validator matching only `^https://wa\.me/message/[A-Za-z0-9]+$`.
  - `whatsappHref()` now prefers `WHATSAPP_LINK` (returning it only if `isValidWhatsappLink` passes, else `null`), then falls back to the existing `wa.me/<number>` construction from `WHATSAPP_NUMBER` if a phone number is ever supplied instead, then `null`.
  - `WHATSAPP_NUMBER` is untouched (`null`) — never derived from the short link.
  - Updated the file's doc comments to describe the link/number distinction.
- `src/components/layout/Footer.astro`: updated the comment above `whatsappHref()` to describe the link-based behavior. No logic change — it already branched on `whatsappHref()` returning `null` vs. a URL.
- `src/i18n/types.ts`: updated the `whatsappPending` doc comment to reference `whatsappHref()` returning `null` rather than naming only `WHATSAPP_NUMBER`.
- `tests/pilot.spec.ts`: replaced the `whatsapp placeholder` suite with a `whatsapp configuration` suite:
  - Unit test that `whatsappHref()` returns exactly `WHATSAPP_LINK` when set (and validates it), else the number-based URL, else `null`.
  - Unit test that `WHATSAPP_NUMBER` stays `null` while `WHATSAPP_LINK` is configured (no fabrication).
  - Unit test that `isValidWhatsappLink` rejects malformed/wrong-host/non-https/injected variants and accepts the real link.
  - Per-locale (ES/EN/RU) end-to-end test: when configured, asserts the footer contains exactly one anchor whose `href` equals the exact configured link (`footer a[href="https://wa.me/message/VWLBN6XDY6ZHP1"]`), no `href="#"`, and no lingering "pending" WhatsApp text; when `null`, asserts the previous no-anchor/localized-text behavior.
- `tests/links.spec.ts`: the footer "pending entries" count is now computed from `whatsappHref()` (2 when configured — `/espacios`, `/desarrolladores` — instead of the previous hard-coded 3) so the assertion stays correct in both states.
- `CLAUDE.md`: updated the `WHATSAPP_NUMBER`-only rule (line ~30) to describe the link-first, number-fallback behavior in `src/config/contact.ts`.
- `PROJECT_DECISIONS.md`: added a dated note (2026-09-29) recording the supplied link, that it is unverified by click, that it is a short link and not a phone number, and that the RNBD number remains unsupplied and uninvented. Bumped "Last updated" to 2026-09-29. Historical, date-stamped log entries elsewhere in this file and in `CLAVERA_WORKLOG.md` / `CLAVERA_EXECUTION_PLAN.md` that predate this change (e.g. "WhatsApp number is still pending" under "Owner decisions recorded 2026-08-23") were left as-is, per this repository's own convention of preserving historical text and layering superseding notes rather than rewriting past entries.

## What did not change

- No phone number was invented or added anywhere.
- No RNBD number was invented or displayed.
- Legal copy (`src/config/legal.ts`, `src/content/legal/`) was not touched.
- No network call, click-through verification, publish, deploy, or push was performed.

## Checks

- Read-through of `src/config/contact.ts`, `Footer.astro`, `src/i18n/{types,es,en,ru}.ts`, `tests/pilot.spec.ts`, `tests/links.spec.ts` for consistency after the edit.
- Could **not** run `yarn astro check`, `yarn build`, or the Playwright suite in this environment (no shell/command execution tool available in this session). The changes are minimal and type-shaped consistently with the existing `contact.ts`/`typeform.ts` patterns, but a build/typecheck/Playwright run is still owed before this is considered verified — flagging this explicitly rather than claiming a pass that didn't happen.

## Next unit

Run `yarn astro check`, `yarn build`, and `yarn test` (Playwright) to confirm the new/updated tests pass and nothing else regressed, then have Kirill/Codex review per the normal protocol. Not blocked on the lawyer or RNBD for this feature.
