export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="border-b border-navy-800/80 bg-navy-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-[4.25rem] flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/90 to-cyan-700 flex items-center justify-center font-semibold text-navy-950 text-sm shadow-soft">
              W
            </div>
            <span className="font-semibold tracking-tight text-[1.05rem] text-slate-100 group-hover:text-white transition">
              Winters Operations
            </span>
          </a>
          <nav className="hidden sm:flex items-center gap-7 text-[0.9rem] text-slate-400">
            <a href="/services" className="hover:text-slate-100 transition">
              Services
            </a>
            <a href="#about" className="hover:text-slate-100 transition">
              About
            </a>
            <a
              href="#contact"
              className="px-3.5 py-1.5 rounded-md text-cyan-300/90 border border-cyan-500/25 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-500/40 hover:text-cyan-200 transition"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(6,182,212,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(15,23,42,0.4),transparent_50%)]" />
          <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-32 text-center">
            <p className="text-cyan-400/80 font-medium tracking-[0.12em] text-[0.7rem] uppercase mb-5">
              Operations & AI Automation Consulting
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-[3.4rem] font-bold tracking-tighter text-white max-w-3xl mx-auto leading-[1.12]">
              From operational friction
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300/95 via-cyan-400 to-teal-300/90">
                to command.
              </span>
            </h1>
            <p className="mt-7 text-[1.05rem] text-slate-400 max-w-xl mx-auto leading-relaxed">
              Winters Operations helps teams run cleaner, faster, and with less
              manual toil. Practical ops leadership plus focused automation —
              especially around the tools network and IT teams already live in.
            </p>
            <div className="mt-11 flex flex-col sm:flex-row gap-3.5 justify-center">
              <a
                href="/services"
                className="px-6 py-3 rounded-lg bg-cyan-500 text-navy-950 font-semibold text-[0.95rem] hover:bg-cyan-400 transition shadow-glow"
              >
                See Services
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-lg border border-navy-600 text-slate-200 hover:border-slate-500 hover:text-white transition text-[0.95rem]"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 border-t border-navy-800/80">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-cyan-400/70 font-medium tracking-[0.12em] text-[0.7rem] uppercase mb-3">
                What we do
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Two clear service lines
              </h2>
              <p className="mt-3.5 text-slate-400 max-w-lg mx-auto leading-relaxed">
                Stronger day-to-day operations, or targeted automation that
                actually sticks. We meet you where you are.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Ops Consulting */}
              <div className="rounded-2xl border border-navy-700/80 bg-navy-900/40 p-8 hover:border-navy-600 hover:bg-navy-900/60 transition shadow-soft">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/15 flex items-center justify-center mb-6">
                  <svg
                    className="w-5 h-5 text-cyan-400/90"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white tracking-tight mb-2.5">
                  Operations Consulting
                </h3>
                <p className="text-slate-400 leading-relaxed mb-6 text-[0.95rem]">
                  Process improvement, fractional ops leadership, and practical
                  systems that reduce friction. Clearer work, cleaner handoffs.
                </p>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  <li className="flex gap-2.5">
                    <span className="text-cyan-500/80 mt-0.5">→</span>
                    Process design & improvement
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-cyan-500/80 mt-0.5">→</span>
                    Fractional ops leadership
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-cyan-500/80 mt-0.5">→</span>
                    Operating cadence & visibility
                  </li>
                </ul>
              </div>

              {/* AI / Automation */}
              <div className="rounded-2xl border border-navy-700/80 bg-navy-900/40 p-8 hover:border-navy-600 hover:bg-navy-900/60 transition shadow-soft">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/15 flex items-center justify-center mb-6">
                  <svg
                    className="w-5 h-5 text-cyan-400/90"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white tracking-tight mb-2.5">
                  AI & Automation Consulting
                </h3>
                <p className="text-slate-400 leading-relaxed mb-6 text-[0.95rem]">
                  Practical Python automation that fits the tools your teams
                  already use. Specialty focus on network and IT platforms.
                </p>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  <li className="flex gap-2.5">
                    <span className="text-cyan-500/80 mt-0.5">→</span>
                    Cisco Meraki automation
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-cyan-500/80 mt-0.5">→</span>
                    SolarWinds integration
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-cyan-500/80 mt-0.5">→</span>
                    ServiceNow workflows
                  </li>
                </ul>
                <a
                  href="/services"
                  className="mt-7 inline-flex text-sm font-medium text-cyan-400/90 hover:text-cyan-300 transition"
                >
                  View service details →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="py-24 border-t border-navy-800/80 bg-navy-900/25"
        >
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="text-cyan-400/70 font-medium tracking-[0.12em] text-[0.7rem] uppercase mb-3">
              About
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-5">
              Deliberate control, less firefighting
            </h2>
            <p className="text-slate-400 leading-relaxed text-[1.05rem]">
              Winters Operations is a focused consulting practice. Most
              operational pain is solvable once you can see it clearly and put
              the right automation in the right places. We work with network,
              IT, and operations teams that want less chaos and more command.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 border-t border-navy-800/80">
          <div className="max-w-lg mx-auto px-6 text-center">
            <p className="text-cyan-400/70 font-medium tracking-[0.12em] text-[0.7rem] uppercase mb-3">
              Contact
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
              Get in touch
            </h2>
            <p className="text-slate-400 mb-9 leading-relaxed">
              Ready to talk about how your operations or automation could run
              better? Reach out — we’ll respond promptly.
            </p>
            <a
              href="mailto:solutions@wintersoperations.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 text-navy-950 font-semibold text-[0.95rem] hover:bg-cyan-400 transition shadow-glow"
            >
              solutions@wintersoperations.com
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-navy-800/80 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <div>© {new Date().getFullYear()} Winters Operations</div>
          <div className="text-slate-600 text-xs tracking-wide">
            Ops & AI automation consulting
          </div>
        </div>
      </footer>
    </div>
  );
}
