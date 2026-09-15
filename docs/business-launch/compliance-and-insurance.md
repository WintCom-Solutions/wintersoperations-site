# Compliance & Insurance Packet — Winters Operations (Hernando / DeSoto)

**Status:** Research deliverable only (docs). No purchases, registrations, binding applications, contracts, or external messages were made.  
**Issue:** Closes #114 (work packages A–B of parent #113)  
**Check date:** 2026-09-14  
**Author seat:** agent:builder-bot (AI-TASK-FORCE-BUILDER-BOT)

**Assumptions (mark clearly):**
- Operating base: Hernando, Mississippi metro / DeSoto County (exact `[HOME_ADDRESS]` unknown — both **Hernando city limits** and **unincorporated DeSoto County** cases are covered).
- Entity form: sole prop / LLC TBD — use placeholders `[LEGAL_ENTITY_NAME]`, `[EIN]`, `[SSN/EIN]`.
- Service model: (1) remote documents/software work, (2) on-site configuration, (3) **subcontracted** cabling/installation (Karl’s preference: Winters Operations as prime where needed; customer-direct installer as alternative).
- This repo is **public** — no private contacts, tax IDs, addresses, or policy numbers.

---

## 1. Business description (broker-ready)

**Trade name placeholder:** `[DBA / Winters Operations]`  
**Legal name placeholder:** `[LEGAL_ENTITY_NAME]`  
**Principal location:** `[HOME_ADDRESS]`, DeSoto County, MS (Hernando area)  
**Contact:** `[PHONE]`, `[EMAIL]`  
**NAICS (typical):** 541512 Computer Systems Design Services; related 541519 / 238210 only if acting as installer (prefer subcontractor)

**Services offered:**
- Remote: documentation, software configuration, systems design, consulting delivered electronically.
- On-site: configuration, troubleshooting, customer-premises IT setup (no new construction as Winters Operations workforce).
- Physical plant (cabling / low-voltage install): **subcontracted** to licensed specialists; Winters Operations may act as prime or refer customer-direct.

**Operations footprint:** Mississippi home base; customer work expected in **MS, TN, and AR** (Memphis metro / Mid-South). No employees assumed at launch (`[EMPLOYEE_COUNT]` ≤ 4 unless updated).

**Risk profile (plain language for brokers):**
- Professional / technology errors & omissions (advice, config, missed requirements).
- Cyber / privacy (access to client systems and data).
- Premises / on-site GL (slip, property damage while on customer site).
- Contingent exposure if subcontractors are underinsured or misclassified.
- Auto if personal vehicles used for business visits (`[PERSONAL_AUTO_POLICY]` endorsement check).

---

## 2. Hernando city limits vs unincorporated DeSoto County

| Topic | Hernando city limits | Unincorporated DeSoto County |
| --- | --- | --- |
| Local privilege / business license | City of Hernando Office of Planning — zoning verification first; business license application; yearly renewal | County tax collector issues privilege license for businesses **outside** municipalities (Miss. Code § 27-17-9) |
| Zoning / home occupation | Contact Planning (662-429-9095); home business path listed on city site; lease or home-occupation rules may apply | DeSoto County Zoning Ordinance applies to unincorporated property; confirm allowed use before operating from home |
| Privilege tax (state floor) | Municipal tax collector / city process; state statute sets $20/yr for ≤3 employees as general privilege amount (local process may add steps) | Same statutory amounts via **county** tax collector |
| Sales / use tax | MS DOR registration if selling taxable computer software / computer software services | Same (state-level) |
| Contacts (public) | City of Hernando, 475 W. Commerce St., Hernando, MS 38632; Planning 662-429-9095 | DeSoto County Tax Collector, 365 Losher St. Suite 110, Hernando, MS 38632; 662-469-8030 |

**Sources (checked 2026-09-14):**
- City of Hernando — Business License: https://www.cityofhernando.org/departments/office-of-planning/business-license
- Miss. Code § 27-17-9 (privilege license; municipal vs county): https://law.justia.com/codes/mississippi/title-27/chapter-17/general-provisions/section-27-17-9/
- DeSoto County Tax Collector directory: https://www.desotocountyms.gov/Directory/Home/DepartmentListing?DID=36
- DeSoto County locations: https://www.desotocountyms.gov/297/Locations
- DeSoto County Zoning Ordinance (unincorporated): https://www.desotocountyms.gov/DocumentCenter/View/10775/Desoto-County-Zoning-Ordinance--Current-signed-3172026

