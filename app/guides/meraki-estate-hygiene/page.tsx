import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Meraki estate hygiene checklist",
  description:
    "Practical checklist for finding stale configs, unused SSIDs, and credential drift across a multi-site Meraki organization.",
};

const items = [
  "Export organization inventory (networks, devices, firmware versions).",
  "Flag devices offline > 7 days or on end-of-support firmware.",
  "List SSIDs with zero clients over the last 30 days.",
  "Review admin accounts: last login, 2FA status, shared accounts.",
  "Compare switch/AP templates against live configs for drift.",
  "Check VLAN and DHCP scopes for unused or overlapping ranges.",
  "Verify SNMP / syslog / webhook destinations still exist and accept traffic.",
  "Confirm backup / config archive job is succeeding.",
  "Document exceptions and schedule the next hygiene pass.",
];

export default function MerakiHygieneGuide() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
          <p className="eyebrow mb-4">Automation · 6 min</p>
          <h1 className="text-4xl font-bold tracking-tight text-white leading-tight">
            Meraki estate hygiene checklist
          </h1>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed">
            Multi-site Meraki organizations accumulate noise. This list is the
            minimum pass we run before automation or a formal assessment.
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
            Most of this can be scripted with the Meraki API. If you want the
            same pass without the manual spreadsheet work, that is a typical
            automation engagement.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/guides" className="btn-ghost">All guides</a>
            <a href="/#contact" className="btn-primary">Talk about automation</a>
          </div>
        </article>
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
