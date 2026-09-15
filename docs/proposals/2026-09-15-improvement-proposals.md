# Improvement Proposals — 2026-09-15

Scoped fallback proposal — no actionable `stage:build`/`stage:review` work
was queued at sync time. The three open `ai-task` issues (`#113`, `#112`,
`#70`) are all `stage:plan` design/scoping discussions with no agent
assigned, which the dispatcher ignores; the five open PRs (`#106`–`#110`)
are all Dependabot dependency bumps with no `ai-task` label, outside this
pipeline's scope and not touched by this change.

These are grounded in the current state of the repo (`main` @ `ba06c4d`) and
checked against all six prior proposal rounds in `docs/proposals/`
(2026-08-29, 2026-08-30, 2026-09-05, 2026-09-08, 2026-09-13, 2026-09-14)
first, to avoid re-proposing anything already addressed or already tracked.
Confirmed still-current as of this pass: the two items from the 2026-09-14
round (`README.md`'s stale project-structure tree, and the guides pages
bypassing `createPageMetadata()`) are both still unfixed on `main` — they
are not repeated here since they already have a written proposal on file;
this round looks for genuinely new gaps instead. Everything from
2026-08-29/08-30/09-05/09-08 has shipped: `ci.yml` now runs
lint/test/verify:contact/verify:metadata, `ContactForm.tsx` no longer uses
`no-cors`, `__tests__/` now covers the contact form and both dashboard
pages, internal links use `next/link` site-wide, the topology SVG's
clickable nodes have `role="button"`/keyboard support, the sitemap derives
`lastModified` from git history instead of `new Date()`, and the dead `pip`
Dependabot ecosystem entry is gone.

---

## 1. `scripts/verify-metadata.mjs` has a blind spot: four live routes are never checked

**Idea:** Add `/guides`, `/guides/meraki-estate-hygiene`,
`/guides/sdwan-spoke-readiness`, and `/guides/small-business-site-scope` to
the `routes` array in `scripts/verify-metadata.mjs` (currently `/`,
`/services`, `/work`, `/demo`, `/about`, `/itops-console`,
`/network-topology` — seven routes for a site that ships eleven public
pages).

**Rationale:** This script runs in CI (`ci.yml`'s `verify:metadata` step)
and asserts every listed route has exactly one canonical link, one
`og:url`, and an `og:image`/`twitter:image` pointing at
`/opengraph-image` — but `app/guides/page.tsx` and the three individual
guide pages were simply never added to the list, so CI is silently blind to
regressions on a quarter of the site's routes. This isn't hypothetical: per
the still-open 2026-09-14 proposal, the three guide detail pages currently
set a bare `export const metadata` object instead of calling
`createPageMetadata()`, meaning they almost certainly have no canonical tag
and no OG image today — and `verify:metadata` passes cleanly anyway,
because it never looks. Fixing the route list is independent, low-risk
config work (extending an existing array of string literals, no logic
change) that is valuable regardless of whether/when the 09-14 metadata fix
itself lands: it will either immediately catch the current gap (failing CI
until that fix merges) or confirm the fix worked and keep guarding it after.

## 2. No test-coverage reporting, and large stretches of the app have zero test coverage

**Idea:** Add `@vitest/coverage-v8` and a `test:coverage` script (`vitest
run --coverage`), with a coverage summary at minimum surfaced in CI output
(a hard threshold/fail-under is a reasonable follow-up once a baseline
exists, but isn't required to get value from this).

**Rationale:** `vitest.config.ts` has no `coverage` block and
`package.json` has no coverage script, so there is no visibility into how
much of the app any test actually exercises. `__tests__/` currently has
exactly three files — `contact-form`, `itops-console`, and
`network-topology` — and nothing else: `SiteHeader.tsx` (the sticky nav
with a stateful mobile-menu sheet, present on every route), `ContactSection`,
`Reveal`, `TechMarquee`, `CopyEmailButton`, `StatsBand`, and every static
page (`app/page.tsx`, `about`, `services`, `work`, `guides`) have no
dedicated tests at all. Without a coverage number, that gap is invisible in
CI output — `npm test` passing green looks the same whether it's checking
80% of the app or 20%. This doesn't ask for 100% coverage or gatekeeping
today, just making the current, already-large blind spot visible so the
Task Force can prioritize it deliberately instead of by accident.

## 3. `StatsBand`'s count-up animation ignores `prefers-reduced-motion`

**Idea:** In `components/StatsBand.tsx`'s `CountUp` component, check
`window.matchMedia("(prefers-reduced-motion: reduce)")` before starting the
`requestAnimationFrame` loop, and render the final `value` immediately when
the user has that preference set (matching how `.reveal` and the tech
marquee already behave).

**Rationale:** `README.md` states plainly that "All motion is disabled
under `prefers-reduced-motion`," and `app/globals.css` backs that up for
CSS-driven effects — `.reveal` (lines 100-107) and the marquee animation
(lines 123-127) both get a `prefers-reduced-motion: reduce` override. But
`StatsBand`'s number count-up (the "30+ years / 500+ sites / 100% hands-on"
strip that appears on the homepage) is driven entirely by a JS
`requestAnimationFrame` loop in `CountUp` with no reduced-motion check
anywhere in the component — so a visitor who has set that OS-level
preference still gets a ~1-second animated ease-out count from 0 to the
target number. It's a small, self-contained fix (one `matchMedia` check
gating whether the `tick` loop runs vs. `setCount(value)` firing
immediately) that closes a real gap between what the README documents and
what the code actually does.

---

## Explicitly out of scope

None of the three items above touch `#113`, `#112`, or `#70` (all
Commander/Karl-level scoping discussions, not code-level findings), and none
touch any Dependabot PR (`#106`–`#110`). All three are narrow,
independently reviewable, low-risk changes to non-governance files
(`scripts/verify-metadata.mjs`, test tooling config, and one component) —
no product-direction decision is required to evaluate any of them.

---

Feedback and critique welcome from any Task Force reviewer — including
disagreement that any of these is worth doing at all.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
