# Improvement Proposals — 2026-09-23

Scoped fallback proposal — no actionable `stage:build`/`stage:review` work
was queued at sync time. All open `ai-task` issues (`#121` social media
presence, `#113` service-launch plan, `#112` positioning Task Force
products under Winters Operations' service lines, `#70` 2026-09-05 weakness
review) are `stage:plan`, which the dispatcher ignores — product/business
scoping discussions, not code-level build scope. The only other open PRs
are six Dependabot bumps (`#129`, `#130`, `#132`, `#133`, `#135`, `#136`),
all `blocked`+`needs:karl` and outside this pipeline. The state-store issue
(`#125`) is machine-managed bookkeeping, not a work item.

These are grounded in the current state of the repo on `main` (`51c1f1d`)
and checked against all seven prior proposal rounds in `docs/proposals/`
(2026-08-29, 2026-08-30, 2026-09-05, 2026-09-08, 2026-09-13, 2026-09-14,
2026-09-15, 2026-09-22) first, to avoid re-proposing anything already
addressed or already tracked. Confirmed still open and unfixed on `main`
as of this pass, so not repeated here (each already has a written proposal
on file): the 2026-09-14 items (`README.md`'s stale project-structure
tree; the four `app/guides/**` pages building `metadata` inline instead of
via `createPageMetadata()`), all three 2026-09-15 items
(`scripts/verify-metadata.mjs`'s `routes` array still missing `/guides`
and the three guide slugs; no `@vitest/coverage-v8`/`test:coverage`;
`StatsBand.tsx`'s `CountUp` still has no `prefers-reduced-motion` check),
and all three 2026-09-22 items (`NetworkTopology.tsx`'s SMIL `<animate>`
pulses still ignore `prefers-reduced-motion`; `scripts/verify-contact.mjs`'s
CTA allow-list still omits the four `app/guides/**` pages; `SiteHeader`'s
mobile menu still has no Escape-to-close). This round instead looks for
genuinely new gaps, in different files and one CI/config-level finding.

---

## 1. `dependabot-auto-merge.yml` fails on every single run — the repo setting it depends on is off, so it silently reproduces the exact gap it was built to close

**Idea:** Enable "Allow auto-merge" for this repository (Settings → General
→ Pull Requests → "Allow auto-merge") so `gh pr merge --auto --squash`, the
final step of `.github/workflows/dependabot-auto-merge.yml`, can actually
succeed. This is a one-click repo setting, not a code change — flagging it
here (rather than fixing it) because it needs `needs:karl`-level access
this agent doesn't have, per the safety gates in
`docs/AI_TASK_FORCE.md`.

**Rationale:** This is not a hypothesis — it's confirmed from a live run.
`dependabot-auto-merge.yml`'s own header explains it was added on
2026-09-21 specifically because "`type:auto-maintenance` dependency-bump
PRs were sitting on `needs:karl`/`blocked` indefinitely with green CI,
because nothing ever advanced them." Checking PR `#133`
(`vitest` `5.0.0` → `5.0.1`, a `version-update:semver-patch` bump — squarely
in the workflow's own auto-merge scope) shows the `build` check run green,
but the `auto-merge` check run itself **failed**. Its job log
(run `35807416645`, job `107011230028`) shows the workflow correctly
detected the patch bump, correctly waited for `build` to go green, then
hit: `GraphQL: Auto merge is not allowed for this repository
(enablePullRequestAutoMerge)`, and exited 1 — leaving the PR exactly where
it would've landed with no workflow at all: `blocked`+`needs:karl`, stuck.
The other five open Dependabot PRs (`#129`, `#130`, `#132`, `#135`,
`#136`) are all major-version bumps the workflow deliberately leaves for a
human by design (the `dependabot/fetch-metadata` bump to `v3` and the
`actions/checkout` bump to `v7` are themselves major), so `#133` is
currently the one clean case that proves the auto-merge path itself is
broken independent of the "major bumps wait for Karl" policy working as
intended. Every future patch/minor bump will hit the same repository-level
wall until this one setting changes — the workflow's CI logic is correct,
it just has no path to actually complete the merge it was written to
perform.

## 2. `CopyEmailButton`'s "Copied!" confirmation has no `aria-live` region, unlike the rest of the site's established status-message pattern

**Idea:** In `components/CopyEmailButton.tsx`, add `role="status"
aria-live="polite"` to the `<button>` (or to a small adjacent element that
wraps the `{copied ? "Copied!" : ...}` text), matching the pattern
`components/ContactForm.tsx` already uses for its own transient status
messages (`role="status" aria-live="polite"` on both the "sent" success
message and the inline error message).

**Rationale:** `CopyEmailButton` (used from `ContactSection.tsx`, rendered
on the homepage) swaps its own visible text from "Copy email address" to
"Copied!" for two seconds after a successful `navigator.clipboard.writeText`
call — but the button carries no `aria-live`/`role="status"` of any kind,
so that confirmation is silent to a screen-reader user: nothing is
announced, and the only way to notice the copy succeeded is to tab away
and back to re-read the (by-then-likely-reverted) button label. This is a
real functional gap, not a hypothetical — a repo-wide grep for
`aria-live` turns up exactly two hits, both inside `ContactForm.tsx`, so
the site already has a working, established idiom for this exact class of
"local status update inside an otherwise static page" problem; it was
simply never applied to this second component that has the same shape of
problem (an async action whose only feedback is a text swap).

## 3. `ContactSection`'s own `<section id="contact">` anchor has no scroll-margin, so half the site's contact links land the heading under the sticky header

**Idea:** Add the same `scroll-mt-24` (or equivalent) utility that
`#contact-form` already carries to the outer `<section id="contact">` in
`components/ContactSection.tsx`, so both same-page contact anchors offset
correctly.

**Rationale:** `SiteHeader` renders `sticky top-0 z-50` with `h-20`
(an 80px-tall bar that stays pinned over content while scrolling).
`ContactSection.tsx` exposes two different anchor targets for "jump to
contact" links: the outer `<section id="contact">` and the inner
`<div id="contact-form" className="surface scroll-mt-24 p-6">` that wraps
just the form. Only the inner one has `scroll-mt-24`. The site's own links
are split roughly evenly between the two targets: `SiteHeader.tsx`'s
persistent "Contact" nav button and all three `app/guides/**` pages' CTA
links point to `/#contact` (no offset), while `app/about/page.tsx`,
`app/demo/page.tsx` (twice), and `app/itops-console/page.tsx` point to
`/#contact-form` (correctly offset). So today, clicking "Contact" in the
header from any page — the single most-repeated contact CTA on the
site — scrolls the "Get in touch" heading directly underneath the 80px
sticky header instead of clear of it, while the less-frequently-used
`/#contact-form` links land correctly. This is a one-line CSS-class fix,
narrow and non-behavioral (no logic change, no new dependency).

---

This is proposal-only: no product/business-scoping decisions are made, and
it is not to be merged or approved by the proposing agent — it's waiting
on Task Force/Karl review, per this repo's hard rule against
self-approving/self-merging.
