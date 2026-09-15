# Pricing / Cash Model

Companion to [`pricing-model.csv`](./pricing-model.csv) — same numbers, in
spreadsheet form. Everything here is a **planning model**, not a public
price commitment, invoiced rate, or tax filing. Karl approves final pricing
before outreach; a bookkeeper/CPA should confirm the tax-reserve assumption
before it's relied on.

## Why a model instead of just the flat prices

The $75 / $125 / $150 pilot prices in `offers-and-service-descriptions.md`
are what the client is quoted. This model answers a different question:
**after overhead, payment fees, and a tax reserve, what does that flat price
actually net Karl per hour of work** — so the pilot's real economics are
visible before committing time to it.

## Assumptions (edit these first — everything else derives from them)

| Assumption | Value used | Why |
| --- | --- | --- |
| Reference target hourly rate | $60/hr | Planning reference only — offers are flat-priced, not hourly billed. Not an invoiced rate. |
| Overhead allocation | 8% of revenue | Placeholder for subscriptions/tools/general business overhead (no confirmed itemized total yet). |
| Payment processing fee | 3% of revenue | **Placeholder.** No payment processor is confirmed/configured — the existing Invoice Register only has a generic Payment Link field (see kit README). Replace with the real fee once one is chosen. |
| Direct costs per job | $0 | These three offers consume no materials and use no subcontractor; direct cost is genuinely $0, not omitted. |
| Tax reserve | 27% of profit before tax | Common small-business self-employment + income tax planning reserve. **Not tax advice** — confirm the real rate with a CPA/current filing status before relying on it. |
| Insurance allocation (Scenario B only) | `[ANNUAL_PREMIUM] ÷ [ESTIMATED_ANNUAL_PAID_JOBS]` | Left as a placeholder — no premium exists yet. Tracked on #114 / PR #117. |

Change any value in the table above and re-derive the rows below the same
way; the CSV mirrors this exactly so it can be recalculated in a
spreadsheet.

## Scenario A — baseline, no added insurance secured yet

| Offer | Price | Time budget | Overhead (8%) | Payment fee (3%) | Direct costs | Profit before tax | Tax reserve (27%) | **Net profit** | **Effective $/hr** |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Network Documentation Cleanup | $75.00 | 2.5h | $6.00 | $2.25 | $0.00 | $66.75 | $18.02 | **$48.73** | **$19.49** |
| Cisco/Meraki Inventory Snapshot | $125.00 | 4.0h | $10.00 | $3.75 | $0.00 | $111.25 | $30.04 | **$81.21** | **$20.30** |
| Small Python Automation | $150.00 | 5.0h | $12.00 | $4.50 | $0.00 | $133.50 | $36.05 | **$97.45** | **$19.49** |

**Finding:** all three pilot offers net roughly **$19–20/hr** after overhead,
payment fees, and a tax reserve — well under the $60/hr reference target.
That's an expected result for an introductory, fixed-scope pilot (the goal
of the first batch is proof of demand, a portfolio sample, and referrals —
not target hourly income), but it is **not a sustainable long-run rate**.
See "Repricing rule" below.

## Scenario B — with an insurance allocation (placeholder, pending #114/#117)

Same formula, with one more deduction: `insurance_allocation_usd`, computed
as the eventual annual premium ÷ an assumed annual paid-job volume. Because
no premium exists yet, every downstream figure in this scenario is marked
**TBD** rather than estimated — filling in a number here without a real
broker quote would be exactly the fabricated-premium problem #114/#117 flag
against. Once a quote exists, drop it into `pricing-model.csv` and every
row recalculates the same way Scenario A did.

| Offer | Price | Insurance allocation | Profit before tax | Tax reserve | Net profit | Effective $/hr |
| --- | ---: | --- | --- | --- | --- | --- |
| Network Documentation Cleanup | $75.00 | TBD | TBD | TBD | TBD | TBD |
| Cisco/Meraki Inventory Snapshot | $125.00 | TBD | TBD | TBD | TBD | TBD |
| Small Python Automation | $150.00 | TBD | TBD | TBD | TBD | TBD |

## Revenue vs. profit vs. cash collected

This model computes **profit** (what's left after costs, on paper, the
moment a job is invoiced). It is not the same as **cash collected** — a
quoted/invoiced amount isn't income until it's actually paid. Track that
distinction per job in [`job-cash-tracker-template.csv`](./job-cash-tracker-template.csv),
which has separate `invoiced_usd` and `collected_usd` columns and never
treats an open invoice as revenue.

## Repricing rule

If **three consecutive jobs of the same offer type** run more than 50% over
that offer's time budget, or the effective $/hr for an offer type falls
below roughly **$15/hr** after a real (non-placeholder) tax reserve and
insurance allocation are in, that offer type should be repriced upward or
have its scope cap tightened before taking a fourth job at the old price.
This is a planning trigger, not an automatic rule — Karl makes the actual
repricing call, informed by why the overrun happened (systematically
underscoped vs. one unusually messy client export).

## Cost-scenario caveat

Both scenarios above are **planning estimates**, not verified operating
costs. No insurance premium, tax rate, or processor fee here has been
confirmed with an insurer, CPA, or payment provider. Karl should replace
every placeholder with a real number before this model is used to set a
public/committed price.
