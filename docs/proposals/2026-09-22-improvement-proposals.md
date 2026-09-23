# Improvement Proposals — 2026-09-22

Scoped fallback proposal — no actionable `stage:build`/`stage:review` work
was queued at sync time. All four open `ai-task` issues are `stage:plan`,
which the dispatcher ignores: `#121` (social media presence), `#113`
(service-launch plan, also `needs:karl`), `#112` (positioning Task Force
products under Winters Operations' service lines), and `#70` (2026-09-05
weakness review) are all product/business scoping discussions with no build
scope, not code-level findings. The only other open PRs are two Dependabot
bumps, `#110` and `#107`, both `blocked`+`needs:karl` and carrying no
`ai-task` label — outside this pipeline entirely. The state-store issue
(`#125`) is machine-managed bookkeeping, not a work item.

These are grounded in the current state of the repo on `main` and checked
against all six prior proposal rounds in `docs/proposals/` (2026-08-29,
2026-08-30, 2026-09-05, 2026-09-08, 2026-09-13, 2026-09-14, 2026-09-15)
first, to avoid re-proposing anything already addressed or already tracked.
Confirmed still open and unfixed on `main` as of this pass, so not repeated
here (each already has a written proposal on file): the two 2026-09-14 items
(`README.md`'s stale project-structure tree; the four `app/guides/**` pages
building `metadata` inline instead of via `createPageMetadata()`), and all
three 2026-09-15 items (`scripts/verify-metadata.mjs`'s `routes` array still
lists seven routes, missing `/guides` and the three guide slugs; no
`@vitest/coverage-v8`/`test:coverage` exists in `package.json` or
`vitest.config.ts`; `components/StatsBand.tsx`'s `CountUp` still has no
`prefers-reduced-motion` check around its `requestAnimationFrame` loop).
This round instead looks for genuinely new gaps, in different files.

---

## 1. `NetworkTopology.tsx`'s hero animation ignores `prefers-reduced-motion` entirely — via a mechanism CSS media queries can't reach

**Idea:** In `components/NetworkTopology.tsx`, gate the three SVG
`<animate>` elements (the five spoke-node opacity pulses and the two
hub "ping" animations, all `repeatCount="indefinite"`) behind a
`prefers-reduced-motion` check — e.g. read `window.matchMedia
("(prefers-reduced-motion: reduce)").matches` in a small client wrapper
and conditionally omit the `<animate>` children (or set `dur="0s"`) when
the visitor has that preference set, rather than always rendering them.

**Rationale:** `README.md` states "All motion is disabled under
`prefers-reduced-motion`," and the site does have a working pattern for
this — `app/globals.css` has a `prefers-reduced-motion: reduce` override
for `.reveal` (lines 100-107) and the tech marquee (lines 123-127), and the
2026-09-15 round already flagged the one CSS/JS-animation gap in
`StatsBand.tsx`. But `NetworkTopology.tsx` is a different failure mode:
its three `<animate>` elements (lines 39-45, 51, 52) are native SVG SMIL
animations, not CSS `animation`/`transition` properties, so a CSS
`@media (prefers-reduced-motion: reduce)` rule in `globals.css` cannot
touch them at all — there's no CSS hook to intercept. This component
renders unconditionally in the homepage hero (`app/page.tsx`), so every
visitor who has set the OS-level reduced-motion preference still gets five
looping opacity pulses and two expanding "ping" rings, indefinitely,
before they've scrolled or interacted with anything. It's the same
documented-but-unmet guarantee as the `StatsBand` gap, just in a component
that needs a different (JS-driven) fix because the CSS override pattern
doesn't apply here — worth tracking as its own narrow, low-risk item
rather than assuming the `StatsBand` fix will also cover it.

## 2. `scripts/verify-contact.mjs`'s CTA allow-list still doesn't include the four guides pages

**Idea:** Add `app/guides/page.tsx`, `app/guides/meraki-estate-hygiene/page.tsx`,
`app/guides/sdwan-spoke-readiness/page.tsx`, and
`app/guides/small-business-site-scope/page.tsx` to the `publicCtaFiles`
array in `scripts/verify-contact.mjs` (currently `components/ContactSection.tsx`,
`app/about/page.tsx`, `app/demo/page.tsx`, `app/itops-console/page.tsx` —
four files checked for a site where at least eight pages render a
public contact CTA).

**Rationale:** This script runs in CI (`ci.yml`'s `verify:contact` step)
and asserts that none of the listed "public CTA" pages fall back to a raw
`mailto:` link instead of going through the Google Form/Formspree-backed
`ContactForm` — but, like the `verify-metadata.mjs` blind spot the
2026-09-15 round found and fixed the reasoning for (a different script,
not yet fixed itself, so not repeated here), the guides pages were never
added to this second script's allow-list either. All four guides pages
render `<ContactSection />` (confirmed by grep: `app/guides/page.tsx` and
the three individual guide pages all import it, same as `about`/`demo`/
`itops-console`), so they're exactly the kind of page this check exists to
protect — but today a regression that reintroduced a bare `mailto:` link
on any guides page would ship through CI undetected, because
`verify-contact.mjs` simply never reads those four files. This is
independent, narrow config work (extending an existing array of string
literals, no logic change) and doesn't depend on the still-open 2026-09-14
metadata fix for the same four files.

## 3. `SiteHeader`'s mobile menu has no Escape-to-close, unlike its correctly-implemented `aria-expanded` state

**Idea:** In `components/SiteHeader.tsx`, add a `keydown` listener (e.g. a
`useEffect` that attaches while `open` is `true`) that closes the mobile
nav sheet on `Escape`, matching the existing pattern where clicking a nav
link or the Contact button already calls `setOpen(false)` (lines 57, 61).

**Rationale:** `SiteHeader.tsx`'s toggle button is otherwise built
correctly for the disclosure pattern — it has `aria-expanded={open}` and
an `aria-label="Toggle menu"` (lines 39-40) — but once the sheet is open
(lines 53-66), there is no keyboard path to close it other than tabbing
all the way to a link and activating it; `Escape`, the standard way to
dismiss an open disclosure/menu per the WAI-ARIA authoring practices, does
nothing. A repo-wide search confirms there is no existing `keydown`/
`Escape` handling anywhere in `components/` or `app/` to extend — this
would be new, self-contained behavior, not a duplicate of something
already there. It's a small, narrow fix (one effect, one key check) on a
component that appears on every route (`SiteHeader` is rendered from the
root layout), with no product-direction question involved.

---

## Explicitly out of scope

None of the three items above touch `#121`, `#113`, `#112`, or `#70` (all
product/business-scoping discussions, not code-level findings), and none
touch `#110` or `#107` (Dependabot dependency bumps, already `blocked` +
`needs:karl`, outside this pipeline). All three are narrow, independently
reviewable, low-risk changes to non-governance files
(`components/NetworkTopology.tsx`, `scripts/verify-contact.mjs`, and
`components/SiteHeader.tsx`) — no product-direction decision is required
to evaluate any of them.

---

Feedback and critique welcome from any Task Force reviewer — including
disagreement that any of these is worth doing at all.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