**Uncertainty:** Exact Hernando **license fee schedule** and home-occupation checklist are not fully published online; confirm by phone/in person with Planning before filing. Do not treat this matrix as “cleared.”

---

## 3. MS / TN / AR compliance matrix

Legend: **BL** business/privilege license · **TL** trade/contractor license · **P** permit · **Tax** tax registration · **SI** statutory insurance · **CI** contract/insurance customary · **Rec** recommendation

### 3.1 Mississippi (home state)

| Activity | BL | TL | P | Tax | SI | CI / Rec | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Entity formation / foreign qual. | — | — | — | — | — | Rec: register with MS SOS if LLC/corp | Domestic LLC Certificate of Formation fee **$50** (MS SOS fee schedule). Foreign LLC registration **$250**. Annual report due Apr 15 (domestic LLC AR fee $0 on schedule; foreign LLC AR **$250**). |
| Local privilege license | Yes | — | Zoning as needed | — | — | — | § 27-17-9: ≤3 employees **$20**/yr; 4–10 **$30**/yr. City (Hernando) or county (unincorporated). |
| Remote docs / software / consulting | Local BL | Usually no MSBOC if not contracting construction | — | Likely MS DOR if taxable “computer software services” performed in MS | WC if ≥5 employees | Tech E&O + cyber | Miss. Code § 27-65-23 lists “Computer software services actually performed within this state” as taxable. SB2449 (2023) refined software / remote-access rules. |
| On-site IT configuration | Local BL | Usually no contractor license for pure IT config | Customer site rules | Same tax analysis | Same | GL + E&O; COI for customers | Confirm customer vendor requirements. |
| Cabling / low-voltage as **prime** | Local BL | **MSBOC** specialty “Communication Systems, Low Voltage Electrical” when contract size requires licensure | Building/electrical permits as required by AHJ | Possible contractor’s tax / sales tax | WC if threshold; GL often required by MSBOC | High CI | MSBOC: energy-limited systems ≤91V (phone, data, CCTV, etc.; **alarms excluded** from this classification). Commercial contracts over **$50,000** generally require licensure (confirm current MSBOC thresholds). |
| Cabling via **licensed subcontractor** | Local BL for Winters Ops | Sub holds TL | Sub/AHJ | Prime may still have tax nexus | Verify sub WC/GL | Hold-harmless + COI | Preferred path per subcontracting preference. |

**MS sources (checked 2026-09-14):**
- MS SOS Business FAQs: https://www.sos.ms.gov/business-services/business-faqs
- MS SOS Fee Schedule: https://www.sos.ms.gov/sites/default/files/business-services/FeeSchedule.pdf
- MS SOS “Start Your Business” PDF: https://www.sos.ms.gov/content/documents/Business/Business%20Entities%20(Clean).pdf
- Miss. Code § 27-65-23: https://law.justia.com/codes/mississippi/title-27/chapter-65/in-general/section-27-65-23/
- MDOR computer software DPP notice (MTC copy of state notice): https://www.mtc.gov/wp-content/uploads/2023/07/72-23-12-Computer-Software-DPP-Notice-.pdf
- MS Workers’ Comp — employers with **5+** regular employees (Miss. Code § 71-3-5): https://law.justia.com/codes/mississippi/2013/title-71/chapter-3/general-provisions/section-71-3-5 ; MWCC facts: https://www.mwcc.ms.gov/pdf/WCFacts2013.pdf
- MSBOC Communication Systems / Low Voltage: https://www.msboc.us/ufaq/communication-systems-low-voltage-electrical/

### 3.2 Tennessee (customer state)

| Activity | BL | TL | Tax | SI | CI / Rec | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Remote services into TN | Out-of-state: no TN **municipal** business license if no TN physical location | Usually N/A for pure IT consulting | **TN business tax** if substantial nexus + engaged in taxable activity + ≥$10k gross receipts in a county; out-of-state exempt from municipal-level business tax | TN WC if employing in TN | Contract COI | Register with TN DOR for business tax when thresholds met. |
| On-site configuration in TN | Same | Contractor license only if work is regulated construction | Sales/use may apply to taxable software install / certain services; consulting often nontaxable — confirm with TN DOR / CPA | Same | GL + E&O | Example in TN Business Tax nexus manual: large on-site IT team can create “business location.” |
| Subcontracted cabling in TN | — | Sub must meet TN contractor rules if applicable | Project-dependent | Sub WC | Verify sub license + COI | Prefer customer-direct or licensed TN sub. |

