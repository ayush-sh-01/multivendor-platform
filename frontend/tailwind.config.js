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
        charcoal: {
          DEFAULT: "#121212",
          dark: "#0D0D0D",
          light: "#1A1A1A",
          surface: "#181818",
          card: "#1F1F1F",
          border: "rgba(212, 154, 122, 0.15)"
        },
        rosegold: {
          DEFAULT: "#D49A7A",
          hover: "#C28566",
          light: "#E4B399",
          dark: "#A86F51",
          dim: "rgba(212, 154, 122, 0.15)"
        },
        ash: {
          DEFAULT: "#DCDCDC",
          dim: "#A8A8A8",
          dark: "#7A7A7A"
        },
        parchment: {
          DEFAULT: "#F2EBE5",
          light: "#FAF7F2",
          dim: "#E5DDD5",
          border: "#3D2E24"
        },
        burgundy: {
          DEFAULT: "#2A0E14",
          hover: "#38141C",
          light: "#4B1C26",
          border: "rgba(212, 154, 122, 0.3)"
        }
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"]
      },
      boxShadow: {
        luxury: "0 20px 50px rgba(0, 0, 0, 0.6)",
        tag: "0 10px 30px rgba(0, 0, 0, 0.35)",
        rosegold: "0 0 25px rgba(212, 154, 122, 0.25)"
      }
    }
  },
  plugins: []
};
