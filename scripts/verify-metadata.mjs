import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const siteUrl = "https://wintersoperations.com";
const routes = [
  "/",
  "/services",
  "/work",
  "/demo",
  "/about",
  "/itops-console",
  "/network-topology",
];

function outputFile(route) {
  if (route === "/") return join("out", "index.html");

  const path = route.slice(1);
  const candidates = [
    join("out", `${path}.html`),
    join("out", path, "index.html"),
  ];

  const match = candidates.find((candidate) => existsSync(candidate));
  if (!match) {
    throw new Error(`No generated HTML found for ${route}`);
  }
  return match;
}

function tags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) ?? [];
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1];
}

function metadataValues(html, attributeName, attributeValue) {
  return tags(html, "meta")
    .filter((tag) => attribute(tag, attributeName) === attributeValue)
    .map((tag) => attribute(tag, "content"));
}

for (const route of routes) {
  const html = readFileSync(outputFile(route), "utf8");
  const expectedUrl = route === "/" ? siteUrl : `${siteUrl}${route}`;

  const canonicals = tags(html, "link")
    .filter((tag) => attribute(tag, "rel") === "canonical")
    .map((tag) => attribute(tag, "href"));

  if (canonicals.length !== 1 || canonicals[0] !== expectedUrl) {
    throw new Error(
      `${route}: expected one canonical ${expectedUrl}, got ${JSON.stringify(canonicals)}`,
    );
  }

  const openGraphUrls = metadataValues(html, "property", "og:url");
  if (openGraphUrls.length !== 1 || openGraphUrls[0] !== expectedUrl) {
    throw new Error(
      `${route}: expected one og:url ${expectedUrl}, got ${JSON.stringify(openGraphUrls)}`,
    );
  }

  const openGraphImages = metadataValues(html, "property", "og:image");
  const twitterImages = metadataValues(html, "name", "twitter:image");
  const expectedImage = `${siteUrl}/logo.png`;

  if (!openGraphImages.includes(expectedImage)) {
    throw new Error(`${route}: missing og:image ${expectedImage}`);
  }
  if (!twitterImages.includes(expectedImage)) {
    throw new Error(`${route}: missing twitter:image ${expectedImage}`);
  }

  console.log(`verified ${route}`);
}
