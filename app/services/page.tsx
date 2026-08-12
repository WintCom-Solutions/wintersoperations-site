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
    <div className="min-h-screen bg-navy-950 text-slate-100">
      <header className="border-b border-navy-700/60 bg-navy-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center font-bold text-navy-950 text-sm">
              W
            </div>
            <span className="font-semibold tracking-tight text-lg">
              Winters Operations
            </span>
          </a>
          <nav className="hidden sm:flex items-center gap-8 text-sm text-slate-400">
            <a href="/services" className="text-cyan-400">
              Services
            </a>
            <a href="/#about" className="hover:text-cyan-400 transition">
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
              Focused consulting for operations, IT, and automation work.
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl leading-relaxed">
              Winters Operations helps teams reduce manual effort, clarify how
              work moves, and build practical automation around real tools and
              real operational constraints.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
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
                Every engagement should leave the team with something usable:
                a decision, a workflow, a script, a handoff, or a cleaner way
                to operate.
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
              Use the current placeholder contact path while final contact and
              lead intake details are being planned.
            </p>
            <a
              href="mailto:hello@wintersoperations.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 text-navy-950 font-semibold hover:bg-cyan-400 transition"
            >
              hello@wintersoperations.com
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
