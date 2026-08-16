"use client";

import { useState } from "react";
import { contactEmail, contactEndpoint, googleForm } from "@/lib/site";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");

  const usingGoogleForm = Boolean(googleForm.formId);
  const usingEndpoint = Boolean(contactEndpoint) && !usingGoogleForm;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!usingGoogleForm && !usingEndpoint) {
      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
        `Website inquiry from ${name || "a visitor"}`,
      )}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;
      return;
    }

    setStatus("submitting");

    try {
      const endpoint = usingGoogleForm
        ? `https://docs.google.com/forms/d/${googleForm.formId}/formResponse`
        : contactEndpoint;

      const body = new URLSearchParams();
      if (usingGoogleForm) {
        body.set(googleForm.entryName, name);
        body.set(googleForm.entryEmail, email);
        body.set(googleForm.entryMessage, message);
        body.set(googleForm.entryConsent, googleForm.consentValue);
      } else {
        body.set("name", name);
        body.set("email", email);
        body.set("message", message);
      }

      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setConsent(false);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="surface p-6 text-center text-slate-200">
        Thanks — your message is on its way. We&apos;ll respond promptly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="field"
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="field"
        />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What are you trying to fix?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="field resize-none"
        />
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-400">
        <input
          name="consent"
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 rounded border-navy-700 bg-navy-900 text-cyan-500 focus:ring-cyan-500/30"
        />
        <span>{googleForm.consentValue}</span>
      </label>

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full disabled:opacity-60">
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong — email us directly at {contactEmail}.
        </p>
      )}
    </form>
  );
}
