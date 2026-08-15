export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="border-b border-navy-700/60 bg-navy-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center font-bold text-navy-950 text-sm">
              W
            </div>
            <span className="font-semibold tracking-tight text-lg">
              Winters Operations
            </span>
          </div>
          <nav className="hidden sm:flex items-center gap-8 text-sm text-slate-400">
            <a href="/services" className="hover:text-cyan-400 transition">
              Services
            </a>
            <a href="#about" className="hover:text-cyan-400 transition">
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
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-navy-950 to-navy-950" />
          <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-28 text-center">
            <p className="text-cyan-400 font-medium tracking-wide text-sm uppercase mb-4">
              Operations & AI Automation Consulting
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
              From operational friction
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                to command.
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Winters Operations helps teams run cleaner, faster, and with less
              manual toil. We combine deep operations experience with practical
              AI and automation — especially around the tools network and IT
              teams already live in.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/services"
                className="px-6 py-3 rounded-lg bg-cyan-500 text-navy-950 font-semibold hover:bg-cyan-400 transition"
              >
                See Services
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-lg border border-slate-600 text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300 transition"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 border-t border-navy-800">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white">Two clear service lines</h2>
              <p className="mt-3 text-slate-400 max-w-xl mx-auto">
                Whether you need stronger day-to-day operations or targeted
                automation that actually sticks, we meet you where you are.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Ops Consulting */}
              <div className="rounded-2xl border border-navy-700 bg-navy-900/50 p-8 hover:border-cyan-500/30 transition">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-cyan-400"
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
                <h3 className="text-xl font-semibold text-white mb-3">
                  Operations Consulting
                </h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Process improvement, fractional ops leadership, and practical
                  systems that reduce friction. We help teams see the work more
                  clearly and run it more deliberately.
                </p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex gap-2">
                    <span className="text-cyan-400">→</span> Process design &
                    improvement
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-400">→</span> Fractional ops
                    leadership
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-400">→</span> Operating cadence
                    & visibility
                  </li>
                </ul>
              </div>

              {/* AI / Automation */}
              <div className="rounded-2xl border border-navy-700 bg-navy-900/50 p-8 hover:border-cyan-500/30 transition">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-cyan-400"
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
                <h3 className="text-xl font-semibold text-white mb-3">
                  AI & Automation Consulting
                </h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Practical Python automation that integrates the tools your
                  teams already use. Specialty focus on network and IT
                  operations platforms.
                </p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex gap-2">
                    <span className="text-cyan-400">→</span> Cisco Meraki
                    automation
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-400">→</span> SolarWinds
                    integration
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-400">→</span> ServiceNow
                    workflows
                  </li>
                </ul>
                <a
                  href="/services"
                  className="mt-6 inline-flex text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  View service details →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24 border-t border-navy-800 bg-navy-900/30">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">About</h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              Winters Operations is a focused consulting practice built around a
              simple idea: most operational pain is solvable once you can see it
              clearly and have the right automation in the right places. We work
              with network, IT, and operations teams that want less firefighting
              and more deliberate control.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 border-t border-navy-800">
          <div className="max-w-xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Get in touch</h2>
            <p className="text-slate-400 mb-8">
              Ready to talk about how your operations or automation could run
              better? Reach out — we’ll respond promptly.
            </p>
            <a
              href="mailto:solutions@wintersoperations.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 text-navy-950 font-semibold hover:bg-cyan-400 transition"
            >
              solutions@wintersoperations.com
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-navy-800 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div>© {new Date().getFullYear()} Winters Operations</div>
          <div className="text-slate-600">
            Site scaffolded by Grok · AI Task Force #108
          </div>
        </div>
      </footer>
    </div>
  );
}
