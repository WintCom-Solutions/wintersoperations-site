import type { Metadata } from "next";
import Image from "next/image";
import CopyEmailButton from "@/components/CopyEmailButton";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Winters Operations builds websites and practical Python automation for small businesses, backed by enterprise network engineering experience.",
};

const serviceGroups = [
  {
    title: "Web Design",
    eyebrow: "A site that actually works",
    description:
      "Clean, fast, modern websites built for small businesses — no bloated templates, no unnecessary complexity.",
    items: [
      "Custom site design and build",
      "Fast, mobile-first performance",
      "Basic SEO and analytics setup",
      "Ongoing updates and support",
    ],
  },
  {
    title: "Network & Infrastructure",
    eyebrow: "Build it right the first time",
    description:
      "Enterprise-grade network design and deployment, from new-construction cabling to SD-WAN across hundreds of sites.",
    items: [
      "Network assessments — LAN, WAN, WLAN, and security posture review with a remediation roadmap",
      "SD-WAN design and deployment, including Starlink as primary or backup WAN",
      "New construction: structured cabling and MDF/IDF buildouts",
      "IP camera systems and voice (VoIP) infrastructure",
    ],
  },
  {
    title: "AI & Automation Consulting",
    eyebrow: "Automate the right work",
    description:
      "Practical Python automation that connects to the tools your team already uses, built from experience running a large-scale Meraki SD-WAN environment.",
    items: [
      "Python tooling for device configuration, credential auditing, and reporting",
      "Cisco Meraki workflow and reporting automation",
      "Monitoring and alerting that cuts manual checks to minutes",
      "AI-assisted triage and reporting workflows",
    ],
  },
];

const deliverables = [
  "Network assessment report with a practical remediation roadmap",
  "SD-WAN or new-construction design and implementation plan",
  "Automation scripts or small internal tools tailored to your environment",
  "Operator-facing documentation and handoff notes",
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-100">
      <header className="border-b border-navy-700/60 bg-navy-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Winters Operations"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-semibold tracking-tight text-lg">
              Winters Operations
            </span>
          </a>
          <nav className="hidden sm:flex items-center gap-8 text-sm text-slate-400">
            <a href="/services" className="text-cyan-400">
              Services
            </a>
            <a href="/demo" className="hover:text-cyan-400 transition">
              Demo
            </a>
            <a href="/about" className="hover:text-cyan-400 transition">
              About
            </a>
            <a
              href="/#contact"
              className="px-4 py-2 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="border-b border-navy-800">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <p className="text-cyan-400 font-medium tracking-wide text-sm uppercase mb-4">
              Services
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              Websites, automation, and network work — done right.
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl leading-relaxed">
              Winters Operations builds clean websites and practical Python
              automation for small businesses, backed by 20+ years of enterprise
              network and infrastructure experience.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            {serviceGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-2xl border border-navy-700 bg-navy-900/50 p-8"
              >
                <p className="text-sm font-medium uppercase tracking-wide text-cyan-400 mb-3">
                  {group.eyebrow}
                </p>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  {group.title}
                </h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  {group.description}
                </p>
                <ul className="space-y-3 text-sm text-slate-300">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-cyan-400">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="py-20 border-t border-navy-800 bg-navy-900/30">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div>
              <p className="text-cyan-400 font-medium tracking-wide text-sm uppercase mb-4">
                Example deliverables
              </p>
              <h2 className="text-3xl font-bold text-white">
                Concrete outputs, not vague strategy theater.
              </h2>
              <p className="mt-4 text-slate-400 leading-relaxed">
                Every engagement should leave the team with something usable: a
                decision, a workflow, a script, a handoff, or a cleaner way to
                operate.
              </p>
            </div>
            <div className="rounded-2xl border border-navy-700 bg-navy-950/70 p-6">
              <ul className="space-y-4 text-slate-300">
                {deliverables.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-navy-800">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start with the problem in front of you.
            </h2>
            <p className="text-slate-400 mb-8">
              Ready to talk about how your operations or automation could run
              better? Reach out — we'll respond promptly.
            </p>
            <a
              href="mailto:solutions@wintersoperations.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 text-navy-950 font-semibold hover:bg-cyan-400 transition"
            >
              solutions@wintersoperations.com
            </a>
            <div>
              <CopyEmailButton email="solutions@wintersoperations.com" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
