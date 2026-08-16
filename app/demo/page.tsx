import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/demo",
  title: "Demo",
  description:
    "Interactive IT Ops troubleshooting console and SD-WAN topology demos — see Winters Operations in action.",
});

export default function DemoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-navy-800">
          <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
            <p className="eyebrow mb-4">Demos</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              See the work, not the pitch deck.
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl leading-relaxed">
              Interactive demos of how Winters Operations approaches network
              operations and automation. Simulated environments — no live
              customer systems connected.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-6 space-y-16">
            <article className="scroll-mt-24">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white tracking-tight mb-3">
                  IT Ops Troubleshooting Console
                </h2>
                <p className="text-slate-400 max-w-2xl text-lg">
                  A simulated ops console for network diagnostics, alert
                  handling, and workflow patterns across Meraki, SolarWinds,
                  and ServiceNow-style surfaces.
                </p>
              </div>

              <div className="relative w-full overflow-hidden rounded-2xl border border-navy-700 bg-navy-900/60 shadow-lg mb-8">
                <div className="min-h-[220px] w-full bg-navy-950 flex items-center justify-center px-6 py-12">
                  <div className="text-center">
                    <p className="text-cyan-400 text-lg font-semibold mb-4">
                      Interactive Console
                    </p>
                    <p className="text-slate-400 mb-6">
                      Launch the simulated troubleshooting demo
                    </p>
                    <Link href="/itops-console" className="btn-primary">
                      Launch Console →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-navy-900/40 border border-cyan-500/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  What this demo covers
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">→</span>
                    <span>
                      <strong>Network diagnostics</strong> — connectivity
                      checks, latency readouts, and platform status patterns
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">→</span>
                    <span>
                      <strong>Multi-platform surface</strong> — Meraki,
                      SolarWinds, and ServiceNow-style workflows in one console
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">→</span>
                    <span>
                      <strong>Ops automation patterns</strong> — configuration
                      and workflow steps that reduce manual toil
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">→</span>
                    <span>
                      <strong>Alert handling</strong> — issue detection,
                      tracking, and resolution workflow shapes
                    </span>
                  </li>
                </ul>
              </div>
            </article>

            <article className="scroll-mt-24">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white tracking-tight mb-3">
                  Multi-Site SD-WAN Topology
                </h2>
                <p className="text-slate-400 max-w-2xl text-lg">
                  An interactive topology view of a multi-site SD-WAN layout
                  with link health, latency, and bandwidth readouts.
                </p>
              </div>

              <div className="relative w-full overflow-hidden rounded-2xl border border-navy-700 bg-navy-900/60 shadow-lg mb-8">
                <div className="min-h-[220px] w-full bg-navy-950 flex items-center justify-center px-6 py-12">
                  <div className="text-center">
                    <p className="text-cyan-400 text-lg font-semibold mb-4">
                      Network Visualization
                    </p>
                    <p className="text-slate-400 mb-6">
                      Explore the SD-WAN topology visualization
                    </p>
                    <Link href="/network-topology" className="btn-primary">
                      View Topology →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-navy-900/40 border border-cyan-500/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  What this demo covers
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">→</span>
                    <span>
                      <strong>Multi-site architecture</strong> — hub-and-spoke
                      with mesh redundancy across sample locations
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">→</span>
                    <span>
                      <strong>Link metrics</strong> — latency, bandwidth, and
                      health status for each path
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">→</span>
                    <span>
                      <strong>SD-WAN design patterns</strong> — Meraki-style
                      topology with failover concepts
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">→</span>
                    <span>
                      <strong>Cloud edge</strong> — AWS connectivity for
                      disaster recovery and scale
                    </span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section className="py-16 border-t border-navy-800">
          <div className="max-w-lg mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to reduce operational friction?
            </h2>
            <p className="text-slate-400 mb-8">
              Winters Operations builds the infrastructure, automation, and web
              presence your team needs. Let&apos;s talk about what you&apos;re
              trying to fix.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/#contact-form" className="btn-primary">
                Send a message
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
