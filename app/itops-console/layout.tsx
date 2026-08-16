import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/itops-console",
  title: "IT Ops Console Demo",
  description:
    "Explore a simulated Winters Operations console for network diagnostics, alert handling, and IT workflow automation.",
});

export default function ITOpsConsoleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
