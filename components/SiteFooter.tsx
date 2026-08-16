import { siteName } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-navy-800 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <div>© {new Date().getFullYear()} {siteName}</div>
        <div className="text-slate-600">Web, network & automation consulting</div>
      </div>
    </footer>
  );
}
