import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "How to scope a small-business website",
  description:
    "A short framework for deciding pages, forms, and hosting so the site ships fast and stays maintainable.",
};

const items = [
  "One primary goal (leads, bookings, or credibility) — not five.",
  "Core pages only: Home, Services, About, Contact. Add later if needed.",
  "One clear CTA per page.",
  "Contact method you will actually answer (form + email or phone).",
  "Mobile-first layout; most visitors will be on a phone.",
  "Hosting you can renew without a developer (static + managed DNS is ideal).",
  "No CMS unless you will log in and edit it monthly.",
  "Launch criteria written down so scope does not expand mid-build.",
];

export default function SiteScopeGuide() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
          <p className="eyebrow mb-4">Web Design · 4 min</p>
          <h1 className="text-4xl font-bold tracking-tight text-white leading-tight">
            How to scope a small-business website
          </h1>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed">
            The fastest path to a useful site is a tight scope. This is the
            checklist we use before any design work starts.
          </p>

          <ol className="mt-12 space-y-4">
            {items.map((item, i) => (
              <li key={i} className="surface p-4 flex gap-4">
                <span className="font-mono text-cyan-400/80 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-slate-200">{item}</span>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-slate-400 leading-relaxed">
            If you already have a domain and a clear offer, a focused static
            site can ship in days, not months.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/guides" className="btn-ghost">All guides</a>
            <a href="/#contact" className="btn-primary">Get a site scoped</a>
          </div>
        </article>
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
