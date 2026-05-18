import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#050816",
        "bg-secondary": "#070B1A",
        "bg-tertiary": "#0A0F1F",
        panel: "#0b1020",
        panelSoft: "#11172b",
        rescue: {
          cyan: "#00D9FF",
          purple: "#7B61FF",
          blue: "#4F8CFF",
          pink: "#FF4FD8",
          green: "#00FFA3",
          red: "#FF4D6D",
          amber: "#ffd166"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 217, 255, 0.25), 0 0 80px rgba(0, 217, 255, 0.1)",
        "glow-purple": "0 0 40px rgba(123, 97, 255, 0.25), 0 0 80px rgba(123, 97, 255, 0.1)",
        "glow-pink": "0 0 40px rgba(255, 79, 216, 0.25)",
        card: "0 18px 80px rgba(0, 0, 0, 0.5), 0 4px 20px rgba(0,0,0,0.3)",
        "card-hover": "0 24px 100px rgba(0, 0, 0, 0.6), 0 0 40px rgba(123, 97, 255, 0.15)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      backgroundImage: {
        "radial-cyan": "radial-gradient(circle, rgba(0, 217, 255, 0.15) 0%, transparent 70%)",
        "radial-purple": "radial-gradient(circle, rgba(123, 97, 255, 0.15) 0%, transparent 70%)",
        "radial-pink": "radial-gradient(circle, rgba(255, 79, 216, 0.15) 0%, transparent 70%)",
        "gradient-hero": "linear-gradient(135deg, #FFFFFF 0%, rgba(255,255,255,0.9) 30%, #00D9FF 70%, #7B61FF 100%)",
        "gradient-card": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)"
      },
      keyframes: {
        pulseBorder: {
          "0%, 100%": { borderColor: "rgba(0, 217, 255, 0.3)" },
          "50%": { borderColor: "rgba(123, 97, 255, 0.6)" }
        },
        floatIn: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" }
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        orbFloat: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" }
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" }
        },
        scanLine: {
          "0%": { top: "0%" },
          "100%": { top: "100%" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        pulseBorder: "pulseBorder 4s ease-in-out infinite",
        floatIn: "floatIn 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        spinSlow: "spinSlow 20s linear infinite",
        marquee: "marquee 30s linear infinite",
        orbFloat: "orbFloat 12s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        scanLine: "scanLine 3s linear infinite",
        shimmer: "shimmer 2.5s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
