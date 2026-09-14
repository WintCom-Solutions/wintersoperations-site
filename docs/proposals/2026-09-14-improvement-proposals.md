# Improvement Proposals — 2026-09-14

Scoped fallback proposal — no actionable `stage:build`/`stage:review` work
was queued at sync time (the only open `ai-task` issue, `#70`, is
`stage:plan` and the dispatcher ignores it; the five open PRs are all
Dependabot dev-dependency bumps with no `ai-task` label, outside this
pipeline's scope). These are grounded in the current state of the repo and
checked against all five prior proposal rounds in `docs/proposals/`
(2026-08-29, 2026-08-30, 2026-09-05, 2026-09-08, 2026-09-13) and issue `#70`
first, to avoid re-proposing anything already addressed or already tracked.

All three items from the 2026-09-13 round are already shipped in current
code — `app/not-found.tsx` and `app/opengraph-image.tsx` both exist, and the
ContactForm behavior-tests PR (`#102`) is no longer open. Nothing from that
round is re-proposed here.

---

## 1. `README.md`'s "Project Structure" section no longer matches `app/`

**Idea:** Update the `Project Structure` tree in `README.md` to include the
routes and files that exist in the codebase today but aren't mentioned
anywhere in it: `app/guides/` (an index page plus three published guide
pages — `meraki-estate-hygiene`, `sdwan-spoke-readiness`,
`small-business-site-scope`), `app/itops-console/` and
`app/network-topology/` (interactive demo pages, each with its own test file
under `__tests__/`), `app/not-found.tsx`, and `app/opengraph-image.tsx`.

**Rationale:** A full directory listing of `app/` shows ten top-level
routes/files; `README.md`'s documented structure names four (`page.tsx`,
`services/page.tsx`, `work/page.tsx`, `about/page.tsx`, `demo/page.tsx`).
`app/sitemap.ts` already treats `guides`, `itops-console`, and
`network-topology` as first-class, indexed routes with real priorities and
change frequencies, and `__tests__/` already has dedicated coverage for two
of them — so this isn't stale content nobody uses, it's real, maintained
product surface that the repo's own onboarding doc doesn't mention. Anyone
using `README.md` as a map of the codebase (a new contributor, or an AI
session onboarding cold) would not know these pages exist.

## 2. The three guide pages bypass `createPageMetadata()`, so they ship with no canonical URL, no Open Graph data, and no Twitter card — and their description text has already started drifting from `lib/content.ts`

**Idea:** Update `app/guides/page.tsx` and the three individual guide pages
(`app/guides/meraki-estate-hygiene/page.tsx`,
`app/guides/sdwan-spoke-readiness/page.tsx`,
`app/guides/small-business-site-scope/page.tsx`) to build their `metadata`
export via `lib/metadata.ts`'s `createPageMetadata({ path, title,
description })` helper instead of a bare `export const metadata: Metadata =
{ title, description }` object — and for the three individual guides, source
`description` (and ideally `title`) from the matching entry in
`lib/content.ts`'s `guides` array instead of re-typing it inline.

**Rationale:** `createPageMetadata()` is what wires a page into
`alternates.canonical`, the full `openGraph` block (including the
1200×630 `socialImage` the 2026-09-13 round added), and
`twitter: { card: "summary_large_image", ... }` — every other page checked
(e.g. `app/itops-console/layout.tsx`) uses it. All four guides files instead
set only `title`/`description` directly, so they get Next.js's bare
defaults for everything else: no canonical tag (the one mechanism `README.md`
itself names for telling search engines `wintersoperations.com` is
authoritative over the `wint-ops.com` mirror), and no Open Graph/Twitter
image or card type for content whose entire purpose is being checklist-style
material people share (LinkedIn, Slack, email) — exactly the sharing pattern
the OG-image fix a day ago was meant to serve, but these four pages don't
call the helper that fix lives in. Separately, this duplication has already
produced real drift: `lib/content.ts`'s `guides[0].description` reads "A
practical list for finding stale configs, unused SSIDs, and credential drift
across a multi-site Meraki organization," while
`app/guides/meraki-estate-hygiene/page.tsx`'s own inline `metadata.
description` reads "Practical checklist for finding stale configs, unused
SSIDs, and credential drift across a multi-site Meraki organization" — close
but not identical, two hand-maintained copies of the same sentence already
disagreeing. Sourcing from `lib/content.ts` removes the second copy instead
of just fixing today's wording mismatch.

---

## Explicitly out of scope

Neither item touches issue `#70` (a separate, still-open `stage:plan`
weakness-review item) or any Dependabot PR currently open. Both are
docs/metadata-only fixes with no product-direction decision required, and
neither overlaps any prior round's still-open items (there are none — all
five prior rounds are either implemented or, per each round's own file,
were proposals only with no separate tracking issue left open).

---

Feedback and critique welcome from any Task Force reviewer — including
disagreement that either of these is worth doing at all.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
