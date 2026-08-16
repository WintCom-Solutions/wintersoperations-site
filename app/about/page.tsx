import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Karl Winters — Senior Network Engineer with 20+ years of enterprise infrastructure experience. SD-WAN, Meraki, Starlink, new construction, and Python automation. Available for consulting.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100">
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
            <a href="/services" className="hover:text-cyan-400 transition">
              Services
            </a>
            <a href="/demo" className="hover:text-cyan-400 transition">
              Demo
            </a>
            <a href="/about" className="text-cyan-400">
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

      <main className="flex-1">
        <section className="border-b border-navy-800">
          <div className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
            <p className="text-cyan-400 font-medium tracking-wide text-sm uppercase mb-4">
              About
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              I design, build, and fix enterprise networks.
            </h1>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              From new-construction structured cabling to large-scale SD-WAN
              across hundreds of sites — 20+ years solving the problems that
              keep businesses connected.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Memphis Metropolitan Area · Available for consulting
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-6 space-y-12">
            <div>
              <h2 className="text-2xl font-semibold text-white tracking-tight mb-4">
                Day job, real scale
              </h2>
              <p className="text-slate-400 leading-relaxed text-lg">
                Day to day means managing a large-scale Cisco Meraki SD-WAN
                environment — hundreds of spoke sites tied together through
                datacenter hubs and AWS cloud infrastructure. Alongside that
                comes the Python automation that turns hours of manual network
                management into minutes: device configuration, credential
                auditing, monitoring, and reporting.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white tracking-tight mb-4">
                Why Winters Operations exists
              </h2>
              <p className="text-slate-400 leading-relaxed text-lg">
                A lot of companies need enterprise-level network expertise
                without a full-time senior engineer on payroll. Winters
                Operations is that option — focused consulting for assessments,
                SD-WAN and Starlink, new construction, cameras, voice, and the
                automation that keeps it all runnable.
              </p>
              <p className="mt-4 text-slate-400 leading-relaxed text-lg">
                The same practical approach applies to websites and small-business
                automation: clear scope, systems you can maintain, and work that
                ships — not strategy theater.
              </p>
            </div>

            <div className="rounded-2xl border border-navy-700 bg-navy-900/50 p-8">
              <h3 className="text-lg font-semibold text-white mb-5">
                What shows up in engagements
              </h3>
              <ul className="space-y-3.5 text-slate-300">
                <li className="flex gap-3">
                  <span className="text-cyan-400 shrink-0">→</span>
                  <span>
                    <strong className="text-slate-200">Network assessments</strong>
                    — LAN, WAN, WLAN, and security posture with a report and
                    remediation roadmap
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 shrink-0">→</span>
                  <span>
                    <strong className="text-slate-200">SD-WAN & Starlink</strong>
                    — design and deploy, including Starlink as primary or backup
                    WAN for remote sites
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 shrink-0">→</span>
                  <span>
                    <strong className="text-slate-200">New construction</strong>
                    — structured cabling, MDF/IDF buildouts, complete network
                    design for new builds and renovations
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 shrink-0">→</span>
                  <span>
                    <strong className="text-slate-200">Python automation</strong>
                    — custom tools for config, auditing, monitoring, and reporting
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 shrink-0">→</span>
                  <span>
                    <strong className="text-slate-200">Cameras & voice</strong>
                    — IP surveillance and enterprise VoIP design, install, and
                    support
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-slate-400 leading-relaxed text-lg">
              If your network is holding the business back — or you just have a
              feeling it could run better — let’s talk.
            </p>
          </div>
        </section>

        <section className="py-16 border-t border-navy-800">
          <div className="max-w-lg mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to talk?
            </h2>
            <p className="text-slate-400 mb-8">
              Website, automation, or network work — reach out and we’ll respond
              promptly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:solutions@wintersoperations.com"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-cyan-500 text-navy-950 font-semibold hover:bg-cyan-400 transition"
              >
                solutions@wintersoperations.com
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-slate-600 text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300 transition"
              >
                View services
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-navy-800 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div>© {new Date().getFullYear()} Winters Operations</div>
          <div className="text-slate-600">Ops, web & automation consulting</div>
        </div>
      </footer>
    </div>
  );
}
