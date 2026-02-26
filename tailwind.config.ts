import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#1E3A5F",
        cyan: "#06B6D4",
        bg: "#F5F7FA",
        border: "#E5E7EB",
        muted: "#4B5563"
      },
      boxShadow: {
        soft: "0 10px 24px rgba(0,0,0,0.06)"
      }
    }
  },
  plugins: []
} satisfies Config;