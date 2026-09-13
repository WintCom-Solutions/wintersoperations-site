import { ImageResponse } from "next/og";
import { siteName } from "@/lib/site";

export const dynamic = "force-static";
export const alt = siteName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#040711",
          backgroundImage:
            "linear-gradient(135deg, #040711 0%, #0b1830 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#22d3ee",
          }}
        >
          {siteName}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#f8fafc",
            maxWidth: 1000,
          }}
        >
          Ops &amp; AI Automation Consulting
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 28,
            lineHeight: 1.5,
            color: "#94a3b8",
            maxWidth: 900,
          }}
        >
          Practical consulting, Python automation, and focused AI workflows
          for Meraki, SolarWinds &amp; ServiceNow.
        </div>
      </div>
    ),
    { ...size }
  );
}
