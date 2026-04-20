import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shadow: "#050308",
        deep: "#241416",
        terracotta: "#7A382E",
        orange: "#EB855C",
        gold: "#FFD993",
        cream: "#FFE9D9",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        sans: [
          "var(--font-instrument)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-jetbrains)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
        index: "0.28em",
      },
      transitionTimingFunction: {
        shutter: "cubic-bezier(.2,.6,.2,1)",
      },
    },
  },
  plugins: [],
};

export default config;
