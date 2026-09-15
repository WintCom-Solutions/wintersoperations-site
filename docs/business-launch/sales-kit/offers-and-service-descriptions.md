# Offer Definitions

Three offers for the first sales experiment: one entry offer, two supporting
offers. All prices are the pilot hypotheses already listed in parent issue
#113 — none are new numbers, and none are a public price commitment (that
requires Karl's sign-off, see `pricing-model.md`).

Every offer below reuses the existing Winters Operations Google Sheet
invoicing system (Invoice Register / Payment Link field) — see the kit
README. No new invoicing tool is created.

---

## Entry offer — Network Documentation Cleanup

**Price:** $75 flat | **Time budget:** up to 2.5 hours

**Who it's for:** an MSP/IT team (or small business IT owner) whose network
documentation has drifted from reality — undocumented VLANs, stale device
lists, no current topology diagram.

**Scope (in):**
- Client supplies one export: device list/inventory (CSV, spreadsheet, or
  screen export from their monitoring/management tool) for **one site, up
  to 25 devices**.
- Deliverable: a cleaned inventory (standardized naming, de-duplicated,
  missing-field flags resolved where the source data allows it) plus a
  one-page written handoff summarizing what changed and what's still
  unknown.
- One clarifying-question round with the client if the export is
  ambiguous.

**Scope (out) / limits:**
- No live access to client systems (no VPN, no device logins, no on-site
  work). Read-only, export-based only.
- No topology diagram beyond what the export already implies (a diagram is
  a supporting-offer/follow-on, not part of this $75 tier).
- More than 25 devices, more than one site, or more than one clarifying
  round moves the job into a custom quote.

**Acceptance criteria:**
- Cleaned inventory has zero duplicate entries and a consistent naming
  convention.
- Every field the source data actually contained is preserved or correctly
  mapped — cleanup never drops data, only fixes formatting/duplication and
  flags genuine gaps.
- Handoff summary states record counts before/after and lists every
  material assumption made.

**Revision window:** one round of "please adjust formatting/grouping"
revisions within 5 business days of delivery, if the client's original
export didn't change. Rework caused by a materially different or corrected
export from the client is a new job.

**Payment terms:** fixed price, invoiced on delivery via the existing
Invoice Register (Payment Link field); due on receipt. First-time clients
may be asked for 50% up front — Karl's call per engagement.

**Repricing trigger:** if actual time on three consecutive jobs of this type
exceeds the 2.5-hour budget by more than 50% (i.e., > 3.75 hours), raise the
price or tighten the device cap before taking a fourth job at $75 — the
scope is calibrated to unpaid overhead time, not billable time, so overruns
erode margin directly (see `pricing-model.md`).

---

## Supporting offer — Cisco/Meraki Inventory Snapshot

**Price:** $125 flat | **Time budget:** up to 4 hours

**Who it's for:** the same documentation-backlog buyer, one tier up — an
IT/network team running Cisco or Meraki gear who wants a point-in-time
inventory snapshot without granting live access.

**Scope (in):**
- Client supplies exports (Meraki dashboard CSV export, or equivalent
  Cisco inventory export) for **up to 50 devices across up to 5 sites**.
- Deliverable: consolidated inventory (device, site, model, firmware
  version where present, IP/VLAN where present) plus a short findings note
  (e.g., outdated firmware clusters, inconsistent naming across sites,
  obvious gaps).
- No live dashboard/API access — exports only.

**Scope (out) / limits:**
- No configuration changes, no recommendations requiring live verification
  (e.g., "this firmware is vulnerable" claims are flagged as "verify
  against vendor advisory," not asserted as fact).
- More than 50 devices or 5 sites moves to a custom quote.

**Acceptance criteria:** same as the entry offer (no dropped data,
consistent naming, before/after record counts, stated assumptions), plus:
one explicit "possible risk/gap" finding per site where the export
supports one.

**Revision window:** one round, 5 business days, same terms as the entry
offer.

**Payment terms:** same as the entry offer.

**Repricing trigger:** same 50%-overrun rule as the entry offer, evaluated
independently per offer type.

---

## Supporting offer — Small Python Automation

**Price:** $150 flat | **Time budget:** up to 5 hours

**Who it's for:** a client who has already seen a clean inventory (via
either offer above) and has one repetitive local file transformation they
do by hand — reformatting an export, merging two files, generating a
recurring report from a fixed input shape.

**Scope (in):**
- One bounded local transformation: **up to two input files, one output
  format**, run manually by the client (not scheduled/hosted automation,
  not a live integration).
- Deliverable: a documented script (or spreadsheet formula set, whichever
  fits) plus a one-page "how to run it" instruction sheet and one
  validation pass showing correct output against the client's real sample
  input.

**Scope (out) / limits:**
- No hosting, scheduling, credentials, or live system access. This is a
  local, client-run tool — not a managed service.
- No new external dependencies beyond Python's standard library unless the
  client explicitly approves a specific package and understands they must
  install it themselves.
- Input/output shape changes after the first validation pass count as scope
  change, not revision.

**Acceptance criteria:**
- Script runs successfully on the client's real sample input and produces
  the agreed output format.
- Instructions are sufficient for a non-programmer to re-run it
  unassisted.
- No fabricated "AI/automation" claims beyond what the script verifiably
  does.

**Revision window:** one round of adjustment to the transformation logic
within 5 business days, based on the same input/output shape validated at
delivery.

**Payment terms:** same as the other offers. Given the larger time budget,
50% up front is the default (not just first-time-client), invoiced through
the existing Invoice Register.

**Repricing trigger:** same 50%-overrun rule. Because this offer has the
widest variance in actual client input complexity, treat any job that
needs a *third* clarifying round before scope is even confirmed as a signal
to quote custom instead of taking it at $150.

---

## Follow-on offers (not part of the first pilot batch)

Documented for context, not offered in the initial six-contact experiment
(see parent #113's pilot-price table and #116's outreach batch):

- **Technical runbook — $125** (one existing process, ≤10 steps/4 pages)
- **Recurring inventory update — $50/month** (existing paid baseline
  client only; one supplied export update monthly, no monitoring/SLA)
- **Small-business web work — quote after scoping** (existing Web Design
  line; intentionally not fixed-price at this stage)
