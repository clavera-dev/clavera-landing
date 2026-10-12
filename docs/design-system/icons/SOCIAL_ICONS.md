# Social / contact icons (owner pack v1, 2026-10-12)

Separate from the Tabler stroke family (functional icons) and from the Pliegue test icons
(custom feature pictograms, not adopted). Brand glyphs are solid by nature and are the
accepted exception to the "2px linework" rule: platform marks are not redrawn.

- Data: `src/components/icon/social-glyphs.ts` (10 glyphs: instagram, tiktok, threads,
  google-maps, facebook-f, whatsapp, telegram, youtube, envelope, globe), each pre-placed in a 24x24 box.
- Component: `src/components/icon/SocialIcon.astro` (`name`, `size` 24 default or 20 for compact text).
  Paints with `currentColor`, so the DS text/accent tokens and hover states apply. Decorative
  (`aria-hidden`): always paired with a visible text label.
- Click target: the whole link, at least 44px tall on small screens (footer rule).
- Colours per surface: dark `--accent` amber-500 / light #9F5100 / graphite / paper. On the site
  the footer link colour is used (`--text-secondary`, hover `--accent`).
- Licences: `public/brand/icons/ATTRIBUTION.md`. Full cleaned set: handoff `icons/`.
- Not shown in the UI yet: Threads, Telegram, YouTube, Google Maps, Website (no verified profile URLs).
  Phone has no glyph in the pack.
