# M5.2 interaction fix

Base: b87610d. A Chromium run of `tests/m5-2.spec.ts` failed in two places.

## 1. Escape left the S10 list open (test line 161)

Cause: the field is `<input type="search">`. On Escape, Chromium clears a
non-empty search field itself and fires `input`. The component's keydown
handler closed the list first. The `input` handler then reset the selection
and called `filter()` with an empty query, which reopened the full list. That
only happens after a choice (the field is not empty), which is what the test
does.

Fix (`src/components/lead-form/ZoneSelector.astro`): the Escape handler calls
`event.preventDefault()` before `close()`. Escape now only closes the popup,
as the APG combobox pattern expects. The chosen barrio stays selected, and
"Seguir" keeps the zone href. The assertion is unchanged.

Decision: Escape never clears the field, even when the list is already
closed. If clearing were allowed there, the `input` event would reopen the
list. Users can still clear the field with the search field's native clear
button or by deleting the text.

## 2. S10 focus position (test line 179, `box.y` = 11347)

The test already called `page.setViewportSize(PHONE)` before `goto`, so a
missing viewport does not explain the failure. `box.y` = 11347 means the page
had not scrolled yet. `html` has `scroll-behavior: smooth` (without reduced
motion), so `focus()` starts an animated scroll, and the test read the
position right away.

Fix (`tests/m5-2.spec.ts`): the test keeps the phone viewport and checks that
it is set. It waits for fonts, asserts focus, then waits until `scrollY` stays
the same for 10 animation frames before measuring. The header and viewport
assertions are unchanged. They are now checked where focus comes to rest.

## Not verified here

This session had no shell access, so typecheck, build and the Chromium run
were not executed. Run the local acceptance script. If line 179 still fails
after the scroll settles, the resting position itself is wrong. Record that
as a separate layout issue; the test should not absorb it.
