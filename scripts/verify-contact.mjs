import { readFile } from "node:fs/promises";

const expectedConfig = [
  "1F-UnMFVIwKRv62kjokde8oQeLzqqtndG3BohIBp0jNE",
  "entry.676780392",
  "entry.552233917",
  "entry.1265653575",
  "entry.427645027",
];

const siteConfig = await readFile("lib/site.ts", "utf8");
const contactForm = await readFile("components/ContactForm.tsx", "utf8");

for (const value of expectedConfig) {
  if (!siteConfig.includes(value)) {
    throw new Error(`Missing Google Forms configuration: ${value}`);
  }
}

for (const value of [
  "googleForm.entryName",
  "googleForm.entryEmail",
  "googleForm.entryMessage",
  "googleForm.entryConsent",
  "googleForm.consentValue",
  'name="consent"',
  "required",
]) {
  if (!contactForm.includes(value)) {
    throw new Error(`Missing contact-form behavior: ${value}`);
  }
}

const publicCtaFiles = [
  "components/ContactSection.tsx",
  "app/about/page.tsx",
  "app/demo/page.tsx",
  "app/itops-console/page.tsx",
];

for (const path of publicCtaFiles) {
  const source = await readFile(path, "utf8");
  if (source.includes("mailto:")) {
    throw new Error(`Public CTA still depends on mailto: ${path}`);
  }
}

console.log("verified Google Forms configuration, consent, and contact CTAs");