**TN sources (checked 2026-09-14):**
- TN DOR Business Tax nexus manual Ch. 2 (Mar 2021): https://www.tn.gov/content/dam/tn/revenue/documents/tax_manuals/business_tax/Chapter%202%20-%20Nexus%20-%20March%202021.pdf
- Tenn. Code § 67-4-717: https://law.justia.com/codes/tennessee/title-67/chapter-4/part-7/section-67-4-717/
- CTAS Business Tax overview: https://www.ctas.tennessee.edu/eli/business-tax
- TN Sales & Use Tax Manual (June 2025): https://www.tn.gov/content/dam/tn/revenue/documents/tax_manuals/june-2025/Sales-Use-Tax-Manual.pdf

**Uncertainty:** Exact sales-tax treatment of hybrid “consulting + software configuration” invoices is fact-specific; allocate line items with CPA support.

### 3.3 Arkansas (customer state)

| Activity | BL | TL | Tax | SI | CI / Rec | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Foreign LLC / entity | — | — | Franchise tax after registration | — | Rec if “doing business” in AR | Foreign LLC Certificate of Registration (FL-01): **$270 online / $300 paper**. Certificate of existence from home state often required (AR guidance: within ~30 days for some filings). |
| Local BL | City/county may require | — | AR DFA sales/use if applicable | — | Check customer city | No universal statewide “business license.” |
| IT consulting / remote | Usually local only | Not construction | Confirm taxable vs nontaxable services | WC if AR employees | E&O + cyber | |
| Cabling / install | — | AR Contractors Licensing Board if project meets commercial/residential thresholds (commonly cited **$50,000+** commercial — verify current ACLB rules) | Possible | Sub WC | Prefer licensed AR sub | |

**AR sources (checked 2026-09-14):**
- AR SOS Foreign LLC forms/fees: https://www.sos.arkansas.gov/business-commercial-services-bcs/forms-fees/llc/foreign-llc/
- AR SOS Doing Business in Arkansas 2025: https://www.sos.arkansas.gov/uploads/bcs/Doing_Business_in_Arkansas_2025.pdf
- ASBTDC Licenses/Permits/Taxes ebook: https://asbtdc.org/wp-content/uploads/2022/11/EBook-Licenses-Permits-Taxes.pdf
- AR Contractors Licensing Board (via ASBTDC): https://aclb.arkansas.gov

---

## 4. Contracting models: customer-direct installer vs Winters Operations as prime

| Dimension | Customer contracts installer directly | Winters Operations as prime; installer as sub |
| --- | --- | --- |
| License burden | Customer + installer; Winters Ops stays in IT/consulting lane | Winters Ops may face MSBOC / TN / AR contractor exposure if scope is “construction” or low-voltage above thresholds |
| Insurance | Winters Ops: E&O/cyber/GL for own work; installer: own GL/WC | Winters Ops often must carry higher GL; require sub COI naming Winters as additional insured; contingent WC risk if sub uninsured |
| Warranty / defects | Installer → customer | Winters Ops → customer (then back-to-back to sub) |
| Preference | Aligns with minimizing Winters Ops as construction contractor | Use when customer wants single throat-to-choke; still **subcontract** physical plant |
| Recommendation | **Default preference:** customer-direct or clearly scoped sub with licensed specialty; Winters Ops SOW excludes regulated trade work unless deliberately accepting prime role | Document risk acceptance if prime |

This preserves Karl’s subcontracting preference **without** choosing a binding legal structure here.

---

## 5. Insurance packet

### 5.1 Coverage comparison worksheet

| Coverage | Statutory? | Typical contract ask | Notes | Premium |
| --- | --- | --- | --- | --- |
| Commercial General Liability (CGL) | Rarely (except some licenses/contracts) | Often $1M occ / $2M agg | On-site visits; landlord/customer COI | **No fabricated premium** — obtain quotes |
| Technology E&O / Professional Liability | No (contract-driven) | Often $1M per claim | Core for consultancy | Quote only |
| Cyber (1st + 3rd party) | No | Rising; $1M common starting ask | FTC/NAIC educational guidance | Quote only |
| Workers’ Compensation | **MS: mandatory at 5+ employees** | Always if employees on site | Voluntary election possible below threshold | Quote only |
| Commercial / hired-nonowned auto | If business use of vehicles | Sometimes | Personal auto may exclude business use | Quote only |
| Umbrella / excess | No | Enterprise/gov | After primary limits set | Quote only |
| Bonds | If contractor license / public bid | Project-specific | MSBOC may require GL evidence | Quote only |

