import CopyEmailButton from "@/components/CopyEmailButton";
import ContactForm from "@/components/ContactForm";
import { contactEmail } from "@/lib/site";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 border-t border-navy-800">
      <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-white mb-4">Get in touch</h2>
          <p className="text-slate-400 mb-8">
            Ready to talk about a website, automation, or network work? Reach
            out — we&apos;ll respond promptly.
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 text-navy-950 font-semibold hover:bg-cyan-400 transition"
          >
            {contactEmail}
          </a>
          <div>
            <CopyEmailButton email={contactEmail} />
          </div>
        </div>

        <div className="surface p-6">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
