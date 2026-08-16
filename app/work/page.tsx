import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Winters Operations engagements — network automation, SD-WAN rollouts, and small-business web design.",
};

export default function WorkPage() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-navy-800">
          <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
            <p className="eyebrow mb-4">Work</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              Case studies from real engagements.
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl leading-relaxed">
              A sample of the network, automation, and web work Winters
              Operations has delivered. Details are anonymised.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-6 grid gap-8">
            {caseStudies.map((study) => (
              <Reveal key={study.id}>
                <article className="surface p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-1">{study.title}</h2>
                  <p className="eyebrow mb-4">{study.client}</p>
                  <p className="text-slate-400 leading-relaxed mb-4">{study.summary}</p>
                  <p className="text-sm text-cyan-300 font-medium">{study.outcome}</p>
                </article>
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