**Educational sources (not quotes; checked 2026-09-14):**
- NAIC Small Business Insurance: https://content.naic.org/consumer/small-business.htm
- FTC Cyber Insurance guidance: https://www.ftc.gov/business-guidance/small-businesses/cybersecurity/cyber-insurance
- U.S. Chamber CO small-business insurance overview: https://www.uschamber.com/co/run/human-resources/small-business-insurance

**Published cost examples (illustrative only — not Winters Ops quotes):** Chamber/Insureon-style roundups often cite low hundreds $/month for small BOP/GL packages and higher for cyber; **do not use as binders**. Separate “published averages” from **actual broker quotes**.

### 5.2 Subcontractor verification checklist

- [ ] Legal name / DBA / `[SUB_EIN]` match invoice and COI  
- [ ] Active specialty license (MSBOC / TN / AR as applicable) — screenshot + license #  
- [ ] COI: GL limits, WC (or exemption affidavit), E&O if design-involved  
- [ ] Additional insured + waiver of subrogation where contracts require  
- [ ] Written subcontract: scope, change orders, indemnity, insurance mins, warranty period  
- [ ] W-9; 1099 process; **classification** review (MS independent-contractor factors — MDES)  
- [ ] Safety / site rules; no alarms/fire work without proper licenses  
- [ ] Proof of tools/equipment ownership or rental (supports IC status)

MDES worker classification: https://mdes.ms.gov/employers/unemployment-tax/reporting-and-filing/worker-classification/

### 5.3 Ready-to-send agency / broker questions

1. For a Hernando/DeSoto-based IT consultancy with remote + occasional on-site work and **subcontracted** low-voltage, which package fits: BOP + Tech E&O + Cyber, or separate monoline?
2. Minimum recommended limits for SMB vs healthcare/finance customers?
3. Does the Tech E&O include network security / privacy, or must cyber be separate?
4. How is **subcontractor** work treated — contingent WC, additional insured endorsements, “your work” exclusions?
5. Home-based business: interaction with homeowners policy; need HO endorsement or commercial property for business personal property at `[HOME_ADDRESS]`?
6. Personal auto vs hired/non-owned for client visits.
7. Certificate turnaround and wording for customer vendor portals.
8. Any surplus-lines vs admitted market preference for cyber in MS.
9. Claims-made vs occurrence for E&O; retro date if prior freelance work.
10. Indicative **premium ranges only after underwriting** — please do not bind without written quote.

**Do not send these yet** — research packet only.

---

## 6. Application checklists & private facts (placeholders)

### 6.1 Entity & tax (human-required later)

- [ ] Choose entity; file MS SOS if LLC (`[LEGAL_ENTITY_NAME]`)  
- [ ] EIN `[EIN]`  
- [ ] MS DOR TAP account; sales/use if computer software services taxable  
- [ ] Local privilege license (Hernando **or** DeSoto County)  
- [ ] Zoning / home occupation confirmation  
- [ ] Bank `[BUSINESS_BANK_ACCOUNT]`  

### 6.2 Multi-state (as nexus appears)

- [ ] TN DOR business tax registration if thresholds met  
- [ ] AR foreign registration if “doing business”  
- [ ] Track county-level TN receipts (≥$10k trigger awareness)

### 6.3 Insurance applications (broker will need)

- [ ] Legal/DBA, `[HOME_ADDRESS]`, `[PHONE]`, website  
- [ ] Revenue estimate `[ANNUAL_REVENUE_ESTIMATE]` by state  
- [ ] Services % remote vs on-site vs subcontracted install  
- [ ] Prior insurance / claims `[CLAIMS_HISTORY]`  
- [ ] Employee/1099 counts `[EMPLOYEE_COUNT]` / `[1099_COUNT]`  
- [ ] Cyber controls summary (MFA, backups, admin access) — high level only  

### 6.4 Private facts to keep out of this public repo

`[SSN/EIN]`, `[HOME_ADDRESS]`, `[PHONE]`, driver’s license, bank statements, policy numbers, customer names, COIs with private emails, tax returns.

---

## 7. Cost ranges (sourced statutory fees only)

| Item | Published amount | Source | Notes |
| --- | --- | --- | --- |
| MS domestic LLC formation | $50 | MS SOS fee schedule | Not a premium |
| MS foreign LLC registration | $250 | MS SOS fee schedule | |
| MS foreign LLC annual report | $250 | MS SOS fee schedule | |
| MS privilege license (≤3 employees) | $20 / yr | § 27-17-9 | Local process may add fees |
| MS privilege license (4–10 employees) | $30 / yr | § 27-17-9 | |
| AR foreign LLC (online) | $270 | AR SOS | Paper $300 |
| TN business license fee (when applicable) | $15 application commonly cited | CTAS / Tenn. Code context | Confirm with county clerk / TN DOR |
| Insurance premiums | **Unknown** | — | **No fabricated premiums** |

