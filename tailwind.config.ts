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
          950: "#05080F",
          900: "#0A101C",
          800: "#111827",
          700: "#1F2937",
        },
        cyan: {
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
        },
        electric: {
          400: "#60A5FA",
          500: "#3B82F6",
        },
        signal: {
          400: "#4ADE80",
          500: "#22C55E",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(0, 0, 0, 0.4)",
        glow: "0 0 24px -4px rgba(6, 182, 212, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
