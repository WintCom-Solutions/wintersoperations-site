"use client";

import { useState } from "react";
import Image from "next/image";
import { nav, siteName } from "@/lib/site";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-navy-700/60 bg-navy-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt={siteName}
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="font-semibold tracking-tight text-lg">{siteName}</span>
        </a>

        <nav className="hidden sm:flex items-center gap-8 text-sm text-slate-400">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-cyan-400 transition">
              {item.label}
            </a>
          ))}
          <a href="/#contact" className="btn-primary px-4 py-2 text-sm">
            Contact
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-navy-700 text-slate-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="sm:hidden border-t border-navy-800 bg-navy-950/95">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4 text-sm text-slate-300">
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="hover:text-cyan-400 transition">
                {item.label}
              </a>
            ))}
            <a href="/#contact" onClick={() => setOpen(false)} className="btn-primary text-sm">
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
