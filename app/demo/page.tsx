import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Demo",
  description:
    "Interactive IT Ops troubleshooting console — see Winters Operations in action.",
};

export default function DemoPage() {
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
            <a href="/demo" className="text-cyan-400">
              Demo
            </a>
            <a href="/itops-console" className="hover:text-cyan-400 transition">
              IT Ops Console
            </a>
            <a href="/about" className="hover:text-cyan-400 transition">
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
          <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
            <p className="text-cyan-400 font-medium tracking-wide text-sm uppercase mb-4">
              Demos
            </p>
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
          <div className="max-w-4xl mx-auto px-6">
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
                    <Link
                      href="/itops-console"
                      className="inline-flex px-6 py-3 rounded-lg bg-cyan-500 text-navy-950 font-semibold hover:bg-cyan-400 transition"
                    >
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
          </div>
        </section>

        <section className="py-16 border-t border-navy-800">
          <div className="max-w-lg mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to reduce operational friction?
            </h2>
            <p className="text-slate-400 mb-8">
              Winters Operations builds the infrastructure, automation, and web presence your team needs. Let’s talk about what you’re trying to fix.
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
