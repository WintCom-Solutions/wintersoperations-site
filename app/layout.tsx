import type { Metadata } from "next";
import "./globals.css";
import { siteUrl } from "@/lib/site";

const siteTitle = "Winters Operations | Ops & AI Automation Consulting";
const siteDescription =
  "Winters Operations helps IT and operations teams reduce friction with practical consulting, Python automation, and focused AI workflows for tools like Cisco Meraki, SolarWinds, and ServiceNow.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Winters Operations",
  },
  description: siteDescription,
  applicationName: "Winters Operations",
  authors: [{ name: "Winters Operations" }],
  creator: "Winters Operations",
  publisher: "Winters Operations",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Winters Operations",
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
