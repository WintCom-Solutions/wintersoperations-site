import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { siteUrl } from "@/lib/site";
import { homeDescription, homeTitle } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: "%s | Winters Operations",
  },
  description: homeDescription,
  applicationName: "Winters Operations",
  authors: [{ name: "Winters Operations" }],
  creator: "Winters Operations",
  publisher: "Winters Operations",
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
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
