import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Winters Operations is led by Karl Winters — 20+ years of enterprise network engineering, Meraki SD-WAN, and practical Python automation.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-navy-800">
          <div className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
            <p className="eyebrow mb-4">About</p>
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

            <div className="surface p-8">
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
              Whether it&apos;s a site, automation, or network work — reach out
              and we&apos;ll respond promptly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`mailto:${contactEmail}`} className="btn-primary">
                {contactEmail}
              </a>
              <a href="/services" className="btn-ghost">
                View services
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
