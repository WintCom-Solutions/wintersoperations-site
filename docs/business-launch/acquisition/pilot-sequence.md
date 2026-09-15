# Six-Contact Pilot Sequence

Work package D/E of [#113](https://github.com/WintCom-Solutions/wintersoperations-site/issues/113).
Defines the cadence and measurable checkpoints for contacting the six
prospects in [`prospects.md`](./prospects.md) using the drafts in
[`outreach-drafts.md`](./outreach-drafts.md). **Nothing in this document
sends anything** — it's the plan Karl executes manually, logging each step
in the existing [`../sales-kit/lead-tracker-template.csv`](../sales-kit/lead-tracker-template.csv).

## Cadence per contact

| Step | Timing | Action | Draft used |
| --- | --- | --- | --- |
| 1 | Day 0 | Send MSP introduction message via the prospect's public contact route | `outreach-drafts.md` #2 |
| 2 | Day 0 (optional, same day) | Send LinkedIn connection request to the company page (no InMail/paid outreach) | — (see `linkedin-and-site-copy-proposals.md`) |
| 3 | If reply received | Send interest reply | `outreach-drafts.md` #3 |
| 4 | If prospect wants to talk first | Hold 15-minute discovery call | `outreach-drafts.md` #4 |
| 5 | Once scope is confirmed | Send short-form proposal | `outreach-drafts.md` #5 |
| 6 | If no reply to step 1 by day 7 | Send single follow-up (once only) | `outreach-drafts.md` #6 |
| — | If a pilot is delivered | Send single post-delivery follow-up ~1 week after delivery | `../sales-kit/follow-up-draft.md` |

No prospect receives more than one unsolicited follow-up (step 6) if they
don't respond to the initial message — this matches parent #113's explicit
"not a scheduled automation" instruction and avoids anything that could read
as spam from a six-contact batch.

## Batch timeline

All six prospects are contacted within the same short window (recommend:
all six on the same day or across 2–3 consecutive business days) so the
response-rate metrics below have a comparable, bounded denominator instead
of being spread across weeks in a way that makes "response rate" ambiguous.

## Metrics to track

Log every event in `../sales-kit/lead-tracker-template.csv` (columns:
`prospect_name, channel, contacted_date, offer_pitched, status,
next_action, next_action_date, notes`). The following roll-up metrics come
directly from that log — no new tracking tool is introduced:

| Metric | Definition | How to compute from the tracker |
| --- | --- | --- |
| **Response rate** | % of the 6 contacted prospects that reply at all (positive, negative, or a referral to someone else) within 7 days | `count(status in {Replied, Scoping, Quoted, Won, Lost}) / 6` |
| **Time to first response** | Calendar days between `contacted_date` and the date a reply is logged | Per-prospect; report median across the batch of 6 |
| **Scoping rate** | % of the 6 that reach a scoping conversation (call or written scope confirmation) | `count(status in {Scoping, Quoted, Won, Lost} after a real scoping exchange) / 6` |
| **Quote rate** | % of the 6 that reach a sent proposal/quote | `count(status in {Quoted, Won, Lost}) / 6` |
| **Pilot conversion rate** | % of the 6 that become a paid, delivered job | `count(status == Won) / 6` |
| **No-response rate** | % of the 6 with no reply after the single follow-up | `count(status == "No response" after follow-up sent) / 6` |

These are **batch-of-6 pilot metrics**, not statistically significant sales
data — the purpose (per #113) is a fast, cheap read on whether the
documentation-cleanup pilot offer gets any real-world traction with this
buyer type, not a rigorous conversion-rate study.

## Decision rule after the batch closes

Once all 6 contacts have either responded, converted, or received their one
follow-up with no reply (recommend: close out the batch read after 14
calendar days from the last contact date), report against this simple
threshold so the repeat/adjust/stop decision in #113's "Outcomes" section
has a concrete trigger:

- **0 replies out of 6:** the message/offer/channel combination likely
  isn't landing — revisit the opener framing or prospect selection before
  sending another batch, rather than repeating the same approach.
- **1+ replies but 0 quotes:** offer is getting attention but not
  converting to a scoped ask — review the interest-reply and discovery-call
  drafts for friction.
- **1+ pilot delivered:** proceed to the pricing/repricing checks already
  defined in `../sales-kit/pricing-model.md`, and use the delivered pilot as
  the seed for the referral draft (`outreach-drafts.md` #1) on the next
  batch.

This threshold is a planning suggestion for Karl, not an automatic action —
consistent with #113's requirement that repeat/adjust/stop remains a human
decision informed by real results.
