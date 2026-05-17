import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#050711",
        panel: "#0b1020",
        panelSoft: "#11172b",
        rescue: {
          cyan: "#34d5ff",
          green: "#7df9b4",
          pink: "#ff5ca8",
          amber: "#ffd166"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(52, 213, 255, 0.18)",
        card: "0 18px 80px rgba(0, 0, 0, 0.34)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      keyframes: {
        pulseBorder: {
          "0%, 100%": { borderColor: "rgba(52, 213, 255, 0.22)" },
          "50%": { borderColor: "rgba(125, 249, 180, 0.45)" }
        },
        floatIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        pulseBorder: "pulseBorder 4s ease-in-out infinite",
        floatIn: "floatIn 0.45s ease-out both"
      }
    }
  },
  plugins: []
};

export default config;
