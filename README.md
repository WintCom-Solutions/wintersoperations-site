# Winters Operations — Consulting Site

Professional site for **Winters Operations**, an operations and AI/automation consulting practice.

**Domain:** [WintersOperations.com](https://wintersoperations.com) (DNS/hosting to be configured separately)

## Positioning

Two service lines:

1. **Operations Consulting** — process improvement, fractional ops leadership, operating cadence & visibility.
2. **AI & Automation Consulting** — practical Python automation with specialty focus on **Cisco Meraki**, **SolarWinds**, and **ServiceNow**.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Static export (`output: 'export'`) — easy to host on Vercel, Netlify, GitHub Pages, or any static host

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# → http://localhost:3000

# Production build
npm run build
# Output lands in /out (static export)

# Preview production build locally
npx serve out
```

## Deploy

Because the project uses `output: 'export'`, the `out/` directory after `npm run build` can be dropped onto any static host:

- **Vercel** (recommended for Next.js): connect the repo and deploy
- **Netlify**: connect repo or drag-and-drop `out/`
- **GitHub Pages**: push `out/` to a `gh-pages` branch or use an Action

DNS and production hosting for the live domain are intentionally out of scope for this initial scaffold (see issue #108).

## Project Structure

```
app/
  layout.tsx      # Root layout + metadata
  page.tsx        # Homepage (Hero, Services, About, Contact)
  globals.css     # Tailwind + base styles
tailwind.config.ts
next.config.mjs   # Static export enabled
```

## Notes

- Copy is placeholder-quality and intentionally open for Karl to refine.
- Contact email is a placeholder (`hello@wintersoperations.com`).
- Visual language intentionally echoes the dark + cyan aesthetic used in related Winters Ops product work.

---

**Built by Grok** for AI Task Force issue #108.  
Ready for independent review and content refinement.
