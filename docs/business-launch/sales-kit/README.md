# Sales Kit — Fixed-Scope Service Launch

Work package C of [#113](https://github.com/WintCom-Solutions/wintersoperations-site/issues/113)
(parent planning issue). Built for [#115](https://github.com/WintCom-Solutions/wintersoperations-site/issues/115).

**Status: ready-to-use draft kit.** No pricing has been publicly committed,
no offer has been sold, and no legal/insurance clearance is implied. Karl
picks the final entry offer and price before any outreach goes out ([#116](https://github.com/WintCom-Solutions/wintersoperations-site/issues/116)
handles outreach/prospecting; this kit is the material that outreach hands
off to).

## What's in this kit

| File | Purpose |
| --- | --- |
| [`offers-and-service-descriptions.md`](./offers-and-service-descriptions.md) | Entry offer + two supporting offers: full scope, limits, acceptance criteria, time budgets, revision/payment terms |
| [`pricing-model.md`](./pricing-model.md) | How the numbers work: owner time, overhead/insurance allocation, fees, tax reserve, two labeled cost scenarios |
| [`pricing-model.csv`](./pricing-model.csv) | The same model as an editable spreadsheet |
| [`intake-questionnaire.md`](./intake-questionnaire.md) | Questions to ask before quoting a job |
| [`quote-sow-template.md`](./quote-sow-template.md) | Fixed-scope quote / statement of work Karl sends to a prospect |
| [`delivery-report-template.md`](./delivery-report-template.md) | What Karl hands the client at job completion |
| [`follow-up-draft.md`](./follow-up-draft.md) | Single post-delivery follow-up message |
| [`lead-tracker-template.csv`](./lead-tracker-template.csv) | Pipeline tracker: prospect → contacted → scoped → won/lost |
| [`job-cash-tracker-template.csv`](./job-cash-tracker-template.csv) | Per-job tracker distinguishing **invoiced** from **collected** cash, and revenue from profit |
| [`sample-deliverable/`](./sample-deliverable/) | Labeled **synthetic** before/after network-inventory sample + handoff report, demonstrating the entry offer |

All templates are blank/generic — no real customer data, no invented sales,
no fabricated outcomes. Each tracker CSV's first data row is a clearly
labeled `[EXAMPLE - delete before use]` row showing the intended values;
delete it before logging real leads/jobs.

- `lead-tracker-template.csv` suggested `status` values: `Contacted`,
  `Replied`, `Scoping`, `Quoted`, `Won`, `Lost`, `No response`.
- `job-cash-tracker-template.csv` suggested `status` values: `Invoiced -
  not yet collected`, `Collected`, `Overdue`, `Written off`. Never treat
  `invoiced_usd` alone as revenue — only `collected_usd` is actual cash in,
  and `job-cash-tracker-template.csv` keeps the two in separate columns for
  exactly that reason.

## Recommendation

**Entry offer: Network Documentation Cleanup ($75).** It matches the
$0-marketing-spend prospect angle already researched for #116 (nearby
MSP/IT providers carry a documentation and reporting backlog that overflows
to a subcontractor), requires no live customer access, and is scoped small
enough to finish and invoice inside a single sitting.

**Supporting offers:**
- **Cisco/Meraki Inventory Snapshot ($125)** — same "documentation backlog"
  angle, larger device count, plugs directly into the Network &
  Infrastructure service line.
- **Small Python Automation ($150)** — natural upsell once a client has seen
  clean documentation and wants a recurring export/transform automated;
  plugs into the AI & Automation service line.

Web Design stays a fully-priced, quote-after-scoping service line rather
than a fixed $75/$125/$150 tier — it doesn't fit the "one sitting, bounded
input" shape the other two lines share, and the README already treats the
three lines as equal, not as one primary + two afterthoughts. Nothing here
demotes Web Design; it simply isn't part of this bounded-documentation pilot
experiment.

## Reused systems (do not duplicate)

Per the workspace-context handoff on #115:

- **Invoicing:** the existing Winters Operations Google Sheet (Invoice
  Register / Line Items / Invoice Template / How To Use tabs). The quote/SOW
  and delivery templates below point to that sheet's **Payment Link** field
  rather than assuming any payment processor is configured.
- **Client intake:** existing Workspace client-form response sheets. The
  intake questionnaire in this kit is designed to be pasted into that
  existing form/sheet, not a new tool.

No new invoicing platform, CRM, or app is proposed.

## Pricing / cost caveat

Compliance and insurance costs are **not yet finalized** ([#114](https://github.com/WintCom-Solutions/wintersoperations-site/issues/114)
/ [PR #117](https://github.com/WintCom-Solutions/wintersoperations-site/pull/117)
is still in review as of this writing). `pricing-model.md` therefore carries
two explicitly labeled scenarios (no added insurance yet vs. an insurance
line-item placeholder) instead of a single number. **No premium figures are
invented** — the insurance row is a placeholder Karl fills in once a broker
quote exists.

## Validation performed

- Every dollar figure traces to the pilot-price table already proposed in
  parent issue #113 (`$75` documentation/spreadsheet, `$150` bounded Python
  automation, `$125` inventory snapshot / runbook, `$50/mo` recurring
  update) — no new prices were invented.
- `pricing-model.csv` Scenario A row totals were hand-checked with a
  script: `revenue − overhead − fees − tax reserve − direct costs =
  profit` for every offer row. Scenario B's insurance-dependent cells are
  intentionally left as `TBD` (no premium exists yet) rather than
  estimated, per the no-fabricated-premiums rule already established on
  PR #117.
- `sample-deliverable/` record counts were verified by direct line count
  against the CSVs (see that folder's README for the exact numbers).
- Diff is docs-only: no `package.json`, application code, or CI config
  touched.

## Still open for Karl

1. Confirm the entry offer + two supporting offers, or swap in different
   ones from the #113 pilot-price table.
2. Fill in the insurance placeholder in `pricing-model.md` once a broker
   quote exists (tracked on #114/#117).
3. Approve the Payment Link / invoice-register workflow as final, or say if
   a processor is being added.
4. Say go/no-go on the first live intake call — nothing in this kit sends
   anything externally on its own.
