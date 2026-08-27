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
        forest: {
          DEFAULT: "#2C4234",
          dark: "#203227",
          darker: "#18261E",
          card: "#24362A",
          light: "#35503F",
          border: "rgba(244, 239, 230, 0.15)"
        },
        cream: {
          DEFAULT: "#F4EFE6",
          light: "#FAF7F2",
          dim: "rgba(244, 239, 230, 0.7)",
          border: "rgba(244, 239, 230, 0.25)"
        },
        brass: {
          DEFAULT: "#BA9F7A",
          hover: "#A88C67",
          light: "#CDB696",
          dark: "#967B56"
        },
        terracotta: {
          DEFAULT: "#B56653",
          hover: "#9E5442",
          light: "#C87865",
          dark: "#8F4433"
        }
      },
      fontFamily: {
        serif: ["Playfair Display", "Merriweather", "Georgia", "serif"],
        sans: ["Inter", "Helvetica Neue", "Roboto", "sans-serif"]
      },
      boxShadow: {
        heritage: "0 15px 35px rgba(0, 0, 0, 0.35)",
        cardLg: "0 20px 45px rgba(0, 0, 0, 0.4)",
        cardTerracotta: "0 15px 35px rgba(181, 102, 83, 0.3)"
      }
    }
  },
  plugins: []
};
