> **SYNTHETIC DEMONSTRATION — not a real client.** Filled out using
> `../delivery-report-template.md` to show what an actual delivery report
> looks like. "Fictional MSP Client Co." is a placeholder name.

---

**Winters Operations — Delivery Report**

Client: Fictional MSP Client Co. *(synthetic — sample only)*
Offer: Network Documentation Cleanup
Delivery date: 2026-09-15 *(sample date)*
Time spent: 2.1 hours (budget: 2.5 hours)

## What was delivered

A cleaned, de-duplicated device inventory for one site, standardized to a
single naming convention, with a findings list for anything that couldn't
be fully resolved from the supplied export.

## Record counts / scope actually covered

- Input received: 25 rows (one site export)
- Output delivered: 22 unique device records — 3 of the original 25 rows
  were duplicate entries of an already-listed device (inconsistent naming
  or casing caused the same physical device to appear twice) and were
  merged, not dropped.

## What changed

- Standardized every device name to a `TYPE-LOCATION-NN` convention (e.g.
  `Core-SW-01` → `SW-CORE-01`, `AP-Break-Room-05` → `AP-BREAKROOM-05`).
- Merged 3 duplicate rows caused by inconsistent naming/casing
  (`core sw 1` / `Core-SW-01`, `ACCESS-SW-02` / `Access-SW-02`,
  `ap-lobby-1` / `AP-Lobby-01`) into single records.
- Of the 4 unique devices missing an IP address in the original export, 3
  were resolved by cross-referencing a supplied DHCP lease export
  (`SW-ACCESS-03`, `AP-OFFICE-03`, `PRN-WAREHOUSE-02`).

## Findings / flags for the client to review

- **`SW-CONFROOM-05`** — IP address still unresolved; no matching lease
  found in the supplied DHCP export. Please confirm this device is
  currently powered and connected.
- **`NAS-MEDIA-01`** — purpose/owner wasn't stated anywhere in the export.
  Please confirm it's still in active use before it's carried forward in
  future inventories.
- **`RTR-ISP-01`** — firmware version wasn't present in the export. Flagged
  so you can verify the current version against the vendor's advisory
  page yourself — this report doesn't assert a firmware finding it can't
  see.

## Assumptions made

- Treated rows with an identical device name (aside from casing/spacing)
  and matching type/location as duplicate entries of the same physical
  device, not two separate devices.
- Where a DHCP lease cross-reference resolved an IP, used the lease
  currently assigned to that device's stated hostname.

## Out of scope / not included

- No topology diagram was produced — the entry offer covers inventory
  cleanup only, not diagramming.
- No live verification of any flagged item — everything above came from
  the supplied exports, not a login to client systems.

## Next steps

- Revision window: 5 business days from this delivery, one round.
- Invoice: sent separately via the Invoice Register ($75 flat).
- If a second site or a recurring monthly update is wanted, that's the
  Recurring Inventory Update follow-on offer, not assumed here.

---

*Questions on this delivery: reply to this message.*
