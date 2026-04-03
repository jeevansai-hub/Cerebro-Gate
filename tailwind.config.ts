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
        bg: {
          base: "#020507",
          depth: {
            1: "#060d12",
            2: "#0a1520",
            3: "#0f2030",
          },
          glass: "rgba(10, 21, 32, 0.6)",
        },
        cyan: {
          DEFAULT: "#00d4ff",
          dim: "rgba(0, 212, 255, 0.12)",
        },
        green: {
          DEFAULT: "#00ff9d",
          dim: "rgba(0, 255, 157, 0.1)",
        },
        amber: "#f59e0b",
        red: "#ff4560",
        violet: "#7c3aed",
        text: {
          primary: "#eef4f8",
          secondary: "#6b93ac",
          dim: "#2a4f68",
          mono: "#4ab3cc",
        },
        border: {
          subtle: "rgba(0, 212, 255, 0.06)",
          active: "rgba(0, 212, 255, 0.25)",
          glass: "rgba(255, 255, 255, 0.04)",
        },
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        display: ["clamp(3.2rem, 7.5vw, 6.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "800" }],
        hero: ["clamp(2.2rem, 4.5vw, 4.0rem)", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "700" }],
        title: ["clamp(1.6rem, 2.8vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
        heading: ["clamp(1.1rem, 1.8vw, 1.4rem)", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["1.1rem", { lineHeight: "1.7", fontWeight: "400" }],
        body: ["0.95rem", { lineHeight: "1.65", fontWeight: "400" }],
        caption: ["0.8rem", { lineHeight: "1.5", fontWeight: "400" }],
        mono: ["0.82rem", { lineHeight: "1.6", fontWeight: "400" }],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        ticker: "ticker linear infinite",
        shimmer: "shimmer 2s linear infinite",
        ping: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200px 0" },
          "100%": { backgroundPosition: "200px 0" },
        },
      },
      boxShadow: {
        "cyan-glow": "0 0 60px rgba(0, 212, 255, 0.2), 0 0 120px rgba(0, 212, 255, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
