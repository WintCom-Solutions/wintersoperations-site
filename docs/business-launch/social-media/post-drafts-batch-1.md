# Social media post drafts — Batch 1

Follow-up to #121 ("Establish social media presence for Winters Operations").
That issue tracked the platform-priority plan (LinkedIn > Facebook > Instagram)
and content pillars; account creation is still Karl's step. This doc is the
"once accounts exist, here's a first batch of copy" deliverable it called for.

**Status: draft copy only.** No accounts exist yet, nothing here has been
posted, and nothing here is scheduled through any tool. Karl reviews, edits to
taste, fills placeholders, and posts manually (or schedules) once the LinkedIn
Company Page and Facebook Business Page are live.

## What this is grounded in

All copy is pulled from real, currently-published site content only:

- `README.md` — three service lines (Web Design; Network & Infrastructure;
  AI & Automation), tech stack, positioning.
- `lib/content.ts` — `services` (summaries/bullets), `guides` (checklist
  topics), `faqs`, `processSteps`.
- `lib/site.ts` — `stats` (30+ years enterprise IT, 500+ sites under
  management, 100% hands-on delivery), `siteUrl`, `contactEmail`.

**Deliberately not used:** the `caseStudies` array in `lib/content.ts` is
explicitly flagged there as draft ("anonymised and conservative, but review
the specifics against real engagements before publishing") and issue #112's
case-study/productization work is still unpublished. No draft is written as
if it's a live case study, no client is named, no dollar outcome or metric is
invented, and no testimonial/review quote is fabricated. Where a post touches
a completed-project idea, it's phrased generically ("a recent structured
cabling job," "a small-business site build") with an explicit photo/detail
placeholder — never presented as a citable case study.

Every stat used (30+ years, 500+ sites, 100% hands-on) is the same number
already published live on the site today — nothing new is asserted.

## How to use this batch

- Platform order below = suggested posting order within that platform's
  queue, not a cross-platform sequence.
- Suggested cadence: LinkedIn 2x/week, Facebook 1–2x/week, Instagram
  1x/week — once each platform exists. Start LinkedIn + Facebook together
  (both are "high priority" per #121); hold Instagram until there's at least
  one real photo to pair with a caption.
- Every `[PLACEHOLDER]` must be filled or the line removed before posting.
  Nothing here should go out with a placeholder still in it.
- Nothing below references a URL, handle, or account — none exist yet. Add
  the real handles/links once the pages are created.

---

## LinkedIn (B2B credibility — post first once the Company Page exists)

### LI-1. Introduction / what we do
**Order:** 1 (first post, pin if possible)
**Placeholders:** `[COMPANY PAGE LOGO/BANNER]`, `[Karl's LinkedIn profile link, once linked to the page]`

> Winters Operations does three things well: clean, fast websites for small
> businesses; enterprise network & infrastructure work (SD-WAN, Starlink,
> structured cabling, network assessments); and practical Python automation
> for IT operations.
>
> We've spent 30+ years in enterprise IT and currently help manage 500+
> sites — and we bring that same rigor to small-business engagements, not a
> watered-down version of it.
>
> More on what we do: [website link]

### LI-2. Explainer — what SD-WAN actually does for a small business
**Order:** 2
**Placeholders:** none (pure explainer; no client reference)

> "SD-WAN" sounds like enterprise jargon, but the problem it solves is
> simple: if your business runs on more than one internet connection (or
> needs to), how do you make failover actually work instead of "call IT and
> wait"?
>
> SD-WAN lets a site automatically shift traffic to a backup link — cellular,
> a second ISP, or Starlink — when the primary connection degrades, without
> someone manually swapping cables or rebooting a router at 2am.
>
> For a small business with even one remote or hard-to-wire location, that's
> the difference between "we didn't notice" and "we lost half a day."

### LI-3. Explainer — Meraki estate hygiene
**Order:** 3
**Placeholders:** none

> If you're running Cisco Meraki across multiple sites, the two things that
> quietly go wrong over time are: stale device configs that no longer match
> your standard template, and old credentials/SSIDs nobody remembers to
> retire.
>
> Neither shows up until something breaks or gets audited. A short automated
> inventory pass — comparing every device against an expected baseline — is
> usually enough to catch both before they're a problem instead of after.
>
> We wrote up the checklist version of this: [link to /guides/meraki-estate-hygiene once live]

### LI-4. Automation demo framing
**Order:** 4
**Placeholders:** `[SCREEN RECORDING OR SCREENSHOT of a Python script output — no real client data in the screenshot]`

> Most of the automation we build isn't glamorous — it's a Python script that
> pulls device inventory, checks it against a template, and flags what's
> drifted. But "not glamorous" is exactly why it works: it replaces a
> manual audit that used to take a day with something that runs in minutes
> and produces a plain report.
>
> That's the kind of tooling we build for IT operations: narrow, reliable,
> and built around the problem you actually have — not a platform you have
> to configure around.

### LI-5. Network assessment / structured cabling explainer
**Order:** 5
**Placeholders:** `[PHOTO of structured cabling / MDF-IDF work, once available]`

> A network assessment isn't about finding fault — it's about knowing what
> you actually have before you build on top of it: cable runs, rack layout,
> uplink capacity, and where the single points of failure are.
>
> We do this work from new-construction buildouts (MDF/IDF, structured
> cabling) through to cleanup on existing environments. The goal is always
> the same: a network that a normal Tuesday doesn't take down.

### LI-6. Web design (framed for a B2B/decision-maker audience)
**Order:** 6
**Placeholders:** `[SCREENSHOT of a completed site build, once available]`

> Small-business websites don't need to be complicated to work well. We build
> fast, mobile-first sites with no bloated template stack underneath — just
> the pages a customer actually needs and a contact path that gets answered.
>
> If your team is IT-literate but website-averse, this is the part of the
> stack we're happy to just own for you.

### LI-7. "What we actually do all day" recap post
**Order:** 7
**Placeholders:** none

> A quick recap of what Winters Operations covers, in case you found this
> page from one service and not the others:
>
> — Web Design: custom builds, fast and mobile-first, ongoing support.
> — Network & Infrastructure: SD-WAN, Starlink, structured cabling, MDF/IDF
> buildouts, assessments, IP surveillance, VoIP.
> — AI & Automation: Python tooling for Meraki and day-to-day IT ops —
> config auditing, monitoring, reporting.
>
> One team, three service lines, same standard of "no black boxes" on
> delivery.

---

## Facebook (local small-business angle — post once the Business Page exists)

### FB-1. Welcome / page intro
**Order:** 1
**Placeholders:** `[COVER PHOTO — office, van, or a work site photo]`, `[SERVICE AREA — confirm exact cities/counties with Karl before posting]`

> We're Winters Operations — website design, network/IT infrastructure, and
> automation help for small businesses in [SERVICE AREA]. If your business
> needs a website that actually works, a network that stays up, or you're
> tired of doing the same IT busywork by hand, that's us. Send us a message
> any time.

### FB-2. Service spotlight — Web Design
**Order:** 2
**Placeholders:** `[PHOTO of a completed website on a laptop/phone mockup, once available]`

> Need a website that doesn't take six months and doesn't cost a fortune to
> maintain? We build clean, fast, mobile-friendly sites for local businesses
> — no bloated builder platforms, no monthly plugin subscriptions piling up.
> Message us if you're ready to get your business online (or fix a site
> that's not working for you).

### FB-3. Service spotlight — Network & IT
**Order:** 3
**Placeholders:** `[PHOTO of cabling/rack work — before/after if available, INSERT YOUR OWN PROJECT PHOTO HERE]`

> Slow WiFi, a network closet nobody wants to touch, or internet that drops
> when it rains — sound familiar? We handle structured cabling, network
> cleanup, and setups that include backup internet (like Starlink) so a
> single outage doesn't take your whole business offline.

### FB-4. Service spotlight — Automation
**Order:** 4
**Placeholders:** none (kept general/educational, no client reference)

> If your team spends hours a month doing the same IT checklist by hand —
> checking device settings, pulling reports, auditing access — there's
> usually a way to script most of it. We build small, practical automation
> tools that save that time without requiring you to become a programmer.

### FB-5. Local/service-area post
**Order:** 5
**Placeholders:** `[SERVICE AREA — confirm with Karl]`, `[LOCAL LANDMARK OR EVENT REFERENCE, optional]`

> We work with small businesses in and around [SERVICE AREA]. Whether it's a
> new site build, a network that needs sorting out, or IT tasks that eat up
> your week, we'd rather have a quick conversation than send you a form.
> Message the page or reach out at solutions@wintersoperations.com.

### FB-6. Review-request framing (structural, not a real review)
**Order:** 6 — post only after at least one completed engagement Karl is
comfortable asking a customer to review; do not post as a standalone item
before that.
**Placeholders:** `[CUSTOMER NAME/BUSINESS — only after they've agreed]`, `[LINK to review page]`

> If we've helped with your website, network, or automation setup and you've
> got a minute, a quick review helps other small businesses like yours find
> us. Thank you for trusting us with the work. [Review link]

### FB-7. Behind-the-scenes / how we work
**Order:** 7
**Placeholders:** `[PHOTO of a work-in-progress site/cabling/desk setup]`

> A look at how we work: we scope the real problem first (not just what's
> asked for), build hands-on with clear checkpoints, and hand off with
> documentation so your team can run what we built — no dependency on us
> forever. That's the process on every job, big or small.

---

## Instagram (visual proof — hold until real photos exist)

### IG-1. Before/after or in-progress project shot
**Pairs with:** `[PHOTO — a completed or in-progress network/cabling job. INSERT YOUR OWN PROJECT PHOTO HERE — do not post without one]`
**Order:** 1

> Structured cabling, done right, is invisible when it's finished — that's
> the point. A clean run, a labeled panel, and a network that just works.
> #smallbusinessit #networkinfrastructure

### IG-2. Web design visual
**Pairs with:** `[SCREENSHOT — a completed site on desktop + mobile, side by side. INSERT YOUR OWN SCREENSHOT HERE]`
**Order:** 2

> Fast, clean, mobile-first — built for a small business that needs a site
> that works, not a template that fights back. #webdesign #smallbusiness

### IG-3. Automation/diagram visual
**Pairs with:** `[SCREENSHOT — a simple network diagram or script output, sanitized of any real client data. INSERT YOUR OWN DIAGRAM/SCREENSHOT HERE]`
**Order:** 3

> Behind most of our automation work is something this unglamorous: a
> script that checks, flags, and reports — so a manual audit that used to
> take a day takes minutes instead. #pythonautomation #itops

---

## Open items for Karl

- Confirm exact service area wording for FB-1/FB-5 (city/county list) before
  posting — left as a placeholder here since it isn't defined elsewhere in
  the repo.
- Supply real photos/screenshots for every `[PHOTO]`/`[SCREENSHOT]`
  placeholder — none exist yet; nothing above should post without one where
  marked.
- FB-6 (review request) should only go out after a real completed
  engagement and with that customer's actual consent — treat it as a
  template, not a ready-to-post item.
- Once LinkedIn/Facebook pages exist, add their handles/URLs to `lib/site.ts`
  or wherever Karl wants social links surfaced on the site (separate small
  follow-up, not part of this doc).
