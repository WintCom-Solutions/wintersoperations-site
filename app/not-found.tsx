import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 py-32 text-center">
        <p className="text-sm font-semibold tracking-wide text-cyan-400 uppercase">
          404
        </p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Page not found
        </h1>
        <p className="mt-6 text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Link href="/" className="btn-primary inline-flex mt-10 px-6 py-3 text-sm">
          Back to homepage
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
