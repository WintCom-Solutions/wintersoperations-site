# Sample Deliverable — SYNTHETIC DEMONSTRATION ONLY

**This is a fabricated example, not a real client engagement.** No business
named here is real, no device inventory here came from a real network, and
no findings below describe a real customer's environment. It exists to
show a prospect exactly what the **Network Documentation Cleanup** offer
($75, `offers-and-service-descriptions.md`) produces, before they buy it.

## Files

- [`before-inventory.csv`](./before-inventory.csv) — synthetic "as
  exported" device list: 25 rows, deliberately messy (inconsistent naming,
  duplicate entries, missing IP addresses) to represent a realistic
  drifted inventory.
- [`after-inventory.csv`](./after-inventory.csv) — the cleaned output: 22
  unique, standardized device records.
- [`handoff-report.md`](./handoff-report.md) — the one-page summary that
  ships with the cleaned inventory, filled out using
  `../delivery-report-template.md`.

## Verified record counts

Directly counted from the two CSVs (not estimated):

| Check | Count |
| --- | --- |
| Raw rows in `before-inventory.csv` | 25 |
| Unique devices in `after-inventory.csv` | 22 |
| Rows in `before-inventory.csv` marked as a duplicate of an earlier row | 3 |
| `25 − 3 duplicates = 22` unique devices | matches `after-inventory.csv` row count ✓ |
| Devices with a blank `ip_address` among the 22 unique devices in `before-inventory.csv` | 4 |
| Of those 4, resolved in `after-inventory.csv` via a (synthetic) supplied DHCP lease cross-reference | 3 |
| Of those 4, left unresolved and flagged in `after-inventory.csv` | 1 |
| Devices flagged (`FLAG`) in `after-inventory.csv` for the client to review | 3 (1 unresolved IP + 2 other findings) |

This sample intentionally fits inside the entry offer's stated limit (one
site, ≤25 devices) — it's sized the way a real first engagement would be,
not an oversized showcase.
