# Outreach Message Drafts

Work package D/E of [#113](https://github.com/WintCom-Solutions/wintersoperations-site/issues/113).
Six complete message drafts covering the full first-contact-to-close arc.
These are **drafts for Karl to review, personalize per `prospects.md`, and
send himself** — nothing in this repository sends anything. Fill every
`[bracket]` before use.

All six drafts reuse the pilot offers already defined in
[`../sales-kit/offers-and-service-descriptions.md`](../sales-kit/offers-and-service-descriptions.md)
(Network Documentation Cleanup $75, Cisco/Meraki Inventory Snapshot $125,
Small Python Automation $150) as the outreach hook — no new offer or
platform is introduced. Pricing is not a public commitment until Karl
confirms it (see that kit's README).

---

## 1. Referral draft

For use when a happy pilot client (or a personal contact) is willing to
introduce Winters Operations to someone else — reuses the ask already seeded
in `../sales-kit/follow-up-draft.md`, expanded into a standalone intro
message the *referring* contact can forward or say out loud.

Subject: Quick intro — [Referring contact]'s IT documentation guy

Hi [New contact name],

[Referring contact] mentioned you might be dealing with the same kind of
network-documentation backlog they had — stale device lists, no current
topology, that kind of thing. I'm Karl Winters, I run Winters Operations
(network engineering + automation, based in Hernando, MS), and I did a
small fixed-price cleanup for [referring contact / their company] recently.

No pressure at all — just wanted to make the connection in case it's useful.
Happy to explain what the pilot offer looks like if you want details:
[contactEmail placeholder — see note below].

[Name]
Winters Operations

*Internal note: use the live contact email from `lib/site.ts`
(`contactEmail`) at send time rather than hardcoding it here, so this
document doesn't need updating if that value ever changes.*

---

## 2. MSP introduction draft

The primary cold-outreach message for the six prospects in `prospects.md`.
Each prospect's `personalized opener` line replaces the bracketed opener
paragraph below — the rest of the structure stays consistent across all six
for measurement purposes (see `pilot-sequence.md`).

Subject: Fixed-price network documentation cleanup — quick offer

Hi [First name],

[PERSONALIZED OPENER — copy verbatim from that prospect's entry in
`prospects.md`.]

If it's useful: I run a bounded, fixed-price documentation-cleanup pass —
$75 flat, up to 2.5 hours of my time, for one site up to 25 devices. You
export your current inventory (CSV, spreadsheet, or a screen export from
whatever you already use), I return a cleaned, de-duplicated version with a
one-page summary of what changed and what's still unclear. No live access
to your systems, no on-site visit, nothing installed.

Genuinely no pressure if this isn't a fit right now — and if you're not the
right person for this, a quick pointer to who is would help.

[Name]
Winters Operations
[contactEmail placeholder]

---

## 3. Interest reply draft

Sent when a prospect responds positively or asks a follow-up question.

Subject: Re: Fixed-price network documentation cleanup — quick offer

Hi [First name],

Glad it's useful to hear about. Quick summary of how it works:

1. You send me an export of your current device/network inventory for one
   site (up to 25 devices) — whatever format you already have (CSV,
   spreadsheet, screen export from your monitoring/management tool).
2. I clean it up: standardize naming, remove duplicates, flag any fields
   that look incomplete or inconsistent. No live access to your systems is
   needed or requested.
3. You get back the cleaned inventory plus a one-page handoff note — what
   changed, what I flagged as uncertain, and record counts before/after.
4. Flat $75, invoiced on delivery. One round of formatting/grouping
   revisions included if needed within 5 business days.

Whole thing usually turns around within a few business days of getting your
export. If you'd rather talk it through first, happy to do a short call —
see the discovery-call agenda I can send over, or just reply here with any
questions.

[Name]
Winters Operations

---

## 4. Discovery-call agenda draft

For the (optional) short call some prospects will want before sending an
export. Kept to 15 minutes by design — this is a $75 fixed-price offer, not
a full sales cycle.

**Winters Operations — Discovery Call Agenda (15 min)**

1. **Intros (2 min)** — who's on the call, what they do day to day.
2. **Current state (5 min)** — how they currently track device/network
   inventory (spreadsheet, monitoring tool export, tribal knowledge), roughly
   how many devices/sites, how stale they think it's gotten.
3. **Offer walkthrough (5 min)** — confirm the $75 Network Documentation
   Cleanup offer fits (one site, ≤25 devices, export-based, no live access)
   or flag if they need the $125 Inventory Snapshot tier (up to 50 devices /
   5 sites) instead — see `../sales-kit/offers-and-service-descriptions.md`
   for the exact scope boundary between the two.
4. **Next step (3 min)** — confirm who sends the export and by when; set a
   delivery-target date; mention the one-page quote/SOW will follow by
   email (`../sales-kit/quote-sow-template.md`).

*Internal note: intake-questionnaire.md in the sales kit has the fuller
question list if the call surfaces something outside this offer's scope —
don't try to cover all of it live on a 15-minute call.*

---

## 5. Proposal short-form draft

A short-form version of the full quote/SOW
(`../sales-kit/quote-sow-template.md`) for prospects who want the offer in
writing before sending an export — most engagements can use this shorter
version; use the full template only if the client needs a formal signed
SOW.

Subject: Network Documentation Cleanup — quote

Hi [First name],

Here's the offer in writing:

- **Service:** Network Documentation Cleanup
- **Price:** $75 flat, no hourly billing
- **Scope:** one site, up to 25 devices, based on an export you provide
  (no live access to your systems)
- **Deliverable:** cleaned/de-duplicated inventory + one-page handoff
  summary (what changed, what's flagged as uncertain)
- **Timeline:** delivered within a few business days of receiving your
  export
- **Revisions:** one round of formatting/grouping adjustments, within 5
  business days of delivery
- **Payment:** invoiced on delivery via [existing invoice link/process];
  first-time clients may be asked for 50% up front

If that works, just reply with your export (or let me know a good time to
send it) and I'll get started. Full written SOW available on request if
you'd like something more formal for your records.

[Name]
Winters Operations

---

## 6. Single follow-up draft

Reused directly from the sales kit's existing
[`../sales-kit/follow-up-draft.md`](../sales-kit/follow-up-draft.md) — not
duplicated here to avoid drift between two copies of the same message. That
file is the canonical single post-delivery follow-up (sent once, ~1 week
after delivery, per #113's "not a scheduled automation" instruction).

For the **pre-delivery** no-response case (a prospect who never replies to
the MSP introduction draft above), use this single, one-time nudge instead —
not a repeated sequence:

Subject: Following up — network documentation cleanup

Hi [First name],

Following up on my note from last week in case it got buried — totally
understand if it's not a priority right now. If a fixed-price ($75),
export-based documentation cleanup is ever useful, the offer stands; no
need to reply if not.

[Name]
Winters Operations

*This is the only follow-up sent per prospect if there's no reply to the
first message — see `pilot-sequence.md` for the exact cadence. No further
automated or repeated nudges.*
