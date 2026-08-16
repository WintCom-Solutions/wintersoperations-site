import type { Metadata } from "next";
import { siteName } from "./site";

export const homeTitle =
  "Winters Operations | Ops & AI Automation Consulting";

export const homeDescription =
  "Winters Operations helps IT and operations teams reduce friction with practical consulting, Python automation, and focused AI workflows for tools like Cisco Meraki, SolarWinds, and ServiceNow.";

const socialImage = {
  url: "/logo.png",
  width: 256,
  height: 256,
  alt: siteName,
};

type PageMetadataOptions = {
  path: `/${string}`;
  description: string;
  title?: string;
};

export function createPageMetadata({
  path,
  description,
  title,
}: PageMetadataOptions): Metadata {
  const socialTitle = title ? `${title} | ${siteName}` : homeTitle;

  return {
    title: title ?? { absolute: homeTitle },
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url: path,
      siteName,
      title: socialTitle,
      description,
      locale: "en_US",
      images: [socialImage],
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description,
      images: [socialImage],
    },
  };
}
