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
    tags: ["Meraki", "Python", "Security"],
  },
  {
    id: "sdwan-spoke",
    title: "SD-WAN spoke rollout with Starlink backup",
    client: "Regional logistics firm",
    summary:
      "Designed and deployed hub-and-spoke topology with cellular/Starlink failover for remote yards.",
    outcome: "Consistent connectivity for previously offline locations.",
    tags: ["SD-WAN", "Starlink", "Infrastructure"],
  },
  {
    id: "small-biz-site",
    title: "Fast marketing site for local service business",
    client: "Independent contractor",
    summary:
      "Custom static site with clear service pages, contact flow, and mobile-first performance.",
    outcome: "Launched in under two weeks; measurable inquiry increase.",
    tags: ["Web Design", "Static"],
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
