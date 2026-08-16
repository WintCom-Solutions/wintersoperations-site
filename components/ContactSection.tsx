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
          <p className="font-medium text-slate-200">{contactEmail}</p>
          <a href="#contact-form" className="btn-primary mt-4">
            Send a message
          </a>
          <div>
            <CopyEmailButton email={contactEmail} />
          </div>
        </div>

        <div id="contact-form" className="surface scroll-mt-24 p-6">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
