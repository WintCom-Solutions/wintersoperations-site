import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Winters Operations offers operations consulting and practical AI automation for IT, network, and operations teams.",
};

const serviceGroups = [
  {
    title: "Operations Consulting",
    eyebrow: "Run the work cleaner",
    description:
      "Structured help for teams that need clearer process, cleaner handoffs, and better operating rhythm without adding more overhead.",
    items: [
      "Process mapping and friction review",
      "Operating cadence and visibility design",
      "Documentation and handoff cleanup",
      "Fractional operations support for focused initiatives",
    ],
  },
  {
    title: "AI & Automation Consulting",
    eyebrow: "Automate the right work",
    description:
      "Practical automation that connects to the tools your team already uses, with an emphasis on maintainable Python workflows and human-readable outputs.",
    items: [
      "Python automation for repeatable IT tasks",
      "Cisco Meraki workflow and reporting automation",
      "SolarWinds and ServiceNow integration planning",
      "AI-assisted triage and reporting workflows",
    ],
  },
];

const deliverables = [
  "Current-state review with practical recommendations",
  "Workflow diagrams and implementation plan",
  "Automation scripts or small internal tools using placeholder-safe configuration",
  "Operator-facing documentation and handoff notes",
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-200">
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
            <a href="/services" className="text-cyan-300/90">
              Services
            </a>
            <a href="/#about" className="hover:text-slate-100 transition">
              About
            </a>
            <a
              href="/#contact"
              className="px-3.5 py-1.5 rounded-md text-cyan-300/90 border border-cyan-500/25 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-500/40 hover:text-cyan-200 transition"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b border-navy-800/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_0%,rgba(6,182,212,0.08),transparent_50%)]" />
          <div className="relative max-w-6xl mx-auto px-6 py-20">
            <p className="text-cyan-400/80 font-medium tracking-[0.12em] text-[0.7rem] uppercase mb-4">
              Services
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-white max-w-3xl leading-[1.12]">
              Focused consulting for operations, IT, and automation work.
            </h1>
            <p className="mt-6 text-[1.05rem] text-slate-400 max-w-2xl leading-relaxed">
              Winters Operations helps teams reduce manual effort, clarify how
              work moves, and build practical automation around real tools and
              real operational constraints.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">
            {serviceGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-2xl border border-navy-700/80 bg-navy-900/40 p-8 hover:border-navy-600 hover:bg-navy-900/60 transition shadow-soft"
              >
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.12em] text-cyan-400/75 mb-3">
                  {group.eyebrow}
                </p>
                <h2 className="text-2xl font-semibold text-white tracking-tight mb-3.5">
                  {group.title}
                </h2>
                <p className="text-slate-400 leading-relaxed mb-6 text-[0.95rem]">
                  {group.description}
                </p>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="text-cyan-500/80 mt-0.5">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="py-20 border-t border-navy-800/80 bg-navy-900/25">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div>
              <p className="text-cyan-400/70 font-medium tracking-[0.12em] text-[0.7rem] uppercase mb-3">
                Example deliverables
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Concrete outputs, not vague strategy theater.
              </h2>
              <p className="mt-4 text-slate-400 leading-relaxed">
                Every engagement should leave the team with something usable: a
                decision, a workflow, a script, a handoff, or a cleaner way to
                operate.
              </p>
            </div>
            <div className="rounded-2xl border border-navy-700/80 bg-navy-950/60 p-7 shadow-soft">
              <ul className="space-y-4 text-slate-300">
                {deliverables.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-500/80 shrink-0" />
                    <span className="text-[0.95rem] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-navy-800/80">
          <div className="max-w-lg mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
              Start with the problem in front of you.
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
