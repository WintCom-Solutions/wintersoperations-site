"use client";

import { useState } from "react";

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — the mailto link and visible text remain as fallbacks.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="mt-3 text-sm font-medium text-slate-400 hover:text-teal-300 transition"
    >
      {copied ? "Copied!" : "Copy email address"}
    </button>
  );
}
