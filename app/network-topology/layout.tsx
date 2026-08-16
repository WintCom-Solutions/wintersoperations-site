import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/network-topology",
  title: "Network Topology Demo",
  description:
    "Explore a simulated multi-site SD-WAN topology with link health, latency, bandwidth, and failover details.",
});

export default function NetworkTopologyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
