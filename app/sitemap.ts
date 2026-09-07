import { execFileSync } from "node:child_process";
import path from "node:path";
import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { guides } from "@/lib/content";

export const dynamic = "force-static";

const repoRoot = path.join(process.cwd());

function lastModifiedOf(relativeFilePath: string): Date {
  try {
    const iso = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", relativeFilePath],
      { cwd: repoRoot, encoding: "utf8" },
    ).trim();
    if (iso) return new Date(iso);
  } catch {
    // Fall through to the build-time fallback below (e.g. no .git present).
  }
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const guideEntries = guides.map((g) => ({
    url: `${siteUrl}/guides/${g.slug}`,
    lastModified: lastModifiedOf(`app/guides/${g.slug}/page.tsx`),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [
    {
      url: siteUrl,
      lastModified: lastModifiedOf("app/page.tsx"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: lastModifiedOf("app/services/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: lastModifiedOf("app/work/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/guides`,
      lastModified: lastModifiedOf("app/guides/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    ...guideEntries,
    {
      url: `${siteUrl}/demo`,
      lastModified: lastModifiedOf("app/demo/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/itops-console`,
      lastModified: lastModifiedOf("app/itops-console/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/network-topology`,
      lastModified: lastModifiedOf("app/network-topology/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: lastModifiedOf("app/about/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
