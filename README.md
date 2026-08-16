# Winters Operations — Consulting Site

Marketing site for **Winters Operations**: enterprise network engineering,
practical Python automation, and small-business web design.

**Canonical domain:** `https://wintersoperations.com`, set by `siteUrl` in
`lib/site.ts`. It drives metadata, Open Graph, `robots.txt` and
`sitemap.xml`.

`wint-ops.com` is a second owned domain serving the same site. Both emit a
canonical tag pointing at `wintersoperations.com`, so search engines already
treat it as the single authoritative copy. A 301 redirect from `wint-ops.com`
would consolidate link equity more completely; because this is a static
export (`output: 'export'`), that redirect has to be configured at the host
or registrar, not in `next.config.mjs`.

## Positioning

Three equal service lines:

1. **Web Design** — clean, fast sites for small businesses.
2. **Network & Infrastructure** — SD-WAN, Starlink, structured cabling,
   MDF/IDF buildouts, network assessments, IP surveillance, VoIP.
3. **AI & Automation** — Python tooling for Meraki and IT operations.

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 3
- Static export (`output: 'export'`) — deployable to any static host

## Getting Started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export lands in /out
npx serve out        # preview the production build
```

## Project Structure

```
app/
  layout.tsx           # Root layout, metadata, fonts
  page.tsx             # Home
  services/page.tsx    # Service detail
  work/page.tsx        # Case studies
  about/page.tsx       # About
  demo/page.tsx        # Interactive demos (console + topology)
  globals.css          # Tailwind + design-system primitives
components/
  SiteHeader.tsx       # Sticky nav incl. mobile sheet
  SiteFooter.tsx
  NetworkTopology.tsx  # Animated hub-and-spoke hero SVG
  StatsBand.tsx        # Telemetry proof strip
  ContactSection.tsx   # Contact block used on every page
  ContactForm.tsx      # Google Form / Formspree / mailto
  Reveal.tsx           # Scroll-reveal wrapper
  TechMarquee.tsx
  ServiceIcon.tsx
  CopyEmailButton.tsx
lib/
  site.ts              # URLs, email, nav, stats, contact endpoint
  content.ts           # Services, case studies, process copy
docs/
  contact-form-setup.md
```

## Editing content

Almost all copy lives in `lib/content.ts` and `lib/site.ts` — services, case
studies, process steps, stats and the capability list. Change it there
rather than in the JSX.

⚠ **Case studies in `lib/content.ts` are drafts.** They are anonymised and
conservative, but review the specifics against real engagements before
publishing.

## Contact form

Works with no configuration (falls back to a pre-filled `mailto:`). To
collect submissions in Google Sheets instead, follow
[`docs/contact-form-setup.md`](docs/contact-form-setup.md) and paste the two
ids into `lib/site.ts`.

## Design system

Design primitives are defined once in `app/globals.css` and
`tailwind.config.ts`:

- `.surface` / `.surface-interactive` — gradient-hairline cards with hover lift
- `.grid-field` / `.dot-field` — masked background textures
- `.btn-primary` / `.btn-ghost` / `.chip` / `.field` — controls
- `.eyebrow` / `.text-gradient` — type accents
- `.reveal` — scroll-reveal states

Palette stays navy + cyan, with an `electric` blue as gradient partner and
`signal` green reserved for status affordances. Inter for text, JetBrains
Mono for labels, stats and eyebrows.

All motion is disabled under `prefers-reduced-motion`, and `.reveal`
content is forced visible when JavaScript is unavailable.

## Deploy

Static export — the `out/` directory can be dropped on any static host.
Vercel is connected for the live site.
