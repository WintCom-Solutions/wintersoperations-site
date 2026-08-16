import Image from "next/image";
import CopyEmailButton from "@/components/CopyEmailButton";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
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
            <a href="/itops-console" className="hover:text-cyan-400 transition">
              IT Ops Console
            </a>
            <a href="/about" className="hover:text-cyan-400 transition">
              About
            </a>
            <a
              href="#contact"
              className="px-4 py-2 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-navy-950 to-navy-950" />
          <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-28 text-center">
            <p className="text-cyan-400 font-medium tracking-wide text-sm uppercase mb-4">
              Web Design & Python Automation
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
              A website that works,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                automation that saves you time.
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Winters Operations builds clean, fast websites and practical
              Python automation for small businesses — backed by 20+ years of
              enterprise network and infrastructure experience.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/services"
                className="px-6 py-3 rounded-lg bg-cyan-500 text-navy-950 font-semibold hover:bg-cyan-400 transition"
              >
                See Services
              </a>
              <a
                href="/demo"
                className="px-6 py-3 rounded-lg border border-slate-600 text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300 transition"
              >
                Watch Demo
              </a>
            </div>
          </div>
        </section>

        <section id="services" className="py-24 border-t border-navy-800">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white">Three clear service lines</h2>
              <p className="mt-3 text-slate-400 max-w-xl mx-auto">
                Whether you need a website, automation that saves you time, or
                enterprise network work, we meet you where you are.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-2xl border border-navy-700 bg-navy-900/50 p-8 hover:border-cyan-500/30 transition">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Web Design</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Clean, fast, modern websites built for small businesses — no
                  bloated templates, no unnecessary complexity.
                </p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex gap-2"><span className="text-cyan-400">→</span> Custom site design & build</li>
                  <li className="flex gap-2"><span className="text-cyan-400">→</span> Fast, mobile-first performance</li>
                  <li className="flex gap-2"><span className="text-cyan-400">→</span> Ongoing updates & support</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-navy-700 bg-navy-900/50 p-8 hover:border-cyan-500/30 transition">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Network & Infrastructure</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Enterprise network design and deployment, from new construction
                  to SD-WAN across hundreds of sites.
                </p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex gap-2"><span className="text-cyan-400">→</span> SD-WAN & Starlink deployment</li>
                  <li className="flex gap-2"><span className="text-cyan-400">→</span> New construction & structured cabling</li>
                  <li className="flex gap-2"><span className="text-cyan-400">→</span> Network assessments & remediation</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-navy-700 bg-navy-900/50 p-8 hover:border-cyan-500/30 transition">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">AI & Automation</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Practical Python automation built from running a large-scale
                  Meraki SD-WAN environment day to day.
                </p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex gap-2"><span className="text-cyan-400">→</span> Cisco Meraki automation</li>
                  <li className="flex gap-2"><span className="text-cyan-400">→</span> Device config & credential auditing</li>
                  <li className="flex gap-2"><span className="text-cyan-400">→</span> Monitoring & reporting automation</li>
                </ul>
                <a href="/services" className="mt-6 inline-flex text-sm font-semibold text-cyan-400 hover:text-cyan-300">
                  View service details →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* IT Ops Console Interactive Demo */}
        <section className="py-20 border-t border-navy-800">
          <div className="max-w-4xl mx-auto px-6">
            <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-cyan-500/0 p-8 sm:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">⚙️</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Interactive IT Ops Troubleshooting
                  </h2>
                  <p className="text-slate-400">
                    See how Winters Operations diagnoses and optimizes network infrastructure
                  </p>
                </div>
              </div>
              <p className="text-slate-300 mb-6">
                Our console demonstrates real operational work: network diagnostics across Meraki, SolarWinds, and ServiceNow,
                automatic issue detection, and optimization workflows that reduce manual overhead.
              </p>
              <a
                href="/itops-console"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 hover:border-cyan-400/60 font-medium transition"
              >
                Launch Console →
              </a>
            </div>
          </div>
        </section>

        {/* About teaser — full story on /about */}
        <section className="py-20 border-t border-navy-800 bg-navy-900/30">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">About</h2>
            <p className="text-slate-400 leading-relaxed text-lg mb-8">
              Led by Karl Winters — 20+ years of enterprise network engineering,
              large-scale Meraki SD-WAN, and practical Python automation for
              teams that need results without the full-time overhead.
            </p>
            <a
              href="/about"
              className="inline-flex text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              Read more about the practice →
            </a>
          </div>
        </section>

        <section id="contact" className="py-24 border-t border-navy-800">
          <div className="max-w-xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Get in touch</h2>
            <p className="text-slate-400 mb-8">
              Ready to talk about a website, automation, or network work? Reach
              out — we’ll respond promptly.
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

      <footer className="border-t border-navy-800 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div>© {new Date().getFullYear()} Winters Operations</div>
          <div className="text-slate-600">Ops, web & automation consulting</div>
        </div>
      </footer>
    </div>
  );
}
