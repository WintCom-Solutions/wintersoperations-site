import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
import { guides } from "@/lib/content";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Practical checklists and short guides on Meraki hygiene, SD-WAN readiness, and small-business website scope.",
};

export default function GuidesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-navy-800">
          <div className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
            <p className="eyebrow mb-4">Guides</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Practical checklists, not pitch decks.
            </h1>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              Short, usable notes from real network and automation work. Built for operators who need the next step, not a webinar.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-6 grid gap-6">
            {guides.map((g, i) => (
              <Reveal key={g.slug} delay={i * 60}>
                <a
                  href={`/guides/${g.slug}`}
                  className="surface-interactive block p-6 sm:p-8"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="chip">{g.category}</span>
                    <span className="font-mono text-xs text-slate-500">{g.readTime}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-white tracking-tight">
                    {g.title}
                  </h2>
                  <p className="mt-2 text-slate-400 leading-relaxed">{g.description}</p>
                  <span className="mt-4 inline-flex text-sm font-semibold text-cyan-400">
                    Read guide →
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
