import { execFileSync } from "node:child_process";
import path from "node:path";
import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { guides } from "@/lib/content";

export const dynamic = "force-static";

const repoRoot = path.join(process.cwd());

/**
 * A shallow clone (e.g. Vercel/CI's default `--depth 1`) only has the tip
 * commit, so `git log -1 -- <file>` silently returns that same commit for
 * every file regardless of when each one actually last changed -- which
 * defeats the whole point of this module (a no-content-change redeploy
 * would still look like every route changed, just pinned to one date
 * instead of "now"). Unshallow once per build, best-effort, before any
 * lookup runs, so per-file git history is actually available. Never
 * throws: a build with no network access or no git at all just falls
 * through to lastModifiedOf's own fallback.
 */
let unshallowAttempted = false;
function ensureFullHistory(): void {
  if (unshallowAttempted) return;
  unshallowAttempted = true;
  try {
    const isShallow = execFileSync(
      "git",
      ["rev-parse", "--is-shallow-repository"],
      { cwd: repoRoot, encoding: "utf8" },
    ).trim();
    if (isShallow === "true") {
      execFileSync("git", ["fetch", "--unshallow"], {
        cwd: repoRoot,
        stdio: "ignore",
      });
    }
  } catch {
    // No .git, no network, or no configured remote -- lastModifiedOf's
    // per-file git log call will fail too and fall back on its own.
  }
}

function lastModifiedOf(relativeFilePath: string): Date {
  ensureFullHistory();
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
