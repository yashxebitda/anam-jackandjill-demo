import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pulled from Jack & Jill's actual site theme-color
        cream: "#f8f8f3",
        ink: "#1a1a1a",
        smoke: "#6b6b66",
        terracotta: "#c85a3e",
        terracottaSoft: "#e8d4cc",
      },
      fontFamily: {
        // Distinctive editorial serif (matches J&J's founder-photographic tone)
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