---

## 8. Recommendation, alternatives, human-required actions

### Recommendation (non-binding)
1. Confirm whether `[HOME_ADDRESS]` is **inside Hernando** or **unincorporated DeSoto**; start the matching privilege-license + zoning path.  
2. Keep Winters Operations in **IT consultancy** lane; route physical cabling to **licensed subcontractors** or customer-direct installers.  
3. Register MS DOR early if selling taxable computer software services performed in Mississippi; get CPA review of invoice wording.  
4. Obtain broker quotes for **GL + Tech E&O + Cyber** before first paid on-site engagement; add WC when hiring.  
5. Monitor TN receipts/nexus and AR “doing business” before foreign qualification.

### Alternatives
- Accept prime contractor role on cabling jobs → budget MSBOC (and sister-state) licensing + higher insurance.  
- Pure remote-only model → lower GL/on-site exposure; still need E&O/cyber and local privilege license.

### Consolidated human-required actions
1. Decide Hernando vs unincorporated address case; call Planning or County Tax Collector.  
2. Form/register entity; obtain EIN.  
3. Apply for local privilege license; MS DOR as needed.  
4. Engage licensed insurance agent/broker with Section 5 packet.  
5. Draft subcontract template + COI checklist before any install partner.  
6. CPA/attorney review of multi-state tax and contractor thresholds when first TN/AR on-site or cabling job appears.  
7. Do **not** treat this document as legal clearance, a quote, or authorization to bind coverage.

---

## 9. Source index (all checked ~2026-09-14)

1. https://www.cityofhernando.org/departments/office-of-planning/business-license  
2. https://law.justia.com/codes/mississippi/title-27/chapter-17/general-provisions/section-27-17-9/  
3. https://www.desotocountyms.gov/Directory/Home/DepartmentListing?DID=36  
4. https://www.desotocountyms.gov/297/Locations  
5. https://www.desotocountyms.gov/DocumentCenter/View/10775/Desoto-County-Zoning-Ordinance--Current-signed-3172026  
6. https://www.sos.ms.gov/business-services/business-faqs  
7. https://www.sos.ms.gov/sites/default/files/business-services/FeeSchedule.pdf  
8. https://www.sos.ms.gov/content/documents/Business/Business%20Entities%20(Clean).pdf  
9. https://law.justia.com/codes/mississippi/title-27/chapter-65/in-general/section-27-65-23/  
10. https://www.mtc.gov/wp-content/uploads/2023/07/72-23-12-Computer-Software-DPP-Notice-.pdf  
11. https://www.mwcc.ms.gov/pdf/WCFacts2013.pdf  
12. https://law.justia.com/codes/mississippi/2013/title-71/chapter-3/general-provisions/section-71-3-5  
13. https://www.msboc.us/ufaq/communication-systems-low-voltage-electrical/  
14. https://mdes.ms.gov/employers/unemployment-tax/reporting-and-filing/worker-classification/  
15. https://www.tn.gov/content/dam/tn/revenue/documents/tax_manuals/business_tax/Chapter%202%20-%20Nexus%20-%20March%202021.pdf  
16. https://law.justia.com/codes/tennessee/title-67/chapter-4/part-7/section-67-4-717/  
17. https://www.ctas.tennessee.edu/eli/business-tax  
18. https://www.tn.gov/content/dam/tn/revenue/documents/tax_manuals/june-2025/Sales-Use-Tax-Manual.pdf  
19. https://www.sos.arkansas.gov/business-commercial-services-bcs/forms-fees/llc/foreign-llc/  
20. https://www.sos.arkansas.gov/uploads/bcs/Doing_Business_in_Arkansas_2025.pdf  
21. https://asbtdc.org/wp-content/uploads/2022/11/EBook-Licenses-Permits-Taxes.pdf  
22. https://content.naic.org/consumer/small-business.htm  
23. https://www.ftc.gov/business-guidance/small-businesses/cybersecurity/cyber-insurance  
24. https://www.uschamber.com/co/run/human-resources/small-business-insurance  

---

*End of research packet. Outstanding: agency determination, binding quotes, and address-specific zoning clearance.*
