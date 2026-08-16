import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";
import NetworkTopology from "@/components/NetworkTopology";
import StatsBand from "@/components/StatsBand";
import ServiceIcon from "@/components/ServiceIcon";
import TechMarquee from "@/components/TechMarquee";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/content";
import {
  createPageMetadata,
  homeDescription,
} from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/",
  description: homeDescription,
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-field" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-navy-950 to-navy-950" />
          <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div className="text-center lg:text-left">
              <p className="eyebrow mb-4">Web · Network · Automation</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                A website that works,
                <br />
                <span className="text-gradient">automation that saves you time.</span>
              </h1>
              <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Winters Operations builds clean, fast websites and practical
                Python automation for small businesses — backed by 30+ years of
                enterprise IT experience.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="/services" className="btn-primary">
                  See Services
                </a>
                <a href="/demo" className="btn-ghost">
                  See Demos
                </a>
              </div>
            </div>
            <NetworkTopology />
          </div>

          <div className="relative border-t border-navy-800 py-6">
            <TechMarquee />
          </div>
        </section>

        <section className="border-t border-navy-800">
          <div className="max-w-6xl mx-auto px-6 py-8 sm:py-10">
            <StatsBand />
          </div>
        </section>

        <section id="services" className="py-24 border-t border-navy-800">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white">Three clear service lines</h2>
              <p className="mt-3 text-slate-400 max-w-xl mx-auto">
                Whether you need network solutions, a website, or automation that saves you time, we meet you where you are.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => (
                <Reveal key={service.id}>
                  <div className="surface-interactive p-8 h-full">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6">
                      <ServiceIcon id={service.id} />
                    </div>
                    <p className="eyebrow mb-2">{service.eyebrow}</p>
                    <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                    <p className="text-slate-400 leading-relaxed mb-6">{service.summary}</p>
                    <ul className="space-y-2 text-sm text-slate-300">
                      {service.bullets.slice(0, 3).map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="text-cyan-400">→</span> {bullet}
                        </li>
                      ))}
                    </ul>
                    <a href="/services" className="mt-6 inline-flex text-sm font-semibold text-cyan-400 hover:text-cyan-300">
                      View service details →
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-navy-800 bg-navy-900/30">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">About</h2>
            <p className="text-slate-400 leading-relaxed text-lg mb-8">
              Led by Karl Winters — 30+ years of enterprise IT experience,
              large-scale Meraki SD-WAN, and practical Python automation for
              teams that need results without the full-time overhead.
            </p>
            <a href="/about" className="inline-flex text-sm font-semibold text-cyan-400 hover:text-cyan-300">
              Read more about the practice →
            </a>
          </div>
        </section>

        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
