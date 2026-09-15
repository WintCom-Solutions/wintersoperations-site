# Intake Questionnaire

Send this after a prospect expresses interest, before quoting. Designed to
be pasted into the **existing** Winters Operations client-form response
sheet (Google Workspace) rather than a new tool — see kit README.

## For any offer

1. What's the business name, and who's the right point of contact for this
   job (name + role)?
2. Which offer are we scoping — Network Documentation Cleanup, Cisco/Meraki
   Inventory Snapshot, or Small Python Automation? (Link the offer
   descriptions if the prospect wants the exact scope/limits.)
3. What's the trigger — what made this worth doing now?
4. Is there a deadline this needs to land before?
5. Who will actually receive/use the deliverable, and in what format do
   they expect it (spreadsheet, PDF summary, both)?

## Network Documentation Cleanup

6. How many devices, roughly, and is it one site or more than one?
   (Offer is scoped to one site, ≤25 devices — flag if this is bigger.)
7. Can you export your current device list as-is (CSV/spreadsheet/screen
   export)? What tool does it come from?
8. Is there anything in that export that must stay private/redacted before
   it's shared (customer names, IP ranges that must not leave your
   network, etc.)?

## Cisco/Meraki Inventory Snapshot

6. Meraki dashboard, Cisco tooling, or something else — what's the export
   source?
7. Roughly how many devices and sites? (Offer is scoped to ≤50 devices /
   ≤5 sites.)
8. Do you want firmware-version and possible-risk flags included, or just
   the consolidated inventory?

## Small Python Automation

6. Describe the transformation in plain language: what does the input file
   look like, and what should the output look like?
7. How many input files does this touch, and is the output always the same
   format? (Offer is scoped to ≤2 inputs / 1 output format.)
8. Will you run this yourself locally, or does someone else need to run
   it? What's their comfort level with the command line?
9. Can you share one **real, sanitized** sample input to validate against
   before delivery?

## Before quoting, confirm internally

- [ ] Scope fits inside the offer's stated limits (device/site/file caps).
- [ ] No live system access is being requested.
- [ ] No customer data beyond what's needed for this specific job has been
      shared or will be retained after delivery.
- [ ] If anything above doesn't fit, this becomes a custom quote — don't
      force it into the fixed-price template.
