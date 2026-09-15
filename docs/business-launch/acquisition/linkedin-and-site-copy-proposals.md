# LinkedIn Copy Drafts & Site Copy/CTA Proposals

Work package E of [#113](https://github.com/WintCom-Solutions/wintersoperations-site/issues/113).
Two parts: (1) LinkedIn profile copy drafts, (2) precise, file-and-line-level
proposals for existing site pages. **No source files are edited by this
document** — every site-copy item below is a spec for Karl (or a follow-up
build issue) to apply, not an applied change.

---

## Part 1 — LinkedIn copy drafts

### Research performed

Searched for an existing public "Winters Operations" or "Karl Winters"
LinkedIn company/personal profile tied to this business (search terms:
`"Karl Winters" Winters Operations LinkedIn`, 2026-09-15). **No public
LinkedIn profile for Winters Operations or a matching Karl Winters was
found** — the search returned unrelated people with the same name at other
companies. These drafts are therefore for a **new or first-configured**
profile, not a rewrite of an existing one. If a profile already exists
privately (unpublished, or under different search terms), compare against
it before using these drafts.

Every claim below is sourced from Winters Operations' own public site
(`README.md`, `app/about/page.tsx`, `lib/content.ts`) — no new credential,
certification, client count, or outcome is introduced that isn't already
self-stated on the live site.

### Headline (3 options, pick one — LinkedIn headline is ~220 characters)

1. `Network Engineering & Automation | Web Design for Small Business | 30+ Years Enterprise IT | Winters Operations`
2. `Winters Operations — Enterprise-grade network engineering, Python automation, and small-business web design`
3. `Cisco Meraki SD-WAN · Python Automation · Web Design | Winters Operations (Hernando, MS)`

### About section

```
Winters Operations is a focused consulting practice for network
infrastructure, automation, and web design — built from day-to-day
enterprise operations work, not theory.

I'm Karl Winters. 30+ years building and running enterprise IT
infrastructure, most of it spent managing a large-scale Cisco Meraki
SD-WAN environment spanning hundreds of spoke sites tied together through
datacenter hubs and AWS, and writing the Python automation that turns
hours of manual network work into minutes.

Consulting engagements bring that same experience to teams that need
enterprise-level network expertise without full-time overhead —
network assessments, SD-WAN and Starlink deployments, new-construction
structured cabling and MDF/IDF buildouts, IP camera systems, and voice
infrastructure. The same approach — clear scope, maintainable systems,
outputs you can actually run — carries into web design and automation
work for small businesses.

Based in Hernando, MS, serving the Mid-South and beyond.

wintersoperations.com
```

### Service list (LinkedIn "Services" module — short phrases, matches site's three equal lines)

- Web Design
- Network & Infrastructure Consulting
- SD-WAN Deployment
- Structured Cabling
- IT Consulting
- Python Automation / Scripting

*(LinkedIn's Services module doesn't allow long descriptions — kept to the
existing three service-line names plus their most concrete sub-items from
`lib/content.ts`, no new service invented.)*

### What was deliberately left out

- No client names, logos, or testimonials — none are publicly confirmed as
  clear-to-publish.
- No specific metrics ("X sites migrated," "Y% uptime") beyond the site's
  own general statements (30+ years, 500+ sites under management from
  `lib/site.ts`'s `stats` array) — those two figures are reused verbatim
  since they're already public on the live site; nothing new is added.
- No industry certifications (e.g., CCNA, specific vendor certs) — none are
  listed on the current site, so none are claimed here. Add them to both
  the site and this draft together, from Karl, if/when confirmed.

---

## Part 2 — Site copy / CTA proposals

Read per #113/#116: `README.md`, `lib/content.ts`, `lib/site.ts`, plus
issues [#70](https://github.com/WintCom-Solutions/wintersoperations-site/issues/70)
(scoped weakness review) and [#112](https://github.com/WintCom-Solutions/wintersoperations-site/issues/112)
(productization positioning). Findings and how they bound this proposal:

- **#70** flagged that `contactEndpoint` in `lib/site.ts` is empty (mailto
  fallback active) and that Google Form IDs exist but aren't wired up —
  that's a form-activation gap, not a copy problem, and is out of scope for
  this docs-only issue. Noted here so it isn't lost, not acted on.
- **#112** is explicitly "design/comment only — no code changes" and asks
  whether productized outputs (dealership platform, IT ops console — visible
  in this repo as `app/itops-console`) should become named service
  offerings. That question is **unresolved** and **out of scope here**; none
  of the proposals below touch those pages or reference those products.
- The three equal service lines (Web Design; Network & Infrastructure; AI &
  Automation) are preserved everywhere below — every proposed change either
  applies equally across all three or sits in a neutral, cross-cutting
  section (FAQ, contact intro, deliverables list) rather than favoring one
  line.
- **Pricing status:** none of the `$75` pilot-offer figures are publicly
  committed yet (see `../sales-kit/README.md` — "No pricing has been
  publicly committed"). Every proposal below that could imply a public price
  is marked **Option A (no price stated — safe to ship now)** and
  **Option B (states $75 — apply only after Karl confirms public pricing)**.

### Proposal 1 — Add one FAQ entry

**File:** `lib/content.ts`
**Location:** end of the `faqs` array (after the existing 5 entries, before
the closing `] as const;` on line 146).

Option A (no price stated):

```ts
  {
    q: "Do you take on smaller, fixed-price projects?",
    a: "Yes. Alongside full engagements, we offer a small, fixed-price starting option — a bounded documentation or automation task with clear scope and a flat price — as a low-commitment way to work together for the first time.",
  },
```

Option B (states price — hold until Karl confirms public pricing):

```ts
  {
    q: "Do you take on smaller, fixed-price projects?",
    a: "Yes. A flat-price network documentation cleanup ($75, one site, up to 25 devices, based on an export you provide) is available as a low-commitment way to start before scoping something larger.",
  },
```

*Rationale: the FAQ list is the one existing content block on the site that
already answers "do you only work with large enterprises?" — a fixed-price
entry point question fits the same pattern and doesn't touch the three
service-line cards.*

### Proposal 2 — Contact section intro copy

**File:** `components/ContactSection.tsx`
**Location:** line 12–13, the `<p>` inside the contact intro.

Current:
```
Ready to talk about a website, automation, or network work? Reach
out — we&apos;ll respond promptly.
```

Proposed (Option A, no price — safe to ship now):
```
Ready to talk about a website, automation, or network work — including a
small, fixed-price starting option? Reach out — we&apos;ll respond
promptly.
```

*Rationale: minimal wording change, keeps the existing three-topic list
("website, automation, or network work") completely intact and unordered,
just appends a low-commitment framing rather than reordering or elevating
any one line.*

### Proposal 3 — Services page deliverables list

**File:** `app/services/page.tsx`
**Location:** the `deliverables` array, lines 17–22 (currently 4 items,
applies across all three service lines, not per-card — safe to extend
without disturbing the equal-weight service cards above it).

Current array has 4 items ending with `"Operator-facing documentation and
handoff notes"`. Proposed 5th item (Option A, no price):

```ts
  "A fixed-price starting engagement for teams that want a small, bounded result before a larger scope",
```

Option B (states price):
```ts
  "A fixed-price documentation cleanup ($75) or inventory snapshot — a fast, low-commitment way to start",
```

*Rationale: this list already reads as "example deliverables across
engagement types," so one more line describing the pilot-offer shape fits
without needing to touch any of the three `services` cards above it (which
is where the equal-positioning risk would actually live).*

### Proposal 4 — About page closing CTA

**File:** `app/about/page.tsx`
**Location:** lines 96–98, the "Ready to talk?" section intro paragraph.

Current:
```
Whether it&apos;s a site, automation, or network work — reach out
and we&apos;ll respond promptly.
```

Proposed:
```
Whether it&apos;s a site, automation, or network work — from a small,
fixed-price starting project to a full engagement — reach out and
we&apos;ll respond promptly.
```

*Rationale: same pattern as Proposal 2 — additive framing, no reordering of
the three areas, no price stated (keep this one price-free even after Karl
approves public pricing elsewhere, since the About page's role is narrative,
not a quote page).*

### Proposal 5 (future, not spec'd for this PR) — dedicated guide page

`lib/content.ts`'s `guides` array and the `app/guides/<slug>/` pages already
demonstrate the site's pattern for a short educational article (e.g.
`meraki-estate-hygiene`). A guide like **"Signs your network documentation
has drifted"** would tie naturally into the pilot offer and reuses an
existing content pattern — but adding it requires a new `app/guides/<slug>/page.tsx`
file, which is a code change and therefore out of scope for this docs-only
issue. Flagging as a candidate for a small, separate, explicitly-scoped
follow-up issue rather than sketching it further here.

### What was deliberately not proposed

- No change to the `services` array itself (`lib/content.ts` lines 1–42) —
  that's the exact equal-positioning content #113 says to preserve.
- No change to `stats` in `lib/site.ts` — those are general credibility
  numbers, not pilot-offer-related, and #70 didn't flag them as wrong.
- No new page, no new component, no new nav item — every proposal above
  edits copy inside an existing block on an existing page.
- No activation of `contactEndpoint` / Google Form wiring (that's a config
  change per `docs/contact-form-setup.md`, not a copy proposal, and outside
  this issue's scope — see the #70 note above).

### How to apply

These are specs, not diffs applied to the working tree. A future small
build issue (`stage:build`, docs-only-adjacent but touches `.ts`/`.tsx`
files so it is **not** a docs-only PR like this one) should implement
whichever options Karl picks, one small PR per the normal AI Task Force
loop — not bundled into this outreach/prospecting PR.
