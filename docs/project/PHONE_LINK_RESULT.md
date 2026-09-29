# Click-to-call phone number — local implementation result

Date: 2026-09-29. Local-only worktree change; not built, not deployed, not published, not called.

## Input

Owner-supplied WhatsApp Business phone number, for display as a click-to-call number, received 2026-09-29:

```
+5491128329931
```

This is an international (E.164) phone number, supplied **in addition to**, not instead of, the existing owner-supplied `wa.me/message/VWLBN6XDY6ZHP1` short link (see `WHATSAPP_LINK_RESULT.md`). It has **not been verified by calling it** in this task. It is not derived from the short link, and the short link is not derived from it: the two remain independent, owner-supplied values.

## Exact changes

- `src/config/contact.ts`
  - Added `PHONE_NUMBER: string | null`, set to `'+5491128329931'`.
  - Added `PHONE_DISPLAY: string | null`, set to `'+54 9 11 2832-9931'` (the human-readable rendering used as the link text).
  - Added `isValidPhoneNumber(number)`, a pure E.164 validator (`^\+[1-9]\d{7,14}$`).
  - Added `telHref()`: returns `` `tel:${PHONE_NUMBER}` `` when `PHONE_NUMBER` is set and valid, else `null`. Mirrors the `whatsappHref()` null-safety contract — never a placeholder or malformed URL.
  - `WHATSAPP_NUMBER` and `WHATSAPP_LINK` are untouched. The phone number is *not* written into `WHATSAPP_NUMBER`, so it can never be used to construct a `wa.me/<number>` fallback URL in `whatsappHref()`.
- `src/components/layout/Footer.astro`
  - Imports `telHref` and `PHONE_DISPLAY`.
  - Renders a new `<li>` in the same contact `<ul>` as WhatsApp: `<a href={phone}>{PHONE_DISPLAY}</a>` when `telHref()` is non-null, else `<span class="site-footer__pending-item">{copy.footer.phonePending}</span>` — same treatment as the WhatsApp entry, and a separate list item/anchor from it (no merged or duplicate control).
- `src/i18n/types.ts`: added `footer.phonePending: string` to the shared `Copy` type, documented the same way as `whatsappPending`.
- `src/i18n/{es,en,ru}.ts`: added the localized `phonePending` string:
  - es: `Teléfono — próximamente.`
  - en: `Phone — coming soon.`
  - ru: `Телефон — скоро.`
- `tests/pilot.spec.ts`: added a `phone configuration` describe block, parallel to `whatsapp configuration`:
  - Unit test that `telHref()` returns exactly `` `tel:${PHONE_NUMBER}` `` when configured, else `null`.
  - Unit test that the phone destination is distinct from `whatsappHref()` and not textually derived from `WHATSAPP_LINK`.
  - Unit test that `isValidPhoneNumber` rejects malformed numbers (missing `+`, leading zero, non-digit, spaces, too short) and accepts the real number.
  - Per-locale (ES/EN/RU) end-to-end test: when configured, asserts the footer contains exactly one anchor whose `href` equals the exact `tel:` value, that it differs from the WhatsApp anchor's `href`, and that no "pending" phone text remains; when `null`, asserts no `a[href^="tel:"]` and the localized pending text.
- `tests/links.spec.ts`: the footer "pending entries" count now accounts for both `whatsappHref()` and `telHref()` independently (`2 + (whatsapp null ? 1 : 0) + (phone null ? 1 : 0)`), instead of only branching on WhatsApp, so the assertion stays correct in all four combinations of configured/unconfigured.
- `PROJECT_DECISIONS.md`: added a dated note (2026-09-29) recording the supplied number, that it is unverified by calling, that it is additive to (not a replacement for) the WhatsApp short link, and the pending-fallback behavior if either is unset later.

## What did not change

- The WhatsApp chat destination (`WHATSAPP_LINK`) is unchanged — no `wa.me` URL was derived from the phone number.
- `WHATSAPP_NUMBER` remains `null`.
- No RNBD number was invented or displayed.
- Legal copy (`src/config/legal.ts`, `src/content/legal/`) was not touched.
- No network call, phone call, message, publish, deploy, or push was performed.

## Checks

- Read-through of `src/config/contact.ts`, `Footer.astro`, `src/i18n/{types,es,en,ru}.ts`, `tests/pilot.spec.ts`, `tests/links.spec.ts` for consistency after the edit.
- **No shell/command-execution tool was available in this session.** `yarn astro check`, `yarn build`, and the Playwright suite (`yarn test`) were **not run**. The new/changed code is type-shaped consistently with the existing `contact.ts`/`whatsappHref()` pattern it mirrors, but a build/typecheck/Playwright run is still owed before this is considered verified by acceptance — flagging this explicitly rather than claiming a pass that did not happen.

## Next unit

Run `yarn astro check`, `yarn build`, and `yarn test` (Playwright — in particular `tests/pilot.spec.ts` "phone configuration" and the updated `tests/links.spec.ts` pending-count assertion) to confirm the new/updated tests pass and nothing else regressed, then have Kirill/Codex review per the normal protocol. Not blocked on the lawyer or RNBD for this feature.
