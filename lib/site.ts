export const siteUrl = "https://wintersoperations.com";

export const siteName = "Winters Operations";

export const contactEmail = "solutions@wintersoperations.com";

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/demo", label: "Demo" },
  { href: "/about", label: "About" },
] as const;

export const stats = [
  { value: 20, suffix: "+", label: "Years network engineering" },
  { value: 300, suffix: "+", label: "Sites under management" },
  { value: 100, suffix: "%", label: "Hands-on delivery" },
] as const;

/** Optional Google Form / Formspree endpoint. Leave empty for mailto fallback. */
export const contactEndpoint = "";

/** Google Form entry IDs if using Google Forms (see docs/contact-form-setup.md) */
export const googleForm = {
  formId: "",
  entryName: "",
  entryEmail: "",
  entryMessage: "",
} as const;
