# Improvement Proposals — 2026-09-13

Scoped fallback proposal (no actionable `stage:build`/`stage:review` work was
queued at sync time). These are grounded in the current state of the repo,
checked against prior proposal files in this directory and issue #70 to
avoid re-proposing already-addressed or already-tracked items.

## 1. Add a custom `not-found.tsx` for the static export

The site ships as `output: 'export'` (`next.config.mjs`), and Next.js's App
Router supports a `app/not-found.tsx` that gets pre-rendered into a real
`404.html` in the exported `out/` directory — but no such file exists
anywhere in `app/`. A visitor who hits a stale guide link, a typo'd path, or
an old bookmark gets whatever generic 404 the static host happens to serve,
with no nav, no branding, and no path back into the site.

**Rationale:** This is a one-file, zero-risk addition (a new page component,
no changes to existing routes or logic) that directly improves the
experience for a lead-generation site where every dropped visitor is a
potential missed inquiry. It also gives the static host a same-origin,
on-brand 404 instead of depending on host-specific fallback behavior.

## 2. Give `ContactForm` real behavior tests, not just source-text checks

`scripts/verify-contact.mjs` (run in CI) only greps the compiled source of
`components/ContactForm.tsx` and `lib/site.ts` for literal strings (e.g.
that `mode: "no-cors"` doesn't appear, that certain field names are
present). It cannot catch a logic regression in the actual runtime
behavior — the submit handler's branching between the Google Form path, the
generic-endpoint path, and the `mailto:` fallback, or its status transitions
(`idle` → `submitting` → `sent`/`error`). Notably, the one real bug this
form has had (commit `55477d2`, "stop treating opaque no-cors ContactForm
responses as success") was a runtime behavior bug that a string-grep check
would not have caught on its own; the repo already has `vitest` +
`@testing-library/react` wired up and used for `itops-console` and
`network-topology`, but `ContactForm` — arguably the most business-critical
interactive component on the site — has zero tests in `__tests__/`.

**Rationale:** The tooling and pattern already exist in this repo; this is
filling an obvious coverage gap in the one component that directly produces
leads, using a mocked `fetch` to assert on status text/`aria-live`
announcements and on which submission path fires for each `lib/site.ts`
configuration (Google Form set, generic endpoint set, neither set).

## 3. Fix the social-share preview image (Open Graph / Twitter card)

`lib/metadata.ts` sets every page's Open Graph and Twitter Card image to
`public/logo.png`, a 256×256 square logo, and declares `twitter: { card:
"summary" }`. Social platforms that render large preview cards (Slack,
LinkedIn, Facebook, Discord, and Twitter/X's `summary_large_image`) expect
roughly a 1200×630 image; a small square logo either gets awkwardly
letterboxed/cropped or the platform falls back to a generic link preview
with no visual at all. For a consulting site whose growth channel is
word-of-mouth link sharing, this quietly undersells every shared link.

**Rationale:** This is a narrow, low-risk fix (one new wide image asset
plus updating `socialImage` dimensions and the Twitter `card` type to
`summary_large_image` in `lib/metadata.ts`) with an outsized effect on how
professional a shared link looks — directly relevant to a site whose
purpose is generating inbound inquiries from shared links.
