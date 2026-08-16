import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { contactEmail } from "@/lib/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/demo",
  title: "Demo",
  description:
    "Interactive IT Ops troubleshooting console — see Winters Operations in action.",
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
              Short demos of how Winters Operations approaches websites,
              automation, and network work. Full cut first — silent highlight
              below for a quicker scan.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-6 space-y-16">
            {/* IT Ops Console Demo */}
            <article className="scroll-mt-24">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white tracking-tight mb-3">
                  IT Ops Troubleshooting Console
                </h2>
                <p className="text-slate-400 max-w-2xl text-lg">
                  See how Winters Operations approaches real operational work. This interactive demo shows network diagnostics, platform integration, and automated optimization across Meraki, SolarWinds, and ServiceNow.
                </p>
              </div>

              <div className="relative w-full overflow-hidden rounded-2xl border border-navy-700 bg-navy-900/60 shadow-lg mb-8">
                <div className="aspect-video w-full bg-navy-950 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-cyan-400 text-lg font-semibold mb-4">
                      🚀 Interactive Console
                    </p>
                    <p className="text-slate-400 mb-6">
                      Click below to launch the live troubleshooting demo
                    </p>
                    <Link href="/itops-console" className="btn-primary">
                      Launch Console →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-navy-900/40 border border-cyan-500/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  What the console demonstrates:
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">✓</span>
                    <span><strong>Network Diagnostics</strong> — Real-time connectivity checks, latency monitoring, and platform API performance</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">✓</span>
                    <span><strong>Multi-Platform Integration</strong> — Cisco Meraki, SolarWinds, and ServiceNow working together</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">✓</span>
                    <span><strong>Automated Optimization</strong> — Configuration updates and workflow automation to improve efficiency</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">✓</span>
                    <span><strong>Alert Management</strong> — Real-time issue detection, tracking, and resolution workflows</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Network Topology Demo */}
            <article className="scroll-mt-24">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white tracking-tight mb-3">
                  Multi-Site SD-WAN Topology
                </h2>
                <p className="text-slate-400 max-w-2xl text-lg">
                  See how we design and visualize distributed networks. This interactive topology shows a real-world multi-site SD-WAN deployment with latency, bandwidth, and health monitoring across all sites.
                </p>
              </div>

              <div className="relative w-full overflow-hidden rounded-2xl border border-navy-700 bg-navy-900/60 shadow-lg mb-8">
                <div className="aspect-video w-full bg-navy-950 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-cyan-400 text-lg font-semibold mb-4">
                      🌐 Network Visualization
                    </p>
                    <p className="text-slate-400 mb-6">
                      Click below to explore the SD-WAN topology visualization
                    </p>
                    <Link href="/network-topology" className="btn-primary">
                      View Topology →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-navy-900/40 border border-cyan-500/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  What the topology demonstrates:
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">✓</span>
                    <span><strong>Multi-site Architecture</strong> — Hub-and-spoke with mesh redundancy across 7 locations</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">✓</span>
                    <span><strong>Real-time Metrics</strong> — Latency, bandwidth utilization, and health status for each link</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">✓</span>
                    <span><strong>SD-WAN Design</strong> — Meraki-based network with failover and optimization</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">✓</span>
                    <span><strong>Cloud Integration</strong> — AWS connectivity for disaster recovery and scalability</span>
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
              Winters Operations builds the infrastructure, automation, and web presence your team needs. Let&apos;s talk about what you&apos;re trying to fix.
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
