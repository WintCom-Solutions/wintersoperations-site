export const siteUrl = "https://wintersoperations.com";

export const siteName = "Winters Operations";

export const contactEmail = "solutions@wintersoperations.com";

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/guides", label: "Guides" },
  { href: "/demo", label: "Demo" },
  { href: "/about", label: "About" },
] as const;

export const stats = [
  { value: 30, suffix: "+", label: "Years enterprise IT" },
  { value: 500, suffix: "+", label: "Sites under management" },
  { value: 100, suffix: "%", label: "Hands-on delivery" },
] as const;

/** Optional Google Form / Formspree endpoint. Leave empty for mailto fallback. */
export const contactEndpoint = "";

/** Google Form entry IDs if using Google Forms (see docs/contact-form-setup.md) */
export const googleForm = {
  formId: "1F-UnMFVIwKRv62kjokde8oQeLzqqtndG3BohIBp0jNE",
  entryName: "entry.676780392",
  entryEmail: "entry.552233917",
  entryMessage: "entry.1265653575",
  entryConsent: "entry.427645027",
  consentValue:
    "I consent to Winters Operations using this information to respond to my inquiry.",
} as const;
