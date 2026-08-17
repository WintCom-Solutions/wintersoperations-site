export const services = [
  {
    id: "web",
    title: "Web Design",
    eyebrow: "Small-business sites",
    summary:
      "Clean, fast, modern websites built for small businesses — no bloated templates, no unnecessary complexity.",
    bullets: [
      "Custom site design & build",
      "Fast, mobile-first performance",
      "Ongoing updates & support",
      "SEO-ready static or headless setups",
    ],
  },
  {
    id: "network",
    title: "Network & Infrastructure",
    eyebrow: "Enterprise ops",
    summary:
      "Enterprise network design and deployment, from new construction to SD-WAN across hundreds of sites.",
    bullets: [
      "SD-WAN & Starlink deployment",
      "New construction & structured cabling",
      "MDF/IDF buildouts",
      "Network assessments & remediation",
      "IP surveillance & VoIP",
    ],
  },
  {
    id: "automation",
    title: "AI & Automation",
    eyebrow: "Python tooling",
    summary:
      "Practical Python automation built from running a large-scale Meraki SD-WAN environment day to day.",
    bullets: [
      "Cisco Meraki automation",
      "Device config & credential auditing",
      "Monitoring & reporting automation",
      "Custom ops scripts and tooling",
    ],
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Scope",
    body: "We clarify the real problem, constraints, and success criteria before any code or cabling starts.",
  },
  {
    step: "02",
    title: "Build",
    body: "Hands-on delivery — sites, scripts, or infrastructure — with clear checkpoints and no black boxes.",
  },
  {
    step: "03",
    title: "Handoff",
    body: "Documentation, training, and ownership transfer so your team can run what we built.",
  },
] as const;

export const caseStudies = [
  {
    id: "meraki-audit",
    title: "Meraki estate audit & credential hygiene",
    client: "Multi-site retail operator",
    summary:
      "Automated discovery and reporting across hundreds of Meraki devices; flagged stale credentials and config drift.",
    outcome: "Reduced manual audit time from days to minutes per cycle.",
    detail:
      "Python scripts pulled organization-wide inventory, compared against expected templates, and produced exception reports for network ops. Credential rotation and unused SSID cleanup followed.",
    tags: ["Meraki", "Python", "Security"],
  },
  {
    id: "sdwan-spoke",
    title: "SD-WAN spoke rollout with Starlink backup",
    client: "Regional logistics firm",
    summary:
      "Designed and deployed hub-and-spoke topology with cellular/Starlink failover for remote yards.",
    outcome: "Consistent connectivity for previously offline locations.",
    detail:
      "Hub design, spoke templates, monitoring thresholds, and a practical failover runbook so local staff could recover without waiting for a truck roll.",
    tags: ["SD-WAN", "Starlink", "Infrastructure"],
  },
  {
    id: "small-biz-site",
    title: "Fast marketing site for local service business",
    client: "Independent contractor",
    summary:
      "Custom static site with clear service pages, contact flow, and mobile-first performance.",
    outcome: "Launched in under two weeks; measurable inquiry increase.",
    detail:
      "Scope stayed tight: three core pages, clear CTAs, and a contact path that actually got answered. No CMS complexity the client would never maintain.",
    tags: ["Web Design", "Static"],
  },
] as const;

export const guides = [
  {
    slug: "meraki-estate-hygiene",
    title: "Meraki estate hygiene checklist",
    description:
      "A practical list for finding stale configs, unused SSIDs, and credential drift across a multi-site Meraki organization.",
    category: "Automation",
    readTime: "6 min",
  },
  {
    slug: "sdwan-spoke-readiness",
    title: "SD-WAN spoke readiness checklist",
    description:
      "What to verify before turning up a new spoke — power, uplink, IP plan, monitoring, and failover expectations.",
    category: "Network",
    readTime: "5 min",
  },
  {
    slug: "small-business-site-scope",
    title: "How to scope a small-business website",
    description:
      "A short framework for deciding pages, forms, and hosting so the site ships fast and stays maintainable.",
    category: "Web Design",
    readTime: "4 min",
  },
] as const;

export const faqs = [
  {
    q: "Do you only work with large enterprises?",
    a: "No. Enterprise experience is the foundation, but we also build clean websites and practical automation for small businesses that want results without full-time overhead.",
  },
  {
    q: "Is the contact form private?",
    a: "Messages go to Winters Operations for response only. We do not sell or share inquiry data.",
  },
  {
    q: "Can you take over an existing Meraki or SD-WAN environment?",
    a: "Yes. Assessments, cleanup, automation, and ongoing support are common engagement types.",
  },
  {
    q: "Do you host the websites you build?",
    a: "We deliver static sites that can run on Vercel, Netlify, or any static host. Hosting can be client-owned or managed as part of the engagement.",
  },
  {
    q: "What does a typical engagement look like?",
    a: "Clear scope, hands-on build, then handoff with documentation so your team can run what was delivered.",
  },
] as const;

export const capabilities = [
  "Cisco Meraki",
  "Python",
  "SD-WAN",
  "Starlink",
  "Structured cabling",
  "IP surveillance",
  "VoIP",
  "Next.js",
  "Tailwind",
  "AWS networking",
] as const;
