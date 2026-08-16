import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Winters Operations is led by Karl Winters — 20+ years of enterprise network engineering, Meraki SD-WAN, and practical Python automation.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100">
      <header className="border-b border-navy-700/60 bg-navy-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3.5">
            <Image
              src="/logo.png"
              alt="Winters Operations"
              width={48}
              height={48}
              className="rounded-lg"
            />
            <span className="font-semibold tracking-tight text-2xl">
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
              Enterprise experience, practical delivery.
            </h1>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              Winters Operations is a focused consulting practice for websites,
              automation, and network infrastructure — built from real
              day-to-day operations work, not theory.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-6 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-white tracking-tight mb-4">
                Karl Winters
              </h2>
              <p className="text-slate-400 leading-relaxed text-lg">
                Winters Operations is led by Karl Winters, a network engineer
                with 20+ years building and fixing enterprise infrastructure.
                Day to day, that means managing a large-scale Cisco Meraki
                SD-WAN environment spanning hundreds of spoke sites tied
                together through datacenter hubs and AWS, and writing the
                Python automation that turns hours of manual network work into
                minutes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white tracking-tight mb-4">
                How we work with teams
              </h2>
              <p className="text-slate-400 leading-relaxed text-lg">
                Consulting engagements bring that same experience to teams that
                need enterprise-level network expertise without the full-time
                cost — network assessments, SD-WAN and Starlink deployments,
                new-construction structured cabling and MDF/IDF buildouts, IP
                camera systems, and voice infrastructure.
              </p>
              <p className="mt-4 text-slate-400 leading-relaxed text-lg">
                The same mindset shows up in web design and automation work:
                clear scope, maintainable systems, and outputs you can actually
                run — not slide decks that sit on a shelf.
              </p>
            </div>

            <div className="rounded-2xl border border-navy-700 bg-navy-900/50 p-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                Focus areas
              </h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex gap-3">
                  <span className="text-cyan-400">→</span>
                  Websites for small businesses — clean, fast, no bloat
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400">→</span>
                  Python automation for Meraki and IT operations
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400">→</span>
                  SD-WAN, Starlink, structured cabling, and network assessments
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-navy-800">
          <div className="max-w-lg mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to talk?
            </h2>
            <p className="text-slate-400 mb-8">
              Whether it’s a site, automation, or network work — reach out and
              we’ll respond promptly.
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
