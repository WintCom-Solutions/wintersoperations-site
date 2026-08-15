import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#06090F",
          900: "#0B1220",
          850: "#0F172A",
          800: "#141C2C",
          700: "#1E293B",
          600: "#334155",
        },
        // Softer cyan / teal-cyan — reserved for accents & CTAs
        cyan: {
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
          700: "#0E7490",
        },
        // Muted accent for eyebrows and secondary highlights
        accent: {
          DEFAULT: "#5EEAD4",
          muted: "#2DD4BF",
          soft: "#99F6E4",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.03em",
        tight: "-0.02em",
      },
      boxShadow: {
        soft: "0 0 0 1px rgba(148, 163, 184, 0.06), 0 8px 24px -8px rgba(0, 0, 0, 0.45)",
        glow: "0 0 40px -12px rgba(6, 182, 212, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
