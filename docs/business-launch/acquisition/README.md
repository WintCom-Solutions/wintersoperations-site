# Acquisition Kit — Prospecting & Outreach

Work package D/E of [#113](https://github.com/WintCom-Solutions/wintersoperations-site/issues/113)
(parent planning issue). Built for [#116](https://github.com/WintCom-Solutions/wintersoperations-site/issues/116).

**Status: ready-to-review draft batch.** No outreach has been sent, no
prospect has been contacted, and no website source file has been changed.
Everything here is prepared material for Karl to review, personalize where
noted, and decide whether/how to send — this PR does not authorize or
perform any external communication.

## What's in this kit

| File | Purpose |
| --- | --- |
| [`prospects.md`](./prospects.md) | Six public MSP/IT prospects (Hernando/DeSoto/Memphis metro, prioritized in that order): business name, public contact route, fit evidence, target role, personalized opener. Plus 3 optional private referral slots, left blank. |
| [`channel-comparison.md`](./channel-comparison.md) | Direct MSP outreach vs. LinkedIn vs. local networking vs. marketplace — cost, fit, and why direct outreach is the $0-spend pilot channel. |
| [`outreach-drafts.md`](./outreach-drafts.md) | Six complete message drafts: referral, MSP introduction, interest reply, discovery-call agenda, proposal short-form, single follow-up. |
| [`pilot-sequence.md`](./pilot-sequence.md) | Cadence for contacting all six prospects as one batch, plus the measurable response/scoping/quote/conversion metrics and a repeat/adjust/stop decision threshold. |
| [`linkedin-and-site-copy-proposals.md`](./linkedin-and-site-copy-proposals.md) | LinkedIn headline/about/service copy drafts (no unevidenced credentials), plus precise file-and-line site copy/CTA change proposals — specs only, no source files edited. |

## Reused material (do not duplicate)

Every outreach hook reuses the pilot offers already defined in
[`../sales-kit/offers-and-service-descriptions.md`](../sales-kit/offers-and-service-descriptions.md)
(Network Documentation Cleanup $75, Cisco/Meraki Inventory Snapshot $125,
Small Python Automation $150) — no new platform, price, or offer is
introduced. Lead tracking reuses the existing
[`../sales-kit/lead-tracker-template.csv`](../sales-kit/lead-tracker-template.csv);
the single post-delivery follow-up reuses
[`../sales-kit/follow-up-draft.md`](../sales-kit/follow-up-draft.md) directly
rather than duplicating it.

## Boundaries respected

- **No outreach sent.** All six drafts and the personalized openers are
  prepared text, not sent messages.
- **No website source changed.** `linkedin-and-site-copy-proposals.md`
  proposes exact copy for `lib/content.ts`, `components/ContactSection.tsx`,
  `app/services/page.tsx`, and `app/about/page.tsx` as specs (file, location,
  before/after text) — none of those files are touched by this PR.
- **No public price commitment.** Every proposal that could imply a $75
  public price is offered as two options — a price-free version safe to
  ship now, and a priced version explicitly held until Karl confirms public
  pricing (per the sales kit's existing "not a public price commitment"
  caveat).
- **No personal/private data.** `prospects.md` uses only each business's own
  published contact route (contact form, public phone, public business
  email) and public service descriptions. The 3 optional referral slots are
  left as unfilled placeholders — filling them with real personal contacts
  is explicitly deferred to Karl, outside this public repository.
- **No subcontractor-need assumption.** Every prospect's fit evidence and
  opener is framed as a question about a plausible, publicly-inferable gap
  — never as a claim that the business needs help or is understaffed.
- **#112 (productization positioning) left untouched.** That issue is
  explicitly design/comment-only with no copy changes authorized yet; none
  of the site-copy proposals here reference `app/itops-console` or any
  productized-offering language.

## Validation performed

- Every prospect in `prospects.md` was verified against at least one public
  source (the business's own site and/or an independent directory listing
  such as BBB, a chamber-of-commerce member page, or a provider database)
  fetched or searched on 2026-09-15; sources and access dates are cited per
  prospect.
- Searched for an existing public Winters Operations / Karl Winters LinkedIn
  profile before drafting LinkedIn copy — none was found, so the drafts in
  `linkedin-and-site-copy-proposals.md` are explicitly scoped as "new/first
  profile" material, not a rewrite of a confirmed existing one.
- Every dollar figure traces to the existing
  `../sales-kit/offers-and-service-descriptions.md` pilot prices — no new
  price was invented.
- `README.md`, `lib/content.ts`, `lib/site.ts`, `components/ContactSection.tsx`,
  `app/services/page.tsx`, and `app/about/page.tsx` were read directly from
  this repository (not from memory) before drafting the copy proposals, so
  line references reflect the actual current file state at PR time.
- Diff is docs-only: no `package.json`, application code, or CI config
  touched; no file under `app/`, `components/`, or `lib/` is modified.

## Still open for Karl

1. Approve, edit, or reject the six prospects and their openers before any
   message is sent — this batch substitutes public businesses for
   unavailable warm contacts, per #113's explicit instruction not to block
   on personal details.
2. Decide whether to fill any of the 3 optional private referral slots
   (outside this public repo) before or alongside the six public contacts.
3. Confirm public pricing (tracked separately on #114/#115) before using any
   "Option B" (priced) site-copy or FAQ variant in
   `linkedin-and-site-copy-proposals.md`.
4. Pick which site-copy proposals (if any) to apply, and route that as a
   separate small `stage:build` issue — this PR intentionally does not
   implement any of them.
5. Decide whether/when to actually send the first batch under
   `pilot-sequence.md` — nothing here is time-sensitive or expires, so this
   can wait for Karl's schedule.
