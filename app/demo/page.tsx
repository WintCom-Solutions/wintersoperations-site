import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Demo",
  description:
    "Watch Winters Operations demos — flagship full cut and silent highlight.",
};

const demos = [
  {
    id: "full-cut",
    title: "Flagship Demo — Full Cut",
    description:
      "Two-minute look at how Winters Operations approaches real operational and automation work.",
    fileId: "1mtuu7ksOZ4uiXFW4ou4pw5L9M0r3mEha",
    duration: "2:00",
  },
  {
    id: "silent-highlight",
    title: "Silent Highlight",
    description:
      "Short silent cut for quick scanning — same visual story, no audio track.",
    fileId: "1WR2_rSumAli3xvET1xrJXUoFABcG0JMB",
    duration: "Highlight",
  },
];

export default function DemoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100">
      <header className="border-b border-navy-700/60 bg-navy-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Winters Operations"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-semibold tracking-tight text-lg">
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
          <div className="max-w-5xl mx-auto px-6 space-y-16">
            {demos.map((demo) => (
              <article key={demo.id} id={demo.id} className="scroll-mt-24">
                <div className="mb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                  <div>
                    <h2 className="text-2xl font-semibold text-white tracking-tight">
                      {demo.title}
                    </h2>
                    <p className="mt-2 text-slate-400 max-w-2xl">
                      {demo.description}
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-slate-500">
                    {demo.duration}
                  </span>
                </div>

                <div className="relative w-full overflow-hidden rounded-2xl border border-navy-700 bg-navy-900/60 shadow-lg">
                  <div className="relative aspect-video w-full">
                    <iframe
                      src={`https://drive.google.com/file/d/${demo.fileId}/preview`}
                      title={demo.title}
                      className="absolute inset-0 h-full w-full"
                      allow="autoplay"
                      allowFullScreen
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16 border-t border-navy-800">
          <div className="max-w-lg mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Want this for your team?
            </h2>
            <p className="text-slate-400 mb-8">
              Tell us what you’re trying to fix — website, automation, or
              network — and we’ll respond promptly.
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
