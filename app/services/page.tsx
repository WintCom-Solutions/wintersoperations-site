import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import ServiceIcon from "@/components/ServiceIcon";
import Reveal from "@/components/Reveal";
import { services, processSteps } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/services",
  title: "Services",
  description:
    "Winters Operations builds websites and practical Python automation for small businesses, backed by enterprise network engineering experience.",
});

const deliverables = [
  "Network assessment report with a practical remediation roadmap",
  "SD-WAN or new-construction design and implementation plan",
  "Automation scripts or small internal tools tailored to your environment",
  "Operator-facing documentation and handoff notes",
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-100">
      <SiteHeader />

      <main>
        <section className="border-b border-navy-800">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <p className="eyebrow mb-4">Services</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              Websites, automation, and network work — done right.
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl leading-relaxed">
              Winters Operations builds clean websites and practical Python
              automation for small businesses, backed by 20+ years of enterprise
              network and infrastructure experience.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Reveal key={service.id}>
                <article className="surface p-8 h-full">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6">
                    <ServiceIcon id={service.id} />
                  </div>
                  <p className="eyebrow mb-3">{service.eyebrow}</p>
                  <h2 className="text-2xl font-semibold text-white mb-4">{service.title}</h2>
                  <p className="text-slate-400 leading-relaxed mb-6">{service.summary}</p>
                  <ul className="space-y-3 text-sm text-slate-300">
                    {service.bullets.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-cyan-400">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="py-20 border-t border-navy-800 bg-navy-900/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="eyebrow mb-4">How we work</p>
              <h2 className="text-3xl font-bold text-white">Scope, build, handoff.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {processSteps.map((step) => (
                <div key={step.step} className="surface p-8">
                  <div className="font-mono text-cyan-400/80 text-sm mb-3">{step.step}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-navy-800">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div>
              <p className="eyebrow mb-4">Example deliverables</p>
              <h2 className="text-3xl font-bold text-white">
                Concrete outputs, not vague strategy theater.
              </h2>
              <p className="mt-4 text-slate-400 leading-relaxed">
                Every engagement should leave the team with something usable: a
                decision, a workflow, a script, a handoff, or a cleaner way to
                operate.
              </p>
              <a href="/work" className="mt-6 inline-flex text-sm font-semibold text-cyan-400 hover:text-cyan-300">
                See case studies →
              </a>
            </div>
            <div className="surface p-6">
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

        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
