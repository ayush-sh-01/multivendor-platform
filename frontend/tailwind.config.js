/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D4AF37",
          hover: "#C5A059",
          light: "#F3E5AB",
          dark: "#997A15",
          muted: "rgba(212, 175, 55, 0.15)",
          border: "rgba(212, 175, 55, 0.3)"
        },
        dark: {
          bg: "#0A0A0A",
          surface: "#141414",
          card: "#181818",
          surface2: "#1E1E1E",
          surface3: "#262626",
          border: "#222222",
          borderHover: "#333333"
        },
        text: {
          light: "#E0E0E0",
          muted: "#9E9E9E",
          dim: "#6B6B6B"
        }
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"]
      },
      boxShadow: {
        gold: "0 10px 25px rgba(212, 175, 55, 0.2)",
        goldLg: "0 20px 50px rgba(212, 175, 55, 0.15)",
        darkLg: "0 25px 60px rgba(0, 0, 0, 0.9)",
        floating: "0 20px 40px -15px rgba(0, 0, 0, 0.7)"
      },
      letterSpacing: {
        widestLuxe: "0.2em"
      }
    }
  },
  plugins: []
};
