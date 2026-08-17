import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "SD-WAN spoke readiness checklist",
  description:
    "What to verify before turning up a new SD-WAN spoke — power, uplink, IP plan, monitoring, and failover.",
};

const items = [
  "Confirm power and rack/space for the edge device.",
  "Primary and backup uplink circuits tested end-to-end.",
  "IP addressing plan: LAN, management, and any transit VLANs documented.",
  "DNS and NTP reachable from the spoke after tunnel up.",
  "Firewall / security policy template assigned and reviewed.",
  "Monitoring thresholds and alert routing defined (who gets paged).",
  "Failover test plan: primary cut, recovery, and expected RTO.",
  "Local contact and remote hands process written down.",
  "Config backup and change window agreed.",
];

export default function SdwanReadinessGuide() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
          <p className="eyebrow mb-4">Network · 5 min</p>
          <h1 className="text-4xl font-bold tracking-tight text-white leading-tight">
            SD-WAN spoke readiness checklist
          </h1>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed">
            Most turn-up problems are not the tunnel. They are power, addressing,
            or missing ownership of alerts. Use this before the truck leaves.
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
            Starlink or cellular backup changes the failure modes — test both
            paths and document which applications are allowed on the backup path.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/guides" className="btn-ghost">All guides</a>
            <a href="/#contact" className="btn-primary">Discuss a rollout</a>
          </div>
        </article>
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
